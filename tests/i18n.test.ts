import { describe, expect, it } from "vitest";
import { getModelBySlug } from "@/content/models";
import { siteRoutes } from "@/content/routes";
import {
  localeFromPathname,
  localizePath,
  stripLocaleFromPathname,
  t,
} from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";

describe("localized routes", () => {
  it("maps every public route to a stable German URL and back", () => {
    for (const route of siteRoutes) {
      const germanPath = localizePath(route, "de");

      expect(germanPath).toBe(route === "/" ? "/de" : `/de${route}`);
      expect(localeFromPathname(germanPath)).toBe("de");
      expect(stripLocaleFromPathname(germanPath)).toBe(route);
      expect(localizePath(germanPath, "en")).toBe(route);
    }
  });

  it("does not rewrite external, protocol-relative or framework paths", () => {
    expect(localizePath("https://example.com/research", "de")).toBe(
      "https://example.com/research",
    );
    expect(localizePath("//example.com/research", "de")).toBe(
      "//example.com/research",
    );
    expect(localizePath("/_next/static/app.js", "de")).toBe(
      "/_next/static/app.js",
    );
  });
});

describe("German content", () => {
  it("translates navigation, evidence terminology and model prose", () => {
    expect(t("de", "Models")).toBe("Modelle");
    expect(t("de", "Research")).toBe("Forschung");
    expect(t("de", "Resources")).toBe("Ressourcen");
    expect(t("de", "Partial evidence")).toBe("Teilweise Evidenz");

    const model = getModelBySlug("quantum-1-echelon", "de");
    expect(model?.status).toBe("in-development");
    expect(model?.statusLabel).toBe(
      "Pipeline- und Preflight-Phase – kein trainiertes Modell",
    );
    expect(model?.summary).toContain("strategische Quantum-Modelllinie");
  });

  it("localizes legal presentation without changing the English source", () => {
    expect(t("de", "Almutstraße 3, 13467 Berlin, Germany")).toBe(
      "Almutstraße 3, 13467 Berlin, Deutschland",
    );
    expect(t("en", "Almutstraße 3, 13467 Berlin, Germany")).toBe(
      "Almutstraße 3, 13467 Berlin, Germany",
    );
  });
});

describe("localized metadata", () => {
  it("publishes German canonicals and reciprocal language alternates", () => {
    const metadata = metadataFor("/resources", "de");

    expect(metadata.title).toBe("Ressourcen — rappidAI Research");
    expect(metadata.alternates?.canonical).toBe(
      "https://www.rappidai-research.com/de/resources",
    );
    expect(metadata.alternates?.languages).toEqual({
      en: "https://www.rappidai-research.com/resources",
      de: "https://www.rappidai-research.com/de/resources",
      "x-default": "https://www.rappidai-research.com/resources",
    });
    expect(metadata.openGraph?.locale).toBe("de_DE");
    expect(metadata.openGraph?.alternateLocale).toEqual(["en_US"]);
  });
});
