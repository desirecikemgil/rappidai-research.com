import { notFound } from "next/navigation";
import { DocLayout } from "@/components/layout/doc-layout";
import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
  SourceLinks,
} from "@/components/resources/resource-ui";
import { ActionLink } from "@/components/ui/action-link";
import { getPublicationBySlug } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { serializeJsonLd } from "@/lib/json-ld";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor(
  "/resources/publications/from-100m-to-600m-german-tokens",
);

export function LocalizedPilotResearchNotePage({ locale }: { locale: Locale }) {
  const record = getPublicationBySlug("from-100m-to-600m-german-tokens");

  if (!record) notFound();
  const publication = localizeContent(record, locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: publication.title,
    description: publication.summary,
    datePublished: publication.publicationDate,
    dateModified: publication.lastReviewed,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: siteConfig.founder.name,
    },
    ...(siteConfig.canonicalUrl
      ? {
          mainEntityOfPage: new URL(
            publication.href,
            siteConfig.canonicalUrl,
          ).toString(),
        }
      : {}),
  };

  return (
    <>
      <DocLayout>
        <article className="studio-article">
          <header className="page-shell pt-[clamp(4.25rem,7vw,7rem)] pb-[clamp(3.5rem,6vw,6rem)]">
            <Reveal>
              <ActionLink
                href={localizePath("/resources/publications", locale)}
                variant="text"
              >
                {t(locale, "All publications")}
              </ActionLink>
            </Reveal>
            <Reveal delay={0.04} className="mt-9">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">{publication.kindLabel}</p>
                <EvidenceBadge status="Published" locale={locale} />
              </div>
              <h1 className="display-page mt-7 max-w-[18ch] text-ink">
                {publication.title}
              </h1>
              <p className="body-lg mt-7 max-w-[48rem]">
                {publication.summary}
              </p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="liquid-surface mt-10 grid gap-5 p-6 sm:grid-cols-3 sm:p-8"
            >
              <PublicationFact
                label={t(locale, "Published")}
                value={t(locale, "23 July 2026")}
              />
              <PublicationFact
                label={t(locale, "Review status")}
                value={publication.peerReviewStatus}
              />
              <PublicationFact label="DOI" value={t(locale, "Not available")} />
            </Reveal>
          </header>

          <div className="border-y border-line bg-pale-soft/35">
            <div className="page-shell py-10">
              <p className="max-w-[56rem] border-l-2 border-accent pl-5 text-sm leading-6 text-ink-soft">
                {t(
                  locale,
                  "This project research note is not an academic publication. It summarizes only the linked public record and does not fill gaps in training logs, raw evaluations or release provenance.",
                )}
              </p>
            </div>
          </div>

          <div className="page-shell section-space">
            <div className="mx-auto max-w-[66rem] space-y-[clamp(4rem,8vw,7rem)]">
              {publication.sections.map((section) => (
                <Reveal
                  key={section.title}
                  className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]"
                >
                  <div>
                    <h2 className="text-[clamp(1.45rem,2.2vw,1.75rem)] font-medium leading-[1.12] tracking-[-0.035em] text-ink">
                      {section.title}
                    </h2>
                  </div>
                  <div className="liquid-surface p-7 sm:p-9">
                    <div className="space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="body-copy">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.items ? (
                      <ul className="mt-7 space-y-3 border-t border-line pt-6">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-[clamp(4rem,8vw,8rem)]">
              <SourceLinks sources={publication.sources} locale={locale} />
            </Reveal>
          </div>
        </article>

        <ResourceDirectory current="publications" locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </DocLayout>
    </>
  );
}

export default function PilotResearchNotePage() {
  return <LocalizedPilotResearchNotePage locale="en" />;
}

function PublicationFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="ui-label">{label}</p>
      <p className="mt-3 text-sm leading-6 text-ink">{value}</p>
    </div>
  );
}
