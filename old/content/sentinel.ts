import type { ModelRecord } from "./types";

// Public development plan, supplied by the maintainer on 7 October 2026.
// Capabilities and release artifacts are objectives, not measured results.
export const sentinelPreview = {
  name: "Quantum Sentinel-Alpha",
  line: "Quantum Sentinel 1",
  status: "Alpha · In Development",
  target: "Target: October 2026",
  primaryFoundation: "Qwen3.5-9B",
  foundations: ["Qwen3.5-9B", "Qwen3.5-4B"],
  languages: ["Python", "JavaScript / TypeScript", "Go"],
  description: "Specialized AI for secure software.",
  summary:
    "A specialized AI model being trained to find, understand and fix vulnerabilities in source code.",
  explore: "Explore Quantum Sentinel-Alpha",
  roadmapLink: "View roadmap",
  targetNotice:
    "An Alpha development target, not a guaranteed release date. Quantum Sentinel 1.0 follows later.",
  positioning: ["Cybersecurity-focused", "Local-first", "Open weights planned"],
  overview:
    "Quantum Sentinel-Alpha is the first substantial security fine-tuning milestone of the Quantum Sentinel 1 model line. It is designed as a specialized second security reviewer for developers, open-source maintainers, small engineering teams, security researchers and coding-agent builders.",
  capabilitiesTitle: "From a potential risk to a reasoned finding.",
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
  architectureTitle: "A specialized model. A verifiable system.",
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
  foundationTitle: "A candidate, before a freeze.",
  foundationText:
    "Quantum Sentinel-Alpha is currently being developed with Qwen3.5-9B as the primary foundation candidate. Final foundation selection follows an internal security bake-off between Qwen3.5-9B and Qwen3.5-4B. The foundation is not frozen.",
  trainingTitle: "Security post-training, focused on evidence.",
  trainingText:
    "The plan builds on an existing open-weight foundation rather than pretraining from scratch. QLoRA / LoRA supervised fine-tuning is the core, using curated vulnerability examples, fixed/vulnerable code pairs, hard negatives, patch tasks, localization, CWE classification, evidence and false-positive rejection. Preference training or domain adaptation will be added only if evaluations show measurable value.",
  languageNotice:
    "First-generation language focus: Python, JavaScript / TypeScript and Go. Other languages may follow through additional data and evaluation.",
  localTitle: "Your code. Local analysis.",
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
    "The primary candidate is in the approximately 9B class. Quantization is intended to make consumer-hardware inference possible. RAM and VRAM requirements will be published after measurement of the final variants.",
  roadmapTitle: "Alpha first. A stable release later.",
  roadmapText:
    "Alpha is the first real security-SFT milestone, before Beta, Release Candidate and the later stable Quantum Sentinel 1.0. The early Lean plan aims for an initial Alpha fine-tune; the sequence below is a development plan, not a record of completed phases.",
  phases: [
    "Foundation",
    "Baseline",
    "Dataset / Garden",
    "Calibration",
    "SFT Alpha",
    "Data Iteration + Beta",
    "Optional Hardening",
    "Release Candidate",
    "Quantum Sentinel 1.0",
  ],
  researchNotice:
    "Alpha is in development. Capabilities, architecture and release artifacts described here are planned and may change with evaluation. No benchmark results or validated hardware requirements are announced.",
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
      label: "Primary foundation candidate",
      value: sentinelPreview.primaryFoundation,
    },
    {
      label: "Foundation selection",
      value: "Internal Qwen3.5-4B / 9B security bake-off pending",
    },
    { label: "Alpha target", value: "October 2026 · Development target" },
  ],
  sources: [],
  inferenceSoftware: [],
  usageExample: null,
  researchContext: sentinelPreview.researchNotice,
  limitations: [sentinelPreview.researchNotice, sentinelPreview.safetyText],
  relatedResearchNoteIds: [],
  indexFacts: [
    "Foundation selection pending",
    sentinelPreview.status,
    "Security-specialized code model",
    sentinelPreview.target,
  ],
  featured: false,
} as const satisfies ModelRecord;
