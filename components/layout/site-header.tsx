"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { BrandLockup } from "@/components/ui/brand-lockup";
import { Magnetic } from "@/components/motion/interactive";
import {
  alternateLocale,
  languageName,
  localeFromPathname,
  localizeContent,
  localizePath,
  t,
  type Locale,
} from "@/lib/i18n";

function isCurrentRoute(pathname: string, href: string) {
  return href === "/" || href === "/de"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

function LanguageSwitcher({
  locale,
  pathname,
  compact = false,
}: {
  locale: Locale;
  pathname: string;
  compact?: boolean;
}) {
  const targetLocale = alternateLocale(locale);
  const label = t(locale, "Language");

  return (
    <div
      className={`liquid-pill inline-flex items-center border border-line bg-white/35 p-1 ${
        compact ? "w-full justify-between" : ""
      }`}
      role="group"
      aria-label={label}
    >
      {(["en", "de"] as const).map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={localizePath(pathname, item)}
            hrefLang={item}
            lang={item}
            aria-label={
              active
                ? `${languageName(item)} · ${t(locale, "current language")}`
                : `${t(locale, "Switch to")} ${languageName(item)}`
            }
            className={`inline-flex min-h-9 items-center justify-center rounded-full px-3 font-mono text-[0.66rem] font-medium tracking-[0.1em] transition-colors ${
              active
                ? "bg-ink text-white shadow-sm"
                : "text-muted hover:text-ink"
            } ${compact ? "flex-1" : ""}`}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
      <span className="sr-only">
        {t(locale, "Alternative language")}: {languageName(targetLocale)}
      </span>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const config = localizeContent(siteConfig, locale);
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
      <div className="page-shell-wide flex h-[var(--header-height)] items-center justify-between gap-5">
        <BrandLockup
          priority
          href={localizePath("/", locale)}
          homeLabel={t(locale, "rappidAI research home")}
        />

        <nav
          aria-label="Primary navigation"
          className="site-primary-navigation hidden items-center gap-4 xl:flex"
        >
          <div className="nav-links flex items-center gap-0.5">
            {config.navigation.map((item) => {
              const active = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="nav-item relative rounded-full px-3 py-2 text-[0.83rem] font-medium text-muted transition-colors duration-300 hover:text-ink aria-[current=page]:text-white"
                >
                  {/* A single pill slides between items instead of each one
                      growing its own underline. */}
                  {active ? (
                    <motion.span
                      aria-hidden="true"
                      layoutId="nav-indicator"
                      className="nav-indicator absolute inset-0 rounded-full"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <LanguageSwitcher locale={locale} pathname={pathname} />
          <Magnetic>
            <Link
              href={config.primaryNavigationAction.href}
              className="nav-contact-action liquid-button inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-[0.84rem] font-medium text-white transition-colors hover:border-accent hover:bg-accent"
            >
              {config.primaryNavigationAction.label}
            </Link>
          </Magnetic>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen
              ? t(locale, "Close navigation")
              : t(locale, "Open navigation")
          }
          onClick={() => setMenuOpen((current) => !current)}
          className="liquid-icon-button flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink xl:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          ) : (
            <Menu aria-hidden="true" size={20} strokeWidth={1.7} />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="liquid-mobile-menu max-h-[calc(100svh-var(--header-height))] origin-top overflow-y-auto border-t border-line xl:hidden"
            initial={
              reduceMotion ? false : { opacity: 0, y: -8, scaleY: 0.985 }
            }
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scaleY: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: -6, scaleY: 0.99 }
            }
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav
              aria-label={t(locale, "Mobile navigation")}
              className="page-shell py-5"
            >
              <div className="divide-y divide-line border-y border-line">
                {config.navigation.map((item, index) => {
                  const active = isCurrentRoute(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.04 + index * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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
                            {t(locale, "ACTIVE")}
                          </span>
                        ) : (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 text-muted"
                            strokeWidth={1.6}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-5">
                <LanguageSwitcher locale={locale} pathname={pathname} compact />
              </div>
              <Link
                href={config.primaryNavigationAction.href}
                onClick={() => setMenuOpen(false)}
                className="liquid-button mt-5 flex min-h-12 items-center justify-center bg-ink px-5 text-sm font-medium text-white"
              >
                {config.primaryNavigationAction.label}
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
