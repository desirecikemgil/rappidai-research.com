import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { publications } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources/publications");

export function LocalizedPublicationsPage({ locale }: { locale: Locale }) {
  const localizedPublications = localizeContent(publications, locale);

  return (
    <>
      <PageIntro
        eyebrow={t(locale, "PUBLICATIONS")}
        title={t(locale, "Research notes with visible evidence boundaries.")}
        description={t(
          locale,
          "Project publications summarize public artifacts, negative results and unresolved questions. They are not presented as peer-reviewed academic papers.",
        )}
        signature="publications"
      />

      <section className="page-shell pb-[var(--section-space)]">
        <div className="space-y-4">
          {localizedPublications.map((publication) => (
            <Reveal key={publication.slug}>
              <Link
                href={publication.href}
                className="publication-cover group grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
              >
                <div className="publication-cover-art">
                  <div className="research-token-figure" aria-hidden="true">
                    <span>100M</span>
                    <div />
                    <span>600M</span>
                  </div>
                  <p className="eyebrow">{publication.kindLabel}</p>
                  <p className="mt-5 font-mono text-[0.66rem] tracking-[0.1em] text-muted uppercase">
                    {t(locale, "23 July 2026")} · {publication.peerReviewStatus}{" "}
                    · {t(locale, "No DOI")}
                  </p>
                </div>
                <div className="publication-cover-copy">
                  <div className="flex flex-wrap items-center gap-3">
                    <EvidenceBadge status="Published" locale={locale} />
                  </div>
                  <h2 className="mt-6 text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.05em] text-ink">
                    {publication.title}
                  </h2>
                  <p className="body-lg mt-6">{publication.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                    {t(locale, "Read research note")}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ResourceDirectory current="publications" locale={locale} />
    </>
  );
}

export default function PublicationsPage() {
  return <LocalizedPublicationsPage locale="en" />;
}
