"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { documentationNavigation } from "@/content/navigation";
import {
  localeFromPathname,
  localizeContent,
  localizePath,
  stripLocaleFromPathname,
  t,
} from "@/lib/i18n";

export function DocNav() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const path = stripLocaleFromPathname(pathname);
  const groups = localizeContent(documentationNavigation, locale);

  return (
    <nav aria-label={t(locale, "Documentation")} className="doc-nav">
      {groups.map((group) => (
        <div key={group.title} className="doc-nav-group">
          <p className="doc-nav-title">{group.title}</p>
          <ul>
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizePath(item.href, locale)}
                  aria-current={path === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
