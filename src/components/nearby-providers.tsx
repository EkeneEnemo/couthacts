"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

/**
 * Anonymized "N providers active near you" badge. Reads the viewer's city
 * from their authenticated session; falls back to a mode-only count if
 * unauthenticated or no city is set.
 */
export function NearbyProviders({
  mode,
  city,
  country,
  variant = "pill",
}: {
  mode?: string;
  city?: string;
  country?: string;
  variant?: "pill" | "inline";
}) {
  const [count, setCount] = useState<number | null>(null);
  const [resolvedCity, setResolvedCity] = useState<string | null>(city ?? null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMe(): Promise<{ city?: string | null; country?: string | null }> {
      try {
        const r = await fetch("/api/auth", { cache: "no-store" });
        const d = await r.json();
        return { city: d?.user?.city, country: d?.user?.country };
      } catch {
        return {};
      }
    }

    async function run() {
      let resolved = { city: city ?? null, country: country ?? null };
      if (!resolved.city && !resolved.country) {
        const me = await fetchMe();
        resolved = { city: me.city ?? null, country: me.country ?? null };
        if (!cancelled && me.city) setResolvedCity(me.city);
      }

      const qs = new URLSearchParams();
      if (mode) qs.set("mode", mode);
      if (resolved.city) qs.set("city", resolved.city);
      if (resolved.country) qs.set("country", resolved.country);

      try {
        const r = await fetch(`/api/providers/nearby?${qs.toString()}`, { cache: "no-store" });
        const d = await r.json();
        if (!cancelled) setCount(typeof d?.count === "number" ? d.count : null);
      } catch {
        /* ignore */
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [mode, city, country]);

  if (count == null || count === 0) return null;

  const label = resolvedCity
    ? `${count.toLocaleString()} ${count === 1 ? "provider" : "providers"} active near ${resolvedCity}`
    : `${count.toLocaleString()} verified ${count === 1 ? "provider" : "providers"} active now`;

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] text-[#1D1D1F]/55">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34C759]" />
        </span>
        {label}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-white px-4 py-1.5 shadow-sm">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34C759]/15 text-[#34C759]">
        <Users className="h-3 w-3" aria-hidden="true" />
      </span>
      <span className="text-[12px] font-semibold text-[#1D1D1F]/70">{label}</span>
    </div>
  );
}
