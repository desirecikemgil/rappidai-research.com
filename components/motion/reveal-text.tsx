"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useMotionTier } from "@/components/motion/use-motion-tier";

const glide = [0.16, 1, 0.3, 1] as const;

type RevealTextProps = {
  /** Pre-split lines. Each renders as its own masked block. */
  lines: readonly string[];
  className?: string;
  delay?: number;
  step?: number;
};

/**
 * Line-wise mask reveal for display headlines: each line rises out from behind
 * its own edge instead of fading in place.
 *
 * Deliberately splits by line and not by character. Per-character wrappers
 * break text selection, copy/paste and how screen readers announce the
 * heading, and at display sizes the effect is not worth that cost.
 */
export function RevealText({
  lines,
  className = "",
  delay = 0,
  step = 0.08,
}: RevealTextProps) {
  const tier = useMotionTier();

  const container: Variants = {
    hidden: {},
    visible: {
      transition:
        tier === "off"
          ? { staggerChildren: 0, delayChildren: 0 }
          : {
              staggerChildren: tier === "lite" ? step * 0.7 : step,
              delayChildren: delay,
            },
    },
  };

  const line: Variants = {
    hidden: { y: "108%" },
    visible: {
      y: "0%",
      transition:
        tier === "off"
          ? { duration: 0 }
          : { duration: tier === "lite" ? 0.72 : 0.95, ease: glide },
    },
  };

  return (
    <motion.span
      className={`reveal-text ${className}`}
      initial={tier === "off" ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      {lines.map((text) => (
        <span key={text} className="reveal-text-mask">
          <motion.span className="reveal-text-line" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
