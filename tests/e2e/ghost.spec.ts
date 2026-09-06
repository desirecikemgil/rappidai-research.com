import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ghostLinks, ghostRelease } from "../../content/ghost";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});
for (const locale of ["en", "de"] as const) {
  const route = locale === "de" ? "/de/tools/ghost" : "/tools/ghost";
  for (const width of [375, 768, 1280, 1440]) {
    test(`Ghost ${locale} release content and responsive layout at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator(".page-intro-context")).toContainText(
        ghostRelease.version,
      );
      await expect(page).toHaveTitle(/Ghost v0\.2\.0/);
      await expect(page.getByTestId("ghost-bench-result")).toHaveText(
        "PASS: 15 · FAIL: 0 · SKIP: 0",
      );
      await expect(
        page.locator(`a[href="${ghostLinks.repository}"]`).first(),
      ).toBeVisible();
      await expect(
        page.locator(`a[href="${ghostLinks.release}"]`).first(),
      ).toBeVisible();
      await expect(page.locator("main")).not.toContainText("v0.1.0");
      await expect(page.locator("main")).not.toContainText("PASS: 10");
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: testInfo.outputPath(`ghost-${locale}-${width}.png`),
        fullPage: true,
      });
      await page.locator(".intro-index a[href='#ghost-setup']").click();
      await expect(page).toHaveURL(/#ghost-setup$/);
      for (const detail of await page.locator("main details").all()) {
        await detail.locator("summary").click();
        await expect(detail).toHaveAttribute("open", "");
      }
      const overflowing = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflowing, `Horizontal overflow at ${width}px`).toBe(false);
      const anchors = await page
        .locator("main a[href^='#']")
        .evaluateAll((links) =>
          links.map((link) => link.getAttribute("href")!.slice(1)),
        );
      for (const id of anchors)
        await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
      if (width === 375 || width === 1440) {
        const violations = (
          await new AxeBuilder({ page }).analyze()
        ).violations.filter(
          ({ impact }) => impact === "serious" || impact === "critical",
        );
        expect(violations.map(({ id, help }) => `${id}: ${help}`)).toEqual([]);
      }
    });
  }
  test(`Ghost ${locale} overview and home advertise the same release without changing Replay`, async ({
    page,
  }) => {
    await page.goto(locale === "de" ? "/de" : "/");
    await expect(page.locator(".product-ghost .product-status")).toContainText(
      ghostRelease.version,
    );
    await expect(
      page.locator(".product-replay .product-status"),
    ).not.toContainText(ghostRelease.version);
    await page.goto(locale === "de" ? "/de/tools" : "/tools");
    await expect(page.locator(".tool-showcase-card").first()).toContainText(
      ghostRelease.version,
    );
    await expect(
      page
        .locator(".tool-showcase-card")
        .first()
        .locator(`a[href="${ghostLinks.release}"]`),
    ).toBeVisible();
  });
}

test("Ghost external release, documentation and asset links resolve", async ({
  request,
}) => {
  test.skip(
    process.env.GHOST_CHECK_EXTERNAL_LINKS !== "1",
    "Opt-in network verification, separate from deterministic browser regressions",
  );
  test.setTimeout(300000);
  for (const href of new Set(Object.values(ghostLinks))) {
    // Pace public GitHub requests; a rate limit is not a successful link check.
    await new Promise((resolve) => setTimeout(resolve, 2500));
    let response = await request.head(href, { timeout: 20000 });
    for (let attempt = 0; response.status() === 429 && attempt < 3; attempt++) {
      const retryAfter = Number(response.headers()["retry-after"]);
      const delay =
        Number.isFinite(retryAfter) && retryAfter > 0
          ? Math.min(retryAfter, 60)
          : 15;
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      response = await request.head(href, { timeout: 20000 });
    }
    console.info(`Ghost link ${response.status()}: ${href}`);
    expect(response.ok(), `${href} returned ${response.status()}`).toBe(true);
  }
});
