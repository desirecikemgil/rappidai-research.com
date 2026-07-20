import type { SiteConfiguration } from "./types";

/**
 * A null value means that the information was not supplied and must not be
 * guessed. UI components should omit the value or show the configured pending
 * notice; they must never turn a null URL into `#`.
 */
export const siteConfig = {
  name: "rappidAI research",
  shortName: "rappidAI",
  description:
    "Independent AI research focused on compact language models, open-weight adaptation, efficient inference and local deployment.",
  location: "Berlin, Germany",
  businessEmail: null,
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
      url: "https://huggingface.co/rappidAI" as string | null,
      pendingLabel: "Hugging Face link pending",
    },
    github: {
      label: "GitHub",
      url: "https://github.com/jonascikemgil07-hue" as string | null,
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
      "Required legal information will be added before publication.",
  },
  privacy: {
    controllerName: "Jonas Désiré Cikemgil",
    controllerAddress: null,
    controllerEmail: null,
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
