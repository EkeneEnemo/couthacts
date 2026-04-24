import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/track/[code] — Public tracking data. No login required.
 * Returns booking status, mode, route, tracking events. No financial data.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const booking = await db.booking.findFirst({
    where: { trackingCode: params.code },
    include: {
      posting: {
        select: {
          mode: true,
          title: true,
          originAddress: true,
          originLat: true,
          originLng: true,
          destinationAddress: true,
          destinationLat: true,
          destinationLng: true,
          pickupDate: true,
          deliveryDate: true,
        },
      },
      provider: {
        select: { businessName: true },
      },
      tracking: {
        orderBy: { recordedAt: "desc" },
        take: 100,
        select: {
          id: true,
          layer: true,
          lat: true,
          lng: true,
          speed: true,
          heading: true,
          status: true,
          note: true,
          recordedAt: true,
        },
      },
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Tracking code not found" }, { status: 404 });
  }

  return NextResponse.json({
    trackingCode: booking.trackingCode,
    status: booking.status,
    mode: booking.posting.mode,
    title: booking.posting.title,
    origin: booking.posting.originAddress,
    originLat: booking.posting.originLat,
    originLng: booking.posting.originLng,
    destination: booking.posting.destinationAddress,
    destinationLat: booking.posting.destinationLat,
    destinationLng: booking.posting.destinationLng,
    scheduledPickup: booking.posting.pickupDate,
    scheduledDelivery: booking.posting.deliveryDate,
    providerName: booking.provider.businessName,
    currentLat: booking.currentLat,
    currentLng: booking.currentLng,
    lastLocationUpdate: booking.lastLocationUpdate,
    actualPickup: booking.actualPickup,
    actualDelivery: booking.actualDelivery,
    completedAt: booking.completedAt,
    events: booking.tracking,
  });
}
