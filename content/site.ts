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
    name: "Jonas",
    role: "Founder and AI Research Developer",
  },
  externalLinks: {
    huggingFace: {
      label: "Hugging Face",
      url: null,
      pendingLabel: "Hugging Face link pending",
    },
    github: {
      label: "GitHub",
      url: null,
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
    legalName: null,
    legalForm: null,
    serviceAddress: null,
    vatId: null,
    registrationNumber: null,
    registrationCourt: null,
    telephone: null,
    legalRepresentative: null,
    responsibleForContent: null,
    missingInformationNotice:
      "Required legal information will be added before publication.",
  },
  privacy: {
    controllerName: null,
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
