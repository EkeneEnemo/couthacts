import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { DataControls } from "./data-controls";

export const metadata: Metadata = {
  title: "Your data — privacy controls | CouthActs",
  description:
    "Export a complete copy of your CouthActs account data, or permanently delete your account in line with GDPR and global privacy law.",
  robots: { index: false, follow: false },
};

export default async function DataControlsPage() {
  await requireAuth();
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 h-[24rem] w-[24rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-[12px] text-[#1D1D1F]/55">
              <li>
                <a href="/settings" className="hover:text-[#007AFF]">
                  Settings
                </a>
              </li>
              <li aria-hidden>/</li>
              <li className="text-[#1D1D1F]/80 font-medium">Your data</li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
            <span className="text-base leading-none">🔐</span>
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
              Privacy controls
            </span>
          </div>

          <h1 className="mt-6 font-display font-black leading-tight tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl">
            Your data,
            <br />
            <span className="bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
              your call.
            </span>
          </h1>

          <p className="mt-4 text-[15px] text-[#1D1D1F]/60 leading-relaxed max-w-xl">
            Download everything we have on file, or permanently delete your account. Both are
            yours, on demand, as required by global privacy law (GDPR Art. 15, 17, 20; CCPA §1798).
          </p>

          <DataControls />

          <aside className="mt-12 rounded-[1.5rem] bg-white/70 backdrop-blur border border-white p-6 shadow-sm">
            <h2 className="text-[15px] font-display font-bold text-[#1D1D1F]">What we keep, and why</h2>
            <ul className="mt-3 space-y-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">
              <li>
                <span className="font-semibold text-[#1D1D1F]/80">Financial records:</span>{" "}
                escrow transactions, payouts, and advances must be retained for tax/regulatory
                compliance (typically 7 years). After deletion, these rows remain in the ledger
                with your personal details stripped.
              </li>
              <li>
                <span className="font-semibold text-[#1D1D1F]/80">Dispute resolutions:</span>{" "}
                closed disputes are retained in anonymized form so our score and trust systems
                can learn without identifying you.
              </li>
              <li>
                <span className="font-semibold text-[#1D1D1F]/80">Active obligations:</span>{" "}
                if you have in-flight bookings, unsettled escrow, or open disputes, you&rsquo;ll
                need to resolve them before we can delete the account.
              </li>
            </ul>
            <p className="mt-4 text-[12px] text-[#1D1D1F]/50">
              Privacy questions? Email{" "}
              <a href="mailto:privacy@couthacts.com" className="font-semibold text-[#007AFF] hover:text-[#0055D4]">
                privacy@couthacts.com
              </a>
              .
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
