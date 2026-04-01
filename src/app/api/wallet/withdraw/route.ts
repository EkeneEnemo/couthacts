import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet } from "@/lib/wallet";
import { getStripe } from "@/lib/stripe";
import { sendPayoutInitiatedEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/wallet/withdraw — Provider withdraws wallet balance to their
 * Stripe Connect bank account.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const provider = await db.provider.findUnique({
      where: { userId: session.user.id },
    });
    if (!provider) {
      return NextResponse.json({ error: "Only providers can withdraw" }, { status: 403 });
    }
    if (!provider.stripeConnectId || !provider.stripeOnboardingDone) {
      return NextResponse.json(
        { error: "Complete Stripe Connect setup before withdrawing. Go to Settings → Stripe Connect." },
        { status: 400 }
      );
    }

    const { amountUsd } = await req.json();
    const amount = parseFloat(amountUsd);

    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json({ error: "Minimum withdrawal is $1.00" }, { status: 400 });
    }

    // Debit from wallet
    try {
      await debitWallet({
        userId: session.user.id,
        amountUsd: amount,
        type: "PAYOUT",
        description: `Withdrawal to bank account — $${amount.toFixed(2)}`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Insufficient balance";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    // Create Stripe payout to the provider's Connect account
    const amountCents = Math.round(amount * 100);
    const transfer = await getStripe().transfers.create(
      {
        amount: amountCents,
        currency: "usd",
        destination: provider.stripeConnectId,
        metadata: {
          couthacts_user_id: session.user.id,
          couthacts_provider_id: provider.id,
          type: "withdrawal",
        },
      },
      { idempotencyKey: `withdraw-${session.user.id}-${Date.now()}` }
    );

    // Send confirmation email
    sendPayoutInitiatedEmail(session.user.email!, session.user.firstName, amount, session.user.id).catch(() => {});

    return NextResponse.json({
      success: true,
      transferId: transfer.id,
      amount,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Withdrawal failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
