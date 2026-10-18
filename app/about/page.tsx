import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
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
  const path = (href: string) => localizePath(href, locale);
  const limitationFacts = [
    [t(locale, "Factual output"), t(locale, "May be unreliable")],
    [t(locale, "Response quality"), t(locale, "May be inconsistent")],
    [t(locale, "High-stakes decisions"), t(locale, "Not suitable")],
    [t(locale, "Production assistant"), t(locale, "Not intended")],
  ];
  const structure = [
    ["rappidAI Quantum", t(locale, "Models"), "/models"],
    ["rappidAI Ghost", t(locale, "Agent security"), "/tools/ghost"],
    ["rappidAI Replay", t(locale, "Reproducible agent runs"), "/tools/replay"],
  ] as const;

  return (
    <>
      <PageIntro
        {...page.introduction}
        title={
          locale === "de"
            ? "Unabhängig denken. Nachvollziehbar entwickeln."
            : "Independent thinking. Inspectable work."
        }
        facts={[
          { label: t(locale, "Location"), value: config.location },
          { label: t(locale, "Founder"), value: config.founder.name },
          {
            label: t(locale, "Pilot status"),
            value: t(locale, "Experimental"),
          },
          {
            label: t(locale, "Production use"),
            value: t(locale, "Not intended"),
          },
        ]}
        aside={
          <div className="card overflow-hidden">
            <div className="flex items-center gap-5 border-b border-line bg-pale-soft p-6">
              <div className="w-14 flex-none">
                <BrandSymbol />
              </div>
              <div className="min-w-0">
                <p className="m-0 text-sm text-muted">{t(locale, "Founder")}</p>
                <p className="m-0 mt-1 text-xl font-medium tracking-[-0.03em] text-ink">
                  {config.founder.name}
                </p>
                <p className="m-0 mt-1 text-sm text-muted">
                  {config.founder.role}
                </p>
              </div>
            </div>
            <ul className="m-0 grid list-none gap-0 p-0">
              {config.founder.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 border-b border-line px-6 py-3 text-[0.92rem] text-ink-soft last:border-b-0"
                >
                  <Check aria-hidden="true" size={15} className="text-accent" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        }
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#what-rappidai-is-heading",
            label: t(locale, "What rappidAI is"),
            description: t(
              locale,
              "Understand the initiative, its structure and its research scope.",
            ),
          },
          {
            href: "#published-work-heading",
            label: t(locale, "Published work"),
            description: t(
              locale,
              "Review the public pilot models and their evidence boundaries.",
            ),
          },
          {
            href: "#current-direction-heading",
            label: t(locale, "Current direction"),
            description: t(
              locale,
              "Follow the Echelon architecture, tokenizer and data-pipeline work.",
            ),
          },
        ]}
      />

      <section className="page-shell section">
        <div className="grid gap-4 lg:grid-cols-2" data-stagger>
          <article className="card p-7 sm:p-9">
            <p className="kicker">
              <Check aria-hidden="true" size={15} />
              {page.whatItIs.eyebrow}
            </p>
            <h2
              id="what-rappidai-is-heading"
              className="mt-4 text-[clamp(1.8rem,2.8vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.045em] text-ink"
            >
              {page.whatItIs.title}
            </h2>
            <p className="body-lg mt-5">{page.whatItIs.text}</p>
          </article>
          <article className="card p-7 sm:p-9">
            <p className="kicker !text-muted">
              <X aria-hidden="true" size={15} />
              {page.whatItIsNot.eyebrow}
            </p>
            <h2
              id="what-rappidai-is-not-heading"
              className="mt-4 text-[clamp(1.8rem,2.8vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.045em] text-ink"
            >
              {page.whatItIsNot.title}
            </h2>
            <p className="body-lg mt-5">{page.whatItIsNot.text}</p>
          </article>
        </div>
      </section>

      <section className="band" aria-labelledby="project-structure-heading">
        <div className="page-shell section grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="kicker">{page.projectStructure.eyebrow}</p>
            <h2 id="project-structure-heading" className="display-section mt-4">
              {page.projectStructure.title}
            </h2>
            <p className="body-lg mt-6 max-w-[38rem]">
              {page.projectStructure.text}
            </p>
          </div>
          <figure className="m-0" aria-label={page.projectStructure.title}>
            <div className="card flex items-center justify-between gap-4 p-5">
              <span className="text-lg font-medium tracking-[-0.03em] text-ink">
                rappidAI
              </span>
              <span className="text-sm text-muted">
                {t(locale, "Independent AI research · Berlin, Germany")}
              </span>
            </div>
            <div
              className="mx-auto h-6 w-px bg-line-strong"
              aria-hidden="true"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {structure.map(([name, role, href]) => (
                <Link key={name} href={path(href)} className="card block p-5">
                  <span className="block text-[0.95rem] font-medium text-ink">
                    {name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{role}</span>
                </Link>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <section
        className="page-shell section"
        aria-labelledby="published-work-heading"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker">{page.publishedWork.eyebrow}</p>
            <h2 id="published-work-heading" className="display-section mt-4">
              {page.publishedWork.title}
            </h2>
            <div className="mt-6 space-y-5">
              {page.publishedWork.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-copy max-w-[40rem]">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <ActionLink href={page.publishedWork.action.href}>
                {page.publishedWork.action.label}
              </ActionLink>
            </div>
          </div>
          <div>
            <p className="kicker">{page.whyCompactModelsMatter.eyebrow}</p>
            <h2
              id="why-compact-models-heading"
              className="display-section mt-4"
            >
              {page.whyCompactModelsMatter.title}
            </h2>
            <p className="body-copy mt-6">{page.whyCompactModelsMatter.text}</p>
            <div className="card mt-8 p-6">
              <p className="m-0 text-sm text-muted">
                {t(locale, "Design target")}
              </p>
              <p className="m-0 mt-2 text-xl font-medium leading-snug tracking-[-0.03em] text-ink">
                {t(locale, "Local and resource-efficient experimentation.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="current-direction-heading">
        <div className="page-shell section grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="kicker">{page.currentDirection.eyebrow}</p>
            <h2 id="current-direction-heading" className="display-section mt-4">
              {page.currentDirection.title}
            </h2>
            <p className="body-lg mt-6 max-w-[36rem]">
              {page.currentDirection.text}
            </p>
            <Link href={path("/research")} className="text-link mt-8">
              {t(locale, "Explore the research")}
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="window p-4 sm:p-8">
            <ResearchDiagram kind="pipeline" />
          </div>
        </div>
      </section>

      <section
        className="page-shell section"
        aria-labelledby="experimental-outputs-heading"
      >
        <div className="section-head split">
          <div>
            <p className="kicker">{page.experimentalNotice.eyebrow}</p>
            <h2 id="experimental-outputs-heading" className="display-section">
              {page.experimentalNotice.title}
            </h2>
          </div>
          <p>{page.experimentalNotice.text}</p>
        </div>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label={page.experimentalNotice.title}
        >
          <table className="table">
            <tbody>
              {limitationFacts.map(([term, detail]) => (
                <tr key={term}>
                  <th scope="row">{term}</th>
                  <td className="font-medium text-ink">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="early-stage-heading"
        className="bg-ink text-white"
      >
        <div className="page-shell section grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="eyebrow eyebrow-on-dark">
              {t(locale, "EARLY-STAGE RESEARCH")}
            </p>
            <h2
              id="early-stage-heading"
              className="mt-5 max-w-[16ch] text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.055em] text-white"
            >
              {t(locale, "Independent research, built from Berlin.")}
            </h2>
          </div>
          <div>
            <p className="m-0 text-[1.05rem] leading-relaxed text-[var(--color-dark-body)]">
              {config.founder.biography}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={path("/contact")} className="on-navy-primary">
                {t(locale, "Contact")}
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return <LocalizedAboutPage locale="en" />;
}
