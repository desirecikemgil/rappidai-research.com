import type { Metadata } from "next";
import Link from "next/link";
import { ghostRelease } from "@/content/ghost";
import { ArrowUpRight } from "lucide-react";
import { EchelonHero } from "@/components/models/echelon-hero";
import styles from "@/components/models/echelon.module.css";
import { SignalArt } from "@/components/graphics/signal-art";
import { ActionLink } from "@/components/ui/action-link";
import { localizePath, type Locale } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/");

const copy = {
  en: {
    intro: "Independent AI research. Berlin.",
    description:
      "We build compact language models and open tools for inspectable AI systems. Independent, founder-led research from Berlin, with Quantum 1 Echelon as our current major model project.",
    explore: "Explore our models",
    research: "Inside the research",
    work: "The work",
    workTitle: "Intelligence. Under your control.",
    workText:
      "From model weights to agent execution. Three distinct research directions, built around efficiency, transparency and local control.",
    quantum: "Compact models. Open experiments.",
    quantumText:
      "German-language pilot models, local inference and the next Echelon architecture. Explore the releases, methods and evidence behind each stage.",
    quantumStatus: "Two public pilots · Echelon in development",
    ghost: "Set the boundaries.",
    ghostText:
      "An integrated security runtime for autonomous agents: isolation, SHADOW deception, prompt-injection signals, scoped approvals, runtime limits and evidence behind one simple flow.",
    replay: "Understand every run.",
    replayText:
      "Record execution, restore technical state and compare branches. Local-first infrastructure for reproducible agent research.",
    toolStatus: "Experimental · Open source",
    ghostStatus: "Integrated agent security · Experimental",
    open: "Explore",
    approach: "Our approach",
    approachTitle: "Built to be understood.",
    approachText:
      "Useful research leaves a trail. We connect our work to code, model artifacts and documented methods, so you can examine what works and where the limits are.",
    principles: [
      [
        "Efficiency",
        "Compact architectures and local inference, with compute treated as a real constraint.",
      ],
      [
        "Control",
        "Inspectable systems and explicit boundaries around what an agent can access.",
      ],
      [
        "Evidence",
        "Published results, current development and open questions are clearly distinguished.",
      ],
    ],
    latest: "From the lab",
    latestTitle: "Research you can inspect.",
    all: "All publications",
    articleTitle: "From 100M to 600M German tokens.",
    articleText:
      "What continued pretraining taught us about quantum-1.6-pilot. Methods, results and the limits of a compact language model.",
    articleType: "Research note",
    read: "Read the research note",
    echelon: "The next model line.",
    echelonText:
      "Explore the 1B development target and the planned path from Base to Chat. Specifications are provisional; no trained model has been released.",
    sources: "Open by design.",
    sourcesText:
      "Find the model artifacts, source repositories and documentation behind the work.",
    about: "Independent. Focused. Berlin.",
    aboutText:
      "rappidAI is an early-stage, self-funded research and development initiative building compact intelligence and the infrastructure around it.",
    aboutLink: "Meet rappidAI",
  },
  de: {
    intro: "Unabhängige KI-Forschung. Berlin.",
    description:
      "Wir entwickeln kompakte Sprachmodelle und offene Werkzeuge für nachvollziehbare KI-Systeme. Unabhängige, gründergeführte Forschung aus Berlin – mit Quantum 1 Echelon als unserem aktuellen Modellschwerpunkt.",
    explore: "Modelle entdecken",
    research: "Einblick in die Forschung",
    work: "Unsere Arbeit",
    workTitle: "Intelligenz. Unter deiner Kontrolle.",
    workText:
      "Von Modellgewichten bis zur Agenten-Ausführung. Drei eigenständige Forschungsrichtungen mit Fokus auf Effizienz, Transparenz und lokale Kontrolle.",
    quantum: "Kompakte Modelle. Offene Experimente.",
    quantumText:
      "Deutschsprachige Pilotmodelle, lokale Inferenz und die nächste Echelon-Architektur. Entdecke Releases, Methoden und die Evidenz hinter jeder Phase.",
    quantumStatus: "Zwei öffentliche Piloten · Echelon in Entwicklung",
    ghost: "Setze die Grenzen.",
    ghostText:
      "Eine integrierte Security-Runtime für autonome Agenten: Isolation, SHADOW-Deception, Prompt-Injection-Signale, eng begrenzte Freigaben, Runtime-Limits und Evidenz in einem einfachen Ablauf.",
    replay: "Verstehe jeden Run.",
    replayText:
      "Ausführungen aufzeichnen, technische Zustände wiederherstellen und Branches vergleichen. Lokale Infrastruktur für reproduzierbare Agentenforschung.",
    toolStatus: "Experimentell · Open Source",
    ghostStatus: "Integrierte Agenten-Sicherheit · Experimentell",
    open: "Entdecken",
    approach: "Unser Ansatz",
    approachTitle: "Entwickelt, um verstanden zu werden.",
    approachText:
      "Nützliche Forschung hinterlässt Spuren. Wir verknüpfen unsere Arbeit mit Code, Modellartefakten und dokumentierten Methoden. So kannst du prüfen, was funktioniert und wo die Grenzen liegen.",
    principles: [
      [
        "Effizienz",
        "Kompakte Architekturen und lokale Inferenz mit Rechenleistung als realer Einschränkung.",
      ],
      [
        "Kontrolle",
        "Nachvollziehbare Systeme und explizite Grenzen für die Zugriffe eines Agenten.",
      ],
      [
        "Evidenz",
        "Veröffentlichte Ergebnisse, aktuelle Entwicklung und offene Fragen sind klar getrennt.",
      ],
    ],
    latest: "Aus dem Labor",
    latestTitle: "Forschung zum Nachvollziehen.",
    all: "Alle Publikationen",
    articleTitle: "Von 100M zu 600M deutschen Tokens.",
    articleText:
      "Was uns fortgesetztes Pretraining über quantum-1.6-pilot gezeigt hat. Methoden, Ergebnisse und die Grenzen eines kompakten Sprachmodells.",
    articleType: "Forschungsnotiz",
    read: "Forschungsnotiz lesen",
    echelon: "Die nächste Modelllinie.",
    echelonText:
      "Entdecke das 1B-Entwicklungsziel und den geplanten Weg von Base zu Chat. Die Spezifikationen sind vorläufig; noch kein trainiertes Modell veröffentlicht.",
    sources: "Offen entwickelt.",
    sourcesText:
      "Modellartefakte, Quellcode und Dokumentation hinter unserer Arbeit.",
    about: "Unabhängig. Fokussiert. Berlin.",
    aboutText:
      "rappidAI ist eine eigenfinanzierte Forschungs- und Entwicklungsinitiative in einer frühen Phase für kompakte Intelligenz und die Infrastruktur darum herum.",
    aboutLink: "Über rappidAI",
  },
} as const;

export function LocalizedHomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const path = (href: string) => localizePath(href, locale);
  return (
    <>
      <EchelonHero locale={locale} />
      <section
        id="introduction"
        className={`page-shell ${styles.introduction}`}
        aria-labelledby="introduction-title"
      >
        <div>
          <p className="studio-kicker">rappidAI Research</p>
          <h2 id="introduction-title">{c.intro}</h2>
        </div>
        <div>
          <p>{c.description}</p>
          <Link className="quiet-link" href={path("/about")}>
            {c.aboutLink}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section id="work" className="page-shell studio-section work-section">
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">{c.work}</p>
            <h2>{c.workTitle}</h2>
          </div>
          <p>{c.workText}</p>
        </div>
        <article className="product-feature product-quantum">
          <div className="product-copy">
            <p className="product-brand">
              rappidAI <span>Quantum</span>
            </p>
            <h3>{c.quantum}</h3>
            <p>{c.quantumText}</p>
            <span className="product-status">{c.quantumStatus}</span>
            <ActionLink href={path("/models")} className="on-navy-primary">
              {c.explore}
            </ActionLink>
          </div>
          <SignalArt />
        </article>
        <div className="product-pair">
          {(["ghost", "replay"] as const).map((kind) => (
            <article className={`product-feature product-${kind}`} key={kind}>
              <SignalArt kind={kind} />
              <div className="product-copy">
                <p className="product-brand">
                  rappidAI <span>{kind === "ghost" ? "Ghost" : "Replay"}</span>
                </p>
                <h3>{c[kind]}</h3>
                <p>{kind === "ghost" ? c.ghostText : c.replayText}</p>
                <div className="product-bottom">
                  <span className="product-status">
                    {kind === "ghost"
                      ? `${ghostRelease.version} · ${c.ghostStatus}`
                      : c.toolStatus}
                  </span>
                  <Link
                    href={path(`/tools/${kind}`)}
                    className="product-open"
                    aria-label={`${c.open} rappidAI ${kind === "ghost" ? "Ghost" : "Replay"}`}
                  >
                    <ArrowUpRight size={22} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="approach-section">
        <div className="page-shell studio-section approach-layout">
          <div>
            <p className="studio-kicker">{c.approach}</p>
            <h2 className="studio-title">{c.approachTitle}</h2>
            <p className="studio-description">{c.approachText}</p>
            <Link href={path("/research")} className="quiet-link">
              {c.research}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="approach-principles">
            {c.principles.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-shell studio-section">
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">{c.latest}</p>
            <h2>{c.latestTitle}</h2>
          </div>
          <Link href={path("/resources/publications")} className="quiet-link">
            {c.all}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="journal-layout">
          <Link
            href={path(
              "/resources/publications/from-100m-to-600m-german-tokens",
            )}
            className="journal-feature"
          >
            <div className="journal-figure" aria-hidden="true">
              <span>100M</span>
              <div className="token-steps">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <i key={n} style={{ height: `${25 + n * 12}%` }} />
                ))}
              </div>
              <span>600M</span>
            </div>
            <div className="journal-copy">
              <p className="studio-kicker">{c.articleType}</p>
              <h3>{c.articleTitle}</h3>
              <p>{c.articleText}</p>
              <span className="quiet-link">
                {c.read}
                <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
          <div className="journal-aside">
            <article>
              <p className="studio-kicker">Quantum Echelon</p>
              <h3>{c.echelon}</h3>
              <p>{c.echelonText}</p>
              <Link
                className="quiet-link"
                href={path("/models/quantum-1-echelon")}
              >
                {c.open}
                <ArrowUpRight size={18} />
              </Link>
            </article>
            <article>
              <p className="studio-kicker">Resources</p>
              <h3>{c.sources}</h3>
              <p>{c.sourcesText}</p>
              <Link className="quiet-link" href={path("/resources")}>
                {c.open}
                <ArrowUpRight size={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="studio-about-band">
        <div className="page-shell">
          <p className="studio-kicker">rappidAI</p>
          <h2>{c.about}</h2>
          <div>
            <p>{c.aboutText}</p>
            <ActionLink href={path("/about")} variant="secondary">
              {c.aboutLink}
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return <LocalizedHomePage locale="en" />;
}
