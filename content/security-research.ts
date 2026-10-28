import { ghostLinks, ghostRelease } from "./ghost";

import { sentinelResearchLinks } from "./security-evidence";
export { sentinelResearchLinks, securityReview } from "./security-evidence";

export const securityResearch = {
  title: "Agent security and verified code review",
  reviewed: "Reviewed 28 October 2026",
  introduction:
    "Two complementary research directions: controlling an agent's access with Ghost, and investigating evidence-backed vulnerability review with Quantum Sentinel-Alpha.",
  projects: [
    {
      name: "rappidAI Ghost",
      status: `${ghostRelease.version} · Released · Experimental`,
      question: "What can a runtime enforce without trusting the model?",
      evidence:
        "Ghost combines Docker isolation, synthetic SHADOW resources, exact-host HTTP/HTTPS policy, bounded prompt-injection signals, scoped ASK approvals and runtime resource limits. Enforcement is deterministic and independent of an LLM.",
      method:
        "The v0.3.0 CI gate recorded 25 passed, 0 failed and 0 skipped GhostBench scenarios. These are named security-property checks in a controlled environment, not an attack-detection accuracy score.",
      boundary:
        "Prompt signals can be wrong. A decoy access does not prove intent, causal influence or exfiltration. Containment affects subsequent decisions and does not revoke established connections. Linux amd64 with Docker Engine is the runtime-tested target; arm64 binaries are cross-built, and macOS Docker Desktop is outside the release gate.",
      href: "/tools/ghost",
      linkLabel: "Explore Ghost",
      sources: [
        { label: "Release", url: ghostLinks.release },
        { label: "Security model", url: ghostLinks.security },
        { label: "GhostBench methodology", url: ghostLinks.benchmarks },
        { label: "Observed CI run", url: ghostLinks.gate },
      ],
    },
    {
      name: "Quantum Sentinel-Alpha",
      status: "Phase 0 · Foundation · No trained release",
      question: "Can a reviewer reject plausible but unsupported findings?",
      evidence:
        "The public repository contains a versioned finding contract, a default-deny source registry, a strict parser/scorer, a model runner and QuickEval v1: 86 synthetic cases, comprising 37 vulnerable, 34 hard-negative and 15 abstention cases. A further 16 Python tasks check coding regression.",
      method:
        "The prepared comparison keeps cases, prompt, parser, scorer and generation settings shared between Qwen3.5-4B and Qwen3.5-9B. Neither candidate is frozen. The engine design separates repository context and static signals from model-generated candidates and subsequent verification; the full engine remains planned.",
      boundary:
        "The status report records no model evaluation, adapter or training run, and no training-approved data source. Existing regex-baseline results validate the harness only. The public synthetic cases are not a private holdout; the holdout has not started. Patch evaluation is not implemented. Detection quality, false-positive rate, model latency and VRAM use are not established.",
      href: "/models/quantum-sentinel-alpha",
      linkLabel: "Explore Sentinel-Alpha",
      sources: [
        { label: "Repository status", url: sentinelResearchLinks.status },
        { label: "Finding contract", url: sentinelResearchLinks.finding },
        { label: "Comparison protocol", url: sentinelResearchLinks.bakeoff },
        { label: "Data governance", url: sentinelResearchLinks.governance },
      ],
    },
  ],
  noteTitle: "The False Positive Problem in AI Vulnerability Detection",
  noteText:
    "A technical research note on hard negatives, vulnerable/fixed pairs, base rates, precision and recall. It reports published research and a proposed evaluation approach, with no new Sentinel performance claim.",
  noteHref:
    "/resources/publications/false-positive-problem-in-ai-vulnerability-detection",
} as const;

export const securityResources = {
  title: "Security research resources",
  introduction:
    "Start with a released Ghost example or inspect Sentinel's evaluation infrastructure. Commands below are reference workflows from the pinned sources, not executions performed by this website.",
  groups: [
    {
      title: "Ghost: installation, policy and evidence",
      description:
        "Use the v0.3.0 release assets and SHA256SUMS, or build the pinned source. Go 1.26.8 or a newer supported patch is required for a source build. Runtime examples require Docker and a non-root UID/GID; an agent executable must exist inside the runtime image.",
      code: 'ghost init\nghost run -- echo "hello from ghost"\nghost bench --scenario dynamic-containment\nghost inspect latest',
      links: [
        { label: "Release and checksums", url: ghostLinks.release },
        { label: "Installation and quick start", url: ghostLinks.readme },
        { label: "Configuration example", url: ghostLinks.configuration },
        { label: "Example projects", url: ghostLinks.examples },
        { label: "Threat model", url: ghostLinks.threat },
      ],
    },
    {
      title: "Sentinel: reproduce the engineering baseline",
      description:
        "From a checkout of the reviewed Sentinel revision, install its documented Python dependencies first. This CPU baseline tests the evaluation path; it does not load a model or demonstrate security capability. Paid GPU comparisons and training are separate work.",
      code: "python -m sentinel.foundation\npython -m sentinel.eval.run_model --backend baseline \\\n  --cases eval/sentinelbench/quickeval_v1.jsonl \\\n  --output runs/baseline.json",
      links: [
        {
          label: "Repository and setup",
          url: sentinelResearchLinks.architecture,
        },
        {
          label: "Reviewed source snapshot",
          url: sentinelResearchLinks.snapshot,
        },
        { label: "QuickEval cases", url: sentinelResearchLinks.cases },
        { label: "Evaluation runner", url: sentinelResearchLinks.runner },
        { label: "Comparison protocol", url: sentinelResearchLinks.bakeoff },
        { label: "Data governance", url: sentinelResearchLinks.governance },
      ],
    },
  ],
} as const;
