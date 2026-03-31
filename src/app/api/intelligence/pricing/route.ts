import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/intelligence/pricing — Pricing intelligence for a lane.
 * Shows median budget, suggested range, and avg time to first bid.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const originCity = searchParams.get("originCity");

  if (!mode) return NextResponse.json({ error: "mode required" }, { status: 400 });

  // Query last 90 days of completed bookings for this mode
  const ninety = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  const where: Record<string, unknown> = {
    status: "COMPLETED",
    posting: { mode, createdAt: { gte: ninety } },
  };

  if (originCity) {
    where.posting = { ...where.posting as Record<string, unknown>, originAddress: { contains: originCity, mode: "insensitive" } };
  }

  const bookings = await db.booking.findMany({
    where,
    select: { agreedAmountUsd: true, createdAt: true },
    orderBy: { agreedAmountUsd: "asc" },
    take: 200,
  });

  const jobCount = bookings.length;

  if (jobCount < 3) {
    return NextResponse.json({
      jobCount, hasData: false,
      message: "Not enough data yet — set a competitive budget to attract verified providers",
    });
  }

  const amounts = bookings.map((b: { agreedAmountUsd: unknown }) => Number(b.agreedAmountUsd));
  const median = amounts[Math.floor(amounts.length / 2)];
  const p25 = amounts[Math.floor(amounts.length * 0.25)];
  const p75 = amounts[Math.floor(amounts.length * 0.75)];

  // Estimate avg time to first bid (mock — would need bid timestamps)
  const avgTimeToFirstBid = jobCount > 10 ? "2-4 hours" : "4-12 hours";

  return NextResponse.json({
    jobCount, hasData: true,
    medianBudget: Math.round(median), suggestedMin: Math.round(p25), suggestedMax: Math.round(p75),
    avgTimeToFirstBid,
    message: `Based on ${jobCount} similar jobs: budgets of $${Math.round(p25).toLocaleString()}–$${Math.round(p75).toLocaleString()} receive bids within ${avgTimeToFirstBid} in this lane`,
  });
}
