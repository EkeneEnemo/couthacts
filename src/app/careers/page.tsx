import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Careers — CouthActs\u2122",
};

const roles = [
  {
    title: "Senior Full Stack Engineer",
    location: "Remote (US / EMEA)",
    type: "Full-time",
    description:
      "Own features end-to-end across our Next.js / TypeScript / Prisma stack. You will build the core platform infrastructure\u2014escrow systems, real-time tracking integrations, multi-currency wallets\u2014and ship code that serves users in 190+ countries.",
  },
  {
    title: "Growth Lead",
    location: "Dallas, TX or Remote",
    type: "Full-time",
    description:
      "Drive customer and provider acquisition across global markets. You will design growth loops, run experiments, build referral programs, and partner with product to improve onboarding and activation. Data-driven mindset required.",
  },
  {
    title: "Enterprise Sales Manager",
    location: "Dallas, TX",
    type: "Full-time",
    description:
      "Close enterprise and government accounts that need multimodal transportation at scale. You will manage the full sales cycle from prospecting through contract execution, working closely with our enterprise and government platform teams.",
  },
  {
    title: "Operations Manager",
    location: "Dallas, TX",
    type: "Full-time",
    description:
      "Oversee day-to-day platform operations including provider verification, dispute resolution, and compliance. You will build processes, manage escalations, and ensure that every transaction on CouthActs meets our quality standards.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
          Careers
        </h1>
        <p className="mt-3 text-[14px] text-[#6E6E73] max-w-2xl leading-relaxed">
          Join the team building transportation&apos;s future. We are creating the
          infrastructure that connects customers and verified providers across 18 modes
          and 190+ countries.
        </p>

        {/* Why CouthActs */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Why CouthActs
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] text-[#6E6E73] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">1</span>
              <span>Work on a platform that handles real money, real cargo, and real accountability across the globe.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">2</span>
              <span>Small, high-impact team where your work ships fast and matters immediately.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">3</span>
              <span>Competitive compensation, equity, and the flexibility to work remotely.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">4</span>
              <span>Headquartered at The Adolphus Tower in Dallas, TX, with a distributed team worldwide.</span>
            </li>
          </ul>
        </section>

        {/* Open Roles */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Open Roles
          </h2>
          <div className="mt-6 space-y-4">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-[#1D1D1F] text-lg">
                    {role.title}
                  </h3>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]">
                      {role.type}
                    </span>
                    <span className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[12px] font-medium text-[#1D1D1F]">
                      {role.location}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                  {role.description}
                </p>
                <a
                  href={`mailto:careers@couthacts.com?subject=Application: ${role.title}`}
                  className="mt-4 inline-block rounded-full bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 text-center">
          <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
            Don&apos;t see your role?
          </h2>
          <p className="mt-2 text-[13px] text-[#6E6E73]">
            We are always looking for exceptional people. Send your resume and a note
            about what you would bring to CouthActs.
          </p>
          <a
            href="mailto:careers@couthacts.com?subject=General Application"
            className="mt-4 inline-block rounded-full bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition"
          >
            careers@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-[13px] text-[#007AFF]">
          <Link href="/about" className="hover:text-[#0055D4]">About</Link>
          <Link href="/press" className="hover:text-[#0055D4]">Press</Link>
          <Link href="/safety" className="hover:text-[#0055D4]">Safety Center</Link>
        </div>
      </div>
    </div>
  );
}
