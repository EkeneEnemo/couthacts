/**
 * Corridors = curated (origin, destination) city pairs per "vertical".
 *
 * We serve programmatic SEO pages per vertical:
 *   /move/[slug]       — residential & commercial moves
 *   /freight/[slug]    — truckload freight
 *   /courier/[slug]    — same-day courier / last mile
 *   /airport-transfer/[slug] — taxi / black-car to-from airport
 *
 * Slug format: `${origin}-to-${destination}` (e.g. "dallas-to-houston").
 * Airport transfer slug: `${city}-[to|from]-${iata}` (e.g. "london-to-lhr").
 *
 * The curated lists here are deliberately high-quality rather than exhaustive:
 * we indexed for real search demand (US intrastate + top international lanes
 * for freight and moving; intra-metro for courier; major airports only).
 * New corridors can be added without code changes elsewhere.
 */

import { City, distanceKm, distanceMiles, getCity } from "@/lib/geo/cities";

export type Vertical = "move" | "freight" | "courier" | "airport-transfer";

export type CorridorVertical = Exclude<Vertical, "airport-transfer">;

export type Corridor = {
  slug: string;
  origin: City;
  destination: City;
  vertical: CorridorVertical;
  distanceKm: number;
  distanceMi: number;
};

export type AirportCorridor = {
  slug: string;
  city: City;
  iata: string;
  direction: "to" | "from";
};

function mkCorridor(
  originSlug: string,
  destSlug: string,
  vertical: CorridorVertical,
): Corridor | null {
  const o = getCity(originSlug);
  const d = getCity(destSlug);
  if (!o || !d) return null;
  return {
    slug: `${o.slug}-to-${d.slug}`,
    origin: o,
    destination: d,
    vertical,
    distanceKm: Math.round(distanceKm(o, d)),
    distanceMi: Math.round(distanceMiles(o, d)),
  };
}

// Long-distance movers — high-search-volume US lanes + top international relocations.
const MOVING_PAIRS: Array<[string, string]> = [
  ["new-york", "los-angeles"],
  ["new-york", "miami"],
  ["new-york", "chicago"],
  ["new-york", "boston"],
  ["new-york", "washington-dc"],
  ["los-angeles", "new-york"],
  ["los-angeles", "san-francisco"],
  ["los-angeles", "seattle"],
  ["los-angeles", "las-vegas"],
  ["los-angeles", "phoenix"],
  ["chicago", "new-york"],
  ["chicago", "dallas"],
  ["chicago", "atlanta"],
  ["chicago", "denver"],
  ["dallas", "houston"],
  ["dallas", "austin"],
  ["dallas", "denver"],
  ["dallas", "phoenix"],
  ["houston", "austin"],
  ["houston", "miami"],
  ["miami", "new-york"],
  ["miami", "atlanta"],
  ["atlanta", "washington-dc"],
  ["atlanta", "dallas"],
  ["san-francisco", "seattle"],
  ["san-francisco", "new-york"],
  ["seattle", "san-francisco"],
  ["boston", "new-york"],
  ["washington-dc", "new-york"],
  ["denver", "dallas"],
  ["phoenix", "los-angeles"],
  ["austin", "new-york"],
  // International relocations
  ["london", "new-york"],
  ["london", "dubai"],
  ["london", "paris"],
  ["paris", "london"],
  ["berlin", "london"],
  ["dubai", "london"],
  ["singapore", "london"],
  ["singapore", "sydney"],
  ["sydney", "singapore"],
  ["hong-kong", "singapore"],
  ["toronto", "new-york"],
  ["toronto", "vancouver"],
  ["sao-paulo", "new-york"],
  ["mumbai", "dubai"],
];

// Freight — high-volume truckload lanes (US DAT top lanes + global port pairs).
const FREIGHT_PAIRS: Array<[string, string]> = [
  ["los-angeles", "dallas"],
  ["los-angeles", "chicago"],
  ["los-angeles", "atlanta"],
  ["los-angeles", "new-york"],
  ["los-angeles", "seattle"],
  ["los-angeles", "phoenix"],
  ["chicago", "atlanta"],
  ["chicago", "dallas"],
  ["chicago", "los-angeles"],
  ["chicago", "new-york"],
  ["dallas", "los-angeles"],
  ["dallas", "chicago"],
  ["dallas", "atlanta"],
  ["dallas", "houston"],
  ["atlanta", "miami"],
  ["atlanta", "dallas"],
  ["atlanta", "chicago"],
  ["houston", "dallas"],
  ["houston", "atlanta"],
  ["miami", "atlanta"],
  ["new-york", "chicago"],
  ["new-york", "atlanta"],
  ["new-york", "los-angeles"],
  ["seattle", "los-angeles"],
  ["seattle", "chicago"],
  ["denver", "los-angeles"],
  ["denver", "chicago"],
  ["denver", "dallas"],
  ["phoenix", "los-angeles"],
  ["phoenix", "dallas"],
  // Cross-border
  ["toronto", "chicago"],
  ["toronto", "new-york"],
  ["montreal", "new-york"],
  ["mexico-city", "houston"],
  ["mexico-city", "dallas"],
  // International
  ["shanghai", "los-angeles"],
  ["shanghai", "singapore"],
  ["shenzhen", "los-angeles"],
  ["hong-kong", "los-angeles"],
];

// Courier — intra-metro and short-haul pairs (same-day / next-day).
const COURIER_PAIRS: Array<[string, string]> = [
  ["new-york", "philadelphia"],
  ["new-york", "boston"],
  ["new-york", "washington-dc"],
  ["los-angeles", "las-vegas"],
  ["san-francisco", "los-angeles"],
  ["dallas", "houston"],
  ["dallas", "austin"],
  ["miami", "atlanta"],
  ["atlanta", "miami"],
  ["london", "paris"],
  ["london", "amsterdam"],
  ["paris", "amsterdam"],
  ["berlin", "munich"],
  ["tokyo", "osaka"],
  ["hong-kong", "shenzhen"],
  ["singapore", "bangkok"],
  ["dubai", "abu-dhabi"],
  ["mumbai", "delhi"],
  ["mumbai", "bangalore"],
  ["sao-paulo", "rio-de-janeiro"],
];

// Airport transfer — top airports by passenger volume. Both directions covered.
const AIRPORT_CITIES: Array<{ city: string; iata: string }> = [
  { city: "new-york", iata: "JFK" },
  { city: "new-york", iata: "LGA" },
  { city: "new-york", iata: "EWR" },
  { city: "los-angeles", iata: "LAX" },
  { city: "chicago", iata: "ORD" },
  { city: "dallas", iata: "DFW" },
  { city: "houston", iata: "IAH" },
  { city: "atlanta", iata: "ATL" },
  { city: "miami", iata: "MIA" },
  { city: "san-francisco", iata: "SFO" },
  { city: "seattle", iata: "SEA" },
  { city: "boston", iata: "BOS" },
  { city: "washington-dc", iata: "IAD" },
  { city: "las-vegas", iata: "LAS" },
  { city: "denver", iata: "DEN" },
  { city: "london", iata: "LHR" },
  { city: "london", iata: "LGW" },
  { city: "paris", iata: "CDG" },
  { city: "frankfurt", iata: "FRA" },
  { city: "amsterdam", iata: "AMS" },
  { city: "madrid", iata: "MAD" },
  { city: "rome", iata: "FCO" },
  { city: "istanbul", iata: "IST" },
  { city: "dubai", iata: "DXB" },
  { city: "doha", iata: "DOH" },
  { city: "tokyo", iata: "HND" },
  { city: "tokyo", iata: "NRT" },
  { city: "seoul", iata: "ICN" },
  { city: "singapore", iata: "SIN" },
  { city: "hong-kong", iata: "HKG" },
  { city: "bangkok", iata: "BKK" },
  { city: "mumbai", iata: "BOM" },
  { city: "delhi", iata: "DEL" },
  { city: "sydney", iata: "SYD" },
  { city: "sao-paulo", iata: "GRU" },
  { city: "mexico-city", iata: "MEX" },
  { city: "toronto", iata: "YYZ" },
  { city: "johannesburg", iata: "JNB" },
  { city: "lagos", iata: "LOS" },
];

function buildCorridors(pairs: Array<[string, string]>, vertical: CorridorVertical): Corridor[] {
  const out: Corridor[] = [];
  for (const [o, d] of pairs) {
    const c = mkCorridor(o, d, vertical);
    if (c) out.push(c);
  }
  return out;
}

function buildAirportCorridors(): AirportCorridor[] {
  const out: AirportCorridor[] = [];
  for (const { city, iata } of AIRPORT_CITIES) {
    const c = getCity(city);
    if (!c) continue;
    out.push({ slug: `${c.slug}-to-${iata.toLowerCase()}`, city: c, iata, direction: "to" });
    out.push({ slug: `${iata.toLowerCase()}-to-${c.slug}`, city: c, iata, direction: "from" });
  }
  return out;
}

export const MOVING_CORRIDORS: Corridor[] = buildCorridors(MOVING_PAIRS, "move");
export const FREIGHT_CORRIDORS: Corridor[] = buildCorridors(FREIGHT_PAIRS, "freight");
export const COURIER_CORRIDORS: Corridor[] = buildCorridors(COURIER_PAIRS, "courier");
export const AIRPORT_CORRIDORS: AirportCorridor[] = buildAirportCorridors();

const VERTICAL_INDEX: Record<Exclude<Vertical, "airport-transfer">, Map<string, Corridor>> = {
  move: new Map(MOVING_CORRIDORS.map((c) => [c.slug, c])),
  freight: new Map(FREIGHT_CORRIDORS.map((c) => [c.slug, c])),
  courier: new Map(COURIER_CORRIDORS.map((c) => [c.slug, c])),
};

const AIRPORT_INDEX = new Map(AIRPORT_CORRIDORS.map((c) => [c.slug, c]));

export function getCorridor(
  vertical: Exclude<Vertical, "airport-transfer">,
  slug: string,
): Corridor | undefined {
  return VERTICAL_INDEX[vertical].get(slug);
}

export function getAirportCorridor(slug: string): AirportCorridor | undefined {
  return AIRPORT_INDEX.get(slug);
}

export function listCorridors(vertical: Exclude<Vertical, "airport-transfer">): Corridor[] {
  return Array.from(VERTICAL_INDEX[vertical].values());
}

export function listAirportCorridors(): AirportCorridor[] {
  return AIRPORT_CORRIDORS;
}

export function findSimilarCorridors(
  corridor: Corridor,
  limit = 4,
): Corridor[] {
  const pool = listCorridors(corridor.vertical);
  return pool
    .filter((c) => c.slug !== corridor.slug)
    .filter((c) => c.origin.slug === corridor.origin.slug || c.destination.slug === corridor.destination.slug)
    .slice(0, limit);
}

export function listCorridorsFromCity(vertical: Exclude<Vertical, "airport-transfer">, citySlug: string): Corridor[] {
  return listCorridors(vertical).filter((c) => c.origin.slug === citySlug);
}

/**
 * Rough "from" price indicator, in USD. This is purposely conservative — a
 * distance-times-rate heuristic used only for meta descriptions, JSON-LD
 * `priceRange`, and "from $X" copy. A real quote is generated by QuoteEngine.
 */
export function ballparkUsd(corridor: Corridor): { from: number; to: number } {
  const rates: Record<Vertical, { base: number; perMi: number }> = {
    move: { base: 450, perMi: 0.9 },
    freight: { base: 325, perMi: 2.4 },
    courier: { base: 35, perMi: 0.6 },
    "airport-transfer": { base: 55, perMi: 1.8 },
  };
  const r = rates[corridor.vertical];
  const mid = r.base + r.perMi * corridor.distanceMi;
  return { from: Math.round(mid * 0.75), to: Math.round(mid * 1.45) };
}

/** Used only by lanes of `airport-transfer` vertical. */
export function ballparkAirportUsd(distanceMi: number): { from: number; to: number } {
  const mid = 45 + 1.6 * Math.max(5, distanceMi);
  return { from: Math.round(mid * 0.8), to: Math.round(mid * 1.4) };
}
