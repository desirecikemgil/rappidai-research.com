"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionTier } from "@/components/motion/use-motion-tier";

export type RailItem = {
  /** The id of the section heading this entry points at. */
  id: string;
  label: string;
};

/**
 * Sticky index for long documents, with a scroll spy.
 *
 * The research page runs to fifteen sections; without an index the reader has
 * no sense of where they are or how much is left. Desktop only — on narrow
 * viewports it would cost more width than it returns.
 */
export function SectionRail({ items }: { items: RailItem[] }) {
  const tier = useMotionTier();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (targets.length === 0) return;

    // A band across the upper third: a section becomes current once its
    // heading reaches it, which matches where the eye actually is.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -68% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="section-rail" aria-label="Section index">
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className="section-rail-link"
              >
                {active ? (
                  <motion.span
                    aria-hidden="true"
                    layoutId="section-rail-marker"
                    className="section-rail-marker"
                    transition={
                      tier === "off"
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                ) : null}
                <span className="section-rail-label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
