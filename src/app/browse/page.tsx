"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { TRANSPORT_CATEGORIES } from "@/lib/transport-modes";
import {
  Search,
  MapPin,
  Calendar,
  AlertTriangle,
  Package,
  Filter,
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
  { value: "newest", label: "Newest first" },
  { value: "budget_high", label: "Highest budget" },
  { value: "budget_low", label: "Lowest budget" },
  { value: "pickup_soon", label: "Pickup soonest" },
];

const ALL_MODES = TRANSPORT_CATEGORIES.flatMap((c) => c.modes);

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

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-ocean-900">
              Browse Jobs
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Find open transportation jobs and place bids
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-white transition lg:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {/* Filters sidebar */}
          <div
            className={`space-y-6 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            {/* Sort */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-ocean-800 mb-3">
                Sort by
              </h3>
              <div className="space-y-1">
                {SORT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 text-sm cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="sort"
                      checked={sort === opt.value}
                      onChange={() => setSort(opt.value)}
                      className="accent-ocean-600"
                    />
                    <span className="text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transport mode filter */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-ocean-800 mb-3">
                Transport mode
              </h3>
              <button
                onClick={() => setMode("")}
                className={`block w-full text-left rounded-lg px-3 py-1.5 text-sm transition ${
                  !mode
                    ? "bg-ocean-50 text-ocean-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All modes
              </button>
              <div className="mt-2 max-h-64 overflow-y-auto space-y-0.5">
                {ALL_MODES.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`block w-full text-left rounded-lg px-3 py-1.5 text-sm transition ${
                      mode === m.key
                        ? "bg-ocean-50 text-ocean-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgent toggle */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={urgentOnly}
                  onChange={(e) => setUrgentOnly(e.target.checked)}
                  className="accent-ocean-600"
                />
                <span className="text-gray-700">Urgent jobs only</span>
              </label>
            </div>
          </div>

          {/* Job listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-32 animate-pulse rounded-2xl bg-white border border-gray-100"
                  />
                ))}
              </div>
            ) : postings.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
                <Search className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">
                  No open jobs match your filters.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {postings.map((p) => (
                  <Link
                    key={p.id}
                    href={`/postings/${p.id}`}
                    className="block rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-ocean-800">
                            {p.title}
                          </h3>
                          {p.isUrgent && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                              Urgent
                            </span>
                          )}
                          {p.isHazmat && (
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                          )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {p.mode.replace(/_/g, " ")} &middot;{" "}
                          {p.customer.firstName} {p.customer.lastName}
                          {p.customer.city && ` &middot; ${p.customer.city}`}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {p.description}
                        </p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="text-lg font-display font-bold text-ocean-700">
                          ${Number(p.budgetUsd).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">budget</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {p.originAddress.split(",")[0]} →{" "}
                        {p.destinationAddress.split(",")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(p.pickupDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {p._count.bids} bid{p._count.bids !== 1 && "s"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
