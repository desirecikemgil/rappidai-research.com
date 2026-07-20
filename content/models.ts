import type {
  ModelFilter,
  ModelFilterId,
  ModelRecord,
  ModelSlug,
} from "./types";

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
    statusLabel: "Experimental",
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
    license: null,
    links: [
      {
        kind: "huggingFace",
        label: "View on Hugging Face",
        url: "https://huggingface.co/rappidAI/quantum-1-pilot" as string | null,
        pendingLabel: "Hugging Face model link pending",
      },
    ],
    technicalFacts: [
      { label: "Version", value: "1.0.0" },
      { label: "Context", value: "512 tokens" },
      { label: "Release format", value: "F16 GGUF, approximately 98.99 MB" },
      { label: "Prompting", value: "Completion mode" },
    ],
    inferenceSoftware: [],
    usageExample: null,
    limitations: pilotLimitations,
    relatedResearchNoteIds: [
      "from-100m-to-600m-german-tokens",
      "from-pretraining-to-focused-adaptation",
    ],
    indexFacts: [
      "49.3M parameters",
      "Experimental",
      "Public legacy model",
      "German completion research",
    ],
    featured: false,
  },
  {
    slug: "quantum-1-6-pilot",
    name: "quantum-1.6-pilot",
    status: "experimental",
    statusLabel: "Experimental",
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
      "Publicly available as an experimental F16 GGUF release of approximately 95 MB.",
    license: null,
    links: [
      {
        kind: "huggingFace",
        label: "View on Hugging Face",
        url: "https://huggingface.co/rappidAI/quantum-1.6-pilot" as string | null,
        pendingLabel: "Hugging Face model link pending",
      },
      {
        kind: "model-card",
        label: "Model card",
        url: "https://huggingface.co/rappidAI/quantum-1.6-pilot/blob/main/README.md" as string | null,
        pendingLabel: "Model card link pending",
      },
    ],
    technicalFacts: [
      {
        label: "Version",
        value: "1.6.0, derived from the confirmed quantum-1.6-pilot-v1.6.0-f16.gguf export name",
      },
      {
        label: "Release window",
        value: "July 2026; the exact first-publication date remains to be confirmed from the Hugging Face history",
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
          "Approximately 100M German base tokens plus exactly 500M additional German training tokens, with 2M validation and 2M test tokens from a FineWeb2-HQ deu_Latn pipeline",
      },
      {
        label: "Dataset split",
        value:
          "1,400,890 training documents, 14,191 validation documents and 14,504 test documents after overlap filtering",
      },
      { label: "Training steps", value: "30,518" },
      {
        label: "Evaluation",
        value:
          "Validation loss 3.348852; perplexity 28.4700. No reliable public task benchmarks are available.",
      },
      {
        label: "Release",
        value: "F16 GGUF, approximately 95 MB",
      },
      {
        label: "Quantization",
        value: "F16 GGUF confirmed; no public Q8 or Q4 variants are confirmed",
      },
      {
        label: "Hardware",
        value: "Minimum RAM requirements have not been formally measured",
      },
    ],
    inferenceSoftware: [
      "llama.cpp (directly confirmed)",
      "Native Android app using local llama.cpp inference (technically confirmed)",
    ],
    usageExample:
      'llama-completion -m quantum-1.6-pilot-v1.6.0-f16.gguf -p "Berlin ist" -n 64 --temp 0 --top-p 1 --top-k 0',
    limitations: [
      ...pilotLimitations,
      "Third-party client compatibility is not guaranteed; a previous PocketPal incompatibility was observed",
    ],
    relatedResearchNoteIds: [
      "from-100m-to-600m-german-tokens",
      "why-local-inference-changes-the-design-target",
      "evaluating-small-models-without-misleading-benchmarks",
    ],
    indexFacts: [
      "49.3M parameters",
      "Experimental",
      "German completion model",
      "F16 GGUF · llama.cpp",
    ],
    featured: true,
  },
  {
    slug: "quantum-1-echelon",
    name: "quantum-1-echelon",
    status: "in-development",
    statusLabel: "In development",
    availability: "not-released",
    summary:
      "Next research phase focused on adapting stronger open-weight foundations for efficient German-language use.",
    parameterCount: null,
    modelType: "Open-weight model adaptation research",
    intendedUse: [
      "Research into efficient German-language open-weight adaptation",
    ],
    languages: ["German-language focus"],
    lineage:
      "Next research phase focused on adapting stronger open-weight foundations.",
    releaseStatus: "In development; not presented as a completed model.",
    license: null,
    links: [],
    technicalFacts: [],
    inferenceSoftware: [],
    usageExample: null,
    limitations: [
      "Specifications, capabilities and limitations are not yet established",
      "Not available for production use",
    ],
    relatedResearchNoteIds: [
      "from-pretraining-to-focused-adaptation",
      "why-local-inference-changes-the-design-target",
    ],
    indexFacts: [
      "In development",
      "Focused on open-weight model adaptation",
      "Final parameter size not yet defined",
    ],
    featured: false,
  },
] as const satisfies readonly ModelRecord[];

export type Model = (typeof models)[number];

export const modelFilters = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "experimental", label: "Experimental" },
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
    case "experimental":
      return models.filter((model) => model.status === "experimental");
    case "in-development":
      return models.filter((model) => model.status === "in-development");
  }
}
