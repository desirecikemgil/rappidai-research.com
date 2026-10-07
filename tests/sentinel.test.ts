import { describe, expect, it } from "vitest";
import { sentinelPreview } from "@/content/sentinel";
import { getModelBySlug, getModelsByFilter } from "@/content/models";
import { siteRoutes } from "@/content/routes";
import { localizeContent } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";

describe("Sentinel announcement boundaries", () => {
  it("keeps the Alpha candidate distinct from a released model", () => {
    const model = getModelBySlug("quantum-sentinel-alpha")!;
    expect(model.availability).toBe("not-released");
    expect(model.parameterCount).toBeNull();
    expect(model.usageExample).toBeNull();
    expect(model.license).toBeNull();
    expect(model.links).toEqual([]);
    expect(sentinelPreview.foundations).toEqual(["Qwen3.5-9B", "Qwen3.5-4B"]);
    expect(sentinelPreview.foundationText).toContain(
      "The foundation is not frozen.",
    );
    expect(sentinelPreview.targetNotice).toContain(
      "not a guaranteed release date",
    );
    expect(sentinelPreview.capabilitiesNotice).toContain("Training objectives");
  });

  it("preserves Echelon and both pilots alongside Sentinel", () => {
    expect(
      getModelsByFilter("in-development").map((model) => model.slug),
    ).toEqual(["quantum-sentinel-alpha", "quantum-1-echelon"]);
    expect(getModelsByFilter("available").map((model) => model.slug)).toEqual([
      "quantum-1-pilot",
      "quantum-1-6-pilot",
    ]);
    expect(getModelBySlug("quantum-1-echelon")?.name).toBe("Quantum 1 Echelon");
  });

  it("publishes bilingual Sentinel routes and metadata without changing Echelon's title", () => {
    expect(siteRoutes).toContain("/models/quantum-sentinel-alpha");
    for (const locale of ["en", "de"] as const) {
      expect(metadataFor("/", locale).title).toContain(
        "Quantum Sentinel Alpha",
      );
      const metadata = metadataFor("/models/quantum-sentinel-alpha", locale);
      expect(metadata.alternates?.languages?.en).toBe(
        "https://www.rappidai-research.com/models/quantum-sentinel-alpha",
      );
      expect(metadata.alternates?.languages?.de).toBe(
        "https://www.rappidai-research.com/de/models/quantum-sentinel-alpha",
      );
      expect(metadataFor("/models/quantum-1-echelon", locale).title).toBe(
        "Quantum 1 Echelon — rappidAI Research",
      );
    }
    const german = localizeContent(sentinelPreview, "de");
    expect(german.status).toBe("Alpha · In Entwicklung");
    expect(german.target).toBe("Ziel: Oktober 2026");
    expect(german.foundationText).toContain("noch nicht eingefroren");
    expect(german.capabilitiesNotice).toContain("Trainingsziele");
  });
});
