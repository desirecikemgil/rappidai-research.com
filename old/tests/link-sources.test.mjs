import { describe, expect, it } from "vitest";
import {
  collectExternalUrls,
  isPublicLinkSource,
  linkModules,
  loadLinkModule,
} from "../scripts/link-sources.mjs";

describe("public link discovery", () => {
  it("excludes test fixtures by path without ignoring their host in real content", () => {
    for (const file of [
      "tests/i18n.test.ts",
      "fixtures/example.md",
      "docs/__fixtures__/sample.md",
      "components/card.spec.tsx",
      "tests\\unit.ts",
    ]) {
      expect(isPublicLinkSource(file)).toBe(false);
    }
    const result = collectExternalUrls([
      ["tests/i18n.test.ts", "https://example.com/research"],
      ["docs/research.md", "https://example.com/research"],
      ["content/site.ts", "https://github.com/deleted-profile"],
    ]);
    expect(result).toEqual([
      { url: "https://example.com/research", files: ["docs/research.md"] },
      { url: "https://github.com/deleted-profile", files: ["content/site.ts"] },
    ]);
  });

  it("checks complete resolved templates and retains all owning files", () => {
    const url =
      "https://github.com/owner/repo/blob/revision/docs/compute-plan.md";
    const result = collectExternalUrls(
      [
        ["README.md", `[Plan](${url}).`],
        [
          "content/site.ts",
          "`${repository}/blob/${revision}/docs/compute-plan.md`",
        ],
      ],
      [["content/site.ts", { links: [{ url }] }]],
    );
    expect(result).toEqual([{ url, files: ["README.md", "content/site.ts"] }]);
  });

  it("loads actual centralized links including derived research, Ghost and Replay paths", async () => {
    const modules = await Promise.all(
      linkModules.map(async (file) => [file, await loadLinkModule(file)]),
    );
    const urls = collectExternalUrls([], modules).map(({ url }) => url);
    expect(urls).toContain(
      "https://github.com/desirecikemgil/rappidai-research.com/blob/main/SECURITY.md",
    );
    expect(
      urls.some((url) =>
        /lumen-quantum\/blob\/[a-f0-9]{40}\/docs\/compute-plan.md$/.test(url),
      ),
    ).toBe(true);
    expect(
      urls.some((url) =>
        /rappid-ghost\/blob\/[a-f0-9]{40}\/docs\/security-model.md$/.test(url),
      ),
    ).toBe(true);
    expect(
      urls.some((url) =>
        /rappid-replay\/blob\/[a-f0-9]{40}\/docs\/adr\/ADR-029-exact-branch-live-rerun.md$/.test(
          url,
        ),
      ),
    ).toBe(true);
    expect(urls.every((url) => !url.includes("${"))).toBe(true);
  });
});
