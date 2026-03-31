import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { TrackInput } from "@/components/track-input";
import { VideoHero } from "@/components/video-hero";
import { VideoShowcase } from "@/components/video-showcase";
import { AnimatedCounter } from "@/components/animated-counter";
import { ArrowRight, Shield, Zap, Globe, Lock, Eye, Heart, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-ocean-900 min-h-[90vh] flex items-center">
        <VideoHero />

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
              <div className="animate-fade-up animation-delay-600 mt-6 flex flex-wrap items-center gap-4 text-xs text-sky-300/60">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  Platform live now
                </span>
                <span>&middot;</span>
                <span>iOS &amp; Android app launching soon</span>
              </div>
            </div>

            {/* Hero stats — commanding numbers */}
            <div className="animate-fade-up animation-delay-600 hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "18", label: "Transport Modes", desc: "Ground · Air · Sea · Rail" },
                  { value: "190+", label: "Countries", desc: "Global coverage" },
                  { value: "100%", label: "Escrow Protected", desc: "Every transaction secured" },
                  { value: "24/7", label: "Live Tracking", desc: "GPS · AIS · Flight" },
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

      {/* ═══════════════════════ VIDEO SHOWCASE ═══════════════════════ */}
      <section className="bg-ocean-900 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">In Motion</p>
            <h2 className="mt-2 text-2xl font-display font-bold text-white sm:text-3xl">
              See every mode. Live.
            </h2>
          </div>
          <VideoShowcase />
        </div>
      </section>

      {/* ═══════════════════════ SCALE NUMBERS (ANIMATED) ═══════════════════════ */}
      <section className="bg-cream-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-ocean-900 sm:text-5xl"><AnimatedCounter end={18} /></p>
              <p className="mt-2 text-sm font-semibold text-ocean-600">Transport modes</p>
              <p className="text-xs text-gray-400">Every way to move</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-ocean-900 sm:text-5xl"><AnimatedCounter end={190} suffix="+" /></p>
              <p className="mt-2 text-sm font-semibold text-ocean-600">Countries served</p>
              <p className="text-xs text-gray-400">True global reach</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-ocean-900 sm:text-5xl"><AnimatedCounter end={3.5} suffix="%" decimals={1} /></p>
              <p className="mt-2 text-sm font-semibold text-ocean-600">Platform fee</p>
              <p className="text-xs text-gray-400">Transparent pricing</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-ocean-900 sm:text-5xl">24/7</p>
              <p className="mt-2 text-sm font-semibold text-ocean-600">Tracking &amp; support</p>
              <p className="text-xs text-gray-400">Always watching</p>
            </div>
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



      {/* ═══════════════════════ PRICING ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Transparent Pricing</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              No hidden fees. No surprises.
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Every cost is visible before you commit. The provider is paid only when you confirm delivery.
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ocean-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Fee</th>
                  <th className="px-6 py-4 text-left font-semibold">Rate</th>
                  <th className="px-6 py-4 text-left font-semibold">When charged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-ocean-800">Posting fee</td>
                  <td className="px-6 py-4 text-gray-600">$2–$50 base + 0.5% of budget <span className="text-xs text-gray-400">(min $2)</span></td>
                  <td className="px-6 py-4 text-gray-500">When you post a job <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ml-1">Non-refundable</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ocean-800">Budget hold</td>
                  <td className="px-6 py-4 text-gray-600">100% of your posted budget</td>
                  <td className="px-6 py-4 text-gray-500">Held at posting <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700 ml-1">Refundable if no match</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-ocean-800">Escrow fee</td>
                  <td className="px-6 py-4 text-gray-600">3.5% of agreed bid amount</td>
                  <td className="px-6 py-4 text-gray-500">Deducted from provider payout on completion</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ocean-800">Identity verification</td>
                  <td className="px-6 py-4 text-gray-600">$20.00 per attempt</td>
                  <td className="px-6 py-4 text-gray-500">Before accessing platform features <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ml-1">Non-refundable</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-ocean-800">Wallet top-up</td>
                  <td className="px-6 py-4 text-gray-600">No CouthActs&#8482; fee</td>
                  <td className="px-6 py-4 text-gray-500">Stripe processing fees apply</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ocean-800">Provider withdrawal</td>
                  <td className="px-6 py-4 text-gray-600">No CouthActs&#8482; fee</td>
                  <td className="px-6 py-4 text-gray-500">Stripe Connect transfer fees apply</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            Enterprise volume pricing available.{" "}
            <Link href="/enterprise" className="text-ocean-600 hover:text-ocean-700 font-medium">Contact sales</Link>
          </p>
        </div>
      </section>

      {/* ═══════════════════════ COMPLIANCE ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Compliance &amp; Operations</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              Built for regulated industries.
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Persona ID Verification", desc: "Every user passes government-issued photo ID verification powered by Persona before accessing the platform.", badge: "Required" },
              { title: "KYB Business Verification", desc: "Business providers submit insurance certificates, business licenses, and regulatory registrations for manual review.", badge: "Required" },
              { title: "Regulatory Compliance", desc: "DOT, MC, FMCSA for trucking. IMO for maritime. FAA for aviation. We verify the registrations that matter for your mode.", badge: "Mode-specific" },
              { title: "Insurance Verification", desc: "Providers declare coverage tier (Basic, Standard, Premium). Customers can require matching insurance on every posting.", badge: "Tiered" },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-[10px] font-bold text-ocean-700 uppercase tracking-wider">{c.badge}</span>
                <h3 className="mt-3 text-base font-display font-semibold text-ocean-900">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Dispute resolution SLA: under review within 24 hours. Escrow frozen immediately upon filing.
              <br />
              <span className="text-xs text-gray-400">Questions about compliance? <Link href="/enterprise" className="text-ocean-600 hover:text-ocean-700 font-medium">Contact our enterprise team</Link></span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PLATFORM PREVIEW ═══════════════════════ */}
      <section className="bg-ocean-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">The Platform</p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              See what you&apos;re getting.
            </h2>
            <p className="mt-3 text-base text-sky-200/60">
              Post a need. Get verified bids. Track in real-time. Release payment on completion. All from one dashboard.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Post a Need", desc: "18 mode-specific workflows. Every field tailored to your transport type.", color: "from-sky-500 to-ocean-600" },
              { title: "Verified Bids", desc: "CouthActs Score, completion rates, on-time stats. Choose with confidence.", color: "from-ocean-600 to-ocean-700" },
              { title: "Live Tracking", desc: "GPS for ground. Flight tracking for air. AIS for sea. PIN at delivery.", color: "from-ocean-700 to-sky-600" },
              { title: "Wallet & Escrow", desc: "Top up, hold, release, refund. Full transaction history with PDF receipts.", color: "from-sky-600 to-sky-500" },
            ].map((s) => (
              <div key={s.title} className={`rounded-2xl bg-gradient-to-br ${s.color} p-6 text-white`}>
                <h3 className="text-base font-display font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-sky-200/40">
              iOS &amp; Android mobile app launching soon. Web platform live at couthacts.com.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ENTERPRISE CTA ═══════════════════════ */}
      <section className="bg-white border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Enterprise</p>
              <h2 className="mt-2 text-2xl font-display font-bold text-ocean-900 sm:text-3xl">
                Shipping at scale? Let&apos;s talk.
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-lg">
                Volume-based pricing, dedicated account management, custom API integrations, and priority support for organizations moving more than 50 shipments per month.
              </p>
            </div>
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean-900 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-ocean-800 hover:scale-[1.02] flex-shrink-0"
            >
              Contact Enterprise Sales <ArrowRight className="h-4 w-4" />
            </Link>
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
            Join the CouthActs&#8482; platform. Get matched with customers who need exactly what you offer. Escrow-protected payments. Transparent fees. Your CouthActs Score builds your reputation.
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
                The global transportation infrastructure platform.
                18 modes. 190+ countries. Every transaction protected.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-sky-300 text-xs uppercase tracking-wider">Platform</p>
                <Link href="/browse" className="block text-sky-200/50 hover:text-white transition">Browse Jobs</Link>
                <Link href="/register" className="block text-sky-200/50 hover:text-white transition">Get Started</Link>
                <Link href="/register?role=PROVIDER" className="block text-sky-200/50 hover:text-white transition">For Providers</Link>
                <Link href="/enterprise" className="block text-sky-200/50 hover:text-white transition">Enterprise</Link>
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
