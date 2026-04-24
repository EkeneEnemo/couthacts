import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { SeoFooter } from "@/components/seo/corridor-page";
import { CheckCircle, MapPin, Star, Briefcase, ArrowRight } from "lucide-react";

export const revalidate = 300; // 5 min

export const metadata: Metadata = {
  title: "Verified transport providers worldwide | CouthActs",
  description:
    "Browse thousands of verified, ID-checked transport providers. Movers, couriers, freight carriers, pilots, captains, and specialty operators. See ratings, jobs completed, and CouthActs Score before you book.",
  alternates: { canonical: "https://www.couthacts.com/providers" },
  openGraph: {
    title: "Verified transport providers worldwide | CouthActs",
    description:
      "Thousands of verified, ID-checked transport providers. Ratings, completed jobs, and CouthActs Score on every profile.",
    url: "https://www.couthacts.com/providers",
    type: "website",
  },
};

const TIER_ACCENT: Record<string, string> = {
  ELITE: "#34C759",
  TRUSTED: "#007AFF",
  ESTABLISHED: "#FFB020",
  PROBATION: "#FF7A59",
};

export default async function ProvidersDirectory() {
  const providers = await db.provider.findMany({
    where: { isVerified: true },
    orderBy: [{ couthActsScore: "desc" }, { totalJobs: "desc" }],
    take: 60,
    include: {
      user: { select: { city: true, country: true } },
      _count: { select: { reviews: true } },
    },
  });

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
        <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" />
          <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <CheckCircle className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" />
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                Verified providers · ID-checked
              </span>
            </div>

            <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl">
              Real people,
              <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
                moving real stuff.
              </span>
            </h1>
            <p className="mt-6 text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px] max-w-xl mx-auto">
              Every provider on CouthActs passes a government-ID check, a business verification
              (where applicable), and an insurance review before they can take a job.
            </p>
          </div>
        </section>

        <section className="bg-[#FFFBF5]">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
                  Top providers right now
                </p>
                <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                  Ranked by CouthActs Score
                </h2>
              </div>
            </div>

            {providers.length === 0 ? (
              <p className="text-[13px] text-[#1D1D1F]/50">
                No verified providers yet. Check back shortly.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {providers.map((p) => {
                  const loc = [p.user.city, p.user.country].filter(Boolean).join(", ");
                  const accent = TIER_ACCENT[p.scoreTier] ?? "#007AFF";
                  return (
                    <li key={p.id}>
                      <Link
                        href={`/providers/${p.id}`}
                        className="group block rounded-[1.5rem] bg-white p-6 border border-[#1D1D1F]/5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)] hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-[17px] font-display font-bold text-white shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${accent}, #0F2440)` }}
                            aria-hidden="true"
                          >
                            {p.businessName.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-[15px] font-display font-bold text-[#1D1D1F] truncate">
                                {p.businessName}
                              </p>
                              <CheckCircle className="h-3.5 w-3.5 text-[#34C759] flex-shrink-0" aria-label="Verified" />
                            </div>
                            {loc && (
                              <p className="mt-0.5 text-[12px] text-[#1D1D1F]/50 flex items-center gap-1">
                                <MapPin className="h-3 w-3" aria-hidden="true" />
                                {loc}
                              </p>
                            )}
                          </div>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{ backgroundColor: `${accent}18`, color: accent }}
                          >
                            {p.scoreTier.toLowerCase()}
                          </span>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-2">
                          <div className="rounded-xl bg-[#FFFBF5] p-2.5 text-center">
                            <p className="text-[16px] font-display font-black text-[#1D1D1F] tabular-nums">
                              {p.couthActsScore}
                            </p>
                            <p className="text-[9px] font-semibold text-[#1D1D1F]/50 uppercase tracking-wider">
                              Score
                            </p>
                          </div>
                          <div className="rounded-xl bg-[#FFFBF5] p-2.5 text-center">
                            <p className="text-[16px] font-display font-black text-[#1D1D1F] tabular-nums">
                              {p.totalJobs}
                            </p>
                            <p className="text-[9px] font-semibold text-[#1D1D1F]/50 uppercase tracking-wider">
                              Jobs
                            </p>
                          </div>
                          <div className="rounded-xl bg-[#FFFBF5] p-2.5 text-center">
                            <p className="text-[16px] font-display font-black text-[#1D1D1F] tabular-nums">
                              {p._count.reviews}
                            </p>
                            <p className="text-[9px] font-semibold text-[#1D1D1F]/50 uppercase tracking-wider">
                              Reviews
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[12px]">
                          <div className="flex items-center gap-1 text-[#1D1D1F]/55">
                            <Briefcase className="h-3 w-3" aria-hidden="true" />
                            {p.modes.length} mode{p.modes.length === 1 ? "" : "s"}
                          </div>
                          <div className="flex items-center gap-1 text-[#1D1D1F]/55">
                            <Star className="h-3 w-3 text-[#FFB020]" aria-hidden="true" />
                            {Number((p.onTimeRate ?? 0) * 100).toFixed(0)}% on time
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-[#1D1D1F]/30 group-hover:text-[#007AFF] group-hover:translate-x-1 transition-all" aria-hidden="true" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>

      <SeoFooter />
    </div>
  );
}
