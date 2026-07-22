import type { Metadata } from "next";
import { getPageMetadata } from "@/content/pages";
import { siteConfig } from "@/content/site";
import type { SiteRoute } from "@/content/types";

export function metadataFor(route: SiteRoute): Metadata {
  const page = getPageMetadata(route);
  const canonical = siteConfig.canonicalUrl
    ? new URL(route, siteConfig.canonicalUrl).toString()
    : undefined;

  return {
    title: page.title,
    description: page.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
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
