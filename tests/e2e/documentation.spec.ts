import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "de"] as const) {
  test(`${locale}: documentation remains readable with precise source links`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const prefix = locale === "de" ? "/de" : "";
    const sources = {
      reproducibility: "/docs/benchmarks.md",
      "data-and-training": "/data/registry.yaml",
      "responsible-use": "/docs/threat-model.md",
      licensing: "/LICENSE",
    };
    for (const [topic, target] of Object.entries(sources)) {
      const response = await page.goto(`${prefix}/resources/${topic}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(
        page.locator(`main a[href$="${target}"]`).first(),
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
      const violations = (
        await new AxeBuilder({ page }).analyze()
      ).violations.filter(({ impact }) =>
        ["serious", "critical"].includes(impact ?? ""),
      );
      expect(violations).toEqual([]);
      if (locale === "de") {
        await expect(page.locator("main")).not.toContainText(
          "No project license recorded",
        );
        await expect(page.locator("main")).not.toContainText(
          "Reproduce the right layer",
        );
      }
    }
    await page.goto(`${prefix}/research`);
    await page
      .locator(`a[href="${prefix}/resources/reproducibility"]`)
      .last()
      .click();
    await expect(page).toHaveURL(`${prefix}/resources/reproducibility`);
    await expect(
      page.locator('footer a[href="https://github.com/rappidAI-Research"]'),
    ).toHaveText("GitHub");
  });
}
