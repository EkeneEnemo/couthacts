import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/me/data
 *
 * Returns a complete JSON export of the signed-in user's personal data.
 * Required by GDPR Article 20 (right to data portability) and Article 15
 * (right of access). The response is served as an attachment so browsers
 * trigger a download.
 *
 * Scope: everything associated with the user ID — profile, sessions,
 * postings, bookings (as customer or provider), reviews, disputes,
 * wallet + transactions, notifications, API keys, provider record,
 * subscription, advances, academy enrollments, tracking events, and
 * messages sent/received.
 *
 * Exclusions (deliberate):
 *   - passwordHash (opaque; not user-meaningful)
 *   - session tokens (replay risk)
 *   - provider webhook secrets (API credential)
 *   - Stripe IDs are kept — they're references the user may need for
 *     reconciliation with their bank / card statements.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const [
    user,
    provider,
    postings,
    customerBookings,
    providerBookings,
    reviewsGiven,
    reviewsReceived,
    customerDisputes,
    providerDisputes,
    wallet,
    walletTransactions,
    notifications,
    apiKeys,
    providerApiKeys,
    subscription,
    advances,
    enrollments,
    lessonProgress,
    trackingEvents,
    messages,
  ] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, emailVerified: true, phone: true, phoneVerified: true,
        firstName: true, lastName: true, avatarUrl: true, role: true,
        kycStatus: true, kycPersonaId: true, trustScore: true, isActive: true,
        profileComplete: true, preferredLanguage: true, preferredCurrency: true,
        country: true, city: true, addressLine1: true, addressLine2: true, postalCode: true,
        stripeCustomerId: true, createdAt: true, updatedAt: true,
      },
    }),
    db.provider.findUnique({
      where: { userId },
      select: {
        id: true, businessName: true, businessRegNumber: true,
        dotNumber: true, mcNumber: true, fmcsaNumber: true, imoNumber: true, faaNumber: true,
        modes: true, certifications: true, insuranceCertUrl: true, licenseUrl: true,
        fleetSize: true, serviceArea: true, bio: true, logoUrl: true,
        fleetPhotoUrls: true, videoUrl: true,
        couthActsScore: true, scoreTier: true, completionRate: true, onTimeRate: true,
        avgResponseTime: true, totalJobs: true, disputeCount: true,
        kybStatus: true, kybPersonaId: true, checkrReportId: true,
        isVerified: true, isAvailable: true,
        stripeConnectId: true, stripeOnboardingDone: true,
        createdAt: true, updatedAt: true,
      },
    }),
    db.posting.findMany({ where: { customerId: userId } }),
    db.booking.findMany({ where: { customerId: userId } }),
    db.booking.findMany({ where: { provider: { userId } } }),
    db.review.findMany({ where: { reviewerId: userId } }),
    db.review.findMany({ where: { provider: { userId } } }),
    db.dispute.findMany({ where: { customerId: userId } }),
    db.dispute.findMany({ where: { provider: { userId } } }),
    db.wallet.findUnique({ where: { userId } }),
    db.walletTransaction.findMany({
      where: { wallet: { userId } },
      orderBy: { createdAt: "desc" },
    }),
    db.notification.findMany({ where: { userId } }),
    db.apiKey.findMany({
      where: { userId },
      select: {
        id: true, name: true, isActive: true, lastUsedAt: true, requestCount: true,
        monthlyLimit: true, plan: true, overageCallsThisMonth: true, createdAt: true,
      },
    }),
    db.providerApiKey.findMany({
      where: { provider: { userId } },
      select: {
        id: true, name: true, isActive: true, lastUsedAt: true, requestCount: true,
        monthlyLimit: true, plan: true, webhookUrl: true, createdAt: true,
      },
    }),
    db.subscription.findFirst({ where: { provider: { userId } } }),
    db.financeAdvance.findMany({ where: { provider: { userId } } }),
    db.enrollment.findMany({ where: { userId } }),
    db.lessonProgress.findMany({ where: { enrollment: { userId } } }),
    db.trackingEvent.findMany({
      where: {
        OR: [{ provider: { userId } }, { booking: { customerId: userId } }],
      },
    }),
    db.message.findMany({
      where: {
        OR: [{ senderId: userId }, { booking: { customerId: userId } }, { booking: { provider: { userId } } }],
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const payload = {
    exportMeta: {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      userId,
      coverage:
        "All personal data associated with this account except password hash, active session tokens, and API webhook secrets.",
      contact: "privacy@couthacts.com",
    },
    profile: user,
    provider,
    subscription,
    postings,
    bookings: { asCustomer: customerBookings, asProvider: providerBookings },
    reviews: { given: reviewsGiven, received: reviewsReceived },
    disputes: { asCustomer: customerDisputes, asProvider: providerDisputes },
    wallet: {
      current: wallet,
      transactions: walletTransactions,
    },
    notifications,
    apiKeys: { customer: apiKeys, provider: providerApiKeys },
    academy: {
      enrollments,
      lessonProgress,
    },
    financeAdvances: advances,
    trackingEvents,
    messages,
  };

  const filename = `couthacts-data-export-${userId}-${new Date().toISOString().slice(0, 10)}.json`;
  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
