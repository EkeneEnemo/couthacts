import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Press — CouthActs\u2122",
};

const facts = [
  { label: "Founded", value: "November 27, 2021" },
  { label: "Headquarters", value: "The Adolphus Tower, Dallas, TX" },
  { label: "Operator", value: "CouthActs, Inc." },
  { label: "IP Owner", value: "Enemo Consulting Group, Inc." },
  { label: "Transport Modes", value: "18" },
  { label: "Countries Served", value: "190+" },
  { label: "Categories", value: "Ground, Air, Maritime, Rail" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
          Press
        </h1>
        <p className="mt-3 text-[14px] text-[#6E6E73] max-w-2xl leading-relaxed">
          Resources for journalists and media covering CouthActs. For press inquiries,
          please contact us at{" "}
          <a
            href="mailto:press@couthacts.com"
            className="text-[#007AFF] hover:text-[#0055D4]"
          >
            press@couthacts.com
          </a>
          .
        </p>

        {/* Company Facts */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Company Facts
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#86868B]">
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
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            About CouthActs
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] leading-relaxed">
            CouthActs&#8482; is a global multimodal transportation platform that connects
            customers with verified service providers across 18 transport modes in more than
            190 countries. The platform supports ground, air, maritime, and rail
            transportation with built-in escrow payments, real-time tracking, provider
            verification, and dispute resolution. CouthActs is operated by CouthActs, Inc. IP owned by Enemo
            Consulting Group Inc. and is headquartered at The Adolphus Tower in Dallas, Texas.
          </p>
        </section>

        {/* Press Kit */}
        <section className="mt-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6">
          <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
            Press Kit
          </h2>
          <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">
            Our press kit includes the CouthActs logo in various formats (SVG, PNG),
            brand guidelines, approved photography, executive bios, and boilerplate copy.
          </p>
          <a
            href="mailto:press@couthacts.com?subject=Press Kit Request"
            className="mt-4 inline-block rounded-full bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition"
          >
            Download Press Kit
          </a>
        </section>

        {/* Media Guidelines */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">
            Media Guidelines
          </h2>
          <ul className="mt-4 space-y-2 text-[13px] text-[#6E6E73] leading-relaxed list-disc pl-5">
            <li>
              Always refer to the company as <strong>CouthActs</strong> or{" "}
              <strong>CouthActs&#8482;</strong>. Do not abbreviate.
            </li>
            <li>
              CouthActs is a <strong>platform</strong>, not a carrier, broker, or
              freight forwarder.
            </li>
            <li>
              When referencing our parent company, use{" "}
              <strong>CouthActs, Inc.</strong> (Operated by)
              <br /><strong>Enemo Consulting Group, Inc.</strong> (IP Owner)
            </li>
            <li>
              For logo usage, please use the assets provided in the press kit. Do not
              alter colors, proportions, or typography.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mt-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6">
          <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
            Press Contact
          </h2>
          <p className="mt-2 text-[13px] text-[#6E6E73]">
            For all media inquiries, interview requests, and press kit access:
          </p>
          <a
            href="mailto:press@couthacts.com"
            className="mt-3 inline-block text-[#007AFF] font-medium hover:text-[#0055D4]"
          >
            press@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-[13px] text-[#007AFF]">
          <Link href="/about" className="hover:text-[#0055D4]">About</Link>
          <Link href="/careers" className="hover:text-[#0055D4]">Careers</Link>
          <Link href="/safety" className="hover:text-[#0055D4]">Safety Center</Link>
        </div>
      </div>
    </div>
  );
}
