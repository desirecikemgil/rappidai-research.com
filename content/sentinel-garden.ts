import { sentinelResearchLinks, sentinelReview } from "./security-evidence";

// Sentinel Garden v3 reviewed on 24 November 2026 at Sentinel main cec6f96. Every number
// below is read from the committed stats.json, audit/summary.json, review/summary.json,
// manifest.jsonl and approvals.yaml at that revision. Audit exclusions count distinct
// records, not exclusion entries (one hard negative can be hit by several later advisories).
export const sentinelGarden = {
  reviewed: sentinelReview.date,
  title: "Sentinel Garden: how the training data is built",
  introduction:
    "Sentinel Garden is the data pipeline for Quantum Sentinel-Alpha. It reads real, GitHub-reviewed security advisories, resolves each one to the upstream commits that fixed it and turns single-function fixes into training records. Every stage is deterministic and re-runnable, and nothing is used for training until its sources and repository are approved. The current dataset, Garden v3, holds 3,427 audited records; 1,464 of them are approved for training.",
  stagesTitle: "Pipeline architecture",
  stagesCaption:
    "Six stages, each a command of the Sentinel repository. Network access is needed only to discover advisories, fetch upstream commits and look up license or advisory metadata; curation, checks and exports run offline.",
  stages: [
    {
      name: "Discover",
      command: "python -m sentinel.garden discover",
      text: "Reads the OSV export for PyPI, npm and Go and keeps GitHub-reviewed GHSA advisories with one or two localizable CWEs whose fix commits all lie in one upstream repository. Advisories are visited in salted-hash order, at most 20 candidates per repository, and the candidate list is frozen.",
      output: "candidates.jsonl",
    },
    {
      name: "Build",
      command: "python -m sentinel.garden build",
      text: "Fetches each fix commit and its parent with a partial, shallow clone and keeps fixes whose logic change is confined to one function. An advisory with several fix commits is used only when the fix is unambiguous: one commit changes the code and the others only tests or documentation, or every commit makes the identical change at the same position. Function boundaries, literals, imports and calls come from parse trees: Python's ast module and pinned tree-sitter grammars for Go, JavaScript and TypeScript.",
      output: "records.raw.jsonl",
    },
    {
      name: "Curate",
      command: "python -m sentinel.garden curate",
      text: "Checks every record: the upstream patch must turn the vulnerable excerpt exactly into the fixed one, targets must round-trip through the evaluation parser, and exact duplicates, near duplicates, label conflicts and overlap with evaluation cases are rejected. Assigns the frozen repository-level split and applies the training loader's own rule, so a repository with holdout or quarantine records exports nothing for training.",
      output: "manifest.jsonl, stats.json",
    },
    {
      name: "Audit",
      command: "python -m sentinel.garden audit",
      text: "Checks each fix group against outside evidence, including later fixes, incomplete fixes, imprecise spans, invalid abstentions and package overlap across splits. A curate and audit round after the exclusions is byte-identical, so the dataset is at a fixed point. The existing sample was reviewed by the implementing AI assistant; an independent human review has not been performed.",
      output: "audit/exclusions.yaml",
    },
    {
      name: "Review",
      command: "python -m sentinel.garden review",
      text: "Collects license evidence per repository: the license file at every used revision with its sha256, the registry license from deps.dev, NOTICE, PATENTS and nested license files on every used path and the license named in package metadata. Sorts repositories into review tiers; the project owner's approvals are bound to the reviewed license-file hash.",
      output: "REVIEW_QUEUE.md, approvals.yaml",
    },
    {
      name: "Export, verify and materialize",
      command: "python -m sentinel.garden materialize",
      text: "Exports only records whose sources and repository are approved, with SHA256SUMS. verify rebuilds every record from the pinned upstream commits and compares content hashes; for Garden v3 that is 4,200 records with 0 differences. On a training machine, materialize rebuilds only the approved records and refuses on any hash difference.",
      output: "train.chat.jsonl, train.patch.chat.jsonl",
    },
  ],
  funnelTitle: "From advisories to approved records",
  funnelCaption:
    "Bars are drawn to scale. Most advisories have no resolvable fix in one repository, and most fixes touch more than one function; only fixes confined to one function become records. Approval is the last step: holdout and quarantine records are never approved, and only repositories the project owner approved contribute training records.",
  funnel: [
    { label: "GHSA advisories inspected", value: 19959 },
    { label: "Candidate fixes in one repository", value: 7751 },
    { label: "Fixes confined to one function", value: 1825 },
    { label: "Records built", value: 4200 },
    { label: "Records accepted after checks and audit", value: 3427 },
    { label: "Records approved for training", value: 1464 },
  ],
  compositionTitle: "Accepted records by language and label",
  compositionCaption:
    "Vulnerable functions are labelled with a finding, their fixed versions are hard negatives for the advisory's weakness, and abstention records show a caller whose correctness depends on a withheld callee.",
  compositionColumns: [
    "Language",
    "Vulnerable",
    "Hard negative",
    "Abstention",
    "Total",
  ],
  composition: [
    ["Python", 514, 459, 153, 1126],
    ["JavaScript", 393, 347, 82, 822],
    ["TypeScript", 237, 209, 69, 515],
    ["Go", 422, 377, 165, 964],
    ["Total", 1566, 1392, 469, 3427],
  ],
  splitColumns: ["Split", "Records", "Repositories", "Used for"],
  splits: [
    ["train", 2405, 779, "Training; 1,331 records approved"],
    ["validation", 268, 99, "Training-time validation; 133 records approved"],
    ["holdout_reserved", 399, 109, "Evaluation only; never trained on"],
    [
      "temporal_quarantine",
      355,
      110,
      "Fixes after the 2026-07-01 cutoff; never trained on",
    ],
  ],
  auditTitle: "What the audit removed",
  auditCaption:
    "Exclusions in Garden v3, reviewed on 24 November 2026, covering 1,736 fix groups. Records are excluded rather than relabelled, and related records are excluded with them. One hard negative can have several reasons; 164 were invalidated by a later or reported-incomplete fix.",
  auditColumns: ["Reason", "Excluded", "Evidence"],
  audit: [
    [
      "Later fix changes the same function",
      "118 hard negatives",
      "Another advisory of the package fixes the same function again; the fixed version is not safe.",
    ],
    [
      "Broad localization span",
      "132 groups",
      "More than 12 lines and over 40 % of the function; broad spans in the manual samples were imprecise.",
    ],
    [
      "Fix reported as incomplete",
      "55 hard negatives",
      "A later advisory calls this fix incomplete or bypassable.",
    ],
    [
      "Later fix cannot be read",
      "22 hard negatives",
      "The referenced commit is not in the upstream repository, so safety cannot be verified.",
    ],
    [
      "Package shared across splits",
      "18 records",
      "A train record shares a published package or near-duplicate code with validation, holdout or quarantine.",
    ],
    [
      "Manual review",
      "10 records",
      "Imprecise spans and one advisory that reports a bypass of exactly this fix.",
    ],
    [
      "Abstention passes only constants",
      "2 abstentions",
      "The caller cannot reach the weakness with attacker-influenced data.",
    ],
  ],
  reviewSampleTitle: "Manual sample: error rates for the exported data",
  reviewSampleCaption:
    "A stratified sample of 44 items drawn per language and CWE family; 25 have been reviewed by the implementing AI engineer, not by an authorized reviewer, and 19 are pending. Rates count the reviewed items that survive the automated exclusions. Partial verdicts are not counted as errors: for 7 of 17 judged pairs, another CWE would fit better. With so few items, plan with the upper bound.",
  reviewSampleColumns: ["Question", "Errors", "Wilson 95 % interval"],
  reviewSample: [
    {
      question: "Advisory does not match the code",
      errors: 0,
      judged: 14,
      low: 0,
      high: 21.5,
    },
    {
      question: "Fix does not address the weakness",
      errors: 0,
      judged: 14,
      low: 0,
      high: 21.5,
    },
    {
      question: "Imprecise localization",
      errors: 1,
      judged: 14,
      low: 1.3,
      high: 31.5,
    },
    {
      question: "Hard negative not safe",
      errors: 0,
      judged: 13,
      low: 0,
      high: 22.8,
    },
    {
      question: "Invalid abstention",
      errors: 0,
      judged: 7,
      low: 0,
      high: 35.4,
    },
  ],
  rightsTitle: "Rights review queue",
  rightsCaption:
    "Repositories with train or validation records, sorted by the license evidence the tooling found. A tier is a recommendation for the order of review, not an approval; the approvals are listed in the next table.",
  rightsColumns: ["Tier", "Evidence", "Repositories", "Records"],
  rights: [
    [
      "A",
      "Permissive license, consistent across revisions and with the package registry",
      581,
      1637,
    ],
    ["B", "Permissive license with an open question", 133, 520],
    ["C", "Weak copyleft", 20, 55],
    ["D", "Strong copyleft, unknown or no license file", 144, 461],
  ],
  approvalsTitle: "Training authorization",
  approvalsCaption:
    "Decisions recorded by the project owner on the evidence review. They are owner decisions, not legal opinions, and each repository approval stops applying if the upstream license file changes. Two approved repositories contribute no records because they also have quarantine records.",
  approvalsColumns: ["Decision", "Scope", "Repositories"],
  approvals: [
    [
      "15 November 2026",
      "Three advisory sources and the tier A repositories the evidence review recommended: MIT 318, Apache-2.0 120, BSD-3-Clause 30, BSD-2-Clause 9, ISC 7",
      484,
    ],
    [
      "24 November 2026",
      "Tier B repositories inspected like tier A: 28 without a usable registry license, 23 whose registry entry also lists bundled licenses",
      51,
    ],
    [
      "Not approved",
      "Everything else stays default-deny, including NOTICE, PATENTS or third-party license files, package-metadata conflicts, changed license texts and every copyleft or unknown license",
      343,
    ],
  ],
  trainingTitle: "Training data after approval",
  trainingCaption:
    "Examples from the 1,464 approved records of 533 repositories. Every verified vulnerable/fixed pair also becomes a patch example. With the pinned Qwen3.5-9B tokenizer, no example exceeds the 4,096-token limit: median 764, maximum 2,918, about 1.73 million tokens per epoch.",
  trainingColumns: ["Example", "Train", "Validation"],
  training: [
    ["Finding", 605, 63],
    ["No finding (verified post-fix)", 555, 54],
    ["Abstention", 171, 16],
    ["Detection examples", 1331, 133],
    ["Patch examples", 540, 54],
    ["Training examples", 1871, 187],
  ],
  sources: [
    { label: "Sentinel Garden design", url: sentinelResearchLinks.garden },
    { label: "Garden v3", url: sentinelResearchLinks.gardenV3 },
    { label: "Dataset report", url: sentinelResearchLinks.seedReport },
    { label: "Audit report", url: sentinelResearchLinks.auditReport },
    {
      label: "Manual review verdicts",
      url: sentinelResearchLinks.manualReview,
    },
    { label: "Review queue", url: sentinelResearchLinks.reviewQueue },
    {
      label: "Training authorization",
      url: sentinelResearchLinks.trainingAuthorization,
    },
  ],
} as const;
