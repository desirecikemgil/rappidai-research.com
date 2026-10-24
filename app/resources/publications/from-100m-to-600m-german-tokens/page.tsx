import { ResearchNoteArticle } from "@/components/resources/research-note-article";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor(
  "/resources/publications/from-100m-to-600m-german-tokens",
);

export function LocalizedPilotResearchNotePage({ locale }: { locale: Locale }) {
  return (
    <ResearchNoteArticle
      slug="from-100m-to-600m-german-tokens"
      locale={locale}
    />
  );
}

export default function PilotResearchNotePage() {
  return <LocalizedPilotResearchNotePage locale="en" />;
}
