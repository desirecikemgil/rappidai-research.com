import type { PublicationSlug } from "@/content/types";
import { t, type Locale } from "@/lib/i18n";

/**
 * Cover art for a research note: one quiet, typographic figure per note.
 * Decorative only; each article explains the figure in its own text.
 */
export function PublicationArt({
  slug,
  locale,
}: {
  slug: PublicationSlug;
  locale: Locale;
}) {
  if (slug === "false-positive-problem-in-ai-vulnerability-detection")
    return <DetectionOutcomesArt locale={locale} />;

  return (
    <div className="research-token-figure" aria-hidden="true">
      <span>100M</span>
      <div />
      <span>600M</span>
    </div>
  );
}

/** The four detection outcomes with the false-positive cell emphasised. */
export function DetectionOutcomesArt({ locale }: { locale: Locale }) {
  return (
    <div className="detection-outcomes" aria-hidden="true">
      <span />
      <span className="axis-col">{t(locale, "Vulnerable")}</span>
      <span className="axis-col">{t(locale, "Safe")}</span>
      <span className="axis-row">{t(locale, "Reported")}</span>
      <span className="cell">TP</span>
      <span className="cell cell-fp">FP</span>
      <span className="axis-row">{t(locale, "Not reported")}</span>
      <span className="cell">FN</span>
      <span className="cell">TN</span>
    </div>
  );
}
