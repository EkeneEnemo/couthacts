import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "You're offline — CouthActs",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-6">
      <main id="main" className="text-center max-w-lg">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/80 backdrop-blur border border-white shadow-sm text-[#FF7A59] mb-6">
          <WifiOff className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl">
          No signal, no problem.
        </h1>
        <p className="mt-6 text-[15px] text-[#1D1D1F]/60 leading-relaxed">
          You&rsquo;re offline. Some of your cached pages (tracking, recent bookings) still work.
          Try again when you&rsquo;re back online — your actions will sync automatically.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/track"
            className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-[#007AFF] transition-colors"
          >
            Check cached tracking
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white px-6 py-3 text-[14px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          >
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
