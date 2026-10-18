"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { groupForPath } from "@/content/navigation";
import {
  localeFromPathname,
  localizeContent,
  localizePath,
  stripLocaleFromPathname,
  t,
} from "@/lib/i18n";

/** Home › area › page, derived from the site navigation. */
export function Breadcrumbs({ trailing }: { trailing?: string }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const path = stripLocaleFromPathname(pathname);
  const rawGroup = groupForPath(pathname);
  const group = rawGroup ? localizeContent(rawGroup, locale) : undefined;
  const item = group?.items.find((entry) => entry.href === path);
  const showItem = item && item.href !== group?.href;

  return (
    <nav aria-label={t(locale, "Breadcrumb")} className="crumbs">
      <Link href={localizePath("/", locale)}>rappidAI</Link>
      {group ? (
        <>
          <span className="sep" aria-hidden="true">
            /
          </span>
          {showItem ? (
            <Link href={localizePath(group.href, locale)}>{group.label}</Link>
          ) : (
            <span className="here" aria-current="page">
              {group.label}
            </span>
          )}
        </>
      ) : null}
      {showItem ? (
        <>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <span className="here" aria-current="page">
            {item.label}
          </span>
        </>
      ) : null}
      {trailing ? <span className="chip mono">{trailing}</span> : null}
    </nav>
  );
}
