import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { echelonPreview } from "@/content/echelon";
import { localizeContent, localizePath, type Locale } from "@/lib/i18n";
import { EchelonField } from "./echelon-field";
import { ModelStatusBadge } from "./model-status-badge";
import styles from "./echelon.module.css";

type Preview = typeof echelonPreview;

/** Pick a planned specification row by its English label, then localize it. */
function specRow(c: Preview, label: string) {
  const index = echelonPreview.specifications.rows.findIndex(
    (row) => row.label === label,
  );
  return c.specifications.rows[index];
}

/** "4,096 tokens" → ["4,096", "tokens"]; "40 Mrd. Tokens" → ["40 Mrd.", "Tokens"]. */
function splitUnit(value: string) {
  const space = value.lastIndexOf(" ");
  return space < 0
    ? ([value, ""] as const)
    : ([value.slice(0, space), value.slice(space + 1)] as const);
}

export function EchelonHero({
  locale,
  detail = false,
}: {
  locale: Locale;
  detail?: boolean;
}) {
  const c = localizeContent(echelonPreview, locale);
  const context = specRow(c, "Base context length");
  const tokens = specRow(c, "Base pretraining");
  const language = specRow(c, "Language focus");
  const figures = [
    {
      value: c.targetShort,
      unit: "",
      label: c.targetLabel,
      status: specRow(c, "Parameters").status,
    },
    {
      value: splitUnit(tokens.value)[0],
      unit: splitUnit(tokens.value)[1],
      label: tokens.label,
      status: tokens.status,
    },
    {
      value: splitUnit(context.value)[0],
      unit: splitUnit(context.value)[1],
      label: context.label,
      status: context.status,
    },
    {
      value: "DE",
      unit: "+ EN",
      label: c.language,
      status: language.status,
    },
  ];

  return (
    <section
      className={`${styles.hero} ${detail ? styles.detailHero : ""}`}
      aria-labelledby="echelon-title"
    >
      <EchelonField />
      <div className={styles.frame} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      {detail ? (
        <div className={`page-shell ${styles.back}`}>
          <Link href={localizePath("/models", locale)}>
            <ArrowLeft size={15} aria-hidden="true" />
            {c.allModels}
          </Link>
        </div>
      ) : null}
      <div className={`${styles.heroContent} echelon-hero-content`}>
        <p className={styles.announce}>
          <span className={styles.announceLabel}>
            {detail ? `rappidAI Research / ${c.variant}` : c.eyebrow}
          </span>
          <ModelStatusBadge locale={locale} />
        </p>
        <h1 id="echelon-title" className={styles.title}>
          <span className={styles.titleLead}>Quantum 1</span>{" "}
          <span className={styles.titleWord}>Echelon</span>
        </h1>
        <p className={styles.heroDescription}>
          {detail ? c.detailDescription : c.description}
        </p>
        <div className={styles.heroActions}>
          <ActionLink
            href={
              detail
                ? "#specifications"
                : localizePath("/models/quantum-1-echelon", locale)
            }
            className={`on-navy-primary ${styles.heroAction}`}
          >
            {detail ? c.specsLink : c.explore}
          </ActionLink>
          <Link
            href={
              detail
                ? "#stages"
                : `${localizePath("/models/quantum-1-echelon", locale)}#specifications`
            }
            className={styles.secondaryAction}
          >
            {detail ? c.stages.eyebrow : c.specsLink}
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={`page-shell ${styles.heroStrip}`}>
        <p className={styles.stripNote}>{c.figuresNote}</p>
        <dl className={styles.figures}>
          {figures.map((figure) => (
            <div key={figure.label} className={styles.figure}>
              <dt>{figure.label}</dt>
              <dd>
                <span className={styles.figureValue}>
                  {figure.value}
                  {figure.unit ? <small> {figure.unit}</small> : null}
                </span>
                <span className={styles.figureStatus}>{figure.status}</span>
              </dd>
            </div>
          ))}
        </dl>
        <a
          className={styles.scrollCue}
          href={detail ? "#overview" : "#introduction"}
          aria-label={c.scrollLabel}
        >
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
