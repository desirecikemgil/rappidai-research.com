"use client";

import { useEffect, useRef } from "react";

const nodes = [
  [86, 138],
  [236, 84],
  [340, 212],
  [474, 116],
  [590, 260],
  [704, 142],
  [820, 326],
  [954, 174],
  [1088, 286],
  [1228, 126],
  [1362, 240],
  [180, 420],
  [350, 520],
  [530, 408],
  [702, 570],
  [886, 468],
  [1058, 590],
  [1238, 452],
  [1380, 610],
] as const;

const links = [
  "M86 138C150 106 190 94 236 84",
  "M236 84C278 120 304 170 340 212",
  "M340 212C390 164 428 132 474 116",
  "M474 116C524 154 552 210 590 260",
  "M590 260C628 212 660 172 704 142",
  "M704 142C752 188 782 270 820 326",
  "M820 326C862 272 906 206 954 174",
  "M954 174C1008 196 1048 250 1088 286",
  "M1088 286C1136 224 1178 164 1228 126",
  "M1228 126C1280 154 1324 204 1362 240",
  "M86 138C102 252 130 352 180 420",
  "M180 420C236 454 286 492 350 520",
  "M340 212C386 306 448 368 530 408",
  "M530 408C582 460 636 526 702 570",
  "M590 260C674 314 756 398 886 468",
  "M886 468C942 506 994 554 1058 590",
  "M820 326C940 342 1104 378 1238 452",
  "M1238 452C1290 500 1338 552 1380 610",
  "M350 520C480 492 584 500 702 570",
  "M702 570C824 540 930 548 1058 590",
  "M1058 590C1172 566 1274 574 1380 610",
] as const;

export function HeroNetworkBackdrop() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const hero = layer?.parentElement;
    const context = canvas?.getContext("2d");
    if (!layer || !canvas || !hero || !context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const interactive = !reducedMotion && finePointer;

    let frame = 0;
    let width = 0;
    let height = 0;
    let pointerX = 0.72;
    let pointerY = 0.32;
    let targetX = pointerX;
    let targetY = pointerY;
    let strength = 0;
    let targetStrength = 0;

    const warpPoint = (x: number, y: number) => {
      if (!interactive || strength < 0.002) return [x, y] as const;

      const cursorX = pointerX * width;
      const cursorY = pointerY * height;
      const dx = cursorX - x;
      const dy = cursorY - y;
      const distance = Math.hypot(dx, dy);
      const radius = Math.min(350, Math.max(220, width * 0.24));

      if (distance >= radius) return [x, y] as const;

      const normalized = 1 - distance / radius;
      const influence =
        normalized * normalized * (3 - 2 * normalized) * strength;
      const pull = 0.34 * influence;
      const curl = Math.sin(normalized * Math.PI) * influence * 8;
      const denominator = Math.max(distance, 1);

      return [
        x + dx * pull - (dy / denominator) * curl,
        y + dy * pull + (dx / denominator) * curl,
      ] as const;
    };

    const drawGrid = () => {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const spacing = width < 700 ? 52 : 72;
      const sample = width < 700 ? 20 : 18;
      const offsetX = ((width / 2) % spacing) - spacing;
      const offsetY = ((height / 2) % spacing) - spacing;

      context.beginPath();

      for (let x = offsetX; x <= width + spacing; x += spacing) {
        for (let y = -sample; y <= height + sample; y += sample) {
          const [warpedX, warpedY] = warpPoint(x, y);
          if (y === -sample) context.moveTo(warpedX, warpedY);
          else context.lineTo(warpedX, warpedY);
        }
      }

      for (let y = offsetY; y <= height + spacing; y += spacing) {
        for (let x = -sample; x <= width + sample; x += sample) {
          const [warpedX, warpedY] = warpPoint(x, y);
          if (x === -sample) context.moveTo(warpedX, warpedY);
          else context.lineTo(warpedX, warpedY);
        }
      }

      context.lineWidth = width < 700 ? 0.7 : 0.9;
      context.strokeStyle = "rgba(12, 62, 138, 0.17)";
      context.stroke();
    };

    const render = () => {
      pointerX += (targetX - pointerX) * 0.18;
      pointerY += (targetY - pointerY) * 0.18;
      strength += (targetStrength - strength) * 0.16;

      layer.style.setProperty("--hero-pointer-x", `${pointerX * 100}%`);
      layer.style.setProperty("--hero-pointer-y", `${pointerY * 100}%`);
      layer.style.setProperty("--hero-network-x", `${(pointerX - 0.5) * 28}px`);
      layer.style.setProperty("--hero-network-y", `${(pointerY - 0.5) * 20}px`);
      layer.style.setProperty("--hero-grid-x", `${(pointerX - 0.5) * -22}px`);
      layer.style.setProperty("--hero-grid-y", `${(pointerY - 0.5) * -16}px`);
      layer.style.setProperty(
        "--hero-grid-tilt-x",
        `${(0.5 - pointerY) * 2.4}deg`,
      );
      layer.style.setProperty(
        "--hero-grid-tilt-y",
        `${(pointerX - 0.5) * 3.2}deg`,
      );
      drawGrid();

      const unsettled =
        Math.abs(targetX - pointerX) > 0.001 ||
        Math.abs(targetY - pointerY) > 0.001 ||
        Math.abs(targetStrength - strength) > 0.004;

      frame = unsettled ? requestAnimationFrame(render) : 0;
    };

    const update = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      targetX = Math.min(
        Math.max((event.clientX - bounds.left) / bounds.width, 0),
        1,
      );
      targetY = Math.min(
        Math.max((event.clientY - bounds.top) / bounds.height, 0),
        1,
      );
      targetStrength = 1;
      layer.dataset.warp = "active";
      if (!frame) frame = requestAnimationFrame(render);
    };

    const reset = () => {
      targetX = 0.72;
      targetY = 0.32;
      targetStrength = 0;
      layer.dataset.warp = "idle";
      if (!frame) frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawGrid();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    resize();

    if (interactive) {
      hero.addEventListener("pointermove", update, { passive: true });
      hero.addEventListener("pointerleave", reset, { passive: true });
    }

    layer.dataset.warp = "idle";
    render();

    return () => {
      resizeObserver.disconnect();
      if (interactive) {
        hero.removeEventListener("pointermove", update);
        hero.removeEventListener("pointerleave", reset);
      }
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layerRef} className="hero-network" aria-hidden="true">
      <div className="hero-network-grid" />
      <canvas ref={canvasRef} className="hero-network-warp-grid" />
      <svg
        className="hero-network-map"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="hero-network-links">
          {links.map((path, index) => (
            <path
              key={path}
              d={path}
              className={`hero-network-link hero-network-link-${(index % 3) + 1}`}
            />
          ))}
        </g>
        <g className="hero-network-nodes">
          {nodes.map(([cx, cy], index) => (
            <g
              key={`${cx}-${cy}`}
              className={`hero-network-node hero-network-node-${(index % 4) + 1}`}
              transform={`translate(${cx} ${cy})`}
            >
              <circle className="hero-network-node-halo" r="12" />
              <circle className="hero-network-node-core" r="2.6" />
            </g>
          ))}
        </g>
      </svg>
      <div className="hero-network-vignette" />
    </div>
  );
}
