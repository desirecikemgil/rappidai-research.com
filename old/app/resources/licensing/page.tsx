import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { licensingContent } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources/licensing");

export function LocalizedLicensingPage({ locale }: { locale: Locale }) {
  const content = localizeContent(licensingContent, locale);
  const columns = [
    t(locale, "Material"),
    t(locale, "Status"),
    t(locale, "Current terms"),
    t(locale, "Boundary"),
  ];

  return (
    <>
      <PageIntro {...content.introduction} signature="licensing" />

      <section className="page-shell pb-[var(--section-space)]">
        <Reveal className="liquid-surface">
          <div
            role="region"
            aria-label={t(locale, "Scrollable licensing matrix")}
            tabIndex={0}
            className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
          >
            <table className="w-full min-w-[72rem] border-collapse text-left">
              <caption className="sr-only">
                {t(locale, "License and provenance status by project material")}
              </caption>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-line-strong px-6 py-5 font-mono text-[0.66rem] tracking-[0.13em] text-muted uppercase"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.items.map((item) => (
                  <tr key={item.material}>
                    <th
                      scope="row"
                      className="border-b border-line px-6 py-6 align-top text-sm font-medium text-ink"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-line-strong underline-offset-4 hover:text-accent"
                      >
                        {item.material}
                      </a>
                    </th>
                    <td className="border-b border-line px-6 py-6 align-top">
                      <EvidenceBadge status={item.status} locale={locale} />
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-ink-soft">
                      {item.terms}
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-muted">
                      {item.boundary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-8 border-l-2 border-accent bg-pale-soft px-6 py-5">
          <p className="max-w-[64rem] text-sm leading-6 text-ink-soft">
            {t(
              locale,
              "This is a project-maintenance record, not legal advice. No unresolved material is described as open source, open weight or freely reusable.",
            )}
          </p>
          <a
            href={content.source.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
          >
            {content.source.label}
          </a>
        </Reveal>
      </section>

      <ResourceDirectory current="licensing" locale={locale} />
    </>
  );
}

export default function LicensingPage() {
  return <LocalizedLicensingPage locale="en" />;
}
