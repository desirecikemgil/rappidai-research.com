import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "de"] as const) {
  const prefix = locale === "de" ? "/de" : "";
  test(`${locale}: security research and resources retain usable source workflows`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of ["research", "resources"]) {
      await page.goto(`${prefix}/${route}`);
      const section = page.locator(
        route === "research" ? "#security-research" : "#security-resources",
      );
      await expect(section).toBeVisible();
      await expect(
        section
          .locator('a[href*="d7354b65063cd07963dcc4753dbd84f81ca8b42d"]')
          .first(),
      ).toBeVisible();
      for (const width of [320, 375, 414, 768, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth <=
              document.documentElement.clientWidth,
          ),
        ).toBe(true);
      }
      await section.scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `work/security-${route}-${locale}-desktop.png`,
      });
      const accessibility = await new AxeBuilder({ page })
        .include(
          route === "research" ? "#security-research" : "#security-resources",
        )
        .analyze();
      expect(
        accessibility.violations.filter((item) =>
          ["serious", "critical"].includes(item.impact ?? ""),
        ),
      ).toEqual([]);
    }
    await expect(
      page.locator("#security-resources pre").last(),
    ).not.toContainText("+  --");
    await page.goto(
      `${prefix}/resources/publications/false-positive-problem-in-ai-vulnerability-detection`,
    );
    await expect(page.locator("#evaluation-protocol")).toBeVisible();
    await expect(
      page
        .locator('a[href*="d7354b65063cd07963dcc4753dbd84f81ca8b42d"]')
        .first(),
    ).toHaveAttribute("href", /docs\/STATUS.md$/);
  });
}
