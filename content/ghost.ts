// Release facts verified against the annotated v0.2.0 tag and its release job.
// Keep product copy, commands and evidence tied to this snapshot, not moving main.
export const ghostRelease = {
  version: "v0.2.0",
  date: "2026-09-06",
  commit: "001d0baa953301f9fc94443e0e45b28d9f93fac0",
  repository: "https://github.com/rappidAI-Research/rappid-ghost",
  gate: "https://github.com/rappidAI-Research/rappid-ghost/actions/runs/34052802282",
  bench: { passed: 15, failed: 0, skipped: 0 },
} as const;

const source = `${ghostRelease.repository}/blob/${ghostRelease.commit}`;
export const ghostLinks = {
  repository: ghostRelease.repository,
  release: `${ghostRelease.repository}/releases/tag/${ghostRelease.version}`,
  readme: `${source}/README.md`,
  changelog: `${source}/CHANGELOG.md`,
  architecture: `${source}/docs/architecture.md`,
  security: `${source}/docs/security-model.md`,
  threat: `${source}/docs/threat-model.md`,
  network: `${source}/docs/network-security.md`,
  benchmarks: `${source}/docs/benchmarks.md`,
  provenance: `${source}/docs/provenance.md`,
  incidents: `${source}/docs/incidents.md`,
  configuration: `${source}/ghost.example.yaml`,
  examples: `${ghostRelease.repository}/tree/${ghostRelease.commit}/examples`,
  reporting: `${source}/SECURITY.md`,
  contributing: `${source}/CONTRIBUTING.md`,
  license: `${source}/LICENSE`,
  revision: `${ghostRelease.repository}/tree/${ghostRelease.commit}`,
  gate: ghostRelease.gate,
  amd64: `${ghostRelease.repository}/releases/download/${ghostRelease.version}/ghost_0.2.0_linux_amd64`,
  arm64: `${ghostRelease.repository}/releases/download/${ghostRelease.version}/ghost_0.2.0_linux_arm64`,
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
] as const;

export const ghostCommands = {
  install: `git clone --branch v0.2.0 --depth 1 https://github.com/rappidAI-Research/rappid-ghost.git
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
    - api.github.com`,
} as const;

export const ghostCopy = {
  en: {
    intro: {
      eyebrow: "GHOST v0.2.0 · SECURITY HARDENING",
      title: "rappidAI Ghost. Set the boundaries.",
      description:
        "A deception-aware security runtime for autonomous AI agents. Run commands in an isolated environment, set deterministic access rules and inspect evidence when a process touches a synthetic decoy.",
    },
    index: "Explore Ghost",
    nav: ["Overview", "What changed", "Get started", "GhostBench"],
    status: "Released · Experimental · Apache-2.0",
    github: "View on GitHub",
    release: "v0.2.0 Release",
    getStarted: "Get started",
    overviewTitle: "Useful access. Deliberate limits.",
    overview:
      "An agent that can execute commands can also try to read credentials or contact unexpected destinations. Ghost limits the environment exposed to commands launched through ghost run. Your project is available at /workspace; your real home is not mounted, and host environment variables are not forwarded.",
    purpose:
      "For agent developers, security engineers and researchers who need controlled experiments, reproducible boundary checks and an inspectable event trail—not unrestricted access to a development machine. Ghost adds policy, decoys, network decisions and evidence handling to Docker isolation; it does not replace Docker's security boundary.",
    policyTitle: "ALLOW. DENY. SHADOW.",
    policies: [
      {
        name: "ALLOW",
        description:
          "The permitted real resource is available—for example, the configured project workspace or an approved network destination.",
      },
      {
        name: "DENY",
        description:
          "Access is refused. A denied supported home resource remains absent; disabling deception never mounts the real home.",
      },
      {
        name: "SHADOW",
        description:
          "Ghost exposes a controlled synthetic resource instead of the corresponding real resource, which remains isolated.",
      },
    ],
    policyScope:
      "These are deterministic rules, not an AI classifier. Security enforcement never calls an LLM or a cloud control plane. SHADOW currently covers exactly three supported home paths, not arbitrary file access.",
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
    changesTitle: "v0.2.0 hardens the existing boundary.",
    changesIntro:
      "This is a security-hardening release: narrower destinations, tighter confinement, ordered containment and more reliable recovery—not a general firewall or a new attack detector.",
    changes: [
      {
        title: "Validated network destinations",
        text: "After an exact hostname match, the gateway performs one IPv4 lookup, validates every A record and connects to the selected validated numeric address. Any prohibited answer denies the whole request. Private, loopback and link-local ranges—including metadata address 169.254.169.254—are blocked as upstream destinations.",
        link: "network",
      },
      {
        title: "Stronger container confinement",
        text: "All Ghost-owned containers use non-zero numeric UID/GID, dropped capabilities, no-new-privileges and read-only roots. v0.2 adds explicit private IPC/cgroup namespaces, disabled core dumps and a bounded .ghost tmpfs mask, alongside isolated PID namespaces and process limits.",
        link: "security",
      },
      {
        title: "Positive environment allowlist",
        text: "Ghost supplies fixed HOME and PATH values and, for allowlist sessions, its own proxy variables. Arbitrary and unknown host variables are excluded by construction, not by guessing secret names. Secrets you deliberately place in the mounted workspace are still exposed.",
        link: "security",
      },
      {
        title: "Token/ack containment fence",
        text: "A session-private marker is published before access evidence. Each candidate gateway allow waits for a matching token acknowledgement through the sentinel's ordered inotify queue, then rechecks the marker. A missing or timed-out acknowledgement denies the request.",
        link: "network",
      },
      {
        title: "Session locking and recovery",
        text: "Runs are serialized per project. On the next run, interrupted sessions are finalized as failed; only Ghost-owned Docker resources with matching durable session identity, component labels and exact expected names are removed. Ambiguous ownership or cleanup failure aborts the new run.",
        link: "security",
      },
      {
        title: "Pinned supply chain, broader checks",
        text: "Alpine 3.22.5 is now pinned by an immutable image-index digest. Actions use full commit SHAs; CI verifies Go modules and the release source. Linux binaries include SHA256SUMS. GhostBench adds five scenarios for a total of fifteen. Checksums are not signatures or a guarantee of upstream integrity.",
        link: "changelog",
      },
    ],
    sourceLink: "Read the implementation boundary",
    architectureTitle: "One runtime. Distinct security layers.",
    architectureIntro:
      "Policy configures the runtime. The sentinel observes decoys; the gateway enforces destination and containment decisions. Stored evidence feeds read-only analysis. GhostBench exercises these production paths, rather than a second enforcement implementation.",
    layers: [
      [
        "Isolation",
        "Ephemeral Docker sessions expose the selected workspace and a read-only synthetic home, not the real home, Docker socket or Ghost database.",
      ],
      [
        "Policy",
        "Strict ghost.yaml validation applies deterministic ALLOW, DENY and SHADOW outcomes. Invalid setup never falls back to host execution.",
      ],
      [
        "Deception",
        "Fresh synthetic AWS, SSH and .env resources provide observable alternatives without using real credentials.",
      ],
      [
        "Network control",
        "Deny by default. Optional exact-hostname HTTP/HTTPS gateway on an internal agent network, with resolved-address validation.",
      ],
      [
        "Containment",
        "The sentinel marker and token/ack fence order new gateway decisions against queued decoy-access events within the session.",
      ],
      [
        "Evidence",
        "SQLite retains session state and supported events. Network decisions omit headers, bodies, query strings and tunnel contents.",
      ],
      [
        "Provenance / incidents",
        "Deterministic, secret-minimized text or JSON views reference stored event IDs. They explain observed order, not model intent or causation.",
      ],
      [
        "GhostBench",
        "Reproducible local fixtures test named security properties and report PASS, FAIL or honest environment-dependent SKIP results.",
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
      "Release-qualified target: Linux with Docker Engine, a working local Docker CLI/daemon and both host UID and GID non-zero. Source builds need Git and Go 1.26 or newer. Docker Desktop on macOS is not release-qualified; native Windows execution is unsupported.",
    buildTitle: "1. Build the released source",
    buildNote:
      "The tag selects v0.2.0 rather than moving main. PATH is set for this terminal so the ghost commands below resolve to the binary you just built. The reviewed source revision is linked below.",
    binaryNote:
      "Already have Linux? The release also provides amd64 and arm64 binaries, so Go is not required for that route. Verify the downloaded binary against SHA256SUMS before execution.",
    startTitle: "2. Initialize a clean demo project",
    startNote:
      "These commands create a sibling ghost-demo directory. ghost init creates ghost.yaml, .ghost/ghost.db and .ghost/sessions/ without overwriting an existing configuration. Keep .ghost/ out of Git. For a real project, run init in that project's directory instead.",
    exampleTitle: "3. Access a decoy and inspect the evidence",
    exampleNote:
      "Run this in the demo directory. The cat command returns synthetic content. inspect shows the session timeline; graph and incidents reconstruct supported relationships. Both also accept --json. The -- separator for run is required.",
    practicalLimit:
      "Ghost's pinned Alpine image is minimal: host-installed Python, Node or agent packages do not automatically exist inside it. Missing commands fail; there is no host fallback. Do not place real secrets in the demo workspace or command-line arguments—argv is persisted in local session storage.",
    benchTitle: "Fifteen scenarios. Explicit evidence.",
    benchText:
      "GhostBench is a reproducible security validation suite, not a security score. The v0.2.0 release job ran all fifteen scenarios successfully on Linux with Docker. This is the recorded release result, not a promise that every local environment or attack will pass.",
    benchLabel: "Recorded v0.2.0 release result · 6 September 2026",
    benchResult: "PASS: 15 · FAIL: 0 · SKIP: 0",
    benchExamples:
      "The added scenarios demonstrate rejection of an allowlisted name resolving to RFC1918 space, exclusion of an unknown host variable, guest-visible confinement, concurrent post-decoy containment and recovery of an interrupted contained session's exactly owned stale network.",
    benchNote:
      "--require-all exits unsuccessfully on either FAIL or SKIP. Without Docker, Docker-dependent cases are SKIP, not PASS. The dynamic-containment demo uses a harmless local Docker HTTP fixture; it does not send credentials to an external service.",
    allScenarios: "All fifteen scenario identifiers",
    gate: "Release CI evidence",
    methodology: "GhostBench methodology",
    limitsTitle: "What Ghost does not guarantee.",
    limits: [
      [
        "Docker is still trusted",
        "Docker, its daemon, the OCI runtime, pinned image, host kernel and invoking account remain the trusted computing base. Ghost does not guarantee protection against container escapes or every network attack. Separate user namespaces require rootless Docker or daemon-level userns-remap.",
      ],
      [
        "No intent or injection detector",
        "Ghost does not detect prompt injection, understand model intent, trace semantic data flow or prove exfiltration. DECOY_ACCESS is an observed file event; derived FOLLOWED_BY graph edges and incident sequences are not evidence of causation.",
      ],
      [
        "A deliberately narrow network boundary",
        "No TLS interception or request-content inspection, general TCP/UDP proxying, MCP interception or supported IPv6 upstream egress. CONNECT can carry non-TLS bytes. Approved endpoints can relay data; already-established traffic cannot be revoked by containment.",
      ],
      [
        "Only the exposed environment is controlled",
        "Read-write workspace mode intentionally permits file changes; use workspace.mode: read-only when appropriate. Workspace secrets and secrets in command arguments are not automatically removed. Commands outside Ghost are outside its control.",
      ],
      [
        "Recovery and supply-chain limits",
        "A hard crash can leave resources until the next successful project recovery; terminal-session cleanup failures are visible but not automatically retried by that path. There are no signed binaries, attestations or SBOM yet. Fifteen passing scenarios are not a universal security proof.",
      ],
    ],
    sourcesTitle: "Inspect the source. Try the release.",
    sourcesText:
      "Technical documentation below is pinned to the reviewed release commit. The v0.2.0 tag and current main matched this revision when checked. Ghost remains experimental; read the security model before relying on it.",
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
      eyebrow: "GHOST v0.2.0 · SICHERHEITSHÄRTUNG",
      title: "rappidAI Ghost. Setze die Grenzen.",
      description:
        "Eine deception-aware Security-Runtime für autonome KI-Agenten. Führe Befehle in einer isolierten Umgebung aus, lege deterministische Zugriffsregeln fest und prüfe die Nachweise, wenn ein Prozess auf einen synthetischen Köder zugreift.",
    },
    index: "Ghost entdecken",
    nav: ["Überblick", "Neu in v0.2.0", "Einstieg", "GhostBench"],
    status: "Veröffentlicht · Experimentell · Apache-2.0",
    github: "Auf GitHub ansehen",
    release: "v0.2.0 Release",
    getStarted: "Loslegen",
    overviewTitle: "Nützlicher Zugriff. Bewusste Grenzen.",
    overview:
      "Ein Agent, der Befehle ausführen kann, kann auch versuchen, Zugangsdaten zu lesen oder unerwartete Netzwerkziele zu kontaktieren. Ghost begrenzt die Umgebung für Befehle, die über ghost run gestartet werden. Dein Projekt ist unter /workspace verfügbar; dein echtes Home-Verzeichnis wird nicht eingebunden und Host-Umgebungsvariablen werden nicht weitergereicht.",
    purpose:
      "Für Agenten-Entwickler, Security Engineers und Forschende, die kontrollierte Experimente, reproduzierbare Grenzprüfungen und nachvollziehbare Ereignisse brauchen – statt unbeschränkten Zugriff auf den Entwicklungsrechner. Ghost ergänzt Docker-Isolation um Regeln, Köder, Netzwerkentscheidungen und Nachweise. Es ersetzt Dockers Sicherheitsgrenze nicht.",
    policyTitle: "ALLOW. DENY. SHADOW.",
    policies: [
      {
        name: "ALLOW",
        description:
          "Die erlaubte reale Ressource ist verfügbar – etwa der konfigurierte Projekt-Workspace oder ein freigegebenes Netzwerkziel.",
      },
      {
        name: "DENY",
        description:
          "Der Zugriff wird verweigert. Eine gesperrte unterstützte Home-Ressource bleibt abwesend; deaktivierte Deception bindet niemals das echte Home ein.",
      },
      {
        name: "SHADOW",
        description:
          "Ghost stellt eine kontrollierte synthetische Ressource statt der entsprechenden echten Ressource bereit. Die echte Ressource bleibt isoliert.",
      },
    ],
    policyScope:
      "Das sind deterministische Regeln, kein KI-Klassifikator. Die Sicherheitsdurchsetzung verwendet weder ein LLM noch eine Cloud-Control-Plane. SHADOW umfasst aktuell genau drei unterstützte Home-Pfade, nicht beliebige Dateizugriffe.",
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
    changesTitle: "v0.2.0 härtet die bestehende Grenze.",
    changesIntro:
      "Dieser Release verbessert die Sicherheit: enger begrenzte Ziele, stärkere Isolation, geordnetes Containment und zuverlässigere Wiederherstellung. Ghost wird dadurch weder zu einer allgemeinen Firewall noch zu einem Angriffserkenner.",
    changes: [
      {
        title: "Validierte Netzwerkziele",
        text: "Nach dem exakten Hostnamen-Abgleich führt das Gateway eine IPv4-Auflösung aus, prüft jeden A-Record und verbindet sich mit der ausgewählten validierten numerischen Adresse. Schon eine verbotene Antwort sperrt die gesamte Anfrage. Private, Loopback- und Link-Local-Bereiche einschließlich der Metadatenadresse 169.254.169.254 sind als Upstream-Ziele blockiert.",
        link: "network",
      },
      {
        title: "Stärkere Container-Isolation",
        text: "Alle Ghost-Container verwenden numerische UID/GID ungleich null, entfernte Capabilities, no-new-privileges und schreibgeschützte Root-Dateisysteme. v0.2 ergänzt explizit private IPC-/cgroup-Namespaces, deaktivierte Core-Dumps und eine begrenzte .ghost-tmpfs-Maske; isolierte PID-Namespaces und Prozesslimits bleiben erhalten.",
        link: "security",
      },
      {
        title: "Positive Umgebungs-Allowlist",
        text: "Ghost übergibt feste HOME- und PATH-Werte und im Allowlist-Modus seine eigenen Proxy-Variablen. Auch beliebige unbekannte Host-Variablen werden grundsätzlich nicht weitergereicht – statt nur bekannte Secret-Namen herauszufiltern. Secrets, die du bewusst im eingebundenen Workspace ablegst, bleiben zugänglich.",
        link: "security",
      },
      {
        title: "Token/Ack-Containment-Fence",
        text: "Ein session-privater Marker wird vor dem Zugriffsnachweis gesetzt. Jede mögliche Gateway-Freigabe wartet auf die passende Token-Bestätigung aus der geordneten inotify-Warteschlange des Sentinels und prüft den Marker erneut. Fehlende oder verspätete Bestätigung führt zu DENY.",
        link: "network",
      },
      {
        title: "Session-Sperre und Wiederherstellung",
        text: "Runs eines Projekts werden serialisiert. Beim nächsten Run werden unterbrochene Sessions als fehlgeschlagen abgeschlossen. Entfernt werden ausschließlich Ghost-eigene Docker-Ressourcen mit passender gespeicherter Session-Identität, Komponenten-Labels und exakten erwarteten Namen. Unklare Zuordnung oder fehlgeschlagene Bereinigung brechen den neuen Run ab.",
        link: "security",
      },
      {
        title: "Fixierte Lieferkette, breitere Tests",
        text: "Alpine 3.22.5 ist jetzt durch einen unveränderlichen Image-Index-Digest fixiert. Actions nutzen vollständige Commit-SHAs; CI prüft Go-Module und Release-Quelle. Linux-Binärdateien enthalten SHA256SUMS. Fünf neue GhostBench-Szenarien erhöhen den Umfang auf fünfzehn. Prüfsummen sind keine Signaturen und garantieren keine Integrität der vorgelagerten Quellen.",
        link: "changelog",
      },
    ],
    sourceLink: "Implementierte Grenze nachlesen",
    architectureTitle: "Eine Runtime. Getrennte Sicherheitsebenen.",
    architectureIntro:
      "Die Policy konfiguriert die Runtime. Der Sentinel beobachtet Köder, das Gateway setzt Ziel- und Containment-Entscheidungen durch. Gespeicherte Nachweise dienen anschließend der rein lesenden Analyse. GhostBench prüft diese produktiven Codepfade statt einer zweiten Sicherheitsimplementierung.",
    layers: [
      [
        "Isolation",
        "Kurzlebige Docker-Sessions stellen den gewählten Workspace und ein schreibgeschütztes synthetisches Home bereit, nicht das echte Home, den Docker-Socket oder die Ghost-Datenbank.",
      ],
      [
        "Policy",
        "Strikte ghost.yaml-Validierung setzt deterministische ALLOW-, DENY- und SHADOW-Regeln um. Ungültiger Aufbau führt nie zu ersatzweiser Host-Ausführung.",
      ],
      [
        "Deception",
        "Frische synthetische AWS-, SSH- und .env-Ressourcen liefern beobachtbare Alternativen ohne echte Zugangsdaten.",
      ],
      [
        "Netzwerkkontrolle",
        "Standardmäßig DENY. Optional ein HTTP/HTTPS-Gateway für exakte Hostnamen mit Adressprüfung und internem Agenten-Netz.",
      ],
      [
        "Containment",
        "Sentinel-Marker und Token/Ack-Fence ordnen neue Gateway-Entscheidungen gegenüber bereits eingereihten Köderereignissen derselben Session.",
      ],
      [
        "Nachweise",
        "SQLite speichert Session-Zustand und unterstützte Ereignisse. Netzwerkentscheidungen enthalten keine Header, Bodies, Query-Strings oder Tunnelinhalte.",
      ],
      [
        "Provenance / Incidents",
        "Deterministische, secret-minimierte Text- oder JSON-Ansichten verweisen auf gespeicherte Ereignis-IDs. Sie erklären beobachtete Reihenfolgen, nicht Modellabsichten oder Kausalität.",
      ],
      [
        "GhostBench",
        "Reproduzierbare lokale Testumgebungen prüfen benannte Sicherheitseigenschaften und melden PASS, FAIL oder ein ehrliches umgebungsabhängiges SKIP.",
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
      "Release-qualifiziertes Ziel: Linux mit Docker Engine, funktionierender lokaler Docker-CLI samt Daemon und Host-UID sowie -GID jeweils ungleich null. Der Quellcode-Build benötigt Git und Go 1.26 oder neuer. Docker Desktop auf macOS ist nicht release-qualifiziert; native Windows-Ausführung wird nicht unterstützt.",
    buildTitle: "1. Den veröffentlichten Quellcode bauen",
    buildNote:
      "Der Tag wählt v0.2.0 statt des veränderlichen main. PATH gilt für dieses Terminal, damit die folgenden ghost-Befehle die gerade gebaute Binärdatei finden. Die geprüfte Quellcode-Revision ist unten verlinkt.",
    binaryNote:
      "Der Release enthält auch Linux-Binärdateien für amd64 und arm64. Dafür ist kein Go nötig. Prüfe die heruntergeladene Datei vor der Ausführung gegen SHA256SUMS.",
    startTitle: "2. Ein sauberes Demo-Projekt initialisieren",
    startNote:
      "Diese Befehle erstellen das benachbarte Verzeichnis ghost-demo. ghost init erzeugt ghost.yaml, .ghost/ghost.db und .ghost/sessions/, ohne eine vorhandene Konfiguration zu überschreiben. .ghost/ gehört nicht in Git. Für ein echtes Projekt führst du init stattdessen in dessen Verzeichnis aus.",
    exampleTitle: "3. Auf einen Köder zugreifen und Nachweise prüfen",
    exampleNote:
      "Im Demo-Verzeichnis ausführen. cat liefert synthetischen Inhalt. inspect zeigt die Session-Timeline; graph und incidents rekonstruieren belegte Zusammenhänge. Beide unterstützen auch --json. Der Trenner -- ist für run erforderlich.",
    practicalLimit:
      "Ghosts fixiertes Alpine-Image ist minimal: Auf dem Host installierte Python-, Node- oder Agenten-Pakete sind darin nicht automatisch verfügbar. Fehlende Befehle schlagen fehl; es gibt keine ersatzweise Host-Ausführung. Lege keine echten Secrets im Demo-Workspace oder in Befehlsargumenten ab – argv wird im lokalen Session-Speicher festgehalten.",
    benchTitle: "Fünfzehn Szenarien. Konkrete Nachweise.",
    benchText:
      "GhostBench ist eine reproduzierbare Sicherheits-Testsuite, kein Security-Score. Der v0.2.0-Release-Job hat alle fünfzehn Szenarien unter Linux mit Docker erfolgreich ausgeführt. Das ist das protokollierte Release-Ergebnis, keine Zusage für jede lokale Umgebung oder jeden Angriff.",
    benchLabel: "Protokolliertes v0.2.0-Release-Ergebnis · 6. September 2026",
    benchResult: "PASS: 15 · FAIL: 0 · SKIP: 0",
    benchExamples:
      "Die neuen Szenarien zeigen die Sperre eines erlaubten Namens mit RFC1918-Zieladresse, den Ausschluss einer unbekannten Host-Variablen, im Gast sichtbare Container-Isolation, gleichzeitige Anfragen nach Köderzugriff sowie die Bereinigung des exakt zugeordneten alten Netzwerks einer unterbrochenen eingedämmten Session.",
    benchNote:
      "--require-all endet sowohl bei FAIL als auch bei SKIP mit einem Fehlerstatus. Ohne Docker sind Docker-abhängige Fälle SKIP, nicht PASS. Die dynamic-containment-Demo nutzt einen harmlosen lokalen Docker-HTTP-Testdienst; sie sendet keine Zugangsdaten an externe Dienste.",
    allScenarios: "Alle fünfzehn Szenario-IDs",
    gate: "Release-CI-Nachweis",
    methodology: "GhostBench-Methodik",
    limitsTitle: "Was Ghost nicht garantiert.",
    limits: [
      [
        "Docker bleibt vertrauenswürdig vorausgesetzt",
        "Docker, Daemon, OCI-Runtime, fixiertes Image, Host-Kernel und ausführendes Konto bleiben die Trusted Computing Base. Ghost garantiert keinen Schutz vor Container-Escapes oder jedem Netzwerkangriff. Separate User-Namespaces erfordern Rootless Docker oder daemonweites userns-remap.",
      ],
      [
        "Keine Absichts- oder Injection-Erkennung",
        "Ghost erkennt keine Prompt Injection, versteht keine Modellabsicht, verfolgt keinen semantischen Datenfluss und beweist keine Exfiltration. DECOY_ACCESS ist ein beobachtetes Dateiereignis; abgeleitete FOLLOWED_BY-Kanten und Incident-Folgen belegen keine Kausalität.",
      ],
      [
        "Bewusst enge Netzwerkgrenze",
        "Keine TLS- oder Request-Inhaltsinspektion, kein allgemeines TCP/UDP-Proxying, keine MCP-Interception und kein unterstützter IPv6-Upstream. CONNECT kann Nicht-TLS-Daten transportieren. Erlaubte Server können Daten weiterleiten; bereits aufgebaute Verbindungen lassen sich durch Containment nicht widerrufen.",
      ],
      [
        "Kontrolle nur über die bereitgestellte Umgebung",
        "Read-write erlaubt bewusst Änderungen an Projektdateien; nutze gegebenenfalls workspace.mode: read-only. Workspace-Secrets und Secrets in Befehlsargumenten werden nicht automatisch entfernt. Befehle außerhalb von Ghost liegen außerhalb seiner Kontrolle.",
      ],
      [
        "Grenzen von Recovery und Lieferkette",
        "Nach einem harten Absturz können Ressourcen bis zur nächsten erfolgreichen Projekt-Wiederherstellung bleiben. Bereinigungsfehler bereits beendeter Sessions sind sichtbar, werden über diesen Pfad aber nicht automatisch erneut bearbeitet. Signierte Binärdateien, Attestierungen und SBOM fehlen bisher. Fünfzehn bestandene Szenarien sind kein universeller Sicherheitsbeweis.",
      ],
    ],
    sourcesTitle: "Quellcode prüfen. Release ausprobieren.",
    sourcesText:
      "Die technische Dokumentation unten ist an den geprüften Release-Commit gebunden. v0.2.0-Tag und aktueller main entsprachen bei der Prüfung dieser Revision. Ghost bleibt experimentell; lies das Sicherheitsmodell, bevor du dich darauf verlässt.",
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
