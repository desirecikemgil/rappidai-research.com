"use client";

import { useEffect } from "react";

export function InteractiveAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        const xRatio = event.clientX / window.innerWidth - 0.5;
        const yRatio = event.clientY / window.innerHeight - 0.5;
        root.style.setProperty("--pointer-shift-x", `${xRatio * -18}px`);
        root.style.setProperty("--pointer-shift-y", `${yRatio * -14}px`);
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="interactive-atmosphere" aria-hidden="true">
      <div className="atmosphere-orb atmosphere-orb-a" />
      <div className="atmosphere-orb atmosphere-orb-b" />
      <div className="atmosphere-orb atmosphere-orb-c" />
      <div className="pointer-aura" />
      <div className="atmosphere-grain" />
    </div>
  );
}
