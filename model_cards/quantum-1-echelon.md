# Quantum 1 Echelon — 1B research preview

## Coming Soon / In Development

Quantum 1 Echelon is an upcoming German-first language model being developed
from scratch by rappidAI Research. English coverage is planned alongside the
German focus. Base pretraining comes first; the evaluated Chat stage is the
planned final user-facing product. Base and Chat are stages of one model line.

Reviewed on 23 September 2026 against the immutable Quantum repository revision
[`c78300c`](https://github.com/rappidAI-Research/lumen-quantum/tree/c78300cdc76e68917c7122cf0c76df88badff174).
The repository's newer 1B execution contract supersedes the earlier 506M plan.

## Planned specifications

| Item             | Development target / plan                            |
| ---------------- | ---------------------------------------------------- |
| Public name      | Quantum 1 Echelon                                    |
| Variant          | 1B, planned                                          |
| Parameter target | Approximately 1.0–1.02 billion                       |
| Training         | From scratch, planned                                |
| Language focus   | German-first, with English coverage planned          |
| Base context     | 4,096 tokens, target                                 |
| Precision        | BF16 training, planned                               |
| Tokenizer        | Under evaluation: 32K and 48K vocabulary candidates  |
| Base pretraining | 40B high-quality tokens, target                      |
| Stages           | Base → SFT → Preference Optimization → Chat, planned |

These are targets, not completed-model specifications or measured results.
Architecture and tokenizer selection are in progress. No production Base,
SFT or preference-trained checkpoint is available. No benchmark numbers,
release date, future-model license or weights availability are claimed.

Public source records:

- [1B execution contract](https://github.com/rappidAI-Research/lumen-quantum/blob/c78300cdc76e68917c7122cf0c76df88badff174/docs/echelon/1b/README.md)
- [Development status](https://github.com/rappidAI-Research/lumen-quantum/blob/c78300cdc76e68917c7122cf0c76df88badff174/docs/echelon/1b/STATUS.md)
- [32K candidate](https://github.com/rappidAI-Research/lumen-quantum/blob/c78300cdc76e68917c7122cf0c76df88badff174/configs/echelon/1b/model-32k.yaml)
- [48K candidate](https://github.com/rappidAI-Research/lumen-quantum/blob/c78300cdc76e68917c7122cf0c76df88badff174/configs/echelon/1b/model-48k.yaml)
- [Base training plan](https://github.com/rappidAI-Research/lumen-quantum/blob/c78300cdc76e68917c7122cf0c76df88badff174/configs/echelon/1b/train-base.yaml)

## Historical evidence boundary

The remaining sections retain the earlier 506M preflight, tokenizer and Garden
records. Their 2,048-token context and 8B-token target are historical and do not
describe the current 1B plan. Pipeline checks do not establish model capability.
References to missing training specifications below describe that earlier
reviewed snapshot, not the newer 1B execution contract above.

## Architecture preflight

The committed preflight reports an exact total and trainable parameter count of
506,333,440 for the following configuration. It constructs the model on a meta
device for counting; this is architecture validation, not a checkpoint.

| Property                | Configured / preflight value |
| ----------------------- | ---------------------------- |
| Architecture            | Llama-style causal decoder   |
| Parameters              | 506,333,440                  |
| Vocabulary              | 32,768 tokens                |
| Context length          | 2,048 tokens                 |
| Hidden size             | 1,280                        |
| Intermediate size       | 3,584                        |
| Decoder layers          | 26                           |
| Attention heads         | 20                           |
| Key/value heads         | 5                            |
| Activation              | SiLU                         |
| Normalization           | RMSNorm, epsilon `1e-5`      |
| RoPE theta              | 10,000                       |
| Attention / MLP bias    | Disabled                     |
| Input/output embeddings | Tied                         |
| Target tensor type      | BF16                         |

The preflight also contains static memory estimates. They exclude activations,
CUDA workspace, allocator fragmentation, and temporary buffers and are not
hardware measurements or proof that a training run fits a particular device.
This card makes no hardware requirement, throughput, cost, or duration claim.

## Tokenizer evidence

The configured tokenizer is a 32,768-token SentencePiece BPE with byte fallback
and explicit control tokens. The committed tokenizer-validation report records
23 cases and zero failures across German text, umlauts, whitespace, code, and
special-token behavior. This validates the tested tokenizer behavior; it does
not validate a trained language model.

The tokenizer corpus builder is configured to stream German FineWeb2-HQ data.
A final corpus manifest with exact source-document counts and a materialized
corpus fingerprint is not committed.

## Garden data-pipeline evidence

The production configuration pins the FineWeb2-HQ `deu_Latn` source revision to
`c0c06e94fd3a44ae9e802b2b0fc533817601eb5e` and targets:

- 8,000,000,000 training tokens;
- 10,000,000 validation tokens;
- 10,000,000 test tokens;
- 2,048-token packed sequences; and
- 100,000,000 training tokens per shard.

Those figures are targets, not achieved counts. The committed Phase 3 report
explicitly states that the production run was not started. It records only a
smoke run:

| Smoke-run field       | Recorded value |
| --------------------- | -------------- |
| Source documents seen | 5,001          |
| Documents accepted    | 1,559          |
| Acceptance rate       | 31.17%         |
| Packed tokens         | 1,380,886      |

The report also records integrity, resume, and Unicode checks for the pipeline.
They support implementation readiness at smoke-test scale; they do not establish
the quality, composition, completeness, or reproducibility of an 8B-token
production corpus.

## Intended research direction

If training artifacts are later published, the configured base stage is intended
for compact causal-language-model research with a longer context and larger
capacity than the pilot family. That statement describes the configuration's
direction, not demonstrated capability.

No model is presently available for inference. There are therefore no supported
downstream uses, benchmark claims, safety claims, or deployment recommendations.
The project-wide publication and use boundary is recorded in
[Responsible AI and research limitations](../docs/responsible-ai.md).

## Risks and open questions

- Web-derived data may contain personal information, offensive material,
  copyrighted text, factual errors, and representational bias.
- A smoke-test acceptance rate does not predict production-corpus composition.
- Upstream and local deduplication choices do not guarantee removal of all
  near-duplicates or semantic overlap.
- Architecture size alone does not establish language quality, factuality,
  safety, instruction following, or training feasibility.
- The planned chat variant has no reviewed specification, alignment dataset,
  safety evaluation, or artifact.

## Licensing and provenance

Licensing must be evaluated per component:

| Component                          | Current evidence                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Website code and documentation     | Governed only by the top-level `LICENSE` and `NOTICE` in this website repository, within their stated scope.                                                                                                                                                                                          |
| Research code and configuration    | Apache-2.0 in the separate Quantum repository; [source approval is recorded](https://github.com/rappidAI-Research/lumen-quantum/blob/f79c395c1da82827a63706ea9b55c913c073bd91/docs/maintainer-source-license-approval.md). This does not license trained artifacts, datasets or third-party material. |
| Future model weights and tokenizer | No Echelon weights exist in the reviewed public artifacts, and no future weights/tokenizer license is established here. Explicit terms must accompany any future artifacts.                                                                                                                           |
| Training data                      | FineWeb2-HQ is published under ODC-By 1.0 and is also subject to the Common Crawl terms and rights in source documents. Those terms do not automatically license future weights or other code.                                                                                                        |
| Brand and model-card images        | No reusable-asset license is claimed; see the READMEs under `public/brand` and `public/models`.                                                                                                                                                                                                       |

This section is a provenance record, not legal advice.

## Evidence required before a model release claim

- completed production-corpus manifest and checksums;
- final tokenizer artifact, source-corpus manifest, and checksums;
- pinned code commit and fully resolved run configuration;
- checkpoint inventory and cryptographic linkage to exported artifacts;
- actual training tokens, steps, hardware, duration, interruptions, and logs;
- versioned evaluation datasets, prompts, decoding settings, outputs, and code;
- documented limitations, safety analysis, and artifact licenses; and
- a clear stage label distinguishing base and any later chat adaptation.

## Compute planning

The [Echelon compute plan](https://github.com/rappidAI-Research/lumen-quantum/blob/22ad246b7a2850ae7544aa6169d851485a1a1960/docs/compute-plan.md) documents production-data, training and evaluation gates, static memory calculations, storage planning and cost controls. It is a plan, not evidence of a completed run.

## Primary sources

- [Public research repository](https://github.com/rappidAI-Research/lumen-quantum)
- [Echelon base configuration](https://github.com/rappidAI-Research/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/quantum-1-echelon-base.yaml)
- [Architecture preflight](https://github.com/rappidAI-Research/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/quantum-1-echelon-base-preflight.json)
- [Tokenizer configuration](https://github.com/rappidAI-Research/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/tokenizer.yaml)
- [Tokenizer validation](https://github.com/rappidAI-Research/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/tokenizer_validation.json)
- [Garden production configuration](https://github.com/rappidAI-Research/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/garden_production.yaml)
- [Garden Phase 3 report](https://github.com/rappidAI-Research/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/garden_phase3_report.md)
- [FineWeb2-HQ dataset card](https://huggingface.co/datasets/epfml/FineWeb2-HQ)
