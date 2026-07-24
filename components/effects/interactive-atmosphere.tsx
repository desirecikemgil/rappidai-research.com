"use client";

import { useEffect } from "react";

export function InteractiveAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedEffects = window.matchMedia(
      "(hover: none), (pointer: coarse), (max-width: 700px)",
    ).matches;
    let pointerFrame = 0;
    let scrollFrame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;

    const renderPointer = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      root.style.setProperty("--pointer-x", `${currentX}px`);
      root.style.setProperty("--pointer-y", `${currentY}px`);
      const xRatio = currentX / window.innerWidth - 0.5;
      const yRatio = currentY / window.innerHeight - 0.5;
      root.style.setProperty("--pointer-shift-x", `${xRatio * -16}px`);
      root.style.setProperty("--pointer-shift-y", `${yRatio * -12}px`);

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        pointerFrame = requestAnimationFrame(renderPointer);
      } else {
        pointerFrame = 0;
      }
    };

    const updatePointer = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(renderPointer);
    };

    const updateScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        const scrollable = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
        root.style.setProperty("--scroll-progress", progress.toFixed(4));
        root.style.setProperty(
          "--scroll-parallax-y",
          reducedMotion
            ? "0px"
            : `${Math.max(window.scrollY * -0.055, -150)}px`,
        );
        scrollFrame = 0;
      });
    };

    if (finePointer && !reducedMotion) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
    }
    if (!reducedEffects) {
      window.addEventListener("scroll", updateScroll, { passive: true });
      updateScroll();
    }

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      if (!reducedEffects) window.removeEventListener("scroll", updateScroll);
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <div className="interactive-atmosphere" aria-hidden="true">
      <div className="atmosphere-wash atmosphere-wash-a" />
      <div className="atmosphere-wash atmosphere-wash-b" />
      <div className="atmosphere-lens atmosphere-lens-a" />
      <div className="atmosphere-lens atmosphere-lens-b" />
      <div className="atmosphere-lens atmosphere-lens-c" />
      <div className="atmosphere-lens atmosphere-lens-d" />
      <div className="atmosphere-lens atmosphere-lens-e" />
      <svg
        className="atmosphere-flow"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          className="flow-line flow-line-a"
          d="M-80 690C250 430 460 760 745 454C994 188 1185 392 1510 122"
        />
        <path
          className="flow-line flow-line-b"
          d="M-120 790C258 532 485 850 794 542C1040 296 1240 468 1520 236"
        />
        <path
          className="flow-line flow-line-c"
          d="M175 -70C350 200 215 376 485 525C738 665 894 470 1125 672C1265 795 1380 770 1510 706"
        />
        <circle className="flow-node flow-node-a" cx="746" cy="454" r="3" />
        <circle className="flow-node flow-node-b" cx="1185" cy="392" r="2.5" />
        <circle className="flow-node flow-node-c" cx="485" cy="525" r="2.5" />
      </svg>
      <div className="pointer-aura" />
      <div className="atmosphere-grain" />
    </div>
  );
}
