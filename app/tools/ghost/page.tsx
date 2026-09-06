import { Reveal } from "@/components/motion/reveal";
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
    <pre
      role="region"
      tabIndex={0}
      aria-label={label}
      className="min-w-0 max-w-full overflow-x-auto rounded-xl bg-ink p-5 text-xs leading-7 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-sm"
    >
      <code>{code}</code>
    </pre>
  );
}

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
        artwork="ghost"
        indexLabel={c.index}
        topics={c.nav.map((label, i) => ({
          href: sections[i],
          label,
          description: label,
        }))}
      />
      <section className="page-shell pb-[var(--section-space)]">
        <Reveal id="ghost-overview" className="scroll-mt-32">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-line pb-7">
            <p className="eyebrow">
              {ghostRelease.version} · {c.status}
            </p>
            <div className="flex flex-wrap gap-3">
              <ActionLink href={ghostLinks.repository} external>
                {c.github}
              </ActionLink>
              <ActionLink
                href={ghostLinks.release}
                external
                variant="secondary"
              >
                {c.release}
              </ActionLink>
              <ActionLink href="#ghost-setup" variant="text">
                {c.getStarted}
              </ActionLink>
            </div>
          </div>
          <div className="mt-10 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
            <h2 className="display-section text-ink">{c.overviewTitle}</h2>
            <div className="min-w-0">
              <p className="body-lg text-ink">{c.overview}</p>
              <p className="body-copy mt-5">{c.purpose}</p>
            </div>
          </div>
        </Reveal>

        <Reveal id="ghost-policies" className="mt-20 scroll-mt-32">
          <h2 className="display-section text-ink">{c.policyTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.policies.map(({ name, description }) => (
              <div key={name} className="liquid-card min-w-0 p-6 sm:p-8">
                <h3 className="font-mono text-base tracking-wider text-accent">
                  {name}
                </h3>
                <p className="body-copy mt-4">{description}</p>
              </div>
            ))}
          </div>
          <p className="body-copy mt-6 max-w-4xl">{c.policyScope}</p>
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="max-w-3xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {c.shadowTitle}
            </h3>
            <p className="body-copy mt-5 max-w-4xl">{c.shadowText}</p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.shadowSteps.map(([title, text], i) => (
                <li
                  key={title}
                  className="min-w-0 border-t-2 border-accent pt-4"
                >
                  <p className="text-base font-semibold text-ink">
                    <span className="mr-2 font-mono text-sm text-accent">
                      0{i + 1}
                    </span>
                    {title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                </li>
              ))}
            </ol>
            <p className="body-copy mt-6 border-l-2 border-accent pl-5">
              {c.shadowLimit}
            </p>
          </div>
        </Reveal>

        <Reveal id="ghost-release" className="mt-20 scroll-mt-32">
          <p className="eyebrow">
            {ghostRelease.version} · {ghostRelease.date}
          </p>
          <h2 className="display-section mt-5 max-w-4xl text-ink">
            {c.changesTitle}
          </h2>
          <p className="body-lg mt-6 max-w-4xl">{c.changesIntro}</p>
          <div className="liquid-surface mt-8 divide-y divide-line px-6 sm:px-9">
            {c.changes.map(({ title, text, link }) => (
              <div
                key={title}
                className="grid gap-4 py-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10"
              >
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {title}
                </h3>
                <div className="min-w-0">
                  <p className="body-copy">{text}</p>
                  <a
                    className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
                    href={ghostLinks[link]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.sourceLink}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal id="ghost-architecture" className="mt-20 scroll-mt-32">
          <h2 className="display-section max-w-4xl text-ink">
            {c.architectureTitle}
          </h2>
          <p className="body-lg mt-6 max-w-4xl">{c.architectureIntro}</p>
          <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {c.layers.map(([title, text]) => (
              <div key={title} className="min-w-0 border-t border-line py-6">
                <dt className="text-lg font-semibold text-ink">{title}</dt>
                <dd className="body-copy mt-3">{text}</dd>
              </div>
            ))}
          </dl>
          <div className="liquid-surface mt-8 min-w-0 p-6 sm:p-9">
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              {c.networkTitle}
            </h3>
            <p className="body-copy mt-4 max-w-4xl">{c.networkText}</p>
            <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start">
              <p className="body-copy">{c.networkConfig}</p>
              <CodeBlock
                code={ghostCommands.network}
                label="ghost.yaml · network"
              />
            </div>
            <details className="mt-7 border-t border-line pt-5">
              <summary className="cursor-pointer text-base font-semibold text-ink">
                {c.networkDetails}
              </summary>
              <p className="body-copy mt-5">{c.networkDetailText}</p>
              <p className="body-copy mt-4">{c.fenceDetail}</p>
              <ActionLink href={ghostLinks.network} external variant="text">
                {c.sourceNames[2]}
              </ActionLink>
            </details>
          </div>
        </Reveal>

        <Reveal id="ghost-setup" className="mt-20 scroll-mt-32">
          <h2 className="display-section max-w-4xl text-ink">
            {c.installTitle}
          </h2>
          <p className="body-lg mt-6 max-w-4xl">{c.requirements}</p>
          <div className="mt-9 divide-y divide-line border-y border-line">
            {setup.map(({ title, text, code }) => (
              <div
                key={title}
                className="grid min-w-0 gap-6 py-8 lg:grid-cols-2 lg:gap-10"
              >
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-ink">{title}</h3>
                  <p className="body-copy mt-4">{text}</p>
                </div>
                <CodeBlock code={code} label={title} />
              </div>
            ))}
          </div>
          <p className="body-copy mt-6 max-w-4xl">{c.binaryNote}</p>
          <div className="mt-5 flex flex-wrap gap-3">
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
          <p className="body-copy mt-7 border-l-2 border-accent pl-5">
            {c.practicalLimit}
          </p>
        </Reveal>

        <Reveal
          id="ghost-bench"
          className="dark-band mt-20 min-w-0 scroll-mt-32 rounded-2xl p-6 sm:p-10 lg:p-12"
        >
          <p className="eyebrow">GhostBench · {ghostRelease.version}</p>
          <h2 className="display-section mt-5 max-w-4xl text-white">
            {c.benchTitle}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[var(--color-dark-body)]">
            {c.benchText}
          </p>
          <p className="mt-8 text-sm text-[var(--color-dark-muted)]">
            {c.benchLabel}
          </p>
          <p
            data-testid="ghost-bench-result"
            className="mt-3 font-mono text-lg leading-8 text-white sm:text-2xl"
          >
            {c.benchResult}
          </p>
          <p className="mt-7 max-w-4xl text-sm leading-7 text-[var(--color-dark-body)]">
            {c.benchExamples}
          </p>
          <div className="mt-6">
            <CodeBlock code={ghostCommands.bench} label="GhostBench" />
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-[var(--color-dark-body)]">
            {c.benchNote}
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
              className="on-navy-primary"
            >
              {c.methodology}
            </ActionLink>
          </div>
          <details className="mt-8 border-t border-white/20 pt-5 text-white">
            <summary className="cursor-pointer text-sm font-semibold">
              {c.allScenarios}
            </summary>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {ghostBenchScenarios.map((scenario) => (
                <li
                  key={scenario}
                  className="break-words font-mono text-xs leading-6"
                >
                  {scenario}
                </li>
              ))}
            </ul>
          </details>
        </Reveal>

        <Reveal id="ghost-limits" className="mt-20 scroll-mt-32">
          <h2 className="display-section max-w-4xl text-ink">
            {c.limitsTitle}
          </h2>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {c.limits.map(([title, text]) => (
              <div
                key={title}
                className="grid gap-4 py-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10"
              >
                <dt className="text-lg font-semibold text-ink">{title}</dt>
                <dd className="body-copy min-w-0">{text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal
          id="ghost-sources"
          className="liquid-surface mt-20 scroll-mt-32 p-6 sm:p-9"
        >
          <h2 className="display-section max-w-4xl text-ink">
            {c.sourcesTitle}
          </h2>
          <p className="body-copy mt-6 max-w-4xl">{c.sourcesText}</p>
          <p className="mt-4 break-all font-mono text-xs leading-6 text-muted">
            {ghostRelease.version} · {ghostRelease.commit}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
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
          <details className="mt-7 border-t border-line pt-5">
            <summary className="cursor-pointer text-base font-semibold text-ink">
              {c.moreSources}
            </summary>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {referenceKeys.map((key, i) => (
                <li key={key}>
                  <a
                    href={ghostLinks[key]}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block py-1 text-sm font-medium text-accent underline underline-offset-4"
                  >
                    {c.sourceNames[i]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </Reveal>
      </section>
    </>
  );
}

export default function GhostPage() {
  return <LocalizedGhostPage locale="en" />;
}
