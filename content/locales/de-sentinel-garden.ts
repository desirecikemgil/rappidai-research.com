// German copy for the Sentinel Garden documentation, the Sentinel model card and the
// research note of 4 November 2026. Keys are the exact English source strings.
export const deSentinelGardenTranslations: Readonly<Record<string, string>> = {
  "Sentinel Garden": "Sentinel Garden",
  Advisories: "Advisories",
  "Building Sentinel Garden": "Aufbau von Sentinel Garden",
  "From security advisories to accepted training records":
    "Von Security Advisories zu akzeptierten Trainingsbeispielen",
  "The earlier October 2026 Alpha target has passed. The foundation is selected and the data and training pipelines are built, but no model has been trained or evaluated yet; no revised release date is announced. Quantum Sentinel 1.0 remains a later milestone.":
    "Der frühere Alpha-Zieltermin Oktober 2026 ist verstrichen. Das Ausgangsmodell ist ausgewählt, die Daten- und Trainingspipelines sind gebaut, doch noch kein Modell wurde trainiert oder evaluiert. Ein neuer Veröffentlichungstermin ist nicht angekündigt. Quantum Sentinel 1.0 bleibt ein späterer Meilenstein.",
  "Base model: Qwen3.5-9B, selected": "Ausgangsmodell: Qwen3.5-9B, ausgewählt",
  "Quantum Sentinel-Alpha is built on Qwen3.5-9B, pinned to one immutable Hugging Face revision under the Apache-2.0 license. The selection of 4 November 2026 rests on expected capability for multi-step code reasoning, CWE discrimination and patch generation, not on a measured security advantage: neither Qwen3.5-9B nor Qwen3.5-4B has been evaluated yet, and the 4B/9B comparison remains an optional experiment rather than a gate.":
    "Quantum Sentinel-Alpha baut auf Qwen3.5-9B auf, festgelegt auf eine unveränderliche Hugging-Face-Revision unter der Apache-2.0-Lizenz. Die Auswahl vom 4. November 2026 beruht auf der erwarteten Leistungsfähigkeit bei mehrstufigem Code-Reasoning, CWE-Unterscheidung und Patch-Erzeugung, nicht auf einem gemessenen Sicherheitsvorteil: Weder Qwen3.5-9B noch Qwen3.5-4B wurde bisher evaluiert. Der Vergleich von 4B und 9B bleibt ein optionales Experiment und ist keine Voraussetzung mehr.",
  "Sentinel builds on an existing open-weight foundation rather than pretraining from scratch. The QLoRA pipeline is implemented and tested on CPU with a tiny model of the same architecture, but it has not been run on the real model. It trains only on governance-approved Sentinel Garden records, computes the loss on the reply alone and refuses to start while no record is approved. Preference training or domain adaptation will be added only if evaluations show measurable value.":
    "Sentinel baut auf einem vorhandenen Ausgangsmodell mit offenen Gewichten auf, statt ein eigenes Pretraining durchzuführen. Die QLoRA-Pipeline ist implementiert und auf der CPU mit einem winzigen Modell derselben Architektur getestet, wurde aber noch nicht mit dem echten Modell ausgeführt. Sie trainiert ausschließlich auf freigegebenen Beispielen aus Sentinel Garden, berechnet den Loss nur auf der Antwort und startet nicht, solange kein Beispiel freigegeben ist. Präferenztraining oder Domänenanpassung kommen nur hinzu, wenn Evaluationen einen messbaren Nutzen zeigen.",
  Method: "Methode",
  "QLoRA: 4-bit NF4 base, bf16 compute":
    "QLoRA: 4-Bit-NF4-Basis, Berechnung in bf16",
  Adapter: "Adapter",
  "LoRA rank 16, alpha 32, on 200 linear modules":
    "LoRA-Rang 16, Alpha 32, auf 200 linearen Modulen",
  "Trainable parameters": "Trainierbare Parameter",
  "40.1M (0.45 % of the model)": "40,1 Mio. (0,45 % des Modells)",
  "24 Gated DeltaNet and 8 full-attention layers":
    "24 Gated-DeltaNet- und 8 Full-Attention-Schichten",
  "Training runs": "Trainingsläufe",
  "None yet": "Noch keine",
  "The technical record of Quantum Sentinel-Alpha as reviewed on 4 November 2026. Values marked as planned or not run describe the prepared pipeline, not a trained model.":
    "Die technischen Angaben zu Quantum Sentinel-Alpha mit Stand vom 4. November 2026. Als geplant oder nicht ausgeführt gekennzeichnete Werte beschreiben die vorbereitete Pipeline, kein trainiertes Modell.",
  "Quantum Sentinel-Alpha, Quantum Sentinel 1 line":
    "Quantum Sentinel-Alpha, Linie Quantum Sentinel 1",
  Type: "Typ",
  "Security-specialized code model: LoRA adapter on a decoder-only base":
    "Auf Sicherheit spezialisiertes Code-Modell: LoRA-Adapter auf einem Decoder-only-Basismodell",
  "Base model": "Basismodell",
  "Qwen/Qwen3.5-9B, revision c202236, Apache-2.0":
    "Qwen/Qwen3.5-9B, Revision c202236, Apache-2.0",
  "Base architecture": "Architektur des Basismodells",
  "32 text layers: 24 Gated DeltaNet and 8 full-attention layers, about 8.95B text parameters":
    "32 Textschichten: 24 Gated-DeltaNet- und 8 Full-Attention-Schichten, etwa 8,95 Mrd. Textparameter",
  "Fine-tuning": "Fine-Tuning",
  "QLoRA, 4-bit NF4 with double quantization, bf16 compute; LoRA rank 16, alpha 32, dropout 0.05":
    "QLoRA, 4-Bit-NF4 mit doppelter Quantisierung, Berechnung in bf16; LoRA-Rang 16, Alpha 32, Dropout 0,05",
  "40,108,032 in 200 attention, DeltaNet and MLP projections":
    "40.108.032 in 200 Attention-, DeltaNet- und MLP-Projektionen",
  "Sentinel Garden seed v1: 2,322 accepted records from 911 repositories; 0 approved for training":
    "Sentinel Garden Seed v1: 2.322 akzeptierte Beispiele aus 911 Repositories; 0 für das Training freigegeben",
  "Prompt and output": "Prompt und Ausgabe",
  "Shared review prompt quickeval-review-v1; JSON finding with decision, CWE, lines and evidence":
    "Gemeinsamer Review-Prompt quickeval-review-v1; JSON-Befund mit Entscheidung, CWE, Zeilen und Belegen",
  "Evaluation plan": "Evaluationsplan",
  "QuickEval v1 (86 synthetic cases), coding-v1 (16 tasks) and the Garden validation split against the base model":
    "QuickEval v1 (86 synthetische Fälle), coding-v1 (16 Aufgaben) und der Validierungs-Split von Garden im Vergleich zum Basismodell",
  "None; the pipeline is tested on CPU only":
    "Keine; die Pipeline ist nur auf der CPU getestet",
  "Evaluation results": "Evaluationsergebnisse",
  "Weights and license": "Gewichte und Lizenz",
  "Not released; no artifact license":
    "Nicht veröffentlicht; keine Artefaktlizenz",
  "Training data: Sentinel Garden": "Trainingsdaten: Sentinel Garden",
  "Sentinel Garden turns real, GitHub-reviewed security advisories into training records: the vulnerable function before the upstream fix, the same function after the fix as a hard negative, and a caller of the vulnerable function with the callee withheld, where the right answer is to abstain. Every record keeps its source revision, license evidence and content hash. Training export is default-deny: nothing is used until a reviewer approves its source and repository.":
    "Sentinel Garden macht aus echten, von GitHub geprüften Security Advisories Trainingsbeispiele: die verwundbare Funktion vor dem Upstream-Fix, dieselbe Funktion nach dem Fix als Hard Negative und einen Aufrufer der verwundbaren Funktion ohne die aufgerufene Funktion, bei dem die richtige Antwort eine Enthaltung ist. Jedes Beispiel behält seine Quellrevision, die Lizenznachweise und einen Inhalts-Hash. Der Trainingsexport ist standardmäßig gesperrt: Nichts wird verwendet, bevor eine prüfende Person Quelle und Repository freigegeben hat.",
  "Advisories inspected": "Geprüfte Advisories",
  "19,959 (PyPI, npm, Go)": "19.959 (PyPI, npm, Go)",
  "Accepted records": "Akzeptierte Beispiele",
  Composition: "Zusammensetzung",
  "1,053 vulnerable · 960 hard negatives · 309 abstentions":
    "1.053 verwundbar · 960 Hard Negatives · 309 Enthaltungen",
  Coverage: "Abdeckung",
  "947 vulnerable/fixed pairs · 911 repositories · 161 CWEs":
    "947 Paare aus verwundbarer und korrigierter Funktion · 911 Repositories · 161 CWEs",
  "Training-approved": "Für das Training freigegeben",
  "0 (rights review pending)": "0 (Rechteprüfung ausstehend)",
  "Model Card": "Model Card",
  "Evaluation Card": "Evaluation Card",
  "Alpha is the first real security-SFT milestone, before Beta, Release Candidate and the later stable Quantum Sentinel 1.0. Each phase below carries its state in the reviewed repository; a built pipeline is not a completed training run.":
    "Alpha ist der erste echte Meilenstein für Security-SFT, vor Beta, Release Candidate und dem späteren stabilen Quantum Sentinel 1.0. Jede Phase zeigt ihren Stand im geprüften Repository; eine gebaute Pipeline ist kein abgeschlossener Trainingslauf.",
  Selected: "Ausgewählt",
  Baseline: "Baseline",
  "Prepared, not run": "Vorbereitet, nicht ausgeführt",
  "Built, rights review pending": "Gebaut, Rechteprüfung ausstehend",
  "Pipeline ready, not run": "Pipeline bereit, nicht ausgeführt",
  "Alpha is in development. Capabilities, architecture and release artifacts described here are planned and may change with evaluation. No model has been trained or evaluated, and no benchmark results or validated hardware requirements are announced.":
    "Alpha befindet sich in Entwicklung. Die hier beschriebenen Fähigkeiten, die Architektur und die Release-Artefakte sind geplant und können sich durch Evaluationen ändern. Es wurde kein Modell trainiert oder evaluiert, und es sind weder Benchmark-Ergebnisse noch validierte Hardwareanforderungen angekündigt.",
  "Selected 4 November 2026 on expected capability; not yet evaluated":
    "Am 4. November 2026 nach erwarteter Leistungsfähigkeit ausgewählt; noch nicht evaluiert",
  "Sentinel Garden: 2,322 accepted records, 0 training-approved":
    "Sentinel Garden: 2.322 akzeptierte Beispiele, 0 für das Training freigegeben",
  "Foundation selected · not yet trained":
    "Ausgangsmodell ausgewählt · noch nicht trainiert",
  "Sentinel Garden: how the training data is built":
    "Sentinel Garden: wie die Trainingsdaten entstehen",
  "Sentinel Garden is the data pipeline for Quantum Sentinel-Alpha. It reads real, GitHub-reviewed security advisories, resolves each one to the upstream commit that fixed it and turns single-function fixes into training records. Every stage is deterministic and re-runnable; nothing is approved for training by default.":
    "Sentinel Garden ist die Datenpipeline für Quantum Sentinel-Alpha. Sie liest echte, von GitHub geprüfte Security Advisories, ordnet jedem den Upstream-Commit zu, der die Schwachstelle behoben hat, und macht aus Fixes in einer einzigen Funktion Trainingsbeispiele. Jede Stufe ist deterministisch und wiederholbar; standardmäßig ist nichts für das Training freigegeben.",
  "Pipeline architecture": "Aufbau der Pipeline",
  "Six stages, each a command of the Sentinel repository. Network access is needed only to discover advisories, fetch upstream commits and look up license or advisory metadata; curation, checks and exports run offline.":
    "Sechs Stufen, jede ein Befehl im Sentinel-Repository. Netzwerkzugriff ist nur nötig, um Advisories zu finden, Upstream-Commits zu laden und Lizenz- oder Advisory-Metadaten abzufragen; Kuratierung, Prüfungen und Exporte laufen offline.",
  Discover: "Erfassen",
  "Reads the OSV export for PyPI, npm and Go and keeps GitHub-reviewed GHSA advisories with one or two localizable CWEs and exactly one upstream fix commit. Advisories are visited in salted-hash order, at most four candidates per repository, and the candidate list is frozen.":
    "Liest den OSV-Export für PyPI, npm und Go und behält von GitHub geprüfte GHSA-Advisories mit ein oder zwei lokalisierbaren CWEs und genau einem Upstream-Fix-Commit. Die Advisories werden in der Reihenfolge eines gesalzenen Hashs durchlaufen, höchstens vier Kandidaten pro Repository, und die Kandidatenliste wird eingefroren.",
  Build: "Bauen",
  "Fetches the fix commit and its parent with a partial, shallow clone and keeps fixes whose logic change is confined to one function. Function boundaries, literals, imports and calls come from parse trees: Python's ast module and pinned tree-sitter grammars for Go, JavaScript and TypeScript.":
    "Lädt den Fix-Commit und seinen Vorgänger über einen partiellen, flachen Clone und behält Fixes, deren Logikänderung auf eine Funktion beschränkt ist. Funktionsgrenzen, Literale, Importe und Aufrufe stammen aus Syntaxbäumen: aus Pythons ast-Modul und aus fest versionierten tree-sitter-Grammatiken für Go, JavaScript und TypeScript.",
  Curate: "Kuratieren",
  "Checks every record: the upstream patch must turn the vulnerable excerpt exactly into the fixed one, targets must round-trip through the evaluation parser, and exact duplicates, near duplicates, label conflicts and overlap with evaluation cases are rejected. Assigns the frozen repository-level split.":
    "Prüft jedes Beispiel: Der Upstream-Patch muss den verwundbaren Ausschnitt exakt in den korrigierten überführen, Zielwerte müssen den Evaluationsparser verlustfrei durchlaufen, und exakte Duplikate, Beinahe-Duplikate, widersprüchliche Labels sowie Überschneidungen mit Evaluationsfällen werden verworfen. Weist den eingefrorenen Split auf Repository-Ebene zu.",
  Audit: "Auditieren",
  "Checks each fix group against outside evidence: later advisories of the same package that change the same function again, advisories that call the fix incomplete, unreadable later fixes, broad localization spans and invalid abstentions. A stratified sample is reviewed by hand.":
    "Prüft jede Fix-Gruppe anhand externer Belege: spätere Advisories desselben Pakets, die dieselbe Funktion erneut ändern, Advisories, die den Fix als unvollständig bezeichnen, nicht lesbare spätere Fixes, zu breite Lokalisierungsbereiche und ungültige Enthaltungen. Eine geschichtete Stichprobe wird von Hand geprüft.",
  Review: "Prüfen",
  "Collects license evidence per repository: the license file at every used revision with its sha256, the registry license from deps.dev and the open questions. Sorts repositories into review tiers and writes approval templates that do not load until a reviewer completes them.":
    "Sammelt Lizenznachweise pro Repository: die Lizenzdatei jeder verwendeten Revision mit ihrem sha256, die Registry-Lizenz laut deps.dev und die offenen Fragen. Ordnet die Repositories Prüfstufen zu und erzeugt Freigabevorlagen, die erst geladen werden, wenn eine prüfende Person sie ausgefüllt hat.",
  "Export and verify": "Exportieren und verifizieren",
  "Exports only records whose source and repository are approved, with SHA256SUMS. verify and reconstruct rebuild every record from the pinned upstream commits and compare content hashes; a missing upstream is reported, never substituted.":
    "Exportiert nur Beispiele, deren Quelle und Repository freigegeben sind, mit SHA256SUMS. verify und reconstruct bauen jedes Beispiel aus den festgeschriebenen Upstream-Commits neu und vergleichen die Inhalts-Hashes; ein fehlendes Upstream-Repository wird gemeldet, nie ersetzt.",
  "train.chat.jsonl (empty until approval)":
    "train.chat.jsonl (leer bis zur Freigabe)",
  "From advisories to approved records":
    "Von Advisories zu freigegebenen Beispielen",
  "Bars are drawn to scale. Most advisories have no single resolvable fix commit, and most fixes touch more than one function; only fixes confined to one function become records. Approval is the last step, and it has not happened yet.":
    "Die Balken sind maßstabsgetreu. Die meisten Advisories haben keinen eindeutig auflösbaren Fix-Commit, und die meisten Fixes betreffen mehr als eine Funktion; nur Fixes in einer einzigen Funktion werden zu Beispielen. Die Freigabe ist der letzte Schritt und ist noch nicht erfolgt.",
  "GHSA advisories inspected": "Geprüfte GHSA-Advisories",
  "Candidates with one fix commit": "Kandidaten mit einem Fix-Commit",
  "Fixes confined to one function": "Fixes in einer einzigen Funktion",
  "Records built": "Gebaute Beispiele",
  "Records accepted after checks and audit":
    "Nach Prüfungen und Audit akzeptiert",
  "Records approved for training": "Für das Training freigegeben",
  "Accepted records by language and label":
    "Akzeptierte Beispiele nach Sprache und Label",
  "Vulnerable functions are labelled with a finding, their fixed versions are hard negatives for the advisory's weakness, and abstention records show a caller whose correctness depends on a withheld callee.":
    "Verwundbare Funktionen tragen einen Befund als Label, ihre korrigierten Fassungen sind Hard Negatives für die Schwachstelle des Advisorys, und Enthaltungsbeispiele zeigen einen Aufrufer, dessen Korrektheit von einer zurückgehaltenen Funktion abhängt.",
  "Hard negative": "Hard Negative",
  Abstention: "Enthaltung",
  Total: "Gesamt",
  Split: "Split",
  Records: "Beispiele",
  Repositories: "Repositories",
  "Used for": "Verwendung",
  "Training, after approval": "Training, nach Freigabe",
  "Training-time validation, after approval":
    "Validierung während des Trainings, nach Freigabe",
  "Evaluation only; never trained on": "Nur Evaluation; nie trainiert",
  "Fixes after the 2026-07-01 cutoff; never trained on":
    "Fixes nach dem Stichtag 1. Juli 2026; nie trainiert",
  "What the audit removed": "Was das Audit entfernt hat",
  "Exclusions of the 4 November 2026 run over 1,157 fix groups. Records are only ever excluded, never relabelled; an excluded vulnerable record takes its hard negative and abstention with it.":
    "Ausschlüsse des Laufs vom 4. November 2026 über 1.157 Fix-Gruppen. Beispiele werden nur ausgeschlossen, nie umgelabelt; ein ausgeschlossenes verwundbares Beispiel nimmt sein Hard Negative und seine Enthaltung mit.",
  Reason: "Grund",
  Excluded: "Ausgeschlossen",
  "Later fix changes the same function":
    "Späterer Fix ändert dieselbe Funktion",
  "126 hard negatives": "126 Hard Negatives",
  "Another advisory of the package fixes the same function again; the fixed version is not safe.":
    "Ein weiteres Advisory des Pakets behebt dieselbe Funktion erneut; die korrigierte Fassung ist nicht sicher.",
  "Broad localization span": "Zu breiter Lokalisierungsbereich",
  "89 groups": "89 Gruppen",
  "More than 12 lines and over 40 % of the function; every broad span in the manual sample was imprecise.":
    "Mehr als 12 Zeilen und über 40 % der Funktion; jeder breite Bereich in der manuellen Stichprobe war ungenau.",
  "Fix reported as incomplete": "Fix als unvollständig gemeldet",
  "47 hard negatives": "47 Hard Negatives",
  "A later advisory calls this fix incomplete or bypassable.":
    "Ein späteres Advisory nennt diesen Fix unvollständig oder umgehbar.",
  "Later fix cannot be read": "Späterer Fix nicht lesbar",
  "10 hard negatives": "10 Hard Negatives",
  "The referenced commit is not in the upstream repository, so safety cannot be verified.":
    "Der referenzierte Commit fehlt im Upstream-Repository, daher lässt sich die Sicherheit nicht prüfen.",
  "Manual review": "Manuelle Prüfung",
  "10 records": "10 Beispiele",
  "Imprecise spans and one advisory that reports a bypass of exactly this fix.":
    "Ungenaue Bereiche und ein Advisory, das eine Umgehung genau dieses Fixes meldet.",
  "Abstention passes only constants": "Enthaltung übergibt nur Konstanten",
  "1 abstention": "1 Enthaltung",
  "The caller cannot reach the weakness with attacker-influenced data.":
    "Der Aufrufer kann die Schwachstelle nicht mit von Angreifern beeinflussten Daten erreichen.",
  "Manual sample: error rates for the exported data":
    "Manuelle Stichprobe: Fehlerraten der exportierten Daten",
  "A stratified sample of 44 items (32 vulnerable/fixed pairs and 12 abstentions), drawn per language and CWE family and reviewed by the implementing AI engineer, not by an authorized reviewer. Rates count the sampled items that survive the automated exclusions. With so few items, plan with the upper bound.":
    "Eine geschichtete Stichprobe von 44 Einträgen (32 Paare aus verwundbarer und korrigierter Funktion sowie 12 Enthaltungen), gezogen nach Sprache und CWE-Familie und geprüft vom umsetzenden KI-Engineer, nicht von einer autorisierten prüfenden Person. Die Raten zählen die Stichprobeneinträge, die die automatischen Ausschlüsse überstehen. Bei so wenigen Einträgen sollten Sie mit der Obergrenze planen.",
  Errors: "Fehler",
  "Wilson 95 % interval": "Wilson-95-%-Intervall",
  "Wrong label": "Falsches Label",
  "Advisory does not match the code": "Advisory passt nicht zum Code",
  "Imprecise localization": "Ungenaue Lokalisierung",
  "Hard negative not safe": "Hard Negative nicht sicher",
  "Invalid abstention": "Ungültige Enthaltung",
  "Rights review queue": "Warteschlange der Rechteprüfung",
  "Repositories with train or validation records, sorted by the license evidence the tooling found. A tier is a recommendation for the order of review, not an approval.":
    "Repositories mit Trainings- oder Validierungsbeispielen, sortiert nach den Lizenznachweisen, die das Werkzeug gefunden hat. Eine Stufe ist eine Empfehlung für die Prüfreihenfolge, keine Freigabe.",
  Tier: "Stufe",
  "Permissive license, consistent across revisions and with the package registry":
    "Permissive Lizenz, einheitlich über alle Revisionen und deckungsgleich mit der Paket-Registry",
  "Permissive license with an open question":
    "Permissive Lizenz mit offener Frage",
  "Weak copyleft": "Schwaches Copyleft",
  "Strong copyleft, unknown or no license file":
    "Starkes Copyleft, unbekannte oder fehlende Lizenzdatei",
  "Sentinel Garden design": "Design von Sentinel Garden",
  "Dataset report": "Datensatzbericht",
  "Audit report": "Auditbericht",
  "Manual review verdicts": "Ergebnisse der manuellen Prüfung",
  "Rights review workflow": "Ablauf der Rechteprüfung",
  "Review queue": "Prüfwarteschlange",
  "Building a Vulnerability-Fix Dataset You Can Check":
    "Ein Datensatz aus Schwachstellen-Fixes, den man prüfen kann",
  "What it took to turn 19,959 security advisories into 2,322 training records for Quantum Sentinel-Alpha, which errors code review found on the way and why none of the records is approved for training yet.":
    "Was nötig war, um aus 19.959 Security Advisories 2.322 Trainingsbeispiele für Quantum Sentinel-Alpha zu machen, welche Fehler das Code-Review dabei gefunden hat und warum noch keines der Beispiele für das Training freigegeben ist.",
  "AI security / training data": "KI-Sicherheit / Trainingsdaten",
  "4 November 2026": "4. November 2026",
  "This note is an engineering report on the Sentinel Garden data pipeline and the Sentinel training pipeline at repository revision 3c46606. It reports dataset counts, audit results and code-review findings. No model has been trained or evaluated, no record is approved for training, and the manual quality sample was reviewed by the implementing AI engineering assistant rather than an authorized reviewer. Code examples are simplified and written for this note.":
    "Diese Notiz ist ein technischer Bericht über die Datenpipeline Sentinel Garden und die Trainingspipeline von Sentinel auf Repository-Revision 3c46606. Sie nennt Datensatzzahlen, Auditergebnisse und Befunde aus dem Code-Review. Es wurde kein Modell trainiert oder evaluiert, kein Beispiel ist für das Training freigegeben, und die manuelle Qualitätsstichprobe hat der umsetzende KI-Engineering-Assistent geprüft, nicht eine autorisierte prüfende Person. Die Codebeispiele sind vereinfacht und für diese Notiz geschrieben.",
  "Parser module": "Parser-Modul",
  "Why upstream fixes make good training data":
    "Warum Upstream-Fixes gute Trainingsdaten sind",
  "A security model for code has to learn two things at once: what a vulnerability looks like, and what code looks like that merely resembles one. The second is the harder half. Our earlier research note on false positives argued that hard negatives, safe code that looks risky, matter as much as vulnerable examples.":
    "Ein Sicherheitsmodell für Code muss zwei Dinge zugleich lernen: wie eine Schwachstelle aussieht und wie Code aussieht, der einer Schwachstelle nur ähnelt. Der zweite Teil ist der schwierigere. Unsere frühere Forschungsnotiz zu Fehlalarmen hat argumentiert, dass Hard Negatives, also sicherer Code, der riskant wirkt, ebenso wichtig sind wie verwundbare Beispiele.",
  "An upstream security fix supplies both from the same place. A GitHub-reviewed advisory names the weakness and its CWE and links the commit that fixed it. The function before that commit is a real vulnerable example, the same function after it is a hard negative for that weakness, and the lines the fix changed show where the problem was. Nothing is synthetic, and every label points back to a public, reviewed record.":
    "Ein Upstream-Sicherheitsfix liefert beides aus derselben Quelle. Ein von GitHub geprüftes Advisory benennt die Schwachstelle und ihre CWE und verlinkt den Commit, der sie behoben hat. Die Funktion vor diesem Commit ist ein echtes verwundbares Beispiel, dieselbe Funktion danach ein Hard Negative für diese Schwachstelle, und die vom Fix geänderten Zeilen zeigen, wo das Problem lag. Nichts ist synthetisch, und jedes Label verweist auf einen öffentlichen, geprüften Eintrag.",
  "Sentinel Garden builds three kinds of record from one fix that is confined to a single function. Table 1 shows how they are labelled.":
    "Sentinel Garden baut aus einem Fix, der auf eine einzige Funktion beschränkt ist, drei Arten von Beispielen. Tabelle 1 zeigt ihre Labels.",
  "Three records from one upstream fix":
    "Drei Beispiele aus einem Upstream-Fix",
  "Abstention records teach the model to say that it cannot decide when the decisive code is not visible, instead of guessing.":
    "Enthaltungsbeispiele bringen dem Modell bei, offen zu sagen, dass es nicht entscheiden kann, wenn der entscheidende Code nicht sichtbar ist, statt zu raten.",
  Record: "Beispiel",
  "Code shown": "Gezeigter Code",
  "Expected answer": "Erwartete Antwort",
  "The function before the fix": "Die Funktion vor dem Fix",
  "Finding with the advisory's CWE and the changed lines":
    "Befund mit der CWE des Advisorys und den geänderten Zeilen",
  "The same function after the fix": "Dieselbe Funktion nach dem Fix",
  "No finding for that weakness": "Kein Befund für diese Schwachstelle",
  "A caller of the vulnerable function, without the callee":
    "Ein Aufrufer der verwundbaren Funktion, ohne die aufgerufene Funktion",
  "Abstain: safety depends on withheld code":
    "Enthaltung: Die Sicherheit hängt von zurückgehaltenem Code ab",
  "From 19,959 advisories to 2,322 records":
    "Von 19.959 Advisories zu 2.322 Beispielen",
  "Discovery read every GitHub-reviewed GHSA advisory of the 1 November 2026 OSV snapshot for PyPI, npm and Go: 19,959 advisories. 4,830 of them name exactly one upstream fix commit and one or two CWEs that can be localized in code; at most four candidates per repository keep large projects from dominating.":
    "Die Erfassung hat jedes von GitHub geprüfte GHSA-Advisory im OSV-Snapshot vom 1. November 2026 für PyPI, npm und Go gelesen: 19.959 Advisories. 4.830 davon nennen genau einen Upstream-Fix-Commit und ein oder zwei CWEs, die sich im Code lokalisieren lassen. Höchstens vier Kandidaten pro Repository verhindern, dass große Projekte den Datensatz dominieren.",
  "Most of the remaining loss happens at the one-function rule. A label only means something if the change it describes sits in the code the model is shown, so fixes that touch several functions, add files or change code outside any function are rejected rather than cut down. 1,206 fixes passed. They produced 2,773 records, of which 2,322 survived every check and the audit.":
    "Der größte weitere Verlust entsteht durch die Ein-Funktions-Regel. Ein Label ist nur aussagekräftig, wenn die beschriebene Änderung in dem Code liegt, den das Modell sieht. Fixes, die mehrere Funktionen betreffen, Dateien hinzufügen oder Code außerhalb jeder Funktion ändern, werden deshalb verworfen statt gekürzt. 1.206 Fixes kamen durch. Daraus entstanden 2.773 Beispiele, von denen 2.322 alle Prüfungen und das Audit bestanden.",
  "Why candidate fixes were rejected": "Warum Kandidaten verworfen wurden",
  "Outcomes of the build stage for 4,830 candidates. Each candidate is counted once, under the first rule it failed.":
    "Ergebnisse der Bau-Stufe für 4.830 Kandidaten. Jeder Kandidat zählt einmal, unter der ersten Regel, an der er gescheitert ist.",
  Outcome: "Ergebnis",
  Candidates: "Kandidaten",
  "Accepted: change confined to one function":
    "Akzeptiert: Änderung auf eine Funktion beschränkt",
  "Change outside any function": "Änderung außerhalb jeder Funktion",
  "More than one function changed": "Mehr als eine Funktion geändert",
  "No source change in the ecosystem's language":
    "Keine Quelltextänderung in der Sprache des Ökosystems",
  "Source file added or deleted": "Quelldatei hinzugefügt oder gelöscht",
  "Too many source files": "Zu viele Quelldateien",
  "New top-level code without a changed function":
    "Neuer Code auf oberster Ebene ohne geänderte Funktion",
  "Other rules (size limits, unresolvable commits and more)":
    "Weitere Regeln (Größenlimits, nicht auflösbare Commits u. a.)",
  "What code review found": "Was das Code-Review gefunden hat",
  "The pipeline was built in three pull requests, each reviewed by an automated code reviewer until a review came back without findings. Across the three, the reviewer raised 33 findings in about twenty rounds. Every finding was reproduced, fixed and covered by a regression test before merge. Most were not one-off bugs but members of a few recurring classes.":
    "Die Pipeline entstand in drei Pull Requests. Jeder wurde von einem automatischen Code-Reviewer geprüft, bis ein Review ohne Befund zurückkam. Über alle drei hinweg meldete der Reviewer in etwa zwanzig Runden 33 Befunde. Jeder Befund wurde reproduziert, behoben und vor dem Merge durch einen Regressionstest abgedeckt. Die meisten waren keine Einzelfehler, sondern gehörten zu wenigen wiederkehrenden Klassen.",
  "Reading code without a parser": "Code lesen ohne Parser",
  "Deciding whether a fix changed logic or only formatting requires normalizing code: ignoring comments and layout while keeping everything that changes behaviour. The first version did this for Go, JavaScript and TypeScript with a hand-written scanner. Review after review found a construct it read wrongly: whitespace inside a string or regular expression, a regular expression directly after an if statement, adjacent operators, a line break that ends a statement through automatic semicolon insertion, a closing brace inside a raw string, text inside JSX. Each mistake had the same effect: a real security fix looked cosmetic and was dropped, or a function boundary was wrong and the label pointed at the wrong code.":
    "Ob ein Fix die Logik oder nur die Formatierung ändert, lässt sich nur durch Normalisieren des Codes entscheiden: Kommentare und Layout werden ignoriert, alles Verhaltensrelevante bleibt erhalten. Die erste Version erledigte das für Go, JavaScript und TypeScript mit einem handgeschriebenen Scanner. Review um Review fand ein Konstrukt, das er falsch las: Leerzeichen in einem String oder regulären Ausdruck, ein regulärer Ausdruck direkt nach einer if-Anweisung, benachbarte Operatoren, ein Zeilenumbruch, der eine Anweisung durch automatisches Einfügen eines Semikolons beendet, eine schließende Klammer in einem Raw-String, Text in JSX. Jeder dieser Fehler wirkte gleich: Ein echter Sicherheitsfix sah kosmetisch aus und wurde verworfen, oder eine Funktionsgrenze war falsch und das Label zeigte auf den falschen Code.",
  "Which function does a call reach": "Welche Funktion ein Aufruf erreicht",
  "An abstention record claims that a caller depends on the vulnerable function. That claim was wrong more often than expected. A name inside a string or a docstring is not a call. A local variable can shadow the function. obj.list_orders() may call a different method of another object, and self.list_orders() in another class reaches that class's method. A nested function is only visible inside the function that defines it. Fixing these removed 18 abstention records from the first seed of 881 records: their call was only a mention, went to another object or could not be shown to reach the callee.":
    "Ein Enthaltungsbeispiel behauptet, dass ein Aufrufer von der verwundbaren Funktion abhängt. Diese Behauptung war öfter falsch als erwartet. Ein Name in einem String oder Docstring ist kein Aufruf. Eine lokale Variable kann die Funktion verdecken. obj.list_orders() ruft unter Umständen eine andere Methode eines anderen Objekts auf, und self.list_orders() in einer anderen Klasse erreicht die Methode dieser Klasse. Eine verschachtelte Funktion ist nur innerhalb der Funktion sichtbar, die sie definiert. Die Korrekturen entfernten 18 Enthaltungsbeispiele aus dem ersten Seed von 881 Beispielen: Ihr Aufruf war nur eine Erwähnung, ging an ein anderes Objekt oder erreichte die aufgerufene Funktion nicht nachweislich.",
  "Changes outside the function": "Änderungen außerhalb der Funktion",
  "A fix can change behaviour without touching the function at all, for example by importing a different template package under the same name. Such re-bound imports are now detected and the fix is rejected instead of being attributed to an unrelated function. One real case in the data replaced a text template engine with its HTML-escaping counterpart this way.":
    "Ein Fix kann das Verhalten ändern, ohne die Funktion überhaupt anzufassen, etwa indem er unter demselben Namen ein anderes Template-Paket importiert. Solche neu gebundenen Importe werden jetzt erkannt, und der Fix wird verworfen, statt einer unbeteiligten Funktion zugeschrieben zu werden. Ein echter Fall in den Daten ersetzte auf diese Weise eine Text-Template-Engine durch ihr HTML-escapendes Gegenstück.",
  "Checks that silently skipped work":
    "Prüfungen, die stillschweigend Arbeit übersprangen",
  "Two checks reported success without doing their job. The near-duplicate search skipped every shingle shared by more than 64 records, so large families of copied functions were never compared and contradictory labels could pass; it now uses exact prefix filtering, tested against brute force. And a failed lookup of a later fix counted as a clean check; it now marks the check incomplete.":
    "Zwei Prüfungen meldeten Erfolg, ohne ihre Aufgabe zu erfüllen. Die Suche nach Beinahe-Duplikaten übersprang jede Shingle, die mehr als 64 Beispiele teilten. Große Familien kopierter Funktionen wurden so nie verglichen, und widersprüchliche Labels konnten durchrutschen; jetzt nutzt die Suche exaktes Präfix-Filtering, getestet gegen eine Brute-Force-Suche. Außerdem zählte eine fehlgeschlagene Abfrage eines späteren Fixes als bestandene Prüfung; jetzt wird die Prüfung als unvollständig markiert.",
  "A security fix the scanner saw as cosmetic":
    "Ein Sicherheitsfix, den der Scanner für kosmetisch hielt",
  "Simplified example written for this note. The fix removes the space from the allowed characters of a validation pattern.":
    "Vereinfachtes Beispiel, eigens für diese Notiz geschrieben. Der Fix entfernt das Leerzeichen aus den erlaubten Zeichen eines Validierungsmusters.",
  "Before the fix": "Vor dem Fix",
  "After the closing parenthesis of an if condition, a slash starts a regular expression. The scanner read it as a division and split the pattern into separate tokens, dropping the space.":
    "Nach der schließenden Klammer einer if-Bedingung beginnt ein Schrägstrich einen regulären Ausdruck. Der Scanner las ihn als Division, zerlegte das Muster in einzelne Tokens und verlor dabei das Leerzeichen.",
  "After the fix": "Nach dem Fix",
  Fixed: "Behoben",
  "Without the space, both versions produced identical tokens, so the fix was rejected as a formatting change. A parser keeps the regular expression as one exact token and the change is visible.":
    "Ohne das Leerzeichen ergaben beide Fassungen identische Tokens, deshalb wurde der Fix als reine Formatierungsänderung verworfen. Ein Parser behält den regulären Ausdruck als ein exaktes Token, und die Änderung wird sichtbar.",
  "Replacing the scanner with parse trees": "Syntaxbäume statt Scanner",
  "After thirteen review rounds on the first pull request, the pattern was clear: each fix closed one hole in a scanner that tried to re-derive the grammar of three languages. The durable fix was to stop doing that. Go, JavaScript and TypeScript are now read with tree-sitter grammars pinned to exact versions; Python already used its own ast and tokenize modules. Literals, comments, normalization tokens, function boundaries, calls, imports and local names all come from the same parse tree.":
    "Nach dreizehn Review-Runden am ersten Pull Request war das Muster klar: Jeder Fix schloss eine Lücke in einem Scanner, der die Grammatik dreier Sprachen nachzubauen versuchte. Die dauerhafte Lösung war, damit aufzuhören. Go, JavaScript und TypeScript werden jetzt mit tree-sitter-Grammatiken gelesen, die auf exakte Versionen festgelegt sind; Python nutzte bereits seine eigenen Module ast und tokenize. Literale, Kommentare, Normalisierungs-Tokens, Funktionsgrenzen, Aufrufe, Importe und lokale Namen stammen alle aus demselben Syntaxbaum.",
  "Before switching, the old and new readers were compared on all 548 JavaScript, TypeScript and Go files in the seed. Go showed no difference. Every JavaScript and TypeScript difference was a correction: named function expressions, multi-line and require('m').x imports, an import hidden behind a byte-order mark and functions the scanner had missed entirely. The grammar versions are recorded with the dataset, and the consistency check fails when the installed versions differ.":
    "Vor dem Wechsel wurden alter und neuer Leser an allen 548 JavaScript-, TypeScript- und Go-Dateien des Seeds verglichen. Bei Go gab es keinen Unterschied. Jeder Unterschied bei JavaScript und TypeScript war eine Korrektur: benannte Funktionsausdrücke, mehrzeilige Importe und Importe der Form require('m').x, ein hinter einer Byte-Order-Mark verborgener Import und Funktionen, die der Scanner ganz übersehen hatte. Die Grammatikversionen werden mit dem Datensatz festgehalten, und die Konsistenzprüfung schlägt fehl, wenn die installierten Versionen abweichen.",
  "Evidence beyond the diff": "Belege jenseits des Diffs",
  "A fix commit shows that a function changed. It does not show that the new version is safe. Sometimes the same function is fixed again a month later, or a later advisory says the first fix was incomplete. The audit therefore looks up every other OSV advisory of the same package and follows its fix commits.":
    "Ein Fix-Commit zeigt, dass sich eine Funktion geändert hat. Er zeigt nicht, dass die neue Fassung sicher ist. Manchmal wird dieselbe Funktion einen Monat später erneut behoben, oder ein späteres Advisory erklärt den ersten Fix für unvollständig. Das Audit sucht deshalb alle anderen OSV-Advisories desselben Pakets heraus und folgt ihren Fix-Commits.",
  "One example from the manual sample shows why this matters. An advisory described how newlines in metadata values could inject arguments into a downstream tool, as a bypass of an earlier fix that had only sanitized the keys. The commit it referenced was that earlier key fix. The vulnerable label was right, but the fixed version was still vulnerable to exactly the weakness described, so its hard negative was excluded.":
    "Ein Beispiel aus der manuellen Stichprobe zeigt, warum das wichtig ist. Ein Advisory beschrieb, wie Zeilenumbrüche in Metadatenwerten Argumente in ein nachgelagertes Werkzeug einschleusen konnten, als Umgehung eines früheren Fixes, der nur die Schlüssel bereinigt hatte. Der referenzierte Commit war genau dieser frühere Fix für die Schlüssel. Das Label „verwundbar“ stimmte, doch die korrigierte Fassung war für genau die beschriebene Schwachstelle weiterhin anfällig, deshalb wurde ihr Hard Negative ausgeschlossen.",
  "Exclusions from the audit": "Ausschlüsse durch das Audit",
  "Run over 1,157 fix groups. Records are excluded, never relabelled; an excluded vulnerable record takes its hard negative and abstention with it.":
    "Lauf über 1.157 Fix-Gruppen. Beispiele werden ausgeschlossen, nie umgelabelt; ein ausgeschlossenes verwundbares Beispiel nimmt sein Hard Negative und seine Enthaltung mit.",
  "Same function fixed again by a later advisory":
    "Dieselbe Funktion durch ein späteres Advisory erneut behoben",
  "Later fix commit cannot be read": "Späterer Fix-Commit nicht lesbar",
  "Abstention whose caller passes only constants":
    "Enthaltung, deren Aufrufer nur Konstanten übergibt",
  "Broad spans became an exclusion rule because of the manual sample: all three sampled pairs whose localization covered more than 12 lines and over 40 % of the function were imprecise, typically because a rename or a docstring edit was committed together with the fix. Among the 29 sampled pairs with narrower spans, one was imprecise.":
    "Zu breite Bereiche wurden wegen der manuellen Stichprobe zur Ausschlussregel: Alle drei Paare in der Stichprobe, deren Lokalisierung mehr als 12 Zeilen und über 40 % der Funktion umfasste, waren ungenau, meist weil eine Umbenennung oder eine Docstring-Änderung zusammen mit dem Fix committet wurde. Unter den 29 Paaren der Stichprobe mit engeren Bereichen war eines ungenau.",
  "Measuring what remains": "Was verbleibt, messen",
  "Automated checks cannot confirm a label. A stratified sample of 44 items, 32 vulnerable/fixed pairs and 12 abstentions drawn per language and CWE family, was read by hand against the advisory, the fix and the excerpt. The reviewer was the AI engineering assistant that built the pipeline; this is a quality signal, not an authorized review.":
    "Automatische Prüfungen können ein Label nicht bestätigen. Eine geschichtete Stichprobe von 44 Einträgen, 32 Paaren aus verwundbarer und korrigierter Funktion und 12 Enthaltungen, gezogen nach Sprache und CWE-Familie, wurde von Hand mit dem Advisory, dem Fix und dem Ausschnitt abgeglichen. Geprüft hat der KI-Engineering-Assistent, der die Pipeline gebaut hat; das ist ein Qualitätssignal, keine autorisierte Prüfung.",
  "Table 4 counts the sampled items that survive the automated exclusions, which is the estimate for the records that would be exported. With so few items, the intervals are wide; the upper bounds of about 17 % for localization and hard-negative safety are the numbers to plan with until a larger, human review exists.":
    "Tabelle 4 zählt die Stichprobeneinträge, die die automatischen Ausschlüsse überstehen. Das ist die Schätzung für die Beispiele, die exportiert würden. Bei so wenigen Einträgen sind die Intervalle breit; die Obergrenzen von etwa 17 % für Lokalisierung und Sicherheit der Hard Negatives sind die Werte, mit denen bis zu einer größeren menschlichen Prüfung geplant werden sollte.",
  "Table 4": "Tabelle 4",
  "Manual sample after the automated exclusions":
    "Manuelle Stichprobe nach den automatischen Ausschlüssen",
  "Wilson 95 % score intervals.": "Wilson-Score-Intervalle (95 %).",
  "0 of 29": "0 von 29",
  "1 of 29": "1 von 29",
  "1 of 28": "1 von 28",
  "0 of 11": "0 von 11",
  "Failures that were not about labels":
    "Fehler, die nichts mit Labels zu tun hatten",
  "Some of the most expensive errors had nothing to do with security semantics.":
    "Einige der teuersten Fehler hatten nichts mit Sicherheitssemantik zu tun.",
  "Disk: fetching single commits with a blob-less partial clone still stored a full tree per commit and filled 29 GB for the first 975 repositories. Switching to tree-less fetches and replacing a presence check that silently downloaded entire histories brought the cache for those repositories to about 0.5 GB.":
    "Speicherplatz: Das Laden einzelner Commits über einen partiellen Clone ohne Blobs speicherte trotzdem pro Commit einen vollständigen Baum und belegte für die ersten 975 Repositories 29 GB. Der Wechsel zu Fetches ohne Bäume und der Ersatz einer Existenzprüfung, die stillschweigend ganze Historien herunterlud, verkleinerten den Cache für diese Repositories auf etwa 0,5 GB.",
  "Shallow history: a fix commit that was also the parent of another fix became a shallow boundary and looked parentless on a rebuild. Parents are now read from the raw commit object, and such commits are deepened.":
    "Flache Historie: Ein Fix-Commit, der zugleich Vorgänger eines anderen Fixes war, wurde zur Grenze des flachen Clones und wirkte beim Neubau vorgängerlos. Vorgänger werden jetzt aus dem rohen Commit-Objekt gelesen, und solche Commits werden vertieft.",
  "Feedback between stages: removing the kept copy of a duplicate promoted its twin, so the next audit saw a different population. Deduplication now ignores audit exclusions, and two consecutive runs of the whole pipeline are byte-identical.":
    "Rückkopplung zwischen Stufen: Wurde die behaltene Kopie eines Duplikats entfernt, rückte ihr Zwilling nach, sodass das nächste Audit eine andere Grundgesamtheit sah. Die Deduplizierung ignoriert jetzt Audit-Ausschlüsse, und zwei aufeinanderfolgende Läufe der gesamten Pipeline sind byte-identisch.",
  "Training loop: when an epoch did not divide evenly into accumulation steps, the last step was averaged over the full count and under-weighted. Each step is now averaged over its own size.":
    "Trainingsschleife: Ging eine Epoche nicht glatt in Akkumulationsschritten auf, wurde der letzte Schritt über die volle Anzahl gemittelt und dadurch zu schwach gewichtet. Jetzt wird jeder Schritt über seine eigene Größe gemittelt.",
  "Resumed training: a checkpoint carried no record of its data, so a run could continue on a changed dataset, for example after an approval was withdrawn. Checkpoints now store their data and configuration and refuse to resume with different inputs.":
    "Fortgesetztes Training: Ein Checkpoint enthielt keine Angaben zu seinen Daten, sodass ein Lauf auf einem geänderten Datensatz weitergehen konnte, etwa nach dem Widerruf einer Freigabe. Checkpoints speichern jetzt ihre Daten und Konfiguration und lassen sich mit anderen Eingaben nicht fortsetzen.",
  "What is still open": "Was noch offen ist",
  "None of the 2,322 records is approved for training. Code from 766 upstream repositories appears in train or validation records, and each repository's license, together with the terms of the advisory sources, has to be reviewed by a person before its records can be used. The review queue lists, for every repository, the license file at each used revision with its hash, the license the package registry reports and the open questions. Until then the training export is empty and the training pipeline refuses to start.":
    "Keines der 2.322 Beispiele ist für das Training freigegeben. Code aus 766 Upstream-Repositories steckt in Trainings- oder Validierungsbeispielen, und die Lizenz jedes Repositorys muss zusammen mit den Bedingungen der Advisory-Quellen von einer Person geprüft werden, bevor seine Beispiele verwendet werden dürfen. Die Prüfwarteschlange nennt für jedes Repository die Lizenzdatei jeder verwendeten Revision mit Hash, die Lizenz laut Paket-Registry und die offenen Fragen. Bis dahin ist der Trainingsexport leer, und die Trainingspipeline startet nicht.",
  "The labels inherit the limits of their source. A hard negative is safe with respect to the advisory's weakness, not proven safe in general. Localization comes from the diff and marks where code changed, which for a missing check is the insertion point. The manual estimate rests on 44 AI-reviewed items. And no model has been trained, so nothing here says how well Quantum Sentinel-Alpha will detect vulnerabilities.":
    "Die Labels übernehmen die Grenzen ihrer Quelle. Ein Hard Negative ist sicher in Bezug auf die Schwachstelle des Advisorys, nicht allgemein als sicher nachgewiesen. Die Lokalisierung stammt aus dem Diff und markiert, wo sich Code geändert hat; bei einer fehlenden Prüfung ist das die Einfügestelle. Die manuelle Schätzung beruht auf 44 von einer KI geprüften Einträgen. Und es wurde kein Modell trainiert, daher sagt nichts hier etwas darüber aus, wie gut Quantum Sentinel-Alpha Schwachstellen erkennen wird.",
  "Lessons for building security training data":
    "Lehren für Sicherheits-Trainingsdaten",
  "The points below are what we would do from the start next time.":
    "Die folgenden Punkte würden wir beim nächsten Mal von Anfang an so machen.",
  "Use real parsers for every language from day one; a scanner that approximates a grammar fails in exactly the corners security fixes live in.":
    "Für jede Sprache vom ersten Tag an echte Parser verwenden; ein Scanner, der eine Grammatik nur annähert, scheitert genau in den Ecken, in denen Sicherheitsfixes liegen.",
  "Treat every check that can skip work as a check that can fail, and report incomplete checks instead of passing them.":
    "Jede Prüfung, die Arbeit überspringen kann, als Prüfung behandeln, die scheitern kann, und unvollständige Prüfungen melden, statt sie als bestanden zu werten.",
  "Look beyond the fix commit: later advisories of the same package are direct evidence about the safety of a hard negative.":
    "Über den Fix-Commit hinausschauen: Spätere Advisories desselben Pakets sind direkte Belege für die Sicherheit eines Hard Negatives.",
  "Exclude rather than relabel, and keep every exclusion with its reason.":
    "Ausschließen statt umlabeln, und jeden Ausschluss mit seinem Grund festhalten.",
  "Make the pipeline a fixed point and verify it: rebuild from pinned commits, compare hashes and run it twice.":
    "Die Pipeline zu einem Fixpunkt machen und das prüfen: aus festgeschriebenen Commits neu bauen, Hashes vergleichen und sie zweimal ausführen.",
  "Keep approval separate from collection, and default to deny until a person has reviewed the rights.":
    "Freigabe und Erhebung trennen und standardmäßig ablehnen, bis eine Person die Rechte geprüft hat.",
  "Sentinel Garden: records you can check":
    "Sentinel Garden: Beispiele, die sich prüfen lassen",
  "Sentinel uses its own source-code data pipeline, separate from the FineWeb2-HQ corpus documented below for the language-model experiments. The sections explain what a record is, how it is checked and why none is used for training yet. Figures reflect the Sentinel repository reviewed on 4 November 2026.":
    "Sentinel nutzt eine eigene Datenpipeline für Quellcode, getrennt vom weiter unten dokumentierten FineWeb2-HQ-Korpus für die Sprachmodell-Experimente. Die Abschnitte erklären, was ein Beispiel ist, wie es geprüft wird und warum noch keines für das Training verwendet wird. Die Zahlen geben das am 4. November 2026 geprüfte Sentinel-Repository wieder.",
  "The reviewed Sentinel registry lists nine sources, all with production_approved: false, and the repository approval list is empty. Sentinel Garden has built 2,773 records from real advisories and accepted 2,322 of them, but zero are training-approved, so the training export is empty. Public accessibility alone does not authorize collection, training or redistribution.":
    "Das geprüfte Sentinel-Register nennt neun Quellen, alle mit production_approved: false, und die Freigabeliste für Repositories ist leer. Sentinel Garden hat aus echten Advisories 2.773 Beispiele gebaut und 2.322 davon akzeptiert, doch keines ist für das Training freigegeben; der Trainingsexport ist daher leer. Öffentliche Zugänglichkeit allein erlaubt weder Erhebung noch Training oder Weitergabe.",
  "QuickEval v1 contains 37 vulnerable, 34 hard-negative and 15 abstention cases across Python, JavaScript/TypeScript and Go. These clean-room synthetic cases and the 16 Python coding-regression tasks are evaluation-only, and every Garden record is checked for overlap with them. No imported public benchmark cases or private holdout are reported.":
    "QuickEval v1 enthält 37 verwundbare Fälle, 34 Hard Negatives und 15 Enthaltungsfälle in Python, JavaScript/TypeScript und Go. Diese im Clean-Room-Verfahren erstellten synthetischen Fälle und die 16 Python-Aufgaben zur Coding-Regression dienen nur der Evaluation, und jedes Garden-Beispiel wird auf Überschneidungen mit ihnen geprüft. Importierte öffentliche Benchmark-Fälle oder ein privater Hold-out werden nicht berichtet.",
  "Dataset statistics": "Datensatzstatistik",
  "A fix that changes one function produces up to three records. The function before the fix is labelled vulnerable, with the advisory's CWE and the changed or inserted lines as the localization. The same function after the fix is a hard negative: safe with respect to that weakness, which teaches the model not to report code merely because it resembles a known vulnerability. A caller of the vulnerable function, shown without the callee, becomes an abstention record, because whether it is safe depends on code the reviewer cannot see.":
    "Ein Fix, der eine Funktion ändert, ergibt bis zu drei Beispiele. Die Funktion vor dem Fix wird als verwundbar gelabelt, mit der CWE des Advisorys und den geänderten oder eingefügten Zeilen als Lokalisierung. Dieselbe Funktion nach dem Fix ist ein Hard Negative: sicher in Bezug auf diese Schwachstelle. Daran lernt das Modell, Code nicht nur deshalb zu melden, weil er einer bekannten Schwachstelle ähnelt. Ein Aufrufer der verwundbaren Funktion, gezeigt ohne die aufgerufene Funktion, wird zum Enthaltungsbeispiel, denn ob er sicher ist, hängt von Code ab, den die prüfende Instanz nicht sieht.",
  "Each record keeps the advisory, the upstream repository, both commit SHAs, the file path, the license files with their sha256 and a content hash. The upstream patch, cut to the function, must turn the vulnerable excerpt exactly into the fixed excerpt.":
    "Jedes Beispiel behält das Advisory, das Upstream-Repository, beide Commit-SHAs, den Dateipfad, die Lizenzdateien mit ihrem sha256 und einen Inhalts-Hash. Der auf die Funktion zugeschnittene Upstream-Patch muss den verwundbaren Ausschnitt exakt in den korrigierten überführen.",
  "Structure from parse trees, not text patterns":
    "Struktur aus Syntaxbäumen statt Textmustern",
  "Where a function starts and ends, what is a string, a regular expression or a comment, which lines are imports and who calls whom decide whether a fix is accepted and where its label points. Python is read with its own ast and tokenize modules; Go, JavaScript and TypeScript with tree-sitter grammars pinned to exact versions, recorded with the dataset and enforced by the consistency check.":
    "Wo eine Funktion beginnt und endet, was ein String, ein regulärer Ausdruck oder ein Kommentar ist, welche Zeilen Importe sind und wer wen aufruft, entscheidet darüber, ob ein Fix akzeptiert wird und worauf sein Label zeigt. Python wird mit seinen eigenen Modulen ast und tokenize gelesen, Go, JavaScript und TypeScript mit tree-sitter-Grammatiken in exakt festgelegten Versionen, die mit dem Datensatz festgehalten und von der Konsistenzprüfung durchgesetzt werden.",
  "An earlier hand-written scanner for the three languages produced most of the defects found in code review, from regular expressions after an if statement to braces inside raw strings. Replacing it with real parse trees removed the whole class; a comparison over all 548 affected source files showed no Go difference and only corrections for JavaScript and TypeScript.":
    "Ein früherer, handgeschriebener Scanner für die drei Sprachen verursachte die meisten Fehler, die das Code-Review fand, von regulären Ausdrücken nach einer if-Anweisung bis zu Klammern in Raw-Strings. Echte Syntaxbäume haben diese ganze Fehlerklasse beseitigt; ein Vergleich über alle 548 betroffenen Quelldateien zeigte keinen Unterschied bei Go und für JavaScript und TypeScript ausschließlich Korrekturen.",
  "Evidence beyond the diff: the quality audit":
    "Belege jenseits des Diffs: das Qualitätsaudit",
  "A fix commit alone cannot show that the fixed function is safe. The audit therefore queries every other OSV advisory of the same package. If a later fix changes the same function again, or an advisory calls the fix incomplete, the hard negative is excluded; if the later fix commit cannot be read, it is excluded as unverified. Broad localization spans and abstentions whose caller passes only constants are excluded as well.":
    "Ein Fix-Commit allein kann nicht zeigen, dass die korrigierte Funktion sicher ist. Das Audit fragt deshalb alle anderen OSV-Advisories desselben Pakets ab. Ändert ein späterer Fix dieselbe Funktion erneut oder nennt ein Advisory den Fix unvollständig, wird das Hard Negative ausgeschlossen; ist der spätere Fix-Commit nicht lesbar, wird es als ungeprüft ausgeschlossen. Ebenso ausgeschlossen werden zu breite Lokalisierungsbereiche und Enthaltungen, deren Aufrufer nur Konstanten übergibt.",
  "A stratified manual sample of 44 items estimates the remaining error. After the automated exclusions it found no wrong label, one imprecise localization in 29 pairs and one unsafe hard negative in 28. The sample was reviewed by the implementing AI engineer, not an authorized reviewer, and its upper bounds of about 17 % are what to plan with.":
    "Eine geschichtete manuelle Stichprobe von 44 Einträgen schätzt den verbleibenden Fehler. Nach den automatischen Ausschlüssen fand sie kein falsches Label, eine ungenaue Lokalisierung unter 29 Paaren und ein unsicheres Hard Negative unter 28. Geprüft hat der umsetzende KI-Engineer, nicht eine autorisierte prüfende Person; planen sollten Sie mit den Obergrenzen von etwa 17 %.",
  "Default-deny rights review": "Rechteprüfung mit Standard-Ablehnung",
  "Training needs two kinds of approval: the registry sources that describe the advisories and fixes, and every upstream repository whose code appears in a record. The review queue lists 766 repositories with the license file URL at the used revision, its sha256 and the license the package registry reports. An approval is bound to that license file hash and stops applying if the file changes.":
    "Training braucht zwei Arten von Freigabe: für die Registry-Quellen, die Advisories und Fixes beschreiben, und für jedes Upstream-Repository, dessen Code in einem Beispiel vorkommt. Die Prüfwarteschlange nennt 766 Repositories mit der URL der Lizenzdatei in der verwendeten Revision, ihrem sha256 und der Lizenz laut Paket-Registry. Eine Freigabe ist an diesen Hash der Lizenzdatei gebunden und gilt nicht mehr, wenn sich die Datei ändert.",
  "Repositories with strong copyleft, unknown or missing licenses are not excluded by tooling, but approving them requires a written justification in addition to the approval. No upstream code is committed to the repository or uploaded anywhere; the committed manifest contains metadata and hashes only.":
    "Repositories mit starkem Copyleft, unbekannter oder fehlender Lizenz schließt das Werkzeug nicht aus, ihre Freigabe erfordert aber zusätzlich eine schriftliche Begründung. Kein Upstream-Code wird im Repository hinterlegt oder irgendwohin hochgeladen; das hinterlegte Manifest enthält nur Metadaten und Hashes.",
  "Approve the registry sources ghsa-osv-fix-commits, osv and github-advisory-db after reviewing their terms and attribution requirements.":
    "Die Registry-Quellen ghsa-osv-fix-commits, osv und github-advisory-db freigeben, nachdem ihre Bedingungen und Namensnennungspflichten geprüft sind.",
  "Review repositories in tier order, starting with the 513 permissive repositories in tier A.":
    "Repositories in der Reihenfolge der Stufen prüfen, beginnend mit den 513 permissiv lizenzierten Repositories der Stufe A.",
  "Record each decision with the reviewer, date, license identifier and license file hash; curate then fills the training export deterministically.":
    "Jede Entscheidung mit prüfender Person, Datum, Lizenzkennung und Hash der Lizenzdatei festhalten; curate füllt dann den Trainingsexport deterministisch.",
  "Frozen splits, contamination and reproducibility":
    "Eingefrorene Splits, Kontamination und Reproduzierbarkeit",
  "The split policy was frozen before the dataset was expanded: repositories are assigned to train, validation or the reserved holdout by a salted hash, so a repository never appears in two splits, and fixes committed on or after 1 July 2026 never enter training. Records are compared with every evaluation case and coding task; the reviewed run found no contamination.":
    "Die Split-Richtlinie wurde eingefroren, bevor der Datensatz erweitert wurde: Ein gesalzener Hash ordnet Repositories dem Training, der Validierung oder dem reservierten Hold-out zu, sodass ein Repository nie in zwei Splits vorkommt, und Fixes ab dem 1. Juli 2026 gelangen nie ins Training. Die Beispiele werden mit jedem Evaluationsfall und jeder Coding-Aufgabe verglichen; der geprüfte Lauf fand keine Kontamination.",
  "The pipeline is a fixed point: two consecutive runs, including the audit, produce byte-identical manifests and exclusions, and verify rebuilds every record from the pinned upstream commits with matching content hashes. EXTERNAL_RESOURCES.json lists every upstream repository and commit the dataset depends on.":
    "Die Pipeline ist ein Fixpunkt: Zwei aufeinanderfolgende Läufe einschließlich Audit erzeugen byte-identische Manifeste und Ausschlüsse, und verify baut jedes Beispiel aus den festgeschriebenen Upstream-Commits mit übereinstimmenden Inhalts-Hashes neu. EXTERNAL_RESOURCES.json nennt jedes Upstream-Repository und jeden Commit, von dem der Datensatz abhängt.",
  "Split policy": "Split-Richtlinie",
  "Garden configuration": "Garden-Konfiguration",
  "External resources": "Externe Ressourcen",
  "Training pipeline: built, gated and not yet run":
    "Trainingspipeline: gebaut, abgesichert, noch nicht ausgeführt",
  "The QLoRA pipeline fine-tunes Qwen3.5-9B at its pinned revision with a 4-bit NF4 base and bf16 compute. LoRA rank 16 adapters cover the 200 linear modules of the real architecture, 24 Gated DeltaNet and 8 full-attention layers, about 40.1 million trainable parameters. The loss covers only the model's reply; examples longer than the context limit are dropped, never truncated.":
    "Die QLoRA-Pipeline führt ein Fine-Tuning von Qwen3.5-9B in der festgeschriebenen Revision durch, mit 4-Bit-NF4-Basis und Berechnung in bf16. Adapter mit LoRA-Rang 16 decken die 200 linearen Module der echten Architektur ab, 24 Gated-DeltaNet- und 8 Full-Attention-Schichten, zusammen etwa 40,1 Mio. trainierbare Parameter. Der Loss umfasst nur die Antwort des Modells; Beispiele, die länger als das Kontextlimit sind, werden verworfen, nie abgeschnitten.",
  "Before training starts, the loader checks that every record is approved and still passes the governance gate, that its label and content hash match the manifest and that no repository is shared with validation or the holdout. Checkpoints record the data and configuration they were trained on and cannot be resumed with different inputs. The pipeline is tested on CPU with a tiny model of the same architecture; it has not been run on the real model.":
    "Vor dem Trainingsstart prüft der Loader, dass jedes Beispiel freigegeben ist und die Governance-Prüfung weiterhin besteht, dass Label und Inhalts-Hash zum Manifest passen und dass kein Repository mit der Validierung oder dem Hold-out geteilt wird. Checkpoints halten die Daten und die Konfiguration fest, mit denen sie trainiert wurden, und lassen sich mit anderen Eingaben nicht fortsetzen. Die Pipeline ist auf der CPU mit einem winzigen Modell derselben Architektur getestet; mit dem echten Modell wurde sie noch nicht ausgeführt.",
  "Foundation decision": "Wahl des Ausgangsmodells",
  "Sentinel Garden data is rebuilt, not downloaded: the committed manifest holds metadata and content hashes, and python -m sentinel.garden verify rebuilds every record from the frozen candidate list at the pinned upstream commits and compares the hashes. Two consecutive runs of the pipeline, including the audit, are byte-identical; the parser grammars are pinned and checked.":
    "Die Daten von Sentinel Garden werden neu gebaut, nicht heruntergeladen: Das hinterlegte Manifest enthält Metadaten und Inhalts-Hashes, und python -m sentinel.garden verify baut jedes Beispiel aus der eingefrorenen Kandidatenliste an den festgeschriebenen Upstream-Commits neu und vergleicht die Hashes. Zwei aufeinanderfolgende Läufe der Pipeline einschließlich Audit sind byte-identisch; die Parser-Grammatiken sind festgelegt und werden geprüft.",
  "Sentinel-Alpha has no trained model or release. Treat future vulnerability findings and patches as candidates for expert review. Require code location, CWE, supporting evidence and independent verification; an abstention or no-finding response does not establish that code is secure.":
    "Für Sentinel-Alpha gibt es weder ein trainiertes Modell noch eine Veröffentlichung. Künftige Schwachstellenbefunde und Patches sind Vorschläge für eine fachkundige Prüfung. Erforderlich sind Fundstelle, CWE, stützende Belege und eine unabhängige Überprüfung; eine Enthaltung oder eine Antwort ohne Befund belegt nicht, dass Code sicher ist.",
  "The public repository contains a versioned finding contract, a default-deny source registry, a strict parser/scorer, a model runner and QuickEval v1: 86 synthetic cases, comprising 37 vulnerable, 34 hard-negative and 15 abstention cases, plus 16 Python coding-regression tasks. Since 4 November 2026 it also contains Sentinel Garden, which turned 19,959 GitHub-reviewed advisories into 2,322 audited training records, and a governance-gated QLoRA pipeline for the selected Qwen3.5-9B foundation.":
    "Das öffentliche Repository enthält ein versioniertes Befundschema, ein Quellenregister ohne automatische Freigabe, einen strikten Parser und Scorer, einen Modellrunner sowie QuickEval v1: 86 synthetische Fälle, davon 37 verwundbare, 34 Hard Negatives und 15 Enthaltungsfälle, dazu 16 Python-Aufgaben zur Coding-Regression. Seit dem 4. November 2026 enthält es außerdem Sentinel Garden, das 19.959 von GitHub geprüfte Advisories in 2.322 auditierte Trainingsbeispiele überführt hat, und eine durch Governance abgesicherte QLoRA-Pipeline für das ausgewählte Ausgangsmodell Qwen3.5-9B.",
  "Qwen3.5-9B is selected at a pinned revision on expected capability; the 4B/9B comparison remains an optional experiment with shared cases, prompt, parser, scorer and generation settings. Training data pairs each vulnerable function with its upstream fix as a hard negative and adds abstention cases where the decisive code is withheld. The engine design separates repository context and static signals from model-generated candidates and subsequent verification; the full engine remains planned.":
    "Qwen3.5-9B ist in einer festgeschriebenen Revision nach erwarteter Leistungsfähigkeit ausgewählt; der Vergleich von 4B und 9B bleibt ein optionales Experiment mit gemeinsamen Fällen, Prompt, Parser, Scorer und Generierungseinstellungen. Die Trainingsdaten stellen jeder verwundbaren Funktion ihren Upstream-Fix als Hard Negative gegenüber und ergänzen Enthaltungsfälle, in denen der entscheidende Code zurückgehalten wird. Das Engine-Design trennt Repository-Kontext und statische Signale von modellgenerierten Kandidaten und der anschließenden Verifikation; die vollständige Engine bleibt geplant.",
  "The status report records no model evaluation, adapter or training run, and no training-approved data source or record: every Garden record awaits a rights review. Existing regex-baseline results validate the harness only. The public synthetic cases are not a private holdout; the holdout has not started. Patch evaluation is not implemented. Detection quality, false-positive rate, model latency and VRAM use are not established.":
    "Der Statusbericht verzeichnet keine Modellevaluation, keinen Adapter und keinen Trainingslauf sowie keine für das Training freigegebene Datenquelle und kein freigegebenes Beispiel: Jedes Garden-Beispiel wartet auf eine Rechteprüfung. Vorhandene Ergebnisse der Regex-Baseline validieren nur das Test-Harness. Die öffentlichen synthetischen Fälle sind kein privater Hold-out; der Hold-out hat noch nicht begonnen. Eine Patch-Evaluation ist nicht implementiert. Erkennungsqualität, Fehlalarmrate, Modelllatenz und VRAM-Bedarf sind nicht belegt.",
  "No. Qwen3.5-9B is selected as the foundation, and the Sentinel Garden dataset and a QLoRA training pipeline are built, but no model has been trained or evaluated. No training source or repository is approved yet, so the training export is empty, and no adapter exists.":
    "Nein. Qwen3.5-9B ist als Ausgangsmodell ausgewählt, und der Datensatz Sentinel Garden sowie eine QLoRA-Trainingspipeline sind gebaut, doch es wurde kein Modell trainiert oder evaluiert. Noch ist keine Trainingsquelle und kein Repository freigegeben, der Trainingsexport ist daher leer, und es gibt keinen Adapter.",
  "Complete the Sentinel rights review, starting with the registry sources and the tier A repositories, before any training run.":
    "Die Rechteprüfung für Sentinel abschließen, beginnend mit den Registry-Quellen und den Repositories der Stufe A, bevor ein Trainingslauf stattfindet.",
  "Run the Sentinel foundation baseline on approved GPU time and establish a separate private holdout before claiming detection quality.":
    "Die Baseline des Sentinel-Ausgangsmodells auf genehmigter GPU-Zeit ausführen und einen separaten privaten Hold-out aufbauen, bevor Aussagen zur Erkennungsqualität gemacht werden.",
  "The Sentinel Garden data pipeline, audit and rights review alongside pilot and Echelon corpus provenance.":
    "Datenpipeline, Audit und Rechteprüfung von Sentinel Garden sowie die Korpus-Herkunft der Pilotmodelle und von Echelon.",
  "How the Sentinel Garden pipeline turns real security advisories into checked training records, what its audit removed, why no record is approved yet and how the QLoRA training pipeline is gated, followed by the data provenance and training evidence for the Quantum pilots and Echelon.":
    "Wie die Pipeline Sentinel Garden echte Security Advisories in geprüfte Trainingsbeispiele überführt, was ihr Audit entfernt hat, warum noch kein Beispiel freigegeben ist und wie die QLoRA-Trainingspipeline abgesichert ist; danach Datenherkunft und Trainingsnachweise der Quantum-Pilotmodelle und von Echelon.",
  "Quantum Sentinel-Alpha: a source-code security model in development on Qwen3.5-9B, with the Sentinel Garden dataset, a QLoRA training pipeline and planned local inference. No model has been trained and no release is available.":
    "Quantum Sentinel-Alpha: ein Sicherheitsmodell für Quellcode in Entwicklung auf Basis von Qwen3.5-9B, mit dem Datensatz Sentinel Garden, einer QLoRA-Trainingspipeline und geplanter lokaler Inferenz. Es wurde kein Modell trainiert, und keine Veröffentlichung ist verfügbar.",
  "Building a Vulnerability-Fix Dataset You Can Check — rappidAI Research":
    "Ein Datensatz aus Schwachstellen-Fixes, den man prüfen kann – rappidAI Research",
  "A research note on Sentinel Garden: turning 19,959 security advisories into 2,322 audited training records, the errors code review found on the way and why no record is approved for training yet.":
    "Eine Forschungsnotiz zu Sentinel Garden: wie aus 19.959 Security Advisories 2.322 auditierte Trainingsbeispiele wurden, welche Fehler das Code-Review dabei fand und warum noch kein Beispiel für das Training freigegeben ist.",
  "The Sentinel Garden data pipeline, its audit, rights review and QLoRA training gate, plus FineWeb2-HQ provenance, configured targets and training evidence for the Quantum pilots and Echelon.":
    "Die Datenpipeline Sentinel Garden mit Audit, Rechteprüfung und abgesicherter QLoRA-Trainingspipeline, dazu die Herkunft von FineWeb2-HQ, konfigurierte Zielwerte und Trainingsnachweise der Quantum-Pilotmodelle und von Echelon.",
  "Selected 4 November 2026 at a pinned revision; not yet evaluated.":
    "Am 4. November 2026 in einer festgeschriebenen Revision ausgewählt; noch nicht evaluiert.",
  "How the dataset is built and checked":
    "Wie der Datensatz entsteht und geprüft wird",
  "Research note: building Sentinel Garden":
    "Forschungsnotiz: der Aufbau von Sentinel Garden",
  "Technical record": "Technische Angaben",
  Output: "Ausgabe",
  "Figure 2": "Abbildung 2",
  "Table 5": "Tabelle 5",
  "Repository-level splits": "Splits auf Repository-Ebene",
  "Assigned by a frozen, salted hash of the repository, so no repository appears in two splits. Holdout and quarantine records are never used for training.":
    "Zugewiesen über einen eingefrorenen, gesalzenen Hash des Repositorys, sodass kein Repository in zwei Splits vorkommt. Beispiele aus Hold-out und Quarantäne werden nie für das Training verwendet.",
  of: "von",
  "19,959": "19.959",
  "2,322": "2.322",
  "Reviewed 28 October 2026; Sentinel updated 4 November 2026":
    "Geprüft am 28. Oktober 2026; Sentinel aktualisiert am 4. November 2026",
  "Foundation selected · Data and training pipelines built · Not trained":
    "Ausgangsmodell ausgewählt · Daten- und Trainingspipelines gebaut · Nicht trainiert",
  "Sentinel evaluation and data pipeline":
    "Sentinel: Evaluation und Datenpipeline",
  "Public synthetic cases, a strict parser/scorer, a revision-pinned comparison protocol and a reproducible, audited Garden dataset with hash verification.":
    "Öffentliche synthetische Fälle, ein strikter Parser und Scorer, ein auf eine Revision festgelegtes Vergleichsprotokoll und ein reproduzierbarer, auditierter Garden-Datensatz mit Hash-Prüfung.",
  "No training-approved record, model evaluation, trained adapter, private holdout or patch evaluation.":
    "Kein für das Training freigegebenes Beispiel, keine Modellevaluation, kein trainierter Adapter, kein privater Hold-out und keine Patch-Evaluation.",
  "1,206": "1.206",
  "1,071": "1.071",
  "0 – 11.7 %": "0 – 11,7 %",
  "0.6 – 17.2 %": "0,6 – 17,2 %",
  "0.6 – 17.7 %": "0,6 – 17,7 %",
  "0 – 25.9 %": "0 – 25,9 %",
};
