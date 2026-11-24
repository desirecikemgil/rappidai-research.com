import { ResearchNoteArticle } from "@/components/resources/research-note-article";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor(
  "/resources/publications/from-audited-records-to-approved-training-data",
);

export function LocalizedTrainingDataNotePage({ locale }: { locale: Locale }) {
  return (
    <ResearchNoteArticle
      slug="from-audited-records-to-approved-training-data"
      locale={locale}
    />
  );
}

export default function TrainingDataNotePage() {
  return <LocalizedTrainingDataNotePage locale="en" />;
}
