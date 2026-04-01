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
  Briefcase,
  Star,
} from "lucide-react";
import { ScoreWidget } from "@/components/score-gauge";
import { ScoreBars } from "@/components/score-bars";

const STATUS_STYLES: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  OPEN:        { icon: Clock,       color: "text-[#007AFF]", bg: "bg-[#EDF4FF]" },
  BIDDING:     { icon: Package,     color: "text-[#5856D6]", bg: "bg-[#F0EFFF]" },
  MATCHED:     { icon: CheckCircle, color: "text-[#34C759]", bg: "bg-[#EEFBF1]" },
  IN_PROGRESS: { icon: Truck,       color: "text-[#007AFF]", bg: "bg-[#EDF4FF]" },
  COMPLETED:   { icon: CheckCircle, color: "text-[#34C759]", bg: "bg-[#EEFBF1]" },
  DISPUTED:    { icon: AlertCircle, color: "text-[#FF3B30]", bg: "bg-[#FFF1F0]" },
  CANCELLED:   { icon: AlertCircle, color: "text-[#8E8E93]", bg: "bg-[#F5F5F7]" },
  EXPIRED:     { icon: Clock,       color: "text-[#8E8E93]", bg: "bg-[#F5F5F7]" },
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
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-[#E8E8ED]/60 bg-[#F5F5F7]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Logo size="sm" />
          <div className="flex items-center gap-3 sm:gap-4">
            {user.role === "PROVIDER" && (
              <Link href="/browse" className="hidden sm:block text-[13px] font-medium text-[#007AFF] hover:text-[#0055D4] transition-colors">
                Browse Jobs
              </Link>
            )}
            <span className="hidden sm:inline text-[13px] text-[#6E6E73]">
              {user.firstName} {user.lastName}
            </span>
            <span className="rounded-full bg-[#E8E8ED] px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-[#6E6E73]">
              {user.role}
            </span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1D1F] tracking-tight">Dashboard</h1>
            <p className="mt-1 text-[13px] text-[#86868B]">
              {user.role === "PROVIDER" ? "Your performance at a glance" : "Manage your shipments"}
            </p>
          </div>
          {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
            <Link
              href="/postings/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.97] transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Post a job
            </Link>
          )}
        </div>

        {/* ── CUSTOMER VIEW ── */}
        {(user.role === "CUSTOMER" || user.role === "ADMIN") && (
          <div className="mt-10 space-y-10">
            {/* Postings */}
            <section>
              <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                Your Postings
              </h2>
              {postings.length === 0 ? (
                <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-16 text-center shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F5F7] mx-auto">
                    <Package className="h-7 w-7 text-[#C7C7CC]" />
                  </div>
                  <p className="mt-4 text-[15px] text-[#86868B]">No postings yet</p>
                  <Link
                    href="/postings/new"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] transition-colors"
                  >
                    Post your first job <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {postings.map((p: PostingRow) => {
                    const style = STATUS_STYLES[p.status] || STATUS_STYLES.OPEN;
                    const Icon = style.icon;
                    return (
                      <Link
                        key={p.id}
                        href={`/postings/${p.id}`}
                        className="group flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_1px_8px_rgba(0,0,0,.03)] border border-white/60 hover:shadow-[0_4px_20px_rgba(0,0,0,.06)] transition-all min-h-[44px]"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-[14px] ${style.bg}`}>
                            <Icon className={`h-4.5 w-4.5 ${style.color}`} />
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{p.title}</p>
                            <p className="text-[12px] text-[#86868B] mt-0.5">
                              {p.mode.replace(/_/g, " ")} &middot;{" "}
                              {format(p.createdAt, "MMM d, yyyy")} &middot;{" "}
                              {p._count.bids} bid{p._count.bids !== 1 && "s"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[14px] font-semibold text-[#1D1D1F] tabular-nums">
                            ${Number(p.budgetUsd).toLocaleString()}
                          </p>
                          <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.color}`}>
                            {p.status.replace(/_/g, " ")}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Bookings */}
            {customerBookings.length > 0 && (
              <section>
                <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                  Your Bookings
                </h2>
                <div className="space-y-2">
                  {customerBookings.map((b: CustomerBookingRow) => (
                    <Link
                      key={b.id}
                      href={`/bookings/${b.id}`}
                      className="group flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_1px_8px_rgba(0,0,0,.03)] border border-white/60 hover:shadow-[0_4px_20px_rgba(0,0,0,.06)] transition-all min-h-[44px]"
                    >
                      <div>
                        <p className="text-[14px] font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{b.posting.title}</p>
                        <p className="text-[12px] text-[#86868B] mt-0.5">
                          {b.posting.mode.replace(/_/g, " ")} &middot; {b.provider.businessName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-semibold text-[#1D1D1F] tabular-nums">
                          ${Number(b.agreedAmountUsd).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          <span className="text-[11px] text-[#86868B]">{b.status.replace(/_/g, " ")}</span>
                          {b.escrow && (
                            <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${
                              b.escrow.status === "HOLDING" ? "bg-[#FFF3E0] text-[#FF9500]" :
                              b.escrow.status === "RELEASED" ? "bg-[#EEFBF1] text-[#34C759]" :
                              "bg-[#F5F5F7] text-[#86868B]"
                            }`}>
                              {b.escrow.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── PROVIDER VIEW ── */}
        {user.role === "PROVIDER" && (
          <div className="mt-10 space-y-10">
            {!provider ? (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-16 text-center shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <p className="text-[15px] text-[#86868B]">You haven&apos;t completed provider onboarding yet.</p>
                <Link
                  href="/onboarding"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] transition-colors"
                >
                  Complete onboarding <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <>
                {/* Score + Performance */}
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
                  <div className="space-y-6">
                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Total Jobs", value: provider.totalJobs, icon: Briefcase },
                        { label: "On-Time Rate", value: `${(provider.onTimeRate * 100).toFixed(0)}%`, icon: Clock },
                        { label: "Completion", value: `${(provider.completionRate * 100).toFixed(0)}%`, icon: CheckCircle },
                        { label: "Reviews", value: provider.reviews.length, icon: Star },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F5F7]">
                              <stat.icon className="h-4 w-4 text-[#86868B]" />
                            </div>
                            <div>
                              <p className="text-xl font-display font-bold text-[#1D1D1F]">{stat.value}</p>
                              <p className="text-[10px] text-[#86868B] uppercase tracking-wider">{stat.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Performance breakdown */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                      <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Performance</p>
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
                  <div className="rounded-3xl bg-[#FFF3E0] border border-[#FFE0B2] p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[14px] font-semibold text-[#E65100]">Business verification required</p>
                        <p className="text-[12px] text-[#FF9500] mt-1">
                          You cannot bid on opportunities until your business is verified by CouthActs&#8482; team.
                        </p>
                      </div>
                      <Link
                        href="/verify-business"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FF9500] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#E68600] transition-colors shadow-sm flex-shrink-0"
                      >
                        Verify Business
                      </Link>
                    </div>
                  </div>
                )}

                {/* Active Bookings */}
                {providerBookings.length > 0 && (
                  <section>
                    <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                      Your Bookings
                    </h2>
                    <div className="space-y-2">
                      {providerBookings.map((b: ProviderBookingRow) => (
                        <Link
                          key={b.id}
                          href={`/bookings/${b.id}`}
                          className="group flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_1px_8px_rgba(0,0,0,.03)] border border-white/60 hover:shadow-[0_4px_20px_rgba(0,0,0,.06)] transition-all min-h-[44px]"
                        >
                          <div>
                            <p className="text-[14px] font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{b.posting.title}</p>
                            <p className="text-[12px] text-[#86868B] mt-0.5">
                              {b.posting.mode.replace(/_/g, " ")} &middot;{" "}
                              {b.customer.firstName} {b.customer.lastName}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[14px] font-semibold text-[#1D1D1F] tabular-nums">
                              ${Number(b.agreedAmountUsd).toLocaleString()}
                            </p>
                            <span className="text-[11px] text-[#86868B]">{b.status.replace(/_/g, " ")}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Recent Bids */}
                {providerBids.length > 0 && (
                  <section>
                    <h2 className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">
                      Recent Bids
                    </h2>
                    <div className="space-y-2">
                      {providerBids.map((bid: ProviderBidRow) => (
                        <Link
                          key={bid.id}
                          href={`/postings/${bid.posting.id}`}
                          className="group flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_1px_8px_rgba(0,0,0,.03)] border border-white/60 hover:shadow-[0_4px_20px_rgba(0,0,0,.06)] transition-all min-h-[44px]"
                        >
                          <div>
                            <p className="text-[14px] font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{bid.posting.title}</p>
                            <p className="text-[12px] text-[#86868B] mt-0.5">
                              {bid.posting.mode.replace(/_/g, " ")} &middot; {bid.posting.status.replace(/_/g, " ")}
                              {bid.isAccepted && " \u00B7 Accepted"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[14px] font-semibold text-[#1D1D1F] tabular-nums">
                              ${Number(bid.amountUsd).toLocaleString()}
                            </p>
                            <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              bid.isAccepted ? "bg-[#EEFBF1] text-[#34C759]" :
                              bid.isWithdrawn ? "bg-[#F5F5F7] text-[#86868B]" :
                              "bg-[#EDF4FF] text-[#007AFF]"
                            }`}>
                              {bid.isAccepted ? "Accepted" : bid.isWithdrawn ? "Withdrawn" : "Pending"}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Browse CTA */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1D1D1F] to-[#2C2C2E] p-10 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,.15),transparent_70%)]" />
                  <div className="relative">
                    <p className="text-xl font-display font-bold text-white tracking-tight">
                      Find your next opportunity
                    </p>
                    <p className="mt-2 text-[13px] text-[#A1A1A6]">
                      Browse open jobs matching your transport modes
                    </p>
                    <Link
                      href="/browse"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.98] transition-all shadow-lg shadow-[#007AFF]/25"
                    >
                      Browse open jobs <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── ADMIN VIEW ── */}
        {user.role === "ADMIN" && (
          <div className="mt-10 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1D1D1F] to-[#2C2C2E] p-10 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,.15),transparent_70%)]" />
              <div className="relative">
                <p className="text-xl font-display font-bold text-white tracking-tight">
                  Welcome, Admin
                </p>
                <p className="mt-2 text-[13px] text-[#A1A1A6]">
                  Manage the platform from the admin dashboard.
                </p>
                <Link
                  href="/admin"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition-colors shadow-lg shadow-[#007AFF]/25"
                >
                  Open Admin Dashboard <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
