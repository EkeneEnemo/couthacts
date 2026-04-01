import Link from "next/link";
import { Logo } from "@/components/logo";
import { Navbar } from "@/components/navbar";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  ArrowRight,
  Star,
  Shield,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Wallet,
} from "lucide-react";

export const metadata = {
  title: "CouthActs Advance — Get Paid Faster",
  description:
    "Cash-flow tools for Elite providers. Get 70% of your escrow advanced before job completion.",
};

export default function AdvancePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1D1D1F]">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#C9901A] blur-[200px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#C9901A] blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9901A]/30 bg-[#C9901A]/10 px-5 py-2 mb-8">
              <Star className="h-3.5 w-3.5 text-[#C9901A]" />
              <span className="text-[11px] font-semibold text-[#C9901A] tracking-[0.1em] uppercase">
                Elite Provider Program
              </span>
            </div>
            <h1 className="text-4xl font-display font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              CouthActs
              <span className="text-[#C9901A]"> Advance</span>
            </h1>
            <p className="mt-6 text-[14px] text-white/35 leading-relaxed max-w-2xl">
              Stop waiting for escrow release. Get 70% of your confirmed
              job&apos;s escrow value advanced to your wallet&mdash;before
              the job is complete. Built for Elite providers who need
              cash flow to keep their fleet moving.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register?role=PROVIDER"
                className="group inline-flex items-center gap-2 rounded-full bg-[#C9901A] px-10 py-4 text-[13px] font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,.04)] transition-all hover:scale-[1.02]"
              >
                Become a provider
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-[13px] font-semibold text-white transition-all hover:bg-white/10"
              >
                Sign in to check eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KEY NUMBERS ═══════════════════════ */}
      <section className="bg-[#1D1D1F] border-t border-[#C9901A]/10">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: 70, suffix: "%", label: "Advance Rate", sub: "Of confirmed escrow" },
              { value: 2.5, suffix: "%", label: "Advance Fee", sub: "One-time per advance" },
              { value: 90, suffix: "+", label: "Score Required", sub: "Elite tier" },
              { value: 50, suffix: "+", label: "Jobs Required", sub: "Completed bookings" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-display font-bold text-[#C9901A] sm:text-4xl">
                  <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                </p>
                <p className="mt-1 text-[13px] font-semibold text-white">
                  {s.label}
                </p>
                <p className="text-[11px] text-white/35">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9901A]">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              From escrow to your wallet in minutes.
            </h2>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                icon: CheckCircle,
                title: "Accept a job",
                desc: "Customer accepts your bid. Their full budget is locked in escrow.",
              },
              {
                num: "02",
                icon: TrendingUp,
                title: "Start the job",
                desc: "Begin transport. Once the booking is marked IN_PROGRESS, you\u2019re eligible.",
              },
              {
                num: "03",
                icon: DollarSign,
                title: "Request advance",
                desc: "From your dashboard, request 70% of the escrow value. Credited instantly to your wallet.",
              },
              {
                num: "04",
                icon: Wallet,
                title: "Complete & settle",
                desc: "Finish the job. The 2.5% advance fee is deducted from the final escrow release.",
              },
            ].map((s) => (
              <div key={s.num} className="relative">
                <span className="absolute -top-4 -left-2 text-[7rem] font-display font-bold text-[#1D1D1F]/[0.04] leading-none select-none pointer-events-none">
                  {s.num}
                </span>
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C9901A]/10 text-[#C9901A]">
                    <s.icon className="h-5 w-5" />
                  </div>
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
        </div>
      </section>

      {/* ═══════════════════════ EXAMPLE CALCULATION ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Example
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              See the math.
            </h2>
          </div>

          <div className="mt-16 rounded-3xl border border-[#E8E8ED]/60 overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-[#1D1D1F] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Item</th>
                  <th className="px-6 py-4 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8ED]/60">
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1D1D1F]">Job escrow (customer&apos;s budget)</td>
                  <td className="px-6 py-4 text-right text-[#6E6E73]">$10,000.00</td>
                </tr>
                <tr className="bg-[#C9901A]/5">
                  <td className="px-6 py-4 font-medium text-[#C9901A]">Advance (70% of escrow)</td>
                  <td className="px-6 py-4 text-right font-bold text-[#C9901A]">$7,000.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1D1D1F]">Advance fee (2.5%)</td>
                  <td className="px-6 py-4 text-right text-[#6E6E73]">-$175.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#1D1D1F]">Escrow fee (4% for $5K-$50K bracket)</td>
                  <td className="px-6 py-4 text-right text-[#6E6E73]">-$400.00</td>
                </tr>
                <tr className="bg-[#F5F5F7]">
                  <td className="px-6 py-4 font-semibold text-[#1D1D1F]">Remaining on completion</td>
                  <td className="px-6 py-4 text-right font-bold text-[#1D1D1F]">$2,425.00</td>
                </tr>
                <tr className="bg-[#34C759]/10">
                  <td className="px-6 py-4 font-semibold text-[#1D1D1F]">Total provider earnings</td>
                  <td className="px-6 py-4 text-right font-bold text-[#34C759]">$9,425.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-[11px] text-[#86868B]">
            Advance fee applies only when you use the Advance feature. Standard escrow fees apply regardless.
          </p>
        </div>
      </section>

      {/* ═══════════════════════ ELIGIBILITY ═══════════════════════ */}
      <section className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9901A]">
              Eligibility
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              Who qualifies for Advance?
            </h2>
            <p className="mt-4 text-[14px] text-white/35">
              CouthActs Advance is reserved for our most trusted providers.
              Four requirements, no exceptions.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "CouthActs Score 90+",
                desc: "You must be in the Elite tier. This means top marks for completion rate, on-time delivery, and customer reviews.",
                badge: "Elite Tier",
              },
              {
                icon: CheckCircle,
                title: "50+ Completed Jobs",
                desc: "You need a track record. At least 50 successfully completed bookings on the platform.",
                badge: "Track Record",
              },
              {
                icon: Shield,
                title: "Zero Open Disputes",
                desc: "No unresolved disputes at the time of your advance request. Clean record required.",
                badge: "Clean Record",
              },
              {
                icon: Wallet,
                title: "Stripe Connect Active",
                desc: "Your Stripe Connect account must be fully set up and verified for withdrawals.",
                badge: "Payment Ready",
              },
            ].map((r) => (
              <div
                key={r.title}
                className="rounded-3xl border border-[#C9901A]/20 bg-[#C9901A]/5 p-8"
              >
                <div className="flex items-center justify-between">
                  <r.icon className="h-6 w-6 text-[#C9901A]" />
                  <span className="rounded-full bg-[#C9901A]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#C9901A] uppercase tracking-[0.1em]">
                    {r.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-[13px] text-white/35 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RULES & LIMITS ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Rules & Limits
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              What you need to know.
            </h2>
          </div>

          <div className="mt-16 space-y-4">
            {[
              {
                icon: AlertTriangle,
                title: "One advance at a time",
                desc: "You can only have one active advance. The current advance must be fully repaid (job completed) before you can request another.",
              },
              {
                icon: Clock,
                title: "Only for active bookings",
                desc: "Advances are only available for bookings with status IN_PROGRESS and an active escrow hold. You cannot advance a confirmed-but-not-started job.",
              },
              {
                icon: DollarSign,
                title: "Fee deducted on completion",
                desc: "The 2.5% advance fee is deducted from your final payout when the escrow releases. It is not charged upfront.",
              },
              {
                icon: Shield,
                title: "Eligibility rechecked at request time",
                desc: "Your CouthActs Score, job count, dispute status, and Stripe Connect are all verified at the moment you request an advance. Maintain your Elite status.",
              },
            ].map((r) => (
              <div
                key={r.title}
                className="flex gap-5 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F5F7] flex-shrink-0">
                  <r.icon className="h-5 w-5 text-[#1D1D1F]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-display font-bold text-[#1D1D1F]">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-[#6E6E73] leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#1D1D1F]">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#C9901A] blur-[200px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <h2 className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl">
            Ready to get paid faster?
          </h2>
          <p className="mt-6 text-[14px] text-white/35 max-w-xl mx-auto">
            Build your CouthActs Score, complete 50 jobs, and unlock
            Advance&mdash;the cash-flow tool built for providers who move
            the world.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register?role=PROVIDER"
              className="group inline-flex items-center gap-2 rounded-full bg-[#C9901A] px-10 py-4 text-[13px] font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,.04)] transition-all hover:scale-[1.02]"
            >
              Become a provider
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-[13px] font-semibold text-white transition-all hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F] text-white border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Logo size="sm" variant="white" href="/" />
            <p className="text-[11px] text-white/35">
              &copy; {new Date().getFullYear()} CouthActs&#8482;. Operated by
              CouthActs, Inc. Intellectual property of Enemo Consulting Group,
              Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
