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

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  if (webhookSecret) {
    try {
      event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    // No webhook secret configured — parse raw (dev only)
    event = JSON.parse(body);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const meta = session.metadata;

      // Handle wallet top-up
      if (meta?.type === "wallet_topup" && meta.couthacts_user_id) {
        const amountUsd = (session.amount_total || 0) / 100;
        if (amountUsd > 0) {
          await creditWallet({
            userId: meta.couthacts_user_id,
            amountUsd,
            type: "TOPUP",
            description: `Wallet top-up via Stripe`,
            stripeId: session.id,
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
      if (escrow) {
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
      });
      if (escrow?.bookingId) {
        await db.booking.update({
          where: { id: escrow.bookingId },
          data: {
            status: "CANCELLED",
            cancelledAt: new Date(),
            cancellationReason: "Payment failed",
          },
        });
      }
      break;
    }

    case "account.updated": {
      const account = event.data.object;
      if (account.charges_enabled && account.payouts_enabled) {
        await db.provider.updateMany({
          where: { stripeConnectId: account.id },
          data: { stripeOnboardingDone: true },
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
