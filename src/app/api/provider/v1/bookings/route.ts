import { db } from "@/lib/db";
import { validateProviderApiKey } from "@/lib/provider-api-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/provider/v1/bookings — List provider's bookings.
 */
export async function GET(req: NextRequest) {
  const auth = await validateProviderApiKey(req);
  if ("error" in auth) return auth.error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  const where: Record<string, unknown> = { providerId: auth.provider.id };
  if (status) where.status = status;

  const [bookings, total] = await Promise.all([
    db.booking.findMany({
      where, orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit, take: limit,
      include: {
        posting: { select: { title: true, mode: true, originAddress: true, destinationAddress: true } },
        escrow: { select: { status: true, totalAmountUsd: true, providerPayoutUsd: true } },
      },
    }),
    db.booking.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: bookings.map((b) => ({
      id: b.id, status: b.status, trackingCode: b.trackingCode, pin: b.pin,
      agreedAmountUsd: Number(b.agreedAmountUsd),
      scheduledPickup: b.scheduledPickup, scheduledDelivery: b.scheduledDelivery,
      posting: b.posting,
      escrow: b.escrow ? { status: b.escrow.status, total: Number(b.escrow.totalAmountUsd), payout: Number(b.escrow.providerPayoutUsd) } : null,
    })),
    meta: { page, limit, total, requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
