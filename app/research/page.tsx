import Link from "next/link";
import { DrawRule, Reveal } from "@/components/motion/reveal";
import { ResearchDiagram } from "@/components/research/research-diagram";
import { PageIntro } from "@/components/ui/page-intro";
import { researchPageContent } from "@/content/pages";
import {
  evaluationPrinciples,
  experimentLogs,
  researchAreas,
  researchMethodology,
  researchNotes,
  researchPrinciples,
  researchThesis,
  roadmap,
} from "@/content/research";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/research");

const diagramKinds = {
  "open-weight-adaptation": "adaptation",
  "local-inference": "inference",
  evaluation: "evaluation",
} as const;

export default function ResearchPage() {
  return (
    <>
      <PageIntro {...researchPageContent.introduction} />

      <section
        aria-labelledby="current-direction-heading"
        className="page-shell pb-[var(--section-space)]"
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{researchPageContent.direction.eyebrow}</p>
            <h2
              id="current-direction-heading"
              className="display-section mt-7 text-ink"
            >
              {researchPageContent.direction.title}
            </h2>
            <p className="body-lg mt-7 max-w-[36rem]">
              {researchPageContent.direction.text}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <p className="max-w-[18ch] text-[clamp(2rem,3.5vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.05em] text-ink">
              {researchThesis.statement}
            </p>
            <p className="body-copy mt-8 max-w-[38rem]">
              {researchThesis.supportingText}
            </p>
          </Reveal>
        </div>

        <DrawRule className="mt-[clamp(4rem,7vw,7rem)]" />

        <div>
          {researchAreas.map((area, index) => (
            <Reveal
              key={area.id}
              className="liquid-row grid rounded-[1.35rem] border-y border-line py-10 md:grid-cols-12 md:items-center md:gap-8 lg:py-12"
            >
              <p className="technical-number text-xs tracking-[0.18em] text-accent md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="mt-5 md:col-span-5 md:mt-0">
                <h3 className="text-[clamp(1.45rem,2.4vw,2.15rem)] font-medium tracking-[-0.035em] text-ink">
                  {area.title}
                </h3>
                <p className="body-copy mt-4 max-w-[34rem]">
                  {area.description}
                </p>
              </div>
              <div className="mt-8 max-w-[19rem] md:col-span-5 md:col-start-8 md:mt-0 md:justify-self-end">
                <ResearchDiagram kind={diagramKinds[area.id]} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="philosophy-heading"
        className="liquid-section border-y border-line bg-pale-soft/40"
      >
        <div className="page-shell section-space">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">{researchPageContent.philosophy.eyebrow}</p>
              <h2
                id="philosophy-heading"
                className="display-section mt-7 text-ink"
              >
                {researchPageContent.philosophy.title}
              </h2>
              <p className="body-lg mt-7 max-w-[35rem]">
                {researchPageContent.philosophy.text}
              </p>
            </Reveal>

            <div className="border-t border-line lg:col-span-6 lg:col-start-7">
              {researchPrinciples.map((principle, index) => (
                <Reveal
                  key={principle.number}
                  delay={index * 0.05}
                  className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-8 sm:grid-cols-[4rem_1fr] lg:py-10"
                >
                  <span className="technical-number text-xs tracking-[0.16em] text-accent">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">
                      {principle.title}
                    </h3>
                    <p className="body-copy mt-3 max-w-[34rem]">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="methodology-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{researchPageContent.methodology.eyebrow}</p>
            <h2
              id="methodology-heading"
              className="display-section mt-7 text-ink"
            >
              {researchPageContent.methodology.title}
            </h2>
          </Reveal>

          <div className="border-t border-line lg:col-span-7 lg:col-start-6">
            {researchMethodology.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.04}
                className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-8 sm:grid-cols-[4.5rem_1fr] lg:py-10"
              >
                <span className="technical-number text-[0.72rem] tracking-[0.18em] text-accent">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[clamp(1.35rem,2vw,1.8rem)] font-medium tracking-[-0.03em] text-ink">
                    {step.title}
                  </h3>
                  <p className="body-copy mt-3 max-w-[36rem]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="experiment-logs-heading"
        className="border-y border-line"
      >
        <div className="page-shell section-space-sm">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-8">
              <p className="eyebrow">
                {researchPageContent.experimentLogs.eyebrow}
              </p>
              <h2
                id="experiment-logs-heading"
                className="display-section mt-7 text-ink"
              >
                {researchPageContent.experimentLogs.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-4 md:text-right">
              <p className="technical-number text-xs leading-relaxed tracking-[0.12em] text-muted">
                {researchPageContent.experimentLogs.noDatesNotice}
              </p>
            </Reveal>
          </div>

          <DrawRule className="mt-12" />

          <ol>
            {experimentLogs.map((entry, index) => (
              <li key={entry.modelSlug}>
                <Reveal className="liquid-row grid gap-6 rounded-[1.2rem] border-y border-line py-9 md:grid-cols-12 md:items-start md:gap-8 lg:py-11">
                  <span className="technical-number text-xs tracking-[0.18em] text-accent md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-4">
                    <Link
                      href={`/models/${entry.modelSlug}`}
                      className="text-[clamp(1.35rem,2.2vw,2rem)] font-medium tracking-[-0.035em] text-ink underline decoration-line-strong underline-offset-8 transition-colors hover:text-accent"
                    >
                      {entry.title}
                    </Link>
                  </div>
                  <p className="body-copy md:col-span-4">
                    {entry.description}
                  </p>
                  <div className="flex items-center gap-3 md:col-span-3 md:justify-end">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    <span className="technical-number text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
                      {entry.statusLabel}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="research-notes-heading"
        className="page-shell section-space"
      >
        <Reveal>
          <p className="eyebrow">{researchPageContent.notes.eyebrow}</p>
          <h2
            id="research-notes-heading"
            className="display-section mt-7 text-ink"
          >
            {researchPageContent.notes.title}
          </h2>
        </Reveal>

        <DrawRule className="mt-12" />

        <div className="grid md:grid-cols-2">
          {researchNotes.map((note, index) => (
            <Reveal
              key={note.id}
              delay={(index % 2) * 0.05}
              className={`liquid-card mb-4 p-7 py-9 md:min-h-[15rem] md:p-9 md:py-11 ${
                index % 2 === 0
                  ? "md:border-r md:pr-10"
                  : "md:pl-10"
              }`}
            >
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <span className="technical-number text-[0.69rem] uppercase tracking-[0.16em] text-muted">
                  {note.kindLabel}
                </span>
                <span className="technical-number text-[0.69rem] uppercase tracking-[0.16em] text-accent">
                  {note.progressLabel}
                </span>
              </div>
              <h3 className="mt-7 max-w-[23ch] text-[clamp(1.5rem,2.5vw,2.2rem)] font-medium leading-[1.16] tracking-[-0.04em] text-ink">
                {note.title}
              </h3>
              {note.publicationDate === null ? (
                <p className="mt-8 text-xs tracking-[0.08em] text-muted">
                  No publication date supplied
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="roadmap-heading"
        className="liquid-section ambient-grid border-y border-line bg-pale-soft/35"
      >
        <div className="page-shell section-space">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">{researchPageContent.roadmap.eyebrow}</p>
              <h2
                id="roadmap-heading"
                className="display-section mt-7 text-ink"
              >
                {researchPageContent.roadmap.title}
              </h2>
              <p className="technical-number mt-7 text-xs leading-relaxed tracking-[0.12em] text-muted">
                {researchPageContent.roadmap.noDatesNotice}
              </p>
            </Reveal>

            <ol className="border-t border-line-strong lg:col-span-7 lg:col-start-6">
              {roadmap.map((entry, index) => (
                <li key={entry.number}>
                  <Reveal
                    delay={index * 0.05}
                    className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line-strong bg-white/20 py-9 sm:grid-cols-[4rem_1fr_auto] sm:gap-7 lg:py-10"
                  >
                    <span className="technical-number text-xs tracking-[0.16em] text-accent">
                      {entry.number}
                    </span>
                    <div>
                      <h3 className="text-[clamp(1.3rem,2vw,1.8rem)] font-medium tracking-[-0.03em] text-ink">
                        {entry.title}
                      </h3>
                      <p className="body-copy mt-3 max-w-[34rem]">
                        {entry.description}
                      </p>
                    </div>
                    <span className="technical-number self-start whitespace-nowrap text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">
                      {entry.statusLabel}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="evaluation-heading"
        className="page-shell section-space"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{researchPageContent.evaluation.eyebrow}</p>
            <h2
              id="evaluation-heading"
              className="display-section mt-7 text-ink"
            >
              {researchPageContent.evaluation.title}
            </h2>
          </Reveal>

          <div className="border-t border-line lg:col-span-6 lg:col-start-7">
            {evaluationPrinciples.map((principle, index) => (
              <Reveal
                key={principle.title}
                delay={index * 0.04}
                className="liquid-row grid gap-4 rounded-[1.2rem] border-y border-line py-8 sm:grid-cols-[2rem_1fr] lg:py-9"
              >
                <span className="technical-number text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.025em] text-ink">
                    {principle.title}
                  </h3>
                  <p className="body-copy mt-3 max-w-[34rem]">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
