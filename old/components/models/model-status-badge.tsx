import { echelonPreview } from "@/content/echelon";
import { t, type Locale } from "@/lib/i18n";
import styles from "./echelon.module.css";

export function ModelStatusBadge({ locale }: { locale: Locale }) {
  return (
    <span className={styles.status}>
      <span aria-hidden="true" />
      {t(locale, echelonPreview.status)}
    </span>
  );
}
