import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  ghostBenchScenarios,
  ghostCommands,
  ghostCopy,
  ghostLinks,
  ghostRelease,
} from "@/content/ghost";
import { metadataFor } from "@/lib/metadata";

describe("Ghost released source and site-wide consistency", () => {
  it("pins the actual v0.3.0 release and its recorded twenty-five-scenario result", () => {
    expect(ghostRelease.version).toBe("v0.3.0");
    expect(ghostRelease.commit).toBe(
      "2184a0e87b7dca161267f5fe596a2dd5d56d189d",
    );
    expect(ghostLinks.gate).toContain("/actions/runs/35648771011");
    expect(ghostRelease.bench).toEqual({ passed: 25, failed: 0, skipped: 0 });
    expect(ghostBenchScenarios).toHaveLength(25);
    expect(new Set(ghostBenchScenarios).size).toBe(15);
    expect(ghostBenchScenarios.slice(-5)).toEqual([
      "approval-once",
      "approval-containment-precedence",
      "concurrent-approval-once",
      "cross-session-security-isolation",
      "session-timeout",
    ]);
  });
  for (const locale of ["en", "de"] as const) {
    it(`${locale} provides the complete release presentation and translated metadata`, () => {
      const copy = ghostCopy[locale];
      expect(copy.intro.eyebrow).toContain(ghostRelease.version);
      expect(copy.benchResult).toBe("PASS: 25 · FAIL: 0 · SKIP: 0");
      expect(copy.policies.map(({ name }) => name)).toEqual([
        "ALLOW",
        "DENY",
        "SHADOW",
        "ASK",
      ]);
      expect(copy.changes).toHaveLength(6);
      expect(copy.layers).toHaveLength(10);
      expect(copy.limits).toHaveLength(5);
      expect(copy.sourceNames).toHaveLength(12);
      const metadata = metadataFor("/tools/ghost", locale);
      expect(String(metadata.title)).toContain(ghostRelease.version);
      expect(metadata.description).toContain(
        locale === "de" ? "Prompt-Injection Guard" : "Prompt-Injection Guard",
      );
      expect(copy.policyScope).toContain("LLM");
      expect(copy.practicalLimit).toContain(locale === "de" ? "Programmausgabe" : "program output");
      expect(copy.fenceDetail).toContain(
        locale === "de" ? "Paketebene" : "packet-level",
      );
    });
  }
  it("uses real release/source destinations and not moving documentation", () => {
    for (const href of Object.values(ghostLinks)) {
      expect(new URL(href).origin).toBe("https://github.com");
      expect(href).toContain("/rappidAI-Research/rappid-ghost");
      expect(href).not.toContain("/main/");
    }
    expect(ghostLinks.readme).toContain(
      `/blob/${ghostRelease.commit}/README.md`,
    );
    expect(ghostLinks.release.endsWith("/releases/tag/v0.3.0")).toBe(true);
    expect(ghostLinks.checksums.endsWith("/SHA256SUMS")).toBe(true);
  });
  it("contains complete usable source-build and CLI examples", () => {
    expect(ghostCommands.install).toContain("--branch v0.3.0");
    expect(ghostCommands.install).toContain(
      "go build -o bin/ghost ./cmd/ghost",
    );
    expect(ghostCommands.install).toContain('export PATH="$PWD/bin:$PATH"');
    expect(ghostCommands.start).toContain("ghost init\nghost run -- echo");
    expect(ghostCommands.shadow).toContain(
      "ghost run -- sh -c 'cat ~/.aws/credentials'",
    );
    expect(ghostCommands.shadow).toContain(
      "ghost inspect latest\nghost graph latest\nghost incidents latest",
    );
    expect(ghostCommands.bench).toContain("ghost bench --require-all");
    for (const code of Object.values(ghostCommands))
      expect(code).not.toContain("\\n");
  });
  it("leaves no obsolete Ghost versions, benchmark totals or source pins in live presentation", () => {
    for (const path of [
      "app/tools/ghost/page.tsx",
      "content/ghost.ts",
      "app/tools/page.tsx",
      "app/page.tsx",
      "content/pages.ts",
      "content/locales/de-metadata.ts",
    ]) {
      const source = readFileSync(path, "utf8");
      expect(source, path).not.toMatch(
        /version:\s*"v0\.2\.0"|PASS: 15|001d0baa953301f9fc94443e0e45b28d9f93fac0|34052802282/i,
      );
    }
    for (const path of ["app/page.tsx", "app/tools/page.tsx"]) {
      expect(readFileSync(path, "utf8")).toContain("ghostRelease.version");
    }
  });
});
