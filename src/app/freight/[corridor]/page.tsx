import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorridorPage } from "@/components/seo/corridor-page";
import { getCorridor, listCorridors, ballparkUsd } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return listCorridors("freight").map((c) => ({ corridor: c.slug }));
}

export function generateMetadata({ params }: { params: { corridor: string } }): Metadata {
  const c = getCorridor("freight", params.corridor);
  if (!c) return { title: "Route not found — CouthActs" };
  const { from } = ballparkUsd(c);
  const title = `Freight shipping ${c.origin.name} to ${c.destination.name} — from $${from.toLocaleString()} | CouthActs`;
  const description = `Book verified freight carriers from ${c.origin.name} to ${c.destination.name}. ${c.distanceMi.toLocaleString()} miles. FTL, LTL, reefer. Escrow-safe, ELD tracking, DOT-verified carriers.`;
  const url = `https://www.couthacts.com/freight/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function FreightCorridorPage({ params }: { params: { corridor: string } }) {
  const corridor = getCorridor("freight", params.corridor);
  if (!corridor) notFound();
  const mode = getMode("freight")!;

  const inclusions = [
    { emoji: "📋", title: "DOT/MC-verified", desc: "Only active-authority carriers with current insurance on file." },
    { emoji: "📡", title: "ELD tracking", desc: "Live truck telematics — no more \"where's my load?\" phone chasing." },
    { emoji: "📝", title: "Bill of lading", desc: "Digital BOL, signed PODs, and exportable audit trail on every load." },
    { emoji: "💼", title: "Cargo insurance", desc: "Per-load coverage up to your declared value, not a flat blanket cap." },
  ];

  const days = Math.max(1, Math.round(corridor.distanceMi / 550));
  const faqs = [
    {
      q: `What's transit time from ${corridor.origin.name} to ${corridor.destination.name}?`,
      a: `${corridor.distanceMi.toLocaleString()} miles is typically ${days}–${days + 2} days for dry van FTL. Team drivers and expedited service can cut that roughly in half on most lanes.`,
    },
    {
      q: "Can I ship LTL (less-than-truckload)?",
      a: "Yes. Post your load and flag it as LTL — carriers specializing in consolidation will bid with class-based pricing based on weight, dimensions, and freight class.",
    },
    {
      q: "Do you handle reefer / temperature-controlled?",
      a: "Yes. Toggle \"temperature controlled\" on your posting, set your range, and only carriers with active reefer equipment and cold-chain certifications will be allowed to bid.",
    },
    {
      q: "When does the carrier get paid?",
      a: "Funds are held in escrow when you book. Release happens on proof of delivery (signed POD, photo, or geofence confirmation) — or on dispute resolution if there's a claim.",
    },
    {
      q: "What about hazmat or oversized?",
      a: "Those are separate specialty modes (Hazmat, Heavy Haul, Oversized Cargo). Carriers in those lanes carry extra endorsements, permits, and insurance. Post accordingly.",
    },
  ];

  return (
    <CorridorPage
      corridor={corridor}
      mode={mode}
      vertical="freight"
      heroLabel="Freight from"
      pricingLabel="Typical FTL spot range"
      inclusions={inclusions}
      faqs={faqs}
    />
  );
}
