import { MetadataRoute } from "next";
import { listModes } from "@/lib/seo/modes";
import {
  MOVING_CORRIDORS,
  FREIGHT_CORRIDORS,
  COURIER_CORRIDORS,
  AIRPORT_CORRIDORS,
} from "@/lib/seo/corridors";

const BASE = "https://www.couthacts.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/browse`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/academy`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/advance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/enterprise`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/government`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/press/kit`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/safety`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/loadboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/providers`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Services: directory + 18 mode pages
  const services: MetadataRoute.Sitemap = [
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...listModes().map((m) => ({
      url: `${BASE}/services/${m.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];

  // Move / Freight / Courier: directory + corridor pages
  const verticalGroups = [
    { root: "move", corridors: MOVING_CORRIDORS },
    { root: "freight", corridors: FREIGHT_CORRIDORS },
    { root: "courier", corridors: COURIER_CORRIDORS },
  ];

  const verticals: MetadataRoute.Sitemap = verticalGroups.flatMap(({ root, corridors }) => [
    { url: `${BASE}/${root}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    ...corridors.map((c) => ({
      url: `${BASE}/${root}/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);

  // Airport transfers: directory + corridor pages
  const airports: MetadataRoute.Sitemap = [
    { url: `${BASE}/airport-transfer`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...AIRPORT_CORRIDORS.map((c) => ({
      url: `${BASE}/airport-transfer/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [...core, ...services, ...verticals, ...airports];
}
