import { Reveal } from "@/components/motion/reveal";
import { SourceLinks } from "@/components/resources/resource-ui";
import { sentinelGarden } from "@/content/sentinel-garden";
import { t, type Locale } from "@/lib/i18n";

type Cell = string | number;

function numberFormat(locale: Locale, digits = 0) {
  return new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatCell(cell: Cell, locale: Locale): string {
  return typeof cell === "number"
    ? numberFormat(locale).format(cell)
    : t(locale, cell);
}

function FigureHead({
  label,
  title,
  caption,
}: {
  label: string;
  title: string;
  caption: string;
}) {
  return (
    <figcaption className="mb-6 max-w-[56rem]">
      <p className="ui-label">{label}</p>
      <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-ink">
        {title}
      </h3>
      <p className="body-copy mt-3">{caption}</p>
    </figcaption>
  );
}

function DataTable({
  columns,
  rows,
  locale,
  title,
  mono = false,
}: {
  columns: readonly string[];
  rows: readonly (readonly Cell[])[];
  locale: Locale;
  title: string;
  /** Render the first column as an identifier (split names, tiers). */
  mono?: boolean;
}) {
  const headers = columns.map((column) => t(locale, column));
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label={title}>
      <table className="table stack-table">
        <thead>
          <tr>
            {headers.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row[0])}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={index}
                    scope="row"
                    className={mono ? "font-mono text-[0.92em]" : undefined}
                  >
                    {mono ? String(cell) : formatCell(cell, locale)}
                  </th>
                ) : (
                  <td
                    key={index}
                    data-label={headers[index]}
                    className={
                      typeof cell === "number" ? "technical-number" : undefined
                    }
                  >
                    {formatCell(cell, locale)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The six pipeline stages with the real command of each stage. */
function PipelineStages({ locale }: { locale: Locale }) {
  const g = sentinelGarden;
  return (
    <figure className="m-0">
      <FigureHead
        label={t(locale, "Figure 1")}
        title={t(locale, g.stagesTitle)}
        caption={t(locale, g.stagesCaption)}
      />
      <ol className="divide-y divide-line border-y border-line">
        {g.stages.map((stage, index) => (
          <li
            key={stage.name}
            className="grid gap-4 py-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-8"
          >
            <div className="min-w-0">
              <p className="technical-number text-sm text-muted">{index + 1}</p>
              <h4 className="mt-2 text-xl font-medium tracking-[-0.03em] text-ink">
                {t(locale, stage.name)}
              </h4>
              <p className="mt-3 font-mono text-[0.8rem] leading-6 break-words text-ink-soft">
                {stage.command}
              </p>
            </div>
            <div className="min-w-0">
              <p className="body-copy">{t(locale, stage.text)}</p>
              <p className="mt-3 text-sm text-muted">
                {t(locale, "Output")}:{" "}
                <span className="font-mono text-[0.92em] text-ink-soft">
                  {t(locale, stage.output)}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Advisories to approved records, with bars drawn to scale. */
function PipelineFunnel({ locale }: { locale: Locale }) {
  const g = sentinelGarden;
  const max = Math.max(...g.funnel.map((step) => step.value));
  const format = numberFormat(locale);
  return (
    <figure className="m-0">
      <FigureHead
        label={t(locale, "Figure 2")}
        title={t(locale, g.funnelTitle)}
        caption={t(locale, g.funnelCaption)}
      />
      <ol className="space-y-5 border-y border-line py-6">
        {g.funnel.map((step) => {
          const share = step.value / max;
          return (
            <li key={step.label} className="grid gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-sm leading-6 text-ink-soft">
                  {t(locale, step.label)}
                </span>
                <span className="technical-number text-sm text-ink">
                  {format.format(step.value)}
                </span>
              </div>
              <div
                className="h-2 rounded-full bg-pale-soft"
                role="presentation"
                aria-hidden="true"
              >
                <div
                  className={`h-2 rounded-full ${step.value === 0 ? "w-px bg-line-strong" : "bg-accent"}`}
                  style={
                    step.value === 0 ? undefined : { width: `${share * 100}%` }
                  }
                />
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

export function SentinelGardenFigures({ locale }: { locale: Locale }) {
  const g = sentinelGarden;
  const percent = numberFormat(locale, 1);
  const whole = numberFormat(locale);
  const reviewRows = g.reviewSample.map((row) => [
    row.question,
    `${whole.format(row.errors)} ${t(locale, "of")} ${whole.format(row.judged)}`,
    `${row.low === 0 ? "0" : percent.format(row.low)} – ${percent.format(row.high)} %`,
  ]);
  return (
    <section className="mb-12" aria-labelledby="sentinel-garden-title">
      <Reveal>
        <h2 id="sentinel-garden-title" className="display-section text-ink">
          {t(locale, g.title)}
        </h2>
        <p className="body-copy mt-5 max-w-[62rem]">
          {t(locale, g.introduction)}
        </p>
      </Reveal>
      <div className="mt-10 space-y-14">
        <Reveal>
          <PipelineStages locale={locale} />
        </Reveal>
        <Reveal>
          <PipelineFunnel locale={locale} />
        </Reveal>
        <Reveal>
          <figure className="m-0">
            <FigureHead
              label={t(locale, "Table 1")}
              title={t(locale, g.compositionTitle)}
              caption={t(locale, g.compositionCaption)}
            />
            <DataTable
              columns={g.compositionColumns}
              rows={g.composition}
              locale={locale}
              title={t(locale, g.compositionTitle)}
            />
          </figure>
        </Reveal>
        <Reveal>
          <figure className="m-0">
            <FigureHead
              label={t(locale, "Table 2")}
              title={t(locale, "Repository-level splits")}
              caption={t(
                locale,
                "Assigned by a frozen, salted hash of the repository, so no repository appears in two splits. Holdout and quarantine records are never used for training.",
              )}
            />
            <DataTable
              columns={g.splitColumns}
              rows={g.splits}
              locale={locale}
              title={t(locale, "Repository-level splits")}
              mono
            />
          </figure>
        </Reveal>
        <Reveal>
          <figure className="m-0">
            <FigureHead
              label={t(locale, "Table 3")}
              title={t(locale, g.auditTitle)}
              caption={t(locale, g.auditCaption)}
            />
            <DataTable
              columns={g.auditColumns}
              rows={g.audit}
              locale={locale}
              title={t(locale, g.auditTitle)}
            />
          </figure>
        </Reveal>
        <Reveal>
          <figure className="m-0">
            <FigureHead
              label={t(locale, "Table 4")}
              title={t(locale, g.reviewSampleTitle)}
              caption={t(locale, g.reviewSampleCaption)}
            />
            <DataTable
              columns={g.reviewSampleColumns}
              rows={reviewRows}
              locale={locale}
              title={t(locale, g.reviewSampleTitle)}
            />
          </figure>
        </Reveal>
        <Reveal>
          <figure className="m-0">
            <FigureHead
              label={t(locale, "Table 5")}
              title={t(locale, g.rightsTitle)}
              caption={t(locale, g.rightsCaption)}
            />
            <DataTable
              columns={g.rightsColumns}
              rows={g.rights}
              locale={locale}
              title={t(locale, g.rightsTitle)}
              mono
            />
          </figure>
        </Reveal>
        <Reveal>
          <SourceLinks sources={g.sources} locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
