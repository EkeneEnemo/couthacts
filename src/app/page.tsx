import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock,
  Eye,
  Heart,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

/* ────────────────────────────────────────────────────────
   Hero strip — real people, everyday + premium transport
   ──────────────────────────────────────────────────────── */
const HERO_MOSAIC = [
  {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    alt: "Woman smiling while riding in a taxi through the city",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    alt: "Delivery courier on a bicycle riding through the city",
  },
  {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
    alt: "Passenger airplane flying through golden clouds",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    alt: "Two people collaborating at a laptop planning a move",
  },
];

/* ────────────────────────────────────────────────────────
   Who it's for — warm, inclusive, human-first
   ──────────────────────────────────────────────────────── */
const USE_CASES = [
  {
    title: "Need a ride across town?",
    description: "Book a verified taxi or limo in minutes. See your driver\u2019s CouthActs\u2122 Score before you step in.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=900&q=80",
    alt: "Passenger stepping into a yellow taxi on a city street",
    tag: "Rides",
  },
  {
    title: "Sending a package today?",
    description: "Courier and last-mile delivery with real-time GPS tracking. From a birthday gift to business documents.",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=900&q=80",
    alt: "Delivery person handing a package to a happy customer at their door",
    tag: "Courier",
  },
  {
    title: "Moving to a new home?",
    description: "Verified movers bid on your job. Escrow protects your payment until every box is inside your new place.",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900&q=80",
    alt: "Happy couple surrounded by moving boxes in their new apartment",
    tag: "Moving",
  },
  {
    title: "Flying somewhere special?",
    description: "Compare commercial flights, charter a helicopter, or book a private jet \u2014 all from one search.",
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=900&q=80",
    alt: "Travelers walking through a bright modern airport terminal",
    tag: "Flights",
  },
  {
    title: "Shipping freight worldwide?",
    description: "From a single pallet to full container loads. Trucking, rail, ocean, air cargo \u2014 18 modes, one platform.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    alt: "Colorful shipping containers stacked at a busy port",
    tag: "Freight",
  },
  {
    title: "Something out of the ordinary?",
    description: "Armored transport, medical vehicles, hazmat, oversized cargo, yacht charters \u2014 we\u2019ve got a mode for that.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&q=80",
    alt: "Yacht cruising through clear blue ocean water",
    tag: "Specialty",
  },
];

/* ────────────────────────────────────────────────────────
   How it works — warm, people-centered steps
   ──────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Tell us what you need",
    description: "A ride to the airport, a couch to your new apartment, or a container to another continent. Just describe it.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    alt: "Person smiling while using their phone to book a service",
  },
  {
    num: "02",
    title: "Choose your provider",
    description: "Verified providers bid with their price and timeline. Compare scores, reviews, and on-time rates before choosing.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80",
    alt: "Fleet of semi trucks and vehicles lined up at a transport yard",
  },
  {
    num: "03",
    title: "Pay with confidence",
    description: "Your payment is held safely in escrow. The provider only gets paid when you\u2019re happy with the delivery.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    alt: "Contactless payment being made securely",
  },
  {
    num: "04",
    title: "Track and relax",
    description: "Real-time GPS, flight tracking, maritime AIS \u2014 watch every step from pickup to your front door.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=90",
    alt: "Satellite view of city roads and navigation routes at night",
  },
];

/* ────────────────────────────────────────────────────────
   Trust features
   ──────────────────────────────────────────────────────── */
const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "Verified providers",
    description: "Every driver, courier, mover, and carrier passes identity and business verification before they can serve you.",
  },
  {
    icon: Lock,
    title: "Escrow protection",
    description: "Your money stays in your wallet until the job is done. No surprises, no chasing refunds.",
  },
  {
    icon: Eye,
    title: "Real-time tracking",
    description: "GPS for your taxi, flight tracking for your cargo, AIS for your shipment at sea \u2014 always know where it is.",
  },
  {
    icon: Zap,
    title: "CouthActs\u2122 Score",
    description: "Our trust score rates every provider on reliability, speed, and communication so you can choose with confidence.",
  },
  {
    icon: Globe,
    title: "Everywhere you are",
    description: "From your neighborhood to the other side of the world. 190+ countries, every transport mode imaginable.",
  },
  {
    icon: Heart,
    title: "People-first support",
    description: "Disputes resolved fairly. Evidence upload, escrow freeze, and a real resolution process \u2014 we\u2019ve got your back.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800 via-ocean-700 to-sky-500" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-[10%] h-[500px] w-[500px] rounded-full bg-sky-200 blur-3xl" />
          <div className="absolute bottom-0 right-[5%] h-[600px] w-[600px] rounded-full bg-ocean-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 lg:pt-32 lg:pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              The global transportation marketplace
            </p>
            <h1 className="animate-fade-up animation-delay-150 mt-6 text-5xl font-display font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Need a ride? Drop off? Flight?
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-sky-300 to-white bg-clip-text text-transparent">
                Look no further.
              </span>
            </h1>
            <p className="animate-fade-up animation-delay-300 mt-6 text-lg leading-relaxed text-sky-100/90 max-w-2xl mx-auto">
              From a taxi across town to an interstate move, a same-day courier
              to an international cargo shipment &mdash; CouthActs&#8482; connects you
              with verified providers for every kind of transport. Payments
              protected. Every mile tracked.
            </p>
            <div className="animate-fade-up animation-delay-450 mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ocean-800 shadow-2xl shadow-black/10 transition-all hover:shadow-black/15 hover:scale-[1.02]"
              >
                Get started &mdash; it&apos;s free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/register?role=PROVIDER"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40"
              >
                I&apos;m a provider
              </Link>
            </div>
          </div>

          {/* Stats — warm, human language */}
          <div className="animate-fade-up animation-delay-600 mt-16 flex flex-wrap justify-center gap-6">
            {[
              { value: "18", label: "Transport modes", sub: "Rides to cargo ships" },
              { value: "190+", label: "Countries", sub: "Local & worldwide" },
              { value: "100%", label: "Payment protected", sub: "Escrow on every job" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md px-6 py-4 text-center"
              >
                <p className="text-3xl font-display font-bold text-white">{s.value}</p>
                <p className="text-sm font-medium text-sky-200">{s.label}</p>
                <p className="text-xs text-sky-300/50">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* People-first mosaic — real humans, everyday transport */}
        <div className="relative mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HERO_MOSAIC.map((img, i) => (
              <div
                key={img.alt}
                className={`animate-scale-in relative overflow-hidden rounded-2xl ${
                  i === 0 ? "animation-delay-600" :
                  i === 1 ? "animation-delay-300" :
                  i === 2 ? "animation-delay-450" : "animation-delay-750"
                } ${i === 0 ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/5] sm:aspect-[3/4]"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHO IT'S FOR ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
              For everyone
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-ocean-900 sm:text-5xl">
              Whatever you&apos;re moving,
              <br />we&apos;ve got you.
            </h2>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">
              One platform for rides, deliveries, moves, flights, and freight.
              Real people. Real providers. Real protection.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div
                key={uc.tag}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={uc.image}
                    alt={uc.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-ocean-700 shadow-sm">
                      {uc.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-ocean-900">
                    {uc.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
              Simple & safe
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-ocean-900 sm:text-5xl">
              Book with confidence
              <br />in four easy steps.
            </h2>
          </div>

          <div className="mt-20 space-y-20 lg:space-y-28">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="inline-flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-ocean-600 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
                      {step.num}
                    </span>
                    <div className="h-px w-10 bg-gradient-to-r from-sky-300 to-transparent" />
                  </div>
                  <h3 className="mt-5 text-3xl font-display font-bold text-ocean-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-500 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-ocean-900/5">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST & SAFETY ═══════════════════════ */}
      <section className="bg-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-sky-300 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-ocean-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-400">
              Your safety matters
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Every ride, every shipment &mdash;
              <br />protected.
            </h2>
            <p className="mt-5 text-lg text-sky-200/70 leading-relaxed">
              We built CouthActs&#8482; so you never have to worry. Verified people,
              protected payments, and real-time visibility on everything.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-7 transition-all hover:bg-white/[0.08] hover:border-white/15"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10">
                  <feat.icon className="h-5 w-5 text-sky-400" />
                </div>
                <h3 className="mt-4 text-base font-display font-semibold text-white">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-sky-200/50 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HUMAN IMAGE BREAK ═══════════════════════ */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&q=80"
          alt="Diverse group of people smiling and collaborating together"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/50 to-ocean-900/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <h2 className="text-4xl font-display font-bold text-white sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Built for people
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-sky-300 to-white bg-clip-text text-transparent">
                who move the world.
              </span>
            </h2>
            <p className="mt-4 text-lg text-sky-100/80 max-w-xl mx-auto">
              Riders, shippers, couriers, movers, pilots, captains &mdash;
              CouthActs&#8482; is for all of you.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
            Join today
          </p>
          <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-ocean-900 sm:text-5xl">
            Ready when you are.
          </h2>
          <p className="mt-5 text-lg text-gray-500 mx-auto max-w-xl">
            Create your free CouthActs&#8482; account in under a minute. Book a ride,
            send a package, schedule a move, or ship freight &mdash; all from
            one place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-ocean-800 px-10 py-4 text-sm font-semibold text-white shadow-2xl shadow-ocean-900/15 transition-all hover:bg-ocean-700 hover:shadow-ocean-900/20 hover:scale-[1.02]"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex items-center rounded-full border-2 border-ocean-200 px-10 py-4 text-sm font-semibold text-ocean-700 transition-all hover:bg-ocean-50 hover:border-ocean-300"
            >
              Register as provider
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="border-t border-gray-200/80 bg-cream-100">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Logo size="md" href="/" />
              <p className="mt-3 text-sm text-gray-400 max-w-xs leading-relaxed">
                The global transportation marketplace for everyone.
                Rides, deliveries, moves, flights, and freight &mdash; all protected.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="space-y-3">
                <p className="font-semibold text-ocean-800">Platform</p>
                <Link href="/marketplace" className="block text-gray-500 hover:text-ocean-600 transition-colors">Marketplace</Link>
                <Link href="/register" className="block text-gray-500 hover:text-ocean-600 transition-colors">Get Started</Link>
                <Link href="/register?role=PROVIDER" className="block text-gray-500 hover:text-ocean-600 transition-colors">For Providers</Link>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-ocean-800">Account</p>
                <Link href="/login" className="block text-gray-500 hover:text-ocean-600 transition-colors">Sign In</Link>
                <Link href="/wallet" className="block text-gray-500 hover:text-ocean-600 transition-colors">Wallet</Link>
                <Link href="/settings" className="block text-gray-500 hover:text-ocean-600 transition-colors">Settings</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200/80 pt-8 sm:flex-row">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} CouthActs&#8482; Incorporated. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Escrow-protected &middot; Verified providers &middot; Real-time tracked
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
