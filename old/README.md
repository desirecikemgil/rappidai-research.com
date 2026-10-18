# Previous website (backup)

This folder is a frozen copy of the rappidAI website as it was before the
October 2026 rebuild (repository commit `d5009b7`, "Refine Sentinel-Alpha
typography and left alignment"). It is kept only as a reference and fallback.

- It is not built, tested, linted or deployed with the live site; the root
  tooling ignores `old/`.
- Repository-wide documents (`docs/`, `model_cards/`, licensing, governance and
  the root README) stay at the repository root and are not duplicated here.
- Do not edit content here. Current facts and copy live in the root `content/`
  folder.

To run the previous site locally:

```bash
cd old
pnpm install
pnpm dev
```

The previous version is also available in the Git history at commit `d5009b7`.
