import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { resourceCards } from "@/content/resources";
import { siteRoutes } from "@/content/routes";
import { siteConfig } from "@/content/site";

describe("sitemap", () => {
  it("includes the resources hub, every resource and the publication route", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(`${siteConfig.canonicalUrl}/resources`);
    for (const resource of resourceCards) {
      expect(urls).toContain(`${siteConfig.canonicalUrl}${resource.href}`);
    }
    expect(urls).toContain(
      `${siteConfig.canonicalUrl}/resources/publications/from-100m-to-600m-german-tokens`,
    );
  });

  it("emits unique canonical URLs", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toHaveLength(siteRoutes.length * 2);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("pairs every English route with German and x-default alternates", () => {
    const entries = sitemap();

    for (const route of siteRoutes) {
      const englishUrl = new URL(route, siteConfig.canonicalUrl).toString();
      const germanUrl = new URL(
        route === "/" ? "/de" : `/de${route}`,
        siteConfig.canonicalUrl,
      ).toString();

      expect(entries).toContainEqual(
        expect.objectContaining({
          url: englishUrl,
          alternates: {
            languages: {
              en: englishUrl,
              de: germanUrl,
              "x-default": englishUrl,
            },
          },
        }),
      );
      expect(entries).toContainEqual(
        expect.objectContaining({
          url: germanUrl,
          alternates: {
            languages: {
              en: englishUrl,
              de: germanUrl,
              "x-default": englishUrl,
            },
          },
        }),
      );
    }
  });
});
