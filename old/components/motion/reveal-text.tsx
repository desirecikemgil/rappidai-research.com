import type { CSSProperties } from "react";

type RevealTextProps = {
  lines: readonly string[];
  className?: string;
  delay?: number;
  step?: number;
};

/** Line-wise headline treatment without a client-side animation runtime. */
export function RevealText({
  lines,
  className = "",
  delay = 0,
  step = 0.07,
}: RevealTextProps) {
  return (
    <span className={`reveal-text ${className}`}>
      {lines.map((text, index) => (
        <span key={text} className="reveal-text-mask">
          <span
            className="reveal-text-line css-reveal-text-line"
            style={
              {
                "--reveal-text-delay": `${delay + index * step}s`,
              } as CSSProperties
            }
          >
            {text}
          </span>
        </span>
      ))}
    </span>
  );
}
