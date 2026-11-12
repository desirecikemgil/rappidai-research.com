# Research documentation review: 2 November 2026

## Scope

Refreshed Reproducibility, Data & training, Responsible use and Licensing in
English and German. The public research notes and historical pilot/Echelon
results retain their existing dates, hashes and evidence boundaries. The new
documentation review date is independent of the legal/identity review date in
`siteConfig.lastReviewed`.

Recent project chats were consulted for the intended research direction.
Publication claims come from the public sources below. Plans in a chat or a
masterplan are not evidence that training or evaluation has occurred.

## Reviewed sources

- Ghost: [v0.3.0 release](https://github.com/rappidAI-Research/rappid-ghost/releases/tag/v0.3.0),
  source `2184a0e87b7dca161267f5fe596a2dd5d56d189d`. Latest-release lookup
  still returns v0.3.0. The recorded release gate is 25 passed, 0 failed,
  0 skipped on Linux amd64 with Docker Engine. Reused the pinned threat,
  security, benchmark, provenance and license documents in `content/ghost.ts`.
- Sentinel: [status](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/d7354b65063cd07963dcc4753dbd84f81ca8b42d/docs/STATUS.md),
  [governance](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/d7354b65063cd07963dcc4753dbd84f81ca8b42d/docs/DATA_GOVERNANCE.md)
  and [registry](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/d7354b65063cd07963dcc4753dbd84f81ca8b42d/data/registry.yaml).
  Public head remains `d7354b65063cd07963dcc4753dbd84f81ca8b42d`.
  Phase 0, 86 synthetic QuickEval cases, 16 Python coding-regression tasks,
  eight unapproved sources and zero training records. No model comparison,
  private holdout, adapter, training run, patch evaluation or project license.
- Replay: retained the [reviewed source](https://github.com/rappidAI-Research/rappid-replay/tree/dc9c2b953d84074164e752dc13ea1f8d538f3056)
  already used by the website. ADR-028/029/030 define staged restore, live rerun
  and multidimensional diff; its [license](https://github.com/rappidAI-Research/rappid-replay/blob/dc9c2b953d84074164e752dc13ea1f8d538f3056/LICENSE)
  is Apache-2.0. This does not claim identical live output from external services
  or that the pinned revision is the latest development head.
- Quantum: current source inspected at
  `0cd95ad9414d1c38ac09f7a30d3587daa0408cb7`.
  [GGUF setup](https://github.com/rappidAI-Research/quantum-models/blob/f79c395c1da82827a63706ea9b55c913c073bd91/docs/gguf-export.md)
  documents a separate llama.cpp checkout pinned to
  `d4cff114c0084f1fbc9b4c62717eca8fb2ae494a`. Corrected the stale setup warning;
  missing historical pilot run manifests remain missing. Older immutable
  evidence links are retained rather than relabelled as new results.
- Pilot artifact licenses: retained the explicit
  [maintainer decision](https://github.com/rappidAI-Research/quantum-models/blob/f79c395c1da82827a63706ea9b55c913c073bd91/MODEL_LICENSES.md).
  No new reuse grant is made for models, tokenizers, data or visual assets.

## Publication decisions

- Distinguish software checks, captured execution state, artifact integrity and
  model-quality evaluation. Neither GhostBench nor the Sentinel regex baseline
  is presented as trained-model detection performance.
- Describe Sentinel source approval and repository-disjoint splits as governance
  requirements, not completed data preparation. Keep evaluation-only sources out
  of training and retain the absence of a private holdout.
- Add project-specific operational guidance and separate source/artifact license
  records. No license choice, certification or new legal conclusion is invented.
- Replace the elapsed October 2026 Alpha target in current facts on Home, About
  and model pages with an unannounced release date. Preserve the old target as
  historical context. Do not invent a replacement date or imply a release.
- Make documentation directly reachable from Research. The shared GitHub profile
  opens the organization; individual project/evidence buttons retain their exact
  repository or immutable source targets. Hugging Face model buttons remain
  scoped to the two actual public pilot repositories.

## Implementation

`content/documentation.ts` holds source-linked topic sections rendered through
the shared `DocumentationSections` component. Existing typography, surfaces,
navigation, routes and mobile table behavior are retained. German text follows
`docs/german-style-guide.md`. Metadata, status, FAQ, README and linked Markdown
records are updated alongside the visible pages.

## Validation

- Formatting, ESLint, TypeScript and production build passed (54 prerendered entries).
- Unit/content checks: 53 passed, including German copy and immutable source-link checks.
- Browser suite: 111 passed, one optional Ghost external-asset test skipped by default.
  The new documentation checks cover both languages at 320, 375, 414, 768 and
  1280 CSS pixels, source destinations, navigation and serious/critical axe findings.
- Internal Markdown links passed; the separate external checker passed all 139 URLs,
  including resolved source links and Ghost release assets.
- Manual browser inspection covered the German documentation at desktop and phone
  widths. No new visual system, dependencies or animations were introduced.
- The existing mobile-menu contrast test initially sampled the 200 ms entrance
  fade. It now waits for opacity 1 before checking resting contrast; the full
  browser suite passed after that test synchronization change.

These results verify the local production build. They do not by themselves
verify a production deployment or execute any model, Ghost or Replay workload.
