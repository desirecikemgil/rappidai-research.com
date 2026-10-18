import { ghostCommands, ghostLinks, ghostRelease } from "@/content/ghost";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import { t, type Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools");

const copy = {
  en: {
    intro: {
      eyebrow: "TOOLS",
      title: "Your agents. Your environment. Your evidence.",
      description:
        "Two open-source tools for agent infrastructure. Ghost controls access to the environment. Replay records execution and preserves inspectable technical state.",
    },
    thesis: "TWO DIFFERENT QUESTIONS",
    thesisTitle: "Control the environment. Preserve the evidence.",
    ghostQuestion:
      "What may the agent access — and how should suspicious input, sensitive actions and runtime risk be handled?",
    replayQuestion:
      "What happened during the run — and can the technical state be reconstructed?",
    note: "Ghost and Replay are complementary research directions, not presented here as a single integrated product. Their current implementations remain separate repositories with separate guarantees.",
    ghostSummary:
      "An integrated security runtime for autonomous agents. Isolation, SHADOW deception, prompt-injection signals, scoped ASK decisions, runtime limits and evidence work together behind the same ghost run flow.",
    replaySummary:
      "Local-first infrastructure for recording, restoring, branching, rerunning and diffing AI-agent executions.",
    current: "CURRENT IMPLEMENTATION",
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
    evidenceTitle: "Claims are tied to reviewed source revisions.",
    evidenceText:
      "The pages below distinguish implemented behavior from architecture targets and link technical claims to pinned repository revisions and architecture records.",
  },
  de: {
    intro: {
      eyebrow: "TOOLS",
      title: "Ihre Agenten. Ihre Umgebung. Ihre Nachweise.",
      description:
        "Zwei Open-Source-Werkzeuge als Infrastruktur für KI-Agenten. Ghost kontrolliert den Zugriff auf die Umgebung. Replay zeichnet Ausführungen auf und hält technische Zustände nachprüfbar fest.",
    },
    thesis: "ZWEI UNTERSCHIEDLICHE FRAGEN",
    thesisTitle: "Die Umgebung kontrollieren. Nachweise sichern.",
    ghostQuestion:
      "Worauf darf der Agent zugreifen – und wie wird mit verdächtigen Eingaben, sensiblen Aktionen und Laufzeitrisiken umgegangen?",
    replayQuestion:
      "Was ist während des Laufs passiert – und lässt sich der technische Zustand rekonstruieren?",
    note: "Ghost und Replay sind Forschungsrichtungen, die sich ergänzen. Wir stellen sie hier nicht als ein gemeinsames, integriertes Produkt dar. Ihre aktuellen Implementierungen liegen in getrennten Repositories mit jeweils eigenen Garantien.",
    ghostSummary:
      "Eine integrierte Security-Runtime für autonome Agenten. Isolation, Täuschung per SHADOW, Prompt-Injection-Signale, eng begrenzte ASK-Entscheidungen, Laufzeitgrenzen und Nachweise greifen im selben Ablauf hinter ghost run ineinander.",
    replaySummary:
      "Lokal ausgerichtete Infrastruktur, um Ausführungen von KI-Agenten aufzuzeichnen, wiederherzustellen, zu verzweigen, erneut auszuführen und zu vergleichen.",
    current: "DERZEIT IMPLEMENTIERT",
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
      "Aussagen sind an geprüfte Revisionen des Quellcodes gebunden.",
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
          { label: t(locale, "Source"), value: "GitHub · rappidAI-Research" },
        ]}
        indexLabel={t(locale, "Explore this page")}
        topics={[
          {
            href: "#tools-overview",
            label: t(locale, "Tool overview"),
            description: t(
              locale,
              "Understand the different jobs of Ghost and Replay before diving in.",
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
            <p className="kicker">{t(locale, "Two different questions")}</p>
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
          <table className="table min-w-[40rem]">
            <thead>
              <tr>
                <th scope="col" className="w-[16%]" />
                <th scope="col">rappidAI Ghost</th>
                <th scope="col">rappidAI Replay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{t(locale, "Question")}</th>
                <td className="text-ink">{c.ghostQuestion}</td>
                <td className="text-ink">{c.replayQuestion}</td>
              </tr>
              <tr>
                <th scope="row">{t(locale, "Scope")}</th>
                <td className="text-ink-soft">{c.ghostSummary}</td>
                <td className="text-ink-soft">{c.replaySummary}</td>
              </tr>
              <tr>
                <th scope="row">{t(locale, "Core actions")}</th>
                <td className="font-mono text-[0.8rem] text-ink-soft">
                  {tools[0].accent}
                </td>
                <td className="font-mono text-[0.8rem] text-ink-soft">
                  {tools[1].accent}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="band">
        <div className="page-shell section">
          <div className="tool-showcase lg:grid-cols-2">
            {tools.map((tool) => {
              const isGhost = tool.name === "Ghost";
              const facts = isGhost ? c.ghostFacts : c.replayFacts;
              const href = locale === "de" ? `/de${tool.href}` : tool.href;
              return (
                <article
                  key={tool.name}
                  className="tool-showcase-card card flex flex-col overflow-hidden"
                  data-reveal
                >
                  <div className="border-b border-line bg-pale-soft p-5">
                    <div className="window window-dark">
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
                    <p className="font-mono text-[0.72rem] tracking-[0.08em] text-muted">
                      {tool.accent}
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
                      <span className="chip chip-dot">
                        {isGhost
                          ? `${ghostRelease.version} · ${c.ghostStatus}`
                          : t(locale, "Experimental · Open source")}
                      </span>
                    </p>
                    <details>
                      <summary>{c.current}</summary>
                      <ul className="m-0 grid list-none gap-2 p-0 pb-4 text-sm leading-6 text-muted">
                        {facts.map((fact) => (
                          <li key={fact} className="flex gap-2">
                            <span aria-hidden="true" className="text-accent">
                              ✓
                            </span>
                            {fact}
                          </li>
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
