import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Cookie Policy — CouthActs\u2122",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-[11px] text-[#86868B]">
          Last updated: March 30, 2026 &middot; Effective immediately
        </p>

        <div className="mt-10 max-w-none space-y-8 text-[14px] text-[#6E6E73] leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              1. Our Approach to Cookies
            </h2>
            <p className="mt-3">
              CouthActs&#8482; believes in minimal data collection. Unlike most platforms,
              we do not use analytics cookies, advertising cookies, tracking pixels,
              fingerprinting scripts, or any form of third-party tracking technology.
              We use a single, essential session cookie to keep you securely signed in.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              2. The Cookie We Use
            </h2>
            <p className="mt-3">
              CouthActs sets exactly one cookie on your browser:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[14px] rounded-2xl overflow-hidden border border-[#E8E8ED]">
                <thead>
                  <tr className="bg-[#F5F5F7]">
                    <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Property</th>
                    <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8ED]">
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Name</td>
                    <td className="px-4 py-2.5"><code className="rounded-md bg-[#F5F5F7] border border-[#E8E8ED] px-1.5 py-0.5 text-[13px]">couthacts_session</code></td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Purpose</td>
                    <td className="px-4 py-2.5">Authentication &mdash; keeps you signed in to your account</td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Type</td>
                    <td className="px-4 py-2.5">Essential (strictly necessary)</td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">HttpOnly</td>
                    <td className="px-4 py-2.5">Yes &mdash; not accessible via JavaScript</td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Secure</td>
                    <td className="px-4 py-2.5">Yes &mdash; only transmitted over HTTPS</td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">SameSite</td>
                    <td className="px-4 py-2.5">Lax &mdash; prevents cross-site request forgery</td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Expiry</td>
                    <td className="px-4 py-2.5">30 days from last sign-in</td>
                  </tr>
                  <tr className="hover:bg-[#F5F5F7] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Domain</td>
                    <td className="px-4 py-2.5">couthacts.com (first-party only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              3. Cookies We Do NOT Use
            </h2>
            <p className="mt-3">CouthActs does not set or allow any of the following:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-[#1D1D1F]">Analytics cookies</strong> &mdash; we do not use Google Analytics, Mixpanel, Amplitude, or any analytics tracking service.</li>
              <li><strong className="text-[#1D1D1F]">Advertising cookies</strong> &mdash; we do not serve ads or use retargeting pixels from any advertising network.</li>
              <li><strong className="text-[#1D1D1F]">Third-party tracking cookies</strong> &mdash; we do not embed social media trackers, cross-site tracking scripts, or fingerprinting libraries.</li>
              <li><strong className="text-[#1D1D1F]">Performance or preference cookies</strong> &mdash; your preferences (currency, language) are stored in your account settings, not in cookies.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              4. Why We Only Need One Cookie
            </h2>
            <p className="mt-3">
              Our session cookie is the only cookie required for the CouthActs platform
              to function. It authenticates your requests to our servers and maintains
              your signed-in state. All other user preferences, settings, and data are
              stored server-side in your account profile. There is no functional reason
              to place additional cookies on your device, so we do not.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              5. Managing Cookies
            </h2>
            <p className="mt-3">
              Because we only use one essential cookie, there is no cookie consent banner
              to manage. If you wish to delete the <code className="rounded-md bg-[#F5F5F7] border border-[#E8E8ED] px-1.5 py-0.5 text-[13px]">couthacts_session</code> cookie,
              you can do so through your browser settings. Note that deleting this cookie
              will sign you out of your CouthActs account and you will need to sign in
              again on your next visit.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              6. Changes to This Policy
            </h2>
            <p className="mt-3">
              If we ever need to introduce additional cookies (which we do not anticipate),
              we will update this page, notify registered users via email, and provide
              appropriate consent mechanisms as required by applicable law.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-display font-semibold text-[#1D1D1F]">
              7. Contact
            </h2>
            <p className="mt-3">
              For questions about this Cookie Policy, contact us at{" "}
              <a
                href="mailto:legal@couthacts.com"
                className="text-[#007AFF] hover:text-[#0055D4]"
              >
                legal@couthacts.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 text-[14px]">
          <Link href="/privacy" className="text-[#007AFF] hover:text-[#0055D4]">Privacy Policy</Link>
          <Link href="/terms" className="text-[#007AFF] hover:text-[#0055D4]">Terms of Service</Link>
          <Link href="/acceptable-use" className="text-[#007AFF] hover:text-[#0055D4]">Acceptable Use Policy</Link>
        </div>
      </div>
    </div>
  );
}
