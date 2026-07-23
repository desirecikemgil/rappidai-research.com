import { describe, expect, it } from "vitest";
import {
  getFeaturedModel,
  getModelBySlug,
  getModelsByFilter,
  models,
  modelSlugs,
} from "@/content/models";
import { getResearchNoteById } from "@/content/research";
import {
  publicModelUrls,
  publicProfiles,
  publicResearchUrls,
  siteConfig,
} from "@/content/site";

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

    expect(echelon?.parameterCount).toBeNull();
    expect(echelon?.availability).toBe("not-released");
    expect(echelon?.links).toEqual([
      expect.objectContaining({
        kind: "github",
        url: publicResearchUrls.repository,
      }),
    ]);
    expect(echelon?.releaseStatus).toContain("No trained Echelon weights");
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
  it("uses the verified rappidAI Hugging Face organization", () => {
    const profileUrl = new URL(publicProfiles.huggingFace);

    expect(profileUrl.origin).toBe("https://huggingface.co");
    expect(profileUrl.pathname).toBe("/rappidAI");
  });

  it("keeps every configured Hugging Face model URL in rappidAI", () => {
    for (const modelUrl of Object.values(publicModelUrls)) {
      const parsedUrl = new URL(modelUrl);

      expect(parsedUrl.origin).toBe("https://huggingface.co");
      expect(parsedUrl.pathname.split("/")[1]).toBe("rappidAI");
      expect(parsedUrl.pathname.split("/")[2]).toBeTruthy();
    }
  });

  it("gives every publicly available model a direct model URL", () => {
    const publicModels = models.filter(
      (model) => model.availability === "available",
    );

    expect(publicModels.length).toBeGreaterThan(0);
    for (const model of publicModels) {
      const directModelLink = model.links.find(
        (link) => link.kind === "huggingFace",
      );

      expect(directModelLink?.url).toBeTruthy();
      expect(Object.values(publicModelUrls)).toContain(directModelLink?.url);
    }
  });

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
