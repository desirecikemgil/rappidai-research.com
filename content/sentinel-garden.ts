import { sentinelResearchLinks, sentinelReview } from "./security-evidence";

// Sentinel Garden reviewed on 12 November 2026 at Sentinel main 47c3121.
// Every number below is read from the committed stats.json, audit/summary.json and
// review/summary.json at that revision. No record is training-approved.
export const sentinelGarden = {
  reviewed: sentinelReview.date,
  title: "Sentinel Garden: how the training data is built",
  introduction:
    "Sentinel Garden is the data pipeline for Quantum Sentinel-Alpha. It reads real, GitHub-reviewed security advisories, resolves each one to the upstream commit that fixed it and turns single-function fixes into training records. Every stage is deterministic and re-runnable; nothing is approved for training by default.",
  stagesTitle: "Pipeline architecture",
  stagesCaption:
    "Six stages, each a command of the Sentinel repository. Network access is needed only to discover advisories, fetch upstream commits and look up license or advisory metadata; curation, checks and exports run offline.",
  stages: [
    {
      name: "Discover",
      command: "python -m sentinel.garden discover",
      text: "Reads the OSV export for PyPI, npm and Go and keeps GitHub-reviewed GHSA advisories with one or two localizable CWEs and exactly one upstream fix commit. Advisories are visited in salted-hash order, at most four candidates per repository, and the candidate list is frozen.",
      output: "candidates.jsonl",
    },
    {
      name: "Build",
      command: "python -m sentinel.garden build",
      text: "Fetches the fix commit and its parent with a partial, shallow clone and keeps fixes whose logic change is confined to one function. Function boundaries, literals, imports and calls come from parse trees: Python's ast module and pinned tree-sitter grammars for Go, JavaScript and TypeScript.",
      output: "records.raw.jsonl",
    },
    {
      name: "Curate",
      command: "python -m sentinel.garden curate",
      text: "Checks every record: the upstream patch must turn the vulnerable excerpt exactly into the fixed one, targets must round-trip through the evaluation parser, and exact duplicates, near duplicates, label conflicts and overlap with evaluation cases are rejected. Assigns the frozen repository-level split.",
      output: "manifest.jsonl, stats.json",
    },
    {
      name: "Audit",
      command: "python -m sentinel.garden audit",
      text: "Checks each fix group against outside evidence, including later fixes, incomplete fixes, imprecise spans, invalid abstentions and package overlap across splits. The existing sample was reviewed by the implementing AI assistant; an independent human review has not been performed.",
      output: "audit/exclusions.yaml",
    },
    {
      name: "Review",
      command: "python -m sentinel.garden review",
      text: "Collects license evidence per repository: the license file at every used revision with its sha256, the registry license from deps.dev and the open questions. Sorts repositories into review tiers and writes approval templates that do not load until a reviewer completes them.",
      output: "REVIEW_QUEUE.md",
    },
    {
      name: "Export and verify",
      command: "python -m sentinel.garden verify",
      text: "Exports only records whose source and repository are approved, with SHA256SUMS. verify and reconstruct rebuild every record from the pinned upstream commits and compare content hashes; a missing upstream is reported, never substituted.",
      output: "train.chat.jsonl (empty until approval)",
    },
  ],
  funnelTitle: "From advisories to approved records",
  funnelCaption:
    "Bars are drawn to scale. Most advisories have no single resolvable fix commit, and most fixes touch more than one function; only fixes confined to one function become records. Approval is the last step, and it has not happened yet.",
  funnel: [
    { label: "GHSA advisories inspected", value: 19959 },
    { label: "Candidates with one fix commit", value: 4830 },
    { label: "Fixes confined to one function", value: 1206 },
    { label: "Records built", value: 2773 },
    { label: "Records accepted after checks and audit", value: 2309 },
    { label: "Records approved for training", value: 0 },
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
    ["Python", 302, 271, 89, 662],
    ["JavaScript", 300, 271, 63, 634],
    ["TypeScript", 161, 150, 47, 358],
    ["Go", 284, 262, 109, 655],
    ["Total", 1047, 954, 308, 2309],
  ],
  splitColumns: ["Split", "Records", "Repositories", "Used for"],
  splits: [
    ["train", 1724, 680, "Training, after approval"],
    ["validation", 191, 81, "Training-time validation, after approval"],
    ["holdout_reserved", 235, 89, "Evaluation only; never trained on"],
    [
      "temporal_quarantine",
      159,
      65,
      "Fixes after the 2026-07-01 cutoff; never trained on",
    ],
  ],
  auditTitle: "What the audit removed",
  auditCaption:
    "Exclusions in the snapshot reviewed on 12 November 2026, covering 1,157 fix groups. Records are excluded rather than relabelled; related records are excluded together.",
  auditColumns: ["Reason", "Excluded", "Evidence"],
  audit: [
    [
      "Later fix changes the same function",
      "126 hard negatives",
      "Another advisory of the package fixes the same function again; the fixed version is not safe.",
    ],
    [
      "Broad localization span",
      "89 groups",
      "More than 12 lines and over 40 % of the function; every broad span in the manual sample was imprecise.",
    ],
    [
      "Fix reported as incomplete",
      "47 hard negatives",
      "A later advisory calls this fix incomplete or bypassable.",
    ],
    [
      "Later fix cannot be read",
      "10 hard negatives",
      "The referenced commit is not in the upstream repository, so safety cannot be verified.",
    ],
    [
      "Manual review",
      "10 records",
      "Imprecise spans and one advisory that reports a bypass of exactly this fix.",
    ],
    [
      "Abstention passes only constants",
      "1 abstention",
      "The caller cannot reach the weakness with attacker-influenced data.",
    ],
  ],
  reviewSampleTitle: "Manual sample: error rates for the exported data",
  reviewSampleCaption:
    "A stratified sample of 44 items (32 vulnerable/fixed pairs and 12 abstentions), drawn per language and CWE family and reviewed by the implementing AI engineer, not by an authorized reviewer. Rates count the sampled items that survive the automated exclusions. With so few items, plan with the upper bound.",
  reviewSampleColumns: ["Question", "Errors", "Wilson 95 % interval"],
  reviewSample: [
    { question: "Wrong label", errors: 0, judged: 29, low: 0, high: 11.7 },
    {
      question: "Advisory does not match the code",
      errors: 0,
      judged: 29,
      low: 0,
      high: 11.7,
    },
    {
      question: "Imprecise localization",
      errors: 1,
      judged: 29,
      low: 0.6,
      high: 17.2,
    },
    {
      question: "Hard negative not safe",
      errors: 1,
      judged: 28,
      low: 0.6,
      high: 17.7,
    },
    {
      question: "Invalid abstention",
      errors: 0,
      judged: 11,
      low: 0,
      high: 25.9,
    },
  ],
  rightsTitle: "Rights review queue",
  rightsCaption:
    "Repositories with train or validation records, sorted by the license evidence the tooling found. A tier is a recommendation for the order of review, not an approval.",
  rightsColumns: ["Tier", "Evidence", "Repositories", "Records"],
  rights: [
    [
      "A",
      "Permissive license, consistent across revisions and with the package registry",
      511,
      1256,
    ],
    ["B", "Permissive license with an open question", 110, 328],
    ["C", "Weak copyleft", 15, 33],
    ["D", "Strong copyleft, unknown or no license file", 125, 298],
  ],
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
    { label: "Review queue", url: sentinelResearchLinks.reviewQueue },
  ],
} as const;
