import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = { title: "Privacy Policy — CouthActs™" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">🔒</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            Your data, handled with care
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Privacy <span className="text-[#007AFF]">policy</span>.
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-[#1D1D1F]/55">
          <span>CouthActs&#8482;, Inc., a wholly owned subsidiary of The Ravine of Willows, Inc.</span>
          <span className="text-[#1D1D1F]/20">•</span>
          <span>The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202</span>
        </div>
        <p className="mt-1 text-[11px] text-[#1D1D1F]/40">
          Effective November 27, 2021 &middot; Last updated April 30, 2026
        </p>

        <div className="mt-12 rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-8 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] space-y-8 text-[14px] text-[#1D1D1F]/65 leading-relaxed">

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">1. Introduction &amp; Data Controller</h2>
            <p className="mt-3"><strong className="text-[#1D1D1F]">CouthActs&#8482;, Inc.</strong>, a Texas corporation (&quot;CouthActs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights. CouthActs&#8482;, Inc. is a wholly owned subsidiary of <strong className="text-[#1D1D1F]">The Ravine of Willows, Inc.</strong>, also a Texas corporation.</p>
            <p className="mt-3">For purposes of applicable data protection law (including the GDPR and UK GDPR), the data controller is <strong className="text-[#1D1D1F]">CouthActs&#8482;, Inc.</strong>, with its principal place of business at The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202, United States. The CouthActs platform&apos;s underlying intellectual property is wholly owned by Enemo Consulting Group, Inc., and CouthActs&#8482;, Inc. operates under license from Enemo Consulting Group, Inc.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">2. Data We Collect</h2>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Personal identification:</strong> name, email, phone, government ID (processed by our certified third-party identity verification provider — not stored by CouthActs), profile photo, company logo.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Transaction data:</strong> job postings, bids, bookings, escrow transactions, wallet transactions, protection fee payments, verification fee payments.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Location data:</strong> GPS coordinates during active jobs, origin and destination addresses.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Device data:</strong> IP address, browser type, device identifiers.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Communication data:</strong> bid messages, dispute submissions, support requests.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Academy data:</strong> course enrollments, exam scores, certificate IDs.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">API usage data:</strong> call counts, endpoint usage, webhook delivery logs.</p>
            <p className="mt-3"><strong className="text-[#1D1D1F]">Financial data:</strong> Stripe customer ID, Connect account ID. We do not store full card numbers or bank account details.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">3. How We Use Your Data</h2>
            <p className="mt-3">To operate the platform and process transactions; verify identity through our enterprise-grade identity verification system; calculate and display CouthActs Scores; provide live tracking during active jobs; process escrow and wallet transactions via Stripe; deliver Academy courses and certificates; send transactional emails via Resend; deliver real-time notifications via Pusher; provide customer support; detect and prevent fraud; comply with legal obligations; and improve platform features.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">4. Data Sharing</h2>
            <p className="mt-3">We share data with trusted, industry-leading service providers: identity verification (government-grade KYC/KYB processing — documents are not stored on CouthActs servers), <strong className="text-[#1D1D1F]">Stripe</strong> (PCI-DSS Level 1 certified payment processing), real-time event delivery, <strong className="text-[#1D1D1F]">Vercel</strong> (SOC 2 Type II certified hosting), encrypted database infrastructure, transactional email delivery, location and mapping services, and currency conversion (no personal data shared).</p>
            <p className="mt-3">We do not sell your personal data to third parties. We do not share your data for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">5. Location Data</h2>
            <p className="mt-3">Location data is collected during active jobs only via mobile GPS, AIS, flight tracking, and ELD integrations. Location data is stored as TrackingEvents and is visible to the customer on the public tracking page for their specific job. Location data is not shared with third parties except as required for tracking integrations.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">6. Data Retention</h2>
            <p className="mt-3">Active account data: retained for duration of account. Completed job data: 7 years (tax compliance). Tracking events: 2 years. Wallet transactions: 7 years. Academy certificates: permanently. Deleted account data: purged within 30 days except where legally required.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">7. Your Rights (US — CCPA)</h2>
            <p className="mt-3">Right to know what data we hold; right to delete (subject to retention requirements); right to opt out of data sale (we do not sell data); right to non-discrimination. Contact: privacy@couthacts.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">8. Your Rights (UK/EU — GDPR)</h2>
            <p className="mt-3">Right of access; right to rectification; right to erasure; right to data portability; right to restrict processing; right to object; right to withdraw consent. Contact: privacy@couthacts.com. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">9. Cookies</h2>
            <p className="mt-3">We use one essential session cookie (<code className="text-[13px] bg-[#FFF5E6] px-1.5 py-0.5 rounded-md border border-[#FFE3A3]">couthacts_session</code>): HttpOnly, Secure, SameSite=Lax, 30-day expiry. No analytics, advertising, or third-party tracking cookies. See our <Link href="/cookies" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">Cookie Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">10. Children</h2>
            <p className="mt-3">CouthActs is not directed at children under 18. We do not knowingly collect data from minors. Contact privacy@couthacts.com if you believe a minor has created an account.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">11. Security</h2>
            <p className="mt-3">We implement industry-standard measures: passwords hashed with bcrypt (12 rounds); session tokens via cryptographic random bytes; TLS/HTTPS encryption; database encrypted at rest; HttpOnly Secure SameSite cookies; credit card data processed exclusively by Stripe (PCI DSS Level 1). No system is completely secure and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">12. International Transfers</h2>
            <p className="mt-3">Your data may be processed in the United States and other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers in compliance with applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">13. Contact</h2>
            <p className="mt-3">Privacy: privacy@couthacts.com &middot; Data requests: privacy@couthacts.com</p>
            <p className="mt-3">
              <strong className="text-[#1D1D1F]">CouthActs&#8482;, Inc.</strong>, a wholly owned subsidiary of The Ravine of Willows, Inc.<br />
              The Adolphus Tower<br />
              1412 Main Street<br />
              STE 609<br />
              Dallas, TX 75202<br />
              United States
            </p>
          </section>

        </div>

        {/* Got questions card */}
        <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#EAF4FF] p-8 border border-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl">
              💌
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-[#1D1D1F]">
                Got a question about your data?
              </h3>
              <p className="mt-1 text-[13px] text-[#1D1D1F]/60">
                Reach out at <a href="mailto:privacy@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">privacy@couthacts.com</a>. A real person reads every email.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/terms" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Terms of Service</Link>
          <Link href="/cookies" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Cookie Policy</Link>
          <Link href="/acceptable-use" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Acceptable Use</Link>
        </div>
      </div>
    </div>
  );
}
