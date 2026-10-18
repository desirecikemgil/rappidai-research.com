# German style guide

The German site (`/de`) is written, not machine-translated: it should read like copy a native
German speaker wrote for a serious, independent AI research lab. Same facts and the same caution as
the English, but natural German. Use this guide for every new or changed German string in
`content/locales/` and in inline `de` copy.

## Rules

1. **Keys are the English source.** The locale dictionaries map the exact English string to its
   German value (`t(locale, english)`). When English copy changes, update the key; when only the
   German changes, edit the value. A missing key silently falls back to English on `/de`.
2. **Facts and evidence boundaries stay exactly as they are.** Do not upgrade or soften claims.
   Planned stays planned, target stays target, "not published" stays not published, smoke test stays
   smoke test, preflight stays preflight. Never imply a model was trained, released, benchmarked or
   licensed when the English does not. Keep every hedge ("vorläufig", "geplant", "nicht belegt" …).
3. **Do not touch:** product/model names (Quantum, Sentinel-Alpha, Echelon, Echelon Base/Chat,
   quantum-1-pilot, quantum-1.6-pilot, Ghost, Replay, GhostBench, Garden, rappidAI), code,
   commands, CLI flags, file names, paths, URLs, hashes, version numbers, uppercase decision labels
   (ALLOW, DENY, SHADOW, ASK), R0–R4, GGUF, F16, SHA-256, FineWeb2-HQ, Qwen3.5-9B, Hugging Face,
   GitHub. Template literals / `${…}` placeholders must stay intact.
4. **Legal text** (Impressum, Datenschutz, licensing statements, responsible-use obligations):
   keep the legal meaning precise. Only smooth wording; do not drop or add obligations, rights,
   conditions, names or addresses.
5. **Length:** UI labels (nav items, buttons, chips, tab names, table headers, status labels,
   eyebrows/kickers) must stay about as short as now — never noticeably longer. Prefer shorter.
6. Valid TypeScript; keep straight ASCII double quotes as string delimiters. Inside German text use
   German quotes „…“ (and ‚…‘ inside them) instead of "…" or '…'.

## Voice

- Formal register: address the reader with **„Sie“**, never „du“ (fix any „du/dein/Entdecke …“).
  Even better, avoid direct address where an impersonal sentence reads naturally.
- Calm, precise, confident. Short, clear sentences. Active verbs over noun chains
  („Wir prüfen, ob …“ instead of „Die Prüfung der Frage, ob …“). Avoid stacked -ung/-keit nouns.
- Restructure sentences freely when the English word order or syntax reads foreign in German.
  Split long sentences. Translate meaning, not words.
- Avoid unnecessary anglicisms when a common German word exists. Keep established technical
  English terms German developers actually use (see glossary).
- Do not shout: uppercase-only English kickers (e.g. "RESEARCH THESIS") are rendered uppercase by the
  design anyway; keep the German value in the same case as it is now, just pick a natural phrase.
- Headlines may keep the site's style of short statements ending with a period, but must sound
  natural in German (no literal „Grenzen zuerst“, „Offen über Einschränkungen“).
- Buttons and links: infinitive or noun phrase, not imperative with „Sie“
  („Modelle ansehen“, „Mehr erfahren“, „Zur Forschungsnotiz“, „Kontakt aufnehmen“).
- Short descriptions under navigation/topic links: compact noun phrases or infinitive phrases
  that read naturally („Pilotmodelle und Echelon-Pipeline im Überblick“), not truncated sentences.
- Gender: keep neutral forms where natural („Forschende“, „Studierende“, „Entwicklungsteams“),
  otherwise the established generic forms („Entwickler“). No gender star/colon. Never „Gestaltende“.
- Typography: German quotes „…“; en dash with spaces „ – “ instead of em dash „—“; numbers in German
  format (4.096; 49,3 Mio.; 506.333.440; 40 Mrd. Tokens); dates „23. Juli 2026“, „Oktober 2026“;
  „z. B.“, „d. h.“ with narrow spacing as a normal space.

## Glossary (use consistently)

| English                              | German                                                                      |
| ------------------------------------ | --------------------------------------------------------------------------- |
| evidence (general)                   | Belege, Nachweise (not „Evidenz“ in running text)                           |
| evidence boundary / boundaries       | Grenzen des Belegten, „was belegt ist – und was nicht“, Belegstand          |
| evidence snapshot                    | Stand der Belege / Belegstand (with date/revision)                          |
| evidence map                         | Belegübersicht                                                              |
| evidence status / label              | Belegstatus                                                                 |
| planning evidence                    | Planungsunterlage(n)                                                        |
| smoke evidence                       | Smoke-Test-Belege                                                           |
| record (a documented record)         | Dokumentation, Nachweis, Unterlagen (pick what fits)                        |
| finding(s)                           | Befunde / Ergebnisse / Erkenntnisse                                         |
| research note                        | Forschungsnotiz                                                             |
| release (a model release, the act)   | Veröffentlichung                                                            |
| public releases (model list heading) | Veröffentlichte Modelle                                                     |
| software release / version           | Release (z. B. „Release v0.3.0“)                                            |
| pilot (model)                        | Pilotmodell (Plural Pilotmodelle); "pilots" in short labels: „Pilotmodelle“ |
| base-completion model                | Basismodell für Textfortsetzung (kurz: Basismodell, kein Chatmodell)        |
| foundation model (Sentinel)          | Ausgangsmodell                                                              |
| German-first                         | Deutsch im Fokus                                                            |
| layers                               | Schichten                                                                   |
| base completion                      | Textfortsetzung                                                             |
| continued pretraining                | fortgesetztes Pretraining                                                   |
| pretraining                          | Pretraining                                                                 |
| preflight                            | Preflight-Prüfung (as a stage label: „Preflight“)                           |
| smoke test                           | Smoke-Test                                                                  |
| production run                       | Produktionslauf                                                             |
| training run                         | Trainingslauf                                                               |
| run (agent/experiment)               | Lauf / Durchlauf (not „Run“)                                                |
| committed (in the repo)              | im Repository hinterlegt / veröffentlicht (not „eingecheckt“)               |
| pinned revision                      | festgeschriebene Revision / fest verlinkte Revision                         |
| manifest                             | Manifest                                                                    |
| checksum                             | Prüfsumme                                                                   |
| artifact                             | Artefakt (Modellartefakt)                                                   |
| weights                              | Gewichte / Modellgewichte                                                   |
| model card                           | Model Card (not „Modellkarte“)                                              |
| release card                         | Model Card der Veröffentlichung                                             |
| tokenizer                            | Tokenizer                                                                   |
| tokens                               | Tokens (plural always „Tokens“)                                             |
| context (window)                     | Kontextlänge / Kontextfenster                                               |
| inference                            | Inferenz; local inference: lokale Inferenz                                  |
| local-first                          | Für lokalen Betrieb (Sentinel); lokal ausgerichtet (Replay)                 |
| deployment                           | Bereitstellung / Einsatz                                                    |
| target (spec value)                  | Zielwert; status chip "Target": „Ziel“                                      |
| planned                              | geplant; chip „Geplant“                                                     |
| development targets                  | Entwicklungsziele                                                           |
| training objective                   | Trainingsziel                                                               |
| roadmap                              | Roadmap                                                                     |
| Not published                        | Nicht veröffentlicht                                                        |
| Not measured                         | Nicht gemessen                                                              |
| Not yet available                    | Noch nicht verfügbar                                                        |
| Partial evidence                     | Teilweise belegt                                                            |
| Maintainer input required            | Angabe des Maintainers ausstehend                                           |
| Coming Soon                          | Demnächst                                                                   |
| Under evaluation                     | In Prüfung                                                                  |
| In development                       | In Entwicklung                                                              |
| failure mode                         | Fehlerbild / Fehlermuster                                                   |
| limitations                          | Grenzen / Einschränkungen                                                   |
| responsible use                      | Verantwortungsvolle Nutzung                                                 |
| reuse                                | Weiterverwendung / Nachnutzung                                              |
| provenance                           | Herkunft                                                                    |
| reproducibility                      | Reproduzierbarkeit                                                          |
| benchmark                            | Benchmark                                                                   |
| held-out validation                  | Validierung auf zurückgehaltenen Daten (Hold-out)                           |
| next-token loss/metrics              | Next-Token-Loss / -Metriken                                                 |
| agent                                | Agent, KI-Agent                                                             |
| agent infrastructure                 | Infrastruktur für KI-Agenten                                                |
| decoy                                | Köder                                                                       |
| deception                            | Täuschung                                                                   |
| approval                             | Freigabe                                                                    |
| containment                          | Abschottung                                                                 |
| egress                               | ausgehender Datenverkehr                                                    |
| prompt injection                     | Prompt-Injection                                                            |
| runtime                              | Laufzeit / Runtime (for the Ghost product: „Security-Runtime“ ok)           |
| state (execution state)              | Zustand                                                                     |
| restore                              | wiederherstellen                                                            |
| branch (verb / Replay feature)       | verzweigen; noun: Abzweigung / Branch (CLI)                                 |
| rerun / live rerun                   | erneute Ausführung / erneute Live-Ausführung                                |
| playback                             | Wiedergabe                                                                  |
| recorder                             | Aufzeichnung / Recorder                                                     |
| self-funded                          | eigenfinanziert                                                             |
| founder-led                          | gründergeführt                                                              |
| independent initiative               | unabhängige Initiative                                                      |
| compute                              | Rechenleistung / Rechenressourcen                                           |
| maintainer                           | Maintainer                                                                  |
| open source                          | Open Source                                                                 |

## Typical fixes

- „Öffentliche Veröffentlichungen“ → „Veröffentlichte Modelle“
- „Evidenz und Erkenntnisse“ → „Belege und Befunde“
- „GRENZEN ZUERST“ → „GRENZEN IM BLICK“
- „Offen über Einschränkungen“ → „Offen mit Grenzen umgehen“
- „Es ist keine eingecheckte Messung verfügbar.“ → „Im Repository liegt keine Messung vor.“
- „Benutzerdefinierten Tokenizer mit 16.384 Token konstant gehalten“ →
  „Eigener Tokenizer mit 16.384 Tokens unverändert“
- „Die Arbeit richtet sich an Entwickler, Forschende, Studierende und Gestaltende, die …“ →
  „Die Arbeit richtet sich an Entwickler, Forschende und Studierende, die …“ (keep all audiences the
  English names; „builders“ → „alle, die selbst Systeme bauen“ if needed)
- „Diese Seite erkunden“ (navigation landmark) → „Auf dieser Seite“
- „Mit den Fragen fortfahren, die die nächste Forschungsphase bestimmen.“ →
  „Die Fragen, die die nächste Forschungsphase bestimmen.“
