import { describe, expect, it } from "vitest";
import { modelComparisonContent } from "@/content/comparisons";
import { localizeContent } from "@/lib/i18n";

const expectedModelIds = [
  "quantum-1-pilot",
  "quantum-1-6-pilot",
  "quantum-1-echelon",
];

describe("model comparison evidence", () => {
  it("compares the same three model lines in every view", () => {
    for (const view of [
      modelComparisonContent.architecture,
      modelComparisonContent.tokenizer,
      modelComparisonContent.pipeline,
    ]) {
      expect(view.models.map((model) => model.id)).toEqual(expectedModelIds);
      expect(view.sources.length).toBeGreaterThan(1);
      for (const source of view.sources) {
        expect(new URL(source.url).protocol).toBe("https:");
      }
    }
  });

  it("keeps Echelon architecture values explicitly configured", () => {
    const echelon = modelComparisonContent.architecture.models[2];

    expect(echelon.tone).toBe("configured");
    expect(echelon.parameters).toBe(506_333_440);
    expect(echelon.layers).toBe(26);
    expect(echelon.hiddenSize).toBe(1280);
    expect(echelon.attentionHeads).toBe(20);
    expect(echelon.kvHeads).toBe(5);
    expect(echelon.detail).toContain("no trained weights");
  });

  it("does not invent unpublished pilot architecture dimensions", () => {
    const pilot = modelComparisonContent.architecture.models[0];

    expect(pilot.layers).toBeNull();
    expect(pilot.hiddenSize).toBeNull();
    expect(pilot.attentionHeads).toBeNull();
    expect(pilot.detail).toContain("not stated");
  });

  it("separates reported corpus scope from the Echelon target", () => {
    const [pilot, continued, echelon] = modelComparisonContent.pipeline.models;

    expect(pilot.tokenScopeMillions).toBe(100);
    expect(continued.tokenScopeMillions).toBe(600);
    expect(echelon.tokenScopeMillions).toBe(8000);
    expect(echelon.tone).toBe("configured");
    expect(echelon.process).toContain("Production run not started");
    expect(modelComparisonContent.pipeline.boundary).toContain(
      "presented as achieved",
    );
  });

  it("provides a complete German comparison layer", () => {
    const german = localizeContent(modelComparisonContent, "de");

    expect(german.tabs.map((tab) => tab.label)).toEqual([
      "Architektur",
      "Tokenizer",
      "Datenpipeline",
    ]);
    expect(german.architecture.title).toContain("506,3 Mio.");
    expect(german.pipeline.boundary).toContain("als erreicht");
  });
});
