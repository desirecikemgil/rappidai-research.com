"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Pause decorative CSS motion whenever the scene or browser tab is hidden. */
export function MotionScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      element.dataset.running = String(
        visible && !document.hidden && !preference.matches,
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    preference.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      preference.removeEventListener("change", update);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`motion-scene ${className}`}
      data-running="false"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
