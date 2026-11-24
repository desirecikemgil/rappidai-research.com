import { describe, expect, it } from "vitest";
import { sentinelGarden } from "@/content/sentinel-garden";
import { trainingDataNote } from "@/content/training-data-note";
import { publications } from "@/content/resources";
import type { PublicationSection } from "@/content/types";

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
    // Every repository with train or validation records is either approved or left out.
    expect(sumColumn(sentinelGarden.approvals, 2)).toBe(queuedRepositories);
  });

  it("reconciles the approved training data with the funnel", () => {
    const row = (name: string) =>
      sentinelGarden.training.find(([label]) => label === name)!;
    const approved = sentinelGarden.funnel.at(-1)!.value;
    const detection = row("Detection examples");
    const total = row("Training examples");
    for (const column of [1, 2]) {
      const labels = ["Finding", "No finding (verified post-fix)", "Abstention"]
        .map((name) => Number(row(name)[column]))
        .reduce((sum, value) => sum + value, 0);
      expect(labels).toBe(Number(detection[column]));
      expect(
        Number(detection[column]) + Number(row("Patch examples")[column]),
      ).toBe(Number(total[column]));
    }
    expect(Number(detection[1]) + Number(detection[2])).toBe(approved);
    expect(approved).toBeLessThanOrEqual(
      sumColumn(
        sentinelGarden.splits.filter(
          ([name]) => name === "train" || name === "validation",
        ),
        1,
      ),
    );
  });

  it("keeps the training-data note consistent with the data page", () => {
    const sections: readonly PublicationSection[] = trainingDataNote.sections;
    const table = sections
      .flatMap((section) => section.figures ?? [])
      .find((figure) => figure.kind === "table" && figure.label === "Table 4");
    expect(table?.kind).toBe("table");
    if (table?.kind !== "table") return;
    const format = new Intl.NumberFormat("en-US");
    expect(table.rows).toEqual(
      sentinelGarden.training.map(([label, train, validation]) => [
        label,
        format.format(train),
        format.format(validation),
      ]),
    );
    expect(publications[0].slug).toBe(trainingDataNote.slug);
    const dates = publications.map((note) => note.publicationDate);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});
