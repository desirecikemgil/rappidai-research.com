import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ActionLink, PendingAction } from "@/components/ui/action-link";
import { getModelBySlug, modelSlugs } from "@/content/models";
import { modelsPageContent } from "@/content/pages";
import { getResearchNoteById } from "@/content/research";
import { siteConfig } from "@/content/site";
import type { SiteRoute } from "@/content/types";
import { metadataFor } from "@/lib/metadata";

type ModelPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return modelSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return metadataFor(`/models/${model.slug}` as SiteRoute);
}

export default async function ModelDetailPage({ params }: ModelPageProps) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const relatedNotes = model.relatedResearchNoteIds
    .map((id) => getResearchNoteById(id))
    .filter((note) => note !== undefined);

  return (
    <>
      <section className="page-shell pt-[clamp(7.5rem,13vw,11rem)] pb-[clamp(4rem,7vw,7rem)]">
        <Reveal>
          <Link href="/models" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.7} />
            All models
          </Link>
        </Reveal>

        <div className="liquid-surface mt-16 grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_0.33fr] lg:items-end lg:p-12">
          <div>
            <Reveal>
              <p className="eyebrow">Model card · {model.statusLabel}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-7 max-w-[14ch] text-[clamp(3.15rem,7vw,7rem)] font-[520] leading-[0.92] tracking-[-0.063em] text-ink">
                {model.name}
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:border-l lg:border-line lg:pl-8">
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">Parameter size</p>
            <p className="technical-number mt-4 text-[clamp(2.4rem,5vw,4.7rem)] leading-none tracking-[-0.06em] text-accent">
              {model.parameterCount?.shortLabel ?? "—"}
            </p>
            <p className="mt-3 text-sm text-muted">
              {model.parameterCount?.label ?? modelsPageContent.missingParameterLabel}
            </p>
          </Reveal>
        </div>
        <DrawRule className="mt-16" />
      </section>

      <section className="page-shell pb-[var(--section-space)]">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Summary</p>
              <p className="body-lg mt-6">{model.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {model.links.length === 0 ? (
                  <PendingAction>{modelsPageContent.missingLinksLabel}</PendingAction>
                ) : (
                  model.links.map((link) =>
                    link.url ? (
                      <ActionLink key={link.kind} href={link.url} external variant="secondary">
                        {link.label}
                      </ActionLink>
                    ) : (
                      <PendingAction key={link.kind}>{link.pendingLabel}</PendingAction>
                    ),
                  )
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="border-t border-line">
              <ModelFact label="Status" value={model.statusLabel} />
              <ModelFact label="Model type" value={model.modelType} />
              <ModelFact label="Intended use" value={model.intendedUse.join(" · ")} />
              <ModelFact label="Languages" value={model.languages.length ? model.languages.join(" · ") : "Not specified"} />
              <ModelFact label="Lineage" value={model.lineage} />
              <ModelFact label="Release status" value={model.releaseStatus} />
              <ModelFact label="License" value={model.license ?? modelsPageContent.missingLicenseLabel} />
            </dl>
          </Reveal>
        </div>
      </section>

      {model.technicalFacts.length > 0 || model.inferenceSoftware.length > 0 ? (
        <section className="liquid-section border-y border-line bg-pale-soft/35">
          <div className="page-shell section-space-sm">
            <div className="grid min-w-0 gap-12 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
              <Reveal className="min-w-0">
                <p className="eyebrow">Technical dossier</p>
                <h2 className="display-section mt-6">Documented model facts.</h2>
                <p className="body-copy mt-6 max-w-[34rem]">
                  Information linked to public project sources. Unknown release dates,
                  licensing terms and unsupported client compatibility are not inferred.
                </p>
              </Reveal>

              <Reveal delay={0.08} className="min-w-0">
                <dl className="liquid-surface min-w-0 px-6 sm:px-8">
                  {model.technicalFacts.map((fact) => (
                    <ModelFact key={fact.label} label={fact.label} value={fact.value} />
                  ))}
                  {model.inferenceSoftware.length > 0 ? (
                    <ModelFact
                      label="Inference"
                      value={model.inferenceSoftware.join(" · ")}
                    />
                  ) : null}
                </dl>

                {model.sources.length > 0 ? (
                  <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-muted">
                    <span>Primary sources:</span>
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
                      Reference completion command
                    </p>
                    <pre className="mt-5 overflow-x-auto rounded-[0.85rem] border border-white/70 bg-ink p-5 text-[0.78rem] leading-6 text-[#d9e6f7]">
                      <code>{model.usageExample}</code>
                    </pre>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      Completion prompting is the documented reference path. No chat
                      template is promised.
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
              <p className="eyebrow">Research context</p>
              <h2 className="display-section mt-6">How this release fits the experiment.</h2>
            </Reveal>
            <Reveal delay={0.08} className="border-t border-line pt-8">
              <p className="body-lg max-w-[44rem]">{model.researchContext}</p>
              <div className="mt-8">
                <ActionLink href="/research">Read the research methodology</ActionLink>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {model.featured ? (
        <section className="liquid-section border-y border-line bg-pale-soft/40 py-[clamp(4.5rem,8vw,8rem)]">
          <div className="page-shell grid gap-12 lg:grid-cols-[0.5fr_1.2fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">Official reference</p>
              <h2 className="mt-6 text-[clamp(2rem,4vw,4rem)] font-[510] leading-[1.02] tracking-[-0.05em] text-ink">
                The pilot model card.
              </h2>
              <p className="body-copy mt-5">A visual snapshot of the model&apos;s parameter size and intended research use.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="liquid-frame overflow-hidden border border-line bg-white/30 p-2 sm:p-3">
                <Image
                  src={siteConfig.brandAssets.modelCardReference}
                  alt="Official quantum-1.6-pilot model card showing approximately 50M parameters and research and local experimentation as the primary use"
                  width={1600}
                  height={1006}
                  sizes="(max-width: 1024px) 92vw, 62vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <Reveal>
            <p className="eyebrow">Limitations</p>
            <h2 className="display-section mt-6">Read the limits first.</h2>
          </Reveal>
          <div className="border-t border-line">
            {model.limitations.map((limitation, index) => (
              <Reveal key={limitation} delay={index * 0.035}>
                  <div className="liquid-row grid grid-cols-[3rem_1fr] gap-4 rounded-[1.15rem] border-y border-line py-5 sm:grid-cols-[5rem_1fr] sm:py-6">
                  <span className="font-mono text-[0.66rem] tracking-[0.12em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-lg tracking-[-0.02em] text-ink-soft">{limitation}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {model.status === "experimental" ? (
          <p className="mt-10 border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
            This model is experimental and not production-ready. It must not be used for high-stakes decisions.
          </p>
        ) : null}
      </section>

      {relatedNotes.length > 0 ? (
        <section className="liquid-section border-y border-line bg-pale-soft/40">
          <div className="page-shell section-space-sm">
            <p className="eyebrow">Related research note</p>
            <div className="mt-10 border-b border-line">
              {relatedNotes.map((note) => (
                <div key={note.id} className="liquid-row grid gap-4 rounded-[1.15rem] border-y border-line py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h2 className="text-xl font-[520] tracking-[-0.03em] text-ink">{note.title}</h2>
                    <p className="mt-2 font-mono text-[0.64rem] tracking-[0.12em] text-muted uppercase">
                      {note.kindLabel} · {note.progressLabel}
                    </p>
                  </div>
                  <span className="max-w-[18rem] text-sm leading-6 text-muted sm:text-right">
                    Draft in progress. No public article is available yet.
                  </span>
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
      <dt className="font-mono text-[0.65rem] tracking-[0.13em] text-muted uppercase">{label}</dt>
      <dd className="min-w-0 break-words text-[0.98rem] leading-7 text-ink-soft">{value}</dd>
    </div>
  );
}
