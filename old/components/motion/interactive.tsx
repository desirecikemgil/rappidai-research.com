import type { ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

/** Glass styling with a lightweight CSS hover response. */
export function GlowCard({
  children,
  className = "",
  tilt = false,
}: GlowCardProps) {
  return (
    <div className={`glow-surface ${tilt ? "is-tiltable" : ""} ${className}`}>
      {children}
    </div>
  );
}

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Stable hit target; CSS supplies the short hover/press response. */
export function Magnetic({ children, className }: MagneticProps) {
  return <span className={`inline-flex ${className ?? ""}`}>{children}</span>;
}
