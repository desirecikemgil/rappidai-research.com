import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/models",
  "/models/quantum-1-pilot",
  "/models/quantum-1-6-pilot",
  "/models/quantum-1-echelon",
  "/research",
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
  }
});
