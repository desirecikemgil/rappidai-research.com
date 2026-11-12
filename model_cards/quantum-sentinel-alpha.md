# Quantum Sentinel-Alpha — model card (development state)

Quantum Sentinel-Alpha is the first security fine-tuning milestone of the
Quantum Sentinel 1 line: a source-code model meant to act as a second security
reviewer. **No model has been trained or evaluated.** This card records the
selected foundation, the prepared training and data pipelines and their
evidence as reviewed on **12 November 2026** at Sentinel commit
[`47c3121`](https://github.com/rappidAI-Research/quantum-sentinel-alpha/tree/47c312158e9a68352e9a59eb31e658d0c22bd7c1).
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
| Training runs             | None. The pipeline is tested on CPU with a tiny randomly initialised model of the same architecture                                                                                          |
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
record: [`docs/FOUNDATION.md`](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/docs/FOUNDATION.md).

## Intended use and training objectives

Defensive source-code security review: vulnerability detection, file and span
localization, CWE classification, technical evidence, remediation, minimal
patches, false-positive rejection and abstention when the decisive code is not
visible. These are **training objectives, not validated capabilities**.

Out of scope: general chat, autonomous penetration testing, internet scanning,
malware construction, credential theft and ransomware assistance. Sentinel is
meant to complement human review, static analysis and dependency scanning, not
replace them.

## Training data: Sentinel Garden seed v1

Sentinel Garden turns GitHub-reviewed security advisories into records. Each
fix confined to one function produces a vulnerable record (the function before
the upstream fix, labelled with the advisory's CWE and the changed lines), a
hard negative (the same function after the fix) and, where possible, an
abstention record (a caller shown without the vulnerable callee).

| Stage                                                                          |  Count |
| ------------------------------------------------------------------------------ | -----: |
| GHSA advisories inspected (PyPI, npm, Go; all of the 1 November 2026 snapshot) | 19,959 |
| Candidates with exactly one upstream fix commit                                |  4,830 |
| Fixes confined to one function                                                 |  1,206 |
| Records built                                                                  |  2,773 |
| Records accepted after checks and audit                                        |  2,309 |
| Records approved for training                                                  |  **0** |

Accepted records: 1,047 vulnerable, 954 hard negatives and 308 abstentions;
941 complete vulnerable/fixed pairs across four languages and 161 CWEs.
Splits are assigned by a frozen, salted hash of the repository (policy
`sentinel-garden-split-v1`, temporal cutoff 1 July 2026): train 1,737,
validation 191, reserved holdout 235, temporal quarantine 159. No repository
appears in two splits; no record overlaps an evaluation case.

### Quality audit

The audit checks each fix group against outside evidence and only ever
excludes records:

- 126 hard negatives whose function was fixed again by a later advisory;
- 47 hard negatives whose fix a later advisory calls incomplete;
- 10 hard negatives whose referenced later fix cannot be read;
- 89 groups with a broad localization span (every broad span in the manual
  sample was imprecise);
- 1 abstention whose caller passes only constants and 10 records from the
  manual review;
- 13 training records whose package also appears in validation or the reserved
  holdout, even though its repository has moved or changed name.

A stratified manual sample of 44 items was reviewed by the implementing AI
engineer, **not** an authorized reviewer. Over the items that survive the
automated exclusions: no wrong label (0 of 29), imprecise localization 1 of 29
(Wilson 95 % interval 0.6–17.2 %), unsafe hard negative 1 of 28 (0.6–17.7 %),
invalid abstention 0 of 11 (0–25.9 %). The sample is small; plan with the
upper bounds.

### Rights and governance

Training export is default-deny. It requires approval of the registry sources
(`ghsa-osv-fix-commits`, `osv`, `github-advisory-db`) and of every upstream
repository. The review queue lists 761 repositories with the license file at
each used revision, its sha256 and the package-registry license: tier A
(permissive, consistent) 511 repositories / 1,256 records, tier B 110 / 330,
tier C (weak copyleft) 15 / 33, tier D (strong copyleft, unknown, none) 125 / 305.
Non-permissive repositories additionally need a written justification. No
upstream code is committed or uploaded; records are rebuilt from the pinned
upstream commits and verified by content hash.

## Training procedure (prepared, not run)

`python -m sentinel.train` loads only governance-approved records and refuses
to start while none exists. Before training, it checks every record's approval,
label and content hash against the committed manifest and rejects repositories
shared with validation or the holdout. The loss covers only the assistant's
JSON reply; examples longer than the 4,096-token context are dropped, never
truncated. Partial gradient-accumulation windows are averaged over their own
size. Checkpoints store the data and configuration they were trained on and
cannot be resumed with different inputs. Output is adapter-only; a `run.json`
records versions, hashes, metrics and peak memory in every outcome, including
out-of-memory failures.

## Evaluation (planned)

A reportable result needs the pinned base model, the trained adapter, the full
case set and the shared prompt `quickeval-review-v2`, parser, scorer and
generation settings: QuickEval v1 (37 vulnerable, 34 hard-negative and 15
abstention synthetic cases), the 16 Python coding-regression tasks and the
Garden validation split, each compared with the untuned base model. The public
synthetic cases are not a private holdout; the private holdout has not started.
Offline patch scoring and patch-supervision exports are implemented as a
separate task. No model-generated patch has been evaluated. Functional and
security validation still require per-project environments. An independent
human-review package covers 64 items; no independent review has been performed.

## Limitations and risks

- No detection quality, false-positive rate, latency or memory requirement has
  been measured.
- Training labels come from upstream fixes: a hard negative is safe only with
  respect to the advisory's weakness, and localization is derived from the diff.
- The manual quality estimate rests on 44 AI-reviewed items.
- Future findings and patches must be treated as candidates for expert review;
  a no-finding answer does not establish that code is secure.

## Planned availability

Local-first inference and an open-weight release on Hugging Face are planned:
merged weights, model card, evaluation card, optional 8-bit/4-bit and possible
GGUF variants, and a Sentinel Scanner/CLI. None is available yet.

## Sources

Prepared from the maintainer-supplied **Quantum Sentinel 1 Masterplan**
(v1.1 Lean, 6 October 2026, and v1.2, November 2026) and the Sentinel
repository at commit `47c3121`:
[status](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/docs/STATUS.md),
[Sentinel Garden](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/docs/SENTINEL_GARDEN.md),
[audit report](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/data/garden/seed_v1/AUDIT_REPORT.md),
[rights review](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/docs/RIGHTS_REVIEW.md) and
[training](https://github.com/rappidAI-Research/quantum-sentinel-alpha/blob/47c312158e9a68352e9a59eb31e658d0c22bd7c1/docs/TRAINING.md).
This card does not claim a completed training run and publishes no internal
budget, cloud-account or support-case information. Echelon remains a separate
model with its own page and card.
