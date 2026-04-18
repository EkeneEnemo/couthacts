import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Safety Center — CouthActs\u2122",
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">🛡️</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            Safety, built in from day one
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          You&rsquo;re looked after,
          <br />
          <span className="text-[#FF6B9D]">always.</span>
        </h1>
        <p className="mt-6 text-lg text-[#1D1D1F]/60 max-w-2xl leading-relaxed">
          Every feature we ship starts with the same question: does this make our
          users safer? Here&rsquo;s what that looks like in practice.
        </p>

        {/* SOS Feature */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF3B30]">One button</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            The <span className="text-[#FF3B30]">SOS</span> button.
          </h2>
          <div className="mt-6 rounded-[2rem] bg-gradient-to-br from-[#FFE8E8] via-white to-[#FFF5E6] border border-[#FF3B30]/15 p-8 sm:p-10 shadow-sm">
            <p className="text-[15px] text-[#1D1D1F]/70 leading-relaxed">
              Every active booking has an <strong className="text-[#1D1D1F]">SOS button</strong>.
              One tap, and four things happen at once:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Our safety team gets a real-time alert with your booking, location, and contacts.",
                "The booking is instantly flagged and all payment activity is frozen.",
                "A real human calls you to assess the situation and coordinate with local authorities if needed.",
                "A full incident report is created and preserved for any investigation or legal proceeding.",
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF3B30] text-[12px] font-bold text-white shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-[#1D1D1F]/70 leading-relaxed pt-0.5">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] text-[#1D1D1F]/55">
              🚨 In a life-threatening emergency, always call your local emergency number (911 in the US) first.
            </p>
          </div>
        </section>

        {/* Protection Tiers */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">Protection tiers</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            Coverage that matches your cargo.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                tier: "Basic",
                emoji: "🤝",
                title: "Standard coverage",
                desc: "Included with every booking at no extra cost. Covers loss or damage up to the platform&rsquo;s standard liability limit.",
                color: "#34C759",
                bg: "#E8F7EC",
              },
              {
                tier: "Enhanced",
                emoji: "🛡️",
                title: "Extended coverage",
                desc: "Higher limits for medium-to-high-value cargo. Includes delays, temperature excursions, and partial loss. Add-on during posting.",
                color: "#007AFF",
                bg: "#E8F1FF",
                featured: true,
              },
              {
                tier: "Premium",
                emoji: "💎",
                title: "Full coverage",
                desc: "All-risk protection for high-value, specialized, or hazardous cargo. Door-to-door, dedicated claims handling.",
                color: "#FF6B9D",
                bg: "#FFE8F0",
              },
            ].map((t) => (
              <div
                key={t.tier}
                className={`group rounded-[1.5rem] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${t.featured ? "border-2" : "border"} `}
                style={{ borderColor: t.featured ? t.color : "rgba(29,29,31,0.05)" }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                  style={{ backgroundColor: t.bg }}
                >
                  {t.emoji}
                </span>
                <p
                  className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: t.color }}
                >
                  {t.tier}
                </p>
                <h3 className="mt-1 text-lg font-display font-bold text-[#1D1D1F]">{t.title}</h3>
                <p
                  className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.desc }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Provider Verification */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">Provider verification</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            No ghosts allowed.
          </h2>
          <p className="mt-4 text-[15px] text-[#1D1D1F]/60 leading-relaxed max-w-2xl">
            Every provider passes a five-step verification before they can bid or get paid:
          </p>
          <div className="mt-8 space-y-3">
            {[
              { emoji: "🪪", step: "Identity verification", desc: "Government ID checked against account details. $20 non-refundable per attempt." },
              { emoji: "🏢", step: "Business registration", desc: "Business name, number, and jurisdiction validated against public registries." },
              { emoji: "📋", step: "Regulatory credentials", desc: "DOT, MC, FMCSA, IMO, FAA, and mode-specific IDs checked against issuing authorities." },
              { emoji: "🛡️", step: "Insurance documentation", desc: "Active protection certificates reviewed for type, limits, and validity." },
              { emoji: "🔄", step: "Ongoing monitoring", desc: "Periodic re-verification. Expired credentials suspend the account until renewed." },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group flex items-start gap-4 rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-5 shadow-[0_2px_14px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFFBF5] text-xl">
                  {item.emoji}
                </span>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-semibold text-[#FF7A59]">Step {i + 1}</span>
                    <h3 className="font-display font-bold text-[#1D1D1F]">{item.step}</h3>
                  </div>
                  <p className="mt-1 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Escrow Protection */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FFB020]">Escrow protection</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            Money only moves when it should.
          </h2>
          <div className="mt-8 rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
            {[
              "When you accept a bid, the agreed amount moves from your wallet into escrow.",
              "Funds are held securely during transit &mdash; neither party can touch them.",
              "The provider marks the job complete, and you get a confirmation window to verify delivery.",
              "Confirmed (or window expires without dispute)? Funds release to the provider.",
              "Dispute filed? Funds stay frozen until the resolution team decides.",
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-[#1D1D1F]/5 last:border-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF5E6] text-[13px] font-bold text-[#FFB020]">
                  {i + 1}
                </span>
                <p
                  className="text-[14px] text-[#1D1D1F]/70 leading-relaxed pt-1"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF6B9D]">Dispute resolution</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            Real humans. Fair outcomes.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { emoji: "📝", step: "Filing", desc: "Either party files from the booking page within the allowed window, with a description and supporting evidence." },
              { emoji: "📎", step: "Evidence", desc: "Both sides get a defined period to submit their story. The resolution team reviews everything impartially." },
              { emoji: "⚖️", step: "Resolution", desc: "A determination is issued based on evidence. Outcomes can be full release, full refund, or a split." },
              { emoji: "🔁", step: "Appeal", desc: "Either party gets one appeal with additional evidence. Senior team reviews." },
            ].map((item) => (
              <div
                key={item.step}
                className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-5 shadow-[0_2px_14px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFE8F0] text-xl">
                  {item.emoji}
                </span>
                <h3 className="mt-4 font-display font-bold text-[#1D1D1F]">{item.step}</h3>
                <p className="mt-1 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-[#FFE8F0] via-white to-[#EAF4FF] p-10 border border-white shadow-sm text-center">
          <span className="text-5xl">💛</span>
          <h2 className="mt-4 text-3xl font-display font-bold text-[#1D1D1F]">
            Need our safety team?
          </h2>
          <p className="mt-3 text-[14px] text-[#1D1D1F]/60 max-w-xl mx-auto">
            For safety concerns, incidents, or questions &mdash; reach us directly. Real humans, real answers.
          </p>
          <a
            href="mailto:safety@couthacts.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-[#FF7A59] hover:scale-[1.03] transition-all"
          >
            safety@couthacts.com
          </a>
        </section>

        <div className="mt-12 flex flex-wrap gap-2">
          <Link href="/about" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">About</Link>
          <Link href="/terms" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Terms</Link>
          <Link href="/privacy" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Privacy</Link>
          <Link href="/acceptable-use" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Acceptable Use</Link>
          <Link href="/help" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Help</Link>
        </div>
      </div>
    </div>
  );
}
