import type { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { ScoreGauge } from "@/components/score-gauge";
import { ScoreBars } from "@/components/score-bars";
import { CheckCircle, ArrowLeft, Star, Award, MapPin, Calendar, Briefcase, MessageSquare, Truck, Shield } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const provider = await db.provider.findUnique({
    where: { id: params.id },
    select: {
      businessName: true,
      bio: true,
      modes: true,
      totalJobs: true,
      couthActsScore: true,
      scoreTier: true,
      isVerified: true,
      user: { select: { city: true, country: true } },
    },
  });
  if (!provider) {
    return {
      title: "Provider not found \u2014 CouthActs",
      robots: { index: false, follow: false },
    };
  }
  const loc = [provider.user.city, provider.user.country].filter(Boolean).join(", ");
  const title = `${provider.businessName}${loc ? ` \u00b7 ${loc}` : ""} \u2014 verified transport provider | CouthActs`;
  const baseDesc =
    provider.bio?.slice(0, 140) ??
    `${provider.businessName} is a ${provider.isVerified ? "verified " : ""}CouthActs transport provider${loc ? ` based in ${loc}` : ""}.`;
  const description = `${baseDesc} ${provider.totalJobs.toLocaleString()} jobs completed \u00b7 CouthActs Score ${provider.couthActsScore} (${provider.scoreTier.toLowerCase()}).`;
  const url = `https://www.couthacts.com/providers/${params.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

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

  const academyCerts = await db.enrollment.findMany({
    where: { userId: provider.userId, examPassed: true },
    include: { course: { select: { title: true, category: true, level: true, slug: true } } },
    orderBy: { completedAt: "desc" },
  });

  type ProviderReview = (typeof provider.reviews)[number];
  const avgRating = provider.reviews.length > 0
    ? provider.reviews.reduce((s: number, r: ProviderReview) => s + r.rating, 0) / provider.reviews.length
    : 0;

  const memberSince = new Date(provider.user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.couthacts.com/providers/${provider.id}`,
    name: provider.businessName,
    description: provider.bio ?? undefined,
    image: provider.logoUrl ?? provider.fleetPhotoUrls[0] ?? undefined,
    url: `https://www.couthacts.com/providers/${provider.id}`,
    address: provider.user.city
      ? {
          "@type": "PostalAddress",
          addressLocality: provider.user.city,
          addressCountry: provider.user.country ?? undefined,
        }
      : undefined,
    aggregateRating:
      provider._count.reviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(avgRating.toFixed(2)),
            reviewCount: provider._count.reviews,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    serviceType: provider.modes.map((m: string) => m.replace(/_/g, " ")),
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Back link ── */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-8">
        <Link href="/browse" className="group inline-flex items-center gap-1.5 text-sm text-[#007AFF] hover:text-[#0055D4] transition-colors min-h-[44px] flex items-center">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to jobs
        </Link>
      </div>

      {/* ── Hero header ── */}
      <div className="mx-auto max-w-5xl px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden">
          <div className="px-5 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6 md:px-10 md:pt-10">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-5 sm:gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-[18px] sm:rounded-[22px] bg-gradient-to-br from-ocean-500 to-ocean-700 text-xl sm:text-2xl font-display font-bold text-white shadow-lg shadow-ocean-500/20">
                  {provider.businessName.charAt(0)}
                </div>
                {provider.isVerified && (
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                    <CheckCircle className="h-4 w-4 text-[#34C759]" />
                  </div>
                )}
              </div>

              {/* Identity */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#1D1D1F] tracking-tight">
                    {provider.businessName}
                  </h1>
                  {provider.scoreTier === "ELITE" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EEFBF1] px-2.5 py-1 text-[11px] font-semibold text-[#1B8D36]">
                      <Star className="h-3 w-3" /> Elite
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4 flex-wrap text-[13px] text-[#86868B]">
                  {provider.user.city && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {provider.user.city}{provider.user.country && `, ${provider.user.country}`}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Since {memberSince}
                  </span>
                </div>
                {provider.bio && (
                  <p className="mt-3 text-[14px] text-[#6E6E73] leading-relaxed max-w-2xl">{provider.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Stat bar ── */}
          <div className="border-t border-[#E8E8ED]/60 bg-[#FAFAFA]/50 px-5 py-4 sm:px-8 sm:py-5 md:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: provider.totalJobs, label: "Jobs Completed", icon: Briefcase },
                { value: provider._count.reviews, label: "Reviews", icon: MessageSquare },
                { value: provider.fleetSize || "\u2014", label: "Fleet Size", icon: Truck },
                { value: provider.modes.length, label: "Transport Modes", icon: Shield },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F5F7] flex-shrink-0">
                    <s.icon className="h-4 w-4 text-[#86868B]" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-bold text-[#1D1D1F] leading-tight">{s.value}</p>
                    <p className="text-[11px] text-[#86868B]">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-5">

          {/* ── Left column — Score ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 text-center">
              <ScoreGauge score={provider.couthActsScore} tier={provider.scoreTier} />
              <p className="mt-4 text-[11px] text-[#86868B]">Recalculated after every completed job</p>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-5">Performance</p>
              <ScoreBars
                completionRate={provider.completionRate}
                onTimeRate={provider.onTimeRate}
                avgRating={avgRating}
                avgResponseTime={provider.avgResponseTime}
                disputeCount={provider.disputeCount}
                isVerified={provider.isVerified}
              />
            </div>
          </div>

          {/* ── Right column — Details ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Transport modes */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Transport Modes</p>
              <div className="flex flex-wrap gap-2">
                {provider.modes.map((m: string) => (
                  <span key={m} className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]">
                    {m.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Service areas */}
            {provider.serviceArea.length > 0 && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceArea.map((a: string) => (
                    <span key={a} className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {provider.certifications.length > 0 && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {provider.certifications.map((c: string) => (
                    <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-[#EEFBF1] px-3.5 py-1.5 text-[12px] font-medium text-[#1B8D36]">
                      <CheckCircle className="h-3 w-3" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Academy Certifications */}
            {academyCerts.length > 0 && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Academy</p>
                <div className="space-y-3">
                  {academyCerts.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-4 rounded-2xl bg-[#F5F5F7]/70 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-ocean-500 to-ocean-700 text-white flex-shrink-0 shadow-sm">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#1D1D1F] truncate">{cert.course.title}</p>
                        <p className="text-[11px] text-[#86868B]">
                          {cert.course.category.replace(/_/g, " ")} &middot; Score: {cert.examScore}%
                          {cert.completedAt && ` \u00B7 ${new Date(cert.completedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                        </p>
                      </div>
                      {cert.certificateId && (
                        <a href={`/academy/certificate/${cert.certificateId}`} className="text-[12px] font-semibold text-[#007AFF] hover:text-[#0055D4] transition-colors flex-shrink-0">
                          View
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fleet photos */}
            {provider.fleetPhotoUrls.length > 0 && (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-4">Fleet & Equipment</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {provider.fleetPhotoUrls.map((url: string, i: number) => (
                    <Image key={i} src={url} alt={`Fleet ${i + 1}`} width={400} height={300} className="rounded-2xl object-cover aspect-[4/3] w-full" />
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em]">Reviews</p>
                <p className="text-[12px] text-[#86868B]">{provider._count.reviews} total</p>
              </div>
              {provider.reviews.length === 0 ? (
                <p className="text-[13px] text-[#86868B] text-center py-8">No reviews yet</p>
              ) : (
                <div className="space-y-3">
                  {provider.reviews.map((review: ProviderReview) => (
                    <div key={review.id} className="rounded-2xl bg-[#F5F5F7]/70 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#1D1D1F]">
                            {review.reviewer.firstName} {review.reviewer.lastName}
                          </p>
                          <p className="text-[11px] text-[#86868B] mt-0.5">
                            {review.booking.posting.mode.replace(/_/g, " ")} &middot; {review.booking.posting.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5"
                              fill={i < review.rating ? "#FF9500" : "none"}
                              stroke={i < review.rating ? "#FF9500" : "#D2D2D7"}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="mt-2.5 text-[13px] text-[#6E6E73] leading-relaxed">{review.comment}</p>
                      )}
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
