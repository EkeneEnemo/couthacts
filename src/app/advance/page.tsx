import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { AnimatedCounter } from "@/components/animated-counter";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "CouthActs Advance — Get Paid Faster",
  description:
    "Cash-flow tools for Elite providers. Get 70% of your escrow advanced before job completion.",
};

export default function AdvancePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#E8F7EC]/60 blur-3xl" />
        <div className="pointer-events-none absolute top-0 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#FFE3A3]/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <span className="text-base">⚡</span>
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                Elite provider program
              </span>
            </div>

            <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl">
              Get paid.
              <br />
              <span className="bg-gradient-to-r from-[#34C759] via-[#007AFF] to-[#34C759] bg-clip-text text-transparent">
                Fast.
              </span>
            </h1>
            <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed max-w-2xl">
              Don&rsquo;t wait for escrow to release. Pull up to{" "}
              <span className="font-semibold text-[#34C759]">70% of your job&apos;s value</span>{" "}
              into your wallet while the wheels are still turning. Built for the Elite
              providers who keep the world moving.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/register?role=PROVIDER"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.2)] transition-all hover:bg-[#34C759] hover:scale-[1.03]"
              >
                Become a provider
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
              >
                Check my eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KEY NUMBERS ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: 70, suffix: "%", label: "Advance rate", sub: "Of escrow", color: "#34C759", bg: "#E8F7EC" },
              { value: 2.5, suffix: "%", label: "Advance fee", sub: "One-time", color: "#007AFF", bg: "#E8F1FF" },
              { value: 90, suffix: "+", label: "Score needed", sub: "Elite tier", color: "#FF7A59", bg: "#FFF1E8" },
              { value: 50, suffix: "+", label: "Jobs needed", sub: "Completed", color: "#FF6B9D", bg: "#FFE8F0" },
            ].map((s) => (
              <div
                key={s.label}
                className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <p
                  className="text-3xl font-display font-black tabular-nums sm:text-4xl"
                  style={{ color: s.color }}
                >
                  <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                </p>
                <p className="mt-2 text-[13px] font-semibold text-[#1D1D1F]">{s.label}</p>
                <p className="text-[11px] text-[#1D1D1F]/50">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Escrow to wallet in minutes.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", emoji: "✅", title: "Accept a job", desc: "Customer accepts your bid. Their full budget locks in escrow.", color: "#34C759", bg: "#E8F7EC" },
              { num: "02", emoji: "🚀", title: "Start the job", desc: "Begin transport. Once booking hits IN_PROGRESS, you're eligible.", color: "#007AFF", bg: "#E8F1FF" },
              { num: "03", emoji: "💸", title: "Request advance", desc: "From your dashboard, pull 70% into your wallet. Instant.", color: "#FF7A59", bg: "#FFF1E8" },
              { num: "04", emoji: "🎉", title: "Complete & settle", desc: "Finish the job. The 2.5% fee comes out of the final escrow release.", color: "#FF6B9D", bg: "#FFE8F0" },
            ].map((s) => (
              <div
                key={s.num}
                className="group relative rounded-[2rem] bg-[#FFFBF5] border border-[#1D1D1F]/5 p-7 transition-all hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>
                    Step {s.num}
                  </span>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[10deg]"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.emoji}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">{s.title}</h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ EXAMPLE CALCULATION ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Show me the money
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              See the math.
            </h2>
          </div>

          <div className="mt-12 rounded-[2rem] bg-white border border-[#1D1D1F]/5 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
            <table className="w-full text-[14px]">
              <thead className="bg-[#1D1D1F] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Item</th>
                  <th className="px-6 py-4 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D1D1F]/5">
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1D1D1F]">Job escrow (customer&apos;s budget)</td>
                  <td className="px-6 py-4 text-right text-[#1D1D1F]/60">$10,000.00</td>
                </tr>
                <tr className="bg-[#E8F7EC]/50">
                  <td className="px-6 py-4 font-semibold text-[#34C759]">💸 Advance (70% of escrow)</td>
                  <td className="px-6 py-4 text-right font-bold text-[#34C759] text-lg">$7,000.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1D1D1F]">Advance fee (2.5%)</td>
                  <td className="px-6 py-4 text-right text-[#1D1D1F]/60">&minus;$175.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1D1D1F]">Escrow fee (4% for $5K&ndash;$50K bracket)</td>
                  <td className="px-6 py-4 text-right text-[#1D1D1F]/60">&minus;$400.00</td>
                </tr>
                <tr className="bg-[#FFFBF5]">
                  <td className="px-6 py-4 font-semibold text-[#1D1D1F]">Remaining on completion</td>
                  <td className="px-6 py-4 text-right font-bold text-[#1D1D1F]">$2,425.00</td>
                </tr>
                <tr className="bg-gradient-to-r from-[#E8F7EC] to-[#EAF4FF]">
                  <td className="px-6 py-4 font-bold text-[#1D1D1F]">🎉 Total provider earnings</td>
                  <td className="px-6 py-4 text-right font-display font-black text-[#34C759] text-xl">$9,425.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-[12px] text-[#1D1D1F]/45">
            Advance fee only applies when you use the Advance feature. Standard escrow fees apply regardless.
          </p>
        </div>
      </section>

      {/* ═══════════════════════ ELIGIBILITY ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              Who gets in
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Four requirements. No exceptions.
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55">
              Advance is reserved for providers we trust most.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {[
              { emoji: "⚡", title: "Score 90+", desc: "Elite tier. Top marks on completion, on-time, reviews.", badge: "Elite", color: "#FF7A59", bg: "#FFF1E8" },
              { emoji: "🏆", title: "50+ completed jobs", desc: "Real track record. Not a weekend hobby.", badge: "Track record", color: "#34C759", bg: "#E8F7EC" },
              { emoji: "🧼", title: "Zero open disputes", desc: "Clean slate at the moment of request.", badge: "Clean", color: "#007AFF", bg: "#E8F1FF" },
              { emoji: "💳", title: "Stripe Connect active", desc: "Account verified and ready to receive withdrawals.", badge: "Ready", color: "#FF6B9D", bg: "#FFE8F0" },
            ].map((r) => (
              <div
                key={r.title}
                className="group rounded-[2rem] bg-[#FFFBF5] border border-[#1D1D1F]/5 p-8 transition-all hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:rotate-[-8deg]"
                    style={{ backgroundColor: r.bg }}
                  >
                    {r.emoji}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: r.bg, color: r.color }}
                  >
                    {r.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-display font-bold text-[#1D1D1F]">{r.title}</h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RULES & LIMITS ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Rules & limits
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              The fine print, decoded.
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {[
              { emoji: "☝️", title: "One advance at a time", desc: "Current advance must fully repay (via job completion) before you request another." },
              { emoji: "⏱️", title: "Only for active bookings", desc: "IN_PROGRESS only. Confirmed-but-not-started jobs aren't eligible." },
              { emoji: "💰", title: "Fee deducted on completion", desc: "The 2.5% advance fee comes out of your final payout &mdash; not upfront." },
              { emoji: "🔍", title: "Eligibility rechecked each time", desc: "Score, job count, disputes, and Stripe Connect are all verified at request time." },
            ].map((r) => (
              <div
                key={r.title}
                className="group flex items-start gap-4 rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFFBF5] border border-[#1D1D1F]/5 text-xl transition-transform group-hover:rotate-[-8deg]">
                  {r.emoji}
                </span>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-[15px] font-display font-bold text-[#1D1D1F]">{r.title}</h3>
                  <p
                    className="mt-1.5 text-[13px] text-[#1D1D1F]/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: r.desc }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute top-0 left-1/3 h-96 w-96 rounded-full bg-[#E8F7EC]/60 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-[#B5E3FF]/50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-1.5 shadow-sm">
            <span className="text-base">💚</span>
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70">Cash flow, sorted</span>
          </div>

          <h2 className="mt-8 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl lg:text-7xl">
            Ready to get
            <br />
            <span className="bg-gradient-to-r from-[#34C759] via-[#007AFF] to-[#34C759] bg-clip-text text-transparent">
              paid faster?
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#1D1D1F]/55 max-w-xl mx-auto">
            Build your Score. Complete 50 jobs. Unlock Advance &mdash; the cash-flow tool for
            providers who keep the world moving.
          </p>

          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register?role=PROVIDER"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#34C759] hover:scale-[1.03] sm:w-auto"
            >
              Become a provider
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
