import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { TrackInput } from "@/components/track-input";
import { VideoHero } from "@/components/video-hero";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Eye,
  Scale,
  ChevronRight,
  ChevronDown,
  MapPin,
  Satellite,
  Radio,
  Fingerprint,
  Camera,
  Thermometer,
  Anchor,
  Plane,
  QrCode,
  GraduationCap,
  BookOpen,
  Award,
  Building2,
  Landmark,
  Code2,
  Users,
  Briefcase,
  Crown,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      {/* ═══════════════════════ 1. HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1D1D1F] min-h-screen flex items-center">
        <VideoHero />

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <div className="flex flex-col items-center text-center pt-24 pb-32 lg:pt-0 lg:pb-40">
            {/* Live badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2 mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]" />
              </span>
              <span className="text-[12px] font-semibold text-white/60 tracking-wide">
                Platform live &mdash; 190+ countries
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up animation-delay-150 text-4xl font-display font-black leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Move Anything.
              <br />
              Anywhere.
              <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#007AFF] bg-clip-text text-transparent">
                Protected.
              </span>
            </h1>

            {/* Subline */}
            <p className="animate-fade-up animation-delay-300 mt-6 text-base text-white/40 leading-relaxed max-w-2xl sm:mt-8 sm:text-lg lg:text-xl">
              CouthActs&#8482; is the global transportation infrastructure that
              powers the movement of people and goods across every mode on
              Earth&mdash;ground, air, sea, and rail. One platform. Complete
              protection. No exceptions.
            </p>

            {/* CTAs — min-h-[48px] for mobile touch targets */}
            <div className="animate-fade-up animation-delay-450 mt-10 flex flex-col gap-3 w-full px-4 sm:mt-12 sm:flex-row sm:w-auto sm:px-0">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#007AFF] px-10 py-4 min-h-[48px] text-[15px] font-semibold text-white shadow-lg shadow-[#007AFF]/25 transition-all hover:bg-[#0055D4] hover:scale-[1.02] active:scale-[0.98]"
              >
                Start moving
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/register?role=PROVIDER"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-10 py-4 min-h-[48px] text-[15px] font-semibold text-white transition-all hover:bg-white/10 active:bg-white/15"
              >
                Join as provider
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-up animation-delay-600 mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-white/30 sm:mt-10 sm:gap-6 sm:text-[12px]">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Escrow-protected
              </span>
              <span className="flex items-center gap-1.5">
                <Fingerprint className="h-3.5 w-3.5" />
                ID-verified users
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Real-time tracking
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                18 transport modes
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/20" />
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] bg-[#1D1D1F]/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: 18, suffix: "", label: "Transport Modes" },
                { value: 190, suffix: "+", label: "Countries" },
                { value: 100, suffix: "%", label: "Escrow Protected" },
                { value: 9, suffix: "", label: "Tracking Layers" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-white sm:text-3xl tabular-nums">
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-white/30 uppercase tracking-[0.12em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 2. TRANSPORT MODES ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Our Network
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl lg:text-5xl">
              Every mode of transportation.
              <br />
              <span className="text-[#86868B]">One global platform.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Ground",
                count: "6 modes",
                items: "Taxi \u00B7 Limo \u00B7 Courier \u00B7 Moving \u00B7 Freight \u00B7 Heavy Haul",
                image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80",
                alt: "Fleet of trucks on highway",
              },
              {
                title: "Air",
                count: "4 modes",
                items: "Private Jet \u00B7 Helicopter \u00B7 Airline \u00B7 Air Cargo",
                image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80",
                alt: "Private jet in flight",
              },
              {
                title: "Maritime",
                count: "3 modes",
                items: "Cargo Ship \u00B7 Yacht Charter \u00B7 Ferry",
                image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
                alt: "Cargo ship at sea",
              },
              {
                title: "Specialty",
                count: "5 modes",
                items: "Rail \u00B7 Armored \u00B7 Medical \u00B7 Hazmat \u00B7 Oversized",
                image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
                alt: "Freight train on tracks",
              },
            ].map((v) => (
              <Link
                key={v.title}
                href="/register"
                className="group relative overflow-hidden rounded-3xl bg-[#1D1D1F] aspect-[16/10]"
              >
                <Image
                  src={v.image}
                  alt={v.alt}
                  fill
                  className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                    {v.count}
                  </p>
                  <h3 className="mt-2 text-2xl font-display font-bold text-white lg:text-3xl">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-white/40 leading-relaxed">
                    {v.items}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-[#007AFF] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Explore modes <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. WHO WE SERVE ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Who We Serve
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Built for everyone who moves.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Individuals",
                desc: "Book a verified taxi, send a package across town, hire movers for your next home. Every transaction escrow-protected with real-time tracking.",
                cta: "Get started",
                href: "/register",
              },
              {
                icon: Briefcase,
                title: "Businesses",
                desc: "Ship freight at scale. From single pallets to full container loads across trucking, rail, ocean, and air cargo. Verified carriers, competitive bids.",
                cta: "Ship freight",
                href: "/register",
              },
              {
                icon: Building2,
                title: "Enterprise & Gov",
                desc: "Volume-based pricing, custom API integrations, dedicated account management, regulatory compliance, and priority support for large-scale operations.",
                cta: "Contact sales",
                href: "/enterprise",
              },
              {
                icon: Crown,
                title: "Premium",
                desc: "Private jets. Yacht charters. Armored transport. White-glove service for high-value assets and discerning clients. Complete discretion.",
                cta: "Go premium",
                href: "/register",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group rounded-3xl border-t-2 border-t-transparent bg-[#F5F5F7]/60 p-8 transition-all hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,.06)] hover:border-t-[#007AFF]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1D1D1F]">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#007AFF] transition-colors hover:text-[#0055D4]"
                >
                  {s.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4. HOW IT WORKS ═══════════════════════ */}
      <section className="bg-[#F5F5F7] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Four steps. Complete control.
            </h2>
          </div>

          <div className="mt-20 relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Desktop dotted connector line between numbered circles */}
            <div className="hidden lg:block absolute top-[22px] left-[calc(12.5%+22px)] right-[calc(12.5%+22px)] border-t-2 border-dashed border-[#D2D2D7]/60 pointer-events-none" />

            {[
              {
                num: "01",
                title: "Post your need",
                desc: "Describe what needs moving. 18 mode-specific workflows tailored to every transport type\u2014from a taxi ride to a container ship.",
              },
              {
                num: "02",
                title: "Verified providers bid",
                desc: "Identity-verified, score-rated providers compete for your job. Compare prices, reviews, on-time rates, and protection tiers.",
              },
              {
                num: "03",
                title: "Funds held in escrow",
                desc: "Your budget is secured the moment you post. The provider is paid only when both parties confirm completion. No risk.",
              },
              {
                num: "04",
                title: "Track in real-time",
                desc: "Live GPS, flight tracking, maritime AIS, QR/PIN delivery confirmation. A full checkpoint timeline for every mile.",
              },
            ].map((s) => (
              <div key={s.num} className="relative">
                <span className="absolute -top-4 -left-2 text-[7rem] font-display font-black text-[#1D1D1F]/[0.03] leading-none select-none pointer-events-none">
                  {s.num}
                </span>
                <div className="relative">
                  <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1D1D1F] text-[13px] font-bold text-white shadow-lg shadow-[#1D1D1F]/10">
                    {s.num}
                  </span>
                  <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block mt-0 relative">
            <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#D2D2D7] to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 5. TRACKING LAYERS ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,122,255,.06),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              9 Tracking Layers
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Know where everything is.
              <br />
              <span className="text-[#007AFF]">Always.</span>
            </h2>
            <p className="mt-4 text-[14px] text-white/35">
              Every transport mode has purpose-built tracking. Nine layers
              working together so nothing is ever out of sight.
            </p>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: MapPin, title: "Live GPS", desc: "Real-time ground vehicle position updates every 15 seconds." },
              { icon: Plane, title: "Flight Tracking", desc: "ADS-B integration for private jets, helicopters, and air cargo." },
              { icon: Anchor, title: "Maritime AIS", desc: "Automatic Identification System for cargo ships and yacht charters." },
              { icon: QrCode, title: "QR/PIN Confirmation", desc: "Cryptographic proof of pickup and delivery. Tamper-proof." },
              { icon: Camera, title: "Photo Checkpoints", desc: "Timestamped, geotagged photos at every major milestone." },
              { icon: Thermometer, title: "Condition Monitoring", desc: "Temperature, humidity, and shock sensors for sensitive cargo." },
              { icon: Satellite, title: "Satellite Positioning", desc: "GPS + GLONASS for areas with limited cellular coverage." },
              { icon: Radio, title: "Geofence Alerts", desc: "Automated notifications when shipments enter or leave defined zones." },
              { icon: Eye, title: "Timeline History", desc: "Full checkpoint timeline with audit trail. Exportable as PDF." },
            ].map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06] hover:border-white/[0.1]"
              >
                <t.icon className="h-5 w-5 text-[#007AFF]" />
                <h3 className="mt-3 text-[13px] font-semibold text-white">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-[12px] text-white/30 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 6. TRUST ENGINE ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Trust Engine
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Security isn&apos;t a feature.
              <br />
              <span className="text-[#86868B]">It&apos;s the foundation.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Fingerprint, title: "ID Verified", desc: "Every user and provider passes Persona government ID verification. $20 per attempt\u2014no exceptions, no shortcuts.", badge: "Required" },
              { icon: Lock, title: "Escrow Protection", desc: "Customer funds are held from the moment a job is posted. Providers are paid only after both parties confirm completion.", badge: "Every job" },
              { icon: Zap, title: "CouthActs\u2122 Score", desc: "Proprietary algorithm rating every provider on reliability, on-time delivery, communication, and dispute history. Visible to all.", badge: "Transparent" },
              { icon: Shield, title: "Protection Tiers", desc: "Basic, Standard, and Premium protection tiers. Customers can require matching coverage on every posting.", badge: "Tiered" },
              { icon: Eye, title: "9-Layer Tracking", desc: "GPS, flight, AIS, QR/PIN, photo checkpoints, condition monitoring, satellite, geofencing, and full audit timeline.", badge: "Comprehensive" },
              { icon: Scale, title: "Dispute Resolution", desc: "Evidence upload, immediate escrow freeze, admin-mediated resolution. Funds don\u2019t move until it\u2019s resolved. 24-hour SLA.", badge: "Protected" },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-[#F5F5F7]/60 p-8 transition-all hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,.06)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                    <f.icon className="h-5 w-5 text-[#1D1D1F]" />
                  </div>
                  <span className="rounded-full bg-[#F5F5F7] px-2.5 py-1 text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                    {f.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-[15px] font-display font-bold text-[#1D1D1F]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 7. COUTHACTS ADVANCE ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,199,89,.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#34C759]/20 bg-[#34C759]/10 px-4 py-1.5 mb-6">
                <Star className="h-3.5 w-3.5 text-[#34C759]" />
                <span className="text-[11px] font-semibold text-[#34C759] tracking-wide uppercase">
                  Elite Provider Program
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                CouthActs
                <span className="text-[#34C759]"> Advance</span>
              </h2>
              <p className="mt-6 text-[14px] text-white/35 leading-relaxed max-w-lg">
                Cash-flow tools built for top-tier providers. Get paid faster
                with invoice advances, maintain fleet readiness, and grow
                without the wait.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Invoice advances up to 70% of confirmed escrow value",
                  "Priority job matching for Elite-rated providers",
                  "Dedicated account manager and premium support",
                  "Lower escrow fees with volume-based pricing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-white/50">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#34C759] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/advance"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#34C759]/30 px-8 py-3.5 text-[13px] font-semibold text-[#34C759] transition-all hover:bg-[#34C759] hover:text-white"
              >
                Learn about Advance <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "70%", label: "Advance Rate", desc: "Of confirmed escrow value" },
                { value: "24h", label: "Funding Speed", desc: "After job confirmation" },
                { value: "1%", label: "Lowest Escrow", desc: "For $500K+ jobs" },
                { value: "Elite", label: "Score Tier", desc: "Required qualification" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#34C759]/15 bg-[#34C759]/5 p-6">
                  <p className="text-2xl font-display font-bold text-[#34C759] lg:text-3xl tabular-nums">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-white">
                    {s.label}
                  </p>
                  <p className="text-[11px] text-white/30">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 8. ACADEMY ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                CouthActs Academy
              </p>
              <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                Learn. Certify.
                <br />
                <span className="text-[#86868B]">Earn more.</span>
              </h2>
              <p className="mt-6 text-[14px] text-[#6E6E73] leading-relaxed">
                The CouthActs Academy trains providers to meet global
                transportation standards. Complete courses, earn certifications,
                boost your CouthActs Score, and unlock higher-tier jobs.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Safety & Compliance",
                  "Hazmat Handling",
                  "Customer Excellence",
                  "Fleet Management",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#E8E8ED] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/academy"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] transition-colors"
              >
                Explore Academy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative space-y-3">
              {[
                { icon: GraduationCap, title: "Certified Transport Safety", lessons: "12 modules", duration: "4 hours", badge: "Certification" },
                { icon: BookOpen, title: "Hazardous Materials Handling", lessons: "8 modules", duration: "3 hours", badge: "Certification" },
                { icon: Award, title: "Customer Excellence Program", lessons: "6 modules", duration: "2 hours", badge: "Score Boost" },
              ].map((course) => (
                <div
                  key={course.title}
                  className="flex items-center gap-5 rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 transition-all hover:shadow-[0_4px_24px_rgba(0,0,0,.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F7] flex-shrink-0">
                    <course.icon className="h-5 w-5 text-[#1D1D1F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold text-[#1D1D1F]">
                      {course.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-[#86868B]">
                      {course.lessons} &middot; {course.duration}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#EDF4FF] px-2.5 py-1 text-[10px] font-semibold text-[#007AFF] uppercase tracking-wider flex-shrink-0">
                    {course.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 9. ENTERPRISE + GOVERNMENT ═══════════════════════ */}
      <section className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-10 lg:p-12">
              <Building2 className="h-8 w-8 text-[#007AFF]" />
              <h3 className="mt-5 text-2xl font-display font-bold text-white lg:text-3xl">
                Enterprise
              </h3>
              <p className="mt-4 text-[14px] text-white/35 leading-relaxed">
                Volume-based pricing, dedicated account management, custom API
                integrations, SSO, and priority support for organizations moving
                more than 50 jobs per month.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Custom escrow terms and SLAs",
                  "Dedicated account team",
                  "API access with webhooks",
                  "White-label tracking portal",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/40">
                    <span className="h-1 w-1 rounded-full bg-[#007AFF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/enterprise"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold text-[#1D1D1F] transition-all hover:scale-[1.02] shadow-sm"
              >
                Contact Enterprise Sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-10 lg:p-12">
              <Landmark className="h-8 w-8 text-[#007AFF]" />
              <h3 className="mt-5 text-2xl font-display font-bold text-white lg:text-3xl">
                Government
              </h3>
              <p className="mt-4 text-[14px] text-white/35 leading-relaxed">
                Purpose-built for federal, state, and municipal agencies.
                Compliance-first infrastructure with full audit trails,
                procurement integrations, and regulatory controls.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "FedRAMP-aligned security controls",
                  "SAM.gov and procurement integration",
                  "Full audit trail and compliance reporting",
                  "Multi-agency fleet coordination",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/40">
                    <span className="h-1 w-1 rounded-full bg-[#007AFF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/government"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-white/10"
              >
                Government Solutions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 10. PROVIDER API ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:py-32 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
            Developer Platform
          </p>
          <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
            Build on CouthActs
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] max-w-xl mx-auto">
            RESTful API with webhooks, real-time tracking streams, and
            programmatic job management. Integrate transportation into your
            software.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { plan: "Starter", price: "Free", desc: "100 calls/day" },
              { plan: "Growth", price: "$299/mo", desc: "10K calls/day" },
              { plan: "Enterprise", price: "Custom", desc: "Unlimited + SLA" },
            ].map((p) => (
              <div
                key={p.plan}
                className="rounded-2xl bg-[#F5F5F7]/60 px-6 py-5 text-center min-w-[160px] transition-all hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,.06)]"
              >
                <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
                  {p.plan}
                </p>
                <p className="mt-1 text-xl font-display font-bold text-[#1D1D1F] tabular-nums">
                  {p.price}
                </p>
                <p className="text-[11px] text-[#86868B]">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#1D1D1F] px-8 py-4">
            <Code2 className="h-5 w-5 text-[#007AFF]" />
            <code className="text-[13px] text-[#5AC8FA] font-mono">
              POST /api/v1/jobs
            </code>
            <span className="text-[12px] text-white/30">
              &mdash; create a job in one request
            </span>
          </div>

          <div className="mt-8">
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] transition-colors"
            >
              View API documentation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 11. TRACK A JOB ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
            Track a Job
          </p>
          <h2 className="mt-3 text-2xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-3xl">
            Have a tracking code?
          </h2>
          <p className="mt-3 text-[13px] text-[#86868B]">
            Real-time status, live location, and full checkpoint history. No
            login required.
          </p>
          <TrackInput />
        </div>
      </section>

      {/* ═══════════════════════ 12. FINAL CTA ═══════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,122,255,.06),transparent_70%)] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 py-28 lg:py-36 text-center">
          <h2 className="text-4xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-5xl lg:text-6xl">
            The future of transportation
            <br />
            <span className="text-[#86868B]">is already here.</span>
          </h2>
          <p className="mt-6 text-lg text-[#6E6E73] mx-auto max-w-xl">
            Create your free CouthActs&#8482; account in under a minute. Move
            anything, anywhere, with complete protection.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#007AFF] px-10 py-4 text-[14px] font-semibold text-white shadow-lg shadow-[#007AFF]/20 transition-all hover:bg-[#0055D4] hover:scale-[1.02] sm:w-auto"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#E8E8ED] px-10 py-4 text-[14px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#F5F5F7] sm:w-auto"
            >
              Register as provider
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 13. FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo size="md" variant="white" href="/" />
              <p className="mt-5 text-[13px] text-white/30 leading-relaxed max-w-sm">
                The global transportation infrastructure platform. 18 modes.
                190+ countries. Every transaction protected by escrow.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.12em]">
                  Platform
                </p>
                {[
                  { href: "/browse", label: "Browse Jobs" },
                  { href: "/register", label: "Get Started" },
                  { href: "/register?role=PROVIDER", label: "For Providers" },
                  { href: "/enterprise", label: "Enterprise" },
                  { href: "/government", label: "Government" },
                ].map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="block text-white/30 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.12em]">
                  Resources
                </p>
                {[
                  { href: "/about", label: "About" },
                  { href: "/academy", label: "Academy" },
                  { href: "/advance", label: "Advance" },
                  { href: "/api-docs", label: "API Docs" },
                  { href: "/login", label: "Sign In" },
                  { href: "/settings", label: "Settings" },
                  { href: "/careers", label: "Careers" },
                  { href: "/press", label: "Press" },
                  { href: "/help", label: "Help Center" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/30 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.12em]">
                  Legal
                </p>
                {[
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/cookies", label: "Cookies" },
                  { href: "/acceptable-use", label: "Acceptable Use" },
                  { href: "/safety", label: "Safety" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/30 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <p className="text-[11px] text-white/20">
              &copy; {new Date().getFullYear()} CouthActs&#8482;. Founded
              November 27, 2021. Operated by CouthActs, Inc. Intellectual
              property of Enemo Consulting Group, Inc. All rights reserved.
            </p>
            <p className="text-[11px] text-white/20">
              The Adolphus Tower, Dallas, TX &middot; legal@couthacts.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
