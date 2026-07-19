"use client";

import { motion, useReducedMotion } from "framer-motion";

const paths = [
  "M32 468C122 468 140 244 246 244C346 244 346 404 446 404C544 404 566 182 650 182",
  "M26 518C132 518 150 330 248 330C342 330 370 490 460 490C550 490 580 292 662 292",
  "M30 398C116 398 152 176 252 176C352 176 362 318 454 318C548 318 582 116 654 116",
  "M44 570C130 570 180 414 264 414C356 414 378 568 466 568C552 568 598 412 648 412",
  "M50 316C130 316 166 108 262 108C354 108 380 240 466 240C550 240 602 62 648 62",
];

const nodes = [
  { cx: 106, cy: 451, delay: 0 },
  { cx: 246, cy: 244, delay: 0.7 },
  { cx: 365, cy: 431, delay: 1.2 },
  { cx: 458, cy: 318, delay: 0.4 },
  { cx: 574, cy: 272, delay: 1.55 },
  { cx: 626, cy: 123, delay: 0.95 },
];

export function HeroVisualization() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="liquid-surface relative mx-auto aspect-square w-full max-w-[42rem] overflow-hidden rounded-[42%_58%_46%_54%/55%_42%_58%_45%]" aria-hidden="true">
      <div className="ambient-shift absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(18,107,255,0.13),rgba(234,242,255,0.2)_42%,transparent_72%)] blur-2xl" />
      <svg className="relative h-full w-full" viewBox="0 0 680 680" fill="none">
        <defs>
          <linearGradient id="hero-line" x1="20" y1="340" x2="660" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D6E5FF" stopOpacity="0.2" />
            <stop offset="0.48" stopColor="#126BFF" stopOpacity="0.72" />
            <stop offset="1" stopColor="#8CB7FF" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="hero-core" x1="286" y1="142" x2="420" y2="532" gradientUnits="userSpaceOnUse">
            <stop stopColor="#126BFF" />
            <stop offset="1" stopColor="#061E46" />
          </linearGradient>
          <filter id="soft-node" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <g opacity="0.56">
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`vertical-${index}`}
              x1={84 + index * 64}
              x2={84 + index * 64}
              y1="72"
              y2="608"
              stroke="#C9DAF2"
              strokeWidth="0.7"
              strokeDasharray="2 9"
            />
          ))}
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`horizontal-${index}`}
              x1="72"
              x2="608"
              y1={84 + index * 64}
              y2={84 + index * 64}
              stroke="#C9DAF2"
              strokeWidth="0.7"
              strokeDasharray="2 9"
            />
          ))}
        </g>

        {paths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            stroke="url(#hero-line)"
            strokeWidth={index === 2 ? 1.6 : 1.1}
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0, 0.86, 0.62] }}
            transition={{ duration: 2.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        <motion.rect
          x="299"
          y="242"
          width="82"
          height="194"
          rx="8"
          fill="#FFFFFF"
          fillOpacity="0.48"
          stroke="#BFD3F0"
          initial={reduceMotion ? false : { opacity: 0, scaleY: 0.75 }}
          animate={reduceMotion ? undefined : { opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.1, delay: 0.45 }}
          style={{ transformOrigin: "340px 340px" }}
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.line
            key={`layer-${index}`}
            x1="316"
            x2="364"
            y1={273 + index * 33}
            y2={273 + index * 33}
            stroke="url(#hero-core)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1, scaleX: [0, 1, 0.72, 1] }}
            transition={{ duration: 1.25, delay: 0.7 + index * 0.09 }}
            style={{ transformOrigin: "340px center" }}
          />
        ))}

        {nodes.map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="11"
              fill="#126BFF"
              opacity="0.14"
              filter="url(#soft-node)"
              animate={reduceMotion ? undefined : { r: [10, 17, 10], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 4.8, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="3.4"
              fill="#126BFF"
              animate={reduceMotion ? undefined : { y: [0, -5, 0], opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 4.2, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute bottom-[12%] left-[9%] font-mono text-[0.63rem] tracking-[0.17em] text-muted uppercase">
        token input
      </div>
      <div className="absolute right-[7%] top-[13%] text-right font-mono text-[0.63rem] tracking-[0.17em] text-muted uppercase">
        local output
      </div>
    </div>
  );
}
