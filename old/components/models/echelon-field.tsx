"use client";

import { useEffect, useRef } from "react";
import styles from "./echelon.module.css";

/**
 * Echelon signal lattice: a fine grid that bends towards the pointer like a
 * gravity well, lights up around it, rings outwards on click and carries a
 * few signal pulses along its lines.
 *
 * A frame is one displaced grid path stroked a handful of times (base, pointer
 * light, ripples) plus the lit intersections — well under a millisecond. The
 * loop only runs while the hero is on screen, the tab is visible and the
 * visitor has not asked for reduced motion; it drops to half rate when idle.
 * Reduced motion gets one static frame; without JavaScript the CSS grid
 * carries the composition.
 */

const PULL = 22;
const RIPPLE_SPEED = 560;
const RIPPLE_LIFE = 1.7;
const RIPPLE_BAND = 70;
const PULSE_LIMIT = 5;

type Ripple = { x: number; y: number; start: number };
type Pulse = {
  horizontal: boolean;
  line: number;
  head: number;
  direction: 1 | -1;
  speed: number;
  length: number;
};
type Glow = { col: number; row: number; start: number };

export function EchelonField() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = ref.current;
    const canvas = canvasRef.current;
    const hero = element?.closest("section");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!element || !canvas || !hero || !context) return;
    const ctx = context;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let gap = 48;
    let sigma = 130;
    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let light = new Float32Array(0);
    const ripples: Ripple[] = [];
    const pulses: Pulse[] = [];
    const glows: Glow[] = [];

    let visible = false;
    let running = false;
    let interactive = false;
    let frame = 0;
    let previous = 0;
    let lastPointer = -Infinity;
    let lastPulse = 0;
    let lastGlow = 0;
    let skip = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false, strength: 0 };

    const random = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const index = (col: number, row: number) => row * cols + col;

    const resize = () => {
      const rect = element.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      gap = width < 640 ? 36 : width > 1700 ? 56 : 48;
      sigma = width < 900 ? 100 : 130;
      // One spare line on every side so displacement never exposes an edge.
      cols = Math.ceil(width / gap) + 3;
      rows = Math.ceil(height / gap) + 3;
      // Anchor a line on the horizontal centre and near the title.
      originX = ((width / 2) % gap) - gap;
      originY = ((height * 0.45) % gap) - gap;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const total = cols * rows;
      px = new Float32Array(total);
      py = new Float32Array(total);
      light = new Float32Array(total);
      pulses.length = 0;
      glows.length = 0;
      draw(performance.now());
    };

    /** Displace every intersection and work out how brightly it is lit. */
    const layout = (now: number) => {
      const reach2 = (sigma * 3) ** 2;
      const twoSigma2 = 2 * sigma * sigma;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = originX + col * gap;
          let y = originY + row * gap;
          let lit = 0;
          if (pointer.strength > 0.001) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const d2 = dx * dx + dy * dy;
            if (d2 < reach2) {
              const distance = Math.sqrt(d2) || 1;
              const falloff = Math.exp(-d2 / twoSigma2);
              // Peaks at one sigma and vanishes at the centre: no singularity.
              const pull =
                PULL * (distance / sigma) * falloff * 1.6487 * pointer.strength;
              x += (dx / distance) * pull;
              y += (dy / distance) * pull;
              lit = falloff * pointer.strength;
            }
          }
          for (const ripple of ripples) {
            const age = (now - ripple.start) / 1000;
            const life = 1 - age / RIPPLE_LIFE;
            if (life <= 0) continue;
            const dx = x - ripple.x;
            const dy = y - ripple.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const offset = distance - age * RIPPLE_SPEED;
            if (Math.abs(offset) > RIPPLE_BAND) continue;
            const weight = 1 - Math.abs(offset) / RIPPLE_BAND;
            const push =
              Math.sin((offset / RIPPLE_BAND) * Math.PI) * 9 * weight * life;
            x += (dx / distance) * push;
            y += (dy / distance) * push;
            lit = Math.max(lit, weight * life * 0.75);
          }
          const i = index(col, row);
          px[i] = x;
          py[i] = y;
          light[i] = lit;
        }
      }
    };

    const gridPath = () => {
      const path = new Path2D();
      for (let row = 0; row < rows; row++) {
        path.moveTo(px[index(0, row)], py[index(0, row)]);
        for (let col = 1; col < cols; col++)
          path.lineTo(px[index(col, row)], py[index(col, row)]);
      }
      for (let col = 0; col < cols; col++) {
        path.moveTo(px[index(col, 0)], py[index(col, 0)]);
        for (let row = 1; row < rows; row++)
          path.lineTo(px[index(col, row)], py[index(col, row)]);
      }
      return path;
    };

    const fillCell = (col: number, row: number, alpha: number) => {
      if (col < 0 || row < 0 || col >= cols - 1 || row >= rows - 1) return;
      const a = index(col, row);
      const b = index(col + 1, row);
      const c = index(col + 1, row + 1);
      const d = index(col, row + 1);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(px[a], py[a]);
      ctx.lineTo(px[b], py[b]);
      ctx.lineTo(px[c], py[c]);
      ctx.lineTo(px[d], py[d]);
      ctx.closePath();
      ctx.fill();
    };

    /** The point `t` intersections along a pulse's line, following its bend. */
    const along = (pulse: Pulse, t: number) => {
      const limit = (pulse.horizontal ? cols : rows) - 1;
      const clamped = Math.min(Math.max(t, 0), limit);
      const low = Math.floor(clamped);
      const high = Math.min(low + 1, limit);
      const mix = clamped - low;
      const at = (step: number) =>
        pulse.horizontal ? index(step, pulse.line) : index(pulse.line, step);
      return {
        x: px[at(low)] + (px[at(high)] - px[at(low)]) * mix,
        y: py[at(low)] + (py[at(high)] - py[at(low)]) * mix,
      };
    };

    function draw(now: number) {
      layout(now);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;

      // Faint cells bloom and fade: the lattice quietly at work.
      ctx.fillStyle = "#4f86ec";
      for (const glow of glows) {
        const phase = (now - glow.start) / 2400;
        if (phase < 1)
          fillCell(glow.col, glow.row, Math.sin(phase * Math.PI) * 0.07);
      }
      if (pointer.strength > 0.01) {
        fillCell(
          Math.floor((pointer.tx - originX) / gap),
          Math.floor((pointer.ty - originY) / gap),
          0.09 * pointer.strength,
        );
      }
      ctx.globalAlpha = 1;

      const path = gridPath();
      ctx.strokeStyle = "rgb(112 152 226 / 0.13)";
      ctx.stroke(path);

      if (pointer.strength > 0.01) {
        const s = pointer.strength;
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          sigma * 2.6,
        );
        glow.addColorStop(0, `rgb(206 226 255 / ${0.85 * s})`);
        glow.addColorStop(0.35, `rgb(128 175 255 / ${0.38 * s})`);
        glow.addColorStop(1, "rgb(128 175 255 / 0)");
        ctx.strokeStyle = glow;
        ctx.stroke(path);
      }
      for (const ripple of ripples) {
        const age = (now - ripple.start) / 1000;
        const life = 1 - age / RIPPLE_LIFE;
        if (life <= 0) continue;
        const radius = age * RIPPLE_SPEED;
        const ring = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          Math.max(0, radius - RIPPLE_BAND),
          ripple.x,
          ripple.y,
          radius + RIPPLE_BAND,
        );
        ring.addColorStop(0, "rgb(150 192 255 / 0)");
        ring.addColorStop(0.5, `rgb(170 205 255 / ${0.6 * life})`);
        ring.addColorStop(1, "rgb(150 192 255 / 0)");
        ctx.strokeStyle = ring;
        ctx.stroke(path);
      }

      // Signal pulses travel along the (bent) lines with a fading tail.
      ctx.lineCap = "round";
      ctx.lineWidth = 1.4;
      for (const pulse of pulses) {
        const tail = pulse.head - pulse.direction * pulse.length;
        const head = along(pulse, pulse.head);
        const start = along(pulse, tail);
        const trail = ctx.createLinearGradient(
          start.x,
          start.y,
          head.x,
          head.y,
        );
        trail.addColorStop(0, "rgb(150 195 255 / 0)");
        trail.addColorStop(1, "rgb(214 232 255 / 0.9)");
        ctx.strokeStyle = trail;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        if (pulse.direction > 0) {
          for (let step = Math.ceil(tail); step < pulse.head; step++) {
            const point = along(pulse, step);
            ctx.lineTo(point.x, point.y);
          }
        } else {
          for (let step = Math.floor(tail); step > pulse.head; step--) {
            const point = along(pulse, step);
            ctx.lineTo(point.x, point.y);
          }
        }
        ctx.lineTo(head.x, head.y);
        ctx.stroke();
        ctx.fillStyle = "rgb(226 238 255 / 0.95)";
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 1;

      // Intersections: quiet dots, a registration cross on every fourth line,
      // and brighter, larger points wherever the lattice is lit.
      const dots = new Path2D();
      const marks = new Path2D();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = index(col, row);
          if (col % 4 === 2 && row % 4 === 2) {
            marks.moveTo(px[i] - 4, py[i]);
            marks.lineTo(px[i] + 4, py[i]);
            marks.moveTo(px[i], py[i] - 4);
            marks.lineTo(px[i], py[i] + 4);
          } else {
            dots.rect(px[i] - 0.7, py[i] - 0.7, 1.4, 1.4);
          }
        }
      }
      ctx.fillStyle = "rgb(140 178 240 / 0.3)";
      ctx.fill(dots);
      ctx.strokeStyle = "rgb(150 188 245 / 0.34)";
      ctx.stroke(marks);

      ctx.fillStyle = "#e4efff";
      for (let i = 0; i < light.length; i++) {
        const lit = light[i];
        if (lit < 0.05) continue;
        ctx.globalAlpha = Math.min(1, 0.2 + lit * 0.8);
        ctx.beginPath();
        ctx.arc(px[i], py[i], 0.8 + lit * 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    const update = (dt: number, now: number) => {
      const ease = 1 - Math.exp(-dt / 90);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      pointer.strength +=
        ((pointer.active ? 1 : 0) - pointer.strength) *
        (1 - Math.exp(-dt / 280));

      for (let i = ripples.length - 1; i >= 0; i--)
        if ((now - ripples[i].start) / 1000 > RIPPLE_LIFE) ripples.splice(i, 1);

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.head += (pulse.direction * pulse.speed * dt) / 1000;
        const limit = (pulse.horizontal ? cols : rows) - 1;
        const tail = pulse.head - pulse.direction * pulse.length;
        if (
          (pulse.direction > 0 && tail > limit) ||
          (pulse.direction < 0 && tail < 0)
        )
          pulses.splice(i, 1);
      }
      if (now - lastPulse > 1400 && pulses.length < PULSE_LIMIT) {
        lastPulse = now + random(-500, 500);
        const horizontal = Math.random() < 0.55;
        const lines = horizontal ? rows : cols;
        const direction = Math.random() < 0.5 ? 1 : -1;
        pulses.push({
          horizontal,
          line: 1 + Math.floor(Math.random() * (lines - 2)),
          head: direction > 0 ? 0 : (horizontal ? cols : rows) - 1,
          direction,
          speed: random(3.5, 7),
          length: random(2.2, 3.6),
        });
      }

      for (let i = glows.length - 1; i >= 0; i--)
        if (now - glows[i].start > 2400) glows.splice(i, 1);
      if (now - lastGlow > 650) {
        lastGlow = now;
        glows.push({
          col: Math.floor(Math.random() * (cols - 1)),
          row: Math.floor(Math.random() * (rows - 1)),
          start: now,
        });
      }
    };

    const writePointerVars = () => {
      hero.style.setProperty("--field-x", (pointer.x / width).toFixed(4));
      hero.style.setProperty("--field-y", (pointer.y / height).toFixed(4));
      hero.style.setProperty("--field-px", `${pointer.x.toFixed(1)}px`);
      hero.style.setProperty("--field-py", `${pointer.y.toFixed(1)}px`);
      hero.style.setProperty("--field-on", pointer.strength.toFixed(3));
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const idle = now - lastPointer > 1600 && ripples.length === 0;
      // Passive pulses settle at half rate; interaction always gets full rate.
      skip = idle ? !skip : false;
      if (skip) return;
      const dt = previous ? Math.min(now - previous, 64) : 16;
      previous = now;
      update(dt, now);
      draw(now);
      if (pointer.strength > 0.001 || pointer.active) writePointerVars();
    };

    const localPoint = (event: PointerEvent | MouseEvent) => {
      const rect = element.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const point = localPoint(event);
      pointer.tx = point.x;
      pointer.ty = point.y;
      if (!pointer.active) {
        // Enter from the pointer's position instead of sliding in from 0,0.
        if (pointer.strength < 0.02) {
          pointer.x = point.x;
          pointer.y = point.y;
        }
        pointer.active = true;
      }
      lastPointer = performance.now();
    };
    const leave = () => {
      pointer.active = false;
      lastPointer = performance.now();
    };
    const click = (event: MouseEvent) => {
      const point = localPoint(event);
      if (ripples.length > 2) ripples.shift();
      ripples.push({ ...point, start: performance.now() });
      lastPointer = performance.now();
    };

    const start = () => {
      if (!frame) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    };
    const resetPointer = () => {
      pointer.active = false;
      pointer.strength = 0;
      ripples.length = 0;
      for (const name of ["x", "y", "px", "py", "on"])
        hero.style.removeProperty(`--field-${name}`);
    };

    const sync = () => {
      const nextRunning = visible && !document.hidden && !reduced.matches;
      const nextInteractive = nextRunning && finePointer.matches;
      if (nextInteractive !== interactive) {
        interactive = nextInteractive;
        if (interactive) {
          hero.addEventListener("pointermove", move, { passive: true });
          hero.addEventListener("pointerleave", leave, { passive: true });
        } else {
          hero.removeEventListener("pointermove", move);
          hero.removeEventListener("pointerleave", leave);
        }
      }
      if (nextRunning !== running) {
        running = nextRunning;
        if (running) {
          hero.addEventListener("click", click, { passive: true });
          start();
        } else {
          hero.removeEventListener("click", click);
          stop();
          resetPointer();
          pulses.length = 0;
          glows.length = 0;
          draw(performance.now());
        }
      }
      element.dataset.running = String(running);
      element.dataset.interactive = String(interactive);
    };

    let resizeFrame = 0;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width: nextWidth, height: nextHeight } = entry.contentRect;
      // Skip the initial notification and sub-pixel jitter.
      if (Math.round(nextWidth) === width && Math.round(nextHeight) === height)
        return;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    });
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });

    resize();
    element.dataset.ready = "true";
    resizeObserver.observe(element);
    visibility.observe(hero);
    reduced.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      visibility.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("click", click);
      reduced.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      resetPointer();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.field}
      data-testid="echelon-field"
      data-running="false"
      data-interactive="false"
      aria-hidden="true"
    >
      <div className={styles.fieldBase} />
      <canvas ref={canvasRef} className={styles.fieldCanvas} />
      <div className={styles.fieldSpot} />
      <div className={styles.fieldVeil} />
      <div className={styles.grain} />
    </div>
  );
}
