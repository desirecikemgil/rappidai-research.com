import { ghostCommands, ghostLinks, ghostRelease } from "@/content/ghost";
import { sentinelEngineCopy } from "@/content/sentinel-engine";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import { t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools");

const copy = {
  en: {
    intro: {
      eyebrow: "Tools",
      title: "Agent infrastructure & security tools",
      description:
        "Ghost controls agent execution. Replay records runs and preserves technical state. Sentinel Engine is planned to bring Quantum Sentinel’s security analysis to software repositories.",
    },
    thesis: "Three distinct tools",
    thesisTitle: "Execution, recording and code security",
    engineQuestion:
      "What security concerns does this code contain, and what evidence supports a finding?",
    ghostQuestion:
      "What may the agent access, and how should suspicious input, sensitive actions and runtime risk be handled?",
    replayQuestion:
      "What happened during the run, and can the technical state be reconstructed?",
    note: "Three independent products with different responsibilities and development stages. Ghost and Replay have experimental implementations. Sentinel Engine is planned; Ghost remains optional, and no integration between the tools is claimed.",
    ghostSummary:
      "An integrated security runtime for autonomous agents. Isolation, SHADOW deception, prompt-injection signals, scoped ASK decisions, runtime limits and evidence work together behind the same ghost run flow.",
    replaySummary:
      "Local-first infrastructure for recording, restoring, branching, rerunning and diffing AI-agent executions.",
    current: "Current implementation",
    ghostStatus: "Integrated agent security · Experimental",
    release: "v0.3.0 Release",
    ghostFacts: [
      "Bounded Prompt-Injection Guard and deterministic trust context",
      "ALLOW / DENY / SHADOW / ASK with exact session-scoped approval",
      "Non-root Docker isolation plus memory, CPU, PID, tmpfs and runtime limits",
      "Exact-hostname HTTP/HTTPS egress with containment taking precedence over approval",
      "Evidence-based summaries, provenance, incidents and crash recovery",
      "25-scenario adversarial GhostBench release gate: 25 PASS / 0 FAIL / 0 SKIP",
    ],
    replayFacts: [
      "Generic execution recorder",
      "Verified restore",
      "Branch and controlled rerun",
      "Deterministic multi-dimensional diff",
      "SQLite metadata plus content-addressed state",
    ],
    inspect: "Inspect the source",
    learn: "Explore tool",
    evidenceTitle: "Claims are tied to reviewed source revisions",
    evidenceText:
      "The pages below distinguish implemented behavior from architecture targets and link technical claims to pinned repository revisions and architecture records.",
  },
  de: {
    intro: {
      eyebrow: "Tools",
      title: "Infrastruktur für Agenten und Codesicherheit",
      description:
        "Ghost kontrolliert die Ausführung von Agenten. Replay zeichnet Läufe auf und hält technische Zustände fest. Sentinel Engine soll die Sicherheitsanalyse von Quantum Sentinel für Software-Repositories nutzbar machen.",
    },
    thesis: "Drei eigenständige Werkzeuge",
    thesisTitle: "Ausführung, Aufzeichnung und Codesicherheit",
    engineQuestion:
      "Welche Sicherheitsprobleme enthält der Code, und welche Belege stützen einen Befund?",
    ghostQuestion:
      "Worauf darf der Agent zugreifen, und wie wird mit verdächtigen Eingaben, sensiblen Aktionen und Laufzeitrisiken umgegangen?",
    replayQuestion:
      "Was ist während des Laufs passiert, und lässt sich der technische Zustand rekonstruieren?",
    note: "Drei eigenständige Produkte mit unterschiedlichen Aufgaben und Entwicklungsständen. Für Ghost und Replay gibt es experimentelle Implementierungen. Sentinel Engine ist geplant; Ghost bleibt optional. Eine Integration der Werkzeuge wird nicht behauptet.",
    ghostSummary:
      "Eine integrierte Security-Runtime für autonome Agenten. Isolation, Täuschung per SHADOW, Prompt-Injection-Signale, eng begrenzte ASK-Entscheidungen, Laufzeitgrenzen und Nachweise greifen im selben Ablauf hinter ghost run ineinander.",
    replaySummary:
      "Lokal ausgerichtete Infrastruktur, um Ausführungen von KI-Agenten aufzuzeichnen, wiederherzustellen, zu verzweigen, erneut auszuführen und zu vergleichen.",
    current: "Derzeit implementiert",
    ghostStatus: "Integrierte Agentensicherheit · Experimentell",
    release: "v0.3.0 Release",
    ghostFacts: [
      "Begrenzter Prompt-Injection Guard und deterministischer Vertrauenskontext",
      "ALLOW / DENY / SHADOW / ASK mit exakter, auf die Session beschränkter Freigabe",
      "Docker-Isolation ohne Root-Rechte sowie Grenzen für Speicher, CPU, PIDs, tmpfs und Laufzeit",
      "Ausgehender HTTP/HTTPS-Verkehr mit exaktem Hostnamenabgleich; Abschottung hat Vorrang vor Freigaben",
      "Belegbasierte Zusammenfassungen, Herkunftsnachweise, Vorfälle und Wiederherstellung nach Abstürzen",
      "Adversariales GhostBench-Release-Gate mit 25 Szenarien: 25 PASS / 0 FAIL / 0 SKIP",
    ],
    replayFacts: [
      "Generische Aufzeichnung von Ausführungen",
      "Verifizierte Wiederherstellung",
      "Verzweigen und kontrollierte erneute Ausführung",
      "Deterministischer Vergleich über mehrere Dimensionen",
      "SQLite-Metadaten und inhaltsadressierte Zustände",
    ],
    inspect: "Quellcode ansehen",
    learn: "Mehr erfahren",
    evidenceTitle:
      "Aussagen sind an geprüfte Revisionen des Quellcodes gebunden",
    evidenceText:
      "Die Detailseiten trennen implementiertes Verhalten von Architekturzielen. Technische Aussagen verweisen auf festgeschriebene Revisionen der Repositories und auf Architekturunterlagen.",
  },
} as const;

const tools = [
  {
    name: "Ghost",
    href: "/tools/ghost" as const,
    repo: ghostLinks.repository,
    accent: "ALLOW · DENY · SHADOW · ASK",
  },
  {
    name: "Replay",
    href: "/tools/replay" as const,
    repo: "https://github.com/rappidAI-Research/rappid-replay",
    accent: "RECORD · RESTORE · BRANCH · DIFF",
  },
  {
    name: "Sentinel Engine",
    href: "/tools/sentinel-engine" as const,
    repo: null,
    accent: "JSON / SARIF",
  },
] as const;

const replayCommands = [
  "rappid replay record -- <command>",
  "rappid replay verify <state-id>",
  "rappid replay restore <state-id>",
  "rappid replay branch <state-id>",
  "rappid replay diff <left-session-id> <right-session-id>",
];

export function LocalizedToolsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const engine = sentinelEngineCopy[locale];
  return (
    <>
      <PageIntro
        {...c.intro}
        facts={[
          {
            label: "rappidAI Ghost",
            value: `${ghostRelease.version} · ${c.ghostStatus}`,
          },
          {
            label: "rappidAI Replay",
            value: t(locale, "Experimental · Open source"),
          },
          { label: "Sentinel Engine", value: engine.status },
          { label: t(locale, "Source"), value: "GitHub · rappidAI-Research" },
        ]}
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#tools-overview",
            label: t(locale, "Tool overview"),
            description: t(
              locale,
              "Compare Ghost, Replay and the planned Sentinel Engine.",
            ),
          },
          {
            href: "#ghost",
            label: "Ghost",
            description: t(
              locale,
              "Control agent access with isolation, deception, prompt signals and evidence.",
            ),
          },
          {
            href: "#replay",
            label: "Replay",
            description: t(
              locale,
              "Record, restore, branch and compare technical execution state.",
            ),
          },
          {
            href: "#sentinel-engine",
            label: "Sentinel Engine",
            description: engine.category,
          },
          {
            href: "#tool-evidence",
            label: t(locale, "Source evidence"),
            description: t(
              locale,
              "Trace implementation claims to reviewed source revisions.",
            ),
          },
        ]}
      />

      <section id="tools-overview" className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">{c.thesis}</p>
            <h2 className="display-section">{c.thesisTitle}</h2>
          </div>
          <p>{c.note}</p>
        </div>
        <div
          className="table-wrap"
          data-reveal
          tabIndex={0}
          role="region"
          aria-label={c.thesisTitle}
        >
          <table className="table stack-table min-w-[48rem]">
            <thead>
              <tr>
                <th scope="col" className="w-[16%]" />
                <th scope="col">rappidAI Ghost</th>
                <th scope="col">rappidAI Replay</th>
                <th scope="col">Sentinel Engine</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{t(locale, "Question")}</th>
                <td data-label="rappidAI Ghost" className="text-ink">
                  {c.ghostQuestion}
                </td>
                <td data-label="rappidAI Replay" className="text-ink">
                  {c.replayQuestion}
                </td>
                <td data-label="Sentinel Engine" className="text-ink">
                  {c.engineQuestion}
                </td>
              </tr>
              <tr>
                <th scope="row">{t(locale, "Scope")}</th>
                <td data-label="rappidAI Ghost" className="text-ink-soft">
                  {c.ghostSummary}
                </td>
                <td data-label="rappidAI Replay" className="text-ink-soft">
                  {c.replaySummary}
                </td>
                <td data-label="Sentinel Engine" className="text-ink-soft">
                  {engine.summary}
                </td>
              </tr>
              <tr>
                <th scope="row">{t(locale, "Core actions")}</th>
                <td
                  data-label="rappidAI Ghost"
                  className="font-mono text-[0.8rem] text-ink-soft"
                >
                  {tools[0].accent}
                </td>
                <td
                  data-label="rappidAI Replay"
                  className="font-mono text-[0.8rem] text-ink-soft"
                >
                  {tools[1].accent}
                </td>
                <td data-label="Sentinel Engine" className="text-ink-soft">
                  {engine.status} · JSON / SARIF
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="band">
        <div className="page-shell section">
          <div className="tool-showcase xl:grid-cols-3">
            {tools.map((tool) => {
              if (tool.name === "Sentinel Engine") {
                return (
                  <article
                    key={tool.name}
                    id="sentinel-engine"
                    className="tool-showcase-card card flex scroll-mt-24 flex-col overflow-hidden"
                    data-reveal
                  >
                    <div className="h-60 border-b border-line bg-pale-soft p-5">
                      <div className="window flex h-full flex-col">
                        <div className="window-bar">
                          <span>Sentinel Engine</span>
                          <span>{engine.status}</span>
                        </div>
                        <dl className="m-0 grid flex-1 grid-rows-3 px-4">
                          {[
                            engine.phases[0].title,
                            engine.phases[1].title,
                            engine.phases[2].title,
                          ].map((title, i) => (
                            <div
                              key={title}
                              className="flex items-center justify-between gap-3 border-b border-line text-sm last:border-0"
                            >
                              <dt>{title}</dt>
                              <dd className="m-0 text-muted">
                                {i === 1
                                  ? "Quantum Sentinel"
                                  : i === 2
                                    ? "JSON / SARIF"
                                    : locale === "de"
                                      ? "Quellcode"
                                      : "Source code"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <p className="text-sm text-muted">{engine.category}</p>
                      <h2 className="mt-4 text-[clamp(1.9rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.045em] text-ink">
                        Sentinel Engine
                      </h2>
                      <p className="body-copy mt-4">{engine.summary}</p>
                      <p className="mt-5 text-sm font-medium text-accent">
                        {engine.status}
                      </p>
                      <details>
                        <summary>{engine.capabilitiesTitle}</summary>
                        <ul className="m-0 grid list-disc gap-2 pb-4 pl-5 text-sm leading-6 text-muted">
                          {engine.features.map((feature) => (
                            <li key={feature.title}>{feature.title}</li>
                          ))}
                        </ul>
                      </details>
                      <div className="mt-auto flex flex-wrap gap-3 pt-6">
                        <ActionLink
                          href={locale === "de" ? `/de${tool.href}` : tool.href}
                        >
                          {c.learn}
                        </ActionLink>
                      </div>
                    </div>
                  </article>
                );
              }
              const isGhost = tool.name === "Ghost";
              const facts = isGhost ? c.ghostFacts : c.replayFacts;
              const href = locale === "de" ? `/de${tool.href}` : tool.href;
              return (
                <article
                  key={tool.name}
                  className="tool-showcase-card card flex flex-col overflow-hidden"
                  data-reveal
                >
                  <div className="h-60 border-b border-line bg-pale-soft p-5">
                    <div className="window window-dark h-full overflow-auto">
                      <div className="window-bar">
                        <span>{isGhost ? "ghost" : "rappid replay"}</span>
                        <span>{isGhost ? ghostRelease.version : "CLI"}</span>
                      </div>
                      <pre
                        className="terminal"
                        tabIndex={0}
                        aria-label={`rappidAI ${tool.name} CLI`}
                      >
                        {(isGhost
                          ? ghostCommands.start.split("\n")
                          : replayCommands
                        ).map((line) => (
                          <span key={line} className="block">
                            <span className="prompt">$ </span>
                            {line}
                          </span>
                        ))}
                      </pre>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm text-muted">
                      {isGhost
                        ? locale === "de"
                          ? "Agentensicherheit"
                          : "Agent security"
                        : locale === "de"
                          ? "Aufzeichnung von Agentenläufen"
                          : "Agent execution recording"}
                    </p>
                    <h2 className="mt-4 text-[clamp(1.9rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.045em] text-ink">
                      <span
                        id={tool.name.toLowerCase()}
                        className="scroll-mt-32"
                      >
                        rappidAI {tool.name}
                      </span>
                    </h2>
                    <p className="body-copy mt-4">
                      {isGhost ? c.ghostSummary : c.replaySummary}
                    </p>
                    <p className="mt-5">
                      <span className="chip whitespace-normal">
                        {isGhost
                          ? `${ghostRelease.version} · ${c.ghostStatus}`
                          : t(locale, "Experimental · Open source")}
                      </span>
                    </p>
                    <details>
                      <summary>{c.current}</summary>
                      <ul className="m-0 grid list-disc gap-2 pb-4 pl-5 text-sm leading-6 text-muted">
                        {facts.map((fact) => (
                          <li key={fact}>{fact}</li>
                        ))}
                      </ul>
                    </details>
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      <ActionLink href={href}>{c.learn}</ActionLink>
                      <ActionLink href={tool.repo} external variant="secondary">
                        {c.inspect}
                      </ActionLink>
                      {isGhost && (
                        <ActionLink
                          href={ghostLinks.release}
                          external
                          variant="secondary"
                        >
                          {c.release}
                        </ActionLink>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tool-evidence" className="page-shell section">
        <div className="card grid gap-6 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="kicker">{t(locale, "Evidence boundary")}</p>
            <h2 className="display-section mt-4">{c.evidenceTitle}</h2>
          </div>
          <p className="body-copy m-0">{c.evidenceText}</p>
        </div>
      </section>
    </>
  );
}

export default function ToolsPage() {
  return <LocalizedToolsPage locale="en" />;
}
