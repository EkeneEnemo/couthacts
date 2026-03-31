import { db } from "@/lib/db";

/**
 * CouthActs Score — The Trust Engine
 *
 * Scoring formula (total 100 points):
 * - Completion rate × 25 points
 * - On-time rate × 20 points
 * - Average review rating (rating/5) × 20 points
 * - Response time score × 10 points
 * - Dispute penalty: -5 per dispute in last 12 months (max -15)
 * - Account age: 1 point per month (max 10)
 * - Verification bonus: isVerified=true adds 15 points
 *
 * Tiers: 90-100=ELITE, 75-89=TRUSTED, 60-74=ESTABLISHED, <60=PROBATION
 */

export async function recalculateCouthActsScore(providerId: string) {
  const provider = await db.provider.findUniqueOrThrow({
    where: { id: providerId },
    include: {
      reviews: { select: { rating: true } },
      bookings: {
        select: { status: true, scheduledDelivery: true, actualDelivery: true, createdAt: true },
      },
      disputes: {
        where: { createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } },
        select: { id: true },
      },
      bids: {
        orderBy: { createdAt: "desc" },
        take: 20,
        select: { createdAt: true },
      },
      user: { select: { createdAt: true } },
    },
  });

  const totalBookings = provider.bookings.length;
  const completedBookings = provider.bookings.filter((b: { status: string }) => b.status === "COMPLETED").length;

  // 1. Completion rate (25 points)
  const completionRate = totalBookings > 0 ? completedBookings / totalBookings : 0;
  const completionPoints = completionRate * 25;

  // 2. On-time rate (20 points)
  const bookingsWithDeadline = provider.bookings.filter(
    (b: { scheduledDelivery: Date | null; actualDelivery: Date | null; status: string }) =>
      b.status === "COMPLETED" && b.scheduledDelivery && b.actualDelivery
  );
  const onTimeCount = bookingsWithDeadline.filter(
    (b: { scheduledDelivery: Date | null; actualDelivery: Date | null }) =>
      b.actualDelivery! <= b.scheduledDelivery!
  ).length;
  const onTimeRate = bookingsWithDeadline.length > 0 ? onTimeCount / bookingsWithDeadline.length : 0.5;
  const onTimePoints = onTimeRate * 20;

  // 3. Review rating (20 points)
  const avgRating = provider.reviews.length > 0
    ? provider.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / provider.reviews.length
    : 3;
  const reviewPoints = (avgRating / 5) * 20;

  // 4. Response time (10 points)
  // Estimate from bid timestamps — how quickly bids are placed after posting
  let responsePoints = 5; // Default middle score
  if (provider.avgResponseTime > 0) {
    if (provider.avgResponseTime < 60) responsePoints = 10;       // Under 1 hour
    else if (provider.avgResponseTime < 240) responsePoints = 7;  // 1-4 hours
    else if (provider.avgResponseTime < 1440) responsePoints = 4; // 4-24 hours
    else responsePoints = 0;                                       // 24+ hours
  }

  // 5. Dispute penalty (-5 per dispute, max -15)
  const disputeCount = provider.disputes.length;
  const disputePenalty = Math.min(disputeCount * 5, 15);

  // 6. Account age (1 per month, max 10)
  const accountAgeMs = Date.now() - new Date(provider.user.createdAt).getTime();
  const accountAgeMonths = accountAgeMs / (30 * 24 * 60 * 60 * 1000);
  const agePoints = Math.min(Math.floor(accountAgeMonths), 10);

  // 7. Verification bonus (15 points)
  const verificationBonus = provider.isVerified ? 15 : 0;

  // Total score
  const rawScore = completionPoints + onTimePoints + reviewPoints + responsePoints
    - disputePenalty + agePoints + verificationBonus;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Determine tier
  const tier = score >= 90 ? "ELITE"
    : score >= 75 ? "TRUSTED"
    : score >= 60 ? "ESTABLISHED"
    : "PROBATION";

  // Update provider
  await db.provider.update({
    where: { id: providerId },
    data: {
      couthActsScore: score,
      scoreTier: tier as "ELITE" | "TRUSTED" | "ESTABLISHED" | "PROBATION",
      completionRate,
      onTimeRate,
      totalJobs: completedBookings,
      disputeCount,
    },
  });

  return { score, tier, completionRate, onTimeRate, avgRating, disputeCount };
}
