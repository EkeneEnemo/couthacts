/**
 * Natural-language search intent parser.
 *
 * Takes a free-form query like "move a 2BR from Dallas to Houston next
 * Tuesday" and produces a structured `SearchIntent`:
 *   { mode, origin, destination, pickupOn, passengerCount, weightHint, flags }
 *
 * Rules-based by design — no LLM cost, works offline, predictable.
 * The extractor is conservative: if we aren't confident, we leave the
 * field `undefined` rather than hallucinating.
 *
 * Extension path: the top-level `parseSearchIntent()` function is the
 * only interface. A future LLM-backed parser can implement the same
 * contract behind a feature flag.
 */

import { TransportMode } from "@prisma/client";
import { CITIES } from "@/lib/geo/cities";

export type SearchIntent = {
  raw: string;
  mode?: TransportMode;
  origin?: string;
  destination?: string;
  pickupOn?: string; // ISO date string (day-only, e.g. "2026-05-06")
  weightKgHint?: number;
  passengerCount?: number;
  flags: {
    urgent: boolean;
    temperatureControlled: boolean;
    hazmat: boolean;
    fragile: boolean;
    oversized: boolean;
    liveAnimals: boolean;
  };
};

type ModeRule = { mode: TransportMode; keywords: RegExp };

const MODE_RULES: ModeRule[] = [
  { mode: "TAXI_RIDE",         keywords: /\b(taxi|cab|ride|uber|lyft|airport transfer)\b/i },
  { mode: "LIMOUSINE",         keywords: /\b(limo|limousine|chauffeur|black ?car|wedding car)\b/i },
  { mode: "COURIER_LAST_MILE", keywords: /\b(courier|same[- ]day|last[- ]mile|parcel|package|document|letter)\b/i },
  { mode: "MOVING",            keywords: /\b(moving|movers|relocat|apartment|studio|\d+br|2[ -]?bed|3[ -]?bed|household|house move)\b/i },
  { mode: "FREIGHT_TRUCKING",  keywords: /\b(freight|ftl|ltl|trucking|truckload|pallet|drayage)\b/i },
  { mode: "HEAVY_HAUL",        keywords: /\b(heavy haul|oversize (truck|load)|turbine|transformer|crane)\b/i },
  { mode: "ARMORED",           keywords: /\b(armored|armoured|cash[- ]in[- ]transit|bullion)\b/i },
  { mode: "MEDICAL",           keywords: /\b(medical|ambulance|patient transport|organ|specimen|lab sample)\b/i },
  { mode: "PRIVATE_JET",       keywords: /\b(private jet|charter flight|light jet|mid[- ]size jet|heavy jet|gulfstream|citation)\b/i },
  { mode: "HELICOPTER",        keywords: /\b(heli|helicopter|rotorcraft|chopper)\b/i },
  { mode: "AIR_CARGO",         keywords: /\b(air cargo|air freight|freighter|aog|dedicated freighter)\b/i },
  { mode: "COMMERCIAL_AIRLINE",keywords: /\b(belly cargo|commercial airline|scheduled flight|awb)\b/i },
  { mode: "CARGO_SHIP",        keywords: /\b(ocean freight|container|fcl|lcl|sea freight|bulk vessel)\b/i },
  { mode: "YACHT_CHARTER",     keywords: /\b(yacht|sailing|day charter|bareboat|superyacht)\b/i },
  { mode: "FERRY",             keywords: /\b(ferry|ro ?ro)\b/i },
  { mode: "FREIGHT_RAIL",      keywords: /\b(rail|train freight|boxcar|intermodal)\b/i },
  { mode: "HAZMAT",            keywords: /\b(hazmat|dangerous goods|class 3|class 9|ttonner)\b/i },
  { mode: "OVERSIZED_CARGO",   keywords: /\b(oversized|over-dimensional|break[- ]bulk)\b/i },
];

function detectMode(text: string): TransportMode | undefined {
  for (const rule of MODE_RULES) {
    if (rule.keywords.test(text)) return rule.mode;
  }
  return undefined;
}

// Matches: "from X to Y" | "X to Y" | "X -> Y" | "X → Y"
const FROM_TO_REGEXES: RegExp[] = [
  /\bfrom\s+([A-Z][a-zA-ZÀ-ɏ][a-zA-ZÀ-ɏ .'-]{1,40})\s+to\s+([A-Z][a-zA-ZÀ-ɏ][a-zA-ZÀ-ɏ .'-]{1,40})\b/,
  /\b([A-Z][a-zA-ZÀ-ɏ][a-zA-ZÀ-ɏ .'-]{1,40})\s+(?:to|->|→|–)\s+([A-Z][a-zA-ZÀ-ɏ][a-zA-ZÀ-ɏ .'-]{1,40})\b/,
];

function detectOriginDestination(text: string): { origin?: string; destination?: string } {
  for (const re of FROM_TO_REGEXES) {
    const m = text.match(re);
    if (m) {
      return {
        origin: m[1].trim().replace(/[,.]$/, ""),
        destination: m[2].trim().replace(/[,.]$/, ""),
      };
    }
  }

  // Fallback: match cities from our curated list directly. If we find two,
  // assume the first is origin and the second is destination.
  const lower = text.toLowerCase();
  const matches: string[] = [];
  for (const c of CITIES) {
    const name = c.name.toLowerCase();
    if (lower.includes(name) && !matches.some((m) => m.toLowerCase() === name)) {
      matches.push(c.name);
      if (matches.length === 2) break;
    }
  }
  if (matches.length === 2) {
    return { origin: matches[0], destination: matches[1] };
  }
  return {};
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const WEEKDAYS: Record<string, number> = {
  sunday: 0, sun: 0,
  monday: 1, mon: 1,
  tuesday: 2, tue: 2, tues: 2,
  wednesday: 3, wed: 3,
  thursday: 4, thu: 4, thur: 4, thurs: 4,
  friday: 5, fri: 5,
  saturday: 6, sat: 6,
};

/**
 * Parses phrases like "today", "tomorrow", "next Tuesday", "this Friday",
 * "in 3 days". Returns null if no date phrase is found.
 */
function detectPickupDate(text: string, now = new Date()): Date | null {
  const lower = text.toLowerCase();
  if (/\btoday\b/.test(lower)) return now;
  if (/\btomorrow\b/.test(lower)) return addDays(now, 1);

  const inDays = lower.match(/\bin\s+(\d{1,2})\s+days?\b/);
  if (inDays) return addDays(now, Math.min(90, Number(inDays[1])));

  const nextDay = lower.match(/\b(?:next|this)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|tues|wed|thu|thur|thurs|fri|sat)\b/);
  if (nextDay) {
    const target = WEEKDAYS[nextDay[1]];
    if (target !== undefined) {
      const current = now.getDay();
      let diff = target - current;
      if (diff <= 0) diff += 7;
      if (nextDay[0].startsWith("next")) diff = diff <= 3 ? diff + 7 : diff;
      return addDays(now, diff);
    }
  }

  // Standalone weekday name: "Tuesday" → next Tuesday.
  const bareDay = lower.match(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/);
  if (bareDay) {
    const target = WEEKDAYS[bareDay[1]];
    if (target !== undefined) {
      const current = now.getDay();
      let diff = target - current;
      if (diff <= 0) diff += 7;
      return addDays(now, diff);
    }
  }

  return null;
}

function detectWeight(text: string): number | undefined {
  const kg = text.match(/(\d{1,5}(?:\.\d+)?)\s*(?:kg|kilogram)/i);
  if (kg) return Number(kg[1]);
  const lb = text.match(/(\d{1,5}(?:\.\d+)?)\s*(?:lbs?|pound)/i);
  if (lb) return Number(lb[1]) / 2.2046;
  const tonnes = text.match(/(\d{1,4}(?:\.\d+)?)\s*(?:tonne|metric ton|t\b)/i);
  if (tonnes) return Number(tonnes[1]) * 1000;
  return undefined;
}

function detectPassengerCount(text: string): number | undefined {
  const m = text.match(/(\d{1,2})\s*(?:passenger|pax|people|person)/i);
  if (m) return Math.min(500, Number(m[1]));
  return undefined;
}

function detectFlags(text: string): SearchIntent["flags"] {
  const t = text.toLowerCase();
  return {
    urgent: /\b(urgent|asap|rush|emergency|today)\b/.test(t),
    temperatureControlled: /\b(reefer|refrigerat|cold[- ]chain|frozen|temperature[- ]controlled|chilled)\b/.test(t),
    hazmat: /\b(hazmat|dangerous goods|hazardous|class ?\d)\b/.test(t),
    fragile: /\b(fragile|glass|delicate|artwork|piano)\b/.test(t),
    oversized: /\b(oversized|over[- ]dimensional|wide load|tall load)\b/.test(t),
    liveAnimals: /\b(live animal|livestock|pet transport|horses)\b/.test(t),
  };
}

export function parseSearchIntent(query: string): SearchIntent {
  const raw = query.trim();
  const { origin, destination } = detectOriginDestination(raw);
  const date = detectPickupDate(raw);
  return {
    raw,
    mode: detectMode(raw),
    origin,
    destination,
    pickupOn: date ? date.toISOString().slice(0, 10) : undefined,
    weightKgHint: detectWeight(raw),
    passengerCount: detectPassengerCount(raw),
    flags: detectFlags(raw),
  };
}
