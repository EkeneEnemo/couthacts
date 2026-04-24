import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getOrCreateReferralCode,
  lookupReferrer,
  REFERRAL_COOKIE,
  REFERRER_REWARD_USD,
  REFERRED_REWARD_USD,
} from "@/lib/referrals";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/referrals
 *   Returns the signed-in user's referral code, redemption count, and
 *   reward amounts.
 *
 * POST /api/referrals/validate { code }
 *   Light validation for signup UX — confirms a code exists and returns
 *   the anonymized referrer first name. Also stashes the code in the
 *   `couthacts_ref` cookie so the signup flow can pick it up.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code, redeemCount } = await getOrCreateReferralCode(session.user.id);
  const shareUrl = `https://www.couthacts.com/register?ref=${code}`;

  // Fetch recent qualified redemptions for display.
  const recent = await db.referralRedemption.findMany({
    where: { referrerId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      status: true,
      qualifiedAt: true,
      createdAt: true,
      referrerRewardUsd: true,
      referred: { select: { firstName: true } },
    },
  });

  return NextResponse.json({
    code,
    shareUrl,
    redeemCount,
    rewards: { referrer: REFERRER_REWARD_USD, referred: REFERRED_REWARD_USD },
    recent: recent.map((r) => ({
      status: r.status,
      firstName: r.referred.firstName,
      qualifiedAt: r.qualifiedAt?.toISOString() ?? null,
      createdAt: r.createdAt.toISOString(),
      reward: Number(r.referrerRewardUsd),
    })),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code = (body?.code ?? "").toString();
  const referrer = await lookupReferrer(code);
  if (!referrer) {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  const referrerUser = await db.user.findUnique({
    where: { id: referrer.userId },
    select: { firstName: true },
  });

  const res = NextResponse.json({
    valid: true,
    referrerFirstName: referrerUser?.firstName ?? null,
    rewards: { referrer: REFERRER_REWARD_USD, referred: REFERRED_REWARD_USD },
  });

  // Stash the code for signup to consume. 30-day cookie.
  res.cookies.set({
    name: REFERRAL_COOKIE,
    value: code.trim().toUpperCase(),
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}

/**
 * DELETE /api/referrals — clear the pending referral cookie (used if the
 * user explicitly opts out during signup).
 */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: REFERRAL_COOKIE, value: "", path: "/", maxAge: 0 });
  return res;
}
