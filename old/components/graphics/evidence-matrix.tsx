"use client";

import { motion } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import { t, type Locale } from "@/lib/i18n";

const glide = [0.16, 1, 0.3, 1] as const;

export type EvidenceCell = {
  label: string;
  state: "published" | "partial" | "pending";
};

/**
 * The documentation status of the whole hub in one figure.
 *
 * Three states, three visual weights: solid for published, half-toned for
 * partial, hollow for pending. The hollow cells are the point — the project's
 * own rules require gaps to be shown, not smoothed over.
 */
export function EvidenceMatrix({
  cells,
  locale = "en",
}: {
  cells: EvidenceCell[];
  locale?: Locale;
}) {
  const tier = useMotionTier();
  const still = tier === "off";

  const counts = {
    published: cells.filter((cell) => cell.state === "published").length,
    partial: cells.filter((cell) => cell.state === "partial").length,
    pending: cells.filter((cell) => cell.state === "pending").length,
  };

  return (
    <figure className="evidence-matrix m-0">
      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
        {cells.map((cell, index) => (
          <motion.li
            key={cell.label}
            className={`evidence-cell is-${cell.state}`}
            initial={still ? false : { opacity: 0, y: 10 }}
            whileInView={still ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: glide }}
          >
            <span className="evidence-cell-dot" aria-hidden="true" />
            <span className="evidence-cell-label">{cell.label}</span>
          </motion.li>
        ))}
      </ul>

      <figcaption className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 font-mono text-[0.62rem] tracking-[0.11em] text-muted uppercase">
        <span className="evidence-key is-published">
          {counts.published} {t(locale, "Published")}
        </span>
        <span className="evidence-key is-partial">
          {counts.partial} {t(locale, "Partial evidence")}
        </span>
        <span className="evidence-key is-pending">
          {counts.pending} {t(locale, "Not yet available")}
        </span>
      </figcaption>
    </figure>
  );
}
