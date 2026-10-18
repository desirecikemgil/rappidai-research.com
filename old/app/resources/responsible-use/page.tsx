import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { responsibleUseContent } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources/responsible-use");

export function LocalizedResponsibleUsePage({ locale }: { locale: Locale }) {
  const content = localizeContent(responsibleUseContent, locale);

  return (
    <>
      <PageIntro {...content.introduction} signature="responsible" />

      <section className="page-shell pb-[var(--section-space)]">
        <Reveal className="border border-accent/25 bg-ink p-7 text-white sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow eyebrow-on-dark">
              {t(locale, "EXCLUDED USES")}
            </p>
            <EvidenceBadge status="Published" onDark locale={locale} />
          </div>
          <h2 className="mt-7 max-w-[18ch] text-[clamp(2rem,4vw,4rem)] font-medium leading-[1] tracking-[-0.05em]">
            {t(locale, "Do not treat experimental completions as decisions.")}
          </h2>
          <ul className="mt-9 grid gap-3 md:grid-cols-2">
            {content.excludedUses.map((item) => (
              <li
                key={item}
                className="border-t border-white/20 py-4 text-sm leading-6 text-[#c8d6e9]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-[clamp(4rem,8vw,8rem)]">
          <Reveal>
            <p className="eyebrow">{t(locale, "KNOWN BEHAVIOR")}</p>
            <h2 className="display-section mt-7 text-ink">
              {t(locale, "Limits observed in the public record.")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.knownBehaviors.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 2) * 0.04}
                className="liquid-card p-7 sm:p-9"
              >
                <span className="technical-number text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-7 text-2xl font-medium tracking-[-0.035em] text-ink">
                  {item.title}
                </h3>
                <p className="body-copy mt-4">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(4rem,8vw,8rem)] grid gap-4 lg:grid-cols-2">
          <Reveal className="liquid-card p-7 sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{t(locale, "UNMEASURED RISKS")}</p>
              <EvidenceBadge status="Not measured" locale={locale} />
            </div>
            <h2 className="mt-7 text-3xl font-medium tracking-[-0.045em] text-ink">
              {t(locale, "No safety evaluation is inferred.")}
            </h2>
            <SimpleList items={content.unmeasuredRisks} />
          </Reveal>
          <Reveal delay={0.05} className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">{t(locale, "ARTIFACT SAFETY")}</p>
            <h2 className="mt-7 text-3xl font-medium tracking-[-0.045em] text-ink">
              {t(locale, "Treat files and code as untrusted.")}
            </h2>
            <SimpleList items={content.artifactSafety} />
          </Reveal>
        </div>

        <div className="mt-[clamp(4rem,8vw,8rem)]">
          <Reveal>
            <p className="eyebrow">{t(locale, "REPORTING")}</p>
            <h2 className="display-section mt-7 text-ink">
              {t(locale, "Use the right channel.")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {content.reporting.map((item) => (
              <Reveal key={item.label} className="liquid-card p-7">
                <h3 className="text-xl font-medium tracking-[-0.03em] text-ink">
                  {item.label}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.detail}
                </p>
                <a
                  href={item.url}
                  target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    item.url.startsWith("mailto:") ? undefined : "noreferrer"
                  }
                  className="mt-6 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                >
                  {t(locale, "Open reporting guidance")}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ResourceDirectory current="responsible-use" locale={locale} />
    </>
  );
}

export default function ResponsibleUsePage() {
  return <LocalizedResponsibleUsePage locale="en" />;
}

function SimpleList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 space-y-4 border-t border-line pt-6">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
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
