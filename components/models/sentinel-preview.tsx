import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Eye,
  FileSearch,
  GitPullRequest,
  Info,
  ScanSearch,
  ShieldX,
  Tags,
  Wrench,
} from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { sentinelPreview } from "@/content/sentinel";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";
import styles from "./sentinel.module.css";

const objectiveIcons = [
  ScanSearch,
  Crosshair,
  Tags,
  FileSearch,
  Wrench,
  GitPullRequest,
  ShieldX,
  Eye,
];

/** The planned report fields, derived from the published training objectives. */
function PlannedReport({ locale }: { locale: Locale }) {
  const rows: [string, string, string?][] = [
    ["location", "<file>:<line range>"],
    ["cwe", "CWE-<id>", t(locale, "when evidence is sufficient")],
    ["evidence", t(locale, "data flow · trust boundary")],
    ["remediation", t(locale, "concrete mitigation")],
    ["patch", t(locale, "minimal, security-focused"), t(locale, "optional")],
    ["verification", t(locale, "tests · re-analysis")],
  ];
  return (
    <figure className={`m-0 ${styles.heroWindow}`}>
      <div className="window window-dark">
        <div className="window-bar">
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>sentinel · report.json</span>
          <span>JSON / SARIF</span>
        </div>
        <div
          className={styles.schema}
          role="group"
          aria-label={t(locale, "Planned report format")}
        >
          <p className={styles.c}>
            {"// "}
            {t(locale, "Planned report format")}
          </p>
          <p>
            <span className={styles.k}>finding</span> {"{"}
          </p>
          <dl>
            {rows.map(([key, value, note]) => (
              <div key={key}>
                <dt className={styles.k}>{key}</dt>
                <dd>
                  <span className={styles.v}>{value}</span>
                  {note ? (
                    <span className={styles.c}>{`// ${note}`}</span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
          <p>{"}"}</p>
        </div>
        <div className={styles.schemaFoot} aria-label={t(locale, "Decision")}>
          <span className={styles.decision}>
            {t(locale, "Evidence-backed finding")}
          </span>
          <span className={styles.decision}>{t(locale, "Rejected")}</span>
          <span className={styles.decision}>{t(locale, "Abstained")}</span>
        </div>
      </div>
      <figcaption className={styles.illustrative}>
        {t(
          locale,
          "Illustration of the planned output structure, derived from the training objectives. Not model output; no Sentinel weights are available yet.",
        )}
      </figcaption>
    </figure>
  );
}

export function SentinelHero({
  locale,
  detail = false,
}: {
  locale: Locale;
  detail?: boolean;
}) {
  const c = localizeContent(sentinelPreview, locale);
  const modelPath = localizePath("/models/quantum-sentinel-alpha", locale);
  return (
    <section className={styles.hero} aria-labelledby="sentinel-title">
      {detail ? (
        <div className={`page-shell ${styles.back}`}>
          <Link href={localizePath("/models", locale)}>
            <ArrowLeft size={15} aria-hidden="true" />
            {t(locale, "All models")}
          </Link>
        </div>
      ) : null}
      <div className={`page-shell ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.announce}>
            <span className="chip chip-dot">
              {detail ? "Quantum Sentinel 1" : t(locale, "Introducing")}
            </span>
            <span>{c.status}</span>
          </p>
          <h1 id="sentinel-title" className={styles.title}>
            <span className={styles.titleLead}>Quantum</span>{" "}
            <span className={styles.word}>Sentinel-Alpha</span>
          </h1>
          <p className={styles.tagline}>{c.description}</p>
          <p className={styles.summary}>{c.summary}</p>
          <div className={styles.actions}>
            <ActionLink href={detail ? "#overview" : modelPath}>
              {detail ? t(locale, "Explore the research plan") : c.explore}
            </ActionLink>
            <ActionLink
              href={detail ? "#roadmap" : `${modelPath}#roadmap`}
              variant="secondary"
            >
              {c.roadmapLink}
            </ActionLink>
          </div>
        </div>
        <PlannedReport locale={locale} />
      </div>
      <div className={`page-shell ${styles.heroFacts}`}>
        <dl className="facts">
          <div>
            <dt>{t(locale, "Status")}</dt>
            <dd>{c.status}</dd>
          </div>
          <div>
            <dt>{t(locale, "Alpha target")}</dt>
            <dd>{t(locale, "October 2026")}</dd>
          </div>
          <div>
            <dt>{t(locale, "Primary foundation candidate")}</dt>
            <dd>
              {c.primaryFoundation}
              <span className={styles.factNote}>
                {t(
                  locale,
                  "Final selection after the internal 4B / 9B security bake-off.",
                )}
              </span>
            </dd>
          </div>
          <div>
            <dt>{t(locale, "Primary languages")}</dt>
            <dd>{c.languages.join(" · ")}</dd>
          </div>
        </dl>
        <ul className={styles.positioning}>
          {c.positioning.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SentinelCapabilities({ locale }: { locale: Locale }) {
  const c = localizeContent(sentinelPreview, locale);
  return (
    <section
      id="capabilities"
      className="page-shell section"
      aria-labelledby="sentinel-capabilities-title"
    >
      <div className="section-head split">
        <div>
          <p className="kicker">{t(locale, "Security training objectives")}</p>
          <h2 id="sentinel-capabilities-title" className="display-section">
            {c.capabilitiesTitle}
          </h2>
        </div>
        <p className={styles.notice}>
          <Info size={16} aria-hidden="true" />
          {c.capabilitiesNotice}
        </p>
      </div>
      <ol className={styles.objectives} data-stagger>
        {c.capabilities.map((capability, i) => {
          const Icon = objectiveIcons[i] ?? ScanSearch;
          return (
            <li key={capability.title}>
              <span className={styles.icon} aria-hidden="true">
                <Icon size={17} strokeWidth={1.7} />
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function SentinelArchitecture({
  locale,
  detail = false,
}: {
  locale: Locale;
  detail?: boolean;
}) {
  const c = localizeContent(sentinelPreview, locale);
  const modelSteps = new Set([3, 4]);
  const engineLabel = t(locale, "Context + deterministic tools");
  const modelLabel = t(locale, "Standalone model");
  return (
    <section
      id="architecture"
      className="band"
      aria-labelledby="sentinel-architecture-title"
    >
      <div className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">{t(locale, "Planned architecture")}</p>
            <h2 id="sentinel-architecture-title" className="display-section">
              {c.architectureTitle}
            </h2>
          </div>
          <p>{c.architectureText}</p>
        </div>

        <div className={styles.lanes} data-reveal>
          <div className={styles.laneHeads} aria-hidden="true">
            <div>
              <strong>Sentinel Engine</strong>
              <span>{engineLabel}</span>
            </div>
            <div>
              <strong>Quantum Sentinel</strong>
              <span>{modelLabel}</span>
            </div>
          </div>
          <div className={styles.stepsWrap}>
            <svg
              className={styles.flow}
              viewBox="0 0 800 200"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M50 50H300V150H500V50H750"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <ol
              className={styles.steps}
              aria-label={t(locale, "Planned Sentinel review pipeline")}
            >
              {c.pipeline.map((step, i) => {
                const model = modelSteps.has(i);
                return (
                  <li
                    key={step.title}
                    className={`${styles.step} ${model ? styles.model : ""}`}
                    style={
                      {
                        "--col": i + 1,
                        "--row": model ? 2 : 1,
                      } as CSSProperties
                    }
                  >
                    <span className={styles.stepNo} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{step.title}</h3>
                    {detail ? <p>{step.text}</p> : null}
                    <span className={styles.lane}>
                      {model ? "Quantum Sentinel" : "Sentinel Engine"}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className={styles.systems}>
          <article>
            <p className={styles.label}>{modelLabel}</p>
            <h3>Quantum Sentinel Model</h3>
            <ul className={styles.tags}>
              {c.modelTasks.split(" · ").map((task) => (
                <li key={task} className="chip">
                  {task}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <p className={styles.label}>{engineLabel}</p>
            <h3>Sentinel Engine</h3>
            <ul className={styles.tags}>
              {c.engineTasks.split(" · ").map((task) => (
                <li key={task} className="chip">
                  {task}
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className={styles.reason}>{c.architectureReason}</p>
      </div>
    </section>
  );
}

export function SentinelRoadmap({
  locale,
  detail = false,
}: {
  locale: Locale;
  detail?: boolean;
}) {
  const c = localizeContent(sentinelPreview, locale);
  return (
    <section
      id="roadmap"
      className="page-shell section"
      aria-labelledby="sentinel-roadmap-title"
    >
      <div className="section-head split">
        <div>
          <p className="kicker">{t(locale, "Development plan")}</p>
          <h2 id="sentinel-roadmap-title" className="display-section">
            {c.roadmapTitle}
          </h2>
        </div>
        <p>{c.roadmapText}</p>
      </div>
      <div className={styles.target}>
        <div>
          <p className={styles.label}>{t(locale, "Alpha target")}</p>
          <h3>{t(locale, "October 2026")}</h3>
        </div>
        <p>{c.targetNotice}</p>
      </div>
      <ol className={styles.roadmap} data-stagger>
        {c.phases.map((phase, i) => (
          <li key={phase} className={i === 4 ? styles.focus : undefined}>
            <span className={styles.node} aria-hidden="true" />
            <h3>{phase}</h3>
            <p>{t(locale, i === 4 ? "Current focus" : "Planned")}</p>
          </li>
        ))}
      </ol>
      {!detail ? (
        <div className={styles.roadmapLink}>
          <Link
            className="text-link"
            href={localizePath("/models/quantum-sentinel-alpha", locale)}
          >
            {c.explore}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export function SentinelCard({ locale }: { locale: Locale }) {
  const c = localizeContent(sentinelPreview, locale);
  return (
    <article className={`${styles.card} model-index-sentinel`}>
      <Link
        className={styles.cardLink}
        href={localizePath("/models/quantum-sentinel-alpha", locale)}
      >
        <div className={styles.cardCopy}>
          <p className={styles.cardStatus}>
            <span className="chip chip-dot">{c.status}</span>
          </p>
          <h3>{c.name}</h3>
          <p>
            {t(
              locale,
              "Specialized for vulnerability detection, localization, classification, remediation and secure code review. Alpha is in development; these are training objectives.",
            )}
          </p>
          <span className={styles.cardAction}>
            {c.explore}
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
        <dl className={`facts ${styles.cardMeta}`}>
          <div>
            <dt>{t(locale, "Model")}</dt>
            <dd>{t(locale, "Security-specialized code model")}</dd>
          </div>
          <div>
            <dt>{t(locale, "Alpha target")}</dt>
            <dd>{t(locale, "October 2026")}</dd>
          </div>
          <div>
            <dt>{t(locale, "Release")}</dt>
            <dd>{t(locale, "Local-first · Open weights planned")}</dd>
          </div>
        </dl>
      </Link>
    </article>
  );
}

export function SentinelPreview({ locale }: { locale: Locale }) {
  const c = localizeContent(sentinelPreview, locale);
  const dossiers = [
    {
      id: "foundation",
      label: "Foundation",
      title: c.foundationTitle,
      text: c.foundationText,
      extra: c.languageNotice,
    },
    {
      id: "training",
      label: "Training approach",
      title: c.trainingTitle,
      text: c.trainingText,
      extra: null,
    },
    {
      id: "local-first",
      label: "Local-first / Planned release",
      title: c.localTitle,
      text: c.localText,
      extra: c.hardwareNotice,
    },
  ];
  return (
    <>
      <SentinelHero locale={locale} detail />
      <nav className={styles.jump} aria-label={t(locale, "Explore this page")}>
        <div className="page-shell">
          {[
            ["overview", "Overview"],
            ["capabilities", "Training objectives"],
            ["architecture", "Architecture"],
            ["foundation", "Foundation"],
            ["training", "Training approach"],
            ["local-first", "Local-first"],
            ["roadmap", "Development plan"],
          ].map(([id, label]) => (
            <Link key={id} href={`#${id}`}>
              {t(locale, label)}
            </Link>
          ))}
        </div>
      </nav>
      <section
        id="overview"
        className={`page-shell section ${styles.overview}`}
        aria-labelledby="sentinel-overview-title"
      >
        <div>
          <p className="kicker">Quantum Sentinel 1 / Alpha</p>
          <h2 id="sentinel-overview-title">
            {t(locale, "Source-code security. With evidence.")}
          </h2>
        </div>
        <div>
          <p>{c.overview}</p>
          <dl className={`facts ${styles.metadata}`}>
            {[
              ["Status", c.status],
              ["Alpha target", t(locale, "October 2026")],
              ["Primary foundation candidate", c.primaryFoundation],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{t(locale, label)}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <SentinelCapabilities locale={locale} />
      <SentinelArchitecture locale={locale} detail />
      {dossiers.map((item) => (
        <section
          key={item.id}
          id={item.id}
          className={`page-shell section ${styles.dossier}`}
          aria-labelledby={`sentinel-${item.id}-title`}
        >
          <div>
            <p className="kicker">{t(locale, item.label)}</p>
            <h2 id={`sentinel-${item.id}-title`}>{item.title}</h2>
          </div>
          <div>
            <p>{item.text}</p>
            {item.id === "local-first" ? (
              <ul className={styles.artifacts}>
                {c.artifacts.map((artifact) => (
                  <li key={artifact}>
                    {artifact}
                    <span className="chip chip-dot chip-planned">
                      {t(locale, "Planned")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.extra ? <p className={styles.note}>{item.extra}</p> : null}
          </div>
        </section>
      ))}
      <SentinelRoadmap locale={locale} detail />
      <section
        className={styles.research}
        aria-labelledby="sentinel-research-title"
      >
        <div className={`page-shell section ${styles.dossier}`}>
          <div>
            <p className="kicker">{t(locale, "Research status")}</p>
            <h2 id="sentinel-research-title">
              {t(locale, "In development. Open questions remain.")}
            </h2>
          </div>
          <div>
            <p>{c.researchNotice}</p>
            <p className={styles.note}>{c.safetyText}</p>
            <Link
              href={localizePath("/models", locale)}
              className="text-link mt-8"
            >
              {t(locale, "All models")}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
