import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Safety Center — CouthActs\u2122",
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
          Safety Center
        </h1>
        <p className="mt-3 text-[14px] text-[#6E6E73] max-w-2xl leading-relaxed">
          Your safety is the foundation of CouthActs. Every feature we build starts with
          the question: does this protect our users?
        </p>

        {/* SOS Feature */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            SOS Emergency Feature
          </h2>
          <div className="mt-4 rounded-3xl border border-[#FF3B30]/20 bg-[#FF3B30]/5 p-6">
            <p className="text-[14px] text-[#6E6E73] leading-relaxed">
              Every active booking on CouthActs includes an <strong>SOS button</strong>. When
              triggered by either the customer or provider, the following happens immediately:
            </p>
            <ul className="mt-3 space-y-2 text-[13px] text-[#6E6E73]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/10 text-[11px] font-semibold text-[#FF3B30]">1</span>
                <span>The CouthActs safety team receives a real-time alert with your booking details, location data, and contact information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/10 text-[11px] font-semibold text-[#FF3B30]">2</span>
                <span>The booking is immediately flagged and all payment activity is frozen to prevent fund movement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/10 text-[11px] font-semibold text-[#FF3B30]">3</span>
                <span>A safety team member contacts you directly to assess the situation and coordinate with local authorities if needed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/10 text-[11px] font-semibold text-[#FF3B30]">4</span>
                <span>A full incident report is created and preserved for any subsequent investigation or legal proceeding.</span>
              </li>
            </ul>
            <p className="mt-4 text-[13px] text-[#6E6E73]">
              The SOS feature is available on every active booking page. In a life-threatening
              emergency, always call your local emergency number (911 in the US) first.
            </p>
          </div>
        </section>

        {/* Protection Tiers */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Protection Tiers
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
            CouthActs provides tiered protection coverage to protect your cargo and
            transactions. The appropriate tier is determined by transport mode and
            declared cargo value.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#86868B]">Basic</p>
              <h3 className="mt-1 text-lg font-display font-bold text-[#1D1D1F]">Standard Coverage</h3>
              <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">
                Included with every booking at no additional cost. Covers loss or damage up
                to the platform&apos;s standard liability limit. Suitable for standard-value
                shipments across all transport modes.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-[#007AFF]/20 p-5 ring-1 ring-[#007AFF]/10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#007AFF]">Enhanced</p>
              <h3 className="mt-1 text-lg font-display font-bold text-[#1D1D1F]">Extended Coverage</h3>
              <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">
                Higher liability limits for medium-to-high-value cargo. Includes coverage for
                delays, temperature excursions (refrigerated), and partial loss. Available
                as an add-on during job posting.
              </p>
            </div>
            <div className="rounded-3xl bg-[#007AFF]/5 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-[#007AFF]/20 p-5 ring-1 ring-[#007AFF]/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">Premium</p>
              <h3 className="mt-1 text-lg font-display font-bold text-[#1D1D1F]">Full Coverage</h3>
              <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">
                Comprehensive coverage for high-value, specialized, or hazardous cargo.
                Includes all-risk protection, door-to-door coverage, and dedicated claims
                handling. Required for shipments above the enhanced tier threshold.
              </p>
            </div>
          </div>
        </section>

        {/* Provider Verification */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Provider Verification
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
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
                className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-5"
              >
                <h3 className="font-display font-bold text-[#1D1D1F]">{item.step}</h3>
                <p className="mt-1 text-[13px] text-[#6E6E73] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Escrow Protection */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Escrow Protection
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
            The CouthActs escrow system ensures that money only changes hands when
            the service is delivered. Here is how it works:
          </p>
          <div className="mt-4 space-y-3 text-[13px] text-[#6E6E73]">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">1</span>
              <span>When a customer accepts a provider&apos;s bid, the agreed amount is moved from the customer&apos;s wallet into escrow.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">2</span>
              <span>The funds are held securely and cannot be accessed by either party during transit.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">3</span>
              <span>Once the provider marks the job as complete, the customer has a confirmation window to verify delivery.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">4</span>
              <span>If the customer confirms delivery (or the confirmation window expires without dispute), funds are released to the provider&apos;s wallet.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F]">5</span>
              <span>If a dispute is raised, funds remain in escrow until the CouthActs resolution team makes a determination.</span>
            </div>
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Dispute Resolution
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
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
                className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-5"
              >
                <h3 className="font-display font-bold text-[#1D1D1F]">{item.step}</h3>
                <p className="mt-1 text-[13px] text-[#6E6E73] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 text-center">
          <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
            Contact Our Safety Team
          </h2>
          <p className="mt-2 text-[13px] text-[#6E6E73]">
            If you have a safety concern, need to report an incident, or have questions
            about our safety features, reach out directly.
          </p>
          <a
            href="mailto:safety@couthacts.com"
            className="mt-4 inline-block rounded-full bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition"
          >
            safety@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-[13px] text-[#007AFF]">
          <Link href="/about" className="hover:text-[#0055D4]">About</Link>
          <Link href="/terms" className="hover:text-[#0055D4]">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#0055D4]">Privacy Policy</Link>
          <Link href="/acceptable-use" className="hover:text-[#0055D4]">Acceptable Use Policy</Link>
          <Link href="/help" className="hover:text-[#0055D4]">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
