import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/ghost");

const GHOST_SHA = "cf32cdd6d708e132ab10278780a6d5b46b5f1eb8";
const repo = "https://github.com/rappidAI-Research/rappid-ghost";
const source = `${repo}/blob/${GHOST_SHA}`;

const copy = {
  en: {
    intro: { eyebrow: "TOOL · GHOST", title: "A deception-aware security runtime for autonomous AI agents.", description: "Ghost enforces deterministic access policy around agent execution. Beyond ALLOW and DENY, its SHADOW outcome exposes controlled synthetic resources while the corresponding real resource remains isolated." },
    status: "EXPERIMENTAL · CURRENT IMPLEMENTATION V0.3",
    currentTitle: "What the current implementation does.",
    current: ["Runs commands in ephemeral Docker containers with a private synthetic agent home.", "Supports SHADOW or DENY decisions for supported home resources such as synthetic AWS credentials, SSH-key-shaped files and .env decoys.", "Observes explicit decoy open/access events through a separate inotify sentinel and records evidence in SQLite.", "Defaults network access to deny, or permits exact-hostname HTTP/HTTPS egress through a per-session gateway.", "Can dynamically contain network access after a decoy-access security event."],
    triadTitle: "Three deterministic outcomes, not an AI classifier.",
    triad: [{k:"ALLOW",v:"Expose a permitted real resource."},{k:"DENY",v:"Block access."},{k:"SHADOW",v:"Expose a controlled synthetic resource instead of the corresponding real one."}],
    archTitle: "Architecture and session boundary.",
    arch: ["Ghost CLI / control plane", "Policy engine", "Docker runtime", "Workspace + synthetic home", "Decoy sentinel + event bus", "Per-session HTTP/HTTPS gateway", "SQLite session and event store"],
    findingsTitle: "Engineering findings and evidence boundaries.",
    findings: ["Deception is layered on top of isolation; it is not a replacement for isolation.", "Security enforcement does not depend on an LLM or cloud decision service.", "A DECOY_ACCESS event proves an observed open/access event for an explicit decoy path; it does not prove semantic data flow or exfiltration.", "Allowlisted egress is separated from the agent network so direct outbound routes remain unavailable.", "Exact-hostname allowlists and no TLS interception deliberately keep the MVP narrow and inspectable."],
    nonGoalsTitle: "What Ghost does not currently claim.",
    nonGoals: ["Prompt-injection detection", "Arbitrary filesystem virtualization", "TLS or request-content inspection", "General TCP/UDP proxying", "MCP interception", "Semantic data-flow tracking", "Proof that decoy credentials were exfiltrated", "Model-based risk scoring", "A web UI"],
    quickTitle: "Minimal workflow.",
    audienceTitle: "Who it is for.",
    audience: "Researchers and developers evaluating autonomous agents, tool-using models and local agent runtimes who need deterministic containment, deception experiments and inspectable security evidence.",
    baseline: "The original v0.1 architecture document defined the control-plane, policy, deception, network and event model. The current v0.3 repository is the implementation source of truth and extends that baseline with active decoy-access evidence, controlled egress and dynamic containment.",
    sources: "Reviewed sources",
  },
  de: {
    intro: { eyebrow: "TOOL · GHOST", title: "Ein deception-aware Security Runtime für autonome KI-Agenten.", description: "Ghost erzwingt deterministische Zugriffsregeln um Agenten-Ausführungen. Neben ALLOW und DENY kann SHADOW kontrollierte synthetische Ressourcen bereitstellen, während die entsprechende reale Ressource isoliert bleibt." },
    status: "EXPERIMENTELL · AKTUELLE IMPLEMENTIERUNG V0.3",
    currentTitle: "Was die aktuelle Implementierung macht.",
    current: ["Führt Befehle in kurzlebigen Docker-Containern mit privatem synthetischem Agenten-Home aus.", "Unterstützt SHADOW- oder DENY-Entscheidungen für unterstützte Home-Ressourcen wie synthetische AWS-Credentials, SSH-Key-förmige Dateien und .env-Decoys.", "Beobachtet explizite Decoy-Open/Access-Ereignisse über einen separaten inotify-Sentinel und speichert Evidenz in SQLite.", "Netzwerkzugriff ist standardmäßig blockiert oder wird für exakte Hostnamen via HTTP/HTTPS-Gateway erlaubt.", "Kann den Netzwerkzugriff nach einem Decoy-Access-Sicherheitsereignis dynamisch einschränken."],
    triadTitle: "Drei deterministische Ergebnisse – kein KI-Klassifikator.",
    triad: [{k:"ALLOW",v:"Eine erlaubte reale Ressource bereitstellen."},{k:"DENY",v:"Zugriff blockieren."},{k:"SHADOW",v:"Eine kontrollierte synthetische Ressource statt der realen bereitstellen."}],
    archTitle: "Architektur und Session-Grenze.",
    arch: ["Ghost CLI / Control Plane", "Policy Engine", "Docker Runtime", "Workspace + synthetisches Home", "Decoy Sentinel + Event Bus", "HTTP/HTTPS-Gateway pro Session", "SQLite Session- und Event-Store"],
    findingsTitle: "Engineering-Erkenntnisse und Evidenzgrenzen.",
    findings: ["Deception liegt auf Isolation auf und ersetzt Isolation nicht.", "Die Security-Enforcement-Logik hängt weder von einem LLM noch von einem Cloud-Entscheidungsdienst ab.", "Ein DECOY_ACCESS-Event belegt ein beobachtetes Open/Access-Ereignis an einem expliziten Decoy-Pfad; es beweist keinen semantischen Datenfluss oder Exfiltration.", "Allowlisted Egress ist vom Agenten-Netz getrennt, sodass direkte Outbound-Routen unavailable bleiben.", "Exakte Hostname-Allowlists und kein TLS-Interception halten den MVP bewusst eng und prüfbar."],
    nonGoalsTitle: "Was Ghost aktuell nicht behauptet.",
    nonGoals: ["Prompt-Injection-Erkennung", "Beliebige Filesystem-Virtualisierung", "TLS- oder Request-Content-Inspektion", "Allgemeines TCP/UDP-Proxying", "MCP-Interception", "Semantisches Data-Flow-Tracking", "Beweis, dass Decoy-Credentials exfiltriert wurden", "Model-basiertes Risk Scoring", "Web-UI"],
    quickTitle: "Minimaler Workflow.",
    audienceTitle: "Für wen es gedacht ist.",
    audience: "Für Forschende und Entwickler, die autonome Agenten, tool-using Modelle und lokale Agenten-Runtimes untersuchen und deterministische Containment-Regeln, Deception-Experimente und prüfbare Security-Evidenz benötigen.",
    baseline: "Das ursprüngliche v0.1-Architekturdokument definierte Control Plane, Policy-, Deception-, Netzwerk- und Event-Modell. Das aktuelle v0.3-Repository ist die Implementierungsquelle der Wahrheit und erweitert diese Basis um aktive Decoy-Access-Evidenz, kontrollierten Egress und dynamisches Containment.",
    sources: "Geprüfte Quellen",
  },
} as const;

export function LocalizedGhostPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <>
    <PageIntro {...c.intro} />
    <section className="page-shell pb-[var(--section-space)]">
      <Reveal className="liquid-surface p-7 sm:p-9"><p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{c.status}</p><p className="body-copy mt-5 max-w-4xl">{c.baseline}</p><div className="mt-7 flex flex-wrap gap-3"><ActionLink href={repo} external variant="primary">GitHub</ActionLink><ActionLink href={`${source}/docs/architecture.md`} external variant="secondary">Architecture</ActionLink><ActionLink href={`${source}/docs/security-model.md`} external variant="secondary">Security model</ActionLink></div></Reveal>

      <Reveal className="mt-16"><h2 className="display-section text-ink">{c.triadTitle}</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{c.triad.map(x=><div key={x.k} className="liquid-card p-7"><p className="font-mono text-sm tracking-[0.14em] text-accent">{x.k}</p><p className="body-copy mt-4">{x.v}</p></div>)}</div></Reveal>

      <Reveal className="mt-16 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">CURRENT</p><h2 className="display-section mt-6 text-ink">{c.currentTitle}</h2></div><ul className="liquid-surface space-y-4 p-7 sm:p-9">{c.current.map(x=><li key={x} className="body-copy">— {x}</li>)}</ul></Reveal>

      <Reveal className="mt-16"><p className="eyebrow">SYSTEM DESIGN</p><h2 className="display-section mt-6 text-ink">{c.archTitle}</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{c.arch.map((x,i)=><div key={x} className="liquid-card p-5"><p className="font-mono text-[0.62rem] text-accent">{String(i+1).padStart(2,"0")}</p><p className="mt-3 text-sm font-medium text-ink">{x}</p></div>)}</div></Reveal>

      <Reveal className="dark-band mt-16 rounded-[2rem] p-8 sm:p-12"><p className="eyebrow text-[var(--color-dark-muted)]">FINDINGS</p><h2 className="display-section mt-6 text-white">{c.findingsTitle}</h2><ul className="mt-8 grid gap-5 lg:grid-cols-2">{c.findings.map(x=><li key={x} className="text-sm leading-7 text-[var(--color-dark-body)]">— {x}</li>)}</ul></Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2"><Reveal className="liquid-card p-7 sm:p-9"><p className="eyebrow">BOUNDARIES</p><h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{c.nonGoalsTitle}</h2><ul className="mt-6 space-y-2 text-sm leading-6 text-muted">{c.nonGoals.map(x=><li key={x}>— {x}</li>)}</ul></Reveal><Reveal className="liquid-card p-7 sm:p-9"><p className="eyebrow">USAGE</p><h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">{c.quickTitle}</h2><pre className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-xs leading-6 text-white"><code>{`make build\n./bin/ghost version\nghost init\nghost run -- echo "hello from ghost"\nghost run -- sh -c 'cat ~/.aws/credentials'\nghost inspect latest`}</code></pre><h3 className="mt-8 text-lg font-semibold text-ink">{c.audienceTitle}</h3><p className="body-copy mt-3">{c.audience}</p></Reveal></div>

      <Reveal className="mt-16"><p className="eyebrow">{c.sources}</p><div className="mt-6 flex flex-wrap gap-3"><ActionLink href={`${source}/README.md`} external variant="secondary">Pinned README</ActionLink><ActionLink href={`${source}/docs/network-security.md`} external variant="secondary">Network security</ActionLink><ActionLink href={`${source}/docs/threat-model.md`} external variant="secondary">Threat model</ActionLink><ActionLink href={`${repo}/tree/${GHOST_SHA}`} external variant="secondary">Reviewed revision</ActionLink></div></Reveal>
    </section>
  </>;
}

export default function GhostPage(){ return <LocalizedGhostPage locale="en"/>; }
