import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { researchPageContent } from "@/content/pages";
import { quantumExperimentResearch } from "@/content/research";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/research");

type ResearchSource = {
  readonly label: string;
  readonly url: string;
};

function SourceLine({ sources }: { sources: readonly ResearchSource[] }) {
  return (
    <p className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-muted">
      <span>Primary sources:</span>
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

export default function ResearchPage() {
  const research = quantumExperimentResearch;

  return (
    <>
      <PageIntro {...researchPageContent.introduction} />

      <section
        aria-labelledby="research-questions-heading"
        className="page-shell pb-[var(--section-space)]"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{research.questions.eyebrow}</p>
            <h2
              id="research-questions-heading"
              className="display-section mt-7 text-ink"
            >
              {research.questions.title}
            </h2>
          </Reveal>

          <div className="border-t border-line lg:col-span-7 lg:col-start-6">
            <ol>
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
              <SourceLine sources={research.questions.sources} />
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
            <Reveal className="lg:col-span-5">
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
              <SourceLine sources={research.design.sources} />
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
              Hypothesis · research expectation
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
              Observation · public release record
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
          <SourceLine sources={research.hypothesisAndObservation.sources} />
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
              aria-label="Scrollable model comparison"
              tabIndex={0}
              className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <table className="w-full min-w-[48rem] border-collapse text-left">
                <caption className="sr-only">
                  Comparison of quantum-1-pilot and quantum-1.6-pilot
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
                            key={value}
                            scope="row"
                            className="border-b border-line px-6 py-5 text-sm font-medium text-ink"
                          >
                            {value}
                          </th>
                        ) : (
                          <td
                            key={value}
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
            <SourceLine sources={research.comparison.sources} />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="data-pipeline-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
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
            <div className="liquid-surface mt-8 border-l-2 border-accent p-6 sm:p-8">
              <p className="font-mono text-[0.67rem] tracking-[0.14em] text-accent uppercase">
                Documented limitation
              </p>
              <p className="mt-4 text-lg leading-7 tracking-[-0.015em] text-ink">
                {research.dataPipeline.limitation}
              </p>
            </div>
            <p className="body-copy mt-7 max-w-[46rem]">
              {research.dataPipeline.status}
            </p>
            <SourceLine sources={research.dataPipeline.sources} />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="evaluation-method-heading"
        className="liquid-section border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{research.evaluation.eyebrow}</p>
              <h2
                id="evaluation-method-heading"
                className="display-section mt-7 text-ink"
              >
                {research.evaluation.title}
              </h2>
            </Reveal>
            <div className="border-t border-line lg:col-span-7 lg:col-start-6">
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
                <SourceLine sources={research.evaluation.sources} />
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
          <Reveal className="lg:col-span-4">
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
                Evidence status
              </p>
              <p className="body-lg mt-6 max-w-[44rem]">
                {research.observedBehavior.unavailable}
              </p>
              <p className="body-copy mt-6 max-w-[44rem]">
                {research.observedBehavior.explanation}
              </p>
            </div>
            <SourceLine sources={research.observedBehavior.sources} />
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
            <SourceLine sources={research.failureModes.sources} />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="conclusions-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
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
                Demonstrated by the released artifacts
              </p>
              <p className="body-lg mt-6">
                {research.conclusions.demonstrated}
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {research.conclusions.notDemonstrated.map((statement) => (
                <p
                  key={statement}
                  className="liquid-row rounded-[1.1rem] border-y border-line px-5 py-5 text-base leading-7 text-ink-soft"
                >
                  {statement}
                </p>
              ))}
            </div>
            <SourceLine sources={research.conclusions.sources} />
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

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {research.reproducibility.documentation.map((artifact, index) => (
              <Reveal
                key={artifact.url}
                delay={(index % 2) * 0.04}
                className="liquid-card min-w-0 p-7 sm:p-8"
              >
                <p className="font-mono text-[0.66rem] tracking-[0.13em] text-accent uppercase">
                  Public documentation
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
                  Inspect source
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
                <p className="eyebrow">PUBLIC F16 GGUF</p>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.035em] text-ink">
                  {release.model}
                </h3>
                <dl className="mt-7 border-b border-line">
                  <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[0.65rem] tracking-[0.13em] text-muted uppercase">
                      File
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
                    GGUF file
                  </ActionLink>
                  <ActionLink
                    href={release.checksumUrl}
                    external
                    variant="secondary"
                  >
                    Checksum
                  </ActionLink>
                  <ActionLink
                    href={release.manifestUrl}
                    external
                    variant="secondary"
                  >
                    Manifest
                  </ActionLink>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 min-w-0">
            <p className="eyebrow">LLAMA.CPP REFERENCE</p>
            <div className="liquid-surface mt-6 min-w-0 p-6 sm:p-8">
              <pre className="max-w-full overflow-x-auto rounded-[0.85rem] border border-white/70 bg-ink p-5 text-[0.78rem] leading-6 text-[#d9e6f7]">
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
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{research.openQuestions.eyebrow}</p>
            <h2
              id="open-questions-heading"
              className="display-section mt-7 text-ink"
            >
              {research.openQuestions.title}
            </h2>
          </Reveal>
          <ol className="border-t border-line lg:col-span-7 lg:col-start-6">
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
            <Reveal className="mt-8">
              <p className="border-l-2 border-accent pl-5 text-sm leading-6 text-muted">
                {research.openQuestions.qualification}
              </p>
            </Reveal>
          </ol>
        </div>
      </section>
    </>
  );
}
