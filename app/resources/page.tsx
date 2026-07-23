import { Reveal } from "@/components/motion/reveal";
import {
  ResourceDirectory,
  ReviewStamp,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { resourcesPageContent } from "@/content/pages";
import { resourceReview, resourceUtilityLinks } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources");

export function LocalizedResourcesPage({ locale }: { locale: Locale }) {
  const page = localizeContent(resourcesPageContent, locale);
  const review = localizeContent(resourceReview, locale);
  const utilityLinks = localizeContent(resourceUtilityLinks, locale);

  return (
    <>
      <PageIntro {...page.introduction} />

      <section className="page-shell pb-[var(--section-space)]">
        <ReviewStamp
          label={review.label}
          reference={review.evidenceReference}
          explanation={review.explanation}
          url={review.evidenceUrl}
          locale={locale}
        />

        <Reveal className="mt-8 grid gap-4 md:grid-cols-3">
          {utilityLinks.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="liquid-card min-h-[10rem] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="font-mono text-[0.64rem] tracking-[0.13em] text-accent uppercase">
                {t(locale, "OPEN SOURCE")}
              </p>
              <h2 className="mt-5 text-xl font-medium tracking-[-0.03em] text-ink">
                {item.label}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
            </a>
          ))}
        </Reveal>
      </section>

      <ResourceDirectory locale={locale} />
    </>
  );
}

export default function ResourcesPage() {
  return <LocalizedResourcesPage locale="en" />;
}
