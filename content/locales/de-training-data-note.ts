// German copy for the research note of 24 November 2026, "From Audited Records to Approved
// Training Data", and the links to it. Keys are the exact English source strings.
export const deTrainingDataNoteTranslations: Readonly<Record<string, string>> =
  {
    "Our first note on Sentinel Garden described a dataset of audited vulnerability fixes and a training export that was empty on purpose: no advisory source and no upstream repository had been approved. Garden v1, in its final form, holds 2,309 accepted records. Three weeks later the export holds 1,464 approved records, which give 1,871 training and 187 validation examples, and the training pipeline accepts them.":
      "Unsere erste Notiz zu Sentinel Garden beschrieb einen Datensatz auditierter Schwachstellen-Fixes und einen Trainingsexport, der mit Absicht leer war: Weder eine Advisory-Quelle noch ein Upstream-Repository war freigegeben. Garden v1 umfasst in seiner endgültigen Fassung 2.309 akzeptierte Beispiele. Drei Wochen später enthält der Export 1.464 freigegebene Beispiele, aus denen 1.871 Trainings- und 187 Validierungsbeispiele entstehen, und die Trainingspipeline nimmt sie an.",
    "This note describes the steps in between: two dataset revisions, a rights review of every repository whose code appears in training data, and the checks that make sure a training machine sees exactly what was approved. None of the growth came from relaxing a rule. The one-function rule, the quality checks, the audit and the frozen split policy are the same as in v1, and every v1 record is still in v3 with the same content hash and split.":
      "Diese Notiz beschreibt die Schritte dazwischen: zwei neue Fassungen des Datensatzes, eine Rechteprüfung jedes Repositorys, dessen Code in Trainingsdaten vorkommt, und die Prüfungen, die sicherstellen, dass ein Trainingsrechner genau das sieht, was freigegeben wurde. Kein Teil des Wachstums beruht auf einer gelockerten Regel. Ein-Funktions-Regel, Qualitätsprüfungen, Audit und eingefrorene Split-Richtlinie sind dieselben wie in v1, und jedes Beispiel aus v1 steht mit demselben Inhalts-Hash und Split auch in v3.",
    "Garden v1 allowed four candidates per repository, so that large projects could not dominate. That limit alone dropped 3,236 advisories whose repository already had four. It is a balance rule, not a quality rule, so v2 raised it to 20. Even then, the largest training repository holds 0.8 % of the training records, and because the split is per repository, extra advisories of a project stay in that project's split.":
      "Garden v1 erlaubte vier Kandidaten pro Repository, damit große Projekte den Datensatz nicht dominieren. Allein diese Grenze verwarf 3.236 Advisories, deren Repository bereits vier Kandidaten hatte. Sie ist eine Regel für die Ausgewogenheit, keine Qualitätsregel, deshalb hat v2 sie auf 20 angehoben. Auch dann hält das größte Trainings-Repository nur 0,8 % der Trainingsbeispiele, und weil der Split pro Repository erfolgt, bleiben zusätzliche Advisories eines Projekts im Split dieses Projekts.",
    "A sample of 300 rejections per category, checked against the real upstream diffs, showed that most rejections were genuine: fixes in module-level code, in configuration objects or in several functions at once cannot get a function-level label. Three were limits of the extractor and were fixed: complete new helper methods inside a class body, version-string bumps outside any function, and build or test tooling counted as source files. Together they recovered 58 of the 4,830 v1 candidates. Most of v2's growth came from the higher limit.":
      "Eine Stichprobe von 300 Ablehnungen pro Kategorie, geprüft an den echten Upstream-Diffs, zeigte: Die meisten Ablehnungen waren berechtigt. Fixes in Code auf Modulebene, in Konfigurationsobjekten oder in mehreren Funktionen zugleich lassen sich nicht mit einem Label auf Funktionsebene versehen. Drei Fälle waren Grenzen des Extraktors und wurden behoben: vollständig neue Hilfsmethoden in einem Klassenrumpf, Änderungen von Versionsstrings außerhalb jeder Funktion sowie Build- und Testwerkzeuge, die als Quelldateien zählten. Zusammen holten sie 58 der 4.830 Kandidaten aus v1 zurück. Den größten Teil des Wachstums von v2 brachte die höhere Grenze.",
    "v2 still dropped every advisory that names more than one fix commit: 2,076 advisories, 1,927 of them with all commits in one repository. Many are ordinary, such as a code change plus a separate test, or the same fix applied to a release branch. Some are not: a fix delivered in two steps, where the first commit leaves the function vulnerable.":
      "v2 verwarf noch jedes Advisory, das mehr als einen Fix-Commit nennt: 2.076 Advisories, bei 1.927 davon liegen alle Commits in einem Repository. Viele davon sind gewöhnlich, etwa eine Codeänderung plus ein separater Test oder derselbe Fix auf einem Release-Branch. Manche nicht: ein Fix in zwei Schritten, bei dem die Funktion nach dem ersten Commit noch verwundbar ist.",
    "That difference decides whether a hard negative is correct. If a two-step fix is treated as one, the function after the first commit is labelled safe although it is still vulnerable. v3 therefore uses an advisory with several commits in only two cases and rejects everything else without guessing.":
      "Dieser Unterschied entscheidet darüber, ob ein Hard Negative stimmt. Wird ein Fix in zwei Schritten wie einer behandelt, gilt die Funktion nach dem ersten Commit als sicher, obwohl sie noch verwundbar ist. v3 verwendet ein Advisory mit mehreren Commits deshalb nur in zwei Fällen und verwirft alles andere, ohne zu raten.",
    "Exactly one commit changes runtime code in the ecosystem's language, and every other commit changes only tests, documentation, changelogs or CI files.":
      "Genau ein Commit ändert Laufzeitcode in der Sprache des Ökosystems, und alle anderen Commits ändern nur Tests, Dokumentation, Changelogs oder CI-Dateien.",
    "Every commit that changes runtime code makes the identical change: the same files, the same removed and added lines and the same position in the enclosing function. This covers a backport, or a merge commit and the commit it merges. The earliest such commit is used as the fix.":
      "Jeder Commit, der Laufzeitcode ändert, nimmt dieselbe Änderung vor: dieselben Dateien, dieselben entfernten und hinzugefügten Zeilen und dieselbe Stelle in der umgebenden Funktion. Das deckt einen Backport ab oder einen Merge-Commit zusammen mit dem Commit, den er zusammenführt. Als Fix gilt der früheste dieser Commits.",
    "Multi-commit candidates only take repository slots that single-commit candidates leave free, so every v2 candidate is byte-identical in v3. Of the 1,128 new candidates, 100 yield records. 778 are rejected because their commits make different changes. In a sample of 120 of them, drawn before positions were compared, a third changed different files, a third changed subsets of the same files, typical for a fix in several steps, and a third changed the same files with different lines. Telling a backport to a diverged branch from a partial fix would need each repository's full history, which is expensive and unreliable on shallow caches, so these stay rejected.":
      "Kandidaten mit mehreren Commits belegen nur Plätze pro Repository, die Kandidaten mit einem Commit frei lassen; jeder Kandidat aus v2 ist in v3 deshalb byte-identisch. Von den 1.128 neuen Kandidaten ergeben 100 Beispiele. 778 werden verworfen, weil ihre Commits unterschiedliche Änderungen vornehmen. In einer Stichprobe von 120 davon, gezogen, bevor Positionen verglichen wurden, betraf ein Drittel verschiedene Dateien, ein Drittel Teilmengen derselben Dateien, typisch für einen Fix in mehreren Schritten, und ein Drittel dieselben Dateien mit anderen Zeilen. Einen Backport auf einen abweichenden Branch von einem Teil-Fix zu unterscheiden, bräuchte die vollständige Historie jedes Repositorys. Das ist aufwendig und mit flachen Caches unzuverlässig, deshalb bleiben diese Fälle verworfen.",
    "The first version compared the changes of two commits without their position. Code review found the case this misses: two commits that add the same check at two different places of one function. Each change looks identical, but together they are a fix in two steps, and the first commit's version of the function is still vulnerable. Comparing the enclosing function and the offset inside it rejects this case. The stricter comparison briefly rejected 135 candidates as unreadable, because a file that a commit adds has no earlier version in which to locate functions; added files are now compared at absolute positions.":
      "Die erste Fassung verglich die Änderungen zweier Commits ohne ihre Position. Das Code-Review fand den Fall, der dabei durchrutscht: zwei Commits, die dieselbe Prüfung an zwei verschiedenen Stellen einer Funktion einfügen. Jede Änderung sieht gleich aus, zusammen sind sie aber ein Fix in zwei Schritten, und die Funktion ist nach dem ersten Commit noch verwundbar. Der Vergleich von umgebender Funktion und Abstand innerhalb dieser Funktion verwirft diesen Fall. Der strengere Vergleich lehnte kurzzeitig 135 Kandidaten als nicht lesbar ab, weil eine Datei, die ein Commit neu anlegt, keine frühere Fassung hat, in der sich Funktionen finden lassen; neu angelegte Dateien werden jetzt über absolute Positionen verglichen.",
    "The second finding was about time. Choosing the earliest commit compared commit timestamps as text, and timestamps with different time-zone offsets sort wrongly as text. The rule now compares instants.":
      "Der zweite Befund betraf die Zeit. Für die Wahl des frühesten Commits wurden Zeitstempel als Text verglichen, und Zeitstempel mit unterschiedlichen Zeitzonen-Offsets sortieren als Text falsch. Die Regel vergleicht jetzt Zeitpunkte.",
    "Every upstream repository whose code appears in a training record needs its own decision. A review queue sorts the 878 repositories with train or validation records into tiers by evidence. Tier A means a permissive root license (MIT, Apache-2.0, BSD or ISC) that is byte-identical at every revision the records use and matches the license the package registry reports.":
      "Jedes Upstream-Repository, dessen Code in einem Trainingsbeispiel vorkommt, braucht eine eigene Entscheidung. Eine Prüfwarteschlange ordnet die 878 Repositories mit Trainings- oder Validierungsbeispielen nach ihren Nachweisen in Stufen. Stufe A bedeutet eine permissive Lizenz im Hauptverzeichnis (MIT, Apache-2.0, BSD oder ISC), die in jeder von den Beispielen verwendeten Revision byte-identisch ist und mit der Lizenz übereinstimmt, die die Paket-Registry meldet.",
    "A root license file is not the whole story. Before a repository was proposed for approval, every revision its records use was inspected for NOTICE, COPYING, PATENTS and third-party license files, for license files in every directory on the path to a used file and for the license declared in package.json, pyproject.toml, setup.cfg or setup.py. A failed Git read counts as an open question, never as absence. The inspection found NOTICE files whose text a license detector reads as AGPL or GPL, a PATENTS file, bundled third-party license collections and package metadata that names a different license than the root file. Those repositories became clarification cases instead of recommendations.":
      "Die Lizenzdatei im Hauptverzeichnis erzählt nicht die ganze Geschichte. Bevor ein Repository zur Freigabe vorgeschlagen wurde, wurde jede Revision, die seine Beispiele verwenden, auf NOTICE-, COPYING-, PATENTS- und Drittlizenz-Dateien geprüft, auf Lizenzdateien in jedem Verzeichnis auf dem Pfad zu einer verwendeten Datei und auf die Lizenz, die package.json, pyproject.toml, setup.cfg oder setup.py angibt. Ein fehlgeschlagener Git-Lesezugriff gilt als offene Frage, nie als Fehlen. Gefunden wurden NOTICE-Dateien, deren Text ein Lizenzdetektor als AGPL oder GPL erkennt, eine PATENTS-Datei, mitgelieferte Sammlungen von Drittlizenzen und Paketmetadaten, die eine andere Lizenz nennen als die Datei im Hauptverzeichnis. Diese Repositories wurden zu Klärungsfällen statt zu Empfehlungen.",
    "The inspection tooling had bugs of its own. setup.cfg files that use a colon instead of an equals sign were read without their license, and a normalizer that removed the word license from identifiers mangled the Unlicense and reported conflicts that did not exist. Both were found and fixed before any decision relied on them.":
      "Auch das Prüfwerkzeug hatte eigene Fehler. setup.cfg-Dateien, die einen Doppelpunkt statt eines Gleichheitszeichens verwenden, wurden ohne ihre Lizenz gelesen, und eine Normalisierung, die das Wort „license“ aus Kennungen entfernte, verstümmelte die Unlicense und meldete Widersprüche, die es nicht gab. Beides wurde gefunden und behoben, bevor eine Entscheidung darauf beruhte.",
    "The project owner decided in two steps, on the evidence review, and the decisions are recorded in the repository. They are owner decisions, not legal opinions. The AI engineering assistant collected the evidence and prepared the entries; it is not a reviewer and is not named as one.":
      "Die Projektleitung hat in zwei Schritten auf Grundlage der Nachweisprüfung entschieden, und die Entscheidungen sind im Repository festgehalten. Es sind Entscheidungen der Projektleitung, keine Rechtsgutachten. Der KI-Engineering-Assistent hat die Nachweise gesammelt und die Einträge vorbereitet; er ist keine prüfende Instanz und wird nicht als solche genannt.",
    "Each repository approval is bound to the sha256 of the license file the review recorded. If the upstream file changes, the approval stops applying, and withdrawing an approval takes effect at the next curate and at the start of training.":
      "Jede Repository-Freigabe ist an den sha256 der Lizenzdatei gebunden, die die Prüfung erfasst hat. Ändert sich die Upstream-Datei, erlischt die Freigabe, und wird eine Freigabe zurückgezogen, wirkt das beim nächsten curate und beim Start des Trainings.",
    "The training loader refuses every record of a repository that also has holdout or temporal-quarantine records, so the temporal holdout never shares a repository with training data. The export did not apply this rule. When v3 added newer advisories, two repositories that were already approved gained records after the July 2026 cutoff. Their six older records were still exported, and the loader would have refused to start training.":
      "Der Trainings-Loader verweigert jedes Beispiel eines Repositorys, das auch Beispiele im Hold-out oder in der zeitlichen Quarantäne hat. So teilt der zeitliche Hold-out nie ein Repository mit Trainingsdaten. Der Export wandte diese Regel nicht an. Als v3 neuere Advisories hinzufügte, bekamen zwei bereits freigegebene Repositories Beispiele nach dem Stichtag im Juli 2026. Ihre sechs älteren Beispiele wurden weiter exportiert, und der Loader hätte den Trainingsstart verweigert.",
    "The fix was to let curate apply the loader's rule itself and mark such records as excluded with their reason; v1 and v2 are byte-identical under the rule. The approvals were not touched: the two repositories stay approved and simply contribute nothing while they have quarantine records. The general lesson is that every gate between data and training should apply the same rules, and that a mismatch should surface in a check, not at the start of a paid GPU run.":
      "Die Lösung: curate wendet die Regel des Loaders jetzt selbst an und markiert solche Beispiele mit Begründung als ausgeschlossen; v1 und v2 bleiben unter dieser Regel byte-identisch. Die Freigaben blieben unberührt: Die beiden Repositories sind weiter freigegeben und liefern nur so lange nichts, wie sie Beispiele in der Quarantäne haben. Die allgemeine Lehre: Jede Schranke zwischen Daten und Training sollte dieselben Regeln anwenden, und ein Widerspruch sollte in einer Prüfung auffallen, nicht beim Start eines bezahlten GPU-Laufs.",
    "1,464 records from 533 repositories are approved: 1,331 for training and 133 for validation. Every verified vulnerable/fixed pair also becomes a patch example, so the first run trains detection and patch generation on 1,871 training and 187 validation examples (Table 4).":
      "1.464 Beispiele aus 533 Repositories sind freigegeben: 1.331 für das Training und 133 für die Validierung. Jedes geprüfte Paar aus verwundbarer und korrigierter Funktion wird zusätzlich zu einem Patch-Beispiel. Der erste Lauf trainiert daher Erkennung und Patch-Erzeugung auf 1.871 Trainings- und 187 Validierungsbeispielen (Tabelle 4).",
    "With the trainer's own encoding and the pinned Qwen3.5-9B tokenizer, no example is dropped at the 4,096-token limit. The median example has 764 tokens and the longest 2,918, and one epoch is about 1.73 million tokens. JavaScript contributes 428 approved records, Go 412, Python 402 and TypeScript 222.":
      "Mit der Kodierung des Trainers und dem festgeschriebenen Tokenizer von Qwen3.5-9B fällt an der Grenze von 4.096 Tokens kein Beispiel heraus. Das mittlere Beispiel hat 764 Tokens, das längste 2.918, und eine Epoche umfasst etwa 1,73 Mio. Tokens. JavaScript liefert 428 freigegebene Beispiele, Go 412, Python 402 und TypeScript 222.",
    "A training machine should rebuild exactly the approved data and nothing else. Running the full pipeline there would fetch and process all 7,751 candidates. materialize instead rebuilds only the training-approved records of the committed manifest, 684 advisories in 533 repositories. It refuses if a record cannot be rebuilt, if a content or supervision hash differs from the manifest or if an approval no longer passes the gate. Quality, split and approval status come from the committed manifest and are never recomputed.":
      "Ein Trainingsrechner soll genau die freigegebenen Daten neu bauen und nichts sonst. Die vollständige Pipeline würde dort alle 7.751 Kandidaten laden und verarbeiten. materialize baut stattdessen nur die freigegebenen Beispiele des hinterlegten Manifests neu: 684 Advisories in 533 Repositories. Es bricht ab, wenn sich ein Beispiel nicht neu bauen lässt, wenn ein Inhalts- oder Supervisions-Hash vom Manifest abweicht oder wenn eine Freigabe die Governance-Prüfung nicht mehr besteht. Qualität, Split und Freigabestatus stammen aus dem hinterlegten Manifest und werden nie neu berechnet.",
    "On v2 and v3 its four output files are byte-identical to the full curate export, and from a warm cache the rebuild takes about a minute and a half. The dry run of the real training loader, which checks every supervision hash and checksum, passes on the same files.":
      "Bei v2 und v3 sind seine vier Ausgabedateien byte-identisch mit dem vollständigen curate-Export, und mit vorhandenem Cache dauert der Neubau etwa anderthalb Minuten. Der Probelauf des echten Trainings-Loaders, der jeden Supervisions-Hash und jede Prüfsumme kontrolliert, besteht mit denselben Dateien.",
    "No model has been trained. The first QLoRA run needs approved GPU time, and until it has been evaluated against the unchanged foundation under the same conditions, nothing here says how well Quantum Sentinel-Alpha detects or fixes vulnerabilities.":
      "Es wurde noch kein Modell trainiert. Der erste QLoRA-Lauf braucht genehmigte GPU-Zeit, und bevor er unter gleichen Bedingungen mit dem unveränderten Ausgangsmodell verglichen ist, sagt nichts hier etwas darüber aus, wie gut Quantum Sentinel-Alpha Schwachstellen erkennt oder behebt.",
    "The quality estimate is thin. 25 of the 44 sampled items have been reviewed, by the AI engineering assistant that built the pipeline. After the automated exclusions, one localization in 14 pairs was imprecise and no other error was found, with upper bounds between 21 and 35 %. 64 evidence packages for an independent human review are prepared and not yet reviewed.":
      "Die Qualitätsschätzung ist dünn. 25 der 44 Stichprobeneinträge sind geprüft, und zwar vom KI-Engineering-Assistenten, der die Pipeline gebaut hat. Nach den automatischen Ausschlüssen war eine Lokalisierung unter 14 Paaren ungenau, weitere Fehler fanden sich nicht; die Obergrenzen liegen zwischen 21 und 35 %. 64 Nachweispakete für eine unabhängige menschliche Prüfung liegen bereit und sind noch nicht geprüft.",
    "Legal questions remain open: whether published weights redistribute MIT or Apache code or CC-BY advisory text, how the open-access condition in GitHub's terms for research use applies, and whether the OSV service has terms beyond the per-source licenses. They need advice before any weights are published.":
      "Rechtliche Fragen sind offen: ob veröffentlichte Gewichte MIT- oder Apache-Code oder CC-BY-Advisory-Texte weitergeben, wie die Open-Access-Bedingung in den GitHub-Nutzungsbedingungen für Forschungszwecke greift und ob der OSV-Dienst über die Lizenzen der einzelnen Quellen hinaus eigene Bedingungen hat. Vor einer Veröffentlichung von Gewichten braucht es dazu rechtlichen Rat.",
    "The data has known gaps. SQL injection has 10 findings and code injection 22, too few to learn them well. And a hard negative is safe with respect to the advisory's weakness, not proven safe in general.":
      "Die Daten haben bekannte Lücken. SQL-Injection kommt auf 10 Befunde und Code-Injection auf 22, zu wenige, um sie gut zu lernen. Und ein Hard Negative ist sicher in Bezug auf die Schwachstelle des Advisorys, nicht allgemein als sicher nachgewiesen.",
    "The points below are what we would do from the start next time.":
      "Die folgenden Punkte würden wir beim nächsten Mal von Anfang an so machen.",
    "Reject what cannot be decided. A two-step fix that looks like a backport is worse than no example, because it produces a confident, wrong hard negative.":
      "Verwerfen, was sich nicht entscheiden lässt. Ein Fix in zwei Schritten, der wie ein Backport aussieht, ist schlimmer als gar kein Beispiel, weil er ein selbstsicheres, falsches Hard Negative erzeugt.",
    "Compare changes together with their position, and compare times as instants rather than text.":
      "Änderungen zusammen mit ihrer Position vergleichen und Zeiten als Zeitpunkte statt als Text.",
    "Inspect licenses at every revision and path the data uses, and treat a failed read as an open question.":
      "Lizenzen in jeder Revision und auf jedem Pfad prüfen, die die Daten verwenden, und einen fehlgeschlagenen Lesezugriff als offene Frage behandeln.",
    "Bind each approval to the exact evidence it rests on, so that it expires when the evidence changes.":
      "Jede Freigabe an genau die Nachweise binden, auf denen sie beruht, damit sie erlischt, wenn sich die Nachweise ändern.",
    "Let the export and the training loader apply the same rules, and check the training machine's data against the approved hashes.":
      "Export und Trainings-Loader dieselben Regeln anwenden lassen und die Daten auf dem Trainingsrechner gegen die freigegebenen Hashes prüfen.",
    "From Audited Records to Approved Training Data":
      "Von auditierten Beispielen zu freigegebenen Trainingsdaten",
    "How Sentinel Garden grew to 3,427 audited records, why fixes spread over several commits were the hardest part, how 535 repositories were reviewed and approved, and why Quantum Sentinel-Alpha now has 1,871 approved training examples but no trained model yet.":
      "Wie Sentinel Garden auf 3.427 auditierte Beispiele gewachsen ist, warum Fixes über mehrere Commits der schwierigste Teil waren, wie 535 Repositories geprüft und freigegeben wurden und warum Quantum Sentinel-Alpha jetzt 1.871 freigegebene Trainingsbeispiele hat, aber noch kein trainiertes Modell.",
    "This note is an engineering report on Sentinel Garden v2 and v3 and the training authorization at Sentinel revision cec6f96. It reports dataset counts, rights-review results and code-review findings. The approvals are decisions of the project owner, not legal opinions. No model has been trained or evaluated, and the manual quality sample was reviewed by the implementing AI engineering assistant rather than an authorized reviewer. Code examples are simplified and written for this note.":
      "Diese Notiz ist ein technischer Bericht über Sentinel Garden v2 und v3 und die Trainingsfreigabe auf Sentinel-Revision cec6f96. Sie nennt Datensatzzahlen, Ergebnisse der Rechteprüfung und Befunde aus dem Code-Review. Die Freigaben sind Entscheidungen der Projektleitung, keine Rechtsgutachten. Es wurde kein Modell trainiert oder evaluiert, und die manuelle Qualitätsstichprobe hat der umsetzende KI-Engineering-Assistent geprüft, nicht eine autorisierte prüfende Person. Die Codebeispiele sind vereinfacht und für diese Notiz geschrieben.",
    "Garden v2": "Garden v2",
    "Where the first note ended": "Wo die erste Notiz endete",
    "Three versions of Sentinel Garden": "Drei Fassungen von Sentinel Garden",
    "v1 stays an immutable reference and is never re-curated, so it keeps 0 approved records. The v2 count is the one after the decision of 15 November 2026.":
      "v1 bleibt eine unveränderliche Referenz und wird nie neu kuratiert; es behält daher 0 freigegebene Beispiele. Der Wert für v2 gilt nach der Entscheidung vom 15. November 2026.",
    Measure: "Kennzahl",
    v1: "v1",
    v2: "v2",
    v3: "v3",
    "Candidate fixes": "Kandidaten",
    "Fix commits turned into records":
      "Fix-Commits, aus denen Beispiele wurden",
    "Records accepted": "Akzeptierte Beispiele",
    "Vulnerable/fixed pairs":
      "Paare aus verwundbarer und korrigierter Funktion",
    "CWEs among findings": "CWEs unter den Befunden",
    "Training-approved records": "Für das Training freigegebene Beispiele",
    "More room per project, three small extraction fixes":
      "Mehr Platz pro Projekt, drei kleine Korrekturen am Extraktor",
    "Advisories with several fix commits in one repository":
      "Advisories mit mehreren Fix-Commits in einem Repository",
    "Build outcomes for the 1,128 candidates that Garden v3 added. Each candidate is counted once.":
      "Ergebnisse der Build-Stufe für die 1.128 Kandidaten, die Garden v3 hinzugefügt hat. Jeder Kandidat wird einmal gezählt.",
    "Unambiguous fix, records built": "Eindeutiger Fix, Beispiele gebaut",
    "Commits make different changes":
      "Commits nehmen unterschiedliche Änderungen vor",
    "A companion commit changes dependencies, vendored code, other languages or configuration":
      "Ein Begleit-Commit ändert Abhängigkeiten, mitgelieferten Fremdcode, andere Sprachen oder Konfiguration",
    "Rejected by the same rules as single-commit fixes":
      "Verworfen nach denselben Regeln wie Fixes mit einem Commit",
    "What code review found in the commit rule":
      "Was das Code-Review an der Commit-Regel fand",
    "The same change at two positions is a fix in two steps":
      "Dieselbe Änderung an zwei Stellen ist ein Fix in zwei Schritten",
    "Simplified example written for this note. Both commits add exactly the same line to the same file. Without positions they looked like one change applied twice, as in a backport.":
      "Vereinfachtes Beispiel, für diese Notiz geschrieben. Beide Commits fügen derselben Datei genau dieselbe Zeile hinzu. Ohne Positionen sahen sie aus wie eine Änderung, die zweimal angewendet wurde, wie bei einem Backport.",
    "After commit 1": "Nach Commit 1",
    "Still vulnerable": "Noch verwundbar",
    "After commit 2": "Nach Commit 2",
    "The check guards only the default path. The legacy branch still reads any path, so this version must not become a hard negative.":
      "Die Prüfung schützt nur den Standardpfad. Der Legacy-Zweig liest weiterhin jeden beliebigen Pfad; diese Fassung darf daher kein Hard Negative werden.",
    "The identical line, now inside the legacy branch. Only after this commit is the function fixed, which is why the position of a change is part of the comparison.":
      "Dieselbe Zeile, jetzt im Legacy-Zweig. Erst nach diesem Commit ist die Funktion behoben; deshalb gehört die Position einer Änderung zum Vergleich.",
    "Reviewing the rights of every repository":
      "Die Rechte jedes Repositorys prüfen",
    "What was approved": "Was freigegeben wurde",
    "Copyleft and unknown licenses were never proposed; approving one would need a written justification in addition to the approval.":
      "Copyleft- und unbekannte Lizenzen wurden nie vorgeschlagen; ihre Freigabe erforderte zusätzlich eine schriftliche Begründung.",
    Approved: "Freigegeben",
    "Left out": "Ausgelassen",
    "The GitHub Advisory Database, OSV and the upstream fix commits as sources; 484 tier A repositories: MIT 318, Apache-2.0 120, BSD-3-Clause 30, BSD-2-Clause 9, ISC 7":
      "Die GitHub Advisory Database, OSV und die Upstream-Fix-Commits als Quellen; 484 Repositories der Stufe A: MIT 318, Apache-2.0 120, BSD-3-Clause 30, BSD-2-Clause 9, ISC 7",
    "42 clarification cases, every tier B, C and D repository, and 24 tier A repositories that also have holdout or quarantine records":
      "42 Klärungsfälle, alle Repositories der Stufen B, C und D sowie 24 Repositories der Stufe A, die auch Beispiele in Hold-out oder Quarantäne haben",
    "51 tier B repositories inspected like tier A: 28 without a usable registry license, 23 whose registry entry also lists bundled licenses":
      "51 Repositories der Stufe B, geprüft wie Stufe A: 28 ohne verwertbare Registry-Lizenz, 23, deren Registry-Eintrag zusätzlich Lizenzen mitgelieferten Codes nennt",
    "26 newly recommended tier A repositories, 16 with an updated license text, 2 under the Unlicense and all clarification cases":
      "26 neu empfohlene Repositories der Stufe A, 16 mit aktualisiertem Lizenztext, 2 unter der Unlicense und alle Klärungsfälle",
    "When the loader and the export disagree":
      "Wenn Loader und Export sich widersprechen",
    "The approved training data": "Die freigegebenen Trainingsdaten",
    "Training and validation examples": "Trainings- und Validierungsbeispiele",
    "Detection examples ask for a finding, a no-finding answer or an abstention. Patch examples ask for the minimal fix of a vulnerable function, verified against the upstream fix.":
      "Erkennungsbeispiele verlangen einen Befund, eine Antwort ohne Befund oder eine Enthaltung. Patch-Beispiele verlangen den minimalen Fix einer verwundbaren Funktion, geprüft am Upstream-Fix.",
    "Findings by weakness family": "Befunde nach Schwachstellenfamilie",
    "668 findings across 131 CWEs in the approved records. SQL injection and code injection remain thin.":
      "668 Befunde über 131 CWEs in den freigegebenen Beispielen. SQL-Injection und Code-Injection bleiben dünn besetzt.",
    Family: "Familie",
    Findings: "Befunde",
    "Resource limits and ReDoS": "Ressourcengrenzen und ReDoS",
    "Path traversal": "Path Traversal",
    "Authentication and authorization": "Authentifizierung und Autorisierung",
    "Other weaknesses": "Sonstige Schwachstellen",
    "Cross-site scripting": "Cross-Site-Scripting",
    "Prototype pollution": "Prototype Pollution",
    "Deserialization and input validation":
      "Deserialisierung und Eingabeprüfung",
    "Information exposure": "Offenlegung von Informationen",
    "Command injection": "Command Injection",
    "Open redirect and SSRF": "Open Redirect und SSRF",
    "Cryptography and TLS": "Kryptografie und TLS",
    "Code injection": "Code-Injection",
    "SQL injection": "SQL-Injection",
    "Rebuilding exactly the approved data":
      "Genau die freigegebenen Daten neu bauen",
    "What is still open": "Was noch offen ist",
    "Lessons for turning a dataset into training data":
      "Lehren auf dem Weg vom Datensatz zu Trainingsdaten",
    "Fixes spread over several commits":
      "Fixes, die sich über mehrere Commits verteilen",
    "Training authorization": "Trainingsfreigabe",
    "4,830": "4.830",
    "6,623": "6.623",
    "7,751": "7.751",
    "1,725": "1.725",
    "1,825": "1.825",
    "2,773": "2.773",
    "3,971": "3.971",
    "4,200": "4.200",
    "3,226": "3.226",
    "1,278": "1.278",
    "1,363": "1.363",
    "1,297": "1.297",
    "1,464": "1.464",
    "1,331": "1.331",
    "1,871": "1.871",
    "3,427": "3.427",
    Audited: "Auditiert",
    "From audited records to approved training data":
      "Von auditierten Beispielen zu freigegebenen Trainingsdaten",
    "Approved training data": "Freigegebene Trainingsdaten",
    "Research note: approved training data":
      "Forschungsnotiz: freigegebene Trainingsdaten",
    "From Audited Records to Approved Training Data — rappidAI Research":
      "Von auditierten Beispielen zu freigegebenen Trainingsdaten – rappidAI Research",
    "A research note on Sentinel Garden v3: fixes spread over several commits, the rights review of 878 repositories, 1,464 approved training records for Quantum Sentinel-Alpha and what is still open before training.":
      "Eine Forschungsnotiz zu Sentinel Garden v3: Fixes über mehrere Commits, die Rechteprüfung von 878 Repositories, 1.464 freigegebene Trainingsbeispiele für Quantum Sentinel-Alpha und was vor dem Training noch offen ist.",
  };
