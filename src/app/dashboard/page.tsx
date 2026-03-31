import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { Logo } from "@/components/logo";
import {
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
  Truck,
} from "lucide-react";
import { ScoreWidget } from "@/components/score-gauge";
import { ScoreBars } from "@/components/score-bars";

const STATUS_STYLES: Record<string, { icon: typeof Clock; color: string }> = {
  OPEN: { icon: Clock, color: "text-sky-600 bg-sky-50" },
  BIDDING: { icon: Package, color: "text-ocean-600 bg-ocean-50" },
  MATCHED: { icon: CheckCircle, color: "text-green-600 bg-green-50" },
  IN_PROGRESS: { icon: Truck, color: "text-blue-600 bg-blue-50" },
  COMPLETED: { icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
  DISPUTED: { icon: AlertCircle, color: "text-red-600 bg-red-50" },
  CANCELLED: { icon: AlertCircle, color: "text-gray-500 bg-gray-100" },
  EXPIRED: { icon: Clock, color: "text-gray-400 bg-gray-50" },
};

export default async function DashboardPage() {
  const session = await requireAuth();
  const user = session.user;

  // Customer data
  const postingsQuery = db.posting.findMany({
    where: { customerId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      _count: { select: { bids: true } },
      booking: { select: { id: true, status: true } },
    },
  });
  type PostingRow = Awaited<typeof postingsQuery>[number];
  const postings: PostingRow[] =
    (user.role === "CUSTOMER" || user.role === "ADMIN") ? await postingsQuery : [];

  const customerBookingsQuery = db.booking.findMany({
    where: { customerId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      posting: { select: { title: true, mode: true } },
      provider: { select: { businessName: true } },
      escrow: { select: { status: true } },
    },
  });
  type CustomerBookingRow = Awaited<typeof customerBookingsQuery>[number];
  const customerBookings: CustomerBookingRow[] =
    (user.role === "CUSTOMER" || user.role === "ADMIN") ? await customerBookingsQuery : [];

  // Provider data
  const provider =
    user.role === "PROVIDER"
      ? await db.provider.findUnique({
          where: { userId: user.id },
          include: { reviews: { select: { rating: true } } },
        })
      : null;

  const providerAvgRating = provider?.reviews?.length
    ? provider.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / provider.reviews.length
    : 0;

  const providerBookingsQuery = db.booking.findMany({
    where: { providerId: provider?.id ?? "" },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      posting: { select: { title: true, mode: true } },
      customer: { select: { firstName: true, lastName: true } },
      escrow: { select: { status: true } },
    },
  });
  type ProviderBookingRow = Awaited<typeof providerBookingsQuery>[number];
  const providerBookings: ProviderBookingRow[] = provider
    ? await providerBookingsQuery
    : [];

  const providerBidsQuery = db.bid.findMany({
    where: { providerId: provider?.id ?? "" },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      posting: {
        select: { id: true, title: true, mode: true, status: true, budgetUsd: true },
      },
    },
  });
  type ProviderBidRow = Awaited<typeof providerBidsQuery>[number];
  const providerBids: ProviderBidRow[] = provider
    ? await providerBidsQuery
    : [];

  return (
    <div className="min-h-screen bg-cream-100">
      <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-cream-100/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            {user.role === "PROVIDER" && (
              <Link href="/browse" className="text-sm font-medium text-ocean-700 hover:text-ocean-900">
                Browse Jobs
              </Link>
            )}
            <span className="text-sm text-gray-500">
              {user.firstName} {user.lastName}
            </span>
            <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-medium text-ocean-700">
              {user.role}
            </span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-ocean-900">Dashboard</h1>
          {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
            <Link
              href="/postings/new"
              className="inline-flex items-center gap-2 rounded-lg bg-ocean-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-ocean-700 transition"
            >
              <Plus className="h-4 w-4" />
              Post a job
            </Link>
          )}
        </div>

        {/* ── CUSTOMER VIEW ── */}
        {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
          <div className="mt-8 space-y-10">
            {/* Postings */}
            <div>
              <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
                Your Postings
              </h2>
              {postings.length === 0 ? (
                <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
                  <Package className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">No postings yet</p>
                  <Link
                    href="/postings/new"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ocean-600 hover:text-ocean-700"
                  >
                    Post your first job <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {postings.map((p: PostingRow) => {
                    const style = STATUS_STYLES[p.status] || STATUS_STYLES.OPEN;
                    const Icon = style.icon;
                    return (
                      <Link
                        key={p.id}
                        href={`/postings/${p.id}`}
                        className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-ocean-800">{p.title}</p>
                            <p className="text-xs text-gray-500">
                              {p.mode.replace(/_/g, " ")} &middot;{" "}
                              {format(p.createdAt, "MMM d, yyyy")} &middot;{" "}
                              {p._count.bids} bid{p._count.bids !== 1 && "s"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-ocean-700">
                            ${Number(p.budgetUsd).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">{p.status}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bookings */}
            {customerBookings.length > 0 && (
              <div>
                <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
                  Your Bookings
                </h2>
                <div className="space-y-3">
                  {customerBookings.map((b: CustomerBookingRow) => (
                    <Link
                      key={b.id}
                      href={`/bookings/${b.id}`}
                      className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-medium text-ocean-800">{b.posting.title}</p>
                        <p className="text-xs text-gray-500">
                          {b.posting.mode.replace(/_/g, " ")} &middot; {b.provider.businessName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-ocean-700">
                          ${Number(b.agreedAmountUsd).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          <span className="text-xs text-gray-400">{b.status}</span>
                          {b.escrow && (
                            <span className={`text-xs rounded-full px-2 py-0.5 ${
                              b.escrow.status === "HOLDING" ? "bg-amber-50 text-amber-600" :
                              b.escrow.status === "RELEASED" ? "bg-green-50 text-green-600" :
                              "bg-gray-50 text-gray-500"
                            }`}>
                              {b.escrow.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── PROVIDER VIEW ── */}
        {user.role === "PROVIDER" && (
          <div className="mt-8 space-y-10">
            {!provider ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
                <p className="text-gray-500">You haven&apos;t completed provider onboarding yet.</p>
                <Link
                  href="/onboarding"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ocean-600 hover:text-ocean-700"
                >
                  Complete onboarding <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* CouthActs Score Widget */}
                <div className="grid gap-6 lg:grid-cols-2">
                  <ScoreWidget
                    score={provider.couthActsScore}
                    tier={provider.scoreTier}
                    completionRate={provider.completionRate}
                    onTimeRate={provider.onTimeRate}
                    avgRating={providerAvgRating}
                    avgResponseTime={provider.avgResponseTime}
                    disputeCount={provider.disputeCount}
                    isVerified={provider.isVerified}
                  />
                  <div className="space-y-4">
                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Total Jobs", value: provider.totalJobs },
                        { label: "On-Time Rate", value: `${(provider.onTimeRate * 100).toFixed(0)}%` },
                        { label: "Completion", value: `${(provider.completionRate * 100).toFixed(0)}%` },
                        { label: "Reviews", value: provider.reviews.length },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 text-center">
                          <p className="text-xl font-display font-bold text-ocean-700">{stat.value}</p>
                          <p className="mt-0.5 text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    {/* Performance breakdown */}
                    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
                      <p className="text-xs font-bold text-ocean-800 uppercase tracking-wider mb-3">Performance Breakdown</p>
                      <ScoreBars
                        completionRate={provider.completionRate}
                        onTimeRate={provider.onTimeRate}
                        avgRating={providerAvgRating}
                        avgResponseTime={provider.avgResponseTime}
                        disputeCount={provider.disputeCount}
                        isVerified={provider.isVerified}
                      />
                    </div>
                  </div>
                </div>

                {/* Business verification banner */}
                {!provider.isVerified && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Business verification required</p>
                        <p className="text-xs text-amber-600 mt-1">
                          You cannot bid on opportunities until your business is verified by CouthActs&#8482; team.
                        </p>
                      </div>
                      <Link
                        href="/verify-business"
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700 transition flex-shrink-0"
                      >
                        Verify Business Now
                      </Link>
                    </div>
                  </div>
                )}

                {/* Active Bookings */}
                {providerBookings.length > 0 && (
                  <div>
                    <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
                      Your Bookings
                    </h2>
                    <div className="space-y-3">
                      {providerBookings.map((b: ProviderBookingRow) => (
                        <Link
                          key={b.id}
                          href={`/bookings/${b.id}`}
                          className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                          <div>
                            <p className="font-medium text-ocean-800">{b.posting.title}</p>
                            <p className="text-xs text-gray-500">
                              {b.posting.mode.replace(/_/g, " ")} &middot;{" "}
                              {b.customer.firstName} {b.customer.lastName}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-ocean-700">
                              ${Number(b.agreedAmountUsd).toLocaleString()}
                            </p>
                            <span className="text-xs text-gray-400">{b.status}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Bids */}
                {providerBids.length > 0 && (
                  <div>
                    <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
                      Your Recent Bids
                    </h2>
                    <div className="space-y-3">
                      {providerBids.map((bid: ProviderBidRow) => (
                        <Link
                          key={bid.id}
                          href={`/postings/${bid.posting.id}`}
                          className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                          <div>
                            <p className="font-medium text-ocean-800">{bid.posting.title}</p>
                            <p className="text-xs text-gray-500">
                              {bid.posting.mode.replace(/_/g, " ")} &middot; {bid.posting.status}
                              {bid.isAccepted && " &middot; Accepted"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-ocean-700">
                              ${Number(bid.amountUsd).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">
                              {bid.isAccepted ? "Accepted" : bid.isWithdrawn ? "Withdrawn" : "Pending"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Browse CTA */}
                <div className="rounded-2xl bg-gradient-to-r from-ocean-600 to-sky-500 p-8 text-center">
                  <p className="text-lg font-display font-semibold text-white">
                    Find more open jobs
                  </p>
                  <Link
                    href="/browse"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-ocean-700 hover:bg-sky-50 transition"
                  >
                    Browse open jobs <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── ADMIN VIEW ── */}
        {user.role === "ADMIN" && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl bg-gradient-to-r from-ocean-700 to-sky-600 p-8 text-center">
              <p className="text-lg font-display font-semibold text-white">
                Welcome, Admin
              </p>
              <p className="mt-2 text-sm text-sky-100">
                Manage the platform from the admin dashboard.
              </p>
              <Link
                href="/admin"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-ocean-700 hover:bg-sky-50 transition"
              >
                Open Admin Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
