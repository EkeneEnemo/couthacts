import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createEscrow, releaseEscrow, refundEscrow } from "@/lib/escrow";
import { creditWallet } from "@/lib/wallet";
import { notifyBidAccepted, notifyBookingComplete, notifyEscrowReleased } from "@/lib/notifications";
import { sendBookingConfirmationEmail, sendBidAcceptedEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

/**
 * POST /api/bookings — Accept a bid and create a booking with escrow
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bidId } = await req.json();

  const bid = await db.bid.findUniqueOrThrow({
    where: { id: bidId },
    include: { posting: true },
  });

  // Verify the customer owns this posting
  if (bid.posting.customerId !== session.user.id) {
    return NextResponse.json({ error: "Not your posting" }, { status: 403 });
  }

  // Create booking
  const trackingCode = randomBytes(6).toString("hex").toUpperCase();
  const pin = Math.floor(100000 + Math.random() * 900000).toString();

  const booking = await db.booking.create({
    data: {
      postingId: bid.postingId,
      customerId: session.user.id,
      providerId: bid.providerId,
      agreedAmountUsd: bid.amountUsd,
      paymentTerm: bid.posting.paymentTerm,
      scheduledPickup: bid.estimatedPickup || bid.posting.pickupDate,
      scheduledDelivery: bid.estimatedDelivery || bid.posting.deliveryDate,
      trackingCode,
      pin,
      insuranceTier: bid.posting.insuranceTier,
    },
  });

  // Update posting status
  await db.posting.update({
    where: { id: bid.postingId },
    data: { status: "MATCHED" },
  });

  // Mark bid as accepted
  await db.bid.update({
    where: { id: bidId },
    data: { isAccepted: true },
  });

  // Create escrow (budget already held in wallet at posting time)
  const bidAmount = Number(bid.amountUsd);
  const budgetHeld = Number(bid.posting.budgetUsd);

  const { escrow, clientSecret } = await createEscrow({
    postingId: bid.postingId,
    bookingId: booking.id,
    totalAmountUsd: bidAmount,
    customerId: session.user.id,
    paymentTerm: bid.posting.paymentTerm,
  });

  // If the accepted bid is less than the posted budget, refund the difference
  if (bidAmount < budgetHeld) {
    const refundAmount = Math.round((budgetHeld - bidAmount) * 100) / 100;
    await creditWallet({
      userId: session.user.id,
      amountUsd: refundAmount,
      type: "ESCROW_REFUND",
      description: `Budget surplus refund (bid $${bidAmount.toFixed(2)} < budget $${budgetHeld.toFixed(2)})`,
      postingId: bid.postingId,
      bookingId: booking.id,
    });
  }

  // Send booking confirmation email
  sendBookingConfirmationEmail(
    session.user.email,
    session.user.firstName,
    bid.posting.title,
    trackingCode,
    booking.id
  ).catch(() => {});

  // Notify provider their bid was accepted
  const providerRecord = await db.provider.findUniqueOrThrow({
    where: { id: bid.providerId },
  });
  await notifyBidAccepted(
    providerRecord.id,
    providerRecord.userId,
    bid.posting.title,
    booking.id
  );

  // Email the provider that their bid was accepted
  const providerUser = await db.user.findUnique({ where: { id: providerRecord.userId } });
  if (providerUser) {
    sendBidAcceptedEmail(
      providerUser.email,
      providerUser.firstName,
      bid.posting.title,
      `$${Number(bid.amountUsd).toFixed(2)}`,
      booking.id
    ).catch(() => {});
  }

  return NextResponse.json(
    { booking, escrow, clientSecret },
    { status: 201 }
  );
}

/**
 * PATCH /api/bookings — Mark as complete or cancel
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookingId, action } = await req.json();

  const booking = await db.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { escrow: true },
  });

  // Start — move CONFIRMED → IN_PROGRESS (provider only)
  if (action === "start") {
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id },
    });
    if (booking.providerId !== provider?.id) {
      return NextResponse.json({ error: "Not your booking" }, { status: 403 });
    }
    if (booking.status !== "CONFIRMED") {
      return NextResponse.json({ error: "Booking is not in CONFIRMED state" }, { status: 400 });
    }

    const updated = await db.booking.update({
      where: { id: bookingId },
      data: { status: "IN_PROGRESS", actualPickup: new Date() },
    });
    await db.posting.update({
      where: { id: booking.postingId },
      data: { status: "IN_PROGRESS" },
    });

    return NextResponse.json({ booking: updated });
  }

  // Customer marks done
  if (action === "customer_complete") {
    if (booking.customerId !== session.user.id) {
      return NextResponse.json({ error: "Not your booking" }, { status: 403 });
    }

    await db.booking.update({
      where: { id: bookingId },
      data: { customerMarkedDone: true },
    });

    // If both parties confirmed, complete booking and release escrow
    if (booking.providerMarkedDone) {
      const completedBooking = await db.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED", completedAt: new Date(), actualDelivery: new Date() },
        include: { posting: true, provider: true },
      });
      await db.posting.update({
        where: { id: booking.postingId },
        data: { status: "COMPLETED" },
      });
      if (booking.escrow && booking.escrow.status === "HOLDING") {
        await releaseEscrow(booking.escrow.id);
        await notifyEscrowReleased(
          completedBooking.provider.userId,
          Number(booking.escrow.providerPayoutUsd),
          bookingId
        );
      }
      await notifyBookingComplete(completedBooking.provider.userId, completedBooking.posting.title, bookingId);
    }

    const updated = await db.booking.findUniqueOrThrow({ where: { id: bookingId } });
    return NextResponse.json({ booking: updated });
  }

  // Provider marks done
  if (action === "provider_complete") {
    const provider = await db.provider.findUnique({
      where: { userId: session.user.id },
    });
    if (booking.providerId !== provider?.id) {
      return NextResponse.json({ error: "Not your booking" }, { status: 403 });
    }

    await db.booking.update({
      where: { id: bookingId },
      data: { providerMarkedDone: true },
    });

    if (booking.customerMarkedDone) {
      const completedBooking = await db.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED", completedAt: new Date(), actualDelivery: new Date() },
        include: { posting: true, provider: true },
      });
      await db.posting.update({
        where: { id: booking.postingId },
        data: { status: "COMPLETED" },
      });
      if (booking.escrow && booking.escrow.status === "HOLDING") {
        await releaseEscrow(booking.escrow.id);
        await notifyEscrowReleased(
          completedBooking.provider.userId,
          Number(booking.escrow.providerPayoutUsd),
          bookingId
        );
      }
      await notifyBookingComplete(booking.customerId, completedBooking.posting.title, bookingId);
    }

    const updated = await db.booking.findUniqueOrThrow({ where: { id: bookingId } });
    return NextResponse.json({ booking: updated });
  }

  // Cancel — only customer can cancel, refund escrow
  if (action === "cancel") {
    if (booking.customerId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only the customer or admin can cancel" }, { status: 403 });
    }
    if (booking.status === "COMPLETED") {
      return NextResponse.json({ error: "Cannot cancel a completed booking" }, { status: 400 });
    }
    if (booking.status === "CANCELLED") {
      return NextResponse.json({ error: "Booking is already cancelled" }, { status: 400 });
    }

    await db.booking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancellationBy: session.user.id,
      },
    });
    await db.posting.update({
      where: { id: booking.postingId },
      data: { status: "CANCELLED" },
    });

    // Refund escrow (atomic — won't double-refund)
    if (booking.escrow && booking.escrow.status === "HOLDING") {
      await refundEscrow(booking.escrow.id);
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
