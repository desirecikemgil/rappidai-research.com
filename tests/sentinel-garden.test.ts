import { describe, expect, it } from "vitest";
import { sentinelGarden } from "@/content/sentinel-garden";

function sumColumn(rows: readonly (readonly unknown[])[], column: number) {
  return rows.reduce((sum, row) => sum + Number(row[column]), 0);
}

describe("published Sentinel Garden aggregates", () => {
  it("reconciles accepted, language and split totals", () => {
    const languages = sentinelGarden.composition.slice(0, -1);
    const total = sentinelGarden.composition.at(-1)!;
    const accepted = sentinelGarden.funnel[4].value;
    for (const row of languages) {
      const labels = Number(row[1]) + Number(row[2]) + Number(row[3]);
      expect(Number(row[4])).toBe(labels);
    }
    for (const column of [1, 2, 3, 4]) {
      expect(sumColumn(languages, column)).toBe(Number(total[column]));
    }
    expect(Number(total[4])).toBe(accepted);
    expect(sumColumn(sentinelGarden.splits, 1)).toBe(accepted);
  });

  it("reconciles the rights queue with eligible splits", () => {
    const eligible = sentinelGarden.splits.filter(
      ([name]) => name === "train" || name === "validation",
    );
    const queuedRepositories = sumColumn(sentinelGarden.rights, 2);
    const eligibleRepositories = sumColumn(eligible, 2);
    const queuedRecords = sumColumn(sentinelGarden.rights, 3);
    const eligibleRecords = sumColumn(eligible, 1);
    expect(queuedRepositories).toBe(eligibleRepositories);
    expect(queuedRecords).toBe(eligibleRecords);
    expect(sentinelGarden.funnel.at(-1)?.value).toBe(0);
  });
});
