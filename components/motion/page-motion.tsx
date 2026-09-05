"use client";

import { useEffect, useRef } from "react";

const targets = [
  ".studio-section-heading",
  ".product-feature",
  ".approach-principles article",
  ".journal-feature",
  ".journal-aside article",
  ".tool-showcase-card",
  ".model-index-row",
  ".resource-directory-row",
  ".css-reveal",
].join(",");

/** One observer per route; no scroll handlers, hidden content or render loop. */
export function PageMotion({ pathname }: { pathname: string }) {
  const previousPath = useRef(pathname);

  useEffect(() => {
    const main = document.getElementById("main-content");
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!main) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const animate = (element: Element, distance: number, duration: number) => {
      if (preference.matches || document.hidden) return;
      const animation = element.animate(
        [
          { transform: `translateY(${distance}px)` },
          { transform: "translateY(0)" },
        ],
        { duration, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };

    // Only the incoming introduction moves. Navigation never waits for an exit.
    const intro = main.querySelector(
      ".page-intro-main, .brand-hero-shell, .model-hero, .studio-article > header",
    );
    if (changed && intro) animate(intro, 4, 220);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          animate(entry.target, 10, 420);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    for (const element of main.querySelectorAll(targets)) {
      // Avoid nested motion, long documents, and anything already on screen.
      if (
        element.parentElement?.closest(targets) ||
        element.closest(".page-intro-liquid")
      )
        continue;
      const rect = element.getBoundingClientRect();
      if (
        rect.top < window.innerHeight ||
        rect.height > window.innerHeight ||
        rect.height === 0
      )
        continue;
      observer.observe(element);
    }

    const cancel = () => {
      if (!preference.matches && !document.hidden) return;
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    preference.addEventListener("change", cancel);
    document.addEventListener("visibilitychange", cancel);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
  }, [pathname]);

  return null;
}
