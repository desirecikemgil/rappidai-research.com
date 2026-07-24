"use client";

import { motion } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import { t, type Locale } from "@/lib/i18n";

const glide = [0.16, 1, 0.3, 1] as const;

type ArchitectureStackProps = {
  layers: number;
  hiddenSize: number;
  heads: number;
  locale?: Locale;
  /** Draw the stack hollow when the architecture is configured, not trained. */
  configured?: boolean;
};

/**
 * A transformer stack drawn at its real depth.
 *
 * Every model page previously described its architecture only in a table; this
 * gives each one a figure whose proportions come from its own model card.
 */
export function ArchitectureStack({
  layers,
  hiddenSize,
  heads,
  locale = "en",
  configured = false,
}: ArchitectureStackProps) {
  const tier = useMotionTier();
  const still = tier === "off";

  const width = 300;
  const rowHeight = 13;
  const gap = 4;
  const top = 46;
  const height = top + layers * (rowHeight + gap) + 54;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="architecture-stack h-auto w-full"
      role="img"
      aria-label={t(
        locale,
        "Transformer stack diagram showing the configured layer count, hidden size and attention heads",
      )}
    >
      <defs>
        <linearGradient id="arch-layer" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#126BFF" />
          <stop offset="1" stopColor="#0B2D60" />
        </linearGradient>
      </defs>

      {/* Attention heads across the top of the stack. */}
      <g>
        {Array.from({ length: heads }, (_, i) => {
          const cx = 60 + i * ((width - 120) / Math.max(heads - 1, 1));
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy="24"
              r="3.6"
              fill="#126BFF"
              fillOpacity={configured ? 0.35 : 0.85}
              initial={still ? false : { opacity: 0, scale: 0 }}
              whileInView={still ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.42, delay: i * 0.04, ease: glide }}
              style={{ transformOrigin: `${cx}px 24px` }}
            />
          );
        })}
        <line
          x1="60"
          x2={width - 60}
          y1="24"
          y2="24"
          stroke="#126BFF"
          strokeOpacity="0.2"
        />
        <text
          x={width - 52}
          y="28"
          fill="#66738A"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="9"
          letterSpacing="0.8"
        >
          {heads}h
        </text>
      </g>

      {/* The stack itself. */}
      {Array.from({ length: layers }, (_, i) => {
        const y = top + i * (rowHeight + gap);
        return (
          <motion.rect
            key={i}
            x="46"
            y={y}
            width={width - 92}
            height={rowHeight}
            rx="3"
            fill={configured ? "transparent" : "url(#arch-layer)"}
            fillOpacity={configured ? 1 : 0.16 + (i / layers) * 0.62}
            stroke="#126BFF"
            strokeOpacity={configured ? 0.4 : 0.18}
            strokeDasharray={configured ? "3 3" : undefined}
            initial={still ? false : { opacity: 0, scaleX: 0.35 }}
            whileInView={still ? undefined : { opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: 0.1 + i * 0.035,
              ease: glide,
            }}
            style={{ transformOrigin: `${width / 2}px center` }}
          />
        );
      })}

      {/* Depth bracket down the left edge. */}
      <g stroke="#C5D2E4">
        <line
          x1="34"
          x2="34"
          y1={top}
          y2={top + layers * (rowHeight + gap) - gap}
        />
        <line x1="34" x2="42" y1={top} y2={top} />
        <line
          x1="34"
          x2="42"
          y1={top + layers * (rowHeight + gap) - gap}
          y2={top + layers * (rowHeight + gap) - gap}
        />
      </g>
      <text
        x="28"
        y={top + (layers * (rowHeight + gap)) / 2}
        fill="#66738A"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9.5"
        letterSpacing="0.8"
        textAnchor="middle"
        transform={`rotate(-90 28 ${top + (layers * (rowHeight + gap)) / 2})`}
      >
        {layers} {t(locale, "layers")}
      </text>

      <text
        x={width / 2}
        y={height - 22}
        fill="#126BFF"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="10"
        letterSpacing="1.4"
        textAnchor="middle"
      >
        d = {hiddenSize.toLocaleString(locale)}
      </text>
    </svg>
  );
}
