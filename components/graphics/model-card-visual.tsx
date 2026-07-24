"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/count-up";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import { t, type Locale } from "@/lib/i18n";

const glide = [0.16, 1, 0.3, 1] as const;

type ModelCardVisualProps = {
  name: string;
  /** Parameter count in millions, e.g. 49.3. */
  parametersMillions: number;
  primaryUse: string;
  modelType: string;
  contextTokens: number;
  vocabulary: number;
  locale?: Locale;
};

/**
 * The model card as a rendered surface rather than a screenshot.
 *
 * This replaces a 402 KB PNG that was mostly whitespace: it stays sharp at any
 * density, translates with the rest of the page, animates its figures in, and
 * cannot drift out of sync with the model data it is describing.
 */
export function ModelCardVisual({
  name,
  parametersMillions,
  primaryUse,
  modelType,
  contextTokens,
  vocabulary,
  locale = "en",
}: ModelCardVisualProps) {
  const tier = useMotionTier();
  const still = tier === "off";

  const rows = [
    { label: t(locale, "Model type"), value: modelType },
    {
      label: t(locale, "Context"),
      value: `${contextTokens.toLocaleString(locale)} ${t(locale, "tokens")}`,
    },
    {
      label: t(locale, "Vocabulary"),
      value: vocabulary.toLocaleString(locale),
    },
  ];

  return (
    <figure className="model-card-visual liquid-frame m-0 overflow-hidden p-7 sm:p-10 lg:p-14">
      <div className="model-card-grid" aria-hidden="true" />

      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <p className="eyebrow">{t(locale, "MODEL CARD")}</p>
        <p className="font-mono text-[0.62rem] tracking-[0.16em] text-muted uppercase">
          rappidAI · research
        </p>
      </div>

      <motion.p
        className="relative mt-8 text-[clamp(2.1rem,5.4vw,4.6rem)] leading-[0.95] font-[520] tracking-[-0.06em] text-ink"
        initial={still ? false : { opacity: 0, y: 14 }}
        whileInView={still ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: glide }}
      >
        {name}
      </motion.p>

      <div className="relative mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="font-mono text-[0.63rem] tracking-[0.16em] text-muted uppercase">
            {t(locale, "Parameter size")}
          </p>
          <p className="mt-4 flex items-baseline gap-3">
            <CountUp
              value={parametersMillions}
              decimals={1}
              locale={locale}
              suffix="M"
              className="display-mega text-accent"
            />
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            {t(locale, "parameters")}
          </p>

          {/* Density plot: 49.3M against the 506M configured Echelon target,
              so the "compact" claim is shown rather than asserted. */}
          <div className="mt-8">
            <ParameterBar locale={locale} />
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.63rem] tracking-[0.16em] text-muted uppercase">
            {t(locale, "Primary use")}
          </p>
          <p className="mt-4 text-[clamp(1.15rem,1.9vw,1.6rem)] leading-[1.3] font-[500] tracking-[-0.03em] text-accent">
            {primaryUse}
          </p>

          <dl className="mt-9 border-t border-line">
            {rows.map((row, index) => (
              <motion.div
                key={row.label}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-5"
                initial={still ? false : { opacity: 0, y: 8 }}
                whileInView={still ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.07,
                  ease: glide,
                }}
              >
                <dt className="font-mono text-[0.62rem] tracking-[0.13em] text-muted uppercase">
                  {row.label}
                </dt>
                <dd className="text-[0.92rem] leading-6 text-ink-soft">
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </figure>
  );
}

/** 96 cells, of which ~9 are lit — the published model against its own scale. */
function ParameterBar({ locale }: { locale: Locale }) {
  const tier = useMotionTier();
  const still = tier === "off";
  const total = 96;
  const lit = 9;

  return (
    <div className="max-w-[21rem]">
      <div className="grid grid-cols-12 gap-[4px]" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <motion.span
            key={index}
            className={`aspect-square rounded-[2px] border ${
              index < lit
                ? "border-accent bg-accent"
                : "border-line bg-white/70"
            }`}
            initial={still ? false : { opacity: 0, scale: 0.4 }}
            whileInView={still ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.36,
              delay: index * 0.006,
              ease: glide,
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-[0.72rem] leading-5 text-muted">
        {t(
          locale,
          "49.3M released parameters against the 506M configured Echelon target.",
        )}
      </p>
    </div>
  );
}
