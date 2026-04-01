import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://couthacts.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/browse`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/academy`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/advance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/enterprise`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/government`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/press/kit`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/safety`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/loadboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
