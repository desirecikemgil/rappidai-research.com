export const deSecurityResearchTranslations: Readonly<Record<string, string>> =
  {
    "Security research": "Security-Forschung",
    "Agent security and verified code review":
      "Sicherheit von KI-Agenten und überprüfbare Codeanalyse",
    "Reviewed 28 October 2026": "Geprüft am 28. Oktober 2026",
    "Two complementary research directions: controlling an agent's access with Ghost, and investigating evidence-backed vulnerability review with Quantum Sentinel-Alpha.":
      "Zwei ergänzende Forschungsrichtungen: Ghost kontrolliert den Zugriff von KI-Agenten. Quantum Sentinel-Alpha untersucht, wie sich Schwachstellenanalysen mit überprüfbaren Belegen verbinden lassen.",
    "v0.3.0 · Released · Experimental":
      "v0.3.0 · Veröffentlicht · Experimentell",
    "What can a runtime enforce without trusting the model?":
      "Welche Grenzen kann eine Runtime unabhängig vom Modell durchsetzen?",
    "Ghost combines Docker isolation, synthetic SHADOW resources, exact-host HTTP/HTTPS policy, bounded prompt-injection signals, scoped ASK approvals and runtime resource limits. Enforcement is deterministic and independent of an LLM.":
      "Ghost verbindet Docker-Isolation, synthetische SHADOW-Ressourcen, HTTP/HTTPS-Regeln für einzelne Hosts, begrenzte Prompt-Injection-Signale, eng gefasste ASK-Freigaben und Ressourcenlimits. Die Durchsetzung ist deterministisch und unabhängig von einem LLM.",
    "The v0.3.0 CI gate recorded 25 passed, 0 failed and 0 skipped GhostBench scenarios. These are named security-property checks in a controlled environment, not an attack-detection accuracy score.":
      "Der CI-Lauf für v0.3.0 dokumentiert 25 bestandene, 0 fehlgeschlagene und 0 übersprungene GhostBench-Szenarien. Diese prüfen einzelne Sicherheitseigenschaften unter kontrollierten Bedingungen. Sie messen keine allgemeine Erkennungsrate für Angriffe.",
    "Prompt signals can be wrong. A decoy access does not prove intent, causal influence or exfiltration. Containment affects subsequent decisions and does not revoke established connections. Linux amd64 with Docker Engine is the runtime-tested target; arm64 binaries are cross-built, and macOS Docker Desktop is outside the release gate.":
      "Prompt-Signale können falsch sein. Ein Köderzugriff belegt weder Absicht noch kausalen Einfluss oder Datenabfluss. Die Abschottung betrifft spätere Entscheidungen; bestehende Verbindungen werden nicht widerrufen. Die Runtime wurde unter Linux amd64 mit Docker Engine geprüft. arm64-Binärdateien werden durch Cross-Compilation gebaut; macOS Docker Desktop ist nicht Teil der Release-Prüfung.",
    "Phase 0 · Foundation · No trained release":
      "Phase 0 · Grundlagen · Kein trainiertes Modell veröffentlicht",
    "Can a reviewer reject plausible but unsupported findings?":
      "Kann ein Modell plausible, aber unbelegte Befunde zurückweisen?",
    "The public repository contains a versioned finding contract, a default-deny source registry, a strict parser/scorer, a model runner and QuickEval v1: 86 synthetic cases, comprising 37 vulnerable, 34 hard-negative and 15 abstention cases. A further 16 Python tasks check coding regression.":
      "Das öffentliche Repository enthält ein versioniertes Befundschema, ein Quellenregister ohne automatische Trainingsfreigabe, einen strikten Parser und Scorer, einen Modellrunner sowie QuickEval v1: 86 synthetische Fälle, davon 37 mit Schwachstellen, 34 Hard Negatives und 15 für die Enthaltung. Weitere 16 Python-Aufgaben dienen der Prüfung auf Rückschritte beim Programmieren.",
    "The prepared comparison keeps cases, prompt, parser, scorer and generation settings shared between Qwen3.5-4B and Qwen3.5-9B. Neither candidate is frozen. The engine design separates repository context and static signals from model-generated candidates and subsequent verification; the full engine remains planned.":
      "Der vorbereitete Vergleich verwendet für Qwen3.5-4B und Qwen3.5-9B dieselben Fälle, denselben Prompt, Parser und Scorer sowie dieselben Generierungseinstellungen. Das Ausgangsmodell steht noch nicht fest. Der Engine-Entwurf trennt Repository-Kontext und statische Signale von den Befundvorschlägen des Modells und deren anschließender Prüfung. Die vollständige Engine ist weiterhin geplant.",
    "The status report records no model evaluation, adapter or training run, and no training-approved data source. Existing regex-baseline results validate the harness only. The public synthetic cases are not a private holdout; the holdout has not started. Patch evaluation is not implemented. Detection quality, false-positive rate, model latency and VRAM use are not established.":
      "Laut Statusbericht gibt es noch keine Modellevaluation, keinen Adapter, keinen Trainingslauf und keine für das Training freigegebene Datenquelle. Vorhandene Ergebnisse einer Regex-Baseline prüfen lediglich den Evaluationsablauf. Die synthetischen Fälle sind öffentlich; der Aufbau eines privaten Hold-outs hat noch nicht begonnen. Eine Patch-Evaluation ist nicht implementiert. Erkennungsqualität, Fehlalarmrate, Modelllatenz und VRAM-Verbrauch sind nicht belegt.",
    "A technical research note on hard negatives, vulnerable/fixed pairs, base rates, precision and recall. It reports published research and a proposed evaluation approach, with no new Sentinel performance claim.":
      "Eine technische Forschungsnotiz zu Hard Negatives, verwundbaren und korrigierten Codepaaren, Basisraten, Precision und Recall. Sie behandelt veröffentlichte Forschung und einen Evaluationsansatz, ohne neue Leistungsangaben zu Sentinel zu machen.",
    "Security research resources": "Materialien zur Security-Forschung",
    "Start with a released Ghost example or inspect Sentinel's evaluation infrastructure. Commands below are reference workflows from the pinned sources, not executions performed by this website.":
      "Ein Einstieg in Ghost anhand veröffentlichter Beispiele und in die Evaluationsinfrastruktur von Sentinel. Die folgenden Befehle stammen aus den fest verlinkten Quellen. Die Website führt sie nicht aus.",
    "Ghost: installation, policy and evidence":
      "Ghost: Installation, Regeln und Nachweise",
    "Use the v0.3.0 release assets and SHA256SUMS, or build the pinned source. Go 1.26.8 or a newer supported patch is required for a source build. Runtime examples require Docker and a non-root UID/GID; an agent executable must exist inside the runtime image.":
      "Für v0.3.0 stehen Release-Dateien und SHA256SUMS bereit. Alternativ lässt sich der fest verlinkte Quellstand mit Go 1.26.8 oder einer neueren unterstützten Patch-Version bauen. Die Runtime-Beispiele setzen Docker und eine UID/GID ohne Root-Rechte voraus. Der auszuführende Agent muss im Runtime-Image installiert sein.",
    "Sentinel: reproduce the engineering baseline":
      "Sentinel: technische Baseline reproduzieren",
    "From a checkout of the reviewed Sentinel revision, install its documented Python dependencies first. This CPU baseline tests the evaluation path; it does not load a model or demonstrate security capability. Paid GPU comparisons and training are separate work.":
      "Zunächst die geprüfte Sentinel-Revision auschecken und die dokumentierten Python-Abhängigkeiten installieren. Die CPU-Baseline prüft den Evaluationsablauf. Sie lädt kein Modell und belegt keine Security-Fähigkeiten. Kostenpflichtige GPU-Vergleiche und Training sind separate Arbeitsschritte.",
    "Ghost releases and Sentinel evaluation infrastructure.":
      "Ghost-Releases und Evaluationsinfrastruktur von Sentinel.",
    "Ghost examples and Sentinel evaluation workflows.":
      "Ghost-Beispiele und Evaluationsabläufe von Sentinel.",
    "Repository status": "Repository-Status",
    "Finding contract": "Befundschema",
    "Comparison protocol": "Vergleichsprotokoll",
    "Data governance": "Datenregeln",
    "Observed CI run": "Dokumentierter CI-Lauf",
    "GhostBench methodology": "GhostBench-Methodik",
    "Explore Sentinel-Alpha": "Sentinel-Alpha ansehen",
    "Explore Ghost": "Ghost ansehen",
    "Release and checksums": "Release und Prüfsummen",
    "Installation and quick start": "Installation und Einstieg",
    "Configuration example": "Konfigurationsbeispiel",
    "Example projects": "Beispielprojekte",
    "Threat model": "Bedrohungsmodell",
    "Repository and setup": "Repository und Einrichtung",
    "Reviewed source snapshot": "Geprüfter Quellstand",
    "QuickEval cases": "QuickEval-Fälle",
    "Evaluation runner": "Evaluationsrunner",
    "Security model": "Sicherheitsmodell",
    "Research on agent security with Ghost, verified code review with Quantum Sentinel-Alpha, and the Quantum pilot and Echelon experiments. Published artifacts, implemented infrastructure and research goals are distinguished throughout.":
      "Forschung zur Sicherheit von KI-Agenten mit Ghost, zur überprüfbaren Codeanalyse mit Quantum Sentinel-Alpha sowie zu den Quantum-Pilotmodellen und Echelon. Veröffentlichte Artefakte, implementierte Infrastruktur und Forschungsziele werden klar unterschieden.",
    "Research notes, Ghost documentation and examples, Sentinel evaluation workflows, and the existing records on reproducibility, training data, licensing and responsible use.":
      "Forschungsnotizen, Ghost-Dokumentation und Beispiele, Sentinel-Evaluationsabläufe sowie die bestehenden Unterlagen zu Reproduzierbarkeit, Trainingsdaten, Lizenzen und verantwortungsvoller Nutzung.",
    "At the reviewed repository revision, Sentinel-Alpha is in Phase 0. Qwen3.5-4B and Qwen3.5-9B are candidates for a prepared comparison that has not been run. A finding schema, evaluation runner and 86 synthetic QuickEval cases exist. No candidate model has been evaluated or trained, and no Sentinel weights are released. Regex-baseline results test the evaluation infrastructure; they do not measure a model's false positive rate [18]. Table 3 separates implementation from research goals.":
      "Im geprüften Repository-Stand befindet sich Sentinel-Alpha in Phase 0. Qwen3.5-4B und Qwen3.5-9B sind Kandidaten für einen vorbereiteten, noch nicht durchgeführten Vergleich. Ein Befundschema, ein Evaluationsrunner und 86 synthetische QuickEval-Fälle sind vorhanden. Kein Kandidatenmodell wurde evaluiert oder trainiert; Sentinel-Gewichte sind nicht veröffentlicht. Die Regex-Baseline prüft die Evaluationsinfrastruktur und misst keine Fehlalarmrate eines Modells [18]. Tabelle 3 trennt implementierte Teile von Forschungszielen.",
    "Reviewed against the pinned public repository on 28 October 2026. Implemented evaluation infrastructure is distinct from an evaluated model or a complete repository-security engine [18].":
      "Geprüft anhand des fest verlinkten öffentlichen Repository-Stands am 28. Oktober 2026. Implementierte Evaluationsinfrastruktur ist von einem evaluierten Modell und einer vollständigen Engine zur Repository-Sicherheitsanalyse zu unterscheiden [18].",
    "Finding schema, strict parser/scorer and model runner":
      "Befundschema, strikter Parser und Scorer sowie Modellrunner",
    "Implemented infrastructure": "Implementierte Infrastruktur",
    "Public code and contracts; no model-quality result [18]":
      "Öffentlicher Code und Schnittstellenverträge; kein Ergebnis zur Modellqualität [18]",
    "QuickEval v1 and coding-regression cases":
      "QuickEval v1 und Fälle zur Prüfung auf Rückschritte beim Programmieren",
    "Public synthetic evaluation data":
      "Öffentliche synthetische Evaluationsdaten",
    "86 security cases and 16 Python tasks; private holdout not started [18]":
      "86 Security-Fälle und 16 Python-Aufgaben; privater Hold-out noch nicht begonnen [18]",
    "A protocol for testing false-positive rejection":
      "Ein Protokoll zur Prüfung der Fehlalarmunterdrückung",
    "A useful comparison begins with a declared unit of evaluation and a frozen contract. The current QuickEval unit is a labelled code case, not a complete repository scan. Keep the code revision, case hash, prompt, parser, scorer and generation settings fixed across candidates. Record the loaded model revision, runtime and per-case output. The prepared Sentinel comparison follows this approach, but has not produced model results [18].":
      "Ein sinnvoller Vergleich beginnt mit einer klaren Auswertungseinheit und einem festgelegten Prüfverfahren. QuickEval wertet derzeit gelabelte Codefälle aus, keine vollständigen Repository-Scans. Code-Revision, Fall-Hash, Prompt, Parser, Scorer und Generierungseinstellungen müssen zwischen den Kandidaten unverändert bleiben. Geladene Modellrevision, Laufzeitumgebung und Ausgaben pro Fall werden dokumentiert. Der vorbereitete Sentinel-Vergleich folgt diesem Ansatz, hat aber noch keine Modellergebnisse geliefert [18].",
    "For a binary finding decision, report TP, FP, TN and FN alongside precision and recall. A false positive rate uses safe cases as its denominator; the fraction of reported findings that are wrong is 1 minus precision. These quantities answer different questions. Report abstentions and invalid outputs separately, state how they affect each denominator and include the share of cases receiving a definite decision. Otherwise a system can appear precise simply by refusing difficult cases.":
      "Bei einer binären Befundentscheidung gehören TP, FP, TN und FN neben Precision und Recall in den Bericht. Die Fehlalarmrate bezieht sich auf sichere Fälle. Der Anteil falscher Meldungen an allen Meldungen ist dagegen 1 minus Precision. Beide Größen beantworten unterschiedliche Fragen. Enthaltungen und ungültige Ausgaben müssen separat ausgewiesen werden, ebenso ihre Behandlung in den Nennern und der Anteil der Fälle mit eindeutiger Entscheidung. Sonst kann ein System allein dadurch präzise wirken, dass es schwierige Fälle auslässt.",
    "Keep vulnerable and corrected neighbours together when evaluating pair accuracy. For data used in training, group related versions and duplicate families before splitting; reserve separate projects or later fixes for evaluation. Inspect label disagreements manually, record assumptions about attacker input and runtime context, and distinguish a correct decision from correct localization and CWE classification [3][9].":
      "Verwundbare und korrigierte Varianten werden für die Paarbewertung gemeinsam betrachtet. Bei Trainingsdaten sollten verwandte Versionen und Duplikatfamilien vor der Aufteilung gruppiert werden; separate Projekte oder spätere Korrekturen bleiben der Evaluation vorbehalten. Strittige Labels werden manuell geprüft und Annahmen zu Angreifereingaben und Laufzeitkontext dokumentiert. Eine richtige Entscheidung ist getrennt von richtiger Lokalisierung und CWE-Zuordnung zu bewerten [3][9].",
    "QuickEval is a small, public, project-authored synthetic suite, so it can diagnose pipeline failures and large differences but cannot establish deployment accuracy or an independent holdout result. The repository records no private holdout yet and leaves patch metrics unimplemented [18]. Before any release-quality claim, add rights-reviewed held-out cases, report uncertainty with an appropriate sampling unit, and evaluate patch security and functional regression separately. These are proposed requirements, not completed experiments.":
      "QuickEval ist eine kleine, öffentliche und vom Projekt selbst erstellte synthetische Testsuite. Sie kann Fehler im Ablauf und große Unterschiede sichtbar machen, belegt aber weder Genauigkeit im Einsatz noch ein unabhängiges Hold-out-Ergebnis. Laut Repository gibt es noch keinen privaten Hold-out; Patch-Metriken sind nicht implementiert [18]. Vor Aussagen zur Veröffentlichungsreife wären zurückgehaltene Fälle mit geprüften Nutzungsrechten nötig, außerdem Unsicherheitsangaben auf einer geeigneten Stichprobeneinheit sowie getrennte Prüfungen von Patch-Sicherheit und funktionalen Rückschritten. Das sind vorgeschlagene Anforderungen, keine abgeschlossenen Experimente.",
    "Quantum Sentinel-Alpha: repository status and evaluation contract":
      "Quantum Sentinel-Alpha: Repository-Status und Evaluationsvertrag",
    "Pinned source revision d7354b6, reviewed 28 October 2026":
      "Festgeschriebene Quellrevision d7354b6, geprüft am 28. Oktober 2026",
  };
