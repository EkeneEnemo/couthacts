import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorridorPage } from "@/components/seo/corridor-page";
import { getCorridor, listCorridors, ballparkUsd } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const dynamicParams = false;
export const revalidate = 86400; // 24h

export function generateStaticParams() {
  return listCorridors("move").map((c) => ({ corridor: c.slug }));
}

export function generateMetadata({ params }: { params: { corridor: string } }): Metadata {
  const c = getCorridor("move", params.corridor);
  if (!c) return { title: "Route not found — CouthActs" };
  const { from } = ballparkUsd(c);
  const title = `Movers from ${c.origin.name} to ${c.destination.name} — from $${from.toLocaleString()} | CouthActs`;
  const description = `Book verified movers from ${c.origin.name} to ${c.destination.name}. ${c.distanceMi.toLocaleString()} miles. Escrow-safe payments, live tracking, real-human support. From $${from.toLocaleString()}.`;
  const url = `https://www.couthacts.com/move/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function MoveCorridorPage({ params }: { params: { corridor: string } }) {
  const corridor = getCorridor("move", params.corridor);
  if (!corridor) notFound();
  const mode = getMode("moving")!;

  const inclusions = [
    { emoji: "🧑‍🔧", title: "Verified movers", desc: "Every crew is background-checked and rated by real customers." },
    { emoji: "📦", title: "Packing & unpacking", desc: "Optional full-service packing, crating, and set-up at the other end." },
    { emoji: "🛡️", title: "Full-value insurance", desc: "Coverage scales with declared value — not pennies on the pound." },
    { emoji: "📍", title: "Live tracking", desc: "Watch the truck on a live map with photo check-ins at pickup & drop." },
  ];

  const lo = Math.max(1, Math.ceil(corridor.distanceMi / 500));
  const hi = Math.max(lo + 1, Math.ceil(corridor.distanceMi / 300));
  const faqs = [
    {
      q: `How long does a move from ${corridor.origin.name} to ${corridor.destination.name} take?`,
      a: `${corridor.distanceMi.toLocaleString()} miles typically runs ${lo}–${hi} days with a professional crew, depending on load size and weather. Expedited (same-truck, direct) options are available on most routes.`,
    },
    {
      q: "Is my stuff insured?",
      a: "Yes. Every move includes basic liability coverage; full-value protection is available at checkout and scales with your declared value — no arbitrary per-pound limits.",
    },
    {
      q: "Do I pay before the move?",
      a: "You pay into escrow when you book — but the mover only gets paid after you confirm your last box has arrived in good condition. If something's off, funds stay frozen until it's sorted.",
    },
    {
      q: "Can I get a flat quote?",
      a: "Yes. Providers bid fixed, all-in quotes based on your inventory list, home size, and timing. No sudden surcharges on move day.",
    },
    {
      q: "What if my dates change?",
      a: "Reschedule free of charge up to 48 hours before pickup. Within 48 hours, a small rebooking fee may apply depending on the provider's policy.",
    },
  ];

  return (
    <CorridorPage
      corridor={corridor}
      mode={mode}
      vertical="move"
      heroLabel="Movers from"
      pricingLabel="Typical full-service range"
      inclusions={inclusions}
      faqs={faqs}
    />
  );
}
