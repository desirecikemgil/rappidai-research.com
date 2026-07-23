import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { resourceCards } from "@/content/resources";
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

    expect(new Set(urls).size).toBe(urls.length);
  });
});
