import { ghostLinks } from "./ghost";
import { replayLinks } from "./replay";
import { sentinelResearchLinks } from "./security-evidence";
import type { ResourceSource } from "./types";

export type DocumentationSection = {
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
  sources: readonly ResourceSource[];
};

export const reproducibilityWorkflows = {
  title: "Reproduce the right layer",
  introduction:
    "Artifact integrity, repeatable software checks and model-quality evaluation answer different questions. Start with the workflow for the project being examined, and retain the exact revision and environment with every result.",
  sections: [
    {
      title: "Ghost: verify a release and its security checks",
      paragraphs: [
        "Use the v0.3.0 release, verify its SHA256SUMS and record the binary version, Docker version, host platform and policy. The release gate recorded 25 passed, 0 failed and 0 skipped GhostBench scenarios on Linux amd64 with Docker Engine.",
        "Run ghost bench --require-all when every scenario must execute, and retain the report alongside session events and policy. A skipped scenario is a coverage gap. Passing these named assertions does not establish general resistance to attacks or a detection-accuracy score.",
      ],
      sources: [
        { label: "Release and checksums", url: ghostLinks.release },
        { label: "GhostBench methodology", url: ghostLinks.benchmarks },
        { label: "Observed CI run", url: ghostLinks.gate },
        { label: "Provenance format", url: ghostLinks.provenance },
      ],
    },
    {
      title: "Sentinel: separate harness checks from model results",
      paragraphs: [
        "The CPU baseline exercises the parser, scorer and output contract. Its results are engineering checks. QuickEval v1 contains 86 public synthetic cases; it is not a private holdout and provides no evidence that a Sentinel model has been trained or evaluated.",
        "A reportable model comparison requires an immutable model revision, a clean known code commit, the full case set and matching prompt, parser, scorer and generation settings. Retain case and prompt hashes, per-case outputs, library versions and runtime measurements. Invalid output remains invalid. Offline patch scoring is implemented, but no model-generated patch result or functional-security validation is published.",
        "Sentinel Garden data is rebuilt, not downloaded: the committed manifest holds metadata and content hashes, and python -m sentinel.garden verify rebuilds every record from the frozen candidate list at the pinned upstream commits and compares the hashes; for Garden v3 that is 4,200 records with 0 differences. On a training machine, python -m sentinel.garden materialize rebuilds only the training-approved records and refuses on any hash difference. A curate and audit round after the exclusions is byte-identical; the parser grammars are pinned and checked.",
      ],
      sources: [
        { label: "Repository status", url: sentinelResearchLinks.status },
        { label: "Comparison protocol", url: sentinelResearchLinks.bakeoff },
        { label: "Evaluation runner", url: sentinelResearchLinks.runner },
        { label: "Sentinel Garden", url: sentinelResearchLinks.garden },
      ],
    },
    {
      title: "Replay: verify captured execution state",
      paragraphs: [
        "Replay records execution state and supports verification, staged restore, branching, live reruns and multidimensional diffs. Use the reviewed source and document which files, processes and external services were captured before comparing two executions.",
        "Restoring recorded state cannot guarantee identical live output from an external model or service. Keep recorded playback, restored state and a newly executed rerun distinct, and retain the verification report with the capture.",
      ],
      sources: [
        { label: "Replay documentation", url: replayLinks.readme },
        { label: "Verified staged restore", url: replayLinks.restore },
        { label: "Live rerun contract", url: replayLinks.rerun },
        { label: "Diff contract", url: replayLinks.diff },
      ],
    },
  ] satisfies readonly DocumentationSection[],
} as const;

export const sentinelDataGovernance = {
  title: "Sentinel Garden: records you can check",
  introduction:
    "Sentinel uses its own source-code data pipeline, separate from the FineWeb2-HQ corpus documented below for the language-model experiments. The sections explain what a record is, how it is checked and which records are approved for training. Figures reflect Sentinel Garden v3 in the Sentinel repository reviewed on 24 November 2026.",
  sections: [
    {
      title: "Current data and evaluation record",
      paragraphs: [
        "The reviewed Sentinel registry lists nine sources. Three of them, the GitHub Advisory Database, OSV and the upstream fix commits, are approved for training by the project owner; the other six stay evaluation-only or unapproved. Sentinel Garden v3 has built 4,200 records from real advisories and accepted 3,427 of them; 1,464 records from 533 approved repositories are training-approved. Public accessibility alone does not authorize collection, training or redistribution.",
        "QuickEval v1 contains 37 vulnerable, 34 hard-negative and 15 abstention cases across Python, JavaScript/TypeScript and Go. These clean-room synthetic cases and the 16 Python coding-regression tasks are evaluation-only, and every Garden record is checked for overlap with them. No imported public benchmark cases or private holdout are reported.",
      ],
      sources: [
        { label: "Repository status", url: sentinelResearchLinks.status },
        { label: "Source registry", url: sentinelResearchLinks.sources },
        { label: "Dataset statistics", url: sentinelResearchLinks.seedStats },
        { label: "QuickEval cases", url: sentinelResearchLinks.cases },
      ],
    },
    {
      title: "Three records from one upstream fix",
      paragraphs: [
        "A fix that changes one function produces up to three records. The function before the fix is labelled vulnerable, with the advisory's CWE and the changed or inserted lines as the localization. The same function after the fix is a hard negative: safe with respect to that weakness, which teaches the model not to report code merely because it resembles a known vulnerability. A caller of the vulnerable function, shown without the callee, becomes an abstention record, because whether it is safe depends on code the reviewer cannot see.",
        "Each record keeps the advisory, the upstream repository, both commit SHAs, the file path, the license files with their sha256 and a content hash. The upstream patch, cut to the function, must turn the vulnerable excerpt exactly into the fixed excerpt.",
      ],
      sources: [
        { label: "Sentinel Garden design", url: sentinelResearchLinks.garden },
        { label: "Finding contract", url: sentinelResearchLinks.finding },
      ],
    },
    {
      title: "Fixes spread over several commits",
      paragraphs: [
        "Many advisories name more than one fix commit, for example a code change plus a test, or the same fix on a release branch. Garden v3 keeps such advisories when all commits lie in one repository and uses them only when the fix is unambiguous: exactly one commit changes the code and the others only tests, documentation, changelogs or CI files, or every commit makes the identical change at the same position in the same function, as a backport or a merge does. The earliest such commit is the fix.",
        "Everything else is rejected, never guessed. A fix split over several commits would leave the first commit's still-vulnerable function looking fixed, so it cannot become a hard negative. Of 1,128 multi-commit advisories, 100 yield records; 778 are rejected as distinct changes and 116 because a companion commit changes something that might itself be the fix. Every v2 candidate is unchanged in v3.",
      ],
      sources: [
        { label: "Garden v3", url: sentinelResearchLinks.gardenV3 },
        {
          label: "Multi-commit tests",
          url: sentinelResearchLinks.multiCommitTests,
        },
      ],
    },
    {
      title: "Structure from parse trees, not text patterns",
      paragraphs: [
        "Where a function starts and ends, what is a string, a regular expression or a comment, which lines are imports and who calls whom decide whether a fix is accepted and where its label points. Python is read with its own ast and tokenize modules; Go, JavaScript and TypeScript with tree-sitter grammars pinned to exact versions, recorded with the dataset and enforced by the consistency check.",
        "An earlier hand-written scanner for the three languages produced most of the defects found in code review, from regular expressions after an if statement to braces inside raw strings. Replacing it with real parse trees removed the whole class; a comparison over all 548 affected source files showed no Go difference and only corrections for JavaScript and TypeScript.",
      ],
      sources: [
        { label: "Parser module", url: sentinelResearchLinks.syntax },
        { label: "Repository status", url: sentinelResearchLinks.status },
      ],
    },
    {
      title: "Evidence beyond the diff: the quality audit",
      paragraphs: [
        "A fix commit alone cannot show that the fixed function is safe. The audit therefore queries every other OSV advisory of the same package. If a later fix changes the same function again, or an advisory calls the fix incomplete, the hard negative is excluded; if the later fix commit cannot be read, it is excluded as unverified. Broad localization spans and abstentions whose caller passes only constants are excluded as well.",
        "A stratified manual sample of 44 items estimates the remaining error; 25 have been reviewed so far. After the automated exclusions it found one imprecise localization in 14 pairs and no mismatched advisory, unsafe hard negative or invalid abstention. The reviewer was the implementing AI engineer, not an authorized reviewer, and with so few items the upper bounds of 21 to 35 % are what to plan with. 64 evidence packages for an independent human review are prepared; that review has not been performed.",
      ],
      sources: [
        { label: "Audit report", url: sentinelResearchLinks.auditReport },
        {
          label: "Manual review verdicts",
          url: sentinelResearchLinks.manualReview,
        },
      ],
    },
    {
      title: "Rights review and training authorization",
      paragraphs: [
        "Training needs two kinds of approval: the registry sources that describe the advisories and fixes, and every upstream repository whose code appears in a record. The review queue lists 878 repositories with the license file URL at each used revision, its sha256 and the license the package registry reports. Before a repository was proposed, every revision its records use was inspected for NOTICE, PATENTS and third-party files, license files on the path of each used file and the license named in package.json, pyproject.toml, setup.cfg or setup.py. A failed read counts as an open question, never as absence.",
        "On 15 November 2026 the project owner approved the three advisory sources and the 484 tier A repositories the evidence review recommended. On 24 November 2026 51 tier B repositories followed that passed the same inspection: 28 whose package registry reports no usable license and 23 whose registry entry also lists licenses of bundled code. Each approval is bound to the sha256 of the reviewed license file and stops applying if the file changes. No upstream code is committed to the repository or uploaded anywhere; the committed manifest contains metadata and hashes only.",
      ],
      items: [
        "Approved: 535 repositories under MIT, Apache-2.0, BSD-3-Clause, BSD-2-Clause or ISC, recorded with reviewer, date, license identifier and license-file hash.",
        "Prepared but not approved: 26 further tier A repositories, 16 with a changed license text and 2 under the Unlicense. Clarification cases, copyleft and unknown licenses stay default-deny.",
        "Withdrawing an approval takes effect at the next curate and at the start of training.",
        "Open questions remain for a legal review before any weights are published: whether weights redistribute the training code or advisory text, and the open-access condition in GitHub's terms for research use.",
      ],
      sources: [
        {
          label: "Training authorization",
          url: sentinelResearchLinks.trainingAuthorization,
        },
        {
          label: "Cohort rights review",
          url: sentinelResearchLinks.cohortRightsReview,
        },
        { label: "Review queue", url: sentinelResearchLinks.reviewQueue },
        { label: "Data governance", url: sentinelResearchLinks.governance },
      ],
    },
    {
      title: "Frozen splits, contamination and reproducibility",
      paragraphs: [
        "The split policy was frozen before the dataset was expanded: repositories are assigned to train, validation or the reserved holdout by a salted hash, so a repository never appears in two splits, and fixes committed on or after 1 July 2026 never enter training. Records are compared with every evaluation case and coding task; the reviewed run found no contamination.",
        "The training loader refuses every record of a repository that also has holdout or temporal-quarantine records, so the temporal holdout stays free of same-repository training data. Garden v3 gave two approved repositories new post-cutoff records; curate now applies the same rule, so those 6 records are excluded from the export instead of stopping the training run.",
        "The pipeline is a fixed point: a curate and audit round after the exclusions produces byte-identical manifests and exclusions, and verify rebuilds all 4,200 records from the pinned upstream commits with matching content hashes. EXTERNAL_RESOURCES.json lists every upstream repository and commit the dataset depends on.",
      ],
      sources: [
        { label: "Split policy", url: sentinelResearchLinks.splitPolicy },
        {
          label: "Garden configuration",
          url: sentinelResearchLinks.gardenConfig,
        },
        {
          label: "External resources",
          url: sentinelResearchLinks.externalResources,
        },
      ],
    },
    {
      title: "Training pipeline: ready, with approved data, not yet run",
      paragraphs: [
        "The QLoRA pipeline fine-tunes Qwen3.5-9B at its pinned revision with a 4-bit NF4 base and bf16 compute. LoRA rank 16 adapters cover the 200 linear modules of the real architecture, 24 Gated DeltaNet and 8 full-attention layers, about 40.1 million trainable parameters. The loss covers only the model's reply; examples longer than the context limit are dropped, never truncated.",
        "The first run trains vulnerability detection and patch generation: 1,331 detection and 540 patch examples for training, 133 and 54 for validation. With the pinned tokenizer no example exceeds the 4,096-token limit; the median is 764 tokens, the longest has 2,918, and one epoch covers about 1.73 million tokens.",
        "Before training starts, the loader checks that every record is approved and still passes the governance gate, that its label, content and supervision hashes match the manifest and that no repository is shared with validation, the holdout or the quarantine. Checkpoints record the data and configuration they were trained on and cannot be resumed with different inputs. The dry run on the approved data passes. The pipeline has not been run on the real model; that requires approved GPU time.",
      ],
      sources: [
        {
          label: "Training documentation",
          url: sentinelResearchLinks.training,
        },
        {
          label: "Training configuration",
          url: sentinelResearchLinks.trainingConfig,
        },
        { label: "Foundation decision", url: sentinelResearchLinks.foundation },
        {
          label: "Patch supervision",
          url: sentinelResearchLinks.patchSupervision,
        },
      ],
    },
  ] satisfies readonly DocumentationSection[],
} as const;

export const responsibleUseBoundaries = {
  title: "Use boundaries by project",
  introduction:
    "Research models, an enforcement runtime and an execution recorder carry different risks. Select controls for the actual workflow, and review the linked project-specific threat models before granting access to code, files or external services.",
  sections: [
    {
      title: "Ghost: limit access and retain evidence",
      paragraphs: [
        "Use a dedicated workspace with minimum privileges, explicit host allowlists and no real credentials. SHADOW resources are synthetic; secrets placed in a mounted workspace remain exposed. Review persisted command arguments and session artifacts before sharing them.",
        "Prompt-injection signals and decoy access do not prove malicious intent. Containment governs subsequent decisions and does not revoke established connections. Keep approval scope narrow and treat host, Docker and policy configuration as part of the security boundary.",
      ],
      sources: [
        { label: "Threat model", url: ghostLinks.threat },
        { label: "Security model", url: ghostLinks.security },
        { label: "Ghost security reporting", url: ghostLinks.reporting },
      ],
    },
    {
      title: "Sentinel: verify findings before acting",
      paragraphs: [
        "Sentinel-Alpha has no trained model or release. Treat future vulnerability findings and patches as candidates for expert review. Require code location, CWE, supporting evidence and independent verification; an abstention or no-finding response does not establish that code is secure.",
        "Review only repositories and systems for which permission exists. Protect private source code and credentials. Generated coding-regression solutions run in disposable, digest-pinned containers with network disabled, a read-only root filesystem and resource limits; failed isolation checks stop the run. Containers still share the host kernel.",
      ],
      sources: [
        { label: "Finding contract", url: sentinelResearchLinks.finding },
        { label: "Repository status", url: sentinelResearchLinks.status },
        { label: "Data governance", url: sentinelResearchLinks.governance },
      ],
    },
    {
      title: "Replay: protect captured state",
      paragraphs: [
        "Execution records can include sensitive file content, prompts, command arguments and outputs. Limit capture scope, review artifacts before sharing and keep storage permissions appropriate to the underlying data. Local storage alone is not a privacy guarantee.",
        "Inspect a capture before restoring it. A live rerun can execute commands and contact external services again; check permissions and credentials before starting it. Replay supplies an execution record, not a security verdict on its contents.",
      ],
      sources: [
        { label: "Replay documentation", url: replayLinks.readme },
        { label: "Verified staged restore", url: replayLinks.restore },
        { label: "Live rerun contract", url: replayLinks.rerun },
      ],
    },
  ] satisfies readonly DocumentationSection[],
} as const;

export const licensingGuidance = {
  title: "Check rights for the material being reused",
  introduction:
    "A project can publish source code under one license while its model artifacts, data and brand assets have different terms. Follow the license attached to the exact file and revision.",
  sections: [
    {
      title: "Software, models and data are separate works",
      paragraphs: [
        "Ghost and Replay publish their own Apache-2.0 licenses. Preserve the applicable license, notices and attribution when redistributing covered material. The website license does not replace either project's license or the licenses of bundled dependencies.",
        "The reviewed Sentinel repository has no project license recorded. Its public code and synthetic evaluation cases must not be described as freely reusable. The upstream Qwen candidates have their own terms; those terms do not license Sentinel-authored code, datasets or future adapters. No Sentinel weights or artifact license have been released.",
        "For a combined workflow, record the origin, immutable revision and terms for every component. Do not infer permission for datasets, model weights or trademarks from a source-code license. Send unresolved reuse requests to the project contact before redistribution.",
      ],
      sources: [
        { label: "Ghost license", url: ghostLinks.license },
        { label: "Replay license", url: replayLinks.license },
        { label: "Sentinel license status", url: sentinelResearchLinks.status },
      ],
    },
  ] satisfies readonly DocumentationSection[],
} as const;
