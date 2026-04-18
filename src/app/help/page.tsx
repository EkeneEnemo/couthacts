"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  emoji: string;
  color: string;
  bg: string;
  items: FAQItem[];
}

const sections: FAQSection[] = [
  {
    title: "For customers",
    emoji: "🛍️",
    color: "#007AFF",
    bg: "#E8F1FF",
    items: [
      {
        question: "How do I post a transportation job?",
        answer:
          "Sign up, verify your identity, top up your wallet, and click \u201CPost a job.\u201D Pick a transport mode, enter origin and destination, describe your cargo, set a budget, and choose your dates. Verified providers will bid.",
      },
      {
        question: "How does the bidding process work?",
        answer:
          "Once your job is posted, verified providers submit bids with a price, timeline, and message. You can review each provider's ratings, verification status, and bid details before accepting. You're never obligated to accept any bid.",
      },
      {
        question: "Can I track my shipment in real time?",
        answer:
          "Yes. Real-time tracking works across all 18 modes. Depending on the mode, data comes from GPS, AIS (maritime), flight transponders, ELD telemetry, IoT sensors, or satellite positioning. You'll see live updates on a map in your booking details.",
      },
      {
        question: "What if I need to cancel a booking?",
        answer:
          "Cancellation depends on the stage. Before the provider begins: full refund of escrowed funds. Once work has started: partial refunds may apply. Check the booking page for specifics.",
      },
    ],
  },
  {
    title: "For providers",
    emoji: "🚚",
    color: "#FF7A59",
    bg: "#FFF1E8",
    items: [
      {
        question: "How do I become a verified provider?",
        answer:
          "Create a provider account, submit your government ID ($20 non-refundable verification fee), provide business registration and regulatory credentials (DOT, MC, FMCSA, IMO, FAA as applicable), and insurance docs. Our team reviews and grants verification upon approval.",
      },
      {
        question: "How do I find jobs to bid on?",
        answer:
          "Once verified, go to \u201CBrowse Jobs\u201D to see available postings filtered by mode, origin, destination, and budget. You can also set up Instant Jobs for real-time notifications when new jobs match your areas and modes.",
      },
      {
        question: "When do I get paid?",
        answer:
          "Payment goes into escrow when the customer accepts your bid. Complete the job, customer confirms (or window expires without dispute), and funds release to your wallet. Withdraw to your connected Stripe account.",
      },
    ],
  },
  {
    title: "Payments",
    emoji: "💳",
    color: "#34C759",
    bg: "#E8F7EC",
    items: [
      {
        question: "How does the escrow system work?",
        answer:
          "When a customer accepts a bid, the agreed amount moves from their wallet into escrow. Funds are held securely until the job is completed and confirmed. Customers don't pay for undelivered services; providers are guaranteed payment on completion.",
      },
      {
        question: "What currencies are supported?",
        answer:
          "Wallets are denominated in USD. You can view your balance in your preferred local currency, and we support top-ups and withdrawals through Stripe in multiple currencies. Exchange rates shown at conversion time.",
      },
      {
        question: "Are there any platform fees?",
        answer:
          "We charge a transparent platform fee on completed transactions. The fee percentage is displayed before you accept a bid or post a job. No hidden charges, no subscriptions, no monthly minimums.",
      },
      {
        question: "How do refunds work?",
        answer:
          "If a job is cancelled before work begins, escrowed funds return to the customer's wallet in full. For disputes after work has started, our resolution team reviews evidence from both sides and determines a fair outcome &mdash; which may include full or partial refunds.",
      },
    ],
  },
  {
    title: "Safety",
    emoji: "🛡️",
    color: "#FF6B9D",
    bg: "#FFE8F0",
    items: [
      {
        question: "How are providers verified?",
        answer:
          "Every provider passes identity verification, business registration checks, regulatory credential validation, and insurance documentation review. Only providers who pass can bid on jobs and receive payments.",
      },
      {
        question: "What is the SOS feature?",
        answer:
          "SOS lets either party flag an emergency during an active booking. When triggered, our safety team is notified immediately and can coordinate with local authorities if needed. Accessible from any active booking page.",
      },
      {
        question: "What insurance protections are available?",
        answer:
          "CouthActs offers tiered protection based on mode and cargo value. Basic is included with every booking. Enhanced and Premium are available for high-value or specialized shipments. Details show during posting and bidding.",
      },
      {
        question: "How do I report a safety concern?",
        answer:
          "Email our safety team at safety@couthacts.com or use the \u201CReport\u201D button on any booking, profile, or review. All reports go to our dedicated safety and trust team.",
      },
    ],
  },
];

function FAQAccordion({ section }: { section: FAQSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
          style={{ backgroundColor: section.bg }}
        >
          {section.emoji}
        </span>
        <h2 className="text-2xl font-display font-bold text-[#1D1D1F]">{section.title}</h2>
      </div>
      <div className="mt-5 space-y-2">
        {section.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-[1.5rem] bg-white border overflow-hidden transition-all ${
                isOpen
                  ? "shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                  : "shadow-[0_2px_14px_rgba(0,0,0,0.03)]"
              }`}
              style={{ borderColor: isOpen ? `${section.color}30` : "rgba(29,29,31,0.05)" }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#FFFBF5]"
              >
                <span className="text-[14px] font-semibold text-[#1D1D1F] pr-4">
                  {item.question}
                </span>
                <span
                  className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-[18px] font-semibold leading-none transition-all"
                  style={{
                    backgroundColor: isOpen ? section.color : section.bg,
                    color: isOpen ? "white" : section.color,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                  }}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-0">
                  <p
                    className="text-[14px] text-[#1D1D1F]/65 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#FFD8B5]/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">💬</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            Help, from friendly humans
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Got a <span className="text-[#FF7A59]">question?</span>
        </h1>
        <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed">
          Quick answers to the things people ask most. Can&rsquo;t find it? Ping us &mdash;
          real person, every time.
        </p>

        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <FAQAccordion key={section.title} section={section} />
          ))}
        </div>

        <section className="mt-16 rounded-[2.5rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#EAF4FF] p-10 border border-white shadow-sm text-center">
          <span className="text-5xl">👋</span>
          <h2 className="mt-4 text-3xl font-display font-bold text-[#1D1D1F]">
            Still stuck?
          </h2>
          <p className="mt-3 text-[14px] text-[#1D1D1F]/60">
            Our support team is here to help. A real person will reply.
          </p>
          <a
            href="mailto:support@couthacts.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-[#FF7A59] hover:scale-[1.03] transition-all"
          >
            support@couthacts.com
          </a>
        </section>

        <div className="mt-12 flex flex-wrap gap-2">
          <Link href="/terms" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Terms</Link>
          <Link href="/privacy" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Privacy</Link>
          <Link href="/safety" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Safety</Link>
          <Link href="/about" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">About</Link>
        </div>
      </div>
    </div>
  );
}
