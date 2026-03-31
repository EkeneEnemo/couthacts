import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const LOAD_BOARD_MODES = [
  "FREIGHT_TRUCKING", "HEAVY_HAUL", "HAZMAT", "OVERSIZED_CARGO",
  "FREIGHT_RAIL", "AIR_CARGO", "CARGO_SHIP",
];

/**
 * GET /api/loadboard — Public load board for freight/cargo.
 * No auth required to view. Auth required to bid.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const sort = searchParams.get("sort") || "newest";
  const hazmat = searchParams.get("hazmat");
  const oversized = searchParams.get("oversized");
  const fresh = searchParams.get("fresh"); // last 24h

  const where: Record<string, unknown> = {
    mode: mode ? mode : { in: LOAD_BOARD_MODES },
    status: { in: ["OPEN", "BIDDING"] },
    postingFeePaid: true,
    expiresAt: { gt: new Date() },
  };

  if (hazmat === "true") where.isHazmat = true;
  if (oversized === "true") where.isOversized = true;
  if (fresh === "true") where.createdAt = { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) };

  const orderBy: Record<string, string> =
    sort === "budget_high" ? { budgetUsd: "desc" }
    : sort === "budget_low" ? { budgetUsd: "asc" }
    : sort === "pickup_soon" ? { pickupDate: "asc" }
    : sort === "fewest_bids" ? { createdAt: "desc" } // fallback
    : { createdAt: "desc" };

  const postings = await db.posting.findMany({
    where, orderBy, take: 50,
    include: {
      customer: { select: { city: true, country: true } },
      _count: { select: { bids: true } },
    },
  });

  return NextResponse.json({ postings });
}
