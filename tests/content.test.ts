import { describe, expect, it } from "vitest";
import {
  getFeaturedModel,
  getModelBySlug,
  getModelsByFilter,
  modelSlugs,
} from "@/content/models";
import { getResearchNoteById } from "@/content/research";
import { publicResearchUrls, siteConfig } from "@/content/site";

describe("model content helpers", () => {
  it("resolves every configured model slug", () => {
    expect(modelSlugs).toHaveLength(3);
    expect(new Set(modelSlugs).size).toBe(modelSlugs.length);

    for (const slug of modelSlugs) {
      expect(getModelBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("returns undefined for an unknown model", () => {
    expect(getModelBySlug("not-a-model")).toBeUndefined();
  });

  it("selects the featured public model", () => {
    const featuredModel = getFeaturedModel();

    expect(featuredModel.slug).toBe("quantum-1-6-pilot");
    expect(featuredModel.featured).toBe(true);
    expect(featuredModel.availability).toBe("available");
  });

  it("filters public releases and in-development models", () => {
    const publicReleases = getModelsByFilter("available");
    const inDevelopment = getModelsByFilter("in-development");

    expect(publicReleases.map((model) => model.slug)).toEqual([
      "quantum-1-pilot",
      "quantum-1-6-pilot",
    ]);
    expect(inDevelopment.map((model) => model.slug)).toEqual([
      "quantum-1-echelon",
    ]);
  });

  it("does not present the Echelon preflight as a released model", () => {
    const echelon = getModelBySlug("quantum-1-echelon");

    expect(echelon?.parameterCount?.value).toBe(506_333_440);
    expect(echelon?.availability).toBe("not-released");
    expect(echelon?.links).toHaveLength(0);
    expect(echelon?.releaseStatus).toContain("no trained checkpoint");
  });
});

describe("research content helpers", () => {
  it("resolves a configured research note", () => {
    expect(
      getResearchNoteById("from-100m-to-600m-german-tokens")?.progress,
    ).toBe("in-progress");
  });

  it("returns undefined for a known but unconfigured research-note id", () => {
    expect(
      getResearchNoteById("why-local-inference-changes-the-design-target"),
    ).toBeUndefined();
  });
});

describe("public source configuration", () => {
  it("uses verified public origins for canonical metadata and source links", () => {
    expect(siteConfig.canonicalUrl).toBe("https://www.rappidai-research.com");
    expect(new URL(siteConfig.canonicalUrl).protocol).toBe("https:");
    expect(siteConfig.externalLinks.github.url).toBe(
      publicResearchUrls.repository,
    );
  });

  it("pins research artifact links to reviewed revisions", () => {
    const artifactUrls = Object.values(publicResearchUrls).filter((url) =>
      ["/blob/", "/resolve/"].some((pathSegment) => url.includes(pathSegment)),
    );

    expect(artifactUrls.length).toBeGreaterThan(0);
    for (const url of artifactUrls) {
      expect(url).not.toContain("/blob/main/");
      expect(url).not.toContain("/resolve/main/");
    }
  });
});
