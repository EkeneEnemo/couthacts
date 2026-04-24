import { db } from "@/lib/db";
import { creditWallet } from "@/lib/wallet";

/**
 * Referral program primitives. Two-sided: referrer and referred user both
 * receive wallet credit when the referred user completes their first paid
 * booking (marking the referral QUALIFIED).
 *
 * Reward amounts are configurable; defaults codified here match the public
 * "$25 for you, $25 for them" promo.
 */
export const REFERRER_REWARD_USD = 25;
export const REFERRED_REWARD_USD = 25;

export const REFERRAL_COOKIE = "couthacts_ref";

/**
 * Deterministic, opaque-ish code from the user's id. 8 uppercase
 * alphanumeric chars.
 *
 * We store this on ReferralCode the first time the user looks theirs up,
 * so the column remains unique and indexable while generation stays
 * idempotent.
 */
function deriveCode(userId: string): string {
  // Take the first 8 non-hyphen alphanumerics and uppercase.
  return userId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
}

export async function getOrCreateReferralCode(userId: string): Promise<{ code: string; redeemCount: number }> {
  const existing = await db.referralCode.findUnique({ where: { userId } });
  if (existing) return { code: existing.code, redeemCount: existing.redeemCount };

  const baseCode = deriveCode(userId);
  let code = baseCode;
  let attempt = 0;
  // Highly unlikely collision, but guard just in case two users share the
  // first 8 characters of an id.
  while (await db.referralCode.findUnique({ where: { code } })) {
    attempt += 1;
    code = `${baseCode}${attempt}`;
  }

  const created = await db.referralCode.create({
    data: { userId, code },
  });
  return { code: created.code, redeemCount: created.redeemCount };
}

export async function lookupReferrer(code: string): Promise<{ userId: string } | null> {
  const normalized = code.trim().toUpperCase();
  if (!normalized || normalized.length < 4 || normalized.length > 32) return null;
  const row = await db.referralCode.findUnique({
    where: { code: normalized },
    select: { userId: true },
  });
  return row ? { userId: row.userId } : null;
}

/**
 * Attach a pending redemption when a new user signs up with a referral code.
 * No wallet credit yet — that happens when the user qualifies (completes a
 * first paid booking).
 */
export async function recordPendingRedemption({
  referrerUserId,
  referredUserId,
  code,
}: {
  referrerUserId: string;
  referredUserId: string;
  code: string;
}) {
  if (referrerUserId === referredUserId) return;

  const existing = await db.referralRedemption.findUnique({
    where: { referredId: referredUserId },
  });
  if (existing) return;

  await db.referralRedemption.create({
    data: {
      referrerId: referrerUserId,
      referredId: referredUserId,
      code: code.trim().toUpperCase(),
      status: "PENDING",
      referrerRewardUsd: REFERRER_REWARD_USD,
      referredRewardUsd: REFERRED_REWARD_USD,
    },
  });
}

/**
 * Mark a redemption as QUALIFIED and credit both wallets. Called when the
 * referred user completes their first paid booking.
 *
 * Idempotent — safe to call multiple times; only the first call credits.
 */
export async function qualifyRedemption(referredUserId: string) {
  const redemption = await db.referralRedemption.findUnique({
    where: { referredId: referredUserId },
  });
  if (!redemption || redemption.status !== "PENDING") return;

  await db.$transaction(async (tx) => {
    // Guard: re-check inside transaction.
    const r = await tx.referralRedemption.findUnique({ where: { id: redemption.id } });
    if (!r || r.status !== "PENDING") return;
    await tx.referralRedemption.update({
      where: { id: r.id },
      data: { status: "QUALIFIED", qualifiedAt: new Date() },
    });
    await tx.referralCode.update({
      where: { userId: r.referrerId },
      data: { redeemCount: { increment: 1 } },
    });
  });

  // Credits happen outside the tx so the creditWallet function (which has its
  // own $transaction for atomic ledger update) doesn't nest.
  await creditWallet({
    userId: redemption.referrerId,
    amountUsd: Number(redemption.referrerRewardUsd),
    type: "REFERRAL_BONUS",
    description: `Referral bonus — ${redemption.code}`,
    reference: redemption.id,
  });
  await creditWallet({
    userId: redemption.referredId,
    amountUsd: Number(redemption.referredRewardUsd),
    type: "REFERRAL_BONUS",
    description: `Welcome bonus — referred by ${redemption.code}`,
    reference: redemption.id,
  });
}
