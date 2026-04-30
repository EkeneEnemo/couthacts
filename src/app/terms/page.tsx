import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = { title: "Terms of Service — CouthActs™" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -right-32 h-[24rem] w-[24rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">📄</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            The fine print, unhidden
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Terms of <span className="text-[#FF7A59]">service</span>.
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
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">1. Acceptance of Terms</h2>
            <p className="mt-3">These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and <strong className="text-[#1D1D1F]">CouthActs&#8482;, Inc.</strong>, a Texas corporation (&quot;CouthActs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), the operator of the CouthActs platform. CouthActs&#8482;, Inc. is a wholly owned subsidiary of <strong className="text-[#1D1D1F]">The Ravine of Willows, Inc.</strong>, also a Texas corporation. CouthActs&#8482;, Inc. has its principal place of business at The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202, United States. The CouthActs platform and all related intellectual property are wholly owned by Enemo Consulting Group, Inc.&reg;, and CouthActs&#8482;, Inc. operates under license from Enemo Consulting Group, Inc.&reg; By accessing or using the platform, you agree to these Terms in full. If you do not agree, you must not access or use the platform.</p>
            <p className="mt-3">We reserve the right to modify these Terms at any time. Material changes will be communicated via email or platform notification at least thirty (30) days before they take effect. Your continued use of the platform after such notice constitutes acceptance of the modified Terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">2. Platform Description</h2>
            <p className="mt-3">CouthActs is a technology platform that connects customers seeking transportation services with independent verified providers across eighteen (18) modes of transportation in 190+ countries. CouthActs is not a transportation carrier, freight broker, insurance company, lending institution, or logistics provider. CouthActs provides technology infrastructure, escrow services, identity verification coordination, and platform management services only.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">3. Eligibility and Registration</h2>
            <p className="mt-3">You must be at least eighteen (18) years of age. By registering, you represent that: (a) you are of legal age; (b) all information you provide is truthful, accurate, and complete; (c) the first and last name on your account matches exactly the name on your government-issued identification document; and (d) your use of the platform does not violate any applicable law or regulation. Each User may maintain only one (1) account.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">4. Identity Verification</h2>
            <p className="mt-3">All Users must complete identity verification through our enterprise-grade, government-certified third-party identity verification system before accessing core platform features. This system employs biometric matching, document authenticity analysis, and real-time database checks to ensure foolproof KYC and KYB verifications. Verification incurs a non-refundable fee of $20.00 USD per attempt. The fee is non-refundable regardless of outcome. Changing your name resets verification and requires re-verification ($20.00 again). CouthActs does not store government ID documents — all identity data is processed and secured by our verification partner under strict data protection agreements. Providers must additionally complete KYB (Know Your Business) verification with supporting business documentation.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">5. The Escrow Service</h2>
            <p className="mt-3">CouthActs holds customer funds in escrow pending job completion. Escrow fees are deducted from Provider payouts on a sliding scale: 8% under $500; 6% $500–$5,000; 4% $5,000–$50,000; 2% $50,000–$500,000; 1% above $500,000 (capped at $10,000). CouthActs escrow is not a banking product. Funds are not FDIC insured. CouthActs reserves the right to freeze escrow pending dispute resolution.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">6. Posting Fees</h2>
            <p className="mt-3">Posting fees are charged at posting and are non-refundable under all circumstances. Fees consist of a base fee by mode ($2–$50) plus 0.5% of budget, minimum $2.00. The full budget is held in the Customer&apos;s Wallet at posting. If no match within 14 days, the budget is refunded but the posting fee is not.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">7. CouthActs Protection</h2>
            <p className="mt-3">CouthActs Protection is a contractual platform guarantee offered by CouthActs&#8482;, Inc. It is not an insurance product and CouthActs&#8482;, Inc. is not acting as an insurance carrier, broker, or agent. Protection tiers: No Coverage ($0), Basic ($15, up to $500), Standard ($35, up to $2,500), Premium ($75, up to $10,000), Elite (1.5% of budget, min $150, full declared value). Elite is mandatory for hazmat, oversized, heavy haul, armored, medical, private jet, and yacht charter. Fees are non-refundable. CouthActs Protection does not replace commercial insurance.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">8. CouthActs Advance</h2>
            <p className="mt-3">CouthActs Advance is a receivables purchase program for eligible Elite Providers. CouthActs purchases 70% of a confirmed future escrow receivable at a 2.5% discount. This is not a loan or credit product. No interest is charged. Eligibility: Score 90+, 50+ jobs, no open disputes, active Stripe Connect. Repayment is automatic at escrow release. Providers who cancel after receiving an advance must repay immediately.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">9. CouthActs Academy</h2>
            <p className="mt-3">CouthActs Academy provides professional development courses. Certificates are CouthActs credentials issued by CouthActs&#8482;, Inc. — they do not constitute government-issued licenses or regulatory certifications. Course fees are non-refundable after content is accessed. Exam passing score is 70%. Retakes unlimited with 24-hour lockout after attempt 2.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">10. APIs</h2>
            <p className="mt-3">Provider API: BASIC 500 calls/mo, PROFESSIONAL 5,000 calls/mo, ENTERPRISE unlimited. Customer API: STARTER 1,000 calls/mo (hard limit), GROWTH 5,000 calls/mo ($0.20/call overage), ENTERPRISE unlimited. CouthActs does not guarantee API uptime but targets 99.9%. Webhook delivery is best-effort.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">11. The CouthActs Wallet</h2>
            <p className="mt-3">All top-ups are final and non-refundable. Min $5, max $50,000. Provider withdrawals: standard (free, 2-5 days) or instant (1.5% fee, 30 min). Min withdrawal $10. CouthActs is not a bank or money services business. Wallet balances are not FDIC insured.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">12. CouthActs Score</h2>
            <p className="mt-3">Proprietary 0-100 rating based on completion rate, on-time performance, reviews, response time, disputes, account age, and verification. Updated after every completed job. CouthActs reserves the right to modify the algorithm. Decisions on scores are final.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">13. Provider Obligations</h2>
            <p className="mt-3">Providers warrant: valid credentials and licenses; regulatory compliance; adequate insurance; professional service; accurate representation of capabilities; and compliance with all applicable laws for their operating mode and jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">14. Cancellation Policy</h2>
            <p className="mt-3">Customer cancellation before transit: full budget refund, posting and protection fees kept. Provider cancellation: full refund to customer, Score penalty. No refunds on posting fees, protection fees, or verification fees under any circumstances.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">15. Dispute Resolution</h2>
            <p className="mt-3">Escrow frozen immediately upon filing. CouthActs reviews evidence from both parties. Decisions are final. CouthActs is not liable for losses exceeding the escrow amount. Either party retains the right to pursue legal remedies.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">16. Prohibited Uses</h2>
            <p className="mt-3">Transportation of illegal goods; human trafficking; money laundering; circumventing verification; multiple accounts; manipulating scores or reviews; unauthorized scraping; off-platform payments to avoid escrow; harassment; false documentation; any violation of applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">17. Limitation of Liability</h2>
            <p className="mt-3">THE PLATFORM IS PROVIDED &quot;AS IS.&quot; COUTHACTS TOTAL LIABILITY SHALL NOT EXCEED FEES PAID IN THE 12 MONTHS PRECEDING THE CLAIM. COUTHACTS IS NOT LIABLE FOR LOST PROFITS, CONSEQUENTIAL, OR INDIRECT DAMAGES.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">18. Indemnification</h2>
            <p className="mt-3">Users agree to indemnify CouthActs&#8482;, Inc., The Ravine of Willows, Inc., Enemo Consulting Group, Inc.&reg;, and their respective parents, subsidiaries, affiliates, officers, directors, employees, and agents from any claims arising from platform use, violation of these Terms, or transport operations.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">19. Intellectual Property</h2>
            <p className="mt-3">All intellectual property associated with the CouthActs&#8482; service — including but not limited to source code, trademarks, service marks, logos, designs, documentation, algorithms, models, and proprietary methods — is wholly owned by Enemo Consulting Group, Inc.&reg; CouthActs&#8482;, Inc. operates under license from Enemo Consulting Group, Inc.&reg; Unauthorized reproduction, distribution, modification, or use is prohibited.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">20. Trademarks</h2>
            <p className="mt-3">CouthActs&#8482; is a trademark of Enemo Consulting Group, Inc.&reg; All other trademarks, service marks, and logos used in connection with the CouthActs service are owned by Enemo Consulting Group, Inc.&reg; and used by CouthActs&#8482;, Inc. under license.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">21. Governing Law</h2>
            <p className="mt-3">These Terms are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of laws principles. Any disputes shall be resolved in the state or federal courts located in Dallas County, Texas, or through binding arbitration at CouthActs&apos; election.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">22. Contact</h2>
            <p className="mt-3">Legal: legal@couthacts.com &middot; Support: support@couthacts.com</p>
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

        <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#EAF4FF] p-8 border border-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl">
              💬
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-[#1D1D1F]">
                Something unclear?
              </h3>
              <p className="mt-1 text-[13px] text-[#1D1D1F]/60">
                Legal&apos;s at <a href="mailto:legal@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">legal@couthacts.com</a>. Support&apos;s at <a href="mailto:support@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">support@couthacts.com</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/privacy" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Privacy Policy</Link>
          <Link href="/cookies" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Cookie Policy</Link>
          <Link href="/acceptable-use" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Acceptable Use</Link>
        </div>
      </div>
    </div>
  );
}
