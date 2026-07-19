import type {
  ModelFilter,
  ModelFilterId,
  ModelRecord,
  ModelSlug,
} from "./types";

const pilotLimitations = [
  "Limited scale",
  "Unreliable factual output",
  "Possible repetition",
  "Inconsistent response quality",
  "Not suitable for high-stakes decisions",
  "Not intended as a production assistant",
] as const;

export const models = [
  {
    slug: "quantum-1-pilot",
    name: "quantum-1-pilot",
    status: "experimental",
    statusLabel: "Experimental",
    availability: "unconfirmed",
    summary: "Initial small-scale language-model experiment.",
    parameterCount: {
      value: 50_000_000,
      shortLabel: "50M",
      label: "50M parameters",
    },
    modelType: "Independently pretrained compact language model",
    intendedUse: ["Research use"],
    languages: [],
    lineage: "Initial small-scale language-model experiment.",
    releaseStatus: "Release status has not been supplied.",
    license: null,
    links: [],
    limitations: pilotLimitations,
    relatedResearchNoteIds: [
      "what-50m-can-and-cannot-learn",
      "from-pretraining-to-focused-adaptation",
    ],
    indexFacts: [
      "50M parameters",
      "Experimental",
      "Independently pretrained",
      "Research use",
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
      "Improved pilot iteration with a refined training pipeline and broader token exposure.",
    parameterCount: {
      value: 50_000_000,
      shortLabel: "50M",
      label: "50M parameters",
    },
    modelType: "Independently pretrained compact language model",
    intendedUse: [
      "Research and local experimentation",
      "German and English experimentation",
    ],
    languages: ["German", "English"],
    lineage: "Improved pilot iteration following quantum-1-pilot.",
    releaseStatus:
      "Available through Hugging Face; the exact model URL has not been supplied.",
    license: null,
    links: [
      {
        kind: "huggingFace",
        label: "Hugging Face",
        url: null,
        pendingLabel: "Hugging Face model link pending",
      },
      {
        kind: "model-card",
        label: "Model card",
        url: null,
        pendingLabel: "Model card link pending",
      },
    ],
    limitations: pilotLimitations,
    relatedResearchNoteIds: [
      "what-50m-can-and-cannot-learn",
      "why-local-inference-changes-the-design-target",
      "evaluating-small-models-without-misleading-benchmarks",
    ],
    indexFacts: [
      "50M parameters",
      "Experimental",
      "Improved pilot iteration",
      "Research and local experimentation",
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
