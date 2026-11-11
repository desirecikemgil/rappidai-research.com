import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "de"] as const) {
  const prefix = locale === "de" ? "/de" : "";
  test(`Sentinel Engine ${locale}: overview, navigation, planned status and responsive layout`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${prefix}/tools`);
    const cards = page.locator(".tool-showcase-card");
    await expect(cards).toHaveCount(3);
    const boxes = await cards.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top, width: rect.width, height: rect.height };
      }),
    );
    for (const box of boxes.slice(1)) {
      expect(Math.abs(box.top - boxes[0].top)).toBeLessThan(2);
      expect(Math.abs(box.width - boxes[0].width)).toBeLessThan(2);
      expect(Math.abs(box.height - boxes[0].height)).toBeLessThan(2);
    }
    await expect(cards.nth(2)).toContainText(
      locale === "de" ? "Geplant" : "Planned",
    );
    await cards.nth(2).getByRole("link").click();
    await expect(page).toHaveURL(`${prefix}/tools/sentinel-engine`);
    await expect(page.locator("h1")).toHaveText("Sentinel Engine");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.rappidai-research.com${prefix}/tools/sentinel-engine`,
    );
    await expect(page.locator(".page-intro .facts")).toContainText(
      locale === "de" ? "Geplant" : "Planned",
    );
    await expect(page.locator("#engine-developer")).toContainText(
      locale === "de" ? "Fiktives Befundbeispiel" : "Fictional finding example",
    );
    await expect(page.locator("#engine-developer")).toContainText(
      locale === "de"
        ? "Keine bestätigte öffentliche CLI-Spezifikation"
        : "not a verified public CLI specification",
    );
    await expect(
      page.locator('main a[href*="releases"], main a[href*="download"]'),
    ).toHaveCount(0);
    await expect(
      page
        .locator(`main a[href="${prefix}/models/quantum-sentinel-alpha"]`)
        .first(),
    ).toBeVisible();
    await page.locator('.intro-index a[href="#engine-workflow"]').click();
    await expect(page).toHaveURL(/#engine-workflow$/);
    const brokenAnchors = await page
      .locator('main a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href")!.slice(1))
          .filter((id) => !document.getElementById(id)),
      );
    expect(brokenAnchors).toEqual([]);

    for (const width of [320, 375, 414, 768, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scroll, `Overflow at ${width}px`).toBeLessThanOrEqual(
        dimensions.client,
      );
      if (width === 375 || width === 1440) {
        await page.screenshot({
          path: testInfo.outputPath(`sentinel-engine-${locale}-${width}.png`),
          fullPage: true,
        });
        const violations = (
          await new AxeBuilder({ page }).analyze()
        ).violations.filter(
          ({ impact }) => impact === "serious" || impact === "critical",
        );
        expect(violations.map(({ id, help }) => `${id}: ${help}`)).toEqual([]);
      }
    }
  });
}
