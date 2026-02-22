import { MetadataRoute } from "next";
import { practices } from "@/data/practices";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://claude-craft-kappa.vercel.app";

  // Core static routes
  const staticRoutes = [
    "",
    "/library",
    "/playground",
    "/xml-generator",
    "/claude-code",
    "/resources",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic practice routes
  const practiceRoutes = practices.map((practice) => ({
    url: `${baseUrl}/library/${practice.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...practiceRoutes];
}
