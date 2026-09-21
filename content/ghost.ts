// Release facts verified against the annotated v0.3.0 tag and its release gate.
// Keep product copy, commands and evidence tied to this snapshot, not moving main.
export const ghostRelease = {
  version: "v0.3.0",
  date: "2026-09-21",
  commit: "2184a0e87b7dca161267f5fe596a2dd5d56d189d",
  repository: "https://github.com/rappidAI-Research/rappid-ghost",
  gate: "https://github.com/rappidAI-Research/rappid-ghost/actions/runs/35648771011",
  bench: { passed: 25, failed: 0, skipped: 0 },
} as const;

const source = `${ghostRelease.repository}/blob/${ghostRelease.commit}`;
export const ghostLinks = {
  repository: ghostRelease.repository,
  release: `${ghostRelease.repository}/releases/tag/${ghostRelease.version}`,
  development: `${source}/docs/releases/v0.3.0.md`,
  readme: `${source}/README.md`,
  changelog: `${source}/CHANGELOG.md`,
  architecture: `${source}/docs/architecture.md`,
  security: `${source}/docs/security-model.md`,
  threat: `${source}/docs/threat-model.md`,
  network: `${source}/docs/network-security.md`,
  benchmarks: `${source}/docs/benchmarks.md`,
  provenance: `${source}/docs/provenance.md`,
  incidents: `${source}/docs/incidents.md`,
  promptguard: `${source}/docs/prompt-injection-guard.md`,
  approvals: `${source}/docs/approvals.md`,
  runtimeResources: `${source}/docs/runtime-resources.md`,
  configuration: `${source}/ghost.example.yaml`,
  examples: `${ghostRelease.repository}/tree/${ghostRelease.commit}/examples`,
  reporting: `${source}/SECURITY.md`,
  contributing: `${source}/CONTRIBUTING.md`,
  license: `${source}/LICENSE`,
  revision: `${ghostRelease.repository}/tree/${ghostRelease.commit}`,
  gate: ghostRelease.gate,
  amd64: `${ghostRelease.repository}/releases/download/${ghostRelease.version}/ghost_0.3.0_linux_amd64`,
  arm64: `${ghostRelease.repository}/releases/download/${ghostRelease.version}/ghost_0.3.0_linux_arm64`,
  checksums: `${ghostRelease.repository}/releases/download/${ghostRelease.version}/SHA256SUMS`,
} as const;

export const ghostBenchScenarios = [
  "host-home-isolation",
  "shadow-credentials",
  "deny-sensitive-resource",
  "network-deny",
  "network-allowlist",
  "direct-egress-bypass",
  "dynamic-containment",
  "session-isolation",
  "fail-closed-runtime",
  "safe-baseline",
  "private-destination-blocked",
  "environment-isolation",
  "container-confinement",
  "concurrent-containment",
  "interrupted-session-recovery",
  "prompt-injection-detected",
  "prompt-guard-false-positive",
  "untrusted-content-provenance",
  "prompt-shadow-context",
  "approval-unavailable",
  "approval-once",
  "approval-containment-precedence",
  "concurrent-approval-once",
  "cross-session-security-isolation",
  "session-timeout",
] as const;

export const ghostCommands = {
  install: `git clone --branch v0.3.0 --depth 1 https://github.com/rappidAI-Research/rappid-ghost.git
cd rappid-ghost
go build -o bin/ghost ./cmd/ghost
export PATH="$PWD/bin:$PATH"
ghost version`,
  start: `mkdir -p ../ghost-demo
cd ../ghost-demo
ghost init
ghost run -- echo "hello from ghost"`,
  shadow: `ghost run -- sh -c 'cat ~/.aws/credentials'
ghost inspect latest
ghost graph latest
ghost incidents latest`,
  bench: `ghost bench
ghost bench --require-all
ghost bench --scenario dynamic-containment`,
  network: `network:
  mode: allowlist
  allow:
    - github.com
  ask:
    - api.example.com`,
} as const;

export const ghostCopy = {
  en: {
    intro: {
      eyebrow: "GHOST v0.3.0 · INTEGRATED AGENT SECURITY",
      title: "rappidAI Ghost. Security, under the hood.",
      description:
        "An integrated security runtime for autonomous AI agents. Ghost combines isolation, deception, prompt-injection signals, scoped approvals, runtime limits and evidence behind one simple execution flow.",
    },
    index: "Explore Ghost",
    nav: ["Overview", "What changed in v0.3.0", "Get started", "GhostBench"],
    status: "Released · Experimental · Apache-2.0",
    github: "View on GitHub",
    release: "v0.3.0 Release",
    getStarted: "Get started",
    overviewTitle: "One command. Multiple security layers.",
    overview:
      "Ghost wraps agent execution in one controlled runtime. It preflights the environment, isolates the process, keeps protected host resources out of reach, inspects selected untrusted instruction surfaces, enforces network and resource boundaries, and records evidence for later inspection.",
    purpose:
      "For developers, security engineers and researchers who want autonomous agents to stay useful without silently inheriting broad trust. Most complexity stays underneath ghost run; advanced evidence remains available through inspect, graph and incidents when needed.",
    policyTitle: "ALLOW. DENY. SHADOW. ASK.",
    policies: [
      {
        name: "ALLOW",
        description:
          "The permitted real resource or exact destination is available under the active policy.",
      },
      {
        name: "DENY",
        description:
          "Access is refused. Hard runtime, host and containment boundaries remain non-approvable.",
      },
      {
        name: "SHADOW",
        description:
          "Ghost exposes controlled synthetic material while the corresponding protected host resource remains isolated.",
      },
      {
        name: "ASK",
        description:
          "For explicitly configured destinations only, Ghost can pause one exact operation for a narrow user decision. Unavailable or malformed interaction becomes DENY.",
      },
    ],
    policyScope:
      "Runtime enforcement is deterministic and never delegates authorization to an LLM. The Prompt-Injection Guard contributes bounded security signals and trust context, but a detector result can never make a forbidden operation safe or disable isolation.",
    shadowTitle: "Why a decoy can tell you more than a refusal.",
    shadowText:
      "Suppose a process tries to open ~/.aws/credentials. With the default Shadow Home policy, it receives a fresh synthetic credential file inside /home/ghost—not the host user's credentials. Ghost does not check, copy or derive values from the real file. Synthetic AWS values, the nonfunctional SSH-key-shaped file and the generic .env decoy cannot authenticate to real services.",
    shadowSteps: [
      [
        "Prepare",
        "Create session-private decoys and confirm the separate inotify sentinel is watching before the command starts.",
      ],
      [
        "Observe",
        "Record DECOY_ACCESS when an open/access event is observed for an explicit decoy file.",
      ],
      [
        "Contain",
        "With on_decoy_access.network: deny, publish containment and fence subsequent gateway allow decisions through the sentinel queue.",
      ],
      [
        "Inspect",
        "Use the event timeline, provenance graph and incidents to see the supported sequence with evidence references.",
      ],
    ],
    shadowLimit:
      "A decoy access is evidence of a file event, not proof of malicious intent or credential exfiltration. Containment does not revoke already-authorized, established connections.",
    changesTitle: "v0.3.0 turns Ghost into an integrated agent-security runtime.",
    changesIntro:
      "The release keeps the same two-command workflow while adding context, approval, runtime protection and stronger evidence underneath it. The existing v0.2 isolation and network boundary remain authoritative.",
    changes: [
      {
        title: "Integrated Prompt-Injection Guard",
        text: "Before PROCESS_START, Ghost inspects bounded agent-facing workspace surfaces such as AGENTS.md, documentation and selected scripts. Findings are minimized rule/category/hash signals, not copied document bodies, and both false positives and false negatives remain possible.",
        link: "promptguard",
      },
      {
        title: "Trust context without invented causality",
        text: "Selected workspace sources are classified deterministically and linked into provenance as observed or derived context. Ghost can reconstruct that suspicious instructions preceded later activity without claiming that the content caused the agent to act.",
        link: "provenance",
      },
      {
        title: "ALLOW / DENY / SHADOW / ASK",
        text: "Exact configured HTTP/HTTPS destinations may require ALLOW_ONCE, ALLOW_SESSION or DENY. Approval is session-local and exact to scheme, host, port and method; containment and hard-forbidden destinations always take precedence.",
        link: "approvals",
      },
      {
        title: "Integrated runtime resource protection",
        text: "The agent and descendants run with mandatory memory, CPU, PID, temporary-storage and session-time ceilings. v0.3 defaults to 2 GiB RAM, one CPU, 256 processes/threads, 64 MiB /tmp and a one-hour deadline with bounded termination and cleanup.",
        link: "runtimeResources",
      },
      {
        title: "Automatic secure preflight and summaries",
        text: "ghost run verifies Docker, identity, policy, workspace and session-owned state before PROCESS_START. Successful checks stay quiet; security-relevant sessions end with concise summaries derived from persisted evidence.",
        link: "architecture",
      },
      {
        title: "Adversarially validated release",
        text: "The final audit fixed approval, containment, HTTP framing, evidence-finalization, recovery and rapid child-OOM edge cases. GhostBench now contains 25 named scenarios and the release gate recorded 25 PASS, 0 FAIL and 0 SKIP.",
        link: "benchmarks",
      },
    ],
    sourceLink: "Read the implementation boundary",
    architectureTitle: "One runtime. Integrated security context.",
    architectureIntro:
      "Ghost routes workspace observations, policy decisions, runtime enforcement and evidence through one session lifecycle. Prompt findings enrich context; policy and hard runtime boundaries remain authoritative; stored events feed provenance, incidents and summaries.",
    layers: [
      [
        "Isolation",
        "Ephemeral Docker sessions expose the selected workspace and synthetic home, not the real home, Docker socket or Ghost database.",
      ],
      [
        "Prompt & trust context",
        "A bounded pre-run guard inspects supported instruction surfaces and records content-minimized findings plus deterministic trust context. It is a signal layer, not an authorization authority.",
      ],
      [
        "Policy",
        "Strict ghost.yaml validation applies deterministic ALLOW, DENY, SHADOW and intentionally scoped ASK decisions. Containment and hard forbidden targets override approval.",
      ],
      [
        "Deception",
        "Fresh synthetic AWS, SSH and .env resources provide observable alternatives without reading or deriving values from real credentials.",
      ],
      [
        "Network & containment",
        "Exact-hostname HTTP/HTTPS egress runs through a session gateway with resolved-address validation and live containment rechecks before authorization.",
      ],
      [
        "Runtime protection",
        "Mandatory cgroup-backed memory, CPU and PID ceilings, bounded /tmp, read-only roots and a session deadline constrain the agent and descendants.",
      ],
      [
        "Evidence",
        "SQLite retains minimized session events and security state. Required evidence failures fail closed rather than silently weakening the boundary.",
      ],
      [
        "Provenance / incidents",
        "Deterministic reconstruction distinguishes observations, derived relationships and temporal ordering without inventing model intent or causality.",
      ],
      [
        "Human approval",
        "Explicitly configured ASK destinations may pause for a narrow user decision; non-interactive, malformed or timed-out approval becomes DENY.",
      ],
      [
        "GhostBench",
        "Twenty-five release-gated scenarios exercise isolated properties and integrated prompt/SHADOW/network, approval, timeout and session-isolation chains.",
      ],
    ],
    networkTitle: "A hostname is not enough.",
    networkText:
      "HTTP is restricted to port 80 and HTTPS CONNECT to port 443. github.com does not implicitly authorize api.github.com. Raw IPs, wildcards, single-label and local-use names such as host.docker.internal are rejected. IPv6 upstream egress is unsupported and fails closed.",
    networkDetails: "Resolution and containment details",
    networkDetailText:
      "Every returned IPv4 address must pass validation, including checks for unspecified/current-network, private, loopback, shared, link-local, protocol-assignment, benchmarking, multicast and reserved ranges. Empty, malformed, failed or mixed safe/prohibited DNS answers are denied. Connecting by the validated numeric address avoids a second hostname lookup. Each new request is checked again; Ghost does not claim to eliminate every DNS-rebinding technique or relay through an approved server.",
    fenceDetail:
      "The token/ack fence orders requests against decoy events already queued by inotify. A genuinely concurrent request whose barrier is ordered first can still be allowed. It is not packet-level atomic revocation and cannot end an already-established HTTP response or CONNECT tunnel. The Docker internal bridge remains a local link; services deliberately bound to that bridge are in the reachable set.",
    networkConfig:
      "Optional: replace only the network section in ghost.yaml. Keep deny unless limited egress is needed.",
    installTitle: "Start with a controlled local run.",
    requirements:
      "Runtime-tested release target: Linux amd64 with Docker Engine, a working local Docker CLI/daemon and non-zero numeric host UID/GID. Linux arm64 binaries are cross-built and checksum-verified. Source builds need Git and Go 1.26.8 or a newer supported patch release. Docker Desktop on macOS is not release-qualified; native Windows execution is unsupported.",
    buildTitle: "1. Build the released source",
    buildNote:
      "The tag selects released v0.3.0 rather than moving main. PATH is set for this terminal so the commands below resolve to the binary you just built. The reviewed release revision is linked below.",
    binaryNote:
      "Already have Linux? The release also provides amd64 and arm64 binaries, so Go is not required for that route. Verify the downloaded binary against SHA256SUMS before execution.",
    startTitle: "2. Initialize a clean demo project",
    startNote:
      "These commands create a sibling ghost-demo directory. ghost init creates ghost.yaml, .ghost/ghost.db and .ghost/sessions/ without overwriting an existing configuration. Keep .ghost/ out of Git. For a real project, run init in that project's directory instead.",
    exampleTitle: "3. Access a decoy and inspect the evidence",
    exampleNote:
      "Run this in the demo directory. The cat command returns synthetic content. inspect shows the session timeline; graph and incidents reconstruct supported relationships. Both also accept --json. The -- separator for run is required.",
    practicalLimit:
      "Ghost's pinned Alpine image is intentionally minimal: host-installed Python, Node or agent packages do not automatically exist inside it. Missing commands fail and never fall back to the host. The mounted workspace is intentionally visible to the agent, and attached program output is not sanitized, so do not place secrets there unless the agent is meant to access them.",
    benchTitle: "Twenty-five scenarios. Integrated security chains.",
    benchText:
      "GhostBench is a reproducible security-property suite, not a security score. The v0.3.0 release gate ran all twenty-five required scenarios successfully on Linux amd64 with Docker, including integrated prompt/SHADOW/network, approval/containment, runtime-timeout and cross-session chains.",
    benchLabel: "Recorded v0.3.0 release result · 21 September 2026",
    benchResult: "PASS: 25 · FAIL: 0 · SKIP: 0",
    benchExamples:
      "v0.3 coverage includes hostile prompt signals with SHADOW access and later network denial, defensive-document false-positive control, non-interactive ASK failure closure, one-use and concurrent approval isolation, containment overriding cached approval, runtime timeout cleanup and integrated cross-session isolation.",
    benchNote:
      "--require-all exits unsuccessfully on either FAIL or SKIP. Without Docker, Docker-dependent cases are SKIP, not PASS. The dynamic-containment demo uses a harmless local Docker HTTP fixture; it does not send credentials to an external service.",
    allScenarios: "All twenty-five scenario identifiers",
    gate: "Release CI evidence",
    methodology: "GhostBench methodology",
    limitsTitle: "What Ghost does not guarantee.",
    limits: [
      [
        "Docker is still trusted",
        "Docker, its daemon, the OCI runtime, pinned image and host kernel remain part of the trusted computing base. Ghost does not guarantee protection from every container escape or kernel vulnerability.",
      ],
      [
        "Prompt findings are heuristic",
        "The integrated guard can miss attacks or flag benign text. It does not understand model intent and never authorizes access by declaring content safe.",
      ],
      [
        "Evidence is not causality",
        "Provenance distinguishes observed events, derived exposure and temporal FOLLOWED_BY relationships. Ghost does not prove that suspicious content caused later behavior or that data was exfiltrated.",
      ],
      [
        "Network and resource controls are deliberately bounded",
        "Ghost does not inspect TLS content, proxy general TCP/UDP, support IPv6 upstream egress, impose a byte quota on the workspace/evidence store, or provide aggregate host admission control. Established connections are not revoked retroactively.",
      ],
      [
        "Host and output boundaries still matter",
        "Read-write mode intentionally permits workspace modification, and attached program output is not sanitized. Hard host/daemon failure can interrupt cleanup or evidence collection. Twenty-five passing scenarios demonstrate named properties, not universal attack prevention.",
      ],
    ],
    sourcesTitle: "Inspect the source. Try the release.",
    sourcesText:
      "The documentation, binaries, checksums and twenty-five-scenario result below are pinned to released v0.3.0 at the audited release commit. Ghost remains experimental, and the linked security/threat documentation defines the precise boundary.",
    readme: "Documentation / README",
    security: "Security model",
    moreSources: "Architecture, policy and evidence references",
    sourceNames: [
      "Architecture",
      "Threat model",
      "Network security",
      "Provenance",
      "Incidents",
      "Example configuration",
      "Examples",
      "Changelog",
      "Private security reporting",
      "Contributing",
      "Apache-2.0 license",
      "Reviewed revision",
    ],
  },
  de: {
    intro: {
      eyebrow: "GHOST v0.3.0 · INTEGRIERTE AGENTEN-SICHERHEIT",
      title: "rappidAI Ghost. Sicherheit im Hintergrund.",
      description:
        "Eine integrierte Security-Runtime für autonome KI-Agenten. Ghost verbindet Isolation, Deception, Prompt-Injection-Signale, eng begrenzte Freigaben, Runtime-Limits und nachvollziehbare Evidenz in einem einfachen Ablauf.",
    },
    index: "Ghost entdecken",
    nav: ["Überblick", "Neu in v0.3.0", "Einstieg", "GhostBench"],
    status: "Veröffentlicht · Experimentell · Apache-2.0",
    github: "Auf GitHub ansehen",
    release: "v0.3.0 Release",
    getStarted: "Loslegen",
    overviewTitle: "Ein Befehl. Mehrere Sicherheitsebenen.",
    overview:
      "Ghost führt Agenten in einer kontrollierten Runtime aus. Vor dem Start prüft es die Umgebung, isoliert den Prozess, hält geschützte Host-Ressourcen fern, untersucht ausgewählte nicht vertrauenswürdige Instruktionsflächen, setzt Netzwerk- und Ressourcenlimits durch und speichert Evidenz für die spätere Analyse.",
    purpose:
      "Für Entwickler, Security Engineers und Forschende, die autonome Agenten nützlich einsetzen wollen, ohne ihnen stillschweigend zu viel Vertrauen zu geben. Die Komplexität bleibt weitgehend unter ghost run; detaillierte Evidenz ist bei Bedarf über inspect, graph und incidents verfügbar.",
    policyTitle: "ALLOW. DENY. SHADOW. ASK.",
    policies: [
      {
        name: "ALLOW",
        description:
          "Die erlaubte reale Ressource oder das exakte Ziel steht unter der aktiven Policy zur Verfügung.",
      },
      {
        name: "DENY",
        description:
          "Der Zugriff wird verweigert. Harte Runtime-, Host- und Containment-Grenzen bleiben nicht freigabefähig.",
      },
      {
        name: "SHADOW",
        description:
          "Ghost stellt kontrolliertes synthetisches Material bereit, während die entsprechende geschützte Host-Ressource isoliert bleibt.",
      },
      {
        name: "ASK",
        description:
          "Nur für explizit konfigurierte Ziele kann Ghost eine einzelne Operation pausieren und eine eng begrenzte Nutzerentscheidung anfordern. Fehlende oder ungültige Interaktion wird zu DENY.",
      },
    ],
    policyScope:
      "Die Durchsetzung bleibt deterministisch und delegiert Autorisierung niemals an ein LLM. Der Prompt-Injection Guard liefert begrenzte Sicherheitssignale und Trust Context, kann aber weder verbotene Zugriffe sicher machen noch Isolation deaktivieren.",
    shadowTitle: "Warum ein Köder mehr zeigen kann als eine Ablehnung.",
    shadowText:
      "Ein Prozess versucht beispielsweise, ~/.aws/credentials zu öffnen. Mit der standardmäßigen Shadow-Home-Policy erhält er eine frisch erzeugte synthetische Datei in /home/ghost – nicht die Zugangsdaten des Host-Nutzers. Ghost prüft oder kopiert die echte Datei nicht und leitet daraus keine Werte ab. Die synthetischen AWS-Werte, die funktionslose SSH-Key-förmige Datei und der generische .env-Köder können sich nicht bei echten Diensten authentifizieren.",
    shadowSteps: [
      [
        "Vorbereiten",
        "Session-private Köder erzeugen und vor dem Befehlsstart bestätigen, dass der separate inotify-Sentinel sie überwacht.",
      ],
      [
        "Beobachten",
        "DECOY_ACCESS protokollieren, wenn für eine explizite Köderdatei ein Open/Access-Ereignis beobachtet wird.",
      ],
      [
        "Eindämmen",
        "Mit on_decoy_access.network: deny den Containment-Zustand setzen und spätere Gateway-Freigaben über die Sentinel-Warteschlange absichern.",
      ],
      [
        "Prüfen",
        "In Ereignis-Timeline, Provenance-Graph und Incidents die belegte Abfolge samt Nachweisreferenzen nachvollziehen.",
      ],
    ],
    shadowLimit:
      "Ein Köderzugriff belegt ein Dateiereignis, nicht eine böswillige Absicht oder den Abfluss von Zugangsdaten. Containment widerruft keine bereits freigegebenen, aufgebauten Verbindungen.",
    changesTitle: "v0.3.0 macht Ghost zu einer integrierten Agenten-Security-Runtime.",
    changesIntro:
      "Der Release behält denselben einfachen Ablauf, integriert darunter aber Kontext, eng begrenzte Freigaben, Runtime-Schutz und stärkere Evidenz. Die Sicherheitsgrenzen aus v0.2 bleiben maßgeblich.",
    changes: [
      {
        title: "Integrierter Prompt-Injection Guard",
        text: "Vor PROCESS_START untersucht Ghost begrenzte agentenrelevante Workspace-Flächen wie AGENTS.md, Dokumentation und ausgewählte Skripte. Findings speichern nur minimierte Regel-, Kategorie- und Hash-Daten; False Positives und False Negatives bleiben möglich.",
        link: "promptguard",
      },
      {
        title: "Trust Context ohne erfundene Kausalität",
        text: "Ausgewählte Workspace-Quellen werden deterministisch klassifiziert und in der Provenance als beobachteter oder abgeleiteter Kontext verknüpft. Ghost kann zeitliche Zusammenhänge zeigen, ohne zu behaupten, dass ein Text spätere Aktionen verursacht hat.",
        link: "provenance",
      },
      {
        title: "ALLOW / DENY / SHADOW / ASK",
        text: "Für exakt konfigurierte HTTP/HTTPS-Ziele sind ALLOW_ONCE, ALLOW_SESSION oder DENY möglich. Freigaben gelten nur für die laufende Session und das exakte Schema, Ziel, den Port und die Methode; Containment und harte Sperren haben immer Vorrang.",
        link: "approvals",
      },
      {
        title: "Integrierter Runtime-Ressourcenschutz",
        text: "Agent und Kindprozesse laufen mit verpflichtenden Grenzen für RAM, CPU, Prozesse, temporären Speicher und Laufzeit. Die Standardwerte sind 2 GiB RAM, eine CPU, 256 Prozesse/Threads, 64 MiB /tmp und eine Stunde Laufzeit mit begrenzter Terminierung und Bereinigung.",
        link: "runtimeResources",
      },
      {
        title: "Automatischer Security-Preflight und Zusammenfassungen",
        text: "ghost run prüft Docker, Identität, Policy, Workspace und session-eigenen Zustand vor PROCESS_START. Erfolgreiche Checks bleiben leise; sicherheitsrelevante Sessions enden mit kurzen, aus gespeicherter Evidenz abgeleiteten Zusammenfassungen.",
        link: "architecture",
      },
      {
        title: "Adversarial validierter Release",
        text: "Der finale Audit behob Edge Cases bei Approval, Containment, HTTP-Framing, Evidence-Finalisierung, Recovery und schnellen Child-OOMs. GhostBench umfasst jetzt 25 benannte Szenarien; das Release-Gate protokollierte 25 PASS, 0 FAIL und 0 SKIP.",
        link: "benchmarks",
      },
    ],
    sourceLink: "Implementierte Grenze nachlesen",
    architectureTitle: "Eine Runtime. Integrierter Sicherheitskontext.",
    architectureIntro:
      "Ghost führt Workspace-Beobachtungen, Policy-Entscheidungen, Runtime-Durchsetzung und Evidenz durch einen gemeinsamen Session-Lebenszyklus. Prompt-Findings erweitern den Kontext; Policy und harte Runtime-Grenzen bleiben maßgeblich; gespeicherte Events speisen Provenance, Incidents und Zusammenfassungen.",
    layers: [
      [
        "Isolation",
        "Kurzlebige Docker-Sessions stellen den gewählten Workspace und das synthetische Home bereit, nicht das echte Home, den Docker-Socket oder die Ghost-Datenbank.",
      ],
      [
        "Prompt- und Trust-Kontext",
        "Ein begrenzter Pre-Run-Guard untersucht unterstützte Instruktionsflächen und speichert content-minimierte Findings sowie deterministischen Trust Context. Das ist eine Signallage, keine Autorisierungsinstanz.",
      ],
      [
        "Policy",
        "Strikte ghost.yaml-Validierung setzt ALLOW, DENY, SHADOW und bewusst eng begrenztes ASK deterministisch um. Containment und harte Sperren haben Vorrang vor Freigaben.",
      ],
      [
        "Deception",
        "Frische synthetische AWS-, SSH- und .env-Ressourcen liefern beobachtbare Alternativen, ohne echte Zugangsdaten zu lesen oder daraus Werte abzuleiten.",
      ],
      [
        "Netzwerk und Containment",
        "HTTP/HTTPS-Egress für exakte Hostnamen läuft über ein session-eigenes Gateway mit validierter Zieladresse und erneuter Containment-Prüfung vor der Freigabe.",
      ],
      [
        "Runtime-Schutz",
        "Verpflichtende cgroup-basierte Grenzen für RAM, CPU und PIDs, begrenztes /tmp, schreibgeschützte Root-Dateisysteme und ein Session-Timeout begrenzen Agent und Kindprozesse.",
      ],
      [
        "Evidenz",
        "SQLite speichert minimierte Session-Events und Sicherheitszustand. Fehlende verpflichtende Evidenz führt fail-closed statt zu einer stillen Abschwächung.",
      ],
      [
        "Provenance / Incidents",
        "Deterministische Rekonstruktion trennt Beobachtungen, abgeleitete Beziehungen und zeitliche Reihenfolge, ohne Modellabsicht oder Kausalität zu erfinden.",
      ],
      [
        "Nutzerfreigabe",
        "Explizit konfigurierte ASK-Ziele können eine eng begrenzte Entscheidung anfordern; nicht-interaktive, ungültige oder abgelaufene Freigaben werden zu DENY.",
      ],
      [
        "GhostBench",
        "25 release-gegatete Szenarien prüfen einzelne Eigenschaften und integrierte Prompt/SHADOW/Netzwerk-, Approval-, Timeout- und Session-Isolationsketten.",
      ],
    ],
    networkTitle: "Ein Hostname allein reicht nicht.",
    networkText:
      "HTTP ist auf Port 80 beschränkt, HTTPS CONNECT auf Port 443. github.com erlaubt nicht automatisch api.github.com. Direkte IP-Angaben, Wildcards, einteilige und lokale Namen wie host.docker.internal werden abgelehnt. IPv6-Upstream-Verbindungen sind nicht unterstützt und bleiben gesperrt.",
    networkDetails: "Details zu Namensauflösung und Containment",
    networkDetailText:
      "Jede zurückgegebene IPv4-Adresse muss die Prüfung bestehen, unter anderem für unspezifizierte/lokale, private, Loopback-, Shared-, Link-Local-, Protocol-Assignment-, Benchmark-, Multicast- und reservierte Bereiche. Leere, fehlerhafte, fehlgeschlagene oder gemischt erlaubte/verbotene DNS-Antworten werden abgelehnt. Die Verbindung zur validierten numerischen Adresse vermeidet eine zweite Hostnamen-Auflösung. Jede neue Anfrage wird erneut geprüft; Ghost behauptet keinen vollständigen Schutz vor DNS-Rebinding oder Weiterleitung durch erlaubte Server.",
    fenceDetail:
      "Die Token/Ack-Fence ordnet Anfragen gegenüber bereits von inotify eingereihten Köderereignissen. Eine tatsächlich gleichzeitige Anfrage, deren Barriere zuerst eingeordnet wird, kann noch erlaubt werden. Das ist kein atomarer Widerruf auf Paketebene und beendet keine bereits aufgebaute HTTP-Antwort oder CONNECT-Verbindung. Die interne Docker-Bridge bleibt lokal erreichbar; absichtlich dort gebundene Dienste gehören zur erreichbaren Umgebung.",
    networkConfig:
      "Optional: Nur den network-Abschnitt in ghost.yaml ersetzen. Behalte deny bei, solange kein begrenzter ausgehender Zugriff nötig ist.",
    installTitle: "Mit einem kontrollierten lokalen Run starten.",
    requirements:
      "Runtime-getestetes Release-Ziel: Linux amd64 mit Docker Engine, funktionierender lokaler Docker-CLI samt Daemon und numerischer Host-UID sowie -GID ungleich null. Linux-arm64-Binaries werden cross-built und per Prüfsumme verifiziert. Source-Builds benötigen Git und Go 1.26.8 oder einen neueren unterstützten Patch-Release. Docker Desktop auf macOS ist nicht release-qualifiziert; native Windows-Ausführung wird nicht unterstützt.",
    buildTitle: "1. Den veröffentlichten Quellcode bauen",
    buildNote:
      "Der Tag wählt das veröffentlichte v0.3.0 statt des veränderlichen main. PATH gilt für dieses Terminal, damit die folgenden Befehle die gerade gebaute Binärdatei finden. Die geprüfte Release-Revision ist unten verlinkt.",
    binaryNote:
      "Der Release enthält auch Linux-Binärdateien für amd64 und arm64. Dafür ist kein Go nötig. Prüfe die heruntergeladene Datei vor der Ausführung gegen SHA256SUMS.",
    startTitle: "2. Ein sauberes Demo-Projekt initialisieren",
    startNote:
      "Diese Befehle erstellen das benachbarte Verzeichnis ghost-demo. ghost init erzeugt ghost.yaml, .ghost/ghost.db und .ghost/sessions/, ohne eine vorhandene Konfiguration zu überschreiben. .ghost/ gehört nicht in Git. Für ein echtes Projekt führst du init stattdessen in dessen Verzeichnis aus.",
    exampleTitle: "3. Auf einen Köder zugreifen und Nachweise prüfen",
    exampleNote:
      "Im Demo-Verzeichnis ausführen. cat liefert synthetischen Inhalt. inspect zeigt die Session-Timeline; graph und incidents rekonstruieren belegte Zusammenhänge. Beide unterstützen auch --json. Der Trenner -- ist für run erforderlich.",
    practicalLimit:
      "Ghosts fixiertes Alpine-Image ist bewusst minimal: Auf dem Host installierte Python-, Node- oder Agenten-Pakete sind darin nicht automatisch verfügbar. Fehlende Befehle schlagen fehl und werden nie ersatzweise auf dem Host ausgeführt. Der eingebundene Workspace ist für den Agenten sichtbar und angehängte Programmausgabe wird nicht bereinigt; lege dort nur Secrets ab, auf die der Agent tatsächlich zugreifen soll.",
    benchTitle: "25 Szenarien. Integrierte Sicherheitsketten.",
    benchText:
      "GhostBench ist eine reproduzierbare Suite für benannte Sicherheitseigenschaften, kein Security-Score. Das v0.3.0-Release-Gate führte alle 25 verpflichtenden Szenarien unter Linux amd64 mit Docker erfolgreich aus, einschließlich integrierter Prompt/SHADOW/Netzwerk-, Approval/Containment-, Runtime-Timeout- und Cross-Session-Ketten.",
    benchLabel: "Protokolliertes v0.3.0-Release-Ergebnis · 21. September 2026",
    benchResult: "PASS: 25 · FAIL: 0 · SKIP: 0",
    benchExamples:
      "v0.3 prüft unter anderem feindliche Prompt-Signale mit späterem SHADOW-Zugriff und Network-DENY, False-Positive-Kontrollen für defensive Dokumentation, fail-closed ASK ohne Interaktion, One-Use- und parallele Approval-Isolation, Containment vor gecachter Freigabe, Timeout-Cleanup und integrierte Cross-Session-Isolation.",
    benchNote:
      "--require-all endet sowohl bei FAIL als auch bei SKIP mit einem Fehlerstatus. Ohne Docker sind Docker-abhängige Fälle SKIP, nicht PASS. Die dynamic-containment-Demo nutzt einen harmlosen lokalen Docker-HTTP-Testdienst; sie sendet keine Zugangsdaten an externe Dienste.",
    allScenarios: "Alle 25 Szenario-IDs",
    gate: "Release-CI-Nachweis",
    methodology: "GhostBench-Methodik",
    limitsTitle: "Was Ghost nicht garantiert.",
    limits: [
      [
        "Docker bleibt Teil der Vertrauensbasis",
        "Docker, Daemon, OCI-Runtime, fixiertes Image und Host-Kernel bleiben Teil der Trusted Computing Base. Ghost garantiert keinen Schutz vor jedem Container-Escape oder jeder Kernel-Schwachstelle.",
      ],
      [
        "Prompt-Findings sind heuristisch",
        "Der integrierte Guard kann Angriffe übersehen oder gutartige Texte markieren. Er versteht keine Modellabsicht und darf Zugriffe nie dadurch erlauben, dass Inhalt als sicher eingestuft wird.",
      ],
      [
        "Evidenz ist keine Kausalität",
        "Provenance trennt beobachtete Events, abgeleitete Exposition und zeitliche FOLLOWED_BY-Beziehungen. Ghost beweist weder, dass verdächtiger Inhalt spätere Aktionen verursacht hat, noch dass Daten exfiltriert wurden.",
      ],
      [
        "Netzwerk- und Ressourcenlimits sind bewusst begrenzt",
        "Ghost inspiziert keine TLS-Inhalte, proxyt kein allgemeines TCP/UDP, unterstützt keinen IPv6-Upstream, setzt kein Byte-Limit für Workspace/Evidenz und bietet keine globale Host-Ressourcenreservierung. Bereits aufgebaute Verbindungen werden nicht rückwirkend beendet.",
      ],
      [
        "Host- und Output-Grenzen bleiben relevant",
        "Read-write erlaubt bewusst Änderungen am Workspace, und angehängte Programmausgabe wird nicht sanitisiert. Harte Host-/Daemon-Ausfälle können Cleanup oder Evidenzsammlung unterbrechen. 25 bestandene Szenarien belegen benannte Eigenschaften, keinen universellen Angriffsschutz.",
      ],
    ],
    sourcesTitle: "Quellcode prüfen. Release ausprobieren.",
    sourcesText:
      "Dokumentation, Binärdateien, Prüfsummen und das Ergebnis der 25 Szenarien unten sind an das veröffentlichte v0.3.0 und den auditierten Release-Commit gebunden. Ghost bleibt experimentell; Sicherheits- und Bedrohungsmodell beschreiben die genaue Grenze.",
    readme: "Dokumentation / README",
    security: "Sicherheitsmodell",
    moreSources: "Architektur, Regeln und Nachweisreferenzen",
    sourceNames: [
      "Architektur",
      "Bedrohungsmodell",
      "Netzwerksicherheit",
      "Provenance",
      "Incidents",
      "Beispielkonfiguration",
      "Beispiele",
      "Changelog",
      "Private Sicherheitsmeldung",
      "Mitwirken",
      "Apache-2.0-Lizenz",
      "Geprüfte Revision",
    ],
  },
} as const;
