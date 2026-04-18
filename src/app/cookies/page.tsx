import Link from "next/link";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Cookie Policy — CouthActs\u2122",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      <Navbar />

      <div className="pointer-events-none absolute -top-20 -left-32 h-[24rem] w-[24rem] rounded-full bg-[#FFE3A3]/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
          <span className="text-base">🍪</span>
          <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
            One cookie. That&rsquo;s it.
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
          Cookie <span className="text-[#FFB020]">policy</span>.
        </h1>
        <p className="mt-4 text-[11px] text-[#1D1D1F]/40">
          Last updated March 30, 2026 &middot; Effective immediately
        </p>

        <div className="mt-12 rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-8 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.03)] space-y-8 text-[14px] text-[#1D1D1F]/65 leading-relaxed">

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">1. Our Approach to Cookies</h2>
            <p className="mt-3">
              CouthActs&#8482; believes in minimal data collection. Unlike most platforms,
              we do not use analytics cookies, advertising cookies, tracking pixels,
              fingerprinting scripts, or any form of third-party tracking technology.
              We use a single, essential session cookie to keep you securely signed in.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">2. The Cookie We Use</h2>
            <p className="mt-3">CouthActs sets exactly one cookie on your browser:</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[14px] rounded-2xl overflow-hidden border border-[#1D1D1F]/10">
                <thead>
                  <tr className="bg-[#FFF5E6]">
                    <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#1D1D1F]/70 uppercase tracking-wider">Property</th>
                    <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#1D1D1F]/70 uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1D1F]/5">
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Name</td>
                    <td className="px-4 py-2.5"><code className="rounded-md bg-[#FFF5E6] border border-[#FFE3A3] px-1.5 py-0.5 text-[13px]">couthacts_session</code></td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Purpose</td>
                    <td className="px-4 py-2.5">Authentication &mdash; keeps you signed in to your account</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Type</td>
                    <td className="px-4 py-2.5">Essential (strictly necessary)</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">HttpOnly</td>
                    <td className="px-4 py-2.5">Yes &mdash; not accessible via JavaScript</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Secure</td>
                    <td className="px-4 py-2.5">Yes &mdash; only transmitted over HTTPS</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">SameSite</td>
                    <td className="px-4 py-2.5">Lax &mdash; prevents cross-site request forgery</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Expiry</td>
                    <td className="px-4 py-2.5">30 days from last sign-in</td>
                  </tr>
                  <tr className="hover:bg-[#FFFBF5] transition">
                    <td className="px-4 py-2.5 font-medium text-[#1D1D1F]">Domain</td>
                    <td className="px-4 py-2.5">couthacts.com (first-party only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">3. Cookies We Do NOT Use</h2>
            <p className="mt-3">CouthActs does not set or allow any of the following:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong className="text-[#1D1D1F]">Analytics cookies</strong> &mdash; we do not use Google Analytics, Mixpanel, Amplitude, or any analytics tracking service.</li>
              <li><strong className="text-[#1D1D1F]">Advertising cookies</strong> &mdash; we do not serve ads or use retargeting pixels from any advertising network.</li>
              <li><strong className="text-[#1D1D1F]">Third-party tracking cookies</strong> &mdash; we do not embed social media trackers, cross-site tracking scripts, or fingerprinting libraries.</li>
              <li><strong className="text-[#1D1D1F]">Performance or preference cookies</strong> &mdash; your preferences (currency, language) are stored in your account settings, not in cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">4. Why We Only Need One Cookie</h2>
            <p className="mt-3">
              Our session cookie is the only cookie required for the CouthActs platform
              to function. It authenticates your requests to our servers and maintains
              your signed-in state. All other user preferences, settings, and data are
              stored server-side in your account profile. There is no functional reason
              to place additional cookies on your device, so we do not.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">5. Managing Cookies</h2>
            <p className="mt-3">
              Because we only use one essential cookie, there is no cookie consent banner
              to manage. If you wish to delete the <code className="rounded-md bg-[#FFF5E6] border border-[#FFE3A3] px-1.5 py-0.5 text-[13px]">couthacts_session</code> cookie,
              you can do so through your browser settings. Note that deleting this cookie
              will sign you out of your CouthActs account and you will need to sign in
              again on your next visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">6. Changes to This Policy</h2>
            <p className="mt-3">
              If we ever need to introduce additional cookies (which we do not anticipate),
              we will update this page, notify registered users via email, and provide
              appropriate consent mechanisms as required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-[#1D1D1F]">7. Contact</h2>
            <p className="mt-3">
              For questions about this Cookie Policy, contact us at{" "}
              <a href="mailto:legal@couthacts.com" className="text-[#007AFF] hover:text-[#FF7A59] font-semibold transition-colors">
                legal@couthacts.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-10 rounded-[2rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#FFE8F0] p-8 border border-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-2xl">
              🍪
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-[#1D1D1F]">
                Minimalism, but make it tasty.
              </h3>
              <p className="mt-1 text-[13px] text-[#1D1D1F]/60">
                We skip the tracking buffet. One session cookie, no banner &mdash; that&rsquo;s the whole story.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/privacy" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Privacy Policy</Link>
          <Link href="/terms" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Terms of Service</Link>
          <Link href="/acceptable-use" className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 hover:bg-[#FFF5E6] hover:border-[#FF7A59]/40 hover:text-[#FF7A59] transition-all">Acceptable Use</Link>
        </div>
      </div>
    </div>
  );
}
