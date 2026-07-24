"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useCallback, useRef } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";

/**
 * Writes the pointer's position inside an element as `--mx` / `--my`, plus a
 * `--glow` intensity that fades in and out. CSS picks these up to move the
 * specular highlight on glass surfaces so it tracks the cursor.
 *
 * Values are written straight to the node's style, never through React state:
 * a pointermove handler must not re-render.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef(0);
  const enabled = useMotionTier() === "full";

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (!enabled) return;
      const node = ref.current;
      if (!node || frame.current) return;

      const { clientX, clientY } = event;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const rect = node.getBoundingClientRect();
        node.style.setProperty(
          "--mx",
          `${((clientX - rect.left) / rect.width) * 100}%`,
        );
        node.style.setProperty(
          "--my",
          `${((clientY - rect.top) / rect.height) * 100}%`,
        );
      });
    },
    [enabled],
  );

  const onPointerEnter = useCallback(() => {
    if (!enabled) return;
    ref.current?.style.setProperty("--glow", "1");
  }, [enabled]);

  const onPointerLeave = useCallback(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--glow", "0");
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
  }, [enabled]);

  return { ref, enabled, onPointerMove, onPointerEnter, onPointerLeave };
}

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a slight tilt toward the cursor. Off by default — use it sparingly. */
  tilt?: boolean;
};

/**
 * A glass surface whose highlight follows the cursor, with an optional tilt
 * capped at 1.6°. The cap matters: past roughly two degrees the card reads as
 * a toy rather than as a considered surface.
 */
export function GlowCard({
  children,
  className = "",
  tilt = false,
}: GlowCardProps) {
  const { ref, enabled, onPointerMove, onPointerEnter, onPointerLeave } =
    usePointerGlow<HTMLDivElement>();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.3 };
  const rotateX = useSpring(useTransform(py, [0, 1], [1.6, -1.6]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-1.6, 1.6]), spring);

  const tilting = tilt && enabled;

  return (
    <motion.div
      ref={ref}
      className={`glow-surface ${className}`}
      style={
        tilting ? { rotateX, rotateY, transformPerspective: 1200 } : undefined
      }
      onPointerEnter={onPointerEnter}
      onPointerMove={(event) => {
        onPointerMove(event);
        if (!tilting) return;
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        onPointerLeave();
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}

type MagneticProps = {
  children: ReactNode;
  /** Maximum offset in pixels. Kept deliberately small. */
  strength?: number;
  className?: string;
};

/**
 * Nudges an element a few pixels toward the cursor while it is nearby.
 *
 * The default strength of 4px is the whole point: enough that a button feels
 * alive under the hand, small enough that the click target never runs away
 * from the pointer.
 */
export function Magnetic({ children, strength = 4, className }: MagneticProps) {
  const tier = useMotionTier();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const config = { stiffness: 260, damping: 22, mass: 0.28 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);

  if (tier !== "full") {
    return <span className={`inline-flex ${className ?? ""}`}>{children}</span>;
  }

  return (
    <motion.span
      className={`inline-flex ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        x.set(dx * strength * 2);
        y.set(dy * strength * 2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
