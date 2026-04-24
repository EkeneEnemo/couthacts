"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

type Intent = {
  mode?: string;
  origin?: string;
  destination?: string;
  pickupOn?: string;
};

/**
 * Natural-language search bar. Parses free-form queries like
 * "move 2BR from Dallas to Houston next Tuesday" via /api/search
 * and routes the user to the most-relevant landing page.
 *
 * Routing rules:
 *   - If we resolve mode + origin + destination → go to the matching
 *     corridor page (if one exists), otherwise /postings/new with
 *     the fields prefilled.
 *   - If we resolve only a mode → /services/<mode>.
 *   - Otherwise → /postings/new?intent=... (as raw text).
 */
export function SmartSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] = useState<Intent | null>(null);
  const [debounce, setDebounce] = useState<ReturnType<typeof setTimeout> | null>(null);

  function previewQuery(value: string) {
    if (debounce) clearTimeout(debounce);
    const t = setTimeout(async () => {
      if (!value.trim()) {
        setPreview(null);
        return;
      }
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(value)}`, { cache: "no-store" });
        const d = await r.json();
        setPreview(d?.intent ?? null);
      } catch {
        setPreview(null);
      }
    }, 180);
    setDebounce(t);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQ(v);
    previewQuery(v);
  }

  function slug(s: string) {
    return s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function chooseVerticalFor(mode?: string): string | null {
    if (!mode) return null;
    if (mode === "MOVING") return "move";
    if (mode === "FREIGHT_TRUCKING") return "freight";
    if (mode === "COURIER_LAST_MILE") return "courier";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;

    startTransition(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
        const d = await r.json();
        const i: Intent | null = d?.intent ?? null;

        if (i?.mode && i.origin && i.destination) {
          const vertical = chooseVerticalFor(i.mode);
          if (vertical) {
            router.push(`/${vertical}/${slug(i.origin)}-to-${slug(i.destination)}`);
            return;
          }
        }
        if (i?.mode) {
          const modeSlug = MODE_SLUGS[i.mode as keyof typeof MODE_SLUGS];
          if (modeSlug) {
            router.push(`/services/${modeSlug}`);
            return;
          }
        }
        // Fallback: post-a-job with intent prefilled.
        const params = new URLSearchParams();
        if (i?.mode) params.set("mode", i.mode);
        if (i?.origin) params.set("origin", i.origin);
        if (i?.destination) params.set("destination", i.destination);
        if (i?.pickupOn) params.set("pickup", i.pickupOn);
        params.set("q", q);
        router.push(`/postings/new?${params.toString()}`);
      } catch {
        router.push(`/postings/new?q=${encodeURIComponent(q)}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Smart search">
      <div className="flex items-stretch gap-2 rounded-full bg-white/90 backdrop-blur border border-[#1D1D1F]/10 px-2 py-1.5 shadow-[0_8px_30px_rgba(29,29,31,0.08)] transition-shadow focus-within:shadow-[0_12px_40px_rgba(0,122,255,0.18)] focus-within:border-[#007AFF]/40">
        <span className="flex items-center pl-3 text-[#1D1D1F]/40" aria-hidden="true">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="search"
          value={q}
          onChange={handleChange}
          placeholder="Tell us what you need — a taxi to LAX, movers to Miami, or a container to Rotterdam"
          className="flex-1 bg-transparent text-[14px] text-[#1D1D1F] placeholder:text-[#1D1D1F]/40 focus:outline-none"
          aria-label="Describe your transport need"
        />
        <button
          type="submit"
          disabled={pending || !q.trim()}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#007AFF] transition-colors disabled:opacity-50"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {pending ? "Thinking…" : "Find it"}
        </button>
      </div>

      {preview && (preview.mode || preview.origin || preview.destination) && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-white px-4 py-1.5 text-[12px] text-[#1D1D1F]/70 shadow-sm"
        >
          <Sparkles className="h-3 w-3 text-[#FFB020]" aria-hidden="true" />
          <span>
            I heard:
            {preview.mode && <> <span className="font-semibold text-[#1D1D1F]">{preview.mode.replace(/_/g, " ").toLowerCase()}</span></>}
            {preview.origin && <> · <span className="font-semibold text-[#1D1D1F]">{preview.origin}</span></>}
            {preview.destination && <> → <span className="font-semibold text-[#1D1D1F]">{preview.destination}</span></>}
            {preview.pickupOn && <> · {preview.pickupOn}</>}
          </span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </div>
      )}
    </form>
  );
}

const MODE_SLUGS = {
  TAXI_RIDE: "taxi",
  LIMOUSINE: "limousine",
  COURIER_LAST_MILE: "courier",
  MOVING: "moving",
  FREIGHT_TRUCKING: "freight",
  HEAVY_HAUL: "heavy-haul",
  ARMORED: "armored",
  MEDICAL: "medical",
  PRIVATE_JET: "private-jet",
  HELICOPTER: "helicopter",
  COMMERCIAL_AIRLINE: "airline-cargo",
  AIR_CARGO: "air-cargo",
  CARGO_SHIP: "cargo-ship",
  YACHT_CHARTER: "yacht-charter",
  FERRY: "ferry",
  FREIGHT_RAIL: "rail",
  HAZMAT: "hazmat",
  OVERSIZED_CARGO: "oversized",
} as const;
