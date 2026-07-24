"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { PageTransition } from "@/components/motion/page-transition";
import { localeFromPathname, t } from "@/lib/i18n";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="site-frame" lang={locale}>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        {t(locale, "Skip to content")}
      </a>
      <SiteHeader />
      <main id="main-content">
        <PageTransition routeKey={pathname}>{children}</PageTransition>
      </main>
      <SiteFooter />
    </div>
  );
}
