import { securityResearch, sentinelResearchLinks } from "./security-research";
import { ghostLinks } from "./ghost";
import { replayLinks } from "./replay";
import type {
  EvidenceStatus,
  FaqEntry,
  PublicationRecord,
  PublicationSlug,
  ResourceCard,
  ResourceSource,
} from "./types";
import { falsePositiveNote } from "./false-positive-note";
import { sentinelGardenNote } from "./sentinel-garden-note";
import {
  publicModelUrls,
  publicProjectUrls,
  publicResearchUrls,
  siteConfig,
} from "./site";

export const resourceReview = {
  isoDate: "2026-11-12",
  label: "12 November 2026",
  evidenceReference: "f7eda1fb0ae153f0f9cc3477ead997cbdb462b39",
  evidenceUrl: publicResearchUrls.evidenceSnapshot,
  explanation:
    "Documentation reviewed on 12 November 2026 against Ghost v0.3.0, the current development updates, Sentinel data and training pipelines and pinned Replay sources. Pilot and Echelon results retain the historical snapshot linked below; this review does not imply new training, evaluation or a legal review of the site.",
} as const;

export const resourceCards = [
  {
    id: "publications",
    eyebrow: "Research outputs",
    title: "Publications",
    description:
      "Source-linked research notes that separate observations, negative results and open questions.",
    href: "/resources/publications",
    status: "Published",
  },
  {
    id: "reproducibility",
    eyebrow: "Artifact integrity",
    title: "Reproducibility",
    description:
      "Release checksums, GhostBench, Sentinel evaluation contracts, Replay records and model-run provenance.",
    href: "/resources/reproducibility",
    status: "Partial evidence",
  },
  {
    id: "data-and-training",
    eyebrow: "Provenance",
    title: "Data & training",
    description:
      "The Sentinel Garden data pipeline, audit and rights review alongside pilot and Echelon corpus provenance.",
    href: "/resources/data-and-training",
    status: "Partial evidence",
  },
  {
    id: "responsible-use",
    eyebrow: "Limits first",
    title: "Responsible use",
    description:
      "Project-specific access, code-review and capture safeguards, model limitations and reporting channels.",
    href: "/resources/responsible-use",
    status: "Published",
  },
  {
    id: "licensing",
    eyebrow: "Reuse boundaries",
    title: "Licensing",
    description:
      "Separate terms for Ghost, Replay, Sentinel, pilot artifacts, training data and website assets.",
    href: "/resources/licensing",
    status: "Maintainer input required",
  },
  {
    id: "status",
    eyebrow: "Current state",
    title: "Project status",
    description:
      "Model-line maturity, the reviewed evidence snapshot, open artifacts and next documentation work.",
    href: "/resources/status",
    status: "Published",
  },
  {
    id: "faq",
    eyebrow: "Orientation",
    title: "FAQ",
    description:
      "Answers about Ghost, Sentinel, Replay, local models, evidence, privacy and reuse.",
    href: "/resources/faq",
    status: "Published",
  },
] as const satisfies readonly ResourceCard[];

// Newest first: the publications index and the homepage list in this order.
export const publications = [
  sentinelGardenNote,
  falsePositiveNote,
  {
    slug: "from-100m-to-600m-german-tokens",
    title: "From 100M to 600M German Tokens",
    summary:
      "What the public quantum-1.6-pilot record supports about continued pretraining, and why more reported training did not establish reliable generation.",
    kindLabel: "Research note",
    status: "published",
    publicationDate: "2026-07-23",
    publicationDateLabel: "23 July 2026",
    lastReviewed: "2026-07-23",
    peerReviewStatus: "Not peer-reviewed",
    doi: null,
    href: "/resources/publications/from-100m-to-600m-german-tokens",
    notice:
      "This project research note is not an academic publication. It summarizes only the linked public record and does not fill gaps in training logs, raw evaluations or release provenance.",
    sources: [
      {
        label: "quantum-1-pilot model card",
        url: publicResearchUrls.quantum1ModelCard,
      },
      {
        label: "quantum-1.6-pilot model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Training documentation",
        url: publicResearchUrls.trainingDocumentation,
      },
      {
        label: "Training configuration",
        url: publicResearchUrls.trainingConfiguration,
      },
      {
        label: "Generation diagnosis",
        url: publicResearchUrls.diagnosisDocumentation,
      },
    ],
    sections: [
      {
        title: "Research question",
        paragraphs: [
          "The public experiment asks whether continued pretraining on 500 million additional German tokens can improve language-pattern consistency while preserving the 49,295,872-parameter architecture, 512-token context and frozen quantum-1 tokenizer.",
          "This note evaluates only what the linked public artifacts support. It does not reconstruct the private training run or infer missing measurements.",
        ],
      },
      {
        title: "Documented method",
        paragraphs: [
          "The public configuration describes weights-only initialization from the earlier Quantum base stage, a fresh optimizer, scheduler and step counter, and continued training on German FineWeb2-HQ material.",
          "The configured target is approximately 30,518 optimizer steps at an effective 16,384 tokens per step. No final public run manifest verifies the actual completed-step count, resolved environment or every configured detail.",
        ],
        items: [
          "Architecture and parameter count held constant",
          "512-token context held constant",
          "Custom 16,384-token tokenizer held constant",
          "500M additional German tokens reported by the release card",
        ],
      },
      {
        title: "Publicly reported observation",
        paragraphs: [
          "The quantum-1.6-pilot Hugging Face card reports validation loss 3.348852 and perplexity 28.4700 and publishes an F16 GGUF artifact with a manifest and SHA-256 checksum.",
          "These next-token metrics do not measure factual accuracy, instruction following, downstream-task performance or production readiness.",
        ],
      },
      {
        title: "Negative result",
        paragraphs: [
          "The public diagnosis and model cards continue to describe factual unreliability, repetition, incomplete text and incoherent continuations. The available evidence therefore does not show that the additional reported training established reliable generation.",
          "This is a result about this small experimental setup. It is not a general conclusion that continued pretraining is ineffective or that compact models cannot be useful.",
        ],
      },
      {
        title: "Evidence boundary",
        paragraphs: [
          "No versioned raw generation record, standardized downstream benchmark, complete training log, final data manifest or independently replayable metric report is public.",
          "The strongest supported conclusion is that the documented workflow produced a public continued-pretraining artifact with reported held-out metrics while important generation limitations remained.",
        ],
      },
    ],
  },
] as const satisfies readonly PublicationRecord[];

export function getPublicationBySlug(
  slug: PublicationSlug,
): PublicationRecord | undefined {
  return publications.find((publication) => publication.slug === slug);
}

export const reproducibilityContent = {
  introduction: {
    eyebrow: "Reproducibility",
    title: "Reproducibility across models and tools",
    description:
      "Verify released artifacts, repeat software checks and inspect evaluation contracts across Ghost, Sentinel, Replay and Quantum. Complete pilot training records and trained Echelon or Sentinel releases remain unavailable.",
  },
  releases: [
    {
      model: "quantum-1-pilot",
      file: "quantum-1-base-v1.0.0-f16.gguf",
      bytes: "98,990,560 bytes",
      sha256:
        "aeab97e50a5789772b69cf1554ba74eb915b5621835d80d40785b473b62fd1a5",
      modelUrl: publicModelUrls["quantum-1-pilot"],
      checksumUrl: publicResearchUrls.quantum1Checksum,
      manifestUrl: publicResearchUrls.quantum1Manifest,
    },
    {
      model: "quantum-1.6-pilot",
      file: "quantum-1.6-pilot-v1.6.0-f16.gguf",
      bytes: "98,990,560 bytes",
      sha256:
        "6bda15fcd51286e55174d5876fe44aa9518fb18b75fb5aa4f7402ebd039bd994",
      modelUrl: publicModelUrls["quantum-1-6-pilot"],
      checksumUrl: publicResearchUrls.quantum16Checksum,
      manifestUrl: publicResearchUrls.quantum16Manifest,
    },
  ],
  referenceCommand:
    'llama-cli -m quantum-1.6-pilot-v1.6.0-f16.gguf -p "Berlin ist" -n 64 --seed 20260705 --temp 0 --top-p 1 --top-k 0 --no-cnv',
  commandQualification:
    "This command mirrors the pinned pilot diagnosis configuration and uses completion mode. The current GGUF export guide documents an explicit external llama.cpp checkout and revision, correcting the historical Git-link setup gap. That correction does not reconstruct missing pilot run records. Website tests do not execute model inference.",
  verificationSteps: [
    "Download the GGUF from the pinned Hugging Face repository revision.",
    "Compare the downloaded file against the published SHA-256 value.",
    "Use completion mode rather than assuming a chat template.",
    "Record the llama.cpp revision, hardware and full command before comparing output.",
    "Preserve raw output alongside the prompt, seed and decoding settings.",
  ],
  matrix: [
    {
      area: "Ghost release and GhostBench",
      status: "Published",
      available:
        "Versioned release, checksums, policy documentation and the 25-scenario release gate.",
      missing:
        "Coverage outside the tested runtime and named assertions is not established.",
    },
    {
      area: "Sentinel evaluation and data pipeline",
      status: "Partial evidence",
      available:
        "Public synthetic cases, a strict parser/scorer, a revision-pinned comparison protocol and a reproducible, audited Garden dataset with hash verification.",
      missing:
        "No training-approved record, model evaluation, trained adapter, private holdout or measured model-patch result.",
    },
    {
      area: "Replay execution records",
      status: "Published",
      available:
        "Source contracts for capture verification, staged restore, live rerun and diffs.",
      missing:
        "Identical external-service output is not guaranteed by a restored capture.",
    },
    {
      area: "Pilot GGUF integrity",
      status: "Published",
      available: "Pinned files, manifests, sizes and SHA-256 checksums.",
      missing:
        "Pilot artifacts are all rights reserved; no reuse license is granted.",
    },
    {
      area: "Pilot training method",
      status: "Partial evidence",
      available: "Code, documentation and YAML configurations.",
      missing:
        "Final run manifests, exact environments, completed-step records and complete logs.",
    },
    {
      area: "Pilot evaluation",
      status: "Partial evidence",
      available:
        "Reported held-out metrics, fixed prompt data and a diagnosis method.",
      missing:
        "Versioned raw outputs, independently replayable metrics and standardized task reports.",
    },
    {
      area: "Echelon tokenizer",
      status: "Published",
      available:
        "Configuration, checksums, quality summary and 23-case round-trip report.",
      missing: "No model-quality conclusion follows from tokenizer validation.",
    },
    {
      area: "Echelon production and training",
      status: "Not yet available",
      available: "Production configuration and pipeline smoke evidence.",
      missing:
        "Production manifest, checkpoints, weights, outputs and evaluation.",
    },
    {
      area: "Resource measurements",
      status: "Not measured",
      available: "No committed measurement report.",
      missing:
        "Hardware, runtime, memory, throughput, cost and energy measurements.",
    },
  ] satisfies readonly {
    area: string;
    status: EvidenceStatus;
    available: string;
    missing: string;
  }[],
  sources: [
    {
      label: "GGUF setup and external revision",
      url: publicResearchUrls.ggufSetup,
    },
    { label: "GhostBench methodology", url: ghostLinks.benchmarks },
    { label: "Comparison protocol", url: sentinelResearchLinks.bakeoff },
    { label: "Replay documentation", url: replayLinks.readme },
    {
      label: "Pinned implementation snapshot",
      url: publicResearchUrls.evidenceSnapshot,
    },
    {
      label: "Training-run template",
      url: publicProjectUrls.trainingRunTemplate,
    },
    {
      label: "Data and training record",
      url: publicProjectUrls.dataAndTrainingRecord,
    },
  ] satisfies readonly ResourceSource[],
} as const;

export const dataAndTrainingContent = {
  introduction: {
    eyebrow: "Data & training",
    title: "Data and training methods",
    description:
      "How the Sentinel Garden pipeline turns real security advisories into checked training records, what its audit removed, why no record is approved yet and how the QLoRA training pipeline is gated, followed by the data provenance and training evidence for the Quantum pilots and Echelon.",
  },
  dataset: {
    name: "epfml/FineWeb2-HQ",
    subset: "deu_Latn",
    origin:
      "The pilot and Echelon language-model workflows reference the German deu_Latn subset of web-derived FineWeb2-HQ. Sentinel has a separate source-code registry and approval process.",
    terms:
      "The dataset card identifies ODC-By 1.0 and Common Crawl terms. Those terms do not automatically clear rights in every source document or license model weights, code, tokenizers or visual assets.",
    url: publicProjectUrls.fineWebDataset,
  },
  stages: [
    {
      name: "quantum-1-pilot",
      status: "Partial evidence",
      sourceRevision: "Configured as mutable `main`",
      target:
        "100M training, 1M validation and 1M test tokens at 512-token context.",
      observed:
        "The model card reports approximately 100M training tokens; no final data manifest is public.",
    },
    {
      name: "quantum-1.6-pilot",
      status: "Partial evidence",
      sourceRevision: "Configured as mutable `main`",
      target:
        "500M new training, 2M validation and 2M test tokens at 512-token context.",
      observed:
        "The release card reports 500M additional tokens; final document counts, split hashes and overlap statistics are not public.",
    },
    {
      name: "quantum-1-echelon",
      status: "Partial evidence",
      sourceRevision: "c0c06e94fd3a44ae9e802b2b0fc533817601eb5e",
      target:
        "Historical configuration: 8B training, 10M validation and 10M test tokens at 2,048-token context. The newer 1B plan targets 40B Base pretraining tokens and 4,096-token context.",
      observed:
        "A smoke run saw 5,001 documents, accepted 1,559 and produced 1,380,886 packed tokens. The production run had not started.",
    },
  ] satisfies readonly {
    name: string;
    status: EvidenceStatus;
    sourceRevision: string;
    target: string;
    observed: string;
  }[],
  controls: [
    "Language, script, length, quality, URL, digit and symbol filtering",
    "Deterministic split assignment and configured seeds",
    "Exact-document controls and reliance on upstream MinHash deduplication in the Echelon pipeline",
    "Packed token storage with checkpoint and resume handling",
  ],
  limitations: [
    "Exact fingerprints do not remove every near-duplicate or semantically overlapping document.",
    "Public web data may retain personal, harmful, copyrighted or otherwise sensitive material.",
    "The pilot configurations do not resolve their mutable dataset revision in a final manifest.",
    "No public record links final accepted documents and split hashes to either pilot GGUF.",
    "No production Echelon dataset or completed Echelon training run is public.",
  ],
  contact:
    "Questions about provenance, privacy, rights or removal should be sent to the public project email with the affected source and enough information to identify it.",
  sources: [
    {
      label: "FineWeb2-HQ dataset card",
      url: publicProjectUrls.fineWebDataset,
    },
    {
      label: "ODC-By 1.0",
      url: publicProjectUrls.odcByLicense,
    },
    {
      label: "Common Crawl terms",
      url: publicProjectUrls.commonCrawlTerms,
    },
    {
      label: "Public data and training record",
      url: publicProjectUrls.dataAndTrainingRecord,
    },
    {
      label: "Garden Phase 3 report",
      url: publicResearchUrls.echelonGardenReport,
    },
  ] satisfies readonly ResourceSource[],
} as const;

export const responsibleUseContent = {
  introduction: {
    eyebrow: "Responsible use",
    title: "Responsible use of models and tools",
    description:
      "Practical use boundaries for Ghost, Sentinel, Replay and the Quantum model experiments. Review project-specific controls alongside model limitations, artifact handling and private reporting routes.",
  },
  excludedUses: [
    "Medical, legal, financial or safety-critical decisions",
    "Automated decisions about people, eligibility, employment or access",
    "Unsupervised factual publication or authoritative advice",
    "Security-sensitive automation or operation of critical infrastructure",
    "Any use that assumes instruction following, chat alignment or factual reliability",
  ],
  knownBehaviors: [
    {
      title: "Factual inconsistency",
      text: "Completions may be grammatically structured while making incorrect claims.",
    },
    {
      title: "Repetition",
      text: "The pilots may repeat tokens, phrases or structures instead of developing a coherent continuation.",
    },
    {
      title: "Incomplete or incoherent text",
      text: "Outputs may stop abruptly, drift from the prompt or lose semantic continuity.",
    },
    {
      title: "No instruction or chat alignment",
      text: "The pilots are base-completion artifacts. No chat template, refusal behavior or instruction-following capability is promised.",
    },
  ],
  unmeasuredRisks: [
    "Bias across demographic, cultural or political groups",
    "Toxic, harmful or illegal-content generation",
    "Memorisation and reproduction of source material",
    "Personal-data leakage",
    "Prompt-injection or adversarial robustness",
    "Misuse potential and model-specific security behavior",
  ],
  artifactSafety: [
    "Verify repository revision, filename, byte size and checksum before use.",
    "Treat model files, datasets, scripts and conversion tools as untrusted inputs.",
    "Keep remote-code execution disabled unless the exact code has been reviewed.",
    "Run unfamiliar training or inference workloads without host secrets and with limited privileges.",
    "Do not publish raw outputs as facts without independent verification.",
  ],
  reporting: [
    {
      label: "Website documentation and links",
      detail:
        "Use a public GitHub issue when the report contains no private data or security-sensitive details.",
      url: `${publicProjectUrls.websiteRepository}/issues`,
    },
    {
      label: "Website security",
      detail:
        "Follow the private vulnerability-reporting process. Do not publish secrets or exploit details in a public issue.",
      url: publicProjectUrls.security,
    },
    {
      label: "Privacy, rights or sensitive material",
      detail:
        "Email the project directly and include only the information necessary to identify the concern.",
      url: `mailto:${siteConfig.businessEmail}`,
    },
  ],
} as const;

export const licensingContent = {
  introduction: {
    eyebrow: "Licensing",
    title: "Licensing and reuse",
    description:
      "Licenses are recorded separately for website code, Ghost, Replay, Sentinel, model artifacts and data. Public access does not grant reuse rights, and a source-code license does not automatically cover weights, datasets or brand assets.",
  },
  items: [
    {
      material: "Ghost source and original documentation",
      status: "Published",
      terms: "Apache License 2.0 in the Ghost repository",
      boundary:
        "Separate from the website grant; preserve applicable notices and dependency terms.",
      url: ghostLinks.license,
    },
    {
      material: "Replay source and original documentation",
      status: "Published",
      terms: "Apache License 2.0 in the Replay repository",
      boundary:
        "Captured files and outputs retain their own rights and confidentiality requirements.",
      url: replayLinks.license,
    },
    {
      material: "Sentinel source and synthetic evaluation cases",
      status: "Maintainer input required",
      terms: "No project license recorded in the reviewed source",
      boundary:
        "Public visibility is not a reuse grant. Upstream candidate-model licenses do not license Sentinel-authored material.",
      url: sentinelResearchLinks.status,
    },
    {
      material: "Future Sentinel weights and adapters",
      status: "Not yet available",
      terms: "No trained release or artifact license",
      boundary:
        "Future publication requires explicit artifact terms and a review of upstream model and data obligations.",
      url: sentinelResearchLinks.status,
    },
    {
      material: "Website source and original documentation",
      status: "Published",
      terms: "Apache License 2.0",
      boundary:
        "Applies to original website code and documentation unless a file states otherwise.",
      url: `${publicProjectUrls.websiteRepository}/blob/main/LICENSE`,
    },
    {
      material: "Brand marks and model-card images",
      status: "Maintainer input required",
      terms: "No separate public reuse grant",
      boundary:
        "Creator, provenance, permission and trademark treatment remain to be recorded.",
      url: publicProjectUrls.licensingRecord,
    },
    {
      material: "quantum-1-pilot weights, GGUF artifacts and tokenizer",
      status: "Published",
      terms: "All rights reserved; no public reuse license",
      boundary:
        "Redistribution, modification and commercial use are not granted. Do not describe the artifact as open weight.",
      url: publicResearchUrls.modelLicenseRegistry,
    },
    {
      material: "quantum-1.6-pilot weights, GGUF artifacts and tokenizer",
      status: "Published",
      terms: "All rights reserved; no public reuse license",
      boundary:
        "Redistribution, modification and commercial use are not granted. Do not describe the artifact as open weight.",
      url: publicResearchUrls.modelLicenseRegistry,
    },
    {
      material: "Future Echelon artifacts",
      status: "Not yet available",
      terms: "No model release and no artifact license",
      boundary:
        "Any future weights and tokenizer require explicit terms at release time.",
      url: publicResearchUrls.echelonDirectory,
    },
    {
      material: "FineWeb2-HQ database",
      status: "Published",
      terms: "ODC-By 1.0 and Common Crawl terms identified",
      boundary:
        "Database terms do not clear every right in source pages or license resulting model artifacts.",
      url: publicProjectUrls.fineWebDataset,
    },
    {
      material: "lumen-quantum source repository",
      status: "Published",
      terms:
        "Apache License 2.0 for source code, configurations, tests and original documentation",
      boundary:
        "The source license does not cover model weights, GGUF artifacts or trained tokenizer binaries; it is separate from the website repository.",
      url: publicResearchUrls.sourceLicense,
    },
  ] satisfies readonly {
    material: string;
    status: EvidenceStatus;
    terms: string;
    boundary: string;
    url: string;
  }[],
  source: {
    label: "Full licensing and provenance record",
    url: publicProjectUrls.licensingRecord,
  },
} as const;

export const statusContent = {
  introduction: {
    eyebrow: "Project status",
    title: "Project and documentation status",
    description:
      "The public state of models and tools, the evidence behind it and the next publication and evaluation steps.",
  },
  models: [
    {
      name: "quantum-sentinel-alpha",
      status: "Partial evidence",
      state: securityResearch.projects[1].evidence,
      boundary: securityResearch.projects[1].boundary,
      href: "/models/quantum-sentinel-alpha",
    },
    {
      name: "rappidAI Ghost v0.3.0",
      status: "Published",
      state: securityResearch.projects[0].evidence,
      boundary: securityResearch.projects[0].boundary,
      href: "/tools/ghost",
    },
    {
      name: "quantum-1-pilot",
      status: "Published",
      state: "Public 49.3M-parameter experimental F16 GGUF release.",
      boundary:
        "No standardized benchmark or final run manifest. Pilot weights, GGUF artifacts and tokenizers are all rights reserved; no public reuse license is granted.",
      href: "/models/quantum-1-pilot",
    },
    {
      name: "quantum-1.6-pilot",
      status: "Published",
      state:
        "Public 49.3M-parameter F16 GGUF release with reported continued pretraining and held-out metrics.",
      boundary:
        "No raw evaluation record or complete run log. Pilot weights, GGUF artifacts and tokenizers are all rights reserved; no public reuse license is granted.",
      href: "/models/quantum-1-6-pilot",
    },
    {
      name: "quantum-1-echelon",
      status: "Partial evidence",
      state:
        "Architecture preflight, tokenizer validation and Garden pipeline smoke evidence.",
      boundary:
        "No production dataset, trained model, checkpoint, output or benchmark.",
      href: "/models/quantum-1-echelon",
    },
  ] satisfies readonly {
    name: string;
    status: EvidenceStatus;
    state: string;
    boundary: string;
    href: string;
  }[],
  openItems: [
    {
      status: "Not published",
      title: "Pilot final run manifests",
      text: "Immutable records linking data, code, tokenizer, completed steps, checkpoints, evaluation and release files.",
    },
    {
      status: "Not published",
      title: "Raw evaluation artifacts",
      text: "Versioned prompts, outputs, decoding settings, metric commands and failure labels.",
    },
    {
      status: "Not measured",
      title: "Resource measurements",
      text: "Inference memory and throughput plus training hardware, runtime, cost and energy use.",
    },
    {
      status: "Maintainer input required",
      title: "Visual-asset provenance",
      text: "Creator, source, permission, transformation and trademark records for project images and brand marks.",
    },
    {
      status: "Not yet available",
      title: "Echelon production and model artifacts",
      text: "Final corpus manifest, training logs, checkpoints, weights, outputs and evaluation.",
    },
  ] satisfies readonly {
    status: EvidenceStatus;
    title: string;
    text: string;
  }[],
  roadmap: [
    "Complete the Sentinel rights review, starting with the registry sources and the tier A repositories, before any training run.",
    "Run the Sentinel foundation baseline on approved GPU time and establish a separate private holdout before claiming detection quality.",

    "Maintain the published all-rights-reserved pilot-artifact decision; attach an explicit reuse license only if the policy changes.",
    "Attach raw, versioned pilot evaluation artifacts before making broader capability claims.",
    "Complete the Echelon production-data workflow before any dataset-total claim.",
    "Measure local inference requirements and performance using a documented environment.",
    "Keep every website claim tied to an immutable artifact or an explicit missing-evidence label.",
  ],
  sources: [
    { label: "Repository status", url: sentinelResearchLinks.status },
    { label: "Release", url: ghostLinks.release },
    { label: "Echelon compute plan", url: publicResearchUrls.computePlan },
    {
      label: "Repository roadmap",
      url: publicProjectUrls.roadmap,
    },
    {
      label: "Pinned evidence snapshot",
      url: publicResearchUrls.evidenceSnapshot,
    },
  ] satisfies readonly ResourceSource[],
} as const;

export const faqEntries = [
  {
    question: "What can be used today?",
    answer:
      "Ghost v0.3.0 is a released experimental runtime. Replay publishes execution-recording and restore tooling. The two Quantum pilots have public GGUF files with restricted reuse rights. Sentinel and Echelon have no trained public release; their repositories document infrastructure and planned work.",
  },
  {
    question: "Has Sentinel-Alpha been trained or benchmarked?",
    answer:
      "No. Qwen3.5-9B is selected as the foundation, and the Sentinel Garden dataset and a QLoRA training pipeline are built, but no model has been trained or evaluated. No training source or repository is approved yet, so the training export is empty, and no adapter exists.",
  },
  {
    question: "Does a successful GhostBench run prove an agent is safe?",
    answer:
      "No. It verifies named assertions in the tested environment. Prompt signals, decoy access and containment have specific limits. Review the Ghost threat model and keep host permissions, workspace secrets and network policy within scope.",
  },
  {
    question: "Does Replay guarantee identical model outputs?",
    answer:
      "No. Replay supports recorded playback, capture verification, restore and live reruns. External models and services can change, so a new execution may differ even when recorded local state is restored.",
  },
  {
    question: "Are the public Quantum pilots chat models?",
    answer:
      "No. quantum-1-pilot and quantum-1.6-pilot are experimental base-completion models. They are not instruction-tuned assistants and no chat template or conversational alignment is promised.",
  },
  {
    question: "What is GGUF?",
    answer:
      "GGUF is a model-file format commonly used by llama.cpp-compatible local inference tools. A GGUF file makes local experimentation possible, but does not establish quality, safety, compatibility or reuse rights.",
  },
  {
    question: "Can the pilots run locally?",
    answer:
      "Public F16 GGUF files and a llama.cpp reference command are available. Minimum RAM, throughput and client compatibility have not been formally measured by the project.",
  },
  {
    question: "Are Echelon Base and Echelon Chat separate model families?",
    answer:
      "No. They are planned stages or variants within the quantum-1-echelon model line. No trained Echelon model is currently public.",
  },
  {
    question: "Why are there no standardized benchmark scores?",
    answer:
      "No versioned downstream-task benchmark report is published for the Quantum models. GhostBench reports named software assertions; Sentinel's regex baseline validates its harness. Neither is evidence of a trained model's detection quality.",
  },
  {
    question: "What do the evidence labels mean?",
    answer:
      "Published means a public artifact directly supports the statement. Partial evidence means a configuration, preflight or smoke artifact exists without proving full completion. The remaining labels identify absent, unmeasured, incomplete or maintainer-dependent information.",
  },
  {
    question: "Does local inference guarantee privacy?",
    answer:
      "No. Local execution may keep prompts on a device, but privacy depends on the application, logs, operating system, model source and surrounding infrastructure.",
  },
  {
    question: "Are the model weights open source?",
    answer:
      "No. The maintainer's published registry keeps the pilot weights, GGUF artifacts and tokenizers all rights reserved. No public reuse license is granted, and redistribution, modification and commercial use are not granted. Downloadability does not make the artifacts open source, open weight or freely reusable.",
  },
  {
    question: "Is the research peer-reviewed?",
    answer:
      "No academic peer-review or DOI is claimed. Publications on this website are project research notes linked to public artifacts and explicit evidence boundaries.",
  },
  {
    question: "How can I report a problem?",
    answer:
      "Use a public GitHub issue for non-sensitive documentation or behavior reports, the private security process for vulnerabilities, and email for privacy, rights or sensitive-material concerns.",
  },
] as const satisfies readonly FaqEntry[];

export const resourceUtilityLinks = [
  {
    label: "Citation metadata",
    detail: "CITATION.cff for the website repository",
    url: publicProjectUrls.citation,
  },
  {
    label: "Contributing",
    detail: "Contribution scope and evidence requirements",
    url: publicProjectUrls.contributing,
  },
  {
    label: "Security",
    detail: "Private vulnerability-reporting guidance",
    url: publicProjectUrls.security,
  },
] as const;
