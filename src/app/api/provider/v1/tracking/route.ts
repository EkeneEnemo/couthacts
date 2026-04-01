import { db } from "@/lib/db";
import { validateProviderApiKey } from "@/lib/provider-api-auth";
import { pushToUser } from "@/lib/pusher-server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/provider/v1/tracking/update — Push GPS tracking update via API.
 */
export async function POST(req: NextRequest) {
  const auth = await validateProviderApiKey(req);
  if ("error" in auth) return auth.error;

  const { bookingId, lat, lng, speed, heading, altitude, status, note, layer } = await req.json();

  if (!bookingId || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ success: false, error: { code: "INVALID_INPUT", message: "bookingId, lat, lng required" } }, { status: 400 });
  }

  const VALID_LAYERS = [
    "MOBILE_GPS", "AIS_MARITIME", "FLIGHT_TRACKING", "ELD_INTEGRATION",
    "QR_PIN_CONFIRMATION", "IOT_DEVICE", "SATELLITE", "DOCUMENT_POD_AI", "BIOMETRIC",
  ];
  const trackingLayer = layer && VALID_LAYERS.includes(layer) ? layer : "MOBILE_GPS";

  const booking = await db.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.providerId !== auth.provider.id) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Booking not found or not yours" } }, { status: 404 });
  }

  if (booking.status !== "IN_PROGRESS" && booking.status !== "CONFIRMED") {
    return NextResponse.json({ success: false, error: { code: "INVALID_STATUS", message: "Booking is not active" } }, { status: 400 });
  }

  const event = await db.trackingEvent.create({
    data: {
      bookingId, providerId: auth.provider.id, layer: trackingLayer,
      lat, lng, speed: speed ?? null, heading: heading ?? null, altitude: altitude ?? null,
      status: status ?? null, note: note ?? null,
    },
  });

  await db.booking.update({
    where: { id: bookingId },
    data: { currentLat: lat, currentLng: lng, lastLocationUpdate: new Date() },
  });

  // Push to both channels for real-time updates
  const trackingPayload = {
    bookingId, lat, lng, speed: speed ?? null, heading: heading ?? null,
    status, note, recordedAt: event.recordedAt.toISOString(),
  };
  if (booking.trackingCode) {
    pushToUser(`booking-${booking.trackingCode}`, "tracking-update", trackingPayload).catch((err) => console.error("[CouthActs]", err));
  }
  pushToUser(booking.customerId, "tracking-update", trackingPayload).catch((err) => console.error("[CouthActs]", err));

  return NextResponse.json({
    success: true, data: { eventId: event.id },
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
