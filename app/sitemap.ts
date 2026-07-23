import type { MetadataRoute } from "next";
import { modelSlugs } from "@/content/models";
import { siteConfig } from "@/content/site";

const staticRoutes = [
  "",
  "/models",
  "/research",
  "/about",
  "/contact",
  "/imprint",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.canonicalUrl) return [];

  const routes = [
    ...staticRoutes,
    ...modelSlugs.map((slug) => `/models/${slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, siteConfig.canonicalUrl!).toString(),
    changeFrequency: route.startsWith("/models/") ? "monthly" : "weekly",
    priority:
      route === ""
        ? 1
        : route === "/models" || route === "/research"
          ? 0.8
          : 0.6,
  }));
}
