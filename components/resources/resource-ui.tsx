import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { resourceCards } from "@/content/resources";
import type {
  EvidenceStatus,
  ResourceId,
  ResourceSource,
} from "@/content/types";

export function EvidenceBadge({
  status,
  onDark = false,
}: {
  status: EvidenceStatus;
  onDark?: boolean;
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
      {status}
    </span>
  );
}

export function SourceLinks({
  sources,
  label = "Primary sources",
}: {
  sources: readonly ResourceSource[];
  label?: string;
}) {
  return (
    <div>
      <p className="font-mono text-[0.66rem] tracking-[0.13em] text-muted uppercase">
        {label}
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

export function ResourceDirectory({ current }: { current?: ResourceId }) {
  const entries = current
    ? resourceCards.filter((resource) => resource.id !== current)
    : resourceCards;

  return (
    <section
      aria-labelledby="resource-directory-heading"
      className="liquid-section border-y border-line bg-pale-soft/35"
    >
      <div className="page-shell section-space-sm">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">DOCUMENTATION DIRECTORY</p>
            <h2
              id="resource-directory-heading"
              className="display-section mt-7 text-ink"
            >
              {current
                ? "Continue through the evidence."
                : "Documentation by topic."}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Every section keeps public evidence, configured targets and missing
            information visibly separate.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((resource, index) => (
            <Reveal
              key={resource.id}
              delay={(index % 3) * 0.035}
              className="h-full"
            >
              <Link
                href={resource.href}
                className="liquid-card group flex h-full min-h-[16rem] flex-col p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[0.64rem] tracking-[0.13em] text-accent uppercase">
                    {resource.eyebrow}
                  </p>
                  <EvidenceBadge status={resource.status} />
                </div>
                <h3 className="mt-7 text-2xl font-medium tracking-[-0.035em] text-ink">
                  {resource.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted">
                  {resource.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                  Open resource
                  <ArrowRight aria-hidden="true" className="size-4" />
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
}: {
  label: string;
  reference: string;
  explanation: string;
  url: string;
}) {
  return (
    <Reveal className="liquid-surface grid gap-7 border-accent/20 p-7 sm:p-9 lg:grid-cols-[0.6fr_1.4fr]">
      <div>
        <p className="eyebrow">LAST REVIEWED</p>
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
          Inspect pinned snapshot
        </a>
      </div>
    </Reveal>
  );
}
