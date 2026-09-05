import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { resourceCards } from "@/content/resources";
import type {
  EvidenceStatus,
  ResourceId,
  ResourceSource,
} from "@/content/types";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export function EvidenceBadge({
  status,
  onDark = false,
  locale = "en",
}: {
  status: EvidenceStatus;
  onDark?: boolean;
  locale?: Locale;
}) {
  const published = status === "Published";
  const partial = status === "Partial evidence";

  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 font-mono text-[0.62rem] font-medium tracking-[0.1em] uppercase ${
        onDark
          ? "border-white/30 bg-white/10 text-[#d7e6ff]"
          : published
            ? "border-accent/25 bg-accent/8 text-accent"
            : partial
              ? "border-[#8cb7ff]/35 bg-pale/70 text-ink-soft"
              : "border-line-strong bg-white/55 text-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mr-2 size-1.5 rounded-full ${
          onDark
            ? "bg-[#a9c9ff]"
            : published
              ? "bg-accent"
              : partial
                ? "bg-[#79aaff]"
                : "bg-muted/55"
        }`}
      />
      {t(locale, status)}
    </span>
  );
}

export function SourceLinks({
  sources,
  label = "Primary sources",
  locale = "en",
}: {
  sources: readonly ResourceSource[];
  label?: string;
  locale?: Locale;
}) {
  return (
    <div>
      <p className="font-mono text-[0.66rem] tracking-[0.13em] text-muted uppercase">
        {t(locale, label)}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="liquid-button-secondary inline-flex min-h-10 items-center rounded-full border border-line-strong bg-white/45 px-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:text-accent"
          >
            {source.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function ResourceDirectory({
  current,
  locale = "en",
}: {
  current?: ResourceId;
  locale?: Locale;
}) {
  const localizedResources = localizeContent(resourceCards, locale);
  const entries = current
    ? localizedResources.filter((resource) => resource.id !== current)
    : localizedResources;

  return (
    <section
      aria-labelledby="resource-directory-heading"
      className="dark-band resource-directory-section border-y border-white/10 text-white"
    >
      <div className="page-shell section-space-sm">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="page-context">
              {t(locale, "DOCUMENTATION DIRECTORY")}
            </p>
            <h2
              id="resource-directory-heading"
              className="display-section mt-7 text-[var(--color-dark-title)]"
            >
              {current
                ? t(locale, "Continue through the evidence.")
                : t(locale, "Documentation by topic.")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--color-dark-body)]">
            {t(
              locale,
              "Every section keeps public evidence, configured targets and missing information visibly separate.",
            )}
          </p>
        </Reveal>

        <div className="resource-directory-list mt-12 border-t border-white/15">
          {entries.map((resource, index) => (
            <Reveal key={resource.id} delay={(index % 4) * 0.025}>
              <Link
                href={resource.href}
                className="resource-directory-row group grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[10rem_minmax(0,1fr)_2.75rem] sm:items-center sm:gap-8 lg:py-8"
              >
                <div>
                  <EvidenceBadge status={resource.status} locale={locale} />
                </div>
                <div>
                  <h3 className="text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium tracking-[-0.035em] text-[var(--color-dark-title)] transition-colors group-hover:text-white">
                    {resource.title}
                  </h3>
                  <p className="mt-2 max-w-[48rem] text-sm leading-6 text-[var(--color-dark-body)]">
                    {resource.description}
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-full border border-white/20 text-[var(--color-dark-accent)] transition-all group-hover:border-[var(--color-dark-accent)] group-hover:bg-white/10 group-hover:text-white sm:justify-self-end">
                  <ArrowRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">{t(locale, "Open resource")}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewStamp({
  label,
  reference,
  explanation,
  url,
  locale = "en",
}: {
  label: string;
  reference: string;
  explanation: string;
  url: string;
  locale?: Locale;
}) {
  return (
    <Reveal className="liquid-surface grid gap-7 border-accent/20 p-7 sm:p-9 lg:grid-cols-[0.6fr_1.4fr]">
      <div>
        <p className="eyebrow">{t(locale, "LAST REVIEWED")}</p>
        <p className="mt-4 text-2xl font-medium tracking-[-0.035em] text-ink">
          {label}
        </p>
      </div>
      <div className="min-w-0">
        <p className="break-all font-mono text-[0.68rem] leading-6 text-accent">
          {reference}
        </p>
        <p className="body-copy mt-4">{explanation}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
        >
          {t(locale, "Inspect pinned snapshot")}
        </a>
      </div>
    </Reveal>
  );
}
