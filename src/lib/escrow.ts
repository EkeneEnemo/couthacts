import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { debitWallet, creditWallet } from "@/lib/wallet";

const ESCROW_FEE_PERCENT = 3.5;

/**
 * Create an escrow:
 * 1. Debit customer wallet for the full amount (ESCROW_HOLD)
 * 2. Record escrow row linked to posting + booking
 * 3. Optionally create a Stripe PaymentIntent for external payment tracking
 */
export async function createEscrow({
  postingId,
  bookingId,
  totalAmountUsd,
  customerId,
  paymentTerm,
}: {
  postingId: string;
  bookingId: string;
  totalAmountUsd: number;
  customerId: string;
  paymentTerm: "FULL_UPFRONT" | "SPLIT_50_50" | "FULL_ON_COMPLETION";
}) {
  const escrowFeeUsd = (totalAmountUsd * ESCROW_FEE_PERCENT) / 100;
  const providerPayoutUsd = totalAmountUsd - escrowFeeUsd;

  // Debit customer wallet for the full escrow amount
  await debitWallet({
    userId: customerId,
    amountUsd: totalAmountUsd,
    type: "ESCROW_HOLD",
    description: `Escrow hold for booking`,
    bookingId,
    postingId,
  });

  // For SPLIT_50_50, calculate first and final payments
  let firstPaymentUsd: number | null = null;
  let finalPaymentUsd: number | null = null;
  if (paymentTerm === "SPLIT_50_50") {
    firstPaymentUsd = totalAmountUsd / 2;
    finalPaymentUsd = totalAmountUsd / 2;
  }

  // Create Stripe PaymentIntent for external tracking / card charge
  let stripePaymentIntentId: string | null = null;
  let clientSecret: string | null = null;
  try {
    const customer = await db.user.findUniqueOrThrow({
      where: { id: customerId },
    });

    let stripeCustomerId = customer.stripeCustomerId;
    if (!stripeCustomerId) {
      const stripeCustomer = await getStripe().customers.create({
        email: customer.email,
        name: `${customer.firstName} ${customer.lastName}`,
        metadata: { couthacts_user_id: customer.id },
      });
      stripeCustomerId = stripeCustomer.id;
      await db.user.update({
        where: { id: customer.id },
        data: { stripeCustomerId },
      });
    }

    const chargeAmountCents = Math.round(totalAmountUsd * 100);
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: chargeAmountCents,
      currency: "usd",
      customer: stripeCustomerId,
      capture_method: "manual",
      metadata: {
        couthacts_posting_id: postingId,
        couthacts_booking_id: bookingId,
        payment_term: paymentTerm,
      },
    });
    stripePaymentIntentId = paymentIntent.id;
    clientSecret = paymentIntent.client_secret;
  } catch {
    // Stripe PI is supplementary; wallet debit is the authoritative hold
  }

  const autoReleaseAt = new Date(Date.now() + 1000 * 60 * 60 * 72);

  const escrow = await db.escrow.create({
    data: {
      postingId,
      bookingId,
      totalAmountUsd,
      escrowFeeUsd,
      escrowFeePercent: ESCROW_FEE_PERCENT,
      providerPayoutUsd,
      status: "HOLDING",
      stripePaymentIntentId,
      autoReleaseAt,
      firstPaymentUsd,
      finalPaymentUsd,
    },
  });

  return { escrow, clientSecret };
}

/**
 * Release escrow funds to the provider's wallet.
 * Also transfers via Stripe Connect if the provider has it set up.
 */
export async function releaseEscrow(escrowId: string) {
  const escrow = await db.escrow.findUniqueOrThrow({
    where: { id: escrowId },
    include: {
      booking: { include: { provider: { include: { user: true } } } },
    },
  });

  if (escrow.status !== "HOLDING") {
    throw new Error(`Escrow is ${escrow.status}, cannot release`);
  }

  const provider = escrow.booking?.provider;
  if (!provider) {
    throw new Error("No provider linked to this escrow");
  }

  const payoutAmount = Number(escrow.providerPayoutUsd);

  // Credit provider's wallet
  await creditWallet({
    userId: provider.userId,
    amountUsd: payoutAmount,
    type: "PAYOUT",
    description: `Payout for completed booking`,
    bookingId: escrow.bookingId || undefined,
    postingId: escrow.postingId,
  });

  // Capture Stripe PaymentIntent if exists
  if (escrow.stripePaymentIntentId) {
    try {
      await getStripe().paymentIntents.capture(escrow.stripePaymentIntentId);
    } catch {
      // Stripe capture is supplementary
    }
  }

  // Transfer via Stripe Connect if provider has it
  let stripeTransferId: string | null = null;
  if (provider.stripeConnectId) {
    try {
      const payoutCents = Math.round(payoutAmount * 100);
      const transfer = await getStripe().transfers.create({
        amount: payoutCents,
        currency: "usd",
        destination: provider.stripeConnectId,
        metadata: {
          couthacts_escrow_id: escrow.id,
          couthacts_booking_id: escrow.bookingId || "",
        },
      });
      stripeTransferId = transfer.id;
    } catch {
      // Stripe transfer is supplementary; wallet credit is authoritative
    }
  }

  await db.escrow.update({
    where: { id: escrowId },
    data: {
      status: "RELEASED",
      stripeTransferId,
      releasedAt: new Date(),
    },
  });

  return { payoutAmount, stripeTransferId };
}

/**
 * Release first 50% for SPLIT_50_50 payment term.
 */
export async function releaseFirstPayment(escrowId: string) {
  const escrow = await db.escrow.findUniqueOrThrow({
    where: { id: escrowId },
    include: {
      booking: { include: { provider: { include: { user: true } } } },
    },
  });

  if (escrow.status !== "HOLDING" || !escrow.firstPaymentUsd) {
    throw new Error("Cannot release first payment");
  }

  const provider = escrow.booking?.provider;
  if (!provider) {
    throw new Error("No provider linked to this escrow");
  }

  const feeOnFirst =
    (Number(escrow.firstPaymentUsd) * Number(escrow.escrowFeePercent)) / 100;
  const firstPayout = Number(escrow.firstPaymentUsd) - feeOnFirst;

  // Credit provider's wallet with first half
  await creditWallet({
    userId: provider.userId,
    amountUsd: firstPayout,
    type: "PAYOUT",
    description: `First payment (50%) for booking`,
    bookingId: escrow.bookingId || undefined,
    postingId: escrow.postingId,
  });

  // Stripe Connect transfer if available
  if (provider.stripeConnectId) {
    try {
      await getStripe().transfers.create({
        amount: Math.round(firstPayout * 100),
        currency: "usd",
        destination: provider.stripeConnectId,
        metadata: {
          couthacts_escrow_id: escrow.id,
          payment_type: "first_half",
        },
      });
    } catch {
      // supplementary
    }
  }

  await db.escrow.update({
    where: { id: escrowId },
    data: { firstPaymentReleasedAt: new Date() },
  });

  return { firstPayout };
}

/**
 * Refund escrow to the customer's wallet.
 */
export async function refundEscrow(escrowId: string) {
  const escrow = await db.escrow.findUniqueOrThrow({
    where: { id: escrowId },
    include: {
      booking: { select: { customerId: true } },
      posting: { select: { customerId: true } },
    },
  });

  if (escrow.status !== "HOLDING") {
    throw new Error(`Escrow is ${escrow.status}, cannot refund`);
  }

  const customerId =
    escrow.booking?.customerId || escrow.posting.customerId;

  // Credit the full amount back to customer wallet
  await creditWallet({
    userId: customerId,
    amountUsd: Number(escrow.totalAmountUsd),
    type: "ESCROW_REFUND",
    description: `Escrow refund for cancelled booking`,
    bookingId: escrow.bookingId || undefined,
    postingId: escrow.postingId,
  });

  // Cancel Stripe PaymentIntent if exists
  if (escrow.stripePaymentIntentId) {
    try {
      await getStripe().paymentIntents.cancel(escrow.stripePaymentIntentId);
    } catch {
      // supplementary
    }
  }

  await db.escrow.update({
    where: { id: escrowId },
    data: {
      status: "REFUNDED",
      refundedAt: new Date(),
    },
  });
}

/**
 * Mark escrow as disputed — freezes the funds until resolution.
 */
export async function disputeEscrow(escrowId: string) {
  await db.escrow.update({
    where: { id: escrowId },
    data: { status: "DISPUTED" },
  });
}
