"use client";

import { motion } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import { t, type Locale } from "@/lib/i18n";

const glide = [0.16, 1, 0.3, 1] as const;

/**
 * The published quantum-1.6-pilot architecture, drawn to scale rather than
 * invented: 12 layers, 8 attention heads, hidden size 512, 512-token context.
 * The figure is the model, so the counts have to match the model card.
 */
const LAYERS = 12;
const HEADS = 8;
const TOKENS = 14;

const CORE_X = 246;
const CORE_Y = 132;
const CORE_W = 188;
const CORE_H = 416;
const LAYER_GAP = CORE_H / LAYERS;

export function HeroVisualization({ locale = "en" }: { locale?: Locale }) {
  const tier = useMotionTier();
  const still = tier === "off";
  const ambient = tier === "full";

  return (
    <div
      className="hero-visual liquid-surface relative mx-auto aspect-square w-full max-w-[42rem] overflow-hidden rounded-[1.35rem]"
      aria-hidden="true"
    >
      <div className="hero-visual-bloom" />

      <svg className="relative h-full w-full" viewBox="0 0 680 680" fill="none">
        <defs>
          <linearGradient id="hv-core" x1="246" y1="132" x2="434" y2="548">
            <stop stopColor="#126BFF" />
            <stop offset="1" stopColor="#0B2D60" />
          </linearGradient>
          <linearGradient id="hv-stream" x1="40" y1="0" x2="246" y2="0">
            <stop stopColor="#126BFF" stopOpacity="0.06" />
            <stop offset="1" stopColor="#126BFF" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="hv-out" x1="434" y1="0" x2="644" y2="0">
            <stop stopColor="#126BFF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#126BFF" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="hv-sweep" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#126BFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#126BFF" stopOpacity="0.28" />
            <stop offset="1" stopColor="#126BFF" stopOpacity="0" />
          </linearGradient>
          <clipPath id="hv-core-clip">
            <rect
              x={CORE_X}
              y={CORE_Y}
              width={CORE_W}
              height={CORE_H}
              rx="14"
            />
          </clipPath>
        </defs>

        {/* Measurement field. Fine, regular, and quiet — it sets the
            instrument register the rest of the figure sits in. */}
        <g stroke="#0B2D60" strokeOpacity="0.07" strokeWidth="1">
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={60 + i * 56}
              x2={60 + i * 56}
              y1="60"
              y2="620"
            />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="60"
              x2="620"
              y1={60 + i * 56}
              y2={60 + i * 56}
            />
          ))}
        </g>

        {/* Corner registration ticks */}
        <g stroke="#126BFF" strokeOpacity="0.5" strokeWidth="1.4">
          {[
            [60, 60, 1, 1],
            [620, 60, -1, 1],
            [60, 620, 1, -1],
            [620, 620, -1, -1],
          ].map(([x, y, dx, dy]) => (
            <g key={`${x}-${y}`}>
              <line x1={x} y1={y} x2={x + dx * 18} y2={y} />
              <line x1={x} y1={y} x2={x} y2={y + dy * 18} />
            </g>
          ))}
        </g>

        {/* Token stream in. Each bar is a token entering the 512-token window. */}
        <g>
          {Array.from({ length: TOKENS }, (_, i) => {
            const y = CORE_Y + 16 + i * ((CORE_H - 32) / (TOKENS - 1));
            const width = 52 + ((i * 37) % 88);
            return (
              <motion.rect
                key={`tok${i}`}
                x={CORE_X - 28 - width}
                y={y - 3}
                width={width}
                height="6"
                rx="3"
                fill="url(#hv-stream)"
                initial={still ? false : { opacity: 0, scaleX: 0 }}
                animate={still ? undefined : { opacity: 1, scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.035,
                  ease: glide,
                }}
                style={{ transformOrigin: `${CORE_X - 28}px center` }}
              />
            );
          })}
        </g>

        {/* The core: a compact 12-layer stack, drawn as a stack. */}
        <motion.rect
          x={CORE_X}
          y={CORE_Y}
          width={CORE_W}
          height={CORE_H}
          rx="14"
          fill="#FFFFFF"
          fillOpacity="0.72"
          stroke="#126BFF"
          strokeOpacity="0.32"
          strokeWidth="1.4"
          initial={still ? false : { opacity: 0, scaleY: 0.86 }}
          animate={still ? undefined : { opacity: 1, scaleY: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: glide }}
          style={{
            transformOrigin: `${CORE_X + CORE_W / 2}px ${CORE_Y + CORE_H / 2}px`,
          }}
        />

        <g clipPath="url(#hv-core-clip)">
          {Array.from({ length: LAYERS }, (_, i) => {
            const y = CORE_Y + LAYER_GAP * i;
            return (
              <g key={`layer${i}`}>
                <motion.rect
                  x={CORE_X}
                  y={y + LAYER_GAP * 0.22}
                  width={CORE_W}
                  height={LAYER_GAP * 0.56}
                  fill="url(#hv-core)"
                  /* Density ramps down the stack: representations get richer
                     with depth, so the figure gets denser with depth. */
                  fillOpacity={0.12 + (i / (LAYERS - 1)) * 0.74}
                  initial={still ? false : { opacity: 0, scaleX: 0.2 }}
                  animate={still ? undefined : { opacity: 1, scaleX: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45 + i * 0.045,
                    ease: glide,
                  }}
                  style={{ transformOrigin: `${CORE_X + CORE_W / 2}px center` }}
                />
                <line
                  x1={CORE_X}
                  x2={CORE_X + CORE_W}
                  y1={y}
                  y2={y}
                  stroke="#126BFF"
                  strokeOpacity="0.14"
                />
              </g>
            );
          })}

          {/* Activation sweep travelling down the stack, once per cycle. */}
          {ambient ? (
            <motion.rect
              x={CORE_X}
              width={CORE_W}
              height="88"
              fill="url(#hv-sweep)"
              animate={{ y: [CORE_Y - 88, CORE_Y + CORE_H] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
          ) : null}
        </g>

        {/* Attention heads: eight, because the model has eight. */}
        <g>
          {Array.from({ length: HEADS }, (_, i) => {
            const cx = CORE_X + CORE_W / 2 + (i - (HEADS - 1) / 2) * 21;
            return (
              <motion.circle
                key={`head${i}`}
                cx={cx}
                cy={CORE_Y - 26}
                r="4.5"
                fill="#126BFF"
                initial={still ? false : { opacity: 0, scale: 0 }}
                animate={
                  still
                    ? undefined
                    : ambient
                      ? { opacity: [0.35, 1, 0.35], scale: 1 }
                      : { opacity: 0.85, scale: 1 }
                }
                transition={
                  ambient
                    ? {
                        opacity: {
                          duration: 3.2,
                          delay: i * 0.16,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        scale: { duration: 0.5, delay: 0.8 + i * 0.05 },
                      }
                    : { duration: 0.5, delay: 0.8 + i * 0.05 }
                }
                style={{ transformOrigin: `${cx}px ${CORE_Y - 26}px` }}
              />
            );
          })}
        </g>

        {/* Output distribution. Deterministic heights so the figure is stable
            between renders and between the two locales. */}
        <g>
          {Array.from({ length: TOKENS }, (_, i) => {
            const y = CORE_Y + 16 + i * ((CORE_H - 32) / (TOKENS - 1));
            const width = 34 + ((i * 53) % 132);
            return (
              <motion.rect
                key={`out${i}`}
                x={CORE_X + CORE_W + 28}
                y={y - 3}
                width={width}
                height="6"
                rx="3"
                fill="url(#hv-out)"
                initial={still ? false : { opacity: 0, scaleX: 0 }}
                animate={still ? undefined : { opacity: 1, scaleX: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.95 + i * 0.035,
                  ease: glide,
                }}
                style={{ transformOrigin: `${CORE_X + CORE_W + 28}px center` }}
              />
            );
          })}
        </g>

        {/* Tokens crossing the core. */}
        {ambient
          ? [0, 1, 2].map((i) => (
              <motion.circle
                key={`p${i}`}
                r="3.2"
                cy={CORE_Y + 70 + i * 148}
                fill="#126BFF"
                animate={{
                  cx: [96, 620],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3.6,
                  delay: i * 1.15,
                  repeat: Infinity,
                  repeatDelay: 1.1,
                  ease: "easeInOut",
                }}
              />
            ))
          : null}

        {/* Annotations sit below the registration ticks so the two never
            collide, and are set in the mono face to read as instrument scale. */}
        <g fontFamily="var(--font-geist-mono), monospace">
          <text
            x="60"
            y="102"
            fill="#526178"
            fontSize="11"
            letterSpacing="1.8"
            style={{ textTransform: "uppercase" }}
          >
            {t(locale, "token input").toUpperCase()}
          </text>
          <text x="60" y="120" fill="#8494AB" fontSize="10" letterSpacing="1.2">
            {String(TOKENS).padStart(2, "0")} / 512
          </text>

          <text
            x="620"
            y="102"
            textAnchor="end"
            fill="#526178"
            fontSize="11"
            letterSpacing="1.8"
          >
            {t(locale, "local output").toUpperCase()}
          </text>
          <text
            x="620"
            y="120"
            textAnchor="end"
            fill="#8494AB"
            fontSize="10"
            letterSpacing="1.2"
          >
            16,384
          </text>

          <text
            x={CORE_X + CORE_W / 2}
            y={CORE_Y + CORE_H + 36}
            textAnchor="middle"
            fill="#126BFF"
            fontSize="11"
            letterSpacing="1.6"
          >
            12 × 512
          </text>
        </g>
      </svg>

      <p className="hero-visual-caption">
        {t(locale, "quantum-1.6-pilot · published architecture")}
      </p>
    </div>
  );
}
