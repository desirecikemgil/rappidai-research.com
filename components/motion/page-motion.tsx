"use client";

import { useEffect, useRef } from "react";

const targets = [
  ".studio-section-heading",
  "[data-reveal]",
  ".tool-showcase-card",
  ".model-index-row",
  ".resource-directory-row",
  ".css-reveal",
].join(",");

/**
 * One observer per route. Content is never hidden before it is observed:
 * elements below the fold rise in once (10px / 420ms) as they arrive, and
 * children of `[data-stagger]` follow in a short cascade.
 */
export function PageMotion({ pathname }: { pathname: string }) {
  const previousPath = useRef(pathname);

  useEffect(() => {
    const main = document.getElementById("main-content");
    const changed = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (!main) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const animate = (
      element: Element,
      distance: number,
      duration: number,
      delay = 0,
    ) => {
      if (preference.matches || document.hidden) return;
      const animation = element.animate(
        [
          { opacity: 0, transform: `translateY(${distance}px)` },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };

    // Only the incoming introduction moves. Navigation never waits for an exit.
    const intro = main.querySelector(
      ".page-intro-main, .echelon-hero-content, .model-hero, .studio-article > header",
    );
    if (changed && intro) animate(intro, 4, 220);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target;
          if (element.hasAttribute("data-stagger")) {
            Array.from(element.children).forEach((child, index) =>
              animate(child, 10, 420, Math.min(index, 8) * 55),
            );
          } else {
            animate(element, 10, 420);
          }
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    for (const element of main.querySelectorAll(`${targets},[data-stagger]`)) {
      // Avoid nested motion, long blocks and anything already on screen.
      if (
        element.parentElement?.closest(`${targets},[data-stagger]`) ||
        element.closest(".page-intro")
      )
        continue;
      const rect = element.getBoundingClientRect();
      if (
        rect.top < window.innerHeight ||
        (rect.height > window.innerHeight * 1.2 &&
          !element.hasAttribute("data-stagger")) ||
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
