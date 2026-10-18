export const deComparisonTranslations: Readonly<Record<string, string>> = {
  "MODEL SYSTEM COMPARISON": "MODELLSYSTEM-VERGLEICH",
  "Three model stages, compared on the same evidence scale.":
    "Drei Modellstufen auf derselben Evidenzskala verglichen.",
  "Architecture, tokenizer and data-pipeline differences are shown separately so released artifacts, published validation and configured Echelon targets cannot be mistaken for the same kind of evidence.":
    "Unterschiede bei Architektur, Tokenizer und Datenpipeline werden getrennt dargestellt, damit veröffentlichte Artefakte, publizierte Validierung und konfigurierte Echelon-Ziele nicht als dieselbe Art von Evidenz erscheinen.",
  "Data pipeline": "Datenpipeline",
  "ARCHITECTURE SCALE": "ARCHITEKTURSKALA",
  "From a 49.3M pilot to a configured 506.3M Echelon Base.":
    "Vom Pilotmodell mit 49,3 Mio. zu einer konfigurierten Echelon Base mit 506,3 Mio. Parametern.",
  "Parameter and context scale can be compared directly. Layer dimensions are shown only where a public source states them; the first pilot therefore keeps an explicit documentation gap.":
    "Parameter- und Kontextskalierung lassen sich direkt vergleichen. Schichtdimensionen werden nur dort gezeigt, wo eine öffentliche Quelle sie nennt; beim ersten Piloten bleibt daher eine ausdrückliche Dokumentationslücke.",
  "Released artifact": "Veröffentlichtes Artefakt",
  "49.3M released parameters": "49,3 Mio. veröffentlichte Parameter",
  "Detailed layer dimensions are not stated in the pinned public manifest.":
    "Detaillierte Schichtdimensionen werden im fixierten öffentlichen Manifest nicht genannt.",
  "The continued-pretraining release keeps the compact pilot architecture.":
    "Die Continued-Pretraining-Veröffentlichung behält die kompakte Pilotarchitektur bei.",
  "Configuration preflight only": "Nur Konfigurations-Preflight",
  "506.3M configured parameters": "506,3 Mio. konfigurierte Parameter",
  "Proposed Echelon Base configuration; no trained weights or measured capability.":
    "Vorgeschlagene Echelon-Base-Konfiguration; keine trainierten Gewichte und keine gemessene Leistungsfähigkeit.",
  "Hatched architecture marks configuration, not a trained model. The Echelon parameter total is machine-checked by the committed preflight report.":
    "Die schraffierte Architektur kennzeichnet eine Konfiguration, kein trainiertes Modell. Die Echelon-Parameterzahl wurde durch den eingecheckten Preflight-Bericht maschinell geprüft.",
  "quantum-1-pilot manifest": "Manifest von quantum-1-pilot",
  "Echelon architecture configuration": "Echelon-Architekturkonfiguration",
  "Echelon architecture preflight": "Echelon-Architektur-Preflight",
  "TOKENIZER GENERATIONS": "TOKENIZER-GENERATIONEN",
  "One frozen pilot tokenizer, then a new Echelon vocabulary.":
    "Ein eingefrorener Pilot-Tokenizer, danach ein neues Echelon-Vokabular.",
  "The two pilot stages share the quantum-1 tokenizer. Echelon introduces a separately configured SentencePiece BPE tokenizer with a larger vocabulary and published integrity checks.":
    "Die beiden Pilotstufen verwenden denselben quantum-1-Tokenizer. Echelon führt einen separat konfigurierten SentencePiece-BPE-Tokenizer mit größerem Vokabular und veröffentlichten Integritätsprüfungen ein.",
  "Released model tokenizer": "Tokenizer des veröffentlichten Modells",
  "quantum-1 tokenizer": "quantum-1-Tokenizer",
  "Baseline tokenizer": "Basis-Tokenizer",
  "Separate validation report not published":
    "Separater Validierungsbericht nicht veröffentlicht",
  "Frozen during continued pretraining":
    "Während des Continued Pretraining eingefroren",
  "Same quantum-1 tokenizer": "Derselbe quantum-1-Tokenizer",
  "Architecture and tokenizer held constant":
    "Architektur und Tokenizer konstant gehalten",
  "No separate tokenizer benchmark is claimed":
    "Es wird kein separater Tokenizer-Benchmark behauptet",
  "Published tokenizer artifact": "Veröffentlichtes Tokenizer-Artefakt",
  "New tokenizer; pilot assets are not reused":
    "Neuer Tokenizer; Pilotartefakte werden nicht wiederverwendet",
  "23 round-trip cases · 0 failures": "23 Round-Trip-Fälle · 0 Fehler",
  "German umlauts": "Deutsche Umlaute",
  Unicode: "Unicode",
  Code: "Code",
  JSON: "JSON",
  "Control tokens": "Steuer-Token",
  "The Echelon round-trip suite verifies tokenizer integrity. It is not a language-model benchmark and does not establish generation quality.":
    "Die Echelon-Round-Trip-Suite prüft die Integrität des Tokenizers. Sie ist kein Sprachmodell-Benchmark und belegt keine Generierungsqualität.",
  "Echelon tokenizer configuration": "Echelon-Tokenizer-Konfiguration",
  "Echelon tokenizer validation": "Echelon-Tokenizer-Validierung",
  "DATA PIPELINE SCALE": "DATENPIPELINE-SKALA",
  "Reported pilot scope versus an unstarted Echelon production target.":
    "Berichteter Pilotumfang gegenüber einem noch nicht gestarteten Echelon-Produktionsziel.",
  "The scale uses the 100M-token pilot report as a reference. The 1.6 stage reports 500M additional German tokens; Echelon targets 8B training tokens, but only smoke-test output exists.":
    "Die Skala verwendet den Bericht über 100 Mio. Pilot-Token als Referenz. Für die Stufe 1.6 werden 500 Mio. zusätzliche deutsche Token berichtet; Echelon zielt auf 8 Mrd. Trainings-Token, bislang existiert jedoch nur Smoke-Test-Ausgabe.",
  "Logarithmic corpus-scale comparison":
    "Logarithmischer Vergleich der Korpusgröße",
  "HF-reported scope": "Auf Hugging Face berichteter Umfang",
  "≈100M reported training tokens": "≈100 Mio. berichtete Trainings-Token",
  "Public base-model release; complete final run manifest not linked.":
    "Öffentliche Basismodell-Veröffentlichung; vollständiges abschließendes Run-Manifest nicht verlinkt.",
  "≈600M reported cumulative scope": "≈600 Mio. berichteter kumulierter Umfang",
  "Approximately 100M base tokens plus 500M additional German tokens.":
    "Ungefähr 100 Mio. Basis-Token plus 500 Mio. zusätzliche deutsche Token.",
  "Configured target": "Konfiguriertes Ziel",
  "8B configured training-token target":
    "Konfiguriertes Ziel von 8 Mrd. Trainings-Token",
  "Production run not started; final smoke produced 1,380,886 tokens.":
    "Produktionslauf nicht gestartet; der abschließende Smoke-Test erzeugte 1.380.886 Token.",
  "Source stream": "Quell-Datenstrom",
  "Language & quality filters": "Sprach- und Qualitätsfilter",
  "Exact and source-aware deduplication":
    "Exakte und quellenbewusste Deduplizierung",
  "Stable train / validation / test splits":
    "Stabile Trainings-/Validierungs-/Test-Splits",
  "Production corpus": "Produktionskorpus",
  "The Echelon configuration also targets 10M validation and 10M test tokens. None of these production totals are presented as achieved.":
    "Die Echelon-Konfiguration zielt außerdem auf 10 Mio. Validierungs- und 10 Mio. Test-Token. Keiner dieser Produktionswerte wird als erreicht dargestellt.",
  "quantum-1.6 training documentation": "Trainingsdokumentation zu quantum-1.6",
  "Echelon Garden configuration": "Echelon-Garden-Konfiguration",
  "Echelon Garden Phase 3 report": "Echelon-Garden-Phase-3-Bericht",
  "Comparison view": "Vergleichsansicht",
  "Select comparison view": "Vergleichsansicht auswählen",
  Parameters: "Parameter",
  Context: "Kontext",
  "Detailed dimensions": "Detaillierte Dimensionen",
  "Not published in pinned evidence":
    "In der fixierten Evidenz nicht veröffentlicht",
  "hidden size": "Hidden Size",
  "attention heads": "Attention-Heads",
  "KV heads": "KV-Heads",
  Vocabulary: "Vokabular",
  "Validation scope": "Validierungsumfang",
  "Corpus scale": "Korpusgröße",
  "Reference scale": "Referenzskala",
  "Primary sources": "Primärquellen",
  "Evidence boundary": "Evidenzgrenze",
};
