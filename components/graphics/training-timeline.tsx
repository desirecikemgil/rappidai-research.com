"use client";

import { motion } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";

const glide = [0.16, 1, 0.3, 1] as const;

export type TimelineStage = {
  id: string;
  index: string;
  status: string;
  title: string;
  description: string;
  /** Reached stages read as solid; the open one stays hollow. */
  reached: boolean;
};

/**
 * The model line as a drawn axis rather than three cards in a row.
 *
 * The connecting rule draws itself to the last reached stage and then stops:
 * the gap to the open stage is the point, and `AGENTS.md` forbids presenting
 * a configured target as a completed one.
 */
export function TrainingTimeline({ stages }: { stages: TimelineStage[] }) {
  const tier = useMotionTier();
  const still = tier === "off";

  const reachedCount = stages.filter((stage) => stage.reached).length;
  const solidFraction =
    stages.length > 1
      ? Math.max(0, (reachedCount - 1) / (stages.length - 1))
      : 0;

  return (
    <div className="training-timeline">
      {/* The axis lives above the columns on wide screens only; stacked
          layouts get each marker attached to its own card instead. */}
      <div className="relative hidden lg:block" aria-hidden="true">
        <div className="absolute inset-x-0 top-[0.42rem] h-px bg-[var(--color-dark-line)]" />
        <motion.div
          className="training-timeline-progress absolute left-0 top-[0.42rem] h-px origin-left"
          style={{ right: `${(1 - solidFraction) * 100}%` }}
          initial={still ? false : { scaleX: 0 }}
          whileInView={still ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.3, ease: glide }}
        />
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
        >
          {stages.map((stage, index) => (
            <motion.span
              key={stage.id}
              className={`training-timeline-node ${
                stage.reached ? "is-reached" : "is-open"
              }`}
              initial={still ? false : { opacity: 0, scale: 0.4 }}
              whileInView={still ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: 0.35 + index * 0.18,
                ease: glide,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-0 grid gap-4 lg:mt-10 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <motion.article
            key={stage.id}
            className="liquid-card-dark relative border p-7 py-9 lg:min-h-[20rem] lg:p-9 lg:py-10"
            initial={still ? false : { opacity: 0, y: 20 }}
            whileInView={still ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.62,
              delay: index * 0.09,
              ease: glide,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="technical-number text-xs text-[var(--color-dark-accent)]">
                {stage.index}
              </span>
              <span
                className={`training-timeline-node ${
                  stage.reached ? "is-reached" : "is-open"
                } lg:hidden`}
                aria-hidden="true"
              />
            </div>
            <p className="mt-12 font-mono text-[0.64rem] tracking-[0.12em] text-[var(--color-dark-muted)] uppercase">
              {stage.status}
            </p>
            <h3 className="mt-5 text-[clamp(1.7rem,3vw,2.7rem)] leading-[1.02] font-[510] tracking-[-0.045em] text-[var(--color-dark-title)]">
              {stage.title}
            </h3>
            <p className="mt-5 max-w-sm leading-7 text-[var(--color-dark-body)]">
              {stage.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
