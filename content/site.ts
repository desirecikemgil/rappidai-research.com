import type { SiteConfiguration } from "./types";

export const publicContact = {
  businessEmail: "cikemgil@rappidai-research.com",
} as const;

export const publicProfiles = {
  huggingFace: "https://huggingface.co/rappidAI",
  github: "https://github.com/jonascikemgil07-hue/lumen-quantum",
} as const;

const websiteRepository =
  "https://github.com/jonascikemgil07-hue/rappidai-research.com";

export const publicProjectUrls = {
  websiteRepository,
  citation: `${websiteRepository}/blob/main/CITATION.cff`,
  contributing: `${websiteRepository}/blob/main/CONTRIBUTING.md`,
  security: `${websiteRepository}/blob/main/SECURITY.md`,
  roadmap: `${websiteRepository}/blob/main/ROADMAP.md`,
  licensingRecord: `${websiteRepository}/blob/main/docs/licensing.md`,
  dataAndTrainingRecord: `${websiteRepository}/blob/main/docs/data-and-training.md`,
  trainingRunTemplate: `${websiteRepository}/blob/main/docs/training-run-template.md`,
  fineWebDataset: "https://huggingface.co/datasets/epfml/FineWeb2-HQ",
  odcByLicense: "https://opendatacommons.org/licenses/by/1-0/",
  commonCrawlTerms: "https://commoncrawl.org/terms-of-use",
} as const;

export const publicModelUrls = {
  "quantum-1-pilot": `${publicProfiles.huggingFace}/quantum-1-pilot`,
  "quantum-1-6-pilot": `${publicProfiles.huggingFace}/quantum-1.6-pilot`,
} as const;

const reviewedModelRevisions = {
  "quantum-1-pilot": "7daf415ef09fc131d7440af8514a93fd8cf3f2a1",
  "quantum-1-6-pilot": "507662c095b5ba6e14f24d3fc7f0a5e29d76b7f3",
} as const;

const lumenQuantumRepository =
  "https://github.com/jonascikemgil07-hue/lumen-quantum";
const lumenQuantumReviewedRevision = "f7eda1fb0ae153f0f9cc3477ead997cbdb462b39";
const lumenQuantumReviewedSource = `${lumenQuantumRepository}/blob/${lumenQuantumReviewedRevision}`;

export const publicResearchUrls = {
  repository: lumenQuantumRepository,
  evidenceSnapshot: `${lumenQuantumRepository}/tree/${lumenQuantumReviewedRevision}`,
  quantum1ModelCard: `${publicModelUrls["quantum-1-pilot"]}/blob/${reviewedModelRevisions["quantum-1-pilot"]}/README.md`,
  quantum16ModelCard: `${publicModelUrls["quantum-1-6-pilot"]}/blob/${reviewedModelRevisions["quantum-1-6-pilot"]}/README.md`,
  trainingDocumentation: `${lumenQuantumReviewedSource}/docs/quantum_1_6_pilot.md`,
  diagnosisDocumentation: `${lumenQuantumReviewedSource}/docs/quantum_1_6_diagnosis.md`,
  dataConfiguration: `${lumenQuantumReviewedSource}/configs/quantum_1_6_pilot_data.yaml`,
  trainingConfiguration: `${lumenQuantumReviewedSource}/configs/quantum_1_6_pilot_train.yaml`,
  diagnosisConfiguration: `${lumenQuantumReviewedSource}/configs/quantum_1_6_diagnosis.yaml`,
  evaluationPrompts: `${lumenQuantumReviewedSource}/data/evals/quantum_1_base_v1.jsonl`,
  quantum1Gguf: `${publicModelUrls["quantum-1-pilot"]}/resolve/${reviewedModelRevisions["quantum-1-pilot"]}/quantum-1-base-v1.0.0-f16.gguf?download=true`,
  quantum16Gguf: `${publicModelUrls["quantum-1-6-pilot"]}/resolve/${reviewedModelRevisions["quantum-1-6-pilot"]}/quantum-1.6-pilot-v1.6.0-f16.gguf?download=true`,
  quantum1Checksum: `${publicModelUrls["quantum-1-pilot"]}/blob/${reviewedModelRevisions["quantum-1-pilot"]}/SHA256SUMS.txt`,
  quantum16Checksum: `${publicModelUrls["quantum-1-6-pilot"]}/blob/${reviewedModelRevisions["quantum-1-6-pilot"]}/SHA256SUMS.txt`,
  quantum1Manifest: `${publicModelUrls["quantum-1-pilot"]}/blob/${reviewedModelRevisions["quantum-1-pilot"]}/manifest.json`,
  quantum16Manifest: `${publicModelUrls["quantum-1-6-pilot"]}/blob/${reviewedModelRevisions["quantum-1-6-pilot"]}/manifest.json`,
  echelonDirectory: `${lumenQuantumRepository}/tree/${lumenQuantumReviewedRevision}/reports/quantum-1-echelon`,
  echelonArchitectureConfiguration: `${lumenQuantumReviewedSource}/configs/echelon/quantum-1-echelon-base.yaml`,
  echelonArchitecturePreflight: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/quantum-1-echelon-base-preflight.json`,
  echelonTokenizerConfiguration: `${lumenQuantumReviewedSource}/configs/echelon/tokenizer.yaml`,
  echelonTokenizerValidation: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/tokenizer_validation.json`,
  echelonTokenizerQuality: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/tokenizer_quality.json`,
  echelonTokenizerChecksums: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/tokenizer_SHA256SUMS.txt`,
  echelonGardenPlan: `${lumenQuantumReviewedSource}/docs/echelon/GARDEN_PIPELINE_PLAN.md`,
  echelonGardenConfiguration: `${lumenQuantumReviewedSource}/configs/echelon/garden_production.yaml`,
  echelonGardenReport: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/garden_phase3_report.md`,
  echelonSourceMetadata: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/source_metadata_analysis.json`,
  echelonPaths: `${lumenQuantumReviewedSource}/configs/echelon/paths.yaml`,
} as const;

/**
 * A null value means that the information has not been verified and must not be
 * guessed. UI components should omit the value or show the configured missing
 * notice; they must never turn a null URL into `#`.
 */
export const siteConfig = {
  name: "rappidAI research",
  shortName: "rappidAI",
  description:
    "Independent AI research on compact language models and documented training, evaluation and local-inference workflows.",
  location: "Berlin, Germany",
  lastReviewed: "2026-07-23",
  businessEmail: publicContact.businessEmail,
  canonicalUrl: "https://www.rappidai-research.com",
  navigation: [
    { label: "Models", href: "/models" },
    { label: "Research", href: "/research" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  primaryNavigationAction: {
    label: "Explore models",
    href: "/models",
  },
  founder: {
    name: "Jonas Désiré Cikemgil",
    role: "Founder & Independent AI Research Developer",
    biography:
      "Jonas Désiré Cikemgil is a Berlin-based independent AI developer focused on compact language models, documented training pipelines, GGUF deployment and local inference.",
    focusAreas: [
      "Compact language models",
      "Documented training pipelines",
      "GGUF deployment",
      "Local inference",
    ],
  },
  externalLinks: {
    huggingFace: {
      label: "Hugging Face",
      url: publicProfiles.huggingFace as string | null,
      pendingLabel: "Hugging Face link pending",
    },
    github: {
      label: "GitHub",
      url: publicProfiles.github as string | null,
      pendingLabel: "GitHub link pending",
    },
  },
  brandAssets: {
    researchLogo: "/brand/rappidai-research-lockup.png",
    wordmark: "/brand/rappidai-wordmark.png",
    symbol: "/brand/rappidai-symbol.png",
    ambientReference: "/brand/rappidai-research-ambient.png",
    // Retained for the asset record only. The model card is rendered from
    // content/models.ts now; see public/models/README.md.
    modelCardReference: "/models/quantum-1-6-pilot-model-card-web.png",
  },
  legal: {
    publicIdentity: "rappidAI research",
    generalLocation: "Berlin, Germany",
    legalName: "Jonas Désiré Cikemgil",
    legalForm: "Private individual / independent initiative",
    serviceAddress: "Almutstraße 3, 13467 Berlin, Germany",
    vatId: null,
    registrationNumber: null,
    registrationCourt: null,
    telephone: null,
    legalRepresentative: "Jonas Désiré Cikemgil",
    responsibleForContent: "Jonas Désiré Cikemgil",
  },
  privacy: {
    controllerName: "Jonas Désiré Cikemgil",
    controllerAddress: "Almutstraße 3, 13467 Berlin, Germany",
    controllerEmail: publicContact.businessEmail,
    hostingProvider: "Vercel",
    analyticsEnabled: false,
    marketingCookiesEnabled: false,
  },
} as const satisfies SiteConfiguration;

export const footerNavigation = {
  explore: [
    { label: "Models", href: "/models" },
    { label: "Research", href: "/research" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Publications", href: "/resources/publications" },
    { label: "Reproducibility", href: "/resources/reproducibility" },
    { label: "Data & training", href: "/resources/data-and-training" },
    { label: "Responsible use", href: "/resources/responsible-use" },
    { label: "Licensing", href: "/resources/licensing" },
    { label: "Status", href: "/resources/status" },
    { label: "FAQ", href: "/resources/faq" },
  ],
  legal: [
    { label: "Imprint", href: "/imprint" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export const getConfiguredExternalUrl = (
  key: keyof typeof siteConfig.externalLinks,
): string | null => siteConfig.externalLinks[key].url;
