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

  // In production, webhook secret is REQUIRED. Block all unverified webhooks.
  if (!webhookSecret && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event;
  if (webhookSecret) {
    try {
      event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    // Dev only — no signature verification
    event = JSON.parse(body);
  }

  // Idempotency — skip already-processed events
  const eventId = event.id as string;
  if (eventId) {
    const existing = await db.notification.findFirst({
      where: { type: "STRIPE_WEBHOOK", link: eventId },
    });
    if (existing) {
      return NextResponse.json({ received: true });
    }
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const meta = session.metadata;

        if (meta?.type === "wallet_topup" && meta.couthacts_user_id) {
          const amountUsd = (session.amount_total || 0) / 100;
          if (amountUsd > 0) {
            await creditWallet({
              userId: meta.couthacts_user_id,
              amountUsd,
              type: "TOPUP",
              description: `Wallet top-up via Stripe`,
              stripeId: session.payment_intent || session.id,
            });
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
          // Refund the wallet hold
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
        // Chargeback filed — freeze related escrow
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

    // Record processed event for idempotency
    if (eventId) {
      await db.notification.create({
        data: {
          userId: "system",
          title: `Webhook: ${event.type}`,
          body: eventId,
          type: "STRIPE_WEBHOOK",
          link: eventId,
        },
      }).catch(() => {});
    }
  } catch {
    // Log but don't fail — Stripe will retry
    return NextResponse.json({ received: true, error: "Processing failed" });
  }

  return NextResponse.json({ received: true });
}
