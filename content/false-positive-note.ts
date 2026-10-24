import type { PublicationRecord } from "./types";

// Research-informed analysis published on 24 October 2026. It reports no new
// experiment and no measurement of a rappidAI model; every external claim is
// tied to a numbered reference, and Sentinel-Alpha statements follow the
// published development plan in content/sentinel.ts.
export const falsePositiveNote = {
  slug: "false-positive-problem-in-ai-vulnerability-detection",
  title: "The False Positive Problem in AI Vulnerability Detection",
  summary:
    "Why distinguishing real security vulnerabilities from harmless code patterns remains a fundamental challenge for AI-based security analysis.",
  kindLabel: "Research note",
  category: "AI security / vulnerability detection",
  status: "published",
  publicationDate: "2026-10-24",
  publicationDateLabel: "24 October 2026",
  lastReviewed: "2026-10-24",
  peerReviewStatus: "Not peer-reviewed",
  doi: null,
  href: "/resources/publications/false-positive-problem-in-ai-vulnerability-detection",
  notice:
    "This research note is a technical analysis of published research and of rappidAI's development plan. It reports no new experiment, dataset or benchmark, and no detection performance of Quantum Sentinel-Alpha has been measured or published.",
  sources: [],
  sections: [
    {
      id: "reliability-problem",
      title: "The reliability problem",
      paragraphs: [
        "Language models are increasingly used to read source code and point to potential security weaknesses: in code-review assistants, in pull-request automation and as an additional layer next to static analysis. They can read unfamiliar code, take naming and intent into account and explain a finding in plain language. Whether the finding is correct is a separate question.",
        "A detector that labels code as vulnerable or not vulnerable produces four kinds of outcome. A true positive is a real vulnerability that is reported. A false positive is a report on code that is not vulnerable. A false negative is a real vulnerability that is missed. A true negative is safe code that is correctly left alone. Figure 1 places the four outcomes side by side.",
        "The difficult part is deciding what counts as vulnerable. CWE describes SQL injection as an SQL command built from externally influenced input without neutralising special elements that could modify the intended command [1]. That definition contains conditions a pattern cannot check by itself: the input has to be influenced from outside, it has to reach the query, and nothing on the way may neutralise it. Concatenating strings into a query looks suspicious. It is a vulnerability only when those conditions hold.",
        "In this note, a finding counts as correct when the weakness is reachable from attacker-influenced input under the application's realistic assumptions. Proving full exploitability usually requires more than the code alone provides, which is part of the problem described here.",
        "The central question is therefore: how can AI-based vulnerability detection distinguish genuinely exploitable security weaknesses from code that merely appears dangerous?",
      ],
      figures: [
        {
          kind: "outcomes",
          label: "Figure 1",
          title: "Four possible outcomes of a vulnerability report",
          caption:
            "False positives cost review time; false negatives leave a weakness in place. Both are errors, but they are measured and traded off separately.",
          columns: ["Code is vulnerable", "Code is not vulnerable"],
          rows: ["Reported", "Not reported"],
          cells: [
            ["True positive", "A real weakness is reported."],
            ["False positive", "Safe code is reported as vulnerable."],
            ["False negative", "A real weakness is missed."],
            ["True negative", "Safe code is correctly left alone."],
          ],
        },
      ],
    },
    {
      id: "why-false-positives-occur",
      title: "Why false positives occur",
      paragraphs: [
        "False positives are rarely random. They usually follow from information a detector lacks or misreads. The causes below overlap in practice; separating them shows which kind of evidence would be needed to resolve each one.",
      ],
      subsections: [
        {
          title: "Incomplete application context",
          paragraphs: [
            "Whether a value is attacker-controlled is often decided far from the line that uses it: in a router, a configuration file, a queue consumer or another service. A model that sees one function at a time has to guess where its arguments come from. A string parameter called query may hold a constant chosen by the program or text typed by an anonymous user; the function body alone does not say which.",
          ],
        },
        {
          title: "Misread validation and sanitisation",
          paragraphs: [
            "Defences are often implemented away from the dangerous call: an allowlist in a request schema, a type conversion that rejects non-numeric input, a query builder that binds parameters, or a template engine that escapes output by default. A detector that does not recognise the defence, or recognises only its textbook form, reports the sink as unprotected. The opposite error also occurs: a sanitiser that looks correct but is applied for the wrong context, such as HTML escaping for a value that ends up in a URL.",
          ],
        },
        {
          title: "Unknown execution paths and reachability",
          paragraphs: [
            "Vulnerable-looking code is a vulnerability only if attacker-influenced data can reach it. Dead code, test fixtures, administrative scripts that run only with local credentials and disabled feature flags all change the answer. Reachability is a whole-program property. Static analysers approximate it with call graphs and taint tracking; a model reading an isolated snippet cannot determine it unless that context is supplied.",
          ],
        },
        {
          title: "Suspicious syntax versus an actual weakness",
          paragraphs: [
            "Many constructs that security guidance warns about are dangerous only under conditions: string-built SQL, eval and exec, shell invocation, deserialisation, or disabled certificate checks in test code. Studies of learned detectors have found that models pick up unrelated features of the training data, including specific variable and function names, instead of the cause of the vulnerability [2][3]. A model that has learned that a construct correlates with vulnerable labels will report the construct even where the conditions for a vulnerability are absent. Example 1 shows two functions with nearly the same syntax and different risk.",
          ],
        },
        {
          title: "Missing knowledge of frameworks, dependencies and boundaries",
          paragraphs: [
            "Frameworks move security decisions out of application code. Query builders bind parameters, web frameworks escape output and check request origins, and containers or sandboxes limit what a compromised process can reach. Without knowing which framework and version are in use and how they are configured, a detector cannot tell whether a line is protected by the framework or bypasses it.",
          ],
        },
        {
          title: "Overconfident classification",
          paragraphs: [
            "A binary vulnerable or safe output hides uncertainty. Language models produce fluent explanations whether or not the evidence supports them, so a speculative finding can read as confidently as a verified one. A CWE identifier attached to a guess makes the guess look more authoritative than it is.",
          ],
        },
      ],
      figures: [
        {
          kind: "code",
          label: "Example 1",
          title: "Similar syntax, different risk (CWE-89)",
          caption:
            "Illustrative code. Whether the second function is exploitable still depends on where username comes from; whether the first stays safe depends on the allowlist not changing.",
          panels: [
            {
              label: "users.py · list_users",
              verdict: "Often reported · not exploitable as written",
              language: "python",
              code: `SORT_COLUMNS = {"name": "name", "created": "created_at"}

def list_users(db, sort_key):
    column = SORT_COLUMNS.get(sort_key, "name")
    query = f"SELECT id, name FROM users ORDER BY {column}"
    return db.execute(query).fetchall()`,
              explanation:
                "The query is assembled with an f-string, the pattern many detectors flag. The only inserted value comes from an application-owned allowlist: user input selects one of two fixed column names but never reaches the SQL text. OWASP recommends this mapping for identifiers that cannot be bound as parameters [4].",
            },
            {
              label: "users.py · find_user",
              verdict: "Vulnerable · true positive",
              language: "python",
              code: `def find_user(db, username):
    query = f"SELECT id, name FROM users WHERE name = '{username}'"
    return db.execute(query).fetchall()`,
              explanation:
                "Here the caller's value becomes part of the SQL text. If username can be influenced by a request, input such as ' OR '1'='1 changes the structure of the query. Binding the value as a parameter removes the weakness [1][4].",
            },
          ],
        },
        {
          kind: "code",
          label: "Example 2",
          title: "A defence the detector has to recognise (CWE-22)",
          caption:
            "Illustrative code. The check addresses the traversal shown here; it does not cover every case, such as a symbolic link replaced after the check. Calling code safe is also a claim with a scope.",
          panels: [
            {
              label: "files.py · read_upload",
              verdict: "Vulnerable · true positive",
              language: "python",
              code: `BASE = Path("/srv/app/uploads")

def read_upload(name: str) -> bytes:
    return (BASE / name).read_bytes()`,
              explanation:
                "A name such as ../../etc/passwd resolves to a file outside the upload directory [5].",
            },
            {
              label: "files.py · read_upload",
              verdict: "Defended · often still reported",
              language: "python",
              code: `BASE = Path("/srv/app/uploads").resolve()

def read_upload(name: str) -> bytes:
    path = (BASE / name).resolve()
    if not path.is_relative_to(BASE):
        raise PermissionError("outside upload directory")
    return path.read_bytes()`,
              explanation:
                "The path is canonicalised and checked against the base directory before it is used, the mitigation CWE-22 describes [5]. A detector that reports any user-influenced value reaching a file read will flag both versions unless it understands what resolve() and is_relative_to() establish.",
            },
          ],
        },
      ],
    },
    {
      id: "cost-of-incorrect-findings",
      title: "The cost of incorrect findings",
      paragraphs: [
        "Every reported finding has to be triaged by a person. A false positive costs the time needed to read the code, trace the data and conclude that nothing needs to change; for a subtle finding, that can take as long as confirming a real one. The OWASP Benchmark reflects this by scoring tools on the true positive rate minus the false positive rate, rather than on detections alone [6].",
        "False positives also change behaviour. In interviews about static analysis tools, developers named false positives and the way warnings are presented among the barriers to using them [7]. Google's static analysis platform counts an issue as an effective false positive when developers take no positive action after seeing it; code-review checks are expected to stay below 10% effective false positives, and an analyser whose share of “not useful” feedback rises above 10% can be disabled until it improves [8]. The exact threshold matters less than the mechanism: noisy tools get ignored, and an ignored tool no longer catches real vulnerabilities.",
        "This creates a second risk. When most alerts turn out to be harmless, reviewers learn to dismiss alerts quickly, and a genuine vulnerability reported in the same form as the noise is more likely to be dismissed with it. Low precision therefore costs more than time; it can let real weaknesses through.",
        "These consequences need to be read with care. The cited studies concern static analysis tools rather than language-model detectors, and they do not measure the cost of individual false positives. The link between noisy findings, alert fatigue and missed vulnerabilities is a well-supported argument, not an outcome measured for AI-based detection. rappidAI has not measured it either.",
      ],
    },
    {
      id: "hard-negatives",
      title: "Hard negatives and context-aware training",
      paragraphs: [
        "If false positives arise because a model associates surface patterns with vulnerability labels, the training data has to break that association. What matters is not only how many vulnerable examples a dataset contains, but which safe examples it contains.",
      ],
      subsections: [
        {
          title: "Hard negative examples",
          paragraphs: [
            "A hard negative is safe code that resembles vulnerable code: string-built SQL with an allowlisted identifier, a file read behind a correct containment check, deserialisation of trusted, signed data. Randomly chosen safe functions teach little about this boundary, because they differ from vulnerable code in many unrelated ways. Hard negatives move the distinction onto the property that actually matters.",
          ],
        },
        {
          title: "Vulnerable and patched pairs",
          paragraphs: [
            "A vulnerability-fixing commit provides two versions of the same function that differ mainly in the fix. Such pairs are a natural source of hard negatives and a demanding test. Risse and Böhme found that top-performing machine-learning detectors could not distinguish vulnerable functions from their patched versions, and proposed adding patched code to test sets [3]. PrimeVul evaluates each pair as a unit and counts how often a model labels both versions correctly [9].",
          ],
        },
        {
          title: "Context-preserving samples",
          paragraphs: [
            "Most public datasets are built at function level, which removes callers, configuration and framework context, the information identified above as decisive. Samples that keep the call path to a sink, the validation applied on the way and the framework in use let a model learn the conditions of a vulnerability rather than its appearance. They are also more expensive to build and harder to label.",
          ],
        },
        {
          title: "Diverse secure implementations",
          paragraphs: [
            "Safe code is not one pattern. The same defence can be written with a framework feature, a helper function, a type constraint or an explicit check. If the training data shows only one form, a model may treat that form as the definition of safe and report every other form as missing. Synthetic suites show the risk. NIST's Juliet suite pairs flawed and non-flawed sources for the same sink [10], and its release notes state that the good code in thousands of files fixes the problem by simply using a hardcoded value [11], a shortcut a model can learn without understanding any defence.",
          ],
        },
        {
          title: "Realistic vulnerability datasets",
          paragraphs: [
            "Datasets built from real projects and real fixes reflect what a deployed detector faces, including the imbalance between rare vulnerable functions and abundant safe ones. Chakraborty et al. reported that deep-learning detectors lost more than half of their reported performance in a realistic setting and traced part of the drop to duplicated samples and an unrealistic class balance [2]. In the PrimeVul study, a state-of-the-art 7B model reached 68.26% F1 on BigVul but 3.09% on PrimeVul [9].",
          ],
        },
        {
          title: "Contamination and label quality",
          paragraphs: [
            "Labels derived automatically from fixing commits are noisy, because a commit that fixes a vulnerability often changes other functions as well. Croft et al. found 20–71% of vulnerable labels inaccurate and 17–99% of data points duplicated in the real-world datasets they examined [12]. For vulnerable functions in widely used datasets without manual verification, PrimeVul reports label accuracy between 25% and 60%, drawing on the audit published with DiverseVul [9][13]. Duplicates and leakage between training and test data inflate results further; PrimeVul counters this with de-duplication and chronological splits [9].",
          ],
        },
      ],
      closing: [
        "These methods address plausible causes of false positives. Whether they reduce false positives in practice, and at what cost to recall, can only be shown by evaluation on data the model has not seen. This note does not claim that they do.",
      ],
    },
    {
      id: "evaluating-detection-quality",
      title: "Evaluating detection quality",
      paragraphs: [
        "Accuracy, the share of all samples classified correctly, says little about vulnerability detection because vulnerable code is rare. If one function in a hundred is vulnerable, a detector that never reports anything is 99% accurate and useless. Arp et al. list this base-rate fallacy, together with inappropriate performance measures, among the recurring pitfalls of machine learning in security [14].",
        "Table 1 lists the metrics that separate the two kinds of error. Precision and recall trade off against each other: lowering the threshold at which a detector reports a finding usually raises recall and lowers precision. A single F1 score hides where on that curve a detector operates, and when the positive class is rare, precision-recall curves are more informative than ROC curves [15]. For a review tool, a useful report states recall at a fixed, acceptable false positive rate. PrimeVul's VD-S metric follows this idea by measuring the false negative rate at a false positive rate of at most 0.5% [9].",
        "The evaluation data shapes the result as much as the metric. A test set with obvious vulnerabilities and unrelated safe code measures whether a model can tell the two apart, not whether it can tell a vulnerability from its fix. Test sets should therefore include hard negatives, patched versions of vulnerable functions and safe implementations in several styles. The OWASP Benchmark mixes real vulnerabilities with test cases that look vulnerable but cannot be exploited [6]; Juliet pairs flawed and non-flawed variants [10].",
        "Table 2 uses invented numbers to show why the choice of metric matters. Detector C reports nothing and still reaches higher accuracy than detector A. Detector A finds more vulnerabilities than B, but almost two thirds of its findings are false. Which detector is preferable depends on whether a missed vulnerability or a wasted review costs more where it runs, and that trade-off should be stated rather than hidden in one number.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 1",
          title: "Metrics for vulnerability detection",
          caption:
            "TP, FP, FN and TN are the counts of true positives, false positives, false negatives and true negatives from Figure 1.",
          columns: ["Metric", "Definition", "Question it answers"],
          rows: [
            [
              "Precision",
              "TP / (TP + FP)",
              "How many reported findings are real?",
            ],
            [
              "Recall",
              "TP / (TP + FN)",
              "How many real vulnerabilities are found?",
            ],
            [
              "False positive rate",
              "FP / (FP + TN)",
              "How much safe code is wrongly reported?",
            ],
            [
              "False negative rate",
              "FN / (FN + TP)",
              "How many real vulnerabilities are missed?",
            ],
            [
              "F1 score",
              "2 · P · R / (P + R)",
              "How balanced are precision and recall?",
            ],
          ],
        },
        {
          kind: "table",
          label: "Table 2",
          title: "Hypothetical illustration, not a measurement",
          caption:
            "Invented test set of 1,000 functions: 50 vulnerable, 950 safe. The detectors are fictional; no rappidAI model or published tool was evaluated. Precision and F1 are undefined for a detector that reports nothing (—).",
          columns: [
            "Detector",
            "TP",
            "FP",
            "FN",
            "Accuracy",
            "Precision",
            "Recall",
            "FPR",
            "F1",
          ],
          rows: [
            [
              "A · reports 120",
              "45",
              "75",
              "5",
              "92.0%",
              "37.5%",
              "90.0%",
              "7.9%",
              "0.53",
            ],
            [
              "B · reports 40",
              "34",
              "6",
              "16",
              "97.8%",
              "85.0%",
              "68.0%",
              "0.6%",
              "0.76",
            ],
            [
              "C · reports nothing",
              "0",
              "0",
              "50",
              "95.0%",
              "—",
              "0.0%",
              "0.0%",
              "—",
            ],
          ],
        },
      ],
    },
    {
      id: "sentinel-research-direction",
      title: "Research direction: Quantum Sentinel-Alpha",
      paragraphs: [
        "Quantum Sentinel-Alpha is rappidAI Research's security-specialised code model in development, designed as a second security reviewer for repositories, pull requests and diffs. The questions in this note are central to it: its published development plan lists false-positive rejection, recognising similar-looking safe code as benign and abstaining instead of inventing a vulnerability, among its training objectives [16].",
        "Its current state has to be stated precisely. The primary foundation candidate is Qwen3.5-9B; the final choice follows an internal security bake-off against Qwen3.5-4B. Alpha is a development target for October 2026, not a release. No Sentinel weights, evaluation results or hardware measurements have been published, so no statement about its false positive rate can be made [16]. Table 3 separates the elements discussed here by status.",
      ],
      subsections: [
        {
          title: "Context-aware analysis",
          paragraphs: [
            "The planned Sentinel Engine indexes a repository, selects relevant code and static-analysis signals and supplies them to the model [16]. The intent is to provide the information whose absence causes many false positives: where data comes from and what happens to it on the way.",
          ],
        },
        {
          title: "Candidate findings before reported findings",
          paragraphs: [
            "In the planned pipeline, the model produces candidate findings, described as claims awaiting verification. A verifier, tests and re-analysis check the evidence and reject unsupported candidates before anything is reported as an evidence-backed finding [16]. The distinction between suspicious and demonstrated is built into the architecture instead of being left to the model's wording.",
          ],
        },
        {
          title: "Training on verified examples",
          paragraphs: [
            "The training plan combines curated vulnerability examples with fixed and vulnerable code pairs, hard negatives and false-positive rejection tasks [16]. Given the label-quality findings above, the value of these examples depends on how carefully their labels are verified.",
          ],
        },
        {
          title: "Transparent uncertainty",
          paragraphs: [
            "The development plan states that the model should express uncertainty or abstain when evidence is insufficient [16]. How confidence is calibrated and communicated, for example through the level of a result in the SARIF format [17] or an explicit needs-verification state, is still an open design question.",
          ],
        },
      ],
      closing: [
        "None of these elements has been evaluated. They describe how the project intends to approach the problem, not evidence that it solves it.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 3",
          title: "Status of the Sentinel-Alpha elements discussed in this note",
          caption:
            "Status as published on the Quantum Sentinel-Alpha model page on 24 October 2026. No component is documented as implemented and evaluated.",
          columns: ["Element", "Status", "Basis"],
          rows: [
            [
              "False-positive rejection and abstention",
              "Research goal",
              "Training objective in the development plan",
            ],
            [
              "QLoRA / LoRA fine-tuning with fixed/vulnerable pairs and hard negatives",
              "Proposed method",
              "Published training plan",
            ],
            [
              "Repository context, static signals and verification of candidate findings",
              "Planned",
              "Published architecture",
            ],
            ["JSON / SARIF output", "Planned", "Published architecture"],
            [
              "Detection quality, including the false positive rate",
              "Not measured",
              "No evaluation published",
            ],
          ],
        },
      ],
    },
    {
      id: "limitations-and-open-questions",
      title: "Limitations and open questions",
      paragraphs: [
        "This note analyses published research and rappidAI's own development plan; it reports no experiment. Most of the cited studies evaluate C and C++ functions from open-source projects, which may not represent Python, JavaScript / TypeScript or Go, the first languages Sentinel-Alpha is planned to cover. Several questions remain open:",
      ],
      items: [
        "Can a model assess exploitability without runtime context such as configuration, deployment and authentication?",
        "How well do benchmark results transfer to repositories, frameworks and coding styles a model has not seen?",
        "How should uncertainty be communicated so that developers can prioritise findings without learning to ignore them?",
        "Can better training data reduce false positives without increasing false negatives, and how would that be demonstrated?",
        "Which decisions belong to deterministic analysis and human verification, and where does a model add value between them?",
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      paragraphs: [
        "Reliable security analysis requires more than identifying suspicious code patterns. A useful finding states what is vulnerable, why the conditions for exploitation hold and how certain the analysis is, and measuring that requires test data in which safe code looks dangerous. These are the questions rappidAI Research intends to study with Quantum Sentinel-Alpha. Results will be reported with the same separation between goals, methods and measured evidence as this note.",
      ],
    },
  ],
  references: [
    {
      authors: "MITRE",
      title:
        "CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",
      venue: "Common Weakness Enumeration",
      url: "https://cwe.mitre.org/data/definitions/89.html",
    },
    {
      authors: "S. Chakraborty, R. Krishna, Y. Ding, B. Ray",
      title: "Deep Learning Based Vulnerability Detection: Are We There Yet?",
      venue: "IEEE Transactions on Software Engineering 48(9), 2022",
      url: "https://doi.org/10.1109/TSE.2021.3087402",
    },
    {
      authors: "N. Risse, M. Böhme",
      title:
        "Uncovering the Limits of Machine Learning for Automatic Vulnerability Detection",
      venue: "33rd USENIX Security Symposium, 2024",
      url: "https://www.usenix.org/conference/usenixsecurity24/presentation/risse",
    },
    {
      authors: "OWASP Cheat Sheet Series",
      title: "SQL Injection Prevention Cheat Sheet",
      venue: "OWASP Foundation",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
    },
    {
      authors: "MITRE",
      title:
        "CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
      venue: "Common Weakness Enumeration",
      url: "https://cwe.mitre.org/data/definitions/22.html",
    },
    {
      authors: "OWASP Benchmark Project",
      title: "OWASP Benchmark: test-case design and scoring",
      venue: "OWASP Foundation project documentation",
      url: "https://wiki.owasp.org/index.php/Benchmark",
    },
    {
      authors: "B. Johnson, Y. Song, E. Murphy-Hill, R. Bowdidge",
      title:
        "Why Don't Software Developers Use Static Analysis Tools to Find Bugs?",
      venue:
        "35th International Conference on Software Engineering (ICSE), 2013, pp. 672–681",
      url: "https://research.google/pubs/why-dont-software-developers-use-static-analysis-tools-to-find-bugs/",
    },
    {
      authors:
        "C. Sadowski, E. Aftandilian, A. Eagle, L. Miller-Cushon, C. Jaspan",
      title: "Lessons from Building Static Analysis Tools at Google",
      venue: "Communications of the ACM 61(4), 2018, pp. 58–66",
      url: "https://research.google/pubs/lessons-from-building-static-analysis-tools-at-google/",
    },
    {
      authors:
        "Y. Ding, Y. Fu, O. Ibrahim, C. Sitawarin, X. Chen, B. Alomair, D. Wagner, B. Ray, Y. Chen",
      title:
        "Vulnerability Detection with Code Language Models: How Far Are We?",
      venue:
        "47th International Conference on Software Engineering (ICSE), 2025 · arXiv:2403.18624",
      url: "https://arxiv.org/abs/2403.18624",
    },
    {
      authors: "NIST Software Assurance Reference Dataset",
      title: "Juliet C/C++ 1.3 test suite",
      venue: "National Institute of Standards and Technology",
      url: "https://samate.nist.gov/SARD/test-suites/112",
    },
    {
      authors: "NIST Software Assurance Reference Dataset",
      title: "Juliet test suite 1.3 release notes",
      venue: "National Institute of Standards and Technology",
      url: "https://samate.nist.gov/SARD/downloads/documents/releaseJuliet1.3Doc.txt",
    },
    {
      authors: "R. Croft, M. A. Babar, M. M. Kholoosi",
      title: "Data Quality for Software Vulnerability Datasets",
      venue:
        "45th International Conference on Software Engineering (ICSE), 2023",
      url: "https://doi.org/10.1109/ICSE48619.2023.00022",
    },
    {
      authors: "Y. Chen, Z. Ding, L. Alowain, X. Chen, D. Wagner",
      title:
        "DiverseVul: A New Vulnerable Source Code Dataset for Deep Learning Based Vulnerability Detection",
      venue:
        "26th International Symposium on Research in Attacks, Intrusions and Defenses (RAID), 2023 · arXiv:2304.00409",
      url: "https://arxiv.org/abs/2304.00409",
    },
    {
      authors:
        "D. Arp, E. Quiring, F. Pendlebury, A. Warnecke, F. Pierazzi, C. Wressnegger, L. Cavallaro, K. Rieck",
      title: "Dos and Don'ts of Machine Learning in Computer Security",
      venue: "31st USENIX Security Symposium, 2022",
      url: "https://www.usenix.org/conference/usenixsecurity22/presentation/arp",
    },
    {
      authors: "T. Saito, M. Rehmsmeier",
      title:
        "The Precision-Recall Plot Is More Informative than the ROC Plot When Evaluating Binary Classifiers on Imbalanced Datasets",
      venue: "PLOS ONE 10(3): e0118432, 2015",
      url: "https://doi.org/10.1371/journal.pone.0118432",
    },
    {
      authors: "rappidAI Research",
      title: "Quantum Sentinel-Alpha: model page and development plan",
      venue: "rappidAI Research website, reviewed 24 October 2026",
      url: "/models/quantum-sentinel-alpha",
    },
    {
      authors: "OASIS",
      title: "Static Analysis Results Interchange Format (SARIF) Version 2.1.0",
      venue: "OASIS Standard",
      url: "https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html",
    },
  ],
} as const satisfies PublicationRecord;
