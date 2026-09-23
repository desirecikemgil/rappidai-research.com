import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["en", "de"] as const) {
  const home = locale === "en" ? "/" : "/de";
  const models = locale === "en" ? "/models" : "/de/models";
  const model = `${models}/quantum-1-echelon`;
  const cta =
    locale === "en"
      ? "Explore Quantum 1 Echelon"
      : "Quantum 1 Echelon entdecken";
  const status = locale === "en" ? "Coming Soon" : "Demnächst";

  test(`${locale}: launch navigation, target specs and historical releases`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type()))
        errors.push(message.text());
    });
    await page.goto(home);
    await expect(page.locator("h1")).toHaveText("Quantum 1 Echelon");
    await expect(page.getByText(status, { exact: true })).toBeVisible();
    await page.getByRole("link", { name: cta, exact: true }).click();
    await expect(page).toHaveURL(model);
    await expect(page).toHaveTitle("Quantum 1 Echelon — rappidAI Research");
    const specs = page.locator("#specifications");
    await expect(specs).toContainText(
      locale === "en" ? "4,096 tokens" : "4.096 Tokens",
    );
    await expect(specs).toContainText(
      locale === "en" ? "40B tokens" : "40 Mrd. Tokens",
    );
    await expect(specs).toContainText(
      locale === "en" ? "Under evaluation" : "In Prüfung",
    );
    await expect(specs).toContainText(
      locale === "en" ? "development targets" : "Entwicklungsziele",
    );
    await expect(
      page.getByRole("link", { name: /download|herunterladen/i }),
    ).toHaveCount(0);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toBe(`https://www.rappidai-research.com${model}`);
    const internalLinks = await page
      .locator('main a[href^="#"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
    for (const href of internalLinks)
      await expect(page.locator(href)).toHaveCount(1);
    await page
      .getByRole("link", {
        name: locale === "en" ? "All models" : "Alle Modelle",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(models);
    await expect(page.locator(".model-catalog article")).toHaveCount(3);
    await expect(page.locator(".model-catalog article").first()).toContainText(
      "Quantum 1 Echelon",
    );
    await expect(page.locator(".model-catalog")).toContainText(
      "quantum-1-pilot",
    );
    await expect(page.locator(".model-catalog")).toContainText(
      "quantum-1.6-pilot",
    );
    await page
      .getByRole("button", {
        name:
          locale === "en"
            ? "Public releases"
            : "Öffentliche Veröffentlichungen",
        exact: true,
      })
      .click();
    await expect(page.locator(".model-catalog article")).toHaveCount(2);
    await expect(page.locator(".model-index-featured")).toHaveCount(0);
    await page
      .getByRole("button", {
        name: locale === "en" ? "In development" : "In Entwicklung",
        exact: true,
      })
      .click();
    await expect(page.locator(".model-catalog article")).toHaveCount(1);
    await page.locator(".model-index-featured a").click();
    await expect(page).toHaveURL(model);
    expect(errors).toEqual([]);
  });
}

for (const width of [375, 768, 1440, 1920]) {
  test(`Echelon layout and accessibility at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: width === 375 ? 812 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of [
      "/",
      "/models",
      "/models/quantum-1-echelon",
      "/de/models/quantum-1-echelon",
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
      if (route === "/") {
        const cta = await page
          .getByRole("link", { name: "Explore Quantum 1 Echelon", exact: true })
          .boundingBox();
        expect(cta!.y + cta!.height).toBeLessThanOrEqual(
          page.viewportSize()!.height,
        );
      }
      const violations = (
        await new AxeBuilder({ page }).analyze()
      ).violations.filter(({ impact }) =>
        ["serious", "critical"].includes(impact ?? ""),
      );
      expect(violations, `${route} at ${width}px`).toEqual([]);
      if (process.env.ECHELON_QA_SCREENSHOTS) {
        const name =
          route === "/" ? "home" : route.replaceAll("/", "-").slice(1);
        await page.screenshot({
          path: testInfo.outputPath(`${name}-${width}.png`),
          fullPage: true,
        });
      }
    }
  });
}

test("pointer enhancement settles, pauses offscreen and respects live motion changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const aura = page.getByTestId("echelon-aura");
  const offset = () =>
    aura.evaluate((element) => element.style.getPropertyValue("--aura-x"));
  await expect(aura).toHaveAttribute("data-interactive", "true");
  await page.mouse.move(1150, 330);
  await expect.poll(offset).not.toBe("");
  await expect.poll(async () => parseFloat(await offset())).toBeGreaterThan(5);
  expect(parseFloat(await offset())).toBeLessThanOrEqual(22);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator("section").first()).not.toBeInViewport();
  await expect(aura).toHaveAttribute("data-running", "false");
  await expect(aura).toHaveAttribute("data-interactive", "false");
  expect(parseFloat(await offset())).toBe(0);
  await page.locator("h1").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(aura).toHaveAttribute("data-running", "false");
  await expect(aura).toHaveAttribute("data-interactive", "false");
  await page.mouse.move(1200, 400);
  expect(parseFloat(await offset())).toBe(0);
  const runningAnimations = await aura.evaluate(
    (element) =>
      element
        .getAnimations({ subtree: true })
        .filter((animation) => animation.playState === "running").length,
  );
  expect(runningAnimations).toBe(0);
  await expect(aura.locator("canvas")).toHaveCount(0);
});

test("touch devices do not require a pointer and support mobile navigation", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByTestId("echelon-aura")).toHaveAttribute(
    "data-interactive",
    "false",
  );
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Models", exact: true })
    .click();
  await expect(page).toHaveURL("/models");
  await page.locator(".model-index-featured a").click();
  await expect(page).toHaveURL("/models/quantum-1-echelon");
  await context.close();
});

test("launch content and navigation are available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Quantum 1 Echelon");
  await page
    .getByRole("link", { name: "Explore Quantum 1 Echelon", exact: true })
    .click();
  await expect(page.locator("#specifications")).toContainText(
    "Under evaluation",
  );
  await context.close();
});
