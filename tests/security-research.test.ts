import { describe, expect, it } from "vitest";
import {
  securityResearch,
  securityResources,
  sentinelResearchLinks,
  securityReview,
} from "@/content/security-research";
import { falsePositiveNote } from "@/content/false-positive-note";
import { t } from "@/lib/i18n";

describe("security research publication integrity", () => {
  it("calculates the hypothetical F1 examples consistently, including zero detections", () => {
    const section = falsePositiveNote.sections.find(
      (item) => item.id === "evaluating-detection-quality",
    )!;
    const table = section.figures!.find(
      (figure) => figure.kind === "table" && figure.label === "Table 2",
    )!;
    for (const row of table.rows) {
      const tp = Number(row[1]);
      const fp = Number(row[2]);
      const fn = Number(row[3]);
      expect(Number(row[8])).toBeCloseTo((2 * tp) / (2 * tp + fp + fn), 2);
      expect(Number.parseFloat(row[7]!)).toBeCloseTo((100 * fp) / 950, 1);
      expect(Number.parseFloat(row[6]!)).toBeCloseTo((100 * tp) / (tp + fn), 1);
    }
  });

  it("pins Sentinel evidence and the note reference to the reviewed revision", () => {
    for (const [key, url] of Object.entries(sentinelResearchLinks)) {
      if (key !== "repository")
        expect(url).toContain(securityReview.sentinelCommit);
    }
    expect(falsePositiveNote.references[17].url).toBe(
      sentinelResearchLinks.status,
    );
    expect(falsePositiveNote.lastReviewed).toBe(securityReview.date);
  });

  it("provides German prose for the new hubs and evaluation protocol", () => {
    const proseKeys = new Set([
      "title",
      "introduction",
      "reviewed",
      "status",
      "question",
      "evidence",
      "method",
      "boundary",
      "description",
      "linkLabel",
      "noteText",
      "paragraphs",
    ]);
    function check(value: unknown, key = "") {
      if (typeof value === "string" && proseKeys.has(key)) {
        expect(t("de", value), value).not.toBe(value);
      } else if (Array.isArray(value)) {
        value.forEach((entry) => check(entry, key));
      } else if (value && typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => check(v, k));
      }
    }
    check(securityResearch);
    check(securityResources);
    check(
      falsePositiveNote.sections.find(
        (section) => section.id === "evaluation-protocol",
      ),
    );
  });
});
