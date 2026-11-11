// Planning baseline: maintainer-supplied Masterplan v1.4, 6 November 2026.
// Checked against Sentinel main on 11 November 2026. No Engine implementation
// or public CLI was found. Garden and the model-training pipeline are separate.
export const sentinelEngineEvidence = {
  reviewed: "2026-11-11",
  revision: "47c312158e9a68352e9a59eb31e658d0c22bd7c1",
  status: "planned",
  source:
    "https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/docs/STATUS.md",
} as const;

export const sentinelEngineCopy = {
  en: {
    description: "Repository-level security analysis infrastructure.",
    introduction:
      "Designed to connect Quantum Sentinel’s specialized security reasoning with code inspection, relevant context, isolated supporting checks and structured developer reports.",
    status: "Planned",
    category: "AI-Powered Code Security",
    summary:
      "Repository-level security analysis infrastructure powered by Quantum Sentinel. Designed to inspect code, organize findings, run isolated checks and generate structured security reports.",
    modelLink: "Explore Quantum Sentinel-Alpha",
    workflowLink: "See the proposed workflow",
    overview: "Overview",
    workflow: "How it works",
    capabilities: "Capabilities",
    architecture: "Architecture",
    developer: "Developer workflow",
    roadmap: "Development roadmap",
    onPage: "On this page",
    purposeTitle: "The infrastructure around the model",
    purpose:
      "Quantum Sentinel-Alpha is the security model. Sentinel Engine is the planned application and orchestration layer that would make its analysis useful across a software repository. It would prepare source context, coordinate inference and organize results for developer review.",
    distinction:
      "Sentinel Engine is software infrastructure, not a language model or a training pipeline. Sentinel Garden prepares model-training data; the Engine is intended to analyze a developer’s repository.",
    independence:
      "Ghost controls agent execution. Replay records and compares runs. Sentinel Engine focuses on code-security analysis. These are independent products; Ghost is optional and no integration between the tools is claimed.",
    stageLabel: "Development status",
    statusText:
      "The Engine is a later product milestone, after model quality and local model availability. No public Engine release, installable CLI or completed repository-scanning workflow is available in the reviewed source.",
    statusDate: "Source reviewed 11 November 2026",
    planning: "Proposed workflow",
    flowTitle: "From source context to reviewable findings",
    flowNote:
      "This diagram describes the intended workflow. Supporting checks depend on what is implemented and available; a model claim is not automatically a confirmed vulnerability.",
    phases: [
      {
        title: "Prepare the source",
        start: 1,
        steps: [
          {
            title: "Repository input",
            text: "A software repository provides the source to review.",
          },
          {
            title: "Repository inspection",
            text: "Discover relevant files and prepare code for analysis.",
          },
          {
            title: "Context selection",
            text: "Select code sections and the surrounding context needed to assess them.",
          },
        ],
      },
      {
        title: "Analyze the code",
        start: 4,
        steps: [
          {
            title: "Quantum Sentinel analysis",
            text: "Ask the security model to assess the selected code and identify uncertainty.",
          },
          {
            title: "Isolated supporting checks",
            text: "Run eligible external checks in isolation where implemented; retain their results separately.",
          },
        ],
      },
      {
        title: "Prepare the report",
        start: 6,
        steps: [
          {
            title: "Structured security findings",
            text: "Associate candidate findings with locations, classifications, explanations and available evidence.",
          },
          {
            title: "JSON / SARIF output",
            text: "Produce machine-readable reports for developer review and potential future CI workflows.",
          },
        ],
      },
    ],
    capabilitiesTitle: "Planned capabilities",
    features: [
      {
        title: "Repository-aware analysis",
        text: "Discover source files and prepare repository context rather than treating every snippet as an isolated input.",
      },
      {
        title: "Intelligent context selection",
        text: "Bring relevant code sections into the analysis while making missing context explicit.",
      },
      {
        title: "Model-orchestrated security reasoning",
        text: "Coordinate analysis with Quantum Sentinel-Alpha and handle the model’s responses within the review workflow.",
      },
      {
        title: "Structured vulnerability findings",
        text: "Keep a finding’s location, CWE where applicable, explanation, evidence and uncertainty together.",
      },
      {
        title: "Isolated security checks",
        text: "Coordinate supporting checks in appropriate isolation where available, without treating execution as proof of security.",
      },
      {
        title: "Developer-ready reporting",
        text: "Plan for JSON and SARIF reports that developers can inspect and potentially connect to future CI integrations.",
      },
    ],
    architectureTitle: "Five responsibilities in the proposed system",
    architectureNote:
      "A conceptual decomposition of the planned functions, not a list of implemented modules or a finalized software interface.",
    layers: [
      {
        title: "Repository layer",
        text: "Ingest and prepare source-code context.",
        output: "Source files",
      },
      {
        title: "Context layer",
        text: "Select the relevant sections for model inference.",
        output: "Review context",
      },
      {
        title: "Inference layer",
        text: "Connect the workflow to Quantum Sentinel-Alpha.",
        output: "Candidate findings",
      },
      {
        title: "Verification layer",
        text: "Coordinate eligible supporting checks in isolated environments.",
        output: "Check evidence",
      },
      {
        title: "Reporting layer",
        text: "Structure findings and produce machine-readable output.",
        output: "JSON / SARIF",
      },
    ],
    workflowTitle: "A small CLI, with findings that can be inspected",
    workflowText:
      "The first Engine milestone is intended to be a minimal CLI and repository-analysis workflow. A developer would select a repository, run an analysis and review the findings alongside their supporting evidence and verification status.",
    commandLabel: "Conceptual CLI example",
    commandNote:
      "Illustrative command only. This is not a verified public CLI specification or an installation instruction.",
    findingLabel: "Fictional finding example",
    findingNote:
      "Invented code location and evidence to illustrate a possible finding. Not actual Engine output, a measured result or a confirmed vulnerability.",
    finding: [
      { label: "File location", value: "example-app/routes/search.py" },
      { label: "Line range", value: "42–46" },
      { label: "Classification", value: "CWE-89 · SQL injection" },
      {
        label: "Description",
        value: "Request input may be interpolated into a database query.",
      },
      {
        label: "Supporting evidence",
        value:
          'In this invented example, request.args["q"] reaches a query string passed to execute().',
      },
      {
        label: "Uncertainty",
        value:
          "Database-wrapper behavior and the complete call path have not been inspected.",
      },
      {
        label: "Verification status",
        value: "Unverified candidate; no supporting check has run.",
      },
    ],
    modelTitle: "Powered by Quantum Sentinel-Alpha",
    modelText:
      "Quantum Sentinel provides the model-level security reasoning. The Engine is designed to supply the surrounding workflow. The selected model foundation is Qwen3.5-9B, with specialized QLoRA adapter training planned; the Engine does not train its own foundation model.",
    modelPriorities:
      "Current model priorities are vulnerability detection, localization and calibrated uncertainty, including abstaining when evidence is insufficient. Patch capabilities are a later priority. Model-quality improvements have not yet been demonstrated through completed comparative benchmarks.",
    roadmapTitle: "Model validation comes before the Engine",
    roadmapText:
      "Development sequence from Masterplan v1.4, dated 6 November 2026. No release dates are announced.",
    milestones: [
      {
        title: "Validate model quality",
        text: "Prioritize data quality and approvals, train Quantum Sentinel-Alpha and compare it with the unchanged foundation under the same evaluation conditions.",
      },
      {
        title: "Make the model locally available",
        text: "Prepare usable local model artifacts, a Model Card and documented limitations once validation supports a release.",
      },
      {
        title: "Build the minimal Engine",
        text: "Develop a useful CLI and repository-analysis workflow around the validated model.",
      },
      {
        title: "Extend through real validation",
        text: "Improve integrations and developer usability based on observed results and feedback.",
      },
    ],
    sourceLink: "Reviewed Sentinel status",
    continueTitle: "Explore the Sentinel ecosystem",
    toolsLink: "All tools",
    researchLink: "Security research",
  },
  de: {
    description: "Infrastruktur für die Sicherheitsanalyse von Repositories.",
    introduction:
      "Sentinel Engine soll die spezialisierte Sicherheitsanalyse von Quantum Sentinel mit Codeprüfung, passendem Kontext, isolierten ergänzenden Checks und strukturierten Berichten verbinden.",
    status: "Geplant",
    category: "KI-gestützte Codesicherheit",
    summary:
      "Geplante Infrastruktur für die Sicherheitsanalyse von Repositories mit Quantum Sentinel: Code untersuchen, Befunde ordnen, isolierte Checks ausführen und strukturierte Sicherheitsberichte erstellen.",
    modelLink: "Zu Quantum Sentinel-Alpha",
    workflowLink: "Geplanten Ablauf ansehen",
    overview: "Überblick",
    workflow: "Ablauf",
    capabilities: "Funktionen",
    architecture: "Architektur",
    developer: "Nutzung",
    roadmap: "Entwicklungsplan",
    onPage: "Auf dieser Seite",
    purposeTitle: "Die Infrastruktur rund um das Modell",
    purpose:
      "Quantum Sentinel-Alpha ist das Sicherheitsmodell. Sentinel Engine ist die geplante Anwendungsschicht, die dessen Analyse für ein Software-Repository nutzbar machen soll. Sie soll Codekontext vorbereiten, die Inferenz koordinieren und Ergebnisse für die Prüfung durch Entwickler aufbereiten.",
    distinction:
      "Sentinel Engine ist Software-Infrastruktur, kein Sprachmodell und keine Trainingspipeline. Sentinel Garden bereitet Trainingsdaten für das Modell auf; die Engine soll Repositories von Entwicklern analysieren.",
    independence:
      "Ghost kontrolliert die Ausführung von Agenten. Replay zeichnet Läufe auf und vergleicht sie. Sentinel Engine konzentriert sich auf Codesicherheit. Die Produkte sind eigenständig; Ghost bleibt optional. Eine Integration der Werkzeuge wird nicht behauptet.",
    stageLabel: "Entwicklungsstand",
    statusText:
      "Die Engine ist ein späterer Produktmeilenstein, nach dem Nachweis der Modellqualität und der lokalen Verfügbarkeit des Modells. Im geprüften Quellstand gibt es keinen öffentlichen Engine-Release, keine installierbare CLI und keinen fertigen Ablauf für Repository-Scans.",
    statusDate: "Quellstand geprüft am 11. November 2026",
    planning: "Geplanter Ablauf",
    flowTitle: "Vom Codekontext zum prüfbaren Befund",
    flowNote:
      "Das Diagramm zeigt den vorgesehenen Ablauf. Ergänzende Checks hängen von ihrer Implementierung und Verfügbarkeit ab. Eine Aussage des Modells ist noch keine bestätigte Schwachstelle.",
    phases: [
      {
        title: "Code vorbereiten",
        start: 1,
        steps: [
          {
            title: "Repository einlesen",
            text: "Ein Software-Repository liefert den zu prüfenden Quellcode.",
          },
          {
            title: "Repository untersuchen",
            text: "Relevante Dateien finden und den Code für die Analyse aufbereiten.",
          },
          {
            title: "Kontext auswählen",
            text: "Codeabschnitte und den für ihre Bewertung nötigen Kontext zusammenstellen.",
          },
        ],
      },
      {
        title: "Code analysieren",
        start: 4,
        steps: [
          {
            title: "Analyse mit Quantum Sentinel",
            text: "Das Sicherheitsmodell bewertet den ausgewählten Code und benennt Unsicherheiten.",
          },
          {
            title: "Isolierte ergänzende Checks",
            text: "Geeignete externe Checks isoliert ausführen, soweit implementiert; ihre Ergebnisse gesondert festhalten.",
          },
        ],
      },
      {
        title: "Bericht erstellen",
        start: 6,
        steps: [
          {
            title: "Strukturierte Sicherheitsbefunde",
            text: "Mögliche Befunde mit Fundstellen, Klassifikation, Erklärungen und verfügbaren Belegen verknüpfen.",
          },
          {
            title: "JSON-/SARIF-Ausgabe",
            text: "Maschinenlesbare Berichte für die Prüfung durch Entwickler und mögliche spätere CI-Abläufe erzeugen.",
          },
        ],
      },
    ],
    capabilitiesTitle: "Geplante Funktionen",
    features: [
      {
        title: "Analyse im Repository-Kontext",
        text: "Quelldateien entdecken und den Repository-Kontext aufbereiten, statt jeden Ausschnitt isoliert zu betrachten.",
      },
      {
        title: "Gezielte Kontextauswahl",
        text: "Relevante Codeabschnitte für die Analyse zusammenstellen und fehlenden Kontext ausdrücklich benennen.",
      },
      {
        title: "Modellgestützte Sicherheitsanalyse",
        text: "Analysen mit Quantum Sentinel-Alpha koordinieren und die Antworten des Modells in den Prüfablauf einordnen.",
      },
      {
        title: "Strukturierte Schwachstellenbefunde",
        text: "Fundstelle, gegebenenfalls CWE, Erklärung, Belege und Unsicherheit eines Befunds zusammenhalten.",
      },
      {
        title: "Isolierte Sicherheitsprüfungen",
        text: "Ergänzende Checks, soweit verfügbar, angemessen isoliert koordinieren. Ihre Ausführung ist kein Sicherheitsnachweis.",
      },
      {
        title: "Berichte für Entwickler",
        text: "JSON- und SARIF-Berichte vorsehen, die Entwickler prüfen und später möglicherweise in CI-Abläufe einbinden können.",
      },
    ],
    architectureTitle: "Fünf Aufgaben im vorgesehenen System",
    architectureNote:
      "Eine konzeptionelle Aufteilung der geplanten Funktionen. Sie beschreibt weder implementierte Module noch eine endgültig festgelegte Softwareschnittstelle.",
    layers: [
      {
        title: "Repository-Schicht",
        text: "Quellcodekontext einlesen und aufbereiten.",
        output: "Quelldateien",
      },
      {
        title: "Kontextschicht",
        text: "Relevante Abschnitte für die Modellinferenz auswählen.",
        output: "Prüfkontext",
      },
      {
        title: "Inferenzschicht",
        text: "Den Ablauf mit Quantum Sentinel-Alpha verbinden.",
        output: "Mögliche Befunde",
      },
      {
        title: "Verifikationsschicht",
        text: "Geeignete ergänzende Checks in isolierten Umgebungen koordinieren.",
        output: "Prüfbelege",
      },
      {
        title: "Berichtsschicht",
        text: "Befunde strukturieren und maschinenlesbar ausgeben.",
        output: "JSON / SARIF",
      },
    ],
    workflowTitle: "Eine kleine CLI mit nachvollziehbaren Befunden",
    workflowText:
      "Als erster Engine-Meilenstein sind eine minimale CLI und ein Ablauf zur Repository-Analyse vorgesehen. Entwickler würden ein Repository auswählen, eine Analyse starten und die Befunde zusammen mit Belegen und Prüfstatus durchsehen.",
    commandLabel: "Konzeptionelles CLI-Beispiel",
    commandNote:
      "Nur ein Beispielbefehl. Keine bestätigte öffentliche CLI-Spezifikation und keine Installationsanleitung.",
    findingLabel: "Fiktives Befundbeispiel",
    findingNote:
      "Codefundstelle und Belege sind erfunden und veranschaulichen einen möglichen Befund. Keine echte Engine-Ausgabe, kein Messergebnis und keine bestätigte Schwachstelle.",
    finding: [
      { label: "Datei", value: "example-app/routes/search.py" },
      { label: "Zeilenbereich", value: "42–46" },
      { label: "Klassifikation", value: "CWE-89 · SQL-Injection" },
      {
        label: "Beschreibung",
        value:
          "Eine Anfrageeingabe könnte direkt in eine Datenbankabfrage eingesetzt werden.",
      },
      {
        label: "Belege",
        value:
          'Im erfundenen Beispiel gelangt request.args["q"] in eine Abfragezeichenkette, die an execute() übergeben wird.',
      },
      {
        label: "Unsicherheit",
        value:
          "Das Verhalten des Datenbank-Wrappers und der vollständige Aufrufpfad wurden nicht geprüft.",
      },
      {
        label: "Prüfstatus",
        value:
          "Ungeprüfter möglicher Befund; kein ergänzender Check wurde ausgeführt.",
      },
    ],
    modelTitle: "Analyse durch Quantum Sentinel-Alpha",
    modelText:
      "Quantum Sentinel übernimmt die modellseitige Sicherheitsanalyse. Die Engine soll den Ablauf darum herum bereitstellen. Als Modellbasis ist Qwen3.5-9B ausgewählt; ein spezialisiertes QLoRA-Adaptertraining ist geplant. Die Engine trainiert kein eigenes Basismodell.",
    modelPriorities:
      "Derzeit stehen die Erkennung und Lokalisierung von Schwachstellen sowie angemessene Unsicherheit im Vordergrund. Bei unzureichenden Belegen soll das Modell auf eine Aussage verzichten. Patch-Funktionen folgen später. Verbesserungen der Modellqualität sind noch nicht durch abgeschlossene Vergleichsbenchmarks belegt.",
    roadmapTitle: "Die Modellvalidierung kommt vor der Engine",
    roadmapText:
      "Entwicklungsfolge aus Masterplan v1.4 vom 6. November 2026. Veröffentlichungstermine sind nicht angekündigt.",
    milestones: [
      {
        title: "Modellqualität nachweisen",
        text: "Datenqualität und Freigaben priorisieren, Quantum Sentinel-Alpha trainieren und unter gleichen Bedingungen mit dem unveränderten Basismodell vergleichen.",
      },
      {
        title: "Modell lokal bereitstellen",
        text: "Nutzbare lokale Modellartefakte, eine Model Card und dokumentierte Grenzen vorbereiten, sobald die Validierung eine Veröffentlichung trägt.",
      },
      {
        title: "Minimale Engine entwickeln",
        text: "Eine nützliche CLI und einen Ablauf zur Repository-Analyse rund um das validierte Modell aufbauen.",
      },
      {
        title: "Anhand echter Prüfungen erweitern",
        text: "Integrationen und Nutzbarkeit für Entwickler anhand beobachteter Ergebnisse und Rückmeldungen verbessern.",
      },
    ],
    sourceLink: "Geprüfter Sentinel-Status",
    continueTitle: "Das Sentinel-Umfeld erkunden",
    toolsLink: "Alle Werkzeuge",
    researchLink: "Sicherheitsforschung",
  },
} as const;
