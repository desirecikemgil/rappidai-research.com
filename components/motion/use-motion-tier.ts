"use client";

import { useSyncExternalStore } from "react";

/**
 * Three motion tiers instead of the previous on/off switch.
 *
 * - `full`  desktop pointer devices: parallax, ambient loops, pointer effects
 * - `lite`  touch and narrow viewports: entrance reveals and press states stay,
 *           but nothing loops forever and nothing tracks scroll per frame
 * - `off`   the visitor asked for reduced motion
 *
 * The old behaviour collapsed `lite` into `off`, which left phones with a
 * completely static page. Keep the tiers separate so mobile still breathes.
 */
export type MotionTier = "full" | "lite" | "off";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const liteQuery = "(hover: none), (pointer: coarse), (max-width: 700px)";

function subscribe(callback: () => void) {
  const reduced = window.matchMedia(reducedMotionQuery);
  const lite = window.matchMedia(liteQuery);

  reduced.addEventListener("change", callback);
  lite.addEventListener("change", callback);

  return () => {
    reduced.removeEventListener("change", callback);
    lite.removeEventListener("change", callback);
  };
}

function getSnapshot(): MotionTier {
  if (window.matchMedia(reducedMotionQuery).matches) return "off";
  if (window.matchMedia(liteQuery).matches) return "lite";
  return "full";
}

/**
 * Server render settles every element in its final state so the page is
 * complete without JavaScript. The client upgrades on hydration.
 */
function getServerSnapshot(): MotionTier {
  return "off";
}

export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when animation should not run at all. */
export function useReducedMotion(): boolean {
  return useMotionTier() === "off";
}

/**
 * True when heavyweight, continuously running effects should be skipped:
 * scroll parallax, infinite loops, per-frame pointer tracking.
 */
export function useAmbientEffects(): boolean {
  return useMotionTier() === "full";
}
