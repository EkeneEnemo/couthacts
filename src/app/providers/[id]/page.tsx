import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ScoreGauge } from "@/components/score-gauge";
import { ScoreBars } from "@/components/score-bars";
import { CheckCircle, ArrowLeft, Star } from "lucide-react";

export default async function ProviderProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const provider = await db.provider.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { firstName: true, lastName: true, city: true, country: true, createdAt: true } },
      reviews: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          reviewer: { select: { firstName: true, lastName: true } },
          booking: { select: { posting: { select: { mode: true, title: true } } } },
        },
      },
      _count: { select: { reviews: true, bookings: true } },
    },
  });

  if (!provider) notFound();

  type ProviderReview = (typeof provider.reviews)[number];
  const avgRating = provider.reviews.length > 0
    ? provider.reviews.reduce((s: number, r: ProviderReview) => s + r.rating, 0) / provider.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/browse" className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-700 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to jobs
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column — Score + identity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Score gauge */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center">
              <ScoreGauge score={provider.couthActsScore} tier={provider.scoreTier} />
              <p className="mt-3 text-xs text-gray-400">Score recalculated after every completed job</p>
            </div>

            {/* Sub-scores */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-ocean-800 mb-4">Performance Breakdown</p>
              <ScoreBars
                completionRate={provider.completionRate}
                onTimeRate={provider.onTimeRate}
                avgRating={avgRating}
                avgResponseTime={provider.avgResponseTime}
                disputeCount={provider.disputeCount}
                isVerified={provider.isVerified}
              />
            </div>

            {/* Quick stats */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xl font-display font-bold text-ocean-700">{provider.totalJobs}</p>
                  <p className="text-xs text-gray-500">Jobs completed</p>
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-ocean-700">{provider._count.reviews}</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-ocean-700">{provider.fleetSize || "—"}</p>
                  <p className="text-xs text-gray-500">Fleet size</p>
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-ocean-700">{provider.modes.length}</p>
                  <p className="text-xs text-gray-500">Active modes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Profile info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-100 text-xl font-display font-bold text-ocean-700 flex-shrink-0">
                  {provider.businessName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-display font-bold text-ocean-900">{provider.businessName}</h1>
                    {provider.isVerified && <CheckCircle className="h-5 w-5 text-sky-500" />}
                    {provider.scoreTier === "ELITE" && (
                      <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 flex items-center gap-1">
                        <Star className="h-3 w-3" /> ELITE
                      </span>
                    )}
                  </div>
                  {provider.user.city && (
                    <p className="mt-1 text-sm text-gray-500">
                      {provider.user.city}{provider.user.country && `, ${provider.user.country}`}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Member since {new Date(provider.user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              {provider.bio && (
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{provider.bio}</p>
              )}
            </div>

            {/* Transport modes */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">Transport Modes</p>
              <div className="flex flex-wrap gap-2">
                {provider.modes.map((m: string) => (
                  <span key={m} className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-medium text-ocean-700">{m.replace(/_/g, " ")}</span>
                ))}
              </div>
            </div>

            {/* Service areas */}
            {provider.serviceArea.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceArea.map((a: string) => (
                    <span key={a} className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {provider.certifications.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {provider.certifications.map((c: string) => (
                    <span key={c} className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Fleet photos */}
            {provider.fleetPhotoUrls.length > 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">Fleet & Equipment</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {provider.fleetPhotoUrls.map((url: string, i: number) => (
                    <img key={i} src={url} alt={`Fleet ${i + 1}`} className="rounded-xl object-cover aspect-[4/3] w-full" />
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-ocean-800 mb-4">Reviews ({provider._count.reviews})</p>
              {provider.reviews.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No reviews yet</p>
              ) : (
                <div className="space-y-3">
                  {provider.reviews.map((review: ProviderReview) => (
                    <div key={review.id} className="rounded-xl bg-cream-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-ocean-800">
                            {review.reviewer.firstName} {review.reviewer.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {review.booking.posting.mode.replace(/_/g, " ")} &middot; {review.booking.posting.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "" : "text-gray-300"}>★</span>
                          ))}
                        </div>
                      </div>
                      {review.comment && <p className="mt-2 text-sm text-gray-600">{review.comment}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
