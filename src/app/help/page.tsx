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
  items: FAQItem[];
}

const sections: FAQSection[] = [
  {
    title: "For Customers",
    items: [
      {
        question: "How do I post a transportation job?",
        answer:
          "Sign up for a CouthActs account, verify your identity, top up your wallet, and click \"Post a job.\" You will select a transport mode, enter origin and destination details, describe your cargo, set a budget, and choose your preferred dates. Verified providers will then bid on your posting.",
      },
      {
        question: "How does the bidding process work?",
        answer:
          "Once your job is posted, verified providers can submit bids with their proposed price, estimated timeline, and a message. You can review each provider\u2019s ratings, verification status, and bid details before accepting. You are never obligated to accept any bid.",
      },
      {
        question: "Can I track my shipment in real time?",
        answer:
          "Yes. CouthActs supports real-time tracking across all 18 transport modes. Depending on the mode, tracking data comes from GPS, AIS (maritime), flight transponders, ELD telemetry, IoT sensors, or satellite positioning. You will see live updates on a map within your booking details.",
      },
      {
        question: "What if I need to cancel a booking?",
        answer:
          "Cancellation policies depend on the stage of the booking. Before a provider begins the job, you can cancel with a full refund of escrowed funds. Once work has started, partial refunds may apply. Check the booking details page for the specific cancellation terms.",
      },
    ],
  },
  {
    title: "For Providers",
    items: [
      {
        question: "How do I become a verified provider?",
        answer:
          "Create a provider account, submit your government-issued ID for verification ($20 non-refundable fee), provide your business registration details, regulatory credentials (DOT, MC, FMCSA, IMO, FAA as applicable), and insurance documentation. Our team reviews submissions and grants verification upon approval.",
      },
      {
        question: "How do I find jobs to bid on?",
        answer:
          "Once verified, go to \"Browse Jobs\" to see available postings filtered by transport mode, origin, destination, and budget range. You can also set up the Instant Jobs feature to receive real-time notifications when new jobs match your service areas and modes.",
      },
      {
        question: "When do I get paid?",
        answer:
          "Payment is held in escrow when the customer accepts your bid. Once you complete the job and the customer confirms delivery (or the confirmation window expires without dispute), funds are released to your wallet. You can then withdraw to your connected Stripe account.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "How does the escrow system work?",
        answer:
          "When a customer accepts a bid, the agreed amount is moved from their wallet into escrow. The funds are held securely until the job is completed and confirmed. This protects customers from paying for undelivered services and protects providers by guaranteeing payment upon completion.",
      },
      {
        question: "What currencies are supported?",
        answer:
          "CouthActs wallets are denominated in USD. However, you can view your balance in your preferred local currency, and we support top-ups and withdrawals through Stripe in multiple currencies. Exchange rates are displayed at the time of conversion.",
      },
      {
        question: "Are there any platform fees?",
        answer:
          "CouthActs charges a transparent platform fee on completed transactions. The fee percentage is displayed before you accept a bid or post a job. There are no hidden charges, subscription fees, or monthly minimums.",
      },
      {
        question: "How do refunds work?",
        answer:
          "If a job is cancelled before work begins, escrowed funds are returned to the customer\u2019s wallet in full. For disputes after work has started, our resolution team reviews evidence from both parties and determines a fair outcome, which may include full or partial refunds.",
      },
    ],
  },
  {
    title: "Safety",
    items: [
      {
        question: "How are providers verified?",
        answer:
          "Every provider undergoes identity verification, business registration checks, regulatory credential validation, and insurance documentation review. Only providers who pass all checks can bid on jobs and receive payments through CouthActs.",
      },
      {
        question: "What is the SOS feature?",
        answer:
          "The SOS feature allows customers and providers to flag an emergency during an active booking. When triggered, the CouthActs safety team is immediately notified and can coordinate with local authorities if needed. The feature is accessible from any active booking page.",
      },
      {
        question: "What insurance protections are available?",
        answer:
          "CouthActs offers tiered protection coverage depending on the transport mode and cargo value. Basic coverage is included with every booking. Enhanced and premium tiers are available for high-value or specialized shipments. Details are displayed during the posting and bidding process.",
      },
      {
        question: "How do I report a safety concern?",
        answer:
          "Contact our safety team directly at safety@couthacts.com or use the \"Report\" button on any booking, provider profile, or review. All reports are investigated by our dedicated safety and trust team.",
      },
    ],
  },
];

function FAQAccordion({ section }: { section: FAQSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-[#1D1D1F]">{section.title}</h2>
      <div className="mt-4 space-y-2">
        {section.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[13px] font-medium text-[#1D1D1F] pr-4">
                  {item.question}
                </span>
                <span className="shrink-0 text-[#86868B] text-lg leading-none">
                  {isOpen ? "\u2212" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-4">
                  <p className="text-[13px] text-[#6E6E73] leading-relaxed">{item.answer}</p>
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
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-[#1D1D1F] sm:text-4xl">
          Help Center
        </h1>
        <p className="mt-3 text-[14px] text-[#6E6E73]">
          Find answers to common questions about using the CouthActs platform.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <FAQAccordion key={section.title} section={section} />
          ))}
        </div>

        {/* Contact support */}
        <section className="mt-12 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 text-center">
          <h2 className="text-xl font-display font-bold text-[#1D1D1F]">
            Still need help?
          </h2>
          <p className="mt-2 text-[13px] text-[#6E6E73]">
            Our support team is available to assist you with any questions or issues.
          </p>
          <a
            href="mailto:support@couthacts.com"
            className="mt-4 inline-block rounded-full bg-[#007AFF] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0055D4] transition"
          >
            support@couthacts.com
          </a>
        </section>

        <div className="mt-16 flex flex-wrap gap-4 text-[13px] text-[#007AFF]">
          <Link href="/terms" className="hover:text-[#0055D4]">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#0055D4]">Privacy Policy</Link>
          <Link href="/safety" className="hover:text-[#0055D4]">Safety Center</Link>
          <Link href="/about" className="hover:text-[#0055D4]">About</Link>
        </div>
      </div>
    </div>
  );
}
