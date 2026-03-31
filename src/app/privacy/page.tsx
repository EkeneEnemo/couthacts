import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = { title: "Privacy Policy — CouthActs™" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">Privacy Policy</h1>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">CouthActs, Inc.</p>
          <p className="text-sm text-gray-500">The Adolphus Tower, Dallas, Texas</p>
          <p className="text-sm text-gray-400">Effective Date: November 27, 2021 &middot; Last Updated: March 30, 2026</p>
        </div>

        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">1. Introduction</h2>
            <p>CouthActs, Inc. (&quot;CouthActs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights. The CouthActs platform intellectual property is owned by Enemo Consulting Group, Inc. and licensed to CouthActs, Inc.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">2. Data We Collect</h2>
            <p><strong>Personal identification:</strong> name, email, phone, government ID (processed by Persona — not stored by CouthActs), profile photo, company logo.</p>
            <p><strong>Transaction data:</strong> job postings, bids, bookings, escrow transactions, wallet transactions, protection fee payments, verification fee payments.</p>
            <p><strong>Location data:</strong> GPS coordinates during active jobs, origin and destination addresses.</p>
            <p><strong>Device data:</strong> IP address, browser type, device identifiers.</p>
            <p><strong>Communication data:</strong> bid messages, dispute submissions, support requests.</p>
            <p><strong>Academy data:</strong> course enrollments, exam scores, certificate IDs.</p>
            <p><strong>API usage data:</strong> call counts, endpoint usage, webhook delivery logs.</p>
            <p><strong>Financial data:</strong> Stripe customer ID, Connect account ID. We do not store full card numbers or bank account details.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">3. How We Use Your Data</h2>
            <p>To operate the platform and process transactions; verify identity via Persona; calculate and display CouthActs Scores; provide live tracking during active jobs; process escrow and wallet transactions via Stripe; deliver Academy courses and certificates; send transactional emails via Resend; deliver real-time notifications via Pusher; provide customer support; detect and prevent fraud; comply with legal obligations; and improve platform features.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">4. Data Sharing</h2>
            <p>We share data with: <strong>Persona</strong> (identity verification), <strong>Stripe</strong> (payment processing), <strong>Pusher</strong> (real-time events), <strong>Vercel</strong> (hosting), <strong>Neon</strong> (database), <strong>Resend</strong> (email delivery), <strong>Google Maps</strong> (location services), and <strong>ExchangeRate-API</strong> (currency conversion — no personal data shared).</p>
            <p>We do not sell your personal data to third parties. We do not share your data for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">5. Location Data</h2>
            <p>Location data is collected during active jobs only via mobile GPS, AIS, flight tracking, and ELD integrations. Location data is stored as TrackingEvents and is visible to the customer on the public tracking page for their specific job. Location data is not shared with third parties except as required for tracking integrations.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">6. Data Retention</h2>
            <p>Active account data: retained for duration of account. Completed job data: 7 years (tax compliance). Tracking events: 2 years. Wallet transactions: 7 years. Academy certificates: permanently. Deleted account data: purged within 30 days except where legally required.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">7. Your Rights (US — CCPA)</h2>
            <p>Right to know what data we hold; right to delete (subject to retention requirements); right to opt out of data sale (we do not sell data); right to non-discrimination. Contact: privacy@couthacts.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">8. Your Rights (UK/EU — GDPR)</h2>
            <p>Right of access; right to rectification; right to erasure; right to data portability; right to restrict processing; right to object; right to withdraw consent. Contact: privacy@couthacts.com. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">9. Cookies</h2>
            <p>We use one essential session cookie (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">couthacts_session</code>): HttpOnly, Secure, SameSite=Lax, 30-day expiry. No analytics, advertising, or third-party tracking cookies. See our <Link href="/cookies" className="text-ocean-600 underline hover:text-ocean-700">Cookie Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">10. Children</h2>
            <p>CouthActs is not directed at children under 18. We do not knowingly collect data from minors. Contact privacy@couthacts.com if you believe a minor has created an account.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">11. Security</h2>
            <p>We implement industry-standard measures: passwords hashed with bcrypt (12 rounds); session tokens via cryptographic random bytes; TLS/HTTPS encryption; database encrypted at rest; HttpOnly Secure SameSite cookies; credit card data processed exclusively by Stripe (PCI DSS Level 1). No system is completely secure and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">12. International Transfers</h2>
            <p>Your data may be processed in the United States and other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers in compliance with applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">13. Contact</h2>
            <p>Privacy: privacy@couthacts.com &middot; Data requests: privacy@couthacts.com<br /><strong>CouthActs, Inc.</strong> &middot; The Adolphus Tower, Dallas, Texas</p>
          </section>

        </div>
      </div>
    </div>
  );
}
