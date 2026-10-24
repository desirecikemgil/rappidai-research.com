import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocLayout } from "@/components/layout/doc-layout";
import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
  SourceLinks,
} from "@/components/resources/resource-ui";
import { ActionLink } from "@/components/ui/action-link";
import { SectionNavigator } from "@/components/ui/section-navigator";
import { getPublicationBySlug } from "@/content/resources";
import { siteConfig } from "@/content/site";
import type {
  PublicationFigure,
  PublicationReference,
  PublicationSection,
  PublicationSlug,
} from "@/content/types";
import { serializeJsonLd } from "@/lib/json-ld";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

/** Shared article template for every research note in the publications hub. */
export function ResearchNoteArticle({
  slug,
  locale,
}: {
  slug: PublicationSlug;
  locale: Locale;
}) {
  const record = getPublicationBySlug(slug);

  if (!record) notFound();
  const publication = localizeContent(record, locale);
  const references = publication.references ?? [];
  const contents = publication.sections.flatMap((section) =>
    section.id
      ? [{ href: `#${section.id}`, label: section.title, description: "" }]
      : [],
  );
  if (contents.length && references.length)
    contents.push({
      href: "#references",
      label: t(locale, "References"),
      description: "",
    });

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
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    ...(publication.category ? { about: publication.category } : {}),
    ...(references.length
      ? {
          citation: references
            .map((reference) => reference.url)
            .filter((url) => url.startsWith("http")),
        }
      : {}),
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
              <p className="eyebrow">
                {publication.kindLabel}
                {publication.category ? ` · ${publication.category}` : null}
              </p>
              <EvidenceBadge status="Published" locale={locale} />
            </div>
            <h1 className="display-page mt-7 max-w-[18ch] text-ink">
              {publication.title}
            </h1>
            <p className="body-lg mt-7 max-w-[48rem]">{publication.summary}</p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="liquid-surface mt-10 grid gap-5 p-6 sm:grid-cols-3 sm:p-8"
          >
            <PublicationFact
              label={t(locale, "Published")}
              value={publication.publicationDateLabel}
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
              {publication.notice}
            </p>
          </div>
        </div>

        <div className="page-shell section-space pt-[clamp(3rem,6vw,4.5rem)]">
          {contents.length ? (
            <div className="mx-auto mb-[clamp(3.5rem,7vw,5.5rem)] max-w-[66rem]">
              <SectionNavigator
                label={t(locale, "In this note")}
                items={contents}
              />
            </div>
          ) : null}

          <div className="mx-auto max-w-[66rem] space-y-[clamp(4rem,8vw,7rem)]">
            {publication.sections.map((section) => (
              <NoteSection
                key={section.title}
                section={section}
                locale={locale}
              />
            ))}
          </div>

          <Reveal className="mt-[clamp(4rem,8vw,8rem)]">
            {references.length ? (
              <References references={references} locale={locale} />
            ) : (
              <SourceLinks sources={publication.sources} locale={locale} />
            )}
          </Reveal>
        </div>
      </article>

      <ResourceDirectory current="publications" locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
    </DocLayout>
  );
}

function NoteSection({
  section,
  locale,
}: {
  section: PublicationSection;
  locale: Locale;
}) {
  return (
    <Reveal
      id={section.id}
      className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.6fr_1.4fr]"
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
              {withCitations(paragraph, locale)}
            </p>
          ))}
        </div>
        {section.subsections ? (
          <div className="mt-8 space-y-8 border-t border-line pt-8">
            {section.subsections.map((subsection) => (
              <div key={subsection.title}>
                <h3 className="text-lg font-medium leading-snug tracking-[-0.025em] text-ink">
                  {subsection.title}
                </h3>
                <div className="mt-3 space-y-4">
                  {subsection.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="body-copy">
                      {withCitations(paragraph, locale)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
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
        {section.closing ? (
          <div className="mt-8 space-y-4 border-t border-line pt-6">
            {section.closing.map((paragraph) => (
              <p key={paragraph} className="body-copy">
                {withCitations(paragraph, locale)}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      {section.figures ? (
        <div className="min-w-0 space-y-10 lg:col-span-2">
          {section.figures.map((figure) => (
            <NoteFigure key={figure.label} figure={figure} locale={locale} />
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}

function NoteFigure({
  figure,
  locale,
}: {
  figure: PublicationFigure;
  locale: Locale;
}) {
  return (
    <figure className="note-figure">
      <figcaption className="note-figure-head">
        <span className="ui-label">{figure.label}</span>
        <span className="note-figure-title">{figure.title}</span>
      </figcaption>
      {figure.kind === "outcomes" ? (
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label={figure.title}
        >
          <table className="outcome-matrix">
            <thead>
              <tr>
                <td />
                {figure.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {figure.rows.map((row, rowIndex) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  {figure.cells
                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                    .map(([term, meaning], cellIndex) => (
                      <td
                        key={term}
                        className={
                          rowIndex === 0 && cellIndex === 1
                            ? "is-highlighted"
                            : undefined
                        }
                      >
                        <strong>{term}</strong>
                        <span>{meaning}</span>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {figure.kind === "code" ? (
        <div className="space-y-6">
          {figure.panels.map((panel) => (
            <div key={panel.verdict} className="min-w-0">
              <div className="window window-dark">
                <div className="window-bar">
                  <span>{panel.label}</span>
                  <span>{panel.verdict}</span>
                </div>
                <pre
                  className="terminal"
                  tabIndex={0}
                  aria-label={`${panel.label}: ${panel.verdict}`}
                >
                  <code>{panel.code}</code>
                </pre>
              </div>
              <p className="mt-4 max-w-[48rem] text-sm leading-6 text-ink-soft">
                {withCitations(panel.explanation, locale)}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {figure.kind === "table" ? (
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label={figure.title}
        >
          <table className="table stack-table">
            <thead>
              <tr>
                {figure.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {figure.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={index} data-label={figure.columns[index]}>
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <p className="note-figure-caption">{figure.caption}</p>
    </figure>
  );
}

function References({
  references,
  locale,
}: {
  references: readonly PublicationReference[];
  locale: Locale;
}) {
  return (
    <section
      id="references"
      aria-labelledby="references-heading"
      className="mx-auto grid max-w-[66rem] scroll-mt-28 gap-8 lg:grid-cols-[0.6fr_1.4fr]"
    >
      <h2
        id="references-heading"
        className="text-[clamp(1.45rem,2.2vw,1.75rem)] font-medium leading-[1.12] tracking-[-0.035em] text-ink"
      >
        {t(locale, "References")}
      </h2>
      <ol className="note-references">
        {references.map((reference, index) => {
          const internal = reference.url.startsWith("/");
          const title = internal ? (
            <Link href={localizePath(reference.url, locale)}>
              {reference.title}
            </Link>
          ) : (
            <a href={reference.url} target="_blank" rel="noreferrer">
              {reference.title}
            </a>
          );
          return (
            <li key={reference.url} id={`ref-${index + 1}`}>
              <span className="note-reference-number">[{index + 1}]</span>
              <p>
                {reference.authors}. {title}. {reference.venue}.
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Turns "[3]" markers into links to the numbered reference list. */
function withCitations(text: string, locale: Locale): ReactNode {
  const parts = text.split(/(\[\d+\])/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) => {
    const match = /^\[(\d+)\]$/.exec(part);
    if (!match) return part;
    return (
      <a
        key={index}
        href={`#ref-${match[1]}`}
        className="note-citation"
        aria-label={`${t(locale, "Reference")} ${match[1]}`}
      >
        [{match[1]}]
      </a>
    );
  });
}

function PublicationFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="ui-label">{label}</p>
      <p className="mt-3 text-sm leading-6 text-ink">{value}</p>
    </div>
  );
}
