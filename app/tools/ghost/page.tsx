import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { PageIntro } from "@/components/ui/page-intro";
import { metadataFor } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

export const metadata = metadataFor("/tools/ghost");

const GHOST_SHA = "001d0baa953301f9fc94443e0e45b28d9f93fac0";
const repo = "https://github.com/rappidAI-Research/rappid-ghost";
const release = `${repo}/releases/tag/v0.2.0`;
const releaseGate = `${repo}/actions/runs/34052802282/job/101539306267`;
const source = `${repo}/blob/${GHOST_SHA}`;

const copy = {
  en: {
    intro: {
      eyebrow: "GHOST V0.2.0 · SECURITY HARDENING",
      title: "rappidAI Ghost. Set the boundaries.",
      description:
        "A deception-aware security runtime for autonomous AI agents. Ghost isolates command execution and applies deterministic ALLOW, DENY and SHADOW policies. Security enforcement never calls an LLM. v0.2.0 hardens the runtime’s existing security boundaries.",
    },
    status: "RELEASED · GHOST V0.2.0 · 2026-09-06 · EXPERIMENTAL",
    overviewTitle: "What Ghost is — in plain language.",
    overview:
      "An autonomous agent may read files, call tools or make network requests. Ghost places a controlled runtime boundary around that execution. Instead of giving the process unrestricted access to the host environment, Ghost can allow a supported resource, deny it, or substitute a synthetic decoy and record what happened.",
    releaseNote:
      "v0.2.0 is a security-hardening release. The published release job completed all 15 GhostBench scenarios: PASS: 15, FAIL: 0, SKIP: 0. These results validate the named properties in that run, not protection against every attack.",
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
    capabilitiesTitle: "Security hardening in v0.2.0.",
    capabilities: [
      "Network destinations: reject local-use names and prohibited IPv4 answer sets; connect only to the validated numeric address. Raw IPs and IPv6 upstream destinations remain denied.",
      "Container confinement: private IPC/cgroup namespaces and disabled core dumps strengthen the shared non-root profile, dropped capabilities, no-new-privileges, read-only roots and bounded writable paths.",
      "Host environment: a positive allowlist supplies fixed HOME/PATH and Ghost-owned proxy variables only. Unknown or custom host secrets are not forwarded.",
      "Containment: token-scoped containment fencing replaces the timing-based recheck. The sentinel publishes containment before access evidence; a missing acknowledgement denies the request.",
      "Session state and recovery: a per-project run lock serializes runs. The next run finalizes interrupted sessions as failed, preserves containment and removes only exactly identified Ghost-owned Docker resources. Ambiguous ownership or cleanup failure aborts the new run.",
      "Supply chain: Alpine 3.22.5 is pinned to an immutable multi-platform index digest; GitHub Actions use full commit SHAs. CI verifies Go modules and tidy state; Linux release binaries include a verified SHA256SUMS manifest.",
      "Validation: five additional GhostBench scenarios exercise private-destination denial, unknown-environment exclusion, guest-visible confinement, concurrent containment and interrupted-session recovery.",
    ],
    installTitle: "Installation and requirements.",
    installText:
      "Linux with Docker Engine is the release-qualified target. Use a non-root host account with non-zero numeric UID and GID. Download the Linux amd64 or arm64 binary from the release and verify it against SHA256SUMS, or build the tagged source below with Go 1.26+ and make. Docker Desktop on macOS is not release-qualified; native Windows is unsupported.",
    installCode:
      'git clone --branch v0.2.0 --depth 1 https://github.com/rappidAI-Research/rappid-ghost.git\ncd rappid-ghost\nmake build\n./bin/ghost version\nexport PATH="$PWD/bin:$PATH"',
    quickTitle: "Start using Ghost.",
    quickSteps: [
      "After the build above, the current shell can find ghost. Change to the project you intend to expose, then run ghost init to create ghost.yaml and local .ghost state.",
      "Review ghost.yaml: networking defaults to deny; the workspace defaults to read-write. Use workspace.mode: read-only when project writes are unnecessary. Files deliberately placed in the workspace remain accessible.",
      "Run commands with ghost run -- <command>. The pinned minimal Alpine image must contain that command; setup or execution failure never falls back to running it on the host.",
      "Inspect the session, then reconstruct its graph and incidents from persisted evidence.",
    ],
    quickCode: `ghost init\nghost run -- echo "hello from ghost"\nghost run -- sh -c 'cat ~/.aws/credentials'\nghost inspect latest\nghost graph latest\nghost incidents latest`,
    exampleTitle: "Concrete example: a Shadow credential.",
    exampleText:
      "An agent asks for ~/.aws/credentials. Ghost never reads or mounts the host user’s credential file. With the default SHADOW home policy, it exposes independently generated synthetic credentials inside /home/ghost. Unlike refusal alone, this gives the agent an observable resource: the separate inotify sentinel can record DECOY_ACCESS when the decoy inode is opened or accessed. With on_decoy_access.network: deny, containment then denies subsequent gateway requests whose fence follows that observation, even to an allowlisted host. The synthetic credentials cannot authenticate to a real service. The event proves access, not intent or exfiltration.",
    networkTitle: "Controlled network access.",
    networkText:
      "Deny mode uses Docker network mode none. Allowlist mode places the agent on a per-session internal network with no direct external route; the gateway accepts exact hostnames for HTTP :80 and HTTPS CONNECT :443. It rejects local-use names and every answer set containing prohibited IPv4 addresses: private, loopback, link-local (including metadata endpoint 169.254.169.254), shared, benchmark, multicast and reserved ranges. It connects to the validated numeric address without a second hostname lookup. DNS failure, mixed safe/prohibited answers, raw IPs and IPv6-only destinations fail closed. The internal bridge remains a reachable local link; this is a gateway destination boundary, not a universal host-network firewall.",
    benchTitle: "How the release is tested.",
    benchText:
      "GhostBench is a reproducible local security-property validation suite using the production runtime, synthetic resources and isolated Docker HTTP fixtures. Its 15 scenarios cover home isolation, Shadow evidence, sensitive-resource denial, network deny/allowlist, direct-egress bypass, containment, session isolation, failure closure and a safe baseline, plus the five new v0.2.0 checks below. PASS means every required observation occurred; FAIL means an assertion or execution failed; SKIP means a required dependency was unavailable. --require-all fails on FAIL or SKIP. No real credentials, external judging service or security score are used.",
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
    boundariesTitle: "Important limits of v0.2.0.",
    boundaries: [
      "Ghost is experimental. Its guarantees apply to ghost run commands and depend on Docker, its daemon, the OCI runtime, pinned image, host kernel and invoking local account. It cannot guarantee protection against every container escape or network attack.",
      "Ghost does not detect prompt injection, understand or prove model intent, trace semantic data flow, intercept MCP, or virtualize arbitrary filesystem paths.",
      "DECOY_ACCESS proves an observed open/access event for a decoy inode, not credential exfiltration. Provenance and incident reconstruction are read-only views; derived FOLLOWED_BY edges express ordering, not causation.",
      "Containment does not revoke already authorized and established HTTP responses or CONNECT tunnels. A concurrent request whose barrier is ordered before the decoy event can still be allowed.",
      "No TLS interception, request-content inspection or general TCP/UDP proxying. Approved endpoints can relay data, CONNECT can carry non-TLS bytes, and Ghost does not eliminate every DNS-rebinding technique.",
      "The mounted workspace is deliberately accessible and writable by default. Rootless Docker or user-namespace remapping requires daemon-level configuration. Recovery occurs on the next run in the owning project, not through a global background cleanup service.",
      "SHA256 checksums detect corruption; the release does not publish signed binaries, attestations or an SBOM. GhostBench is evidence for its named scenarios and platform, not a universal security proof.",
    ],
    evidenceTitle: "Direct access to source, methodology and examples.",
    evidenceText:
      "Implementation and documentation links are pinned to the exact v0.2.0 release commit, 001d0ba. The release job links to the completed validation run. Current main was identical when reviewed on 2026-09-06.",
  },
  de: {
    intro: {
      eyebrow: "GHOST V0.2.0 · SECURITY HARDENING",
      title: "rappidAI Ghost. Setze die Grenzen.",
      description:
        "Eine deception-aware Sicherheits-Runtime für autonome KI-Agenten. Ghost isoliert Befehlsausführung und setzt deterministische ALLOW-, DENY- und SHADOW-Regeln durch – ohne LLM als Sicherheitsinstanz. v0.2.0 verstärkt die bestehenden Sicherheitsgrenzen.",
    },
    status: "VERÖFFENTLICHT · GHOST V0.2.0 · 06.09.2026 · EXPERIMENTELL",
    overviewTitle: "Was Ghost einfach erklärt ist.",
    overview:
      "Ein autonomer Agent kann Dateien lesen, Tools aufrufen oder Netzwerkanfragen ausführen. Ghost legt eine kontrollierte Runtime-Grenze um diese Ausführung. Statt dem Prozess unbeschränkten Zugriff auf die Host-Umgebung zu geben, kann Ghost eine unterstützte Ressource erlauben, blockieren oder durch einen synthetischen Köder ersetzen und die relevanten Ereignisse protokollieren.",
    releaseNote:
      "v0.2.0 ist ein Security-Hardening-Release. Der veröffentlichte Release-Job hat alle 15 GhostBench-Szenarien abgeschlossen: PASS: 15, FAIL: 0, SKIP: 0. Das validiert die benannten Eigenschaften in diesem Lauf, keinen Schutz gegen jeden Angriff.",
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
    capabilitiesTitle: "Security-Hardening in v0.2.0.",
    capabilities: [
      "Netzwerkziele: lokale Hostnamen und verbotene IPv4-Antwortmengen werden abgelehnt; Verbindungen nutzen nur die validierte numerische Adresse. Raw-IP- und IPv6-Upstream-Ziele bleiben blockiert.",
      "Container-Confinement: private IPC-/cgroup-Namespaces und deaktivierte Core-Dumps verstärken das gemeinsame Non-Root-Profil mit entfernten Capabilities, no-new-privileges, schreibgeschützten Root-Dateisystemen und begrenzten Schreibpfaden.",
      "Host-Umgebung: Eine positive Allowlist setzt nur feste HOME-/PATH-Werte und Ghost-eigene Proxy-Variablen. Unbekannte oder benutzerdefinierte Host-Secrets werden nicht weitergereicht.",
      "Containment: Token-scoped containment fencing ersetzt die zeitbasierte Nachprüfung. Der Sentinel veröffentlicht Containment vor der Zugriffsevidenz; fehlt die Bestätigung, wird die Anfrage abgelehnt.",
      "Session-Zustand und Recovery: Ein Run-Lock pro Projekt serialisiert Ausführungen. Der nächste Lauf markiert unterbrochene Sessions als failed, erhält ihren Containment-Zustand und entfernt nur eindeutig identifizierte Ghost-eigene Docker-Ressourcen. Unklare Eigentümerschaft oder fehlgeschlagenes Aufräumen bricht den neuen Lauf ab.",
      "Supply Chain: Alpine 3.22.5 ist auf einen unveränderlichen Multi-Platform-Index-Digest gepinnt; GitHub Actions auf vollständige Commit-SHAs. CI prüft Go-Module und den Tidy-Zustand; Linux-Release-Binaries enthalten ein geprüftes SHA256SUMS-Manifest.",
      "Validierung: Fünf zusätzliche GhostBench-Szenarien prüfen private Netzwerkziele, unbekannte Umgebungsvariablen, im Gast sichtbares Confinement, paralleles Containment und Recovery unterbrochener Sessions.",
    ],
    installTitle: "Installation und Voraussetzungen.",
    installText:
      "Linux mit Docker Engine ist das release-qualifizierte Ziel. Erforderlich ist ein Nicht-Root-Hostkonto mit numerischer UID und GID ungleich null. Lade die Linux-amd64- oder arm64-Binary aus dem Release und prüfe sie gegen SHA256SUMS, oder baue den getaggten Quellcode mit Go 1.26+ und make wie unten. Docker Desktop auf macOS ist nicht release-qualifiziert; natives Windows wird nicht unterstützt.",
    installCode:
      'git clone --branch v0.2.0 --depth 1 https://github.com/rappidAI-Research/rappid-ghost.git\ncd rappid-ghost\nmake build\n./bin/ghost version\nexport PATH="$PWD/bin:$PATH"',
    quickTitle: "Ghost verwenden.",
    quickSteps: [
      "Nach dem obigen Build findet die aktuelle Shell ghost. Wechsle in das Projekt, das du bereitstellen willst. ghost init erstellt ghost.yaml und den lokalen .ghost-Zustand.",
      "Prüfe ghost.yaml: Netzwerk steht standardmäßig auf deny, der Workspace auf read-write. Nutze workspace.mode: read-only, wenn keine Projektänderungen nötig sind. Dateien, die du im Workspace bereitstellst, bleiben zugänglich.",
      "Starte Befehle über ghost run -- <command>. Der Befehl muss im gepinnten minimalen Alpine-Image vorhanden sein. Bei Setup- oder Ausführungsfehlern gibt es keinen Fallback auf den Host.",
      "Prüfe die Session und rekonstruiere anschließend Graph und Incidents aus gespeicherter Evidenz.",
    ],
    quickCode: `ghost init\nghost run -- echo "hello from ghost"\nghost run -- sh -c 'cat ~/.aws/credentials'\nghost inspect latest\nghost graph latest\nghost incidents latest`,
    exampleTitle: "Konkretes Beispiel: Shadow-Credentials.",
    exampleText:
      "Ein Agent fordert ~/.aws/credentials an. Ghost liest oder mountet die Credential-Datei des Host-Nutzers nicht. Die standardmäßige SHADOW-Home-Policy stellt unabhängig erzeugte synthetische Credentials unter /home/ghost bereit. Anders als eine bloße Ablehnung bietet das eine beobachtbare Ressource: Der separate inotify-Sentinel kann DECOY_ACCESS protokollieren, wenn der Decoy-Inode geöffnet oder angesprochen wird. Mit on_decoy_access.network: deny blockiert Containment danach Gateway-Anfragen, deren Fence auf diese Beobachtung folgt – auch an zuvor erlaubte Hosts. Die synthetischen Credentials funktionieren bei keinem realen Dienst. Das Event belegt Zugriff, keine Absicht oder Exfiltration.",
    networkTitle: "Kontrollierter Netzwerkzugriff.",
    networkText:
      "Deny nutzt den Docker-Netzwerkmodus none. Im Allowlist-Modus liegt der Agent in einem internen Netz pro Session ohne direkte externe Route; das Gateway akzeptiert exakte Hostnamen für HTTP :80 und HTTPS CONNECT :443. Es verwirft lokale Hostnamen und jede Antwortmenge mit verbotenen IPv4-Adressen: private, Loopback-, Link-Local- (einschließlich Metadaten-Endpunkt 169.254.169.254), Shared-, Benchmark-, Multicast- und reservierte Bereiche. Es verbindet sich mit der validierten numerischen Adresse ohne zweite Namensauflösung. DNS-Fehler, gemischte erlaubte/verbotene Antworten, Raw-IPs und reine IPv6-Ziele werden abgelehnt. Die interne Bridge bleibt als lokaler Link erreichbar; dies ist eine Zielkontrolle am Gateway, keine universelle Host-Netzwerk-Firewall.",
    benchTitle: "Wie der Release-Stand getestet wird.",
    benchText:
      "GhostBench ist eine lokal reproduzierbare Validierung konkreter Sicherheitseigenschaften mit der Produktions-Runtime, synthetischen Ressourcen und isolierten Docker-HTTP-Fixtures. Die 15 Szenarien prüfen Home-Isolation, Shadow-Evidenz, Resource Denial, Netzwerk-Deny/Allowlist, direkten Egress-Bypass, Containment, Session-Isolation, Failure Closure und eine sichere Baseline sowie die fünf neuen v0.2.0-Prüfungen unten. PASS bedeutet: alle geforderten Beobachtungen liegen vor. FAIL bedeutet: eine Prüfung oder Ausführung schlug fehl. SKIP bedeutet: eine Voraussetzung war nicht verfügbar. --require-all schlägt bei FAIL oder SKIP fehl. Es gibt keine echten Credentials, externen Bewertungsdienste oder Security-Scores.",
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
    boundariesTitle: "Wichtige Grenzen von v0.2.0.",
    boundaries: [
      "Ghost ist experimentell. Seine Garantien gelten für ghost run und setzen korrekt arbeitende Docker-, Daemon-, OCI-Runtime-, Image-, Host-Kernel- und lokale Nutzerumgebungen voraus. Vollständiger Schutz vor jedem Container-Escape oder Netzwerkangriff ist nicht garantiert.",
      "Ghost erkennt keine Prompt Injection, versteht oder beweist keine Modellabsicht, verfolgt keinen semantischen Datenfluss, interceptet kein MCP und virtualisiert keine beliebigen Dateisystempfade.",
      "DECOY_ACCESS belegt ein beobachtetes Open/Access-Ereignis am Decoy-Inode, keine Credential-Exfiltration. Provenance und Incident-Rekonstruktion sind schreibgeschützte Auswertungen; abgeleitete FOLLOWED_BY-Kanten bedeuten Reihenfolge, keine Kausalität.",
      "Containment widerruft keine bereits freigegebenen und aufgebauten HTTP-Antworten oder CONNECT-Tunnel. Eine parallele Anfrage, deren Barriere vor dem Decoy-Event eingeordnet wird, kann noch erlaubt werden.",
      "Keine TLS- oder Request-Inhaltsinspektion und kein allgemeiner TCP/UDP-Proxy. Erlaubte Endpunkte können Daten weiterleiten, CONNECT kann Nicht-TLS-Daten tragen, und Ghost verhindert nicht jede DNS-Rebinding-Technik.",
      "Der gemountete Workspace ist bewusst zugänglich und standardmäßig beschreibbar. Rootless Docker oder User-Namespace-Remapping erfordert Daemon-Konfiguration. Recovery erfolgt beim nächsten Lauf im zugehörigen Projekt, nicht über einen globalen Hintergrunddienst.",
      "SHA256-Prüfsummen erkennen Beschädigungen; signierte Binaries, Attestierungen und ein SBOM werden nicht veröffentlicht. GhostBench liefert Evidenz für seine Szenarien und Plattform, keinen universellen Sicherheitsbeweis.",
    ],
    evidenceTitle: "Direkte Zugänge zu Source, Methodik und Beispielen.",
    evidenceText:
      "Implementierungs- und Dokumentationslinks sind auf den exakten v0.2.0-Release-Commit 001d0ba gepinnt. Der Release-Job zeigt den abgeschlossenen Validierungslauf. Der aktuelle main-Stand war bei der Prüfung am 06.09.2026 identisch.",
  },
} as const;

const newScenarios = [
  [
    "private-destination-blocked",
    "An allowlisted hostname resolves to a live RFC1918 fixture; the gateway denies it.",
    "Ein erlaubter Hostname verweist auf eine erreichbare RFC1918-Fixture; das Gateway lehnt ab.",
  ],
  [
    "environment-isolation",
    "A randomly named host variable is absent in the guest; fixed HOME/PATH remain.",
    "Eine zufällig benannte Host-Variable fehlt im Gast; feste HOME-/PATH-Werte bleiben.",
  ],
  [
    "container-confinement",
    "The guest observes non-root identity, zero effective capabilities, NoNewPrivs and read-only root/home paths.",
    "Der Gast sieht Non-Root-Identität, keine effektiven Capabilities, NoNewPrivs und schreibgeschützte Root-/Home-Pfade.",
  ],
  [
    "concurrent-containment",
    "After observed decoy access, four concurrent requests to the allowed host receive contained DENY evidence.",
    "Nach beobachtetem Decoy-Zugriff erhalten vier parallele Anfragen an den erlaubten Host Containment-DENY-Evidenz.",
  ],
  [
    "interrupted-session-recovery",
    "The next run removes an exactly owned stale network, preserves containment and marks the interrupted session failed.",
    "Der nächste Lauf entfernt ein eindeutig zugeordnetes altes Netz, erhält Containment und markiert die unterbrochene Session als failed.",
  ],
] as const;

const architecture = {
  en: [
    [
      "Isolation",
      "Ephemeral non-root Docker execution exposes /workspace and a read-only synthetic /home/ghost. The host home and Docker socket are not mounted; .ghost is masked and ghost.yaml is read-only.",
    ],
    [
      "Policy",
      "Strict ghost.yaml validation drives deterministic ALLOW / DENY / SHADOW. The workspace is explicitly allowed; supported home resources are SHADOW or DENY, never the real host home. No LLM participates.",
    ],
    [
      "Deception",
      "Fresh synthetic AWS credentials, a nonfunctional SSH-key-shaped file and a generic .env decoy provide controlled alternatives. Disabling deception leaves protected resources absent.",
    ],
    [
      "Network control",
      "Docker topology blocks direct external egress. The gateway checks exact hostnames, fixed ports, resolved IPv4 destinations and containment state before allowing a new attempt.",
    ],
    [
      "Containment",
      "A separate network-disabled inotify sentinel observes explicit decoys. With on_decoy_access.network: deny, its token/ack fence orders candidate gateway allows against queued access events.",
    ],
    [
      "Evidence",
      "SQLite stores sessions, events and decoy state. Destination decisions omit request headers and bodies. DECOY_ACCESS records an observed open/access event, not inferred behavior.",
    ],
    [
      "Provenance / incidents",
      "Read-only builders reconstruct supported relationships and session-local incident timelines with event IDs. They consume evidence and never change enforcement.",
    ],
    [
      "GhostBench",
      "Controlled fixtures exercise the same session manager and Docker runtime. Named assertions check the resulting observations, keeping validation separate from enforcement.",
    ],
  ],
  de: [
    [
      "Isolation",
      "Kurzlebige Non-Root-Docker-Ausführung stellt /workspace und ein schreibgeschütztes synthetisches /home/ghost bereit. Host-Home und Docker-Socket werden nicht gemountet; .ghost wird maskiert und ghost.yaml ist schreibgeschützt.",
    ],
    [
      "Policy",
      "Strikte ghost.yaml-Validierung steuert ALLOW / DENY / SHADOW deterministisch. Der Workspace ist ausdrücklich erlaubt; unterstützte Home-Ressourcen sind SHADOW oder DENY, niemals das reale Host-Home. Kein LLM entscheidet.",
    ],
    [
      "Deception",
      "Frische synthetische AWS-Credentials, eine funktionslose SSH-Key-förmige Datei und ein generischer .env-Decoy bieten kontrollierte Alternativen. Ohne Deception bleiben geschützte Ressourcen abwesend.",
    ],
    [
      "Netzwerkkontrolle",
      "Die Docker-Topologie blockiert direkten externen Egress. Das Gateway prüft exakte Hostnamen, feste Ports, aufgelöste IPv4-Ziele und den Containment-Zustand vor einem neuen erlaubten Versuch.",
    ],
    [
      "Containment",
      "Ein separater inotify-Sentinel ohne Netzwerk beobachtet explizite Decoys. Bei on_decoy_access.network: deny ordnet seine Token/Ack-Barriere mögliche Gateway-Freigaben gegenüber eingereihten Zugriffsereignissen.",
    ],
    [
      "Evidenz",
      "SQLite speichert Sessions, Events und Decoy-Zustand. Zielentscheidungen enthalten keine Request-Header oder Bodies. DECOY_ACCESS protokolliert beobachtetes Open/Access, kein vermutetes Verhalten.",
    ],
    [
      "Provenance / Incidents",
      "Schreibgeschützte Auswertungen rekonstruieren belegte Beziehungen und Session-lokale Incident-Timelines mit Event-IDs. Sie nutzen Evidenz, ändern aber keine Durchsetzung.",
    ],
    [
      "GhostBench",
      "Kontrollierte Fixtures nutzen denselben Session Manager und dieselbe Docker-Runtime. Benannte Prüfungen bewerten die Beobachtungen; Validierung bleibt von Durchsetzung getrennt.",
    ],
  ],
} as const;

export function LocalizedGhostPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <PageIntro
        {...c.intro}
        artwork="ghost"
        indexLabel={locale === "de" ? "Auf dieser Seite" : "On this page"}
        topics={[
          {
            href: "#ghost-overview",
            label: locale === "de" ? "Überblick" : "Overview",
            description: c.overviewTitle,
          },
          {
            href: "#ghost-policies",
            label: "Allow / Deny / Shadow",
            description: c.triadTitle,
          },
          {
            href: "#ghost-architecture",
            label: locale === "de" ? "Architektur" : "Architecture",
            description:
              locale === "de"
                ? "Sicherheitsschichten und Evidenz"
                : "Security layers and evidence",
          },
          {
            href: "#ghost-setup",
            label: locale === "de" ? "Installation" : "Get started",
            description: c.installTitle,
          },
          {
            href: "#ghost-bench",
            label: "GhostBench",
            description: c.benchTitle,
          },
        ]}
      />
      <section className="page-shell pb-[var(--section-space)]">
        <Reveal id="ghost-overview" className="liquid-surface p-7 sm:p-9">
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
            {c.status}
          </p>
          <h2 className="display-section mt-6 text-ink">{c.overviewTitle}</h2>
          <p className="body-copy mt-5 max-w-4xl">{c.overview}</p>
          <p className="body-copy mt-5 max-w-4xl">{c.releaseNote}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ActionLink href={repo} external variant="primary">
              {locale === "de" ? "Auf GitHub ansehen" : "View on GitHub"}
            </ActionLink>
            <ActionLink
              href={`${source}/README.md`}
              external
              variant="secondary"
            >
              README
            </ActionLink>
            <ActionLink href={release} external variant="secondary">
              v0.2.0 Release
            </ActionLink>
          </div>
        </Reveal>

        <Reveal id="ghost-policies" className="mt-16">
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
            <p className="eyebrow">SECURITY HARDENING · V0.2.0</p>
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

        <Reveal id="ghost-architecture" className="mt-16">
          <p className="eyebrow">ARCHITECTURE</p>
          <h2 className="display-section mt-6 text-ink">
            {locale === "de"
              ? "Wie die Sicherheitsschichten zusammenarbeiten."
              : "How the security layers work together."}
          </h2>
          <p className="body-copy mt-5 max-w-4xl">
            {locale === "de"
              ? "Policy und Isolation bestimmen die verfügbare Umgebung. Sentinel und Gateway koppeln beobachteten Decoy-Zugriff an spätere Netzwerkentscheidungen. Gespeicherte Evidenz unterstützt danach Inspection, Provenance und Incidents; GhostBench prüft diese Produktionspfade."
              : "Policy and isolation define the available environment. The sentinel and gateway connect observed decoy access to later network decisions. Stored evidence then supports inspection, provenance and incidents; GhostBench validates these production paths."}
          </p>
          <dl className="mt-8 grid gap-x-10 md:grid-cols-2">
            {architecture[locale].map(([title, description]) => (
              <div key={title} className="min-w-0 border-t border-line py-6">
                <dt className="text-lg font-semibold text-ink">{title}</dt>
                <dd className="body-copy mt-3">{description}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div id="ghost-setup" className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="liquid-card min-w-0 p-7 sm:p-9">
            <p className="eyebrow">INSTALL</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.installTitle}
            </h2>
            <p className="body-copy mt-4">{c.installText}</p>
            <pre
              tabIndex={0}
              className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-xs leading-6 text-white"
            >
              <code>{c.installCode}</code>
            </pre>
            <div className="mt-5">
              <ActionLink href={release} external variant="secondary">
                {locale === "de"
                  ? "Linux-Binaries und SHA256SUMS"
                  : "Linux binaries and SHA256SUMS"}
              </ActionLink>
            </div>
          </Reveal>
          <Reveal className="liquid-card min-w-0 p-7 sm:p-9">
            <p className="eyebrow">USAGE</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.quickTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              {c.quickSteps.map((x) => (
                <li key={x}>— {x}</li>
              ))}
            </ul>
            <pre
              tabIndex={0}
              className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-xs leading-6 text-white"
            >
              <code>{c.quickCode}</code>
            </pre>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="liquid-card min-w-0 p-7 sm:p-9">
            <p className="eyebrow">EXAMPLE</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.exampleTitle}
            </h2>
            <p className="body-copy mt-4">{c.exampleText}</p>
          </Reveal>
          <Reveal className="liquid-card min-w-0 p-7 sm:p-9">
            <p className="eyebrow">NETWORK</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">
              {c.networkTitle}
            </h2>
            <p className="body-copy mt-4">{c.networkText}</p>
          </Reveal>
        </div>

        <Reveal
          id="ghost-bench"
          className="dark-band mt-16 rounded-[2rem] p-8 sm:p-12"
        >
          <p className="eyebrow text-[var(--color-dark-muted)]">
            GHOSTBENCH · RELEASE GATE
          </p>
          <h2 className="display-section mt-6 text-white">{c.benchTitle}</h2>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-[var(--color-dark-body)]">
            {c.benchText}
          </p>
          <div className="mt-7 inline-flex rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-white">
            PASS: 15 · FAIL: 0 · SKIP: 0
          </div>
          <div className="mt-5">
            <ActionLink href={releaseGate} external variant="secondary">
              {locale === "de"
                ? "Release-Job und Ergebnisse"
                : "Release job and results"}
            </ActionLink>
          </div>
          <details className="mt-7 text-sm leading-7 text-[var(--color-dark-body)]">
            <summary className="cursor-pointer font-semibold text-white">
              {locale === "de"
                ? "Die fünf neuen Szenarien"
                : "The five new scenarios"}
            </summary>
            <dl className="mt-5 space-y-5">
              {newScenarios.map(([name, en, de]) => (
                <div key={name}>
                  <dt className="break-words font-mono text-white">{name}</dt>
                  <dd>{locale === "de" ? de : en}</dd>
                </div>
              ))}
            </dl>
          </details>
          <pre
            tabIndex={0}
            className="mt-7 overflow-x-auto rounded-2xl bg-black/50 p-5 text-xs leading-6 text-white"
          >
            <code>{c.benchCode}</code>
          </pre>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal className="liquid-card min-w-0 p-7 sm:p-9">
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
          <Reveal className="liquid-card min-w-0 p-7 sm:p-9">
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
