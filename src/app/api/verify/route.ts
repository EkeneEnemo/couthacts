import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet, getOrCreateWallet } from "@/lib/wallet";
import { NextResponse } from "next/server";

const VERIFICATION_FEE_USD = 20;

/**
 * POST /api/verify — Start identity verification.
 * Charges $20 from wallet. In production, creates a Persona inquiry.
 * For now, simulates with auto-approval after 3 seconds.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  if (!user.avatarUrl) {
    return NextResponse.json(
      { error: "Please upload a profile photo before verifying your identity" },
      { status: 400 }
    );
  }

  if (user.kycStatus === "APPROVED") {
    return NextResponse.json({ status: "APPROVED", message: "Already verified" });
  }

  // Ensure wallet exists and charge $20 verification fee
  await getOrCreateWallet(user.id);

  try {
    await debitWallet({
      userId: user.id,
      amountUsd: VERIFICATION_FEE_USD,
      type: "POSTING_FEE", // Using POSTING_FEE as closest transaction type
      description: `Identity verification fee ($${VERIFICATION_FEE_USD})`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Insufficient wallet balance";
    return NextResponse.json(
      { error: `$${VERIFICATION_FEE_USD} verification fee required. ${message}` },
      { status: 400 }
    );
  }

  const personaId = `sim_${Date.now()}_${user.id.slice(0, 8)}`;

  await db.user.update({
    where: { id: user.id },
    data: {
      kycStatus: "IN_REVIEW",
      kycPersonaId: personaId,
    },
  });

  // Auto-approve after brief delay (simulates Persona webhook)
  setTimeout(async () => {
    try {
      await db.user.update({
        where: { id: user.id },
        data: { kycStatus: "APPROVED" },
      });
      await db.provider.updateMany({
        where: { userId: user.id },
        data: { isVerified: true, kybStatus: "APPROVED" },
      });
    } catch {}
  }, 3000);

  return NextResponse.json({
    status: "IN_REVIEW",
    message: "Verification submitted. $20 fee charged. You will be verified shortly.",
    personaId,
    feeCharged: VERIFICATION_FEE_USD,
  });
}

/**
 * GET /api/verify — Check verification status.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
  });

  return NextResponse.json({
    kycStatus: user.kycStatus,
    kycPersonaId: user.kycPersonaId,
    avatarUrl: user.avatarUrl,
    isVerified: user.kycStatus === "APPROVED",
    verificationFee: VERIFICATION_FEE_USD,
  });
}
