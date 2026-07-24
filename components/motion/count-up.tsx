"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";

type CountUpProps = {
  value: number;
  /** Decimal places, and the locale used to format them. */
  decimals?: number;
  locale?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts a figure up when it scrolls into view.
 *
 * Renders the final value as plain text on the server and whenever motion is
 * reduced, so the number is never missing, never wrong in a screenshot, and
 * never read out mid-count.
 */
export function CountUp({
  value,
  decimals = 0,
  locale = "en",
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: CountUpProps) {
  const tier = useMotionTier();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  const format = (input: number) =>
    input.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    // State starts at the final value, so the non-animating paths simply
    // leave it alone rather than writing it again during the effect.
    if (tier === "off" || !inView) return;

    const controls = animate(0, value, {
      duration: tier === "lite" ? duration * 0.7 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    });

    return () => {
      // Settle on the real figure if the count is interrupted part-way.
      controls.stop();
      setDisplay(value);
    };
  }, [inView, tier, value, duration]);

  return (
    <span ref={ref} className={className}>
      {/* The settled value for assistive technology; the ticking one is decorative. */}
      <span className="sr-only">{`${prefix}${format(value)}${suffix}`}</span>
      <span aria-hidden="true">{`${prefix}${format(display)}${suffix}`}</span>
    </span>
  );
}
