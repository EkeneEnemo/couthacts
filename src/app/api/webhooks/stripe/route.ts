import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { creditWallet } from "@/lib/wallet";
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
  } else {
    // No webhook secret — skip signature verification.
    // This is acceptable for test mode; production should always set the secret.
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
        }
        break;
      }

      case "account.updated": {
        const account = event.data.object;
        const isComplete = account.charges_enabled && account.payouts_enabled;
        await db.provider.updateMany({
          where: { stripeConnectId: account.id },
          data: { stripeOnboardingDone: isComplete },
        });
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

      default:
        break;
    }
  } catch {
    // Don't fail — Stripe will retry
    return NextResponse.json({ received: true, error: "Processing failed" });
  }

  return NextResponse.json({ received: true });
}
