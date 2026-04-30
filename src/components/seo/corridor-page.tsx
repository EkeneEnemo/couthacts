import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Shield, Star, MapPin, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/logo";
import { NearbyProviders } from "@/components/nearby-providers";
import type { Corridor } from "@/lib/seo/corridors";
import { ballparkUsd, findSimilarCorridors } from "@/lib/seo/corridors";
import type { ModeInfo } from "@/lib/seo/modes";

/**
 * Shared corridor landing page used by /move, /freight, and /courier verticals.
 * All three share a common visual grammar — hero with origin → destination,
 * price band, trust row, "what's included" list, similar-corridor grid, FAQ.
 */
export function CorridorPage({
  corridor,
  mode,
  vertical,
  heroLabel,
  pricingLabel,
  inclusions,
  faqs,
}: {
  corridor: Corridor;
  mode: ModeInfo;
  vertical: "move" | "freight" | "courier";
  heroLabel: string;
  pricingLabel: string;
  inclusions: Array<{ title: string; desc: string; emoji: string }>;
  faqs: Array<{ q: string; a: string }>;
}) {
  const { from, to } = ballparkUsd(corridor);
  const similar = findSimilarCorridors(corridor);
  const tagline = `${mode.label} · ${corridor.distanceMi.toLocaleString()} mi · ${corridor.distanceKm.toLocaleString()} km`;
  const originLabel = corridor.origin.region
    ? `${corridor.origin.name}, ${corridor.origin.region}`
    : `${corridor.origin.name}, ${corridor.origin.country}`;
  const destLabel = corridor.destination.region
    ? `${corridor.destination.name}, ${corridor.destination.region}`
    : `${corridor.destination.name}, ${corridor.destination.country}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${mode.label} from ${corridor.origin.name} to ${corridor.destination.name}`,
        description: `${mode.label} services between ${originLabel} and ${destLabel} with escrow-protected payments, live tracking, and verified providers.`,
        provider: {
          "@type": "Organization",
          name: "CouthActs",
          legalName: "CouthActs, Inc.",
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
        areaServed: [
          { "@type": "City", name: corridor.origin.name, addressCountry: corridor.origin.countryCode },
          { "@type": "City", name: corridor.destination.name, addressCountry: corridor.destination.countryCode },
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: from,
          highPrice: to,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.couthacts.com/" },
          { "@type": "ListItem", position: 2, name: mode.label, item: `https://www.couthacts.com/services/${mode.slug}` },
          {
            "@type": "ListItem",
            position: 3,
            name: `${corridor.origin.name} → ${corridor.destination.name}`,
            item: `https://www.couthacts.com/${vertical}/${corridor.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-[12px] text-[#1D1D1F]/55">
              <li>
                <Link href="/" className="hover:text-[#007AFF]">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/services/${mode.slug}`} className="hover:text-[#007AFF]">
                  {mode.label}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#1D1D1F]/80 font-medium">
                {corridor.origin.name} → {corridor.destination.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                <span className="text-base leading-none">{mode.emoji}</span>
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  {tagline}
                </span>
              </div>

              <h1 className="mt-6 font-display font-black leading-[1.05] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl lg:text-6xl">
                {heroLabel}
                <br />
                <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
                  {corridor.origin.name}
                </span>{" "}
                to{" "}
                <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#FFB020] bg-clip-text text-transparent">
                  {corridor.destination.name}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px]">
                Verified {mode.label.toLowerCase()} providers compete for your move from{" "}
                <span className="font-semibold text-[#1D1D1F]/80">{originLabel}</span> to{" "}
                <span className="font-semibold text-[#1D1D1F]/80">{destLabel}</span>. Pay into
                escrow; release when your stuff lands safely.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="rounded-3xl bg-white/85 backdrop-blur border border-white px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                    {pricingLabel}
                  </p>
                  <p className="mt-1 text-2xl font-display font-black text-[#1D1D1F] tabular-nums">
                    ${from.toLocaleString()}
                    <span className="text-base font-normal text-[#1D1D1F]/50"> – ${to.toLocaleString()}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#1D1D1F]/50">
                    Ballpark only. Real quotes from verified providers.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/postings/new?mode=${mode.enum}&origin=${encodeURIComponent(
                    originLabel,
                  )}&destination=${encodeURIComponent(destLabel)}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Get real quotes
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={`/browse?mode=${mode.enum}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  Browse similar moves
                </Link>
              </div>

              <dl className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[#1D1D1F]/55">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" />
                  Escrow-safe
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#007AFF]" aria-hidden="true" />
                  Quotes in minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-[#FFB020]" aria-hidden="true" />
                  ID-verified providers
                </span>
              </dl>

              <div className="mt-6">
                <NearbyProviders mode={mode.enum} city={corridor.origin.name} country={corridor.origin.countryCode} />
              </div>
            </div>

            <div className="animate-fade-up animation-delay-300 relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 aspect-[4/5] max-h-[32rem]">
                <Image
                  src={mode.image}
                  alt={mode.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/60 via-[#1D1D1F]/10 to-transparent" />

                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-2xl shadow-md">
                  {mode.emoji}
                </div>

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#007AFF] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7A59]">
                        Route
                      </p>
                      <p className="mt-0.5 text-[14px] font-display font-bold text-[#1D1D1F]">
                        {corridor.origin.name} → {corridor.destination.name}
                      </p>
                      <p className="text-[11px] text-[#1D1D1F]/50">
                        {corridor.distanceMi.toLocaleString()} mi · {corridor.distanceKm.toLocaleString()} km
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              What you get
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Every {mode.label.toLowerCase()} job, covered the same way.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inclusions.map((i) => (
              <div
                key={i.title}
                className="rounded-[1.5rem] bg-[#FFFBF5] p-6 border border-[#1D1D1F]/5 transition-all hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                  {i.emoji}
                </span>
                <h3 className="mt-4 text-[15px] font-display font-bold text-[#1D1D1F]">
                  {i.title}
                </h3>
                <p className="mt-1.5 text-[13px] text-[#1D1D1F]/55 leading-relaxed">
                  {i.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — compact 4-step */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-[#FFFBF5] to-[#FFF1E3]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              The {corridor.origin.name} → {corridor.destination.name} flow
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Four steps. You&rsquo;re done.
            </h2>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Post the job", desc: "Tell us what's moving, where, and when.", emoji: "💬", color: "#FF7A59" },
              { num: "02", title: "Compare bids", desc: "Verified providers on this route compete for your move.", emoji: "👋", color: "#007AFF" },
              { num: "03", title: "Pay into escrow", desc: "Funds are held safely until delivery.", emoji: "🔒", color: "#34C759" },
              { num: "04", title: "Track and release", desc: "Watch it happen. Release funds when it lands.", emoji: "📍", color: "#FF6B9D" },
            ].map((s) => (
              <li
                key={s.num}
                className="group relative rounded-[2rem] bg-white p-7 shadow-[0_4px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: s.color }}
                  >
                    Step {s.num}
                  </span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[10deg]"
                    style={{ backgroundColor: `${s.color}18` }}
                  >
                    {s.emoji}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/55 leading-relaxed">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Similar corridors */}
      {similar.length > 0 && (
        <section className="bg-[#FFFBF5]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">
                  Also popular
                </p>
                <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                  Other {mode.label.toLowerCase()} routes
                </h2>
              </div>
              <Link
                href={`/${vertical}`}
                className="text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] inline-flex items-center gap-1"
              >
                See all routes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((c) => {
                const p = ballparkUsd(c);
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/${vertical}/${c.slug}`}
                      className="group block rounded-[1.5rem] bg-white p-6 border border-[#1D1D1F]/5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)] hover:-translate-y-1"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FF7A59]">
                        {c.distanceMi.toLocaleString()} mi
                      </p>
                      <p className="mt-2 text-[17px] font-display font-bold text-[#1D1D1F]">
                        {c.origin.name}
                        <span className="text-[#1D1D1F]/30"> → </span>
                        {c.destination.name}
                      </p>
                      <p className="mt-4 text-[12px] text-[#1D1D1F]/50">
                        From{" "}
                        <span className="font-semibold text-[#1D1D1F]/80">
                          ${p.from.toLocaleString()}
                        </span>
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity">
                        See this route <ArrowRight className="h-3 w-3" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Common questions
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Quick answers, the {corridor.origin.name} edition.
            </h2>
          </div>

          <dl className="mt-12 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-[1.25rem] border border-[#1D1D1F]/8 bg-[#FFFBF5] p-5 transition-colors open:bg-white open:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-[15px] font-semibold text-[#1D1D1F] list-none">
                  {f.q}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#1D1D1F]/10 text-[#1D1D1F]/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] text-[#1D1D1F]/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#FFD8B5]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#B5E3FF]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-1.5 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" />
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70">
              Free to post. Pay only when booked.
            </span>
          </div>

          <h2 className="mt-8 text-4xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-5xl">
            Ready to move from
            <br />
            <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
              {corridor.origin.name}
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#FFB020] bg-clip-text text-transparent">
              {corridor.destination.name}
            </span>
            ?
          </h2>

          <p className="mt-6 text-[16px] text-[#1D1D1F]/55 mx-auto max-w-xl">
            Post in under two minutes. Real quotes in an hour. Money held safely until your stuff
            lands.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/postings/new?mode=${mode.enum}&origin=${encodeURIComponent(
                originLabel,
              )}&destination=${encodeURIComponent(destLabel)}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] sm:w-auto"
            >
              Post this move
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/services/${mode.slug}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              Learn about {mode.label}
            </Link>
          </div>
        </div>
      </section>

      </main>

      <SeoFooter />
    </div>
  );
}

export function SeoFooter() {
  return (
    <footer className="bg-[#1D1D1F]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo size="md" variant="white" href="/" />
          <p className="text-[13px] text-white/40 max-w-md">
            The friendliest way to move anything, anywhere. 18 modes, 190+ countries, escrow-safe
            and real-human.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/50">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/safety" className="hover:text-white">Safety</Link>
            <Link href="/help" className="hover:text-white">Help</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
          <div className="pt-4 border-t border-white/10 w-full space-y-2 text-center">
            <p className="text-[11px] text-white/30 leading-relaxed">
              &copy; {new Date().getFullYear()} CouthActs&#8482;, Inc., a Texas corporation. A wholly owned subsidiary of The Ravine of Willows, Inc., also a Texas corporation. All intellectual property wholly owned by Enemo Consulting Group, Inc.&reg;
            </p>
            <p className="text-[10px] text-white/25 leading-relaxed">
              The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202 &middot; legal@couthacts.com
            </p>
            <p className="text-[10px] text-white/25 leading-relaxed">
              CouthActs&#8482; is a trademark of Enemo Consulting Group, Inc.&reg; All other trademarks, service marks, and logos used in connection with the CouthActs service are owned by Enemo Consulting Group, Inc.&reg; and used by CouthActs&#8482;, Inc. under license.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
