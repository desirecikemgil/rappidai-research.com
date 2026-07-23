import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ResearchDiagram } from "@/components/research/research-diagram";
import { BrandSymbol } from "@/components/ui/brand-lockup";
import { PageIntro } from "@/components/ui/page-intro";
import { ActionLink } from "@/components/ui/action-link";
import { aboutPageContent } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/about");

export function LocalizedAboutPage({ locale }: { locale: Locale }) {
  const page = localizeContent(aboutPageContent, locale);
  const config = localizeContent(siteConfig, locale);
  const limitationFacts = [
    [t(locale, "Factual output"), t(locale, "May be unreliable")],
    [t(locale, "Response quality"), t(locale, "May be inconsistent")],
    [t(locale, "High-stakes decisions"), t(locale, "Not suitable")],
    [t(locale, "Production assistant"), t(locale, "Not intended")],
  ];

  return (
    <>
      <PageIntro {...page.introduction} />

      <section
        aria-labelledby="what-rappidai-is-heading"
        className="page-shell pb-[var(--section-space)]"
      >
        <DrawRule />
        <div className="grid min-h-[34rem] gap-12 py-[clamp(4rem,7vw,7rem)] lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">{page.whatItIs.eyebrow}</p>
            <h2
              id="what-rappidai-is-heading"
              className="display-section mt-7 text-ink"
            >
              {page.whatItIs.title}
            </h2>
            <p className="body-lg mt-7 max-w-[38rem]">{page.whatItIs.text}</p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="liquid-surface relative flex min-h-[20rem] items-center justify-center overflow-hidden lg:col-span-5 lg:col-start-8 lg:min-h-[27rem]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 ambient-grid opacity-65"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pale blur-3xl"
            />
            <BrandSymbol className="relative z-10 w-[clamp(9rem,18vw,15rem)] opacity-95" />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="project-structure-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space-sm grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{page.projectStructure.eyebrow}</p>
            <h2
              id="project-structure-heading"
              className="display-section mt-7 text-ink"
            >
              {page.projectStructure.title}
            </h2>
          </Reveal>
          <Reveal
            delay={0.08}
            className="border-t border-line pt-8 lg:col-span-6 lg:col-start-7"
          >
            <p className="body-lg max-w-[42rem]">
              {page.projectStructure.text}
            </p>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="what-rappidai-is-not-heading"
        className="liquid-section border-y border-line bg-pale-soft/40"
      >
        <div className="page-shell section-space-sm">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{page.whatItIsNot.eyebrow}</p>
              <h2
                id="what-rappidai-is-not-heading"
                className="mt-7 max-w-[16ch] text-[clamp(2.2rem,4vw,4.4rem)] font-medium leading-[1] tracking-[-0.055em] text-ink"
              >
                {page.whatItIsNot.title}
              </h2>
            </Reveal>

            <Reveal
              delay={0.08}
              className="border-t border-line-strong pt-8 lg:col-span-6 lg:col-start-7"
            >
              <p className="body-lg max-w-[40rem]">{page.whatItIsNot.text}</p>
              <dl className="mt-10 grid border-t border-line sm:grid-cols-2">
                <div className="border-b border-line py-6 sm:border-r sm:pr-8">
                  <dt className="technical-number text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    {t(locale, "Pilot status")}
                  </dt>
                  <dd className="mt-3 text-lg font-medium tracking-[-0.02em] text-ink">
                    {t(locale, "Experimental")}
                  </dd>
                </div>
                <div className="border-b border-line py-6 sm:pl-8">
                  <dt className="technical-number text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                    {t(locale, "Production use")}
                  </dt>
                  <dd className="mt-3 text-lg font-medium tracking-[-0.02em] text-ink">
                    {t(locale, "Not intended")}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="published-work-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{page.publishedWork.eyebrow}</p>
            <h2
              id="published-work-heading"
              className="display-section mt-7 text-ink"
            >
              {page.publishedWork.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <DrawRule />
            <div className="space-y-6 py-8">
              {page.publishedWork.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-lg max-w-[44rem]">
                  {paragraph}
                </p>
              ))}
            </div>
            <ActionLink href={page.publishedWork.action.href}>
              {page.publishedWork.action.label}
            </ActionLink>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="why-compact-models-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">{page.whyCompactModelsMatter.eyebrow}</p>
            <h2
              id="why-compact-models-heading"
              className="display-section mt-7 text-ink"
            >
              {page.whyCompactModelsMatter.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8 lg:pt-8">
            <p className="body-lg">{page.whyCompactModelsMatter.text}</p>
            <div className="mt-10 border-y border-line py-6">
              <p className="technical-number text-[0.7rem] uppercase tracking-[0.17em] text-accent">
                {t(locale, "Design target")}
              </p>
              <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.03em] text-ink">
                {t(locale, "Local and resource-efficient experimentation.")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="current-direction-heading"
        className="liquid-section ambient-grid border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space-sm">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{page.currentDirection.eyebrow}</p>
              <h2
                id="current-direction-heading"
                className="display-section mt-7 text-ink"
              >
                {page.currentDirection.title}
              </h2>
              <p className="body-lg mt-7 max-w-[36rem]">
                {page.currentDirection.text}
              </p>
              <Link
                href={localizePath("/research", locale)}
                className="link-arrow mt-9 inline-flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                {t(locale, "Explore the research")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal
              delay={0.1}
              className="liquid-surface px-4 py-8 sm:px-8 lg:col-span-6 lg:col-start-7"
            >
              <ResearchDiagram kind="pipeline" />
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="experimental-outputs-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{page.experimentalNotice.eyebrow}</p>
            <h2
              id="experimental-outputs-heading"
              className="display-section mt-7 text-ink"
            >
              {page.experimentalNotice.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <DrawRule />
            <p className="body-lg py-8">{page.experimentalNotice.text}</p>
            <dl className="border-t border-line">
              {limitationFacts.map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-2 border-b border-line py-5 sm:grid-cols-2 sm:gap-8"
                >
                  <dt className="text-sm text-muted">{term}</dt>
                  <dd className="text-sm font-medium text-ink sm:text-right">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="early-stage-heading"
        className="border-t border-line bg-ink text-white"
      >
        <div className="page-shell section-space-sm">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow eyebrow-on-dark">
                {t(locale, "EARLY-STAGE RESEARCH")}
              </p>
              <h2
                id="early-stage-heading"
                className="mt-7 max-w-[16ch] text-[clamp(2.5rem,5vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.06em] text-white"
              >
                {t(locale, "Independent research, built from Berlin.")}
              </h2>
              <p className="mt-8 max-w-[39rem] text-[clamp(1.05rem,1.45vw,1.28rem)] leading-relaxed text-[#c8d6e9]">
                {config.founder.biography}
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="border-t border-white/20 pt-7 lg:col-span-4 lg:col-start-9"
            >
              <p className="technical-number text-[0.68rem] uppercase tracking-[0.17em] text-[#72a8ff]">
                {t(locale, "Founder")}
              </p>
              <p className="mt-5 text-2xl font-medium tracking-[-0.035em] text-white">
                {config.founder.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#c8d6e9]">
                {config.founder.role}
              </p>
              <ul className="mt-7 space-y-3 border-t border-white/15 pt-6">
                {config.founder.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 text-sm text-[#c8d6e9]"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-[#72a8ff]"
                    />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="technical-number mt-8 text-[0.68rem] uppercase tracking-[0.17em] text-[#88a0be]">
                {config.location}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return <LocalizedAboutPage locale="en" />;
}
