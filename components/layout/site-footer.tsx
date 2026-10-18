"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationGroups } from "@/content/navigation";
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
  const groups = localizeContent(navigationGroups, locale);
  const legal = localizeContent(footerNavigation.legal, locale);
  const utilities = localizeContent(resourceUtilityLinks, locale);

  return (
    <footer className="site-footer">
      <div className="page-shell-wide">
        <div className="footer-top">
          <div className="max-w-sm">
            <Link
              href={localizePath("/", locale)}
              aria-label={t(locale, "rappidAI research home")}
              className="block w-[10.5rem]"
            >
              <Image
                src="/brand/rappidai-research-lockup.png"
                alt="rappidAI research"
                width={1055}
                height={225}
                sizes="168px"
                className="brand-inverted h-auto w-full"
              />
            </Link>
            <p className="footer-text mt-6">{config.description}</p>
            <p className="footer-text mt-5 !text-[0.85rem]">
              {t(locale, "Based in")} {config.location}
            </p>
          </div>

          <div className="footer-grid">
            {groups.map((group) => (
              <FooterColumn key={group.id} title={group.label}>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={localizePath(item.href, locale)}
                    className="footer-link"
                  >
                    {item.label}
                  </Link>
                ))}
              </FooterColumn>
            ))}

            <FooterColumn title={t(locale, "Open research")}>
              {Object.values(config.externalLinks).map((item) =>
                item.url ? (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    key={item.label}
                    className="footer-link"
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
                  className="footer-link"
                >
                  {item.label}
                </a>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="m-0">
            © {year} {config.name} ·{" "}
            {t(locale, "Independent AI research · Berlin, Germany")}
          </p>
          <div className="flex flex-wrap gap-5">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
            <Link
              href={localizePath("/resources/licensing", locale)}
              className="footer-link"
            >
              {t(locale, "Licensing")}
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-mark" aria-hidden="true">
        <span>rappidAI</span>
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
      <h2 className="footer-heading">{title}</h2>
      <div className="footer-links">{children}</div>
    </div>
  );
}
