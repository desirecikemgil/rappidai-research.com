export const deComparisonTranslations: Readonly<Record<string, string>> = {
  "MODEL SYSTEM COMPARISON": "MODELLE IM VERGLEICH",
  "Three model stages, compared on the same evidence scale.":
    "Drei Modellstufen im Vergleich – mit demselben Maßstab für Belege.",
  "Architecture, tokenizer and data-pipeline differences are shown separately so released artifacts, published validation and configured Echelon targets cannot be mistaken for the same kind of evidence.":
    "Unterschiede bei Architektur, Tokenizer und Datenpipeline werden getrennt gezeigt. So entsteht nicht der Eindruck, veröffentlichte Artefakte, publizierte Validierungen und konfigurierte Echelon-Ziele seien Belege derselben Art.",
  "Data pipeline": "Datenpipeline",
  "ARCHITECTURE SCALE": "ARCHITEKTUR UND GRÖSSE",
  "From a 49.3M pilot to a configured 506.3M Echelon Base.":
    "Vom Pilotmodell mit 49,3 Mio. zur konfigurierten Echelon Base mit 506,3 Mio. Parametern.",
  "Parameter and context scale can be compared directly. Layer dimensions are shown only where a public source states them; the first pilot therefore keeps an explicit documentation gap.":
    "Parameterzahl und Kontextlänge lassen sich direkt vergleichen. Schichtdimensionen zeigen wir nur dort, wo eine öffentliche Quelle sie nennt; beim ersten Pilotmodell bleibt deshalb eine ausdrücklich markierte Dokumentationslücke.",
  "Released artifact": "Veröffentlichtes Artefakt",
  "49.3M released parameters": "49,3 Mio. Parameter, veröffentlicht",
  "Detailed layer dimensions are not stated in the pinned public manifest.":
    "Das fest verlinkte öffentliche Manifest nennt keine detaillierten Schichtdimensionen.",
  "The continued-pretraining release keeps the compact pilot architecture.":
    "Die Veröffentlichung nach fortgesetztem Pretraining behält die kompakte Pilotarchitektur bei.",
  "Configuration preflight only": "Nur Konfigurations-Preflight",
  "506.3M configured parameters": "506,3 Mio. konfigurierte Parameter",
  "Proposed Echelon Base configuration; no trained weights or measured capability.":
    "Vorgeschlagene Konfiguration für Echelon Base; keine trainierten Gewichte, keine gemessenen Fähigkeiten.",
  "Hatched architecture marks configuration, not a trained model. The Echelon parameter total is machine-checked by the committed preflight report.":
    "Schraffierte Architekturen kennzeichnen eine Konfiguration, kein trainiertes Modell. Die Parameterzahl von Echelon ist durch den im Repository hinterlegten Preflight-Bericht maschinell geprüft.",
  "quantum-1-pilot manifest": "Manifest von quantum-1-pilot",
  "Echelon architecture configuration": "Architekturkonfiguration von Echelon",
  "Echelon architecture preflight": "Architektur-Preflight von Echelon",
  "TOKENIZER GENERATIONS": "TOKENIZER-GENERATIONEN",
  "One frozen pilot tokenizer, then a new Echelon vocabulary.":
    "Erst ein eingefrorener Pilot-Tokenizer, dann ein neues Vokabular für Echelon.",
  "The two pilot stages share the quantum-1 tokenizer. Echelon introduces a separately configured SentencePiece BPE tokenizer with a larger vocabulary and published integrity checks.":
    "Beide Pilotstufen nutzen denselben quantum-1-Tokenizer. Mit Echelon kommt ein eigens konfigurierter SentencePiece-BPE-Tokenizer hinzu – mit größerem Vokabular und veröffentlichten Integritätsprüfungen.",
  "Released model tokenizer": "Tokenizer des veröffentlichten Modells",
  "quantum-1 tokenizer": "quantum-1-Tokenizer",
  "Baseline tokenizer": "Basis-Tokenizer",
  "Separate validation report not published":
    "Eigener Validierungsbericht nicht veröffentlicht",
  "Frozen during continued pretraining":
    "Beim fortgesetzten Pretraining eingefroren",
  "Same quantum-1 tokenizer": "Derselbe quantum-1-Tokenizer",
  "Architecture and tokenizer held constant":
    "Architektur und Tokenizer unverändert",
  "No separate tokenizer benchmark is claimed":
    "Kein eigener Tokenizer-Benchmark angegeben",
  "Published tokenizer artifact": "Veröffentlichtes Tokenizer-Artefakt",
  "New tokenizer; pilot assets are not reused":
    "Neuer Tokenizer; Pilot-Artefakte werden nicht weiterverwendet",
  "23 round-trip cases · 0 failures": "23 Round-Trip-Fälle · 0 Fehler",
  "German umlauts": "Deutsche Umlaute",
  Unicode: "Unicode",
  Code: "Code",
  JSON: "JSON",
  "Control tokens": "Steuer-Tokens",
  "The Echelon round-trip suite verifies tokenizer integrity. It is not a language-model benchmark and does not establish generation quality.":
    "Die Round-Trip-Suite von Echelon prüft die Integrität des Tokenizers. Sie ist kein Benchmark für Sprachmodelle und belegt nichts über die Qualität generierter Texte.",
  "Echelon tokenizer configuration": "Tokenizer-Konfiguration von Echelon",
  "Echelon tokenizer validation": "Tokenizer-Validierung von Echelon",
  "DATA PIPELINE SCALE": "DATENPIPELINE UND UMFANG",
  "Reported pilot scope versus an unstarted Echelon production target.":
    "Berichteter Pilotumfang im Vergleich zu einem Produktionsziel für Echelon, dessen Umsetzung noch nicht begonnen hat.",
  "The scale uses the 100M-token pilot report as a reference. The 1.6 stage reports 500M additional German tokens; Echelon targets 8B training tokens, but only smoke-test output exists.":
    "Als Referenz dient der Pilotbericht über 100 Mio. Tokens. Für die Stufe 1.6 werden 500 Mio. zusätzliche deutsche Tokens berichtet; Echelon zielt auf 8 Mrd. Trainings-Tokens, bisher gibt es jedoch nur Ausgaben aus dem Smoke-Test.",
  "Logarithmic corpus-scale comparison":
    "Logarithmischer Vergleich der Korpusgröße",
  "HF-reported scope": "Umfang laut Hugging Face",
  "≈100M reported training tokens": "≈100 Mio. Trainings-Tokens, berichtet",
  "Public base-model release; complete final run manifest not linked.":
    "Veröffentlichtes Basismodell; ein vollständiges Manifest des finalen Laufs ist nicht verlinkt.",
  "≈600M reported cumulative scope": "≈600 Mio. berichteter Gesamtumfang",
  "Approximately 100M base tokens plus 500M additional German tokens.":
    "Rund 100 Mio. Basis-Tokens plus 500 Mio. zusätzliche deutsche Tokens.",
  "Configured target": "Konfigurierter Zielwert",
  "8B configured training-token target":
    "Konfigurierter Zielwert: 8 Mrd. Trainings-Tokens",
  "Production run not started; final smoke produced 1,380,886 tokens.":
    "Produktionslauf nicht gestartet; der letzte Smoke-Test ergab 1.380.886 Tokens.",
  "Source stream": "Quelldatenstrom",
  "Language & quality filters": "Sprach- und Qualitätsfilter",
  "Exact and source-aware deduplication":
    "Exakte und quellenbezogene Deduplizierung",
  "Stable train / validation / test splits":
    "Stabile Aufteilung in Training, Validierung und Test",
  "Production corpus": "Produktionskorpus",
  "The Echelon configuration also targets 10M validation and 10M test tokens. None of these production totals are presented as achieved.":
    "Die Echelon-Konfiguration zielt außerdem auf je 10 Mio. Validierungs- und Test-Tokens. Keiner dieser Produktionswerte wird als erreicht dargestellt.",
  "quantum-1.6 training documentation": "Trainingsdokumentation zu quantum-1.6",
  "Echelon Garden configuration": "Konfiguration von Echelon Garden",
  "Echelon Garden Phase 3 report": "Echelon Garden: Bericht zu Phase 3",
  "Comparison view": "Vergleichsansicht",
  "Select comparison view": "Vergleichsansicht auswählen",
  Parameters: "Parameter",
  Context: "Kontext",
  "Detailed dimensions": "Dimensionen im Detail",
  "Not published in pinned evidence":
    "In den fest verlinkten Belegen nicht veröffentlicht",
  "hidden size": "Hidden Size",
  "attention heads": "Attention-Heads",
  "KV heads": "KV-Heads",
  Vocabulary: "Vokabular",
  "Validation scope": "Validierungsumfang",
  "Corpus scale": "Korpusgröße",
  "Reference scale": "Referenzmaßstab",
  "Primary sources": "Primärquellen",
  "Evidence boundary": "Grenzen des Belegten",
};
