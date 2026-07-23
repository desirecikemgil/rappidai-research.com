"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedEffects } from "@/components/motion/use-reduced-effects";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
};

export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className,
  ...props
}: RevealProps) {
  const reduceEffects = useReducedEffects();
  const visible = { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      initial={
        reduceEffects ? visible : { opacity: 0, y: distance, scale: 0.996 }
      }
      whileInView={visible}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -5% 0px" }}
      transition={
        reduceEffects
          ? { duration: 0 }
          : { duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] }
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function DrawRule({ className = "" }: { className?: string }) {
  const reduceEffects = useReducedEffects();
  const visible = { scaleX: 1, opacity: 1 };

  return (
    <motion.div
      aria-hidden="true"
      className={`fine-rule ${className}`}
      initial={reduceEffects ? visible : { scaleX: 0, opacity: 0.25 }}
      whileInView={visible}
      viewport={{ once: true, amount: 0.6 }}
      transition={
        reduceEffects
          ? { duration: 0 }
          : { duration: 1.15, ease: [0.16, 1, 0.3, 1] }
      }
    />
  );
}
