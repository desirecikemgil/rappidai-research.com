"use client";

import { useAmbientEffects } from "@/components/motion/use-motion-tier";

/**
 * Legacy switch: true when ambient, continuously running effects are off.
 * Prefer `useMotionTier` in new code so `lite` devices keep their entrances.
 */
export function useReducedEffects() {
  return !useAmbientEffects();
}
