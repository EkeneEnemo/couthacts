import Link from "next/link";
import { Logo } from "@/components/logo";
import { Navbar } from "@/components/navbar";
import { ArrowRight, Key, Terminal, Send, FileJson } from "lucide-react";

export const metadata = {
  title: "API Documentation — CouthActs\u2122",
  description:
    "Build on CouthActs. RESTful API with webhooks, real-time tracking streams, and programmatic job management.",
};

const ENDPOINTS = [
  { method: "POST", path: "/api/v1/jobs", desc: "Create a new transportation job with full mode-specific workflow.", auth: "API Key" },
  { method: "GET", path: "/api/v1/jobs", desc: "List your jobs with filtering by status, mode, and date range.", auth: "API Key" },
  { method: "GET", path: "/api/v1/wallet", desc: "Check wallet balance, transaction history, and escrow holds.", auth: "API Key" },
  { method: "POST", path: "/api/provider/v1/tracking", desc: "Push GPS/AIS/flight tracking updates for active bookings.", auth: "Provider API Key" },
  { method: "GET", path: "/api/provider/v1/bookings", desc: "List provider bookings with status, escrow, and tracking data.", auth: "Provider API Key" },
  { method: "GET", path: "/api/provider/v1/jobs", desc: "Browse available jobs matching your registered transport modes.", auth: "Provider API Key" },
  { method: "GET", path: "/api/provider/v1/wallet", desc: "Provider wallet balance, earnings, and advance eligibility.", auth: "Provider API Key" },
  { method: "GET", path: "/api/track/{code}", desc: "Public tracking endpoint. No authentication required.", auth: "None" },
];

const METHOD_STYLES: Record<string, { bg: string; color: string }> = {
  POST: { bg: "#E8F7EC", color: "#34C759" },
  GET: { bg: "#E8F1FF", color: "#007AFF" },
  PUT: { bg: "#FFF5E6", color: "#FFB020" },
  DELETE: { bg: "#FFE8E8", color: "#FF3B30" },
};

const TRACKING_LAYERS = [
  { code: "MOBILE_GPS", label: "Mobile GPS", desc: "Real-time ground vehicle GPS coordinates", emoji: "📍" },
  { code: "AIS_MARITIME", label: "AIS Maritime", desc: "Automatic Identification System for vessels", emoji: "⚓" },
  { code: "FLIGHT_TRACKING", label: "Flight Tracking", desc: "ADS-B transponder data for aircraft", emoji: "✈️" },
  { code: "ELD_INTEGRATION", label: "ELD Integration", desc: "Electronic Logging Device for commercial trucks", emoji: "🚚" },
  { code: "QR_PIN_CONFIRMATION", label: "QR/PIN Confirmation", desc: "Cryptographic pickup/delivery proof", emoji: "🔐" },
  { code: "IOT_DEVICE", label: "IoT Device", desc: "Temperature, humidity, shock sensors", emoji: "🌡️" },
  { code: "SATELLITE", label: "Satellite", desc: "GPS + GLONASS for low-coverage areas", emoji: "🛰️" },
  { code: "DOCUMENT_POD_AI", label: "Document POD/AI", desc: "Proof of delivery with AI verification", emoji: "📄" },
  { code: "BIOMETRIC", label: "Biometric", desc: "Identity confirmation at handoff", emoji: "👤" },
];

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#B5E3FF]/50 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#E8F7EC]/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <span className="text-base">👩‍💻</span>
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                Developer platform
              </span>
            </div>

            <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl">
              Build on
              <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-[#34C759] to-[#007AFF] bg-clip-text text-transparent">
                CouthActs.
              </span>
            </h1>
            <p className="mt-6 text-lg text-[#1D1D1F]/60 leading-relaxed max-w-2xl">
              A clean REST API, real-time webhooks, 9 tracking layers, and a playground
              that doesn&rsquo;t hate you. Plug global transportation straight into your
              software.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/settings"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03]"
              >
                Get API keys <Key className="h-4 w-4" />
              </Link>
              <Link
                href="/enterprise"
                className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
              >
                Enterprise API <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ API PLANS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">Plans</p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Pick your lane.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                plan: "Starter",
                emoji: "🌱",
                price: "Free",
                period: "",
                desc: "Testing and prototyping.",
                features: ["1,000 API calls / month", "Public tracking endpoint", "Standard rate limits", "Community support"],
                cta: "Get started",
                href: "/settings",
                color: "#34C759",
                bg: "#E8F7EC",
              },
              {
                plan: "Growth",
                emoji: "🚀",
                price: "$299",
                period: "/mo",
                desc: "Production integrations.",
                features: ["5,000 API calls / month + $0.20/call overage", "Webhook notifications", "All tracking layers", "Email support", "Sandbox environment"],
                cta: "Start building",
                href: "/settings",
                color: "#007AFF",
                bg: "#E8F1FF",
                featured: true,
              },
              {
                plan: "Enterprise",
                emoji: "💎",
                price: "Custom",
                period: "",
                desc: "Large-scale operations.",
                features: ["Unlimited API calls", "Custom SLA", "Dedicated support engineer", "White-label tracking", "SSO + IP allowlisting", "Custom webhook filters"],
                cta: "Contact sales",
                href: "/enterprise",
                color: "#FF6B9D",
                bg: "#FFE8F0",
              },
            ].map((p) => (
              <div
                key={p.plan}
                className={`group rounded-[2rem] bg-white p-8 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${
                  p.featured ? "border-2 shadow-[0_10px_40px_rgba(0,122,255,0.15)]" : "border border-[#1D1D1F]/5 shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                }`}
                style={{ borderColor: p.featured ? p.color : undefined }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                    style={{ backgroundColor: p.bg }}
                  >
                    {p.emoji}
                  </span>
                  {p.featured && (
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: p.bg, color: p.color }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-5 text-[11px] font-bold text-[#1D1D1F]/50 uppercase tracking-[0.12em]">
                  {p.plan}
                </p>
                <p className="mt-1 text-4xl font-display font-black text-[#1D1D1F]">
                  {p.price}
                  {p.period && <span className="text-[14px] font-semibold text-[#1D1D1F]/50">{p.period}</span>}
                </p>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/60">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-[#1D1D1F]/65">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-8 block text-center rounded-full px-6 py-3 text-[13px] font-semibold text-white transition-all hover:scale-[1.03]"
                  style={{ backgroundColor: p.color }}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ QUICK START ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">Quick start</p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Three steps to your first call.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              { num: "01", emoji: "🔑", title: "Get your API key", desc: "Sign in, Settings, generate a Provider API key. Starts with ca_live_ or ca_test_.", color: "#FF7A59", bg: "#FFF1E8" },
              { num: "02", emoji: "⚡", title: "Make your first request", desc: "Use your key in Authorization: Bearer. Start with GET /api/provider/v1/jobs.", color: "#007AFF", bg: "#E8F1FF" },
              { num: "03", emoji: "🪝", title: "Set up webhooks", desc: "Configure webhook URLs in Settings to get real-time job and tracking updates.", color: "#34C759", bg: "#E8F7EC" },
            ].map((s) => (
              <div
                key={s.num}
                className="group relative rounded-[2rem] bg-white border border-[#1D1D1F]/5 p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>
                    Step {s.num}
                  </span>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[10deg]"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.emoji}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">{s.title}</h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Code example */}
          <div className="mt-12 rounded-[2rem] bg-[#1D1D1F] p-8 overflow-x-auto shadow-[0_16px_50px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-4 w-4 text-[#5AC8FA]" />
              <p className="text-[11px] font-semibold text-[#5AC8FA] uppercase tracking-[0.1em]">
                Example request
              </p>
            </div>
            <pre className="text-[13px] text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
              <code>{`curl -X GET https://couthacts.com/api/provider/v1/jobs \\
  -H "Authorization: Bearer ca_live_your_key_here" \\
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
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">Endpoints</p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Full reference.
            </h2>
          </div>

          <div className="mt-14 space-y-3">
            {ENDPOINTS.map((e) => {
              const style = METHOD_STYLES[e.method] || { bg: "#FFFBF5", color: "#1D1D1F" };
              return (
                <div
                  key={`${e.method}-${e.path}`}
                  className="flex flex-col gap-3 rounded-[1.5rem] bg-[#FFFBF5] border border-[#1D1D1F]/5 p-5 sm:flex-row sm:items-center transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className="inline-flex w-16 justify-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                      style={{ backgroundColor: style.bg, color: style.color }}
                    >
                      {e.method}
                    </span>
                    <code className="text-[13px] font-mono font-semibold text-[#1D1D1F]">
                      {e.path}
                    </code>
                  </div>
                  <p className="text-[13px] text-[#1D1D1F]/60 flex-1">{e.desc}</p>
                  <span className="rounded-full bg-white border border-[#1D1D1F]/10 px-3 py-1.5 text-[10px] font-semibold text-[#1D1D1F]/60 uppercase tracking-[0.1em] flex-shrink-0">
                    {e.auth}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 9 TRACKING LAYERS ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">Tracking API</p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Nine layers. One stream.
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55 max-w-xl mx-auto">
              Push tracking from any layer. Each event is timestamped, geotagged, and
              streamed in real-time to the customer.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKING_LAYERS.map((l) => (
              <div
                key={l.code}
                className="group rounded-[1.5rem] bg-white border border-[#1D1D1F]/5 p-6 shadow-[0_2px_14px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFFBF5] text-xl transition-transform group-hover:rotate-[-8deg]">
                    {l.emoji}
                  </span>
                  <code className="text-[10px] font-mono font-bold text-[#007AFF] bg-[#E8F1FF] px-2 py-0.5 rounded-md">
                    {l.code}
                  </code>
                </div>
                <h3 className="mt-3 text-[13px] font-display font-bold text-[#1D1D1F]">{l.label}</h3>
                <p className="mt-1 text-[12px] text-[#1D1D1F]/55">{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Tracking push example */}
          <div className="mt-10 rounded-[2rem] bg-[#1D1D1F] p-8 overflow-x-auto shadow-[0_16px_50px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2 mb-4">
              <Send className="h-4 w-4 text-[#5AC8FA]" />
              <p className="text-[11px] font-semibold text-[#5AC8FA] uppercase tracking-[0.1em]">
                Push a tracking event
              </p>
            </div>
            <pre className="text-[13px] text-white/80 font-mono leading-relaxed whitespace-pre-wrap">
              <code>{`POST /api/provider/v1/tracking
Authorization: Bearer ca_live_your_key_here

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
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">Auth & security</p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Secure by default.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: "🔑", title: "API key auth", desc: "Every request needs Authorization: Bearer. Generated in Settings, revocable anytime.", color: "#FF7A59", bg: "#FFF1E8" },
              { emoji: "🔒", title: "HTTPS only", desc: "All API traffic encrypted in transit. Plaintext HTTP rejected.", color: "#34C759", bg: "#E8F7EC" },
              { emoji: "🛡️", title: "Rate limiting", desc: "Per-key. Starter: 100/day. Growth: 10K/day. Enterprise: custom.", color: "#007AFF", bg: "#E8F1FF" },
              { emoji: "👁️", title: "Audit logging", desc: "Every call logged with timestamp, IP, endpoint, response code. Viewable in dashboard.", color: "#FFB020", bg: "#FFF5E6" },
              { emoji: "🌍", title: "CORS & IP allowlist", desc: "Enterprise plans restrict access to specific origins and IP ranges.", color: "#5AC8FA", bg: "#E8F5FF" },
              { emoji: "✍️", title: "Webhook signatures", desc: "Outbound webhooks include HMAC signatures. Verify the payload is really us.", color: "#FF6B9D", bg: "#FFE8F0" },
            ].map((s) => (
              <div
                key={s.title}
                className="group rounded-[1.5rem] bg-[#FFFBF5] border border-[#1D1D1F]/5 p-7 transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[-8deg]"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.emoji}
                </span>
                <h3 className="mt-4 text-[14px] font-display font-bold text-[#1D1D1F]">{s.title}</h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RESPONSE FORMAT ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF6B9D]">Response format</p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Consistent. Predictable.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[#1D1D1F] p-6 overflow-x-auto shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <div className="flex items-center gap-2 mb-3">
                <FileJson className="h-4 w-4 text-[#34C759]" />
                <p className="text-[11px] font-semibold text-[#34C759] uppercase tracking-[0.1em]">
                  Success (2xx)
                </p>
              </div>
              <pre className="text-[12px] text-white/80 font-mono leading-relaxed">
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

            <div className="rounded-[1.5rem] bg-[#1D1D1F] p-6 overflow-x-auto shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
              <div className="flex items-center gap-2 mb-3">
                <FileJson className="h-4 w-4 text-[#FF3B30]" />
                <p className="text-[11px] font-semibold text-[#FF3B30] uppercase tracking-[0.1em]">
                  Error (4xx/5xx)
                </p>
              </div>
              <pre className="text-[12px] text-white/80 font-mono leading-relaxed">
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
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#B5E3FF]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#E8F7EC]/50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-1.5 shadow-sm">
            <span className="text-base">🛠️</span>
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70">Builders welcome</span>
          </div>

          <h2 className="mt-6 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl">
            Ready to <span className="text-[#007AFF]">integrate?</span>
          </h2>
          <p className="mt-6 text-lg text-[#1D1D1F]/55 max-w-xl mx-auto">
            Get your API key and start building in minutes. Enterprise customers get a
            dedicated support engineer and custom SLA.
          </p>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/settings"
              className="inline-flex w-full items-center gap-2 justify-center rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03] sm:w-auto"
            >
              Get API keys <Key className="h-4 w-4" />
            </Link>
            <Link
              href="/enterprise"
              className="inline-flex w-full items-center gap-2 justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              Enterprise API <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <Logo size="sm" variant="white" href="/" />
            <p className="text-[11px] text-white/35">
              &copy; {new Date().getFullYear()} CouthActs&#8482;. Operated by CouthActs, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
