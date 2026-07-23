import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalizedAboutPage } from "@/app/about/page";
import { LocalizedContactPage } from "@/app/contact/page";
import { LocalizedHomePage } from "@/app/page";
import { LocalizedImprintPage } from "@/app/imprint/page";
import { LocalizedModelDetailPage } from "@/app/models/[slug]/page";
import { LocalizedModelsPage } from "@/app/models/page";
import { LocalizedPrivacyPage } from "@/app/privacy/page";
import { LocalizedResearchPage } from "@/app/research/page";
import { LocalizedDataAndTrainingPage } from "@/app/resources/data-and-training/page";
import { LocalizedFaqPage } from "@/app/resources/faq/page";
import { LocalizedLicensingPage } from "@/app/resources/licensing/page";
import { LocalizedResourcesPage } from "@/app/resources/page";
import { LocalizedPilotResearchNotePage } from "@/app/resources/publications/from-100m-to-600m-german-tokens/page";
import { LocalizedPublicationsPage } from "@/app/resources/publications/page";
import { LocalizedReproducibilityPage } from "@/app/resources/reproducibility/page";
import { LocalizedResponsibleUsePage } from "@/app/resources/responsible-use/page";
import { LocalizedStatusPage } from "@/app/resources/status/page";
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
