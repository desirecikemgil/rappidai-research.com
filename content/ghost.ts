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
    changesTitle:
      "v0.3.0 turns Ghost into an integrated agent-security runtime.",
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
      eyebrow: "GHOST v0.3.0 · INTEGRIERTE AGENTENSICHERHEIT",
      title: "rappidAI Ghost. Sicherheit im Hintergrund.",
      description:
        "Eine integrierte Security-Runtime für autonome KI-Agenten. Ghost bündelt Isolation, Täuschung, Prompt-Injection-Signale, eng begrenzte Freigaben, Laufzeitgrenzen und Nachweise in einem einfachen Ausführungsablauf.",
    },
    index: "Auf dieser Seite",
    nav: ["Überblick", "Neu in v0.3.0", "Einstieg", "GhostBench"],
    status: "Veröffentlicht · Experimentell · Apache-2.0",
    github: "Auf GitHub ansehen",
    release: "v0.3.0 Release",
    getStarted: "Zum Einstieg",
    overviewTitle: "Ein Befehl. Mehrere Sicherheitsebenen.",
    overview:
      "Ghost führt Agenten in einer kontrollierten Laufzeitumgebung aus. Es prüft vorab die Umgebung, isoliert den Prozess und hält geschützte Ressourcen des Hosts außer Reichweite. Außerdem untersucht Ghost ausgewählte nicht vertrauenswürdige Anweisungsquellen, setzt Grenzen für Netzwerk und Ressourcen durch und zeichnet Nachweise für die spätere Prüfung auf.",
    purpose:
      "Für Entwickler, Sicherheitsfachleute und Forschende, die wollen, dass autonome Agenten nützlich bleiben, ohne unbemerkt weitreichendes Vertrauen zu erben. Der Großteil der Komplexität bleibt hinter ghost run verborgen; ausführlichere Nachweise liefern bei Bedarf inspect, graph und incidents.",
    policyTitle: "ALLOW. DENY. SHADOW. ASK.",
    policies: [
      {
        name: "ALLOW",
        description:
          "Die erlaubte echte Ressource oder das exakt angegebene Ziel ist unter der aktiven Richtlinie verfügbar.",
      },
      {
        name: "DENY",
        description:
          "Der Zugriff wird verweigert. Harte Grenzen der Laufzeitumgebung, des Hosts und der Abschottung lassen sich nicht per Freigabe aufheben.",
      },
      {
        name: "SHADOW",
        description:
          "Ghost stellt kontrolliertes synthetisches Material bereit, während die zugehörige geschützte Ressource des Hosts isoliert bleibt.",
      },
      {
        name: "ASK",
        description:
          "Nur bei ausdrücklich konfigurierten Zielen kann Ghost einen einzelnen, exakt bestimmten Vorgang für eine eng gefasste Nutzerentscheidung anhalten. Ist keine Interaktion möglich oder ist sie fehlerhaft, gilt DENY.",
      },
    ],
    policyScope:
      "Die Durchsetzung zur Laufzeit ist deterministisch und überlässt die Autorisierung nie einem LLM. Der Prompt-Injection Guard liefert begrenzte Sicherheitssignale und Vertrauenskontext. Ein Erkennungsergebnis kann aber nie eine verbotene Operation sicher machen oder die Isolation abschalten.",
    shadowTitle: "Warum ein Köder mehr verraten kann als eine Ablehnung.",
    shadowText:
      "Angenommen, ein Prozess versucht, ~/.aws/credentials zu öffnen. Mit der Standardrichtlinie Shadow Home erhält er eine frisch erzeugte, synthetische Datei mit Zugangsdaten in /home/ghost – nicht die Zugangsdaten des Host-Nutzers. Ghost prüft die echte Datei nicht, kopiert sie nicht und leitet keine Werte aus ihr ab. Mit den synthetischen AWS-Werten, der funktionslosen Datei im Format eines SSH-Schlüssels und dem generischen .env-Köder ist keine Anmeldung bei echten Diensten möglich.",
    shadowSteps: [
      [
        "Vorbereiten",
        "Session-eigene Köder anlegen und vor dem Start des Befehls bestätigen, dass der separate inotify-Sentinel sie überwacht.",
      ],
      [
        "Beobachten",
        "DECOY_ACCESS aufzeichnen, wenn für eine ausdrücklich als Köder festgelegte Datei ein open/access-Ereignis beobachtet wird.",
      ],
      [
        "Abschotten",
        "Mit on_decoy_access.network: deny die Abschottung melden und spätere Allow-Entscheidungen des Gateways über die Sentinel-Warteschlange absichern.",
      ],
      [
        "Prüfen",
        "Über Ereignis-Zeitleiste, Herkunftsgraph und Vorfälle die belegte Abfolge samt Verweisen auf die Nachweise nachvollziehen.",
      ],
    ],
    shadowLimit:
      "Ein Zugriff auf einen Köder belegt ein Dateiereignis – weder eine böswillige Absicht noch den Abfluss von Zugangsdaten. Die Abschottung widerruft keine bereits autorisierten, aufgebauten Verbindungen.",
    changesTitle:
      "Mit v0.3.0 wird Ghost zu einer integrierten Security-Runtime für Agenten.",
    changesIntro:
      "Das Release behält den Ablauf mit zwei Befehlen bei und ergänzt darunter Kontext, Freigaben, Laufzeitschutz und belastbarere Nachweise. Die bestehende Isolation und Netzwerkgrenze aus v0.2 bleiben maßgeblich.",
    changes: [
      {
        title: "Integrierter Prompt-Injection Guard",
        text: "Vor PROCESS_START untersucht Ghost begrenzte, an Agenten gerichtete Stellen im Workspace wie AGENTS.md, Dokumentation und ausgewählte Skripte. Befunde bestehen aus minimierten Signalen zu Regel, Kategorie und Hash, nicht aus kopierten Dokumentinhalten. Falsch-positive wie falsch-negative Ergebnisse bleiben möglich.",
        link: "promptguard",
      },
      {
        title: "Vertrauenskontext ohne erfundene Kausalität",
        text: "Ausgewählte Quellen im Workspace werden deterministisch eingestuft und im Herkunftsnachweis als beobachteter oder abgeleiteter Kontext verknüpft. Ghost kann rekonstruieren, dass verdächtige Anweisungen späteren Aktivitäten vorausgingen – ohne zu behaupten, dass der Inhalt den Agenten zum Handeln gebracht hat.",
        link: "provenance",
      },
      {
        title: "ALLOW / DENY / SHADOW / ASK",
        text: "Für exakt konfigurierte HTTP/HTTPS-Ziele kann eine Entscheidung zwischen ALLOW_ONCE, ALLOW_SESSION und DENY erforderlich sein. Eine Freigabe gilt nur innerhalb der Session und exakt für Schema, Host, Port und Methode; Abschottung und fest gesperrte Ziele haben immer Vorrang.",
        link: "approvals",
      },
      {
        title: "Integrierter Ressourcenschutz zur Laufzeit",
        text: "Der Agent und alle untergeordneten Prozesse laufen mit verbindlichen Obergrenzen für Arbeitsspeicher, CPU, PIDs, temporären Speicher und Sessiondauer. In v0.3 gelten standardmäßig 2 GiB RAM, eine CPU, 256 Prozesse/Threads, 64 MiB /tmp und eine Frist von einer Stunde, mit begrenztem Beenden und Aufräumen.",
        link: "runtimeResources",
      },
      {
        title: "Automatische Sicherheitsprüfung vorab und Zusammenfassungen",
        text: "ghost run prüft vor PROCESS_START Docker, Identität, Richtlinie, Workspace und den zur Session gehörenden Zustand. Erfolgreiche Prüfungen laufen ohne Ausgabe; sicherheitsrelevante Sessions enden mit knappen Zusammenfassungen, die aus den gespeicherten Nachweisen abgeleitet sind.",
        link: "architecture",
      },
      {
        title: "Mit Angriffstests validiertes Release",
        text: "Das abschließende Audit behob Randfälle bei Freigaben, Abschottung, HTTP-Framing, dem Abschluss der Nachweise, der Wiederherstellung und schnellen OOM-Abbrüchen von Kindprozessen. GhostBench umfasst jetzt 25 benannte Szenarien; das Release-Gate verzeichnete 25 PASS, 0 FAIL und 0 SKIP.",
        link: "benchmarks",
      },
    ],
    sourceLink: "Grenzen der Implementierung nachlesen",
    architectureTitle:
      "Eine Laufzeitumgebung. Integrierter Sicherheitskontext.",
    architectureIntro:
      "Ghost führt Beobachtungen im Workspace, Richtlinienentscheidungen, Durchsetzung zur Laufzeit und Nachweise durch einen gemeinsamen Session-Lebenszyklus. Prompt-Befunde ergänzen den Kontext; Richtlinie und harte Laufzeitgrenzen bleiben maßgeblich. Aus gespeicherten Ereignissen entstehen Herkunftsnachweise, Vorfälle und Zusammenfassungen.",
    layers: [
      [
        "Isolation",
        "In kurzlebigen Docker-Sessions sind der gewählte Workspace und ein synthetisches Home-Verzeichnis sichtbar, nicht aber das echte Home-Verzeichnis, der Docker-Socket oder die Ghost-Datenbank.",
      ],
      [
        "Prompt- und Vertrauenskontext",
        "Ein begrenzter Guard prüft vor dem Start unterstützte Anweisungsquellen und speichert inhaltlich minimierte Befunde sowie deterministischen Vertrauenskontext. Er ist eine Signalebene, keine Instanz für Autorisierung.",
      ],
      [
        "Richtlinien",
        "Eine strikte Validierung von ghost.yaml sorgt für deterministische ALLOW-, DENY- und SHADOW-Entscheidungen sowie bewusst eng gefasste ASK-Entscheidungen. Abschottung und hart verbotene Ziele haben Vorrang vor Freigaben.",
      ],
      [
        "Täuschung",
        "Frisch erzeugte synthetische AWS-, SSH- und .env-Ressourcen bieten beobachtbare Alternativen, ohne echte Zugangsdaten zu lesen oder Werte daraus abzuleiten.",
      ],
      [
        "Netzwerk und Abschottung",
        "Ausgehender HTTP/HTTPS-Verkehr mit exaktem Hostnamenabgleich läuft über ein Gateway pro Session. Es validiert die aufgelöste Adresse und prüft vor der Autorisierung erneut den aktuellen Stand der Abschottung.",
      ],
      [
        "Laufzeitschutz",
        "Verbindliche, per cgroup durchgesetzte Obergrenzen für Arbeitsspeicher, CPU und PIDs, ein begrenztes /tmp, schreibgeschützte Root-Dateisysteme und eine Frist pro Session beschränken den Agenten und seine untergeordneten Prozesse.",
      ],
      [
        "Nachweise",
        "SQLite speichert minimierte Session-Ereignisse und den Sicherheitszustand. Schlägt ein verpflichtender Nachweis fehl, blockiert Ghost (fail-closed), statt die Grenze unbemerkt aufzuweichen.",
      ],
      [
        "Herkunft / Vorfälle",
        "Die deterministische Rekonstruktion unterscheidet Beobachtungen, abgeleitete Beziehungen und zeitliche Abfolge – ohne Absichten des Modells oder Kausalität zu erfinden.",
      ],
      [
        "Menschliche Freigabe",
        "Bei ausdrücklich konfigurierten ASK-Zielen kann der Ablauf für eine eng gefasste Nutzerentscheidung anhalten; nicht interaktive, fehlerhafte oder abgelaufene Freigaben werden zu DENY.",
      ],
      [
        "GhostBench",
        "25 Szenarien im Release-Gate prüfen einzelne Eigenschaften sowie integrierte Ketten aus Prompt, SHADOW und Netzwerk, Freigabe, Timeout und Session-Isolation.",
      ],
    ],
    networkTitle: "Ein Hostname allein reicht nicht.",
    networkText:
      "HTTP ist auf Port 80 beschränkt, HTTPS CONNECT auf Port 443. Wer github.com erlaubt, erlaubt damit nicht automatisch api.github.com. Reine IP-Adressen, Wildcards, einteilige Namen und Namen für die lokale Nutzung wie host.docker.internal werden abgelehnt. Ausgehender IPv6-Verkehr zu Upstream-Servern wird nicht unterstützt und blockiert (fail-closed).",
    networkDetails: "Details zu Namensauflösung und Abschottung",
    networkDetailText:
      "Jede zurückgegebene IPv4-Adresse muss die Validierung bestehen. Geprüft wird unter anderem auf nicht spezifizierte Adressen und das aktuelle Netz sowie auf private, Loopback-, Shared-, Link-Local-, Protokollzuweisungs-, Benchmarking-, Multicast- und reservierte Bereiche. Leere, fehlerhafte oder fehlgeschlagene DNS-Antworten werden ebenso abgelehnt wie Antworten, die erlaubte und verbotene Adressen mischen. Weil die Verbindung über die validierte numerische Adresse läuft, entfällt eine zweite Auflösung des Hostnamens. Jede neue Anfrage wird erneut geprüft. Ghost behauptet nicht, jede DNS-Rebinding-Technik oder jede Weiterleitung über einen freigegebenen Server auszuschließen.",
    fenceDetail:
      "Der Token/Ack-Fence bringt Anfragen in eine feste Reihenfolge zu Köderereignissen, die inotify bereits eingereiht hat. Eine wirklich gleichzeitige Anfrage, deren Barriere zuerst einsortiert wird, kann trotzdem noch erlaubt werden. Der Fence ist kein atomarer Widerruf auf Paketebene und kann weder eine bereits laufende HTTP-Antwort noch einen aufgebauten CONNECT-Tunnel beenden. Die interne Docker-Bridge bleibt eine lokale Verbindung; Dienste, die bewusst an diese Bridge gebunden sind, gehören zu den erreichbaren Zielen.",
    networkConfig:
      "Optional: Nur den Abschnitt network in ghost.yaml ersetzen. Die Einstellung deny beibehalten, sofern kein begrenzter ausgehender Datenverkehr nötig ist.",
    installTitle: "Mit einem kontrollierten lokalen Lauf beginnen.",
    requirements:
      "Mit Laufzeittests geprüfte Zielplattform des Release: Linux amd64 mit Docker Engine, funktionierender lokaler Docker-CLI samt Daemon und einer numerischen Host-UID/GID ungleich null. Binärdateien für Linux arm64 werden per Cross-Compiling erstellt und über Prüfsummen verifiziert. Für den Build aus dem Quellcode sind Git und Go 1.26.8 oder ein neueres unterstütztes Patch-Release nötig. Docker Desktop unter macOS ist für das Release nicht qualifiziert; die native Ausführung unter Windows wird nicht unterstützt.",
    buildTitle: "1. Veröffentlichten Quellcode bauen",
    buildNote:
      "Der Tag wählt das veröffentlichte v0.3.0 statt des sich ständig ändernden Branches main. PATH wird für dieses Terminal gesetzt, damit die folgenden Befehle die soeben gebaute Binärdatei verwenden. Die geprüfte Revision des Release ist unten verlinkt.",
    binaryNote:
      "Unter Linux geht es auch ohne Go: Das Release enthält Binärdateien für amd64 und arm64. Die heruntergeladene Binärdatei vor der Ausführung mit SHA256SUMS abgleichen.",
    startTitle: "2. Ein frisches Demo-Projekt anlegen",
    startNote:
      "Diese Befehle legen auf derselben Ebene das Verzeichnis ghost-demo an. ghost init erzeugt ghost.yaml, .ghost/ghost.db und .ghost/sessions/, ohne eine vorhandene Konfiguration zu überschreiben. .ghost/ gehört nicht in Git. Für ein echtes Projekt wird init stattdessen im Verzeichnis dieses Projekts ausgeführt.",
    exampleTitle: "3. Auf einen Köder zugreifen und Nachweise prüfen",
    exampleNote:
      "Im Demo-Verzeichnis ausführen. Der Befehl cat liefert synthetische Inhalte. inspect zeigt die Zeitleiste der Session; graph und incidents rekonstruieren belegte Zusammenhänge. Beide akzeptieren auch --json. Das Trennzeichen -- ist für run erforderlich.",
    practicalLimit:
      "Das fest vorgegebene Alpine-Image von Ghost ist bewusst minimal: Auf dem Host installierte Python-, Node- oder Agentenpakete sind darin nicht automatisch vorhanden. Fehlende Befehle schlagen fehl und werden nie ersatzweise auf dem Host ausgeführt. Der eingebundene Workspace ist für den Agenten bewusst sichtbar, und angehängte Programmausgabe wird nicht bereinigt. Secrets gehören deshalb nur dann dorthin, wenn der Agent darauf zugreifen soll.",
    benchTitle: "25 Szenarien. Integrierte Sicherheitsketten.",
    benchText:
      "GhostBench ist eine reproduzierbare Testsuite für Sicherheitseigenschaften, kein Sicherheits-Score. Im Release-Gate von v0.3.0 liefen alle 25 verpflichtenden Szenarien unter Linux amd64 mit Docker erfolgreich durch – einschließlich integrierter Ketten aus Prompt, SHADOW und Netzwerk, aus Freigabe und Abschottung, mit Laufzeit-Timeout und über Session-Grenzen hinweg.",
    benchLabel: "Dokumentiertes Ergebnis für v0.3.0 · 21. September 2026",
    benchResult: "PASS: 25 · FAIL: 0 · SKIP: 0",
    benchExamples:
      "v0.3 deckt unter anderem ab: feindselige Prompt-Signale mit SHADOW-Zugriff und anschließender Netzwerksperre, Kontrolle von Fehlalarmen bei defensiver Dokumentation, fail-closed-Verhalten von ASK ohne Interaktion, Isolation einmaliger und gleichzeitiger Freigaben, Vorrang der Abschottung vor zwischengespeicherten Freigaben, Aufräumen nach einem Laufzeit-Timeout sowie integrierte Isolation zwischen Sessions.",
    benchNote:
      "--require-all endet sowohl bei FAIL als auch bei SKIP mit einem Fehlerstatus. Ohne Docker werden Docker-abhängige Fälle als SKIP gewertet, nicht als PASS. Die Demo dynamic-containment nutzt einen harmlosen lokalen HTTP-Testdienst in Docker; sie sendet keine Zugangsdaten an externe Dienste.",
    allScenarios: "Alle 25 Szenario-IDs",
    gate: "CI-Nachweis zum Release",
    methodology: "GhostBench-Methodik",
    limitsTitle: "Was Ghost nicht garantiert.",
    limits: [
      [
        "Docker bleibt Teil der Vertrauensbasis",
        "Docker, sein Daemon, die OCI-Runtime, das fest vorgegebene Image und der Host-Kernel bleiben Teil der Trusted Computing Base. Ghost garantiert keinen Schutz vor jedem Container-Ausbruch und jeder Kernel-Schwachstelle.",
      ],
      [
        "Prompt-Befunde sind heuristisch",
        "Der integrierte Guard kann Angriffe übersehen oder harmlose Texte markieren. Er versteht keine Absichten eines Modells und gewährt nie Zugriff, indem er Inhalte für sicher erklärt.",
      ],
      [
        "Belege zeigen keine Kausalität",
        "Der Herkunftsnachweis unterscheidet beobachtete Ereignisse, abgeleitete Exposition und zeitliche FOLLOWED_BY-Beziehungen. Ghost beweist weder, dass verdächtige Inhalte späteres Verhalten verursacht haben, noch dass Daten abgeflossen sind.",
      ],
      [
        "Netzwerk- und Ressourcenkontrollen sind bewusst begrenzt",
        "Ghost untersucht keine TLS-Inhalte, leitet kein allgemeines TCP/UDP über einen Proxy, unterstützt keinen ausgehenden IPv6-Verkehr zu Upstream-Servern, setzt kein Byte-Kontingent für Workspace und Nachweisspeicher durch und bietet keine hostweite, übergreifende Zulassungskontrolle (Admission Control). Bestehende Verbindungen werden nicht rückwirkend widerrufen.",
      ],
      [
        "Grenzen bei Host und Ausgaben bleiben wichtig",
        "Im Lese-/Schreibmodus sind Änderungen am Workspace bewusst erlaubt, und angehängte Programmausgabe wird nicht bereinigt. Harte Ausfälle von Host oder Daemon können das Aufräumen oder das Erfassen von Nachweisen unterbrechen. 25 bestandene Szenarien belegen benannte Eigenschaften, keinen umfassenden Schutz vor Angriffen.",
      ],
    ],
    sourcesTitle: "Quellcode prüfen. Release ausprobieren.",
    sourcesText:
      "Dokumentation, Binärdateien, Prüfsummen und das Ergebnis der 25 Szenarien unten beziehen sich fest auf das veröffentlichte v0.3.0 und den auditierten Release-Commit. Ghost bleibt experimentell; die verlinkte Dokumentation zu Sicherheits- und Bedrohungsmodell legt die genauen Grenzen fest.",
    readme: "Dokumentation / README",
    security: "Sicherheitsmodell",
    moreSources: "Referenzen zu Architektur, Richtlinien und Nachweisen",
    sourceNames: [
      "Architektur",
      "Bedrohungsmodell",
      "Netzwerksicherheit",
      "Herkunftsnachweis",
      "Vorfälle",
      "Beispielkonfiguration",
      "Beispiele",
      "Changelog",
      "Sicherheitslücken vertraulich melden",
      "Mitwirken",
      "Apache-2.0-Lizenz",
      "Geprüfte Revision",
    ],
  },
} as const;
