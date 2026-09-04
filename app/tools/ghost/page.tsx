import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/ghost");

const GHOST_SHA = "83974c3115f103a1982bb445c3f2aef6a8f528ea";
const repo = "https://github.com/rappidAI-Research/rappid-ghost";
const source = `${repo}/blob/${GHOST_SHA}`;

const copy = {
  en: {
    intro: {
      eyebrow: "TOOL · GHOST",
      title:
        "Deterministic containment and deception for autonomous AI agents.",
      description:
        "Ghost is an experimental open-source security runtime that executes agent commands inside Docker and applies deterministic ALLOW, DENY and SHADOW policies. SHADOW can expose controlled synthetic resources while the corresponding real host resource stays isolated.",
    },
    status: "EXPERIMENTAL · GHOST V0.1.0 · MAIN REVIEWED 2026-08-31",
    overviewTitle: "What Ghost is — in plain language.",
    overview:
      "An autonomous agent may read files, call tools or make network requests. Ghost places a controlled runtime boundary around that execution. Instead of giving the process unrestricted access to the host environment, Ghost can allow a supported resource, deny it, or substitute a synthetic decoy and record what happened.",
    releaseNote:
      "The current main revision reports a successful v0.1.0 GitHub Actions release gate. GhostBench completed all ten required scenarios with PASS: 10, FAIL: 0, SKIP: 0. This validates the documented test properties; it is not a claim that Ghost prevents every attack.",
    triadTitle: "Three deterministic policy outcomes.",
    triad: [
      {
        k: "ALLOW",
        v: "Expose a permitted real resource or permitted network destination.",
      },
      {
        k: "DENY",
        v: "Refuse access and keep the protected resource unavailable.",
      },
      {
        k: "SHADOW",
        v: "Expose a controlled synthetic resource while the corresponding real host resource remains isolated.",
      },
    ],
    capabilitiesTitle: "What v0.1.0 currently provides.",
    capabilities: [
      "Ephemeral Docker-based command execution with the project mounted at /workspace.",
      "A private synthetic home at /home/ghost instead of the host user's real home.",
      "Synthetic AWS credentials, an intentionally nonfunctional SSH-key-shaped file and a generic .env decoy.",
      "Deterministic SHADOW or DENY policy for the supported home resources.",
      "Decoy open/access observation through a separate inotify sentinel.",
      "SQLite persistence for sessions, events and decoy state.",
      "Network deny by default, or exact-hostname HTTP/HTTPS allowlisting through a per-session gateway.",
      "An internal Docker network that prevents the agent from bypassing the gateway with direct external routes.",
      "Optional dynamic network containment after a decoy access.",
      "Session inspection plus deterministic provenance graphs and incident reconstruction.",
      "GhostBench with ten explicit security-property scenarios and evidence references.",
    ],
    installTitle: "Installation and requirements.",
    installText:
      "The release-qualified target is Linux with Docker Engine. Building from source requires Go 1.26 or newer, a working Docker CLI and daemon, and a non-root host account with a numeric UID/GID. Docker Desktop on macOS may work but is not covered by the v0.1.0 release gate; native Windows execution is unsupported.",
    installCode: `git clone https://github.com/rappidAI-Research/rappid-ghost.git\ncd rappid-ghost\nmake build\n./bin/ghost version`,
    quickTitle: "Start using Ghost.",
    quickSteps: [
      "Run ghost init in the project you want to expose. This creates ghost.yaml and local .ghost state.",
      "Run commands through ghost run -- <command>. Ghost never falls back to executing the controlled command directly on the host if Docker setup fails.",
      "Use ghost inspect latest to inspect decisions, decoys, incidents and the event timeline.",
      "Use ghost graph latest or ghost incidents latest for deterministic reconstruction from persisted evidence.",
    ],
    quickCode: `ghost init\nghost run -- echo "hello from ghost"\nghost run -- sh -c 'cat ~/.aws/credentials'\nghost inspect latest\nghost graph latest\nghost incidents latest`,
    exampleTitle: "Concrete example: a Shadow credential.",
    exampleText:
      "With the default SHADOW home policy, reading ~/.aws/credentials returns credentials generated for that Ghost session, not the host user's AWS credentials. If the decoy is accessed, Ghost can record DECOY_ACCESS evidence and, when configured, activate network containment. The synthetic values cannot authenticate to a real service.",
    networkTitle: "Controlled network access.",
    networkText:
      "Networking is denied by default. In allowlist mode, Ghost accepts exact hostnames for HTTP on port 80 and HTTPS CONNECT on port 443. Wildcards, raw IP allowlist entries, arbitrary TCP/UDP and TLS content inspection are outside v0.1.0. The gateway records destination-level allow/deny evidence without storing request headers or bodies.",
    benchTitle: "How the release is tested.",
    benchText:
      "GhostBench checks ten separately reported properties: host-home isolation, Shadow credential evidence, sensitive-resource denial, network denial, exact-host allowlisting, direct-egress bypass resistance, dynamic containment, session isolation, failure closure and a safe no-incident baseline. --require-all fails on either FAIL or SKIP.",
    benchCode: `ghost bench\nghost bench --json\nghost bench --require-all\nghost bench --scenario dynamic-containment`,
    valueTitle: "Why this is useful.",
    value: [
      "Reduce accidental exposure of host credentials and home-directory data during local agent execution.",
      "Test how an autonomous process behaves when it encounters controlled synthetic secrets instead of real ones.",
      "Make important access and network decisions deterministic and inspectable rather than model-classified.",
      "Reconstruct supported security-relevant event sequences after a run without exporting decoy contents.",
      "Create reproducible experiments for agent-runtime security research and regression testing.",
    ],
    audienceTitle: "Who Ghost is for.",
    audience: [
      "Researchers evaluating autonomous or tool-using AI agents.",
      "Developers running local agents that execute shell commands against a project workspace.",
      "Security engineers exploring deterministic containment and deception patterns for agent runtimes.",
      "Open-source builders who need a small, inspectable reference implementation rather than a cloud control plane.",
    ],
    boundariesTitle: "Important limits of v0.1.0.",
    boundaries: [
      "Ghost is experimental and is not a general firewall, attack detector or hardened replacement for Docker.",
      "It does not detect prompt injection.",
      "It does not virtualize arbitrary filesystem paths; deception is limited to the explicitly supported synthetic home resources.",
      "It does not inspect TLS payloads, HTTP request bodies or headers, or general TCP/UDP traffic.",
      "It does not intercept MCP or track semantic data flow.",
      "A DECOY_ACCESS event proves an observed open/access event for the decoy inode; it does not prove credential exfiltration or causal intent.",
      "The provenance graph records observed and derived ordering relationships; derived FOLLOWED_BY edges are not causal claims.",
      "Read-write workspace mode intentionally allows the guest to modify project files.",
      "Ghost inherits risks from Docker, the daemon, container images, the host kernel and the local user account.",
      "The default alpine:3.22.5 image is patch-tag pinned but not digest pinned.",
    ],
    evidenceTitle: "Direct access to source, methodology and examples.",
    evidenceText:
      "The links below point to the exact main revision reviewed for this page so implementation claims can be checked directly against source and documentation.",
  },
  de: {
    intro: {
      eyebrow: "TOOL · GHOST",
      title:
        "Deterministisches Containment und Deception für autonome KI-Agenten.",
      description:
        "Ghost ist ein experimentelles Open-Source-Security-Runtime, das Agenten-Befehle in Docker ausführt und deterministische ALLOW-, DENY- und SHADOW-Regeln anwendet. SHADOW kann kontrollierte synthetische Ressourcen bereitstellen, während die entsprechende reale Host-Ressource isoliert bleibt.",
    },
    status: "EXPERIMENTELL · GHOST V0.1.0 · MAIN GEPRÜFT AM 31.08.2026",
    overviewTitle: "Was Ghost einfach erklärt ist.",
    overview:
      "Ein autonomer Agent kann Dateien lesen, Tools aufrufen oder Netzwerkanfragen ausführen. Ghost legt eine kontrollierte Runtime-Grenze um diese Ausführung. Statt dem Prozess unbeschränkten Zugriff auf die Host-Umgebung zu geben, kann Ghost eine unterstützte Ressource erlauben, blockieren oder durch einen synthetischen Köder ersetzen und die relevanten Ereignisse protokollieren.",
    releaseNote:
      "Der aktuelle main-Stand dokumentiert einen erfolgreichen GitHub-Actions-Release-Gate für v0.1.0. GhostBench hat alle zehn geforderten Szenarien mit PASS: 10, FAIL: 0, SKIP: 0 abgeschlossen. Das validiert die dokumentierten Testeigenschaften, ist aber keine Behauptung, dass Ghost jeden Angriff verhindert.",
    triadTitle: "Drei deterministische Policy-Ergebnisse.",
    triad: [
      {
        k: "ALLOW",
        v: "Eine erlaubte reale Ressource oder ein erlaubtes Netzwerkziel bereitstellen.",
      },
      {
        k: "DENY",
        v: "Zugriff verweigern und die geschützte Ressource unzugänglich halten.",
      },
      {
        k: "SHADOW",
        v: "Eine kontrollierte synthetische Ressource bereitstellen, während die entsprechende reale Host-Ressource isoliert bleibt.",
      },
    ],
    capabilitiesTitle: "Was v0.1.0 aktuell bereitstellt.",
    capabilities: [
      "Kurzlebige Docker-basierte Befehlsausführung mit dem Projekt unter /workspace.",
      "Ein privates synthetisches Home unter /home/ghost statt des realen Home-Verzeichnisses des Host-Nutzers.",
      "Synthetische AWS-Credentials, eine absichtlich funktionslose SSH-Key-förmige Datei und einen generischen .env-Decoy.",
      "Deterministische SHADOW- oder DENY-Policy für die unterstützten Home-Ressourcen.",
      "Beobachtung von Decoy-Open/Access-Ereignissen über einen separaten inotify-Sentinel.",
      "SQLite-Persistenz für Sessions, Events und Decoy-Zustand.",
      "Netzwerk standardmäßig DENY oder exakte HTTP/HTTPS-Hostname-Allowlist über ein Gateway pro Session.",
      "Ein internes Docker-Netz, das direkte externe Routen des Agenten am Gateway vorbei verhindert.",
      "Optionales dynamisches Netzwerk-Containment nach einem Decoy-Zugriff.",
      "Session-Inspection sowie deterministische Provenance-Graphen und Incident-Rekonstruktion.",
      "GhostBench mit zehn expliziten Security-Property-Szenarien und Evidenzreferenzen.",
    ],
    installTitle: "Installation und Voraussetzungen.",
    installText:
      "Das release-qualifizierte Ziel ist Linux mit Docker Engine. Für den Build aus dem Quellcode werden Go 1.26 oder neuer, eine funktionierende Docker-CLI mit Daemon sowie ein Nicht-Root-Hostkonto mit numerischer UID/GID benötigt. Docker Desktop auf macOS kann funktionieren, ist aber nicht Teil des v0.1.0-Release-Gates; native Windows-Ausführung wird nicht unterstützt.",
    installCode: `git clone https://github.com/rappidAI-Research/rappid-ghost.git\ncd rappid-ghost\nmake build\n./bin/ghost version`,
    quickTitle: "Ghost verwenden.",
    quickSteps: [
      "Führe ghost init in dem Projekt aus, das du dem Agenten bereitstellen willst. Dadurch entstehen ghost.yaml und der lokale .ghost-Zustand.",
      "Starte Befehle über ghost run -- <command>. Wenn die Docker-Ausführung scheitert, führt Ghost den kontrollierten Befehl nicht ersatzweise direkt auf dem Host aus.",
      "Mit ghost inspect latest siehst du Entscheidungen, Decoys, Incidents und die Event-Timeline.",
      "Mit ghost graph latest oder ghost incidents latest lassen sich unterstützte Zusammenhänge deterministisch aus gespeicherter Evidenz rekonstruieren.",
    ],
    quickCode: `ghost init\nghost run -- echo "hello from ghost"\nghost run -- sh -c 'cat ~/.aws/credentials'\nghost inspect latest\nghost graph latest\nghost incidents latest`,
    exampleTitle: "Konkretes Beispiel: Shadow-Credentials.",
    exampleText:
      "Mit der standardmäßigen SHADOW-Home-Policy liefert ~/.aws/credentials von Ghost für diese Session erzeugte Credentials und nicht die AWS-Credentials des Host-Nutzers. Wird der Decoy geöffnet, kann Ghost DECOY_ACCESS-Evidenz speichern und – wenn konfiguriert – Netzwerk-Containment aktivieren. Die synthetischen Werte können sich nicht bei einem realen Dienst authentifizieren.",
    networkTitle: "Kontrollierter Netzwerkzugriff.",
    networkText:
      "Netzwerk ist standardmäßig blockiert. Im Allowlist-Modus akzeptiert Ghost exakte Hostnamen für HTTP auf Port 80 und HTTPS CONNECT auf Port 443. Wildcards, Raw-IP-Allowlist-Einträge, beliebiges TCP/UDP und TLS-Inhaltsinspektion gehören nicht zu v0.1.0. Das Gateway protokolliert Ziel und Allow/Deny-Entscheidung, ohne Request-Header oder Bodies zu speichern.",
    benchTitle: "Wie der Release-Stand getestet wird.",
    benchText:
      "GhostBench prüft zehn separat ausgewiesene Eigenschaften: Host-Home-Isolation, Shadow-Credential-Evidenz, Denial sensibler Ressourcen, Network Denial, exakte Host-Allowlist, Widerstand gegen direkten Egress-Bypass, dynamisches Containment, Session-Isolation, Failure Closure und eine sichere No-Incident-Baseline. --require-all schlägt sowohl bei FAIL als auch bei SKIP fehl.",
    benchCode: `ghost bench\nghost bench --json\nghost bench --require-all\nghost bench --scenario dynamic-containment`,
    valueTitle: "Welchen Nutzen Ghost hat.",
    value: [
      "Das Risiko reduzieren, bei lokalen Agenten-Runs versehentlich Host-Credentials oder Home-Daten bereitzustellen.",
      "Untersuchen, wie ein autonomer Prozess auf kontrollierte synthetische Secrets reagiert, statt dafür echte Secrets zu verwenden.",
      "Wichtige Zugriffs- und Netzwerkentscheidungen deterministisch und prüfbar machen statt sie von einem Modell klassifizieren zu lassen.",
      "Unterstützte sicherheitsrelevante Ereignisfolgen nach einem Run rekonstruieren, ohne Decoy-Inhalte zu exportieren.",
      "Reproduzierbare Experimente und Regressionstests für Agent-Runtime-Security aufbauen.",
    ],
    audienceTitle: "Für wen Ghost gedacht ist.",
    audience: [
      "Forschende, die autonome oder tool-using KI-Agenten evaluieren.",
      "Entwickler, die lokale Agenten Shell-Befehle gegen ein Projekt-Workspace ausführen lassen.",
      "Security Engineers, die deterministisches Containment und Deception für Agent-Runtimes untersuchen.",
      "Open-Source-Builder, die eine kleine, nachvollziehbare Referenzimplementierung statt einer Cloud-Control-Plane suchen.",
    ],
    boundariesTitle: "Wichtige Grenzen von v0.1.0.",
    boundaries: [
      "Ghost ist experimentell und weder allgemeine Firewall noch Attack Detector oder gehärteter Ersatz für Docker.",
      "Ghost erkennt keine Prompt Injection.",
      "Ghost virtualisiert keine beliebigen Dateisystempfade; Deception ist auf die explizit unterstützten synthetischen Home-Ressourcen begrenzt.",
      "Ghost inspiziert weder TLS-Payloads noch HTTP-Request-Bodies oder -Header und proxy't keinen allgemeinen TCP/UDP-Traffic.",
      "Ghost interceptet kein MCP und verfolgt keinen semantischen Datenfluss.",
      "Ein DECOY_ACCESS-Event belegt ein beobachtetes Open/Access-Ereignis am Decoy-Inode; es beweist weder Credential-Exfiltration noch Absicht oder Kausalität.",
      "Der Provenance-Graph enthält beobachtete und aus Reihenfolge abgeleitete Beziehungen; FOLLOWED_BY ist keine Kausalitätsaussage.",
      "Im Read-Write-Workspace-Modus darf der Gast Projektdateien absichtlich verändern.",
      "Ghost erbt Risiken von Docker, Docker-Daemon, Container-Images, Host-Kernel und lokalem Nutzerkonto.",
      "Das Default-Image alpine:3.22.5 ist auf einen Patch-Tag, aber noch nicht auf einen Digest gepinnt.",
    ],
    evidenceTitle: "Direkte Zugänge zu Source, Methodik und Beispielen.",
    evidenceText:
      "Die folgenden Links zeigen auf genau den main-Commit, der für diese Seite geprüft wurde. So lassen sich Implementierungsbehauptungen direkt gegen Quellcode und Dokumentation kontrollieren.",
  },
} as const;

export function LocalizedGhostPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <PageIntro {...c.intro} />
      <section className="page-shell pb-[var(--section-space)]">
        <Reveal className="liquid-surface p-7 sm:p-9">
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
            {c.status}
          </p>
          <h2 className="display-section mt-6 text-ink">{c.overviewTitle}</h2>
          <p className="body-copy mt-5 max-w-4xl">{c.overview}</p>
          <p className="body-copy mt-5 max-w-4xl">{c.releaseNote}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionLink href={repo} external variant="primary">
              GitHub
            </ActionLink>
            <ActionLink
              href={`${source}/README.md`}
              external
              variant="secondary"
            >
              README
            </ActionLink>
            <ActionLink
              href={`${repo}/tree/${GHOST_SHA}`}
              external
              variant="secondary"
            >
              Reviewed commit
            </ActionLink>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="display-section text-ink">{c.triadTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.triad.map((x) => (
              <div key={x.k} className="liquid-card p-7">
                <p className="font-mono text-sm tracking-[0.14em] text-accent">
                  {x.k}
                </p>
                <p className="body-copy mt-4">{x.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">CURRENT · V0.1.0</p>
            <h2 className="display-section mt-6 text-ink">
              {c.capabilitiesTitle}
            </h2>
          </div>
          <ul className="liquid-surface space-y-4 p-7 sm:p-9">
            {c.capabilities.map((x) => (
              <li key={x} className="body-copy">
                — {x}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">INSTALL</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.installTitle}
            </h2>
            <p className="body-copy mt-4">{c.installText}</p>
            <pre className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-xs leading-6 text-white">
              <code>{c.installCode}</code>
            </pre>
          </Reveal>
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">USAGE</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.quickTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              {c.quickSteps.map((x) => (
                <li key={x}>— {x}</li>
              ))}
            </ul>
            <pre className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-xs leading-6 text-white">
              <code>{c.quickCode}</code>
            </pre>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">EXAMPLE</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.exampleTitle}
            </h2>
            <p className="body-copy mt-4">{c.exampleText}</p>
          </Reveal>
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">NETWORK</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.networkTitle}
            </h2>
            <p className="body-copy mt-4">{c.networkText}</p>
          </Reveal>
        </div>

        <Reveal className="dark-band mt-16 rounded-[2rem] p-8 sm:p-12">
          <p className="eyebrow text-[var(--color-dark-muted)]">
            GHOSTBENCH · RELEASE GATE
          </p>
          <h2 className="display-section mt-6 text-white">{c.benchTitle}</h2>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-[var(--color-dark-body)]">
            {c.benchText}
          </p>
          <div className="mt-7 inline-flex rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-white">
            PASS: 10 · FAIL: 0 · SKIP: 0
          </div>
          <pre className="mt-7 overflow-x-auto rounded-2xl bg-black/50 p-5 text-xs leading-6 text-white">
            <code>{c.benchCode}</code>
          </pre>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">VALUE</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.valueTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
              {c.value.map((x) => (
                <li key={x}>— {x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="liquid-card p-7 sm:p-9">
            <p className="eyebrow">AUDIENCE</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.audienceTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
              {c.audience.map((x) => (
                <li key={x}>— {x}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">BOUNDARIES</p>
            <h2 className="display-section mt-6 text-ink">
              {c.boundariesTitle}
            </h2>
          </div>
          <ul className="liquid-surface space-y-4 p-7 sm:p-9">
            {c.boundaries.map((x) => (
              <li key={x} className="body-copy">
                — {x}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <p className="eyebrow">SOURCE ACCESS</p>
          <h2 className="display-section mt-6 text-ink">{c.evidenceTitle}</h2>
          <p className="body-copy mt-5 max-w-4xl">{c.evidenceText}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionLink href={`${source}/README.md`} external variant="primary">
              README
            </ActionLink>
            <ActionLink
              href={`${source}/ghost.example.yaml`}
              external
              variant="secondary"
            >
              Example config
            </ActionLink>
            <ActionLink
              href={`${source}/docs/security-model.md`}
              external
              variant="secondary"
            >
              Security model
            </ActionLink>
            <ActionLink
              href={`${source}/docs/threat-model.md`}
              external
              variant="secondary"
            >
              Threat model
            </ActionLink>
            <ActionLink
              href={`${source}/docs/network-security.md`}
              external
              variant="secondary"
            >
              Network security
            </ActionLink>
            <ActionLink
              href={`${source}/docs/provenance.md`}
              external
              variant="secondary"
            >
              Provenance
            </ActionLink>
            <ActionLink
              href={`${source}/docs/incidents.md`}
              external
              variant="secondary"
            >
              Incidents
            </ActionLink>
            <ActionLink
              href={`${source}/docs/benchmarks.md`}
              external
              variant="secondary"
            >
              GhostBench methodology
            </ActionLink>
            <ActionLink
              href={`${repo}/tree/${GHOST_SHA}/examples`}
              external
              variant="secondary"
            >
              Examples
            </ActionLink>
            <ActionLink
              href={`${source}/SECURITY.md`}
              external
              variant="secondary"
            >
              Security reporting
            </ActionLink>
            <ActionLink
              href={`${source}/CONTRIBUTING.md`}
              external
              variant="secondary"
            >
              Contributing
            </ActionLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default function GhostPage() {
  return <LocalizedGhostPage locale="en" />;
}
