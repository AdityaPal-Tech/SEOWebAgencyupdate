import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seowebagency.in";
  
  // Local SEO city pages
  const locations = ["meerut", "noida", "delhi", "ghaziabad", "gurugram", "hapur", "muzaffarnagar", "modinagar"];
  const locationUrls = locations.map((loc) => ({
    url: `${baseUrl}/solutions/${loc}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...locationUrls,
  ];
}
