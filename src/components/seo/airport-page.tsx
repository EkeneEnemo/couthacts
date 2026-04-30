import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Shield, Plane, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SeoFooter } from "@/components/seo/corridor-page";
import type { AirportCorridor } from "@/lib/seo/corridors";
import { ballparkAirportUsd, AIRPORT_CORRIDORS } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export function AirportPage({ corridor }: { corridor: AirportCorridor }) {
  const mode = getMode("taxi")!;
  const directionLabel = corridor.direction === "to" ? "to" : "from";
  const headline =
    corridor.direction === "to"
      ? `${corridor.city.name} to ${corridor.iata}`
      : `${corridor.iata} to ${corridor.city.name}`;
  const { from, to } = ballparkAirportUsd(25);
  const cityLabel = corridor.city.region
    ? `${corridor.city.name}, ${corridor.city.region}`
    : `${corridor.city.name}, ${corridor.city.country}`;

  const otherAtCity = AIRPORT_CORRIDORS.filter(
    (c) => c.city.slug === corridor.city.slug && c.slug !== corridor.slug,
  ).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Airport transfer ${directionLabel} ${corridor.iata}`,
        description: `Licensed taxi and black-car transfers ${directionLabel} ${corridor.iata} airport and ${cityLabel}. Verified drivers, escrow-safe pricing, and live tracking.`,
        areaServed: { "@type": "City", name: corridor.city.name, addressCountry: corridor.city.countryCode },
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
          { "@type": "ListItem", position: 2, name: "Airport transfer", item: "https://www.couthacts.com/airport-transfer" },
          { "@type": "ListItem", position: 3, name: headline, item: `https://www.couthacts.com/airport-transfer/${corridor.slug}` },
        ],
      },
    ],
  };

  const faqs = [
    {
      q: `How much is a transfer ${directionLabel} ${corridor.iata}?`,
      a: `Typical fares run between $${from} and $${to} depending on vehicle class, traffic, and luggage. You see the final quote before booking — no surprise surcharges.`,
    },
    {
      q: "Can I book in advance for an early morning flight?",
      a: "Yes. Pre-book any time. You'll get a text reminder the night before and a live tracking link to share with whoever's waiting on the other end.",
    },
    {
      q: "What if my flight is delayed?",
      a: "We track your flight automatically and adjust your driver's pickup time. You won't pay extra wait-time fees for a delay outside your control.",
    },
    {
      q: "What kinds of vehicles are available?",
      a: "Sedan, SUV, XL for families or extra luggage, and black-car / executive for business trips. Child seats available on request.",
    },
    {
      q: "How are drivers verified?",
      a: "Every driver passes an ID check, a background screen, and a local-licensing verification. Vehicles are insured and inspected.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-[12px] text-[#1D1D1F]/55">
              <li>
                <Link href="/" className="hover:text-[#007AFF]">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/airport-transfer" className="hover:text-[#007AFF]">
                  Airport transfer
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#1D1D1F]/80 font-medium">{headline}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                <Plane className="h-3.5 w-3.5 text-[#007AFF]" aria-hidden="true" />
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  {corridor.iata} · {corridor.city.name}
                </span>
              </div>

              <h1 className="mt-6 font-display font-black leading-[1.05] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl lg:text-6xl">
                Airport transfer
                <br />
                <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
                  {headline}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px]">
                Book a verified driver for a transfer {directionLabel}{" "}
                <span className="font-semibold text-[#1D1D1F]/80">{corridor.iata}</span> and{" "}
                <span className="font-semibold text-[#1D1D1F]/80">{cityLabel}</span>. Flat pricing,
                flight-tracking included, escrow-safe payments.
              </p>

              <div className="mt-8 rounded-3xl bg-white/85 backdrop-blur border border-white px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] inline-block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                  Typical fare
                </p>
                <p className="mt-1 text-2xl font-display font-black text-[#1D1D1F] tabular-nums">
                  ${from}
                  <span className="text-base font-normal text-[#1D1D1F]/50"> – ${to}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-[#1D1D1F]/50">
                  Sedan · includes tolls, airport fees, meet-and-greet.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/postings/new?mode=TAXI_RIDE&origin=${encodeURIComponent(
                    corridor.direction === "to" ? cityLabel : corridor.iata,
                  )}&destination=${encodeURIComponent(
                    corridor.direction === "to" ? corridor.iata : cityLabel,
                  )}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Book this transfer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services/taxi"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  About taxi & rideshare
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[#1D1D1F]/55">
                <li className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#007AFF]" aria-hidden="true" />
                  Flight-tracked
                </li>
                <li className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" />
                  Licensed drivers
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FFB020]" aria-hidden="true" />
                  Fixed price, no surges
                </li>
              </ul>
            </div>

            <div className="animate-fade-up animation-delay-300 relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 aspect-[4/5] max-h-[32rem]">
                <Image
                  src={mode.image}
                  alt={`Taxi transfer in ${corridor.city.name}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/60 via-[#1D1D1F]/10 to-transparent" />
                <div className="absolute top-4 right-4 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-2xl shadow-md">
                  ✈️
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-lg">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF7A59]">
                    Route
                  </p>
                  <p className="mt-0.5 text-[14px] font-display font-bold text-[#1D1D1F]">
                    {headline}
                  </p>
                  <p className="text-[11px] text-[#1D1D1F]/50">
                    {corridor.city.country} · {corridor.city.timezone.replace("_", " ")}
                  </p>
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
              What&rsquo;s included
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Door-to-door, with zero stress.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "📡", title: "Flight tracking", desc: "Pickup adjusts automatically to your flight status." },
              { emoji: "💵", title: "Fixed price", desc: "No surge pricing, no surprise tolls. What you see is what you pay." },
              { emoji: "🪧", title: "Meet-and-greet", desc: "Driver meets you in arrivals with a sign. No searching the curb." },
              { emoji: "🧳", title: "Luggage help", desc: "Help loading bags, child seats on request, extra-large options available." },
            ].map((i) => (
              <div
                key={i.title}
                className="rounded-[1.5rem] bg-[#FFFBF5] p-6 border border-[#1D1D1F]/5 transition-all hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                  {i.emoji}
                </span>
                <h3 className="mt-4 text-[15px] font-display font-bold text-[#1D1D1F]">{i.title}</h3>
                <p className="mt-1.5 text-[13px] text-[#1D1D1F]/55 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other airports at this city / reverse direction */}
      {otherAtCity.length > 0 && (
        <section className="bg-[#FFFBF5]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">
                  Also in {corridor.city.name}
                </p>
                <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                  Other airport transfers
                </h2>
              </div>
              <Link
                href="/airport-transfer"
                className="text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] inline-flex items-center gap-1"
              >
                All airports <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherAtCity.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/airport-transfer/${c.slug}`}
                    className="group block rounded-[1.5rem] bg-white p-5 border border-[#1D1D1F]/5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)] hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#007AFF]/10 text-lg">
                        ✈️
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-display font-bold text-[#1D1D1F]">
                          {c.direction === "to" ? `${c.city.name} → ${c.iata}` : `${c.iata} → ${c.city.name}`}
                        </p>
                        <p className="text-[11px] text-[#1D1D1F]/50 mt-0.5">
                          {c.direction === "to" ? "Heading to airport" : "Leaving airport"}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#1D1D1F]/30 group-hover:text-[#007AFF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </li>
              ))}
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
              Quick answers for {corridor.iata}.
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

      </main>

      <SeoFooter />
    </div>
  );
}
