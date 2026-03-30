import { getSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { creditWallet } from "@/lib/wallet";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/wallet/confirm — Verify a Stripe checkout session and credit wallet.
 * Called by the client after returning from Stripe checkout.
 * This is the PRIMARY credit path — webhook is the backup.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    // Retrieve the checkout session from Stripe to verify payment
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify it belongs to this user
    if (checkoutSession.metadata?.couthacts_user_id !== session.user.id) {
      return NextResponse.json({ error: "Session mismatch" }, { status: 403 });
    }

    // Verify payment was successful
    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json({
        error: "Payment not completed",
        status: checkoutSession.payment_status,
      }, { status: 400 });
    }

    const amountUsd = (checkoutSession.amount_total || 0) / 100;
    if (amountUsd <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const stripeRef = (checkoutSession.payment_intent as string) || checkoutSession.id;

    // Check if this session was already credited (idempotency)
    const existing = await db.walletTransaction.findFirst({
      where: {
        stripeId: stripeRef,
        type: "TOPUP",
      },
    });

    if (existing) {
      // Already credited — just return the current balance
      const wallet = await db.wallet.findUnique({
        where: { userId: session.user.id },
      });
      return NextResponse.json({
        success: true,
        alreadyCredited: true,
        balance: wallet ? Number(wallet.balanceUsd) : 0,
      });
    }

    // Credit the wallet
    const { wallet } = await creditWallet({
      userId: session.user.id,
      amountUsd,
      type: "TOPUP",
      description: `Wallet top-up — $${amountUsd.toFixed(2)}`,
      stripeId: stripeRef,
    });

    return NextResponse.json({
      success: true,
      alreadyCredited: false,
      balance: Number(wallet.balanceUsd),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Confirmation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
