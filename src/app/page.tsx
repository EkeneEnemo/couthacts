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
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      {/* ═══════════════════════ 1. HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-ocean-900 min-h-screen flex items-center">
        <VideoHero />

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <div className="flex flex-col items-center text-center pt-24 pb-32 lg:pt-0 lg:pb-40">
            {/* Live badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-2 mb-10">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-sky-300 tracking-wide">
                Platform live &mdash; 190+ countries
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up animation-delay-150 text-5xl font-display font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Move Anything.
              <br />
              Anywhere.
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-sky-200 bg-clip-text text-transparent">
                Protected.
              </span>
            </h1>

            {/* Subline */}
            <p className="animate-fade-up animation-delay-300 mt-8 text-lg text-sky-100/70 leading-relaxed max-w-2xl lg:text-xl">
              CouthActs&#8482; is the global transportation infrastructure that
              powers the movement of people and goods across every mode on
              Earth&mdash;ground, air, sea, and rail. One platform. Complete
              protection. No exceptions.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up animation-delay-450 mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-ocean-900 shadow-2xl shadow-black/20 transition-all hover:shadow-black/30 hover:scale-[1.02]"
              >
                Start moving
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/register?role=PROVIDER"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-10 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Join as provider
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-up animation-delay-600 mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-sky-300/50">
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

        {/* Live stats bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] bg-ocean-900/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: 18, suffix: "", label: "Transport Modes" },
                { value: 190, suffix: "+", label: "Countries" },
                { value: 100, suffix: "%", label: "Escrow Protected" },
                { value: 9, suffix: "", label: "Tracking Layers" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-white sm:text-3xl">
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-sky-300/60 uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 2. TRANSPORT MODES ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              Our Network
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl lg:text-5xl">
              Every mode of transportation.
              <br />
              <span className="text-gray-400">One global platform.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Ground",
                count: "6 modes",
                items:
                  "Taxi \u00B7 Limo \u00B7 Courier \u00B7 Moving \u00B7 Freight \u00B7 Heavy Haul",
                image:
                  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80",
                alt: "Fleet of trucks on highway",
              },
              {
                title: "Air",
                count: "4 modes",
                items:
                  "Private Jet \u00B7 Helicopter \u00B7 Airline \u00B7 Air Cargo",
                image:
                  "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80",
                alt: "Private jet in flight",
              },
              {
                title: "Maritime",
                count: "3 modes",
                items: "Cargo Ship \u00B7 Yacht Charter \u00B7 Ferry",
                image:
                  "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80",
                alt: "Cargo ship at sea",
              },
              {
                title: "Specialty",
                count: "5 modes",
                items:
                  "Rail \u00B7 Armored \u00B7 Medical \u00B7 Hazmat \u00B7 Oversized",
                image:
                  "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
                alt: "Freight train on tracks",
              },
            ].map((v) => (
              <Link
                key={v.title}
                href="/register"
                className="group relative overflow-hidden rounded-2xl bg-ocean-900 aspect-[16/10]"
              >
                <Image
                  src={v.image}
                  alt={v.alt}
                  fill
                  className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
                    {v.count}
                  </p>
                  <h3 className="mt-2 text-2xl font-display font-bold text-white lg:text-3xl">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-sky-100/60 leading-relaxed">
                    {v.items}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-300 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
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
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              Who We Serve
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              Built for everyone who moves.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                title: "Enterprise & Government",
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
                className="group rounded-2xl border border-gray-100 bg-cream-50 p-8 transition-all hover:shadow-lg hover:shadow-ocean-900/5 hover:border-sky-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-900 text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-ocean-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 transition-colors hover:text-ocean-700"
                >
                  {s.cta}{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4. HOW IT WORKS ═══════════════════════ */}
      <section className="bg-cream-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              Four steps. Complete control.
            </h2>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                {/* Large background number */}
                <span className="absolute -top-4 -left-2 text-[7rem] font-display font-black text-ocean-900/[0.04] leading-none select-none pointer-events-none">
                  {s.num}
                </span>
                <div className="relative">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ocean-900 text-sm font-bold text-white shadow-lg shadow-ocean-900/20">
                    {s.num}
                  </span>
                  <h3 className="mt-5 text-lg font-display font-bold text-ocean-900">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block mt-0 relative">
            <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-ocean-200 to-transparent" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 5. TRACKING LAYERS ═══════════════════════ */}
      <section className="bg-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-sky-300 blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
              9 Tracking Layers
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Know where everything is.
              <br />
              <span className="text-sky-300">Always.</span>
            </h2>
            <p className="mt-4 text-base text-sky-200/50">
              Every transport mode has purpose-built tracking. Nine layers
              working together so nothing is ever out of sight.
            </p>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Live GPS",
                desc: "Real-time ground vehicle position updates every 15 seconds.",
              },
              {
                icon: Plane,
                title: "Flight Tracking",
                desc: "ADS-B integration for private jets, helicopters, and air cargo.",
              },
              {
                icon: Anchor,
                title: "Maritime AIS",
                desc: "Automatic Identification System for cargo ships and yacht charters.",
              },
              {
                icon: QrCode,
                title: "QR/PIN Confirmation",
                desc: "Cryptographic proof of pickup and delivery. Tamper-proof.",
              },
              {
                icon: Camera,
                title: "Photo Checkpoints",
                desc: "Timestamped, geotagged photos at every major milestone.",
              },
              {
                icon: Thermometer,
                title: "Condition Monitoring",
                desc: "Temperature, humidity, and shock sensors for sensitive cargo.",
              },
              {
                icon: Satellite,
                title: "Satellite Positioning",
                desc: "GPS + GLONASS for areas with limited cellular coverage.",
              },
              {
                icon: Radio,
                title: "Geofence Alerts",
                desc: "Automated notifications when shipments enter or leave defined zones.",
              },
              {
                icon: Eye,
                title: "Timeline History",
                desc: "Full checkpoint timeline with audit trail. Exportable as PDF.",
              },
            ].map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06]"
              >
                <t.icon className="h-5 w-5 text-sky-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-xs text-sky-200/40 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 6. TRUST ENGINE ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
              Trust Engine
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
              Security isn&apos;t a feature.
              <br />
              <span className="text-gray-400">
                It&apos;s the foundation.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Fingerprint,
                title: "ID Verified",
                desc: "Every user and provider passes Persona government ID verification. $20 per attempt\u2014no exceptions, no shortcuts.",
                badge: "Required",
              },
              {
                icon: Lock,
                title: "Escrow Protection",
                desc: "Customer funds are held from the moment a job is posted. Providers are paid only after both parties confirm completion.",
                badge: "Every job",
              },
              {
                icon: Zap,
                title: "CouthActs\u2122 Score",
                desc: "Proprietary algorithm rating every provider on reliability, on-time delivery, communication, and dispute history. Visible to all.",
                badge: "Transparent",
              },
              {
                icon: Shield,
                title: "Protection Tiers",
                desc: "Basic, Standard, and Premium protection tiers. Customers can require matching coverage on every posting.",
                badge: "Tiered",
              },
              {
                icon: Eye,
                title: "9-Layer Tracking",
                desc: "GPS, flight, AIS, QR/PIN, photo checkpoints, condition monitoring, satellite, geofencing, and full audit timeline.",
                badge: "Comprehensive",
              },
              {
                icon: Scale,
                title: "Dispute Resolution",
                desc: "Evidence upload, immediate escrow freeze, admin-mediated resolution. Funds don\u2019t move until it\u2019s resolved. 24-hour SLA.",
                badge: "Protected",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-100 bg-cream-50 p-8 transition-all hover:shadow-lg hover:shadow-ocean-900/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-50">
                    <f.icon className="h-5 w-5 text-ocean-700" />
                  </div>
                  <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-[10px] font-bold text-ocean-700 uppercase tracking-wider">
                    {f.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-display font-bold text-ocean-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 7. COUTHACTS ADVANCE ═══════════════════════ */}
      <section className="relative overflow-hidden bg-ocean-900">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#C9901A] blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C9901A]/30 bg-[#C9901A]/10 px-4 py-1.5 mb-6">
                <Star className="h-3.5 w-3.5 text-[#C9901A]" />
                <span className="text-xs font-bold text-[#C9901A] tracking-wide uppercase">
                  Elite Provider Program
                </span>
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                CouthActs
                <span className="text-[#C9901A]"> Advance</span>
              </h2>
              <p className="mt-6 text-base text-sky-100/60 leading-relaxed max-w-lg">
                Cash-flow tools built for top-tier providers. Get paid faster
                with invoice advances, maintain fleet readiness, and grow
                without the wait.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Invoice advances up to 80% of confirmed job value",
                  "Priority job matching for Elite-rated providers",
                  "Dedicated account manager and premium support",
                  "Lower escrow fees with volume-based pricing",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-sky-100/70"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C9901A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/advance"
                className="mt-10 inline-flex items-center gap-2 rounded-full border-2 border-[#C9901A] px-8 py-3.5 text-sm font-bold text-[#C9901A] transition-all hover:bg-[#C9901A] hover:text-white"
              >
                Learn about Advance{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  value: "80%",
                  label: "Advance Rate",
                  desc: "Of confirmed job value",
                },
                {
                  value: "24h",
                  label: "Funding Speed",
                  desc: "After job confirmation",
                },
                {
                  value: "1%",
                  label: "Lowest Escrow",
                  desc: "For $500K+ jobs",
                },
                {
                  value: "Elite",
                  label: "Score Tier",
                  desc: "Required qualification",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#C9901A]/20 bg-[#C9901A]/5 p-6"
                >
                  <p className="text-2xl font-display font-bold text-[#C9901A] lg:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {s.label}
                  </p>
                  <p className="text-xs text-sky-200/40">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 8. ACADEMY ═══════════════════════ */}
      <section className="bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                CouthActs Academy
              </p>
              <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
                Learn. Certify.
                <br />
                <span className="text-gray-400">Earn more.</span>
              </h2>
              <p className="mt-6 text-base text-gray-500 leading-relaxed">
                The CouthActs Academy trains providers to meet global
                transportation standards. Complete courses, earn certifications,
                boost your CouthActs Score, and unlock higher-tier jobs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Safety & Compliance",
                  "Hazmat Handling",
                  "Customer Excellence",
                  "Fleet Management",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-ocean-50 px-3.5 py-1.5 text-xs font-semibold text-ocean-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/academy"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-ocean-600 hover:text-ocean-700 transition"
              >
                Explore Academy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Course card stack */}
            <div className="relative">
              <div className="space-y-4">
                {[
                  {
                    icon: GraduationCap,
                    title: "Certified Transport Safety",
                    lessons: "12 modules",
                    duration: "4 hours",
                    badge: "Certification",
                  },
                  {
                    icon: BookOpen,
                    title: "Hazardous Materials Handling",
                    lessons: "8 modules",
                    duration: "3 hours",
                    badge: "Certification",
                  },
                  {
                    icon: Award,
                    title: "Customer Excellence Program",
                    lessons: "6 modules",
                    duration: "2 hours",
                    badge: "Score Boost",
                  },
                ].map((course) => (
                  <div
                    key={course.title}
                    className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-50 flex-shrink-0">
                      <course.icon className="h-5 w-5 text-ocean-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-ocean-900">
                        {course.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {course.lessons} &middot; {course.duration}
                      </p>
                    </div>
                    <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold text-sky-700 uppercase tracking-wider flex-shrink-0">
                      {course.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 9. ENTERPRISE + GOVERNMENT ═══════════════════════ */}
      <section className="bg-ocean-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Enterprise */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-10 lg:p-12">
              <Building2 className="h-8 w-8 text-sky-400" />
              <h3 className="mt-5 text-2xl font-display font-bold text-white lg:text-3xl">
                Enterprise
              </h3>
              <p className="mt-4 text-base text-sky-100/50 leading-relaxed">
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
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-sky-100/60"
                  >
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/enterprise"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ocean-900 transition-all hover:scale-[1.02]"
              >
                Contact Enterprise Sales{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Government */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-10 lg:p-12">
              <Landmark className="h-8 w-8 text-sky-400" />
              <h3 className="mt-5 text-2xl font-display font-bold text-white lg:text-3xl">
                Government
              </h3>
              <p className="mt-4 text-base text-sky-100/50 leading-relaxed">
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
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-sky-100/60"
                  >
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/government"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Government Solutions{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 10. PROVIDER API ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Developer Platform
          </p>
          <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-ocean-900 sm:text-4xl">
            Build on CouthActs
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            RESTful API with webhooks, real-time tracking streams, and
            programmatic job management. Integrate transportation into your
            software.
          </p>

          {/* Plan pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { plan: "Starter", price: "Free", desc: "100 calls/day" },
              { plan: "Growth", price: "$299/mo", desc: "10K calls/day" },
              {
                plan: "Enterprise",
                price: "Custom",
                desc: "Unlimited + SLA",
              },
            ].map((p) => (
              <div
                key={p.plan}
                className="rounded-2xl border border-gray-200 bg-cream-50 px-6 py-4 text-center min-w-[160px]"
              >
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {p.plan}
                </p>
                <p className="mt-1 text-xl font-display font-bold text-ocean-900">
                  {p.price}
                </p>
                <p className="text-xs text-gray-400">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Code preview hint */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-ocean-900 px-8 py-4">
            <Code2 className="h-5 w-5 text-sky-400" />
            <code className="text-sm text-sky-300 font-mono">
              POST /api/v1/jobs
            </code>
            <span className="text-xs text-sky-200/40">
              &mdash; create a job in one request
            </span>
          </div>

          <div className="mt-8">
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 text-sm font-bold text-ocean-600 hover:text-ocean-700 transition"
            >
              View API documentation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 11. TRACK A JOB ═══════════════════════ */}
      <section className="bg-cream-50 border-y border-gray-100">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Track a Job
          </p>
          <h2 className="mt-3 text-2xl font-display font-bold tracking-tight text-ocean-900 sm:text-3xl">
            Have a tracking code?
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Real-time status, live location, and full checkpoint history. No
            login required.
          </p>
          <TrackInput />
        </div>
      </section>

      {/* ═══════════════════════ 12. FINAL CTA ═══════════════════════ */}
      <section className="relative overflow-hidden bg-cream-50">
        <div className="mx-auto max-w-4xl px-6 py-28 lg:py-36 text-center">
          <h2 className="text-4xl font-display font-black tracking-tight text-ocean-900 sm:text-5xl lg:text-6xl">
            The future of transportation
            <br />
            <span className="text-gray-400">is already here.</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 mx-auto max-w-xl">
            Create your free CouthActs&#8482; account in under a minute. Move
            anything, anywhere, with complete protection.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean-900 px-10 py-4 text-sm font-bold text-white shadow-2xl shadow-ocean-900/20 transition-all hover:bg-ocean-800 hover:scale-[1.02] sm:w-auto"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-ocean-200 px-10 py-4 text-sm font-bold text-ocean-700 transition-all hover:bg-ocean-50 sm:w-auto"
            >
              Register as provider
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 13. FOOTER ═══════════════════════ */}
      <footer className="bg-ocean-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Logo size="md" variant="white" href="/" />
              <p className="mt-5 text-sm text-sky-200/50 leading-relaxed max-w-sm">
                The global transportation infrastructure platform. 18 modes.
                190+ countries. Every transaction protected by escrow.
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-sm">
                <p className="font-bold text-sky-300 text-xs uppercase tracking-wider">
                  Platform
                </p>
                <Link
                  href="/browse"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Browse Jobs
                </Link>
                <Link
                  href="/register"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Get Started
                </Link>
                <Link
                  href="/register?role=PROVIDER"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  For Providers
                </Link>
                <Link
                  href="/enterprise"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Enterprise
                </Link>
                <Link
                  href="/government"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Government
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <p className="font-bold text-sky-300 text-xs uppercase tracking-wider">
                  Resources
                </p>
                <Link
                  href="/about"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  About
                </Link>
                <Link
                  href="/academy"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Academy
                </Link>
                <Link
                  href="/advance"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Advance
                </Link>
                <Link
                  href="/api-docs"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  API Docs
                </Link>
                <Link
                  href="/login"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/settings"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Settings
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <p className="font-bold text-sky-300 text-xs uppercase tracking-wider">
                  Legal
                </p>
                <Link
                  href="/terms"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="block text-sky-200/50 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <p className="text-xs text-sky-200/30">
              &copy; {new Date().getFullYear()} CouthActs&#8482;. Founded
              November 27, 2021. Operated by CouthActs, Inc. Intellectual
              property of Enemo Consulting Group, Inc. All rights reserved.
            </p>
            <p className="text-xs text-sky-200/30">
              The Adolphus Tower, Dallas, TX &middot; legal@couthacts.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
