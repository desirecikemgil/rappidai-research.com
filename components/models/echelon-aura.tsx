"use client";

import { useEffect, useRef } from "react";
import styles from "./echelon.module.css";

/** Local pointer enhancement: no React renders, scroll listener or idle RAF. */
export function EchelonAura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const hero = element?.closest("section");
    if (!element || !hero) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let listening = false;
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let previousTime = 0;

    const paint = () => {
      element.style.setProperty("--aura-x", `${x.toFixed(2)}px`);
      element.style.setProperty("--aura-y", `${y.toFixed(2)}px`);
    };
    const tick = (time: number) => {
      const delta = previousTime ? Math.min(time - previousTime, 64) : 16;
      previousTime = time;
      const ease = 1 - Math.exp(-delta / 160);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.05;
      if (settled) {
        x = targetX;
        y = targetY;
      }
      paint();
      frame = settled ? 0 : requestAnimationFrame(tick);
      if (settled) previousTime = 0;
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 44;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 28;
      start();
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = previousTime = x = y = targetX = targetY = 0;
      paint();
    };
    const update = () => {
      const running = visible && !document.hidden && !reduced.matches;
      const interactive = running && pointer.matches;
      element.dataset.running = String(running);
      element.dataset.interactive = String(interactive);
      if (interactive === listening) return;
      listening = interactive;
      if (interactive) {
        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", leave, { passive: true });
      } else {
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", leave);
        stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(hero);
    reduced.addEventListener("change", update);
    pointer.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      stop();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.aura}
      data-testid="echelon-aura"
      data-running="false"
      data-interactive="false"
      aria-hidden="true"
    >
      <div className={styles.lightField} />
      <div className={styles.orbitShift}>
        <div className={styles.orbit}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.horizon} />
      <div className={styles.grain} />
    </div>
  );
}
