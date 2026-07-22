import type {
  ModelFilter,
  ModelFilterId,
  ModelRecord,
  ModelSlug,
} from "./types";
import { publicModelUrls, publicResearchUrls } from "./site";

const unstatedPublicModelLicense =
  "No model license is currently stated in the public repository. Downloadability does not by itself define reuse rights.";

const pilotLimitations = [
  "Semantically weak and factually unreliable output",
  "Outputs may be incomplete or incoherent",
  "Limited to a 512-token context window",
  "No instruction tuning or chat alignment",
  "No standardized task benchmarks have been published",
  "Not suitable for medicine, law, finance, safety or other high-stakes applications",
  "Not intended as a general production assistant",
] as const;

export const models = [
  {
    slug: "quantum-1-pilot",
    name: "quantum-1-pilot",
    status: "experimental",
    statusLabel: "Public experimental release",
    availability: "available",
    summary:
      "Public legacy and base-model experiment for compact German completion research.",
    parameterCount: {
      value: 49_295_872,
      shortLabel: "49.3M",
      label: "49,295,872 parameters",
    },
    modelType: "Experimental German completion model",
    intendedUse: ["Legacy research reference", "Local completion experiments"],
    languages: ["German"],
    lineage:
      "Baseline release in the Quantum series and predecessor to quantum-1.6-pilot. Its public manifest uses the historical model ID quantum-1-base.",
    releaseStatus:
      "Publicly available as an experimental F16 GGUF release on Hugging Face.",
    license: unstatedPublicModelLicense,
    links: [
      {
        kind: "huggingFace",
        label: "View on Hugging Face",
        url: publicModelUrls["quantum-1-pilot"] as string | null,
        pendingLabel: "Hugging Face model link pending",
      },
    ],
    technicalFacts: [
      { label: "Version", value: "1.0.0" },
      { label: "Context", value: "512 tokens" },
      {
        label: "Release format",
        value: "F16 GGUF, 98,990,560 bytes (98.99 MB; 94.40 MiB)",
      },
      { label: "Prompting", value: "Completion mode" },
    ],
    sources: [
      {
        label: "Hugging Face model card",
        url: publicResearchUrls.quantum1ModelCard,
      },
    ],
    inferenceSoftware: [
      "llama.cpp compatibility is documented by the public release",
    ],
    usageExample: null,
    researchContext:
      "This release provides the baseline for the Quantum model series and documents the first public small-scale German base-model experiment.",
    limitations: pilotLimitations,
    relatedResearchNoteIds: [],
    indexFacts: [
      "49.3M parameters",
      "Public experimental release",
      "German base-completion model",
      "German completion research",
    ],
    featured: false,
  },
  {
    slug: "quantum-1-6-pilot",
    name: "quantum-1.6-pilot",
    status: "experimental",
    statusLabel: "Public experimental release",
    availability: "available",
    summary:
      "A 49.3M-parameter experimental German completion model released after a reported continued-pretraining stage.",
    parameterCount: {
      value: 49_295_872,
      shortLabel: "49.3M",
      label: "49,295,872 parameters",
    },
    modelType: "LlamaForCausalLM-style experimental completion model",
    intendedUse: [
      "Research into documented continued-pretraining workflows",
      "Local German-language completion experiments",
    ],
    languages: ["German"],
    lineage:
      "The release card reports continued pretraining from Quantum 1 Base. The public configuration specifies weights-only initialization, a fresh optimizer, scheduler and step counter, and a frozen quantum-1 tokenizer; no final public run manifest verifies every configured detail.",
    releaseStatus:
      "Publicly available as an experimental F16 GGUF release; the public artifact is 98,990,560 bytes.",
    license: unstatedPublicModelLicense,
    links: [
      {
        kind: "huggingFace",
        label: "View on Hugging Face",
        url: publicModelUrls["quantum-1-6-pilot"] as string | null,
        pendingLabel: "Hugging Face model link pending",
      },
      {
        kind: "model-card",
        label: "Model card",
        url: publicResearchUrls.quantum16ModelCard as string | null,
        pendingLabel: "Model card link pending",
      },
    ],
    technicalFacts: [
      {
        label: "Version",
        value:
          "1.6.0, matching the public quantum-1.6-pilot-v1.6.0-f16.gguf filename and release manifest",
      },
      {
        label: "Architecture",
        value:
          "LlamaForCausalLM-style; hidden size 512; intermediate size 1,536; 12 layers; 8 attention heads; 8 KV heads; tied embeddings",
      },
      { label: "Vocabulary", value: "16,384 tokens" },
      { label: "Context", value: "512 tokens" },
      {
        label: "Tokenizer",
        value:
          "Custom frozen quantum-1 tokenizer with a 16,384-token vocabulary",
      },
      {
        label: "Training data",
        value:
          "Approximately 100M German base-training tokens plus 500M additional German tokens, as documented in the public model card.",
      },
      {
        label: "Training configuration",
        value:
          "The public configuration targets approximately 30,518 steps, derived from 500M tokens at an effective 16,384 tokens per step. A final public run log is not linked.",
      },
      {
        label: "Evaluation",
        value:
          "The Hugging Face model card reports validation loss 3.348852 and perplexity 28.4700. No versioned evaluation report or standardized downstream-task benchmarks have been published.",
      },
      {
        label: "Release",
        value: "F16 GGUF, approximately 99 MB",
      },
      {
        label: "Quantization",
        value:
          "The public release provides an F16 GGUF; no Q8 or Q4 variants are listed",
      },
      {
        label: "Hardware",
        value: "Minimum RAM requirements have not been formally measured",
      },
    ],
    sources: [
      {
        label: "Hugging Face model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Training documentation",
        url: publicResearchUrls.trainingDocumentation,
      },
      {
        label: "Generation diagnosis",
        url: publicResearchUrls.diagnosisDocumentation,
      },
    ],
    inferenceSoftware: [
      "llama.cpp compatibility is documented. Android comparison tooling exists, but no completed public Android validation report is currently linked.",
    ],
    usageExample:
      'llama-completion -m quantum-1.6-pilot-v1.6.0-f16.gguf -p "Berlin ist" -n 64 --temp 0 --top-p 1 --top-k 0',
    researchContext:
      "This release reports continued pretraining with a fixed architecture and tokenizer. Public configuration and code are available, but a final run manifest and complete training logs are not linked.",
    limitations: [
      ...pilotLimitations,
      "Third-party client compatibility has not been established by a published validation report",
    ],
    relatedResearchNoteIds: ["from-100m-to-600m-german-tokens"],
    indexFacts: [
      "49.3M parameters",
      "Public experimental release",
      "German completion model",
      "F16 GGUF · llama.cpp",
    ],
    featured: true,
  },
  {
    slug: "quantum-1-echelon",
    name: "quantum-1-echelon",
    status: "in-development",
    statusLabel: "Pipeline in development — no model release",
    availability: "not-released",
    summary:
      "The strategic next Quantum model line. A public base-architecture preflight, tokenizer validation and data-pipeline smoke test exist; the production data run and model training have not been reported as started.",
    parameterCount: {
      value: 506_333_440,
      shortLabel: "506.3M",
      label: "506,333,440 parameters in the public base-architecture preflight",
    },
    modelType:
      "Configured Llama-style causal decoder; not publicly trained or released",
    intendedUse: [
      "Research into a larger German-language base-model pipeline",
      "Validation of architecture, tokenizer and data-preparation workflows before training",
    ],
    languages: ["German-language focus; the production corpus is not complete"],
    lineage:
      "A separate Quantum model line. Public path configuration treats quantum-1-echelon-base and quantum-1-echelon-chat as stages or variants of quantum-1-echelon and forbids reuse of the pilot models, tokenizers and data.",
    releaseStatus:
      "Architecture and pipeline development are public; no trained checkpoint or model release is available.",
    license:
      "No model weights have been released. A license for any future quantum-1-echelon weights has not been documented.",
    links: [],
    technicalFacts: [
      {
        label: "Architecture preflight",
        value:
          "506,333,440 parameters; hidden size 1,280; intermediate size 3,584; 26 layers; 20 attention heads; 5 KV heads; tied embeddings",
      },
      { label: "Configured context", value: "2,048 tokens" },
      {
        label: "Tokenizer",
        value:
          "SentencePiece BPE with a 32,768-token vocabulary; 23 published validation cases report zero failures",
      },
      {
        label: "Garden smoke test",
        value:
          "5,001 documents seen; 1,559 accepted; 1,380,886 tokens produced",
      },
      {
        label: "Production status",
        value:
          "The public Garden report states that the full production data run has not started",
      },
      {
        label: "Model evaluation",
        value: "Not available because no trained model has been released",
      },
    ],
    sources: [
      {
        label: "Base-architecture preflight",
        url: publicResearchUrls.echelonArchitecturePreflight,
      },
      {
        label: "Tokenizer validation",
        url: publicResearchUrls.echelonTokenizerValidation,
      },
      {
        label: "Garden pipeline report",
        url: publicResearchUrls.echelonGardenReport,
      },
    ],
    inferenceSoftware: [],
    usageExample: null,
    researchContext: null,
    limitations: [
      "The architecture has only been preflighted; no public checkpoint exists",
      "The full production data run and model training have not been reported as started",
      "Capabilities, model-quality results, hardware requirements and release timing are not established",
      "Not available for inference or production use",
    ],
    relatedResearchNoteIds: [],
    indexFacts: [
      "506.3M-parameter base preflight",
      "Pipeline in development — no model release",
      "2,048-token configured context",
      "German-language training pipeline",
    ],
    featured: false,
  },
] as const satisfies readonly ModelRecord[];

export type Model = (typeof models)[number];

export const modelFilters = [
  { id: "all", label: "All" },
  { id: "available", label: "Public releases" },
  { id: "in-development", label: "In development" },
] as const satisfies readonly ModelFilter[];

export const modelSlugs = models.map((model) => model.slug) as ModelSlug[];

export function isModelSlug(value: string): value is ModelSlug {
  return models.some((model) => model.slug === value);
}

export function getModelBySlug(slug: string): Model | undefined {
  return models.find((model) => model.slug === slug);
}

export function getFeaturedModel(): Model {
  const featuredModel = models.find((model) => model.featured);

  if (!featuredModel) {
    throw new Error("A featured model has not been configured.");
  }

  return featuredModel;
}

export function getModelsByFilter(filter: ModelFilterId): readonly Model[] {
  switch (filter) {
    case "all":
      return models;
    case "available":
      return models.filter((model) => model.availability === "available");
    case "in-development":
      return models.filter((model) => model.status === "in-development");
  }
}
