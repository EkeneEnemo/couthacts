import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * GET /api/stats — Public platform statistics. No auth required.
 * Used on the landing page for live animated counters.
 */
export async function GET() {
  const [
    totalJobs,
    verifiedProviders,
    completedBookings,
  ] = await Promise.all([
    db.posting.count(),
    db.provider.count({ where: { isVerified: true } }),
    db.booking.count({ where: { status: "COMPLETED" } }),
  ]);

  // Count distinct countries
  const countries = await db.user.findMany({
    where: { country: { not: null } },
    select: { country: true },
    distinct: ["country"],
  });
  const totalCountries = countries.length || 0;

  // Total volume secured (completed bookings)
  const volume = await db.booking.findMany({
    where: { status: "COMPLETED" },
    select: { agreedAmountUsd: true },
  });
  const totalVolumeUsd = volume.reduce(
    (sum: number, b: { agreedAmountUsd: unknown }) => sum + Number(b.agreedAmountUsd),
    0
  );

  return NextResponse.json({
    totalJobs,
    totalCountries: Math.max(totalCountries, 1), // At least 1
    verifiedProviders,
    completedBookings,
    totalVolumeUsd: Math.round(totalVolumeUsd * 100) / 100,
  });
}
