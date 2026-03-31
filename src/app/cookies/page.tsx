import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Cookie Policy — CouthActs\u2122",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Last updated: March 30, 2026 &middot; Effective immediately
        </p>

        <div className="mt-10 prose prose-sm prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              1. Our Approach to Cookies
            </h2>
            <p>
              CouthActs&#8482; believes in minimal data collection. Unlike most platforms,
              we do not use analytics cookies, advertising cookies, tracking pixels,
              fingerprinting scripts, or any form of third-party tracking technology.
              We use a single, essential session cookie to keep you securely signed in.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              2. The Cookie We Use
            </h2>
            <p>
              CouthActs sets exactly one cookie on your browser:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-ocean-50 text-ocean-800">
                    <th className="px-4 py-2 text-left font-semibold">Property</th>
                    <th className="px-4 py-2 text-left font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2 font-medium">Name</td>
                    <td className="px-4 py-2"><code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">couthacts_session</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Purpose</td>
                    <td className="px-4 py-2">Authentication &mdash; keeps you signed in to your account</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Type</td>
                    <td className="px-4 py-2">Essential (strictly necessary)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">HttpOnly</td>
                    <td className="px-4 py-2">Yes &mdash; not accessible via JavaScript</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Secure</td>
                    <td className="px-4 py-2">Yes &mdash; only transmitted over HTTPS</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">SameSite</td>
                    <td className="px-4 py-2">Lax &mdash; prevents cross-site request forgery</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Expiry</td>
                    <td className="px-4 py-2">30 days from last sign-in</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Domain</td>
                    <td className="px-4 py-2">couthacts.com (first-party only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              3. Cookies We Do NOT Use
            </h2>
            <p>CouthActs does not set or allow any of the following:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Analytics cookies</strong> &mdash; we do not use Google Analytics, Mixpanel, Amplitude, or any analytics tracking service.</li>
              <li><strong>Advertising cookies</strong> &mdash; we do not serve ads or use retargeting pixels from any advertising network.</li>
              <li><strong>Third-party tracking cookies</strong> &mdash; we do not embed social media trackers, cross-site tracking scripts, or fingerprinting libraries.</li>
              <li><strong>Performance or preference cookies</strong> &mdash; your preferences (currency, language) are stored in your account settings, not in cookies.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              4. Why We Only Need One Cookie
            </h2>
            <p>
              Our session cookie is the only cookie required for the CouthActs platform
              to function. It authenticates your requests to our servers and maintains
              your signed-in state. All other user preferences, settings, and data are
              stored server-side in your account profile. There is no functional reason
              to place additional cookies on your device, so we do not.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              5. Managing Cookies
            </h2>
            <p>
              Because we only use one essential cookie, there is no cookie consent banner
              to manage. If you wish to delete the <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">couthacts_session</code> cookie,
              you can do so through your browser settings. Note that deleting this cookie
              will sign you out of your CouthActs account and you will need to sign in
              again on your next visit.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              6. Changes to This Policy
            </h2>
            <p>
              If we ever need to introduce additional cookies (which we do not anticipate),
              we will update this page, notify registered users via email, and provide
              appropriate consent mechanisms as required by applicable law.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-ocean-800">
              7. Contact
            </h2>
            <p>
              For questions about this Cookie Policy, contact us at{" "}
              <a
                href="mailto:legal@couthacts.com"
                className="text-ocean-600 underline hover:text-ocean-700"
              >
                legal@couthacts.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 text-sm text-ocean-600">
          <Link href="/privacy" className="underline hover:text-ocean-700">Privacy Policy</Link>
          <Link href="/terms" className="underline hover:text-ocean-700">Terms of Service</Link>
          <Link href="/acceptable-use" className="underline hover:text-ocean-700">Acceptable Use Policy</Link>
        </div>
      </div>
    </div>
  );
}
