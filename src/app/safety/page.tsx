import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Safety Center — CouthActs\u2122",
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          Safety Center
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl">
          Your safety is the foundation of CouthActs. Every feature we build starts with
          the question: does this protect our users?
        </p>

        {/* SOS Feature */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            SOS Emergency Feature
          </h2>
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50/50 p-6">
            <p className="text-gray-700 leading-relaxed">
              Every active booking on CouthActs includes an <strong>SOS button</strong>. When
              triggered by either the customer or provider, the following happens immediately:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">1</span>
                <span>The CouthActs safety team receives a real-time alert with your booking details, location data, and contact information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">2</span>
                <span>The booking is immediately flagged and all payment activity is frozen to prevent fund movement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">3</span>
                <span>A safety team member contacts you directly to assess the situation and coordinate with local authorities if needed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">4</span>
                <span>A full incident report is created and preserved for any subsequent investigation or legal proceeding.</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              The SOS feature is available on every active booking page. In a life-threatening
              emergency, always call your local emergency number (911 in the US) first.
            </p>
          </div>
        </section>

        {/* Protection Tiers */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Protection Tiers
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CouthActs provides tiered protection coverage to protect your cargo and
            transactions. The appropriate tier is determined by transport mode and
            declared cargo value.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-ocean-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Basic</p>
              <h3 className="mt-1 text-lg font-display font-semibold text-ocean-800">Standard Coverage</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Included with every booking at no additional cost. Covers loss or damage up
                to the platform&apos;s standard liability limit. Suitable for standard-value
                shipments across all transport modes.
              </p>
            </div>
            <div className="rounded-xl border border-ocean-200 bg-white p-5 shadow-sm ring-1 ring-ocean-100">
              <p className="text-xs font-medium uppercase tracking-wider text-ocean-500">Enhanced</p>
              <h3 className="mt-1 text-lg font-display font-semibold text-ocean-800">Extended Coverage</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Higher liability limits for medium-to-high-value cargo. Includes coverage for
                delays, temperature excursions (refrigerated), and partial loss. Available
                as an add-on during job posting.
              </p>
            </div>
            <div className="rounded-xl border border-ocean-300 bg-ocean-50/30 p-5 shadow-sm ring-1 ring-ocean-200">
              <p className="text-xs font-medium uppercase tracking-wider text-ocean-600">Premium</p>
              <h3 className="mt-1 text-lg font-display font-semibold text-ocean-800">Full Coverage</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Comprehensive coverage for high-value, specialized, or hazardous cargo.
                Includes all-risk protection, door-to-door coverage, and dedicated claims
                handling. Required for shipments above the enhanced tier threshold.
              </p>
            </div>
          </div>
        </section>

        {/* Provider Verification */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Provider Verification
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Every provider on CouthActs must pass a multi-step verification process before
            they can bid on jobs or receive payments. This process includes:
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                step: "Identity Verification",
                desc: "Government-issued photo ID is checked against the provider\u2019s account details. A $20 non-refundable verification fee applies per attempt.",
              },
              {
                step: "Business Registration",
                desc: "Business name, registration number, and jurisdiction are validated against public registries where available.",
              },
              {
                step: "Regulatory Credentials",
                desc: "DOT, MC, FMCSA, IMO, FAA, and other mode-specific regulatory IDs are verified against the issuing authority\u2019s databases.",
              },
              {
                step: "Insurance Documentation",
                desc: "Active protection certificates are reviewed for coverage type, limits, and validity period. Expired or insufficient coverage results in verification denial.",
              },
              {
                step: "Ongoing Monitoring",
                desc: "Verified providers are subject to periodic re-verification. Expired credentials or insurance will result in automatic suspension until updated documentation is provided.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-ocean-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display font-semibold text-ocean-800">{item.step}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Escrow Protection */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Escrow Protection
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            The CouthActs escrow system ensures that money only changes hands when
            the service is delivered. Here is how it works:
          </p>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">1</span>
              <span>When a customer accepts a provider&apos;s bid, the agreed amount is moved from the customer&apos;s wallet into escrow.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">2</span>
              <span>The funds are held securely and cannot be accessed by either party during transit.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">3</span>
              <span>Once the provider marks the job as complete, the customer has a confirmation window to verify delivery.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">4</span>
              <span>If the customer confirms delivery (or the confirmation window expires without dispute), funds are released to the provider&apos;s wallet.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-700">5</span>
              <span>If a dispute is raised, funds remain in escrow until the CouthActs resolution team makes a determination.</span>
            </div>
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Dispute Resolution
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CouthActs provides a structured dispute resolution process to handle
            disagreements between customers and providers fairly:
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                step: "Filing",
                desc: "Either party can file a dispute from the booking details page within the allowed window. The dispute must include a description and any supporting evidence (photos, documents, tracking data).",
              },
              {
                step: "Evidence Collection",
                desc: "Both parties are notified and given a defined period to submit their side of the story with supporting materials. The CouthActs resolution team reviews all evidence impartially.",
              },
              {
                step: "Resolution",
                desc: "Based on the evidence, the resolution team issues a determination. Outcomes may include full release of funds to the provider, full refund to the customer, or a split decision with partial amounts to each party.",
              },
              {
                step: "Appeal",
                desc: "If either party disagrees with the determination, they may submit a one-time appeal with additional evidence within the appeal window. The appeal is reviewed by a senior member of the resolution team.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-ocean-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display font-semibold text-ocean-800">{item.step}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12 rounded-xl border border-ocean-100 bg-white p-6 shadow-sm text-center">
          <h2 className="text-xl font-display font-semibold text-ocean-800">
            Contact Our Safety Team
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            If you have a safety concern, need to report an incident, or have questions
            about our safety features, reach out directly.
          </p>
          <a
            href="mailto:safety@couthacts.com"
            className="mt-4 inline-block rounded-lg bg-ocean-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-ocean-700 transition"
          >
            safety@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-sm text-ocean-600">
          <Link href="/about" className="underline hover:text-ocean-700">About</Link>
          <Link href="/terms" className="underline hover:text-ocean-700">Terms of Service</Link>
          <Link href="/privacy" className="underline hover:text-ocean-700">Privacy Policy</Link>
          <Link href="/acceptable-use" className="underline hover:text-ocean-700">Acceptable Use Policy</Link>
          <Link href="/help" className="underline hover:text-ocean-700">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
