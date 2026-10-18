import { useId } from "react";
import { MotionScene } from "@/components/motion/motion-scene";

export type SignalKind = "quantum" | "ghost" | "replay";

/** Abstract illustrations, not simulations or representations of measured data. */
export function SignalArt({
  kind = "quantum",
  className = "",
}: {
  kind?: SignalKind;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <MotionScene className={`signal-art signal-${kind} ${className}`}>
      <svg viewBox="0 0 800 520" fill="none" focusable="false">
        <defs>
          <linearGradient
            id={`${id}-line`}
            x1="80"
            y1="400"
            x2="690"
            y2="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#126bff" stopOpacity="0.12" />
            <stop offset="0.48" stopColor="#91c6ff" />
            <stop offset="0.72" stopColor="#e6f5ff" />
            <stop offset="1" stopColor="#126bff" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {kind === "quantum" ? (
          <g className="signal-sculpture">
            {Array.from({ length: 38 }, (_, i) => {
              const y = 96 + i * 8.5;
              return (
                <path
                  key={i}
                  d={`M -30 ${y + 170} C 150 ${y + 170}, 190 ${490 - i * 5}, 360 ${360 - i * 5} S 510 ${20 + i * 10}, 840 ${y - 80}`}
                  stroke={`url(#${id}-line)`}
                  strokeWidth={i % 6 === 0 ? 1.8 : 0.8}
                  opacity={0.48 + (i % 5) * 0.1}
                />
              );
            })}
          </g>
        ) : kind === "ghost" ? (
          <g className="signal-sculpture">
            {Array.from({ length: 15 }, (_, i) => (
              <rect
                key={i}
                x={225 + i * 7}
                y={65 + i * 8}
                width={310 - i * 14}
                height={360 - i * 16}
                rx={95 - i * 5}
                transform="rotate(-24 400 260)"
                stroke={`url(#${id}-line)`}
                strokeWidth={i === 0 ? 2 : 1}
              />
            ))}
            <path d="M0 260H285M515 260H800" stroke={`url(#${id}-line)`} />
            <circle cx="400" cy="260" r="18" fill="#b5d9ff" />
            <circle
              cx="400"
              cy="260"
              r="39"
              stroke="#91c6ff"
              strokeOpacity=".4"
            />
          </g>
        ) : (
          <g className="signal-sculpture" stroke={`url(#${id}-line)`}>
            {Array.from({ length: 13 }, (_, i) => (
              <path
                key={i}
                d={`M-40 ${160 + i * 15} H240 Q310 ${160 + i * 15} 360 ${130 + i * 8} T520 ${130 + i * 8} H840 M240 ${160 + i * 15} Q320 ${160 + i * 15} 390 ${300 + i * 8} T840 ${300 + i * 8}`}
                strokeWidth="1"
              />
            ))}
            {[170, 400, 620].map((x, i) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy={260 + (i === 1 ? -90 : 0)}
                  r="22"
                  fill="#061e46"
                />
                <circle
                  cx={x}
                  cy={260 + (i === 1 ? -90 : 0)}
                  r="5"
                  fill="#b5d9ff"
                />
              </g>
            ))}
          </g>
        )}
      </svg>
      <div className="signal-light" />
    </MotionScene>
  );
}
