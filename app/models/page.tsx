import type { Metadata } from "next";
import { ModelComparisonSuite } from "@/components/graphics/model-comparison-suite";
import { ModelIndex } from "@/components/models/model-index";
import { PageIntro } from "@/components/ui/page-intro";
import { modelsPageContent } from "@/content/pages";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, type Locale } from "@/lib/i18n";

export const metadata: Metadata = metadataFor("/models");

export function LocalizedModelsPage({ locale }: { locale: Locale }) {
  const content = localizeContent(modelsPageContent, locale);

  return (
    <>
      <PageIntro {...content.introduction} />
      <ModelIndex locale={locale} />
      <ModelComparisonSuite locale={locale} />
    </>
  );
}

export default function ModelsPage() {
  return <LocalizedModelsPage locale="en" />;
}
