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
      "Public base-architecture preflight, validated tokenizer and Garden pipeline smoke test; no trained model release.",
    statusLabel: "Pipeline and preflight stage — no trained model",
    publicationDate: null,
  },
] as const satisfies readonly ExperimentLogEntry[];

export const researchNotes = [
  {
    id: "from-100m-to-600m-german-tokens",
    title: "From 100M to 600M German Tokens: Lessons from quantum-1.6-pilot",
    kind: "research-note",
    kindLabel: "Research note",
    progress: "published",
    progressLabel: "Published",
    href: "/resources/publications/from-100m-to-600m-german-tokens",
    publicationDate: "2026-07-23",
  },
] as const satisfies readonly ResearchNote[];

export const researchPublication = {
  evidenceSnapshot: {
    label: "Pinned implementation snapshot",
    reference: "f7eda1fb0ae153f0f9cc3477ead997cbdb462b39",
    url: publicResearchUrls.evidenceSnapshot,
    explanation:
      "Echelon claims on this page are linked to one immutable lumen-quantum commit so that later repository changes do not silently alter the cited evidence.",
  },
  statusVocabulary: [
    {
      label: "Published",
      meaning: "A public artifact directly supports the statement.",
    },
    {
      label: "Partial evidence",
      meaning:
        "A configuration, preflight or smoke artifact exists, but it does not establish completion of the full experiment.",
    },
    {
      label: "Not published",
      meaning:
        "The result may exist privately, but no public artifact supports it.",
    },
    {
      label: "Not measured",
      meaning: "No committed measurement is available.",
    },
    {
      label: "Not yet available",
      meaning: "The relevant run or artifact is explicitly not complete.",
    },
    {
      label: "Maintainer input required",
      meaning:
        "A publication decision or verified project detail is still required.",
    },
  ],
  ledger: [
    {
      artifact: "quantum-1-pilot release",
      scope: "Released model artifact",
      status: "Published",
      evidence:
        "Public F16 GGUF, model card, release manifest and SHA-256 checksum.",
      boundary:
        "No standardized benchmark results and no stated model license.",
      url: publicModelUrls["quantum-1-pilot"],
    },
    {
      artifact: "quantum-1.6-pilot release",
      scope: "Released continued-pretraining artifact",
      status: "Published",
      evidence:
        "Public F16 GGUF, model card, manifest, checksum and held-out validation metrics.",
      boundary:
        "No standardized downstream benchmark and no raw public generation record.",
      url: publicModelUrls["quantum-1-6-pilot"],
    },
    {
      artifact: "Echelon Base architecture",
      scope: "Configuration preflight",
      status: "Partial evidence",
      evidence:
        "The committed preflight computes 506,333,440 parameters for the proposed configuration.",
      boundary:
        "This is a configuration result, not a trained model, checkpoint or capability result.",
      url: publicResearchUrls.echelonArchitecturePreflight,
    },
    {
      artifact: "Echelon tokenizer",
      scope: "Tokenizer artifact",
      status: "Published",
      evidence:
        "Committed configuration, checksums, quality summary and 23-case round-trip validation with 0 failures.",
      boundary: "Tokenizer validation does not establish model quality.",
      url: publicResearchUrls.echelonTokenizerValidation,
    },
    {
      artifact: "Echelon Garden pipeline",
      scope: "Data-pipeline smoke and resilience tests",
      status: "Partial evidence",
      evidence:
        "The Phase 3 report records 5,001 documents seen, 1,559 accepted and 1,380,886 tokens produced in the final smoke test.",
      boundary:
        "The same report states that the full production run had not started.",
      url: publicResearchUrls.echelonGardenReport,
    },
    {
      artifact: "Echelon production dataset",
      scope: "Production manifest and final split totals",
      status: "Not yet available",
      evidence: "A production configuration and targets are committed.",
      boundary:
        "No completed production manifest or final dataset totals are published.",
      url: publicResearchUrls.echelonGardenConfiguration,
    },
    {
      artifact: "Echelon model training",
      scope: "Training run, checkpoints and weights",
      status: "Not yet available",
      evidence:
        "No completed training artifact is present in the public sources.",
      boundary:
        "No Echelon loss curve, checkpoint, weight file, GGUF or model output is claimed.",
      url: publicResearchUrls.echelonDirectory,
    },
  ],
  echelon: {
    eyebrow: "CURRENT MODEL LINE",
    title: "What exists for quantum-1-echelon—and what does not.",
    introduction:
      "quantum-1-echelon is the current strategic model line. Echelon Base is the planned base-training stage and Echelon Chat is a later stage or variant within that same line. They are not separate model families.",
    stages: [
      {
        name: "Architecture preflight",
        status: "Published",
        detail:
          "The proposed Echelon Base configuration is machine-checked at 506,333,440 parameters within its configured target range.",
        boundary: "Configuration only · no trained weights",
        url: publicResearchUrls.echelonArchitecturePreflight,
      },
      {
        name: "Tokenizer",
        status: "Published",
        detail:
          "A 32,768-token SentencePiece BPE configuration, checksum list, quality summary and round-trip validation report are committed.",
        boundary: "Tokenizer artifact · not model evaluation",
        url: publicResearchUrls.echelonTokenizerChecksums,
      },
      {
        name: "Garden data pipeline",
        status: "Partial evidence",
        detail:
          "Smoke, integrity, interruption, resume and shutdown behavior are documented. The final smoke produced 1,380,886 tokens.",
        boundary: "Production data run not started",
        url: publicResearchUrls.echelonGardenReport,
      },
      {
        name: "Echelon Base training",
        status: "Not yet available",
        detail:
          "No public training log, checkpoint, weights, evaluation record or model output exists.",
        boundary: "No completion or capability claim",
        url: publicResearchUrls.echelonDirectory,
      },
      {
        name: "Echelon Chat stage",
        status: "Not yet available",
        detail:
          "The repository reserves a chat-stage path within the Echelon family, but no trained chat artifact is published.",
        boundary: "Stage within Echelon · not a separate family",
        url: publicResearchUrls.echelonPaths,
      },
    ],
    plannedTargets: {
      title: "Configured production targets",
      text: "The Garden production configuration targets 8,000,000,000 training tokens plus 10,000,000 validation and 10,000,000 test tokens at a 2,048-token context length.",
      qualification:
        "These are configuration targets, not completed dataset totals. The website will not present them as achieved until a final public manifest exists.",
      url: publicResearchUrls.echelonGardenConfiguration,
    },
  },
  findings: [
    {
      kind: "Negative result",
      title: "More pilot training did not establish reliable generation.",
      finding:
        "quantum-1.6-pilot completed the documented training, evaluation and GGUF path, while the public diagnosis still records factual unreliability and frequent repetition.",
      boundary:
        "Held-out loss and perplexity are not evidence of factual accuracy or downstream capability.",
      url: publicResearchUrls.diagnosisDocumentation,
    },
    {
      kind: "Pipeline finding",
      title: "The final Garden smoke accepted 31.17% of seen documents.",
      finding:
        "The committed Phase 3 report records 5,001 documents seen and 1,559 accepted under the configured language, quality and structural filters.",
      boundary:
        "This is a smoke-test acceptance rate, not the yield of the unstarted production run.",
      url: publicResearchUrls.echelonGardenReport,
    },
    {
      kind: "Engineering lesson",
      title: "Recovery behavior was validated before production scale.",
      finding:
        "The Garden implementation documents atomic checkpoints, safe partial-shard handling, dataset-state resume, a deterministic skip fallback and controlled shutdown behavior.",
      boundary:
        "This establishes pipeline resilience tests, not successful production-data completion.",
      url: publicResearchUrls.echelonGardenReport,
    },
    {
      kind: "Validation result",
      title: "The Echelon tokenizer passed its committed round-trip suite.",
      finding:
        "The public tokenizer report contains 23 prescribed cases and records 0 failed exact round trips, including German umlauts, Unicode, code, JSON and chat-control tokens.",
      boundary:
        "The suite is a tokenizer integrity check, not a language-model benchmark.",
      url: publicResearchUrls.echelonTokenizerValidation,
    },
  ],
  reproducibilityMatrix: [
    {
      area: "Pilot release integrity",
      status: "Published",
      evidence: "GGUF files, manifests and SHA-256 checksums are public.",
      missing: "Model licenses remain unstated.",
      url: publicResearchUrls.quantum16Manifest,
    },
    {
      area: "Pilot method and configuration",
      status: "Partial evidence",
      evidence: "Training, data and diagnosis configurations are public.",
      missing:
        "Complete raw run logs and quoted generation records are not public.",
      url: publicResearchUrls.trainingConfiguration,
    },
    {
      area: "Echelon architecture",
      status: "Partial evidence",
      evidence: "Configuration and parameter-count preflight are public.",
      missing: "No trained checkpoint or empirical model measurement exists.",
      url: publicResearchUrls.echelonArchitecturePreflight,
    },
    {
      area: "Echelon tokenizer",
      status: "Published",
      evidence:
        "Configuration, checksums, quality summary and validation report are public.",
      missing: "No claim is made beyond the committed validation suite.",
      url: publicResearchUrls.echelonTokenizerQuality,
    },
    {
      area: "Echelon production data",
      status: "Not yet available",
      evidence: "Smoke evidence and production configuration are public.",
      missing:
        "Final manifest, realized split totals and production hashes are not published.",
      url: publicResearchUrls.echelonGardenReport,
    },
    {
      area: "Echelon training and evaluation",
      status: "Not yet available",
      evidence: "No completed training evidence is public.",
      missing:
        "Weights, logs, loss curves, outputs and benchmarks are unavailable.",
      url: publicResearchUrls.echelonDirectory,
    },
    {
      area: "Resource measurements",
      status: "Not measured",
      evidence: "No committed measurement report is public.",
      missing:
        "Hardware use, runtime, cost, energy use and realized memory use remain unreported.",
      url: publicResearchUrls.echelonDirectory,
    },
    {
      area: "Release and dataset licensing",
      status: "Maintainer input required",
      evidence:
        "Source and revision fields are present in the Garden configuration.",
      missing:
        "No Echelon model license exists because no model is released; final dataset publication terms are not documented.",
      url: publicResearchUrls.echelonGardenConfiguration,
    },
  ],
} as const;

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
