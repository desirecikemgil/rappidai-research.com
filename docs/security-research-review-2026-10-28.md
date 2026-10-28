# Security research review: 28 October 2026

## Reviewed sources and claim boundaries

Website base: `42b9d774a41781338c7dbc7c4bd44517866d2dc4` on `main`.
The false-positive note already existed at that revision; this change updates
its implementation status and adds an evaluation protocol. The pilot note,
all existing routes and the model-page layouts are retained.

### Ghost

- Latest published release checked: [v0.3.0](https://github.com/rappidAI-Research/rappid-ghost/releases/tag/v0.3.0), published 21 September 2026.
- Annotated tag resolves to `2184a0e87b7dca161267f5fe596a2dd5d56d189d`.
- [CI run 35648771011](https://github.com/rappidAI-Research/rappid-ghost/actions/runs/35648771011) succeeded at that commit. Its Docker job log records `passed: 25`, `failed: 0`, `skipped: 0`. This is historical CI evidence, not a benchmark rerun during this website change.
- Release assets: Linux amd64, Linux arm64 and `SHA256SUMS`. Only Linux amd64 with Docker Engine is the runtime-tested release target. Cross-built arm64 artifacts do not prove equivalent runtime coverage.
- Capabilities and exclusions are linked through the existing `content/ghost.ts` snapshot: Docker isolation, SHADOW, HTTP/HTTPS policy, prompt/trust signals, scoped ASK approvals, resource limits and persisted evidence.
- These checks do not measure general detection accuracy or prove intent, causation, exfiltration prevention, universal containment or production readiness.

Ghost `main` was also inspected at `470e7a366f8d556104d1193381d70870838113fb`.
Release copy remains tied to the published tag, rather than borrowing unreleased changes.

### Quantum Sentinel-Alpha

The reviewed public `main` revision is
[`d7354b65063cd07963dcc4753dbd84f81ca8b42d`](https://github.com/rappidAI-Research/quantum-sentinel-alpha/tree/d7354b65063cd07963dcc4753dbd84f81ca8b42d).
Its `docs/STATUS.md`, last updated 7 October, is the operational status source;
28 October is the date of this review, not a new milestone date.

- Implemented: finding schema; default-deny data-source registry; strict parser/scorer; model runner; run artifacts; comparison tooling.
- QuickEval v1: 86 public synthetic cases (37 vulnerable, 34 hard negative, 15 abstention), including 30 vulnerable/secure neighbour pairs. The coding-regression suite contains 16 Python tasks.
- The Qwen3.5-4B/9B comparison is prepared and revision-pinned, but not run. Neither foundation is frozen. No adapter, training run or Sentinel weights are published in the reviewed record.
- Regex-baseline results are engineering checks. They cannot establish model detection performance, latency, VRAM usage, a successful model comparison or training progress.
- The source registry has no training-approved source. Public synthetic cases are evaluation-only and are not a private holdout. Private holdout work has not started; patch evaluation is unimplemented.
- The full repository-security engine, trained rejection/abstention behaviour, local model release, SARIF pipeline and optional Ghost integration remain development directions.
- A schema confidence field is not evidence of calibrated confidence; a verification status field is not evidence of completed verification.

## Project documents and scientific sources

The supplied Ghost v0.1 architecture document and the Sentinel 1 v1.1 Lean
masterplan (6 October) were reviewed as historical planning context. Current
public repository/release evidence takes precedence for implementation claims.
No private financial or infrastructure planning details are republished.
The separate `quantum-models` repository was also inspected for model lineage;
historical pilot/Echelon source pins were intentionally retained.

The existing note's distinctions between patterns and exploitability, vulnerable/fixed
pairs and dataset leakage were checked against its primary sources, including
[Risse and Böhme, USENIX Security 2024](https://www.usenix.org/conference/usenixsecurity24/presentation/risse),
[PrimeVul](https://arxiv.org/abs/2403.18624) and
[MITRE CWE-89](https://cwe.mitre.org/data/definitions/89.html).
The new protocol is a methodological proposal, not a completed experiment.
It specifies evaluation units, fixed comparison contracts, confusion counts,
abstention/invalid-output accounting, grouped splits and separate patch checks.
No DOI, peer review or new benchmark result is claimed for the research note.
The hypothetical no-finding example now correctly reports F1 = 0 while
precision is undefined; the old OWASP wiki reference is replaced by the
current official project page.

## Maintenance and delivery

`content/security-evidence.ts` owns immutable Sentinel links and is included in
the resolved-module external-link checker. `content/security-research.ts` owns
the new hub copy; German strings follow the existing dictionary mechanism.
The historical pilot/Echelon review stamp remains scoped to its historical
source record; the security sections carry their own 28 October review date.

At inspection, GitHub reported two successful Vercel production deployments
for the website base commit (`rappidai-research-com` and
`rappidai-research-com-blcy`). The public domain was opened and matched the
current light documentation layout. This change does not alter deployment
configuration, dependencies, permissions or hosting.

Publish by reviewing and merging the feature PR into `main`, then verifying
the resulting Vercel deployment and the public EN/DE Research, Resources,
status and both publication routes. A preview or a successful build alone
does not prove that the custom domain serves the merged commit.
