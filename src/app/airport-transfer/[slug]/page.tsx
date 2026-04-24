import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AirportPage } from "@/components/seo/airport-page";
import { getAirportCorridor, listAirportCorridors, ballparkAirportUsd } from "@/lib/seo/corridors";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return listAirportCorridors().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getAirportCorridor(params.slug);
  if (!c) return { title: "Airport transfer not found — CouthActs" };
  const { from, to } = ballparkAirportUsd(25);
  const headline =
    c.direction === "to"
      ? `${c.city.name} to ${c.iata} airport transfer`
      : `${c.iata} to ${c.city.name} airport transfer`;
  const title = `${headline} — from $${from} | CouthActs`;
  const description = `Licensed, flight-tracked airport transfer ${c.direction} ${c.iata} and ${c.city.name}. Fixed prices, meet-and-greet, verified drivers. From $${from}–$${to}.`;
  const url = `https://www.couthacts.com/airport-transfer/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function AirportTransferPage({ params }: { params: { slug: string } }) {
  const corridor = getAirportCorridor(params.slug);
  if (!corridor) notFound();
  return <AirportPage corridor={corridor} />;
}
