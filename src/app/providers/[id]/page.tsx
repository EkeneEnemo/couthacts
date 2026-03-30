import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  CheckCircle,
  Star,
  MapPin,
  Truck,
  Clock,
  Shield,
  ArrowLeft,
} from "lucide-react";

export default async function ProviderProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const provider = await db.provider.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { firstName: true, lastName: true, city: true, country: true } },
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
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to marketplace
        </Link>

        {/* Header */}
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-6 sm:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-100 text-2xl font-display font-bold text-ocean-700">
              {provider.businessName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-display font-bold text-ocean-900">
                  {provider.businessName}
                </h1>
                {provider.isVerified && (
                  <CheckCircle className="h-5 w-5 text-sky-500" />
                )}
              </div>
              {provider.user.city && (
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {provider.user.city}{provider.user.country && `, ${provider.user.country}`}
                </p>
              )}
              {provider.bio && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {provider.bio}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "CouthActs Score", value: provider.couthActsScore, icon: Shield },
              { label: "Tier", value: provider.scoreTier, icon: Star },
              { label: "Total Jobs", value: provider.totalJobs, icon: Truck },
              { label: "On-Time", value: `${(provider.onTimeRate * 100).toFixed(0)}%`, icon: Clock },
              { label: "Avg Rating", value: avgRating > 0 ? `${avgRating.toFixed(1)}/5` : "N/A", icon: Star },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-display font-bold text-ocean-700">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Modes */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
              Transport Modes
            </p>
            <div className="flex flex-wrap gap-2">
              {provider.modes.map((m: string) => (
                <span
                  key={m}
                  className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-medium text-ocean-700"
                >
                  {m.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Service areas */}
          {provider.serviceArea.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
                Service Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {provider.serviceArea.map((a: string) => (
                  <span
                    key={a}
                    className="rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {provider.certifications.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {provider.certifications.map((c: string) => (
                  <span
                    key={c}
                    className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-lg font-display font-semibold text-ocean-800 mb-4">
            Reviews ({provider._count.reviews})
          </h2>
          {provider.reviews.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500">No reviews yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {provider.reviews.map((review: ProviderReview) => (
                <div
                  key={review.id}
                  className="rounded-xl bg-white p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ocean-800">
                        {review.reviewer.firstName} {review.reviewer.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {review.booking.posting.mode.replace(/_/g, " ")} &middot;{" "}
                        {review.booking.posting.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                  )}
                  {(review.onTimeScore || review.commsScore || review.conditionScore) && (
                    <div className="mt-2 flex gap-4 text-xs text-gray-500">
                      {review.onTimeScore && <span>On-time: {review.onTimeScore}/5</span>}
                      {review.commsScore && <span>Comms: {review.commsScore}/5</span>}
                      {review.conditionScore && <span>Condition: {review.conditionScore}/5</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
