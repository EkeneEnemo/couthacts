import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Terms of Service — CouthActs™",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Last updated: March 30, 2026 &middot; Effective immediately
        </p>

        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">1. Agreement to Terms</h2>
            <p>
              By accessing or using the CouthActs&#8482; platform (&quot;Platform&quot;), operated by CouthActs&#8482; Incorporated (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, you must not access or use the Platform.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and CouthActs&#8482; Incorporated. We reserve the right to modify these Terms at any time. Material changes will be communicated via email or Platform notification at least thirty (30) days before they take effect. Your continued use of the Platform after such notice constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">2. Eligibility</h2>
            <p>
              You must be at least eighteen (18) years of age, or the age of legal majority in your jurisdiction, to create an account. By registering, you represent and warrant that: (a) you are of legal age; (b) you have the legal capacity to enter into these Terms; (c) all information you provide is truthful, accurate, and complete; (d) the first and last name on your account matches exactly the name on your government-issued identification document; and (e) your use of the Platform does not violate any applicable law or regulation.
            </p>
            <p>
              Business entities must be duly organized and in good standing under the laws of their jurisdiction. The individual accepting these Terms on behalf of an entity represents they have the authority to bind that entity.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">3. The Platform</h2>
            <p>
              CouthActs&#8482; is a multimodal transportation marketplace that connects customers who need transportation services (&quot;Customers&quot;) with verified transportation service providers (&quot;Providers&quot;). The Platform supports eighteen (18) transport modes spanning ground, air, maritime, and rail categories.
            </p>
            <p>
              <strong>CouthActs&#8482; is a marketplace, not a carrier.</strong> We do not own, operate, or control any vehicles, vessels, aircraft, or equipment. We do not employ drivers, pilots, captains, or any transportation personnel. We are not a party to the transportation contract between Customer and Provider. We provide the technology platform that facilitates the connection, payment, and tracking of transportation services.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">4. Accounts and Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must immediately notify us of any unauthorized access or use of your account.
            </p>
            <p>
              Each User may maintain only one (1) account. Creating multiple accounts, impersonating another person, or providing false identity information is grounds for immediate termination. We reserve the right to require identity verification (KYC/KYB) at any time and to suspend accounts pending verification.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">5. Wallet and Payments</h2>
            <p>
              The CouthActs&#8482; Wallet is a stored-value system used to facilitate transactions on the Platform. The Wallet is not a bank account, deposit account, or any form of financial institution product. Wallet balances do not earn interest.
            </p>
            <p>
              <strong>Top-Ups.</strong> You may add funds to your Wallet via credit/debit card through our payment processor, Stripe, Inc. All top-ups are processed in United States Dollars (USD). The minimum top-up is $5.00 USD and the maximum single top-up is $50,000 USD. All top-ups are final and non-refundable.
            </p>
            <p>
              <strong>Multi-Currency Display.</strong> Users may select a preferred display currency in their account settings. All prices, balances, and fees are displayed in the user&apos;s preferred currency alongside the USD equivalent. The internal ledger is maintained exclusively in USD. Exchange rates are provided for informational purposes and are updated periodically; the Company does not guarantee the accuracy of displayed conversion rates. All financial obligations are denominated in USD regardless of display currency.
            </p>
            <p>
              <strong>Posting Fees.</strong> When a Customer creates a transportation posting, two charges are deducted from their Wallet: (a) a non-refundable posting fee, and (b) the full posted budget amount as an escrow hold. The posting fee consists of a base fee determined by transport mode (ranging from $2.00 to $50.00 USD) plus 0.5% of the posted budget, with an absolute minimum of $2.00 USD. Posting fees are non-refundable under any circumstance, including expiration, cancellation, or failure to receive bids.
            </p>
            <p>
              <strong>Minimum Budgets.</strong> Each transport mode has a minimum budget requirement in USD to ensure service quality and platform viability. Minimum budgets range from $5.00 USD (Taxi, Courier) to $1,000.00 USD (Private Jet). Postings below the applicable minimum will be rejected. When posting in a non-USD currency, the equivalent USD amount at the current exchange rate must meet or exceed the minimum.
            </p>
            <p>
              <strong>Budget Hold and Escrow.</strong> The full posted budget is held in the Customer&apos;s Wallet at the time of posting. When a Customer accepts a Provider&apos;s bid: (a) if the bid amount is less than the posted budget, the difference is immediately refunded to the Customer&apos;s Wallet; (b) an escrow record is created for the agreed bid amount. Escrow funds are released to the Provider&apos;s Wallet only upon mutual confirmation of delivery by both Customer and Provider. A platform escrow fee of 3.5% is deducted from the escrow amount before release to the Provider.
            </p>
            <p>
              <strong>Posting Expiration.</strong> Postings expire fourteen (14) days after creation if no bid has been accepted. Upon expiration, the budget hold is automatically refunded in full to the Customer&apos;s Wallet. The posting fee is not refunded.
            </p>
            <p>
              <strong>Refunds.</strong> If a booking is cancelled by the Customer before the Provider begins transit, the full escrow amount is refunded to the Customer&apos;s Wallet. If a dispute is filed, escrow funds are frozen until resolution. The Company determines refund eligibility at its sole discretion during dispute resolution. Budget surplus refunds (when accepted bid is less than posted budget) are processed immediately and automatically.
            </p>
            <p>
              <strong>Provider Payouts.</strong> Providers may withdraw Wallet funds to their bank account via Stripe Connect. Withdrawal processing times are subject to Stripe&apos;s policies and are not controlled by CouthActs&#8482;. Payout amounts reflect the agreed bid amount minus the 3.5% platform escrow fee.
            </p>
            <p>
              <strong>Fee Schedule Summary.</strong>
            </p>
            <table className="w-full text-sm border-collapse mt-2 mb-2">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 pr-4 font-semibold">Fee</th>
                  <th className="py-2 pr-4 font-semibold">Rate</th>
                  <th className="py-2 font-semibold">When Charged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 pr-4">Posting fee</td>
                  <td className="py-2 pr-4">$2–$50 base + 0.5% of budget (min $2)</td>
                  <td className="py-2">At posting creation (non-refundable)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Budget hold</td>
                  <td className="py-2 pr-4">100% of posted budget</td>
                  <td className="py-2">At posting creation (refundable if no match)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Escrow fee</td>
                  <td className="py-2 pr-4">3.5% of agreed bid amount</td>
                  <td className="py-2">Deducted from provider payout on completion</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Wallet top-up</td>
                  <td className="py-2 pr-4">No CouthActs&#8482; fee (Stripe processing fees apply)</td>
                  <td className="py-2">At time of top-up (non-refundable)</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">6. Customer Obligations</h2>
            <p>Customers agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and complete information in all postings, including origin, destination, cargo description, dimensions, weight, and any hazardous or special-handling requirements.</li>
              <li>Maintain sufficient Wallet balance to cover posting fees and escrow holds.</li>
              <li>Respond promptly to bids and booking communications.</li>
              <li>Confirm delivery accurately and in good faith upon receipt of goods or completion of transport.</li>
              <li>Not misuse the escrow system by falsely denying delivery or filing fraudulent disputes.</li>
              <li>Comply with all applicable laws regarding the goods or persons being transported, including export controls, sanctions, and customs regulations.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">7. Provider Obligations</h2>
            <p>Providers agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Complete Know Your Business (KYB) verification and maintain accurate business information.</li>
              <li>Hold all licenses, permits, insurance, and certifications required by applicable law for the transport modes they offer, including but not limited to DOT, MC, FMCSA, IMO, and FAA registrations where applicable.</li>
              <li>Bid only on jobs they have the capacity, equipment, and legal authorization to fulfill.</li>
              <li>Honor accepted bids and complete bookings on time and in accordance with the agreed terms.</li>
              <li>Maintain adequate insurance coverage for all transportation services provided through the Platform.</li>
              <li>Report delivery status accurately and promptly through the Platform&apos;s tracking system.</li>
              <li>Connect a valid Stripe Connect account for receiving payouts.</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">8. CouthActs&#8482; Score</h2>
            <p>
              The CouthActs&#8482; Score is a proprietary trust metric assigned to Providers based on factors including but not limited to: completion rate, on-time delivery rate, customer ratings, communication responsiveness, and dispute history. The Score is updated algorithmically and is provided for informational purposes to help Customers make informed decisions.
            </p>
            <p>
              CouthActs&#8482; does not guarantee the accuracy, reliability, or predictive value of the Score. The Score does not constitute an endorsement, certification, or warranty of any Provider&apos;s services. Customers are solely responsible for evaluating Providers before accepting bids.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">9. Disputes</h2>
            <p>
              Either party to a booking may file a dispute through the Platform. Upon filing, escrow funds are immediately frozen. The Company will review disputes and may request evidence from both parties. Dispute resolution is at the Company&apos;s sole discretion, and may result in full or partial release of funds to either party.
            </p>
            <p>
              You agree to cooperate with the dispute resolution process and to provide truthful information and evidence. Filing false or fraudulent disputes is grounds for immediate account termination and forfeiture of Wallet balance.
            </p>
            <p>
              The Company&apos;s dispute resolution does not constitute arbitration or mediation under any applicable law. Either party retains the right to pursue legal remedies in a court of competent jurisdiction.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">10. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the Platform for any unlawful purpose, including transporting illegal goods, controlled substances, or sanctioned materials.</li>
              <li>Circumvent, disable, or interfere with any security feature of the Platform.</li>
              <li>Scrape, crawl, or use automated tools to access the Platform without written permission.</li>
              <li>Manipulate the bidding system, CouthActs&#8482; Score, or review system through fraudulent activity, fake accounts, or coordinated behavior.</li>
              <li>Conduct transactions outside the Platform to avoid escrow protections or platform fees.</li>
              <li>Harass, threaten, or abuse other Users.</li>
              <li>Upload false documentation, forged certifications, or misleading business information.</li>
              <li>Use the Platform to launder money or finance terrorism.</li>
            </ul>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">11. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COUTHACTS&#8482; INCORPORATED, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>YOUR ACCESS TO, USE OF, OR INABILITY TO ACCESS OR USE THE PLATFORM;</li>
              <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM, INCLUDING WITHOUT LIMITATION ANY DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF OTHER USERS OR PROVIDERS;</li>
              <li>ANY CONTENT OBTAINED FROM THE PLATFORM;</li>
              <li>LOSS OF, DAMAGE TO, OR DELAY OF ANY GOODS OR PERSONS DURING TRANSPORT;</li>
              <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</li>
            </ul>
            <p>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE AMOUNTS PAID BY YOU TO COUTHACTS&#8482; IN PLATFORM FEES DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless CouthActs&#8482; Incorporated and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorney&apos;s fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any third-party right, including intellectual property, property, or privacy rights; or (d) any claim that your content or conduct caused damage to a third party.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">13. Intellectual Property</h2>
            <p>
              The Platform, including its design, text, graphics, logos, icons, images, software, and the CouthActs&#8482; name and mark, are the exclusive property of Enemo Consulting Group, Inc., licensed to CouthActs&#8482; Incorporated, and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any Platform content without our prior written consent.
            </p>
            <p>
              By posting content on the Platform (including postings, reviews, and profile information), you grant Enemo Consulting Group, Inc. and CouthActs&#8482; Incorporated a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with operating the Platform.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">14. Termination</h2>
            <p>
              We may suspend or terminate your account at any time, with or without cause and with or without notice, including for violation of these Terms. Upon termination: (a) your right to access the Platform ceases immediately; (b) any pending escrow will be resolved per our dispute resolution process; (c) remaining Wallet balance, less any amounts owed to the Company, will be available for withdrawal for thirty (30) days, after which unclaimed funds may be forfeited to the extent permitted by law.
            </p>
            <p>
              You may delete your account at any time through the Platform settings. Account deletion does not relieve you of any obligations incurred prior to deletion.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">15. Disclaimers</h2>
            <p>
              THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT: (A) THE PLATFORM WILL MEET YOUR REQUIREMENTS; (B) THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) THE RESULTS OBTAINED FROM THE PLATFORM WILL BE ACCURATE OR RELIABLE; OR (D) ANY ERRORS WILL BE CORRECTED.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">16. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the federal or state courts located in the State of Delaware, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">17. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">18. Entire Agreement</h2>
            <p>
              These Terms, together with the <Link href="/privacy" className="text-ocean-600 underline hover:text-ocean-700">Privacy Policy</Link>, constitute the entire agreement between you and CouthActs&#8482; Incorporated regarding your use of the Platform and supersede all prior agreements and understandings.
            </p>
          </section>

          {/* 19 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">19. Contact</h2>
            <p>
              For questions about these Terms, contact us at:<br />
              <strong>CouthActs&#8482; Incorporated</strong><br />
              Email: legal@couthacts.com<br />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
