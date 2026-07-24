"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";

/**
 * Cross-fades between routes so navigation resolves instead of snapping.
 *
 * `mode="wait"` would hold the old page while the new one waits, which delays
 * first paint on a content site; the pages overlap for a moment instead.
 */
export function PageTransition({
  routeKey,
  children,
}: {
  routeKey: string;
  children: ReactNode;
}) {
  const tier = useMotionTier();

  if (tier === "off") {
    return <>{children}</>;
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
