"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { localeFromPathname, t } from "@/lib/i18n";
import { PageMotion } from "@/components/motion/page-motion";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="site-frame" lang={locale}>
      <a href="#main-content" className="skip-link">
        {t(locale, "Skip to content")}
      </a>
      <SiteHeader key={pathname} />
      <main id="main-content">{children}</main>
      <PageMotion pathname={pathname} />
      <SiteFooter />
    </div>
  );
}
