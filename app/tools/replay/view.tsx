import { replayLinks } from "@/content/replay";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/replay");

const copy = {
  en: {
    intro: {
      eyebrow: "Tool · Replay",
      title: "rappidAI Replay: recording and comparing agent runs",
      description:
        "Replay is a local-first execution recorder and state engine for AI-agent runs. Its deterministic core works without AI and is designed to make technical execution inspectable, restorable, branchable and comparable.",
    },
    status: "Experimental · current implementation",
    currentTitle: "What is implemented today",
    current: [
      "Generic execution recording with command, process and workspace capture.",
      "Verification of recorded state.",
      "Verified restore into a staged tree.",
      "Branch creation from historical state with explicit live-rerun consent.",
      "Live reruns with explicit execution consent. Recorded, controlled and hybrid modes are not implemented.",
      "Deterministic multi-dimensional replay diff.",
    ],
    principlesTitle: "The architecture separates evidence from interpretation",
    principles: [
      "The deterministic core is complete without AI.",
      "The Generic Recorder remains mandatory; adapters may enrich but never gate recording.",
      "Watcher events are triggers for reconciliation, not authoritative truth.",
      "Final checkpoints plus reconciled file events and Merkle state are the technical source of truth.",
      "Playback and re-execution are separate concepts: playback reads stored evidence, rerun executes code.",
    ],
    ladderTitle: "Reproducibility is a ladder, not a binary claim",
    ladder: [
      { k: "R0", v: "Inspectable" },
      { k: "R1", v: "Restorable" },
      { k: "R2", v: "Re-executable" },
      { k: "R3", v: "Controlled external I/O" },
      { k: "R4", v: "Containerized / fully captured" },
    ],
    ladderNote:
      "R0–R4 is the architecture contract for describing achieved reproducibility. The page does not claim every level is fully implemented for every session today.",
    architectureTitle: "State and storage architecture",
    architecture: [
      "CLI / API layer",
      "Session + event services",
      "Generic recorder + adapters",
      "Event bus + state engine",
      "SQLite metadata and indexes",
      "Content-addressed state storage",
      "Optional read-only intelligence layer",
    ],
    plannedTitle:
      "Architecture targets that must not be confused with current implementation",
    planned: [
      "Portable .rplay export/import package",
      "Complete external-I/O cassette ecosystem",
      "Full local UI",
      "Optional local intelligence sidecar",
      "Broader adapter coverage and hardening",
    ],
    findingsTitle: "Engineering findings",
    findings: [
      "Reliable restore needs its own state model rather than relying only on terminal logs.",
      "Content-addressed storage and recursive state trees make state identity explicit and deduplicable.",
      "A filesystem watcher cannot be the source of truth by itself; reconciliation and checkpoints are required.",
      "Recorded playback should never silently execute code or access the network.",
      "Adapters are additive so reproducibility does not depend on one IDE or agent vendor.",
    ],
    usageTitle: "Current CLI surface",
    audienceTitle: "Who it is for",
    audience:
      "Developers and researchers debugging autonomous agents, comparing execution paths, reproducing failures, testing agent changes and preserving inspectable local evidence of what a run changed.",
    sourceTitle: "Reviewed architecture and source",
  },
  de: {
    intro: {
      eyebrow: "Tool · Replay",
      title: "rappidAI Replay: Agentenläufe aufzeichnen und vergleichen",
      description:
        "Replay ist ein lokal ausgerichteter Recorder und eine Zustands-Engine für Läufe von KI-Agenten. Der deterministische Kern funktioniert ohne KI. Er ist darauf ausgelegt, technische Ausführungen prüfbar, wiederherstellbar, verzweigbar und vergleichbar zu machen.",
    },
    status: "Experimentell · aktuelle Implementierung",
    currentTitle: "Was derzeit implementiert ist",
    current: [
      "Generische Aufzeichnung von Ausführungen; erfasst werden Befehl, Prozesse und Workspace.",
      "Überprüfung aufgezeichneter Zustände.",
      "Verifizierte Wiederherstellung in einen Staging-Verzeichnisbaum.",
      "Verzweigen aus früheren Zuständen, mit ausdrücklicher Zustimmung zur erneuten Live-Ausführung.",
      "Erneute Live-Ausführung nach ausdrücklicher Zustimmung. Die Modi Recorded, Controlled und Hybrid sind nicht implementiert.",
      "Deterministischer Replay-Vergleich über mehrere Dimensionen.",
    ],
    principlesTitle: "Die Architektur trennt Belege von ihrer Deutung",
    principles: [
      "Der deterministische Kern ist auch ohne KI vollständig.",
      "Der Generic Recorder bleibt Pflicht. Adapter dürfen die Aufzeichnung anreichern, sie aber nie von sich abhängig machen.",
      "Watcher-Ereignisse stoßen einen Abgleich an, sind aber nicht die maßgebliche Wahrheit.",
      "Finale Checkpoints, abgeglichene Dateiereignisse und der Merkle-Zustand bilden zusammen die technische Quelle der Wahrheit.",
      "Wiedergabe und erneute Ausführung sind getrennte Konzepte: Die Wiedergabe liest gespeicherte Nachweise, die erneute Ausführung führt Code aus.",
    ],
    ladderTitle:
      "Reproduzierbarkeit ist eine Stufenleiter, keine Ja-oder-Nein-Frage",
    ladder: [
      { k: "R0", v: "Prüfbar" },
      { k: "R1", v: "Wiederherstellbar" },
      { k: "R2", v: "Erneut ausführbar" },
      { k: "R3", v: "Kontrollierte externe I/O" },
      { k: "R4", v: "Containerisiert / vollständig erfasst" },
    ],
    ladderNote:
      "R0–R4 legt in der Architektur verbindlich fest, wie die erreichte Reproduzierbarkeit beschrieben wird. Diese Seite behauptet nicht, dass heute jede Stufe für jede Session vollständig implementiert ist.",
    architectureTitle: "Architektur für Zustände und Speicherung",
    architecture: [
      "CLI-/API-Schicht",
      "Session- und Ereignisdienste",
      "Generic Recorder + Adapter",
      "Event-Bus + Zustands-Engine",
      "SQLite-Metadaten und Indizes",
      "Inhaltsadressierter Zustandsspeicher",
      "Optionale Intelligence-Schicht (nur lesend)",
    ],
    plannedTitle: "Architekturziele, die noch nicht implementiert sind",
    planned: [
      "Portables .rplay-Paket für Export und Import",
      "Vollständiges Kassetten-Ökosystem für externe I/O",
      "Vollständige lokale Benutzeroberfläche",
      "Optionaler lokaler Intelligence-Sidecar",
      "Breitere Abdeckung durch Adapter und weitere Härtung",
    ],
    findingsTitle: "Erkenntnisse aus der Entwicklung",
    findings: [
      "Eine zuverlässige Wiederherstellung braucht ein eigenes Zustandsmodell; Terminal-Logs allein reichen nicht.",
      "Inhaltsadressierte Speicherung und rekursive Zustandsbäume machen die Identität von Zuständen explizit und erlauben Deduplizierung.",
      "Ein Dateisystem-Watcher allein kann nicht die Quelle der Wahrheit sein; Abgleich und Checkpoints sind nötig.",
      "Die Wiedergabe einer Aufzeichnung sollte nie unbemerkt Code ausführen oder auf das Netzwerk zugreifen.",
      "Adapter sind eine reine Ergänzung, damit die Reproduzierbarkeit nicht von einer bestimmten IDE oder einem einzelnen Agentenanbieter abhängt.",
    ],
    usageTitle: "Aktuelle CLI-Befehle",
    audienceTitle: "Für wen Replay gedacht ist",
    audience:
      "Für Entwickler und Forschende, die autonome Agenten debuggen, Ausführungspfade vergleichen, Fehler reproduzieren und Änderungen an Agenten testen und lokal prüfbare Nachweise darüber sichern wollen, was ein Lauf verändert hat.",
    sourceTitle: "Geprüfte Architektur und Quellen",
  },
} as const;

export function LocalizedReplayPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <PageIntro
        {...c.intro}
        indexLabel={locale === "de" ? "Auf dieser Seite" : "On this page"}
        topics={[
          {
            href: "#replay-current",
            label: locale === "de" ? "Funktionen" : "Capabilities",
            description: c.currentTitle,
          },
          {
            href: "#replay-principles",
            label: locale === "de" ? "Prinzipien" : "Principles",
            description: c.principlesTitle,
          },
          {
            href: "#replay-reproducibility",
            label: locale === "de" ? "Reproduzierbarkeit" : "Reproducibility",
            description: c.ladderTitle,
          },
          {
            href: "#replay-architecture",
            label: locale === "de" ? "Architektur" : "Architecture",
            description: c.architectureTitle,
          },
        ]}
        actions={
          <>
            <ActionLink href={replayLinks.repository} external>
              GitHub
            </ActionLink>
            <ActionLink
              href={replayLinks.architecture}
              external
              variant="secondary"
            >
              {locale === "de" ? "ADR-Übersicht" : "ADR index"}
            </ActionLink>
            <ActionLink
              href={replayLinks.snapshot}
              external
              variant="secondary"
            >
              {locale === "de" ? "Geprüfte Revision" : "Reviewed revision"}
            </ActionLink>
          </>
        }
        aside={
          <div className="window">
            <div className="window-bar">
              <span>replay · session</span>
              <span>{c.status}</span>
            </div>
            <ol className="m-0 list-none p-0">
              {c.architecture.map((layer, i) => (
                <li
                  key={layer}
                  className="flex items-center gap-4 border-b border-line px-5 py-3 text-[0.9rem] text-ink last:border-b-0"
                >
                  <span className="font-mono text-[0.72rem] text-muted">
                    {i + 1}
                  </span>
                  {layer}
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section id="replay-current" className="page-shell section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="kicker">{locale === "de" ? "Aktuell" : "Current"}</p>
            <h2 className="display-section mt-4">{c.currentTitle}</h2>
          </div>
          <ul
            className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2"
            data-stagger
          >
            {c.current.map((x) => (
              <li
                key={x}
                className="card p-5 text-[0.95rem] leading-7 text-ink-soft"
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="replay-principles" className="band">
        <div className="page-shell section">
          <div className="section-head">
            <p className="kicker">
              {locale === "de" ? "Designprinzipien" : "Design principles"}
            </p>
            <h2 className="display-section">{c.principlesTitle}</h2>
          </div>
          <ol className="m-0 grid list-none gap-0 border-t border-line-strong p-0">
            {c.principles.map((x) => (
              <li key={x} className="grid gap-2 border-b border-line py-5">
                <p className="m-0 text-[1.05rem] leading-7 text-ink">{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="replay-reproducibility" className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">
              {locale === "de"
                ? "Stufen der Reproduzierbarkeit"
                : "Reproducibility ladder"}
            </p>
            <h2 className="display-section">{c.ladderTitle}</h2>
          </div>
          <p>{c.ladderNote}</p>
        </div>
        <ol
          className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5"
          data-stagger
        >
          {c.ladder.map((x, i) => (
            <li
              key={x.k}
              className="card flex flex-col justify-end p-5"
              style={{ minHeight: `${7 + i * 1.6}rem` }}
            >
              <p className="m-0 font-mono text-sm text-accent">{x.k}</p>
              <p className="mt-2 text-[0.95rem] font-medium text-ink">{x.v}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="replay-architecture" className="band">
        <div className="page-shell section">
          <div className="section-head">
            <p className="kicker">
              {locale === "de" ? "Architektur" : "Architecture"}
            </p>
            <h2 className="display-section">{c.architectureTitle}</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <h3 className="m-0 text-xl font-medium tracking-[-0.03em] text-ink">
                {c.findingsTitle}
              </h3>
              <ul className="mt-5 grid list-none gap-3 p-0 text-[0.95rem] leading-7 text-muted">
                {c.findings.map((x) => (
                  <li key={x} className="border-t border-line pt-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 sm:p-8">
              <p className="m-0">
                <span className="chip">
                  {locale === "de"
                    ? "Geplant / Architekturziel"
                    : "Planned / Architecture target"}
                </span>
              </p>
              <h3 className="mt-4 text-xl font-medium tracking-[-0.03em] text-ink">
                {c.plannedTitle}
              </h3>
              <ul className="mt-5 grid list-none gap-3 p-0 text-[0.95rem] leading-7 text-muted">
                {c.planned.map((x) => (
                  <li key={x} className="border-t border-line pt-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="min-w-0">
            <h2 className="m-0 text-2xl font-medium tracking-[-0.035em] text-ink">
              {c.usageTitle}
            </h2>
            <div className="window window-dark mt-5">
              <div className="window-bar">
                <span>rappid replay</span>
              </div>
              <pre
                role="region"
                tabIndex={0}
                aria-label={c.usageTitle}
                className="terminal"
              >
                <code>{`rappid replay record -- <command>\nrappid replay verify <state-id>\nrappid replay restore <state-id>\nrappid replay branch <state-id>\nrappid replay rerun --mode live --confirm-execution <state-id> -- <command>\nrappid replay diff <left-session-id> <right-session-id>`}</code>
              </pre>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="m-0 text-2xl font-medium tracking-[-0.035em] text-ink">
              {c.audienceTitle}
            </h2>
            <p className="body-copy mt-4">{c.audience}</p>
            <p className="mt-8 text-sm font-medium text-ink">{c.sourceTitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ActionLink
                href={replayLinks.readme}
                external
                variant="secondary"
              >
                {locale === "de" ? "README (festgeschrieben)" : "Pinned README"}
              </ActionLink>
              <ActionLink
                href={replayLinks.restore}
                external
                variant="secondary"
              >
                {locale === "de" ? "ADR: Wiederherstellen" : "Restore ADR"}
              </ActionLink>
              <ActionLink href={replayLinks.rerun} external variant="secondary">
                {locale === "de"
                  ? "ADR: Verzweigen und erneut ausführen"
                  : "Branch/Rerun ADR"}
              </ActionLink>
              <ActionLink href={replayLinks.diff} external variant="secondary">
                {locale === "de" ? "ADR: Vergleich" : "Diff ADR"}
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ReplayPage() {
  return <LocalizedReplayPage locale="en" />;
}
