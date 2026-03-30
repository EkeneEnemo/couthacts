import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { disputeEscrow } from "@/lib/escrow";
import { notifyDisputeFiled } from "@/lib/notifications";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookingId, reason, description } = await req.json();

  const booking = await db.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { escrow: true },
  });

  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    const existing = await db.dispute.findUnique({ where: { bookingId } });
    if (existing) {
      return NextResponse.json({ error: "Dispute already filed" }, { status: 400 });
    }
  }

  // Verify the user is either customer or provider
  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  const isCustomer = booking.customerId === session.user.id;
  const isProvider = booking.providerId === provider?.id;
  if (!isCustomer && !isProvider) {
    return NextResponse.json({ error: "Not your booking" }, { status: 403 });
  }

  const dispute = await db.dispute.create({
    data: {
      bookingId,
      customerId: booking.customerId,
      providerId: booking.providerId,
      reason,
      description,
    },
  });

  // Update booking status
  await db.booking.update({
    where: { id: bookingId },
    data: { status: "DISPUTED" },
  });
  await db.posting.update({
    where: { id: booking.postingId },
    data: { status: "DISPUTED" },
  });

  // Freeze escrow
  if (booking.escrow && booking.escrow.status === "HOLDING") {
    await disputeEscrow(booking.escrow.id);
  }

  // Notify both parties
  const postingTitle = (await db.posting.findUnique({ where: { id: booking.postingId } }))?.title || "a booking";
  const providerRecord = await db.provider.findUniqueOrThrow({ where: { id: booking.providerId } });
  if (isCustomer) {
    await notifyDisputeFiled(providerRecord.userId, postingTitle, bookingId);
  } else {
    await notifyDisputeFiled(booking.customerId, postingTitle, bookingId);
  }

  return NextResponse.json({ dispute }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get("bookingId");

  if (bookingId) {
    const dispute = await db.dispute.findUnique({ where: { bookingId } });
    return NextResponse.json({ dispute });
  }

  // List disputes for the user
  const where = session.user.role === "ADMIN"
    ? {}
    : { customerId: session.user.id };

  const disputes = await db.dispute.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      booking: { select: { posting: { select: { title: true } } } },
    },
  });

  return NextResponse.json({ disputes });
}
