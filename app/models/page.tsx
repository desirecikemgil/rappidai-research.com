import type { Metadata } from "next";
import { ModelIndex } from "@/components/models/model-index";
import { PageIntro } from "@/components/ui/page-intro";
import { modelsPageContent } from "@/content/pages";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/models");

export default function ModelsPage() {
  return (
    <>
      <PageIntro {...modelsPageContent.introduction} />
      <ModelIndex />
    </>
  );
}
