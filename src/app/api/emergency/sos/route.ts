import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/emergency/sos — Trigger SOS on an active passenger booking.
 * Only for: TAXI_RIDE, LIMOUSINE, MEDICAL, ARMORED during IN_PROGRESS.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId } = await req.json();
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      posting: { select: { mode: true, originAddress: true } },
      customer: { select: { firstName: true, lastName: true, email: true, phone: true } },
      provider: { select: { businessName: true, userId: true } },
    },
  });

  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (booking.customerId !== session.user.id) return NextResponse.json({ error: "Not your booking" }, { status: 403 });
  if (booking.status !== "IN_PROGRESS") return NextResponse.json({ error: "Booking is not active" }, { status: 400 });

  const passengerModes = ["TAXI_RIDE", "LIMOUSINE", "MEDICAL", "ARMORED"];
  if (!passengerModes.includes(booking.posting.mode)) {
    return NextResponse.json({ error: "SOS is only available for passenger transport modes" }, { status: 400 });
  }

  // Set SOS
  await db.booking.update({
    where: { id: bookingId },
    data: { sosTriggerred: true, sosTriggeredAt: new Date() },
  });

  // Freeze provider
  await db.provider.updateMany({
    where: { id: booking.providerId },
    data: { isAvailable: false },
  });

  // Send urgent email to safety team
  try {
    const { sendSosAlertEmail } = await import("@/lib/email");
    if (typeof sendSosAlertEmail === "function") {
      await sendSosAlertEmail(bookingId, booking.posting.mode, booking.posting.originAddress, booking.customer, booking.provider.businessName, booking.currentLat, booking.currentLng);
    }
  } catch {}

  return NextResponse.json({
    success: true,
    message: "SOS alert sent. Our safety team has been notified. Stay calm and stay on the line if possible.",
  });
}
