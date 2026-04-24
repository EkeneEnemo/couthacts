import type { Metadata } from "next";
import { DirectoryPage } from "@/components/seo/directory-page";
import { MOVING_CORRIDORS } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Moving services worldwide — 190+ countries, verified movers | CouthActs",
  description:
    "Book verified movers for local, long-distance, and international relocations. Transparent bidding, escrow-safe payments, and live tracking from pickup to last box.",
  alternates: { canonical: "https://www.couthacts.com/move" },
  openGraph: {
    title: "Moving services worldwide | CouthActs",
    description:
      "Book verified movers for local, long-distance, and international relocations. Escrow-safe payments, live tracking, and real-human support.",
    url: "https://www.couthacts.com/move",
    type: "website",
  },
};

export default function MoveDirectoryPage() {
  return (
    <DirectoryPage
      mode={getMode("moving")!}
      vertical="move"
      corridors={MOVING_CORRIDORS}
      title="Movers, from one zip code to one continent away."
      subtitle="Residential & commercial moves"
      intro="Verified movers for studios, family homes, offices, and international relocations. Flat quotes, insurance that scales with your stuff, and payments held safely until your last box is set down."
    />
  );
}
