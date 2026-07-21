"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { BrandLockup } from "@/components/ui/brand-lockup";

function isCurrentRoute(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      data-scrolled={isScrolled || menuOpen}
      className="liquid-header sticky top-0 z-50 border-b border-transparent transition-all duration-500"
    >
      <div className="scroll-progress-line" aria-hidden="true" />
      <div className="page-shell-wide flex h-[var(--header-height)] items-center justify-between gap-8">
        <BrandLockup priority />

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          <div className="flex items-center gap-7">
            {siteConfig.navigation.map((item) => {
              const active = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative py-2 text-[0.86rem] font-medium text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                  />
                </Link>
              );
            })}
          </div>
          <Link
            href={siteConfig.primaryNavigationAction.href}
            className="liquid-button inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-[0.84rem] font-medium text-white transition-colors hover:border-accent hover:bg-accent"
          >
            {siteConfig.primaryNavigationAction.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
          className="liquid-icon-button flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink lg:hidden"
        >
          {menuOpen ? <X aria-hidden="true" size={20} strokeWidth={1.7} /> : <Menu aria-hidden="true" size={20} strokeWidth={1.7} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="liquid-mobile-menu max-h-[calc(100svh-var(--header-height))] origin-top overflow-y-auto border-t border-line lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, height: "auto", y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile navigation" className="page-shell py-5">
              <div className="divide-y divide-line border-y border-line">
                {siteConfig.navigation.map((item, index) => {
                  const active = isCurrentRoute(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.04 + index * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className="flex min-h-14 items-center justify-between text-base text-ink"
                      >
                        {item.label}
                        {active ? (
                          <span className="font-mono text-[0.65rem] tracking-[0.12em] text-accent">
                            ACTIVE
                          </span>
                        ) : (
                          <ArrowUpRight aria-hidden="true" className="size-4 text-muted" strokeWidth={1.6} />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <Link
                href={siteConfig.primaryNavigationAction.href}
                onClick={() => setMenuOpen(false)}
                className="liquid-button mt-5 flex min-h-12 items-center justify-center bg-ink px-5 text-sm font-medium text-white"
              >
                {siteConfig.primaryNavigationAction.label}
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
