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
    "Our work focuses on compact architectures, documented training workflows, efficient inference and transparent evaluation. The goal is not to imitate frontier-scale laboratories, but to investigate where smaller systems can be genuinely useful.",
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
    id: "training-pipelines",
    title: "Training pipelines",
    description:
      "Versioned architecture, tokenizer and data-preparation workflows with explicit evidence boundaries.",
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
      "Comparing base and continued-pretraining stages through fixed prompts, next-token metrics and documented limitations.",
  },
] as const satisfies readonly ResearchArea[];

export const openResearchStatement = {
  headline: "Open publication is part of the research process.",
  text: "Where licensing and safety constraints allow, rappidAI publishes model artifacts, documentation, evaluation notes and implementation details so that work can be inspected and, when all required artifacts are available, reproduced.",
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
      "Public F16 GGUF release whose model card reports continued pretraining on 500M additional German tokens.",
    statusLabel: "Public experimental release",
    publicationDate: null,
  },
  {
    modelSlug: "quantum-1-echelon",
    title: "quantum-1-echelon",
    description:
      "Public 506.3M-parameter base-architecture preflight, tokenizer validation and Garden pipeline smoke test; no trained model release.",
    statusLabel: "Pipeline in development — no model release",
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
      "Can public GGUF checksums and fixed completion prompts support repeatable local llama.cpp comparisons?",
    ],
    qualification:
      "These are research questions. They define the investigation; they are not claims that the experiments have already answered each question.",
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
        label: "Generation diagnosis",
        url: publicResearchUrls.diagnosisDocumentation,
      },
    ],
  },
  design: {
    eyebrow: "EXPERIMENT DESIGN",
    title: "A controlled continued-pretraining experiment.",
    text: "The public quantum-1.6-pilot configuration describes continued training from quantum-1-pilot while preserving the 49,295,872-parameter architecture, 512-token context and frozen quantum-1 tokenizer. It specifies a fresh optimizer, scheduler and step counter, but no final public run log verifies every configured detail.",
    variables: [
      { label: "Same architecture", value: "Held constant" },
      { label: "Same parameter count", value: "49,295,872" },
      { label: "Same context length", value: "512 tokens" },
      { label: "Frozen tokenizer", value: "quantum-1" },
      { label: "Fresh optimizer and scheduler", value: "Configured run state" },
      {
        label: "500M additional German training tokens",
        value: "Reported release scope",
      },
    ],
    sources: [
      {
        label: "Training documentation",
        url: publicResearchUrls.trainingDocumentation,
      },
      {
        label: "Training configuration",
        url: publicResearchUrls.trainingConfiguration,
      },
      {
        label: "Public model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
    ],
  },
  hypothesisAndObservation: {
    eyebrow: "HYPOTHESIS AND OBSERVATION",
    title: "What was hypothesized, and what was publicly reported.",
    hypothesis:
      "Continued pretraining on 500M additional German tokens should improve language-pattern consistency without changing the model architecture or tokenizer.",
    observation:
      "The public Hugging Face release provides an F16 GGUF and reports validation loss 3.348852 and perplexity 28.4700. The model cards warn that generated text remains factually unreliable and may be incomplete or incoherent; complete run logs and raw evaluation outputs are not linked.",
    metricQualification:
      "These metrics describe next-token prediction on held-out data. They do not demonstrate factual accuracy, instruction following or downstream-task performance.",
    sources: [
      {
        label: "quantum-1.6-pilot model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Generation diagnosis",
        url: publicResearchUrls.diagnosisDocumentation,
      },
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
      [
        "Training scope",
        "HF-reported approximately 100M tokens",
        "HF-reported 500M additional tokens",
      ],
      ["Tokenizer", "quantum-1 tokenizer", "Same frozen tokenizer"],
      ["Release format", "F16 GGUF", "F16 GGUF"],
      [
        "Status",
        "Public experiment",
        "Public release; continued pretraining reported",
      ],
    ],
    note: "The comparison documents the evolution of the training pipeline. It is not evidence of competitiveness with larger models.",
    sources: [
      {
        label: "quantum-1-pilot model card",
        url: publicResearchUrls.quantum1ModelCard,
      },
      {
        label: "quantum-1.6-pilot model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
    ],
  },
  dataPipeline: {
    eyebrow: "DATA PIPELINE",
    title: "How the additional training data was prepared.",
    text: "The public continued-pretraining configuration specifies German-language data from the FineWeb2-HQ `deu_Latn` subset. Its code is designed to clean documents, exactly deduplicate them, filter known documents from the earlier dataset and create stable training, validation and test splits.",
    limitation:
      "Exact fingerprint matching does not guarantee the removal of near-duplicates, lightly modified copies or semantically overlapping documents.",
    status:
      "The public repository provides the pipeline configuration and method. It does not include a final quantum-1.6 data manifest with document counts, so no document totals are reported here.",
    sources: [
      {
        label: "Training documentation",
        url: publicResearchUrls.trainingDocumentation,
      },
      {
        label: "Data configuration",
        url: publicResearchUrls.dataConfiguration,
      },
    ],
  },
  evaluation: {
    eyebrow: "EVALUATION METHOD",
    title: "How the public workflow frames evaluation.",
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
      "No versioned final evaluation report, raw generation record or standardized downstream-task benchmark has been published. The website does not imply benchmark competitiveness.",
    sources: [
      {
        label: "Public model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Evaluation prompts",
        url: publicResearchUrls.evaluationPrompts,
      },
      {
        label: "Diagnosis configuration",
        url: publicResearchUrls.diagnosisConfiguration,
      },
    ],
  },
  observedBehavior: {
    eyebrow: "OBSERVED BEHAVIOR",
    title: "Public evidence before examples.",
    unavailable:
      "Reproducible example outputs have not yet been attached. This section will remain limited to documented failure categories until public evaluation artifacts are available.",
    explanation:
      "The public diagnosis document defines a comparison method for PyTorch, GGUF and Android paths, but it does not include a completed Android capture or raw output records. The website therefore does not present those planned comparisons as completed evidence.",
    sources: [
      {
        label: "Generation diagnosis",
        url: publicResearchUrls.diagnosisDocumentation,
      },
      {
        label: "Evaluation prompts",
        url: publicResearchUrls.evaluationPrompts,
      },
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
      {
        label: "quantum-1-pilot model card",
        url: publicResearchUrls.quantum1ModelCard,
      },
      {
        label: "quantum-1.6-pilot model card",
        url: publicResearchUrls.quantum16ModelCard,
      },
      {
        label: "Generation diagnosis",
        url: publicResearchUrls.diagnosisDocumentation,
      },
    ],
  },
  conclusions: {
    eyebrow: "INTERPRETATION",
    title: "What can—and cannot—be concluded.",
    demonstrated:
      "The public sources provide released GGUF artifacts, checksums, reported held-out metrics and code for the intended continued-training and evaluation workflow. They do not independently verify every run step without final manifests and logs.",
    notDemonstrated: [
      "It does not establish general language competence, factual reliability, instruction-following ability or production readiness.",
      "It does not show that small models are generally preferable to larger models. It documents the behavior and constraints of this specific experimental setup.",
    ],
    sources: [
      {
        label: "quantum-1.6-pilot model card",
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
  },
  reproducibility: {
    eyebrow: "REPRODUCIBILITY",
    title: "Artifacts for inspection.",
    introduction:
      "The public releases expose model cards, GGUF files, manifests, checksums and the repository documentation needed to inspect the published artifacts and the configured research workflow.",
    documentation: [
      {
        label: "quantum-1-pilot",
        detail: "Public model and model card",
        url: publicModelUrls["quantum-1-pilot"],
      },
      {
        label: "quantum-1.6-pilot",
        detail: "Public model and model card",
        url: publicModelUrls["quantum-1-6-pilot"],
      },
      {
        label: "lumen-quantum",
        detail: "Training and evaluation repository",
        url: publicResearchUrls.repository,
      },
      {
        label: "Training documentation",
        detail: "Continued-pretraining method and configuration",
        url: publicResearchUrls.trainingDocumentation,
      },
      {
        label: "Generation diagnosis",
        detail: "PyTorch, GGUF and Android comparison method",
        url: publicResearchUrls.diagnosisDocumentation,
      },
    ],
    releases: [
      {
        model: "quantum-1-pilot",
        filename: "quantum-1-base-v1.0.0-f16.gguf",
        sha256:
          "aeab97e50a5789772b69cf1554ba74eb915b5621835d80d40785b473b62fd1a5",
        ggufUrl: publicResearchUrls.quantum1Gguf,
        checksumUrl: publicResearchUrls.quantum1Checksum,
        manifestUrl: publicResearchUrls.quantum1Manifest,
      },
      {
        model: "quantum-1.6-pilot",
        filename: "quantum-1.6-pilot-v1.6.0-f16.gguf",
        sha256:
          "6bda15fcd51286e55174d5876fe44aa9518fb18b75fb5aa4f7402ebd039bd994",
        ggufUrl: publicResearchUrls.quantum16Gguf,
        checksumUrl: publicResearchUrls.quantum16Checksum,
        manifestUrl: publicResearchUrls.quantum16Manifest,
      },
    ],
    command:
      'llama-cli -m quantum-1.6-pilot-v1.6.0-f16.gguf -p "Berlin ist" -n 64 --seed 20260705 --temp 0 --top-p 1 --top-k 0 --no-cnv',
    commandNote:
      "This command mirrors the pinned public diagnosis configuration and command builder; it was not executed by the website test suite. A local llama.cpp build is required, and --no-cnv keeps llama-cli in completion mode.",
  },
  openQuestions: {
    eyebrow: "OPEN QUESTIONS",
    title: "Questions for the next research phase.",
    items: [
      "How will the preflighted 506.3M-parameter quantum-1-echelon base architecture behave if the full data and training runs are completed?",
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
