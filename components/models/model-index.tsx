"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getModelsByFilter, modelFilters } from "@/content/models";
import type { ModelFilterId } from "@/content/types";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export function ModelIndex({ locale = "en" }: { locale?: Locale }) {
  const [filter, setFilter] = useState<ModelFilterId>("all");
  const visibleModels = useMemo(
    () => getModelsByFilter(filter, locale),
    [filter, locale],
  );
  const filters = useMemo(
    () => localizeContent(modelFilters, locale),
    [locale],
  );
  return (
    <section
      className="page-shell pb-[var(--section-space)]"
      aria-labelledby="models-list-heading"
    >
      <h2 id="models-list-heading" className="sr-only">
        {t(locale, "Model index")}
      </h2>
      <div className="flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.69rem] tracking-[0.16em] text-muted uppercase">
          {t(locale, "Filter models")}
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t(locale, "Filter models")}
        >
          {filters.map((item) => {
            const active = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`min-h-11 border px-4 text-[0.78rem] font-medium transition-colors ${
                  active
                    ? "liquid-button border-ink bg-ink text-white"
                    : "liquid-pill border-line bg-white/30 text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-14 space-y-3 sm:space-y-4">
        {visibleModels.map((model) => (
          <article
            key={model.slug}
            className="liquid-row model-index-row group rounded-[1.35rem] border-y border-line py-8 sm:py-10"
          >
            <Link
              href={localizePath(`/models/${model.slug}`, locale)}
              className="grid gap-8 lg:grid-cols-[1.05fr_0.7fr_0.2fr] lg:items-start"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.13em] text-accent uppercase">
                    <span
                      className="size-1.5 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {model.statusLabel}
                  </span>
                  <span className="text-xs text-muted">
                    {model.parameterCount?.label ??
                      t(locale, "Parameter size not yet defined")}
                  </span>
                </div>
                <h3 className="mt-5 text-[clamp(2rem,4vw,4.25rem)] font-[510] tracking-[-0.052em] text-ink transition-colors group-hover:text-accent">
                  {model.name}
                </h3>
                <p className="body-copy mt-5 max-w-xl">{model.summary}</p>
              </div>

              <dl className="grid grid-cols-1 gap-x-6 gap-y-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
                {model.indexFacts.slice(1).map((fact, factIndex) => (
                  <div key={fact} className="border-l border-line pl-4">
                    <dt className="font-mono text-[0.62rem] tracking-[0.13em] text-muted uppercase">
                      {factIndex === 0
                        ? t(locale, "Status")
                        : factIndex === 1
                          ? t(locale, "Model")
                          : t(locale, "Use")}
                    </dt>
                    <dd className="mt-1.5 leading-6 text-ink-soft">{fact}</dd>
                  </div>
                ))}
              </dl>

              <span className="liquid-icon-button flex size-11 items-center justify-center border border-line text-ink transition-all duration-300 group-hover:scale-105 group-hover:border-accent group-hover:bg-accent group-hover:text-white lg:justify-self-end">
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
