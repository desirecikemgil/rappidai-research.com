// Historical review of 28 October 2026. The false-positive research note is a dated record
// and keeps citing this snapshot; do not move it to a newer revision.
export const securityReview = {
  date: "2026-10-28",
  sentinelCommit: "d7354b65063cd07963dcc4753dbd84f81ca8b42d",
  sentinelRepository:
    "https://github.com/rappidAI-Research/quantum-sentinel-alpha",
} as const;

// Current review of 24 November 2026: Sentinel Garden v3, the training authorization of
// 15 and 24 November 2026 and the training-machine materialization. Training data is
// approved; no trained model, evaluation result or GPU run exists at this revision.
export const sentinelReview = {
  date: "2026-11-24",
  sentinelCommit: "cec6f961272f0e5b3b83ed7d645591b90cf42a0a",
  sentinelRepository: securityReview.sentinelRepository,
} as const;

const historicalSource = `${securityReview.sentinelRepository}/blob/${securityReview.sentinelCommit}`;
export const sentinelHistoricalLinks = {
  status: `${historicalSource}/docs/STATUS.md`,
} as const;

/** Evidence links at one Sentinel revision, for the Garden dataset version current there. */
function researchLinks(revision: string, dataset: "seed_v1" | "seed_v3") {
  const sentinelSource = `${sentinelReview.sentinelRepository}/blob/${revision}`;
  const data = `${sentinelSource}/data/garden/${dataset}`;
  return {
    repository: sentinelReview.sentinelRepository,
    snapshot: `${sentinelReview.sentinelRepository}/tree/${revision}`,
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
    gardenConfig: `${sentinelSource}/configs/garden/${dataset}.yaml`,
    splitPolicy: `${sentinelSource}/configs/garden/split_policy.yaml`,
    seedReport: `${data}/REPORT.md`,
    seedStats: `${data}/stats.json`,
    auditReport: `${data}/AUDIT_REPORT.md`,
    manualReview: `${data}/audit/manual_review.yaml`,
    rightsReview: `${sentinelSource}/docs/RIGHTS_REVIEW.md`,
    reviewQueue: `${data}/REVIEW_QUEUE.md`,
    externalResources: `${data}/EXTERNAL_RESOURCES.json`,
    syntax: `${sentinelSource}/sentinel/garden/syntax.py`,
    training: `${sentinelSource}/docs/TRAINING.md`,
    trainingConfig: `${sentinelSource}/configs/train/qlora_qwen35_9b.yaml`,
    trainer: `${sentinelSource}/sentinel/train/trainer.py`,
    moduleList: `${sentinelSource}/configs/train/qwen35_9b_linear_modules.txt`,
  } as const;
}

const currentSource = `${sentinelReview.sentinelRepository}/blob/${sentinelReview.sentinelCommit}`;

export const sentinelResearchLinks = {
  ...researchLinks(sentinelReview.sentinelCommit, "seed_v3"),
  // Documents that exist from Garden v2, v3 and the training authorization onwards.
  gardenV2: `${currentSource}/docs/GARDEN_V2.md`,
  gardenV3: `${currentSource}/docs/GARDEN_V3.md`,
  trainingAuthorization: `${currentSource}/docs/TRAINING_AUTHORIZATION.md`,
  cohortRightsReview: `${currentSource}/docs/TRAINING_COHORT_RIGHTS_REVIEW.md`,
  cohortReview: `${currentSource}/data/garden/seed_v3/cohort/COHORT_REVIEW.md`,
  approvals: `${currentSource}/data/garden/approvals.yaml`,
  patchSupervision: `${currentSource}/docs/PATCH_SUPERVISION.md`,
  multiCommitTests: `${currentSource}/tests/test_garden_v3_multicommit.py`,
} as const;

// Published research keeps its original evidence snapshot.
export const sentinelGardenPublicationLinks = researchLinks(
  "3c46606d51aa5e87d05e52d72898c612627535a2",
  "seed_v1",
);
