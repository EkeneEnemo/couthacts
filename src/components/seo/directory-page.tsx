import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SeoFooter } from "@/components/seo/corridor-page";
import type { Corridor } from "@/lib/seo/corridors";
import { ballparkUsd } from "@/lib/seo/corridors";
import type { ModeInfo } from "@/lib/seo/modes";

/**
 * Vertical directory page. Lists all curated corridors for one vertical
 * (/move, /freight, /courier), grouped by origin city for scannability.
 */
export function DirectoryPage({
  mode,
  vertical,
  corridors,
  title,
  subtitle,
  intro,
}: {
  mode: ModeInfo;
  vertical: "move" | "freight" | "courier";
  corridors: Corridor[];
  title: string;
  subtitle: string;
  intro: string;
}) {
  const byOrigin = new Map<string, Corridor[]>();
  for (const c of corridors) {
    const key = c.origin.slug;
    const list = byOrigin.get(key) ?? [];
    list.push(c);
    byOrigin.set(key, list);
  }
  const groups = Array.from(byOrigin.entries()).map(([slug, list]) => ({
    slug,
    city: list[0].origin,
    corridors: list,
  }));
  groups.sort((a, b) => a.city.name.localeCompare(b.city.name));

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                <span className="text-base leading-none">{mode.emoji}</span>
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  {subtitle}
                </span>
              </div>
              <h1 className="mt-6 font-display font-black leading-[1.05] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px]">
                {intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/postings/new?mode=${mode.enum}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03]"
                >
                  Post your {mode.label.toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/services/${mode.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  How it works
                </Link>
              </div>
            </div>

            <div className="animate-fade-up animation-delay-300 relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 aspect-[4/3] max-h-[26rem]">
                <Image
                  src={mode.image}
                  alt={mode.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/40 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-2xl shadow-md">
                  {mode.emoji}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route list, grouped by origin city */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
                {corridors.length} curated routes
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                Popular {mode.label.toLowerCase()} routes
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] text-[#1D1D1F]/55 shadow-sm">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              Don&rsquo;t see yours?{" "}
              <Link href="/browse" className="font-semibold text-[#007AFF] hover:text-[#0055D4]">
                Post it
              </Link>
            </div>
          </div>

          <div className="space-y-10">
            {groups.map((g) => (
              <div key={g.slug}>
                <h3 className="text-[15px] font-display font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#007AFF]/10 text-[13px] font-semibold text-[#007AFF]">
                    {g.city.name.charAt(0)}
                  </span>
                  From {g.city.name}
                  <span className="text-[12px] font-normal text-[#1D1D1F]/40">
                    {g.city.country}
                  </span>
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.corridors.map((c) => {
                    const p = ballparkUsd(c);
                    return (
                      <li key={c.slug}>
                        <Link
                          href={`/${vertical}/${c.slug}`}
                          className="group block rounded-[1.25rem] bg-white p-5 border border-[#1D1D1F]/5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FF7A59]">
                                {c.distanceMi.toLocaleString()} mi · {c.distanceKm.toLocaleString()} km
                              </p>
                              <p className="mt-1 text-[15px] font-display font-bold text-[#1D1D1F]">
                                {c.origin.name}
                                <span className="text-[#1D1D1F]/30"> → </span>
                                {c.destination.name}
                              </p>
                              <p className="mt-2 text-[12px] text-[#1D1D1F]/50">
                                From{" "}
                                <span className="font-semibold text-[#1D1D1F]/80">
                                  ${p.from.toLocaleString()}
                                </span>
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-[#1D1D1F]/30 group-hover:text-[#007AFF] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>

      <SeoFooter />
    </div>
  );
}
