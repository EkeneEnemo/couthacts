import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/provider/availability — Get provider's availability calendar.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // YYYY-MM format

  const startDate = month ? new Date(`${month}-01`) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const availability = await db.providerAvailability.findMany({
    where: { providerId: provider.id, date: { gte: startDate, lte: endDate } },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ availability });
}

/**
 * PATCH /api/provider/availability — Set availability for dates.
 */
export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const provider = await db.provider.findUnique({ where: { userId: session.user.id } });
  if (!provider) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

  const { dates } = await req.json();
  // dates: [{ date: "2026-04-01", isAvailable: true, maxJobs: 3, notes: "" }]

  for (const d of dates) {
    const dateObj = new Date(d.date);
    await db.providerAvailability.upsert({
      where: { providerId_date: { providerId: provider.id, date: dateObj } },
      update: { isAvailable: d.isAvailable, maxJobs: d.maxJobs || 1, notes: d.notes || null },
      create: { providerId: provider.id, date: dateObj, isAvailable: d.isAvailable, maxJobs: d.maxJobs || 1, notes: d.notes || null },
    });
  }

  return NextResponse.json({ success: true });
}
