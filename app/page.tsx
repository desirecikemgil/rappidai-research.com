import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  SentinelArchitecture,
  SentinelCapabilities,
  SentinelHero,
  SentinelRoadmap,
} from "@/components/models/sentinel-preview";
import { ActionLink } from "@/components/ui/action-link";
import { ghostCopy, ghostRelease } from "@/content/ghost";
import { models } from "@/content/models";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";
import styles from "./home.module.css";

export const metadata: Metadata = metadataFor("/");

const copy = {
  en: {
    intro: "Independent AI research. Berlin.",
    description:
      "We build compact language models and open tools for inspectable AI systems. Independent, founder-led research from Berlin, with Quantum Sentinel-Alpha as our current security-model focus.",
    explore: "Explore our models",
    research: "Inside the research",
    work: "The work",
    workTitle: "Intelligence. Under your control.",
    workText:
      "From model weights to agent execution. Three distinct research directions, built around efficiency, transparency and local control.",
    quantum: "Compact models. Open experiments.",
    quantumText:
      "Security-specialized Sentinel, the Echelon model line and German-language pilot models. Explore the releases, methods and evidence behind each stage.",
    quantumStatus:
      "Sentinel Alpha + Echelon in development · Two public pilots",
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
    echelon: "The Echelon model line.",
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
      "Wir entwickeln kompakte Sprachmodelle und offene Werkzeuge für nachvollziehbare KI-Systeme. Unabhängige, gründergeführte Forschung aus Berlin – mit Quantum Sentinel-Alpha als unserem aktuellen Security-Modellschwerpunkt.",
    explore: "Modelle entdecken",
    research: "Einblick in die Forschung",
    work: "Unsere Arbeit",
    workTitle: "Intelligenz. Unter deiner Kontrolle.",
    workText:
      "Von Modellgewichten bis zur Agenten-Ausführung. Drei eigenständige Forschungsrichtungen mit Fokus auf Effizienz, Transparenz und lokale Kontrolle.",
    quantum: "Kompakte Modelle. Offene Experimente.",
    quantumText:
      "Das Security-spezialisierte Sentinel, die Echelon-Modelllinie und deutschsprachige Pilotmodelle. Entdecke Releases, Methoden und die Evidenz hinter jeder Phase.",
    quantumStatus:
      "Sentinel Alpha + Echelon in Entwicklung · Zwei öffentliche Piloten",
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
    echelon: "Die Echelon-Modelllinie.",
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
  const ghost = ghostCopy[locale];
  const lineup = localizeContent(models, locale);
  const path = (href: string) => localizePath(href, locale);
  return (
    <>
      <SentinelHero locale={locale} />
      <SentinelArchitecture locale={locale} />
      <SentinelCapabilities locale={locale} />
      <SentinelRoadmap locale={locale} />

      <section
        id="introduction"
        className={styles.company}
        aria-labelledby="introduction-title"
      >
        <div className={`page-shell ${styles.companyInner}`}>
          <div>
            <p className="kicker">rappidAI Research</p>
            <h2 id="introduction-title" className={styles.companyTitle}>
              {c.intro}
            </h2>
          </div>
          <div className={styles.companyBody}>
            <p>{c.description}</p>
            <Link className="text-link" href={path("/about")}>
              {c.aboutLink}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="work" className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">{c.work}</p>
            <h2 className="display-section">{c.workTitle}</h2>
          </div>
          <p>{c.workText}</p>
        </div>
        <div className={styles.portfolio} data-stagger>
          <article className={`${styles.product} product-quantum`}>
            <div className={styles.productVisual} aria-hidden="true">
              <div className="window">
                <div className="window-bar">
                  <span>Quantum</span>
                  <span>{lineup.length} / models</span>
                </div>
                <ul className={styles.lineup}>
                  {lineup.map((model) => (
                    <li key={model.slug}>
                      <span>{model.name}</span>
                      <span
                        className={`chip chip-dot ${
                          model.availability === "available"
                            ? "chip-ok"
                            : "chip-planned"
                        }`}
                      >
                        {model.availability === "available"
                          ? t(locale, "Public")
                          : t(locale, "In development")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.productBody}>
              <p className={styles.brand}>
                rappidAI <strong>Quantum</strong>
              </p>
              <h3>{c.quantum}</h3>
              <p>{c.quantumText}</p>
              <p className={`product-status ${styles.status}`}>
                {c.quantumStatus}
              </p>
              <Link href={path("/models")} className={styles.productLink}>
                {c.explore}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>

          <article className={`${styles.product} product-ghost`}>
            <div className={styles.productVisual} aria-hidden="true">
              <div className="window">
                <div className="window-bar">
                  <span>ghost run</span>
                  <span>{ghostRelease.version}</span>
                </div>
                <div className={styles.decisions}>
                  {ghost.policies.map((policy) => (
                    <span key={policy.name}>{policy.name}</span>
                  ))}
                </div>
                <p className={styles.bench}>
                  <span>GhostBench</span>
                  {ghost.benchResult}
                </p>
              </div>
            </div>
            <div className={styles.productBody}>
              <p className={styles.brand}>
                rappidAI <strong>Ghost</strong>
              </p>
              <h3>{c.ghost}</h3>
              <p>{c.ghostText}</p>
              <p className={`product-status ${styles.status}`}>
                {ghostRelease.version} · {c.ghostStatus}
              </p>
              <Link
                href={path("/tools/ghost")}
                className={styles.productLink}
                aria-label={`${c.open} rappidAI Ghost`}
              >
                {c.open}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>

          <article className={`${styles.product} product-replay`}>
            <div className={styles.productVisual} aria-hidden="true">
              <div className="window window-dark">
                <div className="window-bar">
                  <span>rappid replay</span>
                  <span>CLI</span>
                </div>
                <pre className="terminal">
                  {[
                    "rappid replay record -- <command>",
                    "rappid replay branch <state-id>",
                    "rappid replay diff <left-session-id> <right-session-id>",
                  ].map((line) => (
                    <span key={line} className="block">
                      <span className="prompt">$ </span>
                      {line}
                    </span>
                  ))}
                </pre>
              </div>
            </div>
            <div className={styles.productBody}>
              <p className={styles.brand}>
                rappidAI <strong>Replay</strong>
              </p>
              <h3>{c.replay}</h3>
              <p>{c.replayText}</p>
              <p className={`product-status ${styles.status}`}>
                {c.toolStatus}
              </p>
              <Link
                href={path("/tools/replay")}
                className={styles.productLink}
                aria-label={`${c.open} rappidAI Replay`}
              >
                {c.open}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="band">
        <div className={`page-shell section ${styles.approach}`}>
          <div className={styles.approachIntro}>
            <p className="kicker">{c.approach}</p>
            <h2 className="display-section">{c.approachTitle}</h2>
            <p className="lede">{c.approachText}</p>
            <Link href={path("/research")} className="text-link">
              {c.research}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <dl className={styles.principles} data-stagger>
            {c.principles.map(([title, text]) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="page-shell section">
        <div className="section-head split">
          <div>
            <p className="kicker">{c.latest}</p>
            <h2 className="display-section">{c.latestTitle}</h2>
          </div>
          <Link href={path("/resources/publications")} className="text-link">
            {c.all}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.journal}>
          <Link
            href={path(
              "/resources/publications/from-100m-to-600m-german-tokens",
            )}
            className={styles.feature}
            data-reveal
          >
            <figure className={styles.figure} aria-hidden="true">
              <div className={styles.bars}>
                <div>
                  <i style={{ height: `${(100 / 600) * 100}%` }} />
                  <span>quantum-1-pilot</span>
                  <strong>~100M</strong>
                </div>
                <div>
                  <i style={{ height: "100%" }} />
                  <span>quantum-1.6-pilot</span>
                  <strong>~600M</strong>
                </div>
              </div>
              <figcaption>{t(locale, "German training tokens")}</figcaption>
            </figure>
            <div className={styles.featureCopy}>
              <p className="kicker">{c.articleType}</p>
              <h3>{c.articleTitle}</h3>
              <p>{c.articleText}</p>
              <span className="text-link">
                {c.read}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>
          <div className={styles.aside}>
            <Link
              href={path("/models/quantum-1-echelon")}
              className={styles.asideItem}
            >
              <p className="kicker">Quantum Echelon</p>
              <h3>{c.echelon}</h3>
              <p>{c.echelonText}</p>
              <span className="text-link">
                {c.open}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
            <Link href={path("/resources")} className={styles.asideItem}>
              <p className="kicker">{t(locale, "Resources")}</p>
              <h3>{c.sources}</h3>
              <p>{c.sourcesText}</p>
              <span className="text-link">
                {c.open}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`page-shell ${styles.closingInner}`}>
          <div>
            <p className={styles.closingKicker}>rappidAI</p>
            <h2>{c.about}</h2>
          </div>
          <div className={styles.closingBody}>
            <p>{c.aboutText}</p>
            <div className="flex flex-wrap gap-3">
              <ActionLink href={path("/about")}>{c.aboutLink}</ActionLink>
              <Link href={path("/contact")} className={styles.closingLink}>
                {t(locale, "Contact")}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return <LocalizedHomePage locale="en" />;
}
