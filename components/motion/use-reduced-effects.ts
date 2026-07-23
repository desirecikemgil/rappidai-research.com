"use client";

import { useSyncExternalStore } from "react";

const reducedEffectsQuery =
  "(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse), (max-width: 700px)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedEffectsQuery);
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(reducedEffectsQuery).matches;
}

function getServerSnapshot() {
  return true;
}

export function useReducedEffects() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
