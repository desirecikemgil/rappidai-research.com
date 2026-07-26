import { publicResearchUrls } from "./site";

export type ComparisonViewId = "architecture" | "tokenizer" | "pipeline";
export type ComparisonEvidenceTone = "released" | "published" | "configured";

export const modelComparisonContent = {
  introduction: {
    eyebrow: "MODEL SYSTEM COMPARISON",
    title: "Three model stages, compared on the same evidence scale.",
    description:
      "Architecture, tokenizer and data-pipeline differences are shown separately so released artifacts, published validation and configured Echelon targets cannot be mistaken for the same kind of evidence.",
  },
  tabs: [
    { id: "architecture", label: "Architecture" },
    { id: "tokenizer", label: "Tokenizer" },
    { id: "pipeline", label: "Data pipeline" },
  ],
  architecture: {
    eyebrow: "ARCHITECTURE SCALE",
    title: "From a 49.3M pilot to a configured 506.3M Echelon Base.",
    description:
      "Parameter and context scale can be compared directly. Layer dimensions are shown only where a public source states them; the first pilot therefore keeps an explicit documentation gap.",
    models: [
      {
        id: "quantum-1-pilot",
        name: "quantum-1-pilot",
        tone: "released",
        evidenceLabel: "Released artifact",
        parameters: 49_295_872,
        parameterLabel: "49.3M released parameters",
        contextTokens: 512,
        layers: null,
        hiddenSize: null,
        attentionHeads: null,
        kvHeads: null,
        detail:
          "Detailed layer dimensions are not stated in the pinned public manifest.",
      },
      {
        id: "quantum-1-6-pilot",
        name: "quantum-1.6-pilot",
        tone: "released",
        evidenceLabel: "Released artifact",
        parameters: 49_295_872,
        parameterLabel: "49.3M released parameters",
        contextTokens: 512,
        layers: 12,
        hiddenSize: 512,
        attentionHeads: 8,
        kvHeads: 8,
        detail:
          "The continued-pretraining release keeps the compact pilot architecture.",
      },
      {
        id: "quantum-1-echelon",
        name: "quantum-1-echelon",
        tone: "configured",
        evidenceLabel: "Configuration preflight only",
        parameters: 506_333_440,
        parameterLabel: "506.3M configured parameters",
        contextTokens: 2048,
        layers: 26,
        hiddenSize: 1280,
        attentionHeads: 20,
        kvHeads: 5,
        detail:
          "Proposed Echelon Base configuration; no trained weights or measured capability.",
      },
    ],
    boundary:
      "Hatched architecture marks configuration, not a trained model. The Echelon parameter total is machine-checked by the committed preflight report.",
    sources: [
      {
        label: "quantum-1-pilot manifest",
        url: publicResearchUrls.quantum1Manifest,
      },
      {
        label: "quantum-1.6-pilot model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Echelon architecture configuration",
        url: publicResearchUrls.echelonArchitectureConfiguration,
      },
      {
        label: "Echelon architecture preflight",
        url: publicResearchUrls.echelonArchitecturePreflight,
      },
    ],
  },
  tokenizer: {
    eyebrow: "TOKENIZER GENERATIONS",
    title: "One frozen pilot tokenizer, then a new Echelon vocabulary.",
    description:
      "The two pilot stages share the quantum-1 tokenizer. Echelon introduces a separately configured SentencePiece BPE tokenizer with a larger vocabulary and published integrity checks.",
    models: [
      {
        id: "quantum-1-pilot",
        name: "quantum-1-pilot",
        tone: "released",
        evidenceLabel: "Released model tokenizer",
        vocabulary: 16_384,
        tokenizerLabel: "quantum-1 tokenizer",
        relationship: "Baseline tokenizer",
        validation: "Separate validation report not published",
      },
      {
        id: "quantum-1-6-pilot",
        name: "quantum-1.6-pilot",
        tone: "released",
        evidenceLabel: "Frozen during continued pretraining",
        vocabulary: 16_384,
        tokenizerLabel: "Same quantum-1 tokenizer",
        relationship: "Architecture and tokenizer held constant",
        validation: "No separate tokenizer benchmark is claimed",
      },
      {
        id: "quantum-1-echelon",
        name: "quantum-1-echelon",
        tone: "published",
        evidenceLabel: "Published tokenizer artifact",
        vocabulary: 32_768,
        tokenizerLabel: "SentencePiece BPE",
        relationship: "New tokenizer; pilot assets are not reused",
        validation: "23 round-trip cases · 0 failures",
      },
    ],
    validationScope: [
      "German umlauts",
      "Unicode",
      "Code",
      "JSON",
      "Control tokens",
    ],
    boundary:
      "The Echelon round-trip suite verifies tokenizer integrity. It is not a language-model benchmark and does not establish generation quality.",
    sources: [
      {
        label: "quantum-1.6-pilot model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Echelon tokenizer configuration",
        url: publicResearchUrls.echelonTokenizerConfiguration,
      },
      {
        label: "Echelon tokenizer validation",
        url: publicResearchUrls.echelonTokenizerValidation,
      },
    ],
  },
  pipeline: {
    eyebrow: "DATA PIPELINE SCALE",
    title:
      "Reported pilot scope versus an unstarted Echelon production target.",
    description:
      "The scale uses the 100M-token pilot report as a reference. The 1.6 stage reports 500M additional German tokens; Echelon targets 8B training tokens, but only smoke-test output exists.",
    scaleLabel: "Logarithmic corpus-scale comparison",
    models: [
      {
        id: "quantum-1-pilot",
        name: "quantum-1-pilot",
        tone: "released",
        evidenceLabel: "HF-reported scope",
        tokenScopeMillions: 100,
        multiplier: "×1",
        scopeLabel: "≈100M reported training tokens",
        process:
          "Public base-model release; complete final run manifest not linked.",
      },
      {
        id: "quantum-1-6-pilot",
        name: "quantum-1.6-pilot",
        tone: "released",
        evidenceLabel: "HF-reported scope",
        tokenScopeMillions: 600,
        multiplier: "×6",
        scopeLabel: "≈600M reported cumulative scope",
        process:
          "Approximately 100M base tokens plus 500M additional German tokens.",
      },
      {
        id: "quantum-1-echelon",
        name: "quantum-1-echelon",
        tone: "configured",
        evidenceLabel: "Configured target",
        tokenScopeMillions: 8000,
        multiplier: "×80",
        scopeLabel: "8B configured training-token target",
        process:
          "Production run not started; final smoke produced 1,380,886 tokens.",
      },
    ],
    flow: [
      { label: "Source stream", state: "published" },
      { label: "Language & quality filters", state: "published" },
      { label: "Exact and source-aware deduplication", state: "published" },
      { label: "Stable train / validation / test splits", state: "published" },
      { label: "Production corpus", state: "configured" },
    ],
    boundary:
      "The Echelon configuration also targets 10M validation and 10M test tokens. None of these production totals are presented as achieved.",
    sources: [
      {
        label: "quantum-1-pilot model card",
        url: publicResearchUrls.quantum1ModelCard,
      },
      {
        label: "quantum-1.6 training documentation",
        url: publicResearchUrls.trainingDocumentation,
      },
      {
        label: "Echelon Garden configuration",
        url: publicResearchUrls.echelonGardenConfiguration,
      },
      {
        label: "Echelon Garden Phase 3 report",
        url: publicResearchUrls.echelonGardenReport,
      },
    ],
  },
} as const;
