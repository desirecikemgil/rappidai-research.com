import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { sentinelPreview } from "@/content/sentinel";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";
import launch from "./echelon.module.css";
import styles from "./sentinel.module.css";

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
    <section
      className={`${launch.hero} ${styles.hero}`}
      aria-labelledby="sentinel-title"
    >
      <div className={styles.signal} aria-hidden="true" />
      <div className={launch.frame} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      {detail ? (
        <div className={`page-shell ${launch.back}`}>
          <Link href={localizePath("/models", locale)}>
            <ArrowLeft size={15} aria-hidden="true" />
            {t(locale, "All models")}
          </Link>
        </div>
      ) : null}
      <div className={`page-shell ${launch.heroContent} ${styles.heroContent}`}>
        <p className={launch.announce}>
          <span className={launch.announceLabel}>
            {detail
              ? "rappidAI Research / Quantum Sentinel 1"
              : t(locale, "Introducing")}
          </span>
        </p>
        <h1 id="sentinel-title" className={`${launch.title} ${styles.title}`}>
          <span className={`${launch.titleLead} ${styles.titleLead}`}>
            Quantum
          </span>{" "}
          <span className={styles.word}>Sentinel-Alpha</span>
        </h1>
        <p className={styles.tagline}>{c.description}</p>
        <p className={launch.heroDescription}>{c.summary}</p>
        <p className={styles.status}>
          {c.status}
          <span>{c.target}</span>
        </p>
        <div className={`${launch.heroActions} ${styles.heroActions}`}>
          <ActionLink
            href={detail ? "#overview" : modelPath}
            className={`on-navy-primary ${launch.heroAction}`}
          >
            {detail ? t(locale, "Explore the research plan") : c.explore}
          </ActionLink>
          <Link
            href={detail ? "#roadmap" : `${modelPath}#roadmap`}
            className={launch.secondaryAction}
          >
            {c.roadmapLink}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={`page-shell ${styles.horizon}`}>
        <ul>
          {c.positioning.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          {t(locale, "Primary foundation candidate")}:{" "}
          <strong>{c.primaryFoundation}</strong>
          <span>
            {t(
              locale,
              "Final selection after the internal 4B / 9B security bake-off.",
            )}
          </span>
        </p>
      </div>
    </section>
  );
}

export function SentinelCapabilities({ locale }: { locale: Locale }) {
  const c = localizeContent(sentinelPreview, locale);
  return (
    <section
      id="capabilities"
      className={`page-shell studio-section ${styles.section}`}
      aria-labelledby="sentinel-capabilities-title"
    >
      <div className="studio-section-heading">
        <div>
          <p className="studio-kicker">
            {t(locale, "Security training objectives")}
          </p>
          <h2 id="sentinel-capabilities-title">{c.capabilitiesTitle}</h2>
        </div>
        <p>{c.capabilitiesNotice}</p>
      </div>
      <div className={styles.capabilities}>
        {c.capabilities.map((capability, i) => (
          <article key={capability.title}>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3>{capability.title}</h3>
            <p>{capability.text}</p>
          </article>
        ))}
      </div>
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
  return (
    <section
      id="architecture"
      className={styles.architecture}
      aria-labelledby="sentinel-architecture-title"
    >
      <div className={`page-shell studio-section ${styles.section}`}>
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">{t(locale, "Planned architecture")}</p>
            <h2 id="sentinel-architecture-title">{c.architectureTitle}</h2>
          </div>
          <p>{c.architectureText}</p>
        </div>
        <div className={styles.systems}>
          <article>
            <p className={styles.label}>{t(locale, "Standalone model")}</p>
            <h3>Quantum Sentinel Model</h3>
            <p>{c.modelTasks}</p>
          </article>
          <article>
            <p className={styles.label}>
              {t(locale, "Context + deterministic tools")}
            </p>
            <h3>Sentinel Engine</h3>
            <p>{c.engineTasks}</p>
          </article>
        </div>
        <ol
          className={styles.pipeline}
          aria-label={t(locale, "Planned Sentinel review pipeline")}
        >
          {c.pipeline.map((step, i) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              {detail ? <p>{step.text}</p> : null}
            </li>
          ))}
        </ol>
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
      className={`page-shell studio-section ${styles.section}`}
      aria-labelledby="sentinel-roadmap-title"
    >
      <div className="studio-section-heading">
        <div>
          <p className="studio-kicker">{t(locale, "Development plan")}</p>
          <h2 id="sentinel-roadmap-title">{c.roadmapTitle}</h2>
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
      <ol className={styles.roadmap}>
        {c.phases.map((phase, i) => (
          <li key={phase} className={i === 4 ? styles.focus : undefined}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{phase}</h3>
            <p>{t(locale, i === 4 ? "Current focus" : "Planned")}</p>
          </li>
        ))}
      </ol>
      {!detail ? (
        <Link
          className="quiet-link"
          href={localizePath("/models/quantum-sentinel-alpha", locale)}
        >
          {c.explore}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      ) : null}
    </section>
  );
}

export function SentinelCard({ locale }: { locale: Locale }) {
  const c = localizeContent(sentinelPreview, locale);
  return (
    <article className={`${launch.card} ${styles.card} model-index-sentinel`}>
      <Link
        className={`${launch.cardLink} ${styles.cardLink}`}
        href={localizePath("/models/quantum-sentinel-alpha", locale)}
      >
        <div className={launch.cardMatrix} aria-hidden="true" />
        <div className={`${launch.cardCopy} ${styles.cardCopy}`}>
          <p className={`${launch.status} ${styles.cardStatus}`}>{c.status}</p>
          <h3>{c.name}</h3>
          <p>
            {t(
              locale,
              "Specialized for vulnerability detection, localization, classification, remediation and secure code review. Alpha is in development; these are training objectives.",
            )}
          </p>
          <span className={launch.cardAction}>
            {c.explore}
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
        <div className={launch.cardVariant}>
          <span className={styles.cardType}>
            {t(locale, "Security-specialized code model")}
          </span>
          <span>{c.target}</span>
          <span>{t(locale, "Local-first · Open weights planned")}</span>
        </div>
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
      <nav
        className={`page-shell ${styles.jump}`}
        aria-label={t(locale, "Explore this page")}
      >
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
      </nav>
      <section
        id="overview"
        className={`page-shell studio-section ${styles.overview}`}
        aria-labelledby="sentinel-overview-title"
      >
        <div>
          <p className="studio-kicker">Quantum Sentinel 1 / Alpha</p>
          <h2 id="sentinel-overview-title">
            {t(locale, "Source-code security. With evidence.")}
          </h2>
        </div>
        <div>
          <p>{c.overview}</p>
          <dl className={styles.metadata}>
            {[
              ["Status", c.status],
              ["Alpha target", t(locale, "October 2026")],
              ["Primary foundation candidate", c.primaryFoundation],
              ["Primary languages", c.languages.join(" · ")],
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
          className={`page-shell studio-section ${styles.dossier}`}
          aria-labelledby={`sentinel-${item.id}-title`}
        >
          <div>
            <p className="studio-kicker">{t(locale, item.label)}</p>
            <h2 id={`sentinel-${item.id}-title`}>{item.title}</h2>
          </div>
          <div>
            <p>{item.text}</p>
            {item.id === "local-first" ? (
              <ul className={styles.artifacts}>
                {c.artifacts.map((artifact) => (
                  <li key={artifact}>
                    {artifact}
                    <span>{t(locale, "Planned")}</span>
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
        <div className={`page-shell studio-section ${styles.dossier}`}>
          <div>
            <p className="studio-kicker">{t(locale, "Research status")}</p>
            <h2 id="sentinel-research-title">
              {t(locale, "In development. Open questions remain.")}
            </h2>
          </div>
          <div>
            <p>{c.researchNotice}</p>
            <p className={styles.note}>{c.safetyText}</p>
            <Link href={localizePath("/models", locale)} className="quiet-link">
              {t(locale, "All models")}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
