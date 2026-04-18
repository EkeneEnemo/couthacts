import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Acceptable Use Policy — CouthActs\u2122",
};

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -right-32 h-[24rem] w-[24rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">🛡️</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            Playing fair keeps everyone safe
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Acceptable <span className="text-[#FF6B9D]">use</span>.
        </h1>
        <p className="mt-4 text-[11px] text-[#1D1D1F]/40">
          Last updated March 30, 2026 &middot; Effective immediately
        </p>

        <div className="mt-12 rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-8 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] space-y-8 text-[14px] text-[#1D1D1F]/65 leading-relaxed">

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">1. Purpose</h2>
            <p className="mt-3">
              This Acceptable Use Policy (&quot;AUP&quot;) outlines the prohibited activities
              on the CouthActs&#8482; platform. All users&mdash;customers, providers, and
              enterprise accounts&mdash;are bound by this policy in addition to the{" "}
              <Link href="/terms" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">
                Terms of Service
              </Link>
              . Violations may result in immediate account suspension, permanent ban, forfeiture
              of funds, and referral to law enforcement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">2. Prohibited Activities</h2>

            <h3 className="text-base font-semibold text-[#1D1D1F] mt-4">2.1 Illegal Transportation</h3>
            <p className="mt-3">You may not use CouthActs to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Transport illegal substances, contraband, or controlled materials without proper licensing and documentation.</li>
              <li>Ship weapons, explosives, hazardous biological agents, or other prohibited goods in violation of local, national, or international law.</li>
              <li>Facilitate human trafficking, smuggling, or the transport of persons against their will.</li>
              <li>Evade customs, import/export restrictions, sanctions, or trade embargoes.</li>
              <li>Transport goods that violate CITES, IATA dangerous goods regulations, IMO IMDG codes, or DOT hazmat requirements without proper classification and handling.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1D1D1F] mt-4">2.2 Fraud and Misrepresentation</h3>
            <p className="mt-3">You may not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Create accounts using false identities, stolen credentials, or fabricated business registrations.</li>
              <li>Submit forged or altered verification documents (government ID, DOT numbers, protection certificates, business licenses).</li>
              <li>Misrepresent the nature, weight, dimensions, or value of cargo.</li>
              <li>Inflate bids, create shill postings, or engage in bid manipulation.</li>
              <li>Operate as a provider without the required licenses, permits, and insurance for the transportation mode.</li>
              <li>Falsely claim completion of a job or fabricate proof of delivery.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1D1D1F] mt-4">2.3 Harassment and Abuse</h3>
            <p className="mt-3">You may not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Threaten, intimidate, harass, or abuse any other user, whether customer, provider, or CouthActs staff.</li>
              <li>Use discriminatory language or refuse service based on race, ethnicity, religion, gender, sexual orientation, disability, or national origin.</li>
              <li>Stalk, dox, or share another user&apos;s personal information outside the platform.</li>
              <li>Send spam, unsolicited commercial messages, or phishing attempts through the platform&apos;s messaging system.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1D1D1F] mt-4">2.4 Circumventing Escrow</h3>
            <p className="mt-3">You may not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Arrange off-platform payments to avoid escrow protections or platform fees.</li>
              <li>Request or offer payment through personal Venmo, PayPal, Zelle, cash, cryptocurrency, or any method outside the CouthActs wallet and escrow system.</li>
              <li>Pressure another user to cancel a booking and transact directly.</li>
              <li>Create postings with artificially low budgets with the intent of negotiating off-platform rates.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1D1D1F] mt-4">2.5 Fake Reviews</h3>
            <p className="mt-3">You may not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Post reviews for transactions that did not occur or that you were not a party to.</li>
              <li>Offer or accept payment, discounts, or other incentives in exchange for reviews.</li>
              <li>Create multiple accounts to inflate your own ratings or deflate a competitor&apos;s ratings.</li>
              <li>Coordinate with others to leave false positive or negative reviews.</li>
              <li>Threaten a negative review to coerce a user into providing a refund or discount outside of the proper dispute process.</li>
            </ul>

            <h3 className="text-base font-semibold text-[#1D1D1F] mt-4">2.6 Automated Scraping and Abuse</h3>
            <p className="mt-3">You may not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Use bots, scrapers, crawlers, or automated tools to extract data from the CouthActs platform without written authorization.</li>
              <li>Reverse-engineer, decompile, or attempt to extract the source code of any CouthActs software or API.</li>
              <li>Overload the platform with automated requests, denial-of-service attacks, or other methods intended to disrupt service.</li>
              <li>Access or attempt to access another user&apos;s account, data, or private information without authorization.</li>
              <li>Use the CouthActs API in ways that violate our API terms or exceed published rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">3. Consequences of Violations</h2>
            <p className="mt-3">
              CouthActs reserves the right to take any of the following actions in response
              to AUP violations, at our sole discretion:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-[#1D1D1F]">Warning:</strong> A formal notice requiring immediate corrective action.</li>
              <li><strong className="text-[#1D1D1F]">Temporary suspension:</strong> Restriction of platform access for a defined period pending investigation.</li>
              <li><strong className="text-[#1D1D1F]">Permanent ban:</strong> Irrevocable termination of the account and all associated accounts.</li>
              <li><strong className="text-[#1D1D1F]">Fund forfeiture:</strong> Escrowed or wallet funds may be held or forfeited if connected to prohibited activity.</li>
              <li><strong className="text-[#1D1D1F]">Legal action:</strong> We may pursue civil claims for damages or refer criminal conduct to law enforcement.</li>
              <li><strong className="text-[#1D1D1F]">Regulatory reporting:</strong> Violations involving licensed transportation may be reported to DOT, FMCSA, FAA, IMO, or other relevant authorities.</li>
            </ul>
            <p className="mt-3">
              The severity of the response will be proportional to the nature of the violation.
              Repeated minor violations will be treated with increasing severity. Violations
              involving illegality, safety, or fraud will result in immediate permanent ban
              without prior warning.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">4. Reporting Violations</h2>
            <p className="mt-3">
              If you witness or become aware of a violation of this Acceptable Use Policy,
              please report it immediately using the &quot;Report&quot; button on the relevant
              booking, profile, or review, or by contacting us directly at{" "}
              <a href="mailto:legal@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">
                legal@couthacts.com
              </a>
              . All reports are investigated by our trust and safety team. You may report
              anonymously.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">5. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Acceptable Use Policy from time to time. Material changes
              will be communicated via email or platform notification at least thirty (30)
              days before they take effect. Continued use of the CouthActs platform after
              notice constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-[#FFE8F0] via-white to-[#EAF4FF] p-8 border border-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl">
              🚨
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-[#1D1D1F]">
                See something sketchy?
              </h3>
              <p className="mt-1 text-[13px] text-[#1D1D1F]/60">
                Tell us at <a href="mailto:legal@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">legal@couthacts.com</a>. Anonymous reports welcome &mdash; we read every one.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/terms" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Terms of Service</Link>
          <Link href="/privacy" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Privacy Policy</Link>
          <Link href="/cookies" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Cookie Policy</Link>
          <Link href="/safety" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Safety Center</Link>
        </div>
      </div>
    </div>
  );
}
