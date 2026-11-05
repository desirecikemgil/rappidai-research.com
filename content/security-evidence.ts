// Historical review of 28 October 2026. The false-positive research note is a dated record
// and keeps citing this snapshot; do not move it to a newer revision.
export const securityReview = {
  date: "2026-10-28",
  sentinelCommit: "d7354b65063cd07963dcc4753dbd84f81ca8b42d",
  sentinelRepository:
    "https://github.com/rappidAI-Research/quantum-sentinel-alpha",
} as const;

// Current review of 4 November 2026: the Sentinel main branch after the foundation
// decision, Sentinel Garden, the QLoRA pipeline and the full-population dataset seed
// (pull requests #4, #5 and #6). Snapshot facts, not a claim of continuous freshness.
export const sentinelReview = {
  date: "2026-11-04",
  sentinelCommit: "3c46606d51aa5e87d05e52d72898c612627535a2",
  sentinelRepository: securityReview.sentinelRepository,
} as const;

const historicalSource = `${securityReview.sentinelRepository}/blob/${securityReview.sentinelCommit}`;
export const sentinelHistoricalLinks = {
  status: `${historicalSource}/docs/STATUS.md`,
} as const;

const sentinelSource = `${sentinelReview.sentinelRepository}/blob/${sentinelReview.sentinelCommit}`;
export const sentinelResearchLinks = {
  repository: sentinelReview.sentinelRepository,
  snapshot: `${sentinelReview.sentinelRepository}/tree/${sentinelReview.sentinelCommit}`,
  status: `${sentinelSource}/docs/STATUS.md`,
  architecture: `${sentinelSource}/README.md`,
  finding: `${sentinelSource}/data/schemas/finding.schema.json`,
  governance: `${sentinelSource}/docs/DATA_GOVERNANCE.md`,
  sources: `${sentinelSource}/data/registry.yaml`,
  bakeoff: `${sentinelSource}/docs/BAKEOFF.md`,
  cases: `${sentinelSource}/eval/sentinelbench/quickeval_v1.jsonl`,
  runner: `${sentinelSource}/sentinel/eval/run_model.py`,
  foundation: `${sentinelSource}/docs/FOUNDATION.md`,
  foundationConfig: `${sentinelSource}/configs/model/foundation.yaml`,
  garden: `${sentinelSource}/docs/SENTINEL_GARDEN.md`,
  gardenConfig: `${sentinelSource}/configs/garden/seed_v1.yaml`,
  splitPolicy: `${sentinelSource}/configs/garden/split_policy.yaml`,
  seedReport: `${sentinelSource}/data/garden/seed_v1/REPORT.md`,
  seedStats: `${sentinelSource}/data/garden/seed_v1/stats.json`,
  auditReport: `${sentinelSource}/data/garden/seed_v1/AUDIT_REPORT.md`,
  manualReview: `${sentinelSource}/data/garden/seed_v1/audit/manual_review.yaml`,
  rightsReview: `${sentinelSource}/docs/RIGHTS_REVIEW.md`,
  reviewQueue: `${sentinelSource}/data/garden/seed_v1/REVIEW_QUEUE.md`,
  externalResources: `${sentinelSource}/data/garden/seed_v1/EXTERNAL_RESOURCES.json`,
  syntax: `${sentinelSource}/sentinel/garden/syntax.py`,
  training: `${sentinelSource}/docs/TRAINING.md`,
  trainingConfig: `${sentinelSource}/configs/train/qlora_qwen35_9b.yaml`,
  trainer: `${sentinelSource}/sentinel/train/trainer.py`,
  moduleList: `${sentinelSource}/configs/train/qwen35_9b_linear_modules.txt`,
} as const;
