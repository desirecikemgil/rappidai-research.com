"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/count-up";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import { t, type Locale } from "@/lib/i18n";

const glide = [0.16, 1, 0.3, 1] as const;

type Step = {
  label: string;
  /** Millions of German tokens. */
  tokens: number;
  note: string;
  /** Configured targets are drawn hollow; only measured values are solid. */
  configured?: boolean;
};

/**
 * Corpus scale from the published pilot to the configured Echelon target.
 *
 * The last bar is deliberately hatched, not filled: 600M is a configured
 * target, and the site's evidence rules do not allow it to look achieved.
 */
export function TokenScaleVisual({
  steps,
  locale = "en",
  caption,
}: {
  steps: Step[];
  locale?: Locale;
  caption?: string;
}) {
  const tier = useMotionTier();
  const still = tier === "off";
  const max = Math.max(...steps.map((step) => step.tokens));

  return (
    <figure className="token-scale m-0">
      <ul className="m-0 flex list-none flex-col gap-5 p-0">
        {steps.map((step, index) => (
          <li key={step.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-mono text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                {step.label}
              </p>
              <p className="technical-number text-lg text-ink">
                <CountUp
                  value={step.tokens}
                  locale={locale}
                  suffix={`M ${t(locale, "tokens")}`}
                />
              </p>
            </div>
            <div className="token-scale-track mt-2.5">
              <motion.div
                className={`token-scale-fill ${
                  step.configured ? "is-configured" : ""
                }`}
                style={{ width: `${(step.tokens / max) * 100}%` }}
                initial={still ? false : { scaleX: 0 }}
                whileInView={still ? undefined : { scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 1.05,
                  delay: 0.08 + index * 0.13,
                  ease: glide,
                }}
              />
            </div>
            <p className="mt-2 text-[0.78rem] leading-5 text-muted">
              {step.note}
            </p>
          </li>
        ))}
      </ul>

      {caption ? (
        <figcaption className="mt-6 border-t border-line pt-4 text-[0.78rem] leading-5 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
