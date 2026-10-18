export const deResourceTranslations: Readonly<Record<string, string>> = {
  "23 July 2026": "23. Juli 2026",
  "24 July 2026": "24. Juli 2026",
  "RESEARCH OUTPUTS": "FORSCHUNGSERGEBNISSE",
  "Source-linked research notes that separate observations, negative results and open questions.":
    "Forschungsnotizen mit verlinkten Quellen, die Beobachtungen, negative Ergebnisse und offene Fragen auseinanderhalten.",
  "ARTIFACT INTEGRITY": "ARTEFAKTINTEGRITÄT",
  "Pinned revisions, GGUF checksums, reference commands and explicit gaps in the public run record.":
    "Festgeschriebene Revisionen, GGUF-Prüfsummen, Referenzbefehle und offen benannte Lücken in der öffentlichen Dokumentation der Trainingsläufe.",
  PROVENANCE: "HERKUNFT",
  "Dataset sources, configured targets, smoke evidence, filtering and missing final manifests.":
    "Datenquellen, konfigurierte Zielwerte, Smoke-Test-Belege, Filterung und fehlende finale Manifeste.",
  "LIMITS FIRST": "GRENZEN IM BLICK",
  "Known failure modes, unmeasured risks, excluded uses and secure artifact handling.":
    "Bekannte Fehlerbilder, nicht gemessene Risiken, ausgeschlossene Anwendungen und der sichere Umgang mit Artefakten.",
  "REUSE BOUNDARIES": "GRENZEN DER WEITERVERWENDUNG",
  "A material-by-material record of what is licensed, governed elsewhere or still unresolved.":
    "Eine Aufstellung für jedes einzelne Material: was lizenziert, anderweitig geregelt oder noch ungeklärt ist.",
  "CURRENT STATE": "AKTUELLER STAND",
  "Project status": "Projektstatus",
  "Model-line maturity, the reviewed evidence snapshot, open artifacts and next documentation work.":
    "Reifegrad der Modelllinien, geprüfter Belegstand, offene Artefakte und die nächsten Dokumentationsschritte.",
  ORIENTATION: "ORIENTIERUNG",
  "Plain-language answers about base completion, GGUF, Echelon, privacy, evidence and licensing.":
    "Verständliche Antworten zu Basismodellen, GGUF, Echelon, Datenschutz, Belegen und Lizenzierung.",
  "From 100M to 600M German Tokens":
    "Von 100 auf 600 Millionen deutsche Tokens",
  "What the public quantum-1.6-pilot record supports about continued pretraining—and why more reported training did not establish reliable generation.":
    "Was die öffentliche Dokumentation zu quantum-1.6-pilot über fortgesetztes Pretraining belegt – und warum das berichtete zusätzliche Training keine zuverlässige Textgenerierung gebracht hat.",
  "Research note": "Forschungsnotiz",
  "Not peer-reviewed": "Ohne Peer-Review",
  "quantum-1-pilot model card": "Model Card zu quantum-1-pilot",
  "quantum-1.6-pilot model card": "Model Card zu quantum-1.6-pilot",
  "Research question": "Forschungsfrage",
  "The public experiment asks whether continued pretraining on 500 million additional German tokens can improve language-pattern consistency while preserving the 49,295,872-parameter architecture, 512-token context and frozen quantum-1 tokenizer.":
    "Das öffentliche Experiment geht der Frage nach, ob fortgesetztes Pretraining mit 500 Millionen zusätzlichen deutschen Tokens die Konsistenz sprachlicher Muster verbessern kann – bei unveränderter Architektur mit 49.295.872 Parametern, einer Kontextlänge von 512 Tokens und eingefrorenem quantum-1-Tokenizer.",
  "This note evaluates only what the linked public artifacts support. It does not reconstruct the private training run or infer missing measurements.":
    "Diese Notiz bewertet nur, was die verlinkten öffentlichen Artefakte belegen. Sie rekonstruiert weder den privaten Trainingslauf, noch erschließt sie fehlende Messwerte.",
  "Documented method": "Dokumentierte Methode",
  "The public configuration describes weights-only initialization from the earlier Quantum base stage, a fresh optimizer, scheduler and step counter, and continued training on German FineWeb2-HQ material.":
    "Die öffentliche Konfiguration beschreibt Folgendes: Aus der früheren Quantum-Basisphase werden nur die Gewichte übernommen, Optimierer, Scheduler und Schrittzähler starten neu, und das Training wird mit deutschem FineWeb2-HQ-Material fortgesetzt.",
  "The configured target is approximately 30,518 optimizer steps at an effective 16,384 tokens per step. No final public run manifest verifies the actual completed-step count, resolved environment or every configured detail.":
    "Als Ziel sind rund 30.518 Optimiererschritte mit effektiv 16.384 Tokens pro Schritt konfiguriert. Es gibt kein abschließendes öffentliches Manifest des Laufs, das die tatsächliche Zahl abgeschlossener Schritte, die aufgelöste Umgebung oder jedes konfigurierte Detail bestätigt.",
  "Architecture and parameter count held constant":
    "Architektur und Parameterzahl unverändert",
  "512-token context held constant": "Kontextlänge von 512 Tokens unverändert",
  "Custom 16,384-token tokenizer held constant":
    "Eigener Tokenizer mit 16.384 Tokens unverändert",
  "500M additional German tokens reported by the release card":
    "500 Mio. zusätzliche deutsche Tokens laut Model Card der Veröffentlichung",
  "Publicly reported observation": "Öffentlich berichtete Beobachtung",
  "The quantum-1.6-pilot Hugging Face card reports validation loss 3.348852 and perplexity 28.4700 and publishes an F16 GGUF artifact with a manifest and SHA-256 checksum.":
    "Die Model Card von quantum-1.6-pilot auf Hugging Face nennt einen Validierungs-Loss von 3,348852 und eine Perplexität von 28,4700. Dort ist außerdem ein F16-GGUF-Artefakt mit Manifest und SHA-256-Prüfsumme veröffentlicht.",
  "These next-token metrics do not measure factual accuracy, instruction following, downstream-task performance or production readiness.":
    "Diese Next-Token-Metriken messen weder faktische Richtigkeit noch das Befolgen von Anweisungen, die Leistung bei Downstream-Aufgaben oder die Produktionsreife.",
  "Negative result": "Negatives Ergebnis",
  "The public diagnosis and model cards continue to describe factual unreliability, repetition, incomplete text and incoherent continuations. The available evidence therefore does not show that the additional reported training established reliable generation.":
    "Die öffentliche Diagnose und die Model Cards beschreiben weiterhin faktische Unzuverlässigkeit, Wiederholungen, unvollständige Texte und zusammenhanglose Fortsetzungen. Die vorliegenden Belege zeigen daher nicht, dass das berichtete zusätzliche Training zu zuverlässiger Textgenerierung geführt hat.",
  "This is a result about this small experimental setup. It is not a general conclusion that continued pretraining is ineffective or that compact models cannot be useful.":
    "Dieses Ergebnis bezieht sich auf diesen kleinen Versuchsaufbau. Daraus folgt nicht allgemein, dass fortgesetztes Pretraining unwirksam ist oder kompakte Modelle nicht nützlich sein können.",
  "Evidence boundary": "Grenzen des Belegten",
  "No versioned raw generation record, standardized downstream benchmark, complete training log, final data manifest or independently replayable metric report is public.":
    "Öffentlich liegen weder versionierte Rohausgaben der Generierung noch ein standardisierter Downstream-Benchmark, ein vollständiges Trainingsprotokoll, ein abschließendes Datenmanifest oder ein unabhängig reproduzierbarer Metrikbericht vor.",
  "The strongest supported conclusion is that the documented workflow produced a public continued-pretraining artifact with reported held-out metrics while important generation limitations remained.":
    "Die weitestgehende belegte Schlussfolgerung lautet: Der dokumentierte Ablauf hat ein öffentliches Artefakt aus fortgesetztem Pretraining mit berichteten Hold-out-Metriken erzeugt – wesentliche Einschränkungen bei der Generierung blieben jedoch bestehen.",
  REPRODUCIBILITY: "REPRODUZIERBARKEIT",
  "Artifacts that can be inspected—and gaps that cannot be replayed.":
    "Artefakte, die sich prüfen lassen – und Lücken, die sich nicht reproduzieren lassen.",
  "Release integrity is public for the two pilot GGUF files. Full training reproducibility remains partial because final manifests, logs, environments and raw evaluations are missing.":
    "Für die beiden GGUF-Dateien der Pilotmodelle sind die Integritätsnachweise öffentlich. Das Training selbst lässt sich dagegen nur teilweise reproduzieren, weil abschließende Manifeste, Protokolle, Umgebungen und Rohdaten der Evaluation fehlen.",
  "This command mirrors the pinned diagnosis configuration. The website test suite does not execute model inference. A local llama.cpp build is required, and the exact external llama.cpp revision cannot be initialized from the reviewed repository because its Git link has no .gitmodules entry.":
    "Der Befehl entspricht der festgeschriebenen Diagnosekonfiguration. Die Testsuite der Website führt selbst keine Modellinferenz aus. Erforderlich ist ein lokaler llama.cpp-Build. Die genaue externe llama.cpp-Revision lässt sich aus dem geprüften Repository nicht initialisieren, weil dessen Git-Link keinen Eintrag in .gitmodules hat.",
  "Download the GGUF from the pinned Hugging Face repository revision.":
    "GGUF-Datei aus der festgeschriebenen Revision des Hugging-Face-Repositorys herunterladen.",
  "Compare the downloaded file against the published SHA-256 value.":
    "Heruntergeladene Datei mit dem veröffentlichten SHA-256-Wert abgleichen.",
  "Use completion mode rather than assuming a chat template.":
    "Completion-Modus nutzen, statt ein Chat-Template vorauszusetzen.",
  "Record the llama.cpp revision, hardware and full command before comparing output.":
    "Vor dem Vergleich der Ausgaben llama.cpp-Revision, Hardware und vollständigen Befehl festhalten.",
  "Preserve raw output alongside the prompt, seed and decoding settings.":
    "Rohausgabe zusammen mit Prompt, Seed und Decoding-Einstellungen aufbewahren.",
  "Pilot GGUF integrity": "GGUF-Integrität der Pilotmodelle",
  "Pinned files, manifests, sizes and SHA-256 checksums.":
    "Festgeschriebene Dateien, Manifeste, Dateigrößen und SHA-256-Prüfsummen.",
  "Pilot artifacts are all rights reserved; no reuse license is granted.":
    "Für die Artefakte der Pilotmodelle gilt: alle Rechte vorbehalten; eine Lizenz zur Weiterverwendung wird nicht erteilt.",
  "Pilot training method": "Trainingsmethode der Pilotmodelle",
  "Code, documentation and YAML configurations.":
    "Code, Dokumentation und YAML-Konfigurationen.",
  "Final run manifests, exact environments, completed-step records and complete logs.":
    "Abschließende Manifeste der Trainingsläufe, exakte Umgebungen, Nachweise der abgeschlossenen Schritte und vollständige Protokolle.",
  "Pilot evaluation": "Evaluation der Pilotmodelle",
  "Reported held-out metrics, fixed prompt data and a diagnosis method.":
    "Berichtete Hold-out-Metriken, feste Prompt-Daten und eine Diagnosemethode.",
  "Versioned raw outputs, independently replayable metrics and standardized task reports.":
    "Versionierte Rohausgaben, unabhängig reproduzierbare Metriken und Berichte zu standardisierten Aufgaben.",
  "Echelon tokenizer": "Echelon-Tokenizer",
  "Configuration, checksums, quality summary and 23-case round-trip report.":
    "Konfiguration, Prüfsummen, Qualitätsübersicht und Round-Trip-Bericht mit 23 Testfällen.",
  "No model-quality conclusion follows from tokenizer validation.":
    "Die Tokenizer-Validierung erlaubt keine Rückschlüsse auf die Modellqualität.",
  "Echelon production and training": "Echelon-Produktion und -Training",
  "Production configuration and pipeline smoke evidence.":
    "Produktionskonfiguration und Smoke-Test-Belege der Pipeline.",
  "Production manifest, checkpoints, weights, outputs and evaluation.":
    "Produktionsmanifest, Checkpoints, Gewichte, Ausgaben und Evaluation.",
  "Resource measurements": "Ressourcenmessungen",
  "No committed measurement report.": "Kein Messbericht im Repository.",
  "Hardware, runtime, memory, throughput, cost and energy measurements.":
    "Messungen zu Hardware, Laufzeit, Speicher, Durchsatz, Kosten und Energie.",
  "Pinned implementation snapshot": "Festgeschriebener Implementierungsstand",
  "Training-run template": "Vorlage für Trainingsläufe",
  "Data and training record": "Dokumentation zu Daten und Training",
  "DATA & TRAINING": "DATEN & TRAINING",
  "Configured methods are not completed runs.":
    "Eine Konfiguration ist noch kein abgeschlossener Lauf.",
  "This record distinguishes dataset provenance, configured targets, smoke-test evidence and absent production or training artifacts across the Quantum model line.":
    "Diese Dokumentation hält für die gesamte Quantum-Modelllinie auseinander: Datenherkunft, konfigurierte Zielwerte, Smoke-Test-Belege und fehlende Produktions- oder Trainingsartefakte.",
  "A German-language subset derived from public web material distributed through FineWeb2-HQ.":
    "Eine deutschsprachige Teilmenge, die aus öffentlichen Webinhalten gewonnen und über FineWeb2-HQ verbreitet wird.",
  "The dataset card identifies ODC-By 1.0 and Common Crawl terms. Those terms do not automatically clear rights in every source document or license model weights, code, tokenizers or visual assets.":
    "Die Dataset Card nennt ODC-By 1.0 sowie die Nutzungsbedingungen von Common Crawl. Diese Bedingungen klären weder automatisch die Rechte an jedem einzelnen Quelldokument, noch lizenzieren sie automatisch Modellgewichte, Code, Tokenizer oder Bild- und Grafikmaterial.",
  "Configured as mutable `main`": "Als veränderliches `main` konfiguriert",
  "100M training, 1M validation and 1M test tokens at 512-token context.":
    "100 Mio. Trainings-, 1 Mio. Validierungs- und 1 Mio. Test-Tokens bei 512 Tokens Kontextlänge.",
  "The model card reports approximately 100M training tokens; no final data manifest is public.":
    "Die Model Card nennt rund 100 Mio. Trainings-Tokens; ein abschließendes Datenmanifest ist nicht öffentlich.",
  "500M new training, 2M validation and 2M test tokens at 512-token context.":
    "500 Mio. neue Trainings-, 2 Mio. Validierungs- und 2 Mio. Test-Tokens bei 512 Tokens Kontextlänge.",
  "The release card reports 500M additional tokens; final document counts, split hashes and overlap statistics are not public.":
    "Die Model Card der Veröffentlichung nennt 500 Mio. zusätzliche Tokens; endgültige Dokumentzahlen, Split-Hashes und Überschneidungsstatistiken sind nicht öffentlich.",
  "8B training, 10M validation and 10M test tokens at 2,048-token context.":
    "8 Mrd. Trainings-, 10 Mio. Validierungs- und 10 Mio. Test-Tokens bei 2.048 Tokens Kontextlänge.",
  "A smoke run saw 5,001 documents, accepted 1,559 and produced 1,380,886 packed tokens. The production run had not started.":
    "Ein Smoke-Test-Lauf sichtete 5.001 Dokumente, ließ 1.559 davon zu und erzeugte 1.380.886 gepackte Tokens. Der Produktionslauf hatte noch nicht begonnen.",
  "Language, script, length, quality, URL, digit and symbol filtering":
    "Filterung nach Sprache, Schriftsystem, Länge, Qualität, URL, Ziffern und Symbolen",
  "Deterministic split assignment and configured seeds":
    "Deterministische Zuordnung zu den Splits und konfigurierte Seeds",
  "Exact-document controls and reliance on upstream MinHash deduplication in the Echelon pipeline":
    "Prüfung auf exakt identische Dokumente und Rückgriff auf die vorgelagerte MinHash-Deduplizierung in der Echelon-Pipeline",
  "Packed token storage with checkpoint and resume handling":
    "Speicherung gepackter Tokens mit Checkpoints und Wiederaufnahme nach Unterbrechungen",
  "Exact fingerprints do not remove every near-duplicate or semantically overlapping document.":
    "Exakte Fingerabdrücke entfernen weder jedes Beinahe-Duplikat noch jedes semantisch überlappende Dokument.",
  "Public web data may retain personal, harmful, copyrighted or otherwise sensitive material.":
    "Öffentliche Webdaten können weiterhin personenbezogene, schädliche, urheberrechtlich geschützte oder anderweitig sensible Inhalte enthalten.",
  "The pilot configurations do not resolve their mutable dataset revision in a final manifest.":
    "Die Konfigurationen der Pilotmodelle verweisen auf eine veränderliche Datensatzrevision, die in keinem abschließenden Manifest aufgelöst wird.",
  "No public record links final accepted documents and split hashes to either pilot GGUF.":
    "Kein öffentlicher Nachweis ordnet die endgültig zugelassenen Dokumente und Split-Hashes einem der beiden Pilot-GGUFs zu.",
  "No production Echelon dataset or completed Echelon training run is public.":
    "Weder ein Echelon-Produktionsdatensatz noch ein abgeschlossener Echelon-Trainingslauf ist öffentlich.",
  "Questions about provenance, privacy, rights or removal should be sent to the public project email with the affected source and enough information to identify it.":
    "Fragen zu Herkunft, Datenschutz, Rechten oder zur Entfernung von Inhalten richten Sie bitte an die öffentliche E-Mail-Adresse des Projekts. Nennen Sie dabei die betroffene Quelle und genügend Angaben, um sie zu identifizieren.",
  "FineWeb2-HQ dataset card": "Dataset Card von FineWeb2-HQ",
  "Common Crawl terms": "Nutzungsbedingungen von Common Crawl",
  "Public data and training record":
    "Öffentliche Dokumentation zu Daten und Training",
  "Garden Phase 3 report": "Bericht zu Garden Phase 3",
  "RESPONSIBLE USE": "VERANTWORTUNGSVOLLE NUTZUNG",
  "Experimental artifacts require cautious use.":
    "Experimentelle Artefakte erfordern einen vorsichtigen Umgang.",
  "The public pilots are small base-completion models with documented reliability limits. Echelon has no trained public model. None of these artifacts should be treated as a production assistant.":
    "Die öffentlichen Pilotmodelle sind kleine Basismodelle für Textfortsetzung mit dokumentierten Grenzen bei der Zuverlässigkeit. Für Echelon gibt es kein öffentliches trainiertes Modell. Keines dieser Artefakte sollte wie ein produktiv einsetzbarer Assistent behandelt werden.",
  "Medical, legal, financial or safety-critical decisions":
    "Medizinische, rechtliche, finanzielle oder sicherheitskritische Entscheidungen",
  "Automated decisions about people, eligibility, employment or access":
    "Automatisierte Entscheidungen über Personen, Anspruchsberechtigung, Beschäftigung oder Zugang",
  "Unsupervised factual publication or authoritative advice":
    "Unbeaufsichtigte Veröffentlichung von Sachinformationen oder verbindliche Beratung",
  "Security-sensitive automation or operation of critical infrastructure":
    "Sicherheitssensible Automatisierung oder Betrieb kritischer Infrastruktur",
  "Any use that assumes instruction following, chat alignment or factual reliability":
    "Jeder Einsatz, der das Befolgen von Anweisungen, Chat-Alignment oder faktische Zuverlässigkeit voraussetzt",
  "Factual inconsistency": "Faktische Inkonsistenz",
  "Completions may be grammatically structured while making incorrect claims.":
    "Textfortsetzungen können grammatisch stimmig sein und dennoch falsche Aussagen enthalten.",
  Repetition: "Wiederholungen",
  "The pilots may repeat tokens, phrases or structures instead of developing a coherent continuation.":
    "Die Pilotmodelle können Tokens, Wendungen oder Strukturen wiederholen, statt den Text schlüssig fortzusetzen.",
  "Incomplete or incoherent text": "Unvollständige oder zusammenhanglose Texte",
  "Outputs may stop abruptly, drift from the prompt or lose semantic continuity.":
    "Ausgaben können abrupt abbrechen, sich vom Prompt entfernen oder den inhaltlichen Zusammenhang verlieren.",
  "No instruction or chat alignment": "Kein Instruction- oder Chat-Alignment",
  "The pilots are base-completion artifacts. No chat template, refusal behavior or instruction-following capability is promised.":
    "Die Pilotmodelle sind Basismodelle für Textfortsetzung. Ein Chat-Template, Ablehnungsverhalten oder die Fähigkeit, Anweisungen zu befolgen, werden nicht zugesagt.",
  "Bias across demographic, cultural or political groups":
    "Verzerrungen gegenüber demografischen, kulturellen oder politischen Gruppen",
  "Toxic, harmful or illegal-content generation":
    "Erzeugung toxischer, schädlicher oder illegaler Inhalte",
  "Memorisation and reproduction of source material":
    "Memorisierung und Wiedergabe von Quellmaterial",
  "Personal-data leakage": "Abfluss personenbezogener Daten",
  "Prompt-injection or adversarial robustness":
    "Robustheit gegenüber Prompt-Injection oder adversarialen Angriffen",
  "Misuse potential and model-specific security behavior":
    "Missbrauchspotenzial und modellspezifisches Sicherheitsverhalten",
  "Verify repository revision, filename, byte size and checksum before use.":
    "Vor der Nutzung Repository-Revision, Dateinamen, Dateigröße in Bytes und Prüfsumme prüfen.",
  "Treat model files, datasets, scripts and conversion tools as untrusted inputs.":
    "Modelldateien, Datensätze, Skripte und Konvertierungswerkzeuge als nicht vertrauenswürdige Eingaben behandeln.",
  "Keep remote-code execution disabled unless the exact code has been reviewed.":
    "Remote-Code-Ausführung deaktiviert lassen, solange nicht genau dieser Code geprüft wurde.",
  "Run unfamiliar training or inference workloads without host secrets and with limited privileges.":
    "Unbekannte Trainings- oder Inferenz-Workloads ohne Secrets des Hostsystems und mit eingeschränkten Rechten ausführen.",
  "Do not publish raw outputs as facts without independent verification.":
    "Rohausgaben nicht ohne unabhängige Prüfung als Tatsachen veröffentlichen.",
  "Model behavior or documentation": "Modellverhalten oder Dokumentation",
  "Use a public GitHub issue when the report contains no private data or security-sensitive details.":
    "Dafür eignet sich ein öffentliches GitHub-Issue, sofern die Meldung weder private Daten noch sicherheitsrelevante Details enthält.",
  "Website security": "Website-Sicherheit",
  "Follow the private vulnerability-reporting process. Do not publish secrets or exploit details in a public issue.":
    "Für Schwachstellen gilt das vertrauliche Meldeverfahren. Secrets und Exploit-Details gehören nicht in ein öffentliches Issue.",
  "Privacy, rights or sensitive material":
    "Datenschutz, Rechte oder sensible Inhalte",
  "Email the project directly and include only the information necessary to identify the concern.":
    "Wenden Sie sich direkt per E-Mail an das Projekt und machen Sie nur die Angaben, die zur Identifizierung des Anliegens nötig sind.",
  LICENSING: "LIZENZIERUNG",
  "Public availability is not a reuse license.":
    "Öffentliche Verfügbarkeit ist keine Lizenz zur Weiterverwendung.",
  "Licensing is recorded per material. The website's Apache-2.0 license does not automatically cover models, tokenizers, datasets, external repositories, logos or model-card images.":
    "Die Lizenzlage wird für jedes Material einzeln dokumentiert. Die Apache-2.0-Lizenz der Website gilt nicht automatisch für Modelle, Tokenizer, Datensätze, externe Repositories, Logos oder Bilder aus Model Cards.",
  "Website source and original documentation":
    "Website-Quellcode und eigene Dokumentation",
  "Apache License 2.0": "Apache-Lizenz 2.0",
  "Applies to original website code and documentation unless a file states otherwise.":
    "Gilt für den eigenen Code und die eigene Dokumentation der Website, sofern eine Datei nichts anderes angibt.",
  "Brand marks and model-card images":
    "Markenzeichen und Bilder aus Model Cards",
  "No separate public reuse grant":
    "Keine gesonderte öffentliche Erlaubnis zur Weiterverwendung",
  "Creator, provenance, permission and trademark treatment remain to be recorded.":
    "Urheber, Herkunft, Erlaubnis und markenrechtliche Behandlung müssen noch dokumentiert werden.",
  "quantum-1-pilot weights, GGUF artifacts and tokenizer":
    "Gewichte, GGUF-Artefakte und Tokenizer von quantum-1-pilot",
  "All rights reserved; no public reuse license":
    "Alle Rechte vorbehalten; keine öffentliche Lizenz zur Weiterverwendung",
  "Redistribution, modification and commercial use are not granted. Do not describe the artifact as open weight.":
    "Rechte zur Weiterverbreitung, Bearbeitung und kommerziellen Nutzung werden nicht eingeräumt. Das Artefakt darf nicht als Open Weight bezeichnet werden.",
  "quantum-1.6-pilot weights, GGUF artifacts and tokenizer":
    "Gewichte, GGUF-Artefakte und Tokenizer von quantum-1.6-pilot",
  "Future Echelon artifacts": "Künftige Echelon-Artefakte",
  "No model release and no artifact license":
    "Keine Modellveröffentlichung, keine Lizenz für Artefakte",
  "Any future weights and tokenizer require explicit terms at release time.":
    "Für künftige Gewichte und Tokenizer müssen bei der Veröffentlichung ausdrückliche Bedingungen festgelegt werden.",
  "FineWeb2-HQ database": "FineWeb2-HQ-Datenbank",
  "ODC-By 1.0 and Common Crawl terms identified":
    "ODC-By 1.0 und Nutzungsbedingungen von Common Crawl ausgewiesen",
  "Database terms do not clear every right in source pages or license resulting model artifacts.":
    "Die Datenbankbedingungen klären nicht jedes Recht an den Quellseiten und lizenzieren keine daraus entstandenen Modellartefakte.",
  "lumen-quantum source repository": "Quellcode-Repository lumen-quantum",
  "Apache License 2.0 for source code, configurations, tests and original documentation":
    "Apache-Lizenz 2.0 für Quellcode, Konfigurationen, Tests und eigene Dokumentation",
  "The source license does not cover model weights, GGUF artifacts or trained tokenizer binaries; it is separate from the website repository.":
    "Die Lizenz für den Quellcode erstreckt sich nicht auf Modellgewichte, GGUF-Artefakte oder trainierte Tokenizer-Binärdateien; sie gilt unabhängig vom Website-Repository.",
  "Full licensing and provenance record":
    "Vollständige Dokumentation zu Lizenzen und Herkunft",
  "PROJECT STATUS": "PROJEKTSTATUS",
  "Current evidence, visible gaps and no silent upgrades.":
    "Aktuelle Belege, sichtbare Lücken, keine stillschweigenden Aufwertungen.",
  "A concise view of what is public for each model line, what remains incomplete and which documentation work comes next.":
    "Ein knapper Überblick: was zu jeder Modelllinie öffentlich ist, was noch unvollständig ist und welche Dokumentationsarbeit als Nächstes ansteht.",
  "Public 49.3M-parameter experimental F16 GGUF release.":
    "Veröffentlichtes experimentelles F16-GGUF mit 49,3 Mio. Parametern.",
  "No standardized benchmark or final run manifest. Pilot weights, GGUF artifacts and tokenizers are all rights reserved; no public reuse license is granted.":
    "Kein standardisierter Benchmark und kein abschließendes Manifest des Trainingslaufs. Für Gewichte, GGUF-Artefakte und Tokenizer der Pilotmodelle gilt: alle Rechte vorbehalten; eine öffentliche Lizenz zur Weiterverwendung wird nicht erteilt.",
  "Public 49.3M-parameter F16 GGUF release with reported continued pretraining and held-out metrics.":
    "Veröffentlichtes F16-GGUF mit 49,3 Mio. Parametern; berichtet werden fortgesetztes Pretraining und Hold-out-Metriken.",
  "No raw evaluation record or complete run log. Pilot weights, GGUF artifacts and tokenizers are all rights reserved; no public reuse license is granted.":
    "Keine Rohdaten der Evaluation und kein vollständiges Protokoll des Trainingslaufs. Für Gewichte, GGUF-Artefakte und Tokenizer der Pilotmodelle gilt: alle Rechte vorbehalten; eine öffentliche Lizenz zur Weiterverwendung wird nicht erteilt.",
  "Architecture preflight, tokenizer validation and Garden pipeline smoke evidence.":
    "Preflight-Prüfung der Architektur, Tokenizer-Validierung und Smoke-Test-Belege der Garden-Pipeline.",
  "No production dataset, trained model, checkpoint, output or benchmark.":
    "Kein Produktionsdatensatz, kein trainiertes Modell, kein Checkpoint, keine Ausgaben, kein Benchmark.",
  "Pilot final run manifests": "Finale Manifeste der Pilotläufe",
  "Immutable records linking data, code, tokenizer, completed steps, checkpoints, evaluation and release files.":
    "Unveränderliche Nachweise, die Daten, Code, Tokenizer, abgeschlossene Schritte, Checkpoints, Evaluation und veröffentlichte Dateien miteinander verknüpfen.",
  "Raw evaluation artifacts": "Rohdaten der Evaluation",
  "Versioned prompts, outputs, decoding settings, metric commands and failure labels.":
    "Versionierte Prompts, Ausgaben, Decoding-Einstellungen, Befehle zur Metrikberechnung und Fehlerkennzeichnungen.",
  "Inference memory and throughput plus training hardware, runtime, cost and energy use.":
    "Speicherbedarf und Durchsatz bei der Inferenz sowie Hardware, Laufzeit, Kosten und Energieverbrauch des Trainings.",
  "Visual-asset provenance": "Herkunft des Bildmaterials",
  "Creator, source, permission, transformation and trademark records for project images and brand marks.":
    "Nachweise zu Urheber, Quelle, Erlaubnis, Bearbeitung und Markenrecht für Projektbilder und Markenzeichen.",
  "Echelon production and model artifacts":
    "Produktions- und Modellartefakte von Echelon",
  "Final corpus manifest, training logs, checkpoints, weights, outputs and evaluation.":
    "Abschließendes Korpusmanifest, Trainingsprotokolle, Checkpoints, Gewichte, Ausgaben und Evaluation.",
  "Maintain the published all-rights-reserved pilot-artifact decision; attach an explicit reuse license only if the policy changes.":
    "An der veröffentlichten Entscheidung festhalten, für die Artefakte der Pilotmodelle alle Rechte vorzubehalten; eine ausdrückliche Lizenz zur Weiterverwendung nur bei geänderter Richtlinie ergänzen.",
  "Attach raw, versioned pilot evaluation artifacts before making broader capability claims.":
    "Versionierte Rohdaten der Pilot-Evaluation beifügen, bevor weitergehende Aussagen über Fähigkeiten getroffen werden.",
  "Complete the Echelon production-data workflow before any dataset-total claim.":
    "Den Ablauf für die Echelon-Produktionsdaten abschließen, bevor Gesamtzahlen zum Datensatz genannt werden.",
  "Measure local inference requirements and performance using a documented environment.":
    "Anforderungen und Leistung der lokalen Inferenz in einer dokumentierten Umgebung messen.",
  "Keep every website claim tied to an immutable artifact or an explicit missing-evidence label.":
    "Jede Aussage auf der Website an ein unveränderliches Artefakt oder eine ausdrückliche Kennzeichnung fehlender Belege knüpfen.",
  "Repository roadmap": "Repository-Roadmap",
  "Pinned evidence snapshot": "Festgeschriebener Belegstand",
  "Are the public Quantum pilots chat models?":
    "Sind die veröffentlichten Quantum-Pilotmodelle Chatmodelle?",
  "No. quantum-1-pilot and quantum-1.6-pilot are experimental base-completion models. They are not instruction-tuned assistants and no chat template or conversational alignment is promised.":
    "Nein. quantum-1-pilot und quantum-1.6-pilot sind experimentelle Basismodelle für Textfortsetzung. Sie sind keine auf Anweisungen feinabgestimmten Assistenten; ein Chat-Template oder ein Alignment für Dialoge wird nicht zugesagt.",
  "What is GGUF?": "Was ist GGUF?",
  "GGUF is a model-file format commonly used by llama.cpp-compatible local inference tools. A GGUF file makes local experimentation possible, but does not establish quality, safety, compatibility or reuse rights.":
    "GGUF ist ein Dateiformat für Modelle, das häufig von llama.cpp-kompatiblen Werkzeugen für lokale Inferenz genutzt wird. Eine GGUF-Datei ermöglicht lokale Experimente, belegt aber weder Qualität noch Sicherheit, Kompatibilität oder Rechte zur Weiterverwendung.",
  "Can the pilots run locally?":
    "Lassen sich die Pilotmodelle lokal ausführen?",
  "Public F16 GGUF files and a llama.cpp reference command are available. Minimum RAM, throughput and client compatibility have not been formally measured by the project.":
    "Es gibt öffentliche F16-GGUF-Dateien und einen llama.cpp-Referenzbefehl. Mindestbedarf an RAM, Durchsatz und Kompatibilität mit Clients hat das Projekt nicht formal gemessen.",
  "Are Echelon Base and Echelon Chat separate model families?":
    "Sind Echelon Base und Echelon Chat getrennte Modellfamilien?",
  "No. They are planned stages or variants within the quantum-1-echelon model line. No trained Echelon model is currently public.":
    "Nein. Es handelt sich um geplante Stufen oder Varianten innerhalb der Modelllinie quantum-1-echelon. Derzeit ist kein trainiertes Echelon-Modell öffentlich.",
  "Why are there no standardized benchmark scores?":
    "Warum gibt es keine standardisierten Benchmark-Ergebnisse?",
  "No versioned standardized downstream-task benchmark report is public. The website does not invent or infer scores and keeps the gap visible until a suitable reproducible evaluation exists.":
    "Es ist kein versionierter Bericht über standardisierte Benchmarks für Downstream-Aufgaben öffentlich. Die Website erfindet keine Werte, leitet keine ab und lässt die Lücke sichtbar, bis es eine geeignete, reproduzierbare Evaluation gibt.",
  "What do the evidence labels mean?":
    "Was bedeuten die Kennzeichnungen zum Belegstatus?",
  "Published means a public artifact directly supports the statement. Partial evidence means a configuration, preflight or smoke artifact exists without proving full completion. The remaining labels identify absent, unmeasured, incomplete or maintainer-dependent information.":
    "„Veröffentlicht“ bedeutet, dass ein öffentliches Artefakt die Aussage direkt stützt. „Teilweise belegt“ bedeutet, dass eine Konfiguration, eine Preflight-Prüfung oder ein Smoke-Test-Artefakt vorliegt, ohne dass damit der vollständige Abschluss nachgewiesen ist. Die übrigen Kennzeichnungen weisen auf fehlende, nicht gemessene, unvollständige oder vom Maintainer abhängige Angaben hin.",
  "Does local inference guarantee privacy?":
    "Garantiert lokale Inferenz Datenschutz?",
  "No. Local execution may keep prompts on a device, but privacy depends on the application, logs, operating system, model source and surrounding infrastructure.":
    "Nein. Bei lokaler Ausführung können Prompts zwar auf dem Gerät bleiben, der Datenschutz hängt aber von Anwendung, Protokollen, Betriebssystem, Modellquelle und der umgebenden Infrastruktur ab.",
  "Are the model weights open source?": "Sind die Modellgewichte Open Source?",
  "No. The maintainer's published registry keeps the pilot weights, GGUF artifacts and tokenizers all rights reserved. No public reuse license is granted, and redistribution, modification and commercial use are not granted. Downloadability does not make the artifacts open source, open weight or freely reusable.":
    "Nein. Laut dem veröffentlichten Register des Maintainers gilt für Gewichte, GGUF-Artefakte und Tokenizer der Pilotmodelle: alle Rechte vorbehalten. Es wird keine öffentliche Lizenz zur Weiterverwendung erteilt, und Rechte zur Weiterverbreitung, Bearbeitung oder kommerziellen Nutzung werden nicht eingeräumt. Dass sich die Artefakte herunterladen lassen, macht sie weder zu Open Source noch zu Open Weight oder frei weiterverwendbar.",
  "Is the research peer-reviewed?":
    "Wurde die Forschung einem Peer-Review unterzogen?",
  "No academic peer-review or DOI is claimed. Publications on this website are project research notes linked to public artifacts and explicit evidence boundaries.":
    "Ein akademisches Peer-Review oder eine DOI wird nicht beansprucht. Die Publikationen auf dieser Website sind Forschungsnotizen des Projekts; sie verweisen auf öffentliche Artefakte und benennen ausdrücklich die Grenzen des Belegten.",
  "How can I report a problem?": "Wie kann ich ein Problem melden?",
  "Use a public GitHub issue for non-sensitive documentation or behavior reports, the private security process for vulnerabilities, and email for privacy, rights or sensitive-material concerns.":
    "Für nicht sensible Meldungen zu Dokumentation oder Modellverhalten eignet sich ein öffentliches GitHub-Issue. Schwachstellen melden Sie über das vertrauliche Sicherheitsverfahren, Anliegen zu Datenschutz, Rechten oder sensiblen Inhalten per E-Mail.",
  "Citation metadata": "Zitationsmetadaten",
  "CITATION.cff for the website repository":
    "CITATION.cff für das Website-Repository",
  Contributing: "Mitwirken",
  "Contribution scope and evidence requirements":
    "Umfang von Beiträgen und Anforderungen an Belege",
  Security: "Sicherheit",
  "Private vulnerability-reporting guidance":
    "Hinweise zur vertraulichen Meldung von Schwachstellen",
  "OPEN SOURCE": "OPEN SOURCE",
  PUBLICATIONS: "PUBLIKATIONEN",
  "Research notes with visible evidence boundaries.":
    "Forschungsnotizen, die zeigen, was belegt ist – und was nicht.",
  "Project publications summarize public artifacts, negative results and unresolved questions. They are not presented as peer-reviewed academic papers.":
    "Die Publikationen des Projekts fassen öffentliche Artefakte, negative Ergebnisse und offene Fragen zusammen. Sie erheben nicht den Anspruch, begutachtete wissenschaftliche Fachartikel zu sein.",
  "No DOI": "Keine DOI",
  "Read research note": "Zur Forschungsnotiz",
  "Straight answers about an early-stage research project.":
    "Klare Antworten zu einem Forschungsprojekt in der Frühphase.",
  "The most common questions about model type, local inference, Echelon, evidence status, privacy, licensing and reporting.":
    "Die häufigsten Fragen zu Modelltyp, lokaler Inferenz, Echelon, Belegstatus, Datenschutz, Lizenzen und Meldewegen.",
  "OPEN PUBLICATION ITEMS": "OFFENE PUNKTE",
  "Gaps remain part of the record.": "Auch Lücken gehören zur Dokumentation.",
  "DOCUMENTATION ROADMAP": "DOKUMENTATIONS-ROADMAP",
  "Evidence before claims.": "Erst belegen, dann behaupten.",
  Material: "Material",
  "Current terms": "Geltende Bedingungen",
  Boundary: "Grenze",
  "Scrollable licensing matrix": "Scrollbare Lizenztabelle",
  "License and provenance status by project material":
    "Lizenz- und Herkunftsstatus je Projektmaterial",
  "This is a project-maintenance record, not legal advice. No unresolved material is described as open source, open weight or freely reusable.":
    "Diese Übersicht dient der Projektpflege und ist keine Rechtsberatung. Ungeklärtes Material wird weder als Open Source noch als Open Weight oder frei weiterverwendbar bezeichnet.",
  "EXCLUDED USES": "AUSGESCHLOSSENE ANWENDUNGEN",
  "Do not treat experimental completions as decisions.":
    "Experimentelle Textfortsetzungen ersetzen keine Entscheidungen.",
  "KNOWN BEHAVIOR": "BEKANNTES VERHALTEN",
  "Limits observed in the public record.":
    "Grenzen, die in der öffentlichen Dokumentation festgehalten sind.",
  "UNMEASURED RISKS": "NICHT GEMESSENE RISIKEN",
  "No safety evaluation is inferred.":
    "Eine Sicherheitsevaluation wird nicht unterstellt.",
  "ARTIFACT SAFETY": "ARTEFAKTSICHERHEIT",
  "Treat files and code as untrusted.":
    "Dateien und Code als nicht vertrauenswürdig behandeln.",
  REPORTING: "MELDEWEGE",
  "Use the right channel.": "Jede Meldung an die richtige Stelle.",
  "Open reporting guidance": "Meldehinweise ansehen",
  "PRIMARY DATASET": "HAUPTDATENSATZ",
  "Inspect dataset card": "Dataset Card ansehen",
  "Source revision": "Quellrevision",
  "Configured target": "Konfigurierter Zielwert",
  "Public observation": "Öffentliche Beobachtung",
  "PIPELINE CONTROLS": "PIPELINE-KONTROLLEN",
  "Documented controls.": "Dokumentierte Kontrollen.",
  "KNOWN LIMITATIONS": "BEKANNTE EINSCHRÄNKUNGEN",
  "Evidence still missing.": "Was noch nicht belegt ist.",
  "PUBLIC F16 GGUF": "ÖFFENTLICHES F16-GGUF",
  File: "Datei",
  Size: "Größe",
  "Model repository": "Modell-Repository",
  Checksum: "Prüfsumme",
  Manifest: "Manifest",
  "LLAMA.CPP REFERENCE": "LLAMA.CPP-REFERENZ",
  "VERIFICATION WORKFLOW": "PRÜFABLAUF",
  "A repeatable local record.": "Lokal prüfen, wiederholbar festhalten.",
  Area: "Bereich",
  Available: "Verfügbar",
  "Still missing": "Fehlt noch",
  "Scrollable reproducibility matrix":
    "Scrollbare Tabelle zur Reproduzierbarkeit",
  "Reproducibility status, available evidence and missing artifacts":
    "Stand der Reproduzierbarkeit, vorhandene Belege und fehlende Artefakte",
  "All publications": "Alle Publikationen",
  "Review status": "Begutachtung",
  "Not available": "Nicht verfügbar",
  "This project research note is not an academic publication. It summarizes only the linked public record and does not fill gaps in training logs, raw evaluations or release provenance.":
    "Diese Forschungsnotiz des Projekts ist keine wissenschaftliche Veröffentlichung. Sie fasst nur die verlinkte öffentliche Dokumentation zusammen und schließt keine Lücken in Trainingsprotokollen, Rohdaten der Evaluation oder bei der Herkunft der veröffentlichten Artefakte.",
};
