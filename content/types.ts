export type SiteRoute =
  | "/"
  | "/models"
  | "/models/quantum-1-pilot"
  | "/models/quantum-1-6-pilot"
  | "/models/quantum-1-echelon"
  | "/research"
  | "/resources"
  | "/resources/publications"
  | "/resources/publications/from-100m-to-600m-german-tokens"
  | "/resources/reproducibility"
  | "/resources/data-and-training"
  | "/resources/responsible-use"
  | "/resources/licensing"
  | "/resources/status"
  | "/resources/faq"
  | "/about"
  | "/contact"
  | "/imprint"
  | "/privacy";

export type SiteLocale = "en" | "de";

export interface NavigationItem {
  readonly label: string;
  readonly href: SiteRoute;
}

export interface InternalCallToAction extends NavigationItem {
  readonly ariaLabel?: string;
}

export type ExternalLinkKey = "huggingFace" | "github";

export interface ExternalLinkConfiguration {
  readonly label: string;
  readonly url: string | null;
  readonly pendingLabel: string;
}

export interface ExternalCallToAction {
  readonly label: string;
  readonly linkKey: ExternalLinkKey;
}

export interface FounderProfile {
  readonly name: string;
  readonly role: string;
  readonly biography: string;
  readonly focusAreas: readonly string[];
}

export interface BrandAssetConfiguration {
  readonly researchLogo: string;
  readonly wordmark: string;
  readonly symbol: string;
  readonly ambientReference: string;
  readonly modelCardReference: string;
}

export interface LegalConfiguration {
  /** Public-facing project identity; this is not a claim about a legal entity. */
  readonly publicIdentity: string;
  /** General project location; this is not a legal service address. */
  readonly generalLocation: string;
  readonly legalName: string | null;
  readonly legalForm: string | null;
  readonly serviceAddress: string;
  readonly vatId: string | null;
  readonly registrationNumber: string | null;
  readonly registrationCourt: string | null;
  readonly telephone: string | null;
  readonly legalRepresentative: string | null;
  readonly responsibleForContent: string | null;
}

export interface PrivacyConfiguration {
  readonly controllerName: string | null;
  readonly controllerAddress: string;
  readonly controllerEmail: string | null;
  readonly hostingProvider: string | null;
  readonly analyticsEnabled: boolean;
  readonly marketingCookiesEnabled: boolean;
}

export interface SiteConfiguration {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly location: string;
  readonly lastReviewed: string;
  readonly businessEmail: string | null;
  readonly canonicalUrl: string | null;
  readonly navigation: readonly NavigationItem[];
  readonly primaryNavigationAction: InternalCallToAction;
  readonly founder: FounderProfile;
  readonly externalLinks: Readonly<
    Record<ExternalLinkKey, ExternalLinkConfiguration>
  >;
  readonly brandAssets: BrandAssetConfiguration;
  readonly legal: LegalConfiguration;
  readonly privacy: PrivacyConfiguration;
}

export type ModelSlug =
  "quantum-1-pilot" | "quantum-1-6-pilot" | "quantum-1-echelon";

export type ModelStatus = "experimental" | "in-development";

export type ModelAvailability = "available" | "unconfirmed" | "not-released";

export type ModelFilterId = "all" | "available" | "in-development";

export type ModelLinkKind = "model-card" | ExternalLinkKey;

export interface ModelParameterCount {
  readonly value: number;
  readonly shortLabel: string;
  readonly label: string;
}

export interface ModelLink {
  readonly kind: ModelLinkKind;
  readonly label: string;
  readonly url: string | null;
  readonly pendingLabel: string;
}

export interface ModelTechnicalFact {
  readonly label: string;
  readonly value: string;
}

export interface ModelSource {
  readonly label: string;
  readonly url: string;
}

export type ResearchNoteId =
  | "from-100m-to-600m-german-tokens"
  | "why-local-inference-changes-the-design-target"
  | "from-pretraining-to-focused-adaptation"
  | "evaluating-small-models-without-misleading-benchmarks";

export interface ModelRecord {
  readonly slug: ModelSlug;
  readonly name: string;
  readonly status: ModelStatus;
  readonly statusLabel: string;
  readonly availability: ModelAvailability;
  readonly summary: string;
  readonly parameterCount: ModelParameterCount | null;
  readonly modelType: string;
  readonly intendedUse: readonly string[];
  readonly languages: readonly string[];
  readonly lineage: string;
  readonly releaseStatus: string;
  readonly license: string | null;
  readonly links: readonly ModelLink[];
  readonly technicalFacts: readonly ModelTechnicalFact[];
  readonly sources: readonly ModelSource[];
  readonly inferenceSoftware: readonly string[];
  readonly usageExample: string | null;
  readonly researchContext: string | null;
  readonly limitations: readonly string[];
  readonly relatedResearchNoteIds: readonly ResearchNoteId[];
  readonly indexFacts: readonly string[];
  readonly featured: boolean;
}

export interface ModelFilter {
  readonly id: ModelFilterId;
  readonly label: string;
}

export type ResearchNoteKind = "research-note";

export type ResearchProgress = "published" | "in-progress" | "planned";

export interface ResearchNote {
  readonly id: ResearchNoteId;
  readonly title: string;
  readonly kind: ResearchNoteKind;
  readonly kindLabel: string;
  readonly progress: ResearchProgress;
  readonly progressLabel: string;
  readonly href: string | null;
  readonly publicationDate: string | null;
}

export type EvidenceStatus =
  | "Published"
  | "Partial evidence"
  | "Not published"
  | "Not measured"
  | "Not yet available"
  | "Maintainer input required";

export type ResourceId =
  | "publications"
  | "reproducibility"
  | "data-and-training"
  | "responsible-use"
  | "licensing"
  | "status"
  | "faq";

export interface ResourceSource {
  readonly label: string;
  readonly url: string;
}

export interface ResourceCard {
  readonly id: ResourceId;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly href: SiteRoute;
  readonly status: EvidenceStatus;
}

export interface PublicationSection {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly items?: readonly string[];
}

export interface PublicationRecord {
  readonly slug: "from-100m-to-600m-german-tokens";
  readonly title: string;
  readonly summary: string;
  readonly kindLabel: string;
  readonly status: "published";
  readonly publicationDate: string;
  readonly lastReviewed: string;
  readonly peerReviewStatus: "Not peer-reviewed";
  readonly doi: null;
  readonly href: SiteRoute;
  readonly sources: readonly ResourceSource[];
  readonly sections: readonly PublicationSection[];
}

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

export interface NumberedPrinciple {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface ResearchArea {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface ResearchMethodStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface ExperimentLogEntry {
  readonly modelSlug: ModelSlug;
  readonly title: string;
  readonly description: string;
  readonly statusLabel: string;
  readonly publicationDate: null;
}

export interface RoadmapEntry {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly statusLabel: string;
  readonly targetDate: null;
}

export interface PageMetadata {
  readonly title: string;
  readonly description: string;
}

export interface PageIntroduction {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}
