import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { echelonPreview } from "@/content/echelon";
import { localizeContent, localizePath, type Locale } from "@/lib/i18n";
import { EchelonAura } from "./echelon-aura";
import { ModelStatusBadge } from "./model-status-badge";
import styles from "./echelon.module.css";

export function EchelonHero({
  locale,
  detail = false,
}: {
  locale: Locale;
  detail?: boolean;
}) {
  const c = localizeContent(echelonPreview, locale);
  return (
    <section
      className={`${styles.hero} ${detail ? styles.detailHero : ""}`}
      aria-labelledby="echelon-title"
    >
      <EchelonAura />
      {detail ? (
        <div className={`page-shell ${styles.back}`}>
          <Link href={localizePath("/models", locale)}>
            <ArrowLeft size={15} aria-hidden="true" />
            {c.allModels}
          </Link>
        </div>
      ) : null}
      <div className={`${styles.heroContent} echelon-hero-content`}>
        <p className={styles.eyebrow}>
          {detail ? `rappidAI Research / ${c.variant}` : c.eyebrow}
        </p>
        <h1 id="echelon-title" className={styles.title}>
          <span>Quantum 1</span> <span>Echelon</span>
        </h1>
        <p className={styles.heroDescription}>
          {detail ? c.detailDescription : c.description}
        </p>
        <ModelStatusBadge locale={locale} />
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
      </div>
      <div className={`page-shell ${styles.heroFoot}`}>
        <span>{c.language}</span>
        <span>
          {c.targetShort} <span>{c.targetLabel}</span>
        </span>
        <a
          href={detail ? "#overview" : "#introduction"}
          aria-label={detail ? c.overview.title : "rappidAI Research"}
        >
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
