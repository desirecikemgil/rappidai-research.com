const repository = "https://github.com/rappidAI-Research/rappid-replay";
const revision = "735d124647e3c5f64cfb99723942eef94caf978a";
const source = `${repository}/blob/${revision}`;

export const replayLinks = {
  repository,
  snapshot: `${repository}/tree/${revision}`,
  readme: `${source}/README.md`,
  license: `${source}/LICENSE`,
  architecture: `${source}/docs/adr/README.md`,
  restore: `${source}/docs/adr/ADR-028-verified-staged-restore.md`,
  rerun: `${source}/docs/adr/ADR-029-exact-branch-live-rerun.md`,
  diff: `${source}/docs/adr/ADR-030-deterministic-multidimensional-diff.md`,
} as const;
