import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * POST /api/verify — Start identity verification.
 * In production, this would create a Persona inquiry and return the
 * inquiry URL. For now, we simulate the flow with a self-verification
 * that sets status to IN_REVIEW, then auto-approves after a check.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  // Require avatar before verification
  if (!user.avatarUrl) {
    return NextResponse.json(
      { error: "Please upload a profile photo before verifying your identity" },
      { status: 400 }
    );
  }

  if (user.kycStatus === "APPROVED") {
    return NextResponse.json({ status: "APPROVED", message: "Already verified" });
  }

  // In production: create Persona inquiry here
  // const inquiry = await persona.createInquiry({ ... });
  // For now: move to IN_REVIEW and auto-approve
  // This simulates the webhook callback from Persona

  const personaId = `sim_${Date.now()}_${user.id.slice(0, 8)}`;

  await db.user.update({
    where: { id: user.id },
    data: {
      kycStatus: "IN_REVIEW",
      kycPersonaId: personaId,
    },
  });

  // Auto-approve after a brief delay (simulates Persona webhook)
  // In production, this would be handled by a Persona webhook
  setTimeout(async () => {
    try {
      await db.user.update({
        where: { id: user.id },
        data: { kycStatus: "APPROVED" },
      });
      // If provider, also mark as verified
      await db.provider.updateMany({
        where: { userId: user.id },
        data: { isVerified: true, kybStatus: "APPROVED" },
      });
    } catch {
      // ignore
    }
  }, 3000);

  return NextResponse.json({
    status: "IN_REVIEW",
    message: "Verification submitted. You will be verified shortly.",
    personaId,
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
  });
}
