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
      ],
      sources: [
        { label: "Repository status", url: sentinelResearchLinks.status },
        { label: "Comparison protocol", url: sentinelResearchLinks.bakeoff },
        { label: "Evaluation runner", url: sentinelResearchLinks.runner },
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
  title: "Sentinel Garden: approval before collection",
  introduction:
    "Sentinel uses a separate source-code data workflow. FineWeb2-HQ is documented for the language-model experiments below; it is not presented as Sentinel training data.",
  sections: [
    {
      title: "Current data and evaluation record",
      paragraphs: [
        "The reviewed Sentinel registry lists eight sources, all with production_approved: false. There are zero training-approved sources and zero training records. Public accessibility alone does not authorize collection, training or redistribution.",
        "QuickEval v1 contains 37 vulnerable, 34 hard-negative and 15 abstention cases across Python, JavaScript/TypeScript and Go. These clean-room synthetic cases and the 16 Python coding-regression tasks are evaluation-only. No imported public benchmark cases or private holdout are reported.",
      ],
      items: [
        "Approve each source only after recording its immutable revision, license, terms, redistribution position and reviewer.",
        "Preserve vulnerable and fixed revisions, context, diff, label, localization, verification artifacts and content hashes for each future record.",
        "Keep repositories disjoint across training and the private holdout; freeze the temporal cutoff before large-scale collection.",
        "Keep evaluation-only cases, reference patches and test oracles out of training prompts. Record exact and fuzzy overlap checks before making contamination claims.",
      ],
      sources: [
        { label: "Data governance", url: sentinelResearchLinks.governance },
        { label: "Source registry", url: sentinelResearchLinks.sources },
        { label: "QuickEval cases", url: sentinelResearchLinks.cases },
        { label: "Repository status", url: sentinelResearchLinks.status },
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
        "Sentinel-Alpha remains in Phase 0 with no trained release. Treat future vulnerability findings and patches as candidates for expert review. Require code location, CWE, supporting evidence and independent verification; an abstention or no-finding response does not establish that code is secure.",
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
