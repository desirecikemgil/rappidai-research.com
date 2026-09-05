import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DrawRule, Reveal } from "@/components/motion/reveal";
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
 * Draw only dimensions stated by pinned public sources. Echelon stays hollow
 * because its stack is a committed configuration, not a trained model.
 */
function architectureFor(slug: string) {
  if (slug === "quantum-1-6-pilot") {
    return { layers: 12, hiddenSize: 512, heads: 8, configured: false };
  }
  if (slug === "quantum-1-echelon") {
    return { layers: 26, hiddenSize: 1280, heads: 20, configured: true };
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

  return (
    <>
      <section className="model-detail-opening page-shell pt-[clamp(5rem,10vw,8rem)] pb-[clamp(2.75rem,6vw,5.5rem)]">
        <Reveal>
          <Link
            href={localizePath("/models", locale)}
            className="-ml-2 inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.7} />
            {t(locale, "All models")}
          </Link>
        </Reveal>

        <div className="model-hero liquid-surface mt-10 grid gap-10 p-7 sm:mt-14 sm:p-10 lg:mt-16 lg:grid-cols-[1fr_0.42fr] lg:items-end lg:p-12">
          <div className="model-grid" aria-hidden="true" />
          <div className="relative">
            <Reveal>
              <p className="eyebrow">
                {t(locale, "Model card")} · {model.statusLabel}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-7 max-w-[14ch] text-[clamp(3.15rem,7vw,7rem)] leading-[0.92] font-[520] tracking-[-0.063em] text-ink">
                {model.name}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 flex items-baseline gap-3">
                <span className="display-mega text-accent">
                  {model.parameterCount?.shortLabel ?? "—"}
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">
                  {t(locale, "Parameter size")}
                </span>
              </p>
              <p className="mt-3 max-w-[30rem] text-sm text-muted">
                {model.parameterCount?.label ?? page.missingParameterLabel}
              </p>
            </Reveal>
          </div>

          {architecture ? (
            <Reveal
              delay={0.18}
              variant="scale"
              className="relative lg:border-l lg:border-line lg:pl-9"
            >
              <p className="font-mono text-[0.63rem] tracking-[0.14em] text-muted uppercase">
                {architecture.configured
                  ? t(locale, "Configured architecture")
                  : t(locale, "Published architecture")}
              </p>
              <div className="mt-6">
                <ArchitectureStack
                  layers={architecture.layers}
                  hiddenSize={architecture.hiddenSize}
                  heads={architecture.heads}
                  configured={architecture.configured}
                  locale={locale}
                />
              </div>
              {architecture.configured ? (
                <p className="mt-4 text-[0.75rem] leading-5 text-muted">
                  {t(
                    locale,
                    "Drawn from the committed preflight report. No Echelon model has been trained.",
                  )}
                </p>
              ) : null}
            </Reveal>
          ) : null}
        </div>
        <DrawRule className="mt-10 sm:mt-14 lg:mt-16" />
      </section>

      <section className="page-shell pb-[var(--section-space)]">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{t(locale, "Summary")}</p>
              <p className="body-lg mt-6">{model.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {modelLinks.length === 0 ? (
                  <PendingAction>{page.missingLinksLabel}</PendingAction>
                ) : (
                  modelLinks.map((link) =>
                    link.url ? (
                      <ActionLink
                        key={`${link.kind}-${link.label}`}
                        href={link.url}
                        external
                        variant="secondary"
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
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="border-t border-line">
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
            </dl>
          </Reveal>
        </div>
      </section>

      {model.technicalFacts.length > 0 || model.inferenceSoftware.length > 0 ? (
        <section className="liquid-section border-y border-line bg-pale-soft/35">
          <div className="page-shell section-space-sm">
            <div className="grid min-w-0 gap-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
              <Reveal className="min-w-0">
                <p className="eyebrow">{t(locale, "Technical dossier")}</p>
                <h2 className="display-section mt-6">
                  {t(locale, "Documented model facts.")}
                </h2>
                <p className="body-copy mt-6 max-w-[34rem]">
                  {t(
                    locale,
                    "Information linked to public project sources. Unknown release dates, licensing terms and unsupported client compatibility are not inferred.",
                  )}
                </p>
              </Reveal>

              <Reveal delay={0.08} className="min-w-0">
                <dl className="liquid-surface min-w-0 px-6 sm:px-8">
                  {model.technicalFacts.map((fact) => (
                    <ModelFact
                      key={fact.label}
                      label={fact.label}
                      value={fact.value}
                    />
                  ))}
                  {model.inferenceSoftware.length > 0 ? (
                    <ModelFact
                      label={t(locale, "Inference")}
                      value={model.inferenceSoftware.join(" · ")}
                    />
                  ) : null}
                </dl>

                {model.sources.length > 0 ? (
                  <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-muted">
                    <span>{t(locale, "Primary sources")}:</span>
                    {model.sources.map((source, index) => (
                      <span key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                        >
                          {source.label}
                        </a>
                        {index < model.sources.length - 1 ? " ·" : null}
                      </span>
                    ))}
                  </p>
                ) : null}

                {model.usageExample ? (
                  <div className="liquid-surface mt-5 p-6 sm:p-8">
                    <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">
                      {t(locale, "Reference completion command")}
                    </p>
                    <pre
                      aria-label={t(
                        locale,
                        "Scrollable reference completion command",
                      )}
                      tabIndex={0}
                      className="mt-5 overflow-x-auto rounded-[0.85rem] border border-white/70 bg-ink p-5 text-[0.78rem] leading-6 text-[#d9e6f7] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                    >
                      <code>{model.usageExample}</code>
                    </pre>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      {t(
                        locale,
                        "Completion prompting is the documented reference path. No chat template is promised.",
                      )}
                    </p>
                  </div>
                ) : null}
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      {model.researchContext ? (
        <section className="page-shell section-space-sm">
          <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">{t(locale, "Research context")}</p>
              <h2 className="display-section mt-6">
                {t(locale, "How this release fits the experiment.")}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="border-t border-line pt-8">
              <p className="body-lg max-w-[44rem]">{model.researchContext}</p>
              <div className="mt-8">
                <ActionLink href={localizePath("/research", locale)}>
                  {t(locale, "Read the research methodology")}
                </ActionLink>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {model.featured ? (
        <section className="liquid-section border-y border-line bg-pale-soft/40 py-[clamp(4.5rem,8vw,8rem)]">
          <div className="page-shell grid gap-12 lg:grid-cols-[0.5fr_1.2fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">{t(locale, "Repository reference")}</p>
              <h2 className="mt-6 text-[clamp(2rem,4vw,4rem)] font-[510] leading-[1.02] tracking-[-0.05em] text-ink">
                {t(locale, "The pilot model card.")}
              </h2>
              <p className="body-copy mt-5">
                {t(
                  locale,
                  "A visual snapshot of the model's parameter size and intended research use.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ModelCardVisual
                name={model.name}
                parametersMillions={49.3}
                primaryUse={model.intendedUse[0]}
                modelType={model.modelType}
                contextTokens={512}
                vocabulary={16384}
                locale={locale}
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="liquid-section border-y border-line bg-pale-soft/35">
        <div className="page-shell section-space-sm">
          <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow">{t(locale, "RELATED RESOURCES")}</p>
              <h2 className="display-section mt-6 text-ink">
                {t(locale, "Inspect the wider evidence.")}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedResources.map((resource) => (
                <ActionLink
                  key={resource.href}
                  href={resource.href}
                  variant="secondary"
                  className="justify-between"
                >
                  {resource.label}
                </ActionLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <Reveal>
            <p className="eyebrow">{t(locale, "Limitations")}</p>
            <h2 className="display-section mt-6">
              {t(locale, "Read the limits first.")}
            </h2>
          </Reveal>
          <div className="space-y-3 border-t border-line sm:space-y-4">
            {model.limitations.map((limitation, index) => (
              <Reveal key={limitation} delay={index * 0.035}>
                <div className="liquid-row grid grid-cols-[3rem_1fr] gap-4 rounded-[1.15rem] border-y border-line py-5 sm:grid-cols-[5rem_1fr] sm:py-6">
                  <span className="font-mono text-[0.66rem] tracking-[0.12em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg tracking-[-0.02em] text-ink-soft">
                    {limitation}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {model.status === "experimental" ? (
          <p className="mt-10 border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
            {t(
              locale,
              "This model is experimental and not production-ready. It must not be used for high-stakes decisions.",
            )}
          </p>
        ) : null}
      </section>

      {relatedNotes.length > 0 ? (
        <section className="liquid-section border-y border-line bg-pale-soft/40">
          <div className="page-shell section-space-sm">
            <p className="eyebrow">{t(locale, "Related research note")}</p>
            <div className="mt-10 space-y-3 border-b border-line sm:space-y-4">
              {relatedNotes.map((note) => (
                <div key={note.id}>
                  {note.href ? (
                    <Link
                      href={note.href}
                      className="liquid-row grid gap-4 rounded-[1.15rem] border-y border-line py-6 transition-colors hover:text-accent sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div>
                        <h2 className="text-xl font-[520] tracking-[-0.03em] text-ink">
                          {note.title}
                        </h2>
                        <p className="mt-2 font-mono text-[0.64rem] tracking-[0.12em] text-muted uppercase">
                          {note.kindLabel} · {note.progressLabel} ·{" "}
                          {t(locale, "23 July 2026")}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-ink">
                        {t(locale, "Read research note")}
                      </span>
                    </Link>
                  ) : (
                    <div className="liquid-row grid gap-4 rounded-[1.15rem] border-y border-line py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <h2 className="text-xl font-[520] tracking-[-0.03em] text-ink">
                          {note.title}
                        </h2>
                        <p className="mt-2 font-mono text-[0.64rem] tracking-[0.12em] text-muted uppercase">
                          {note.kindLabel} · {note.progressLabel}
                        </p>
                      </div>
                      <span className="max-w-[18rem] text-sm leading-6 text-muted sm:text-right">
                        {t(locale, "No public article is available yet.")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function ModelFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="font-mono text-[0.65rem] tracking-[0.13em] text-muted uppercase">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-[0.98rem] leading-7 text-ink-soft">
        {value}
      </dd>
    </div>
  );
}
