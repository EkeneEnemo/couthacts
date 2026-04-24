import type { Metadata } from "next";
import { DirectoryPage } from "@/components/seo/directory-page";
import { COURIER_CORRIDORS } from "@/lib/seo/corridors";
import { getMode } from "@/lib/seo/modes";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Same-day courier & last-mile delivery — worldwide | CouthActs",
  description:
    "Verified couriers for same-day documents, parcels, and last-mile delivery. Live GPS, photo proof, PIN confirmation, and escrow-safe pricing on every drop.",
  alternates: { canonical: "https://www.couthacts.com/courier" },
  openGraph: {
    title: "Same-day courier & last-mile delivery | CouthActs",
    description:
      "Verified couriers, live GPS, photo proof of delivery, and escrow-safe pricing on every drop.",
    url: "https://www.couthacts.com/courier",
    type: "website",
  },
};

export default function CourierDirectoryPage() {
  return (
    <DirectoryPage
      mode={getMode("courier")!}
      vertical="courier"
      corridors={COURIER_CORRIDORS}
      title="Same-day. Hand-to-hand. From anywhere."
      subtitle="Courier & last-mile"
      intro="Forgotten charger across town? Contract that had to be there yesterday? Birthday cake that can't wait? Verified couriers pick up in 30 minutes and deliver before dinner."
    />
  );
}
