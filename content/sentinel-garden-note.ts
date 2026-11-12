import type { PublicationRecord } from "./types";
import { sentinelGardenPublicationLinks as sentinelResearchLinks } from "./security-evidence";

// Engineering report published on 4 November 2026 about building Sentinel Garden and the
// Sentinel QLoRA pipeline (Sentinel pull requests #4–#6, merged at 3c46606). It reports
// data-pipeline measurements and review findings only: no model was trained or evaluated.
// Code examples are written for this note; no upstream code is reproduced.
export const sentinelGardenNote = {
  slug: "building-a-vulnerability-fix-dataset-you-can-check",
  title: "Building a Vulnerability-Fix Dataset You Can Check",
  summary:
    "What it took to turn 19,959 security advisories into 2,322 training records for Quantum Sentinel-Alpha, which errors code review found on the way and why none of the records is approved for training yet.",
  kindLabel: "Research note",
  category: "AI security / training data",
  status: "published",
  publicationDate: "2026-11-04",
  publicationDateLabel: "4 November 2026",
  lastReviewed: "2026-11-04",
  peerReviewStatus: "Not peer-reviewed",
  doi: null,
  href: "/resources/publications/building-a-vulnerability-fix-dataset-you-can-check",
  notice:
    "This note is an engineering report on the Sentinel Garden data pipeline and the Sentinel training pipeline at repository revision 3c46606. It reports dataset counts, audit results and code-review findings. No model has been trained or evaluated, no record is approved for training, and the manual quality sample was reviewed by the implementing AI engineering assistant rather than an authorized reviewer. Code examples are simplified and written for this note.",
  sources: [
    { label: "Sentinel Garden design", url: sentinelResearchLinks.garden },
    { label: "Dataset report", url: sentinelResearchLinks.seedReport },
    { label: "Audit report", url: sentinelResearchLinks.auditReport },
    {
      label: "Manual review verdicts",
      url: sentinelResearchLinks.manualReview,
    },
    {
      label: "Rights review workflow",
      url: sentinelResearchLinks.rightsReview,
    },
    { label: "Parser module", url: sentinelResearchLinks.syntax },
    { label: "Training documentation", url: sentinelResearchLinks.training },
    { label: "Repository status", url: sentinelResearchLinks.status },
  ],
  sections: [
    {
      id: "why-fix-commits",
      title: "Why upstream fixes make good training data",
      paragraphs: [
        "A security model for code has to learn two things at once: what a vulnerability looks like, and what code looks like that merely resembles one. The second is the harder half. Our earlier research note on false positives argued that hard negatives, safe code that looks risky, matter as much as vulnerable examples.",
        "An upstream security fix supplies both from the same place. A GitHub-reviewed advisory names the weakness and its CWE and links the commit that fixed it. The function before that commit is a real vulnerable example, the same function after it is a hard negative for that weakness, and the lines the fix changed show where the problem was. Nothing is synthetic, and every label points back to a public, reviewed record.",
        "Sentinel Garden builds three kinds of record from one fix that is confined to a single function. Table 1 shows how they are labelled.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 1",
          title: "Three records from one upstream fix",
          caption:
            "Abstention records teach the model to say that it cannot decide when the decisive code is not visible, instead of guessing.",
          columns: ["Record", "Code shown", "Expected answer"],
          rows: [
            [
              "Vulnerable",
              "The function before the fix",
              "Finding with the advisory's CWE and the changed lines",
            ],
            [
              "Hard negative",
              "The same function after the fix",
              "No finding for that weakness",
            ],
            [
              "Abstention",
              "A caller of the vulnerable function, without the callee",
              "Abstain: safety depends on withheld code",
            ],
          ],
        },
      ],
    },
    {
      id: "from-advisories-to-records",
      title: "From 19,959 advisories to 2,322 records",
      paragraphs: [
        "Discovery read every GitHub-reviewed GHSA advisory of the 1 November 2026 OSV snapshot for PyPI, npm and Go: 19,959 advisories. 4,830 of them name exactly one upstream fix commit and one or two CWEs that can be localized in code; at most four candidates per repository keep large projects from dominating.",
        "Most of the remaining loss happens at the one-function rule. A label only means something if the change it describes sits in the code the model is shown, so fixes that touch several functions, add files or change code outside any function are rejected rather than cut down. 1,206 fixes passed. They produced 2,773 records, of which 2,322 survived every check and the audit.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 2",
          title: "Why candidate fixes were rejected",
          caption:
            "Outcomes of the build stage for 4,830 candidates. Each candidate is counted once, under the first rule it failed.",
          columns: ["Outcome", "Candidates"],
          rows: [
            ["Accepted: change confined to one function", "1,206"],
            ["Change outside any function", "1,071"],
            ["More than one function changed", "723"],
            ["No source change in the ecosystem's language", "444"],
            ["Source file added or deleted", "408"],
            ["Too many source files", "323"],
            ["New top-level code without a changed function", "293"],
            ["Other rules (size limits, unresolvable commits and more)", "362"],
          ],
        },
      ],
    },
    {
      id: "what-review-found",
      title: "What code review found",
      paragraphs: [
        "The pipeline was built in three pull requests, each reviewed by an automated code reviewer until a review came back without findings. Across the three, the reviewer raised 33 findings in about twenty rounds. Every finding was reproduced, fixed and covered by a regression test before merge. Most were not one-off bugs but members of a few recurring classes.",
      ],
      subsections: [
        {
          title: "Reading code without a parser",
          paragraphs: [
            "Deciding whether a fix changed logic or only formatting requires normalizing code: ignoring comments and layout while keeping everything that changes behaviour. The first version did this for Go, JavaScript and TypeScript with a hand-written scanner. Review after review found a construct it read wrongly: whitespace inside a string or regular expression, a regular expression directly after an if statement, adjacent operators, a line break that ends a statement through automatic semicolon insertion, a closing brace inside a raw string, text inside JSX. Each mistake had the same effect: a real security fix looked cosmetic and was dropped, or a function boundary was wrong and the label pointed at the wrong code.",
          ],
        },
        {
          title: "Which function does a call reach",
          paragraphs: [
            "An abstention record claims that a caller depends on the vulnerable function. That claim was wrong more often than expected. A name inside a string or a docstring is not a call. A local variable can shadow the function. obj.list_orders() may call a different method of another object, and self.list_orders() in another class reaches that class's method. A nested function is only visible inside the function that defines it. Fixing these removed 18 abstention records from the first seed of 881 records: their call was only a mention, went to another object or could not be shown to reach the callee.",
          ],
        },
        {
          title: "Changes outside the function",
          paragraphs: [
            "A fix can change behaviour without touching the function at all, for example by importing a different template package under the same name. Such re-bound imports are now detected and the fix is rejected instead of being attributed to an unrelated function. One real case in the data replaced a text template engine with its HTML-escaping counterpart this way.",
          ],
        },
        {
          title: "Checks that silently skipped work",
          paragraphs: [
            "Two checks reported success without doing their job. The near-duplicate search skipped every shingle shared by more than 64 records, so large families of copied functions were never compared and contradictory labels could pass; it now uses exact prefix filtering, tested against brute force. And a failed lookup of a later fix counted as a clean check; it now marks the check incomplete.",
          ],
        },
      ],
      figures: [
        {
          kind: "code",
          label: "Figure 1",
          title: "A security fix the scanner saw as cosmetic",
          caption:
            "Simplified example written for this note. The fix removes the space from the allowed characters of a validation pattern.",
          panels: [
            {
              label: "Before the fix",
              verdict: "Vulnerable",
              language: "javascript",
              code: "function check(input) {\n  let valid = true;\n  if (enabled) /^[a-z ]+$/.test(input) || (valid = false);\n  return valid;\n}",
              explanation:
                "After the closing parenthesis of an if condition, a slash starts a regular expression. The scanner read it as a division and split the pattern into separate tokens, dropping the space.",
            },
            {
              label: "After the fix",
              verdict: "Fixed",
              language: "javascript",
              code: "function check(input) {\n  let valid = true;\n  if (enabled) /^[a-z]+$/.test(input) || (valid = false);\n  return valid;\n}",
              explanation:
                "Without the space, both versions produced identical tokens, so the fix was rejected as a formatting change. A parser keeps the regular expression as one exact token and the change is visible.",
            },
          ],
        },
      ],
    },
    {
      id: "parse-trees",
      title: "Replacing the scanner with parse trees",
      paragraphs: [
        "After thirteen review rounds on the first pull request, the pattern was clear: each fix closed one hole in a scanner that tried to re-derive the grammar of three languages. The durable fix was to stop doing that. Go, JavaScript and TypeScript are now read with tree-sitter grammars pinned to exact versions; Python already used its own ast and tokenize modules. Literals, comments, normalization tokens, function boundaries, calls, imports and local names all come from the same parse tree.",
        "Before switching, the old and new readers were compared on all 548 JavaScript, TypeScript and Go files in the seed. Go showed no difference. Every JavaScript and TypeScript difference was a correction: named function expressions, multi-line and require('m').x imports, an import hidden behind a byte-order mark and functions the scanner had missed entirely. The grammar versions are recorded with the dataset, and the consistency check fails when the installed versions differ.",
      ],
    },
    {
      id: "beyond-the-diff",
      title: "Evidence beyond the diff",
      paragraphs: [
        "A fix commit shows that a function changed. It does not show that the new version is safe. Sometimes the same function is fixed again a month later, or a later advisory says the first fix was incomplete. The audit therefore looks up every other OSV advisory of the same package and follows its fix commits.",
        "One example from the manual sample shows why this matters. An advisory described how newlines in metadata values could inject arguments into a downstream tool, as a bypass of an earlier fix that had only sanitized the keys. The commit it referenced was that earlier key fix. The vulnerable label was right, but the fixed version was still vulnerable to exactly the weakness described, so its hard negative was excluded.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 3",
          title: "Exclusions from the audit",
          caption:
            "Run over 1,157 fix groups. Records are excluded, never relabelled; an excluded vulnerable record takes its hard negative and abstention with it.",
          columns: ["Reason", "Excluded"],
          rows: [
            [
              "Same function fixed again by a later advisory",
              "126 hard negatives",
            ],
            ["Broad localization span", "89 groups"],
            ["Fix reported as incomplete", "47 hard negatives"],
            ["Later fix commit cannot be read", "10 hard negatives"],
            ["Manual review", "10 records"],
            ["Abstention whose caller passes only constants", "1 abstention"],
          ],
        },
      ],
      closing: [
        "Broad spans became an exclusion rule because of the manual sample: all three sampled pairs whose localization covered more than 12 lines and over 40 % of the function were imprecise, typically because a rename or a docstring edit was committed together with the fix. Among the 29 sampled pairs with narrower spans, one was imprecise.",
      ],
    },
    {
      id: "measuring-what-remains",
      title: "Measuring what remains",
      paragraphs: [
        "Automated checks cannot confirm a label. A stratified sample of 44 items, 32 vulnerable/fixed pairs and 12 abstentions drawn per language and CWE family, was read by hand against the advisory, the fix and the excerpt. The reviewer was the AI engineering assistant that built the pipeline; this is a quality signal, not an authorized review.",
        "Table 4 counts the sampled items that survive the automated exclusions, which is the estimate for the records that would be exported. With so few items, the intervals are wide; the upper bounds of about 17 % for localization and hard-negative safety are the numbers to plan with until a larger, human review exists.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 4",
          title: "Manual sample after the automated exclusions",
          caption: "Wilson 95 % score intervals.",
          columns: ["Question", "Errors", "Wilson 95 % interval"],
          rows: [
            ["Wrong label", "0 of 29", "0 – 11.7 %"],
            ["Advisory does not match the code", "0 of 29", "0 – 11.7 %"],
            ["Imprecise localization", "1 of 29", "0.6 – 17.2 %"],
            ["Hard negative not safe", "1 of 28", "0.6 – 17.7 %"],
            ["Invalid abstention", "0 of 11", "0 – 25.9 %"],
          ],
        },
      ],
    },
    {
      id: "infrastructure",
      title: "Failures that were not about labels",
      paragraphs: [
        "Some of the most expensive errors had nothing to do with security semantics.",
      ],
      items: [
        "Disk: fetching single commits with a blob-less partial clone still stored a full tree per commit and filled 29 GB for the first 975 repositories. Switching to tree-less fetches and replacing a presence check that silently downloaded entire histories brought the cache for those repositories to about 0.5 GB.",
        "Shallow history: a fix commit that was also the parent of another fix became a shallow boundary and looked parentless on a rebuild. Parents are now read from the raw commit object, and such commits are deepened.",
        "Feedback between stages: removing the kept copy of a duplicate promoted its twin, so the next audit saw a different population. Deduplication now ignores audit exclusions, and two consecutive runs of the whole pipeline are byte-identical.",
        "Training loop: when an epoch did not divide evenly into accumulation steps, the last step was averaged over the full count and under-weighted. Each step is now averaged over its own size.",
        "Resumed training: a checkpoint carried no record of its data, so a run could continue on a changed dataset, for example after an approval was withdrawn. Checkpoints now store their data and configuration and refuse to resume with different inputs.",
      ],
    },
    {
      id: "what-is-still-open",
      title: "What is still open",
      paragraphs: [
        "None of the 2,322 records is approved for training. Code from 766 upstream repositories appears in train or validation records, and each repository's license, together with the terms of the advisory sources, has to be reviewed by a person before its records can be used. The review queue lists, for every repository, the license file at each used revision with its hash, the license the package registry reports and the open questions. Until then the training export is empty and the training pipeline refuses to start.",
        "The labels inherit the limits of their source. A hard negative is safe with respect to the advisory's weakness, not proven safe in general. Localization comes from the diff and marks where code changed, which for a missing check is the insertion point. The manual estimate rests on 44 AI-reviewed items. And no model has been trained, so nothing here says how well Quantum Sentinel-Alpha will detect vulnerabilities.",
      ],
    },
    {
      id: "lessons",
      title: "Lessons for building security training data",
      paragraphs: [
        "The points below are what we would do from the start next time.",
      ],
      items: [
        "Use real parsers for every language from day one; a scanner that approximates a grammar fails in exactly the corners security fixes live in.",
        "Treat every check that can skip work as a check that can fail, and report incomplete checks instead of passing them.",
        "Look beyond the fix commit: later advisories of the same package are direct evidence about the safety of a hard negative.",
        "Exclude rather than relabel, and keep every exclusion with its reason.",
        "Make the pipeline a fixed point and verify it: rebuild from pinned commits, compare hashes and run it twice.",
        "Keep approval separate from collection, and default to deny until a person has reviewed the rights.",
      ],
    },
  ],
} as const satisfies PublicationRecord;
