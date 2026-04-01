import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = { title: "Privacy Policy — CouthActs™" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">Privacy Policy</h1>
        <div className="mt-2 space-y-1">
          <p className="text-[13px] text-[#6E6E73]">CouthActs, Inc.</p>
          <p className="text-[13px] text-[#6E6E73]">The Adolphus Tower, Dallas, Texas</p>
          <p className="text-[11px] text-[#86868B]">Effective Date: November 27, 2021 &middot; Last Updated: March 30, 2026</p>
        </div>

        <div className="mt-10 max-w-none space-y-8 text-[14px] text-[#6E6E73] leading-relaxed">

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">1. Introduction</h2>
            <p className="mt-3">CouthActs, Inc. (&quot;CouthActs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights. The CouthActs platform intellectual property is owned by Enemo Consulting Group, Inc. and licensed to CouthActs, Inc.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">2. Data We Collect</h2>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Personal identification:</strong> name, email, phone, government ID (processed by Persona — not stored by CouthActs), profile photo, company logo.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Transaction data:</strong> job postings, bids, bookings, escrow transactions, wallet transactions, protection fee payments, verification fee payments.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Location data:</strong> GPS coordinates during active jobs, origin and destination addresses.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Device data:</strong> IP address, browser type, device identifiers.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Communication data:</strong> bid messages, dispute submissions, support requests.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Academy data:</strong> course enrollments, exam scores, certificate IDs.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">API usage data:</strong> call counts, endpoint usage, webhook delivery logs.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Financial data:</strong> Stripe customer ID, Connect account ID. We do not store full card numbers or bank account details.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">3. How We Use Your Data</h2>
            <p className="mt-3">To operate the platform and process transactions; verify identity via Persona; calculate and display CouthActs Scores; provide live tracking during active jobs; process escrow and wallet transactions via Stripe; deliver Academy courses and certificates; send transactional emails via Resend; deliver real-time notifications via Pusher; provide customer support; detect and prevent fraud; comply with legal obligations; and improve platform features.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">4. Data Sharing</h2>
            <p className="mt-3">We share data with: <strong className="text-[#1D1D1F]">Persona</strong> (identity verification), <strong className="text-[#1D1D1F]">Stripe</strong> (payment processing), <strong className="text-[#1D1D1F]">Pusher</strong> (real-time events), <strong className="text-[#1D1D1F]">Vercel</strong> (hosting), <strong className="text-[#1D1D1F]">Neon</strong> (database), <strong className="text-[#1D1D1F]">Resend</strong> (email delivery), <strong className="text-[#1D1D1F]">Google Maps</strong> (location services), and <strong className="text-[#1D1D1F]">ExchangeRate-API</strong> (currency conversion — no personal data shared).</p>
            <p className="mt-3">We do not sell your personal data to third parties. We do not share your data for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">5. Location Data</h2>
            <p className="mt-3">Location data is collected during active jobs only via mobile GPS, AIS, flight tracking, and ELD integrations. Location data is stored as TrackingEvents and is visible to the customer on the public tracking page for their specific job. Location data is not shared with third parties except as required for tracking integrations.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">6. Data Retention</h2>
            <p className="mt-3">Active account data: retained for duration of account. Completed job data: 7 years (tax compliance). Tracking events: 2 years. Wallet transactions: 7 years. Academy certificates: permanently. Deleted account data: purged within 30 days except where legally required.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">7. Your Rights (US — CCPA)</h2>
            <p className="mt-3">Right to know what data we hold; right to delete (subject to retention requirements); right to opt out of data sale (we do not sell data); right to non-discrimination. Contact: privacy@couthacts.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">8. Your Rights (UK/EU — GDPR)</h2>
            <p className="mt-3">Right of access; right to rectification; right to erasure; right to data portability; right to restrict processing; right to object; right to withdraw consent. Contact: privacy@couthacts.com. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">9. Cookies</h2>
            <p className="mt-3">We use one essential session cookie (<code className="text-[13px] bg-[#F5F5F7] px-1.5 py-0.5 rounded-md border border-[#E8E8ED]">couthacts_session</code>): HttpOnly, Secure, SameSite=Lax, 30-day expiry. No analytics, advertising, or third-party tracking cookies. See our <Link href="/cookies" className="text-[#007AFF] hover:text-[#0055D4]">Cookie Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">10. Children</h2>
            <p className="mt-3">CouthActs is not directed at children under 18. We do not knowingly collect data from minors. Contact privacy@couthacts.com if you believe a minor has created an account.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">11. Security</h2>
            <p className="mt-3">We implement industry-standard measures: passwords hashed with bcrypt (12 rounds); session tokens via cryptographic random bytes; TLS/HTTPS encryption; database encrypted at rest; HttpOnly Secure SameSite cookies; credit card data processed exclusively by Stripe (PCI DSS Level 1). No system is completely secure and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">12. International Transfers</h2>
            <p className="mt-3">Your data may be processed in the United States and other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers in compliance with applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">13. Contact</h2>
            <p className="mt-3">Privacy: privacy@couthacts.com &middot; Data requests: privacy@couthacts.com<br /><strong className="text-[#1D1D1F]">CouthActs, Inc.</strong> &middot; The Adolphus Tower, Dallas, Texas</p>
          </section>

        </div>
      </div>
    </div>
  );
}
