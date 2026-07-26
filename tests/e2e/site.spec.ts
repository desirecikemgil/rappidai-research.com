import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/models",
  "/models/quantum-1-pilot",
  "/models/quantum-1-6-pilot",
  "/models/quantum-1-echelon",
  "/research",
  "/resources",
  "/resources/publications",
  "/resources/publications/from-100m-to-600m-german-tokens",
  "/resources/reproducibility",
  "/resources/data-and-training",
  "/resources/responsible-use",
  "/resources/licensing",
  "/resources/status",
  "/resources/faq",
  "/about",
  "/contact",
  "/imprint",
  "/privacy",
] as const;

for (const route of publicRoutes) {
  test(`${route} renders one accessible page heading`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();

    const seriousViolations = (
      await new AxeBuilder({ page }).analyze()
    ).violations.filter(({ impact }) =>
      ["serious", "critical"].includes(impact ?? ""),
    );

    expect(
      seriousViolations,
      seriousViolations
        .map(
          ({ id, help, nodes }) =>
            `${id}: ${help} (${nodes.length} affected node(s))`,
        )
        .join("\n"),
    ).toEqual([]);
  });
}

for (const route of publicRoutes) {
  const germanRoute = route === "/" ? "/de" : `/de${route}`;

  test(`${germanRoute} renders its localized page`, async ({ page }) => {
    const response = await page.goto(germanRoute);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
  });
}

test("internal navigation targets return successful responses", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute("href")))].filter(
        (href): href is string => Boolean(href),
      ),
    );

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.ok(), `${href} returned ${response.status()}`).toBe(true);
  }
});

test("language switch preserves the current deep route", async ({ page }) => {
  await page.goto("/resources/licensing");

  await page
    .getByRole("link", { name: /switch to deutsch/i })
    .first()
    .click();
  await expect(page).toHaveURL("/de/resources/licensing");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Öffentliche Verfügbarkeit",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "de");

  await page
    .getByRole("link", { name: /wechseln zu english/i })
    .first()
    .click();
  await expect(page).toHaveURL("/resources/licensing");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("contact form reports required fields without claiming a send", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /continue in email app/i }).click();

  await expect(page.locator('form [role="alert"]')).toHaveCount(4);
  await expect(page.locator('input[name="name"]')).toBeFocused();
  await expect(page.getByRole("status")).toContainText(
    "No message has been sent.",
  );
});

test("German contact form reports localized validation messages", async ({
  page,
}) => {
  await page.goto("/de/contact");
  await page.getByRole("button", { name: /in e-mail-app fortfahren/i }).click();

  await expect(page.locator('form [role="alert"]')).toHaveCount(4);
  await expect(page.getByRole("status")).toContainText(
    "Es wurde keine Nachricht gesendet.",
  );
});

test("home hero uses a two-line interactive network composition", async ({
  page,
}) => {
  await page.goto("/");

  const heroLines = page.locator(".home-hero-title .reveal-text-line");
  await expect(heroLines).toHaveCount(2);
  await expect(heroLines).toHaveText([
    "Smaller Models.",
    "Focused Intelligence.",
  ]);
  await expect(page.locator(".hero-network")).toHaveCount(1);
  await expect(page.locator(".hero-visual")).toHaveCount(0);

  await page.mouse.move(1200, 220);
  await expect
    .poll(() =>
      page
        .locator(".hero-network")
        .evaluate((element) =>
          element.style.getPropertyValue("--hero-pointer-x"),
        ),
    )
    .not.toBe("72%");
});

test("home hero keeps both headline lines complete on mobile", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const measurements = await page.evaluate(() => ({
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
    lines: [
      ...document.querySelectorAll(".home-hero-title .reveal-text-line"),
    ].map((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      text: element.textContent?.trim(),
    })),
  }));

  expect(measurements.overflow).toBeLessThanOrEqual(0);
  expect(measurements.lines).toHaveLength(2);
  expect(measurements.lines.map(({ text }) => text)).toEqual([
    "Smaller Models.",
    "Focused Intelligence.",
  ]);
  for (const line of measurements.lines) {
    expect(line.scrollWidth).toBeLessThanOrEqual(line.clientWidth);
  }
});

test("model comparison switches between all three visual views", async ({
  page,
}) => {
  await page.goto("/models");

  const architectureTab = page.getByRole("tab", { name: "Architecture" });
  const tokenizerTab = page.getByRole("tab", { name: "Tokenizer" });
  const pipelineTab = page.getByRole("tab", { name: "Data pipeline" });

  await expect(architectureTab).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("tabpanel").locator(".comparison-model-card"),
  ).toHaveCount(3);

  await tokenizerTab.click();
  await expect(tokenizerTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "One frozen pilot tokenizer",
  );

  await pipelineTab.click();
  await expect(pipelineTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "8B configured training-token target",
  );
});

test("German model comparison is translated and keyboard operable", async ({
  page,
}) => {
  await page.goto("/de/models");

  const architectureTab = page.getByRole("tab", { name: "Architektur" });
  await architectureTab.focus();
  await architectureTab.press("ArrowRight");

  const tokenizerTab = page.getByRole("tab", { name: "Tokenizer" });
  await expect(tokenizerTab).toBeFocused();
  await expect(tokenizerTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Ein eingefrorener Pilot-Tokenizer",
  );

  await page.getByRole("tab", { name: "Datenpipeline" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "8 Mrd. Trainings-Token",
  );
});

test("reduced-motion rendering avoids horizontal overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/research");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

for (const route of ["/models", "/de/models"] as const) {
  test(`${route} comparison fits a reduced-motion mobile viewport`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    const pipelineName = route.startsWith("/de")
      ? "Datenpipeline"
      : "Data pipeline";
    await page.getByRole("tab", { name: pipelineName }).click();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(
      page.getByRole("tabpanel").locator(".comparison-model-card"),
    ).toHaveCount(3);
  });
}

for (const route of [
  "/resources",
  "/resources/publications/from-100m-to-600m-german-tokens",
  "/resources/reproducibility",
  "/resources/data-and-training",
  "/resources/responsible-use",
  "/resources/licensing",
  "/resources/status",
  "/resources/faq",
] as const) {
  test(`${route} fits a reduced-motion mobile viewport`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.locator("h1")).toBeVisible();
  });
}

for (const route of [
  "/de/research",
  "/de/resources",
  "/de/resources/publications/from-100m-to-600m-german-tokens",
  "/de/resources/licensing",
] as const) {
  test(`${route} fits a reduced-motion mobile viewport`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await expect(page.locator("h1")).toBeVisible();
  });
}

test("robots and sitemap endpoints are public", async ({ request }) => {
  const [robots, sitemap] = await Promise.all([
    request.get("/robots.txt"),
    request.get("/sitemap.xml"),
  ]);

  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");
  expect(sitemap.ok()).toBe(true);

  const sitemapBody = await sitemap.text();
  for (const route of publicRoutes) {
    expect(sitemapBody).toContain(
      route === "/"
        ? "https://www.rappidai-research.com"
        : `https://www.rappidai-research.com${route}`,
    );
    expect(sitemapBody).toContain(
      route === "/"
        ? "https://www.rappidai-research.com/de"
        : `https://www.rappidai-research.com/de${route}`,
    );
  }
});
