import type { MetadataRoute } from "next";
import { siteRoutes } from "@/content/routes";
import { siteConfig } from "@/content/site";
import { localizePath, type Locale } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.canonicalUrl) return [];

  return siteRoutes.flatMap((route) =>
    (["en", "de"] as const).map((locale: Locale) => {
      const localizedRoute = localizePath(route, locale);
      const englishUrl = new URL(
        localizePath(route, "en"),
        siteConfig.canonicalUrl!,
      ).toString();
      const germanUrl = new URL(
        localizePath(route, "de"),
        siteConfig.canonicalUrl!,
      ).toString();

      return {
        url: new URL(localizedRoute, siteConfig.canonicalUrl!).toString(),
        alternates: {
          languages: {
            en: englishUrl,
            de: germanUrl,
            "x-default": englishUrl,
          },
        },
        changeFrequency:
          route.startsWith("/models/") ||
          route.startsWith("/resources/publications/")
            ? ("monthly" as const)
            : ("weekly" as const),
        priority:
          route === "/"
            ? 1
            : route === "/models" ||
                route === "/research" ||
                route === "/resources"
              ? 0.8
              : 0.6,
      };
    }),
  );
}
