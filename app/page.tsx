import type { Metadata } from "next";
import Link from "next/link";
import {
  SentinelArchitecture,
  SentinelCapabilities,
  SentinelHero,
  SentinelRoadmap,
} from "@/components/models/sentinel-preview";
import { DetectionOutcomesArt } from "@/components/resources/publication-art";
import { ActionLink } from "@/components/ui/action-link";
import { ghostCopy, ghostRelease } from "@/content/ghost";
import { modelListName, models } from "@/content/models";
import { localizeContent, localizePath, t, type Locale } from "@/lib/i18n";
import { metadataFor } from "@/lib/metadata";
import styles from "./home.module.css";

export const metadata: Metadata = metadataFor("/");

const copy = {
  en: {
    intro: "Independent AI research from Berlin",
    description:
      "We build compact language models and open tools for inspectable AI systems. rappidAI is an independent, founder-led research initiative in Berlin; our current focus is Quantum Sentinel-Alpha, a security model in development.",
    explore: "Explore our models",
    research: "Inside the research",
    work: "The work",
    workTitle: "Three research areas",
    workText:
      "From model weights to agent execution. Three distinct research directions, built around efficiency, transparency and local control.",
    quantum: "Compact language models",
    quantumText:
      "Security-specialized Sentinel, the Echelon model line and German-language pilot models. Explore the releases, methods and evidence behind each stage.",
    quantumStatus:
      "Sentinel-Alpha and Echelon in development, two public pilots",
    ghost: "Security runtime for AI agents",
    ghostText:
      "An integrated security runtime for autonomous agents: isolation, SHADOW deception, prompt-injection signals, scoped approvals, runtime limits and evidence behind one simple flow.",
    replay: "Recording and comparing agent runs",
    replayText:
      "Record execution, restore technical state and compare branches. Local-first infrastructure for reproducible agent research.",
    toolStatus: "Experimental · Open source",
    ghostStatus: "Experimental",
    open: "Explore",
    approach: "Our approach",
    approachTitle: "Principles of our work",
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
    latestTitle: "Latest research and publications",
    all: "All publications",
    articleTitle: "From 100M to 600M German tokens",
    articleText:
      "What continued pretraining taught us about quantum-1.6-pilot. Methods, results and the limits of a compact language model.",
    articleType: "Research note",
    read: "Read the research note",
    fpTitle: "The false positive problem in AI vulnerability detection",
    fpText:
      "Why AI-based security analysis struggles to tell real vulnerabilities from harmless code that only looks dangerous, and how evaluation should account for it.",
    echelon: "The Echelon model line",
    echelonText:
      "Explore the 1B development target and the planned path from Base to Chat. Specifications are provisional; no trained model has been released.",
    sources: "Code, models and documentation",
    sourcesText:
      "Find the model artifacts, source repositories and documentation behind the work.",
    about: "An independent research initiative in Berlin",
    aboutText:
      "rappidAI is an early-stage, self-funded research and development initiative building compact intelligence and the infrastructure around it.",
    aboutLink: "Meet rappidAI",
  },
  de: {
    intro: "Unabhängige KI-Forschung aus Berlin",
    description:
      "Wir entwickeln kompakte Sprachmodelle und offene Werkzeuge für nachvollziehbare KI-Systeme. rappidAI ist eine unabhängige, gründergeführte Forschungsinitiative aus Berlin; derzeit konzentrieren wir uns auf Quantum Sentinel-Alpha, unser Sicherheitsmodell in Entwicklung.",
    explore: "Modelle ansehen",
    research: "Mehr zur Forschung",
    work: "Unsere Arbeit",
    workTitle: "Drei Forschungsbereiche",
    workText:
      "Von den Modellgewichten bis zur Ausführung von Agenten: drei eigenständige Forschungsrichtungen, ausgerichtet auf Effizienz, Transparenz und lokale Kontrolle.",
    quantum: "Kompakte Sprachmodelle",
    quantumText:
      "Das auf Sicherheit spezialisierte Sentinel, die Echelon-Modelllinie und deutschsprachige Pilotmodelle. Zu jeder Phase dokumentieren wir Veröffentlichungen, Methoden und Belege.",
    quantumStatus:
      "Sentinel-Alpha und Echelon in Entwicklung, zwei öffentliche Pilotmodelle",
    ghost: "Security-Runtime für KI-Agenten",
    ghostText:
      "Eine integrierte Security-Runtime für autonome Agenten: Isolation, Täuschung per SHADOW, Prompt-Injection-Signale, eng begrenzte Freigaben, Laufzeitgrenzen und Nachweise, gebündelt in einem einfachen Ablauf.",
    replay: "Agentenläufe aufzeichnen und vergleichen",
    replayText:
      "Ausführungen aufzeichnen, technische Zustände wiederherstellen und verzweigte Läufe vergleichen. Lokal ausgerichtete Infrastruktur für reproduzierbare Forschung an KI-Agenten.",
    toolStatus: "Experimentell · Open Source",
    ghostStatus: "Experimentell",
    open: "Mehr erfahren",
    approach: "Unser Ansatz",
    approachTitle: "Grundsätze unserer Arbeit",
    approachText:
      "Nützliche Forschung hinterlässt Spuren. Wir verknüpfen unsere Arbeit mit Code, Modellartefakten und dokumentierten Methoden. So lässt sich prüfen, was funktioniert und wo die Grenzen liegen.",
    principles: [
      [
        "Effizienz",
        "Kompakte Architekturen und lokale Inferenz. Rechenleistung behandeln wir als echte Beschränkung.",
      ],
      [
        "Kontrolle",
        "Nachvollziehbare Systeme und klar festgelegte Grenzen dafür, worauf ein Agent zugreifen kann.",
      ],
      [
        "Belege",
        "Veröffentlichte Ergebnisse, laufende Entwicklung und offene Fragen halten wir klar auseinander.",
      ],
    ],
    latest: "Aus dem Labor",
    latestTitle: "Aktuelle Forschung und Veröffentlichungen",
    all: "Alle Veröffentlichungen",
    articleTitle: "Von 100 auf 600 Millionen deutsche Tokens",
    articleText:
      "Was wir aus dem fortgesetzten Pretraining von quantum-1.6-pilot gelernt haben: Methoden, Ergebnisse und die Grenzen eines kompakten Sprachmodells.",
    articleType: "Forschungsnotiz",
    read: "Forschungsnotiz lesen",
    fpTitle:
      "Das False-Positive-Problem bei der KI-gestützten Erkennung von Schwachstellen",
    fpText:
      "Warum KI-gestützte Sicherheitsanalysen echte Schwachstellen nur schwer von harmlosem Code unterscheiden, der lediglich gefährlich aussieht, und wie eine Evaluation das berücksichtigen sollte.",
    echelon: "Die Echelon-Modelllinie",
    echelonText:
      "Das 1B-Entwicklungsziel und der geplante Weg von Base zu Chat. Die Spezifikationen sind vorläufig; ein trainiertes Modell ist noch nicht veröffentlicht.",
    sources: "Code, Modelle und Dokumentation",
    sourcesText:
      "Modellartefakte, Quellcode-Repositories und Dokumentation zu unserer Arbeit.",
    about: "Eine unabhängige Forschungsinitiative in Berlin",
    aboutText:
      "rappidAI ist eine eigenfinanzierte Forschungs- und Entwicklungsinitiative in der Frühphase. Wir entwickeln kompakte KI und die zugehörige Infrastruktur.",
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
                      <span>{modelListName(model.slug)}</span>
                      <span className="chip">
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
          </Link>
        </div>
        <div className={styles.journal}>
          <div className={styles.notes}>
            <Link
              href={path(
                "/resources/publications/false-positive-problem-in-ai-vulnerability-detection",
              )}
              className={styles.feature}
              data-reveal
            >
              <figure className={styles.figure} aria-hidden="true">
                <div className={styles.outcomes}>
                  <DetectionOutcomesArt locale={locale} />
                </div>
                <figcaption>{t(locale, "Detection outcomes")}</figcaption>
              </figure>
              <div className={styles.featureCopy}>
                <p className="kicker">{c.articleType}</p>
                <h3>{c.fpTitle}</h3>
                <p>{c.fpText}</p>
                <span className="text-link">{c.read}</span>
              </div>
            </Link>
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
                <span className="text-link">{c.read}</span>
              </div>
            </Link>
          </div>
          <div className={styles.aside}>
            <Link
              href={path("/models/quantum-1-echelon")}
              className={styles.asideItem}
            >
              <p className="kicker">Quantum Echelon</p>
              <h3>{c.echelon}</h3>
              <p>{c.echelonText}</p>
              <span className="text-link">{c.open}</span>
            </Link>
            <Link href={path("/resources")} className={styles.asideItem}>
              <p className="kicker">{t(locale, "Resources")}</p>
              <h3>{c.sources}</h3>
              <p>{c.sourcesText}</p>
              <span className="text-link">{c.open}</span>
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
