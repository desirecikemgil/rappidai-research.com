import type { SiteConfiguration } from "./types";

export const publicContact = {
  businessEmail: "cikemgil@rappidai-research.com",
} as const;

export const publicProfiles = {
  huggingFace: "https://huggingface.co/rappidai-research",
  github: "https://github.com/rappidAI-Research",
} as const;

export const publicModelUrls = {
  "quantum-1-pilot": `${publicProfiles.huggingFace}/quantum-1-pilot`,
  "quantum-1-6-pilot": `${publicProfiles.huggingFace}/quantum-1.6-pilot`,
} as const;

const lumenQuantumRepository =
  "https://github.com/jonascikemgil07-hue/lumen-quantum";

export const publicResearchUrls = {
  repository: lumenQuantumRepository,
  quantum1ModelCard: `${publicModelUrls["quantum-1-pilot"]}/blob/main/README.md`,
  quantum16ModelCard: `${publicModelUrls["quantum-1-6-pilot"]}/blob/main/README.md`,
  trainingDocumentation: `${lumenQuantumRepository}/blob/main/docs/quantum_1_6_pilot.md`,
  diagnosisDocumentation: `${lumenQuantumRepository}/blob/main/docs/quantum_1_6_diagnosis.md`,
  dataConfiguration: `${lumenQuantumRepository}/blob/main/configs/quantum_1_6_pilot_data.yaml`,
  trainingConfiguration: `${lumenQuantumRepository}/blob/main/configs/quantum_1_6_pilot_train.yaml`,
  diagnosisConfiguration: `${lumenQuantumRepository}/blob/main/configs/quantum_1_6_diagnosis.yaml`,
  evaluationPrompts: `${lumenQuantumRepository}/blob/main/data/evals/quantum_1_base_v1.jsonl`,
  quantum1Gguf: `${publicModelUrls["quantum-1-pilot"]}/resolve/main/quantum-1-base-v1.0.0-f16.gguf?download=true`,
  quantum16Gguf: `${publicModelUrls["quantum-1-6-pilot"]}/resolve/main/quantum-1.6-pilot-v1.6.0-f16.gguf?download=true`,
  quantum1Checksum: `${publicModelUrls["quantum-1-pilot"]}/blob/main/SHA256SUMS.txt`,
  quantum16Checksum: `${publicModelUrls["quantum-1-6-pilot"]}/blob/main/SHA256SUMS.txt`,
  quantum1Manifest: `${publicModelUrls["quantum-1-pilot"]}/blob/main/manifest.json`,
  quantum16Manifest: `${publicModelUrls["quantum-1-6-pilot"]}/blob/main/manifest.json`,
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
    "Independent AI research focused on compact language models, open-weight adaptation, efficient inference and local deployment.",
  location: "Berlin, Germany",
  businessEmail: publicContact.businessEmail,
  canonicalUrl: null,
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
      "Jonas Désiré Cikemgil is a Berlin-based independent AI developer focused on compact language models, reproducible training pipelines, GGUF deployment and local inference.",
    focusAreas: [
      "Compact language models",
      "Reproducible training pipelines",
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
    hostingProvider: null,
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
