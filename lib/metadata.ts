import type { Metadata } from "next";
import { getPageMetadata } from "@/content/pages";
import { siteConfig } from "@/content/site";
import type { SiteRoute } from "@/content/types";
import {
  localizeContent,
  localizePath,
  type Locale,
} from "@/lib/i18n";

type ToolRoute = "/tools" | "/tools/ghost" | "/tools/replay";
type MetadataRoute = SiteRoute | ToolRoute;

const toolMetadata: Record<
  ToolRoute,
  { title: string; description: string }
> = {
  "/tools": {
    title: "Tools — rappidAI Research",
    description:
      "Ghost and Replay: open-source infrastructure for controllable and reproducible AI-agent execution.",
  },
  "/tools/ghost": {
    title: "Ghost — rappidAI Research",
    description:
      "A deception-aware security runtime for autonomous AI agents with deterministic ALLOW, DENY and SHADOW policy outcomes.",
  },
  "/tools/replay": {
    title: "Replay — rappidAI Research",
    description:
      "Local-first infrastructure for recording, verifying, restoring, branching, rerunning and diffing AI-agent executions.",
  },
};

function metadataRecord(route: MetadataRoute) {
  return route in toolMetadata
    ? toolMetadata[route as ToolRoute]
    : getPageMetadata(route as SiteRoute);
}

export function metadataFor(
  route: MetadataRoute,
  locale: Locale = "en",
): Metadata {
  const page = localizeContent(metadataRecord(route), locale);
  const localizedRoute = localizePath(route, locale);
  const canonical = siteConfig.canonicalUrl
    ? new URL(localizedRoute, siteConfig.canonicalUrl).toString()
    : undefined;
  const englishUrl = siteConfig.canonicalUrl
    ? new URL(localizePath(route, "en"), siteConfig.canonicalUrl).toString()
    : undefined;
  const germanUrl = siteConfig.canonicalUrl
    ? new URL(localizePath(route, "de"), siteConfig.canonicalUrl).toString()
    : undefined;

  return {
    title: page.title,
    description: page.description,
    alternates: canonical
      ? {
          canonical,
          languages:
            englishUrl && germanUrl
              ? {
                  en: englishUrl,
                  de: germanUrl,
                  "x-default": englishUrl,
                }
              : undefined,
        }
      : undefined,
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_DE"],
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      url: canonical,
      images: canonical
        ? [
            {
              url: new URL(
                siteConfig.brandAssets.ambientReference,
                siteConfig.canonicalUrl!,
              ).toString(),
              width: 1672,
              height: 941,
              alt: "rappidAI research",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: canonical
        ? [
            new URL(
              siteConfig.brandAssets.ambientReference,
              siteConfig.canonicalUrl!,
            ).toString(),
          ]
        : undefined,
    },
  };
}
