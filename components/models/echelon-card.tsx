import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { echelonPreview } from "@/content/echelon";
import { localizeContent, localizePath, type Locale } from "@/lib/i18n";
import { ModelStatusBadge } from "./model-status-badge";
import styles from "./echelon.module.css";

export function EchelonCard({ locale }: { locale: Locale }) {
  const c = localizeContent(echelonPreview, locale);
  return (
    <article className={`${styles.card} model-index-featured`}>
      <Link
        href={localizePath("/models/quantum-1-echelon", locale)}
        className={styles.cardLink}
      >
        <div className={styles.cardCopy}>
          <ModelStatusBadge locale={locale} />
          <h3>{c.name}</h3>
          <p>{c.cardSummary}</p>
          <span className={styles.cardAction}>
            {c.explore}
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
        <div className={styles.cardVariant}>
          <span className={styles.variant}>{c.variant}</span>
          <span>
            {c.targetShort} · {c.targetLabel}
          </span>
          <span>
            {c.language} · {c.development}
          </span>
        </div>
      </Link>
    </article>
  );
}
