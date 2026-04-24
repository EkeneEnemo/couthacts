import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const revalidate = 30; // edge cache for 30 seconds

/**
 * GET /api/activity?limit=20
 *
 * Returns anonymized recent platform activity for the live ticker.
 * Public — no auth required. Everything is safe to render anywhere.
 *
 * Events returned:
 *   - POSTED:    a new job posting was created
 *   - BOOKED:    a booking was confirmed (posting matched)
 *   - DELIVERED: a booking completed
 *
 * We only return: mode, origin city, destination city, relative time.
 * No user names, no dollar amounts, no tracking codes.
 */
type ActivityEvent = {
  id: string;
  type: "POSTED" | "BOOKED" | "DELIVERED";
  mode: string;
  origin: string;
  destination: string;
  at: string; // ISO timestamp
};

function cityOnly(addr: string | null | undefined): string {
  if (!addr) return "a city";
  // Take the last comma-separated segment that's not all digits (postal code)
  const parts = addr.split(",").map((s) => s.trim()).filter(Boolean);
  // Prefer the second-to-last (typically the city) then the last (country)
  for (let i = parts.length - 2; i >= 0; i--) {
    if (!/^\d/.test(parts[i])) return parts[i];
  }
  return parts[0] ?? "a city";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit")) || 20));

  const [posted, booked, delivered] = await Promise.all([
    db.posting.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        mode: true,
        originAddress: true,
        destinationAddress: true,
        createdAt: true,
      },
    }),
    db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      where: { status: { in: ["CONFIRMED", "IN_PROGRESS", "COMPLETED"] } },
      select: {
        id: true,
        createdAt: true,
        posting: {
          select: { mode: true, originAddress: true, destinationAddress: true },
        },
      },
    }),
    db.booking.findMany({
      orderBy: { completedAt: "desc" },
      take: limit,
      where: { status: "COMPLETED", completedAt: { not: null } },
      select: {
        id: true,
        completedAt: true,
        posting: {
          select: { mode: true, originAddress: true, destinationAddress: true },
        },
      },
    }),
  ]);

  const events: ActivityEvent[] = [
    ...posted.map((p) => ({
      id: `p-${p.id}`,
      type: "POSTED" as const,
      mode: p.mode,
      origin: cityOnly(p.originAddress),
      destination: cityOnly(p.destinationAddress),
      at: p.createdAt.toISOString(),
    })),
    ...booked.map((b) => ({
      id: `b-${b.id}`,
      type: "BOOKED" as const,
      mode: b.posting.mode,
      origin: cityOnly(b.posting.originAddress),
      destination: cityOnly(b.posting.destinationAddress),
      at: b.createdAt.toISOString(),
    })),
    ...delivered.map((b) => ({
      id: `d-${b.id}`,
      type: "DELIVERED" as const,
      mode: b.posting.mode,
      origin: cityOnly(b.posting.originAddress),
      destination: cityOnly(b.posting.destinationAddress),
      at: (b.completedAt ?? new Date()).toISOString(),
    })),
  ];

  events.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  return NextResponse.json({ events: events.slice(0, limit) });
}
