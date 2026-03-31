import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { pushToUser } from "@/lib/pusher-server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/tracking — Provider sends a GPS location update.
 */
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = await db.provider.findUnique({
    where: { userId: session.user.id },
  });
  if (!provider) {
    return NextResponse.json({ error: "Only providers can send tracking" }, { status: 403 });
  }

  const { bookingId, lat, lng, speed, heading, note, layer, status } = await req.json();

  if (!bookingId || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "bookingId, lat, and lng are required" }, { status: 400 });
  }

  const VALID_LAYERS = [
    "MOBILE_GPS", "AIS_MARITIME", "FLIGHT_TRACKING", "ELD_INTEGRATION",
    "QR_PIN_CONFIRMATION", "IOT_DEVICE", "SATELLITE", "DOCUMENT_POD_AI", "BIOMETRIC",
  ];
  const trackingLayer = layer && VALID_LAYERS.includes(layer) ? layer : "MOBILE_GPS";

  const booking = await db.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.providerId !== provider.id) {
    return NextResponse.json({ error: "Not your booking" }, { status: 403 });
  }
  if (booking.status !== "IN_PROGRESS" && booking.status !== "CONFIRMED") {
    return NextResponse.json({ error: "Booking is not active" }, { status: 400 });
  }

  // Record the tracking event
  const event = await db.trackingEvent.create({
    data: {
      bookingId,
      providerId: provider.id,
      layer: trackingLayer,
      lat,
      lng,
      speed: speed ?? null,
      heading: heading ?? null,
      status: status ?? null,
      note: note ?? null,
    },
  });

  // Update booking's current location
  await db.booking.update({
    where: { id: bookingId },
    data: {
      currentLat: lat,
      currentLng: lng,
      lastLocationUpdate: new Date(),
    },
  });

  // Push real-time update to the customer
  pushToUser(booking.customerId, "tracking-update", {
    bookingId,
    lat,
    lng,
    speed,
    heading,
    note,
    recordedAt: event.recordedAt.toISOString(),
  }).catch(() => {});

  return NextResponse.json({ success: true, eventId: event.id });
}

/**
 * GET /api/tracking?bookingId=xxx — Get latest location + recent events.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get("bookingId");

  if (!bookingId) {
    return NextResponse.json({ error: "bookingId required" }, { status: 400 });
  }

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      customerId: true,
      providerId: true,
      currentLat: true,
      currentLng: true,
      lastLocationUpdate: true,
      status: true,
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Verify access
  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  const isCustomer = booking.customerId === session.user.id;
  const isProvider = booking.providerId === provider?.id;
  if (!isCustomer && !isProvider) {
    return NextResponse.json({ error: "Not your booking" }, { status: 403 });
  }

  const events = await db.trackingEvent.findMany({
    where: { bookingId },
    orderBy: { recordedAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    currentLat: booking.currentLat,
    currentLng: booking.currentLng,
    lastUpdate: booking.lastLocationUpdate,
    isLive: booking.status === "IN_PROGRESS",
    events,
  });
}
