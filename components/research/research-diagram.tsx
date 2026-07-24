"use client";

import { motion } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";

type DiagramKind = "pipeline" | "inference" | "evaluation";

const viewport = { once: true, amount: 0.4 } as const;
const ease = [0.16, 1, 0.3, 1] as const;

const INK = "#0B2D60";
const ACCENT = "#126BFF";
const LINE = "#AFC4E0";

/**
 * One figure per research area. All three share a 340×200 frame, the same
 * stroke weights and the same corner ticks so they read as a set.
 *
 * The previous versions used hairline strokes at low opacity and all but
 * disappeared against the glass surfaces they sit on; these carry real weight.
 */
export function ResearchDiagram({ kind }: { kind: DiagramKind }) {
  const tier = useMotionTier();
  const still = tier === "off";
  const ambient = tier === "full";

  const draw = (delay: number, duration = 1) => ({
    initial: still ? false : ({ pathLength: 0, opacity: 0 } as const),
    whileInView: still ? undefined : ({ pathLength: 1, opacity: 1 } as const),
    viewport,
    transition: { duration, delay, ease },
  });

  return (
    <svg
      viewBox="0 0 340 200"
      className="research-diagram h-auto w-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`rd-fill-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="1" stopColor={INK} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Shared frame ticks. */}
      <g stroke={LINE} strokeWidth="1.2">
        {[
          [14, 14, 1, 1],
          [326, 14, -1, 1],
          [14, 186, 1, -1],
          [326, 186, -1, -1],
        ].map(([x, y, dx, dy]) => (
          <g key={`${x}-${y}`}>
            <line x1={x} y1={y} x2={x + dx * 12} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + dy * 12} />
          </g>
        ))}
      </g>

      {kind === "pipeline" ? (
        <Pipeline kind={kind} draw={draw} still={still} ambient={ambient} />
      ) : kind === "inference" ? (
        <Inference kind={kind} draw={draw} still={still} ambient={ambient} />
      ) : (
        <Evaluation draw={draw} still={still} ambient={ambient} />
      )}
    </svg>
  );
}

type PartProps = {
  kind?: DiagramKind;
  draw: (delay: number, duration?: number) => Record<string, unknown>;
  still: boolean;
  ambient: boolean;
};

/** Versioned stages feeding a single tokenizer gate. */
function Pipeline({ kind, draw, still, ambient }: PartProps) {
  const stages = [0, 1, 2, 3];

  return (
    <>
      {stages.map((i) => {
        const y = 46 + i * 30;
        const width = 104 + i * 30;
        return (
          <g key={i}>
            <motion.rect
              x="38"
              y={y}
              width={width}
              height="14"
              rx="3"
              fill={`url(#rd-fill-${kind})`}
              fillOpacity={0.18 + i * 0.24}
              initial={still ? false : { opacity: 0, scaleX: 0.15 }}
              whileInView={still ? undefined : { opacity: 1, scaleX: 1 }}
              viewport={viewport}
              transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease }}
              style={{ transformOrigin: "38px center" }}
            />
            <motion.line
              x1={38 + width + 6}
              x2="242"
              y1={y + 7}
              y2={y + 7}
              stroke={LINE}
              strokeWidth="1"
              strokeDasharray="2 4"
              {...draw(0.35 + i * 0.08, 0.6)}
            />
          </g>
        );
      })}

      {/* Tokenizer gate. */}
      <motion.path
        d="M250 44C284 66 284 134 250 156"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        {...draw(0.5, 1.1)}
      />
      <motion.circle
        cx="258"
        cy="100"
        r="6"
        fill={ACCENT}
        animate={
          ambient ? { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] } : undefined
        }
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "258px 100px" }}
      />
      <motion.line
        x1="266"
        x2="302"
        y1="100"
        y2="100"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
        {...draw(0.95, 0.6)}
      />
    </>
  );
}

/** Weights on the left, a quantised runtime on the right. */
function Inference({ kind, draw, still, ambient }: PartProps) {
  return (
    <>
      <rect
        x="30"
        y="38"
        width="280"
        height="124"
        rx="6"
        stroke={LINE}
        strokeWidth="1.2"
      />

      <motion.rect
        x="52"
        y="60"
        width="86"
        height="80"
        rx="4"
        fill={`url(#rd-fill-${kind})`}
        fillOpacity="0.12"
        stroke={LINE}
        strokeWidth="1.2"
        initial={still ? false : { opacity: 0, x: -12 }}
        whileInView={still ? undefined : { opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.65, delay: 0.1, ease }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1="66"
          x2="124"
          y1={74 + i * 13}
          y2={74 + i * 13}
          stroke={ACCENT}
          strokeOpacity={0.75 - i * 0.1}
          strokeWidth="3"
          strokeLinecap="round"
          {...draw(0.25 + i * 0.06, 0.5)}
        />
      ))}

      <motion.path
        d="M144 100h48"
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
        {...draw(0.55, 0.6)}
      />
      {ambient ? (
        <motion.circle
          r="3"
          cy="100"
          fill={ACCENT}
          animate={{ cx: [146, 190], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.9 }}
        />
      ) : null}

      <motion.rect
        x="198"
        y="60"
        width="86"
        height="80"
        rx="4"
        fill="#FFFFFF"
        stroke={ACCENT}
        strokeWidth="1.6"
        initial={still ? false : { opacity: 0, x: 12 }}
        whileInView={still ? undefined : { opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.65, delay: 0.28, ease }}
      />
      {/* Quantised grid: fewer, coarser cells than the source weights. */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.rect
          key={i}
          x={212 + (i % 4) * 17}
          y={74 + Math.floor(i / 4) * 17}
          width="12"
          height="12"
          rx="2"
          fill={ACCENT}
          fillOpacity={i % 3 === 0 ? 0.75 : 0.22}
          initial={still ? false : { opacity: 0, scale: 0.3 }}
          whileInView={still ? undefined : { opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.03, ease }}
          style={{
            transformOrigin: `${218 + (i % 4) * 17}px ${80 + Math.floor(i / 4) * 17}px`,
          }}
        />
      ))}
    </>
  );
}

/** A measured curve against a flat reference — no axis labels claimed. */
function Evaluation({ draw, still, ambient }: PartProps) {
  const points: Array<[number, number]> = [
    [40, 150],
    [90, 138],
    [140, 142],
    [190, 106],
    [240, 92],
    [296, 62],
  ];

  return (
    <>
      <g stroke={LINE} strokeWidth="1.2">
        <line x1="40" x2="304" y1="164" y2="164" />
        <line x1="40" x2="40" y1="40" y2="164" />
      </g>
      {/* Gridlines give the curve something to be measured against. */}
      <g stroke={LINE} strokeWidth="1" strokeOpacity="0.45">
        {[70, 100, 130].map((y) => (
          <line key={y} x1="40" x2="304" y1={y} y2={y} strokeDasharray="2 5" />
        ))}
      </g>

      <motion.path
        d={`M${points.map(([x, y]) => `${x} ${y}`).join("L")}`}
        stroke={ACCENT}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(0.1, 1.3)}
      />
      <motion.path
        d="M40 122L90 118L140 121L190 119L240 114L296 117"
        stroke={INK}
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeDasharray="5 5"
        {...draw(0.3, 1.2)}
      />

      {points.slice(1).map(([x, y], index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={y}
          r="4"
          fill="#FFFFFF"
          stroke={ACCENT}
          strokeWidth="2"
          initial={still ? false : { opacity: 0, scale: 0 }}
          whileInView={still ? undefined : { opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.45, delay: 0.55 + index * 0.08, ease }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {ambient ? (
        <motion.circle
          cx="296"
          cy="62"
          r="7"
          stroke={ACCENT}
          strokeWidth="1.4"
          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "296px 62px" }}
        />
      ) : null}
    </>
  );
}
