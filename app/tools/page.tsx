import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Tools — rappidAI Research",
  description: "Ghost and Replay: open-source infrastructure for controllable and reproducible AI-agent execution.",
};

const copy = {
  en: {
    intro: {
      eyebrow: "TOOLS",
      title: "Open infrastructure for controllable, reproducible AI-agent execution.",
      description:
        "Ghost and Replay are two independent open-source research tools around autonomous-agent infrastructure: Ghost constrains what an agent can reach and can expose controlled synthetic resources; Replay records execution so technical state can be inspected, restored, branched and compared.",
    },
    thesis: "TWO DIFFERENT QUESTIONS",
    thesisTitle: "Control the environment. Preserve the evidence.",
    ghostQuestion: "What may the agent access — and what happens when it touches a decoy?",
    replayQuestion: "What happened during the run — and can the technical state be reconstructed?",
    note: "Ghost and Replay are complementary research directions, not presented here as a single integrated product. Their current implementations remain separate repositories with separate guarantees.",
    ghostSummary: "A deception-aware security runtime with deterministic ALLOW, DENY and SHADOW policy outcomes.",
    replaySummary: "Local-first infrastructure for recording, restoring, branching, rerunning and diffing AI-agent executions.",
    current: "CURRENT IMPLEMENTATION",
    ghostFacts: ["Docker-isolated sessions", "Synthetic agent home and decoy resources", "Controlled HTTP/HTTPS egress", "Evidence-based decoy-access events", "Dynamic network containment"],
    replayFacts: ["Generic execution recorder", "Verified restore", "Branch and controlled rerun", "Deterministic multi-dimensional diff", "SQLite metadata plus content-addressed state"],
    inspect: "Inspect the source",
    learn: "Explore tool",
    evidenceTitle: "Claims are tied to reviewed source revisions.",
    evidenceText: "The pages below distinguish implemented behavior from architecture targets and link technical claims to pinned repository revisions and architecture records.",
  },
  de: {
    intro: {
      eyebrow: "TOOLS",
      title: "Offene Infrastruktur für kontrollierbare und reproduzierbare KI-Agenten-Ausführung.",
      description:
        "Ghost und Replay sind zwei unabhängige Open-Source-Forschungswerkzeuge rund um autonome Agenten-Infrastruktur: Ghost begrenzt, worauf ein Agent zugreifen kann, und kann kontrollierte synthetische Ressourcen bereitstellen; Replay zeichnet Ausführungen auf, damit technische Zustände untersucht, wiederhergestellt, verzweigt und verglichen werden können.",
    },
    thesis: "ZWEI UNTERSCHIEDLICHE FRAGEN",
    thesisTitle: "Umgebung kontrollieren. Evidenz bewahren.",
    ghostQuestion: "Worauf darf der Agent zugreifen – und was passiert, wenn er einen Köder berührt?",
    replayQuestion: "Was ist während des Runs passiert – und lässt sich der technische Zustand rekonstruieren?",
    note: "Ghost und Replay sind komplementäre Forschungsrichtungen, werden hier aber nicht als bereits integriertes Gesamtprodukt dargestellt. Die aktuellen Implementierungen bleiben getrennte Repositories mit getrennten Garantien.",
    ghostSummary: "Ein deception-aware Security Runtime mit deterministischen ALLOW-, DENY- und SHADOW-Entscheidungen.",
    replaySummary: "Local-first Infrastruktur zum Aufzeichnen, Wiederherstellen, Verzweigen, erneuten Ausführen und Vergleichen von KI-Agenten-Runs.",
    current: "AKTUELLE IMPLEMENTIERUNG",
    ghostFacts: ["Docker-isolierte Sessions", "Synthetisches Agenten-Home und Decoy-Ressourcen", "Kontrollierter HTTP/HTTPS-Egress", "Evidenzbasierte Decoy-Access-Events", "Dynamische Netzwerk-Containment"],
    replayFacts: ["Generischer Execution Recorder", "Verifizierte Wiederherstellung", "Branch und kontrollierter Rerun", "Deterministischer multidimensionaler Diff", "SQLite-Metadaten plus content-addressed State"],
    inspect: "Quellcode prüfen",
    learn: "Tool ansehen",
    evidenceTitle: "Aussagen sind an geprüfte Source-Revisions gebunden.",
    evidenceText: "Die folgenden Seiten trennen implementiertes Verhalten von Architektur-Zielen und verknüpfen technische Aussagen mit gepinnten Repository-Revisions und Architekturunterlagen.",
  },
} as const;

const tools = [
  {
    name: "Ghost",
    href: "/tools/ghost" as const,
    repo: "https://github.com/rappidAI-Research/rappid-ghost",
    accent: "ALLOW · DENY · SHADOW",
  },
  {
    name: "Replay",
    href: "/tools/replay" as const,
    repo: "https://github.com/rappidAI-Research/rappid-replay",
    accent: "RECORD · RESTORE · BRANCH · DIFF",
  },
] as const;

export function LocalizedToolsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <PageIntro {...c.intro} />
      <section className="page-shell pb-[var(--section-space)]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">{c.thesis}</p>
            <h2 className="display-section mt-7 text-ink">{c.thesisTitle}</h2>
          </div>
          <div className="liquid-surface p-6 sm:p-8">
            <p className="body-lg text-ink">Ghost — {c.ghostQuestion}</p>
            <p className="body-lg mt-5 text-ink">Replay — {c.replayQuestion}</p>
            <p className="body-copy mt-6">{c.note}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {tools.map((tool, index) => {
            const isGhost = tool.name === "Ghost";
            const facts = isGhost ? c.ghostFacts : c.replayFacts;
            const href = locale === "de" ? `/de${tool.href}` : tool.href;
            return (
              <Reveal key={tool.name} delay={index * 0.05} className="liquid-card p-7 sm:p-9">
                <p className="font-mono text-[0.66rem] tracking-[0.14em] text-accent uppercase">{tool.accent}</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">rappidAI {tool.name}</h2>
                <p className="body-lg mt-5">{isGhost ? c.ghostSummary : c.replaySummary}</p>
                <p className="eyebrow mt-9">{c.current}</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                  {facts.map((fact) => <li key={fact}>— {fact}</li>)}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ActionLink href={href} variant="primary">{c.learn}</ActionLink>
                  <ActionLink href={tool.repo} external variant="secondary">{c.inspect}</ActionLink>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="dark-band mt-16 overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <p className="eyebrow text-[var(--color-dark-muted)]">EVIDENCE BOUNDARY</p>
          <h2 className="display-section mt-6 max-w-3xl text-white">{c.evidenceTitle}</h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--color-dark-body)]">{c.evidenceText}</p>
        </Reveal>
      </section>
    </>
  );
}

export default function ToolsPage() {
  return <LocalizedToolsPage locale="en" />;
}
