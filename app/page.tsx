import type { Metadata } from "next";
import {
  DrawRule,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Parallax } from "@/components/motion/parallax";
import { GlowCard, Magnetic } from "@/components/motion/interactive";
import { HeroNetworkBackdrop } from "@/components/sections/hero-network-backdrop";
import { ArchitectureStack } from "@/components/graphics/architecture-stack";
import { ModelCardVisual } from "@/components/graphics/model-card-visual";
import { TrainingTimeline } from "@/components/graphics/training-timeline";
import { ResearchDiagram } from "@/components/research/research-diagram";
import { EvidenceBadge } from "@/components/resources/resource-ui";
import { ActionLink, PendingAction } from "@/components/ui/action-link";
import { BrandSymbol } from "@/components/ui/brand-lockup";
import { SectionNavigator } from "@/components/ui/section-navigator";
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
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export const metadata: Metadata = metadataFor("/");

const diagramKinds = ["pipeline", "inference", "evaluation"] as const;

export function LocalizedHomePage({ locale }: { locale: Locale }) {
  const page = localizeContent(homePageContent, locale);
  const thesis = localizeContent(researchThesis, locale);
  const principles = localizeContent(researchPrinciples, locale);
  const logs = localizeContent(experimentLogs, locale);
  const areas = localizeContent(researchAreas, locale);
  const resources = localizeContent(resourceCards, locale);
  const config = localizeContent(siteConfig, locale);
  const featuredModel = getFeaturedModel(locale);
  const heroExternal = config.externalLinks[page.hero.externalAction.linkKey];
  const featuredHuggingFaceLink = featuredModel.links.find(
    (link) => link.kind === "huggingFace",
  );

  return (
    <>
      <section className="liquid-hero home-hero relative overflow-hidden border-b border-line">
        <HeroNetworkBackdrop />
        <div
          aria-hidden="true"
          className="ambient-shift pointer-events-none absolute -right-[18rem] -top-[20rem] size-[52rem] rounded-full bg-[radial-gradient(circle,rgba(18,107,255,0.12),rgba(234,242,255,0.25)_45%,transparent_72%)] blur-3xl"
        />
        <div className="home-hero-shell page-shell-wide flex min-h-[calc(100svh-var(--header-height))] items-center py-[clamp(4.5rem,8vw,7.5rem)]">
          <div className="liquid-hero-copy home-hero-copy relative z-10 w-full max-w-[82rem]">
            <Reveal>
              <p className="eyebrow">{page.hero.eyebrow}</p>
            </Reveal>
            <h1 className="display-hero home-hero-title mt-7 text-ink sm:mt-8">
              <RevealText lines={page.hero.headlineLines} delay={0.05} />
            </h1>
            <Reveal delay={0.24} variant="blur">
              <p className="lede mt-7 sm:mt-9">{page.hero.description}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
                <Magnetic>
                  <ActionLink href={page.hero.primaryAction.href}>
                    {page.hero.primaryAction.label}
                  </ActionLink>
                </Magnetic>
                {heroExternal.url ? (
                  <Magnetic>
                    <ActionLink
                      href={heroExternal.url}
                      external
                      variant="secondary"
                    >
                      {page.hero.externalAction.label}
                    </ActionLink>
                  </Magnetic>
                ) : (
                  <PendingAction>
                    {page.hero.externalAction.label} ·{" "}
                    {t(locale, "link pending")}
                  </PendingAction>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.36}>
              <p className="body-copy mt-5 max-w-[38rem]">
                {page.hero.supportingText}
              </p>
            </Reveal>
            <Reveal delay={0.42}>
              <p className="hero-status mt-6 max-w-xl sm:mt-9">
                {page.hero.status}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark-band home-research-index text-white">
        <div className="page-shell section-space-sm">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
            <div>
              <p className="page-context">{t(locale, "Research index")}</p>
              <h2 className="mt-6 max-w-[13ch] text-[clamp(2.5rem,5vw,5.5rem)] font-[510] leading-[0.98] tracking-[-0.06em] text-[var(--color-dark-title)]">
                {t(locale, "Start with the question you want to answer.")}
              </h2>
            </div>
            <p className="max-w-[42rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-8 text-[var(--color-dark-body)]">
              {t(
                locale,
                "The site separates model releases, research evidence, agent infrastructure and supporting documentation so each area can be understood on its own.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 lg:mt-16">
            <SectionNavigator
              onDark
              label={t(locale, "Explore the research")}
              items={[
                {
                  href: localizePath("/research", locale),
                  label: t(locale, "Research"),
                  description: t(
                    locale,
                    "Evidence, findings, methods and open questions.",
                  ),
                },
                {
                  href: localizePath("/models", locale),
                  label: t(locale, "Models"),
                  description: t(
                    locale,
                    "Released pilots and the current Echelon pipeline.",
                  ),
                },
                {
                  href: localizePath("/tools", locale),
                  label: t(locale, "Tools"),
                  description: t(
                    locale,
                    "Ghost and Replay for controlled agent execution.",
                  ),
                },
                {
                  href: localizePath("/resources", locale),
                  label: t(locale, "Resources"),
                  description: t(
                    locale,
                    "Source-linked records for reproducibility and reuse.",
                  ),
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">{page.thesis.eyebrow}</p>
            <h2 className="display-section mt-8">{thesis.statement}</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:self-end">
            <p className="body-lg">{thesis.supportingText}</p>
          </Reveal>
        </div>

        <DrawRule className="mt-[clamp(4rem,8vw,7rem)]" />
        <Stagger className="mt-5 grid gap-4 lg:grid-cols-3" step={0.08}>
          {principles.map((principle) => (
            <StaggerItem key={principle.number} as="article" distance={22}>
              <GlowCard
                tilt
                className="liquid-card principle-card h-full p-7 py-9 lg:min-h-[19rem] lg:p-9 lg:py-11"
              >
                <span className="principle-ghost" aria-hidden="true">
                  {principle.number}
                </span>
                <p className="font-mono text-xs tracking-[0.15em] text-accent">
                  {principle.number}
                </p>
                <h3 className="mt-14 text-[clamp(1.55rem,2.3vw,2.2rem)] font-[520] tracking-[-0.04em] text-ink">
                  {principle.title}
                </h3>
                <p className="body-copy mt-4 max-w-sm">
                  {principle.description}
                </p>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
        <DrawRule />
      </section>

      <section className="liquid-section border-y border-line bg-pale-soft/45">
        <div className="page-shell section-space">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow">{page.featuredModel.eyebrow}</p>
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

          <Reveal className="mt-8" distance={22}>
            <ModelCardVisual
              name={featuredModel.name}
              parametersMillions={49.3}
              primaryUse={featuredModel.intendedUse[0]}
              modelType={featuredModel.modelType}
              contextTokens={512}
              vocabulary={16384}
              locale={locale}
            />
          </Reveal>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
            <Reveal className="liquid-surface p-7 py-10 sm:p-10 lg:p-12">
              <p className="body-lg max-w-2xl">{featuredModel.summary}</p>
              <dl className="mt-9 border-t border-line">
                <FeaturedFact
                  label={t(locale, "Languages")}
                  value={t(locale, "German-language experimentation")}
                />
                <FeaturedFact
                  label={t(locale, "Release")}
                  value={featuredModel.releaseStatus}
                />
              </dl>
              <p className="mt-7 border-l-2 border-accent pl-4 text-sm leading-6 text-ink-soft">
                {page.featuredModel.productionNotice}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <ActionLink
                    href={localizePath(`/models/${featuredModel.slug}`, locale)}
                    variant="primary"
                  >
                    {t(locale, "Model card")}
                  </ActionLink>
                </Magnetic>
                {featuredHuggingFaceLink?.url ? (
                  <Magnetic>
                    <ActionLink
                      href={featuredHuggingFaceLink.url}
                      external
                      variant="secondary"
                    >
                      {t(locale, "View on Hugging Face")}
                    </ActionLink>
                  </Magnetic>
                ) : (
                  <PendingAction>
                    {t(locale, "Hugging Face link pending")}
                  </PendingAction>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="liquid-surface p-7 py-10 sm:p-10">
              <p className="font-mono text-[0.63rem] tracking-[0.16em] text-muted uppercase">
                {t(locale, "Published architecture")}
              </p>
              <div className="mt-8">
                <ArchitectureStack
                  layers={12}
                  hiddenSize={512}
                  heads={8}
                  locale={locale}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dark-band text-white">
        <div className="page-shell section-space relative">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark">
                {page.modelEvolution.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-section text-[var(--color-dark-title)]">
                {page.modelEvolution.title}
              </h2>
            </Reveal>
          </div>

          <div className="mt-16">
            <TrainingTimeline
              stages={logs.map((entry, index) => ({
                id: entry.modelSlug,
                index: `0${index + 1}`,
                status: entry.statusLabel,
                title: entry.title,
                description: entry.description,
                reached: entry.modelSlug !== "quantum-1-echelon",
              }))}
            />
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">{page.currentResearch.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-section">{page.currentResearch.title}</h2>
          </Reveal>
        </div>

        <Stagger
          className="mt-16 space-y-3 border-b border-line sm:space-y-4"
          step={0.09}
        >
          {areas.map((area, index) => (
            <StaggerItem key={area.id} as="article" distance={20}>
              <div className="liquid-row grid gap-8 rounded-[1.35rem] border-y border-line py-8 lg:grid-cols-[0.13fr_0.52fr_0.65fr] lg:items-center lg:py-11">
                <p className="technical-number text-xs text-accent">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-[clamp(1.7rem,3vw,2.65rem)] leading-[1.04] font-[515] tracking-[-0.045em] text-ink">
                    {area.title}
                  </h3>
                  <p className="body-copy mt-4 max-w-xl">{area.description}</p>
                </div>
                <div className="max-w-[26rem] lg:justify-self-end">
                  <ResearchDiagram kind={diagramKinds[index]} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="liquid-section border-y border-line bg-pale-soft/35">
        <div className="page-shell section-space-sm">
          <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow">{t(locale, "DOCUMENTATION STATUS")}</p>
              <h2 className="display-section mt-7 text-ink">
                {t(locale, "Evidence, gaps and reuse boundaries.")}
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-[38rem] text-sm leading-6 text-muted">
                {t(
                  locale,
                  "The resources hub turns “Documented clearly” into a public record of sources, reproducibility, data provenance, responsible use and unresolved information.",
                )}
              </p>
              <div className="mt-6">
                <ActionLink href={localizePath("/resources", locale)}>
                  {t(locale, "Explore resources")}
                </ActionLink>
              </div>
            </div>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 lg:grid-cols-3">
            {resources.slice(0, 3).map((resource) => (
              <StaggerItem key={resource.id} as="article">
                <GlowCard className="liquid-card flex h-full flex-col p-7 sm:p-8">
                  <EvidenceBadge status={resource.status} locale={locale} />
                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-ink">
                    {resource.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {resource.description}
                  </p>
                  <div className="mt-7 pt-1">
                    <ActionLink href={resource.href} variant="text">
                      {t(locale, "Open resource")}
                    </ActionLink>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="liquid-section border-y border-line bg-pale-soft/40">
        <div className="page-shell section-space-sm grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">{page.openResearch.eyebrow}</p>
            <h2 className="display-section mt-7">
              {page.openResearch.headline}
            </h2>
            <p className="body-lg mt-7 max-w-[46rem]">
              {page.openResearch.text}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:justify-end">
            {page.openResearch.actions.map((action) => {
              const external = config.externalLinks[action.linkKey];
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
          <Reveal variant="scale">
            <Parallax distance={-24}>
              <div className="founder-mark liquid-surface mx-auto max-w-[20rem] p-10 lg:mx-0">
                <div className="founder-mark-halo" aria-hidden="true" />
                <BrandSymbol className="relative z-10" />
              </div>
            </Parallax>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">{page.founder.eyebrow}</p>
            <h2 className="display-section mt-7">{page.founder.headline}</h2>
            <p className="body-lg mt-7 max-w-2xl">{config.founder.biography}</p>
            <div className="mt-10 border-y border-line py-5">
              <p className="text-lg font-[520] tracking-[-0.025em] text-ink">
                {config.founder.name}
              </p>
              <p className="mt-1 text-sm text-muted">{config.founder.role}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell pb-[var(--section-space)]">
        <div className="closing-panel closing-panel-dark dark-band px-7 py-[clamp(4rem,8vw,7.5rem)] sm:px-10 lg:px-14">
          <Reveal className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">{page.contact.eyebrow}</p>
              <h2 className="display-section mt-7">{page.contact.headline}</h2>
              <p className="body-lg mt-6 max-w-2xl">{page.contact.text}</p>
              <p className="mt-5 font-mono text-[0.68rem] tracking-[0.1em] text-muted uppercase">
                {config.businessEmail}
              </p>
            </div>
            <Magnetic strength={5}>
              <ActionLink
                href={page.contact.action.href}
                className="border-accent bg-accent hover:border-white hover:bg-white hover:text-ink"
              >
                {page.contact.action.label}
              </ActionLink>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return <LocalizedHomePage locale="en" />;
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
