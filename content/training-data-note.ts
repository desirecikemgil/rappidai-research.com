import type { PublicationRecord } from "./types";
import { sentinelResearchLinks } from "./security-evidence";

// Engineering report published on 24 November 2026 about Sentinel Garden v2 and v3 and the
// training authorization (Sentinel pull requests #9, #10, #12 and #13, merged at cec6f96).
// Every number is read from the committed stats, audit, review, manifest and approvals files at
// that revision. No model was trained or evaluated. Code examples are written for this note;
// no upstream code is reproduced.
export const trainingDataNote = {
  slug: "from-audited-records-to-approved-training-data",
  title: "From Audited Records to Approved Training Data",
  summary:
    "How Sentinel Garden grew to 3,427 audited records, why fixes spread over several commits were the hardest part, how 535 repositories were reviewed and approved, and why Quantum Sentinel-Alpha now has 1,871 approved training examples but no trained model yet.",
  kindLabel: "Research note",
  category: "AI security / training data",
  status: "published",
  publicationDate: "2026-11-24",
  publicationDateLabel: "24 November 2026",
  lastReviewed: "2026-11-24",
  peerReviewStatus: "Not peer-reviewed",
  doi: null,
  href: "/resources/publications/from-audited-records-to-approved-training-data",
  notice:
    "This note is an engineering report on Sentinel Garden v2 and v3 and the training authorization at Sentinel revision cec6f96. It reports dataset counts, rights-review results and code-review findings. The approvals are decisions of the project owner, not legal opinions. No model has been trained or evaluated, and the manual quality sample was reviewed by the implementing AI engineering assistant rather than an authorized reviewer. Code examples are simplified and written for this note.",
  sources: [
    { label: "Garden v2", url: sentinelResearchLinks.gardenV2 },
    { label: "Garden v3", url: sentinelResearchLinks.gardenV3 },
    {
      label: "Training authorization",
      url: sentinelResearchLinks.trainingAuthorization,
    },
    {
      label: "Cohort rights review",
      url: sentinelResearchLinks.cohortRightsReview,
    },
    { label: "Dataset report", url: sentinelResearchLinks.seedReport },
    { label: "Audit report", url: sentinelResearchLinks.auditReport },
    { label: "Training documentation", url: sentinelResearchLinks.training },
    { label: "Repository status", url: sentinelResearchLinks.status },
  ],
  sections: [
    {
      id: "where-the-first-note-ended",
      title: "Where the first note ended",
      paragraphs: [
        "Our first note on Sentinel Garden described a dataset of audited vulnerability fixes and a training export that was empty on purpose: no advisory source and no upstream repository had been approved. Garden v1, in its final form, holds 2,309 accepted records. Three weeks later the export holds 1,464 approved records, which give 1,871 training and 187 validation examples, and the training pipeline accepts them.",
        "This note describes the steps in between: two dataset revisions, a rights review of every repository whose code appears in training data, and the checks that make sure a training machine sees exactly what was approved. None of the growth came from relaxing a rule. The one-function rule, the quality checks, the audit and the frozen split policy are the same as in v1, and every v1 record is still in v3 with the same content hash and split.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 1",
          title: "Three versions of Sentinel Garden",
          caption:
            "v1 stays an immutable reference and is never re-curated, so it keeps 0 approved records. The v2 count is the one after the decision of 15 November 2026.",
          columns: ["Measure", "v1", "v2", "v3"],
          rows: [
            ["Candidate fixes", "4,830", "6,623", "7,751"],
            ["Fix commits turned into records", "1,206", "1,725", "1,825"],
            ["Records built", "2,773", "3,971", "4,200"],
            ["Records accepted", "2,309", "3,226", "3,427"],
            ["Vulnerable/fixed pairs", "941", "1,278", "1,363"],
            ["CWEs among findings", "161", "192", "194"],
            ["Training-approved records", "0", "1,297", "1,464"],
          ],
        },
      ],
    },
    {
      id: "more-room-per-project",
      title: "More room per project, three small extraction fixes",
      paragraphs: [
        "Garden v1 allowed four candidates per repository, so that large projects could not dominate. That limit alone dropped 3,236 advisories whose repository already had four. It is a balance rule, not a quality rule, so v2 raised it to 20. Even then, the largest training repository holds 0.8 % of the training records, and because the split is per repository, extra advisories of a project stay in that project's split.",
        "A sample of 300 rejections per category, checked against the real upstream diffs, showed that most rejections were genuine: fixes in module-level code, in configuration objects or in several functions at once cannot get a function-level label. Three were limits of the extractor and were fixed: complete new helper methods inside a class body, version-string bumps outside any function, and build or test tooling counted as source files. Together they recovered 58 of the 4,830 v1 candidates. Most of v2's growth came from the higher limit.",
      ],
    },
    {
      id: "fixes-over-several-commits",
      title: "Fixes spread over several commits",
      paragraphs: [
        "v2 still dropped every advisory that names more than one fix commit: 2,076 advisories, 1,927 of them with all commits in one repository. Many are ordinary, such as a code change plus a separate test, or the same fix applied to a release branch. Some are not: a fix delivered in two steps, where the first commit leaves the function vulnerable.",
        "That difference decides whether a hard negative is correct. If a two-step fix is treated as one, the function after the first commit is labelled safe although it is still vulnerable. v3 therefore uses an advisory with several commits in only two cases and rejects everything else without guessing.",
      ],
      items: [
        "Exactly one commit changes runtime code in the ecosystem's language, and every other commit changes only tests, documentation, changelogs or CI files.",
        "Every commit that changes runtime code makes the identical change: the same files, the same removed and added lines and the same position in the enclosing function. This covers a backport, or a merge commit and the commit it merges. The earliest such commit is used as the fix.",
      ],
      closing: [
        "Multi-commit candidates only take repository slots that single-commit candidates leave free, so every v2 candidate is byte-identical in v3. Of the 1,128 new candidates, 100 yield records. 778 are rejected because their commits make different changes. In a sample of 120 of them, drawn before positions were compared, a third changed different files, a third changed subsets of the same files, typical for a fix in several steps, and a third changed the same files with different lines. Telling a backport to a diverged branch from a partial fix would need each repository's full history, which is expensive and unreliable on shallow caches, so these stay rejected.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 2",
          title: "Advisories with several fix commits in one repository",
          caption:
            "Build outcomes for the 1,128 candidates that Garden v3 added. Each candidate is counted once.",
          columns: ["Outcome", "Advisories"],
          rows: [
            ["Unambiguous fix, records built", "100"],
            ["Commits make different changes", "778"],
            [
              "A companion commit changes dependencies, vendored code, other languages or configuration",
              "116",
            ],
            ["Rejected by the same rules as single-commit fixes", "134"],
          ],
        },
      ],
    },
    {
      id: "what-review-found",
      title: "What code review found in the commit rule",
      paragraphs: [
        "The first version compared the changes of two commits without their position. Code review found the case this misses: two commits that add the same check at two different places of one function. Each change looks identical, but together they are a fix in two steps, and the first commit's version of the function is still vulnerable. Comparing the enclosing function and the offset inside it rejects this case. The stricter comparison briefly rejected 135 candidates as unreadable, because a file that a commit adds has no earlier version in which to locate functions; added files are now compared at absolute positions.",
        "The second finding was about time. Choosing the earliest commit compared commit timestamps as text, and timestamps with different time-zone offsets sort wrongly as text. The rule now compares instants.",
      ],
      figures: [
        {
          kind: "code",
          label: "Figure 1",
          title: "The same change at two positions is a fix in two steps",
          caption:
            "Simplified example written for this note. Both commits add exactly the same line to the same file. Without positions they looked like one change applied twice, as in a backport.",
          panels: [
            {
              label: "After commit 1",
              verdict: "Still vulnerable",
              language: "javascript",
              code: "function load(root, file, legacy) {\n  if (legacy) {\n    return read(path.join(root, file));\n  }\n  assertInside(root, file);\n  return read(path.join(root, file));\n}",
              explanation:
                "The check guards only the default path. The legacy branch still reads any path, so this version must not become a hard negative.",
            },
            {
              label: "After commit 2",
              verdict: "Fixed",
              language: "javascript",
              code: "function load(root, file, legacy) {\n  if (legacy) {\n    assertInside(root, file);\n    return read(path.join(root, file));\n  }\n  assertInside(root, file);\n  return read(path.join(root, file));\n}",
              explanation:
                "The identical line, now inside the legacy branch. Only after this commit is the function fixed, which is why the position of a change is part of the comparison.",
            },
          ],
        },
      ],
    },
    {
      id: "reviewing-the-rights",
      title: "Reviewing the rights of every repository",
      paragraphs: [
        "Every upstream repository whose code appears in a training record needs its own decision. A review queue sorts the 878 repositories with train or validation records into tiers by evidence. Tier A means a permissive root license (MIT, Apache-2.0, BSD or ISC) that is byte-identical at every revision the records use and matches the license the package registry reports.",
        "A root license file is not the whole story. Before a repository was proposed for approval, every revision its records use was inspected for NOTICE, COPYING, PATENTS and third-party license files, for license files in every directory on the path to a used file and for the license declared in package.json, pyproject.toml, setup.cfg or setup.py. A failed Git read counts as an open question, never as absence. The inspection found NOTICE files whose text a license detector reads as AGPL or GPL, a PATENTS file, bundled third-party license collections and package metadata that names a different license than the root file. Those repositories became clarification cases instead of recommendations.",
        "The inspection tooling had bugs of its own. setup.cfg files that use a colon instead of an equals sign were read without their license, and a normalizer that removed the word license from identifiers mangled the Unlicense and reported conflicts that did not exist. Both were found and fixed before any decision relied on them.",
      ],
    },
    {
      id: "what-was-approved",
      title: "What was approved",
      paragraphs: [
        "The project owner decided in two steps, on the evidence review, and the decisions are recorded in the repository. They are owner decisions, not legal opinions. The AI engineering assistant collected the evidence and prepared the entries; it is not a reviewer and is not named as one.",
        "Each repository approval is bound to the sha256 of the license file the review recorded. If the upstream file changes, the approval stops applying, and withdrawing an approval takes effect at the next curate and at the start of training.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 3",
          title: "Training authorization",
          caption:
            "Copyleft and unknown licenses were never proposed; approving one would need a written justification in addition to the approval.",
          columns: ["Decision", "Approved", "Left out"],
          rows: [
            [
              "15 November 2026",
              "The GitHub Advisory Database, OSV and the upstream fix commits as sources; 484 tier A repositories: MIT 318, Apache-2.0 120, BSD-3-Clause 30, BSD-2-Clause 9, ISC 7",
              "42 clarification cases, every tier B, C and D repository, and 24 tier A repositories that also have holdout or quarantine records",
            ],
            [
              "24 November 2026",
              "51 tier B repositories inspected like tier A: 28 without a usable registry license, 23 whose registry entry also lists bundled licenses",
              "26 newly recommended tier A repositories, 16 with an updated license text, 2 under the Unlicense and all clarification cases",
            ],
          ],
        },
      ],
    },
    {
      id: "loader-and-export",
      title: "When the loader and the export disagree",
      paragraphs: [
        "The training loader refuses every record of a repository that also has holdout or temporal-quarantine records, so the temporal holdout never shares a repository with training data. The export did not apply this rule. When v3 added newer advisories, two repositories that were already approved gained records after the July 2026 cutoff. Their six older records were still exported, and the loader would have refused to start training.",
        "The fix was to let curate apply the loader's rule itself and mark such records as excluded with their reason; v1 and v2 are byte-identical under the rule. The approvals were not touched: the two repositories stay approved and simply contribute nothing while they have quarantine records. The general lesson is that every gate between data and training should apply the same rules, and that a mismatch should surface in a check, not at the start of a paid GPU run.",
      ],
    },
    {
      id: "approved-training-data",
      title: "The approved training data",
      paragraphs: [
        "1,464 records from 533 repositories are approved: 1,331 for training and 133 for validation. Every verified vulnerable/fixed pair also becomes a patch example, so the first run trains detection and patch generation on 1,871 training and 187 validation examples (Table 4).",
        "With the trainer's own encoding and the pinned Qwen3.5-9B tokenizer, no example is dropped at the 4,096-token limit. The median example has 764 tokens and the longest 2,918, and one epoch is about 1.73 million tokens. JavaScript contributes 428 approved records, Go 412, Python 402 and TypeScript 222.",
      ],
      figures: [
        {
          kind: "table",
          label: "Table 4",
          title: "Training and validation examples",
          caption:
            "Detection examples ask for a finding, a no-finding answer or an abstention. Patch examples ask for the minimal fix of a vulnerable function, verified against the upstream fix.",
          columns: ["Example", "Train", "Validation"],
          rows: [
            ["Finding", "605", "63"],
            ["No finding (verified post-fix)", "555", "54"],
            ["Abstention", "171", "16"],
            ["Detection examples", "1,331", "133"],
            ["Patch examples", "540", "54"],
            ["Training examples", "1,871", "187"],
          ],
        },
        {
          kind: "table",
          label: "Table 5",
          title: "Findings by weakness family",
          caption:
            "668 findings across 131 CWEs in the approved records. SQL injection and code injection remain thin.",
          columns: ["Family", "Findings"],
          rows: [
            ["Resource limits and ReDoS", "94"],
            ["Path traversal", "78"],
            ["Authentication and authorization", "73"],
            ["Other weaknesses", "70"],
            ["Cross-site scripting", "67"],
            ["Prototype pollution", "58"],
            ["Deserialization and input validation", "53"],
            ["Information exposure", "44"],
            ["Command injection", "38"],
            ["Open redirect and SSRF", "32"],
            ["Cryptography and TLS", "29"],
            ["Code injection", "22"],
            ["SQL injection", "10"],
          ],
        },
      ],
    },
    {
      id: "training-machine",
      title: "Rebuilding exactly the approved data",
      paragraphs: [
        "A training machine should rebuild exactly the approved data and nothing else. Running the full pipeline there would fetch and process all 7,751 candidates. materialize instead rebuilds only the training-approved records of the committed manifest, 684 advisories in 533 repositories. It refuses if a record cannot be rebuilt, if a content or supervision hash differs from the manifest or if an approval no longer passes the gate. Quality, split and approval status come from the committed manifest and are never recomputed.",
        "On v2 and v3 its four output files are byte-identical to the full curate export, and from a warm cache the rebuild takes about a minute and a half. The dry run of the real training loader, which checks every supervision hash and checksum, passes on the same files.",
      ],
    },
    {
      id: "what-is-still-open",
      title: "What is still open",
      paragraphs: [
        "No model has been trained. The first QLoRA run needs approved GPU time, and until it has been evaluated against the unchanged foundation under the same conditions, nothing here says how well Quantum Sentinel-Alpha detects or fixes vulnerabilities.",
        "The quality estimate is thin. 25 of the 44 sampled items have been reviewed, by the AI engineering assistant that built the pipeline. After the automated exclusions, one localization in 14 pairs was imprecise and no other error was found, with upper bounds between 21 and 35 %. 64 evidence packages for an independent human review are prepared and not yet reviewed.",
        "Legal questions remain open: whether published weights redistribute MIT or Apache code or CC-BY advisory text, how the open-access condition in GitHub's terms for research use applies, and whether the OSV service has terms beyond the per-source licenses. They need advice before any weights are published.",
        "The data has known gaps. SQL injection has 10 findings and code injection 22, too few to learn them well. And a hard negative is safe with respect to the advisory's weakness, not proven safe in general.",
      ],
    },
    {
      id: "lessons",
      title: "Lessons for turning a dataset into training data",
      paragraphs: [
        "The points below are what we would do from the start next time.",
      ],
      items: [
        "Reject what cannot be decided. A two-step fix that looks like a backport is worse than no example, because it produces a confident, wrong hard negative.",
        "Compare changes together with their position, and compare times as instants rather than text.",
        "Inspect licenses at every revision and path the data uses, and treat a failed read as an open question.",
        "Bind each approval to the exact evidence it rests on, so that it expires when the evidence changes.",
        "Let the export and the training loader apply the same rules, and check the training machine's data against the approved hashes.",
      ],
    },
  ],
} as const satisfies PublicationRecord;
