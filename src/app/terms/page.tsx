import { Navbar } from "@/components/navbar";

export const metadata = { title: "Terms of Service — CouthActs™" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">Terms of Service</h1>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-500">CouthActs, Inc.</p>
          <p className="text-sm text-gray-500">The Adolphus Tower, Dallas, Texas</p>
          <p className="text-sm text-gray-400">Effective Date: November 27, 2021 &middot; Last Updated: March 30, 2026</p>
        </div>

        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">1. Acceptance of Terms</h2>
            <p>These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and CouthActs, Inc. (&quot;CouthActs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), the operator of the CouthActs platform. The CouthActs platform and all related intellectual property are owned by Enemo Consulting Group, Inc. and licensed to CouthActs, Inc. By accessing or using the platform, you agree to these Terms in full. If you do not agree, you must not access or use the platform.</p>
            <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or platform notification at least thirty (30) days before they take effect. Your continued use of the platform after such notice constitutes acceptance of the modified Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">2. Platform Description</h2>
            <p>CouthActs is a technology platform that connects customers seeking transportation services with independent verified providers across eighteen (18) modes of transportation in 190+ countries. CouthActs is not a transportation carrier, freight broker, insurance company, lending institution, or logistics provider. CouthActs provides technology infrastructure, escrow services, identity verification coordination, and platform management services only.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">3. Eligibility and Registration</h2>
            <p>You must be at least eighteen (18) years of age. By registering, you represent that: (a) you are of legal age; (b) all information you provide is truthful, accurate, and complete; (c) the first and last name on your account matches exactly the name on your government-issued identification document; and (d) your use of the platform does not violate any applicable law or regulation. Each User may maintain only one (1) account.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">4. Identity Verification</h2>
            <p>All Users must complete identity verification via Persona before accessing core platform features. Verification incurs a non-refundable fee of $20.00 USD per attempt. The fee is non-refundable regardless of outcome. Changing your name resets verification and requires re-verification ($20.00 again). CouthActs does not store government ID documents. Providers must additionally complete KYB verification.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">5. The Escrow Service</h2>
            <p>CouthActs holds customer funds in escrow pending job completion. Escrow fees are deducted from Provider payouts on a sliding scale: 8% under $500; 6% $500–$5,000; 4% $5,000–$50,000; 2% $50,000–$500,000; 1% above $500,000 (capped at $10,000). CouthActs escrow is not a banking product. Funds are not FDIC insured. CouthActs reserves the right to freeze escrow pending dispute resolution.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">6. Posting Fees</h2>
            <p>Posting fees are charged at posting and are non-refundable under all circumstances. Fees consist of a base fee by mode ($2–$50) plus 0.5% of budget, minimum $2.00. The full budget is held in the Customer&apos;s Wallet at posting. If no match within 14 days, the budget is refunded but the posting fee is not.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">7. CouthActs Protection</h2>
            <p>CouthActs Protection is a contractual platform guarantee offered by CouthActs, Inc. It is not an insurance product and CouthActs is not acting as an insurance carrier, broker, or agent. Protection tiers: No Coverage ($0), Basic ($15, up to $500), Standard ($35, up to $2,500), Premium ($75, up to $10,000), Elite (1.5% of budget, min $150, full declared value). Elite is mandatory for hazmat, oversized, heavy haul, armored, medical, private jet, and yacht charter. Fees are non-refundable. CouthActs Protection does not replace commercial insurance.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">8. CouthActs Advance</h2>
            <p>CouthActs Advance is a receivables purchase program for eligible Elite Providers. CouthActs purchases 70% of a confirmed future escrow receivable at a 2.5% discount. This is not a loan or credit product. No interest is charged. Eligibility: Score 90+, 50+ jobs, no open disputes, active Stripe Connect. Repayment is automatic at escrow release. Providers who cancel after receiving an advance must repay immediately.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">9. CouthActs Academy</h2>
            <p>CouthActs Academy provides professional development courses. Certificates are CouthActs credentials issued by CouthActs, Inc. — they do not constitute government-issued licenses or regulatory certifications. Course fees are non-refundable after content is accessed. Exam passing score is 70%. Retakes unlimited with 24-hour lockout after attempt 2.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">10. APIs</h2>
            <p>Provider API: BASIC 500 calls/mo, PROFESSIONAL 5,000 calls/mo, ENTERPRISE unlimited. Customer API: STARTER 1,000 calls/mo (hard limit), GROWTH 5,000 calls/mo ($0.20/call overage), ENTERPRISE unlimited. CouthActs does not guarantee API uptime but targets 99.9%. Webhook delivery is best-effort.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">11. The CouthActs Wallet</h2>
            <p>All top-ups are final and non-refundable. Min $5, max $50,000. Provider withdrawals: standard (free, 2-5 days) or instant (1.5% fee, 30 min). Min withdrawal $10. CouthActs is not a bank or money services business. Wallet balances are not FDIC insured.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">12. CouthActs Score</h2>
            <p>Proprietary 0-100 rating based on completion rate, on-time performance, reviews, response time, disputes, account age, and verification. Updated after every completed job. CouthActs reserves the right to modify the algorithm. Decisions on scores are final.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">13. Provider Obligations</h2>
            <p>Providers warrant: valid credentials and licenses; regulatory compliance; adequate insurance; professional service; accurate representation of capabilities; and compliance with all applicable laws for their operating mode and jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">14. Cancellation Policy</h2>
            <p>Customer cancellation before transit: full budget refund, posting and protection fees kept. Provider cancellation: full refund to customer, Score penalty. No refunds on posting fees, protection fees, or verification fees under any circumstances.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">15. Dispute Resolution</h2>
            <p>Escrow frozen immediately upon filing. CouthActs reviews evidence from both parties. Decisions are final. CouthActs is not liable for losses exceeding the escrow amount. Either party retains the right to pursue legal remedies.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">16. Prohibited Uses</h2>
            <p>Transportation of illegal goods; human trafficking; money laundering; circumventing verification; multiple accounts; manipulating scores or reviews; unauthorized scraping; off-platform payments to avoid escrow; harassment; false documentation; any violation of applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">17. Limitation of Liability</h2>
            <p>THE PLATFORM IS PROVIDED &quot;AS IS.&quot; COUTHACTS TOTAL LIABILITY SHALL NOT EXCEED FEES PAID IN THE 12 MONTHS PRECEDING THE CLAIM. COUTHACTS IS NOT LIABLE FOR LOST PROFITS, CONSEQUENTIAL, OR INDIRECT DAMAGES.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">18. Indemnification</h2>
            <p>Users agree to indemnify CouthActs, Inc., Enemo Consulting Group, Inc., and their officers, directors, employees, and agents from any claims arising from platform use, violation of these Terms, or transport operations.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">19. Intellectual Property</h2>
            <p>All intellectual property is owned exclusively by Enemo Consulting Group, Inc. and licensed to CouthActs, Inc. Founded November 27, 2021. Unauthorized reproduction is prohibited.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">20. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of Texas. Disputes shall be resolved in the courts of Dallas County, Texas, or through binding arbitration at CouthActs&apos; election.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">21. Contact</h2>
            <p>Legal: legal@couthacts.com &middot; Support: support@couthacts.com<br /><strong>CouthActs, Inc.</strong> &middot; The Adolphus Tower, Dallas, Texas</p>
          </section>

        </div>
      </div>
    </div>
  );
}
