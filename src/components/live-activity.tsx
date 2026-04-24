"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Live activity ticker. Rotates through recent platform events (posted /
 * booked / delivered) to convey liveness and trust.
 *
 * The API returns anonymized events only — no names, no dollar amounts.
 */
type Event = {
  id: string;
  type: "POSTED" | "BOOKED" | "DELIVERED";
  mode: string;
  origin: string;
  destination: string;
  at: string;
};

const VERB: Record<Event["type"], string> = {
  POSTED: "posted",
  BOOKED: "booked",
  DELIVERED: "delivered",
};

const EMOJI: Record<string, string> = {
  TAXI_RIDE: "🚕",
  LIMOUSINE: "🚘",
  COURIER_LAST_MILE: "📦",
  MOVING: "🏡",
  FREIGHT_TRUCKING: "🚚",
  HEAVY_HAUL: "🏗️",
  ARMORED: "🛡️",
  MEDICAL: "🚑",
  PRIVATE_JET: "✈️",
  HELICOPTER: "🚁",
  COMMERCIAL_AIRLINE: "🛫",
  AIR_CARGO: "📦",
  CARGO_SHIP: "🚢",
  YACHT_CHARTER: "⛵",
  FERRY: "⛴️",
  FREIGHT_RAIL: "🚂",
  HAZMAT: "☢️",
  OVERSIZED_CARGO: "🏗️",
};

const DOT: Record<Event["type"], string> = {
  POSTED: "#FF7A59",
  BOOKED: "#007AFF",
  DELIVERED: "#34C759",
};

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

function modeLabel(mode: string): string {
  return mode
    .toLowerCase()
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function LiveActivity({ limit = 12 }: { limit?: number }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch(`/api/activity?limit=${limit}`, { cache: "no-store" });
        const d = await r.json();
        if (!cancelled) setEvents(d.events ?? []);
      } catch {
        /* ignore */
      }
    }
    load();
    const poll = setInterval(load, 45_000);
    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, [limit]);

  useEffect(() => {
    if (events.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % events.length), 4000);
    return () => clearInterval(t);
  }, [events.length]);

  if (events.length === 0) {
    return (
      <div className="rounded-full bg-white/70 backdrop-blur border border-white px-4 py-2 text-[12px] text-[#1D1D1F]/50">
        Loading live activity…
      </div>
    );
  }

  const current = events[idx % events.length];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Recent platform activity"
      className="inline-flex max-w-full items-center gap-3 rounded-full bg-white/80 backdrop-blur border border-white pl-2 pr-4 py-1.5 shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFFBF5] text-sm">
        {EMOJI[current.mode] ?? "📦"}
      </span>
      <span
        className="relative flex h-2 w-2 flex-shrink-0"
        aria-hidden="true"
      >
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ backgroundColor: DOT[current.type] }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: DOT[current.type] }}
        />
      </span>
      <span className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-[#1D1D1F]/80 truncate">
        <span className="font-semibold text-[#1D1D1F]">{modeLabel(current.mode)}</span>
        <span className="text-[#1D1D1F]/50">{VERB[current.type]}</span>
        <span className="font-semibold text-[#1D1D1F]">
          {current.origin}
          <span className="text-[#1D1D1F]/30"> → </span>
          {current.destination}
        </span>
        <span className="text-[#1D1D1F]/40 hidden sm:inline">· {relativeTime(current.at)}</span>
      </span>
      <Link
        href="/browse"
        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#007AFF] hover:text-[#0055D4] ml-1"
      >
        See all <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
