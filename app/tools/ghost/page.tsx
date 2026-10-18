import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import {
  ghostBenchScenarios,
  ghostCommands,
  ghostCopy,
  ghostLinks,
  ghostRelease,
} from "@/content/ghost";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/ghost");

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="window window-dark min-w-0">
      <div className="window-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="truncate">{label}</span>
      </div>
      <pre role="region" tabIndex={0} aria-label={label} className="terminal">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const policyTone: Record<string, string> = {
  ALLOW: "border-[#17794a]/30 text-[#17794a]",
  DENY: "border-line-strong text-ink",
  SHADOW: "border-accent/35 text-accent",
  ASK: "border-line-strong text-ink-soft",
};

const referenceKeys = [
  "architecture",
  "threat",
  "network",
  "provenance",
  "incidents",
  "configuration",
  "examples",
  "changelog",
  "reporting",
  "contributing",
  "license",
  "revision",
] as const;

export function LocalizedGhostPage({ locale }: { locale: Locale }) {
  const c = ghostCopy[locale];
  const sections = [
    "#ghost-overview",
    "#ghost-release",
    "#ghost-setup",
    "#ghost-bench",
  ];
  const setup = [
    { title: c.buildTitle, text: c.buildNote, code: ghostCommands.install },
    { title: c.startTitle, text: c.startNote, code: ghostCommands.start },
    { title: c.exampleTitle, text: c.exampleNote, code: ghostCommands.shadow },
  ];

  return (
    <>
      <PageIntro
        {...c.intro}
        indexLabel={c.index}
        topics={c.nav.map((label, i) => ({
          href: sections[i],
          label,
          description: label,
        }))}
        actions={
          <>
            <ActionLink href={ghostLinks.repository} external>
              {c.github}
            </ActionLink>
            <ActionLink href={ghostLinks.release} external variant="secondary">
              {c.release}
            </ActionLink>
          </>
        }
        aside={<CodeBlock code={ghostCommands.shadow} label="ghost · SHADOW" />}
      />

      <section id="ghost-overview" className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">
              {ghostRelease.version} · {c.status}
            </p>
            <h2 className="display-section">{c.overviewTitle}</h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="body-lg m-0">{c.overview}</p>
            <p className="body-copy m-0">{c.purpose}</p>
            <ActionLink href="#ghost-setup" variant="text">
              {c.getStarted}
            </ActionLink>
          </div>
        </div>
      </section>

      <section id="ghost-policies" className="band">
        <div className="page-shell section">
          <div className="section-head split">
            <h2 className="display-section">{c.policyTitle}</h2>
            <p>{c.policyScope}</p>
          </div>
          <div
            className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
            data-stagger
          >
            {c.policies.map(({ name, description }) => (
              <div key={name} className="card min-w-0 p-6">
                <h3
                  className={`m-0 inline-flex rounded-md border px-2.5 py-1 font-mono text-sm tracking-wider ${policyTone[name] ?? ""}`}
                >
                  {name}
                </h3>
                <p className="body-copy mt-4">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <h3 className="m-0 text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.04em] text-ink">
                {c.shadowTitle}
              </h3>
              <p className="body-copy mt-4">{c.shadowText}</p>
            </div>
            <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {c.shadowSteps.map(([title, text], i) => (
                <li key={title} className="card min-w-0 p-5">
                  <p className="m-0 font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-base font-medium text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="body-copy mt-8 max-w-4xl">{c.shadowLimit}</p>
        </div>
      </section>

      <section id="ghost-release" className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">
              {ghostRelease.version} · {ghostRelease.date}
            </p>
            <h2 className="display-section">{c.changesTitle}</h2>
          </div>
          <p>{c.changesIntro}</p>
        </div>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label={c.changesTitle}
        >
          <table className="table">
            <tbody>
              {c.changes.map(({ title, text, link }) => (
                <tr key={title}>
                  <th
                    scope="row"
                    className="w-[32%] !whitespace-normal !text-ink !font-medium"
                  >
                    {title}
                  </th>
                  <td>
                    <p className="body-copy m-0">{text}</p>
                    <a
                      className="mt-2 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline"
                      href={ghostLinks[link]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.sourceLink}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="ghost-architecture" className="band">
        <div className="page-shell section">
          <div className="section-head split">
            <h2 className="display-section">{c.architectureTitle}</h2>
            <p>{c.architectureIntro}</p>
          </div>
          <dl className="m-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.layers.map(([title, text]) => (
              <div key={title} className="card min-w-0 p-5">
                <dt className="text-base font-medium text-ink">{title}</dt>
                <dd className="body-copy mt-2 text-[0.92rem]">{text}</dd>
              </div>
            ))}
          </dl>
          <div className="card mt-6 min-w-0 p-6 sm:p-8">
            <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:items-start">
              <div className="min-w-0">
                <h3 className="m-0 text-xl font-medium tracking-[-0.03em] text-ink">
                  {c.networkTitle}
                </h3>
                <p className="body-copy mt-3">{c.networkText}</p>
                <p className="body-copy mt-3">{c.networkConfig}</p>
              </div>
              <CodeBlock
                code={ghostCommands.network}
                label="ghost.yaml · network"
              />
            </div>
            <details className="disclosure mt-6 border-t border-line">
              <summary>{c.networkDetails}</summary>
              <p className="body-copy mt-1">{c.networkDetailText}</p>
              <p className="body-copy mt-3">{c.fenceDetail}</p>
              <ActionLink href={ghostLinks.network} external variant="text">
                {c.sourceNames[2]}
              </ActionLink>
            </details>
          </div>
        </div>
      </section>

      <section id="ghost-setup" className="page-shell section">
        <div className="section-head split">
          <h2 className="display-section">{c.installTitle}</h2>
          <p>{c.requirements}</p>
        </div>
        <ol className="m-0 grid list-none gap-4 p-0">
          {setup.map(({ title, text, code }, i) => (
            <li
              key={title}
              className="grid min-w-0 gap-6 border-t border-line pt-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10"
            >
              <div className="min-w-0">
                <p className="m-0 font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-ink">
                  {title}
                </h3>
                <p className="body-copy mt-3">{text}</p>
              </div>
              <CodeBlock code={code} label={title} />
            </li>
          ))}
        </ol>
        <div className="mt-10 border-t border-line pt-6">
          <p className="body-copy max-w-4xl">{c.binaryNote}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ActionLink href={ghostLinks.amd64} external variant="secondary">
              Linux amd64
            </ActionLink>
            <ActionLink href={ghostLinks.arm64} external variant="secondary">
              Linux arm64
            </ActionLink>
            <ActionLink
              href={ghostLinks.checksums}
              external
              variant="secondary"
            >
              SHA256SUMS
            </ActionLink>
          </div>
          <p className="body-copy mt-6 max-w-4xl text-[0.92rem]">
            {c.practicalLimit}
          </p>
        </div>
      </section>

      <section id="ghost-bench" className="dark-band">
        <div className="page-shell section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <p className="eyebrow">GhostBench · {ghostRelease.version}</p>
              <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.045em] text-white">
                {c.benchTitle}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-dark-body)]">
                {c.benchText}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink
                  href={ghostLinks.gate}
                  external
                  className="on-navy-primary"
                >
                  {c.gate}
                </ActionLink>
                <ActionLink
                  href={ghostLinks.benchmarks}
                  external
                  variant="secondary"
                >
                  {c.methodology}
                </ActionLink>
              </div>
            </div>
            <div className="min-w-0">
              <div className="rounded-xl border border-white/10 p-6">
                <p className="m-0 text-sm text-[var(--color-dark-muted)]">
                  {c.benchLabel}
                </p>
                <p
                  data-testid="ghost-bench-result"
                  className="mt-3 font-mono text-lg leading-8 text-white sm:text-2xl"
                >
                  {c.benchResult}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-dark-body)]">
                  {c.benchExamples}
                </p>
              </div>
              <div className="mt-4">
                <CodeBlock code={ghostCommands.bench} label="GhostBench" />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-dark-body)]">
                {c.benchNote}
              </p>
            </div>
          </div>
          <details className="mt-10 border-t border-white/15 pt-4 text-white">
            <summary className="cursor-pointer text-sm font-medium">
              {c.allScenarios}
            </summary>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ghostBenchScenarios.map((scenario) => (
                <li
                  key={scenario}
                  className="break-words font-mono text-xs leading-6 text-[var(--color-dark-body)]"
                >
                  {scenario}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section id="ghost-limits" className="page-shell section">
        <div className="section-head">
          <h2 className="display-section">{c.limitsTitle}</h2>
        </div>
        <div
          className="table-wrap"
          tabIndex={0}
          role="region"
          aria-label={c.limitsTitle}
        >
          <table className="table">
            <tbody>
              {c.limits.map(([title, text]) => (
                <tr key={title}>
                  <th
                    scope="row"
                    className="w-[32%] !whitespace-normal !font-medium !text-ink"
                  >
                    {title}
                  </th>
                  <td className="body-copy">{text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="ghost-sources" className="band">
        <div className="page-shell section">
          <div className="section-head split">
            <div>
              <h2 className="display-section">{c.sourcesTitle}</h2>
              <p className="mt-2 break-all font-mono text-xs leading-6 text-muted">
                {ghostRelease.version} · {ghostRelease.commit}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="body-copy m-0">{c.sourcesText}</p>
              <ActionLink href={ghostLinks.development} external variant="text">
                {locale === "de"
                  ? "v0.3.0 Release Notes"
                  : "v0.3.0 release notes"}
              </ActionLink>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionLink href={ghostLinks.repository} external>
              {c.github}
            </ActionLink>
            <ActionLink href={ghostLinks.release} external variant="secondary">
              {c.release}
            </ActionLink>
            <ActionLink href={ghostLinks.readme} external variant="secondary">
              {c.readme}
            </ActionLink>
            <ActionLink href={ghostLinks.security} external variant="secondary">
              {c.security}
            </ActionLink>
          </div>
          <details className="disclosure mt-8 border-t border-line">
            <summary>{c.moreSources}</summary>
            <ul className="m-0 grid list-none gap-3 p-0 pb-2 sm:grid-cols-2 lg:grid-cols-3">
              {referenceKeys.map((key, i) => (
                <li key={key}>
                  <a
                    href={ghostLinks[key]}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {c.sourceNames[i]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>
    </>
  );
}

export default function GhostPage() {
  return <LocalizedGhostPage locale="en" />;
}
