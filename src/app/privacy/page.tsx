import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Privacy Policy — CouthActs™",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Last updated: March 30, 2026 &middot; Effective immediately
        </p>

        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">1. Introduction</h2>
            <p>
              CouthActs, Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the CouthActs&#8482; platform (&quot;Platform&quot;), including our website, mobile applications, and APIs.
            </p>
            <p>
              By using the Platform, you consent to the data practices described in this Policy. If you do not agree, you must not use the Platform. This Policy should be read alongside our <Link href="/terms" className="text-ocean-600 underline hover:text-ocean-700">Terms of Service</Link>.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">2. Information We Collect</h2>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">2.1 Information You Provide</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account data:</strong> name, email address, phone number, password (stored as a cryptographic hash, never in plaintext), role (Customer or Provider), profile photo.</li>
              <li><strong>Identity verification data:</strong> government-issued photo ID (processed by our third-party verification partner; not stored on CouthActs&#8482; servers after verification), verification status, verification reference ID. A $20.00 USD non-refundable fee is charged per verification attempt.</li>
              <li><strong>Profile data:</strong> city, country, preferred language, preferred currency, avatar.</li>
              <li><strong>Provider data:</strong> business name, registration number, regulatory IDs (DOT, MC, FMCSA, IMO, FAA), certifications, fleet size, service areas, insurance documentation, Stripe Connect account information.</li>
              <li><strong>Posting data:</strong> origin and destination addresses, cargo description, dimensions, weight, special handling requirements, budget, dates, tracking preferences.</li>
              <li><strong>Financial data:</strong> Wallet transaction history (top-ups, posting fees, budget holds, escrow holds, payouts, refunds), payment amounts, preferred display currency, exchange rate lookups. Credit card numbers are processed exclusively by Stripe and are never stored on our servers.</li>
              <li><strong>Communications:</strong> messages exchanged through the Platform, bid messages, review text, dispute descriptions and evidence.</li>
            </ul>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Device data:</strong> IP address, browser type, operating system, device identifiers.</li>
              <li><strong>Usage data:</strong> pages visited, features used, timestamps, click patterns, search queries.</li>
              <li><strong>Location data:</strong> approximate location derived from IP address. Precise GPS location only if you explicitly grant permission for tracking features.</li>
              <li><strong>Cookies:</strong> session cookies for authentication (httpOnly, secure, SameSite=Lax). We do not use advertising or third-party tracking cookies.</li>
            </ul>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">2.3 Information from Third Parties</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Stripe:</strong> payment confirmation, Stripe Connect onboarding status, payout status.</li>
              <li><strong>Tracking providers:</strong> GPS coordinates, maritime AIS data, flight tracking data, ELD data, IoT device telemetry, and satellite positioning data from third-party tracking integrations.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create, maintain, and secure your account.</li>
              <li>Facilitate transportation platform transactions, including postings, bids, bookings, escrow, and payouts.</li>
              <li>Calculate and display CouthActs&#8482; Scores for Providers.</li>
              <li>Process payments and Wallet transactions through Stripe.</li>
              <li>Provide real-time tracking of jobs and transport.</li>
              <li>Send transactional emails (welcome, booking confirmation, escrow release, dispute notification) via Resend.</li>
              <li>Deliver in-app notifications about bids, bookings, and account activity via Pusher.</li>
              <li>Resolve disputes and enforce our Terms of Service.</li>
              <li>Detect and prevent fraud, abuse, and unauthorized access.</li>
              <li>Comply with legal obligations and respond to lawful requests from public authorities.</li>
              <li>Convert and display prices in your preferred currency using third-party exchange rates.</li>
              <li>Improve the Platform through aggregated, anonymized analytics.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">4. Third-Party Service Providers</h2>
            <p>We share personal data with the following categories of third-party service providers, solely to operate the Platform:</p>
            <table className="w-full text-sm border-collapse mt-3">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-ocean-800">Provider</th>
                  <th className="py-2 pr-4 font-semibold text-ocean-800">Purpose</th>
                  <th className="py-2 font-semibold text-ocean-800">Data Shared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 pr-4">Stripe, Inc.</td>
                  <td className="py-2 pr-4">Payment processing, Connect payouts</td>
                  <td className="py-2">Name, email, payment amounts, bank info (Providers)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Neon (via Vercel)</td>
                  <td className="py-2 pr-4">Database hosting</td>
                  <td className="py-2">All Platform data (encrypted at rest and in transit)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Vercel Inc.</td>
                  <td className="py-2 pr-4">Application hosting</td>
                  <td className="py-2">Request logs, IP addresses</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Resend</td>
                  <td className="py-2 pr-4">Transactional email delivery</td>
                  <td className="py-2">Email address, name, email content</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Pusher</td>
                  <td className="py-2 pr-4">Real-time notifications</td>
                  <td className="py-2">User ID, notification content</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">ExchangeRate-API</td>
                  <td className="py-2 pr-4">Currency exchange rates</td>
                  <td className="py-2">No personal data shared (anonymous rate lookups)</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes. We do not share your data with advertisers.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">5. Data Security</h2>
            <p>We implement industry-standard security measures including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Passwords hashed with bcrypt (12 rounds) — never stored in plaintext.</li>
              <li>Session tokens generated using cryptographically secure random bytes.</li>
              <li>All data transmitted over TLS/HTTPS encryption.</li>
              <li>Database encrypted at rest (Neon PostgreSQL).</li>
              <li>HttpOnly, Secure, SameSite=Lax session cookies to prevent XSS and CSRF attacks.</li>
              <li>Credit card data processed exclusively by Stripe (PCI DSS Level 1 certified) — never touches our servers.</li>
            </ul>
            <p>
              Despite these measures, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security and encourage you to use strong, unique passwords and enable all available security features.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">6. Data Retention</h2>
            <p>We retain your personal data for as long as your account is active or as needed to provide you services. Specifically:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account data:</strong> retained until account deletion, plus thirty (30) days for fund withdrawal.</li>
              <li><strong>Transaction records:</strong> retained for seven (7) years to comply with tax and financial regulations.</li>
              <li><strong>Session data:</strong> expires after thirty (30) days; expired sessions are periodically purged.</li>
              <li><strong>Tracking data:</strong> retained for one (1) year after booking completion.</li>
              <li><strong>Dispute evidence:</strong> retained for three (3) years after resolution.</li>
            </ul>
            <p>Upon account deletion, we anonymize or delete your personal data within ninety (90) days, except where retention is required by law.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the following rights:</p>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">7.1 All Users</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Access:</strong> request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> request correction of inaccurate personal data.</li>
              <li><strong>Deletion:</strong> request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong>Data portability:</strong> request your data in a structured, machine-readable format.</li>
              <li><strong>Objection:</strong> object to certain processing of your personal data.</li>
            </ul>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">7.2 European Economic Area (GDPR)</h3>
            <p>
              If you are in the EEA, we process your data based on: (a) contractual necessity (to provide the Platform); (b) legitimate interest (fraud prevention, Platform improvement); and (c) consent (where specifically requested). You have the right to withdraw consent at any time and to lodge a complaint with your local data protection authority.
            </p>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">7.3 California (CCPA/CPRA)</h3>
            <p>
              California residents have the right to: (a) know what personal information is collected; (b) request deletion; (c) opt out of the sale of personal information (we do not sell personal information); and (d) non-discrimination for exercising these rights. To submit a request, email privacy@couthacts.com.
            </p>

            <h3 className="text-base font-semibold text-ocean-700 mt-4">7.4 Other Jurisdictions</h3>
            <p>
              We comply with applicable data protection laws in all jurisdictions where we operate. If your local law provides additional rights beyond those listed here, those rights apply.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">8. Cookies</h2>
            <p>
              We use only essential cookies required for the Platform to function. Specifically, we use a single session cookie (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">couthacts_session</code>) to authenticate your login. This cookie is:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>HttpOnly:</strong> cannot be accessed by JavaScript (prevents XSS).</li>
              <li><strong>Secure:</strong> transmitted only over HTTPS.</li>
              <li><strong>SameSite=Lax:</strong> prevents cross-site request forgery.</li>
              <li><strong>Expires:</strong> thirty (30) days after login.</li>
            </ul>
            <p>We do not use analytics cookies, advertising cookies, or third-party tracking cookies.</p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">9. Children&apos;s Privacy</h2>
            <p>
              The Platform is not intended for individuals under the age of eighteen (18). We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will delete it promptly. If you believe a child has provided us with personal data, contact us at privacy@couthacts.com.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">10. International Data Transfers</h2>
            <p>
              Your data may be processed in the United States and other countries where our service providers operate. When we transfer data outside your jurisdiction, we ensure appropriate safeguards are in place, including standard contractual clauses approved by relevant authorities.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated via email or Platform notification at least thirty (30) days before they take effect. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">12. Contact</h2>
            <p>
              For privacy-related questions, data requests, or complaints, contact:<br />
              <strong>CouthActs, Inc. — Privacy</strong><br />
              Email: privacy@couthacts.com<br />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
