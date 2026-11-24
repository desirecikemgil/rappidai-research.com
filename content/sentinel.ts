import type { ModelRecord } from "./types";

// Public development plan, supplied by the maintainer on 7 October 2026, updated
// with the reviewed repository state of 24 November 2026 (content/security-evidence.ts).
// Capabilities and release artifacts are objectives, not measured results.
export const sentinelPreview = {
  name: "Quantum Sentinel-Alpha",
  line: "Quantum Sentinel 1",
  status: "Alpha · In Development",
  target: "Release timing not announced",
  releaseTiming: "No revised date announced",
  primaryFoundation: "Qwen3.5-9B",
  foundations: ["Qwen3.5-9B"],
  foundationRevision: "c202236235762e1c871ad0ccb60c8ee5ba337b9a",
  languages: ["Python", "JavaScript / TypeScript", "Go"],
  description: "Specialized AI for secure software.",
  summary:
    "A specialized AI model in development to find, understand and fix vulnerabilities in source code.",
  explore: "Explore Quantum Sentinel-Alpha",
  roadmapLink: "View roadmap",
  targetNotice:
    "The earlier October 2026 Alpha target has passed. The foundation is selected, the training data is approved and the training pipeline passes its preflight on that data, but no model has been trained or evaluated yet; the first run waits for approved GPU time and no revised release date is announced. Quantum Sentinel 1.0 remains a later milestone.",
  positioning: ["Cybersecurity-focused", "Local-first", "Open weights planned"],
  overview:
    "Quantum Sentinel-Alpha is the first substantial security fine-tuning milestone of the Quantum Sentinel 1 model line. It is designed as a specialized second security reviewer for developers, open-source maintainers, small engineering teams, security researchers and coding-agent builders.",
  capabilitiesTitle: "Training objectives for Alpha",
  capabilitiesNotice:
    "Training objectives for Alpha. Performance has not yet been published. When evidence is insufficient, the model should express uncertainty or abstain.",
  capabilities: [
    {
      title: "Detection",
      text: "Find potential vulnerabilities in source code while distinguishing unsafe patterns from benign lookalikes.",
    },
    {
      title: "Localization",
      text: "Identify affected files and relevant code spans, rather than returning only generic warnings.",
    },
    {
      title: "CWE Classification",
      text: "Map findings to appropriate CWE categories when sufficient evidence exists.",
    },
    {
      title: "Evidence",
      text: "Provide concise technical evidence around data flow, trust boundaries and why a pattern may be unsafe.",
    },
    {
      title: "Remediation",
      text: "Explain concrete ways to remove or mitigate a vulnerability.",
    },
    {
      title: "Patch Generation",
      text: "Propose minimal security-focused patches designed to preserve existing functionality.",
    },
    {
      title: "False-Positive Rejection",
      text: "Recognize similar-looking, safe code as benign. Abstain instead of inventing a vulnerability.",
    },
    {
      title: "Secure Review",
      text: "Review repositories, pull requests and diffs as a specialized second security reviewer.",
    },
  ],
  architectureTitle: "How the model and the Sentinel Engine work together",
  architectureText:
    "The model evaluates semantic risks. The Sentinel Engine supplies repository context and deterministic tools, then checks candidate findings. The planned model remains independently downloadable and locally usable.",
  modelTasks:
    "Security analysis · Localization · CWE classification · Evidence · Patch proposals · Abstention",
  engineTasks:
    "Repository indexing · Context selection · Static signals · Tool orchestration · Verification · Tests · Re-analysis · JSON / SARIF",
  pipeline: [
    {
      title: "Repository / Pull Request",
      text: "Source code or a proposed change",
    },
    { title: "Repository Indexer", text: "Reduce the search space" },
    {
      title: "Static Signals + Context",
      text: "Select relevant code and tool signals",
    },
    { title: "Quantum Sentinel", text: "Evaluate semantic security risks" },
    { title: "Candidate Findings", text: "Claims awaiting verification" },
    {
      title: "Verifier / Tests / Re-analysis",
      text: "Check evidence; reject unsupported candidates",
    },
    {
      title: "Evidence-backed Finding",
      text: "Optional minimal patch, checked for function and security",
    },
    {
      title: "JSON / SARIF / Human Report",
      text: "Structured output or a readable review",
    },
  ],
  architectureReason:
    "Deterministic work belongs in tools: indexing narrows the search, static analysis adds signals, verification checks model claims and tests help establish whether a patch still works and is safer. Specialization plus verification matters more than model size alone.",
  foundationTitle: "Base model: Qwen3.5-9B, selected",
  foundationText:
    "Quantum Sentinel-Alpha is built on Qwen3.5-9B, pinned to one immutable Hugging Face revision under the Apache-2.0 license. The selection of 4 November 2026 rests on expected capability for multi-step code reasoning, CWE discrimination and patch generation, not on a measured security advantage: neither Qwen3.5-9B nor Qwen3.5-4B has been evaluated yet, and the 4B/9B comparison remains an optional experiment rather than a gate.",
  trainingTitle: "Security post-training with a focus on evidence",
  trainingText:
    "Sentinel builds on an existing open-weight foundation rather than pretraining from scratch. The QLoRA pipeline is implemented, tested on CPU with a tiny model of the same architecture and checked end to end on the approved data, but it has not been run on the real model. The first run trains vulnerability detection and patch generation on 1,871 approved examples, computes the loss on the reply alone and refuses to start if a record, label or hash no longer matches the approved manifest. Preference training or domain adaptation will be added only if evaluations show measurable value.",
  trainingFacts: [
    { label: "Method", value: "QLoRA: 4-bit NF4 base, bf16 compute" },
    {
      label: "Adapter",
      value: "LoRA rank 16, alpha 32, on 200 linear modules",
    },
    {
      label: "Trainable parameters",
      value: "40.1M (0.45 % of the model)",
    },
    {
      label: "Architecture",
      value: "24 Gated DeltaNet and 8 full-attention layers",
    },
    {
      label: "Training data",
      value: "1,871 training and 187 validation examples",
    },
    {
      label: "Token budget",
      value: "1.73M tokens per epoch; longest example 2,918 of 4,096",
    },
    { label: "Training runs", value: "None yet; awaiting GPU time" },
  ],
  modelCardTitle: "Model card",
  modelCardText:
    "The technical record of Quantum Sentinel-Alpha as reviewed on 24 November 2026. Values marked as planned or not run describe the prepared pipeline, not a trained model.",
  modelCard: [
    {
      label: "Model",
      value: "Quantum Sentinel-Alpha, Quantum Sentinel 1 line",
    },
    {
      label: "Type",
      value:
        "Security-specialized code model: LoRA adapter on a decoder-only base",
    },
    {
      label: "Base model",
      value: "Qwen/Qwen3.5-9B, revision c202236, Apache-2.0",
    },
    {
      label: "Base architecture",
      value:
        "32 text layers: 24 Gated DeltaNet and 8 full-attention layers, about 8.95B text parameters",
    },
    {
      label: "Fine-tuning",
      value:
        "QLoRA, 4-bit NF4 with double quantization, bf16 compute; LoRA rank 16, alpha 32, dropout 0.05",
    },
    {
      label: "Trainable parameters",
      value: "40,108,032 in 200 attention, DeltaNet and MLP projections",
    },
    {
      label: "Training data",
      value:
        "Sentinel Garden v3: 3,427 accepted records; 1,464 approved for training from 533 repositories",
    },
    {
      label: "Training tasks",
      value:
        "Detection with finding, no finding or abstention; minimal patches from 594 verified upstream fixes",
    },
    {
      label: "Data rights",
      value:
        "Three sources and 535 repositories approved by the project owner, each bound to its license-file hash",
    },
    {
      label: "Prompt and output",
      value:
        "Shared review prompt quickeval-review-v2; JSON finding with decision, CWE, lines and evidence; no supervised confidence",
    },
    {
      label: "Evaluation plan",
      value:
        "QuickEval v1 (86 synthetic cases), coding-v1 (16 tasks) and the Garden validation split against the base model",
    },
    {
      label: "Training runs",
      value:
        "None; the preflight on the approved data passes, the GPU run is pending",
    },
    { label: "Evaluation results", value: "Not measured" },
    {
      label: "Weights and license",
      value: "Not released; no artifact license",
    },
  ],
  gardenTitle: "Training data: Sentinel Garden",
  gardenText:
    "Sentinel Garden turns real, GitHub-reviewed security advisories into training records: the vulnerable function before the upstream fix, the same function after the fix as a hard negative, and a caller of the vulnerable function with the callee withheld, where the right answer is to abstain. Every record keeps its source revision, license evidence and content hash. Training export is default-deny: on 15 and 24 November 2026 the project owner approved the three advisory sources and 535 permissively licensed repositories; everything else stays excluded.",
  gardenFacts: [
    {
      label: "Advisories inspected",
      value: "19,959 (PyPI, npm, Go)",
    },
    { label: "Accepted records", value: "3,427" },
    {
      label: "Composition",
      value: "1,566 vulnerable · 1,392 hard negatives · 469 abstentions",
    },
    {
      label: "Coverage",
      value: "1,363 vulnerable/fixed pairs · 4 languages · 194 CWEs",
    },
    {
      label: "Training-approved",
      value: "1,464 records from 533 repositories",
    },
  ],
  languageNotice:
    "First-generation language focus: Python, JavaScript / TypeScript and Go. Other languages may follow through additional data and evaluation.",
  localTitle: "Local analysis of your code",
  localText:
    "Local-first inference is planned so code can be reviewed without requiring upload to an external cloud service. An open-weight release on Hugging Face and quantized local variants are planned; no Sentinel weights are available yet.",
  artifacts: [
    "Merged model weights",
    "Model Card",
    "Evaluation Card",
    "Optional 8-bit / 4-bit variants",
    "Possible GGUF variants",
    "Sentinel Scanner / CLI",
  ],
  hardwareNotice:
    "The selected foundation is in the approximately 9B class. Quantization is intended to make consumer-hardware inference possible. RAM and VRAM requirements will be published after measurement of the final variants.",
  roadmapTitle: "Development path to a stable release",
  roadmapText:
    "Alpha is the first real security-SFT milestone, before Beta, Release Candidate and the later stable Quantum Sentinel 1.0. Each phase below carries its state in the reviewed repository; approved data and a passing preflight are not a completed training run.",
  phases: [
    { title: "Foundation", state: "Selected", current: false },
    { title: "Baseline", state: "Prepared, not run", current: true },
    {
      title: "Dataset / Garden",
      state: "Garden v3 built and approved",
      current: false,
    },
    { title: "Calibration", state: "Planned", current: false },
    {
      title: "SFT Alpha",
      state: "Data approved, awaiting GPU time",
      current: true,
    },
    { title: "Data Iteration + Beta", state: "Planned", current: false },
    { title: "Optional Hardening", state: "Planned", current: false },
    { title: "Release Candidate", state: "Planned", current: false },
    { title: "Quantum Sentinel 1.0", state: "Planned", current: false },
  ],
  researchNotice:
    "Alpha is in development. Capabilities, architecture and release artifacts described here are planned and may change with evaluation. No model has been trained or evaluated, and no benchmark results or validated hardware requirements are announced.",
  safetyText:
    "Defensive source-code security, not a general chatbot, autonomous penetration-testing agent or internet-scanning system. Malware building, credential theft and ransomware assistance are outside the scope. Sentinel complements human security review, SAST and dependency scanning; it does not replace them.",
} as const;

export const sentinelModel = {
  slug: "quantum-sentinel-alpha",
  name: sentinelPreview.name,
  status: "in-development",
  statusLabel: sentinelPreview.status,
  availability: "not-released",
  summary:
    "Specialized for vulnerability detection, localization, classification, remediation and secure code review. Alpha is in development; these are training objectives.",
  parameterCount: null,
  modelType: "Security-specialized code model",
  intendedUse: [
    "Defensive source-code security analysis",
    "Local second security review",
  ],
  languages: sentinelPreview.languages,
  lineage: sentinelPreview.overview,
  releaseStatus:
    "Open-weight and Hugging Face release planned. No Sentinel weights are available yet.",
  license: null,
  links: [],
  technicalFacts: [
    {
      label: "Foundation",
      value: sentinelPreview.primaryFoundation,
    },
    {
      label: "Foundation selection",
      value:
        "Selected 4 November 2026 on expected capability; not yet evaluated",
    },
    {
      label: "Training data",
      value:
        "Sentinel Garden v3: 1,464 training-approved records, 1,871 training examples",
    },
    { label: "Release timing", value: sentinelPreview.releaseTiming },
  ],
  sources: [],
  inferenceSoftware: [],
  usageExample: null,
  researchContext: sentinelPreview.researchNotice,
  limitations: [sentinelPreview.researchNotice, sentinelPreview.safetyText],
  relatedResearchNoteIds: [],
  indexFacts: [
    "Training data approved · not yet trained",
    sentinelPreview.status,
    "Security-specialized code model",
    sentinelPreview.target,
  ],
  featured: false,
} as const satisfies ModelRecord;
