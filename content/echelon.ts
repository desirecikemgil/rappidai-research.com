import { publicResearchUrls } from "./site";

/** Public preview only. Targets are never used as measured ModelParameterCount. */
export const echelonPreview = {
  name: "Quantum 1 Echelon",
  variant: "1B",
  reviewed: "23 September 2026",
  eyebrow: "Introducing",
  status: "Coming Soon",
  development: "In development",
  description:
    "A new German-first language model, built from scratch by rappidAI Research.",
  detailDescription:
    "An upcoming language model targeting approximately one billion parameters. Developed from scratch, with German at its core and English in scope.",
  explore: "Explore Quantum 1 Echelon",
  specsLink: "Explore the specifications",
  allModels: "All models",
  targetLabel: "Parameter target",
  targetShort: "~1B",
  language: "German-first",
  languageDetail: "With English coverage",
  cardSummary:
    "Our next language model. German-first, built from scratch, with a focus on data quality and controlled training.",
  overview: {
    eyebrow: "The next Quantum",
    title: "A focused foundation.",
    description:
      "Echelon is our current major model project: an approximately 1B-parameter language model developed from scratch. The goal is carefully curated data and controlled training, rather than parameter count alone.",
    principles: [
      {
        title: "German-first. Not German-only.",
        text: "German is the primary language focus. English coverage is planned to retain useful English capabilities alongside it.",
      },
      {
        title: "From Base to Chat.",
        text: "Base pretraining comes first. Supervised fine-tuning and preference optimization are planned next, with an evaluated Chat model as the final user-facing stage.",
      },
      {
        title: "Quality before scale.",
        text: "High-quality data, documented training and careful evaluation guide the project. Capabilities will be reported when measurements exist.",
      },
    ],
  },
  specifications: {
    eyebrow: "Technical preview",
    title: "Expected specifications.",
    notice:
      "These are development targets, not completed-model specifications or measured results. The final configuration may change.",
    columns: ["Specification", "Planned value", "Status"],
    rows: [
      { label: "Model", value: "Quantum 1 Echelon", status: "In development" },
      { label: "Variant", value: "1B", status: "Planned" },
      {
        label: "Parameters",
        value: "Approximately 1.0–1.02 billion",
        status: "Target",
      },
      { label: "Training", value: "From scratch", status: "Planned" },
      {
        label: "Language focus",
        value: "German-first, with English coverage",
        status: "Planned",
      },
      { label: "Base context length", value: "4,096 tokens", status: "Target" },
      { label: "Precision", value: "BF16 training", status: "Planned" },
      {
        label: "Tokenizer",
        value: "32K and 48K vocabulary candidates",
        status: "Under evaluation",
      },
      { label: "Base pretraining", value: "40B tokens", status: "Target" },
      {
        label: "Model stages",
        value: "Base → SFT → Preference Optimization → Chat",
        status: "Planned",
      },
    ],
  },
  stages: {
    eyebrow: "Development path",
    title: "One model line. Four stages.",
    notice:
      "Planned stages, not completed milestones. Base and Chat belong to the same Echelon model line.",
    items: [
      { name: "Base", description: "From-scratch language-model pretraining." },
      {
        name: "SFT",
        description: "Supervised fine-tuning for instruction following.",
      },
      {
        name: "Preference Optimization",
        description:
          "Preference training and comparison against the SFT checkpoint.",
      },
      {
        name: "Chat",
        description: "Evaluation of the intended user-facing model.",
      },
    ],
  },
  evidence: {
    eyebrow: "Research in progress",
    title: "A preview, with clear boundaries.",
    description:
      "Architecture and tokenizer selection are in progress. No production Base or Chat checkpoint, model weights or benchmark results are available. A release date and model license have not been announced.",
    historyTitle: "Earlier preflight evidence",
    history:
      "The 506M architecture, 2,048-token context and 8B-token data target belong to an earlier preflight. They remain historical evidence and do not describe the new 1B target. Tokenizer checks and pipeline smoke tests are not model capability results.",
    sourcesLabel: "Reviewed public sources",
    sources: [
      {
        label: "1B development contract",
        url: publicResearchUrls.echelon1bPlan,
      },
      {
        label: "Current development status",
        url: publicResearchUrls.echelon1bStatus,
      },
      { label: "32K candidate", url: publicResearchUrls.echelon1b32k },
      { label: "48K candidate", url: publicResearchUrls.echelon1b48k },
      {
        label: "Base training plan",
        url: publicResearchUrls.echelon1bTraining,
      },
    ],
    historyLink: "Inspect the earlier preflight",
    researchLink: "Explore our research",
  },
} as const;
