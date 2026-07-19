import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: siteConfig.canonicalUrl
      ? new URL("/sitemap.xml", siteConfig.canonicalUrl).toString()
      : undefined,
  };
}
