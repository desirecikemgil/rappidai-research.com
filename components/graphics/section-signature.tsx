"use client";

import { motion } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";

const glide = [0.16, 1, 0.3, 1] as const;

/**
 * One small motif per resource page, so eight pages that share a layout stop
 * looking like the same page. Each is a 120×120 line drawing on the same grid,
 * which keeps them a family rather than a set of unrelated icons.
 */
export type SignatureKind =
  | "publications"
  | "reproducibility"
  | "data"
  | "responsible"
  | "licensing"
  | "status"
  | "faq"
  | "directory";

const stroke = { stroke: "#126BFF", strokeWidth: 1.4, fill: "none" } as const;
const faint = { stroke: "#C5D2E4", strokeWidth: 1, fill: "none" } as const;

export function SectionSignature({
  kind,
  className = "",
}: {
  kind: SignatureKind;
  className?: string;
}) {
  const tier = useMotionTier();
  const still = tier === "off";

  const draw = (delay: number) => ({
    initial: still ? false : { pathLength: 0, opacity: 0 },
    whileInView: still ? undefined : { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 } as const,
    transition: { duration: 0.9, delay, ease: glide },
  });

  return (
    <svg
      viewBox="0 0 120 120"
      className={`section-signature ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <g {...faint}>
        {[24, 48, 72, 96].map((v) => (
          <line key={`g${v}`} x1={v} x2={v} y1="16" y2="104" opacity="0.5" />
        ))}
      </g>
      {renderKind(kind, stroke, draw)}
    </svg>
  );
}

type DrawFactory = (delay: number) => Record<string, unknown>;

function renderKind(kind: SignatureKind, s: typeof stroke, draw: DrawFactory) {
  switch (kind) {
    case "publications":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={22 + i * 6}
              y={28 + i * 12}
              width="60"
              height="30"
              rx="3"
              {...s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1 - i * 0.28, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: glide }}
            />
          ))}
        </>
      );
    case "reproducibility":
      return (
        <>
          <motion.path
            d="M34 44a26 26 0 1 1 6 34"
            strokeLinecap="round"
            {...s}
            {...draw(0)}
          />
          <motion.path
            d="M40 62l-6 16 16-4"
            strokeLinecap="round"
            {...s}
            {...draw(0.35)}
          />
        </>
      );
    case "data":
      return (
        <>
          <motion.path
            d="M24 40h30l12 20h30"
            strokeLinecap="round"
            {...s}
            {...draw(0)}
          />
          <motion.path
            d="M24 80h30l12-20"
            strokeLinecap="round"
            {...s}
            {...draw(0.2)}
          />
          <motion.circle cx="96" cy="60" r="5" {...s} {...draw(0.5)} />
        </>
      );
    case "responsible":
      return (
        <>
          <motion.path
            d="M60 22l30 12v22c0 20-13 34-30 42-17-8-30-22-30-42V34z"
            {...s}
            {...draw(0)}
          />
          <motion.path
            d="M48 62l9 9 18-18"
            strokeLinecap="round"
            {...s}
            {...draw(0.45)}
          />
        </>
      );
    case "licensing":
      return (
        <>
          <motion.rect
            x="30"
            y="26"
            width="52"
            height="66"
            rx="4"
            {...s}
            {...draw(0)}
          />
          <motion.path
            d="M42 46h28M42 58h28M42 70h16"
            strokeLinecap="round"
            {...s}
            {...draw(0.25)}
          />
          <motion.circle cx="86" cy="82" r="12" {...s} {...draw(0.5)} />
        </>
      );
    case "status":
      return (
        <>
          <motion.path
            d="M22 84l20-14 18 8 20-26 18 12"
            strokeLinecap="round"
            {...s}
            {...draw(0)}
          />
          {[42, 60, 80].map((x, i) => (
            <motion.circle
              key={x}
              cx={x}
              cy={[70, 78, 52][i]}
              r="3.4"
              fill="#126BFF"
              stroke="none"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              style={{ transformOrigin: `${x}px ${[70, 78, 52][i]}px` }}
            />
          ))}
        </>
      );
    case "faq":
      return (
        <>
          <motion.path
            d="M28 34h48a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H50l-14 12V76h-8a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z"
            {...s}
            {...draw(0)}
          />
          <motion.path
            d="M48 52a8 8 0 1 1 10 8v6"
            strokeLinecap="round"
            {...s}
            {...draw(0.4)}
          />
        </>
      );
    case "directory":
    default:
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={26 + (i % 2) * 36}
              y={30 + Math.floor(i / 2) * 34}
              width="32"
              height="26"
              rx="3"
              {...s}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            />
          ))}
        </>
      );
  }
}
