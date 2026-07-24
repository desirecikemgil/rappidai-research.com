import { Reveal } from "@/components/motion/reveal";
import {
  EvidenceBadge,
  ResourceDirectory,
  SourceLinks,
} from "@/components/resources/resource-ui";
import { PageIntro } from "@/components/ui/page-intro";
import { reproducibilityContent } from "@/content/resources";
import { metadataFor } from "@/lib/metadata";
import { localizeContent, t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/resources/reproducibility");

export function LocalizedReproducibilityPage({ locale }: { locale: Locale }) {
  const content = localizeContent(reproducibilityContent, locale);
  const columns = [
    t(locale, "Area"),
    t(locale, "Status"),
    t(locale, "Available"),
    t(locale, "Still missing"),
  ];

  return (
    <>
      <PageIntro {...content.introduction} signature="reproducibility" />

      <section className="page-shell pb-[var(--section-space)]">
        <div className="grid gap-4 lg:grid-cols-2">
          {content.releases.map((release, index) => (
            <Reveal
              key={release.model}
              delay={index * 0.04}
              className="liquid-card min-w-0 p-7 sm:p-9"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow">{t(locale, "PUBLIC F16 GGUF")}</p>
                <EvidenceBadge status="Published" locale={locale} />
              </div>
              <h2 className="mt-7 text-3xl font-medium tracking-[-0.045em] text-ink">
                {release.model}
              </h2>
              <dl className="mt-7 border-b border-line">
                <ReleaseFact
                  label={t(locale, "File")}
                  value={release.file}
                  breakValue
                />
                <ReleaseFact label={t(locale, "Size")} value={release.bytes} />
                <ReleaseFact
                  label={t(locale, "SHA-256")}
                  value={release.sha256}
                  breakValue
                />
              </dl>
              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                <a
                  href={release.modelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                >
                  {t(locale, "Model repository")}
                </a>
                <a
                  href={release.checksumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                >
                  {t(locale, "Checksum")}
                </a>
                <a
                  href={release.manifestUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                >
                  {t(locale, "Manifest")}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="liquid-surface mt-8 overflow-hidden p-7 sm:p-9">
          <p className="eyebrow">{t(locale, "LLAMA.CPP REFERENCE")}</p>
          <pre className="mt-6 max-w-full overflow-x-auto rounded-[1rem] border border-line bg-ink p-5 text-[0.76rem] leading-6 text-[#d8e4f6] focus-visible:outline-2 focus-visible:outline-accent">
            <code>{content.referenceCommand}</code>
          </pre>
          <p className="mt-5 max-w-[62rem] text-sm leading-6 text-muted">
            {content.commandQualification}
          </p>
        </Reveal>

        <div className="mt-[clamp(4rem,7vw,7rem)] grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="eyebrow">{t(locale, "VERIFICATION WORKFLOW")}</p>
            <h2 className="display-section mt-7 text-ink">
              {t(locale, "A repeatable local record.")}
            </h2>
          </Reveal>
          <ol className="space-y-3 sm:space-y-4">
            {content.verificationSteps.map((step, index) => (
              <li key={step}>
                <Reveal className="liquid-row grid gap-5 rounded-[1.2rem] border-y border-line py-7 sm:grid-cols-[3rem_1fr]">
                  <span className="technical-number text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-7 text-ink-soft">{step}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="liquid-surface mt-[clamp(4rem,8vw,8rem)]">
          <div
            role="region"
            aria-label={t(locale, "Scrollable reproducibility matrix")}
            tabIndex={0}
            className="max-w-full overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
          >
            <table className="w-full min-w-[64rem] border-collapse text-left">
              <caption className="sr-only">
                {t(
                  locale,
                  "Reproducibility status, available evidence and missing artifacts",
                )}
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
                {content.matrix.map((item) => (
                  <tr key={item.area}>
                    <th
                      scope="row"
                      className="border-b border-line px-6 py-6 align-top text-sm font-medium text-ink"
                    >
                      {item.area}
                    </th>
                    <td className="border-b border-line px-6 py-6 align-top">
                      <EvidenceBadge status={item.status} locale={locale} />
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-ink-soft">
                      {item.available}
                    </td>
                    <td className="border-b border-line px-6 py-6 align-top text-sm leading-6 text-muted">
                      {item.missing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <SourceLinks sources={content.sources} locale={locale} />
        </Reveal>
      </section>

      <ResourceDirectory current="reproducibility" locale={locale} />
    </>
  );
}

export default function ReproducibilityPage() {
  return <LocalizedReproducibilityPage locale="en" />;
}

function ReleaseFact({
  label,
  value,
  breakValue = false,
}: {
  label: string;
  value: string;
  breakValue?: boolean;
}) {
  return (
    <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[7rem_1fr]">
      <dt className="font-mono text-[0.64rem] tracking-[0.12em] text-muted uppercase">
        {label}
      </dt>
      <dd
        className={`text-sm leading-6 text-ink-soft ${breakValue ? "break-all font-mono text-[0.7rem]" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
