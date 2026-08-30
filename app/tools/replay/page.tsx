import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/replay");

const REPLAY_SHA = "8a1b5978e1fd6b51cfe19c8e2746609a6839c801";
const repo = "https://github.com/rappidAI-Research/rappid-replay";
const source = `${repo}/blob/${REPLAY_SHA}`;

const copy = {
  en: {
    intro: { eyebrow: "TOOL · REPLAY", title: "Open infrastructure for reproducible AI-agent execution.", description: "Replay is a local-first execution recorder and state engine for AI-agent runs. Its deterministic core works without AI and is designed to make technical execution inspectable, restorable, branchable and comparable." },
    status: "EXPERIMENTAL · CURRENT IMPLEMENTATION",
    currentTitle: "What is implemented today.",
    current: ["Generic execution recording with command, process and workspace capture.", "Verification of recorded state.", "Verified restore into a staged tree.", "Branch creation from historical state with explicit live-rerun consent.", "Controlled rerun workflows.", "Deterministic multi-dimensional replay diff."],
    principlesTitle: "The architecture separates evidence from interpretation.",
    principles: ["The deterministic core is complete without AI.", "The Generic Recorder remains mandatory; adapters may enrich but never gate recording.", "Watcher events are triggers for reconciliation, not authoritative truth.", "Final checkpoints plus reconciled file events and Merkle state are the technical source of truth.", "Playback and re-execution are separate concepts: playback reads stored evidence, rerun executes code."],
    ladderTitle: "Reproducibility is a ladder, not a binary claim.",
    ladder: [{k:"R0",v:"Inspectable"},{k:"R1",v:"Restorable"},{k:"R2",v:"Re-executable"},{k:"R3",v:"Controlled external I/O"},{k:"R4",v:"Containerized / fully captured"}],
    ladderNote: "R0–R4 is the architecture contract for describing achieved reproducibility. The page does not claim every level is fully implemented for every session today.",
    architectureTitle: "State and storage architecture.",
    architecture: ["CLI / API layer", "Session + event services", "Generic recorder + adapters", "Event bus + state engine", "SQLite metadata and indexes", "Content-addressed state storage", "Optional read-only intelligence layer"],
    plannedTitle: "Architecture targets that must not be confused with current implementation.",
    planned: ["Portable .rplay export/import package", "Complete external-I/O cassette ecosystem", "Full local UI", "Optional local intelligence sidecar", "Broader adapter coverage and hardening"],
    findingsTitle: "Engineering findings.",
    findings: ["Reliable restore needs its own state model rather than relying only on terminal logs.", "Content-addressed storage and recursive state trees make state identity explicit and deduplicable.", "A filesystem watcher cannot be the source of truth by itself; reconciliation and checkpoints are required.", "Recorded playback should never silently execute code or access the network.", "Adapters are additive so reproducibility does not depend on one IDE or agent vendor."],
    usageTitle: "Current CLI surface.",
    audienceTitle: "Who it is for.",
    audience: "Developers and researchers debugging autonomous agents, comparing execution paths, reproducing failures, testing agent changes and preserving inspectable local evidence of what a run changed.",
    sourceTitle: "Reviewed architecture and source",
  },
  de: {
    intro: { eyebrow: "TOOL · REPLAY", title: "Offene Infrastruktur für reproduzierbare KI-Agenten-Ausführung.", description: "Replay ist ein Local-first Execution Recorder und State Engine für KI-Agenten-Runs. Der deterministische Kern funktioniert ohne KI und soll technische Ausführungen untersuchbar, wiederherstellbar, verzweigbar und vergleichbar machen." },
    status: "EXPERIMENTELL · AKTUELLE IMPLEMENTIERUNG",
    currentTitle: "Was heute implementiert ist.",
    current: ["Generische Aufzeichnung von Ausführungen mit Command-, Prozess- und Workspace-Erfassung.", "Verifikation aufgezeichneter Zustände.", "Verifizierte Wiederherstellung in einen gestagten Tree.", "Branches aus historischen Zuständen mit expliziter Zustimmung zu Live-Reruns.", "Kontrollierte Rerun-Workflows.", "Deterministischer multidimensionaler Replay-Diff."],
    principlesTitle: "Die Architektur trennt Evidenz von Interpretation.",
    principles: ["Der deterministische Kern funktioniert vollständig ohne KI.", "Der Generic Recorder bleibt verpflichtend; Adapter dürfen anreichern, aber Recording niemals voraussetzen oder blockieren.", "Watcher-Events sind Trigger für Reconciliation und nicht die autoritative Wahrheit.", "Finale Checkpoints plus reconciled File-Events und Merkle-State bilden die technische Quelle der Wahrheit.", "Playback und Re-Execution sind getrennte Konzepte: Playback liest gespeicherte Evidenz, Rerun führt Code aus."],
    ladderTitle: "Reproduzierbarkeit ist eine Stufenleiter, kein Ja/Nein-Claim.",
    ladder: [{k:"R0",v:"Inspectable"},{k:"R1",v:"Restorable"},{k:"R2",v:"Re-executable"},{k:"R3",v:"Controlled external I/O"},{k:"R4",v:"Containerized / fully captured"}],
    ladderNote: "R0–R4 ist der Architekturvertrag zur Beschreibung der erreichten Reproduzierbarkeit. Diese Seite behauptet nicht, dass heute jede Stufe für jede Session vollständig implementiert ist.",
    architectureTitle: "State- und Storage-Architektur.",
    architecture: ["CLI / API Layer", "Session + Event Services", "Generic Recorder + Adapter", "Event Bus + State Engine", "SQLite-Metadaten und Indizes", "Content-addressed State Storage", "Optionaler read-only Intelligence Layer"],
    plannedTitle: "Architekturziele, die nicht mit der aktuellen Implementierung verwechselt werden dürfen.",
    planned: ["Portables .rplay Export/Import-Paket", "Vollständiges External-I/O-Cassette-System", "Vollständige lokale UI", "Optionaler lokaler Intelligence-Sidecar", "Breitere Adapter-Abdeckung und Hardening"],
    findingsTitle: "Engineering-Erkenntnisse.",
    findings: ["Zuverlässiges Restore braucht ein eigenes State-Modell und darf nicht nur auf Terminal-Logs beruhen.", "Content-addressed Storage und rekursive State Trees machen State-Identität explizit und deduplizierbar.", "Ein Filesystem-Watcher kann allein keine Quelle der Wahrheit sein; Reconciliation und Checkpoints sind notwendig.", "Recorded Playback darf niemals stillschweigend Code ausführen oder auf das Netzwerk zugreifen.", "Adapter bleiben additiv, damit Reproduzierbarkeit nicht von einer IDE oder einem Agenten-Anbieter abhängt."],
    usageTitle: "Aktuelle CLI-Oberfläche.",
    audienceTitle: "Für wen es gedacht ist.",
    audience: "Für Entwickler und Forschende, die autonome Agenten debuggen, Ausführungspfade vergleichen, Fehler reproduzieren, Agentenänderungen testen und lokal prüfbare Evidenz darüber erhalten wollen, was ein Run verändert hat.",
    sourceTitle: "Geprüfte Architektur und Quellen",
  },
} as const;

export function LocalizedReplayPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <>
    <PageIntro {...c.intro} />
    <section className="page-shell pb-[var(--section-space)]">
      <Reveal className="liquid-surface p-7 sm:p-9"><p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{c.status}</p><div className="mt-7 flex flex-wrap gap-3"><ActionLink href={repo} external variant="primary">GitHub</ActionLink><ActionLink href={`${source}/docs/adr/README.md`} external variant="secondary">ADR index</ActionLink><ActionLink href={`${repo}/tree/${REPLAY_SHA}`} external variant="secondary">Reviewed revision</ActionLink></div></Reveal>

      <Reveal className="mt-16 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">CURRENT</p><h2 className="display-section mt-6 text-ink">{c.currentTitle}</h2></div><ul className="liquid-surface space-y-4 p-7 sm:p-9">{c.current.map(x=><li key={x} className="body-copy">— {x}</li>)}</ul></Reveal>

      <Reveal className="mt-16"><p className="eyebrow">DESIGN LAW</p><h2 className="display-section mt-6 text-ink">{c.principlesTitle}</h2><div className="mt-8 grid gap-4 lg:grid-cols-2">{c.principles.map(x=><div key={x} className="liquid-card p-6"><p className="body-copy">{x}</p></div>)}</div></Reveal>

      <Reveal className="dark-band mt-16 rounded-[2rem] p-8 sm:p-12"><p className="eyebrow text-[var(--color-dark-muted)]">REPRODUCIBILITY LADDER</p><h2 className="display-section mt-6 max-w-3xl text-white">{c.ladderTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-5">{c.ladder.map(x=><div key={x.k} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="font-mono text-sm text-[var(--color-dark-accent)]">{x.k}</p><p className="mt-3 text-sm text-white">{x.v}</p></div>)}</div><p className="mt-7 max-w-4xl text-sm leading-7 text-[var(--color-dark-body)]">{c.ladderNote}</p></Reveal>

      <Reveal className="mt-16"><p className="eyebrow">ARCHITECTURE</p><h2 className="display-section mt-6 text-ink">{c.architectureTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{c.architecture.map((x,i)=><div key={x} className="liquid-card p-5"><p className="font-mono text-[0.62rem] text-accent">{String(i+1).padStart(2,"0")}</p><p className="mt-3 text-sm font-medium text-ink">{x}</p></div>)}</div></Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2"><Reveal className="liquid-card p-7 sm:p-9"><p className="eyebrow">FINDINGS</p><h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{c.findingsTitle}</h2><ul className="mt-6 space-y-3 text-sm leading-7 text-muted">{c.findings.map(x=><li key={x}>— {x}</li>)}</ul></Reveal><Reveal className="liquid-card p-7 sm:p-9"><p className="eyebrow">PLANNED / ARCHITECTURE TARGET</p><h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{c.plannedTitle}</h2><ul className="mt-6 space-y-3 text-sm leading-7 text-muted">{c.planned.map(x=><li key={x}>— {x}</li>)}</ul></Reveal></div>

      <Reveal className="mt-16 grid gap-6 lg:grid-cols-2"><div className="liquid-surface p-7 sm:p-9"><p className="eyebrow">USAGE</p><h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{c.usageTitle}</h2><pre className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-xs leading-6 text-white"><code>{`rappid replay record -- <command>\nrappid replay verify <session>\nrappid replay restore <session>\nrappid replay branch <session>\nrappid replay rerun <session>\nrappid replay diff <left> <right>`}</code></pre></div><div className="liquid-surface p-7 sm:p-9"><p className="eyebrow">AUDIENCE</p><h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{c.audienceTitle}</h2><p className="body-copy mt-5">{c.audience}</p></div></Reveal>

      <Reveal className="mt-16"><p className="eyebrow">{c.sourceTitle}</p><div className="mt-6 flex flex-wrap gap-3"><ActionLink href={`${source}/README.md`} external variant="secondary">Pinned README</ActionLink><ActionLink href={`${source}/docs/adr/028-restore-verifies-first-and-commits-staged-tree.md`} external variant="secondary">Restore ADR</ActionLink><ActionLink href={`${source}/docs/adr/029-branch-exact-state-and-explicit-live-rerun-consent.md`} external variant="secondary">Branch/Rerun ADR</ActionLink><ActionLink href={`${source}/docs/adr/030-replay-diff-deterministic-multi-dimensional-read-only.md`} external variant="secondary">Diff ADR</ActionLink></div></Reveal>
    </section>
  </>;
}

export default function ReplayPage(){ return <LocalizedReplayPage locale="en"/>; }
