import { replayLinks } from "@/content/replay";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/replay");

const copy = {
  en: {
    intro: {
      eyebrow: "TOOL · REPLAY",
      title: "rappidAI Replay. Understand every run.",
      description:
        "Replay is a local-first execution recorder and state engine for AI-agent runs. Its deterministic core works without AI and is designed to make technical execution inspectable, restorable, branchable and comparable.",
    },
    status: "EXPERIMENTAL · CURRENT IMPLEMENTATION",
    currentTitle: "What is implemented today.",
    current: [
      "Generic execution recording with command, process and workspace capture.",
      "Verification of recorded state.",
      "Verified restore into a staged tree.",
      "Branch creation from historical state with explicit live-rerun consent.",
      "Live reruns with explicit execution consent. Recorded, controlled and hybrid modes are not implemented.",
      "Deterministic multi-dimensional replay diff.",
    ],
    principlesTitle: "The architecture separates evidence from interpretation.",
    principles: [
      "The deterministic core is complete without AI.",
      "The Generic Recorder remains mandatory; adapters may enrich but never gate recording.",
      "Watcher events are triggers for reconciliation, not authoritative truth.",
      "Final checkpoints plus reconciled file events and Merkle state are the technical source of truth.",
      "Playback and re-execution are separate concepts: playback reads stored evidence, rerun executes code.",
    ],
    ladderTitle: "Reproducibility is a ladder, not a binary claim.",
    ladder: [
      { k: "R0", v: "Inspectable" },
      { k: "R1", v: "Restorable" },
      { k: "R2", v: "Re-executable" },
      { k: "R3", v: "Controlled external I/O" },
      { k: "R4", v: "Containerized / fully captured" },
    ],
    ladderNote:
      "R0–R4 is the architecture contract for describing achieved reproducibility. The page does not claim every level is fully implemented for every session today.",
    architectureTitle: "State and storage architecture.",
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
      "Architecture targets that must not be confused with current implementation.",
    planned: [
      "Portable .rplay export/import package",
      "Complete external-I/O cassette ecosystem",
      "Full local UI",
      "Optional local intelligence sidecar",
      "Broader adapter coverage and hardening",
    ],
    findingsTitle: "Engineering findings.",
    findings: [
      "Reliable restore needs its own state model rather than relying only on terminal logs.",
      "Content-addressed storage and recursive state trees make state identity explicit and deduplicable.",
      "A filesystem watcher cannot be the source of truth by itself; reconciliation and checkpoints are required.",
      "Recorded playback should never silently execute code or access the network.",
      "Adapters are additive so reproducibility does not depend on one IDE or agent vendor.",
    ],
    usageTitle: "Current CLI surface.",
    audienceTitle: "Who it is for.",
    audience:
      "Developers and researchers debugging autonomous agents, comparing execution paths, reproducing failures, testing agent changes and preserving inspectable local evidence of what a run changed.",
    sourceTitle: "Reviewed architecture and source",
  },
  de: {
    intro: {
      eyebrow: "TOOL · REPLAY",
      title: "rappidAI Replay. Verstehe jeden Run.",
      description:
        "Replay ist ein Local-first Execution Recorder und State Engine für KI-Agenten-Runs. Der deterministische Kern funktioniert ohne KI und soll technische Ausführungen untersuchbar, wiederherstellbar, verzweigbar und vergleichbar machen.",
    },
    status: "EXPERIMENTELL · AKTUELLE IMPLEMENTIERUNG",
    currentTitle: "Was heute implementiert ist.",
    current: [
      "Generische Aufzeichnung von Ausführungen mit Command-, Prozess- und Workspace-Erfassung.",
      "Verifikation aufgezeichneter Zustände.",
      "Verifizierte Wiederherstellung in einen gestagten Tree.",
      "Branches aus historischen Zuständen mit expliziter Zustimmung zu Live-Reruns.",
      "Live-Reruns mit ausdrücklicher Ausführungsfreigabe. Recorded-, Controlled- und Hybrid-Modi sind nicht implementiert.",
      "Deterministischer multidimensionaler Replay-Diff.",
    ],
    principlesTitle: "Die Architektur trennt Evidenz von Interpretation.",
    principles: [
      "Der deterministische Kern funktioniert vollständig ohne KI.",
      "Der Generic Recorder bleibt verpflichtend; Adapter dürfen anreichern, aber Recording niemals voraussetzen oder blockieren.",
      "Watcher-Events sind Trigger für Reconciliation und nicht die autoritative Wahrheit.",
      "Finale Checkpoints plus reconciled File-Events und Merkle-State bilden die technische Quelle der Wahrheit.",
      "Playback und Re-Execution sind getrennte Konzepte: Playback liest gespeicherte Evidenz, Rerun führt Code aus.",
    ],
    ladderTitle:
      "Reproduzierbarkeit ist eine Stufenleiter, kein Ja/Nein-Claim.",
    ladder: [
      { k: "R0", v: "Inspectable" },
      { k: "R1", v: "Restorable" },
      { k: "R2", v: "Re-executable" },
      { k: "R3", v: "Controlled external I/O" },
      { k: "R4", v: "Containerized / fully captured" },
    ],
    ladderNote:
      "R0–R4 ist der Architekturvertrag zur Beschreibung der erreichten Reproduzierbarkeit. Diese Seite behauptet nicht, dass heute jede Stufe für jede Session vollständig implementiert ist.",
    architectureTitle: "State- und Storage-Architektur.",
    architecture: [
      "CLI / API Layer",
      "Session + Event Services",
      "Generic Recorder + Adapter",
      "Event Bus + State Engine",
      "SQLite-Metadaten und Indizes",
      "Content-addressed State Storage",
      "Optionaler read-only Intelligence Layer",
    ],
    plannedTitle:
      "Architekturziele, die nicht mit der aktuellen Implementierung verwechselt werden dürfen.",
    planned: [
      "Portables .rplay Export/Import-Paket",
      "Vollständiges External-I/O-Cassette-System",
      "Vollständige lokale UI",
      "Optionaler lokaler Intelligence-Sidecar",
      "Breitere Adapter-Abdeckung und Hardening",
    ],
    findingsTitle: "Engineering-Erkenntnisse.",
    findings: [
      "Zuverlässiges Restore braucht ein eigenes State-Modell und darf nicht nur auf Terminal-Logs beruhen.",
      "Content-addressed Storage und rekursive State Trees machen State-Identität explizit und deduplizierbar.",
      "Ein Filesystem-Watcher kann allein keine Quelle der Wahrheit sein; Reconciliation und Checkpoints sind notwendig.",
      "Recorded Playback darf niemals stillschweigend Code ausführen oder auf das Netzwerk zugreifen.",
      "Adapter bleiben additiv, damit Reproduzierbarkeit nicht von einer IDE oder einem Agenten-Anbieter abhängt.",
    ],
    usageTitle: "Aktuelle CLI-Oberfläche.",
    audienceTitle: "Für wen es gedacht ist.",
    audience:
      "Für Entwickler und Forschende, die autonome Agenten debuggen, Ausführungspfade vergleichen, Fehler reproduzieren, Agentenänderungen testen und lokal prüfbare Evidenz darüber erhalten wollen, was ein Run verändert hat.",
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
              ADR index
            </ActionLink>
            <ActionLink
              href={replayLinks.snapshot}
              external
              variant="secondary"
            >
              Reviewed revision
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
                    {String(i + 1).padStart(2, "0")}
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
                className="card flex gap-3 p-5 text-[0.95rem] leading-7 text-ink-soft"
              >
                <span aria-hidden="true" className="text-accent">
                  ✓
                </span>
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
              {locale === "de" ? "Designprinzipien" : "Design law"}
            </p>
            <h2 className="display-section">{c.principlesTitle}</h2>
          </div>
          <ol className="m-0 grid list-none gap-0 border-t border-line-strong p-0">
            {c.principles.map((x, i) => (
              <li
                key={x}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[4rem_1fr]"
              >
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
                ? "Reproduzierbarkeitsleiter"
                : "Reproducibility ladder"}
            </p>
            <h2 className="display-section">{c.ladderTitle}</h2>
          </div>
          <p>{c.ladderNote}</p>
        </div>
        <ol
          className="m-0 grid list-none gap-3 p-0 sm:grid-cols-5"
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
                <span className="chip chip-dot chip-planned">
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
                <span className="dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
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
                Pinned README
              </ActionLink>
              <ActionLink
                href={replayLinks.restore}
                external
                variant="secondary"
              >
                Restore ADR
              </ActionLink>
              <ActionLink href={replayLinks.rerun} external variant="secondary">
                Branch/Rerun ADR
              </ActionLink>
              <ActionLink href={replayLinks.diff} external variant="secondary">
                Diff ADR
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
