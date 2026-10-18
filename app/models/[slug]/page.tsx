import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import { SentinelPreview } from "@/components/models/sentinel-preview";
import { EchelonPreview } from "@/components/models/echelon-preview";
import { ArchitectureStack } from "@/components/graphics/architecture-stack";
import { ModelCardVisual } from "@/components/graphics/model-card-visual";
import { ActionLink, PendingAction } from "@/components/ui/action-link";
import { getModelBySlug, modelSlugs } from "@/content/models";
import { modelsPageContent } from "@/content/pages";
import { getResearchNoteById } from "@/content/research";
import type { ModelLink, SiteRoute } from "@/content/types";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

type ModelPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return modelSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return metadataFor(`/models/${model.slug}` as SiteRoute);
}

export default async function ModelDetailPage({ params }: ModelPageProps) {
  const { slug } = await params;
  return <LocalizedModelDetailPage slug={slug} locale="en" />;
}

/**
 * Draw only dimensions stated by pinned public sources.
 */
function architectureFor(slug: string) {
  if (slug === "quantum-1-6-pilot") {
    return { layers: 12, hiddenSize: 512, heads: 8, configured: false };
  }
  return null;
}

export function LocalizedModelDetailPage({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const model = getModelBySlug(slug, locale);
  if (!model) notFound();
  if (model.slug === "quantum-sentinel-alpha")
    return <SentinelPreview locale={locale} />;
  if (model.slug === "quantum-1-echelon")
    return <EchelonPreview locale={locale} />;
  const architecture = architectureFor(slug);
  const page = localizeContent(modelsPageContent, locale);
  const modelLinks = model.links as readonly ModelLink[];

  const relatedNotes = localizeContent(
    model.relatedResearchNoteIds
      .map((id) => getResearchNoteById(id))
      .filter((note) => note !== undefined),
    locale,
  );
  const relatedResources = localizeContent(
    [
      {
        label: "Reproducibility",
        href: "/resources/reproducibility",
      },
      {
        label: "Data & training",
        href: "/resources/data-and-training",
      },
      {
        label: "Responsible use",
        href: "/resources/responsible-use",
      },
      { label: "Licensing", href: "/resources/licensing" },
    ],
    locale,
  );

  const specs = [
    {
      label: t(locale, "Parameter size"),
      value: model.parameterCount?.label ?? page.missingParameterLabel,
    },
    ...model.technicalFacts.slice(0, 3).map((fact) => ({
      label: fact.label,
      value: fact.value,
    })),
  ];

  return (
    <>
      <section className="model-detail-opening page-intro">
        <div className="page-shell">
          <Link
            href={localizePath("/models", locale)}
            className="inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.7} />
            {t(locale, "All models")}
          </Link>

          <div className="model-hero grid gap-12 pb-[clamp(3rem,6vw,5rem)] pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="chip chip-dot chip-ok">
                  {model.statusLabel}
                </span>
                <span>{t(locale, "Model card")}</span>
              </p>
              <h1 className="mt-6 text-ink">{model.name}</h1>
              <p className="lede mt-6">{model.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {modelLinks.length === 0 ? (
                  <PendingAction>{page.missingLinksLabel}</PendingAction>
                ) : (
                  modelLinks.map((link, index) =>
                    link.url ? (
                      <ActionLink
                        key={`${link.kind}-${link.label}`}
                        href={link.url}
                        external
                        variant={
                          index === modelLinks.length - 1
                            ? "primary"
                            : "secondary"
                        }
                      >
                        {link.label}
                      </ActionLink>
                    ) : (
                      <PendingAction key={`${link.kind}-${link.label}`}>
                        {link.pendingLabel}
                      </PendingAction>
                    ),
                  )
                )}
              </div>
            </div>

            <div className="window min-w-0">
              <div className="window-bar">
                <span>{model.name}</span>
                <span>{model.parameterCount?.shortLabel ?? "—"}</span>
              </div>
              <dl className="m-0">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-4"
                  >
                    <dt className="text-[0.82rem] text-muted">{spec.label}</dt>
                    <dd className="m-0 min-w-0 break-words font-mono text-[0.82rem] text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {architecture ? (
                <div className="border-t border-line bg-pale-soft px-5 py-5">
                  <p className="text-[0.8rem] text-muted">
                    {architecture.configured
                      ? t(locale, "Configured architecture")
                      : t(locale, "Published architecture")}
                  </p>
                  <div className="mt-4">
                    <ArchitectureStack
                      layers={architecture.layers}
                      hiddenSize={architecture.hiddenSize}
                      heads={architecture.heads}
                      configured={architecture.configured}
                      locale={locale}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section
        className="page-shell section"
        aria-labelledby="model-card-title"
      >
        <div className="section-head split">
          <div>
            <p className="kicker">{t(locale, "Summary")}</p>
            <h2 id="model-card-title" className="display-section">
              {t(locale, "Model card")}
            </h2>
          </div>
          <p>
            {t(
              locale,
              "Information linked to public project sources. Unknown release dates, licensing terms and unsupported client compatibility are not inferred.",
            )}
          </p>
        </div>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label={t(locale, "Model card")}
        >
          <table className="table">
            <tbody>
              <ModelFact
                label={t(locale, "Status")}
                value={model.statusLabel}
              />
              <ModelFact
                label={t(locale, "Model type")}
                value={model.modelType}
              />
              <ModelFact
                label={t(locale, "Intended use")}
                value={model.intendedUse.join(" · ")}
              />
              <ModelFact
                label={t(locale, "Languages")}
                value={
                  model.languages.length
                    ? model.languages.join(" · ")
                    : t(locale, "Not specified")
                }
              />
              <ModelFact label={t(locale, "Lineage")} value={model.lineage} />
              <ModelFact
                label={t(locale, "Release status")}
                value={model.releaseStatus}
              />
              <ModelFact
                label={t(locale, "License")}
                value={model.license ?? page.missingLicenseLabel}
              />
            </tbody>
          </table>
        </div>
      </section>

      {model.technicalFacts.length > 0 || model.inferenceSoftware.length > 0 ? (
        <section className="band" aria-labelledby="technical-dossier-title">
          <div className="page-shell section">
            <div className="section-head split">
              <div>
                <p className="kicker">{t(locale, "Technical dossier")}</p>
                <h2 id="technical-dossier-title" className="display-section">
                  {t(locale, "Documented model facts.")}
                </h2>
              </div>
              {model.sources.length > 0 ? (
                <p className="flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-muted">
                  <span>{t(locale, "Primary sources")}:</span>
                  {model.sources.map((source, index) => (
                    <span key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent underline-offset-4 hover:underline"
                      >
                        {source.label}
                      </a>
                      {index < model.sources.length - 1 ? " ·" : null}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
            <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div
                className="table-wrap"
                tabIndex={0}
                role="region"
                aria-label={t(locale, "Documented model facts.")}
              >
                <table className="table">
                  <tbody>
                    {model.technicalFacts.map((fact) => (
                      <ModelFact
                        key={fact.label}
                        label={fact.label}
                        value={fact.value}
                        mono
                      />
                    ))}
                    {model.inferenceSoftware.length > 0 ? (
                      <ModelFact
                        label={t(locale, "Inference")}
                        value={model.inferenceSoftware.join(" · ")}
                      />
                    ) : null}
                  </tbody>
                </table>
              </div>
              {model.usageExample ? (
                <div className="min-w-0">
                  <div className="window window-dark">
                    <div className="window-bar">
                      <span>{t(locale, "Reference completion command")}</span>
                      <span>llama.cpp</span>
                    </div>
                    <pre
                      aria-label={t(
                        locale,
                        "Scrollable reference completion command",
                      )}
                      tabIndex={0}
                      className="terminal"
                    >
                      <code>{model.usageExample}</code>
                    </pre>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {t(
                      locale,
                      "Completion prompting is the documented reference path. No chat template is promised.",
                    )}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="page-shell section"
        aria-labelledby="limitations-title"
      >
        <div className="section-head split">
          <div>
            <p className="kicker">{t(locale, "Limitations")}</p>
            <h2 id="limitations-title" className="display-section">
              {t(locale, "Read the limits first.")}
            </h2>
          </div>
          {model.status === "experimental" ? (
            <p>
              {t(
                locale,
                "This model is experimental and not production-ready. It must not be used for high-stakes decisions.",
              )}
            </p>
          ) : null}
        </div>
        <ul
          className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2"
          data-stagger
        >
          {model.limitations.map((limitation) => (
            <li key={limitation} className="card flex gap-3 p-5">
              <AlertTriangle
                aria-hidden="true"
                size={17}
                strokeWidth={1.7}
                className="mt-0.5 flex-none text-muted"
              />
              <span className="text-[0.98rem] leading-7 text-ink-soft">
                {limitation}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {model.featured ? (
        <section className="band">
          <div className="page-shell section grid gap-12 lg:grid-cols-[0.5fr_1.2fr] lg:items-center">
            <div>
              <p className="kicker">{t(locale, "Repository reference")}</p>
              <h2 className="display-section mt-4">
                {t(locale, "The pilot model card.")}
              </h2>
              <p className="body-copy mt-5">
                {t(
                  locale,
                  "A visual snapshot of the model's parameter size and intended research use.",
                )}
              </p>
            </div>
            <ModelCardVisual
              name={model.name}
              parametersMillions={49.3}
              primaryUse={model.intendedUse[0]}
              modelType={model.modelType}
              contextTokens={512}
              vocabulary={16384}
              locale={locale}
            />
          </div>
        </section>
      ) : null}

      <section className="band" aria-labelledby="research-context-title">
        <div className="page-shell section grid gap-10 lg:grid-cols-2">
          <div>
            <p className="kicker">{t(locale, "Research context")}</p>
            <h2 id="research-context-title" className="display-section mt-4">
              {t(locale, "How this release fits the experiment.")}
            </h2>
            {model.researchContext ? (
              <p className="body-lg mt-6 max-w-[40rem]">
                {model.researchContext}
              </p>
            ) : null}
            <div className="mt-8">
              <ActionLink href={localizePath("/research", locale)}>
                {t(locale, "Read the research methodology")}
              </ActionLink>
            </div>
          </div>
          <div className="grid content-start gap-3">
            {relatedNotes.map((note) =>
              note.href ? (
                <Link key={note.id} href={note.href} className="card block p-5">
                  <p className="kicker">{t(locale, "Related research note")}</p>
                  <h3 className="mt-2 text-lg font-medium tracking-[-0.025em] text-ink">
                    {note.title}
                  </h3>
                  <p className="mt-2 font-mono text-[0.7rem] text-muted">
                    {note.kindLabel} · {note.progressLabel} ·{" "}
                    {t(locale, "23 July 2026")}
                  </p>
                </Link>
              ) : (
                <div key={note.id} className="card p-5">
                  <p className="kicker">{t(locale, "Related research note")}</p>
                  <h3 className="mt-2 text-lg font-medium tracking-[-0.025em] text-ink">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {t(locale, "No public article is available yet.")}
                  </p>
                </div>
              ),
            )}
            <p className="mt-3 text-sm font-medium text-ink">
              {t(locale, "Inspect the wider evidence.")}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {relatedResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="card flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink"
                >
                  {resource.label}
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ModelFact({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <tr>
      <th scope="row" className="w-[34%]">
        {label}
      </th>
      <td
        className={`min-w-0 break-words text-ink-soft ${mono ? "font-mono text-[0.84rem]" : ""}`}
      >
        {value}
      </td>
    </tr>
  );
}
