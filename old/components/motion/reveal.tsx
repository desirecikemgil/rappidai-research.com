import {
  createElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type RevealVariant = "up" | "blur" | "scale" | "clip" | "fade";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  variant?: RevealVariant;
  duration?: number;
};

function revealStyle({
  delay,
  distance,
  duration,
  style,
}: {
  delay: number;
  distance: number;
  duration: number;
  style?: CSSProperties;
}) {
  return {
    ...style,
    "--reveal-delay": `${delay}s`,
    "--reveal-distance": `${distance}px`,
    "--reveal-duration": `${duration}s`,
  } as CSSProperties;
}

/**
 * Progressive CSS reveal. It ships no observer or animation runtime; browsers
 * with view timelines animate transform/opacity on the compositor, while all
 * other browsers receive the fully visible content immediately.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 16,
  variant = "up",
  duration = 0.5,
  className = "",
  style,
  ...props
}: RevealProps) {
  return (
    <div
      className={`css-reveal css-reveal-${variant} ${className}`}
      style={revealStyle({ delay, distance, duration, style })}
      {...props}
    >
      {children}
    </div>
  );
}

type StaggerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  step?: number;
  delay?: number;
};

export function Stagger({
  children,
  step = 0.06,
  delay = 0,
  className = "",
  style,
  ...props
}: StaggerProps) {
  return (
    <div
      className={`css-stagger ${className}`}
      style={
        {
          ...style,
          "--stagger-step": `${step}s`,
          "--stagger-delay": `${delay}s`,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

type StaggerItemProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  distance?: number;
  variant?: RevealVariant;
  as?: "div" | "li" | "article" | "section";
};

export function StaggerItem({
  children,
  distance = 18,
  variant = "up",
  as = "div",
  className = "",
  style,
  ...props
}: StaggerItemProps) {
  return createElement(
    as,
    {
      ...props,
      className: `css-reveal css-stagger-item css-reveal-${variant} ${className}`,
      style: revealStyle({ delay: 0, distance, duration: 0.5, style }),
    },
    children,
  );
}

export function DrawRule({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`fine-rule ${className}`} />;
}
