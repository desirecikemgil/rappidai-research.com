"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from "react";
import { groupForPath, navigationGroups } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import {
  alternateLocale,
  languageName,
  localeFromPathname,
  localizeContent,
  localizePath,
  stripLocaleFromPathname,
  t,
  type Locale,
} from "@/lib/i18n";

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

  return (
    <div
      className={`lang-switch ${compact ? "lang-switch-compact" : ""}`}
      role="group"
      aria-label={t(locale, "Language")}
    >
      {(["en", "de"] as const).map((item) => {
        const active = item === locale;
        return (
          <IntentLink
            key={item}
            href={localizePath(pathname, item)}
            hrefLang={item}
            lang={item}
            data-active={active}
            aria-label={
              active
                ? `${languageName(item)} · ${t(locale, "current language")}`
                : `${t(locale, "Switch to")} ${languageName(item)}`
            }
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
  const groups = localizeContent(navigationGroups, locale);
  const currentGroup = groupForPath(pathname)?.id;
  const plainPath = stripLocaleFromPathname(pathname);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const home = localizePath("/", locale);
  const panel = groups.find((group) => group.id === openGroup);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
  };

  useEffect(() => {
    if (!openGroup) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setOpenGroup(null);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openGroup]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => cancelClose, []);

  return (
    <header
      ref={headerRef}
      className="site-header liquid-header"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
      onPointerEnter={cancelClose}
    >
      <div className="page-shell-wide header-inner">
        <Link
          href={home}
          aria-label={t(locale, "rappidAI research home")}
          className="header-brand"
        >
          <Image
            src="/brand/rappidai-research-lockup.png"
            alt="rappidAI research"
            width={1055}
            height={225}
            priority
            sizes="156px"
            className="h-auto w-full"
          />
        </Link>

        <nav
          aria-label={t(locale, "Primary navigation")}
          className="header-nav"
        >
          <ul className="header-groups">
            {groups.map((group) => {
              const open = openGroup === group.id;
              return (
                <li
                  key={group.id}
                  className="header-group"
                  data-open={open}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    cancelClose();
                    setOpenGroup(group.id);
                  }}
                >
                  <IntentLink
                    href={localizePath(group.href, locale)}
                    aria-current={
                      currentGroup === group.id ? "page" : undefined
                    }
                    className="nav-item"
                  >
                    {group.label}
                  </IntentLink>
                  <button
                    type="button"
                    className="nav-toggle"
                    aria-expanded={open}
                    aria-controls={`mega-${group.id}`}
                    aria-label={`${group.label}: ${t(locale, "More pages")}`}
                    onClick={() => setOpenGroup(open ? null : group.id)}
                  >
                    <ChevronDown aria-hidden="true" size={14} strokeWidth={2} />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="header-tools">
            <LanguageSwitcher locale={locale} pathname={pathname} />
            <IntentLink
              href={config.primaryNavigationAction.href}
              className="btn btn-primary header-contact"
            >
              {config.primaryNavigationAction.label}
            </IntentLink>
          </div>
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
          className="menu-button"
        >
          {menuOpen ? (
            <X aria-hidden="true" size={19} strokeWidth={1.7} />
          ) : (
            <Menu aria-hidden="true" size={19} strokeWidth={1.7} />
          )}
        </button>
      </div>

      {panel ? (
        <div id={`mega-${panel.id}`} className="mega">
          <div className="page-shell-wide mega-inner">
            <div className="mega-intro">
              <h2>{panel.title}</h2>
              <p>{panel.description}</p>
              <IntentLink
                href={localizePath(panel.href, locale)}
                className="text-link mt-2"
                onClick={() => setOpenGroup(null)}
              >
                {t(locale, "Overview")}
                <ArrowRight aria-hidden="true" size={15} />
              </IntentLink>
            </div>
            <ul className="mega-links">
              {panel.items.map((item) => (
                <li key={item.href}>
                  <IntentLink
                    href={localizePath(item.href, locale)}
                    className="mega-link"
                    data-current={plainPath === item.href}
                    onClick={() => setOpenGroup(null)}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </IntentLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {menuOpen ? (
        <div id="mobile-navigation" className="mobile-menu">
          <nav
            aria-label={t(locale, "Mobile navigation")}
            className="page-shell pb-12 pt-2"
          >
            {groups.map((group, index) => (
              <div
                key={group.id}
                className="mobile-group"
                style={{ "--i": index } as CSSProperties}
              >
                <IntentLink
                  href={localizePath(group.href, locale)}
                  aria-current={currentGroup === group.id ? "page" : undefined}
                  className="mobile-group-title"
                  onClick={() => setMenuOpen(false)}
                >
                  {group.label}
                </IntentLink>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <IntentLink
                        href={localizePath(item.href, locale)}
                        data-current={plainPath === item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </IntentLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <LanguageSwitcher locale={locale} pathname={pathname} compact />
              <IntentLink
                href={config.primaryNavigationAction.href}
                className="btn btn-primary"
                onClick={() => setMenuOpen(false)}
              >
                {config.primaryNavigationAction.label}
              </IntentLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
