"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Travel in pixels across the element's full pass through the viewport.
   * Negative moves against the scroll direction. Keep it under ~80 — beyond
   * that the effect stops reading as depth and starts reading as a gimmick.
   */
  distance?: number;
  className?: string;
};

/**
 * Scroll-linked depth. Transform only, so it never triggers layout, and it is
 * spring-smoothed so a trackpad flick does not snap it into place.
 *
 * Skipped entirely below the `full` tier: per-frame scroll work is exactly
 * what a phone should not be doing.
 */
export function Parallax({
  children,
  distance = -40,
  className,
}: ParallaxProps) {
  const tier = useMotionTier();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance / 2, distance / 2],
  );
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.35 });

  if (tier !== "full") {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
