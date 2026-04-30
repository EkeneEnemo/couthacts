import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Navbar } from "@/components/navbar";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";

export const metadata = {
  title: "About — CouthActs\u2122",
  description:
    "The global transportation infrastructure platform. Founded November 27, 2021 in Dallas, Texas. 18 modes. 190+ countries. Every transaction protected.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/50 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <span className="text-base">🌍</span>
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                The CouthActs story
              </span>
            </div>

            <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl">
              Built to move
              <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-[#FF7A59] to-[#FF6B9D] bg-clip-text text-transparent">
                the world.
              </span>
            </h1>
            <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed max-w-2xl">
              CouthActs&#8482; is the global transportation infrastructure that connects
              customers with verified providers across every mode on Earth. Born in
              Dallas on November 27, 2021, with a simple belief: moving things and
              people around the world should be safe, transparent, and friendly.
            </p>
            <p className="mt-4 text-[14px] text-[#1D1D1F]/50 leading-relaxed max-w-2xl">
              <strong className="text-[#1D1D1F]/70">CouthActs&#8482;, Inc.</strong> is a wholly owned subsidiary of <strong className="text-[#1D1D1F]/70">The Ravine of Willows, Inc.</strong>, a Texas corporation,
              with its principal place of business at The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202.
              All intellectual property and trademarks are wholly owned by <strong className="text-[#1D1D1F]/70">Enemo Consulting Group, Inc.&reg;</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Scale numbers */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: 18, suffix: "", label: "Transport modes", sub: "Ground · Air · Sea · Rail", color: "#007AFF" },
              { value: 190, suffix: "+", label: "Countries", sub: "Global reach", color: "#FF7A59" },
              { value: 9, suffix: "", label: "Tracking layers", sub: "Every mile accounted for", color: "#34C759" },
              { value: 4, suffix: "", label: "Years building", sub: "Since Nov 2021", color: "#FF6B9D" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all"
              >
                <p
                  className="text-3xl font-display font-black tabular-nums sm:text-4xl"
                  style={{ color: s.color }}
                >
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[13px] font-semibold text-[#1D1D1F]">{s.label}</p>
                <p className="text-[11px] text-[#1D1D1F]/50">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ OUR STORY ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
                Our story
              </p>
              <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
                From Dallas to
                <br />
                <span className="text-[#1D1D1F]/50">the whole world.</span>
              </h2>
              <div className="mt-6 space-y-5 text-[15px] text-[#1D1D1F]/65 leading-relaxed">
                <p>
                  We started on November 27, 2021, in Dallas, Texas, with a simple
                  conviction: moving things and people around the world should be safe,
                  transparent, and accessible to everyone. From day one, we set out to
                  build infrastructure that makes multimodal transportation work for
                  customers and providers alike &mdash; not just in one region, but globally.
                </p>
                <p>
                  What began as a bold idea has grown into a platform that spans 18
                  distinct transport modes &mdash; ground, air, maritime, and rail &mdash;
                  and serves people in more than 190 countries. We built CouthActs because
                  the transportation industry deserved something better: a platform that
                  puts trust, security, and fairness at the center of every move.
                </p>
                <p>
                  Too many people were left navigating broken systems with no recourse when
                  things went wrong. We believed there was a better way. So we&rsquo;re building it.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80"
                alt="The Adolphus Tower, Dallas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF5E6] text-xl">
                    🏙️
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FF7A59]">Headquarters</p>
                    <p className="text-[14px] font-display font-bold text-[#1D1D1F]">The Adolphus Tower</p>
                    <p className="text-[12px] text-[#1D1D1F]/55">1412 Main Street, STE 609</p>
                    <p className="text-[12px] text-[#1D1D1F]/55">Dallas, TX 75202</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MISSION & VISION ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">
              Why we exist
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Mission. Vision. Go.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="group rounded-[2.5rem] bg-gradient-to-br from-[#EAF4FF] via-white to-[#E8F7EC] p-10 lg:p-12 border border-white shadow-sm transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm transition-transform group-hover:rotate-[-8deg]">
                🎯
              </span>
              <h3 className="mt-6 text-3xl font-display font-bold text-[#1D1D1F]">
                Our mission.
              </h3>
              <p className="mt-4 text-[15px] text-[#1D1D1F]/65 leading-relaxed">
                To be the most trusted, transparent, and secure transportation platform
                in the world &mdash; empowering customers to move anything, anywhere,
                with confidence, and giving providers a level playing field to grow on.
              </p>
            </div>

            <div className="group rounded-[2.5rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#FFE8F0] p-10 lg:p-12 border border-white shadow-sm transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm transition-transform group-hover:rotate-[-8deg]">
                ✨
              </span>
              <h3 className="mt-6 text-3xl font-display font-bold text-[#1D1D1F]">
                Our vision.
              </h3>
              <p className="mt-4 text-[15px] text-[#1D1D1F]/65 leading-relaxed">
                A world where every move &mdash; from a birthday package across town to a
                container ship across the ocean &mdash; flows through one platform, with
                verified providers, protected payments, and real-time visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WHAT MAKES US DIFFERENT ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              What makes us different
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Not just another logistics app.
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55 max-w-xl mx-auto">
              Purpose-built transportation infrastructure that treats every participant
              &mdash; customer and provider &mdash; with equal respect and protection.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: "🔐", title: "Escrow-backed payments", desc: "Providers paid when they deliver. Customers never pay for undelivered services. Every dollar accounted for.", color: "#34C759", bg: "#E8F7EC" },
              { emoji: "🪪", title: "Rigorous verification", desc: "Government ID, business registration, regulatory credentials (DOT, MC, FMCSA, IMO, FAA), and insurance. No shortcuts.", color: "#007AFF", bg: "#E8F1FF" },
              { emoji: "🌐", title: "18 transport modes", desc: "Ground, air, maritime, rail. Full truckload to yacht charter. Unified system, consistent protections.", color: "#FF7A59", bg: "#FFF1E8" },
              { emoji: "🛰️", title: "Unified tracking", desc: "GPS for trucks. AIS for vessels. Transponders for aircraft. ELD for rail. One interface, every mode.", color: "#FFB020", bg: "#FFF5E6" },
              { emoji: "💱", title: "Built for the world", desc: "Multi-currency wallets, localized UX, international regulatory compliance. Dallas to everywhere.", color: "#5AC8FA", bg: "#E8F5FF" },
              { emoji: "⚖️", title: "Fair dispute resolution", desc: "Evidence upload, immediate escrow freeze, admin-mediated with a 24-hour SLA. A clear path when things go wrong.", color: "#FF6B9D", bg: "#FFE8F0" },
            ].map((d) => (
              <div
                key={d.title}
                className="group rounded-[1.5rem] bg-[#FFFBF5] border border-[#1D1D1F]/5 p-7 transition-all hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                  style={{ backgroundColor: d.bg }}
                >
                  {d.emoji}
                </span>
                <h3 className="mt-4 text-[15px] font-display font-bold text-[#1D1D1F]">
                  {d.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CORE VALUES ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF6B9D]">
              Core values
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              What we stand for.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: "🤝", title: "Trust", desc: "Every provider verified. Every payment escrowed. Every promise backed by systems designed to keep it.", color: "#007AFF", bg: "#E8F1FF" },
              { emoji: "👁️", title: "Transparency", desc: "No hidden fees, no opaque pricing, no black-box algorithms. You see exactly what you pay, earn, and where your shipment is.", color: "#34C759", bg: "#E8F7EC" },
              { emoji: "🛡️", title: "Protection", desc: "Escrow holds, protection tiers, SOS features, and dedicated dispute resolution. Both sides of every transaction safeguarded.", color: "#FF7A59", bg: "#FFF1E8" },
              { emoji: "⭐", title: "Excellence", desc: "High standards, for us and for providers. Quality isn&rsquo;t optional &mdash; it&rsquo;s the baseline.", color: "#FFB020", bg: "#FFF5E6" },
              { emoji: "💡", title: "Innovation", desc: "Real-time multimodal tracking, instant matching, open APIs. We keep pushing what a platform can do.", color: "#FF6B9D", bg: "#FFE8F0" },
              { emoji: "⚖️", title: "Equity", desc: "Level playing field for every provider, regardless of fleet size. Fair pricing, equal visibility, same protections.", color: "#5AC8FA", bg: "#E8F5FF" },
            ].map((v) => (
              <div
                key={v.title}
                className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                  style={{ backgroundColor: v.bg }}
                >
                  {v.emoji}
                </span>
                <h3 className="mt-4 text-xl font-display font-bold text-[#1D1D1F]">
                  {v.title}
                </h3>
                <p
                  className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: v.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRUST ENGINE SUMMARY ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
                Trust engine
              </p>
              <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
                Security isn&apos;t a feature.
                <br />
                <span className="text-[#1D1D1F]/50">It&apos;s the foundation.</span>
              </h2>
              <p className="mt-6 text-[15px] text-[#1D1D1F]/60 leading-relaxed max-w-md">
                Every layer of CouthActs is built around one principle: nothing moves
                without verification, nothing is paid without confirmation, and nothing
                is hidden from the people who need to see it.
              </p>
              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-7 py-3.5 text-[13px] font-semibold text-white hover:bg-[#007AFF] hover:scale-[1.03] transition-all"
              >
                Try it yourself <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🪪", label: "ID verification", desc: "Government-grade KYC/KYB", bg: "#E8F1FF" },
                { emoji: "🔐", label: "Escrow protection", desc: "Every transaction secured", bg: "#E8F7EC" },
                { emoji: "⚡", label: "CouthActs™ Score", desc: "Transparent reputation", bg: "#FFF1E8" },
                { emoji: "🛡️", label: "Protection tiers", desc: "Basic · Standard · Premium", bg: "#FFF5E6" },
                { emoji: "📡", label: "9-layer tracking", desc: "Pickup to delivery", bg: "#FFE8F0" },
                { emoji: "⚖️", label: "Dispute resolution", desc: "24-hour SLA", bg: "#E8F5FF" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="group rounded-[1.5rem] bg-[#FFFBF5] border border-[#1D1D1F]/5 p-5 transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                    style={{ backgroundColor: t.bg }}
                  >
                    {t.emoji}
                  </span>
                  <p className="mt-3 text-[13px] font-semibold text-[#1D1D1F]">
                    {t.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#1D1D1F]/50">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CORPORATE INFORMATION ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FFB020]">
              Who we are, officially
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              The paperwork.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Operator", value: "CouthActs™, Inc.", emoji: "🏢", bg: "#E8F1FF" },
              { label: "Parent company", value: "The Ravine of Willows, Inc. (Texas)", emoji: "🏛️", bg: "#E8F7EC" },
              { label: "IP & trademark owner", value: "Enemo Consulting Group, Inc.®", emoji: "💡", bg: "#FFF5E6" },
              { label: "Headquarters", value: "The Adolphus Tower, Dallas", emoji: "🏙️", bg: "#FFF1E8" },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
                  style={{ backgroundColor: c.bg }}
                >
                  {c.emoji}
                </span>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                  {c.label}
                </p>
                <p className="mt-1 text-[15px] font-display font-bold text-[#1D1D1F]">
                  {c.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 mx-auto max-w-3xl rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
            <p className="text-[13px] text-[#1D1D1F]/65 leading-relaxed">
              <strong className="text-[#1D1D1F]">CouthActs&#8482;, Inc.</strong> is a corporation that is a wholly owned subsidiary of <strong className="text-[#1D1D1F]">The Ravine of Willows, Inc.</strong>,
              a Texas corporation, with its principal place of business at The Adolphus Tower, 1412 Main Street,
              STE 609, Dallas, TX 75202. All intellectual property and trademarks associated with the CouthActs
              service — including source code, trademarks, service marks, logos, designs, documentation,
              algorithms, models, and proprietary methods — are wholly owned by <strong className="text-[#1D1D1F]">Enemo Consulting
              Group, Inc.&reg;</strong> CouthActs&#8482;, Inc. operates under license from Enemo Consulting Group, Inc.&reg;
            </p>
            <p className="mt-4 text-[12px] text-[#1D1D1F]/50">
              CouthActs&#8482; is a trademark of Enemo Consulting Group, Inc.&reg; All other trademarks, service marks,
              and logos used in connection with the CouthActs service are owned by Enemo Consulting Group, Inc.&reg;
              and used by CouthActs&#8482;, Inc. under license.
            </p>
            <p className="mt-6 text-[14px] text-[#1D1D1F]/55">
              For corporate inquiries:{" "}
              <a
                href="mailto:hello@couthacts.com"
                className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors"
              >
                hello@couthacts.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#FFD8B5]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#B5E3FF]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          <h2 className="text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl lg:text-7xl">
            Ready to
            <br />
            <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
              move something?
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#1D1D1F]/55 mx-auto max-w-xl">
            Come join the platform that puts trust, transparency, and protection at
            the center of every move.
          </p>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03] sm:w-auto"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              I drive / I deliver
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
              <p className="mt-5 text-[13px] text-white/40 leading-relaxed max-w-sm">
                The friendliest way to move anything, anywhere. 18 modes, 190+
                countries, and real humans you can trust.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">Platform</p>
                <Link href="/browse" className="block text-white/40 hover:text-white transition">Browse Jobs</Link>
                <Link href="/register" className="block text-white/40 hover:text-white transition">Get Started</Link>
                <Link href="/register?role=PROVIDER" className="block text-white/40 hover:text-white transition">For Providers</Link>
                <Link href="/enterprise" className="block text-white/40 hover:text-white transition">Enterprise</Link>
                <Link href="/government" className="block text-white/40 hover:text-white transition">Government</Link>
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">Resources</p>
                <Link href="/about" className="block text-white/40 hover:text-white transition">About</Link>
                <Link href="/academy" className="block text-white/40 hover:text-white transition">Academy</Link>
                <Link href="/advance" className="block text-white/40 hover:text-white transition">Advance</Link>
                <Link href="/api-docs" className="block text-white/40 hover:text-white transition">API Docs</Link>
                <Link href="/login" className="block text-white/40 hover:text-white transition">Sign In</Link>
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">Legal</p>
                <Link href="/terms" className="block text-white/40 hover:text-white transition">Terms of Service</Link>
                <Link href="/privacy" className="block text-white/40 hover:text-white transition">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-[11px] text-white/30 max-w-2xl leading-relaxed">
              &copy; {new Date().getFullYear()} CouthActs&#8482;, Inc. A wholly owned subsidiary of The Ravine of Willows, Inc., a Texas corporation. All intellectual property wholly owned by Enemo Consulting Group, Inc.&reg;
            </p>
            <p className="text-[11px] text-white/30 sm:text-right">
              The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202 &middot; legal@couthacts.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
