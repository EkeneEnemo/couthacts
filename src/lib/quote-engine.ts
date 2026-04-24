import { TransportMode } from "@prisma/client";

/**
 * QuoteEngine — instant price estimation.
 *
 * The engine is deliberately provider-agnostic: a distance-matrix function
 * is injected so we can swap OSRM/Google/Mapbox without touching callers.
 * Falls back to straight-line haversine distance if no matrix is supplied.
 *
 * This is a pricing *estimator* — not a commitment. Real quotes come from
 * provider bids. The engine powers:
 *   - the `/instant` page's "from $X" headline
 *   - corridor page ballparks (via a precomputed lane rate card)
 *   - posting-form budget suggestions
 *
 * Pricing model per mode:
 *   final = (base + perMile·miles + perPound·weight) × surgeMultiplier
 * constrained by `minimum`. Temperature control, hazmat, fragile, and
 * oversize flags apply multiplicative surcharges.
 */

export type LatLng = { lat: number; lng: number };

export type DistanceMatrix = (from: LatLng, to: LatLng) => Promise<{
  meters: number;
  /** travel time in seconds, optional */
  seconds?: number;
}>;

const EARTH_KM = 6371;
const KM_PER_MI = 1.60934;

function haversineMeters(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return EARTH_KM * 2 * Math.asin(Math.min(1, Math.sqrt(s))) * 1000;
}

export const haversineDistanceMatrix: DistanceMatrix = async (a, b) => ({
  meters: haversineMeters(a, b),
});

export type RateCard = {
  base: number;
  perMile: number;
  perPound: number;
  minimum: number;
  typicalSurge: number;
};

/**
 * Conservative, public-facing rate cards per transport mode. These are
 * estimation defaults — provider bids are authoritative.
 *
 * Sources: DAT lane averages (freight), industry surveys (moving, courier),
 * ARG/US fleet data (private jet), tariff boards (yacht, ferry).
 */
export const RATE_CARDS: Record<TransportMode, RateCard> = {
  TAXI_RIDE:          { base: 3.5, perMile: 2.4, perPound: 0,    minimum: 12,  typicalSurge: 1.0 },
  LIMOUSINE:          { base: 45,  perMile: 3.5, perPound: 0,    minimum: 95,  typicalSurge: 1.0 },
  COURIER_LAST_MILE:  { base: 8,   perMile: 0.9, perPound: 0.1,  minimum: 15,  typicalSurge: 1.0 },
  MOVING:             { base: 325, perMile: 0.85, perPound: 0.12, minimum: 275, typicalSurge: 1.0 },
  FREIGHT_TRUCKING:   { base: 250, perMile: 2.35, perPound: 0,   minimum: 400, typicalSurge: 1.0 },
  HEAVY_HAUL:         { base: 850, perMile: 3.2, perPound: 0,    minimum: 1200, typicalSurge: 1.1 },
  ARMORED:            { base: 450, perMile: 4.5, perPound: 0,    minimum: 650, typicalSurge: 1.05 },
  MEDICAL:            { base: 325, perMile: 2.1, perPound: 0,    minimum: 425, typicalSurge: 1.0 },
  PRIVATE_JET:        { base: 4500, perMile: 6.5, perPound: 0,   minimum: 8500, typicalSurge: 1.15 },
  HELICOPTER:         { base: 1800, perMile: 12, perPound: 0,    minimum: 3200, typicalSurge: 1.2 },
  COMMERCIAL_AIRLINE: { base: 85,  perMile: 0.32, perPound: 0,   minimum: 95,  typicalSurge: 1.0 },
  AIR_CARGO:          { base: 650, perMile: 0.55, perPound: 1.9, minimum: 900, typicalSurge: 1.1 },
  CARGO_SHIP:         { base: 1500, perMile: 0.18, perPound: 0.08, minimum: 1850, typicalSurge: 1.0 },
  YACHT_CHARTER:      { base: 4200, perMile: 3.5, perPound: 0,   minimum: 6500, typicalSurge: 1.0 },
  FERRY:              { base: 35,  perMile: 0.6, perPound: 0,    minimum: 45,  typicalSurge: 1.0 },
  FREIGHT_RAIL:       { base: 1400, perMile: 1.1, perPound: 0.05, minimum: 1850, typicalSurge: 1.0 },
  HAZMAT:             { base: 550, perMile: 3.1, perPound: 0,    minimum: 750, typicalSurge: 1.15 },
  OVERSIZED_CARGO:    { base: 950, perMile: 3.8, perPound: 0,    minimum: 1400, typicalSurge: 1.1 },
};

/** Multiplicative surcharges for special cargo attributes. */
const SURCHARGE = {
  temperatureControlled: 1.18,
  hazmat: 1.35,
  fragile: 1.08,
  oversized: 1.22,
  liveAnimals: 1.25,
  urgent: 1.25,
};

export type QuoteInput = {
  mode: TransportMode;
  origin: LatLng;
  destination: LatLng;
  weightKg?: number;
  attributes?: {
    temperatureControlled?: boolean;
    hazmat?: boolean;
    fragile?: boolean;
    oversized?: boolean;
    liveAnimals?: boolean;
    urgent?: boolean;
  };
  /** Surge multiplier for live demand, e.g. 1.25 during peak. Defaults to rate-card typical. */
  surgeMultiplier?: number;
  /** If false, use haversine; otherwise the provided distance matrix. */
  distanceMatrix?: DistanceMatrix;
};

export type QuoteResult = {
  mode: TransportMode;
  currency: "USD";
  /** Low end of the price band (provider-friendly). */
  low: number;
  /** Mid-point suggested quote. */
  mid: number;
  /** High end (premium / surge). */
  high: number;
  distance: {
    meters: number;
    kilometers: number;
    miles: number;
  };
  breakdown: {
    base: number;
    distanceCost: number;
    weightCost: number;
    surcharges: number;
    surgeMultiplier: number;
    minimum: number;
  };
};

function round(n: number): number {
  // Round to nearest $5 for readability — people trust "from $485" less than "$486.34".
  return Math.round(n / 5) * 5;
}

export async function getQuote(input: QuoteInput): Promise<QuoteResult> {
  const card = RATE_CARDS[input.mode];
  if (!card) throw new Error(`No rate card for mode ${input.mode}`);

  const matrix = input.distanceMatrix ?? haversineDistanceMatrix;
  const { meters } = await matrix(input.origin, input.destination);
  const km = meters / 1000;
  const mi = km / KM_PER_MI;

  const weightLb = (input.weightKg ?? 0) * 2.2046;
  const distanceCost = card.perMile * mi;
  const weightCost = card.perPound * weightLb;

  let surchargeMultiplier = 1;
  if (input.attributes?.temperatureControlled) surchargeMultiplier *= SURCHARGE.temperatureControlled;
  if (input.attributes?.hazmat) surchargeMultiplier *= SURCHARGE.hazmat;
  if (input.attributes?.fragile) surchargeMultiplier *= SURCHARGE.fragile;
  if (input.attributes?.oversized) surchargeMultiplier *= SURCHARGE.oversized;
  if (input.attributes?.liveAnimals) surchargeMultiplier *= SURCHARGE.liveAnimals;
  if (input.attributes?.urgent) surchargeMultiplier *= SURCHARGE.urgent;

  const surge = input.surgeMultiplier ?? card.typicalSurge;

  const raw = (card.base + distanceCost + weightCost) * surchargeMultiplier * surge;
  const mid = Math.max(card.minimum, raw);
  const low = Math.max(card.minimum, mid * 0.82);
  const high = mid * 1.35;

  return {
    mode: input.mode,
    currency: "USD",
    low: round(low),
    mid: round(mid),
    high: round(high),
    distance: {
      meters: Math.round(meters),
      kilometers: Math.round(km * 10) / 10,
      miles: Math.round(mi * 10) / 10,
    },
    breakdown: {
      base: card.base,
      distanceCost: Math.round(distanceCost * 100) / 100,
      weightCost: Math.round(weightCost * 100) / 100,
      surcharges: Math.round((surchargeMultiplier - 1) * 100),
      surgeMultiplier: surge,
      minimum: card.minimum,
    },
  };
}
