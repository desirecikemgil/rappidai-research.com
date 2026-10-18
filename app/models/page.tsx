import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModelComparisonSuite } from "@/components/graphics/model-comparison-suite";
import { ModelIndex } from "@/components/models/model-index";
import { PageIntro } from "@/components/ui/page-intro";
import { models } from "@/content/models";
import { modelsPageContent } from "@/content/pages";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = metadataFor("/models");

export function LocalizedModelsPage({ locale }: { locale: Locale }) {
  const content = localizeContent(modelsPageContent, locale);
  const lineup = localizeContent(models, locale);
  const released = lineup.filter((model) => model.availability === "available");

  return (
    <>
      <PageIntro
        {...content.introduction}
        facts={[
          { label: t(locale, "Model records"), value: String(lineup.length) },
          {
            label: t(locale, "Public releases"),
            value: String(released.length),
          },
          {
            label: t(locale, "In development"),
            value: String(lineup.length - released.length),
          },
          {
            label: t(locale, "Language focus"),
            value: t(locale, "German · Code security"),
          },
        ]}
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#lineup-heading",
            label: t(locale, "At a glance"),
            description: t(
              locale,
              "Status, type and size of every model line in one table.",
            ),
          },
          {
            href: "#models-list-heading",
            label: t(locale, "Model releases"),
            description: t(
              locale,
              "Browse Sentinel Alpha, Echelon and the released pilots.",
            ),
          },
          {
            href: "#model-system-comparison-heading",
            label: t(locale, "Historical preflight comparison"),
            description: t(
              locale,
              "Compare architecture, tokenizer and data evidence on one scale.",
            ),
          },
        ]}
      />

      <section className="page-shell section" aria-labelledby="lineup-heading">
        <div className="section-head">
          <p className="kicker">{t(locale, "At a glance")}</p>
          <h2 id="lineup-heading" className="display-section">
            {t(locale, "The Quantum lineup.")}
          </h2>
        </div>
        <div
          className="table-wrap"
          data-reveal
          tabIndex={0}
          role="region"
          aria-label={t(locale, "The Quantum lineup.")}
        >
          <table className="table min-w-[46rem]">
            <thead>
              <tr>
                <th scope="col">{t(locale, "Model")}</th>
                <th scope="col">{t(locale, "Status")}</th>
                <th scope="col">{t(locale, "Model type")}</th>
                <th scope="col">{t(locale, "Parameter size")}</th>
              </tr>
            </thead>
            <tbody>
              {lineup.map((model) => (
                <tr key={model.slug}>
                  <td>
                    <Link
                      href={localizePath(`/models/${model.slug}`, locale)}
                      className="inline-flex items-center gap-2 font-medium text-ink hover:text-accent"
                    >
                      {model.name}
                      <ArrowRight aria-hidden="true" size={14} />
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`chip chip-dot ${
                        model.availability === "available"
                          ? "chip-ok"
                          : "chip-planned"
                      }`}
                    >
                      {model.statusLabel}
                    </span>
                  </td>
                  <td className="text-ink-soft">{model.modelType}</td>
                  <td className="font-mono text-[0.84rem] text-ink-soft">
                    {model.parameterCount?.label ??
                      (model.slug === "quantum-1-echelon"
                        ? t(locale, "~1B parameter target")
                        : t(locale, "Foundation selection pending"))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="band">
        <ModelIndex locale={locale} />
      </div>
      <ModelComparisonSuite locale={locale} />
    </>
  );
}

export default function ModelsPage() {
  return <LocalizedModelsPage locale="en" />;
}
