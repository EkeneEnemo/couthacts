import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "About — CouthActs\u2122",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          About CouthActs
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          The global transportation platform connecting customers with verified providers across 18 modes and 190+ countries.
        </p>

        {/* Founding story */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">Our Story</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            CouthActs&#8482; was founded on November 27, 2021, in Dallas, Texas, with a singular
            conviction: that moving goods and people across the world should be safe,
            transparent, and accessible to everyone. From day one, our team set out to build
            the infrastructure that makes multimodal transportation work for customers and
            providers alike&mdash;not just in one region, but globally.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            What started as a bold idea in Dallas has grown into a platform that spans 18
            distinct transportation modes&mdash;ground, air, maritime, and rail&mdash;and
            serves users in more than 190 countries. We built CouthActs because the
            transportation industry deserved a platform that puts trust, security, and
            fairness at the center of every transaction. Too many people were left navigating
            fragmented systems with no recourse when things went wrong. We believed there was
            a better way, and we set out to build it.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border border-ocean-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-display font-semibold text-ocean-800">Our Mission</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              To provide the most trusted, transparent, and secure transportation platform in
              the world&mdash;empowering customers to move anything, anywhere, with confidence,
              and enabling providers to grow their businesses on a level playing field.
            </p>
          </div>
          <div className="rounded-xl border border-ocean-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-display font-semibold text-ocean-800">Our Vision</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              A world where every transportation need&mdash;from a single package across town
              to a container ship across the ocean&mdash;can be fulfilled through one platform,
              backed by verified providers, protected payments, and real-time visibility.
            </p>
          </div>
        </section>

        {/* What makes us different */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">What Makes CouthActs Different</h2>

          <p className="mt-4 text-gray-700 leading-relaxed">
            CouthActs is not just another logistics platform. We are a purpose-built
            transportation infrastructure that treats every participant&mdash;customer and
            provider&mdash;with equal respect and protection. Our escrow-backed payment system
            means providers get paid when they deliver, and customers never pay for services
            that were not completed. Every dollar is accounted for, every transaction is
            traceable, and every dispute has a clear resolution path.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            We verify every provider on the platform. That means checking government-issued
            identification, validating business registrations, confirming regulatory
            credentials (DOT, MC, FMCSA, IMO, FAA, and more), and reviewing insurance
            documentation. Unverified operators cannot bid on jobs or receive payments through
            CouthActs. This rigorous vetting process is what separates us from platforms that
            allow anyone to list services without accountability.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Our platform supports 18 transportation modes across four categories: ground
            (full truckload, less-than-truckload, flatbed, refrigerated, auto transport,
            courier, moving), air (cargo charter, freight forwarding, express), maritime
            (full container, less-than-container, bulk, tanker), and rail (intermodal,
            bulk rail, auto rail). No other platform offers this breadth of coverage under
            one unified system with consistent protections across every mode.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Real-time tracking is built into the core of CouthActs. Whether your shipment
            is on a truck with GPS, a vessel broadcasting AIS data, an aircraft on a
            transponder, or a train with ELD telemetry, you can follow your cargo from
            pickup to delivery. We integrate with satellite, IoT, and telematics providers
            to deliver a single, unified tracking experience regardless of mode.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Finally, CouthActs is built for the world, not just one country. We support
            multi-currency wallets, localized experiences, and compliance with
            international transportation regulations. Whether you are shipping within
            Dallas or coordinating a cross-border intermodal move, CouthActs gives you the
            tools, protections, and visibility you need&mdash;all in one place.
          </p>
        </section>

        {/* Core Values */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold text-ocean-800">Core Values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Trust",
                desc: "Every provider is verified. Every payment is escrowed. Every promise on our platform is backed by systems designed to keep it.",
              },
              {
                name: "Transparency",
                desc: "No hidden fees, no opaque pricing, no black-box algorithms. You see exactly what you pay, what you earn, and where your shipment is.",
              },
              {
                name: "Protection",
                desc: "Escrow holds, insurance tiers, SOS features, and a dedicated dispute resolution process ensure that both sides of every transaction are safeguarded.",
              },
              {
                name: "Excellence",
                desc: "We hold ourselves and our providers to the highest standards. Quality of service is not optional\u2014it is the baseline expectation.",
              },
              {
                name: "Innovation",
                desc: "From real-time multimodal tracking to instant job matching, we continuously push the boundaries of what a transportation platform can do.",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="rounded-xl border border-ocean-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display font-semibold text-ocean-800">{v.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Parent company & contact */}
        <section className="mt-12 rounded-xl border border-ocean-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-display font-semibold text-ocean-800">Corporate Information</h2>
          <div className="mt-4 space-y-2 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong>Parent company:</strong> Enemo Consulting Group Inc.
            </p>
            <p>
              <strong>Headquarters:</strong> The Adolphus Tower, Dallas, Texas
            </p>
            <p>
              <strong>Founded:</strong> November 27, 2021
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <a href="mailto:hello@couthacts.com" className="text-ocean-600 underline hover:text-ocean-700">
                hello@couthacts.com
              </a>
            </p>
          </div>
        </section>

        {/* Footer nav */}
        <div className="mt-16 flex flex-wrap gap-4 text-sm text-ocean-600">
          <Link href="/terms" className="underline hover:text-ocean-700">Terms of Service</Link>
          <Link href="/privacy" className="underline hover:text-ocean-700">Privacy Policy</Link>
          <Link href="/safety" className="underline hover:text-ocean-700">Safety Center</Link>
          <Link href="/careers" className="underline hover:text-ocean-700">Careers</Link>
          <Link href="/press" className="underline hover:text-ocean-700">Press</Link>
        </div>
      </div>
    </div>
  );
}
