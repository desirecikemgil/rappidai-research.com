"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup } from "@/components/ui/brand-lockup";
import { resourceUtilityLinks } from "@/content/resources";
import { footerNavigation, siteConfig } from "@/content/site";
import {
  localeFromPathname,
  localizeContent,
  localizePath,
  t,
} from "@/lib/i18n";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const locale = localeFromPathname(usePathname());
  const config = localizeContent(siteConfig, locale);
  const navigation = localizeContent(footerNavigation, locale);
  const utilities = localizeContent(resourceUtilityLinks, locale);

  return (
    <footer className="liquid-section border-t border-line bg-white/35 backdrop-blur-xl">
      <div className="page-shell section-space-sm">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-14 lg:grid-cols-[1.3fr_0.62fr_0.75fr_0.75fr_0.55fr]">
          <div>
            <BrandLockup
              priority
              href={localizePath("/", locale)}
              homeLabel={t(locale, "rappidAI research home")}
            />
            <p className="body-copy mt-7 max-w-md">{config.description}</p>
            <p className="mt-6 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              {t(locale, "Based in")} {config.location}
            </p>
          </div>

          <FooterColumn title={t(locale, "Explore")}>
            {navigation.explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={t(locale, "Resources")}>
            {navigation.resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={t(locale, "Open research")}>
            {Object.values(config.externalLinks).map((item) =>
              item.url ? (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  key={item.label}
                  className="text-muted"
                  title={t(locale, "External link not configured")}
                >
                  {item.pendingLabel}
                </span>
              ),
            )}
            {utilities.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title={t(locale, "Legal")}>
            {navigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localizePath("/resources/licensing", locale)}
              className="transition-colors hover:text-accent"
            >
              {t(locale, "Licensing")}
            </Link>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[0.78rem] text-muted sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {config.name}
          </p>
          <p>{t(locale, "Independent AI research · Berlin, Germany")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-mono text-[0.68rem] font-medium tracking-[0.14em] text-muted uppercase">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-3 text-sm text-ink">
        {children}
      </div>
    </div>
  );
}
