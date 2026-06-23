import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seowebagency.in";
  
  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/social-hub`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
  
  // Local SEO city pages
  const locations = ["meerut", "noida", "delhi", "ghaziabad", "gurugram", "hapur", "muzaffarnagar", "modinagar", "lucknow", "haridwar", "rishikesh", "dehradun", "agra", "mathura", "aligarh", "bulandshahr"];
  const locationUrls = locations.map((loc) => ({
    url: `${baseUrl}/solutions/${loc}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...corePages, ...locationUrls];
}
