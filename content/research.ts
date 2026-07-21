import type {
  ExperimentLogEntry,
  NumberedPrinciple,
  ResearchArea,
  ResearchNote,
  ResearchNoteId,
} from "./types";
import { publicModelUrls, publicResearchUrls } from "./site";

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
      "Local inference can make AI more accessible and controllable while remaining less dependent on network connectivity.",
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

export const experimentLogs = [
  {
    modelSlug: "quantum-1-pilot",
    title: "quantum-1-pilot",
    description:
      "Public 49.3M-parameter base-completion experiment released as an F16 GGUF.",
    statusLabel: "Public experimental release",
    publicationDate: null,
  },
  {
    modelSlug: "quantum-1-6-pilot",
    title: "quantum-1.6-pilot",
    description:
      "Public continued-pretraining experiment with 500M additional German tokens and an F16 GGUF release.",
    statusLabel: "Public experimental release",
    publicationDate: null,
  },
  {
    modelSlug: "quantum-1-echelon",
    title: "quantum-1-echelon",
    description:
      "Announced research direction for adapting stronger open-weight foundations to focused German-language use.",
    statusLabel: "Research direction — no public model release",
    publicationDate: null,
  },
] as const satisfies readonly ExperimentLogEntry[];

/**
 * Notes remain non-clickable until a public PDF, repository document or page is
 * attached. A null href must render as non-clickable content.
 */
export const researchNotes = [
  {
    id: "from-100m-to-600m-german-tokens",
    title: "From 100M to 600M German Tokens: Lessons from quantum-1.6-pilot",
    kind: "research-note",
    kindLabel: "Research note",
    progress: "in-progress",
    progressLabel: "In progress",
    href: null,
    publicationDate: null,
  },
] as const satisfies readonly ResearchNote[];

export const quantumExperimentResearch = {
  questions: {
    eyebrow: "RESEARCH QUESTIONS",
    title: "Questions behind the experiments.",
    items: [
      "How much can a 49.3M-parameter German base model improve through continued pretraining while keeping its architecture and tokenizer unchanged?",
      "Which limitations are caused by model scale, and which may result from export, prompting or inference configuration?",
      "Can a documented GGUF artifact produce reproducible completion behavior through local llama.cpp inference?",
    ],
    qualification:
      "These are research questions. They define the investigation; they are not claims that the experiments have already answered each question.",
    sources: [
      { label: "quantum-1-pilot model card", url: publicResearchUrls.quantum1ModelCard },
      { label: "quantum-1.6-pilot model card", url: publicResearchUrls.quantum16ModelCard },
      { label: "Generation diagnosis", url: publicResearchUrls.diagnosisDocumentation },
    ],
  },
  design: {
    eyebrow: "EXPERIMENT DESIGN",
    title: "A controlled continued-pretraining experiment.",
    text: "quantum-1.6-pilot continues the training of quantum-1-pilot while preserving the 49,295,872-parameter architecture, the 512-token context window and the frozen quantum-1 tokenizer. A fresh optimizer, scheduler and step counter separate the new run from the earlier training state.",
    variables: [
      { label: "Same architecture", value: "Held constant" },
      { label: "Same parameter count", value: "49,295,872" },
      { label: "Same context length", value: "512 tokens" },
      { label: "Frozen tokenizer", value: "quantum-1" },
      { label: "Fresh optimizer and scheduler", value: "New run state" },
      { label: "500M additional German training tokens", value: "Documented release scope" },
    ],
    sources: [
      { label: "Training documentation", url: publicResearchUrls.trainingDocumentation },
      { label: "Training configuration", url: publicResearchUrls.trainingConfiguration },
      { label: "Public model card", url: publicResearchUrls.quantum16ModelCard },
    ],
  },
  hypothesisAndObservation: {
    eyebrow: "HYPOTHESIS AND OBSERVATION",
    title: "What was expected, and what was observed.",
    hypothesis:
      "Continued pretraining on 500M additional German tokens should improve language-pattern consistency without changing the model architecture or tokenizer.",
    observation:
      "The training, evaluation and GGUF-export pipeline completed successfully. Validation loss reached 3.348852 and perplexity reached 28.4700. Generated text remained factually unreliable and frequently repetitive.",
    metricQualification:
      "These metrics describe next-token prediction on held-out data. They do not demonstrate factual accuracy, instruction following or downstream-task performance.",
    sources: [
      { label: "quantum-1.6-pilot model card", url: publicResearchUrls.quantum16ModelCard },
      { label: "Generation diagnosis", url: publicResearchUrls.diagnosisDocumentation },
    ],
  },
  comparison: {
    eyebrow: "MODEL COMPARISON",
    title: "One architecture, two training stages.",
    columns: ["Property", "quantum-1-pilot", "quantum-1.6-pilot"],
    rows: [
      ["Parameters", "49,295,872", "49,295,872"],
      ["Context", "512 tokens", "512 tokens"],
      ["Model type", "Base completion", "Base completion"],
      ["Training scope", "Approximately 100M tokens", "500M additional tokens"],
      ["Tokenizer", "quantum-1 tokenizer", "Same frozen tokenizer"],
      ["Release format", "F16 GGUF", "F16 GGUF"],
      ["Status", "Public experiment", "Public continued-pretraining experiment"],
    ],
    note:
      "The comparison documents the evolution of the training pipeline. It is not evidence of competitiveness with larger models.",
    sources: [
      { label: "quantum-1-pilot model card", url: publicResearchUrls.quantum1ModelCard },
      { label: "quantum-1.6-pilot model card", url: publicResearchUrls.quantum16ModelCard },
    ],
  },
  dataPipeline: {
    eyebrow: "DATA PIPELINE",
    title: "How the additional training data was prepared.",
    text: "The continued-pretraining pipeline uses German-language data from the FineWeb2-HQ `deu_Latn` subset. Documents are cleaned, exactly deduplicated and filtered against known documents from the earlier dataset before stable training, validation and test splits are created.",
    limitation:
      "Exact fingerprint matching does not guarantee the removal of near-duplicates, lightly modified copies or semantically overlapping documents.",
    status:
      "The public repository provides the pipeline configuration and method. It does not include a final quantum-1.6 data manifest with document counts, so no document totals are reported here.",
    sources: [
      { label: "Training documentation", url: publicResearchUrls.trainingDocumentation },
      { label: "Data configuration", url: publicResearchUrls.dataConfiguration },
    ],
  },
  evaluation: {
    eyebrow: "EVALUATION METHOD",
    title: "How the model is evaluated.",
    items: [
      {
        title: "Held-out metrics",
        text: "Validation loss and perplexity measure next-token prediction on reserved data.",
      },
      {
        title: "Fixed prompts",
        text: "Repeated German completion prompts allow qualitative comparison between checkpoints and inference paths.",
      },
      {
        title: "Controlled decoding",
        text: "Deterministic and controlled-sampling settings help separate model behavior from sampling variation.",
      },
      {
        title: "Failure documentation",
        text: "Repetition, factual inconsistency and incoherent continuation are treated as results rather than hidden.",
      },
    ],
    limitation:
      "No standardized downstream-task benchmarks have been published. The website does not imply benchmark competitiveness.",
    sources: [
      { label: "Public model card", url: publicResearchUrls.quantum16ModelCard },
      { label: "Evaluation prompts", url: publicResearchUrls.evaluationPrompts },
      { label: "Diagnosis configuration", url: publicResearchUrls.diagnosisConfiguration },
    ],
  },
  observedBehavior: {
    eyebrow: "OBSERVED BEHAVIOR",
    title: "Public evidence before examples.",
    unavailable:
      "Reproducible example outputs have not yet been attached. This section will remain limited to documented failure categories until public evaluation artifacts are available.",
    explanation:
      "The public diagnosis describes terminal completions as structurally German but sometimes factually nonsensical. Because the repository does not include the raw output records and complete run metadata, those descriptions are not presented as quoted examples.",
    sources: [
      { label: "Generation diagnosis", url: publicResearchUrls.diagnosisDocumentation },
      { label: "Evaluation prompts", url: publicResearchUrls.evaluationPrompts },
    ],
  },
  failureModes: {
    eyebrow: "FAILURE MODES",
    title: "Known failure modes.",
    items: [
      {
        title: "Factual inconsistency",
        text: "Completions may be grammatically structured while making incorrect claims.",
      },
      {
        title: "Repetitive continuation",
        text: "Generated text may repeat patterns instead of developing a coherent continuation.",
      },
      {
        title: "Incomplete or incoherent continuations",
        text: "Outputs may stop abruptly or lose semantic continuity.",
      },
      {
        title: "No instruction following",
        text: "The pilots were released as base-completion models, not instruction-tuned assistants.",
      },
      {
        title: "No chat alignment",
        text: "No chat template or conversational alignment is promised.",
      },
      {
        title: "Limited 512-token context",
        text: "The architecture limits the available context window to 512 tokens.",
      },
    ],
    conclusion:
      "These behaviors make the pilot models unsuitable for production assistance and high-stakes decisions.",
    sources: [
      { label: "quantum-1-pilot model card", url: publicResearchUrls.quantum1ModelCard },
      { label: "quantum-1.6-pilot model card", url: publicResearchUrls.quantum16ModelCard },
      { label: "Generation diagnosis", url: publicResearchUrls.diagnosisDocumentation },
    ],
  },
  conclusions: {
    eyebrow: "INTERPRETATION",
    title: "What can—and cannot—be concluded.",
    demonstrated:
      "The experiment demonstrates a documented path from continued pretraining to held-out evaluation, F16 GGUF export and local llama.cpp inference.",
    notDemonstrated: [
      "It does not establish general language competence, factual reliability, instruction-following ability or production readiness.",
      "It does not show that small models are generally preferable to larger models. It documents the behavior and constraints of this specific experimental setup.",
    ],
    sources: [
      { label: "quantum-1.6-pilot model card", url: publicResearchUrls.quantum16ModelCard },
      { label: "Training documentation", url: publicResearchUrls.trainingDocumentation },
      { label: "Generation diagnosis", url: publicResearchUrls.diagnosisDocumentation },
    ],
  },
  reproducibility: {
    eyebrow: "REPRODUCIBILITY",
    title: "Artifacts for inspection.",
    introduction:
      "The public releases expose model cards, GGUF files, manifests, checksums and the repository documentation needed to inspect the published artifacts and the configured research workflow.",
    documentation: [
      { label: "quantum-1-pilot", detail: "Public model and model card", url: publicModelUrls["quantum-1-pilot"] },
      { label: "quantum-1.6-pilot", detail: "Public model and model card", url: publicModelUrls["quantum-1-6-pilot"] },
      { label: "lumen-quantum", detail: "Training and evaluation repository", url: publicResearchUrls.repository },
      { label: "Training documentation", detail: "Continued-pretraining method and configuration", url: publicResearchUrls.trainingDocumentation },
      { label: "Generation diagnosis", detail: "PyTorch, GGUF and Android comparison method", url: publicResearchUrls.diagnosisDocumentation },
    ],
    releases: [
      {
        model: "quantum-1-pilot",
        filename: "quantum-1-base-v1.0.0-f16.gguf",
        sha256: "aeab97e50a5789772b69cf1554ba74eb915b5621835d80d40785b473b62fd1a5",
        ggufUrl: publicResearchUrls.quantum1Gguf,
        checksumUrl: publicResearchUrls.quantum1Checksum,
        manifestUrl: publicResearchUrls.quantum1Manifest,
      },
      {
        model: "quantum-1.6-pilot",
        filename: "quantum-1.6-pilot-v1.6.0-f16.gguf",
        sha256: "6bda15fcd51286e55174d5876fe44aa9518fb18b75fb5aa4f7402ebd039bd994",
        ggufUrl: publicResearchUrls.quantum16Gguf,
        checksumUrl: publicResearchUrls.quantum16Checksum,
        manifestUrl: publicResearchUrls.quantum16Manifest,
      },
    ],
    command:
      './tools/llama.cpp/build/bin/llama-completion -m exports/quantum-1.6-pilot-v1.6.0-f16.gguf -p "Berlin ist" -n 64 --temp 0 --top-p 1 --top-k 0',
    commandNote:
      "Completion prompting is the documented reference path. No chat template is promised.",
  },
  openQuestions: {
    eyebrow: "OPEN QUESTIONS",
    title: "Questions for the next research phase.",
    items: [
      "Would a stronger pretrained foundation produce better German-language behavior under the same local deployment constraints?",
      "Which quantization levels preserve useful completion behavior while reducing memory requirements?",
      "Which evaluation tasks are appropriate for small German base-completion models without overstating their capabilities?",
      "How much improvement comes from additional training data compared with changes in architecture, tokenizer or dataset quality?",
    ],
    qualification:
      "These questions define possible future investigations. They are not release commitments, milestones or performance promises.",
  },
} as const;

export function getResearchNoteById(
  id: ResearchNoteId,
): (typeof researchNotes)[number] | undefined {
  return researchNotes.find((note) => note.id === id);
}
