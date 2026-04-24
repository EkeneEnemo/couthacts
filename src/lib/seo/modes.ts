/**
 * SEO-oriented metadata for the 18 transport modes.
 *
 * Each mode gets:
 * - slug: kebab-case URL segment used in /services/[mode] and /[vertical]/[corridor].
 * - enum: the Prisma TransportMode enum value (for joins/filters).
 * - label: human title-cased display name.
 * - emoji: single-char emoji used in our tile badge pattern.
 * - tagline: short marketing one-liner (≤80 chars).
 * - description: 1–2 sentence meta description for <meta name="description"> and hero subhead.
 * - useCases: bullet-friendly short phrases — what people typically move with this mode.
 * - image: Unsplash hero image URL (consistent with homepage photo system).
 * - imageAlt: alt text for accessibility.
 * - accent: brand hex used for accents on this mode's pages.
 * - category: one of "ground" | "air" | "maritime" | "rail" | "specialty".
 */

export type TransportModeKey =
  | "TAXI_RIDE"
  | "LIMOUSINE"
  | "COURIER_LAST_MILE"
  | "MOVING"
  | "FREIGHT_TRUCKING"
  | "HEAVY_HAUL"
  | "ARMORED"
  | "MEDICAL"
  | "PRIVATE_JET"
  | "HELICOPTER"
  | "COMMERCIAL_AIRLINE"
  | "AIR_CARGO"
  | "CARGO_SHIP"
  | "YACHT_CHARTER"
  | "FERRY"
  | "FREIGHT_RAIL"
  | "HAZMAT"
  | "OVERSIZED_CARGO";

export type ModeInfo = {
  slug: string;
  enum: TransportModeKey;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  useCases: string[];
  image: string;
  imageAlt: string;
  accent: string;
  category: "ground" | "air" | "maritime" | "rail" | "specialty";
};

export const MODES: ModeInfo[] = [
  {
    slug: "taxi",
    enum: "TAXI_RIDE",
    label: "Taxi & Rideshare",
    emoji: "🚕",
    tagline: "A real ride, a real driver, a real fare.",
    description:
      "Book verified taxi and rideshare drivers anywhere in the world. Transparent pricing, ID-verified drivers, and payments held in escrow until you arrive.",
    useCases: ["Airport pickups", "Around-town trips", "Late-night rides", "Chauffeured errands"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80",
    imageAlt: "Yellow taxis on a sunny city street",
    accent: "#FFB020",
    category: "ground",
  },
  {
    slug: "limousine",
    enum: "LIMOUSINE",
    label: "Limousine",
    emoji: "🚘",
    tagline: "Arrive like the day is about you.",
    description:
      "Licensed chauffeurs, black-car fleets, and luxury SUVs. Perfect for weddings, VIPs, and big nights out. Every ride is vetted and escrow-protected.",
    useCases: ["Weddings", "Corporate transfers", "Prom & galas", "Airport VIP"],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=80",
    imageAlt: "Black luxury limousine on city street",
    accent: "#1D1D1F",
    category: "ground",
  },
  {
    slug: "courier",
    enum: "COURIER_LAST_MILE",
    label: "Courier & Last-Mile",
    emoji: "📦",
    tagline: "Same-day, hand-to-hand, from anywhere.",
    description:
      "On-demand couriers for documents, parcels, and same-day last-mile delivery. Live GPS, photo proof, and PIN confirmation on every drop.",
    useCases: ["Documents & contracts", "E-commerce last mile", "Forgotten items", "Perishables"],
    image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=1600&q=80",
    imageAlt: "Stack of parcels on a bicycle courier",
    accent: "#FF7A59",
    category: "ground",
  },
  {
    slug: "moving",
    enum: "MOVING",
    label: "Moving",
    emoji: "🏡",
    tagline: "Residential and commercial moves, worldwide.",
    description:
      "Verified movers for studios, family homes, offices, and international relocations. Insured crews, flat quotes, and payments held until your last box is set down.",
    useCases: ["Local & long-distance", "International relocations", "Office moves", "Storage transfers"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    imageAlt: "Movers carrying boxes into a bright home",
    accent: "#34C759",
    category: "ground",
  },
  {
    slug: "freight",
    enum: "FREIGHT_TRUCKING",
    label: "Freight Trucking",
    emoji: "🚚",
    tagline: "LTL, FTL, reefer, and dry van — anywhere on the map.",
    description:
      "Thousands of licensed carriers competing for your load. Bid-or-book, real-time ELD tracking, and escrow that releases on delivery confirmation.",
    useCases: ["Dry van FTL", "LTL & partials", "Refrigerated", "Intermodal drayage"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80",
    imageAlt: "Freight truck on a highway at dusk",
    accent: "#007AFF",
    category: "ground",
  },
  {
    slug: "heavy-haul",
    enum: "HEAVY_HAUL",
    label: "Heavy Haul",
    emoji: "🏗️",
    tagline: "Permitted, pilot-car escorted, and insured to the ground.",
    description:
      "Oversize and overweight loads handled by specialized carriers. Permit management, route surveys, and escort vehicles baked in.",
    useCases: ["Construction equipment", "Wind turbine blades", "Modular homes", "Industrial machinery"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80",
    imageAlt: "Heavy haul truck transporting oversized machinery",
    accent: "#FFB020",
    category: "ground",
  },
  {
    slug: "armored",
    enum: "ARMORED",
    label: "Armored Transport",
    emoji: "🛡️",
    tagline: "Cash, art, and high-value cargo — with muscle.",
    description:
      "Licensed armored carriers with armed guards, GPS-hardened vehicles, and chain-of-custody documentation. Insurance limits to match.",
    useCases: ["Cash-in-transit", "Fine art", "Precious metals", "High-net-worth logistics"],
    image: "https://images.unsplash.com/photo-1544641900-f0f2c94d34e3?w=1600&q=80",
    imageAlt: "Armored security vehicle parked on a city street",
    accent: "#5A3A22",
    category: "specialty",
  },
  {
    slug: "medical",
    enum: "MEDICAL",
    label: "Medical Transport",
    emoji: "🚑",
    tagline: "Patients, organs, and lab specimens — on time, every time.",
    description:
      "Non-emergency medical transport, organ transfer, and cold-chain specimen delivery with temperature logging and HIPAA-aware handling.",
    useCases: ["Non-emergency patient transport", "Organ & tissue", "Specimen & lab", "Wheelchair van"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&q=80",
    imageAlt: "Medical transport van with red cross on the side",
    accent: "#FF6B6B",
    category: "specialty",
  },
  {
    slug: "private-jet",
    enum: "PRIVATE_JET",
    label: "Private Jet",
    emoji: "✈️",
    tagline: "On your schedule. On your terms. Anywhere with a runway.",
    description:
      "Charter light, mid, super-mid, or heavy jets with verified operators. ARG/US-ready crews, per-leg escrow, and transparent all-in pricing.",
    useCases: ["Business travel", "Weekend getaways", "Time-critical legs", "Team roadshows"],
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80",
    imageAlt: "Private jet parked on sunlit tarmac",
    accent: "#5AC8FA",
    category: "air",
  },
  {
    slug: "helicopter",
    enum: "HELICOPTER",
    label: "Helicopter",
    emoji: "🚁",
    tagline: "Skip traffic. Skip airports. Land where you need to be.",
    description:
      "City transfers, aerial tours, and offshore work with certified rotor operators. Pre-flight weather briefings and insured rotations.",
    useCases: ["City-to-airport", "Offshore / utility", "Aerial tours & film", "Medical evac"],
    image: "https://images.unsplash.com/photo-1534567110243-8875d64ca8ff?w=1600&q=80",
    imageAlt: "Helicopter hovering over a coastal helipad",
    accent: "#007AFF",
    category: "air",
  },
  {
    slug: "airline-cargo",
    enum: "COMMERCIAL_AIRLINE",
    label: "Commercial Airline",
    emoji: "🛫",
    tagline: "Scheduled belly cargo on passenger carriers, worldwide.",
    description:
      "Book belly space on scheduled passenger flights for time-sensitive cargo. IATA-compliant labeling and documentation handled end-to-end.",
    useCases: ["Time-sensitive cargo", "Cross-border parcels", "Perishables", "AOG parts"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
    imageAlt: "Airplane wing over clouds at sunset",
    accent: "#5AC8FA",
    category: "air",
  },
  {
    slug: "air-cargo",
    enum: "AIR_CARGO",
    label: "Air Cargo",
    emoji: "📦",
    tagline: "Dedicated freighters and charter lift, anywhere you need.",
    description:
      "Book 747F, 777F, or MD-11F freighters, or charter full aircraft for oversized and urgent freight. AWB, dangerous goods paperwork, and customs brokerage included.",
    useCases: ["Oversized air freight", "Full-aircraft charter", "Emergency parts", "Humanitarian"],
    image: "https://images.unsplash.com/photo-1525196984516-1f2ce86fe43a?w=1600&q=80",
    imageAlt: "Cargo aircraft being loaded at airport",
    accent: "#007AFF",
    category: "air",
  },
  {
    slug: "cargo-ship",
    enum: "CARGO_SHIP",
    label: "Cargo Ship",
    emoji: "🚢",
    tagline: "Containers, bulk, and breakbulk — ocean-wide.",
    description:
      "FCL and LCL ocean freight across 190+ countries. Booking, BOL management, and port-to-door coverage with verified NVOCCs and forwarders.",
    useCases: ["FCL container", "LCL consolidation", "Breakbulk", "Project cargo"],
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1600&q=80",
    imageAlt: "Container ship moving through open sea",
    accent: "#0F2440",
    category: "maritime",
  },
  {
    slug: "yacht-charter",
    enum: "YACHT_CHARTER",
    label: "Yacht Charter",
    emoji: "⛵",
    tagline: "Day charters, week-long escapes, crewed or bareboat.",
    description:
      "Motor yachts, sailing yachts, and superyachts with licensed captains and crew. Transparent APA, provisioning, and weather-adjusted itineraries.",
    useCases: ["Day charters", "Weekly crewed charters", "Corporate events", "Honeymoons"],
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1600&q=80",
    imageAlt: "Sailing yacht on calm blue water",
    accent: "#5AC8FA",
    category: "maritime",
  },
  {
    slug: "ferry",
    enum: "FERRY",
    label: "Ferry",
    emoji: "⛴️",
    tagline: "Passengers, vehicles, freight — from shore to shore.",
    description:
      "Scheduled and charter ferry service for passengers, cars, and rolling freight. Operator licensing, SOLAS safety, and manifest handling built in.",
    useCases: ["Passenger ferry", "Ro-Ro vehicle", "Rolling freight", "Island-hop charter"],
    image: "https://images.unsplash.com/photo-1520611747710-29dc84c1a0c8?w=1600&q=80",
    imageAlt: "Ferry boat approaching a harbor at sunset",
    accent: "#34C759",
    category: "maritime",
  },
  {
    slug: "rail",
    enum: "FREIGHT_RAIL",
    label: "Freight Rail",
    emoji: "🚂",
    tagline: "Boxcar, intermodal, and unit trains across continents.",
    description:
      "Book Class-I, regional, and short-line rail for intermodal containers, boxcars, and bulk unit trains. Siding-to-siding coverage with chain-of-custody.",
    useCases: ["Intermodal containers", "Bulk commodities", "Automotive rack", "Unit trains"],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&q=80",
    imageAlt: "Freight train moving through scenic landscape",
    accent: "#A6662B",
    category: "rail",
  },
  {
    slug: "hazmat",
    enum: "HAZMAT",
    label: "Hazmat",
    emoji: "☢️",
    tagline: "Dangerous goods — correctly labelled, correctly carried.",
    description:
      "Only DOT- and IATA-certified hazmat carriers. Placarding, SDS handling, emergency-response plans, and regulatory filings managed for you.",
    useCases: ["Flammables & corrosives", "Radioactive", "Batteries (Class 9)", "Explosives"],
    image: "https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=1600&q=80",
    imageAlt: "Tanker truck with hazmat placards on a highway",
    accent: "#FFB020",
    category: "specialty",
  },
  {
    slug: "oversized",
    enum: "OVERSIZED_CARGO",
    label: "Oversized Cargo",
    emoji: "🏗️",
    tagline: "Big. Weird-shaped. Permitted. Done.",
    description:
      "Beyond-dimensional cargo moved by multi-axle trailers, RoRo, or dedicated rail. Permit routing, police escorts, and utility-line coordination included.",
    useCases: ["Transformers & generators", "Wind components", "Yachts on trailers", "Industrial vessels"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80",
    imageAlt: "Oversized cargo on a multi-axle heavy trailer",
    accent: "#FF6B9D",
    category: "specialty",
  },
];

const MODE_BY_SLUG: Record<string, ModeInfo> = Object.fromEntries(
  MODES.map((m) => [m.slug, m]),
);

const MODE_BY_ENUM: Partial<Record<TransportModeKey, ModeInfo>> = Object.fromEntries(
  MODES.map((m) => [m.enum, m]),
);

export function getMode(slug: string): ModeInfo | undefined {
  return MODE_BY_SLUG[slug];
}

export function getModeByEnum(key: TransportModeKey): ModeInfo | undefined {
  return MODE_BY_ENUM[key];
}

export function listModes(): ModeInfo[] {
  return MODES;
}
