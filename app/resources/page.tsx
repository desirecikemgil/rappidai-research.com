import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EvidenceMatrix } from "@/components/graphics/evidence-matrix";
import type { EvidenceCell } from "@/components/graphics/evidence-matrix";
import {
  ResourceDirectory,
  ReviewStamp,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { resourcesPageContent } from "@/content/pages";
import {
  resourceCards,
  resourceReview,
  resourceUtilityLinks,
} from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources");

/**
 * Anything that is not fully published and not explicitly partial counts as a
 * gap. Defaulting to `pending` means a new, unrecognised status shows up as an
 * open item rather than quietly reading as documented.
 */
function evidenceState(status: string | undefined): EvidenceCell["state"] {
  if (status === "Published") return "published";
  if (status === "Partial evidence") return "partial";
  return "pending";
}

export function LocalizedResourcesPage({ locale }: { locale: Locale }) {
  const page = localizeContent(resourcesPageContent, locale);
  const review = localizeContent(resourceReview, locale);
  const utilityLinks = localizeContent(resourceUtilityLinks, locale);

  // Derived from the same records the directory renders, so the figure can
  // never disagree with the cards underneath it.
  const evidenceCells: EvidenceCell[] = localizeContent(
    resourceCards,
    locale,
  ).map((card) => ({
    label: card.title,
    state: evidenceState(
      resourceCards.find((raw) => raw.id === card.id)?.status,
    ),
  }));

  return (
    <>
      <PageIntro
        {...page.introduction}
        signature="directory"
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#resources-evidence-map",
            label: t(locale, "Evidence map"),
            description: t(
              locale,
              "Read the documentation status of every research area at a glance.",
            ),
          },
          {
            href: "#research-profiles",
            label: t(locale, "Research profiles"),
            description: t(
              locale,
              "Open the source repositories and public model releases.",
            ),
          },
          {
            href: "#resource-directory-heading",
            label: t(locale, "Documentation directory"),
            description: t(
              locale,
              "Choose a focused record for methods, licensing, status or reuse.",
            ),
          },
        ]}
      />

      <section
        id="resources-evidence-map"
        className="page-shell scroll-mt-32 pb-[var(--section-space)] pt-[clamp(4rem,7vw,6rem)]"
      >
        <ReviewStamp
          label={review.label}
          reference={review.evidenceReference}
          explanation={review.explanation}
          url={review.evidenceUrl}
          locale={locale}
        />

        <Reveal className="liquid-surface mt-8 p-6 sm:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="eyebrow">{t(locale, "EVIDENCE MAP")}</p>
            <p className="max-w-[34rem] text-sm leading-6 text-muted">
              {t(
                locale,
                "Every resource area with its current documentation status. Dashed cells are open gaps, not omissions.",
              )}
            </p>
          </div>
          <div className="mt-8">
            <EvidenceMatrix cells={evidenceCells} locale={locale} />
          </div>
        </Reveal>

        <Stagger
          id="research-profiles"
          className="mt-4 grid scroll-mt-32 gap-4 md:grid-cols-3"
        >
          {utilityLinks.map((item) => (
            <StaggerItem key={item.label}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="liquid-card flex min-h-[10rem] flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-mono text-[0.64rem] tracking-[0.13em] text-accent uppercase">
                  {t(locale, "OPEN SOURCE")}
                </p>
                <h2 className="mt-5 text-xl font-medium tracking-[-0.03em] text-ink">
                  {item.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.detail}
                </p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <ResourceDirectory locale={locale} />
    </>
  );
}

export default function ResourcesPage() {
  return <LocalizedResourcesPage locale="en" />;
}
