from pathlib import Path


def replace(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"Expected exactly one replacement in {path}, got {count}: {old[:80]}")
    p.write_text(text.replace(old, new))


replace("app/page.tsx", 'import Link from "next/link";', 'import Link from "next/link";\nimport { ghostRelease } from "@/content/ghost";')
replace("app/page.tsx", '"A security runtime for agent execution. Allow, deny or expose controlled decoys, with inspectable policy decisions."', '"A deception-aware runtime for agents. Deterministic ALLOW, DENY and SHADOW rules, with hardened network boundaries, isolated sessions and inspectable evidence."')
replace("app/page.tsx", '"Eine Security-Runtime für Agenten. Zugriffe erlauben, ablehnen oder kontrollierte Köder bereitstellen – mit nachvollziehbaren Entscheidungen."', '"Eine deception-aware Runtime für Agenten. Deterministische ALLOW-, DENY- und SHADOW-Regeln mit gehärteten Netzwerkgrenzen, isolierten Sessions und nachvollziehbaren Nachweisen."')
replace("app/page.tsx", 'toolStatus: "Experimental · Open source",', 'toolStatus: "Experimental · Open source",\n    ghostStatus: "Security hardening · Experimental",')
replace("app/page.tsx", 'toolStatus: "Experimentell · Open Source",', 'toolStatus: "Experimentell · Open Source",\n    ghostStatus: "Sicherheitshärtung · Experimentell",')
replace("app/page.tsx", '{c.toolStatus}', '{kind === "ghost" ? `${ghostRelease.version} · ${c.ghostStatus}` : c.toolStatus}')
replace("app/tools/page.tsx", 'import { Reveal } from "@/components/motion/reveal";', 'import { Reveal } from "@/components/motion/reveal";\nimport { ghostLinks, ghostRelease } from "@/content/ghost";')
replace("app/tools/page.tsx", '"A deception-aware security runtime with deterministic ALLOW, DENY and SHADOW policy outcomes."', '"A deception-aware security runtime for autonomous agents. Deterministic ALLOW, DENY and SHADOW outcomes, with hardened isolation, controlled synthetic resources and inspectable evidence—not an LLM-based attack detector."')
replace("app/tools/page.tsx", '"Ein deception-aware Security Runtime mit deterministischen ALLOW-, DENY- und SHADOW-Entscheidungen."', '"Eine deception-aware Security-Runtime für autonome Agenten. Deterministische ALLOW-, DENY- und SHADOW-Entscheidungen mit gehärteter Isolation, kontrollierten synthetischen Ressourcen und prüfbaren Nachweisen – kein LLM-basierter Angriffserkenner."')
replace("app/tools/page.tsx", 'current: "CURRENT IMPLEMENTATION",', 'current: "CURRENT IMPLEMENTATION",\n    ghostStatus: "Security-hardening release · Experimental",\n    release: "v0.2.0 Release",')
replace("app/tools/page.tsx", 'current: "AKTUELLE IMPLEMENTIERUNG",', 'current: "AKTUELLE IMPLEMENTIERUNG",\n    ghostStatus: "Release zur Sicherheitshärtung · Experimentell",\n    release: "v0.2.0 Release",')
replace("app/tools/page.tsx", '''      "Docker-isolated sessions",
      "Synthetic agent home and decoy resources",
      "Controlled HTTP/HTTPS egress",
      "Evidence-based decoy-access events",
      "Dynamic network containment",''', '''      "Non-root Docker confinement and a positive guest-environment allowlist",
      "Exact-hostname HTTP/HTTPS egress with validated IPv4 destinations",
      "Synthetic home resources and observed DECOY_ACCESS evidence",
      "Token/ack containment fence for new gateway decisions—not existing connections",
      "Per-project session locking and Ghost-owned resource recovery",
      "Digest-pinned image and fifteen-scenario GhostBench release gate",''')
replace("app/tools/page.tsx", '''      "Docker-isolierte Sessions",
      "Synthetisches Agenten-Home und Decoy-Ressourcen",
      "Kontrollierter HTTP/HTTPS-Egress",
      "Evidenzbasierte Decoy-Access-Events",
      "Dynamische Netzwerk-Containment",''', '''      "Nicht-Root-Docker-Isolation und positive Allowlist für die Gastumgebung",
      "HTTP/HTTPS-Egress für exakte Hostnamen mit validierten IPv4-Zielen",
      "Synthetische Home-Ressourcen und beobachtete DECOY_ACCESS-Nachweise",
      "Token/Ack-Containment-Fence für neue Gateway-Entscheidungen, nicht bestehende Verbindungen",
      "Session-Sperren pro Projekt und Bereinigung Ghost-eigener Ressourcen",
      "Digest-fixiertes Image und GhostBench-Release-Gate mit fünfzehn Szenarien",''')
replace("app/tools/page.tsx", 'repo: "https://github.com/rappidAI-Research/rappid-ghost",', 'repo: ghostLinks.repository,')
replace("app/tools/page.tsx", '                  <details>\n', '                  {isGhost && <p className="mt-5 text-sm font-medium text-accent">{ghostRelease.version} · {c.ghostStatus}</p>}\n                  <details>\n')
replace("app/tools/page.tsx", '''                    <ActionLink href={tool.repo} external variant="secondary">
                      {c.inspect}
                    </ActionLink>''', '''                    <ActionLink href={tool.repo} external variant="secondary">
                      {c.inspect}
                    </ActionLink>
                    {isGhost && <ActionLink href={ghostLinks.release} external variant="secondary">{c.release}</ActionLink>}''')
old_description = "A deception-aware security runtime for autonomous AI agents with deterministic ALLOW, DENY and SHADOW policy outcomes."
new_description = "Ghost v0.2.0: a security-hardening release for autonomous AI agents. Explore ALLOW, DENY, SHADOW, installation, fifteen GhostBench scenarios and documented limits."
replace("content/pages.ts", '"Ghost — rappidAI Research"', '"Ghost v0.2.0 — rappidAI Research"')
replace("content/pages.ts", old_description, new_description)
replace("content/locales/de-metadata.ts", '"Ghost — rappidAI Research": "Ghost — rappidAI Research"', '"Ghost v0.2.0 — rappidAI Research": "Ghost v0.2.0 — rappidAI Research"')
replace("content/locales/de-metadata.ts", old_description, new_description)
replace("content/locales/de-metadata.ts", 'Ein deception-aware Security Runtime für autonome KI-Agenten mit deterministischen ALLOW-, DENY- und SHADOW-Entscheidungen.', 'Ghost v0.2.0: Sicherheitshärtung für autonome KI-Agenten. ALLOW, DENY, SHADOW, Installation, fünfzehn GhostBench-Szenarien und dokumentierte Grenzen.')

# Keep the shell example simple: an ordinary verified source build, no invented installer.
p = Path("content/ghost.ts")
t = p.read_text()
a = t.index('  install: `')
b = t.index('  start: `', a)
t = t[:a] + '''  install: `git clone --branch v0.2.0 --depth 1 https://github.com/rappidAI-Research/rappid-ghost.git
cd rappid-ghost
go build -o bin/ghost ./cmd/ghost
export PATH="$PWD/bin:$PATH"
ghost version`,
''' + t[b:]
p.write_text(t)

Path("tests/ghost.test.ts").write_text(r'''import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ghostBenchScenarios, ghostCommands, ghostCopy, ghostLinks, ghostRelease } from "@/content/ghost";
import { metadataFor } from "@/lib/metadata";

describe("Ghost released source and site-wide consistency", () => {
  it("pins the actual v0.2.0 release and its recorded fifteen-scenario result", () => {
    expect(ghostRelease.version).toBe("v0.2.0");
    expect(ghostRelease.commit).toBe("001d0baa953301f9fc94443e0e45b28d9f93fac0");
    expect(ghostLinks.gate).toContain("/actions/runs/34052802282");
    expect(ghostRelease.bench).toEqual({ passed: 15, failed: 0, skipped: 0 });
    expect(ghostBenchScenarios).toHaveLength(15);
    expect(new Set(ghostBenchScenarios).size).toBe(15);
    expect(ghostBenchScenarios.slice(-5)).toEqual(["private-destination-blocked", "environment-isolation", "container-confinement", "concurrent-containment", "interrupted-session-recovery"]);
  });
  for (const locale of ["en", "de"] as const) {
    it(`${locale} provides the complete release presentation and translated metadata`, () => {
      const copy = ghostCopy[locale];
      expect(copy.intro.eyebrow).toContain(ghostRelease.version);
      expect(copy.benchResult).toBe("PASS: 15 · FAIL: 0 · SKIP: 0");
      expect(copy.policies.map(({ name }) => name)).toEqual(["ALLOW", "DENY", "SHADOW"]);
      expect(copy.changes).toHaveLength(6);
      expect(copy.layers).toHaveLength(8);
      expect(copy.limits).toHaveLength(5);
      expect(copy.sourceNames).toHaveLength(12);
      const metadata = metadataFor("/tools/ghost", locale);
      expect(String(metadata.title)).toContain(ghostRelease.version);
      expect(metadata.description).toContain(locale === "de" ? "Sicherheitshärtung" : "security-hardening");
      expect(copy.policyScope).toContain("LLM");
      expect(copy.practicalLimit).toContain("argv");
      expect(copy.fenceDetail).toContain(locale === "de" ? "Paketebene" : "packet-level");
    });
  }
  it("uses real release/source destinations and not moving documentation", () => {
    for (const href of Object.values(ghostLinks)) {
      expect(new URL(href).origin).toBe("https://github.com");
      expect(href).toContain("/rappidAI-Research/rappid-ghost");
      expect(href).not.toContain("/main/");
    }
    expect(ghostLinks.readme).toContain(`/blob/${ghostRelease.commit}/README.md`);
    expect(ghostLinks.release).toEndWith("/releases/tag/v0.2.0");
    expect(ghostLinks.checksums).toEndWith("/SHA256SUMS");
  });
  it("contains complete usable source-build and CLI examples", () => {
    expect(ghostCommands.install).toContain("--branch v0.2.0");
    expect(ghostCommands.install).toContain("go build -o bin/ghost ./cmd/ghost");
    expect(ghostCommands.install).toContain('export PATH="$PWD/bin:$PATH"');
    expect(ghostCommands.start).toContain("ghost init\nghost run -- echo");
    expect(ghostCommands.shadow).toContain("ghost run -- sh -c 'cat ~/.aws/credentials'");
    expect(ghostCommands.shadow).toContain("ghost inspect latest\nghost graph latest\nghost incidents latest");
    expect(ghostCommands.bench).toContain("ghost bench --require-all");
    for (const code of Object.values(ghostCommands)) expect(code).not.toContain("\\n");
  });
  it("leaves no obsolete Ghost versions, benchmark totals or source pins in live presentation", () => {
    for (const path of ["app/tools/ghost/page.tsx", "content/ghost.ts", "app/tools/page.tsx", "app/page.tsx", "content/pages.ts", "content/locales/de-metadata.ts"]) {
      const source = readFileSync(path, "utf8");
      expect(source, path).not.toMatch(/v0\.1(?:\.0)?|PASS: 10|83974c3115f103a1982bb445c3f2aef6a8f528ea|cf32cdd6d708e132ab10278780a6d5b46b5f1eb8/i);
    }
    for (const path of ["app/page.tsx", "app/tools/page.tsx"]) {
      expect(readFileSync(path, "utf8")).toContain("ghostRelease.version");
    }
  });
});
''')

Path("tests/e2e/ghost.spec.ts").write_text(r'''import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ghostLinks, ghostRelease } from "../../content/ghost";

test.use({ reducedMotion: "reduce" });
for (const locale of ["en", "de"] as const) {
  const route = locale === "de" ? "/de/tools/ghost" : "/tools/ghost";
  for (const width of [375, 768, 1280, 1440]) {
    test(`Ghost ${locale} release content and responsive layout at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator(".page-intro-context")).toContainText(ghostRelease.version);
      await expect(page).toHaveTitle(/Ghost v0\.2\.0/);
      await expect(page.getByTestId("ghost-bench-result")).toHaveText("PASS: 15 · FAIL: 0 · SKIP: 0");
      await expect(page.locator(`a[href="${ghostLinks.repository}"]`).first()).toBeVisible();
      await expect(page.locator(`a[href="${ghostLinks.release}"]`).first()).toBeVisible();
      await expect(page.locator("main")).not.toContainText("v0.1.0");
      await expect(page.locator("main")).not.toContainText("PASS: 10");
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: testInfo.outputPath(`ghost-${locale}-${width}.png`), fullPage: true });
      await page.locator(".intro-index a[href='#ghost-setup']").click();
      await expect(page).toHaveURL(/#ghost-setup$/);
      for (const detail of await page.locator("main details").all()) {
        await detail.locator("summary").click();
        await expect(detail).toHaveAttribute("open", "");
      }
      const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(overflowing, `Horizontal overflow at ${width}px`).toBe(false);
      const anchors = await page.locator("main a[href^='#']").evaluateAll((links) => links.map(link => link.getAttribute("href")!.slice(1)));
      for (const id of anchors) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
      if (width === 375 || width === 1440) {
        const violations = (await new AxeBuilder({ page }).analyze()).violations.filter(({ impact }) => impact === "serious" || impact === "critical");
        expect(violations.map(({ id, help }) => `${id}: ${help}`)).toEqual([]);
      }
    });
  }
  test(`Ghost ${locale} overview and home advertise the same release without changing Replay`, async ({ page }) => {
    await page.goto(locale === "de" ? "/de" : "/");
    await expect(page.locator(".product-ghost .product-status")).toContainText(ghostRelease.version);
    await expect(page.locator(".product-replay .product-status")).not.toContainText(ghostRelease.version);
    await page.goto(locale === "de" ? "/de/tools" : "/tools");
    await expect(page.locator(".tool-showcase-card").first()).toContainText(ghostRelease.version);
    await expect(page.locator(".tool-showcase-card").first().locator(`a[href="${ghostLinks.release}"]`)).toBeVisible();
  });
}

test("Ghost external release, documentation and asset links resolve", async ({ request }) => {
  test.skip(process.env.GHOST_CHECK_EXTERNAL_LINKS !== "1", "Opt-in network verification, separate from deterministic browser regressions");
  test.setTimeout(180000);
  for (const href of new Set(Object.values(ghostLinks))) {
    const response = await request.head(href, { timeout: 20000 });
    expect(response.ok(), `${href} returned ${response.status()}`).toBe(true);
  }
});
''')

Path("docs/ghost-v0.2-site-evidence.md").write_text('''# Ghost v0.2.0 website evidence

The website describes the released experimental security-hardening version, not an architecture roadmap.

## Source snapshot

- Release: https://github.com/rappidAI-Research/rappid-ghost/releases/tag/v0.2.0
- Reviewed tag and main commit: `001d0baa953301f9fc94443e0e45b28d9f93fac0` (identical when checked on 6 September 2026).
- Actual release run: https://github.com/rappidAI-Research/rappid-ghost/actions/runs/34052802282
- Release job: `101539306267`; `./bin/ghost bench --require-all --json` recorded `passed: 15`, `failed: 0`, `skipped: 0` at 2026-09-06T18:48:35Z. This is an observed result, not merely the gate requirement in the README.
- Published assets: `ghost_0.2.0_linux_amd64`, `ghost_0.2.0_linux_arm64`, `SHA256SUMS`.

## Claim mapping

All paths below are in the reviewed Ghost commit, not in this website repository.

| Website content | Primary evidence |
| --- | --- |
| Purpose, ALLOW / DENY / SHADOW, supported synthetic paths | `README.md`, `docs/architecture.md`, `docs/threat-model.md` |
| IPv4 answer-set validation, metadata ranges, fixed ports, no second lookup, internal topology | `docs/network-security.md`, `internal/network/`, `internal/runtime/` |
| Container confinement and positive environment allowlist | `docs/security-model.md`, `CHANGELOG.md`, `internal/runtime/` |
| Token/ack queue fence and existing-connection limitation | `docs/network-security.md`, `docs/architecture.md` |
| Per-project locking, incomplete-session recovery and terminal cleanup limit | `docs/security-model.md`, `internal/session/`, `internal/runtime/` |
| Digest pin, module checks and checksummed release | `README.md`, `CHANGELOG.md`, `.github/workflows/release.yml` |
| CLI and source build | `README.md`, `internal/cli/cli.go`, `go.mod` |
| Fifteen scenario identities and assertions | `docs/benchmarks.md`, `internal/bench/`, actual release job above |
| Observed events versus ordering, causation and intent | `docs/provenance.md`, `docs/incidents.md`, `docs/threat-model.md` |
| Experimental status and private reporting | `SECURITY.md` |

## Scope of website changes

English and German Ghost pages share `content/ghost.ts` and the existing localized renderer. Home and tools-overview cards use the same release version. Ghost metadata is updated in both languages. Existing routes, navigation, illustration primitives, typography, global styles, dependencies, Replay content and model pages remain unchanged.

The full repository scan found additional uses of the word Ghost in route/type declarations, generic navigation translations, the Ghost illustration and the decorative `footer-ghost` class. Those are not outdated release claims. The website package's own `0.1.0` version is unrelated to Ghost and is intentionally unchanged.

Security language deliberately excludes universal escape/exfiltration prevention, LLM intent detection, unsupported IPv6 egress and automatic revocation of established connections. Exposed workspace secrets and persisted command arguments are called out. Benchmarks are reproducible named assertions, never a numerical security score.

## Regression checks

`tests/ghost.test.ts` checks release/source pins, bilingual metadata, supported commands, scenario identities and stale Ghost presentation. `tests/e2e/ghost.spec.ts` checks both locales at 375, 768, 1280 and 1440 pixels, anchors, page overflow, release CTAs and serious/critical accessibility violations. External Ghost links are checked when `GHOST_CHECK_EXTERNAL_LINKS=1` is set. The existing whole-site checks remain unchanged.
''')
