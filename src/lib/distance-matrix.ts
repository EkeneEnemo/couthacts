import type { LatLng, DistanceMatrix } from "@/lib/quote-engine";

/**
 * Distance matrix providers, behind a single interface.
 *
 * Why this abstraction:
 *   - We never want callers to import a specific vendor SDK.
 *   - Swapping providers (OSRM / Google / Mapbox / OpenRouteService)
 *     should be a single env var change.
 *   - In dev / no-key scenarios we gracefully fall back to haversine so
 *     the quote engine still returns sane estimates.
 *
 * Precedence (`selectDistanceMatrix()`):
 *   1. If `ORS_API_KEY` is set and the key looks valid, use OpenRouteService
 *      (free tier 2000 req/day, paid tiers scale globally).
 *   2. Otherwise use haversine (straight-line). Estimates ~15-25% short
 *      of real driving distance on most highway routes.
 *
 * When wiring a real driving-distance provider, set `ORS_API_KEY` in
 * Vercel env. No code changes needed elsewhere.
 */

import { haversineDistanceMatrix } from "@/lib/quote-engine";

/**
 * OpenRouteService `/directions/v2/driving-car` matrix endpoint.
 * Free tier: 2,000 req/day, 40 req/min. API key at:
 *   https://openrouteservice.org/
 */
function openRouteServiceMatrix(apiKey: string): DistanceMatrix {
  return async (from: LatLng, to: LatLng) => {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car";
    const body = {
      coordinates: [
        [from.lng, from.lat],
        [to.lng, to.lat],
      ],
      radiuses: [-1, -1], // snap anywhere — tolerant of approximate coords
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
      // Next caches route lookups for 1h — real-world driving distances
      // don't change minute-to-minute.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Graceful degradation: fall through to haversine if the upstream
      // hiccups (rate limit, transient 5xx, etc.).
      return haversineDistanceMatrix(from, to);
    }
    const data = await res.json();
    const summary = data?.routes?.[0]?.summary;
    if (!summary?.distance || !summary?.duration) {
      return haversineDistanceMatrix(from, to);
    }
    return {
      meters: Math.round(summary.distance),
      seconds: Math.round(summary.duration),
    };
  };
}

export function selectDistanceMatrix(): DistanceMatrix {
  const ors = process.env.ORS_API_KEY;
  if (ors && ors.length > 20) {
    return openRouteServiceMatrix(ors);
  }
  return haversineDistanceMatrix;
}

/**
 * Convenience: single-call helper used by the posting form and /instant
 * page. Picks the matrix provider for you.
 */
export async function estimateDistance(from: LatLng, to: LatLng) {
  const matrix = selectDistanceMatrix();
  return matrix(from, to);
}
