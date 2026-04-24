import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SeoFooter } from "@/components/seo/corridor-page";
import { listModes } from "@/lib/seo/modes";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "18 transport services worldwide — from taxi to ocean freight | CouthActs",
  description:
    "Browse 18 verified transport services — from taxis and same-day couriers to private jets, yacht charters, and ocean freight. One marketplace, 190+ countries, escrow-safe.",
  alternates: { canonical: "https://www.couthacts.com/services" },
  openGraph: {
    title: "18 transport services worldwide | CouthActs",
    description:
      "From taxi to ocean freight: one marketplace, 190+ countries, escrow-safe payments, and real-human support.",
    url: "https://www.couthacts.com/services",
    type: "website",
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  ground: "On the ground",
  air: "In the air",
  maritime: "At sea",
  rail: "On rails",
  specialty: "Something special",
};

const CATEGORY_ACCENT: Record<string, string> = {
  ground: "#FF7A59",
  air: "#5AC8FA",
  maritime: "#34C759",
  rail: "#A6662B",
  specialty: "#FF6B9D",
};

export default function ServicesDirectory() {
  const modes = listModes();
  const byCategory = new Map<string, typeof modes>();
  for (const m of modes) {
    const list = byCategory.get(m.category) ?? [];
    list.push(m);
    byCategory.set(m.category, list);
  }
  const order = ["ground", "air", "maritime", "rail", "specialty"];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
              18 services · 190+ countries
            </span>
          </div>
          <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl">
            Anything you need
            <br />
            <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
              moved. Anywhere.
            </span>
          </h1>
          <p className="mt-6 text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px] max-w-xl mx-auto">
            From a pizza across town to a container across the ocean — 18 transport services, one
            marketplace, one trusted checkout.
          </p>
        </div>
      </section>

      {/* Categories */}
      {order.map((cat) => {
        const list = byCategory.get(cat);
        if (!list) return null;
        return (
          <section key={cat} className={cat === "ground" ? "bg-white" : "bg-[#FFFBF5]"}>
            <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
              <div className="mb-8">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: CATEGORY_ACCENT[cat] }}
                >
                  {list.length} service{list.length === 1 ? "" : "s"}
                </p>
                <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
                  {CATEGORY_LABEL[cat]}
                </h2>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/services/${m.slug}`}
                      className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1 block aspect-[5/4]"
                    >
                      <Image
                        src={m.image}
                        alt={m.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/30 to-transparent" />
                      <div className="absolute top-5 right-5 h-11 w-11 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur text-xl shadow-md">
                        {m.emoji}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-display font-black text-white lg:text-3xl">
                          {m.label}
                        </h3>
                        <p className="mt-1 text-[13px] text-white/80 line-clamp-2">{m.tagline}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-semibold text-[#1D1D1F] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                          Learn more <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      </main>

      <SeoFooter />
    </div>
  );
}
