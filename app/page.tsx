import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { SignalArt } from "@/components/graphics/signal-art";
import { ActionLink } from "@/components/ui/action-link";
import { localizePath, type Locale } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";

export const metadata: Metadata = metadataFor("/");

const copy = {
  en: {
    intro: "Independent AI research. Berlin.",
    description:
      "We build compact language models and open tools for AI systems you can inspect, understand and control.",
    explore: "Explore our models",
    research: "Inside the research",
    discover: "Discover rappidAI",
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
      "A security runtime for agent execution. Allow, deny or expose controlled decoys, with inspectable policy decisions.",
    replay: "Understand every run.",
    replayText:
      "Record execution, restore technical state and compare branches. Local-first infrastructure for reproducible agent research.",
    toolStatus: "Experimental · Open source",
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
      "Follow Echelon’s architecture, tokenizer and data pipeline. Currently at pipeline and preflight stage; no trained model release.",
    sources: "Open by design.",
    sourcesText:
      "Find the model artifacts, source repositories and documentation behind the work.",
    about: "Independent. Focused. Berlin.",
    aboutText:
      "rappidAI is an independent research initiative exploring compact intelligence and the infrastructure around it.",
    aboutLink: "Meet rappidAI",
  },
  de: {
    intro: "Unabhängige KI-Forschung. Berlin.",
    description:
      "Wir entwickeln kompakte Sprachmodelle und offene Werkzeuge für KI-Systeme, die sich untersuchen, verstehen und kontrollieren lassen.",
    explore: "Modelle entdecken",
    research: "Einblick in die Forschung",
    discover: "rappidAI entdecken",
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
      "Eine Security-Runtime für Agenten. Zugriffe erlauben, ablehnen oder kontrollierte Köder bereitstellen – mit nachvollziehbaren Entscheidungen.",
    replay: "Verstehe jeden Run.",
    replayText:
      "Ausführungen aufzeichnen, technische Zustände wiederherstellen und Branches vergleichen. Lokale Infrastruktur für reproduzierbare Agentenforschung.",
    toolStatus: "Experimentell · Open Source",
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
      "Verfolge Echelons Architektur, Tokenizer und Datenpipeline. Aktuell in der Pipeline- und Preflight-Phase; noch kein trainiertes Modell veröffentlicht.",
    sources: "Offen entwickelt.",
    sourcesText:
      "Modellartefakte, Quellcode und Dokumentation hinter unserer Arbeit.",
    about: "Unabhängig. Fokussiert. Berlin.",
    aboutText:
      "rappidAI ist eine unabhängige Forschungsinitiative für kompakte Intelligenz und die Infrastruktur darum herum.",
    aboutLink: "Über rappidAI",
  },
} as const;

export function LocalizedHomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const path = (href: string) => localizePath(href, locale);
  return (
    <>
      <section className="brand-hero home-hero">
        <SignalArt className="brand-hero-art" />
        <div className="page-shell-wide brand-hero-shell">
          <p className="brand-origin">
            <span />
            {c.intro}
          </p>
          <h1 className="home-hero-title brand-headline">
            <span className="reveal-text-line">Smaller Models.</span>
            <span className="reveal-text-line">Focused Intelligence.</span>
          </h1>
          <div className="brand-hero-bottom">
            <div className="brand-hero-description">
              <p>{c.description}</p>
              <div className="brand-actions">
                <ActionLink href={path("/models")} className="on-navy-primary">
                  {c.explore}
                </ActionLink>
                <Link className="quiet-link" href={path("/research")}>
                  {c.research}
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
            <a className="hero-discover" href="#work">
              <ArrowDown size={18} />
              {c.discover}
            </a>
          </div>
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
                  <span className="product-status">{c.toolStatus}</span>
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
