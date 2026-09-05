import { DrawRule, Reveal } from "@/components/motion/reveal";
import { SectionRail } from "@/components/research/section-rail";
import { TokenScaleVisual } from "@/components/graphics/token-scale-visual";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { researchPageContent } from "@/content/pages";
import {
  quantumExperimentResearch,
  researchPublication,
} from "@/content/research";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/research");

type ResearchSource = {
  readonly label: string;
  readonly url: string;
};

function SourceLine({
  sources,
  locale,
}: {
  sources: readonly ResearchSource[];
  locale: Locale;
}) {
  return (
    <p className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-muted">
      <span>{t(locale, "Primary sources")}:</span>
      {sources.map((source, index) => (
        <span key={source.url}>
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
          >
            {source.label}
          </a>
          {index < sources.length - 1 ? " ·" : null}
        </span>
      ))}
    </p>
  );
}

function EvidenceStatus({ label, locale }: { label: string; locale: Locale }) {
  const published = label === "Published" || label === t(locale, "Published");
  const partial =
    label === "Partial evidence" || label === t(locale, "Partial evidence");

  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 font-mono text-[0.62rem] font-medium tracking-[0.1em] uppercase ${
        published
          ? "border-accent/25 bg-accent/8 text-accent"
          : partial
            ? "border-[#8cb7ff]/35 bg-pale/70 text-ink-soft"
            : "border-line-strong bg-white/55 text-muted"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mr-2 size-1.5 rounded-full ${
          published ? "bg-accent" : partial ? "bg-[#79aaff]" : "bg-muted/55"
        }`}
      />
      {t(locale, label)}
    </span>
  );
}

/**
 * A single figure on a dark band. `pending` marks values that are configured
 * rather than measured, so the two can never be read as the same kind of fact.
 */
function StatFigure({
  value,
  label,
  note,
  pending = false,
}: {
  value: string;
  label: string;
  note: string;
  pending?: boolean;
}) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="m-0">
        <span
          className={`technical-number block text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.06em] ${
            pending
              ? "text-[var(--color-dark-muted)]"
              : "text-[var(--color-dark-accent)]"
          }`}
        >
          {value}
        </span>
        <span className="mt-4 block text-sm leading-6 text-[var(--color-dark-body)]">
          {label}
        </span>
        <span className="mt-2 flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.12em] text-[var(--color-dark-muted)] uppercase">
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${
              pending
                ? "border border-[var(--color-dark-muted)]"
                : "bg-[var(--color-dark-accent)]"
            }`}
          />
          {note}
        </span>
      </dd>
    </div>
  );
}

export function LocalizedResearchPage({ locale }: { locale: Locale }) {
  const page = localizeContent(researchPageContent, locale);
  const research = localizeContent(quantumExperimentResearch, locale);
  const publication = localizeContent(researchPublication, locale);

  const railItems = [
    {
      id: "evidence-ledger-heading",
      label: t(locale, "Evidence and findings"),
    },
    { id: "echelon-status-heading", label: t(locale, "Current Echelon line") },
    { id: "experiment-design-heading", label: t(locale, "Methods and limits") },
    { id: "reproducibility-heading", label: t(locale, "Reproducibility") },
    { id: "open-questions-heading", label: t(locale, "Open questions") },
  ];

  return (
    <>
      <SectionRail items={railItems} />
      <PageIntro
        {...page.introduction}
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#evidence-ledger-heading",
            label: t(locale, "Evidence and findings"),
            description: t(
              locale,
              "See what is published, partial or still unavailable.",
            ),
          },
          {
            href: "#echelon-status-heading",
            label: t(locale, "Current Echelon line"),
            description: t(
              locale,
              "Separate architecture, tokenizer and pipeline evidence from training.",
            ),
          },
          {
            href: "#experiment-design-heading",
            label: t(locale, "Methods and limits"),
            description: t(
              locale,
              "Understand the experiment design, evaluation and known failures.",
            ),
          },
          {
            href: "#reproducibility-heading",
            label: t(locale, "Reproducibility"),
            description: t(
              locale,
              "Inspect artifacts, checksums and the remaining publication gaps.",
            ),
          },
          {
            href: "#open-questions-heading",
            label: t(locale, "Open questions"),
            description: t(
              locale,
              "Continue with the questions that define the next research phase.",
            ),
          },
        ]}
      />

      <section
        aria-labelledby="evidence-ledger-heading"
        className="page-shell pb-[var(--section-space)]"
      >
        <div className="research-feature-lead">
          <div>
            <p className="studio-kicker">
              {locale === "de" ? "Aus der Forschung" : "From the research"}
            </p>
            <h2>
              {locale === "de"
                ? "Was verändert mehr Pretraining?"
                : "What changes with more pretraining?"}
            </h2>
            <p>
              {locale === "de"
                ? "Die öffentliche Forschungsnotiz zu quantum-1.6-pilot verbindet die Modellversuche mit Methoden, Beobachtungen und offenen Fragen."
                : "The public quantum-1.6-pilot research note connects the model experiments to methods, observations and open questions."}
            </p>
            <ActionLink
              href={localizePath(
                "/resources/publications/from-100m-to-600m-german-tokens",
                locale,
              )}
            >
              {t(locale, "Read research note")}
            </ActionLink>
          </div>
          <div className="research-token-figure" aria-hidden="true">
            <span>100M</span>
            <div /> <span>600M</span>
          </div>
        </div>
        <Reveal className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">{t(locale, "EVIDENCE LEDGER")}</p>
            <h2
              id="evidence-ledger-heading"
              className="display-section mt-7 text-ink"
            >
              {t(locale, "Claims mapped to public artifacts.")}
            </h2>
          </div>
          <div className="liquid-surface p-6 sm:p-8">
            <p className="font-mono text-[0.66rem] tracking-[0.13em] text-accent uppercase">
              {publication.evidenceSnapshot.label}
            </p>
            <p className="mt-4 break-all font-mono text-[0.72rem] leading-6 text-ink-soft">
              {publication.evidenceSnapshot.reference}
            </p>
            <p className="body-copy mt-4">
              {publication.evidenceSnapshot.explanation}
            </p>
            <a
              href={publication.evidenceSnapshot.url}
              target="_blank"
              rel="noreferrer"
              className="link-arrow mt-5 inline-flex text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:text-accent"
            >
              {t(locale, "Inspect pinned snapshot")}
            </a>
          </div>
        </Reveal>

        <details className="evidence-legend mt-8">
          <summary>
            {locale === "de"
              ? "So liest du die Evidenzstatus"
              : "How to read the evidence statuses"}
          </summary>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {publication.statusVocabulary.map((item, index) => (
              <Reveal
                key={item.label}
                delay={(index % 3) * 0.03}
                className="liquid-card p-5 sm:p-6"
              >
                <EvidenceStatus label={item.label} locale={locale} />
                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.meaning}
                </p>
              </Reveal>
            ))}
          </div>
        </details>

        <Reveal className="liquid-surface mt-8 max-w-full">
          <div
            role="region"
            aria-label={t(locale, "Scrollable research evidence ledger")}
            tabIndex={0}
            className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
          >
            <table className="w-full min-w-[72rem] border-collapse text-left">
              <caption className="sr-only">
                {t(
                  locale,
                  "Public evidence and claim boundaries for Quantum and Echelon artifacts",
                )}
              </caption>
              <thead>
                <tr>
                  {[
                    "Artifact",
                    "Scope",
                    "Status",
                    "Public evidence",
                    "Claim boundary",
                  ].map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-line-strong px-6 py-5 font-mono text-[0.66rem] tracking-[0.13em] text-muted uppercase"
                    >
                      {t(locale, column)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {publication.ledger.map((item) => (
                  <tr key={item.artifact}>
                    <th
                      scope="row"
                      className="border-b border-line px-6 py-6 align-top text-sm font-medium text-ink"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                      >
                        {item.artifact}
                      </a>
                    </th>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-ink-soft">
                      {item.scope}
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top">
                      <EvidenceStatus label={item.status} locale={locale} />
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-ink-soft">
                      {item.evidence}
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-muted">
                      {item.boundary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section
        aria-labelledby="echelon-status-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="research-aside lg:col-span-5">
              <p className="eyebrow">{publication.echelon.eyebrow}</p>
              <h2
                id="echelon-status-heading"
                className="display-section mt-7 text-ink"
              >
                {publication.echelon.title}
              </h2>
              <p className="body-lg mt-7 max-w-[42rem]">
                {publication.echelon.introduction}
              </p>
            </Reveal>

            <div className="space-y-3 border-t border-line sm:space-y-4 lg:col-span-6 lg:col-start-7">
              {publication.echelon.stages.map((stage, index) => (
                <Reveal
                  key={stage.name}
                  delay={index * 0.03}
                  className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-7 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="technical-number text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">
                        {stage.name}
                      </h3>
                      <EvidenceStatus label={stage.status} locale={locale} />
                    </div>
                    <p className="body-copy mt-3 max-w-[42rem]">
                      {stage.detail}
                    </p>
                    <p className="mt-4 font-mono text-[0.64rem] leading-5 tracking-[0.09em] text-muted uppercase">
                      {t(locale, "Boundary")} · {stage.boundary}
                    </p>
                    <a
                      href={stage.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                      {t(locale, "Inspect evidence")}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="liquid-surface mt-12 grid gap-7 border-accent/20 p-7 sm:p-9 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow">{t(locale, "PLANNED, NOT ACHIEVED")}</p>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-ink">
                {publication.echelon.plannedTargets.title}
              </h3>
            </div>
            <div>
              <p className="body-lg">
                {publication.echelon.plannedTargets.text}
              </p>
              <p className="body-copy mt-5">
                {publication.echelon.plannedTargets.qualification}
              </p>
              <a
                href={publication.echelon.plannedTargets.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
              >
                {t(locale, "Inspect production configuration")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="findings-heading"
        className="page-shell section-space"
      >
        <Reveal className="max-w-[58rem]">
          <p className="eyebrow">{t(locale, "FINDINGS AND LESSONS")}</p>
          <h2 id="findings-heading" className="display-section mt-7 text-ink">
            {t(
              locale,
              "Positive checks and negative results, with boundaries.",
            )}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {publication.findings.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 2) * 0.04}
              className="liquid-card p-7 sm:p-9"
            >
              <p className="font-mono text-[0.66rem] tracking-[0.13em] text-accent uppercase">
                {item.kind}
              </p>
              <h3 className="mt-6 text-[clamp(1.45rem,2.4vw,2rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
                {item.title}
              </h3>
              <p className="body-copy mt-5">{item.finding}</p>
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
                {item.boundary}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
              >
                {t(locale, "Inspect source")}
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="dark-band border-y border-line">
        <div className="page-shell section-space-sm relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">
              {t(locale, "COMPLETED PILOT STUDY")}
            </p>
            <h2 className="display-section mt-7 text-[var(--color-dark-title)]">
              {t(locale, "Two released pilots. One untrained line.")}
            </h2>
            <p className="mt-7 max-w-[38rem] leading-7 text-[var(--color-dark-body)]">
              {t(
                locale,
                "The sections below document the released quantum-1-pilot and quantum-1.6-pilot experiment separately from the untrained Echelon line.",
              )}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:pt-4">
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
              <StatFigure
                value="49.3M"
                label={t(locale, "Released parameters")}
                note={t(locale, "Measured")}
              />
              <StatFigure
                value="506M"
                label={t(locale, "Configured Echelon target")}
                note={t(locale, "Configured, not trained")}
                pending
              />
              <StatFigure
                value="512"
                label={t(locale, "Context window")}
                note={t(locale, "Measured")}
              />
            </dl>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="research-questions-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="research-aside lg:col-span-4">
            <p className="eyebrow">{research.questions.eyebrow}</p>
            <h2
              id="research-questions-heading"
              className="display-section mt-7 text-ink"
            >
              {research.questions.title}
            </h2>
          </Reveal>

          <div className="border-t border-line lg:col-span-7 lg:col-start-6">
            <ol className="space-y-3 sm:space-y-4">
              {research.questions.items.map((question, index) => (
                <li key={question}>
                  <Reveal
                    delay={index * 0.04}
                    className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-8 sm:grid-cols-[3rem_1fr] lg:py-10"
                  >
                    <span className="technical-number text-xs tracking-[0.16em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.35] tracking-[-0.025em] text-ink">
                      {question}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal className="mt-8">
              <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
                {research.questions.qualification}
              </p>
              <SourceLine
                sources={research.questions.sources}
                locale={locale}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="experiment-design-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="research-aside lg:col-span-5">
              <p className="eyebrow">{research.design.eyebrow}</p>
              <h2
                id="experiment-design-heading"
                className="display-section mt-7 text-ink"
              >
                {research.design.title}
              </h2>
              <p className="body-lg mt-7 max-w-[39rem]">
                {research.design.text}
              </p>
              <SourceLine sources={research.design.sources} locale={locale} />
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {research.design.variables.map((variable, index) => (
                <Reveal
                  key={variable.label}
                  delay={(index % 2) * 0.04}
                  className="liquid-card min-w-0 p-6 sm:min-h-[10.5rem] sm:p-7"
                >
                  <span className="technical-number text-[0.68rem] tracking-[0.14em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-7 text-xl font-medium tracking-[-0.03em] text-ink">
                    {variable.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {variable.value}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="hypothesis-observation-heading"
        className="page-shell section-space"
      >
        <Reveal>
          <p className="eyebrow">{research.hypothesisAndObservation.eyebrow}</p>
          <h2
            id="hypothesis-observation-heading"
            className="display-section mt-7 text-ink"
          >
            {research.hypothesisAndObservation.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal className="liquid-card p-7 sm:p-10">
            <p className="font-mono text-[0.68rem] tracking-[0.15em] text-accent uppercase">
              {t(locale, "Hypothesis")} · {t(locale, "research expectation")}
            </p>
            <p className="body-lg mt-7 max-w-[39rem]">
              {research.hypothesisAndObservation.hypothesis}
            </p>
          </Reveal>
          <Reveal
            delay={0.06}
            className="liquid-card border-accent/25 p-7 sm:p-10"
          >
            <p className="font-mono text-[0.68rem] tracking-[0.15em] text-accent uppercase">
              {t(locale, "Observation")} · {t(locale, "public release record")}
            </p>
            <p className="body-lg mt-7 max-w-[39rem]">
              {research.hypothesisAndObservation.observation}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-8 grid gap-6 border-y border-line py-7 lg:grid-cols-[1fr_auto] lg:items-start">
          <p className="body-copy max-w-[52rem]">
            {research.hypothesisAndObservation.metricQualification}
          </p>
          <SourceLine
            sources={research.hypothesisAndObservation.sources}
            locale={locale}
          />
        </Reveal>
      </section>

      <section
        aria-labelledby="model-comparison-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <Reveal className="max-w-[52rem]">
            <p className="eyebrow">{research.comparison.eyebrow}</p>
            <h2
              id="model-comparison-heading"
              className="display-section mt-7 text-ink"
            >
              {research.comparison.title}
            </h2>
          </Reveal>

          <Reveal className="liquid-surface mt-12 max-w-full">
            <div
              role="region"
              aria-label={t(locale, "Scrollable model comparison")}
              tabIndex={0}
              className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <table className="w-full min-w-[48rem] border-collapse text-left">
                <caption className="sr-only">
                  {t(
                    locale,
                    "Comparison of quantum-1-pilot and quantum-1.6-pilot",
                  )}
                </caption>
                <thead>
                  <tr>
                    {research.comparison.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="border-b border-line-strong px-6 py-5 font-mono text-[0.68rem] tracking-[0.13em] text-muted uppercase"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {research.comparison.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((value, index) =>
                        index === 0 ? (
                          <th
                            key={`${index}-${value}`}
                            scope="row"
                            className="border-b border-line px-6 py-5 text-sm font-medium text-ink"
                          >
                            {value}
                          </th>
                        ) : (
                          <td
                            key={`${index}-${value}`}
                            className="border-b border-line px-6 py-5 text-sm leading-6 text-ink-soft"
                          >
                            {value}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
              {research.comparison.note}
            </p>
            <SourceLine sources={research.comparison.sources} locale={locale} />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="data-pipeline-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="research-aside lg:col-span-4">
            <p className="eyebrow">{research.dataPipeline.eyebrow}</p>
            <h2
              id="data-pipeline-heading"
              className="display-section mt-7 text-ink"
            >
              {research.dataPipeline.title}
            </h2>
          </Reveal>
          <Reveal className="min-w-0 lg:col-span-7 lg:col-start-6">
            <DrawRule />
            <p className="body-lg mt-8 max-w-[46rem]">
              {research.dataPipeline.text}
            </p>

            <div className="liquid-surface mt-8 p-6 sm:p-8">
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted uppercase">
                {t(locale, "German-token corpus scale")}
              </p>
              <div className="mt-7">
                <TokenScaleVisual
                  locale={locale}
                  steps={[
                    {
                      label: "quantum-1-pilot",
                      tokens: 100,
                      note: t(
                        locale,
                        "Reported base-model pretraining corpus.",
                      ),
                    },
                    {
                      label: "quantum-1.6-pilot",
                      tokens: 600,
                      note: t(
                        locale,
                        "Reported cumulative scope: approximately 100M base tokens plus 500M additional German tokens.",
                      ),
                    },
                    {
                      label: "quantum-1-echelon",
                      tokens: 8000,
                      configured: true,
                      note: t(
                        locale,
                        "Configured 8B training-token target. The production run has not started and no Echelon model has been trained.",
                      ),
                    },
                  ]}
                  caption={t(
                    locale,
                    "Linear scale. Hatched bars mark configured targets, not measured runs.",
                  )}
                />
              </div>
            </div>

            <div className="liquid-surface mt-8 border-l-2 border-accent p-6 sm:p-8">
              <p className="font-mono text-[0.67rem] tracking-[0.14em] text-accent uppercase">
                {t(locale, "Documented limitation")}
              </p>
              <p className="mt-4 text-lg leading-7 tracking-[-0.015em] text-ink">
                {research.dataPipeline.limitation}
              </p>
            </div>
            <p className="body-copy mt-7 max-w-[46rem]">
              {research.dataPipeline.status}
            </p>
            <SourceLine
              sources={research.dataPipeline.sources}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="evaluation-method-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="research-aside lg:col-span-4">
              <p className="eyebrow">{research.evaluation.eyebrow}</p>
              <h2
                id="evaluation-method-heading"
                className="display-section mt-7 text-ink"
              >
                {research.evaluation.title}
              </h2>
            </Reveal>
            <div className="space-y-3 border-t border-line sm:space-y-4 lg:col-span-7 lg:col-start-6">
              {research.evaluation.items.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 0.035}
                  className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-8 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="technical-number text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">
                      {item.title}
                    </h3>
                    <p className="body-copy mt-3 max-w-[38rem]">{item.text}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal className="mt-8">
                <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
                  {research.evaluation.limitation}
                </p>
                <SourceLine
                  sources={research.evaluation.sources}
                  locale={locale}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="observed-behavior-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="research-aside lg:col-span-4">
            <p className="eyebrow">{research.observedBehavior.eyebrow}</p>
            <h2
              id="observed-behavior-heading"
              className="display-section mt-7 text-ink"
            >
              {research.observedBehavior.title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="liquid-surface p-7 sm:p-10">
              <p className="font-mono text-[0.67rem] tracking-[0.14em] text-accent uppercase">
                {t(locale, "Evidence status")}
              </p>
              <p className="body-lg mt-6 max-w-[44rem]">
                {research.observedBehavior.unavailable}
              </p>
              <p className="body-copy mt-6 max-w-[44rem]">
                {research.observedBehavior.explanation}
              </p>
            </div>
            <SourceLine
              sources={research.observedBehavior.sources}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="failure-modes-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <Reveal>
            <p className="eyebrow">{research.failureModes.eyebrow}</p>
            <h2
              id="failure-modes-heading"
              className="display-section mt-7 text-ink"
            >
              {research.failureModes.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {research.failureModes.items.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 3) * 0.035}
                className="liquid-card p-7 sm:min-h-[13rem] sm:p-8"
              >
                <span className="technical-number text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-7 text-xl font-medium tracking-[-0.025em] text-ink">
                  {item.title}
                </h3>
                <p className="body-copy mt-3">{item.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-9">
            <p className="max-w-[54rem] border-l-2 border-accent pl-5 text-lg leading-7 text-ink">
              {research.failureModes.conclusion}
            </p>
            <SourceLine
              sources={research.failureModes.sources}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="conclusions-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="research-aside lg:col-span-4">
            <p className="eyebrow">{research.conclusions.eyebrow}</p>
            <h2
              id="conclusions-heading"
              className="display-section mt-7 text-ink"
            >
              {research.conclusions.title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="liquid-card border-accent/25 p-7 sm:p-9">
              <p className="font-mono text-[0.67rem] tracking-[0.14em] text-accent uppercase">
                {t(locale, "Demonstrated by the released artifacts")}
              </p>
              <p className="body-lg mt-6">
                {research.conclusions.demonstrated}
              </p>
            </div>
            <div className="mt-4 space-y-3 sm:space-y-4">
              {research.conclusions.notDemonstrated.map((statement) => (
                <p
                  key={statement}
                  className="liquid-row rounded-[1.1rem] border-y border-line px-5 py-5 text-base leading-7 text-ink-soft"
                >
                  {statement}
                </p>
              ))}
            </div>
            <SourceLine
              sources={research.conclusions.sources}
              locale={locale}
            />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="reproducibility-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <Reveal className="max-w-[56rem]">
            <p className="eyebrow">{research.reproducibility.eyebrow}</p>
            <h2
              id="reproducibility-heading"
              className="display-section mt-7 text-ink"
            >
              {research.reproducibility.title}
            </h2>
            <p className="body-lg mt-7">
              {research.reproducibility.introduction}
            </p>
          </Reveal>

          <Reveal className="liquid-surface mt-12 max-w-full">
            <div
              role="region"
              aria-label={t(locale, "Scrollable reproducibility status matrix")}
              tabIndex={0}
              className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <table className="w-full min-w-[68rem] border-collapse text-left">
                <caption className="sr-only">
                  {t(
                    locale,
                    "Reproducibility evidence and missing artifacts by research area",
                  )}
                </caption>
                <thead>
                  <tr>
                    {[
                      "Area",
                      "Status",
                      "Available evidence",
                      "Still missing",
                    ].map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="border-b border-line-strong px-6 py-5 font-mono text-[0.66rem] tracking-[0.13em] text-muted uppercase"
                      >
                        {t(locale, column)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {publication.reproducibilityMatrix.map((item) => (
                    <tr key={item.area}>
                      <th
                        scope="row"
                        className="border-b border-line px-6 py-6 align-top text-sm font-medium text-ink"
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                        >
                          {item.area}
                        </a>
                      </th>
                      <td className="border-b border-line px-6 py-6 align-top">
                        <EvidenceStatus label={item.status} locale={locale} />
                      </td>
                      <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-ink-soft">
                        {item.evidence}
                      </td>
                      <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-muted">
                        {item.missing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
              {t(
                locale,
                "Missing items are shown as publication gaps. A configuration target, smoke result or preflight does not upgrade a research area to complete reproducibility.",
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {research.reproducibility.documentation.map((artifact, index) => (
              <Reveal
                key={artifact.url}
                delay={(index % 2) * 0.04}
                className="liquid-card min-w-0 p-7 sm:p-8"
              >
                <p className="font-mono text-[0.66rem] tracking-[0.13em] text-accent uppercase">
                  {t(locale, "Public documentation")}
                </p>
                <h3 className="mt-5 text-xl font-medium tracking-[-0.025em] text-ink">
                  {artifact.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {artifact.detail}
                </p>
                <a
                  href={artifact.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow mt-6 inline-flex text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:text-accent"
                >
                  {t(locale, "Inspect source")}
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {research.reproducibility.releases.map((release) => (
              <Reveal
                key={release.model}
                className="liquid-surface min-w-0 p-7 sm:p-9"
              >
                <p className="eyebrow">{t(locale, "PUBLIC F16 GGUF")}</p>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-ink">
                  {release.model}
                </h3>
                <dl className="mt-7 border-b border-line">
                  <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[0.65rem] tracking-[0.13em] text-muted uppercase">
                      {t(locale, "File")}
                    </dt>
                    <dd className="min-w-0 break-all text-sm leading-6 text-ink-soft">
                      {release.filename}
                    </dd>
                  </div>
                  <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[0.65rem] tracking-[0.13em] text-muted uppercase">
                      SHA-256
                    </dt>
                    <dd className="min-w-0 break-all font-mono text-[0.72rem] leading-6 text-ink-soft">
                      {release.sha256}
                    </dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ActionLink href={release.ggufUrl} external>
                    {t(locale, "GGUF file")}
                  </ActionLink>
                  <ActionLink
                    href={release.checksumUrl}
                    external
                    variant="secondary"
                  >
                    {t(locale, "Checksum")}
                  </ActionLink>
                  <ActionLink
                    href={release.manifestUrl}
                    external
                    variant="secondary"
                  >
                    {t(locale, "Manifest")}
                  </ActionLink>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 min-w-0">
            <p className="eyebrow">{t(locale, "LLAMA.CPP REFERENCE")}</p>
            <div className="liquid-surface mt-6 min-w-0 p-6 sm:p-8">
              <pre
                aria-label={t(locale, "Scrollable llama.cpp reference command")}
                tabIndex={0}
                className="max-w-full overflow-x-auto rounded-[0.85rem] border border-white/70 bg-ink p-5 text-[0.78rem] leading-6 text-[#d9e6f7] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                <code>{research.reproducibility.command}</code>
              </pre>
              <p className="mt-5 text-sm leading-6 text-muted">
                {research.reproducibility.commandNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="open-questions-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="research-aside lg:col-span-4">
            <p className="eyebrow">{research.openQuestions.eyebrow}</p>
            <h2
              id="open-questions-heading"
              className="display-section mt-7 text-ink"
            >
              {research.openQuestions.title}
            </h2>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="space-y-3 border-t border-line sm:space-y-4">
              {research.openQuestions.items.map((question, index) => (
                <li key={question}>
                  <Reveal
                    delay={index * 0.035}
                    className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-8 sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="technical-number text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg leading-7 tracking-[-0.02em] text-ink">
                      {question}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal className="mt-8">
              <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
                {research.openQuestions.qualification}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page-shell pb-[var(--section-space)]">
        <Reveal className="liquid-surface grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">{t(locale, "DETAILED RECORDS")}</p>
            <h2 className="display-section mt-7 text-ink">
              {t(locale, "Continue through the resources hub.")}
            </h2>
            <p className="body-lg mt-6 max-w-[48rem]">
              {t(
                locale,
                "Inspect the publication, reproducibility record, data provenance, responsible-use guidance, licensing boundaries and current evidence status.",
              )}
            </p>
          </div>
          <ActionLink href={localizePath("/resources", locale)}>
            {t(locale, "Explore resources")}
          </ActionLink>
        </Reveal>
      </section>
    </>
  );
}

export default function ResearchPage() {
  return <LocalizedResearchPage locale="en" />;
}
