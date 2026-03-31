import { db } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { creditWallet } from "@/lib/wallet";
import { getEscrowFeePercent, calculateEscrowFee } from "@/lib/escrow-fees";

export { getEscrowFeePercent, calculateEscrowFee };

/**
 * Create an escrow:
 * 1. Debit customer wallet (atomic via $transaction in debitWallet)
 * 2. Create escrow record
 * 3. Optionally create Stripe PaymentIntent (supplementary)
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
  if (!Number.isFinite(totalAmountUsd) || totalAmountUsd <= 0) {
    throw new Error("Invalid escrow amount");
  }

  const escrowFeePercent = getEscrowFeePercent(totalAmountUsd);
  const escrowFeeUsd = calculateEscrowFee(totalAmountUsd);
  const providerPayoutUsd = Math.round((totalAmountUsd - escrowFeeUsd) * 100) / 100;

  // NOTE: Budget is already held in wallet at posting time.
  // No wallet debit here — the funds were reserved when the job was posted.

  let firstPaymentUsd: number | null = null;
  let finalPaymentUsd: number | null = null;
  if (paymentTerm === "SPLIT_50_50") {
    firstPaymentUsd = Math.round((totalAmountUsd / 2) * 100) / 100;
    finalPaymentUsd = totalAmountUsd - firstPaymentUsd;
  }

  // Create Stripe PaymentIntent (supplementary — wallet is authoritative)
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
    const paymentIntent = await getStripe().paymentIntents.create(
      {
        amount: chargeAmountCents,
        currency: "usd",
        customer: stripeCustomerId,
        capture_method: "manual",
        metadata: {
          couthacts_posting_id: postingId,
          couthacts_booking_id: bookingId,
          payment_term: paymentTerm,
        },
      },
      { idempotencyKey: `escrow-create-${bookingId}` }
    );
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
      escrowFeePercent: escrowFeePercent,
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
 * Uses a DB status check to prevent double-release.
 */
export async function releaseEscrow(escrowId: string) {
  // Atomic status check + update to prevent race conditions
  const updated = await db.escrow.updateMany({
    where: { id: escrowId, status: "HOLDING" },
    data: { status: "RELEASED", releasedAt: new Date() },
  });

  // If no rows updated, escrow was already released/refunded/disputed
  if (updated.count === 0) {
    return { alreadyProcessed: true };
  }

  const escrow = await db.escrow.findUniqueOrThrow({
    where: { id: escrowId },
    include: {
      booking: { include: { provider: { include: { user: true } } } },
    },
  });

  const provider = escrow.booking?.provider;
  if (!provider) {
    throw new Error("No provider linked to this escrow");
  }

  const payoutAmount = Math.round(Number(escrow.providerPayoutUsd) * 100) / 100;

  // Credit provider's wallet
  await creditWallet({
    userId: provider.userId,
    amountUsd: payoutAmount,
    type: "PAYOUT",
    description: "Payout for completed booking",
    bookingId: escrow.bookingId || undefined,
    postingId: escrow.postingId,
  });

  // Capture Stripe PaymentIntent if exists (supplementary)
  if (escrow.stripePaymentIntentId) {
    try {
      await getStripe().paymentIntents.capture(escrow.stripePaymentIntentId);
    } catch {
      // supplementary
    }
  }

  // Transfer via Stripe Connect if provider has it (supplementary)
  let stripeTransferId: string | null = null;
  if (provider.stripeConnectId) {
    try {
      const payoutCents = Math.round(payoutAmount * 100);
      const transfer = await getStripe().transfers.create(
        {
          amount: payoutCents,
          currency: "usd",
          destination: provider.stripeConnectId,
          metadata: {
            couthacts_escrow_id: escrow.id,
            couthacts_booking_id: escrow.bookingId || "",
          },
        },
        { idempotencyKey: `escrow-release-${escrowId}` }
      );
      stripeTransferId = transfer.id;
    } catch {
      // Wallet credit is authoritative
    }
  }

  if (stripeTransferId) {
    await db.escrow.update({
      where: { id: escrowId },
      data: { stripeTransferId },
    });
  }

  return { payoutAmount, stripeTransferId, alreadyProcessed: false };
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

  if (escrow.status !== "HOLDING" || !escrow.firstPaymentUsd || escrow.firstPaymentReleasedAt) {
    throw new Error("Cannot release first payment");
  }

  const provider = escrow.booking?.provider;
  if (!provider) {
    throw new Error("No provider linked to this escrow");
  }

  const firstAmount = Number(escrow.firstPaymentUsd);
  const feeOnFirst = Math.round(firstAmount * Number(escrow.escrowFeePercent)) / 100;
  const firstPayout = Math.round((firstAmount - feeOnFirst) * 100) / 100;

  await creditWallet({
    userId: provider.userId,
    amountUsd: firstPayout,
    type: "PAYOUT",
    description: "First payment (50%) for booking",
    bookingId: escrow.bookingId || undefined,
    postingId: escrow.postingId,
  });

  if (provider.stripeConnectId) {
    try {
      await getStripe().transfers.create(
        {
          amount: Math.round(firstPayout * 100),
          currency: "usd",
          destination: provider.stripeConnectId,
          metadata: { couthacts_escrow_id: escrow.id, payment_type: "first_half" },
        },
        { idempotencyKey: `escrow-first-${escrowId}` }
      );
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
 * Uses atomic status check to prevent double-refund.
 */
export async function refundEscrow(escrowId: string) {
  const updated = await db.escrow.updateMany({
    where: { id: escrowId, status: "HOLDING" },
    data: { status: "REFUNDED", refundedAt: new Date() },
  });

  if (updated.count === 0) {
    return; // Already refunded/released/disputed
  }

  const escrow = await db.escrow.findUniqueOrThrow({
    where: { id: escrowId },
    include: {
      booking: { select: { customerId: true } },
      posting: { select: { customerId: true } },
    },
  });

  const customerId = escrow.booking?.customerId || escrow.posting.customerId;

  await creditWallet({
    userId: customerId,
    amountUsd: Number(escrow.totalAmountUsd),
    type: "ESCROW_REFUND",
    description: "Escrow refund for cancelled booking",
    bookingId: escrow.bookingId || undefined,
    postingId: escrow.postingId,
  });

  if (escrow.stripePaymentIntentId) {
    try {
      await getStripe().paymentIntents.cancel(escrow.stripePaymentIntentId);
    } catch {
      // supplementary
    }
  }
}

/**
 * Mark escrow as disputed — freezes funds until resolution.
 */
export async function disputeEscrow(escrowId: string) {
  await db.escrow.updateMany({
    where: { id: escrowId, status: "HOLDING" },
    data: { status: "DISPUTED" },
  });
}
