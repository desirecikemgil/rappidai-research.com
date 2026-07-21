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
  "Repetition, number loops and boilerplate loops may occur",
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
    lineage: "Quantum 1 base model and predecessor to quantum-1.6-pilot.",
    releaseStatus: "Publicly available as an experimental F16 GGUF release on Hugging Face.",
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
      { label: "Release format", value: "F16 GGUF, approximately 98.99 MB" },
      { label: "Prompting", value: "Completion mode" },
    ],
    sources: [
      {
        label: "Hugging Face model card",
        url: publicResearchUrls.quantum1ModelCard,
      },
    ],
    inferenceSoftware: [],
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
      "A 49.3M-parameter experimental German completion model built to validate continued pretraining, GGUF export and local inference end to end.",
    parameterCount: {
      value: 49_295_872,
      shortLabel: "49.3M",
      label: "49,295,872 parameters",
    },
    modelType: "LlamaForCausalLM-style experimental completion model",
    intendedUse: [
      "Research into reproducible continued-pretraining pipelines",
      "Local German-language completion experiments",
    ],
    languages: ["German"],
    lineage:
      "Weights-only continued pretraining of Quantum 1 Base with a fresh optimizer, scheduler and step counter; the final quantum-1 tokenizer remained frozen.",
    releaseStatus:
      "Publicly available as an experimental F16 GGUF release; Hugging Face currently lists the model file at approximately 99 MB.",
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
        url: `${publicModelUrls["quantum-1-6-pilot"]}/blob/main/README.md` as string | null,
        pendingLabel: "Model card link pending",
      },
    ],
    technicalFacts: [
      {
        label: "Version",
        value: "1.6.0, matching the public quantum-1.6-pilot-v1.6.0-f16.gguf filename and release manifest",
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
        value: "Custom frozen quantum-1 tokenizer with a 16,384-token vocabulary",
      },
      {
        label: "Training data",
        value:
          "Approximately 100M German base-training tokens plus 500M additional German tokens, as documented in the public model card.",
      },
      {
        label: "Training configuration",
        value:
          "The public project documentation describes a target of approximately 30,518 steps, derived from 500M tokens at an effective 16,384 tokens per step.",
      },
      {
        label: "Evaluation",
        value:
          "Validation loss 3.348852 and perplexity 28.4700. No standardized downstream-task benchmarks have been published.",
      },
      {
        label: "Release",
        value: "F16 GGUF, approximately 99 MB",
      },
      {
        label: "Quantization",
        value: "The public release provides an F16 GGUF; no Q8 or Q4 variants are listed",
      },
      {
        label: "Hardware",
        value: "Minimum RAM requirements have not been formally measured",
      },
    ],
    sources: [
      {
        label: "Hugging Face model card",
        url: publicModelUrls["quantum-1-6-pilot"],
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
      "This release investigates continued pretraining while keeping the architecture and tokenizer fixed, allowing the additional training phase to be examined separately.",
    limitations: [
      ...pilotLimitations,
      "Third-party client compatibility is not guaranteed; a previous PocketPal incompatibility was observed",
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
    statusLabel: "Research direction — no public model release",
    availability: "not-released",
    summary:
      "An announced research direction for adapting stronger open-weight foundations to focused German-language use. Architecture, parameter count, training data and release timing have not been finalized publicly.",
    parameterCount: null,
    modelType: "Open-weight model adaptation research",
    intendedUse: [
      "Research into efficient German-language open-weight adaptation",
    ],
    languages: ["German-language focus"],
    lineage:
      "Next research phase focused on adapting stronger open-weight foundations.",
    releaseStatus: "Research direction; no public model release is available.",
    license: null,
    links: [],
    technicalFacts: [],
    sources: [],
    inferenceSoftware: [],
    usageExample: null,
    researchContext: null,
    limitations: [
      "Specifications, capabilities and limitations are not yet established",
      "Not available for production use",
    ],
    relatedResearchNoteIds: [],
    indexFacts: [
      "Parameter size not yet defined",
      "Research direction — no public model release",
      "Open-weight model adaptation research",
      "Focused German-language adaptation",
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
