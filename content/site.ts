import type { SiteConfiguration } from "./types";

export const publicContact = {
  businessEmail: "cikemgil@rappidai-research.com",
} as const;

export const publicProfiles = {
  huggingFace: "https://huggingface.co/rappidAI",
  github: "https://github.com/jonascikemgil07-hue/lumen-quantum",
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
  echelonArchitectureConfiguration: `${lumenQuantumReviewedSource}/configs/echelon/quantum-1-echelon-base.yaml`,
  echelonArchitecturePreflight: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/quantum-1-echelon-base-preflight.json`,
  echelonTokenizerConfiguration: `${lumenQuantumReviewedSource}/configs/echelon/tokenizer.yaml`,
  echelonTokenizerValidation: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/tokenizer_validation.json`,
  echelonGardenConfiguration: `${lumenQuantumReviewedSource}/configs/echelon/garden_production.yaml`,
  echelonGardenReport: `${lumenQuantumReviewedSource}/reports/quantum-1-echelon/garden_phase3_report.md`,
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
  businessEmail: publicContact.businessEmail,
  canonicalUrl: "https://www.rappidai-research.com",
  navigation: [
    { label: "Models", href: "/models" },
    { label: "Research", href: "/research" },
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
    modelCardReference: "/models/quantum-1-6-pilot-model-card-web.png",
  },
  legal: {
    publicIdentity: "rappidAI research",
    generalLocation: "Berlin, Germany",
    legalName: "Jonas Désiré Cikemgil",
    legalForm: "Private individual / independent initiative",
    serviceAddress: null,
    vatId: null,
    registrationNumber: null,
    registrationCourt: null,
    telephone: null,
    legalRepresentative: "Jonas Désiré Cikemgil",
    responsibleForContent: "Jonas Désiré Cikemgil",
    missingInformationNotice:
      "A complete service address remains unverified. The imprint must not be treated as complete until that address has been confirmed.",
  },
  privacy: {
    controllerName: "Jonas Désiré Cikemgil",
    controllerAddress: null,
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
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Imprint", href: "/imprint" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export const getConfiguredExternalUrl = (
  key: keyof typeof siteConfig.externalLinks,
): string | null => siteConfig.externalLinks[key].url;
