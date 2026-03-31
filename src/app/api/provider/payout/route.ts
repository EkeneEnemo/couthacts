import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet } from "@/lib/wallet";
import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/provider/payout — Withdraw wallet balance to bank via Stripe Connect.
 * Supports standard (free, 2-5 days) and instant (1.5% fee, 30 min).
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
    if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    if (!provider.stripeConnectId || !provider.stripeOnboardingDone) {
      return NextResponse.json({ error: "Complete Stripe Connect setup before withdrawing. Go to Settings → Stripe Connect." }, { status: 400 });
    }

    // Check no open disputes
    const openDisputes = await db.dispute.count({
      where: { providerId: provider.id, status: "OPEN" },
    });
    if (openDisputes > 0) {
      return NextResponse.json({ error: "Cannot withdraw while disputes are open. Resolve all disputes first." }, { status: 400 });
    }

    const { amountUsd, instant } = await req.json();
    const amount = parseFloat(amountUsd);
    if (!Number.isFinite(amount) || amount < 10) {
      return NextResponse.json({ error: "Minimum withdrawal is $10.00" }, { status: 400 });
    }

    const isInstant = instant === true;
    const instantFeeRate = 0.015; // 1.5%
    const instantFee = isInstant ? Math.round(amount * instantFeeRate * 100) / 100 : 0;
    const netPayout = Math.round((amount - instantFee) * 100) / 100;

    // Debit full amount from wallet
    try {
      await debitWallet({
        userId: session.user.id, amountUsd: amount,
        type: "PAYOUT",
        description: `${isInstant ? "Instant" : "Standard"} withdrawal — $${amount.toFixed(2)}${isInstant ? ` (fee: $${instantFee.toFixed(2)})` : ""}`,
      });
    } catch (err: unknown) {
      return NextResponse.json({ error: err instanceof Error ? err.message : "Insufficient balance" }, { status: 400 });
    }

    // Charge instant payout fee separately if applicable
    if (isInstant && instantFee > 0) {
      try {
        await debitWallet({
          userId: session.user.id, amountUsd: instantFee,
          type: "INSTANT_PAYOUT_FEE",
          description: `Instant payout fee (1.5%) — $${instantFee.toFixed(2)}`,
        });
      } catch {
        // Fee deduction failed — proceed anyway since main amount already debited
      }
    }

    // Create Stripe transfer
    const payoutCents = Math.round(netPayout * 100);
    const transfer = await getStripe().transfers.create(
      {
        amount: payoutCents,
        currency: "usd",
        destination: provider.stripeConnectId,
        metadata: {
          couthacts_user_id: session.user.id,
          couthacts_provider_id: provider.id,
          type: isInstant ? "instant_payout" : "standard_payout",
        },
      },
      { idempotencyKey: `payout-${session.user.id}-${Date.now()}` }
    );

    const estimatedArrival = isInstant ? "within 30 minutes" : "2-5 business days";

    return NextResponse.json({
      success: true, transferId: transfer.id,
      amount, fee: instantFee, netPayout, estimatedArrival,
      type: isInstant ? "instant" : "standard",
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Payout failed" }, { status: 500 });
  }
}
