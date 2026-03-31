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
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          Press
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl">
          Resources for journalists and media covering CouthActs. For press inquiries,
          please contact us at{" "}
          <a
            href="mailto:press@couthacts.com"
            className="text-ocean-600 underline hover:text-ocean-700"
          >
            press@couthacts.com
          </a>
          .
        </p>

        {/* Company Facts */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Company Facts
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-ocean-100 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {fact.label}
                </p>
                <p className="mt-1 text-lg font-display font-semibold text-ocean-800">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About CouthActs */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            About CouthActs
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CouthActs&#8482; is a global multimodal transportation platform that connects
            customers with verified service providers across 18 transport modes in more than
            190 countries. The platform supports ground, air, maritime, and rail
            transportation with built-in escrow payments, real-time tracking, provider
            verification, and dispute resolution. CouthActs is operated by CouthActs, Inc. IP owned by Enemo
            Consulting Group Inc. and is headquartered at The Adolphus Tower in Dallas, Texas.
          </p>
        </section>

        {/* Press Kit */}
        <section className="mt-12 rounded-xl border border-ocean-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-display font-semibold text-ocean-800">
            Press Kit
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Our press kit includes the CouthActs logo in various formats (SVG, PNG),
            brand guidelines, approved photography, executive bios, and boilerplate copy.
          </p>
          <a
            href="mailto:press@couthacts.com?subject=Press Kit Request"
            className="mt-4 inline-block rounded-lg bg-ocean-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-ocean-700 transition"
          >
            Download Press Kit
          </a>
        </section>

        {/* Media Guidelines */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">
            Media Guidelines
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
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
        <section className="mt-12 rounded-xl border border-ocean-100 bg-ocean-50/50 p-6">
          <h2 className="text-xl font-display font-semibold text-ocean-800">
            Press Contact
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            For all media inquiries, interview requests, and press kit access:
          </p>
          <a
            href="mailto:press@couthacts.com"
            className="mt-3 inline-block text-ocean-600 font-medium underline hover:text-ocean-700"
          >
            press@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-sm text-ocean-600">
          <Link href="/about" className="underline hover:text-ocean-700">About</Link>
          <Link href="/careers" className="underline hover:text-ocean-700">Careers</Link>
          <Link href="/safety" className="underline hover:text-ocean-700">Safety Center</Link>
        </div>
      </div>
    </div>
  );
}
