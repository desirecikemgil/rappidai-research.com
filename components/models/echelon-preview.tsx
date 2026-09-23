import { ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { echelonPreview } from "@/content/echelon";
import { publicResearchUrls } from "@/content/site";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";
import { EchelonHero } from "./echelon-hero";
import styles from "./echelon.module.css";

export function EchelonPreview({ locale }: { locale: Locale }) {
  const c = localizeContent(echelonPreview, locale);
  return (
    <>
      <EchelonHero locale={locale} detail />
      <section
        id="overview"
        className={`page-shell studio-section ${styles.overview}`}
        aria-labelledby="overview-title"
      >
        <div>
          <p className="studio-kicker">{c.overview.eyebrow}</p>
          <h2 id="overview-title" className="studio-title">
            {c.overview.title}
          </h2>
          <p className="studio-description">{c.overview.description}</p>
        </div>
        <div className="approach-principles">
          {c.overview.principles.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="specifications"
        className={styles.specSection}
        aria-labelledby="specifications-title"
      >
        <div className={`page-shell studio-section ${styles.specLayout}`}>
          <div>
            <p className="studio-kicker">{c.specifications.eyebrow}</p>
            <h2 id="specifications-title" className="studio-title">
              {c.specifications.title}
            </h2>
            <p id="specifications-notice" className="studio-description">
              {c.specifications.notice}
            </p>
          </div>
          <table
            className={styles.specs}
            aria-describedby="specifications-notice"
          >
            <caption className="sr-only">
              {c.name} · {c.specifications.title}
            </caption>
            <thead>
              <tr>
                {c.specifications.columns.map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.specifications.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.value}</td>
                  <td>
                    <span className={styles.specStatus}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section
        className="page-shell studio-section"
        aria-labelledby="stages-title"
      >
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">{c.stages.eyebrow}</p>
            <h2 id="stages-title">{c.stages.title}</h2>
          </div>
          <p>{c.stages.notice}</p>
        </div>
        <ol className={styles.stages}>
          {c.stages.items.map((stage, index) => (
            <li key={stage.name}>
              <div className={styles.stageNumber}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{t(locale, "Planned")}</span>
              </div>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.evidence} aria-labelledby="evidence-title">
        <div className={`page-shell studio-section ${styles.evidenceLayout}`}>
          <div>
            <p className={styles.eyebrow}>{c.evidence.eyebrow}</p>
            <h2 id="evidence-title">{c.evidence.title}</h2>
            <p>{c.evidence.description}</p>
            <ActionLink
              href={localizePath("/research", locale)}
              className="on-navy-primary"
            >
              {c.evidence.researchLink}
            </ActionLink>
          </div>
          <div>
            <h3>{c.evidence.sourcesLabel}</h3>
            <p className={styles.reviewDate}>{c.reviewed}</p>
            <ul className={styles.sourceList}>
              {c.evidence.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <details className={styles.history}>
              <summary>{c.evidence.historyTitle}</summary>
              <p>{c.evidence.history}</p>
              <a
                href={publicResearchUrls.echelonArchitecturePreflight}
                target="_blank"
                rel="noreferrer"
              >
                {c.evidence.historyLink}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
