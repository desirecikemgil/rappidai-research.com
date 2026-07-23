import type { Metadata } from "next";
import Image from "next/image";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { HeroVisualization } from "@/components/sections/hero-visualization";
import { ParameterGrid } from "@/components/sections/parameter-grid";
import { ResearchDiagram } from "@/components/research/research-diagram";
import { EvidenceBadge } from "@/components/resources/resource-ui";
import { ActionLink, PendingAction } from "@/components/ui/action-link";
import { BrandSymbol } from "@/components/ui/brand-lockup";
import { getFeaturedModel } from "@/content/models";
import { homePageContent } from "@/content/pages";
import {
  experimentLogs,
  researchAreas,
  researchPrinciples,
  researchThesis,
} from "@/content/research";
import { resourceCards } from "@/content/resources";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/");

const diagramKinds = ["pipeline", "inference", "evaluation"] as const;

export default function HomePage() {
  const featuredModel = getFeaturedModel();
  const heroExternal =
    siteConfig.externalLinks[homePageContent.hero.externalAction.linkKey];
  const featuredHuggingFaceLink = featuredModel.links.find(
    (link) => link.kind === "huggingFace",
  );

  return (
    <>
      <section className="liquid-hero relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="ambient-shift pointer-events-none absolute -right-[18rem] -top-[20rem] size-[52rem] rounded-full bg-[radial-gradient(circle,rgba(18,107,255,0.12),rgba(234,242,255,0.25)_45%,transparent_72%)] blur-3xl"
        />
        <div className="page-shell-wide grid min-h-[calc(100svh-var(--header-height))] items-center gap-4 py-[clamp(4.5rem,8vw,7.5rem)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="liquid-hero-copy relative z-10 max-w-[47rem]">
            <Reveal>
              <p className="eyebrow">{homePageContent.hero.eyebrow}</p>
            </Reveal>
            <h1 className="display-hero mt-7 text-ink sm:mt-8">
              {homePageContent.hero.headlineLines.map((line, index) => (
                <Reveal key={line} delay={0.05 + index * 0.08} distance={24}>
                  <span className="block">{line}</span>
                </Reveal>
              ))}
            </h1>
            <Reveal delay={0.24}>
              <p className="body-lg mt-7 max-w-[40rem] sm:mt-9">
                {homePageContent.hero.description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
                <ActionLink href={homePageContent.hero.primaryAction.href}>
                  {homePageContent.hero.primaryAction.label}
                </ActionLink>
                {heroExternal.url ? (
                  <ActionLink
                    href={heroExternal.url}
                    external
                    variant="secondary"
                  >
                    {homePageContent.hero.externalAction.label}
                  </ActionLink>
                ) : (
                  <PendingAction>
                    {homePageContent.hero.externalAction.label} · link pending
                  </PendingAction>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.36}>
              <p className="body-copy mt-5 max-w-[38rem]">
                {homePageContent.hero.supportingText}
              </p>
            </Reveal>
            <Reveal delay={0.42}>
              <p className="mt-6 max-w-xl border-l border-accent pl-4 font-mono text-[0.68rem] leading-5 tracking-[0.08em] text-muted uppercase sm:mt-9">
                {homePageContent.hero.status}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.12}
            distance={10}
            className="relative -mr-[8%] hidden lg:block"
          >
            <HeroVisualization />
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">{homePageContent.thesis.eyebrow}</p>
            <h2 className="display-section mt-8">{researchThesis.statement}</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:self-end">
            <p className="body-lg">{researchThesis.supportingText}</p>
          </Reveal>
        </div>

        <DrawRule className="mt-[clamp(4rem,8vw,7rem)]" />
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {researchPrinciples.map((principle, index) => (
            <Reveal
              key={principle.number}
              delay={index * 0.06}
              className="liquid-card p-7 py-9 lg:min-h-[18rem] lg:p-9 lg:py-11"
            >
              <p className="font-mono text-xs tracking-[0.15em] text-accent">
                {principle.number}
              </p>
              <h3 className="mt-14 text-[clamp(1.55rem,2.3vw,2.2rem)] font-[520] tracking-[-0.04em] text-ink">
                {principle.title}
              </h3>
              <p className="body-copy mt-4 max-w-sm">{principle.description}</p>
            </Reveal>
          ))}
        </div>
        <DrawRule />
      </section>

      <section className="liquid-section border-y border-line bg-pale-soft/45">
        <div className="page-shell section-space">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow">{homePageContent.featuredModel.eyebrow}</p>
              <h2 className="mt-7 text-[clamp(3rem,7vw,7.3rem)] font-[520] leading-[0.92] tracking-[-0.063em] text-ink">
                {featuredModel.name}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="liquid-pill inline-flex items-center gap-2 border border-line-strong bg-white/35 px-3 py-2 font-mono text-[0.64rem] tracking-[0.12em] text-accent uppercase">
                <span
                  className="size-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {featuredModel.statusLabel}
              </span>
            </Reveal>
          </div>

          <DrawRule className="mt-12" />
          <div className="liquid-surface mt-8 grid gap-12 p-7 py-12 sm:p-10 lg:grid-cols-[0.45fr_0.55fr] lg:gap-20 lg:p-14 lg:py-16">
            <Reveal>
              <p className="font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
                Parameter size
              </p>
              <div className="mt-5 flex items-end gap-4">
                <span className="technical-number text-[clamp(4.75rem,10vw,9rem)] leading-none tracking-[-0.08em] text-accent">
                  {featuredModel.parameterCount?.shortLabel}
                </span>
                <span className="mb-4 text-lg text-ink">parameters</span>
              </div>
              <div className="mt-10 max-w-md">
                <ParameterGrid />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="body-lg max-w-2xl">{featuredModel.summary}</p>
              <dl className="mt-10 border-t border-line">
                <FeaturedFact
                  label="Model type"
                  value={featuredModel.modelType}
                />
                <FeaturedFact
                  label="Primary use"
                  value={featuredModel.intendedUse[0]}
                />
                <FeaturedFact
                  label="Languages"
                  value={
                    featuredModel.languages.join(" and ") + " experimentation"
                  }
                />
                <FeaturedFact
                  label="Release"
                  value={featuredModel.releaseStatus}
                />
              </dl>
              <p className="mt-7 border-l-2 border-accent pl-4 text-sm leading-6 text-ink-soft">
                {homePageContent.featuredModel.productionNotice}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink
                  href={`/models/${featuredModel.slug}`}
                  variant="primary"
                >
                  Model card
                </ActionLink>
                {featuredHuggingFaceLink?.url ? (
                  <ActionLink
                    href={featuredHuggingFaceLink.url}
                    external
                    variant="secondary"
                  >
                    View on Hugging Face
                  </ActionLink>
                ) : (
                  <PendingAction>Hugging Face link pending</PendingAction>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="liquid-frame overflow-hidden border border-line bg-white/35 p-2 sm:p-3">
              <Image
                src={siteConfig.brandAssets.modelCardReference}
                alt="quantum-1.6-pilot model-card graphic showing approximately 50M parameters and research and local experimentation as the primary use"
                width={1600}
                height={1006}
                sizes="(max-width: 1400px) 92vw, 1280px"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="page-shell section-space">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark">
                {homePageContent.modelEvolution.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-section text-white">
                {homePageContent.modelEvolution.title}
              </h2>
            </Reveal>
          </div>

          <div className="relative mt-16 grid gap-4 lg:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[4.68rem] hidden h-px bg-white/20 lg:block"
            />
            {experimentLogs.map((entry, index) => (
              <Reveal
                key={entry.modelSlug}
                delay={index * 0.07}
                className="liquid-card-dark relative border p-7 py-9 lg:min-h-[21rem] lg:p-9 lg:py-10"
              >
                <div className="flex items-center gap-4">
                  <span className="technical-number text-xs text-[#79aaff]">
                    0{index + 1}
                  </span>
                  <span
                    className={`relative z-10 size-2.5 rounded-full ${entry.modelSlug === "quantum-1-echelon" ? "border border-[#79aaff] bg-ink" : "bg-[#79aaff]"}`}
                  />
                </div>
                <p className="mt-14 font-mono text-[0.64rem] tracking-[0.12em] text-[#9fb2cf] uppercase">
                  {entry.statusLabel}
                </p>
                <h3 className="mt-5 text-[clamp(1.7rem,3vw,2.8rem)] font-[510] tracking-[-0.045em] text-white">
                  {entry.title}
                </h3>
                <p className="mt-5 max-w-sm leading-7 text-[#b9c7dc]">
                  {entry.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">{homePageContent.currentResearch.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-section">
              {homePageContent.currentResearch.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-3 border-b border-line sm:space-y-4">
          {researchAreas.map((area, index) => (
            <Reveal key={area.id} delay={index * 0.04}>
              <article className="liquid-row grid gap-8 rounded-[1.35rem] border-y border-line py-8 lg:grid-cols-[0.15fr_0.55fr_0.6fr] lg:items-center lg:py-10">
                <p className="technical-number text-xs text-accent">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-[clamp(1.7rem,3vw,2.65rem)] font-[515] tracking-[-0.045em] text-ink">
                    {area.title}
                  </h3>
                  <p className="body-copy mt-4 max-w-xl">{area.description}</p>
                </div>
                <div className="max-w-[23rem] lg:justify-self-end">
                  <ResearchDiagram kind={diagramKinds[index]} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="liquid-section border-y border-line bg-pale-soft/35">
        <div className="page-shell section-space-sm">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow">DOCUMENTATION STATUS</p>
              <h2 className="display-section mt-7 text-ink">
                Evidence, gaps and reuse boundaries.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-[38rem] text-sm leading-6 text-muted">
                The resources hub turns “Documented clearly” into a public
                record of sources, reproducibility, data provenance, responsible
                use and unresolved information.
              </p>
              <div className="mt-6">
                <ActionLink href="/resources">Explore resources</ActionLink>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {resourceCards.slice(0, 3).map((resource, index) => (
              <Reveal
                key={resource.id}
                delay={index * 0.04}
                className="liquid-card p-7 sm:p-8"
              >
                <EvidenceBadge status={resource.status} />
                <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-ink">
                  {resource.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {resource.description}
                </p>
                <div className="mt-7">
                  <ActionLink href={resource.href} variant="text">
                    Open resource
                  </ActionLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="liquid-section border-y border-line bg-pale-soft/40">
        <div className="page-shell section-space-sm grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">{homePageContent.openResearch.eyebrow}</p>
            <h2 className="display-section mt-7">
              {homePageContent.openResearch.headline}
            </h2>
            <p className="body-lg mt-7 max-w-[46rem]">
              {homePageContent.openResearch.text}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:justify-end">
            {homePageContent.openResearch.actions.map((action) => {
              const external = siteConfig.externalLinks[action.linkKey];
              return external.url ? (
                <ActionLink
                  key={action.linkKey}
                  href={external.url}
                  external
                  variant="secondary"
                >
                  {action.label}
                </ActionLink>
              ) : (
                <PendingAction key={action.linkKey}>
                  {external.pendingLabel}
                </PendingAction>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
          <Reveal>
            <div className="liquid-surface mx-auto max-w-[20rem] p-10 lg:mx-0">
              <BrandSymbol />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">{homePageContent.founder.eyebrow}</p>
            <h2 className="display-section mt-7">
              {homePageContent.founder.headline}
            </h2>
            <p className="body-lg mt-7 max-w-2xl">
              {siteConfig.founder.biography}
            </p>
            <div className="mt-10 border-y border-line py-5">
              <p className="text-lg font-[520] tracking-[-0.025em] text-ink">
                {siteConfig.founder.name}
              </p>
              <p className="mt-1 text-sm text-muted">
                {siteConfig.founder.role}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell pb-[var(--section-space)]">
        <div className="liquid-surface px-7 py-[clamp(4rem,8vw,7.5rem)] sm:px-10 lg:px-14">
          <Reveal className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">{homePageContent.contact.eyebrow}</p>
              <h2 className="display-section mt-7">
                {homePageContent.contact.headline}
              </h2>
              <p className="body-lg mt-6 max-w-2xl">
                {homePageContent.contact.text}
              </p>
              <p className="mt-5 font-mono text-[0.68rem] tracking-[0.1em] text-muted uppercase">
                {siteConfig.businessEmail}
              </p>
            </div>
            <ActionLink href={homePageContent.contact.action.href}>
              {homePageContent.contact.action.label}
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FeaturedFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <dt className="font-mono text-[0.63rem] tracking-[0.13em] text-muted uppercase">
        {label}
      </dt>
      <dd className="text-[0.95rem] leading-6 text-ink-soft">{value}</dd>
    </div>
  );
}
