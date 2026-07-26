import type {
  ModelFilter,
  ModelFilterId,
  ModelRecord,
  ModelSlug,
} from "./types";
import { publicModelUrls, publicResearchUrls } from "./site";
import { localizeContent, type Locale } from "@/lib/i18n";

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
    statusLabel: "Pipeline and preflight stage — no trained model",
    availability: "not-released",
    summary:
      "The current strategic Quantum model line. Public evidence covers an architecture preflight, a validated tokenizer and Garden data-pipeline smoke tests; no Echelon model has been trained or released.",
    parameterCount: null,
    modelType: "In-development German-language model line",
    intendedUse: [
      "Reproducible German-language base-model research",
      "A later chat stage within the same Echelon model line",
    ],
    languages: ["German-language focus; the production corpus is not complete"],
    lineage:
      "Public path configuration treats quantum-1-echelon-base and quantum-1-echelon-chat as stages or variants within the same quantum-1-echelon model line and forbids reuse of the pilot models, tokenizers and data.",
    releaseStatus:
      "No trained Echelon weights, checkpoints, GGUF files or Hugging Face model repository are publicly available.",
    license:
      "No model weights have been released. A license for any future quantum-1-echelon weights has not been documented.",
    links: [
      {
        kind: "github",
        label: "Inspect implementation repository",
        url: publicResearchUrls.repository,
        pendingLabel: "Implementation repository unavailable",
      },
    ],
    technicalFacts: [
      {
        label: "Architecture status",
        value:
          "Configuration preflight only. The proposed Echelon Base configuration specifies 26 layers, hidden size 1,280, intermediate size 3,584, 20 attention heads and 5 KV heads. The committed preflight computes 506,333,440 trainable parameters; none of this is evidence of trained weights.",
      },
      {
        label: "Configured context",
        value:
          "2,048 tokens in the architecture and Garden pipeline configurations; not validated on a trained Echelon model.",
      },
      {
        label: "Tokenizer",
        value:
          "SentencePiece BPE with a configured 32,768-token vocabulary. The committed validation report records 23 round-trip cases and 0 failures.",
      },
      {
        label: "Garden smoke test",
        value:
          "5,001 documents seen, 1,559 accepted and 1,380,886 tokens produced. These are smoke-test results, not production-dataset totals.",
      },
      {
        label: "Production data run",
        value:
          "Not yet available. The committed Phase 3 report states that the full production run had not started.",
      },
      {
        label: "Model training",
        value: "Not yet available. No completed Echelon training is claimed.",
      },
      {
        label: "Evaluation",
        value:
          "Not yet available. No Echelon model outputs, loss curves or benchmark results are published.",
      },
    ],
    sources: [
      {
        label: "Architecture configuration",
        url: publicResearchUrls.echelonArchitectureConfiguration,
      },
      {
        label: "Architecture preflight report",
        url: publicResearchUrls.echelonArchitecturePreflight,
      },
      {
        label: "Tokenizer validation report",
        url: publicResearchUrls.echelonTokenizerValidation,
      },
      {
        label: "Garden Phase 3 report",
        url: publicResearchUrls.echelonGardenReport,
      },
      {
        label: "Model-line path configuration",
        url: publicResearchUrls.echelonPaths,
      },
    ],
    inferenceSoftware: [],
    usageExample: null,
    researchContext:
      "The published work currently establishes pipeline readiness, artifact integrity and configuration boundaries. Echelon Base is the base-training stage; Echelon Chat is a later stage or variant in the same line. Neither is a separate released model family, and neither has public trained weights.",
    limitations: [
      "The proposed architecture has passed a configuration preflight only",
      "The full Garden production-data run has not been published as completed",
      "No Echelon model training logs, checkpoints or weights are public",
      "No Echelon model outputs or benchmark results are available",
      "Training hardware, runtime, cost and energy use are not published",
      "A model license is not yet available because no model release exists",
      "Not available for production use",
    ],
    relatedResearchNoteIds: [],
    indexFacts: [
      "Configuration preflight only",
      "No trained public model",
      "Tokenizer and data-pipeline evidence",
      "Echelon Base → later Chat stage",
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

export function getModelBySlug(
  slug: string,
  locale: Locale = "en",
): Model | undefined {
  const model = models.find((entry) => entry.slug === slug);
  return model ? localizeContent(model, locale) : undefined;
}

export function getFeaturedModel(locale: Locale = "en"): Model {
  const featuredModel = models.find((model) => model.featured);

  if (!featuredModel) {
    throw new Error("A featured model has not been configured.");
  }

  return localizeContent(featuredModel, locale);
}

export function getModelsByFilter(
  filter: ModelFilterId,
  locale: Locale = "en",
): readonly Model[] {
  let filteredModels: readonly Model[];

  switch (filter) {
    case "all":
      filteredModels = models;
      break;
    case "available":
      filteredModels = models.filter(
        (model) => model.availability === "available",
      );
      break;
    case "in-development":
      filteredModels = models.filter(
        (model) => model.status === "in-development",
      );
      break;
  }

  return localizeContent(filteredModels, locale);
}
