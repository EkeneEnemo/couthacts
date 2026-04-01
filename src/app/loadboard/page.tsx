"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Package, MapPin, Calendar, AlertTriangle, Truck, Filter } from "lucide-react";

interface LoadPost {
  id: string; mode: string; title: string; description: string; status: string;
  originAddress: string; destinationAddress: string; pickupDate: string;
  budgetUsd: string; weightKg: number | null; isHazmat: boolean;
  isOversized: boolean; isTemperatureControlled: boolean; insuranceTier: string;
  createdAt: string; _count: { bids: number };
}

const MODES = [
  { key: "", label: "All Freight" },
  { key: "FREIGHT_TRUCKING", label: "Trucking" },
  { key: "HEAVY_HAUL", label: "Heavy Haul" },
  { key: "HAZMAT", label: "Hazmat" },
  { key: "OVERSIZED_CARGO", label: "Oversized" },
  { key: "FREIGHT_RAIL", label: "Rail" },
  { key: "AIR_CARGO", label: "Air Cargo" },
  { key: "CARGO_SHIP", label: "Ocean" },
];

const SORTS = [
  { key: "newest", label: "Newest" },
  { key: "budget_high", label: "Highest Budget" },
  { key: "budget_low", label: "Lowest Budget" },
  { key: "pickup_soon", label: "Pickup Soonest" },
];

export default function LoadBoardPage() {
  const [posts, setPosts] = useState<LoadPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("");
  const [sort, setSort] = useState("newest");
  const [hazmat, setHazmat] = useState(false);
  const [oversized, setOversized] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadData() {
      const params = new URLSearchParams();
      if (mode) params.set("mode", mode);
      params.set("sort", sort);
      if (hazmat) params.set("hazmat", "true");
      if (oversized) params.set("oversized", "true");
      if (fresh) params.set("fresh", "true");
      const res = await fetch(`/api/loadboard?${params}`).then((r) => r.json());
      setPosts(res.postings || []);
      setLoading(false);
    }
    loadData();
    const interval = setInterval(loadData, 30000); // Auto-refresh 30s
    return () => clearInterval(interval);
  }, [mode, sort, hazmat, oversized, fresh]);

  function budgetRange(budget: number) {
    const low = Math.round(budget * 0.75);
    const high = Math.round(budget * 1.25);
    return `$${low.toLocaleString()}–$${high.toLocaleString()}`;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">Load Board</h1>
            <p className="mt-1 text-[14px] text-[#6E6E73]">Open freight, cargo, and specialty transport jobs</p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 rounded-full border border-[#E8E8ED] px-4 py-2 text-[13px] font-medium text-[#1D1D1F] hover:shadow-[0_4px_20px_rgba(0,0,0,.06)] transition lg:hidden">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-4">
          {/* Filters */}
          <div className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
            {/* Mode */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-2">Mode</p>
              <div className="space-y-1">
                {MODES.map((m) => (
                  <button key={m.key} onClick={() => setMode(m.key)}
                    className={`block w-full text-left rounded-xl px-3 py-1.5 text-[13px] transition ${mode === m.key ? "bg-[#007AFF]/10 text-[#007AFF] font-medium" : "text-[#6E6E73] hover:bg-[#F5F5F7]"}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Sort */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
              <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.1em] mb-2">Sort</p>
              {SORTS.map((s) => (
                <label key={s.key} className="flex items-center gap-2 text-[13px] py-1 cursor-pointer">
                  <input type="radio" name="sort" checked={sort === s.key} onChange={() => setSort(s.key)} className="accent-[#007AFF]" />
                  <span className="text-[#1D1D1F]">{s.label}</span>
                </label>
              ))}
            </div>
            {/* Toggles */}
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 space-y-2">
              <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input type="checkbox" checked={hazmat} onChange={(e) => setHazmat(e.target.checked)} className="accent-[#007AFF]" /> <span className="text-[#1D1D1F]">Hazmat only</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input type="checkbox" checked={oversized} onChange={(e) => setOversized(e.target.checked)} className="accent-[#007AFF]" /> <span className="text-[#1D1D1F]">Oversized only</span>
              </label>
              <label className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input type="checkbox" checked={fresh} onChange={(e) => setFresh(e.target.checked)} className="accent-[#007AFF]" /> <span className="text-[#1D1D1F]">Last 24 hours</span>
              </label>
            </div>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/80 border border-white/60" />)}
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-12 text-center shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
                <Truck className="mx-auto h-12 w-12 text-[#86868B]" />
                <p className="mt-4 text-[14px] text-[#6E6E73]">No loads match your filters</p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((p) => {
                  const budget = Number(p.budgetUsd);
                  return (
                    <Link key={p.id} href={`/postings/${p.id}`}
                      className="block rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_1px_8px_rgba(0,0,0,.03)] border border-white/60 hover:shadow-[0_4px_20px_rgba(0,0,0,.06)] hover:-translate-y-0.5 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="rounded-full bg-[#007AFF]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#007AFF]">
                              {p.mode.replace(/_/g, " ")}
                            </span>
                            {p.isHazmat && <span className="rounded-full bg-[#FFF1F0] px-2.5 py-0.5 text-[10px] font-semibold text-[#FF3B30] flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> HAZMAT</span>}
                            {p.isOversized && <span className="rounded-full bg-[#FFF3E0] px-2.5 py-0.5 text-[10px] font-semibold text-[#FF9500]">OVERSIZED</span>}
                            {p.isTemperatureControlled && <span className="rounded-full bg-[#007AFF]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#007AFF]">TEMP</span>}
                            {p.insuranceTier !== "NONE" && <span className="rounded-full bg-[#EEFBF1] px-2.5 py-0.5 text-[10px] font-semibold text-[#34C759]">{p.insuranceTier}</span>}
                          </div>
                          <h3 className="mt-2 text-[14px] font-medium text-[#1D1D1F] line-clamp-1">{p.title}</h3>
                          {p.description && <p className="mt-1 text-[13px] text-[#6E6E73] line-clamp-2">{p.description}</p>}
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <p className="text-lg font-display font-bold tracking-tight text-[#1D1D1F] tabular-nums">{budgetRange(budget)}</p>
                          <p className="text-[10px] text-[#86868B]">estimated budget</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-[11px] text-[#86868B]">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.originAddress.split(",")[0]} → {p.destinationAddress.split(",")[0]}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(p.pickupDate).toLocaleDateString()}</span>
                        {p.weightKg && <span>{p.weightKg.toLocaleString()} kg</span>}
                        <span className="flex items-center gap-1"><Package className="h-3 w-3" /> {p._count.bids} bid{p._count.bids !== 1 && "s"}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
