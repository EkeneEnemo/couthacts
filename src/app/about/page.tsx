import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Navbar } from "@/components/navbar";
import {
  ArrowRight,
  Shield,
  Eye,
  Zap,
  Lock,
  Fingerprint,
  Scale,
  Globe,
  MapPin,
  Users,
  Target,
  Sparkles,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";

export const metadata = {
  title: "About — CouthActs\u2122",
  description:
    "The global transportation infrastructure platform. Founded November 27, 2021 in Dallas, Texas. 18 modes. 190+ countries. Every transaction protected.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1D1D1F] min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1920&q=85"
            alt="Global transportation"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F]/60 via-[#1D1D1F]/80 to-[#1D1D1F]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              About CouthActs
            </p>
            <h1 className="mt-4 text-4xl font-display font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Built to move
              <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-[#007AFF] to-[#5856D6] bg-clip-text text-transparent">
                the world.
              </span>
            </h1>
            <p className="mt-6 text-[14px] text-white/35 leading-relaxed max-w-2xl">
              CouthActs&#8482; is the global transportation infrastructure that
              connects customers with verified providers across every mode of
              transport on Earth. Founded on November 27, 2021, in Dallas,
              Texas, with a singular conviction: moving goods and people
              across the world should be safe, transparent, and accessible to
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SCALE NUMBERS ═══════════════════════ */}
      <section className="bg-[#1D1D1F] border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: 18, suffix: "", label: "Transport Modes", sub: "Ground \u00B7 Air \u00B7 Sea \u00B7 Rail" },
              { value: 190, suffix: "+", label: "Countries", sub: "Global reach" },
              { value: 9, suffix: "", label: "Tracking Layers", sub: "Every mile accounted for" },
              { value: 4, suffix: "", label: "Years Building", sub: "Since November 2021" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-display font-bold text-white sm:text-4xl">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[13px] font-semibold text-[#007AFF]">
                  {s.label}
                </p>
                <p className="text-[11px] text-white/35">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ OUR STORY ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                Our Story
              </p>
              <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                From Dallas to the world.
              </h2>
              <div className="mt-6 space-y-5 text-[14px] text-[#6E6E73] leading-relaxed">
                <p>
                  CouthActs&#8482; was founded on November 27, 2021, in Dallas,
                  Texas, with a singular conviction: that moving goods and
                  people across the world should be safe, transparent, and
                  accessible to everyone. From day one, our team set out to
                  build the infrastructure that makes multimodal transportation
                  work for customers and providers alike&mdash;not just in one
                  region, but globally.
                </p>
                <p>
                  What started as a bold idea in Dallas has grown into a
                  platform that spans 18 distinct transportation
                  modes&mdash;ground, air, maritime, and rail&mdash;and serves
                  users in more than 190 countries. We built CouthActs because
                  the transportation industry deserved a platform that puts
                  trust, security, and fairness at the center of every
                  transaction.
                </p>
                <p>
                  Too many people were left navigating fragmented systems with
                  no recourse when things went wrong. We believed there was a
                  better way, and we set out to build it.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,.04)]">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80"
                alt="CouthActs headquarters — The Adolphus Tower, Dallas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                  Headquarters
                </p>
                <p className="mt-1 text-lg font-display font-bold text-white">
                  The Adolphus Tower
                </p>
                <p className="text-[13px] text-white/35">Dallas, Texas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MISSION & VISION ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Purpose
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Why we exist.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-10 lg:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                <Target className="h-5 w-5 text-[#1D1D1F]" />
              </div>
              <h3 className="mt-6 text-2xl font-display font-bold text-[#1D1D1F]">
                Our Mission
              </h3>
              <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
                To provide the most trusted, transparent, and secure
                transportation platform in the world&mdash;empowering
                customers to move anything, anywhere, with confidence, and
                enabling providers to grow their businesses on a level playing
                field.
              </p>
            </div>

            <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-10 lg:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                <Sparkles className="h-5 w-5 text-[#1D1D1F]" />
              </div>
              <h3 className="mt-6 text-2xl font-display font-bold text-[#1D1D1F]">
                Our Vision
              </h3>
              <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
                A world where every transportation need&mdash;from a single
                package across town to a container ship across the
                ocean&mdash;can be fulfilled through one platform, backed by
                verified providers, protected payments, and real-time
                visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHAT MAKES US DIFFERENT ═══════════════════════ */}
      <section className="bg-[#1D1D1F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-[#007AFF] blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              The Difference
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Not just another logistics platform.
            </h2>
            <p className="mt-4 text-[14px] text-white/35 max-w-xl mx-auto">
              CouthActs is purpose-built transportation infrastructure that
              treats every participant&mdash;customer and provider&mdash;with
              equal respect and protection.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Escrow-Backed Payments",
                desc: "Providers get paid when they deliver. Customers never pay for incomplete services. Every dollar accounted for, every transaction traceable.",
              },
              {
                icon: Fingerprint,
                title: "Rigorous Verification",
                desc: "Government-issued ID, business registrations, regulatory credentials (DOT, MC, FMCSA, IMO, FAA), and insurance documentation. No shortcuts.",
              },
              {
                icon: Globe,
                title: "18 Transport Modes",
                desc: "Ground, air, maritime, and rail. Full truckload to yacht charter. No other platform offers this breadth under one unified system with consistent protections.",
              },
              {
                icon: Eye,
                title: "Unified Tracking",
                desc: "GPS for trucks. AIS for vessels. Transponder for aircraft. ELD for rail. One interface, every mode, pickup to delivery.",
              },
              {
                icon: MapPin,
                title: "Built for the World",
                desc: "Multi-currency wallets, localized experiences, international regulatory compliance. Dallas to the world.",
              },
              {
                icon: Scale,
                title: "Fair Dispute Resolution",
                desc: "Evidence upload, immediate escrow freeze, admin-mediated resolution with 24-hour SLA. When things go wrong, there is always a clear path.",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-7 transition-all hover:bg-white/[0.06]"
              >
                <d.icon className="h-6 w-6 text-[#007AFF]" />
                <h3 className="mt-4 text-[14px] font-display font-semibold text-white">
                  {d.title}
                </h3>
                <p className="mt-2 text-[13px] text-white/35 leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CORE VALUES ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Core Values
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              What we stand for.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Trust",
                desc: "Every provider is verified. Every payment is escrowed. Every promise on our platform is backed by systems designed to keep it.",
              },
              {
                icon: Eye,
                title: "Transparency",
                desc: "No hidden fees, no opaque pricing, no black-box algorithms. You see exactly what you pay, what you earn, and where your shipment is.",
              },
              {
                icon: Lock,
                title: "Protection",
                desc: "Escrow holds, protection tiers, SOS features, and a dedicated dispute resolution process ensure both sides of every transaction are safeguarded.",
              },
              {
                icon: Zap,
                title: "Excellence",
                desc: "We hold ourselves and our providers to the highest standards. Quality of service is not optional\u2014it is the baseline expectation.",
              },
              {
                icon: Sparkles,
                title: "Innovation",
                desc: "From real-time multimodal tracking to instant job matching, we continuously push the boundaries of what a transportation platform can do.",
              },
              {
                icon: Users,
                title: "Equity",
                desc: "A level playing field for every provider, regardless of fleet size. Fair pricing, equal visibility, and the same protections for all.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 transition-all hover:shadow-[0_4px_30px_rgba(0,0,0,.08)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5F5F7]">
                  <v.icon className="h-5 w-5 text-[#1D1D1F]" />
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">
                  {v.title}
                </h3>
                <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST ENGINE SUMMARY ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                Trust Engine
              </p>
              <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                Security isn&apos;t a feature.
                <br />
                <span className="text-[#86868B]">
                  It&apos;s the foundation.
                </span>
              </h2>
              <p className="mt-6 text-[14px] text-[#6E6E73] leading-relaxed">
                Every layer of CouthActs is engineered around one
                principle: nothing moves without verification, nothing is
                paid without confirmation, and nothing is hidden from the
                people who need to see it.
              </p>
              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4] transition"
              >
                Experience it yourself <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Fingerprint, label: "ID Verification", desc: "Government-grade KYC/KYB" },
                { icon: Lock, label: "Escrow Protection", desc: "Every transaction secured" },
                { icon: Zap, label: "CouthActs\u2122 Score", desc: "Transparent reputation" },
                { icon: Shield, label: "Protection Tiers", desc: "Basic \u00B7 Standard \u00B7 Premium" },
                { icon: Eye, label: "9-Layer Tracking", desc: "Pickup to delivery" },
                { icon: Scale, label: "Dispute Resolution", desc: "24-hour SLA" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-5 transition-all hover:shadow-[0_4px_30px_rgba(0,0,0,.08)]"
                >
                  <t.icon className="h-5 w-5 text-[#1D1D1F]" />
                  <p className="mt-3 text-[13px] font-semibold text-[#1D1D1F]">
                    {t.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#86868B]">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CORPORATE INFORMATION ═══════════════════════ */}
      <section className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Corporate Information
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Who we are.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Operated By",
                value: "CouthActs, Inc.",
              },
              {
                label: "Intellectual Property",
                value: "Enemo Consulting Group, Inc.",
              },
              {
                label: "Headquarters",
                value: "The Adolphus Tower, Dallas, Texas",
              },
              {
                label: "Founded",
                value: "November 27, 2021",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                  {c.label}
                </p>
                <p className="mt-3 text-lg font-display font-bold text-white">
                  {c.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[13px] text-white/35">
              For corporate inquiries, contact{" "}
              <a
                href="mailto:hello@couthacts.com"
                className="text-[#007AFF] hover:text-white transition font-medium"
              >
                hello@couthacts.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-4xl px-6 py-28 lg:py-36 text-center">
          <h2 className="text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
            Ready to move?
          </h2>
          <p className="mt-6 text-[14px] text-[#6E6E73] mx-auto max-w-xl">
            Join the global transportation platform that puts trust,
            transparency, and protection at the center of everything.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#007AFF] px-10 py-4 text-[13px] font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,.04)] transition-all hover:bg-[#0055D4] hover:scale-[1.02] sm:w-auto"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#E8E8ED]/60 px-10 py-4 text-[13px] font-semibold text-[#1D1D1F] transition-all hover:bg-white sm:w-auto"
            >
              Register as provider
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo size="md" variant="white" href="/" />
              <p className="mt-5 text-[13px] text-white/35 leading-relaxed max-w-sm">
                The global transportation infrastructure platform. 18 modes.
                190+ countries. Every transaction protected by escrow.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-[13px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                  Platform
                </p>
                <Link href="/browse" className="block text-white/35 hover:text-white transition">Browse Jobs</Link>
                <Link href="/register" className="block text-white/35 hover:text-white transition">Get Started</Link>
                <Link href="/register?role=PROVIDER" className="block text-white/35 hover:text-white transition">For Providers</Link>
                <Link href="/enterprise" className="block text-white/35 hover:text-white transition">Enterprise</Link>
                <Link href="/government" className="block text-white/35 hover:text-white transition">Government</Link>
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                  Resources
                </p>
                <Link href="/about" className="block text-white/35 hover:text-white transition">About</Link>
                <Link href="/academy" className="block text-white/35 hover:text-white transition">Academy</Link>
                <Link href="/advance" className="block text-white/35 hover:text-white transition">Advance</Link>
                <Link href="/api-docs" className="block text-white/35 hover:text-white transition">API Docs</Link>
                <Link href="/login" className="block text-white/35 hover:text-white transition">Sign In</Link>
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                  Legal
                </p>
                <Link href="/terms" className="block text-white/35 hover:text-white transition">Terms of Service</Link>
                <Link href="/privacy" className="block text-white/35 hover:text-white transition">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <p className="text-[11px] text-white/35">
              &copy; {new Date().getFullYear()} CouthActs&#8482;. Founded
              November 27, 2021. Operated by CouthActs, Inc. Intellectual
              property of Enemo Consulting Group, Inc. All rights reserved.
            </p>
            <p className="text-[11px] text-white/35">
              The Adolphus Tower, Dallas, TX &middot; legal@couthacts.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
