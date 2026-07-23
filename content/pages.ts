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
      "rappidAI documents compact German-language model experiments, public GGUF releases and the in-development quantum-1-echelon training pipeline. The two public Quantum pilots are experimental base-completion models.",
    supportingText:
      "The work is intended for developers, researchers, students and builders investigating small-model training, documented evaluation and local deployment with limited compute. The current pilots are research artifacts, not chat assistants or production systems.",
    primaryAction: {
      label: "Explore our models",
      href: "/models",
    } satisfies InternalCallToAction,
    externalAction: {
      label: "View on Hugging Face",
      linkKey: "huggingFace",
    } satisfies ExternalCallToAction,
    status: "Current focus: the quantum-1-echelon data and training pipeline.",
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
    title: "From 49.3M pilot releases to the quantum-1-echelon pipeline.",
  },
  currentResearch: {
    eyebrow: "CURRENT RESEARCH",
    title: "Focused questions, practical constraints.",
  },
  openResearch: {
    eyebrow: "OPEN RESEARCH",
    headline: "Open publication is part of the research process.",
    text: "Where licensing and safety constraints allow, rappidAI publishes model artifacts, documentation, evaluation notes and implementation details so that work can be inspected and, when all required artifacts are available, reproduced.",
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
      "Explore two public experimental pilot releases and the source-linked, in-development quantum-1-echelon pipeline.",
  } satisfies PageIntroduction,
  filterLabel: "Filter models",
  missingParameterLabel: "Final parameter size not yet defined",
  missingLicenseLabel:
    "No public model release exists, so no model license applies.",
  missingLinksLabel: "No public model release link is available.",
} as const;

export const researchPageContent = {
  introduction: {
    eyebrow: "RESEARCH",
    title: "Research behind the Quantum pilots.",
    description:
      "A source-linked account of the questions, controlled variables, public results, observed limitations and open questions behind quantum-1-pilot and quantum-1.6-pilot.",
  } satisfies PageIntroduction,
} as const;

export const aboutPageContent = {
  introduction: {
    eyebrow: "ABOUT",
    title: "An independent research initiative at an early stage.",
    description:
      "rappidAI is an early-stage independent AI research initiative developing compact language-model experiments and documented training, evaluation and local-inference workflows.",
  } satisfies PageIntroduction,
  whatItIs: {
    eyebrow: "WHAT RAPPIDAI IS",
    title: "Learning through real model development.",
    text: "rappidAI develops compact language-model experiments and investigates training pipelines, evaluation, efficient inference and practical local deployment.",
  },
  whatItIsNot: {
    eyebrow: "WHAT RAPPIDAI IS NOT",
    title: "Experimental work is not production capability.",
    text: "rappidAI is not presented as a frontier-scale laboratory. Its pilot models are experimental, unreliable in factual output and not intended as production assistants or for high-stakes decisions.",
  },
  whyCompactModelsMatter: {
    eyebrow: "WHY COMPACT MODELS",
    title: "Capability should be considered alongside resources.",
    text: "Local inference can reduce dependence on external services and may keep prompts on the user’s device. Actual privacy depends on the application, configuration and surrounding infrastructure.",
  },
  projectStructure: {
    eyebrow: "PROJECT STRUCTURE",
    title: "One initiative, one development project, one model series.",
    text: "rappidAI is the research initiative. Lumen is the experimental development project for training and local-inference workflows. Quantum is the model series produced within that work.",
  },
  publishedWork: {
    eyebrow: "PUBLISHED WORK",
    title: "Two public experimental pilots.",
    paragraphs: [
      "rappidAI currently publishes two experimental German base-completion models: quantum-1-pilot and quantum-1.6-pilot. Both contain 49,295,872 parameters and are available as F16 GGUF files for local experimentation. The accompanying public repository documents the training, evaluation and GGUF-export workflow.",
      "The public releases and source repository document the artifacts and intended workflow, but final run manifests and complete training logs are not linked. The releases do not demonstrate production readiness, reliable factual answering or competitiveness with larger general-purpose models.",
    ],
    action: {
      label: "View public models",
      href: "/models",
    } satisfies InternalCallToAction,
  },
  currentDirection: {
    eyebrow: "CURRENT DIRECTION",
    title: "The quantum-1-echelon pipeline.",
    text: "Public work currently includes a 506.3M-parameter base-architecture preflight, tokenizer validation and a Garden data-pipeline smoke test. The full production data run and model training have not been reported as started.",
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
      "For technical questions, model feedback, open-source collaboration or project enquiries, contact rappidAI by email.",
  } satisfies PageIntroduction,
  methodsHeading: "Contact and research profiles",
  emailMissingLabel: "Email contact is unavailable.",
  enquiryTypes: [
    "Technical questions",
    "Open-source collaboration",
    "Model feedback",
    "Project enquiries",
  ],
  form: {
    heading: "Send an enquiry",
    description:
      "Complete the fields below to prepare an email in your own email application. Nothing is transmitted or stored by this website.",
    unavailableHeading: "Direct email contact is unavailable.",
    unavailableDescription:
      "No recipient is configured for the email draft. Use the linked research profiles for public project context.",
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
    openingEmailLabel:
      "Opening your email application. Your message has not been sent yet.",
    unavailableMessage:
      "Message sending is not configured. Your message has not been sent.",
  },
} as const;

export const imprintPageContent = {
  introduction: {
    eyebrow: "IMPRINT",
    title: "Provider information",
    description:
      "Provider information for rappidAI research, an independent initiative operated by Jonas Désiré Cikemgil.",
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
      text: "Jonas Désiré Cikemgil is the controller for this website. A complete service address has not been verified in the project and remains an open required detail.",
    },
    {
      id: "hosting",
      title: "Hosting",
      text: "The live website is hosted on Vercel. Processing location, server-log categories, purposes, legal bases and retention periods still require a verified, deployment-specific privacy review.",
    },
    {
      id: "contact",
      title: "Contact form",
      text: "The contact form has no server endpoint. It validates entries locally and opens the visitor’s email application through a mailto link. The website itself does not transmit or store the entered message.",
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
      "Independent AI research on compact language models, documented training workflows and local inference.",
  },
  "/models": {
    title: "Models — rappidAI Research",
    description:
      "Explore rappidAI's experimental pilot releases and the in-development quantum-1-echelon pipeline.",
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
      "Public architecture, tokenizer and data-pipeline status for the in-development quantum-1-echelon model line.",
  },
  "/research": {
    title: "Research — rappidAI Research",
    description:
      "Source-linked research questions, experiment design, results, limitations and reproducibility artifacts for the Quantum pilot models.",
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
    description: "Privacy information for the rappidAI research website.",
  },
} as const satisfies Readonly<Record<SiteRoute, PageMetadata>>;

export function getPageMetadata(route: SiteRoute): PageMetadata {
  return pageMetadata[route];
}
