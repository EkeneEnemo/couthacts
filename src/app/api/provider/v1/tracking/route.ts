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

  const { bookingId, lat, lng, status, note, layer } = await req.json();

  if (!bookingId || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ success: false, error: { code: "INVALID_INPUT", message: "bookingId, lat, lng required" } }, { status: 400 });
  }

  const booking = await db.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.providerId !== auth.provider.id) {
    return NextResponse.json({ success: false, error: { code: "NOT_FOUND", message: "Booking not found or not yours" } }, { status: 404 });
  }

  const event = await db.trackingEvent.create({
    data: { bookingId, providerId: auth.provider.id, layer: layer || "MOBILE_GPS", lat, lng, status, note },
  });

  await db.booking.update({
    where: { id: bookingId },
    data: { currentLat: lat, currentLng: lng, lastLocationUpdate: new Date() },
  });

  if (booking.trackingCode) {
    pushToUser(`booking-${booking.trackingCode}`, "tracking-update", {
      bookingId, lat, lng, status, note, recordedAt: event.recordedAt.toISOString(),
    }).catch((err) => console.error("[CouthActs]", err));
  }

  return NextResponse.json({
    success: true, data: { eventId: event.id },
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
