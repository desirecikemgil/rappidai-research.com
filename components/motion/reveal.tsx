"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps, Transition, Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";
import type { MotionTier } from "@/components/motion/use-motion-tier";

/** How an element arrives. `up` stays the default so existing calls are unchanged. */
export type RevealVariant = "up" | "blur" | "scale" | "clip" | "fade";

const glide = [0.16, 1, 0.3, 1] as const;

const viewport = { once: true, amount: 0.16, margin: "0px 0px -5% 0px" };

/** Touch devices travel a shorter distance so nothing feels like it is sliding around. */
function scaleDistance(distance: number, tier: MotionTier) {
  return tier === "lite" ? Math.min(distance, 12) : distance;
}

function hiddenState(
  variant: RevealVariant,
  distance: number,
  tier: MotionTier,
) {
  const y = scaleDistance(distance, tier);

  switch (variant) {
    case "fade":
      return { opacity: 0 };
    case "blur":
      // Blur is expensive to animate; lite tier gets the plain rise instead.
      return tier === "full"
        ? { opacity: 0, y, filter: "blur(10px)" }
        : { opacity: 0, y };
    case "scale":
      return { opacity: 0, y: y * 0.5, scale: 0.965 };
    case "clip":
      return { opacity: 0, y, clipPath: "inset(0 0 100% 0)" };
    case "up":
    default:
      return { opacity: 0, y, scale: 0.996 };
  }
}

function visibleState(variant: RevealVariant, tier: MotionTier) {
  const base = { opacity: 1, y: 0, scale: 1 };

  switch (variant) {
    case "fade":
      return { opacity: 1 };
    case "blur":
      return tier === "full" ? { ...base, filter: "blur(0px)" } : base;
    case "clip":
      return { ...base, clipPath: "inset(0 0 0% 0)" };
    default:
      return base;
  }
}

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  variant?: RevealVariant;
  duration?: number;
};

export function Reveal({
  children,
  delay = 0,
  distance = 16,
  variant = "up",
  duration = 0.58,
  className,
  ...props
}: RevealProps) {
  const tier = useMotionTier();
  const visible = visibleState(variant, tier);

  return (
    <motion.div
      initial={tier === "off" ? visible : hiddenState(variant, distance, tier)}
      whileInView={visible}
      viewport={viewport}
      transition={
        tier === "off"
          ? { duration: 0 }
          : {
              duration: tier === "lite" ? duration * 0.8 : duration,
              delay: tier === "lite" ? delay * 0.6 : delay,
              ease: glide,
            }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  /** Gap between children, in seconds. */
  step?: number;
  delay?: number;
};

/**
 * Wraps a list so its children arrive in sequence. Replaces hand-counted
 * `delay={index * 0.06}` props: the container owns the rhythm, and reordering
 * or filtering the list cannot desynchronise it.
 */
export function Stagger({
  children,
  step = 0.07,
  delay = 0,
  className,
  ...props
}: StaggerProps) {
  const tier = useMotionTier();

  const variants: Variants = {
    hidden: {},
    visible: {
      transition:
        tier === "off"
          ? { staggerChildren: 0, delayChildren: 0 }
          : {
              staggerChildren: tier === "lite" ? step * 0.65 : step,
              delayChildren: delay,
            },
    },
  };

  return (
    <motion.div
      initial={tier === "off" ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  distance?: number;
  variant?: RevealVariant;
  as?: keyof typeof staggerElements;
};

const staggerElements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
} as const;

export function StaggerItem({
  children,
  distance = 18,
  variant = "up",
  as = "div",
  className,
  ...props
}: StaggerItemProps) {
  const tier = useMotionTier();
  // Polymorphic tag with a single prop type; the DOM props we pass are shared
  // across all four elements, so the narrowing to `div` is safe here.
  const Component = staggerElements[as] as typeof motion.div;

  const transition: Transition =
    tier === "off"
      ? { duration: 0 }
      : { duration: tier === "lite" ? 0.46 : 0.62, ease: glide };

  const variants: Variants = {
    hidden: hiddenState(variant, distance, tier),
    visible: { ...visibleState(variant, tier), transition },
  };

  return (
    <Component variants={variants} className={className} {...props}>
      {children}
    </Component>
  );
}

export function DrawRule({ className = "" }: { className?: string }) {
  const tier = useMotionTier();
  const visible = { scaleX: 1, opacity: 1 };

  return (
    <motion.div
      aria-hidden="true"
      className={`fine-rule ${className}`}
      initial={tier === "off" ? visible : { scaleX: 0, opacity: 0.25 }}
      whileInView={visible}
      viewport={{ once: true, amount: 0.6 }}
      transition={
        tier === "off"
          ? { duration: 0 }
          : { duration: tier === "lite" ? 0.85 : 1.15, ease: glide }
      }
    />
  );
}
