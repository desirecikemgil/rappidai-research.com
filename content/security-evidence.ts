// Reviewed 28 October 2026. Snapshot facts, not a claim of continuous freshness.
export const securityReview = {
  date: "2026-10-28",
  sentinelCommit: "d7354b65063cd07963dcc4753dbd84f81ca8b42d",
  sentinelRepository:
    "https://github.com/rappidAI-Research/quantum-sentinel-alpha",
} as const;

const sentinelSource = `${securityReview.sentinelRepository}/blob/${securityReview.sentinelCommit}`;
export const sentinelResearchLinks = {
  repository: securityReview.sentinelRepository,
  snapshot: `${securityReview.sentinelRepository}/tree/${securityReview.sentinelCommit}`,
  status: `${sentinelSource}/docs/STATUS.md`,
  architecture: `${sentinelSource}/README.md`,
  finding: `${sentinelSource}/data/schemas/finding.schema.json`,
  governance: `${sentinelSource}/docs/DATA_GOVERNANCE.md`,
  bakeoff: `${sentinelSource}/docs/BAKEOFF.md`,
  cases: `${sentinelSource}/eval/sentinelbench/quickeval_v1.jsonl`,
  runner: `${sentinelSource}/sentinel/eval/run_model.py`,
} as const;
