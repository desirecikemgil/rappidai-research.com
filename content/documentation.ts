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
        "A reportable model comparison requires an immutable model revision, a clean known code commit, the full case set and the shared prompt, parser, scorer and generation settings. Retain case and prompt hashes, per-case outputs, library versions and runtime measurements. Invalid output remains invalid; patch metrics stay null until patch evaluation exists.",
        "Sentinel Garden data is rebuilt, not downloaded: the committed manifest holds metadata and content hashes, and python -m sentinel.garden verify rebuilds every record from the frozen candidate list at the pinned upstream commits and compares the hashes. Two consecutive runs of the pipeline, including the audit, are byte-identical; the parser grammars are pinned and checked.",
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
    "Sentinel uses its own source-code data pipeline, separate from the FineWeb2-HQ corpus documented below for the language-model experiments. The sections explain what a record is, how it is checked and why none is used for training yet. Figures reflect the Sentinel repository reviewed on 4 November 2026.",
  sections: [
    {
      title: "Current data and evaluation record",
      paragraphs: [
        "The reviewed Sentinel registry lists nine sources, all with production_approved: false, and the repository approval list is empty. Sentinel Garden has built 2,773 records from real advisories and accepted 2,322 of them, but zero are training-approved, so the training export is empty. Public accessibility alone does not authorize collection, training or redistribution.",
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
        "A stratified manual sample of 44 items estimates the remaining error. After the automated exclusions it found no wrong label, one imprecise localization in 29 pairs and one unsafe hard negative in 28. The sample was reviewed by the implementing AI engineer, not an authorized reviewer, and its upper bounds of about 17 % are what to plan with.",
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
      title: "Default-deny rights review",
      paragraphs: [
        "Training needs two kinds of approval: the registry sources that describe the advisories and fixes, and every upstream repository whose code appears in a record. The review queue lists 766 repositories with the license file URL at the used revision, its sha256 and the license the package registry reports. An approval is bound to that license file hash and stops applying if the file changes.",
        "Repositories with strong copyleft, unknown or missing licenses are not excluded by tooling, but approving them requires a written justification in addition to the approval. No upstream code is committed to the repository or uploaded anywhere; the committed manifest contains metadata and hashes only.",
      ],
      items: [
        "Approve the registry sources ghsa-osv-fix-commits, osv and github-advisory-db after reviewing their terms and attribution requirements.",
        "Review repositories in tier order, starting with the 513 permissive repositories in tier A.",
        "Record each decision with the reviewer, date, license identifier and license file hash; curate then fills the training export deterministically.",
      ],
      sources: [
        {
          label: "Rights review workflow",
          url: sentinelResearchLinks.rightsReview,
        },
        { label: "Review queue", url: sentinelResearchLinks.reviewQueue },
        { label: "Data governance", url: sentinelResearchLinks.governance },
      ],
    },
    {
      title: "Frozen splits, contamination and reproducibility",
      paragraphs: [
        "The split policy was frozen before the dataset was expanded: repositories are assigned to train, validation or the reserved holdout by a salted hash, so a repository never appears in two splits, and fixes committed on or after 1 July 2026 never enter training. Records are compared with every evaluation case and coding task; the reviewed run found no contamination.",
        "The pipeline is a fixed point: two consecutive runs, including the audit, produce byte-identical manifests and exclusions, and verify rebuilds every record from the pinned upstream commits with matching content hashes. EXTERNAL_RESOURCES.json lists every upstream repository and commit the dataset depends on.",
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
      title: "Training pipeline: built, gated and not yet run",
      paragraphs: [
        "The QLoRA pipeline fine-tunes Qwen3.5-9B at its pinned revision with a 4-bit NF4 base and bf16 compute. LoRA rank 16 adapters cover the 200 linear modules of the real architecture, 24 Gated DeltaNet and 8 full-attention layers, about 40.1 million trainable parameters. The loss covers only the model's reply; examples longer than the context limit are dropped, never truncated.",
        "Before training starts, the loader checks that every record is approved and still passes the governance gate, that its label and content hash match the manifest and that no repository is shared with validation or the holdout. Checkpoints record the data and configuration they were trained on and cannot be resumed with different inputs. The pipeline is tested on CPU with a tiny model of the same architecture; it has not been run on the real model.",
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
        "Review only repositories and systems for which permission exists. Protect private source code and credentials, and use isolated execution for generated code. The coding-regression harness currently uses a child process and resource limits; it is not a complete sandbox for untrusted code on a shared host.",
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
