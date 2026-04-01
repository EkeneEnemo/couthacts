import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { creditWallet } from "@/lib/wallet";
import { sendAdvanceDisbursedEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/finance/advance — Request advance on an active booking's escrow.
 * Eligibility: couthActsScore >= 90, totalJobs >= 50, no open disputes,
 * stripeConnectId set, no existing unpaid advance.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({
    where: { userId: session.user.id },
    include: { disputes: { where: { status: "OPEN" } } },
  });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  // Eligibility checks
  if (provider.couthActsScore < 90) return NextResponse.json({ error: "CouthActs Score must be 90+ (Elite tier)" }, { status: 400 });
  if (provider.totalJobs < 50) return NextResponse.json({ error: "Must have completed 50+ jobs" }, { status: 400 });
  if (provider.disputes.length > 0) return NextResponse.json({ error: "Cannot have open disputes" }, { status: 400 });
  if (!provider.stripeConnectId || !provider.stripeOnboardingDone) return NextResponse.json({ error: "Stripe Connect must be set up" }, { status: 400 });

  // Check no existing unpaid advance
  const existingAdvance = await db.financeAdvance.findFirst({
    where: { providerId: provider.id, status: { in: ["PENDING", "APPROVED", "DISBURSED"] } },
  });
  if (existingAdvance) return NextResponse.json({ error: "Existing advance must be repaid first" }, { status: 400 });

  const { bookingId } = await req.json();
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { escrow: true },
  });

  if (!booking || booking.providerId !== provider.id) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (booking.status !== "IN_PROGRESS") return NextResponse.json({ error: "Booking must be in progress" }, { status: 400 });
  if (!booking.escrow || booking.escrow.status !== "HOLDING") return NextResponse.json({ error: "No escrow held" }, { status: 400 });

  const escrowAmount = Number(booking.escrow.totalAmountUsd);
  const advanceAmount = Math.round(escrowAmount * 0.70 * 100) / 100; // 70% of escrow
  const advanceFee = Math.round(advanceAmount * 0.025 * 100) / 100; // 2.5% fee

  const advance = await db.financeAdvance.create({
    data: {
      providerId: provider.id, bookingId,
      escrowAmount, advanceAmount, advanceFeeUsd: advanceFee,
      status: "DISBURSED", disbursedAt: new Date(),
    },
  });

  // Credit provider wallet
  await creditWallet({
    userId: provider.userId, amountUsd: advanceAmount,
    type: "ADVANCE", description: `Advance — 70% of $${escrowAmount.toFixed(2)} escrow`,
    bookingId,
  });

  // Send confirmation email
  sendAdvanceDisbursedEmail(
    session.user.email!, session.user.firstName,
    advanceAmount, advanceFee, escrowAmount, bookingId, session.user.id
  ).catch((err) => console.error("[CouthActs]", err));

  return NextResponse.json({
    advanceId: advance.id, advanceAmount, advanceFee,
    message: `$${advanceAmount.toFixed(2)} credited to your wallet. $${advanceFee.toFixed(2)} fee will be deducted on completion.`,
  }, { status: 201 });
}

/**
 * GET /api/finance/advance — Check eligibility and list advances.
 */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({
    where: { userId: session.user.id },
    include: { disputes: { where: { status: "OPEN" } } },
  });
  if (!provider) return NextResponse.json({ eligible: false });

  const eligible = provider.couthActsScore >= 90 && provider.totalJobs >= 50
    && provider.disputes.length === 0 && !!provider.stripeConnectId && provider.stripeOnboardingDone;

  const advances = await db.financeAdvance.findMany({
    where: { providerId: provider.id },
    orderBy: { requestedAt: "desc" },
    take: 20,
    include: { booking: { select: { posting: { select: { title: true } } } } },
  });

  const activeBookings = await db.booking.findMany({
    where: { providerId: provider.id, status: "IN_PROGRESS" },
    include: { escrow: { select: { totalAmountUsd: true, status: true } }, posting: { select: { title: true } } },
  });

  return NextResponse.json({
    eligible,
    eligibility: {
      score: provider.couthActsScore >= 90,
      jobs: provider.totalJobs >= 50,
      disputes: provider.disputes.length === 0,
      stripe: !!provider.stripeConnectId && provider.stripeOnboardingDone,
    },
    advances,
    activeBookings: activeBookings.filter((b) => b.escrow?.status === "HOLDING"),
  });
}
