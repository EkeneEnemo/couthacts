import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plane, Shield, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SeoFooter } from "@/components/seo/corridor-page";
import { AIRPORT_CORRIDORS } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Airport transfers worldwide — licensed drivers, fixed prices | CouthActs",
  description:
    "Book licensed, flight-tracked airport transfers at 40+ airports worldwide. Fixed prices, meet-and-greet, verified drivers, and escrow-safe payments.",
  alternates: { canonical: "https://www.couthacts.com/airport-transfer" },
  openGraph: {
    title: "Airport transfers worldwide | CouthActs",
    description:
      "Licensed, flight-tracked airport transfers. Fixed prices, meet-and-greet, and verified drivers at 40+ airports worldwide.",
    url: "https://www.couthacts.com/airport-transfer",
    type: "website",
  },
};

export default function AirportTransferDirectory() {
  const mode = getMode("taxi")!;

  // Group by city
  const byCity = new Map<string, typeof AIRPORT_CORRIDORS>();
  for (const c of AIRPORT_CORRIDORS) {
    const list = byCity.get(c.city.slug) ?? [];
    list.push(c);
    byCity.set(c.city.slug, list);
  }
  const groups = Array.from(byCity.entries())
    .map(([slug, list]) => ({ slug, city: list[0].city, corridors: list }))
    .sort((a, b) => a.city.name.localeCompare(b.city.name));

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                <Plane className="h-3.5 w-3.5 text-[#007AFF]" aria-hidden="true" />
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  Airport transfers · 40+ airports
                </span>
              </div>
              <h1 className="mt-6 font-display font-black leading-[1.05] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl lg:text-6xl">
                Land. Meet your driver.{" "}
                <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
                  Go.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px]">
                Licensed, flight-tracked airport transfers at 40+ airports around the world. Fixed
                prices with tolls and airport fees baked in. Zero curb panic.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/postings/new?mode=TAXI_RIDE"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03]"
                >
                  Book a transfer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services/taxi"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  How it works
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[#1D1D1F]/55">
                <li className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#007AFF]" aria-hidden="true" /> Flight-tracked
                </li>
                <li className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" /> Licensed drivers
                </li>
              </ul>
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
                  ✈️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              {groups.length} cities · {AIRPORT_CORRIDORS.length} routes
            </p>
            <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Airports we cover
            </h2>
          </div>

          <div className="space-y-10">
            {groups.map((g) => (
              <div key={g.slug}>
                <h3 className="text-[15px] font-display font-bold text-[#1D1D1F] mb-4">
                  {g.city.name}{" "}
                  <span className="text-[12px] font-normal text-[#1D1D1F]/40">
                    {g.city.country}
                  </span>
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {g.corridors.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/airport-transfer/${c.slug}`}
                        className="group block rounded-[1.25rem] bg-white p-5 border border-[#1D1D1F]/5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#007AFF]/10 text-lg">
                            ✈️
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-display font-bold text-[#1D1D1F]">
                              {c.direction === "to"
                                ? `${c.city.name} → ${c.iata}`
                                : `${c.iata} → ${c.city.name}`}
                            </p>
                            <p className="text-[11px] text-[#1D1D1F]/50 mt-0.5">
                              {c.direction === "to" ? "To airport" : "From airport"}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#1D1D1F]/30 group-hover:text-[#007AFF] group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </li>
                  ))}
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
