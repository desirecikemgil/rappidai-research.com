import { deTranslations } from "@/content/locales/de";

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

const protectedKeys = new Set([
  "availability",
  "doi",
  "evidenceReference",
  "featured",
  "id",
  "isoDate",
  "kind",
  "lastReviewed",
  "linkKey",
  "modelSlug",
  "progress",
  "publicationDate",
  "reference",
  "sha256",
  "slug",
  "url",
]);

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
}

export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === "/de") return "/";
  if (pathname.startsWith("/de/")) return pathname.slice(3);
  return pathname || "/";
}

export function localizePath(pathname: string, locale: Locale): string {
  if (
    !pathname.startsWith("/") ||
    pathname.startsWith("//") ||
    pathname.startsWith("/_next/")
  ) {
    return pathname;
  }

  const normalized = stripLocaleFromPathname(pathname);
  return locale === "de"
    ? normalized === "/"
      ? "/de"
      : `/de${normalized}`
    : normalized;
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "de" : "en";
}

export function t(locale: Locale, english: string): string {
  return locale === "de" ? (deTranslations[english] ?? english) : english;
}

function localizeValue(value: unknown, locale: Locale, key?: string): unknown {
  if (locale === "en") return value;

  if (typeof value === "string") {
    if (key === "href") return localizePath(value, locale);
    if (key && protectedKeys.has(key)) return value;
    return t(locale, value);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => localizeValue(entry, locale, key));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        localizeValue(entryValue, locale, entryKey),
      ]),
    );
  }

  return value;
}

export function localizeContent<T>(value: T, locale: Locale): T {
  return localizeValue(value, locale) as T;
}

export function languageName(locale: Locale): string {
  return locale === "de" ? "Deutsch" : "English";
}
