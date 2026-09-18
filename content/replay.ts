const repository = "https://github.com/rappidAI-Research/rappid-replay";
const revision = "dc9c2b953d84074164e752dc13ea1f8d538f3056";
const source = `${repository}/blob/${revision}`;

export const replayLinks = {
  repository,
  snapshot: `${repository}/tree/${revision}`,
  readme: `${source}/README.md`,
  architecture: `${source}/docs/adr/README.md`,
  restore: `${source}/docs/adr/ADR-028-verified-staged-restore.md`,
  rerun: `${source}/docs/adr/ADR-029-exact-branch-live-rerun.md`,
  diff: `${source}/docs/adr/ADR-030-deterministic-multidimensional-diff.md`,
} as const;
