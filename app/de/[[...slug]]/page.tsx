import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedAboutPage } from "@/app/about/view";
import { LocalizedContactPage } from "@/app/contact/view";
import { LocalizedHomePage } from "@/app/view";
import { LocalizedImprintPage } from "@/app/imprint/view";
import { LocalizedModelDetailPage } from "@/app/models/[slug]/view";
import { LocalizedModelsPage } from "@/app/models/view";
import { LocalizedPrivacyPage } from "@/app/privacy/view";
import { LocalizedResearchPage } from "@/app/research/view";
import { LocalizedDataAndTrainingPage } from "@/app/resources/data-and-training/view";
import { LocalizedFaqPage } from "@/app/resources/faq/view";
import { LocalizedLicensingPage } from "@/app/resources/licensing/view";
import { LocalizedResourcesPage } from "@/app/resources/view";
import { LocalizedFalsePositiveNotePage } from "@/app/resources/publications/false-positive-problem-in-ai-vulnerability-detection/view";
import { LocalizedSentinelGardenNotePage } from "@/app/resources/publications/building-a-vulnerability-fix-dataset-you-can-check/view";
import { LocalizedPilotResearchNotePage } from "@/app/resources/publications/from-100m-to-600m-german-tokens/view";
import { LocalizedPublicationsPage } from "@/app/resources/publications/view";
import { LocalizedReproducibilityPage } from "@/app/resources/reproducibility/view";
import { LocalizedResponsibleUsePage } from "@/app/resources/responsible-use/view";
import { LocalizedStatusPage } from "@/app/resources/status/view";
import { isSiteRoute, siteRoutes } from "@/content/routes";
import type { SiteRoute } from "@/content/types";
import { metadataFor } from "@/lib/metadata";

type GermanPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return siteRoutes.map((route) => ({
    slug: route === "/" ? [] : route.slice(1).split("/"),
  }));
}

function routeFromSlug(slug?: string[]): SiteRoute | undefined {
  const route = slug?.length ? `/${slug.join("/")}` : "/";
  return isSiteRoute(route) ? route : undefined;
}

export async function generateMetadata({
  params,
}: GermanPageProps): Promise<Metadata> {
  const route = routeFromSlug((await params).slug);
  return route ? metadataFor(route, "de") : {};
}

export default async function GermanPage({ params }: GermanPageProps) {
  const route = routeFromSlug((await params).slug);
  if (!route) notFound();

  switch (route) {
    case "/":
      return <LocalizedHomePage locale="de" />;
    case "/models":
      return <LocalizedModelsPage locale="de" />;
    case "/models/quantum-1-pilot":
    case "/models/quantum-1-6-pilot":
    case "/models/quantum-1-echelon":
    case "/models/quantum-sentinel-alpha":
      return (
        <LocalizedModelDetailPage
          slug={route.slice("/models/".length)}
          locale="de"
        />
      );
    case "/research":
      return <LocalizedResearchPage locale="de" />;
    case "/resources":
      return <LocalizedResourcesPage locale="de" />;
    case "/resources/publications":
      return <LocalizedPublicationsPage locale="de" />;
    case "/resources/publications/from-100m-to-600m-german-tokens":
      return <LocalizedPilotResearchNotePage locale="de" />;
    case "/resources/publications/false-positive-problem-in-ai-vulnerability-detection":
      return <LocalizedFalsePositiveNotePage locale="de" />;
    case "/resources/publications/building-a-vulnerability-fix-dataset-you-can-check":
      return <LocalizedSentinelGardenNotePage locale="de" />;
    case "/resources/reproducibility":
      return <LocalizedReproducibilityPage locale="de" />;
    case "/resources/data-and-training":
      return <LocalizedDataAndTrainingPage locale="de" />;
    case "/resources/responsible-use":
      return <LocalizedResponsibleUsePage locale="de" />;
    case "/resources/licensing":
      return <LocalizedLicensingPage locale="de" />;
    case "/resources/status":
      return <LocalizedStatusPage locale="de" />;
    case "/resources/faq":
      return <LocalizedFaqPage locale="de" />;
    case "/about":
      return <LocalizedAboutPage locale="de" />;
    case "/contact":
      return <LocalizedContactPage locale="de" />;
    case "/imprint":
      return <LocalizedImprintPage locale="de" />;
    case "/privacy":
      return <LocalizedPrivacyPage locale="de" />;
  }
}
