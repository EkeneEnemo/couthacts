"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { cat: "Customers", items: [
    { q: "How do I post a transportation need?", a: "Go to Dashboard → Post a Job. Select your transport mode, enter route details, budget, and insurance preference. Your posting fee and budget will be held from your CouthActs Wallet." },
    { q: "How is my payment protected?", a: "Your budget is held in escrow from the moment you post. The provider is paid only when both you and the provider confirm the job is complete." },
    { q: "What if the provider doesn't deliver?", a: "File a dispute from the booking page. Escrow funds freeze immediately. Our team reviews within 24 hours." },
    { q: "Can I track my job in real-time?", a: "Yes. Every booking has a tracking code. Visit /track/[code] — no login required — for live GPS, checkpoint timeline, and status updates." },
  ]},
  { cat: "Providers", items: [
    { q: "How do I start receiving jobs?", a: "Register as a provider, complete identity verification ($20), set up your profile with modes and service areas, and start browsing open jobs or go online for Instant Jobs." },
    { q: "When do I get paid?", a: "After both parties confirm job completion, escrow releases to your CouthActs Wallet minus the platform fee. You can withdraw to your bank via Stripe Connect." },
    { q: "What is the CouthActs Score?", a: "A 0-100 trust rating based on completion rate, on-time delivery, reviews, response time, disputes, account age, and verification status. Higher scores win more bids." },
  ]},
  { cat: "Payments", items: [
    { q: "What are the platform fees?", a: "Posting fee: $2-$50 by mode + 0.5% of budget. Escrow fee: sliding scale from 8% (under $500) to 1% (above $500K, capped at $10K). Identity verification: $20 per attempt." },
    { q: "Are top-ups refundable?", a: "No. All wallet top-ups are final and non-refundable." },
    { q: "How do withdrawals work?", a: "Providers can withdraw wallet balance to their bank via Stripe Connect. Standard (free, 2-5 days) or instant (1.5% fee, 30 minutes)." },
  ]},
  { cat: "Safety", items: [
    { q: "What is the SOS feature?", a: "For passenger modes (taxi, limo, medical, armored), there's an SOS button during active rides. It alerts our safety team with your GPS location immediately." },
    { q: "How are providers verified?", a: "Every provider completes Persona government ID verification. Business providers also submit insurance and license documentation for manual review." },
  ]},
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left border-b border-gray-100 py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ocean-800 pr-4">{q}</p>
        <ChevronDown className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>}
    </button>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900">Help Center</h1>
        <p className="mt-2 text-sm text-gray-500">Find answers to common questions. For direct support: <a href="mailto:support@couthacts.com" className="text-ocean-600 font-medium">support@couthacts.com</a></p>
        <div className="mt-10 space-y-8">
          {FAQS.map((section) => (
            <div key={section.cat}>
              <h2 className="text-lg font-display font-semibold text-ocean-800 mb-2">{section.cat}</h2>
              <div className="rounded-xl bg-white shadow-sm border border-gray-100 px-5">
                {section.items.map((faq) => <FAQ key={faq.q} {...faq} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
