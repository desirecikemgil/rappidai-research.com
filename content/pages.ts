import type {
  ExternalCallToAction,
  InternalCallToAction,
  PageIntroduction,
  PageMetadata,
  SiteRoute,
} from "./types";

export const homePageContent = {
  hero: {
    eyebrow: "INDEPENDENT AI RESEARCH",
    headlineLines: ["Smaller models.", "Focused intelligence."],
    description:
      "rappidAI develops compact language models and specialized open-weight systems for local, private and resource-efficient AI.",
    supportingText:
      "Built primarily for developers and researchers, the work explores how capable language systems can become more accessible without relying exclusively on increasingly large models or permanent cloud infrastructure.",
    primaryAction: {
      label: "Explore our models",
      href: "/models",
    } satisfies InternalCallToAction,
    externalAction: {
      label: "View on Hugging Face",
      linkKey: "huggingFace",
    } satisfies ExternalCallToAction,
    status:
      "Current focus: efficient German-language fine-tuning and local inference.",
  },
  thesis: {
    eyebrow: "RESEARCH THESIS",
  },
  featuredModel: {
    eyebrow: "FEATURED MODEL",
    title: "quantum-1.6-pilot",
    productionNotice:
      "Experimental model. Not production-ready and not intended as a production assistant.",
  },
  modelEvolution: {
    eyebrow: "MODEL EVOLUTION",
    title: "From small-scale pretraining to focused adaptation.",
  },
  currentResearch: {
    eyebrow: "CURRENT RESEARCH",
    title: "Focused questions, practical constraints.",
  },
  openResearch: {
    eyebrow: "OPEN RESEARCH",
    headline: "Open publication is part of the research process.",
    text: "Where licensing and safety constraints allow, rappidAI publishes model artifacts, documentation, evaluation notes and implementation details so that experiments can be inspected and reproduced.",
    actions: [
      { label: "Hugging Face", linkKey: "huggingFace" },
      { label: "GitHub", linkKey: "github" },
    ] satisfies readonly ExternalCallToAction[],
  },
  founder: {
    eyebrow: "FOUNDER",
    headline: "Independent research, built from Berlin.",
  },
  contact: {
    eyebrow: "CONTACT",
    headline: "Interested in the research?",
    text: "For technical discussions, collaboration enquiries or questions about the models, contact rappidAI directly.",
    action: {
      label: "Contact rappidAI",
      href: "/contact",
    } satisfies InternalCallToAction,
  },
} as const;

export const modelsPageContent = {
  introduction: {
    eyebrow: "MODELS",
    title: "Compact model experiments, documented clearly.",
    description:
      "Explore rappidAI's experimental pilots and the next research phase in focused open-weight adaptation.",
  } satisfies PageIntroduction,
  filterLabel: "Filter models",
  missingParameterLabel: "Final parameter size not yet defined",
  missingLicenseLabel: "Licensing information has not been supplied.",
  missingLinksLabel: "No public model release link is available.",
} as const;

export const researchPageContent = {
  introduction: {
    eyebrow: "RESEARCH",
    title: "Research shaped by practical constraints.",
    description:
      "rappidAI investigates compact architectures, targeted adaptation, efficient inference and transparent evaluation.",
  } satisfies PageIntroduction,
  direction: {
    eyebrow: "CURRENT DIRECTION",
    title: "From pretraining experiments to focused adaptation.",
    text: "The current direction focuses on adapting compact open-weight foundation models for narrower, measurable use cases and efficient German-language use.",
  },
  philosophy: {
    eyebrow: "DEVELOPMENT PHILOSOPHY",
    title: "Useful systems should be judged by more than scale.",
    text: "The goal is not to imitate frontier-scale laboratories, but to investigate where smaller systems can be genuinely useful, local and transparent about their limits.",
  },
  methodology: {
    eyebrow: "METHODOLOGY",
    title: "A repeatable path from question to limitation.",
  },
  experimentLogs: {
    eyebrow: "EXPERIMENT LOGS",
    title: "Model development without invented milestones.",
    noDatesNotice: "No publication dates have been supplied.",
  },
  notes: {
    eyebrow: "RESEARCH NOTES",
    title: "Questions for documented investigation.",
  },
  roadmap: {
    eyebrow: "ROADMAP",
    title: "An undated progression of research work.",
    noDatesNotice: "No target dates have been supplied.",
  },
  evaluation: {
    eyebrow: "HONEST EVALUATION",
    title: "Limitations belong in the result.",
  },
} as const;

export const aboutPageContent = {
  introduction: {
    eyebrow: "ABOUT",
    title: "An independent research initiative at an early stage.",
    description:
      "rappidAI is an early-stage independent AI research initiative developing compact and specialized language-model systems. Its work combines experimentation, open-weight adaptation, local deployment and transparent documentation.",
  } satisfies PageIntroduction,
  whatItIs: {
    eyebrow: "WHAT RAPPIDAI IS",
    title: "Learning through real model development.",
    text: "rappidAI develops compact language-model experiments and investigates focused adaptation, efficient inference and practical local deployment.",
  },
  whatItIsNot: {
    eyebrow: "WHAT RAPPIDAI IS NOT",
    title: "Experimental work is not production capability.",
    text: "rappidAI is not presented as a frontier-scale laboratory. Its pilot models are experimental, unreliable in factual output and not intended as production assistants or for high-stakes decisions.",
  },
  whyCompactModelsMatter: {
    eyebrow: "WHY COMPACT MODELS",
    title: "Capability should be considered alongside resources.",
    text: "Compact systems can support research into private, offline and resource-efficient inference without relying exclusively on permanent cloud infrastructure.",
  },
  openWeightDirection: {
    eyebrow: "CURRENT DIRECTION",
    title: "Focused open-weight adaptation.",
    text: "The next research phase investigates targeted adaptation of stronger open-weight foundations for efficient German-language use.",
  },
  experimentalNotice: {
    eyebrow: "EXPERIMENTAL OUTPUTS",
    title: "Limitations are communicated directly.",
    text: "Research outputs may be limited, repetitive, factually unreliable and inconsistent. They should be inspected as experiments, not treated as production systems.",
  },
} as const;

export const contactPageContent = {
  introduction: {
    eyebrow: "CONTACT",
    title: "Interested in the research?",
    description:
      "For technical discussions, collaboration enquiries or questions about the models, contact rappidAI directly.",
  } satisfies PageIntroduction,
  methodsHeading: "Contact and research profiles",
  emailMissingLabel: "Business email has not yet been supplied.",
  enquiryTypes: [
    "Technical questions",
    "Open-source collaboration",
    "Model feedback",
    "Project partnerships",
  ],
  form: {
    heading: "Send an enquiry",
    description:
      "Complete the fields below. If a business email is configured, the form opens your email application; it does not claim that a message was sent.",
    unavailableHeading: "Direct email contact is being prepared.",
    unavailableDescription:
      "The public business email has not yet been supplied, so the enquiry form remains inactive. Until it is configured, use the linked research profiles for public project context.",
    fields: {
      name: { label: "Name", requiredMessage: "Enter your name." },
      email: {
        label: "Email",
        requiredMessage: "Enter your email address.",
        invalidMessage: "Enter a valid email address.",
      },
      subject: { label: "Subject", requiredMessage: "Enter a subject." },
      message: { label: "Message", requiredMessage: "Enter a message." },
    },
    submitLabel: "Continue in email app",
    openingEmailLabel: "Opening your email application. Your message has not been sent yet.",
    unavailableMessage:
      "Message sending is not configured. Your message has not been sent.",
  },
} as const;

export const imprintPageContent = {
  introduction: {
    eyebrow: "IMPRINT",
    title: "Provider information",
    description:
      "This page is reserved for the legally required provider information for rappidAI research.",
  } satisfies PageIntroduction,
  identityLabel: "Project identity",
  locationLabel: "General location",
  locationQualification:
    "Berlin, Germany is a general project location, not a legal service address.",
  contactLabel: "Contact",
} as const;

export const privacyPageContent = {
  introduction: {
    eyebrow: "PRIVACY",
    title: "Privacy information",
    description:
      "This page describes how the website handles personal data in its current implementation.",
  } satisfies PageIntroduction,
  sections: [
    {
      id: "controller",
      title: "Controller information",
      text: "Jonas Désiré Cikemgil is identified as the responsible operator. A service address and public business email still need to be supplied before publication.",
    },
    {
      id: "hosting",
      title: "Hosting",
      text: "A hosting provider has not been supplied. Hosting and server-log information must be added when deployment is configured.",
    },
    {
      id: "contact",
      title: "Contact form",
      text: "The website does not claim to submit the contact form to a server. When a business email is configured, the form opens the visitor's email application through a mailto link.",
    },
    {
      id: "analytics",
      title: "Analytics and marketing cookies",
      text: "No analytics or marketing cookies are configured in this project.",
    },
    {
      id: "external-links",
      title: "External links",
      text: "The website links to configured research profiles on Hugging Face and GitHub. Their operators are responsible for their own privacy practices when visitors follow those links.",
    },
  ],
} as const;

export const pageMetadata = {
  "/": {
    title: "rappidAI Research — Compact and Local AI Models",
    description:
      "Independent AI research focused on compact language models, open-weight adaptation, efficient inference and local deployment.",
  },
  "/models": {
    title: "Models — rappidAI Research",
    description:
      "Explore rappidAI's experimental compact language models and in-development open-weight adaptation research.",
  },
  "/models/quantum-1-pilot": {
    title: "quantum-1-pilot — rappidAI Research",
    description:
      "Model information and documented limitations for the experimental 49.3M-parameter quantum-1-pilot.",
  },
  "/models/quantum-1-6-pilot": {
    title: "quantum-1.6-pilot — rappidAI Research",
    description:
      "Technical details, local inference guidance and documented limitations for the experimental 49.3M-parameter quantum-1.6-pilot.",
  },
  "/models/quantum-1-echelon": {
    title: "quantum-1-echelon — rappidAI Research",
    description:
      "The in-development rappidAI research phase focused on efficient German-language open-weight adaptation.",
  },
  "/research": {
    title: "Research — rappidAI Research",
    description:
      "Research directions, methodology, experiment logs and evaluation principles for rappidAI's compact-model work.",
  },
  "/about": {
    title: "About — rappidAI Research",
    description:
      "Learn about rappidAI, an early-stage independent AI research initiative based in Berlin.",
  },
  "/contact": {
    title: "Contact — rappidAI Research",
    description:
      "Contact rappidAI about technical discussions, collaboration enquiries or model questions.",
  },
  "/imprint": {
    title: "Imprint — rappidAI Research",
    description: "Provider information for the rappidAI research website.",
  },
  "/privacy": {
    title: "Privacy — rappidAI Research",
    description:
      "Privacy information for the rappidAI research website.",
  },
} as const satisfies Readonly<Record<SiteRoute, PageMetadata>>;

export function getPageMetadata(route: SiteRoute): PageMetadata {
  return pageMetadata[route];
}
