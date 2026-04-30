import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Press — CouthActs\u2122",
};

const facts = [
  { label: "Founded", value: "November 27, 2021", emoji: "🎂", color: "#FF7A59", bg: "#FFF1E8" },
  { label: "Headquarters", value: "The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202", emoji: "🏙️", color: "#007AFF", bg: "#E8F1FF" },
  { label: "Parent Company", value: "The Ravine of Willows, Inc. (Texas corporation)", emoji: "🏢", color: "#34C759", bg: "#E8F7EC" },
  { label: "IP Owner", value: "Enemo Consulting Group, Inc.®", emoji: "💡", color: "#FFB020", bg: "#FFF5E6" },
  { label: "Transport Modes", value: "18", emoji: "🚚", color: "#FF6B9D", bg: "#FFE8F0" },
  { label: "Countries Served", value: "190+", emoji: "🌍", color: "#5AC8FA", bg: "#E8F5FF" },
  { label: "Categories", value: "Ground, Air, Maritime, Rail", emoji: "🛣️", color: "#007AFF", bg: "#E8F1FF" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">📰</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            For the folks telling our story
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Press <span className="text-[#007AFF]">room</span>.
        </h1>
        <p className="mt-4 text-lg text-[#1D1D1F]/60 max-w-2xl leading-relaxed">
          Writing about CouthActs? Here&rsquo;s everything you need. Interviews, facts, logos,
          and a person you can actually reach at{" "}
          <a href="mailto:press@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">
            press@couthacts.com
          </a>.
        </p>

        {/* Company Facts */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">At a glance</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            Quick facts.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                  style={{ backgroundColor: fact.bg }}
                >
                  {fact.emoji}
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                  {fact.label}
                </p>
                <p className="mt-1 text-lg font-display font-bold text-[#1D1D1F]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About CouthActs */}
        <section className="mt-16 rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">About CouthActs</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F]">
            The boilerplate.
          </h2>
          <p className="mt-6 text-[15px] text-[#1D1D1F]/65 leading-relaxed">
            CouthActs&#8482; is a global multimodal transportation platform that connects
            customers with verified service providers across 18 transport modes in more than
            190 countries. The platform supports ground, air, maritime, and rail
            transportation with built-in escrow payments, real-time tracking, provider
            verification, and dispute resolution. CouthActs is a wholly owned subsidiary
            of <strong className="text-[#1D1D1F]">The Ravine of Willows, Inc.</strong>, a Texas corporation,
            with its principal place of business at The Adolphus Tower, 1412 Main Street, STE 609,
            Dallas, TX 75202. All intellectual property is wholly owned by <strong className="text-[#1D1D1F]">Enemo
            Consulting Group, Inc.&reg;</strong>; CouthActs operates under license from
            Enemo Consulting Group, Inc.&reg;
          </p>
        </section>

        {/* Press Kit + Contact */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[2rem] bg-gradient-to-br from-[#EAF4FF] via-white to-[#FFF1E3] p-8 border border-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl">
              🎨
            </div>
            <h3 className="mt-5 text-xl font-display font-bold text-[#1D1D1F]">Press kit</h3>
            <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">
              Logo in every format, brand guidelines, approved photography, exec bios, and boilerplate copy.
            </p>
            <Link
              href="/press/kit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#007AFF] hover:scale-[1.03] transition-all"
            >
              Grab the kit
            </Link>
          </section>

          <section className="rounded-[2rem] bg-gradient-to-br from-[#FFE8F0] via-white to-[#FFF1E3] p-8 border border-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl">
              ✉️
            </div>
            <h3 className="mt-5 text-xl font-display font-bold text-[#1D1D1F]">Press contact</h3>
            <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">
              Interviews, quotes, embargoed previews, or anything else you need.
            </p>
            <a
              href="mailto:press@couthacts.com"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white border border-[#FF7A59]/30 px-6 py-3 text-[13px] font-semibold text-[#FF7A59] hover:bg-[#FF7A59] hover:text-white transition-all"
            >
              press@couthacts.com
            </a>
          </section>
        </div>

        {/* Media Guidelines */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">Media guidelines</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            A few small asks.
          </h2>
          <ul className="mt-8 space-y-3">
            {[
              <>Always refer to the company as <strong className="text-[#1D1D1F]">CouthActs</strong> or <strong className="text-[#1D1D1F]">CouthActs&#8482;</strong>. Please don&rsquo;t abbreviate.</>,
              <>CouthActs is a <strong className="text-[#1D1D1F]">platform</strong> &mdash; not a carrier, broker, or freight forwarder.</>,
              <>When referencing the corporate structure: <strong className="text-[#1D1D1F]">CouthActs&#8482;</strong> (operator, wholly owned subsidiary) &middot; <strong className="text-[#1D1D1F]">The Ravine of Willows, Inc.</strong> (Texas corporation, parent) &middot; <strong className="text-[#1D1D1F]">Enemo Consulting Group, Inc.&reg;</strong> (IP Owner)</>,
              <>For logo usage, use the assets in the press kit. Please don&rsquo;t alter colors, proportions, or typography.</>,
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-2xl bg-white border border-[#1D1D1F]/5 p-5 shadow-[0_2px_14px_rgba(0,0,0,0.03)]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF5E6] text-[12px] font-bold text-[#FF7A59]">
                  {i + 1}
                </span>
                <span className="text-[14px] text-[#1D1D1F]/70 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap gap-2">
          <Link href="/about" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">About</Link>
          <Link href="/careers" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Careers</Link>
          <Link href="/safety" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Safety</Link>
        </div>
      </div>
    </div>
  );
}
