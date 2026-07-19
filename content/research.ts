import type {
  ExperimentLogEntry,
  NumberedPrinciple,
  ResearchArea,
  ResearchMethodStep,
  ResearchNote,
  ResearchNoteId,
  RoadmapEntry,
} from "./types";

export const researchThesis = {
  statement: "We do not believe every useful AI system needs to be enormous.",
  supportingText:
    "Our work focuses on compact architectures, targeted adaptation, efficient inference and transparent evaluation. The goal is not to imitate frontier-scale laboratories, but to investigate where smaller systems can be genuinely useful.",
} as const;

export const researchPrinciples = [
  {
    number: "01",
    title: "Efficient by design",
    description:
      "Models should be evaluated not only by capability, but also by the resources they require.",
  },
  {
    number: "02",
    title: "Local where possible",
    description:
      "Private and offline inference can make AI more accessible, controllable and dependable.",
  },
  {
    number: "03",
    title: "Open about limitations",
    description:
      "Experimental models must communicate their weaknesses as clearly as their strengths.",
  },
] as const satisfies readonly NumberedPrinciple[];

export const researchAreas = [
  {
    id: "open-weight-adaptation",
    title: "Open-weight adaptation",
    description:
      "Targeted fine-tuning of compact foundation models for narrower and measurable use cases.",
  },
  {
    id: "local-inference",
    title: "Local inference",
    description:
      "Quantization, memory efficiency and deployment through lightweight inference runtimes.",
  },
  {
    id: "evaluation",
    title: "Evaluation",
    description:
      "Comparing base and adapted models through repeatable prompts, practical tasks and documented limitations.",
  },
] as const satisfies readonly ResearchArea[];

export const openResearchStatement = {
  headline: "Open publication is part of the research process.",
  text: "Where licensing and safety constraints allow, rappidAI publishes model artifacts, documentation, evaluation notes and implementation details so that experiments can be inspected and reproduced.",
} as const;

export const researchMethodology = [
  {
    number: "01",
    title: "Frame a focused question",
    description:
      "Define a narrower and measurable use case before selecting an architecture or adaptation path.",
  },
  {
    number: "02",
    title: "Build or adapt deliberately",
    description:
      "Investigate compact architectures, targeted adaptation and efficient training approaches.",
  },
  {
    number: "03",
    title: "Evaluate repeatably",
    description:
      "Compare base and adapted models through repeatable prompts and practical tasks.",
  },
  {
    number: "04",
    title: "Document limitations",
    description:
      "Record unreliable output, repetition, inconsistent behavior and deployment constraints alongside useful results.",
  },
] as const satisfies readonly ResearchMethodStep[];

export const experimentLogs = [
  {
    modelSlug: "quantum-1-pilot",
    title: "quantum-1-pilot",
    description: "Initial small-scale language-model experiment.",
    statusLabel: "Experimental",
    publicationDate: null,
  },
  {
    modelSlug: "quantum-1-6-pilot",
    title: "quantum-1.6-pilot",
    description:
      "Improved training pipeline and broader token exposure.",
    statusLabel: "Experimental",
    publicationDate: null,
  },
  {
    modelSlug: "quantum-1-echelon",
    title: "quantum-1-echelon",
    description:
      "Next research phase focused on adapting stronger open-weight foundations for efficient German-language use.",
    statusLabel: "In development",
    publicationDate: null,
  },
] as const satisfies readonly ExperimentLogEntry[];

/**
 * The brief supplies titles but no published articles, dates, or confirmed
 * progress. They therefore remain planned research notes until real content is
 * attached. A null href must render as non-clickable content.
 */
export const researchNotes = [
  {
    id: "what-50m-can-and-cannot-learn",
    title: "What a 50M parameter model can and cannot learn",
    kind: "research-note",
    kindLabel: "Research note",
    progress: "planned",
    progressLabel: "Planned",
    href: null,
    publicationDate: null,
  },
  {
    id: "why-local-inference-changes-the-design-target",
    title: "Why local inference changes the design target",
    kind: "research-note",
    kindLabel: "Research note",
    progress: "planned",
    progressLabel: "Planned",
    href: null,
    publicationDate: null,
  },
  {
    id: "from-pretraining-to-focused-adaptation",
    title: "From pretraining experiments to focused adaptation",
    kind: "research-note",
    kindLabel: "Research note",
    progress: "planned",
    progressLabel: "Planned",
    href: null,
    publicationDate: null,
  },
  {
    id: "evaluating-small-models-without-misleading-benchmarks",
    title: "Evaluating small models without misleading benchmarks",
    kind: "research-note",
    kindLabel: "Research note",
    progress: "planned",
    progressLabel: "Planned",
    href: null,
    publicationDate: null,
  },
] as const satisfies readonly ResearchNote[];

export const roadmap = [
  {
    number: "01",
    title: "Small-scale pretraining experiments",
    description:
      "Use the quantum pilot models to examine compact language-model behavior and limitations.",
    statusLabel: "Experimental",
    targetDate: null,
  },
  {
    number: "02",
    title: "Focused open-weight adaptation",
    description:
      "Investigate targeted adaptation of stronger open-weight foundations for efficient German-language use.",
    statusLabel: "Current direction",
    targetDate: null,
  },
  {
    number: "03",
    title: "quantum-1-echelon",
    description:
      "Develop the next research phase without claiming a final parameter size, release date or completed model.",
    statusLabel: "In development",
    targetDate: null,
  },
] as const satisfies readonly RoadmapEntry[];

export const evaluationPrinciples = [
  {
    title: "Capability in context",
    description:
      "Evaluate a model against its intended use instead of implying frontier-scale capability.",
  },
  {
    title: "Resources matter",
    description:
      "Consider memory, inference constraints and deployment requirements alongside model behavior.",
  },
  {
    title: "Repeatable observations",
    description:
      "Use repeatable prompts and practical tasks without presenting unsupported benchmark claims.",
  },
  {
    title: "Limitations are results",
    description:
      "Document failure modes and inconsistent behavior as clearly as useful outcomes.",
  },
] as const;

export function getResearchNoteById(
  id: ResearchNoteId,
): (typeof researchNotes)[number] | undefined {
  return researchNotes.find((note) => note.id === id);
}
