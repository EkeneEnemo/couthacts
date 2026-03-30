import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const sort = searchParams.get("sort") || "newest";
  const urgent = searchParams.get("urgent");

  const where: Record<string, unknown> = {
    status: { in: ["OPEN", "BIDDING"] },
    expiresAt: { gt: new Date() },
  };

  const insurance = searchParams.get("insurance");

  if (mode) where.mode = mode;
  if (urgent === "true") where.isUrgent = true;
  if (insurance) where.insuranceTier = insurance;

  const orderBy: Record<string, string> =
    sort === "budget_high"
      ? { budgetUsd: "desc" }
      : sort === "budget_low"
      ? { budgetUsd: "asc" }
      : sort === "pickup_soon"
      ? { pickupDate: "asc" }
      : { createdAt: "desc" };

  const postings = await db.posting.findMany({
    where,
    orderBy,
    take: 50,
    include: {
      customer: { select: { firstName: true, lastName: true, city: true, country: true } },
      _count: { select: { bids: true } },
    },
  });

  return NextResponse.json({ postings });
}
