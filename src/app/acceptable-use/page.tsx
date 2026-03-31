import { Navbar } from "@/components/navbar";
export const metadata = { title: "Acceptable Use Policy — CouthActs™" };
export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900">Acceptable Use Policy</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: March 30, 2026</p>
        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>This Acceptable Use Policy governs your conduct on the CouthActs&#8482; platform. Violation of any of these terms may result in immediate account suspension or termination.</p>
          <h2 className="text-lg font-display font-semibold text-ocean-800">Prohibited Activities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Transporting illegal goods, controlled substances, sanctioned materials, or contraband</li>
            <li>Using the platform to launder money or finance terrorism</li>
            <li>Circumventing the escrow system by arranging off-platform payments</li>
            <li>Filing false or fraudulent disputes to extract refunds</li>
            <li>Creating fake accounts, fake reviews, or fake provider profiles</li>
            <li>Manipulating the CouthActs Score through coordinated behavior</li>
            <li>Harassing, threatening, or discriminating against other users</li>
            <li>Scraping, crawling, or using automated tools to access the platform without authorization</li>
            <li>Providing false identity documents or business credentials</li>
            <li>Operating without required licenses, permits, or insurance</li>
            <li>Accepting jobs you have no capacity or authorization to fulfill</li>
            <li>Sharing account credentials with unauthorized individuals</li>
          </ul>
          <h2 className="text-lg font-display font-semibold text-ocean-800">Consequences</h2>
          <p>Violations may result in: account suspension, permanent ban, escrow freeze, forfeiture of wallet balance, reporting to law enforcement, and legal action. The severity of the response is at the sole discretion of CouthActs&#8482; Incorporated.</p>
          <p>Contact: <a href="mailto:legal@couthacts.com" className="text-ocean-600">legal@couthacts.com</a></p>
        </div>
      </div>
    </div>
  );
}
