import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import {
  sentinelEngineCopy,
  sentinelEngineEvidence,
} from "@/content/sentinel-engine";
import { localizePath, type Locale } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";
import styles from "./sentinel-engine.module.css";

export const metadata = metadataFor("/tools/sentinel-engine");

export function LocalizedSentinelEnginePage({ locale }: { locale: Locale }) {
  const c = sentinelEngineCopy[locale];
  const path = (value: string) => localizePath(value, locale);
  return (
    <>
      <PageIntro
        eyebrow="Sentinel Engine"
        title="Sentinel Engine"
        description={c.description}
        facts={[
          { label: c.stageLabel, value: c.status },
          {
            label: locale === "de" ? "Bereich" : "Category",
            value: c.category,
          },
          {
            label: locale === "de" ? "Modell" : "Model",
            value: "Quantum Sentinel-Alpha",
          },
        ]}
        actions={
          <>
            <ActionLink href="#engine-workflow">{c.workflowLink}</ActionLink>
            <ActionLink
              href={path("/models/quantum-sentinel-alpha")}
              variant="secondary"
            >
              {c.modelLink}
            </ActionLink>
          </>
        }
        aside={
          <div className={styles.introduction}>
            <p className="body-copy m-0">{c.introduction}</p>
            <p className={styles.status}>{c.status}</p>
            <p className="m-0 text-sm leading-6 text-muted">{c.statusText}</p>
          </div>
        }
        indexLabel={c.onPage}
        topics={[
          {
            href: "#engine-overview",
            label: c.overview,
            description: c.purposeTitle,
          },
          {
            href: "#engine-workflow",
            label: c.workflow,
            description: c.flowTitle,
          },
          {
            href: "#engine-capabilities",
            label: c.capabilities,
            description: c.capabilitiesTitle,
          },
          {
            href: "#engine-architecture",
            label: c.architecture,
            description: c.architectureTitle,
          },
          {
            href: "#engine-developer",
            label: c.developer,
            description: c.workflowTitle,
          },
          {
            href: "#engine-roadmap",
            label: c.roadmap,
            description: c.roadmapTitle,
          },
        ]}
      />

      <section id="engine-overview" className="page-shell section">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <h2 className="display-section">{c.purposeTitle}</h2>
          <div className="grid gap-5">
            <p className="body-copy m-0">{c.purpose}</p>
            <p className="body-copy m-0">{c.distinction}</p>
            <p className="m-0 border-t border-line pt-5 text-sm leading-7 text-muted">
              {c.independence}
            </p>
          </div>
        </div>
      </section>

      <section id="engine-workflow" className="band">
        <div className="page-shell section">
          <div className="section-head split">
            <div>
              <p className="kicker">{c.planning}</p>
              <h2 id="engine-flow-title" className="display-section">
                {c.flowTitle}
              </h2>
            </div>
            <p>{c.flowNote}</p>
          </div>
          <figure className={styles.flow} aria-labelledby="engine-flow-title">
            {c.phases.map((phase) => (
              <div key={phase.title} className={styles.phase}>
                <h3>{phase.title}</h3>
                <ol start={phase.start}>
                  {phase.steps.map((step, i) => (
                    <li key={step.title}>
                      <span className={styles.stepNumber} aria-hidden="true">
                        {phase.start + i}
                      </span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </figure>
        </div>
      </section>

      <section id="engine-capabilities" className="page-shell section">
        <div className="section-head">
          <h2 className="display-section">{c.capabilitiesTitle}</h2>
        </div>
        <dl className={styles.capabilities}>
          {c.features.map((feature) => (
            <div key={feature.title}>
              <dt>{feature.title}</dt>
              <dd>{feature.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="engine-architecture" className="band">
        <div className="page-shell section">
          <div className="section-head split">
            <h2 id="engine-layers-title" className="display-section">
              {c.architectureTitle}
            </h2>
            <p>{c.architectureNote}</p>
          </div>
          <figure
            className={styles.layers}
            aria-labelledby="engine-layers-title"
          >
            <dl>
              {c.layers.map((layer) => (
                <div key={layer.title}>
                  <dt>{layer.title}</dt>
                  <dd>{layer.text}</dd>
                  <dd className={styles.layerOutput}>{layer.output}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </section>

      <section id="engine-developer" className="page-shell section">
        <div className="section-head split">
          <h2 className="display-section">{c.workflowTitle}</h2>
          <p>{c.workflowText}</p>
        </div>
        <div className={styles.developer}>
          <div>
            <div className="window window-dark">
              <div className="window-bar">
                <span>{c.commandLabel}</span>
              </div>
              <pre
                className="terminal"
                tabIndex={0}
                aria-label={c.commandLabel}
              >
                <code>sentinel scan ./repository</code>
              </pre>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{c.commandNote}</p>
          </div>
          <figure className={styles.finding}>
            <figcaption>
              <h3>{c.findingLabel}</h3>
              <p>{c.findingNote}</p>
            </figcaption>
            <dl>
              {c.finding.map((field, i) => (
                <div key={field.label}>
                  <dt>{field.label}</dt>
                  <dd className={i < 2 ? "font-mono" : ""}>{field.value}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </section>

      <section className="band" aria-labelledby="engine-model-title">
        <div className="page-shell section">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <h2 id="engine-model-title" className="display-section">
                {c.modelTitle}
              </h2>
              <div className="mt-6">
                <ActionLink
                  href={path("/models/quantum-sentinel-alpha")}
                  variant="text"
                >
                  {c.modelLink}
                </ActionLink>
              </div>
            </div>
            <div className="grid gap-5">
              <p className="body-copy m-0">{c.modelText}</p>
              <p className="body-copy m-0">{c.modelPriorities}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="engine-roadmap" className="page-shell section">
        <div className="section-head split">
          <h2 className="display-section">{c.roadmapTitle}</h2>
          <p>{c.roadmapText}</p>
        </div>
        <ol className={styles.roadmap}>
          {c.milestones.map((milestone, i) => (
            <li key={milestone.title}>
              <span aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.evidence}>
          <p>
            {c.statusDate} ·{" "}
            <code>{sentinelEngineEvidence.revision.slice(0, 7)}</code>
          </p>
          <ActionLink
            href={sentinelEngineEvidence.source}
            external
            variant="text"
          >
            {c.sourceLink}
          </ActionLink>
        </div>
      </section>

      <section className="band" aria-labelledby="engine-next-title">
        <div className="page-shell py-12 sm:py-16">
          <h2
            id="engine-next-title"
            className="m-0 text-2xl font-medium tracking-tight"
          >
            {c.continueTitle}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionLink href={path("/tools")}>{c.toolsLink}</ActionLink>
            <ActionLink
              href={path("/models/quantum-sentinel-alpha")}
              variant="secondary"
            >
              Quantum Sentinel-Alpha
            </ActionLink>
            <ActionLink href={path("/research")} variant="secondary">
              {c.researchLink}
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SentinelEnginePage() {
  return <LocalizedSentinelEnginePage locale="en" />;
}
