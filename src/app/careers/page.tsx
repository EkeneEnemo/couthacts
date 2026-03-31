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
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          Careers
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl">
          Join the team building transportation&apos;s future. We are creating the
          infrastructure that connects customers and verified providers across 18 modes
          and 190+ countries.
        </p>

        {/* Why CouthActs */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Why CouthActs
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">1</span>
              <span>Work on a platform that handles real money, real cargo, and real accountability across the globe.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">2</span>
              <span>Small, high-impact team where your work ships fast and matters immediately.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">3</span>
              <span>Competitive compensation, equity, and the flexibility to work remotely.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">4</span>
              <span>Headquartered at The Adolphus Tower in Dallas, TX, with a distributed team worldwide.</span>
            </li>
          </ul>
        </section>

        {/* Open Roles */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Open Roles
          </h2>
          <div className="mt-6 space-y-4">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-xl border border-ocean-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-ocean-800 text-lg">
                    {role.title}
                  </h3>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-ocean-50 px-3 py-0.5 text-xs font-medium text-ocean-700">
                      {role.type}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                      {role.location}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {role.description}
                </p>
                <a
                  href={`mailto:careers@couthacts.com?subject=Application: ${role.title}`}
                  className="mt-4 inline-block rounded-lg bg-ocean-600 px-4 py-2 text-sm font-medium text-white hover:bg-ocean-700 transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-xl border border-ocean-100 bg-white p-6 shadow-sm text-center">
          <h2 className="text-xl font-display font-semibold text-ocean-800">
            Don&apos;t see your role?
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            We are always looking for exceptional people. Send your resume and a note
            about what you would bring to CouthActs.
          </p>
          <a
            href="mailto:careers@couthacts.com?subject=General Application"
            className="mt-4 inline-block rounded-lg bg-ocean-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-ocean-700 transition"
          >
            careers@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-sm text-ocean-600">
          <Link href="/about" className="underline hover:text-ocean-700">About</Link>
          <Link href="/press" className="underline hover:text-ocean-700">Press</Link>
          <Link href="/safety" className="underline hover:text-ocean-700">Safety Center</Link>
        </div>
      </div>
    </div>
  );
}
