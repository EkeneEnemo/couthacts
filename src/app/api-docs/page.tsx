import Link from "next/link";
import { Logo } from "@/components/logo";
import { Navbar } from "@/components/navbar";
import {
  ArrowRight,
  Code2,
  Key,
  Webhook,
  Zap,
  Shield,
  Globe,
  Lock,
  Eye,
  Terminal,
  FileJson,
  Send,
} from "lucide-react";

export const metadata = {
  title: "API Documentation — CouthActs\u2122",
  description:
    "Build on CouthActs. RESTful API with webhooks, real-time tracking streams, and programmatic job management.",
};

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/v1/jobs",
    desc: "Create a new transportation job with full mode-specific workflow.",
    auth: "API Key",
  },
  {
    method: "GET",
    path: "/api/v1/jobs",
    desc: "List your jobs with filtering by status, mode, and date range.",
    auth: "API Key",
  },
  {
    method: "GET",
    path: "/api/v1/wallet",
    desc: "Check wallet balance, transaction history, and escrow holds.",
    auth: "API Key",
  },
  {
    method: "POST",
    path: "/api/provider/v1/tracking",
    desc: "Push GPS/AIS/flight tracking updates for active bookings.",
    auth: "Provider API Key",
  },
  {
    method: "GET",
    path: "/api/provider/v1/bookings",
    desc: "List provider bookings with status, escrow, and tracking data.",
    auth: "Provider API Key",
  },
  {
    method: "GET",
    path: "/api/provider/v1/jobs",
    desc: "Browse available jobs matching your registered transport modes.",
    auth: "Provider API Key",
  },
  {
    method: "GET",
    path: "/api/provider/v1/wallet",
    desc: "Provider wallet balance, earnings, and advance eligibility.",
    auth: "Provider API Key",
  },
  {
    method: "GET",
    path: "/api/track/{code}",
    desc: "Public tracking endpoint. No authentication required.",
    auth: "None",
  },
];

const TRACKING_LAYERS = [
  { code: "MOBILE_GPS", label: "Mobile GPS", desc: "Real-time ground vehicle GPS coordinates" },
  { code: "AIS_MARITIME", label: "AIS Maritime", desc: "Automatic Identification System for vessels" },
  { code: "FLIGHT_TRACKING", label: "Flight Tracking", desc: "ADS-B transponder data for aircraft" },
  { code: "ELD_INTEGRATION", label: "ELD Integration", desc: "Electronic Logging Device for commercial trucks" },
  { code: "QR_PIN_CONFIRMATION", label: "QR/PIN Confirmation", desc: "Cryptographic pickup/delivery proof" },
  { code: "IOT_DEVICE", label: "IoT Device", desc: "Temperature, humidity, shock sensors" },
  { code: "SATELLITE", label: "Satellite", desc: "GPS + GLONASS for low-coverage areas" },
  { code: "DOCUMENT_POD_AI", label: "Document POD/AI", desc: "Proof of delivery with AI verification" },
  { code: "BIOMETRIC", label: "Biometric", desc: "Identity confirmation at handoff" },
];

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#007AFF]/30 bg-[#007AFF]/10 px-4 py-1.5 mb-6">
              <Code2 className="h-3.5 w-3.5 text-[#007AFF]" />
              <span className="text-[11px] font-semibold text-[#007AFF] tracking-[0.1em] uppercase">
                Developer Platform
              </span>
            </div>
            <h1 className="text-4xl font-display font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build on
              <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-[#007AFF] to-[#5856D6] bg-clip-text text-transparent">
                CouthActs.
              </span>
            </h1>
            <p className="mt-6 text-[14px] text-white/35 leading-relaxed max-w-2xl">
              RESTful API with webhooks, real-time tracking streams across 9
              layers, and programmatic job management. Integrate global
              transportation into your software.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-semibold text-[#1D1D1F] transition-all hover:scale-[1.02]"
              >
                Get API keys <Key className="h-4 w-4" />
              </Link>
              <Link
                href="/enterprise"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-[13px] font-semibold text-white transition-all hover:bg-white/10"
              >
                Enterprise API <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ API PLANS ═══════════════════════ */}
      <section className="bg-white border-b border-[#E8E8ED]/60">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Plans
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Choose your API tier.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                plan: "Starter",
                price: "Free",
                period: "",
                desc: "For testing and prototyping.",
                features: [
                  "100 API calls / day",
                  "Public tracking endpoint",
                  "Standard rate limits",
                  "Community support",
                ],
                cta: "Get started",
                href: "/settings",
                style: "border-[#E8E8ED]/60 bg-[#F5F5F7]",
              },
              {
                plan: "Growth",
                price: "$299",
                period: "/mo",
                desc: "For production integrations.",
                features: [
                  "10,000 API calls / day",
                  "Webhook notifications",
                  "All tracking layers",
                  "Email support",
                  "Sandbox environment",
                ],
                cta: "Start building",
                href: "/settings",
                style:
                  "border-[#007AFF]/30 bg-[#007AFF]/5 ring-2 ring-[#007AFF]/20",
              },
              {
                plan: "Enterprise",
                price: "Custom",
                period: "",
                desc: "For large-scale operations.",
                features: [
                  "Unlimited API calls",
                  "Custom SLA",
                  "Dedicated support engineer",
                  "White-label tracking",
                  "SSO + IP allowlisting",
                  "Custom webhook filters",
                ],
                cta: "Contact sales",
                href: "/enterprise",
                style: "border-[#E8E8ED]/60 bg-[#F5F5F7]",
              },
            ].map((p) => (
              <div
                key={p.plan}
                className={`rounded-3xl border p-8 ${p.style}`}
              >
                <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em]">
                  {p.plan}
                </p>
                <p className="mt-2 text-3xl font-display font-bold text-[#1D1D1F]">
                  {p.price}
                  {p.period && (
                    <span className="text-[14px] font-normal text-[#86868B]">
                      {p.period}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-[13px] text-[#6E6E73]">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[13px] text-[#6E6E73]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#007AFF] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-8 block text-center rounded-full bg-[#007AFF] px-6 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#0055D4]"
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ QUICK START ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Quick Start
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Three steps to your first API call.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                num: "01",
                icon: Key,
                title: "Get your API key",
                desc: "Sign in, go to Settings, and generate a Provider API key. Your key starts with ca_live_ or ca_test_.",
              },
              {
                num: "02",
                icon: Terminal,
                title: "Make your first request",
                desc: "Use your API key in the X-API-Key header. Start with GET /api/provider/v1/jobs to list available jobs.",
              },
              {
                num: "03",
                icon: Webhook,
                title: "Set up webhooks",
                desc: "Configure webhook URLs in Settings to receive real-time notifications for job status changes and tracking updates.",
              },
            ].map((s) => (
              <div key={s.num} className="relative">
                <span className="absolute -top-4 -left-2 text-[7rem] font-display font-bold text-[#1D1D1F]/[0.04] leading-none select-none pointer-events-none">
                  {s.num}
                </span>
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1D1D1F] text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] text-[#6E6E73] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Code example */}
          <div className="mt-16 rounded-3xl bg-[#1D1D1F] p-8 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-4 w-4 text-[#007AFF]" />
              <p className="text-[11px] font-semibold text-[#007AFF] uppercase tracking-[0.1em]">
                Example Request
              </p>
            </div>
            <pre className="text-[13px] text-white/35 font-mono leading-relaxed whitespace-pre-wrap">
              <code>{`curl -X GET https://couthacts.com/api/provider/v1/jobs \\
  -H "X-API-Key: ca_live_your_key_here" \\
  -H "Content-Type: application/json"

# Response
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "clx...",
        "title": "Freight: Dallas, TX → Houston, TX",
        "mode": "FREIGHT_TRUCKING",
        "budgetUsd": 2500,
        "origin": "Dallas, TX",
        "destination": "Houston, TX",
        "scheduledPickup": "2026-04-05T08:00:00Z",
        "trackingLayers": ["MOBILE_GPS", "ELD_INTEGRATION"],
        "bidsCount": 3
      }
    ]
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ENDPOINTS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Endpoints
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Full API reference.
            </h2>
          </div>

          <div className="mt-16 space-y-3">
            {ENDPOINTS.map((e) => (
              <div
                key={`${e.method}-${e.path}`}
                className="flex flex-col gap-3 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`inline-flex w-16 justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                      e.method === "POST"
                        ? "bg-[#34C759]/10 text-[#34C759]"
                        : "bg-[#007AFF]/10 text-[#007AFF]"
                    }`}
                  >
                    {e.method}
                  </span>
                  <code className="text-[13px] font-mono font-semibold text-[#1D1D1F]">
                    {e.path}
                  </code>
                </div>
                <p className="text-[13px] text-[#6E6E73] flex-1">{e.desc}</p>
                <span className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-[0.1em] flex-shrink-0">
                  {e.auth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 9 TRACKING LAYERS ═══════════════════════ */}
      <section className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Tracking API
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
              9 tracking layers via API.
            </h2>
            <p className="mt-4 text-[14px] text-white/35 max-w-xl mx-auto">
              Push tracking events from any layer. Each event is timestamped,
              geotagged, and streamed in real-time to the customer.
            </p>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKING_LAYERS.map((l) => (
              <div
                key={l.code}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6"
              >
                <code className="text-[11px] font-mono text-[#007AFF]">
                  {l.code}
                </code>
                <h3 className="mt-2 text-[13px] font-semibold text-white">
                  {l.label}
                </h3>
                <p className="mt-1 text-[11px] text-white/35">{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Tracking push example */}
          <div className="mt-12 rounded-3xl border border-white/[0.06] bg-white/[0.03] p-8 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Send className="h-4 w-4 text-[#007AFF]" />
              <p className="text-[11px] font-semibold text-[#007AFF] uppercase tracking-[0.1em]">
                Push a Tracking Event
              </p>
            </div>
            <pre className="text-[13px] text-white/35 font-mono leading-relaxed whitespace-pre-wrap">
              <code>{`POST /api/provider/v1/tracking
X-API-Key: ca_live_your_key_here

{
  "bookingId": "clx...",
  "lat": 32.7767,
  "lng": -96.7970,
  "layer": "MOBILE_GPS",
  "status": "IN_TRANSIT",
  "note": "Departed Dallas warehouse"
}

# Maritime example
{
  "bookingId": "clx...",
  "lat": 29.7604,
  "lng": -95.3698,
  "layer": "AIS_MARITIME",
  "status": "UNDERWAY",
  "note": "Passing Houston Ship Channel"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ AUTH & SECURITY ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Authentication & Security
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Secure by default.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Key,
                title: "API Key Authentication",
                desc: "Every request requires an X-API-Key header. Keys are generated in Settings and can be revoked at any time.",
              },
              {
                icon: Lock,
                title: "HTTPS Only",
                desc: "All API traffic is encrypted in transit. Plaintext HTTP requests are rejected.",
              },
              {
                icon: Shield,
                title: "Rate Limiting",
                desc: "Requests are rate-limited per key. Starter: 100/day. Growth: 10K/day. Enterprise: custom.",
              },
              {
                icon: Eye,
                title: "Audit Logging",
                desc: "Every API call is logged with timestamp, IP, endpoint, and response code. Available in your dashboard.",
              },
              {
                icon: Globe,
                title: "CORS & IP Allowlisting",
                desc: "Enterprise plans can restrict API access to specific origins and IP ranges.",
              },
              {
                icon: Zap,
                title: "Webhook Signatures",
                desc: "Outbound webhooks include HMAC signatures so you can verify the payload originated from CouthActs.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-7"
              >
                <s.icon className="h-5 w-5 text-[#1D1D1F]" />
                <h3 className="mt-4 text-[14px] font-display font-bold text-[#1D1D1F]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#6E6E73] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RESPONSE FORMAT ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Response Format
            </p>
            <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
              Consistent. Predictable.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#1D1D1F] p-6 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <FileJson className="h-4 w-4 text-[#34C759]" />
                <p className="text-[11px] font-semibold text-[#34C759] uppercase tracking-[0.1em]">
                  Success (2xx)
                </p>
              </div>
              <pre className="text-[11px] text-white/35 font-mono leading-relaxed">
                <code>{`{
  "success": true,
  "data": { ... },
  "meta": {
    "requestId": "req_...",
    "timestamp": "2026-04-01T..."
  }
}`}</code>
              </pre>
            </div>

            <div className="rounded-3xl bg-[#1D1D1F] p-6 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <FileJson className="h-4 w-4 text-[#FF3B30]" />
                <p className="text-[11px] font-semibold text-[#FF3B30] uppercase tracking-[0.1em]">
                  Error (4xx/5xx)
                </p>
              </div>
              <pre className="text-[11px] text-white/35 font-mono leading-relaxed">
                <code>{`{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "bookingId required"
  },
  "meta": {
    "requestId": "req_...",
    "timestamp": "2026-04-01T..."
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="bg-[#F5F5F7]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
            Ready to integrate?
          </h2>
          <p className="mt-4 text-[14px] text-[#6E6E73] max-w-lg mx-auto">
            Get your API key and start building in minutes. Enterprise
            customers get a dedicated support engineer and custom SLA.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-full bg-[#007AFF] px-10 py-4 text-[13px] font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,.04)] transition-all hover:bg-[#0055D4] hover:scale-[1.02]"
            >
              Get API keys <Key className="h-4 w-4" />
            </Link>
            <Link
              href="/enterprise"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#E8E8ED]/60 px-10 py-4 text-[13px] font-semibold text-[#1D1D1F] transition-all hover:bg-white"
            >
              Enterprise API <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <Logo size="sm" variant="white" href="/" />
            <p className="text-[11px] text-white/35">
              &copy; {new Date().getFullYear()} CouthActs&#8482;. Operated by
              CouthActs, Inc. Intellectual property of Enemo Consulting Group,
              Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
