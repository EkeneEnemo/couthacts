import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Careers — CouthActs\u2122",
};

const roles = [
  {
    title: "Senior Full Stack Engineer",
    slug: "senior-full-stack-engineer",
    location: "Remote (US / EMEA)",
    type: "Full-time",
    emoji: "💻",
    color: "#007AFF",
    bg: "#E8F1FF",
    description:
      "Own features end-to-end across our Next.js / TypeScript / Prisma stack. You will build the core platform infrastructure\u2014escrow systems, real-time tracking integrations, multi-currency wallets\u2014and ship code that serves users in 190+ countries.",
  },
  {
    title: "Growth Lead",
    slug: "growth-lead",
    location: "Dallas, TX or Remote",
    type: "Full-time",
    emoji: "📈",
    color: "#FF7A59",
    bg: "#FFF1E8",
    description:
      "Drive customer and provider acquisition across global markets. You will design growth loops, run experiments, build referral programs, and partner with product to improve onboarding and activation. Data-driven mindset required.",
  },
  {
    title: "Enterprise Sales Manager",
    slug: "enterprise-sales-manager",
    location: "Dallas, TX",
    type: "Full-time",
    emoji: "🤝",
    color: "#34C759",
    bg: "#E8F7EC",
    description:
      "Close enterprise and government accounts that need multimodal transportation at scale. You will manage the full sales cycle from prospecting through contract execution, working closely with our enterprise and government platform teams.",
  },
  {
    title: "Operations Manager",
    slug: "operations-manager",
    location: "Dallas, TX",
    type: "Full-time",
    emoji: "⚙️",
    color: "#FF6B9D",
    bg: "#FFE8F0",
    description:
      "Oversee day-to-day platform operations including provider verification, dispute resolution, and compliance. You will build processes, manage escalations, and ensure that every transaction on CouthActs meets our quality standards.",
  },
];

const whys = [
  { emoji: "🌍", text: "Work on a platform that handles real money, real cargo, and real accountability across the globe." },
  { emoji: "⚡", text: "Small, high-impact team where your work ships fast and matters immediately." },
  { emoji: "💰", text: "Competitive compensation, equity, and the flexibility to work remotely." },
  { emoji: "🏙️", text: "Headquartered at The Adolphus Tower in Dallas, TX, with a distributed team worldwide." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -right-32 h-[24rem] w-[24rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">🚀</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            Join the team moving the world
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Come build the <span className="text-[#FF7A59]">future</span>
          <br />
          of transportation.
        </h1>
        <p className="mt-6 text-lg text-[#1D1D1F]/60 max-w-2xl leading-relaxed">
          Small team, serious platform. 18 transport modes, 190+ countries, real money,
          real cargo. If you want your work to ship and matter, you&rsquo;re in the right place.
        </p>

        {/* Why CouthActs */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">Why us</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            Four good reasons.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whys.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFFBF5] text-xl">
                  {w.emoji}
                </span>
                <p className="text-[14px] text-[#1D1D1F]/70 leading-relaxed pt-1">
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section className="mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">Open roles</p>
          <h2 className="mt-3 text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
            Where you come in.
          </h2>
          <div className="mt-8 space-y-4">
            {roles.map((role) => (
              <div
                key={role.slug}
                className="group rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:rotate-[-8deg]"
                      style={{ backgroundColor: role.bg }}
                    >
                      {role.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-display font-bold text-[#1D1D1F]">
                        {role.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#FFFBF5] border border-[#1D1D1F]/5 px-3 py-1 text-[11px] font-semibold text-[#1D1D1F]/60">
                          {role.type}
                        </span>
                        <span className="rounded-full bg-[#FFFBF5] border border-[#1D1D1F]/5 px-3 py-1 text-[11px] font-semibold text-[#1D1D1F]/60">
                          {role.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[14px] text-[#1D1D1F]/60 leading-relaxed">
                  {role.description}
                </p>
                <Link
                  href={`/careers/apply?role=${role.slug}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#007AFF] hover:scale-[1.03] transition-all"
                  style={{ minHeight: "44px" }}
                >
                  Apply now →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* General Application CTA */}
        <section className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#EAF4FF] p-10 border border-white shadow-sm text-center">
          <span className="text-4xl">✨</span>
          <h2 className="mt-4 text-3xl font-display font-bold text-[#1D1D1F]">
            Don&rsquo;t see your role?
          </h2>
          <p className="mt-3 text-[14px] text-[#1D1D1F]/60 max-w-xl mx-auto">
            We&rsquo;re always looking for exceptional people. Send your story and what
            you&rsquo;d bring &mdash; we read every one.
          </p>
          <Link
            href="/careers/apply?role=general"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-[#FF7A59] hover:scale-[1.03] transition-all"
          >
            Send a general application
          </Link>
        </section>

        <div className="mt-12 flex flex-wrap gap-2">
          <Link href="/about" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">About</Link>
          <Link href="/press" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Press</Link>
          <Link href="/safety" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Safety</Link>
        </div>
      </div>
    </div>
  );
}
