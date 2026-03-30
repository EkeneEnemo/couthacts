import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { TrackInput } from "@/components/track-input";
import { ArrowRight, Shield, Zap, Globe, Lock, Eye, Heart, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-ocean-900 min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1920&q=85"
            alt="Aerial view of global shipping infrastructure"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900 via-ocean-900/90 to-ocean-900/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-semibold text-sky-300 tracking-wide">Live across 190+ countries</span>
              </div>

              <h1 className="animate-fade-up animation-delay-150 text-4xl font-display font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                The world&apos;s
                <br />
                transportation
                <br />
                <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-sky-200 bg-clip-text text-transparent">
                  infrastructure.
                </span>
              </h1>

              <p className="animate-fade-up animation-delay-300 mt-6 text-lg text-sky-100/80 leading-relaxed max-w-lg">
                CouthActs&#8482; powers the movement of people and goods across every transport mode on Earth &mdash; from a taxi across your city to a cargo ship across the Atlantic. One platform. Every mode. Complete protection.
              </p>

              <div className="animate-fade-up animation-delay-450 mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ocean-900 shadow-2xl shadow-black/20 transition-all hover:shadow-black/30 hover:scale-[1.02]"
                >
                  Start moving
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/register?role=PROVIDER"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Join as provider
                </Link>
              </div>
            </div>

            {/* Hero stats — commanding numbers */}
            <div className="animate-fade-up animation-delay-600 hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "18", label: "Transport Modes", desc: "Ground · Air · Sea · Rail" },
                  { value: "190+", label: "Countries", desc: "Global coverage" },
                  { value: "100%", label: "Escrow Protected", desc: "Every transaction secured" },
                  { value: "$0", label: "Platform Fee to Join", desc: "Free for all users" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6">
                    <p className="text-3xl font-display font-bold text-white lg:text-4xl">{s.value}</p>
                    <p className="mt-1 text-sm font-semibold text-sky-300">{s.label}</p>
                    <p className="text-xs text-sky-400/50">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="animate-fade-up animation-delay-600 mt-12 flex flex-wrap gap-6 lg:hidden">
            {[
              { value: "18", label: "Modes" },
              { value: "190+", label: "Countries" },
              { value: "100%", label: "Protected" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                <p className="text-xs text-sky-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ INDUSTRY VERTICALS ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Our Network</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl lg:text-5xl">
              Every mode of transportation.
              <br />
              <span className="text-gray-400">One global platform.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Ground",
                count: "6 modes",
                items: "Taxi · Limo · Courier · Moving · Freight · Heavy Haul",
                image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=80",
                alt: "Fleet of trucks on highway",
              },
              {
                title: "Air",
                count: "4 modes",
                items: "Private Jet · Helicopter · Airline · Air Cargo",
                image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=900&q=80",
                alt: "Private jet in flight",
              },
              {
                title: "Maritime",
                count: "3 modes",
                items: "Cargo Ship · Yacht Charter · Ferry",
                image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&q=80",
                alt: "Cargo ship at sea",
              },
              {
                title: "Specialty",
                count: "5 modes",
                items: "Rail · Armored · Medical · Hazmat · Oversized",
                image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80",
                alt: "Freight train",
              },
            ].map((v) => (
              <Link
                key={v.title}
                href="/register"
                className="group relative overflow-hidden rounded-2xl bg-ocean-900 aspect-[3/4]"
              >
                <Image src={v.image} alt={v.alt} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400">{v.count}</p>
                  <h3 className="mt-1 text-xl font-display font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-xs text-sky-100/70 leading-relaxed">{v.items}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-300 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                    Explore <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SCALE NUMBERS ═══════════════════════ */}
      <section className="bg-ocean-900 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "18", label: "Transport modes", desc: "Every way to move" },
              { value: "190+", label: "Countries served", desc: "True global reach" },
              { value: "3.5%", label: "Platform fee", desc: "Transparent pricing" },
              { value: "24/7", label: "Tracking & support", desc: "Always watching" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-display font-bold text-white sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm font-semibold text-sky-300">{s.label}</p>
                <p className="text-xs text-sky-400/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ USE CASES ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">For Everyone</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              Whatever you&apos;re moving, we&apos;ve got you.
            </h2>
          </div>

          <div className="mt-16 space-y-20">
            {[
              {
                tag: "Individuals",
                title: "Need a ride, a delivery, or a move?",
                desc: "Book a verified taxi in minutes. Send a package across town with real-time GPS. Get movers who bid on your job and are only paid when you confirm. Every transaction escrow-protected.",
                image: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1000&q=80",
                alt: "Person in taxi",
                cta: "Book now",
              },
              {
                tag: "Businesses",
                title: "Ship freight, cargo, and materials at scale.",
                desc: "From a single pallet to full container loads. Trucking, rail, ocean, and air cargo — verified carriers bid competitively, escrow secures your payment, and multi-layer tracking watches every mile.",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80",
                alt: "Container shipping port",
                cta: "Ship freight",
              },
              {
                tag: "Premium",
                title: "Private jets. Yacht charters. Armored transport.",
                desc: "Charter a jet for your executive team. Plan a yacht experience in the Mediterranean. Secure transport for high-value assets. Verified providers, white-glove service, complete discretion.",
                image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1000&q=80",
                alt: "Private jet",
                cta: "Go premium",
              },
            ].map((uc, i) => (
              <div
                key={uc.tag}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">{uc.tag}</p>
                  <h3 className="mt-3 text-2xl font-display font-bold text-ocean-900 sm:text-3xl">{uc.title}</h3>
                  <p className="mt-4 text-base text-gray-500 leading-relaxed">{uc.desc}</p>
                  <Link href="/register" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ocean-600 hover:text-ocean-700 transition">
                    {uc.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-ocean-900/10">
                    <Image src={uc.image} alt={uc.alt} fill className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST ENGINE ═══════════════════════ */}
      <section className="bg-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-sky-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Trust Engine</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Security isn&apos;t a feature.
              <br />
              <span className="text-sky-300">It&apos;s the foundation.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: "Identity-Verified", desc: "Every user and provider passes Persona government ID verification before accessing the platform. $20 per verification — no exceptions." },
              { icon: Lock, title: "Escrow Protection", desc: "Customer funds are held in escrow from the moment a job is posted. Providers are paid only after both parties confirm completion." },
              { icon: Eye, title: "Real-Time Tracking", desc: "Live GPS for ground transport. Flight tracking for air. Maritime AIS for sea. QR/PIN confirmation at delivery. Every mile accounted for." },
              { icon: Zap, title: "CouthActs\u2122 Score", desc: "Our proprietary algorithm rates every provider on reliability, on-time delivery, communication, and dispute history. Scores visible to all." },
              { icon: Globe, title: "Multi-Currency", desc: "Post jobs and see prices in your local currency — NGN, GBP, EUR, INR, and 12 more. Internal ledger in USD ensures consistency across borders." },
              { icon: Heart, title: "Dispute Resolution", desc: "Evidence upload, escrow freeze, and admin-mediated resolution. If something goes wrong, funds don't move until it's resolved." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 transition-all hover:bg-white/[0.06]">
                <f.icon className="h-6 w-6 text-sky-400" />
                <h3 className="mt-4 text-base font-display font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-sky-200/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">How It Works</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              Four steps. Complete control.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", title: "Post your need", desc: "Describe what needs moving. Every mode has its own tailored workflow — from a taxi ride to a container ship." },
              { num: "02", title: "Verified providers bid", desc: "Identity-verified, score-rated providers compete for your job. Compare prices, reviews, and on-time rates." },
              { num: "03", title: "Funds held in escrow", desc: "Your budget is secured the moment you post. Provider is paid only when you confirm delivery. No risk." },
              { num: "04", title: "Track in real-time", desc: "Live GPS, QR/PIN delivery confirmation, and a full checkpoint timeline. Know exactly where your shipment is." },
            ].map((s) => (
              <div key={s.num}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ocean-900 text-sm font-bold text-white">{s.num}</span>
                <h3 className="mt-4 text-lg font-display font-semibold text-ocean-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PROVIDER CTA ═══════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
            alt="Transportation fleet"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ocean-900/80" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">For Providers</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl">
            Fill your fleet. Grow your business.
          </h2>
          <p className="mt-4 text-lg text-sky-100/70 max-w-xl mx-auto">
            Join the CouthActs&#8482; marketplace. Get matched with customers who need exactly what you offer. Escrow-protected payments. Transparent fees. Your CouthActs Score builds your reputation.
          </p>
          <Link
            href="/register?role=PROVIDER"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-semibold text-ocean-900 shadow-2xl transition-all hover:scale-[1.02]"
          >
            Register as provider <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════ TRACK ═══════════════════════ */}
      <section className="bg-white border-y border-gray-100">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Track a Job</p>
          <h2 className="mt-3 text-2xl font-display font-bold tracking-tight text-ocean-900 sm:text-3xl">
            Have a tracking code?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Real-time status, live location, and full checkpoint history. No login required.
          </p>
          <TrackInput />
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl lg:text-5xl">
            The future of transportation
            <br />
            <span className="text-gray-400">is already here.</span>
          </h2>
          <p className="mt-5 text-lg text-gray-500 mx-auto max-w-xl">
            Create your free CouthActs&#8482; account in under a minute. Move anything, anywhere, with complete protection.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean-900 px-10 py-4 text-sm font-semibold text-white shadow-2xl transition-all hover:bg-ocean-800 hover:scale-[1.02] sm:w-auto"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-ocean-200 px-10 py-4 text-sm font-semibold text-ocean-700 transition-all hover:bg-ocean-50 sm:w-auto"
            >
              Register as provider
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-ocean-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <Logo size="md" variant="white" href="/" />
              <p className="mt-4 text-sm text-sky-200/50 leading-relaxed max-w-xs">
                The global multimodal transportation marketplace.
                18 modes. 190+ countries. Every transaction protected.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-sky-300 text-xs uppercase tracking-wider">Platform</p>
                <Link href="/marketplace" className="block text-sky-200/50 hover:text-white transition">Marketplace</Link>
                <Link href="/register" className="block text-sky-200/50 hover:text-white transition">Get Started</Link>
                <Link href="/register?role=PROVIDER" className="block text-sky-200/50 hover:text-white transition">For Providers</Link>
              </div>
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-sky-300 text-xs uppercase tracking-wider">Account</p>
                <Link href="/login" className="block text-sky-200/50 hover:text-white transition">Sign In</Link>
                <Link href="/wallet" className="block text-sky-200/50 hover:text-white transition">Wallet</Link>
                <Link href="/settings" className="block text-sky-200/50 hover:text-white transition">Settings</Link>
              </div>
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-sky-300 text-xs uppercase tracking-wider">Legal</p>
                <Link href="/terms" className="block text-sky-200/50 hover:text-white transition">Terms of Service</Link>
                <Link href="/privacy" className="block text-sky-200/50 hover:text-white transition">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-xs text-sky-200/30">
              &copy; {new Date().getFullYear()} CouthActs&#8482; Incorporated. All rights reserved.
            </p>
            <p className="text-xs text-sky-200/30">
              Intellectual property of Enemo Consulting Group, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
