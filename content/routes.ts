import type { SiteRoute } from "./types";

export const siteRoutes = [
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
] as const satisfies readonly SiteRoute[];

const routeSet = new Set<string>(siteRoutes);

export function isSiteRoute(value: string): value is SiteRoute {
  return routeSet.has(value);
}
