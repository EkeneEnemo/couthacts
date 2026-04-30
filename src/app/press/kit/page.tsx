import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { PrintButton } from "@/components/print-button";
import { ArrowLeft, Download } from "lucide-react";

export const metadata = {
  title: "Press Kit — CouthActs\u2122",
};

/* ── Brand colours ── */
const BRAND_COLORS = [
  { name: "CouthActs Black", hex: "#1D1D1F", usage: "Headlines, primary text, dark sections" },
  { name: "System Blue", hex: "#007AFF", usage: "Links, CTAs, interactive accents" },
  { name: "Surface Gray", hex: "#F5F5F7", usage: "Page backgrounds, card surfaces" },
  { name: "Secondary Text", hex: "#6E6E73", usage: "Body copy, descriptions" },
  { name: "Tertiary Text", hex: "#86868B", usage: "Metadata, labels, captions" },
  { name: "Divider", hex: "#E8E8ED", usage: "Borders, separators" },
  { name: "Success", hex: "#34C759", usage: "Verified states, positive indicators" },
  { name: "Error", hex: "#FF3B30", usage: "Errors, destructive actions" },
  { name: "Warning", hex: "#FF9500", usage: "Warnings, pending states" },
];

const LOGO_ASSETS = [
  { label: "Full Logo (PNG)", file: "/press/logo-full.png", size: "1200 \u00D7 800" },
  { label: "Mark \u2014 512px", file: "/press/logo-mark-512.png", size: "512 \u00D7 512" },
  { label: "Mark \u2014 256px", file: "/press/logo-mark-256.png", size: "256 \u00D7 256" },
  { label: "Mark \u2014 128px", file: "/press/logo-mark-128.png", size: "128 \u00D7 128" },
];

export default function PressKitPage() {
  return (
    <>
      {/* Navbar hidden in print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="min-h-screen bg-[#F5F5F7] print:bg-white">
        {/* ── Top bar (screen only) ── */}
        <div className="print:hidden mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-8 flex items-center justify-between">
          <Link href="/press" className="group inline-flex items-center gap-1.5 text-[13px] text-[#007AFF] hover:text-[#0055D4] transition-colors min-h-[44px]">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Press
          </Link>
          <PrintButton />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 print:px-0 print:py-0">

          {/* ═══════════ COVER ═══════════ */}
          <header className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2C2C2E] p-10 sm:p-16 text-center overflow-hidden relative print:rounded-none print:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,.1),transparent_70%)]" />
            <div className="relative">
              <div className="mx-auto mb-6">
                <Image
                  src="/images/logo.jpg"
                  alt="CouthActs logo"
                  width={80}
                  height={80}
                  className="mx-auto rounded-2xl shadow-lg"
                />
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                CouthActs&#8482;
              </h1>
              <p className="mt-2 text-[14px] sm:text-[16px] text-white/40">
                Press Kit &middot; {new Date().getFullYear()}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-[12px] text-white/50">
                Global Transportation Infrastructure Platform
              </div>
            </div>
          </header>

          {/* ═══════════ BOILERPLATE ═══════════ */}
          <section className="mt-10 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">About CouthActs</p>
            <h2 className="mt-3 text-2xl font-display font-bold text-[#1D1D1F] tracking-tight">
              The infrastructure that moves the world.
            </h2>
            <div className="mt-5 space-y-4 text-[14px] text-[#6E6E73] leading-[1.7]">
              <p>
                CouthActs&#8482; is a global multimodal transportation platform that connects customers with identity-verified service providers across 18 transport modes in more than 190 countries. The platform supports ground, air, maritime, and rail transportation with built-in escrow payments, real-time 9-layer tracking, provider scoring, and dispute resolution.
              </p>
              <p>
                Every transaction on CouthActs is escrow-protected from the moment a job is posted. Providers are paid only after both parties confirm completion. The proprietary CouthActs Score rates every provider on reliability, on-time delivery, communication, and dispute history — visible to all users.
              </p>
              <p>
                The CouthActs platform is operated by CouthActs&#8482;, Inc., a Texas corporation and a wholly owned subsidiary of The Ravine of Willows, Inc., also a Texas corporation. All intellectual property and trademarks are wholly owned by Enemo Consulting Group, Inc.&reg;; CouthActs&#8482;, Inc. operates under license from Enemo Consulting Group, Inc.&reg; CouthActs&#8482;, Inc. is headquartered at The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202, and was founded on November 27, 2021.
              </p>
            </div>
          </section>

          {/* ═══════════ KEY FACTS ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Key Facts</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { label: "Founded", value: "November 27, 2021" },
                { label: "Headquarters", value: "The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202" },
                { label: "Operator", value: "CouthActs™, Inc. (Texas corporation)" },
                { label: "Parent Company", value: "The Ravine of Willows, Inc. (Texas corporation)" },
                { label: "IP & Trademark Owner", value: "Enemo Consulting Group, Inc.®" },
                { label: "Transport Modes", value: "18" },
                { label: "Countries", value: "190+" },
                { label: "Categories", value: "Ground, Air, Maritime, Rail" },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-[11px] text-[#86868B] uppercase tracking-wider">{f.label}</p>
                  <p className="mt-1 text-[15px] font-display font-bold text-[#1D1D1F]">{f.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════ PLATFORM OVERVIEW ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Platform</p>
            <h2 className="mt-3 text-xl font-display font-bold text-[#1D1D1F] tracking-tight">
              18 Modes. One Platform.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { category: "Ground (6)", modes: "Taxi, Limo/Black Car, Courier/Last-Mile, Moving/Relocation, Freight Trucking, Heavy Haul/Oversized" },
                { category: "Air (4)", modes: "Private Jet Charter, Helicopter, Commercial Airline, Air Cargo" },
                { category: "Maritime (3)", modes: "Cargo Ship/Container, Yacht Charter, Ferry/Water Taxi" },
                { category: "Specialty (5)", modes: "Rail Freight, Armored Transport, Medical Transport, Hazmat, Oversized/Project Cargo" },
              ].map((c) => (
                <div key={c.category} className="rounded-2xl bg-[#F5F5F7] p-5 print:border print:border-[#E8E8ED]">
                  <p className="text-[13px] font-semibold text-[#1D1D1F]">{c.category}</p>
                  <p className="mt-1.5 text-[12px] text-[#6E6E73] leading-relaxed">{c.modes}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════ TRUST & SECURITY ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Trust & Security</p>
            <h2 className="mt-3 text-xl font-display font-bold text-[#1D1D1F] tracking-tight">
              Six Pillars of Protection
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Identity Verification", desc: "Every user and provider passes government-grade identity verification through our enterprise-certified third-party system. KYC for individuals, KYB for businesses — biometric matching, document authenticity, and real-time database checks." },
                { title: "Escrow Protection", desc: "Customer funds held from job posting. Released only after mutual confirmation of completion." },
                { title: "CouthActs Score", desc: "Proprietary algorithm rating providers on completion, on-time delivery, reviews, response time, and dispute history." },
                { title: "9-Layer Tracking", desc: "GPS, flight tracking, maritime AIS, QR/PIN, photo checkpoints, condition monitoring, satellite, geofencing, and audit timeline." },
                { title: "Protection Tiers", desc: "Basic, Standard, and Premium insurance tiers. Customers set minimum coverage requirements per posting." },
                { title: "Dispute Resolution", desc: "Evidence-based mediation with escrow freeze. 24-hour SLA. Funds held until resolution." },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl bg-[#F5F5F7] p-5 print:border print:border-[#E8E8ED]">
                  <p className="text-[13px] font-semibold text-[#1D1D1F]">{p.title}</p>
                  <p className="mt-1.5 text-[12px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════ PRODUCTS ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Products</p>
            <div className="mt-6 space-y-6">
              {[
                {
                  name: "CouthActs Platform",
                  desc: "The core platform. Customers post transportation needs across 18 modes. Verified providers bid. Funds are escrowed. Jobs are tracked in real-time. Both sides confirm completion before payment releases.",
                },
                {
                  name: "CouthActs Advance",
                  desc: "Cash-flow tools for Elite-tier providers. Invoice advances up to 70% of confirmed escrow value within 24 hours. Dedicated account management and volume-based escrow pricing.",
                },
                {
                  name: "CouthActs Academy",
                  desc: "Online training and certification platform for providers. Courses in safety compliance, hazmat handling, customer excellence, and fleet management. Certifications boost CouthActs Score.",
                },
                {
                  name: "CouthActs Instant",
                  desc: "Real-time job matching for time-sensitive transport. Customers describe needs, available providers are matched within 90 seconds. One-tap acceptance.",
                },
                {
                  name: "CouthActs API",
                  desc: "RESTful API with webhooks, real-time tracking streams, and programmatic job management. Three tiers: Starter (free, 100 calls/day), Growth ($299/mo, 10K calls/day), Enterprise (custom, unlimited + SLA).",
                },
              ].map((p) => (
                <div key={p.name}>
                  <p className="text-[14px] font-semibold text-[#1D1D1F]">{p.name}</p>
                  <p className="mt-1 text-[13px] text-[#6E6E73] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════ EXECUTIVE LEADERSHIP ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Leadership</p>
            <div className="mt-6">
              <p className="text-lg font-display font-bold text-[#1D1D1F]">Ekene C. Enemo</p>
              <p className="mt-0.5 text-[13px] text-[#007AFF] font-medium">Founder & CEO</p>
              <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed max-w-2xl">
                Ekene C. Enemo founded CouthActs&#8482; on November 27, 2021 with a vision to build the global infrastructure layer for transportation. Under his leadership, the platform has expanded to support 18 transport modes across 190+ countries, with every transaction protected by escrow and verified through government ID. Enemo also serves as CEO of Enemo Consulting Group, Inc.&reg;, the intellectual property and trademark holding company for CouthActs, and of The Ravine of Willows, Inc., the Texas corporation that is the parent of CouthActs&#8482;, Inc.
              </p>
            </div>
          </section>

          {/* ═══════════ BRAND GUIDELINES ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0 print:mt-8 print:break-before-page">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Brand Guidelines</p>

            {/* Typography */}
            <div className="mt-6">
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Typography</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F5F5F7] p-5 print:border print:border-[#E8E8ED]">
                  <p className="font-display text-xl font-bold text-[#1D1D1F]">Playfair Display</p>
                  <p className="mt-1 text-[12px] text-[#86868B]">Headlines, display text, numerical emphasis</p>
                </div>
                <div className="rounded-2xl bg-[#F5F5F7] p-5 print:border print:border-[#E8E8ED]">
                  <p className="font-body text-xl font-semibold text-[#1D1D1F]">Figtree</p>
                  <p className="mt-1 text-[12px] text-[#86868B]">Body copy, UI elements, metadata</p>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="mt-8">
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Color Palette</p>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {BRAND_COLORS.map((c) => (
                  <div key={c.hex} className="overflow-hidden rounded-2xl border border-[#E8E8ED]/60">
                    <div className="h-16 sm:h-20" style={{ backgroundColor: c.hex }} />
                    <div className="p-3 bg-white">
                      <p className="text-[12px] font-semibold text-[#1D1D1F]">{c.name}</p>
                      <p className="text-[11px] font-mono text-[#86868B] mt-0.5">{c.hex}</p>
                      <p className="text-[10px] text-[#86868B] mt-1 leading-snug">{c.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage rules */}
            <div className="mt-8">
              <p className="text-[13px] font-semibold text-[#1D1D1F]">Usage Rules</p>
              <ul className="mt-3 space-y-2 text-[13px] text-[#6E6E73] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#34C759] flex-shrink-0" />
                  Always refer to the company as <strong className="text-[#1D1D1F]">CouthActs</strong> or <strong className="text-[#1D1D1F]">CouthActs&#8482;</strong>. Never abbreviate, hyphenate, or separate the words.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#34C759] flex-shrink-0" />
                  CouthActs is a <strong className="text-[#1D1D1F]">platform</strong>. It is not a carrier, broker, freight forwarder, or logistics company.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#34C759] flex-shrink-0" />
                  Do not alter the logo colors, proportions, or typography. Use only the assets provided in this kit.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#34C759] flex-shrink-0" />
                  Minimum clear space around the logo mark is equal to the height of the &ldquo;C&rdquo; in the wordmark.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF3B30] flex-shrink-0" />
                  Do not place the logo on visually busy backgrounds, apply effects (drop shadows, gradients, outlines), or use it below 24px in height.
                </li>
              </ul>
            </div>
          </section>

          {/* ═══════════ LOGO DOWNLOADS ═══════════ */}
          <section className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-8 sm:p-10 print:hidden">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Logo Downloads</p>
            <p className="mt-2 text-[13px] text-[#6E6E73]">
              Download approved logo assets for editorial and media use.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {LOGO_ASSETS.map((a) => (
                <a
                  key={a.file}
                  href={a.file}
                  download
                  className="group flex items-center gap-4 rounded-2xl bg-[#F5F5F7] p-4 hover:bg-[#E8E8ED] active:bg-[#D2D2D7] transition-colors min-h-[44px]"
                >
                  <Image
                    src={a.file}
                    alt={a.label}
                    width={48}
                    height={48}
                    className="rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1D1D1F]">{a.label}</p>
                    <p className="text-[11px] text-[#86868B]">{a.size}</p>
                  </div>
                  <Download className="h-4 w-4 text-[#86868B] group-hover:text-[#007AFF] transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </section>

          {/* ═══════════ MEDIA CONTACT ═══════════ */}
          <section className="mt-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2C2C2E] p-8 sm:p-10 text-center overflow-hidden relative print:rounded-none print:bg-[#F5F5F7] print:text-left">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,.1),transparent_70%)] print:hidden" />
            <div className="relative">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] print:text-[#86868B]">Media Contact</p>
              <p className="mt-4 text-xl font-display font-bold text-white tracking-tight print:text-[#1D1D1F]">
                press@couthacts.com
              </p>
              <p className="mt-2 text-[13px] text-white/40 print:text-[#6E6E73]">
                For all media inquiries, interview requests, and additional assets.
              </p>
              <div className="mt-6 print:hidden">
                <a
                  href="mailto:press@couthacts.com"
                  className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.97] transition-all shadow-lg shadow-[#007AFF]/25 min-h-[44px]"
                >
                  Contact Press Team
                </a>
              </div>
            </div>
          </section>

          {/* ═══════════ LEGAL FOOTER ═══════════ */}
          <div className="mt-10 pb-8 text-center print:text-left space-y-1">
            <p className="text-[11px] text-[#86868B] leading-relaxed">
              &copy; {new Date().getFullYear()} CouthActs&#8482;, Inc., a Texas corporation. A wholly owned subsidiary of The Ravine of Willows, Inc., also a Texas corporation. All intellectual property wholly owned by Enemo Consulting Group, Inc.&reg;
            </p>
            <p className="text-[11px] text-[#C7C7CC] leading-relaxed">
              CouthActs&#8482; is a trademark of Enemo Consulting Group, Inc.&reg; All other trademarks, service marks, and logos used in connection with the CouthActs service are owned by Enemo Consulting Group, Inc.&reg; and used by CouthActs&#8482;, Inc. under license.
            </p>
            <p className="text-[11px] text-[#C7C7CC]">
              The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202 &middot; legal@couthacts.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
