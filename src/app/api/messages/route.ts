import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { pushToUser } from "@/lib/pusher-server";
import { NextRequest, NextResponse } from "next/server";

/**
 * Chat closes 48 hours after job completion.
 */
function isChatOpen(booking: { status: string; completedAt: Date | null }): boolean {
  if (booking.status === "CANCELLED") return false;
  if (booking.status !== "COMPLETED") return true;
  if (!booking.completedAt) return false;
  const hoursSinceCompletion =
    (Date.now() - new Date(booking.completedAt).getTime()) / (1000 * 60 * 60);
  return hoursSinceCompletion <= 48;
}

/**
 * GET /api/messages?bookingId=xxx — Get messages for a booking.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookingId = req.nextUrl.searchParams.get("bookingId");
  if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: { customerId: true, providerId: true, status: true, completedAt: true },
  });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  // Verify access: must be customer or provider on this booking
  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  const isCustomer = booking.customerId === session.user.id;
  const isProvider = booking.providerId === provider?.id;
  if (!isCustomer && !isProvider) {
    return NextResponse.json({ error: "Not your booking" }, { status: 403 });
  }

  const messages = await db.message.findMany({
    where: { bookingId },
    orderBy: { createdAt: "asc" },
    take: 200,
    select: {
      id: true,
      senderId: true,
      body: true,
      createdAt: true,
      sender: { select: { firstName: true, lastName: true, role: true } },
    },
  });

  return NextResponse.json({
    messages,
    chatOpen: isChatOpen(booking),
    closesAt: booking.completedAt
      ? new Date(new Date(booking.completedAt).getTime() + 48 * 60 * 60 * 1000).toISOString()
      : null,
  });
}

/**
 * POST /api/messages — Send a message.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId, body } = await req.json();
  if (!bookingId || !body?.trim()) {
    return NextResponse.json({ error: "bookingId and body required" }, { status: 400 });
  }

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: { customerId: true, providerId: true, status: true, completedAt: true, provider: { select: { userId: true } } },
  });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  // Verify access
  const isCustomer = booking.customerId === session.user.id;
  const isProvider = booking.provider.userId === session.user.id;
  if (!isCustomer && !isProvider) {
    return NextResponse.json({ error: "Not your booking" }, { status: 403 });
  }

  // Check chat window
  if (!isChatOpen(booking)) {
    return NextResponse.json(
      { error: "Chat is closed. The 48-hour window after job completion has expired." },
      { status: 400 }
    );
  }

  const message = await db.message.create({
    data: {
      bookingId,
      senderId: session.user.id,
      body: body.trim(),
    },
    select: {
      id: true,
      senderId: true,
      body: true,
      createdAt: true,
      sender: { select: { firstName: true, lastName: true, role: true } },
    },
  });

  // Push to the other party
  const recipientId = isCustomer ? booking.provider.userId : booking.customerId;
  pushToUser(recipientId, "new-message", {
    bookingId,
    message,
  }).catch(() => {});

  return NextResponse.json({ message }, { status: 201 });
}
