/**
 * Curated global city seed for programmatic SEO & corridor pages.
 *
 * Fields:
 * - slug: URL-safe (lowercase, hyphenated). Used in route segments.
 * - name: Display name.
 * - country: ISO-friendly country name.
 * - countryCode: ISO 3166-1 alpha-2.
 * - region: State / province / region (for disambiguation).
 * - lat/lng: Centroid. Used for distance and JSON-LD GeoCoordinates.
 * - timezone: IANA zone.
 * - airports: IATA codes associated with the metro (ordered by traffic).
 * - population: Metro population band — "mega" (>10M), "large" (3-10M), "mid" (1-3M).
 */

export type City = {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  region?: string;
  lat: number;
  lng: number;
  timezone: string;
  airports: string[];
  population: "mega" | "large" | "mid";
};

export const CITIES: City[] = [
  // ── North America ─────────────────────────────────────
  { slug: "new-york", name: "New York", country: "United States", countryCode: "US", region: "NY", lat: 40.7128, lng: -74.006, timezone: "America/New_York", airports: ["JFK", "LGA", "EWR"], population: "mega" },
  { slug: "los-angeles", name: "Los Angeles", country: "United States", countryCode: "US", region: "CA", lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles", airports: ["LAX", "BUR", "LGB"], population: "mega" },
  { slug: "chicago", name: "Chicago", country: "United States", countryCode: "US", region: "IL", lat: 41.8781, lng: -87.6298, timezone: "America/Chicago", airports: ["ORD", "MDW"], population: "mega" },
  { slug: "dallas", name: "Dallas", country: "United States", countryCode: "US", region: "TX", lat: 32.7767, lng: -96.797, timezone: "America/Chicago", airports: ["DFW", "DAL"], population: "large" },
  { slug: "houston", name: "Houston", country: "United States", countryCode: "US", region: "TX", lat: 29.7604, lng: -95.3698, timezone: "America/Chicago", airports: ["IAH", "HOU"], population: "large" },
  { slug: "austin", name: "Austin", country: "United States", countryCode: "US", region: "TX", lat: 30.2672, lng: -97.7431, timezone: "America/Chicago", airports: ["AUS"], population: "mid" },
  { slug: "san-francisco", name: "San Francisco", country: "United States", countryCode: "US", region: "CA", lat: 37.7749, lng: -122.4194, timezone: "America/Los_Angeles", airports: ["SFO", "OAK", "SJC"], population: "large" },
  { slug: "seattle", name: "Seattle", country: "United States", countryCode: "US", region: "WA", lat: 47.6062, lng: -122.3321, timezone: "America/Los_Angeles", airports: ["SEA"], population: "large" },
  { slug: "miami", name: "Miami", country: "United States", countryCode: "US", region: "FL", lat: 25.7617, lng: -80.1918, timezone: "America/New_York", airports: ["MIA", "FLL"], population: "large" },
  { slug: "atlanta", name: "Atlanta", country: "United States", countryCode: "US", region: "GA", lat: 33.749, lng: -84.388, timezone: "America/New_York", airports: ["ATL"], population: "large" },
  { slug: "boston", name: "Boston", country: "United States", countryCode: "US", region: "MA", lat: 42.3601, lng: -71.0589, timezone: "America/New_York", airports: ["BOS"], population: "large" },
  { slug: "washington-dc", name: "Washington, D.C.", country: "United States", countryCode: "US", region: "DC", lat: 38.9072, lng: -77.0369, timezone: "America/New_York", airports: ["IAD", "DCA", "BWI"], population: "large" },
  { slug: "philadelphia", name: "Philadelphia", country: "United States", countryCode: "US", region: "PA", lat: 39.9526, lng: -75.1652, timezone: "America/New_York", airports: ["PHL"], population: "large" },
  { slug: "phoenix", name: "Phoenix", country: "United States", countryCode: "US", region: "AZ", lat: 33.4484, lng: -112.074, timezone: "America/Phoenix", airports: ["PHX"], population: "large" },
  { slug: "denver", name: "Denver", country: "United States", countryCode: "US", region: "CO", lat: 39.7392, lng: -104.9903, timezone: "America/Denver", airports: ["DEN"], population: "mid" },
  { slug: "las-vegas", name: "Las Vegas", country: "United States", countryCode: "US", region: "NV", lat: 36.1699, lng: -115.1398, timezone: "America/Los_Angeles", airports: ["LAS"], population: "mid" },
  { slug: "toronto", name: "Toronto", country: "Canada", countryCode: "CA", region: "ON", lat: 43.6532, lng: -79.3832, timezone: "America/Toronto", airports: ["YYZ", "YTZ"], population: "large" },
  { slug: "montreal", name: "Montreal", country: "Canada", countryCode: "CA", region: "QC", lat: 45.5017, lng: -73.5673, timezone: "America/Toronto", airports: ["YUL"], population: "mid" },
  { slug: "vancouver", name: "Vancouver", country: "Canada", countryCode: "CA", region: "BC", lat: 49.2827, lng: -123.1207, timezone: "America/Vancouver", airports: ["YVR"], population: "mid" },
  { slug: "mexico-city", name: "Mexico City", country: "Mexico", countryCode: "MX", lat: 19.4326, lng: -99.1332, timezone: "America/Mexico_City", airports: ["MEX", "NLU"], population: "mega" },

  // ── Europe ─────────────────────────────────────────
  { slug: "london", name: "London", country: "United Kingdom", countryCode: "GB", lat: 51.5074, lng: -0.1278, timezone: "Europe/London", airports: ["LHR", "LGW", "STN", "LTN", "LCY"], population: "mega" },
  { slug: "paris", name: "Paris", country: "France", countryCode: "FR", lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris", airports: ["CDG", "ORY"], population: "mega" },
  { slug: "berlin", name: "Berlin", country: "Germany", countryCode: "DE", lat: 52.52, lng: 13.405, timezone: "Europe/Berlin", airports: ["BER"], population: "large" },
  { slug: "frankfurt", name: "Frankfurt", country: "Germany", countryCode: "DE", lat: 50.1109, lng: 8.6821, timezone: "Europe/Berlin", airports: ["FRA"], population: "mid" },
  { slug: "munich", name: "Munich", country: "Germany", countryCode: "DE", lat: 48.1351, lng: 11.582, timezone: "Europe/Berlin", airports: ["MUC"], population: "mid" },
  { slug: "madrid", name: "Madrid", country: "Spain", countryCode: "ES", lat: 40.4168, lng: -3.7038, timezone: "Europe/Madrid", airports: ["MAD"], population: "large" },
  { slug: "barcelona", name: "Barcelona", country: "Spain", countryCode: "ES", lat: 41.3851, lng: 2.1734, timezone: "Europe/Madrid", airports: ["BCN"], population: "large" },
  { slug: "rome", name: "Rome", country: "Italy", countryCode: "IT", lat: 41.9028, lng: 12.4964, timezone: "Europe/Rome", airports: ["FCO", "CIA"], population: "large" },
  { slug: "milan", name: "Milan", country: "Italy", countryCode: "IT", lat: 45.4642, lng: 9.19, timezone: "Europe/Rome", airports: ["MXP", "LIN", "BGY"], population: "large" },
  { slug: "amsterdam", name: "Amsterdam", country: "Netherlands", countryCode: "NL", lat: 52.3676, lng: 4.9041, timezone: "Europe/Amsterdam", airports: ["AMS"], population: "mid" },
  { slug: "zurich", name: "Zurich", country: "Switzerland", countryCode: "CH", lat: 47.3769, lng: 8.5417, timezone: "Europe/Zurich", airports: ["ZRH"], population: "mid" },
  { slug: "stockholm", name: "Stockholm", country: "Sweden", countryCode: "SE", lat: 59.3293, lng: 18.0686, timezone: "Europe/Stockholm", airports: ["ARN", "BMA"], population: "mid" },
  { slug: "dublin", name: "Dublin", country: "Ireland", countryCode: "IE", lat: 53.3498, lng: -6.2603, timezone: "Europe/Dublin", airports: ["DUB"], population: "mid" },
  { slug: "lisbon", name: "Lisbon", country: "Portugal", countryCode: "PT", lat: 38.7223, lng: -9.1393, timezone: "Europe/Lisbon", airports: ["LIS"], population: "mid" },
  { slug: "warsaw", name: "Warsaw", country: "Poland", countryCode: "PL", lat: 52.2297, lng: 21.0122, timezone: "Europe/Warsaw", airports: ["WAW"], population: "mid" },
  { slug: "istanbul", name: "Istanbul", country: "Türkiye", countryCode: "TR", lat: 41.0082, lng: 28.9784, timezone: "Europe/Istanbul", airports: ["IST", "SAW"], population: "mega" },

  // ── Middle East & Africa ────────────────────────
  { slug: "dubai", name: "Dubai", country: "United Arab Emirates", countryCode: "AE", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai", airports: ["DXB", "DWC"], population: "large" },
  { slug: "abu-dhabi", name: "Abu Dhabi", country: "United Arab Emirates", countryCode: "AE", lat: 24.4539, lng: 54.3773, timezone: "Asia/Dubai", airports: ["AUH"], population: "mid" },
  { slug: "riyadh", name: "Riyadh", country: "Saudi Arabia", countryCode: "SA", lat: 24.7136, lng: 46.6753, timezone: "Asia/Riyadh", airports: ["RUH"], population: "large" },
  { slug: "doha", name: "Doha", country: "Qatar", countryCode: "QA", lat: 25.2854, lng: 51.531, timezone: "Asia/Qatar", airports: ["DOH"], population: "mid" },
  { slug: "tel-aviv", name: "Tel Aviv", country: "Israel", countryCode: "IL", lat: 32.0853, lng: 34.7818, timezone: "Asia/Jerusalem", airports: ["TLV"], population: "mid" },
  { slug: "cairo", name: "Cairo", country: "Egypt", countryCode: "EG", lat: 30.0444, lng: 31.2357, timezone: "Africa/Cairo", airports: ["CAI"], population: "mega" },
  { slug: "lagos", name: "Lagos", country: "Nigeria", countryCode: "NG", lat: 6.5244, lng: 3.3792, timezone: "Africa/Lagos", airports: ["LOS"], population: "mega" },
  { slug: "nairobi", name: "Nairobi", country: "Kenya", countryCode: "KE", lat: -1.2921, lng: 36.8219, timezone: "Africa/Nairobi", airports: ["NBO"], population: "large" },
  { slug: "johannesburg", name: "Johannesburg", country: "South Africa", countryCode: "ZA", lat: -26.2041, lng: 28.0473, timezone: "Africa/Johannesburg", airports: ["JNB"], population: "large" },
  { slug: "cape-town", name: "Cape Town", country: "South Africa", countryCode: "ZA", lat: -33.9249, lng: 18.4241, timezone: "Africa/Johannesburg", airports: ["CPT"], population: "mid" },
  { slug: "accra", name: "Accra", country: "Ghana", countryCode: "GH", lat: 5.6037, lng: -0.187, timezone: "Africa/Accra", airports: ["ACC"], population: "mid" },

  // ── Asia-Pacific ──────────────────────────────
  { slug: "tokyo", name: "Tokyo", country: "Japan", countryCode: "JP", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo", airports: ["HND", "NRT"], population: "mega" },
  { slug: "osaka", name: "Osaka", country: "Japan", countryCode: "JP", lat: 34.6937, lng: 135.5023, timezone: "Asia/Tokyo", airports: ["KIX", "ITM"], population: "large" },
  { slug: "seoul", name: "Seoul", country: "South Korea", countryCode: "KR", lat: 37.5665, lng: 126.978, timezone: "Asia/Seoul", airports: ["ICN", "GMP"], population: "mega" },
  { slug: "beijing", name: "Beijing", country: "China", countryCode: "CN", lat: 39.9042, lng: 116.4074, timezone: "Asia/Shanghai", airports: ["PEK", "PKX"], population: "mega" },
  { slug: "shanghai", name: "Shanghai", country: "China", countryCode: "CN", lat: 31.2304, lng: 121.4737, timezone: "Asia/Shanghai", airports: ["PVG", "SHA"], population: "mega" },
  { slug: "shenzhen", name: "Shenzhen", country: "China", countryCode: "CN", lat: 22.5431, lng: 114.0579, timezone: "Asia/Shanghai", airports: ["SZX"], population: "mega" },
  { slug: "hong-kong", name: "Hong Kong", country: "Hong Kong SAR", countryCode: "HK", lat: 22.3193, lng: 114.1694, timezone: "Asia/Hong_Kong", airports: ["HKG"], population: "large" },
  { slug: "singapore", name: "Singapore", country: "Singapore", countryCode: "SG", lat: 1.3521, lng: 103.8198, timezone: "Asia/Singapore", airports: ["SIN"], population: "large" },
  { slug: "bangkok", name: "Bangkok", country: "Thailand", countryCode: "TH", lat: 13.7563, lng: 100.5018, timezone: "Asia/Bangkok", airports: ["BKK", "DMK"], population: "mega" },
  { slug: "mumbai", name: "Mumbai", country: "India", countryCode: "IN", lat: 19.076, lng: 72.8777, timezone: "Asia/Kolkata", airports: ["BOM"], population: "mega" },
  { slug: "delhi", name: "Delhi", country: "India", countryCode: "IN", lat: 28.7041, lng: 77.1025, timezone: "Asia/Kolkata", airports: ["DEL"], population: "mega" },
  { slug: "bangalore", name: "Bangalore", country: "India", countryCode: "IN", lat: 12.9716, lng: 77.5946, timezone: "Asia/Kolkata", airports: ["BLR"], population: "mega" },
  { slug: "sydney", name: "Sydney", country: "Australia", countryCode: "AU", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney", airports: ["SYD"], population: "large" },
  { slug: "melbourne", name: "Melbourne", country: "Australia", countryCode: "AU", lat: -37.8136, lng: 144.9631, timezone: "Australia/Melbourne", airports: ["MEL"], population: "large" },
  { slug: "auckland", name: "Auckland", country: "New Zealand", countryCode: "NZ", lat: -36.8485, lng: 174.7633, timezone: "Pacific/Auckland", airports: ["AKL"], population: "mid" },

  // ── Latin America ────────────────────────────
  { slug: "sao-paulo", name: "São Paulo", country: "Brazil", countryCode: "BR", lat: -23.5505, lng: -46.6333, timezone: "America/Sao_Paulo", airports: ["GRU", "CGH"], population: "mega" },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", country: "Brazil", countryCode: "BR", lat: -22.9068, lng: -43.1729, timezone: "America/Sao_Paulo", airports: ["GIG", "SDU"], population: "mega" },
  { slug: "buenos-aires", name: "Buenos Aires", country: "Argentina", countryCode: "AR", lat: -34.6037, lng: -58.3816, timezone: "America/Argentina/Buenos_Aires", airports: ["EZE", "AEP"], population: "mega" },
  { slug: "bogota", name: "Bogotá", country: "Colombia", countryCode: "CO", lat: 4.711, lng: -74.0721, timezone: "America/Bogota", airports: ["BOG"], population: "mega" },
  { slug: "lima", name: "Lima", country: "Peru", countryCode: "PE", lat: -12.0464, lng: -77.0428, timezone: "America/Lima", airports: ["LIM"], population: "mega" },
  { slug: "santiago", name: "Santiago", country: "Chile", countryCode: "CL", lat: -33.4489, lng: -70.6693, timezone: "America/Santiago", airports: ["SCL"], population: "large" },
];

const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

export function getCity(slug: string): City | undefined {
  return CITY_BY_SLUG[slug];
}

export function listCities(): City[] {
  return CITIES;
}

export function listCitiesByPopulation(
  tier: City["population"],
): City[] {
  return CITIES.filter((c) => c.population === tier);
}

const EARTH_RADIUS_KM = 6371;
const KM_PER_MI = 1.60934;

export function distanceKm(a: City, b: City): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function distanceMiles(a: City, b: City): number {
  return distanceKm(a, b) / KM_PER_MI;
}
