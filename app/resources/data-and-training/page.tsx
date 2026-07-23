import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
  SourceLinks,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { dataAndTrainingContent } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources/data-and-training");

export function LocalizedDataAndTrainingPage({ locale }: { locale: Locale }) {
  const content = localizeContent(dataAndTrainingContent, locale);

  return (
    <>
      <PageIntro {...content.introduction} />

      <section className="page-shell pb-[var(--section-space)]">
        <Reveal className="liquid-surface grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="eyebrow">{t(locale, "PRIMARY DATASET")}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.045em] text-ink">
              {content.dataset.name}
            </h2>
            <p className="mt-3 font-mono text-[0.68rem] tracking-[0.12em] text-accent uppercase">
              {content.dataset.subset}
            </p>
          </div>
          <div>
            <p className="body-lg">{content.dataset.origin}</p>
            <p className="body-copy mt-5">{content.dataset.terms}</p>
            <a
              href={content.dataset.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
            >
              {t(locale, "Inspect dataset card")}
            </a>
          </div>
        </Reveal>

        <div className="mt-12 space-y-4">
          {content.stages.map((stage, index) => (
            <Reveal
              key={stage.name}
              delay={index * 0.035}
              className="liquid-row grid gap-7 rounded-[1.3rem] border-y border-line py-8 lg:grid-cols-[0.65fr_1.35fr]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="technical-number text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <EvidenceBadge status={stage.status} locale={locale} />
                </div>
                <h2 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-ink">
                  {stage.name}
                </h2>
              </div>
              <dl className="border-b border-line">
                <StageFact
                  label={t(locale, "Source revision")}
                  value={stage.sourceRevision}
                />
                <StageFact
                  label={t(locale, "Configured target")}
                  value={stage.target}
                />
                <StageFact
                  label={t(locale, "Public observation")}
                  value={stage.observed}
                />
              </dl>
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(4rem,8vw,8rem)] grid gap-4 lg:grid-cols-2">
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">{t(locale, "PIPELINE CONTROLS")}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.045em] text-ink">
              {t(locale, "Documented controls.")}
            </h2>
            <BulletList items={content.controls} />
          </Reveal>
          <Reveal delay={0.05} className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">{t(locale, "KNOWN LIMITATIONS")}</p>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.045em] text-ink">
              {t(locale, "Evidence still missing.")}
            </h2>
            <BulletList items={content.limitations} muted />
          </Reveal>
        </div>

        <Reveal className="mt-8 border-l-2 border-accent bg-pale-soft px-6 py-5">
          <p className="text-sm leading-6 text-ink-soft">
            {content.contact} {t(locale, "Contact")}: {siteConfig.businessEmail}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <SourceLinks sources={content.sources} locale={locale} />
        </Reveal>
      </section>

      <ResourceDirectory current="data-and-training" locale={locale} />
    </>
  );
}

export default function DataAndTrainingPage() {
  return <LocalizedDataAndTrainingPage locale="en" />;
}

function StageFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="font-mono text-[0.64rem] tracking-[0.12em] text-muted uppercase">
        {label}
      </dt>
      <dd className="text-sm leading-6 text-ink-soft">{value}</dd>
    </div>
  );
}

function BulletList({
  items,
  muted = false,
}: {
  items: readonly string[];
  muted?: boolean;
}) {
  return (
    <ul className="mt-7 space-y-4 border-t border-line pt-6">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 text-sm leading-6 ${muted ? "text-muted" : "text-ink-soft"}`}
        >
          <span
            aria-hidden="true"
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
