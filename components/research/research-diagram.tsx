"use client";

import { motion } from "framer-motion";
import { useReducedEffects } from "@/components/motion/use-reduced-effects";

type DiagramKind = "pipeline" | "inference" | "evaluation";

const viewport = { once: true, amount: 0.45 } as const;
const ease = [0.16, 1, 0.3, 1] as const;

export function ResearchDiagram({ kind }: { kind: DiagramKind }) {
  const reduceMotion = useReducedEffects();

  if (kind === "pipeline") {
    return (
      <motion.svg
        viewBox="0 0 320 180"
        className="research-diagram h-auto w-full"
        fill="none"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.7 }}
      >
        <motion.g
          stroke="#C8D6E9"
          strokeWidth="1"
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease }}
        >
          {[42, 88, 134, 180, 226].map((x) => (
            <line key={x} x1={x} x2={x} y1="44" y2="136" />
          ))}
        </motion.g>
        {[48, 76, 104, 132].map((y, index) => (
          <motion.rect
            key={y}
            x="34"
            y={y}
            width={156 + index * 22}
            height="9"
            fill={index === 2 ? "#126BFF" : "#EAF2FF"}
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0.12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.85, delay: 0.12 + index * 0.08, ease }}
            style={{ transformOrigin: "34px center" }}
          />
        ))}
        <motion.path
          d="M245 48C278 64 278 116 245 132"
          stroke="#126BFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 1.1, delay: 0.36, ease }}
        />
        <motion.circle
          cx="250"
          cy="90"
          r="4"
          fill="#126BFF"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.55, 1], opacity: [0.62, 1, 0.62] }
          }
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "250px 90px" }}
        />
      </motion.svg>
    );
  }

  if (kind === "inference") {
    return (
      <motion.svg
        viewBox="0 0 320 180"
        className="research-diagram h-auto w-full"
        fill="none"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        viewport={viewport}
        transition={{ duration: 0.85, ease }}
      >
        <rect x="56" y="42" width="208" height="96" stroke="#BFD0E7" />
        <motion.rect
          x="76"
          y="62"
          width="68"
          height="56"
          fill="#EAF2FF"
          stroke="#C8D6E9"
          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        />
        <motion.rect
          x="176"
          y="62"
          width="68"
          height="56"
          fill="#FFFFFF"
          stroke="#126BFF"
          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: 0.24, ease }}
        />
        {[0, 1, 2, 3].map((index) => (
          <motion.line
            key={index}
            x1={92}
            x2={128}
            y1={76 + index * 10}
            y2={76 + index * 10}
            stroke="#7EA8E8"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={
              reduceMotion ? undefined : { pathLength: 1, opacity: 1 }
            }
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.06, ease }}
          />
        ))}
        <motion.path
          d="M145 90H174"
          stroke="#126BFF"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.65, delay: 0.52, ease }}
        />
        <motion.circle
          cx="210"
          cy="90"
          r="13"
          stroke="#126BFF"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.68, 1, 0.68] }
          }
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "210px 90px" }}
        />
        <circle cx="210" cy="90" r="3" fill="#126BFF" />
      </motion.svg>
    );
  }

  return (
    <motion.svg
      viewBox="0 0 320 180"
      className="research-diagram h-auto w-full"
      fill="none"
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.7 }}
    >
      <motion.g
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <line x1="48" x2="272" y1="132" y2="132" stroke="#BFD0E7" />
        <line x1="48" x2="48" y1="42" y2="132" stroke="#BFD0E7" />
      </motion.g>
      <motion.path
        d="M48 112L94 102L138 108L182 76L226 68L272 48"
        stroke="#126BFF"
        strokeWidth="1.6"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 1.25, delay: 0.12, ease }}
      />
      <motion.path
        d="M48 92L94 86L138 90L182 88L226 81L272 86"
        stroke="#061E46"
        strokeWidth="1.2"
        strokeDasharray="4 5"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        whileInView={
          reduceMotion ? undefined : { pathLength: 1, opacity: 0.72 }
        }
        viewport={viewport}
        transition={{ duration: 1.15, delay: 0.28, ease }}
      />
      {[94, 138, 182, 226, 272].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={[102, 108, 76, 68, 48][index]}
          r="3.2"
          fill="#126BFF"
          initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.46 + index * 0.08, ease }}
          style={{
            transformOrigin: `${x}px ${[102, 108, 76, 68, 48][index]}px`,
          }}
        />
      ))}
    </motion.svg>
  );
}
