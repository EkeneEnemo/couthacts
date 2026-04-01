import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { creditWallet } from "@/lib/wallet";
import { sendWalletTopUpReceiptEmail, sendPaymentFailedEmail, sendBookingCancelledEmail, sendPayoutFailedEmail, sendStripeConnectReadyEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = (process.env.STRIPE_WEBHOOK_SECRET || "").replace(/^["']|["']$/g, "").trim();

  let event;
  if (webhookSecret) {
    try {
      event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // In production, the webhook secret is mandatory — refuse to process unsigned events.
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  } else {
    // No webhook secret in dev/test — skip signature verification.
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const meta = session.metadata;

        if (meta?.type === "wallet_topup" && meta.couthacts_user_id) {
          const amountUsd = (session.amount_total || 0) / 100;
          const stripeRef = session.payment_intent || session.id;

          if (amountUsd > 0) {
            // Idempotency — check if already credited by /api/wallet/confirm
            const existing = await db.walletTransaction.findFirst({
              where: { stripeId: stripeRef, type: "TOPUP" },
            });
            if (!existing) {
              await creditWallet({
                userId: meta.couthacts_user_id,
                amountUsd,
                type: "TOPUP",
                description: `Wallet top-up via Stripe`,
                stripeId: stripeRef,
              });
              // Send receipt email
              const topUpUser = await db.user.findUnique({ where: { id: meta.couthacts_user_id } });
              if (topUpUser?.email) {
                sendWalletTopUpReceiptEmail(topUpUser.email, topUpUser.firstName, amountUsd, topUpUser.id).catch((err) => console.error("[CouthActs]", err));
              }
            }
          }
        }
        break;
      }

      case "payment_intent.succeeded": {
        const pi = event.data.object;
        const escrow = await db.escrow.findUnique({
          where: { stripePaymentIntentId: pi.id },
        });
        if (escrow && escrow.status !== "HOLDING") {
          await db.escrow.update({
            where: { id: escrow.id },
            data: { status: "HOLDING" },
          });
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const pi = event.data.object;
        const escrow = await db.escrow.findUnique({
          where: { stripePaymentIntentId: pi.id },
          include: { booking: true },
        });
        if (escrow?.bookingId && escrow.booking?.status !== "CANCELLED") {
          await db.booking.update({
            where: { id: escrow.bookingId },
            data: {
              status: "CANCELLED",
              cancelledAt: new Date(),
              cancellationReason: `Payment failed: ${pi.last_payment_error?.message || "unknown"}`,
            },
          });
          if (escrow.status === "HOLDING") {
            const customerId = escrow.booking?.customerId;
            if (customerId) {
              await creditWallet({
                userId: customerId,
                amountUsd: Number(escrow.totalAmountUsd),
                type: "ESCROW_REFUND",
                description: "Escrow refund — payment failed",
                bookingId: escrow.bookingId,
              });
              await db.escrow.update({
                where: { id: escrow.id },
                data: { status: "REFUNDED", refundedAt: new Date() },
              });
            }
          }
          // Notify customer of payment failure
          if (escrow.booking?.customerId) {
            const failedUser = await db.user.findUnique({ where: { id: escrow.booking.customerId } });
            if (failedUser?.email) {
              const failReason = pi.last_payment_error?.message || "Payment could not be processed";
              sendPaymentFailedEmail(failedUser.email, failedUser.firstName, failReason, escrow.bookingId || undefined, failedUser.id).catch((err) => console.error("[CouthActs]", err));
            }
          }
        }
        break;
      }

      case "account.updated": {
        const account = event.data.object;
        const isComplete = account.charges_enabled && account.payouts_enabled;
        const providers = await db.provider.findMany({
          where: { stripeConnectId: account.id },
          include: { user: true },
        });
        // Check if any were previously not onboarded
        const newlyOnboarded = isComplete && providers.some(p => !p.stripeOnboardingDone);
        await db.provider.updateMany({
          where: { stripeConnectId: account.id },
          data: { stripeOnboardingDone: isComplete },
        });
        if (newlyOnboarded) {
          for (const p of providers) {
            if (p.user.email) {
              sendStripeConnectReadyEmail(p.user.email, p.user.firstName, p.userId).catch((err) => console.error("[CouthActs]", err));
            }
          }
        }
        break;
      }

      case "charge.dispute.created": {
        const charge = event.data.object;
        const pi = charge.payment_intent;
        if (pi) {
          const escrow = await db.escrow.findUnique({
            where: { stripePaymentIntentId: typeof pi === "string" ? pi : pi.id },
          });
          if (escrow && escrow.status === "HOLDING") {
            await db.escrow.update({
              where: { id: escrow.id },
              data: { status: "DISPUTED" },
            });
          }
        }
        break;
      }

      case "transfer.reversed":
      case "transfer.failed": {
        // Payout failed — restore wallet balance
        const transfer = event.data.object;
        const meta = transfer.metadata;
        if (meta?.couthacts_user_id) {
          const amountUsd = (transfer.amount || 0) / 100;
          if (amountUsd > 0) {
            await creditWallet({
              userId: meta.couthacts_user_id,
              amountUsd,
              type: "PAYOUT_REVERSAL",
              description: `Payout failed — $${amountUsd.toFixed(2)} returned to wallet`,
              stripeId: transfer.id,
            });
          }
          // Notify provider
          const payoutUser = await db.user.findUnique({ where: { id: meta.couthacts_user_id } });
          if (payoutUser?.email) {
            sendPayoutFailedEmail(payoutUser.email, payoutUser.firstName, amountUsd, payoutUser.id).catch((err) => console.error("[CouthActs]", err));
          }
        }
        break;
      }

      default:
        break;
    }
  } catch {
    // Don't fail — Stripe will retry
    return NextResponse.json({ received: true, error: "Processing failed" });
  }

  return NextResponse.json({ received: true });
}
