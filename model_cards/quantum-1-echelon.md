# quantum-1-echelon research card

## Status: no model release

`quantum-1-echelon` currently names a research family and pipeline, not a
trained public model. The public evidence consists of:

- a base-architecture configuration and parameter-count preflight;
- tokenizer configuration and validation;
- a small Garden data-pipeline smoke test; and
- production-data and model-training plans.

The production Garden run has explicitly **not started**, no production corpus
manifest is public, model training has not started, and no Echelon model weights
or model evaluation results exist in the reviewed public artifacts.

`quantum-1-echelon-base` and `quantum-1-echelon-chat` are planned variants or
stages under the `quantum-1-echelon` family. They must not be counted as two
released model families. Only the base architecture has a public preflight;
the chat stage has no public training specification or artifact in the reviewed
repository.

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

| Component                          | Current evidence                                                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Website code and documentation     | Governed only by the top-level `LICENSE` and `NOTICE` in this website repository, within their stated scope.                                                                                   |
| Research code and configuration    | Belongs to the separate `lumen-quantum` repository, where no explicit top-level license was found during this review. Linking or summarizing it here does not relicense it.                    |
| Future model weights and tokenizer | No Echelon weights exist in the reviewed public artifacts, and no future weights/tokenizer license is established here. Explicit terms must accompany any future artifacts.                    |
| Training data                      | FineWeb2-HQ is published under ODC-By 1.0 and is also subject to the Common Crawl terms and rights in source documents. Those terms do not automatically license future weights or other code. |
| Brand and model-card images        | No reusable-asset license is claimed; see the READMEs under `public/brand` and `public/models`.                                                                                                |

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

## Sources

- [Public research repository](https://github.com/jonascikemgil07-hue/lumen-quantum)
- [Echelon base configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/quantum-1-echelon-base.yaml)
- [Architecture preflight](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/quantum-1-echelon-base-preflight.json)
- [Tokenizer configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/tokenizer.yaml)
- [Tokenizer validation](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/tokenizer_validation.json)
- [Garden production configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/garden_production.yaml)
- [Garden Phase 3 report](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/garden_phase3_report.md)
- [FineWeb2-HQ dataset card](https://huggingface.co/datasets/epfml/FineWeb2-HQ)
