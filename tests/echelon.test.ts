import { describe, expect, it } from "vitest";
import { echelonPreview } from "@/content/echelon";
import { getModelBySlug } from "@/content/models";
import { localizeContent } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";

describe("Echelon announcement boundaries", () => {
  it("keeps targets separate from released measurements and download availability", () => {
    const model = getModelBySlug("quantum-1-echelon")!;
    expect(model.parameterCount).toBeNull();
    expect(model.availability).toBe("not-released");
    expect(model.usageExample).toBeNull();
    expect(model.links.every((link) => link.kind !== "huggingFace")).toBe(true);
    expect(
      echelonPreview.specifications.rows.every((row) =>
        ["Target", "Planned", "Under evaluation", "In development"].includes(
          row.status,
        ),
      ),
    ).toBe(true);
    expect(
      echelonPreview.specifications.rows.find(
        (row) => row.label === "Tokenizer",
      )?.status,
    ).toBe("Under evaluation");
    expect(
      echelonPreview.evidence.sources.every((source) =>
        /\/blob\/[a-f0-9]{40}\//.test(source.url),
      ),
    ).toBe(true);
  });

  it("localizes technical targets and publishes reciprocal launch metadata", () => {
    const german = localizeContent(echelonPreview, "de");
    expect(german.status).toBe("Demnächst");
    expect(german.specifications.rows.map((row) => row.status)).not.toContain(
      "Planned",
    );
    expect(german.specifications.notice).toContain("Entwicklungsziele");
    for (const locale of ["en", "de"] as const) {
      expect(metadataFor("/", locale).title).toContain("Quantum 1 Echelon");
      const metadata = metadataFor("/models/quantum-1-echelon", locale);
      expect(metadata.title).toBe("Quantum 1 Echelon — rappidAI Research");
      expect(metadata.alternates?.languages?.en).toBe(
        "https://www.rappidai-research.com/models/quantum-1-echelon",
      );
      expect(metadata.alternates?.languages?.de).toBe(
        "https://www.rappidai-research.com/de/models/quantum-1-echelon",
      );
    }
  });
});
