import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
  ReviewStamp,
  SourceLinks,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { resourceReview, statusContent } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources/status");

export function LocalizedStatusPage({ locale }: { locale: Locale }) {
  const content = localizeContent(statusContent, locale);
  const review = localizeContent(resourceReview, locale);

  return (
    <>
      <PageIntro {...content.introduction} />

      <section className="page-shell pb-[var(--section-space)]">
        <ReviewStamp
          label={review.label}
          reference={review.evidenceReference}
          explanation={review.explanation}
          url={review.evidenceUrl}
          locale={locale}
        />

        <div className="mt-12 space-y-4">
          {content.models.map((model, index) => (
            <Reveal
              key={model.name}
              delay={index * 0.035}
              className="liquid-row grid gap-7 rounded-[1.3rem] border-y border-line py-8 lg:grid-cols-[0.65fr_1.35fr]"
            >
              <div>
                <EvidenceBadge status={model.status} locale={locale} />
                <h2 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-ink">
                  <Link href={model.href} className="hover:text-accent">
                    {model.name}
                  </Link>
                </h2>
              </div>
              <div>
                <p className="body-lg">{model.state}</p>
                <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
                  {model.boundary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(4rem,8vw,8rem)]">
          <Reveal>
            <p className="eyebrow">{t(locale, "OPEN PUBLICATION ITEMS")}</p>
            <h2 className="display-section mt-7 text-ink">
              {t(locale, "Gaps remain part of the record.")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.openItems.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 2) * 0.04}
                className="liquid-card p-7 sm:p-8"
              >
                <EvidenceBadge status={item.status} locale={locale} />
                <h3 className="mt-6 text-xl font-medium tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="liquid-surface mt-[clamp(4rem,8vw,8rem)] grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <p className="eyebrow">{t(locale, "DOCUMENTATION ROADMAP")}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.045em] text-ink">
              {t(locale, "Evidence before claims.")}
            </h2>
          </div>
          <ol className="space-y-4">
            {content.roadmap.map((item, index) => (
              <li
                key={item}
                className="grid gap-3 border-t border-line pt-4 sm:grid-cols-[3rem_1fr]"
              >
                <span className="technical-number text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-6 text-ink-soft">{item}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-10">
          <SourceLinks sources={content.sources} locale={locale} />
        </Reveal>
      </section>

      <ResourceDirectory current="status" locale={locale} />
    </>
  );
}

export default function StatusPage() {
  return <LocalizedStatusPage locale="en" />;
}
