"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { TRANSPORT_CATEGORIES } from "@/lib/transport-modes";
import { getModeByEnum, type TransportModeKey } from "@/lib/seo/modes";
import {
  MapPin,
  Calendar,
  AlertTriangle,
  Package,
  Filter,
  ArrowRight,
  Flame,
  X,
} from "lucide-react";

interface Posting {
  id: string;
  mode: string;
  title: string;
  description: string;
  status: string;
  originAddress: string;
  destinationAddress: string;
  pickupDate: string;
  budgetUsd: string;
  isUrgent: boolean;
  isHazmat: boolean;
  isFragile: boolean;
  isOversized: boolean;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    city: string | null;
    country: string | null;
  };
  _count: { bids: number };
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first", emoji: "✨" },
  { value: "budget_high", label: "Highest budget", emoji: "💰" },
  { value: "budget_low", label: "Lowest budget", emoji: "💵" },
  { value: "pickup_soon", label: "Pickup soonest", emoji: "⏰" },
];

const ALL_MODES = TRANSPORT_CATEGORIES.flatMap((c) => c.modes);

function relativeTime(iso: string): string {
  const delta = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.round(delta / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

export default function BrowsePage() {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("");
  const [sort, setSort] = useState("newest");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (mode) params.set("mode", mode);
    if (sort) params.set("sort", sort);
    if (urgentOnly) params.set("urgent", "true");

    fetch(`/api/browse?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setPostings(data.postings || []);
        setLoading(false);
      });
  }, [mode, sort, urgentOnly]);

  const activeMode = useMemo(() => (mode ? ALL_MODES.find((m) => m.key === mode) : null), [mode]);
  const urgentCount = postings.filter((p) => p.isUrgent).length;
  const totalValue = postings.reduce((sum, p) => sum + Number(p.budgetUsd), 0);
  const activeFilters = (mode ? 1 : 0) + (urgentOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-10">
          <div className="pointer-events-none absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#FFD8B5]/45 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute top-10 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#B5E3FF]/45 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-[#FFB8C9]/35 blur-3xl" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34C759] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34C759]" />
                  </span>
                  <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                    {loading ? "Loading jobs…" : `${postings.length.toLocaleString()} open jobs right now`}
                  </span>
                </div>

                <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-4xl sm:text-5xl lg:text-6xl">
                  {activeMode ? (
                    <>
                      <span className="block text-[#1D1D1F]/50 text-3xl sm:text-4xl lg:text-5xl mb-2">
                        {activeMode.label}
                      </span>
                      jobs open{" "}
                      <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
                        right now
                      </span>
                    </>
                  ) : (
                    <>
                      Fresh jobs,{" "}
                      <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
                        ready to bid.
                      </span>
                    </>
                  )}
                </h1>

                <p className="mt-4 text-[15px] text-[#1D1D1F]/55 max-w-xl">
                  Real customers, real budgets, real routes. Bid fast — the hottest jobs go in under an
                  hour.
                </p>
              </div>

              {/* Quick stats */}
              {!loading && postings.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">Open</p>
                    <p className="mt-0.5 text-xl font-display font-black text-[#1D1D1F] tabular-nums">
                      {postings.length.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FF3B30]">Urgent</p>
                    <p className="mt-0.5 text-xl font-display font-black text-[#FF3B30] tabular-nums">
                      {urgentCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#34C759]">
                      Total value
                    </p>
                    <p className="mt-0.5 text-xl font-display font-black text-[#34C759] tabular-nums">
                      ${Math.round(totalValue).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Toolbar + content */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-6 pb-20">
            {/* Mobile filter toggle */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-4 py-2 text-[13px] font-semibold text-[#1D1D1F] hover:bg-white transition-colors"
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                Filters
                {activeFilters > 0 && (
                  <span className="ml-1 rounded-full bg-[#FF7A59] text-white text-[10px] font-bold px-1.5 py-0.5">
                    {activeFilters}
                  </span>
                )}
              </button>
              {activeFilters > 0 && (
                <button
                  onClick={() => {
                    setMode("");
                    setUrgentOnly(false);
                  }}
                  className="text-[12px] font-semibold text-[#007AFF] hover:text-[#0055D4] inline-flex items-center gap-1"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  Clear filters
                </button>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
              {/* Filter sidebar */}
              <aside
                className={`space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}
                aria-label="Filters"
              >
                {/* Sort */}
                <div className="rounded-[1.5rem] bg-white/80 backdrop-blur-md border border-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm text-sm" aria-hidden="true">
                      🎯
                    </span>
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                      Sort by
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {SORT_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] cursor-pointer transition-colors ${
                          sort === opt.value ? "bg-[#007AFF]/8 text-[#007AFF] font-semibold" : "text-[#1D1D1F] hover:bg-[#FFFBF5]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="sort"
                          checked={sort === opt.value}
                          onChange={() => setSort(opt.value)}
                          className="sr-only"
                        />
                        <span className="text-base" aria-hidden="true">{opt.emoji}</span>
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Modes by category */}
                <div className="rounded-[1.5rem] bg-white/80 backdrop-blur-md border border-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm text-sm" aria-hidden="true">
                      🚚
                    </span>
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                      Transport mode
                    </h3>
                  </div>
                  <button
                    onClick={() => setMode("")}
                    className={`block w-full text-left rounded-xl px-3 py-2 text-[13px] transition-colors mb-2 ${
                      !mode ? "bg-[#1D1D1F] text-white font-semibold" : "text-[#1D1D1F] hover:bg-[#FFFBF5]"
                    }`}
                  >
                    ✨ All modes
                  </button>
                  <div className="max-h-[22rem] overflow-y-auto space-y-3 pr-1">
                    {TRANSPORT_CATEGORIES.map((cat) => (
                      <div key={cat.name}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/40 px-2 mb-1">
                          {cat.name}
                        </p>
                        <div className="space-y-0.5">
                          {cat.modes.map((m) => {
                            const info = getModeByEnum(m.key as TransportModeKey);
                            const isActive = mode === m.key;
                            return (
                              <button
                                key={m.key}
                                onClick={() => setMode(m.key)}
                                className={`flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] transition-colors ${
                                  isActive
                                    ? "bg-[#007AFF]/10 text-[#007AFF] font-semibold"
                                    : "text-[#1D1D1F]/75 hover:bg-[#FFFBF5]"
                                }`}
                              >
                                <span className="text-sm" aria-hidden="true">{info?.emoji ?? "📦"}</span>
                                <span>{m.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Urgent toggle */}
                <button
                  type="button"
                  onClick={() => setUrgentOnly(!urgentOnly)}
                  className={`w-full rounded-[1.5rem] border p-5 text-left shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-colors ${
                    urgentOnly
                      ? "bg-gradient-to-br from-[#FFF1E8] to-white border-[#FF7A59]/30"
                      : "bg-white/80 backdrop-blur-md border-white hover:border-[#FF7A59]/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg transition-colors ${
                        urgentOnly ? "bg-[#FF7A59] text-white" : "bg-white shadow-sm"
                      }`}
                      aria-hidden="true"
                    >
                      <Flame className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] font-display font-bold text-[#1D1D1F]">
                        Urgent jobs only
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#1D1D1F]/50">
                        Moves that need to happen now
                      </p>
                    </div>
                    <span
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        urgentOnly ? "bg-[#FF7A59]" : "bg-[#1D1D1F]/15"
                      }`}
                      aria-hidden="true"
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                          urgentOnly ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </span>
                  </div>
                </button>
              </aside>

              {/* Job feed */}
              <div>
                {loading ? (
                  <div className="space-y-3" aria-busy="true">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-40 animate-pulse rounded-[1.5rem] bg-white/70 border border-white"
                      />
                    ))}
                  </div>
                ) : postings.length === 0 ? (
                  <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white p-12 text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFFBF5] text-3xl shadow-sm" aria-hidden="true">
                      🔍
                    </span>
                    <h3 className="mt-4 text-xl font-display font-bold text-[#1D1D1F]">
                      No jobs match your filters
                    </h3>
                    <p className="mt-2 text-[14px] text-[#1D1D1F]/55">
                      Try clearing filters or checking a different transport mode.
                    </p>
                    <button
                      onClick={() => {
                        setMode("");
                        setUrgentOnly(false);
                      }}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#007AFF] transition-colors"
                    >
                      Show all jobs
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {postings.map((p) => {
                      const info = getModeByEnum(p.mode as TransportModeKey);
                      return (
                        <li key={p.id}>
                          <Link
                            href={`/postings/${p.id}`}
                            className="group relative block rounded-[1.5rem] bg-white/80 backdrop-blur-md border border-white p-5 sm:p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 hover:bg-white"
                          >
                            <div className="flex items-start gap-4">
                              {/* Mode emoji avatar */}
                              <span
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#FFFBF5] text-2xl shadow-sm"
                                aria-hidden="true"
                              >
                                {info?.emoji ?? "📦"}
                              </span>

                              {/* Body */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-[15px] sm:text-[16px] font-display font-bold text-[#1D1D1F] truncate">
                                    {p.title}
                                  </h3>
                                  {p.isUrgent && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FF7A59] px-2.5 py-0.5 text-[10px] font-bold text-white">
                                      <Flame className="h-2.5 w-2.5" aria-hidden="true" />
                                      URGENT
                                    </span>
                                  )}
                                  {p.isHazmat && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFB020]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#8C5E00]">
                                      <AlertTriangle className="h-2.5 w-2.5" aria-hidden="true" />
                                      HAZMAT
                                    </span>
                                  )}
                                  {p.isFragile && (
                                    <span className="inline-flex items-center rounded-full bg-[#FF6B9D]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#A0336A]">
                                      FRAGILE
                                    </span>
                                  )}
                                  {p.isOversized && (
                                    <span className="inline-flex items-center rounded-full bg-[#007AFF]/12 px-2.5 py-0.5 text-[10px] font-bold text-[#0055D4]">
                                      OVERSIZED
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-[11px] text-[#1D1D1F]/50 font-semibold uppercase tracking-wider">
                                  {p.mode.replace(/_/g, " ")}
                                  {p.customer.city && ` · ${p.customer.city}`}
                                </p>

                                <p className="mt-2.5 text-[13px] text-[#1D1D1F]/65 leading-relaxed line-clamp-2">
                                  {p.description}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[#1D1D1F]/55">
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFBF5] border border-[#1D1D1F]/5 px-2.5 py-1">
                                    <MapPin className="h-3 w-3 text-[#FF7A59]" aria-hidden="true" />
                                    <span className="font-semibold text-[#1D1D1F]/80">
                                      {p.originAddress.split(",")[0]}
                                    </span>
                                    <span className="text-[#1D1D1F]/30">→</span>
                                    <span className="font-semibold text-[#1D1D1F]/80">
                                      {p.destinationAddress.split(",")[0]}
                                    </span>
                                  </span>
                                  <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3 text-[#007AFF]" aria-hidden="true" />
                                    {new Date(p.pickupDate).toLocaleDateString()}
                                  </span>
                                  <span className="inline-flex items-center gap-1.5">
                                    <Package className="h-3 w-3 text-[#34C759]" aria-hidden="true" />
                                    {p._count.bids} bid{p._count.bids === 1 ? "" : "s"}
                                  </span>
                                  <span className="text-[#1D1D1F]/35">
                                    · {relativeTime(p.createdAt)}
                                  </span>
                                </div>
                              </div>

                              {/* Budget */}
                              <div className="hidden sm:block flex-shrink-0 text-right">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F]/40">
                                  Budget
                                </p>
                                <p className="mt-1 text-2xl font-display font-black text-[#1D1D1F] tabular-nums">
                                  ${Number(p.budgetUsd).toLocaleString()}
                                </p>
                                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#1D1D1F] px-4 py-1.5 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#007AFF] translate-y-1 group-hover:translate-y-0 transition-all">
                                  Place a bid
                                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                </span>
                              </div>
                            </div>

                            {/* Mobile budget */}
                            <div className="mt-3 flex items-center justify-between sm:hidden">
                              <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1D1D1F]/40">
                                  Budget
                                </p>
                                <p className="text-xl font-display font-black text-[#1D1D1F] tabular-nums">
                                  ${Number(p.budgetUsd).toLocaleString()}
                                </p>
                              </div>
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#1D1D1F] px-4 py-1.5 text-[11px] font-semibold text-white">
                                Place a bid
                                <ArrowRight className="h-3 w-3" aria-hidden="true" />
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
