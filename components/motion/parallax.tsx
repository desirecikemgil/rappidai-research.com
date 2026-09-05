import type { ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  distance?: number;
  className?: string;
};

/** Static depth wrapper: avoids per-frame scroll subscriptions. */
export function Parallax({ children, className }: ParallaxProps) {
  return <div className={className}>{children}</div>;
}
