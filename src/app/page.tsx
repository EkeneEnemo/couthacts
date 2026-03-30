import Link from "next/link";
import {
  Truck,
  Plane,
  Ship,
  Train,
  Package,
  MapPin,
  CreditCard,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

const HERO_STATS = [
  { value: "18", label: "Transport Modes" },
  { value: "190+", label: "Countries" },
  { value: "100%", label: "Escrow Protected" },
];

const MODE_HIGHLIGHTS = [
  {
    icon: Truck,
    title: "Ground",
    description: "Taxis, freight, heavy haul, moving, couriers, armored & medical transport",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: Plane,
    title: "Air",
    description: "Private jets, helicopters, commercial airlines, and air cargo worldwide",
    color: "bg-ocean-100 text-ocean-700",
  },
  {
    icon: Ship,
    title: "Maritime",
    description: "Cargo ships, yacht charters, and ferry services across all oceans",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: Train,
    title: "Rail & Specialty",
    description: "Freight rail, hazmat, oversized cargo — the modes others won't touch",
    color: "bg-ocean-100 text-ocean-700",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Package,
    title: "Post Your Job",
    description:
      "Describe what needs moving — from a courier package to an oversized turbine. Set your budget and timeline.",
  },
  {
    step: "02",
    icon: Star,
    title: "Get Matched",
    description:
      "Verified providers bid on your job. Compare CouthActs Scores, reviews, and pricing before you choose.",
  },
  {
    step: "03",
    icon: CreditCard,
    title: "Escrow Payment",
    description:
      "Funds are held securely in escrow. The provider only gets paid when you confirm delivery.",
  },
  {
    step: "04",
    icon: MapPin,
    title: "Track in Real-Time",
    description:
      "GPS, maritime AIS, flight tracking, IoT sensors — watch your shipment every step of the way.",
  },
];

const TRUST_POINTS = [
  "Every provider is identity-verified with KYB checks",
  "CouthActs Score rates reliability, speed, and communication",
  "Escrow holds your payment until the job is done",
  "Multi-layer tracking from GPS to satellite",
  "Built-in dispute resolution with evidence upload",
  "Insurance tiers from basic liability to full cargo coverage",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800 via-ocean-700 to-sky-600" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-sky-300 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-ocean-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-display font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Move anything, anywhere —{" "}
              <span className="text-sky-300">from taxi to cargo ship</span>
            </h1>
            <p className="mt-6 text-lg text-sky-100 leading-relaxed max-w-2xl">
              CouthActs is the first marketplace that connects you with verified
              providers across all 18 transport modes — ground, air, sea, and
              rail. Escrow-protected payments, real-time tracking, and a trust
              score system that holds everyone accountable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-ocean-700 shadow-lg transition hover:bg-sky-50 hover:shadow-xl"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register?role=PROVIDER"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-sky-300/40 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Become a provider
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-display font-bold text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-sky-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Modes */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
            Every mode, one platform
          </p>
          <h2 className="mt-2 text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
            18 transport modes, zero runaround
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Whether you&apos;re shipping a pallet across town or chartering a yacht
            across the Mediterranean, CouthActs has a verified provider ready.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODE_HIGHLIGHTS.map((m) => (
            <div
              key={m.title}
              className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${m.color}`}
              >
                <m.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-display font-semibold text-ocean-800">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white/60 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
              Simple process
            </p>
            <h2 className="mt-2 text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
              How CouthActs works
            </h2>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-50 border border-ocean-100">
                  <item.icon className="h-7 w-7 text-ocean-600" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-500">
                  Step {item.step}
                </p>
                <h3 className="mt-2 text-lg font-display font-semibold text-ocean-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
              Trust & Safety
            </p>
            <h2 className="mt-2 text-3xl font-display font-bold text-ocean-900 sm:text-4xl">
              Built for trust at every layer
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              CouthActs isn&apos;t just a marketplace — it&apos;s a trust engine. From
              verified identities to escrow-protected payments to multi-layer
              tracking, every feature is designed so you never have to take a
              leap of faith.
            </p>
          </div>

          <div className="space-y-4">
            {TRUST_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm border border-gray-100"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-500" />
                <p className="text-sm text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-ocean-700 to-sky-600">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
            Ready to move the world?
          </h2>
          <p className="mt-4 text-lg text-sky-100">
            Join CouthActs today — post your first job or register as a provider
            in under 5 minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-ocean-700 shadow-lg transition hover:bg-sky-50"
            >
              Create free account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex items-center rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Register as provider
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-cream-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-2xl font-display font-bold text-ocean-800">
              CouthActs
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/login" className="hover:text-ocean-600">
                Sign in
              </Link>
              <Link href="/register" className="hover:text-ocean-600">
                Register
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CouthActs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
