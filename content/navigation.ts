/**
 * Site information architecture. Every URL here already exists; the groups
 * decide how pages are presented in the header, mobile menu, footer and the
 * documentation sidebar.
 */
export type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly description: string;
};

export type NavigationGroup = {
  readonly id: "models" | "research" | "tools" | "about";
  readonly label: string;
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly NavigationItem[];
};

export const navigationGroups = [
  {
    id: "models",
    label: "Models",
    href: "/models",
    title: "Quantum models",
    description:
      "A security-specialized model in development, the Echelon model line and two public pilot releases.",
    items: [
      {
        label: "Quantum Sentinel-Alpha",
        href: "/models/quantum-sentinel-alpha",
        description: "Security-specialized code model · Alpha in development",
      },
      {
        label: "Quantum 1 Echelon",
        href: "/models/quantum-1-echelon",
        description: "German-first model line · ~1B target · Coming Soon",
      },
      {
        label: "quantum-1.6-pilot",
        href: "/models/quantum-1-6-pilot",
        description: "Public experimental release · 49.3M parameters",
      },
      {
        label: "quantum-1-pilot",
        href: "/models/quantum-1-pilot",
        description: "Public experimental release · 49.3M parameters",
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    href: "/research",
    title: "Research and evidence",
    description:
      "Findings, negative results and the artifacts behind every public claim.",
    items: [
      {
        label: "Evidence ledger",
        href: "/research",
        description: "What is published, partial or still unavailable.",
      },
      {
        label: "Publications",
        href: "/resources/publications",
        description:
          "Source-linked research notes that separate observations, negative results and open questions.",
      },
      {
        label: "Reproducibility",
        href: "/resources/reproducibility",
        description:
          "Pinned revisions, GGUF checksums, reference commands and explicit gaps in the public run record.",
      },
      {
        label: "Data & training",
        href: "/resources/data-and-training",
        description:
          "Dataset sources, configured targets, smoke evidence, filtering and missing final manifests.",
      },
      {
        label: "Project status",
        href: "/resources/status",
        description:
          "Model-line maturity, the reviewed evidence snapshot, open artifacts and next documentation work.",
      },
      {
        label: "All resources",
        href: "/resources",
        description: "The complete documentation directory.",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    href: "/tools",
    title: "Agent infrastructure",
    description:
      "Two open-source tools: Ghost controls access to the environment, Replay preserves inspectable technical state.",
    items: [
      {
        label: "rappidAI Ghost",
        href: "/tools/ghost",
        description:
          "Control agent access with isolation, deception, prompt signals and evidence.",
      },
      {
        label: "rappidAI Replay",
        href: "/tools/replay",
        description:
          "Record, restore, branch and compare technical execution state.",
      },
      {
        label: "Tool overview",
        href: "/tools",
        description:
          "Understand the different jobs of Ghost and Replay before diving in.",
      },
    ],
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    title: "rappidAI",
    description:
      "rappidAI is a self-funded, founder-led, early-stage AI research and development initiative based in Berlin.",
    items: [
      {
        label: "About rappidAI",
        href: "/about",
        description:
          "Understand the initiative, its structure and its research scope.",
      },
      {
        label: "Responsible use",
        href: "/resources/responsible-use",
        description:
          "Known failure modes, unmeasured risks, excluded uses and secure artifact handling.",
      },
      {
        label: "Licensing",
        href: "/resources/licensing",
        description:
          "A material-by-material record of what is licensed, governed elsewhere or still unresolved.",
      },
      {
        label: "FAQ",
        href: "/resources/faq",
        description:
          "Plain-language answers about base completion, GGUF, Echelon, privacy, evidence and licensing.",
      },
      {
        label: "Contact",
        href: "/contact",
        description:
          "Choose email, Hugging Face or GitHub for the right context.",
      },
    ],
  },
] as const satisfies readonly NavigationGroup[];

/** Documentation sidebar: the research centre and legal pages. */
export const documentationNavigation = [
  {
    title: "Research",
    items: [
      { label: "Evidence ledger", href: "/research" },
      { label: "Publications", href: "/resources/publications" },
      {
        label: "From 100M to 600M German Tokens",
        href: "/resources/publications/from-100m-to-600m-german-tokens",
      },
      { label: "Reproducibility", href: "/resources/reproducibility" },
      { label: "Data & training", href: "/resources/data-and-training" },
      { label: "Project status", href: "/resources/status" },
    ],
  },
  {
    title: "Use and reuse",
    items: [
      { label: "Responsible use", href: "/resources/responsible-use" },
      { label: "Licensing", href: "/resources/licensing" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "All resources", href: "/resources" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Imprint", href: "/imprint" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const;

export function groupForPath(pathname: string) {
  const path = pathname.replace(/^\/de(?=\/|$)/, "") || "/";
  const exact = navigationGroups.find(
    (group) =>
      path === group.href || group.items.some((item) => path === item.href),
  );
  if (exact) return exact;
  return navigationGroups.find(
    (group) =>
      path.startsWith(`${group.href}/`) ||
      group.items.some(
        (item) =>
          item.href !== "/resources" && path.startsWith(`${item.href}/`),
      ),
  );
}
