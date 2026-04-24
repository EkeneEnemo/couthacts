import type { Metadata } from "next";
import { DirectoryPage } from "@/components/seo/directory-page";
import { FREIGHT_CORRIDORS } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Freight trucking marketplace — FTL, LTL, reefer | CouthActs",
  description:
    "Thousands of DOT-verified carriers bidding on your loads. FTL, LTL, reefer, and intermodal across 190+ countries. ELD tracking, escrow-safe, and cargo insurance built in.",
  alternates: { canonical: "https://www.couthacts.com/freight" },
  openGraph: {
    title: "Freight trucking marketplace | CouthActs",
    description:
      "DOT-verified carriers bidding on your loads. ELD tracking, escrow-safe payments, and cargo insurance built in.",
    url: "https://www.couthacts.com/freight",
    type: "website",
  },
};

export default function FreightDirectoryPage() {
  return (
    <DirectoryPage
      mode={getMode("freight")!}
      vertical="freight"
      corridors={FREIGHT_CORRIDORS}
      title="Freight trucking that actually moves."
      subtitle="FTL · LTL · reefer · intermodal"
      intro="Post a load. DOT-verified carriers bid within the hour. Pay into escrow, track on ELD, release on POD — and never chase a check again."
    />
  );
}
