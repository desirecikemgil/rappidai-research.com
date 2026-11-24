# Quantum Sentinel-Alpha — model card (development state)

Quantum Sentinel-Alpha is the first security fine-tuning milestone of the
Quantum Sentinel 1 line: a source-code model meant to act as a second security
reviewer. **No model has been trained or evaluated.** This card records the
selected foundation, the approved training data, the prepared training
pipeline and their evidence as reviewed on **24 November 2026** at Sentinel
commit [`cec6f96`](https://github.com/rappidAI-Research/quantum-sentinel-alpha/tree/cec6f961272f0e5b3b83ed7d645591b90cf42a0a).
The earlier October 2026 Alpha target has passed; no revised release date is
announced.

## Model details

| Field                     | Value                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model                     | Quantum Sentinel-Alpha (Quantum Sentinel 1 line)                                                                                                                                             |
| Type                      | Security-specialized code model: LoRA adapter on a decoder-only base model                                                                                                                   |
| Base model                | `Qwen/Qwen3.5-9B` at revision `c202236235762e1c871ad0ccb60c8ee5ba337b9a`, Apache-2.0                                                                                                         |
| Base architecture         | `Qwen3_5ForCausalLM` (text only): 32 layers, 24 Gated DeltaNet and 8 full-attention layers, about 8.95B parameters                                                                           |
| Fine-tuning               | QLoRA: 4-bit NF4 base with double quantization, bf16 compute; LoRA rank 16, alpha 32, dropout 0.05                                                                                           |
| Adapter targets           | 200 modules: `q/k/v/o_proj` of the full-attention layers, `in_proj_qkv/in_proj_z/out_proj` of the DeltaNet layers, `gate/up/down_proj` of all MLPs; 40,108,032 trainable parameters (0.45 %) |
| Languages                 | Python, JavaScript/TypeScript, Go                                                                                                                                                            |
| Training data             | Sentinel Garden v3: 1,464 approved records, 1,871 training and 187 validation examples (detection and patch)                                                                                 |
| Training runs             | None. The pipeline is tested on CPU with a tiny randomly initialised model of the same architecture; the dry run on the approved data passes                                                 |
| Evaluation results        | Not measured                                                                                                                                                                                 |
| Weights, adapter, license | Not released; no artifact license                                                                                                                                                            |

### Foundation decision

Qwen3.5-9B was selected on 4 November 2026 on **expected capability**: more
capacity for multi-step code reasoning, CWE discrimination, evidence and patch
generation, room for abstention behaviour after fine-tuning, a fit for one 48 GB
GPU and an Apache-2.0 license. This is not an experimentally demonstrated
advantage: neither Qwen3.5-9B nor Qwen3.5-4B has a QuickEval or coding-regression
result, and 9B has not been shown to outperform 4B on security tasks. The
4B/9B comparison remains an optional experiment, no longer a gate. Decision
record: [`docs/FOUNDATION.md`](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/FOUNDATION.md).

## Intended use and training objectives

Defensive source-code security review: vulnerability detection, file and span
localization, CWE classification, technical evidence, remediation, minimal
patches, false-positive rejection and abstention when the decisive code is not
visible. These are **training objectives, not validated capabilities**.

Out of scope: general chat, autonomous penetration testing, internet scanning,
malware construction, credential theft and ransomware assistance. Sentinel is
meant to complement human review, static analysis and dependency scanning, not
replace them.

## Training data: Sentinel Garden v3

Sentinel Garden turns GitHub-reviewed security advisories into records. Each
fix confined to one function produces a vulnerable record (the function before
the upstream fix, labelled with the advisory's CWE and the changed lines), a
hard negative (the same function after the fix) and, where possible, an
abstention record (a caller shown without the vulnerable callee). Garden v3
also accepts advisories with several fix commits in one repository when the fix
is unambiguous: one commit changes the code and the others only tests or
documentation, or every commit makes the identical change at the same position
(a backport or a merge). Everything else is rejected, never guessed.

| Stage                                                                          |     Count |
| ------------------------------------------------------------------------------ | --------: |
| GHSA advisories inspected (PyPI, npm, Go; all of the 1 November 2026 snapshot) |    19,959 |
| Candidate fixes in one repository (at most 20 per repository)                  |     7,751 |
| Fix commits confined to one function                                           |     1,825 |
| Records built                                                                  |     4,200 |
| Records accepted after checks and audit                                        |     3,427 |
| Records approved for training                                                  | **1,464** |

Accepted records: 1,566 vulnerable, 1,392 hard negatives and 469 abstentions;
1,363 complete vulnerable/fixed pairs across four languages and 194 CWEs.
Splits are assigned by a frozen, salted hash of the repository (policy
`sentinel-garden-split-v1`, temporal cutoff 1 July 2026): train 2,405,
validation 268, reserved holdout 399, temporal quarantine 355. No repository
appears in two of train, validation and holdout; no record overlaps an
evaluation case. Every v1 and v2 record is in v3 with the same content hash and
split, and `garden verify` rebuilds all 4,200 records from the pinned upstream
commits with 0 differences.

### Quality audit

The audit checks each of the 1,736 fix groups against outside evidence and only
ever excludes records:

- 118 hard negatives whose function was fixed again by a later advisory;
- 55 hard negatives whose fix a later advisory calls incomplete (164 hard
  negatives in total are invalidated by one of these two reasons);
- 22 hard negatives whose referenced later fix cannot be read;
- 132 groups with a broad localization span;
- 18 training records that share a package or near-duplicate code with
  validation, holdout or quarantine;
- 2 abstentions whose caller passes only constants and 10 records from the
  manual review.

A stratified manual sample of 44 items is being reviewed by the implementing AI
engineer, **not** an authorized reviewer; 25 items are done. Over the reviewed
items that survive the automated exclusions: advisory does not match the code
0 of 14 (Wilson 95 % interval 0–21.5 %), imprecise localization 1 of 14
(1.3–31.5 %), unsafe hard negative 0 of 13 (0–22.8 %), invalid abstention 0 of
7 (0–35.4 %). The sample is small; plan with the upper bounds. 64 evidence
packages for an independent human review are prepared; that review has not been
performed.

### Rights and governance

Training export is default-deny. It requires approval of the registry sources
and of every upstream repository. The review queue lists 878 repositories with
train or validation records, with the license file at each used revision, its
sha256 and the package-registry license: tier A (permissive, consistent) 581
repositories / 1,637 records, tier B 133 / 520, tier C (weak copyleft) 20 / 55,
tier D (strong copyleft, unknown, none) 144 / 461. Before a repository was
proposed, every used revision was inspected for NOTICE, PATENTS and third-party
files, nested license files and package-metadata licenses.

Decisions of the project owner ([training authorization](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/TRAINING_AUTHORIZATION.md)):

- **15 November 2026:** the sources `github-advisory-db` (CC-BY-4.0), `osv` and
  `ghsa-osv-fix-commits`, and 484 tier A repositories (MIT 318, Apache-2.0 120,
  BSD-3-Clause 30, BSD-2-Clause 9, ISC 7).
- **24 November 2026:** the sources extended to the v3 candidate list, and 51
  tier B repositories inspected like tier A (28 without a usable registry
  license, 23 whose registry entry also lists bundled licenses).
- Not approved: clarification cases (NOTICE, PATENTS or third-party license
  files, package-metadata conflicts), 26 further tier A repositories, 16 with an
  updated license text, 2 under the Unlicense, and every copyleft or unknown
  license.

Each repository approval is bound to the sha256 of the reviewed license file
and stops applying if the file changes. No upstream code is committed or
uploaded; records are rebuilt from the pinned upstream commits and verified by
content hash. The GitHub Advisory Database is attributed as CC-BY-4.0
(https://github.com/advisories); its summaries are used verbatim as evidence
text. Open legal questions: whether published weights redistribute the training
code or advisory text, and the open-access condition in GitHub's terms for
research use.

### Approved training data

| Example                        |     Train | Validation |
| ------------------------------ | --------: | ---------: |
| Finding                        |       605 |         63 |
| No finding (verified post-fix) |       555 |         54 |
| Abstention                     |       171 |         16 |
| Detection examples             |     1,331 |        133 |
| Patch examples                 |       540 |         54 |
| **Training examples**          | **1,871** |    **187** |

1,464 approved records from 533 repositories: JavaScript 428, Go 412, Python
402, TypeScript 222; 668 findings across 131 CWEs. With the pinned tokenizer no
example exceeds 4,096 tokens (median 764, maximum 2,918); one epoch is about
1.73 million tokens.

## Training procedure (prepared, not run)

`python -m sentinel.train` loads only governance-approved records and trains
detection and patch generation (`tasks: [detection, patch]`). Before training,
it checks every record's approval, label, content and supervision hash against
the committed manifest and refuses repositories shared with validation, the
holdout or the quarantine. The loss covers only the assistant's JSON reply;
examples longer than the 4,096-token context are dropped, never truncated.
Partial gradient-accumulation windows are averaged over their own size.
Checkpoints store the data and configuration they were trained on and cannot be
resumed with different inputs. Output is adapter-only; a `run.json` records
versions, hashes, metrics and peak memory in every outcome, including
out-of-memory failures. On a training machine,
`python -m sentinel.garden materialize` rebuilds only the approved records (684
advisories in 533 repositories) and refuses on any hash difference. The dry run
on the approved data passes; the first run on the real model waits for approved
GPU time.

## Evaluation (planned)

A reportable result needs the pinned base model, the trained adapter, the full
case set and the shared prompt `quickeval-review-v2`, parser, scorer and
generation settings: QuickEval v1 (37 vulnerable, 34 hard-negative and 15
abstention synthetic cases), the 16 Python coding-regression tasks and the
Garden validation split, each compared with the untuned base model. The public
synthetic cases are not a private holdout; the private holdout has not started.
Offline patch scoring is implemented; patch generation is part of the first
training run. No model-generated patch has been evaluated. Functional and
security validation still require per-project environments. An independent
human-review package covers 64 items; no independent review has been performed.

## Limitations and risks

- No detection quality, false-positive rate, latency or memory requirement has
  been measured.
- Training labels come from upstream fixes: a hard negative is safe only with
  respect to the advisory's weakness, and localization is derived from the diff.
- The manual quality estimate rests on 25 AI-reviewed items of a 44-item
  sample.
- SQL injection (10 findings) and code injection (22) are thin in the training
  data.
- Future findings and patches must be treated as candidates for expert review;
  a no-finding answer does not establish that code is secure.

## Planned availability

Local-first inference and an open-weight release on Hugging Face are planned:
merged weights, model card, evaluation card, optional 8-bit/4-bit and possible
GGUF variants, and a Sentinel Scanner/CLI. None is available yet.

## Sources

Prepared from the maintainer-supplied **Quantum Sentinel 1 Masterplan**
(v1.1 Lean, 6 October 2026, and v1.2, November 2026) and the Sentinel
repository at commit `cec6f96`:
[status](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/STATUS.md),
[Sentinel Garden](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/SENTINEL_GARDEN.md),
[Garden v3](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/GARDEN_V3.md),
[audit report](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/data/garden/seed_v3/AUDIT_REPORT.md),
[training authorization](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/TRAINING_AUTHORIZATION.md) and
[training](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/cec6f961272f0e5b3b83ed7d645591b90cf42a0a/docs/TRAINING.md).
This card does not claim a completed training run and publishes no internal
budget, cloud-account or support-case information. Echelon remains a separate
model with its own page and card.
