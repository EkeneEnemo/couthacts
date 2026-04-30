import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Shield, Clock, Star, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SeoFooter } from "@/components/seo/corridor-page";
import { getMode, listModes } from "@/lib/seo/modes";
import {
  MOVING_CORRIDORS,
  FREIGHT_CORRIDORS,
  COURIER_CORRIDORS,
  AIRPORT_CORRIDORS,
  ballparkUsd,
} from "@/lib/seo/corridors";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return listModes().map((m) => ({ mode: m.slug }));
}

export function generateMetadata({ params }: { params: { mode: string } }): Metadata {
  const m = getMode(params.mode);
  if (!m) return { title: "Service not found — CouthActs" };
  const title = `${m.label} — book verified providers worldwide | CouthActs`;
  const description = `${m.description} Escrow-safe payments, live tracking, and real-human support. Book from 190+ countries.`;
  const url = `https://www.couthacts.com/services/${m.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: m.image ? [{ url: m.image, alt: m.imageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Map a mode slug to the vertical route (if any) for corridor cross-linking.
function corridorVerticalFor(mode: string): "move" | "freight" | "courier" | "airport-transfer" | null {
  if (mode === "moving") return "move";
  if (mode === "freight") return "freight";
  if (mode === "courier") return "courier";
  if (mode === "taxi") return "airport-transfer";
  return null;
}

export default function ModePage({ params }: { params: { mode: string } }) {
  const mode = getMode(params.mode);
  if (!mode) notFound();

  const vertical = corridorVerticalFor(mode.slug);
  let topCorridors: Array<{ slug: string; label: string; priceFrom?: number; distanceMi?: number; href: string }> = [];
  if (vertical === "move") {
    topCorridors = MOVING_CORRIDORS.slice(0, 8).map((c) => ({
      slug: c.slug,
      label: `${c.origin.name} → ${c.destination.name}`,
      priceFrom: ballparkUsd(c).from,
      distanceMi: c.distanceMi,
      href: `/move/${c.slug}`,
    }));
  } else if (vertical === "freight") {
    topCorridors = FREIGHT_CORRIDORS.slice(0, 8).map((c) => ({
      slug: c.slug,
      label: `${c.origin.name} → ${c.destination.name}`,
      priceFrom: ballparkUsd(c).from,
      distanceMi: c.distanceMi,
      href: `/freight/${c.slug}`,
    }));
  } else if (vertical === "courier") {
    topCorridors = COURIER_CORRIDORS.slice(0, 8).map((c) => ({
      slug: c.slug,
      label: `${c.origin.name} → ${c.destination.name}`,
      priceFrom: ballparkUsd(c).from,
      distanceMi: c.distanceMi,
      href: `/courier/${c.slug}`,
    }));
  } else if (vertical === "airport-transfer") {
    topCorridors = AIRPORT_CORRIDORS.slice(0, 8).map((c) => ({
      slug: c.slug,
      label: c.direction === "to" ? `${c.city.name} → ${c.iata}` : `${c.iata} → ${c.city.name}`,
      href: `/airport-transfer/${c.slug}`,
    }));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: mode.label,
    serviceType: mode.label,
    description: mode.description,
    provider: {
      "@type": "Organization",
      name: "CouthActs",
      legalName: "The Ravine of Willows, Inc.",
      url: "https://www.couthacts.com",
      parentOrganization: {
        "@type": "Organization",
        name: "The Ravine of Willows, Inc.",
        legalName: "The Ravine of Willows, Inc.",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "The Adolphus Tower, 1412 Main Street, STE 609",
        addressLocality: "Dallas",
        addressRegion: "TX",
        postalCode: "75202",
        addressCountry: "US",
      },
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ backgroundColor: `${mode.accent}40` }}
        />
        <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-[12px] text-[#1D1D1F]/55">
              <li>
                <Link href="/" className="hover:text-[#007AFF]">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/services" className="hover:text-[#007AFF]">Services</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#1D1D1F]/80 font-medium">{mode.label}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm"
              >
                <span className="text-base leading-none">{mode.emoji}</span>
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  {mode.tagline}
                </span>
              </div>

              <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl">
                {mode.label}
              </h1>

              <p className="mt-6 max-w-xl text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px]">
                {mode.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/postings/new?mode=${mode.enum}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03]"
                >
                  Post a {mode.label.toLowerCase()} job
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/browse?mode=${mode.enum}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  Browse jobs
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[#1D1D1F]/55">
                <li className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" /> Escrow-safe
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#007AFF]" aria-hidden="true" /> Real-time tracking
                </li>
                <li className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-[#FFB020]" aria-hidden="true" /> ID-verified providers
                </li>
              </ul>
            </div>

            <div className="animate-fade-up animation-delay-300 relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 aspect-[4/5] max-h-[36rem]">
                <Image
                  src={mode.image}
                  alt={mode.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/55 via-[#1D1D1F]/10 to-transparent" />
                <div className="absolute top-5 right-5 h-14 w-14 flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-3xl shadow-md">
                  {mode.emoji}
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-lg">
                  <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: mode.accent }}>
                    Typical use
                  </p>
                  <p className="mt-1 text-[13px] text-[#1D1D1F]/75">
                    {mode.useCases.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              What people move
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Built for the real stuff.
            </h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mode.useCases.map((uc) => (
              <li
                key={uc}
                className="rounded-[1.5rem] bg-[#FFFBF5] p-6 border border-[#1D1D1F]/5 transition-all hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <CheckCircle2 className="h-5 w-5" style={{ color: mode.accent }} aria-hidden="true" />
                <p className="mt-3 text-[15px] font-display font-bold text-[#1D1D1F]">{uc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Top routes (if vertical supports corridor pages) */}
      {topCorridors.length > 0 && (
        <section className="bg-[#FFFBF5]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                  Popular routes
                </p>
                <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                  Where people are moving
                </h2>
              </div>
              {vertical && (
                <Link
                  href={`/${vertical}`}
                  className="text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] inline-flex items-center gap-1"
                >
                  All routes <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topCorridors.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="group block rounded-[1.25rem] bg-white p-5 border border-[#1D1D1F]/5 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5"
                  >
                    {c.distanceMi != null && (
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FF7A59]">
                        {c.distanceMi.toLocaleString()} mi
                      </p>
                    )}
                    <p className="mt-1 text-[15px] font-display font-bold text-[#1D1D1F]">{c.label}</p>
                    {c.priceFrom != null && (
                      <p className="mt-2 text-[12px] text-[#1D1D1F]/50">
                        From{" "}
                        <span className="font-semibold text-[#1D1D1F]/80">
                          ${c.priceFrom.toLocaleString()}
                        </span>
                      </p>
                    )}
                    <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity">
                      See this route <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#FFD8B5]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#B5E3FF]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24 text-center">
          <h2 className="text-4xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-5xl">
            Ready for{" "}
            <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
              {mode.label.toLowerCase()}
            </span>
            ?
          </h2>
          <p className="mt-6 text-[16px] text-[#1D1D1F]/55 mx-auto max-w-xl">
            Post once. Verified providers bid. Pay into escrow. Watch it happen.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/postings/new?mode=${mode.enum}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] sm:w-auto"
            >
              Post a job
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              See all services
            </Link>
          </div>
        </div>
      </section>

      </main>

      <SeoFooter />
    </div>
  );
}
