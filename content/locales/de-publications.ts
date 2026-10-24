// German values for the research note on false positives (content/false-positive-note.ts).
// Keys are the English source strings.
export const dePublicationTranslations: Readonly<Record<string, string>> = {
  "The False Positive Problem in AI Vulnerability Detection":
    "Das False-Positive-Problem bei der KI-gestützten Erkennung von Schwachstellen",
  "Why distinguishing real security vulnerabilities from harmless code patterns remains a fundamental challenge for AI-based security analysis.":
    "Warum es für KI-gestützte Sicherheitsanalysen nach wie vor grundlegend schwierig ist, echte Sicherheitslücken von harmlosen Codemustern zu unterscheiden.",
  "Research note": "Forschungsnotiz",
  "AI security / vulnerability detection":
    "KI-Sicherheit / Schwachstellenerkennung",
  "24 October 2026": "24. Oktober 2026",
  "This research note is a technical analysis of published research and of rappidAI's development plan. It reports no new experiment, dataset or benchmark, and no detection performance of Quantum Sentinel-Alpha has been measured or published.":
    "Diese Forschungsnotiz ist eine technische Analyse veröffentlichter Forschung und des Entwicklungsplans von rappidAI. Sie berichtet über kein neues Experiment, keinen Datensatz und keinen Benchmark. Für Quantum Sentinel-Alpha wurde bislang keine Erkennungsleistung gemessen oder veröffentlicht.",
  "The reliability problem": "Die Frage der Zuverlässigkeit",
  "Language models are increasingly used to read source code and point to potential security weaknesses: in code-review assistants, in pull-request automation and as an additional layer next to static analysis. They can read unfamiliar code, take naming and intent into account and explain a finding in plain language. Whether the finding is correct is a separate question.":
    "Sprachmodelle lesen zunehmend Quellcode und weisen auf mögliche Sicherheitslücken hin: in Assistenten für Code-Reviews, in der Automatisierung von Pull Requests und als zusätzliche Ebene neben der statischen Analyse. Sie können unbekannten Code lesen, Benennungen und Absichten berücksichtigen und einen Befund verständlich erklären. Ob der Befund stimmt, ist eine andere Frage.",
  "A detector that labels code as vulnerable or not vulnerable produces four kinds of outcome. A true positive is a real vulnerability that is reported. A false positive is a report on code that is not vulnerable. A false negative is a real vulnerability that is missed. A true negative is safe code that is correctly left alone. Figure 1 places the four outcomes side by side.":
    "Ein Detektor, der Code als verwundbar oder nicht verwundbar einstuft, kann zu vier Ergebnissen kommen. Richtig positiv ist eine echte Schwachstelle, die gemeldet wird. Falsch positiv – ein Fehlalarm – ist eine Meldung zu Code, der nicht verwundbar ist. Falsch negativ ist eine echte Schwachstelle, die übersehen wird. Richtig negativ ist sicherer Code, der zu Recht nicht gemeldet wird. Abbildung 1 stellt die vier Ergebnisse nebeneinander.",
  "The difficult part is deciding what counts as vulnerable. CWE describes SQL injection as an SQL command built from externally influenced input without neutralising special elements that could modify the intended command [1]. That definition contains conditions a pattern cannot check by itself: the input has to be influenced from outside, it has to reach the query, and nothing on the way may neutralise it. Concatenating strings into a query looks suspicious. It is a vulnerability only when those conditions hold.":
    "Schwierig ist die Frage, was als verwundbar gilt. CWE beschreibt SQL-Injection als SQL-Befehl, der aus von außen beeinflussten Eingaben gebildet wird, ohne Sonderzeichen zu neutralisieren, die den beabsichtigten Befehl verändern könnten [1]. Diese Definition enthält Bedingungen, die ein Muster allein nicht prüfen kann: Die Eingabe muss von außen beeinflusst sein, sie muss die Abfrage erreichen, und nichts auf dem Weg darf sie neutralisieren. Wenn Zeichenketten zu einer Abfrage zusammengesetzt werden, wirkt das verdächtig. Eine Schwachstelle ist es nur, wenn diese Bedingungen erfüllt sind.",
  "In this note, a finding counts as correct when the weakness is reachable from attacker-influenced input under the application's realistic assumptions. Proving full exploitability usually requires more than the code alone provides, which is part of the problem described here.":
    "In dieser Notiz gilt ein Befund als korrekt, wenn die Schwachstelle unter den realistischen Annahmen der Anwendung über vom Angreifer beeinflusste Eingaben erreichbar ist. Um die volle Ausnutzbarkeit nachzuweisen, reicht der Code allein meist nicht aus – auch das gehört zu dem hier beschriebenen Problem.",
  "The central question is therefore: how can AI-based vulnerability detection distinguish genuinely exploitable security weaknesses from code that merely appears dangerous?":
    "Daraus ergibt sich die zentrale Frage: Wie kann KI-gestützte Schwachstellenerkennung tatsächlich ausnutzbare Sicherheitslücken von Code unterscheiden, der nur gefährlich aussieht?",
  "Figure 1": "Abbildung 1",
  "Four possible outcomes of a vulnerability report":
    "Die vier möglichen Ergebnisse einer Schwachstellenmeldung",
  "False positives cost review time; false negatives leave a weakness in place. Both are errors, but they are measured and traded off separately.":
    "Fehlalarme kosten Prüfzeit, falsch negative Ergebnisse lassen eine Schwachstelle bestehen. Beides sind Fehler, sie werden aber getrennt gemessen und gegeneinander abgewogen.",
  "Code is vulnerable": "Code ist verwundbar",
  "Code is not vulnerable": "Code ist nicht verwundbar",
  Reported: "Gemeldet",
  "Not reported": "Nicht gemeldet",
  "True positive": "Richtig positiv",
  "A real weakness is reported.": "Eine echte Schwachstelle wird gemeldet.",
  "False positive": "Falsch positiv",
  "Safe code is reported as vulnerable.":
    "Sicherer Code wird als verwundbar gemeldet.",
  "False negative": "Falsch negativ",
  "A real weakness is missed.": "Eine echte Schwachstelle wird übersehen.",
  "True negative": "Richtig negativ",
  "Safe code is correctly left alone.":
    "Sicherer Code wird zu Recht nicht gemeldet.",
  "Why false positives occur": "Wie Fehlalarme entstehen",
  "False positives are rarely random. They usually follow from information a detector lacks or misreads. The causes below overlap in practice; separating them shows which kind of evidence would be needed to resolve each one.":
    "Fehlalarme sind selten zufällig. Meist gehen sie auf Informationen zurück, die einem Detektor fehlen oder die er falsch deutet. Die folgenden Ursachen überschneiden sich in der Praxis. Getrennt betrachtet zeigen sie aber, welche Art von Beleg jeweils nötig wäre, um sie aufzulösen.",
  "Incomplete application context": "Unvollständiger Anwendungskontext",
  "Whether a value is attacker-controlled is often decided far from the line that uses it: in a router, a configuration file, a queue consumer or another service. A model that sees one function at a time has to guess where its arguments come from. A string parameter called query may hold a constant chosen by the program or text typed by an anonymous user; the function body alone does not say which.":
    "Ob ein Wert von einem Angreifer kontrolliert wird, entscheidet sich oft weit entfernt von der Zeile, die ihn verwendet: in einem Router, einer Konfigurationsdatei, einem Queue-Consumer oder einem anderen Dienst. Ein Modell, das jeweils nur eine Funktion sieht, muss raten, woher deren Argumente stammen. Ein String-Parameter namens query kann eine vom Programm gewählte Konstante enthalten oder Text, den ein anonymer Nutzer eingegeben hat. Der Funktionsrumpf allein verrät nicht, was davon zutrifft.",
  "Misread validation and sanitisation":
    "Falsch gedeutete Validierung und Bereinigung",
  "Defences are often implemented away from the dangerous call: an allowlist in a request schema, a type conversion that rejects non-numeric input, a query builder that binds parameters, or a template engine that escapes output by default. A detector that does not recognise the defence, or recognises only its textbook form, reports the sink as unprotected. The opposite error also occurs: a sanitiser that looks correct but is applied for the wrong context, such as HTML escaping for a value that ends up in a URL.":
    "Schutzmaßnahmen liegen oft nicht direkt am gefährlichen Aufruf: eine Allowlist im Anfrageschema, eine Typumwandlung, die nicht numerische Eingaben ablehnt, ein Query Builder, der Parameter bindet, oder eine Template-Engine, die Ausgaben standardmäßig maskiert. Ein Detektor, der die Schutzmaßnahme nicht erkennt oder nur ihre Lehrbuchform kennt, meldet die Stelle als ungeschützt. Auch der umgekehrte Fehler kommt vor: eine Bereinigung, die korrekt aussieht, aber für den falschen Kontext gedacht ist – etwa HTML-Maskierung für einen Wert, der in einer URL landet.",
  "Unknown execution paths and reachability":
    "Unbekannte Ausführungspfade und Erreichbarkeit",
  "Vulnerable-looking code is a vulnerability only if attacker-influenced data can reach it. Dead code, test fixtures, administrative scripts that run only with local credentials and disabled feature flags all change the answer. Reachability is a whole-program property. Static analysers approximate it with call graphs and taint tracking; a model reading an isolated snippet cannot determine it unless that context is supplied.":
    "Code, der verwundbar aussieht, ist nur dann eine Schwachstelle, wenn vom Angreifer beeinflusste Daten ihn erreichen können. Toter Code, Testfixtures, Administrationsskripte, die nur mit lokalen Zugangsdaten laufen, und deaktivierte Feature-Flags verändern die Antwort. Erreichbarkeit ist eine Eigenschaft des gesamten Programms. Statische Analysewerkzeuge nähern sie mit Aufrufgraphen und Taint-Tracking an. Ein Modell, das einen isolierten Ausschnitt liest, kann sie nicht bestimmen, solange dieser Kontext fehlt.",
  "Suspicious syntax versus an actual weakness":
    "Verdächtige Syntax und tatsächliche Schwachstellen",
  "Many constructs that security guidance warns about are dangerous only under conditions: string-built SQL, eval and exec, shell invocation, deserialisation, or disabled certificate checks in test code. Studies of learned detectors have found that models pick up unrelated features of the training data, including specific variable and function names, instead of the cause of the vulnerability [2][3]. A model that has learned that a construct correlates with vulnerable labels will report the construct even where the conditions for a vulnerability are absent. Example 1 shows two functions with nearly the same syntax and different risk.":
    "Viele Konstrukte, vor denen Sicherheitsrichtlinien warnen, sind nur unter bestimmten Bedingungen gefährlich: aus Strings gebautes SQL, eval und exec, Shell-Aufrufe, Deserialisierung oder deaktivierte Zertifikatsprüfungen in Testcode. Untersuchungen gelernter Detektoren zeigen, dass Modelle sachfremde Merkmale der Trainingsdaten aufgreifen, etwa bestimmte Variablen- und Funktionsnamen, statt der eigentlichen Ursache einer Schwachstelle [2][3]. Hat ein Modell gelernt, dass ein Konstrukt mit dem Label „verwundbar“ korreliert, meldet es das Konstrukt auch dort, wo die Bedingungen für eine Schwachstelle fehlen. Beispiel 1 zeigt zwei Funktionen mit fast gleicher Syntax und unterschiedlichem Risiko.",
  "Missing knowledge of frameworks, dependencies and boundaries":
    "Fehlendes Wissen über Frameworks, Abhängigkeiten und Grenzen",
  "Frameworks move security decisions out of application code. Query builders bind parameters, web frameworks escape output and check request origins, and containers or sandboxes limit what a compromised process can reach. Without knowing which framework and version are in use and how they are configured, a detector cannot tell whether a line is protected by the framework or bypasses it.":
    "Frameworks verlagern Sicherheitsentscheidungen aus dem Anwendungscode. Query Builder binden Parameter, Web-Frameworks maskieren Ausgaben und prüfen die Herkunft von Anfragen, und Container oder Sandboxes begrenzen, worauf ein kompromittierter Prozess zugreifen kann. Ohne zu wissen, welches Framework in welcher Version und Konfiguration eingesetzt wird, kann ein Detektor nicht erkennen, ob eine Zeile vom Framework geschützt wird oder es umgeht.",
  "Overconfident classification": "Zu selbstsichere Einstufung",
  "A binary vulnerable or safe output hides uncertainty. Language models produce fluent explanations whether or not the evidence supports them, so a speculative finding can read as confidently as a verified one. A CWE identifier attached to a guess makes the guess look more authoritative than it is.":
    "Eine binäre Ausgabe – verwundbar oder sicher – verdeckt Unsicherheit. Sprachmodelle formulieren flüssige Erklärungen, ob die Belege sie stützen oder nicht. Ein spekulativer Befund kann sich deshalb genauso sicher lesen wie ein geprüfter. Eine CWE-Kennung an einer Vermutung lässt die Vermutung verlässlicher erscheinen, als sie ist.",
  "Example 1": "Beispiel 1",
  "Similar syntax, different risk (CWE-89)":
    "Ähnliche Syntax, unterschiedliches Risiko (CWE-89)",
  "Illustrative code. Whether the second function is exploitable still depends on where username comes from; whether the first stays safe depends on the allowlist not changing.":
    "Illustrativer Code. Ob die zweite Funktion ausnutzbar ist, hängt weiterhin davon ab, woher username stammt; ob die erste sicher bleibt, davon, dass die Allowlist unverändert bleibt.",
  "Often reported · not exploitable as written":
    "Wird oft gemeldet · so nicht ausnutzbar",
  "The query is assembled with an f-string, the pattern many detectors flag. The only inserted value comes from an application-owned allowlist: user input selects one of two fixed column names but never reaches the SQL text. OWASP recommends this mapping for identifiers that cannot be bound as parameters [4].":
    "Die Abfrage wird mit einem f-String zusammengesetzt – genau das Muster, das viele Detektoren melden. Der einzige eingefügte Wert stammt aber aus einer Allowlist der Anwendung: Die Nutzereingabe wählt einen von zwei festen Spaltennamen, erreicht den SQL-Text jedoch nie. OWASP empfiehlt diese Zuordnung für Bezeichner, die sich nicht als Parameter binden lassen [4].",
  "Vulnerable · true positive": "Verwundbar · richtig positiv",
  "Here the caller's value becomes part of the SQL text. If username can be influenced by a request, input such as ' OR '1'='1 changes the structure of the query. Binding the value as a parameter removes the weakness [1][4].":
    "Hier wird der Wert des Aufrufers Teil des SQL-Textes. Lässt sich username über eine Anfrage beeinflussen, verändert eine Eingabe wie ' OR '1'='1 die Struktur der Abfrage. Wird der Wert als Parameter gebunden, entfällt die Schwachstelle [1][4].",
  "Example 2": "Beispiel 2",
  "A defence the detector has to recognise (CWE-22)":
    "Eine Schutzmaßnahme, die der Detektor erkennen muss (CWE-22)",
  "Illustrative code. The check addresses the traversal shown here; it does not cover every case, such as a symbolic link replaced after the check. Calling code safe is also a claim with a scope.":
    "Illustrativer Code. Die Prüfung verhindert die hier gezeigte Traversal; sie deckt aber nicht jeden Fall ab, etwa einen symbolischen Link, der nach der Prüfung ersetzt wird. Auch die Aussage, Code sei sicher, hat einen Geltungsbereich.",
  "A name such as ../../etc/passwd resolves to a file outside the upload directory [5].":
    "Ein Name wie ../../etc/passwd verweist auf eine Datei außerhalb des Upload-Verzeichnisses [5].",
  "Defended · often still reported": "Abgesichert · wird oft trotzdem gemeldet",
  "The path is canonicalised and checked against the base directory before it is used, the mitigation CWE-22 describes [5]. A detector that reports any user-influenced value reaching a file read will flag both versions unless it understands what resolve() and is_relative_to() establish.":
    "Der Pfad wird kanonisiert und vor der Verwendung gegen das Basisverzeichnis geprüft – die Gegenmaßnahme, die CWE-22 beschreibt [5]. Ein Detektor, der jeden vom Nutzer beeinflussten Wert meldet, der einen Dateizugriff erreicht, markiert beide Versionen, solange er nicht versteht, was resolve() und is_relative_to() sicherstellen.",
  "The cost of incorrect findings": "Was falsche Befunde kosten",
  "Every reported finding has to be triaged by a person. A false positive costs the time needed to read the code, trace the data and conclude that nothing needs to change; for a subtle finding, that can take as long as confirming a real one. The OWASP Benchmark reflects this by scoring tools on the true positive rate minus the false positive rate, rather than on detections alone [6].":
    "Jeder gemeldete Befund muss von einem Menschen eingeordnet werden. Ein Fehlalarm kostet die Zeit, die nötig ist, um den Code zu lesen, den Datenfluss nachzuvollziehen und festzustellen, dass nichts geändert werden muss. Bei einem subtilen Befund kann das ebenso lange dauern wie die Bestätigung einer echten Schwachstelle. Der OWASP Benchmark trägt dem Rechnung: Er bewertet Werkzeuge nach der Rate richtig positiver abzüglich der Rate falsch positiver Ergebnisse statt nur nach Treffern [6].",
  "False positives also change behaviour. In interviews about static analysis tools, developers named false positives and the way warnings are presented among the barriers to using them [7]. Google's static analysis platform counts an issue as an effective false positive when developers take no positive action after seeing it; code-review checks are expected to stay below 10% effective false positives, and an analyser whose share of “not useful” feedback rises above 10% can be disabled until it improves [8]. The exact threshold matters less than the mechanism: noisy tools get ignored, and an ignored tool no longer catches real vulnerabilities.":
    "Fehlalarme verändern auch das Verhalten. In Interviews zu statischen Analysewerkzeugen nannten Entwickler Fehlalarme und die Art, wie Warnungen präsentiert werden, als Hürden für deren Nutzung [7]. Googles Plattform für statische Analyse wertet einen Befund als effektiven Fehlalarm, wenn Entwickler nach dem Lesen nichts unternehmen. Prüfungen im Code-Review sollen unter 10 % effektiven Fehlalarmen bleiben, und ein Analysewerkzeug, dessen Anteil an „Not useful“-Rückmeldungen 10 % übersteigt, kann abgeschaltet werden, bis es verbessert ist [8]. Entscheidend ist weniger der genaue Schwellenwert als der Mechanismus: Werkzeuge, die zu viel Rauschen erzeugen, werden ignoriert – und ein ignoriertes Werkzeug findet auch keine echten Schwachstellen mehr.",
  "This creates a second risk. When most alerts turn out to be harmless, reviewers learn to dismiss alerts quickly, and a genuine vulnerability reported in the same form as the noise is more likely to be dismissed with it. Low precision therefore costs more than time; it can let real weaknesses through.":
    "Daraus entsteht ein zweites Risiko. Wenn sich die meisten Warnungen als harmlos erweisen, gewöhnen sich Prüfende an, Warnungen schnell abzuhaken. Eine echte Schwachstelle, die in derselben Form gemeldet wird wie das Rauschen, wird dann eher mit abgehakt. Geringe Präzision kostet also nicht nur Zeit; sie kann echte Schwachstellen durchlassen.",
  "These consequences need to be read with care. The cited studies concern static analysis tools rather than language-model detectors, and they do not measure the cost of individual false positives. The link between noisy findings, alert fatigue and missed vulnerabilities is a well-supported argument, not an outcome measured for AI-based detection. rappidAI has not measured it either.":
    "Diese Folgen sind vorsichtig einzuordnen. Die zitierten Studien betreffen statische Analysewerkzeuge, nicht Detektoren auf Basis von Sprachmodellen, und sie messen nicht die Kosten einzelner Fehlalarme. Der Zusammenhang zwischen verrauschten Befunden, Alarmmüdigkeit und übersehenen Schwachstellen ist ein gut begründetes Argument, aber kein für KI-gestützte Erkennung gemessenes Ergebnis. Auch rappidAI hat ihn nicht gemessen.",
  "Hard negatives and context-aware training":
    "Hard Negatives und kontextbewusstes Training",
  "If false positives arise because a model associates surface patterns with vulnerability labels, the training data has to break that association. What matters is not only how many vulnerable examples a dataset contains, but which safe examples it contains.":
    "Wenn Fehlalarme entstehen, weil ein Modell Oberflächenmuster mit dem Label „verwundbar“ verknüpft, müssen die Trainingsdaten diese Verknüpfung aufbrechen. Entscheidend ist nicht nur, wie viele verwundbare Beispiele ein Datensatz enthält, sondern welche sicheren Beispiele er enthält.",
  "Hard negative examples": "Hard Negatives",
  "A hard negative is safe code that resembles vulnerable code: string-built SQL with an allowlisted identifier, a file read behind a correct containment check, deserialisation of trusted, signed data. Randomly chosen safe functions teach little about this boundary, because they differ from vulnerable code in many unrelated ways. Hard negatives move the distinction onto the property that actually matters.":
    "Ein Hard Negative ist sicherer Code, der verwundbarem Code ähnelt: aus Strings gebautes SQL mit einem Bezeichner aus einer Allowlist, ein Dateizugriff hinter einer korrekten Pfadprüfung, die Deserialisierung vertrauenswürdiger, signierter Daten. Zufällig ausgewählte sichere Funktionen lehren über diese Grenze wenig, weil sie sich in vielen sachfremden Punkten von verwundbarem Code unterscheiden. Hard Negatives verlagern die Unterscheidung auf die Eigenschaft, auf die es tatsächlich ankommt.",
  "Vulnerable and patched pairs":
    "Paare aus verwundbarer und gepatchter Version",
  "A vulnerability-fixing commit provides two versions of the same function that differ mainly in the fix. Such pairs are a natural source of hard negatives and a demanding test. Risse and Böhme found that top-performing machine-learning detectors could not distinguish vulnerable functions from their patched versions, and proposed adding patched code to test sets [3]. PrimeVul evaluates each pair as a unit and counts how often a model labels both versions correctly [9].":
    "Ein Commit, der eine Schwachstelle behebt, liefert zwei Versionen derselben Funktion, die sich vor allem im Fix unterscheiden. Solche Paare sind eine naheliegende Quelle für Hard Negatives und ein anspruchsvoller Test. Risse und Böhme stellten fest, dass leistungsstarke ML-Detektoren verwundbare Funktionen nicht von ihren gepatchten Versionen unterscheiden konnten, und schlugen vor, gepatchten Code in Testsets aufzunehmen [3]. PrimeVul bewertet jedes Paar als Einheit und zählt, wie oft ein Modell beide Versionen richtig einstuft [9].",
  "Context-preserving samples": "Trainingsbeispiele mit Kontext",
  "Most public datasets are built at function level, which removes callers, configuration and framework context, the information identified above as decisive. Samples that keep the call path to a sink, the validation applied on the way and the framework in use let a model learn the conditions of a vulnerability rather than its appearance. They are also more expensive to build and harder to label.":
    "Die meisten öffentlichen Datensätze sind auf Funktionsebene aufgebaut. Dabei gehen Aufrufer, Konfiguration und Framework-Kontext verloren – genau die Informationen, die sich oben als entscheidend erwiesen haben. Beispiele, die den Aufrufpfad zur gefährlichen Stelle, die Validierung auf dem Weg und das verwendete Framework erhalten, ermöglichen es einem Modell, die Bedingungen einer Schwachstelle zu lernen statt ihres Aussehens. Sie sind allerdings aufwendiger zu erstellen und schwieriger zu labeln.",
  "Diverse secure implementations": "Vielfältige sichere Implementierungen",
  "Safe code is not one pattern. The same defence can be written with a framework feature, a helper function, a type constraint or an explicit check. If the training data shows only one form, a model may treat that form as the definition of safe and report every other form as missing. Synthetic suites show the risk. NIST's Juliet suite pairs flawed and non-flawed sources for the same sink [10], and its release notes state that the good code in thousands of files fixes the problem by simply using a hardcoded value [11], a shortcut a model can learn without understanding any defence.":
    "Sicherer Code folgt nicht einem einzigen Muster. Dieselbe Schutzmaßnahme lässt sich mit einer Framework-Funktion, einer Hilfsfunktion, einer Typbeschränkung oder einer expliziten Prüfung umsetzen. Zeigen die Trainingsdaten nur eine Form, hält ein Modell diese Form womöglich für die Definition von „sicher“ und meldet jede andere als fehlend. Synthetische Testsammlungen verdeutlichen das Risiko. Die Juliet-Suite des NIST kombiniert fehlerhafte und fehlerfreie Datenquellen für dieselbe Stelle [10]. Laut ihren Release Notes behebt der „gute“ Code in Tausenden Dateien das Problem schlicht mit einem fest codierten Wert [11] – eine Abkürzung, die ein Modell lernen kann, ohne irgendeine Schutzmaßnahme zu verstehen.",
  "Realistic vulnerability datasets": "Realistische Schwachstellendatensätze",
  "Datasets built from real projects and real fixes reflect what a deployed detector faces, including the imbalance between rare vulnerable functions and abundant safe ones. Chakraborty et al. reported that deep-learning detectors lost more than half of their reported performance in a realistic setting and traced part of the drop to duplicated samples and an unrealistic class balance [2]. In the PrimeVul study, a state-of-the-art 7B model reached 68.26% F1 on BigVul but 3.09% on PrimeVul [9].":
    "Datensätze aus echten Projekten und echten Fixes bilden ab, womit ein eingesetzter Detektor konfrontiert ist – einschließlich des Ungleichgewichts zwischen seltenen verwundbaren und zahlreichen sicheren Funktionen. Chakraborty et al. berichten, dass Deep-Learning-Detektoren in einem realistischen Szenario mehr als die Hälfte ihrer zuvor berichteten Leistung einbüßten, und führen das teilweise auf doppelte Beispiele und ein unrealistisches Klassenverhältnis zurück [2]. In der PrimeVul-Studie erreichte ein aktuelles 7B-Modell auf BigVul einen F1-Wert von 68,26 %, auf PrimeVul dagegen nur 3,09 % [9].",
  "Contamination and label quality": "Kontamination und Label-Qualität",
  "Labels derived automatically from fixing commits are noisy, because a commit that fixes a vulnerability often changes other functions as well. Croft et al. found 20–71% of vulnerable labels inaccurate and 17–99% of data points duplicated in the real-world datasets they examined [12]. For vulnerable functions in widely used datasets without manual verification, PrimeVul reports label accuracy between 25% and 60%, drawing on the audit published with DiverseVul [9][13]. Duplicates and leakage between training and test data inflate results further; PrimeVul counters this with de-duplication and chronological splits [9].":
    "Labels, die automatisch aus Fix-Commits abgeleitet werden, sind verrauscht, weil ein Commit, der eine Schwachstelle behebt, oft auch andere Funktionen ändert. Croft et al. fanden in den untersuchten realen Datensätzen 20–71 % ungenaue Labels für verwundbaren Code und 17–99 % doppelte Datenpunkte [12]. Für verwundbare Funktionen in verbreiteten Datensätzen ohne manuelle Prüfung nennt PrimeVul eine Label-Genauigkeit zwischen 25 % und 60 % und stützt sich dabei auf die mit DiverseVul veröffentlichte Prüfung [9][13]. Duplikate und Überschneidungen zwischen Trainings- und Testdaten verzerren die Ergebnisse zusätzlich. PrimeVul begegnet dem mit Deduplizierung und einer chronologischen Aufteilung [9].",
  "These methods address plausible causes of false positives. Whether they reduce false positives in practice, and at what cost to recall, can only be shown by evaluation on data the model has not seen. This note does not claim that they do.":
    "Diese Methoden setzen an plausiblen Ursachen von Fehlalarmen an. Ob sie Fehlalarme in der Praxis verringern und was das an Recall kostet, lässt sich nur durch eine Evaluation auf Daten zeigen, die das Modell nicht kennt. Diese Notiz behauptet nicht, dass sie es tun.",
  "Evaluating detection quality": "Die Qualität der Erkennung bewerten",
  "Accuracy, the share of all samples classified correctly, says little about vulnerability detection because vulnerable code is rare. If one function in a hundred is vulnerable, a detector that never reports anything is 99% accurate and useless. Arp et al. list this base-rate fallacy, together with inappropriate performance measures, among the recurring pitfalls of machine learning in security [14].":
    "Die Accuracy, also der Anteil aller richtig eingestuften Beispiele, sagt über Schwachstellenerkennung wenig aus, weil verwundbarer Code selten ist. Ist eine von hundert Funktionen verwundbar, erreicht ein Detektor, der nie etwas meldet, eine Accuracy von 99 % – und ist nutzlos. Arp et al. zählen diesen Basisraten-Fehlschluss und ungeeignete Leistungsmaße zu den wiederkehrenden Fallstricken des maschinellen Lernens in der IT-Sicherheit [14].",
  "Table 1 lists the metrics that separate the two kinds of error. Precision and recall trade off against each other: lowering the threshold at which a detector reports a finding usually raises recall and lowers precision. A single F1 score hides where on that curve a detector operates, and when the positive class is rare, precision-recall curves are more informative than ROC curves [15]. For a review tool, a useful report states recall at a fixed, acceptable false positive rate. PrimeVul's VD-S metric follows this idea by measuring the false negative rate at a false positive rate of at most 0.5% [9].":
    "Tabelle 1 zeigt die Metriken, die beide Fehlerarten getrennt erfassen. Präzision und Recall stehen in einem Zielkonflikt: Senkt man die Schwelle, ab der ein Detektor einen Befund meldet, steigt meist der Recall, während die Präzision sinkt. Ein einzelner F1-Wert verschweigt, an welcher Stelle dieser Kurve ein Detektor arbeitet. Ist die positive Klasse selten, sind Precision-Recall-Kurven aussagekräftiger als ROC-Kurven [15]. Für ein Review-Werkzeug ist eine Angabe nützlich, die den Recall bei einer festen, noch akzeptablen Fehlalarmrate nennt. PrimeVuls Metrik VD-S folgt diesem Gedanken: Sie misst die Rate falsch negativer Ergebnisse bei einer Fehlalarmrate von höchstens 0,5 % [9].",
  "The evaluation data shapes the result as much as the metric. A test set with obvious vulnerabilities and unrelated safe code measures whether a model can tell the two apart, not whether it can tell a vulnerability from its fix. Test sets should therefore include hard negatives, patched versions of vulnerable functions and safe implementations in several styles. The OWASP Benchmark mixes real vulnerabilities with test cases that look vulnerable but cannot be exploited [6]; Juliet pairs flawed and non-flawed variants [10].":
    "Die Testdaten prägen das Ergebnis ebenso stark wie die Metrik. Ein Testset aus offensichtlichen Schwachstellen und beliebigem sicherem Code misst, ob ein Modell beides auseinanderhalten kann – nicht, ob es eine Schwachstelle von ihrem Fix unterscheidet. Testsets sollten deshalb Hard Negatives, gepatchte Versionen verwundbarer Funktionen und sichere Implementierungen in verschiedenen Stilen enthalten. Der OWASP Benchmark mischt echte Schwachstellen mit Testfällen, die verwundbar aussehen, sich aber nicht ausnutzen lassen [6]; Juliet stellt fehlerhafte und fehlerfreie Varianten gegenüber [10].",
  "Table 2 uses invented numbers to show why the choice of metric matters. Detector C reports nothing and still reaches higher accuracy than detector A. Detector A finds more vulnerabilities than B, but almost two thirds of its findings are false. Which detector is preferable depends on whether a missed vulnerability or a wasted review costs more where it runs, and that trade-off should be stated rather than hidden in one number.":
    "Tabelle 2 zeigt mit erfundenen Zahlen, warum die Wahl der Metrik wichtig ist. Detektor C meldet nichts und erreicht trotzdem eine höhere Accuracy als Detektor A. Detektor A findet mehr Schwachstellen als B, doch fast zwei Drittel seiner Befunde sind falsch. Welcher Detektor vorzuziehen ist, hängt davon ab, ob in der jeweiligen Umgebung eine übersehene Schwachstelle oder eine vergebliche Prüfung teurer ist. Dieser Zielkonflikt sollte offen benannt werden, statt ihn in einer einzigen Zahl zu verstecken.",
  "Table 1": "Tabelle 1",
  "Metrics for vulnerability detection":
    "Metriken für die Schwachstellenerkennung",
  "TP, FP, FN and TN are the counts of true positives, false positives, false negatives and true negatives from Figure 1.":
    "TP, FP, FN und TN bezeichnen die Anzahl richtig positiver, falsch positiver, falsch negativer und richtig negativer Ergebnisse aus Abbildung 1.",
  Metric: "Metrik",
  "Question it answers": "Beantwortete Frage",
  Precision: "Präzision",
  "How many reported findings are real?":
    "Wie viele gemeldete Befunde sind echt?",
  "How many real vulnerabilities are found?":
    "Wie viele echte Schwachstellen werden gefunden?",
  "False positive rate": "Fehlalarmrate (FPR)",
  "How much safe code is wrongly reported?":
    "Wie viel sicherer Code wird fälschlich gemeldet?",
  "False negative rate": "Falsch-negativ-Rate (FNR)",
  "How many real vulnerabilities are missed?":
    "Wie viele echte Schwachstellen werden übersehen?",
  "F1 score": "F1-Wert",
  "How balanced are precision and recall?":
    "Wie ausgewogen sind Präzision und Recall?",
  "Table 2": "Tabelle 2",
  "Hypothetical illustration, not a measurement":
    "Hypothetisches Beispiel, keine Messung",
  "Invented test set of 1,000 functions: 50 vulnerable, 950 safe. The detectors are fictional; no rappidAI model or published tool was evaluated. Precision and F1 are undefined for a detector that reports nothing (—).":
    "Erfundenes Testset aus 1.000 Funktionen: 50 verwundbar, 950 sicher. Die Detektoren sind fiktiv; weder ein rappidAI-Modell noch ein veröffentlichtes Werkzeug wurde evaluiert. Für einen Detektor, der nichts meldet, sind Präzision und F1 nicht definiert (—).",
  Detector: "Detektor",
  "A · reports 120": "A · 120 Meldungen",
  "92.0%": "92,0 %",
  "37.5%": "37,5 %",
  "90.0%": "90,0 %",
  "7.9%": "7,9 %",
  "0.53": "0,53",
  "B · reports 40": "B · 40 Meldungen",
  "97.8%": "97,8 %",
  "85.0%": "85,0 %",
  "68.0%": "68,0 %",
  "0.6%": "0,6 %",
  "0.76": "0,76",
  "C · reports nothing": "C · keine Meldung",
  "95.0%": "95,0 %",
  "0.0%": "0,0 %",
  "Research direction: Quantum Sentinel-Alpha":
    "Forschungsrichtung: Quantum Sentinel-Alpha",
  "Quantum Sentinel-Alpha is rappidAI Research's security-specialised code model in development, designed as a second security reviewer for repositories, pull requests and diffs. The questions in this note are central to it: its published development plan lists false-positive rejection, recognising similar-looking safe code as benign and abstaining instead of inventing a vulnerability, among its training objectives [16].":
    "Quantum Sentinel-Alpha ist das auf Sicherheit spezialisierte Code-Modell von rappidAI Research, das sich in Entwicklung befindet. Es ist als zweiter Sicherheitsprüfer für Repositories, Pull Requests und Diffs konzipiert. Die Fragen dieser Notiz sind dafür zentral: Der veröffentlichte Entwicklungsplan nennt das Erkennen von Fehlalarmen – ähnlich aussehenden sicheren Code als harmlos einzustufen und sich lieber zu enthalten, als eine Schwachstelle zu erfinden – als eines der Trainingsziele [16].",
  "Its current state has to be stated precisely. The primary foundation candidate is Qwen3.5-9B; the final choice follows an internal security bake-off against Qwen3.5-4B. Alpha is a development target for October 2026, not a release. No Sentinel weights, evaluation results or hardware measurements have been published, so no statement about its false positive rate can be made [16]. Table 3 separates the elements discussed here by status.":
    "Der aktuelle Stand muss genau benannt werden. Hauptkandidat für das Ausgangsmodell ist Qwen3.5-9B; die endgültige Wahl folgt einem internen Sicherheitsvergleich mit Qwen3.5-4B. Alpha ist ein Entwicklungsziel für Oktober 2026, keine Veröffentlichung. Es sind weder Sentinel-Gewichte noch Evaluationsergebnisse oder Hardwaremessungen veröffentlicht. Über die Fehlalarmrate lässt sich deshalb keine Aussage treffen [16]. Tabelle 3 ordnet die hier besprochenen Elemente nach ihrem Stand.",
  "Context-aware analysis": "Kontextbewusste Analyse",
  "The planned Sentinel Engine indexes a repository, selects relevant code and static-analysis signals and supplies them to the model [16]. The intent is to provide the information whose absence causes many false positives: where data comes from and what happens to it on the way.":
    "Die geplante Sentinel Engine indexiert ein Repository, wählt relevanten Code und Signale der statischen Analyse aus und stellt sie dem Modell bereit [16]. Ziel ist, genau die Informationen zu liefern, deren Fehlen viele Fehlalarme verursacht: woher Daten stammen und was auf dem Weg mit ihnen geschieht.",
  "Candidate findings before reported findings":
    "Mögliche Befunde vor gemeldeten Befunden",
  "In the planned pipeline, the model produces candidate findings, described as claims awaiting verification. A verifier, tests and re-analysis check the evidence and reject unsupported candidates before anything is reported as an evidence-backed finding [16]. The distinction between suspicious and demonstrated is built into the architecture instead of being left to the model's wording.":
    "In der geplanten Pipeline erzeugt das Modell mögliche Befunde, beschrieben als Aussagen, die noch geprüft werden müssen. Ein Verifier, Tests und eine erneute Analyse prüfen die Belege und verwerfen nicht gestützte Kandidaten, bevor etwas als belegter Befund gemeldet wird [16]. Die Unterscheidung zwischen verdächtig und nachgewiesen ist damit in der Architektur verankert, statt der Formulierung des Modells überlassen zu bleiben.",
  "Training on verified examples": "Training mit geprüften Beispielen",
  "The training plan combines curated vulnerability examples with fixed and vulnerable code pairs, hard negatives and false-positive rejection tasks [16]. Given the label-quality findings above, the value of these examples depends on how carefully their labels are verified.":
    "Der Trainingsplan kombiniert kuratierte Schwachstellenbeispiele mit Paaren aus behobenem und verwundbarem Code, Hard Negatives und Aufgaben zum Erkennen von Fehlalarmen [16]. Angesichts der oben genannten Befunde zur Label-Qualität hängt der Wert dieser Beispiele davon ab, wie sorgfältig ihre Labels geprüft werden.",
  "Transparent uncertainty": "Transparente Unsicherheit",
  "The development plan states that the model should express uncertainty or abstain when evidence is insufficient [16]. How confidence is calibrated and communicated, for example through the level of a result in the SARIF format [17] or an explicit needs-verification state, is still an open design question.":
    "Der Entwicklungsplan sieht vor, dass das Modell Unsicherheit benennt oder sich enthält, wenn die Belege nicht ausreichen [16]. Wie Konfidenz kalibriert und vermittelt wird – etwa über die Stufe eines Ergebnisses im SARIF-Format [17] oder einen ausdrücklichen Status „Prüfung erforderlich“ –, ist noch eine offene Gestaltungsfrage.",
  "None of these elements has been evaluated. They describe how the project intends to approach the problem, not evidence that it solves it.":
    "Keines dieser Elemente wurde bisher evaluiert. Sie beschreiben, wie das Projekt das Problem angehen will, und sind kein Beleg dafür, dass es gelöst ist.",
  "Table 3": "Tabelle 3",
  "Status of the Sentinel-Alpha elements discussed in this note":
    "Stand der in dieser Notiz besprochenen Sentinel-Alpha-Elemente",
  "Status as published on the Quantum Sentinel-Alpha model page on 24 October 2026. No component is documented as implemented and evaluated.":
    "Stand laut Modellseite von Quantum Sentinel-Alpha am 24. Oktober 2026. Keine Komponente ist als implementiert und evaluiert dokumentiert.",
  Basis: "Grundlage",
  "False-positive rejection and abstention":
    "Erkennen von Fehlalarmen und Enthaltung",
  "Research goal": "Forschungsziel",
  "Training objective in the development plan":
    "Trainingsziel im Entwicklungsplan",
  "QLoRA / LoRA fine-tuning with fixed/vulnerable pairs and hard negatives":
    "QLoRA-/LoRA-Fine-Tuning mit Paaren aus behobenem und verwundbarem Code sowie Hard Negatives",
  "Proposed method": "Vorgeschlagene Methode",
  "Published training plan": "Veröffentlichter Trainingsplan",
  "Repository context, static signals and verification of candidate findings":
    "Repository-Kontext, statische Signale und Prüfung möglicher Befunde",
  Planned: "Geplant",
  "Published architecture": "Veröffentlichte Architektur",
  "JSON / SARIF output": "Ausgabe als JSON / SARIF",
  "Detection quality, including the false positive rate":
    "Erkennungsqualität einschließlich Fehlalarmrate",
  "Not measured": "Nicht gemessen",
  "No evaluation published": "Keine Evaluation veröffentlicht",
  "Limitations and open questions": "Grenzen und offene Fragen",
  "This note analyses published research and rappidAI's own development plan; it reports no experiment. Most of the cited studies evaluate C and C++ functions from open-source projects, which may not represent Python, JavaScript / TypeScript or Go, the first languages Sentinel-Alpha is planned to cover. Several questions remain open:":
    "Diese Notiz analysiert veröffentlichte Forschung und den eigenen Entwicklungsplan von rappidAI; sie berichtet über kein Experiment. Die meisten zitierten Studien untersuchen C- und C++-Funktionen aus Open-Source-Projekten. Für Python, JavaScript / TypeScript oder Go, die ersten Sprachen, die Sentinel-Alpha abdecken soll, sind sie womöglich nicht repräsentativ. Mehrere Fragen bleiben offen:",
  "Can a model assess exploitability without runtime context such as configuration, deployment and authentication?":
    "Kann ein Modell die Ausnutzbarkeit beurteilen, ohne den Laufzeitkontext wie Konfiguration, Deployment und Authentifizierung zu kennen?",
  "How well do benchmark results transfer to repositories, frameworks and coding styles a model has not seen?":
    "Wie gut lassen sich Benchmark-Ergebnisse auf Repositories, Frameworks und Programmierstile übertragen, die ein Modell nicht kennt?",
  "How should uncertainty be communicated so that developers can prioritise findings without learning to ignore them?":
    "Wie sollte Unsicherheit vermittelt werden, damit Entwickler Befunde priorisieren können, ohne sich anzugewöhnen, sie zu ignorieren?",
  "Can better training data reduce false positives without increasing false negatives, and how would that be demonstrated?":
    "Lassen sich Fehlalarme durch bessere Trainingsdaten verringern, ohne dass mehr Schwachstellen übersehen werden – und wie ließe sich das nachweisen?",
  "Which decisions belong to deterministic analysis and human verification, and where does a model add value between them?":
    "Welche Entscheidungen gehören zur deterministischen Analyse und zur Prüfung durch Menschen, und wo bringt ein Modell dazwischen einen Mehrwert?",
  Conclusion: "Fazit",
  "Reliable security analysis requires more than identifying suspicious code patterns. A useful finding states what is vulnerable, why the conditions for exploitation hold and how certain the analysis is, and measuring that requires test data in which safe code looks dangerous. These are the questions rappidAI Research intends to study with Quantum Sentinel-Alpha. Results will be reported with the same separation between goals, methods and measured evidence as this note.":
    "Zuverlässige Sicherheitsanalyse erfordert mehr, als verdächtige Codemuster zu erkennen. Ein nützlicher Befund benennt, was verwundbar ist, warum die Bedingungen für eine Ausnutzung erfüllt sind und wie sicher die Analyse ist. Um das zu messen, braucht es Testdaten, in denen auch sicherer Code gefährlich aussieht. Diesen Fragen will rappidAI Research mit Quantum Sentinel-Alpha nachgehen. Ergebnisse werden mit derselben Trennung von Zielen, Methoden und gemessenen Belegen berichtet wie in dieser Notiz.",
  "OWASP Foundation project documentation":
    "Projektdokumentation der OWASP Foundation",
  "OWASP Benchmark: test-case design and scoring":
    "OWASP Benchmark: Aufbau der Testfälle und Bewertung",
  "Juliet test suite 1.3 release notes":
    "Release Notes der Juliet-Testsuite 1.3",
  "Juliet C/C++ 1.3 test suite": "Juliet-Testsuite C/C++ 1.3",
  "Quantum Sentinel-Alpha: model page and development plan":
    "Quantum Sentinel-Alpha: Modellseite und Entwicklungsplan",
  "rappidAI Research website, reviewed 24 October 2026":
    "Website von rappidAI Research, geprüft am 24. Oktober 2026",
  References: "Quellen",
  "Research note: the false positive problem":
    "Forschungsnotiz: das False-Positive-Problem",
  "In this note": "In dieser Notiz",
  Reference: "Quelle",
  Vulnerable: "Verwundbar",
  Safe: "Sicher",
  "Detection outcomes": "Ergebnisse einer Erkennung",
  "The False Positive Problem": "Das False-Positive-Problem",
  "The False Positive Problem in AI Vulnerability Detection — rappidAI Research":
    "Das False-Positive-Problem bei der KI-gestützten Erkennung von Schwachstellen — rappidAI Research",
  "A research note on why AI-based vulnerability detection struggles to separate exploitable weaknesses from harmless code, with hard negatives, evaluation metrics and the Quantum Sentinel-Alpha research direction.":
    "Eine Forschungsnotiz dazu, warum KI-gestützte Schwachstellenerkennung ausnutzbare Schwachstellen nur schwer von harmlosem Code trennt: mit Hard Negatives, Evaluationsmetriken und der Forschungsrichtung von Quantum Sentinel-Alpha.",
};
