import { describe, expect, it } from "vitest";
import {
  reproducibilityWorkflows,
  sentinelDataGovernance,
  responsibleUseBoundaries,
  licensingGuidance,
} from "@/content/documentation";
import { deTranslations } from "@/content/locales/de";
import { localizeContent } from "@/lib/i18n";

const records = [
  reproducibilityWorkflows,
  sentinelDataGovernance,
  responsibleUseBoundaries,
  licensingGuidance,
];

describe("research documentation", () => {
  it("provides German copy for every new heading, paragraph, step and source label", () => {
    function inspect(value: unknown, key = "") {
      if (typeof value === "string" && key !== "url") {
        expect(deTranslations[value], `Missing German: ${value}`).toBeTruthy();
      } else if (Array.isArray(value))
        value.forEach((entry) => inspect(entry, key));
      else if (value && typeof value === "object")
        Object.entries(value).forEach(([k, v]) => inspect(v, k));
    }
    records.forEach((record) => inspect(record));
  });

  it("keeps source identity and immutable revisions intact in both languages", () => {
    for (const record of records) {
      const german = localizeContent(record, "de");
      record.sections.forEach((section, index) => {
        expect(section.sources.length).toBeGreaterThan(0);
        section.sources.forEach((source, sourceIndex) => {
          expect(new URL(source.url).protocol).toBe("https:");
          expect(source.url).toMatch(
            /\/(?:blob|tree|releases\/tag|actions\/runs)\//,
          );
          expect(source.url).not.toMatch(/\/(?:blob|tree)\/main\//);
          expect(german.sections[index].sources[sourceIndex].url).toBe(
            source.url,
          );
        });
      });
    }
  });
});
