import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorridorPage } from "@/components/seo/corridor-page";
import { getCorridor, listCorridors, ballparkUsd } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return listCorridors("courier").map((c) => ({ corridor: c.slug }));
}

export function generateMetadata({ params }: { params: { corridor: string } }): Metadata {
  const c = getCorridor("courier", params.corridor);
  if (!c) return { title: "Route not found — CouthActs" };
  const { from } = ballparkUsd(c);
  const title = `Courier & same-day delivery ${c.origin.name} to ${c.destination.name} — from $${from} | CouthActs`;
  const description = `Same-day courier from ${c.origin.name} to ${c.destination.name}. ${c.distanceMi.toLocaleString()} miles. Verified riders, live GPS, photo proof of delivery, escrow-safe pricing. From $${from}.`;
  const url = `https://www.couthacts.com/courier/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CourierCorridorPage({ params }: { params: { corridor: string } }) {
  const corridor = getCorridor("courier", params.corridor);
  if (!corridor) notFound();
  const mode = getMode("courier")!;

  const inclusions = [
    { emoji: "🏎️", title: "Same-day delivery", desc: "Most jobs picked up within 60 minutes and delivered the same day." },
    { emoji: "📸", title: "Photo proof", desc: "Timestamped, geotagged drop-off photos delivered straight to your phone." },
    { emoji: "🔐", title: "PIN confirmation", desc: "4-digit PIN at drop for documents, valuables, and sensitive parcels." },
    { emoji: "📍", title: "Live GPS", desc: "Watch your rider on a live map — share the tracking link with anyone." },
  ];

  const faqs = [
    {
      q: `How fast is same-day between ${corridor.origin.name} and ${corridor.destination.name}?`,
      a: `${corridor.distanceMi.toLocaleString()} miles by road. Typical pickup within 30–60 minutes; delivered by end-of-day, often sooner. Express (direct, no stops) is available on most lanes for a premium.`,
    },
    {
      q: "Is there a size limit?",
      a: "Standard couriers handle up to roughly the size of a large suitcase (about 50 lbs / 22 kg). Bigger? Choose \"Moving\" or \"Freight\" instead and you'll get a van or truck.",
    },
    {
      q: "Can I send documents or valuables?",
      a: "Yes. Turn on PIN confirmation at drop and the rider can only hand over after the recipient enters your 4-digit code. Signed proof is archived on your dashboard.",
    },
    {
      q: "What about cold items or perishables?",
      a: "Flag \"temperature sensitive\" when you post. Only insulated-bag couriers will bid. For pharmacy or medical cold-chain, use the Medical Transport mode instead.",
    },
    {
      q: "How is the fee calculated?",
      a: "Riders bid individually based on distance, urgency, and vehicle (bike, car, van). You pick the quote you like. Our 3.5% platform fee is already included in every quote you see.",
    },
  ];

  return (
    <CorridorPage
      corridor={corridor}
      mode={mode}
      vertical="courier"
      heroLabel="Same-day courier from"
      pricingLabel="Typical same-day range"
      inclusions={inclusions}
      faqs={faqs}
    />
  );
}
