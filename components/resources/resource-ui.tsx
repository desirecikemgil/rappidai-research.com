import Link from "next/link";
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
  return (
    <span
      className={`chip ${
        onDark ? "!border-white/25 !bg-transparent !text-white" : ""
      }`}
    >
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
      <p className="text-sm font-medium text-ink">{t(locale, label)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary !min-h-10 !text-[0.86rem]"
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
    <section aria-labelledby="resource-directory-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">{t(locale, "Documentation directory")}</p>
          <h2 id="resource-directory-heading" className="display-section mt-3">
            {current
              ? t(locale, "Related documentation")
              : t(locale, "Documentation by topic")}
          </h2>
        </div>
      </div>
      <p className="body-copy mt-4 max-w-[40rem]">
        {t(
          locale,
          "Every section keeps public evidence, configured targets and missing information visibly separate.",
        )}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2" data-stagger>
        {entries.map((resource) => (
          <Link
            key={resource.id}
            href={resource.href}
            className="card group flex flex-col gap-3 p-5"
          >
            <EvidenceBadge status={resource.status} locale={locale} />
            <h3 className="m-0 text-lg font-medium tracking-[-0.025em] text-ink group-hover:text-accent">
              {resource.title}
            </h3>
            <p className="m-0 text-sm leading-6 text-muted">
              {resource.description}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent">
              {t(locale, "Open resource")}
            </span>
          </Link>
        ))}
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
    <Reveal className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.6fr_1.4fr]">
      <div>
        <p className="eyebrow">{t(locale, "Last reviewed")}</p>
        <p className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">
          {label}
        </p>
      </div>
      <div className="min-w-0">
        <p className="break-all font-mono text-[0.72rem] leading-6 text-muted">
          {reference}
        </p>
        <p className="body-copy mt-4">{explanation}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-link mt-4"
        >
          {t(locale, "Inspect pinned snapshot")}
        </a>
      </div>
    </Reveal>
  );
}
