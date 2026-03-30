import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Lock,
  Eye,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    alt: "Cargo ship loaded with containers at port",
  },
  {
    src: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&q=80",
    alt: "Private jet on runway at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    alt: "Freight truck driver checking cargo",
  },
];

const TRANSPORT_SHOWCASE = [
  {
    title: "Ground",
    subtitle: "Taxis, freight, heavy haul, moving, couriers, armored & medical",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=80",
    alt: "Logistics worker loading freight truck",
    stats: "6 modes",
  },
  {
    title: "Air",
    subtitle: "Private jets, helicopters, commercial airlines, and air cargo",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=900&q=80",
    alt: "Commercial aircraft flying over clouds",
    stats: "4 modes",
  },
  {
    title: "Maritime",
    subtitle: "Cargo ships, yacht charters, and ferry services worldwide",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&q=80",
    alt: "Container ship crossing ocean with sunset",
    stats: "3 modes",
  },
  {
    title: "Rail & Specialty",
    subtitle: "Freight rail, hazmat, oversized cargo, and more",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80",
    alt: "Freight train carrying containers through landscape",
    stats: "5 modes",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Post your job",
    description: "Describe what needs moving. Set your budget, timeline, and preferred tracking layers.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    alt: "Person using laptop to arrange shipping logistics",
  },
  {
    num: "02",
    title: "Verified providers bid",
    description: "Compare CouthActs\u2122 Scores, completion rates, reviews, and pricing from vetted carriers.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    alt: "Professional logistics coordinator reviewing documents",
  },
  {
    num: "03",
    title: "Escrow-protected payment",
    description: "Funds are held in your wallet escrow. The provider gets paid only when you confirm delivery.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    alt: "Secure digital payment transaction",
  },
  {
    num: "04",
    title: "Track every mile",
    description: "GPS, maritime AIS, flight tracking, IoT sensors, satellite \u2014 real-time visibility from pickup to delivery.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    alt: "Real-time tracking dashboard on screen",
  },
];

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "KYB-Verified Providers",
    description: "Every carrier passes identity, business registration, and compliance verification before they can bid.",
  },
  {
    icon: Lock,
    title: "Escrow-Protected Funds",
    description: "Your money is held securely in your CouthActs\u2122 wallet. Providers are paid only after confirmed delivery.",
  },
  {
    icon: Eye,
    title: "Multi-Layer Tracking",
    description: "GPS, AIS maritime, flight tracking, ELD, IoT, satellite, biometric \u2014 every layer, every mode.",
  },
  {
    icon: Zap,
    title: "CouthActs\u2122 Score",
    description: "Our proprietary trust algorithm rates every provider on reliability, speed, communication, and dispute history.",
  },
  {
    icon: Globe,
    title: "190+ Countries",
    description: "From Lagos to London, Miami to Mumbai \u2014 verified providers across every continent and shipping lane.",
  },
  {
    icon: CheckCircle,
    title: "Dispute Resolution",
    description: "Built-in evidence upload, escrow freeze, and resolution workflow. No shipment falls through the cracks.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-ocean-900">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1920&q=80"
            alt="Aerial view of cargo port with ships and containers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/95 via-ocean-900/80 to-ocean-900/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:py-44">
          <div className="max-w-2xl">
            <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              The global transportation marketplace
            </p>
            <h1 className="animate-fade-up animation-delay-150 mt-6 text-5xl font-display font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Move anything.
              <br />
              <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">
                Anywhere.
              </span>
            </h1>
            <p className="animate-fade-up animation-delay-300 mt-6 text-lg leading-relaxed text-sky-100/90 max-w-xl">
              CouthActs&#8482; connects you with verified providers across 18 transport
              modes &mdash; ground, air, sea, and rail. Escrow-protected payments.
              Real-time tracking. One platform.
            </p>
            <div className="animate-fade-up animation-delay-450 mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ocean-900 shadow-2xl shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:scale-[1.02]"
              >
                Start shipping free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/register?role=PROVIDER"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
              >
                Become a provider
              </Link>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="animate-fade-up animation-delay-600 mt-20 flex flex-wrap gap-6">
            {[
              { value: "18", label: "Transport Modes", sublabel: "Ground to sea" },
              { value: "190+", label: "Countries", sublabel: "Global reach" },
              { value: "100%", label: "Escrow Protected", sublabel: "Every transaction" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-4"
              >
                <p className="text-3xl font-display font-bold text-white">{s.value}</p>
                <p className="text-sm font-medium text-sky-300">{s.label}</p>
                <p className="text-xs text-sky-400/60">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image strip */}
        <div className="relative mx-auto max-w-7xl px-6 pb-16 hidden lg:block">
          <div className="grid grid-cols-3 gap-4">
            {HERO_IMAGES.map((img) => (
              <div key={img.alt} className="animate-scale-in animation-delay-750 relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRANSPORT MODES ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
              Every mode. One platform.
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-ocean-900 sm:text-5xl">
              18 transport modes,
              <br />zero runaround.
            </h2>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Whether you&apos;re shipping a pallet across town or chartering a yacht
              across the Mediterranean, CouthActs&#8482; has a verified provider ready.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {TRANSPORT_SHOWCASE.map((mode) => (
              <div
                key={mode.title}
                className="group relative overflow-hidden rounded-3xl bg-ocean-900 aspect-[4/3] sm:aspect-auto sm:h-80"
              >
                <Image
                  src={mode.image}
                  alt={mode.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                        {mode.stats}
                      </p>
                      <h3 className="mt-1 text-2xl font-display font-bold text-white">
                        {mode.title}
                      </h3>
                      <p className="mt-1 text-sm text-sky-100/80 max-w-xs">
                        {mode.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/50 transition-all group-hover:text-white group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-ocean-900 sm:text-5xl">
              Four steps. Total control.
            </h2>
          </div>

          <div className="mt-20 space-y-24">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="inline-flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-900 text-sm font-bold text-white">
                      {step.num}
                    </span>
                    <div className="h-px w-12 bg-sky-300" />
                  </div>
                  <h3 className="mt-6 text-3xl font-display font-bold text-ocean-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-500 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
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
      <section className="bg-ocean-900">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-400">
              Trust &amp; Safety
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
              Built for trust
              <br />at every layer.
            </h2>
            <p className="mt-5 text-lg text-sky-200/70 leading-relaxed">
              CouthActs&#8482; isn&apos;t just a marketplace &mdash; it&apos;s a trust engine.
              Every feature is designed so you never have to take a leap of faith.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <feat.icon className="h-6 w-6 text-sky-400" />
                <h3 className="mt-4 text-lg font-display font-semibold text-white">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm text-sky-200/60 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FULL-WIDTH IMAGE BREAK ═══════════════════════ */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
          alt="Aerial view of busy shipping port with containers and cranes"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/60 to-ocean-900/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-4xl font-display font-bold text-white sm:text-5xl lg:text-6xl tracking-tight">
              The world moves.
              <br />
              <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">
                We move it better.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-4xl px-6 py-28 lg:py-36 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
            Get started today
          </p>
          <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-ocean-900 sm:text-5xl">
            Ready to move the world?
          </h2>
          <p className="mt-5 text-lg text-gray-500 mx-auto max-w-xl">
            Join CouthActs&#8482; &mdash; post your first job or register as a provider
            in under 5 minutes. No commitment, no hidden fees.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-ocean-900 px-10 py-4 text-sm font-semibold text-white shadow-2xl shadow-ocean-900/20 transition-all hover:bg-ocean-800 hover:shadow-ocean-900/30 hover:scale-[1.02]"
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
              <p className="text-2xl font-display font-bold text-ocean-900">
                CouthActs&#8482;
              </p>
              <p className="mt-2 text-sm text-gray-400 max-w-xs">
                The global multimodal transportation marketplace. 18 modes. 190+ countries. Every shipment protected.
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
              Escrow-protected &middot; KYB-verified &middot; Real-time tracked
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
