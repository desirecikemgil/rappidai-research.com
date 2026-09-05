"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ComponentProps } from "react";
import { siteConfig } from "@/content/site";
import { BrandLockup } from "@/components/ui/brand-lockup";
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

function IntentLink({ href, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const warmRoute = () => {
    if (typeof href === "string") router.prefetch(href);
  };

  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      onPointerEnter={warmRoute}
      onFocus={warmRoute}
    />
  );
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
          <IntentLink
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
          </IntentLink>
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastValue = false;

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nextValue = window.scrollY > 12;
        if (nextValue === lastValue) return;
        lastValue = nextValue;
        setIsScrolled(nextValue);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
      className="liquid-header sticky top-0 z-50 border-b border-transparent"
    >
      <div className="scroll-progress-line" aria-hidden="true" />
      <div className="page-shell-wide flex h-[var(--header-height)] items-center justify-between gap-5">
        <BrandLockup
          inverted
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
                <IntentLink
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="nav-item relative rounded-full px-3 py-2 text-[0.83rem] font-medium text-muted transition-colors duration-300 hover:text-ink aria-[current=page]:text-white"
                >
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="nav-indicator absolute inset-0 rounded-full"
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </IntentLink>
              );
            })}
          </div>
          <LanguageSwitcher locale={locale} pathname={pathname} />
          <IntentLink
            href={config.primaryNavigationAction.href}
            className="nav-contact-action liquid-button inline-flex min-h-11 items-center border border-ink bg-ink px-5 text-[0.84rem] font-medium text-white transition-colors hover:border-accent hover:bg-accent"
          >
            {config.primaryNavigationAction.label}
          </IntentLink>
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

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="liquid-mobile-menu mobile-navigation-enter max-h-[calc(100svh-var(--header-height))] origin-top overflow-y-auto border-t border-line xl:hidden"
        >
          <nav
            aria-label={t(locale, "Mobile navigation")}
            className="page-shell py-5"
          >
            <div className="divide-y divide-line border-y border-line">
              {config.navigation.map((item) => {
                const active = isCurrentRoute(pathname, item.href);
                return (
                  <div key={item.href}>
                    <IntentLink
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
                    </IntentLink>
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <LanguageSwitcher locale={locale} pathname={pathname} compact />
            </div>
            <IntentLink
              href={config.primaryNavigationAction.href}
              onClick={() => setMenuOpen(false)}
              className="liquid-button mt-5 flex min-h-12 items-center justify-center bg-ink px-5 text-sm font-medium text-white"
            >
              {config.primaryNavigationAction.label}
            </IntentLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
