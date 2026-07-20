"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ParameterGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-12 gap-[5px]" aria-hidden="true">
      {Array.from({ length: 96 }, (_, index) => {
        const emphasized = index % 17 === 0 || index % 23 === 0 || index === 54;
        return (
          <motion.span
            key={index}
            className={`aspect-square border ${emphasized ? "parameter-node-active border-accent bg-accent/80" : "border-line bg-white"}`}
            initial={reduceMotion ? false : { opacity: 0.14 }}
            whileInView={reduceMotion ? undefined : { opacity: emphasized ? 1 : 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.008, 0.55) }}
          />
        );
      })}
    </div>
  );
}
