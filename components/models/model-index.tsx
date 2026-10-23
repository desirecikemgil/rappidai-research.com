"use client";

import { SentinelCard } from "./sentinel-preview";
import { EchelonCard } from "./echelon-card";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getModelsByFilter,
  modelFilters,
  modelListName,
} from "@/content/models";
import type { ModelFilterId } from "@/content/types";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export function ModelIndex({ locale = "en" }: { locale?: Locale }) {
  const [filter, setFilter] = useState<ModelFilterId>("all");
  const visibleModels = useMemo(
    () =>
      [...getModelsByFilter(filter, locale)].sort(
        (a, b) =>
          (b.slug === "quantum-sentinel-alpha"
            ? 2
            : Number(b.slug === "quantum-1-echelon")) -
          (a.slug === "quantum-sentinel-alpha"
            ? 2
            : Number(a.slug === "quantum-1-echelon")),
      ),
    [filter, locale],
  );
  const filters = useMemo(
    () => localizeContent(modelFilters, locale),
    [locale],
  );
  return (
    <section
      className="page-shell section"
      aria-labelledby="models-list-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="kicker">{t(locale, "Model releases")}</p>
          <h2 id="models-list-heading" className="display-section mt-4">
            {t(locale, "Model index")}
          </h2>
        </div>
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
                className="filter-chip"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="model-catalog mt-8" aria-live="polite">
        {visibleModels.map((model) =>
          model.slug === "quantum-sentinel-alpha" ? (
            <SentinelCard key={model.slug} locale={locale} />
          ) : model.slug === "quantum-1-echelon" ? (
            <EchelonCard key={model.slug} locale={locale} />
          ) : (
            <article key={model.slug} className="model-index-row group">
              <Link
                href={localizePath(`/models/${model.slug}`, locale)}
                className="model-catalog-link"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="chip">{model.statusLabel}</span>
                    <span className="text-xs text-muted">
                      {model.parameterCount?.label ??
                        t(locale, "Parameter size not yet defined")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-ink transition-colors group-hover:text-accent">
                    {modelListName(model.slug)}
                  </h3>
                  <p className="body-copy mt-5 max-w-xl">{model.summary}</p>
                </div>

                <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
                  {model.indexFacts.slice(1).map((fact, factIndex) => (
                    <div key={fact} className="border-t border-line pt-3">
                      <dt className="text-[0.78rem] text-muted">
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

                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {t(locale, "View model card")}
                </span>
              </Link>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
