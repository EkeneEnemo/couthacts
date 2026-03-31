import { Navbar } from "@/components/navbar";
export const metadata = { title: "Cookie Policy — CouthActs™" };
export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900">Cookie Policy</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated: March 30, 2026</p>
        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>CouthActs&#8482; uses only essential cookies required for the platform to function. We do not use analytics cookies, advertising cookies, social media cookies, or any third-party tracking cookies.</p>
          <h2 className="text-lg font-display font-semibold text-ocean-800">The Cookie We Use</h2>
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-gray-200 text-left"><th className="py-2 pr-4 font-semibold">Name</th><th className="py-2 pr-4 font-semibold">Purpose</th><th className="py-2 font-semibold">Details</th></tr></thead>
            <tbody>
              <tr><td className="py-2 pr-4 font-mono text-xs">couthacts_session</td><td className="py-2 pr-4">Authentication</td><td className="py-2">HttpOnly, Secure, SameSite=Lax, 30-day expiry</td></tr>
            </tbody>
          </table>
          <p>This cookie is strictly necessary for the platform to function. It identifies your login session. It cannot be read by JavaScript (HttpOnly), is only sent over HTTPS (Secure), and is restricted to same-site requests (SameSite=Lax) to prevent cross-site attacks.</p>
          <p>We do not set any cookies for users who are not logged in. Visiting the landing page, public tracking page, or legal pages does not create any cookies.</p>
          <p>Contact: <a href="mailto:legal@couthacts.com" className="text-ocean-600">legal@couthacts.com</a></p>
        </div>
      </div>
    </div>
  );
}
