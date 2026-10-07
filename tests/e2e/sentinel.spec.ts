import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "de"] as const) {
  const home = locale === "en" ? "/" : "/de";
  const models = locale === "en" ? "/models" : "/de/models";
  const model = `${models}/quantum-sentinel-alpha`;
  test(`${locale}: Sentinel leads the homepage and keeps Echelon reachable`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(home);
    await expect(page.locator("h1")).toHaveText("Quantum Sentinel Alpha");
    await expect(page.locator("section").first()).toContainText("Qwen3.5-9B");
    await page
      .getByRole("link", {
        name:
          locale === "en"
            ? "Explore Quantum Sentinel Alpha"
            : "Quantum Sentinel Alpha entdecken",
        exact: true,
      })
      .first()
      .click();
    await expect(page).toHaveURL(model);
    await expect(page.locator("#foundation")).toContainText("Qwen3.5-4B");
    await expect(page.locator("#roadmap")).toContainText(
      "Quantum Sentinel 1.0",
    );
    await expect(
      page.getByRole("link", { name: /download|herunterladen/i }),
    ).toHaveCount(0);
    const hrefs = await page
      .locator('main a[href^="#"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
    for (const href of hrefs) await expect(page.locator(href)).toHaveCount(1);
    await page
      .getByRole("link", {
        name: locale === "en" ? "All models" : "Alle Modelle",
        exact: true,
      })
      .first()
      .click();
    await expect(page.locator(".model-catalog article")).toHaveCount(4);
    await expect(page.locator(".model-catalog article").first()).toContainText(
      "Quantum Sentinel Alpha",
    );
    await expect(page.locator(".model-catalog article").nth(1)).toContainText(
      "Quantum 1 Echelon",
    );
    await page.locator(".model-index-featured a").click();
    await expect(page).toHaveURL(`${models}/quantum-1-echelon`);
    await expect(page.locator("h1")).toHaveText("Quantum 1 Echelon");
    for (const route of [home, models, model, `${models}/quantum-1-echelon`])
      expect((await request.get(route)).ok()).toBe(true);
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 375, 768, 1440]) {
  test(`Sentinel responsive layout and accessibility at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: width <= 375 ? 812 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of [
      "/",
      "/de",
      "/models/quantum-sentinel-alpha",
      "/de/models/quantum-sentinel-alpha",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(0);
      await expect(page.locator("h1")).toHaveCount(1);
      const violations = (
        await new AxeBuilder({ page }).analyze()
      ).violations.filter(({ impact }) =>
        ["serious", "critical"].includes(impact ?? ""),
      );
      expect(violations, `${route} at ${width}px`).toEqual([]);
      if (process.env.SENTINEL_QA_SCREENSHOTS)
        await page.screenshot({
          path: testInfo.outputPath(
            `${route.replaceAll("/", "-") || "home"}-${width}.png`,
          ),
          fullPage: true,
        });
    }
  });
}
