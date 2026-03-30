import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { bookingId, rating, comment, onTimeScore, commsScore, conditionScore } = body;

  const booking = await db.booking.findUniqueOrThrow({
    where: { id: bookingId },
  });

  if (booking.status !== "COMPLETED") {
    return NextResponse.json(
      { error: "Can only review completed bookings" },
      { status: 400 }
    );
  }
  if (booking.customerId !== session.user.id) {
    return NextResponse.json(
      { error: "Only the customer can leave a review" },
      { status: 403 }
    );
  }

  const existing = await db.review.findUnique({ where: { bookingId } });
  if (existing) {
    return NextResponse.json(
      { error: "Review already submitted" },
      { status: 400 }
    );
  }

  const review = await db.review.create({
    data: {
      bookingId,
      reviewerId: session.user.id,
      providerId: booking.providerId,
      rating: Math.min(5, Math.max(1, parseInt(rating))),
      comment: comment || null,
      onTimeScore: onTimeScore ? parseInt(onTimeScore) : null,
      commsScore: commsScore ? parseInt(commsScore) : null,
      conditionScore: conditionScore ? parseInt(conditionScore) : null,
    },
  });

  // Update provider aggregate stats
  const allReviews = await db.review.findMany({
    where: { providerId: booking.providerId },
  });
  const avgRating =
    allReviews.reduce((sum: number, r) => sum + r.rating, 0) / allReviews.length;
  const avgOnTime =
    allReviews.filter((r) => r.onTimeScore).reduce((sum: number, r) => sum + r.onTimeScore!, 0) /
    (allReviews.filter((r) => r.onTimeScore).length || 1);

  // Map avg rating (1-5) to score (0-100)
  const newScore = Math.round(avgRating * 20);
  const scoreTier =
    newScore >= 90
      ? "ELITE"
      : newScore >= 70
      ? "TRUSTED"
      : newScore >= 40
      ? "ESTABLISHED"
      : "PROBATION";

  await db.provider.update({
    where: { id: booking.providerId },
    data: {
      couthActsScore: newScore,
      scoreTier: scoreTier as "ELITE" | "TRUSTED" | "ESTABLISHED" | "PROBATION",
      onTimeRate: avgOnTime / 5,
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const providerId = searchParams.get("providerId");

  if (!providerId) {
    return NextResponse.json({ error: "providerId required" }, { status: 400 });
  }

  const reviews = await db.review.findMany({
    where: { providerId },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      reviewer: { select: { firstName: true, lastName: true } },
      booking: { select: { posting: { select: { mode: true, title: true } } } },
    },
  });

  return NextResponse.json({ reviews });
}
