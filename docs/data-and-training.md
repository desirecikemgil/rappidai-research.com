# Data and training record

## Purpose and evidence labels

This document separates public facts from plans so that configuration does not
silently become a training claim. Statements use four evidence levels:

- **Verified artifact metadata:** a value in a public manifest or a checksum
  verified against a public artifact.
- **Reported result:** a value stated by the artifact publisher, without enough
  public run material here to independently reconstruct it.
- **Configured target:** a value in versioned code or YAML that describes an
  intended run. It is not proof of execution or completion.
- **Absent / unknown:** evidence was not located in the reviewed public sources.

The website is a publication and presentation repository. Training and data
preparation live in the separate
[`lumen-quantum`](https://github.com/jonascikemgil07-hue/lumen-quantum)
research repository. This review used its public commit
`f7eda1fb0ae153f0f9cc3477ead997cbdb462b39` plus the public Hugging Face model
repositories. Future changes to those sources should be recorded with a new
dated review rather than retroactively treated as evidence for an older release.

## Dataset provenance

The reviewed pipelines name
[`epfml/FineWeb2-HQ`](https://huggingface.co/datasets/epfml/FineWeb2-HQ), German
configuration `deu_Latn`, as their web-text source. The Echelon production
configuration pins dataset revision
`c0c06e94fd3a44ae9e802b2b0fc533817601eb5e`; the pilot configurations use
`main`, which is a reproducibility gap unless a resolved revision is captured in
a final manifest.

The FineWeb2-HQ dataset card identifies ODC-By 1.0 and the Common Crawl terms as
applicable. It also explains that the material is derived from public web data
and may retain personal information or harmful content even after upstream
processing. A dataset license does not establish permission in every source
document, and it does not automatically license code, tokenizers, model weights,
or website assets.

Any release should therefore preserve source attribution, the resolved dataset
revision, filtering records, and applicable terms, and should document a process
for privacy, rights, and removal concerns. This is a provenance record, not
legal advice.

## Scope by model stage

| Stage               | Public training/data statement                                                      | Evidence boundary                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quantum-1-pilot`   | Approximately 100M German tokens; trained from scratch for next-token prediction    | Reported by the Hugging Face card. The research repository has preparation/configuration material but no final release run manifest.                                    |
| `quantum-1.6-pilot` | 500M additional German tokens, approximately 600M cumulative with the earlier stage | Reported by the Hugging Face card. The configuration targets 500M new tokens, but actual post-filter counts and completed steps are not in a final public run manifest. |
| `quantum-1-echelon` | Production targets of 8B train, 10M validation, and 10M test tokens                 | Configured targets only. The committed report explicitly says the production run was not started.                                                                       |

## Pilot data preparation

### `quantum-1-pilot`

The public final-data configuration describes:

- German FineWeb2-HQ `deu_Latn` streaming input;
- deterministic seed `20260704`;
- cleaning and exact-document deduplication;
- stable SHA-based assignment to 98% training, 1% validation, and 1% test;
- targets of 100M training, 1M validation, and 1M test tokens; and
- packing at a 512-token context length.

These are configured methods and targets. No committed final data manifest
links exact source documents, accepted document counts, materialized token
counts, split fingerprints, and the public GGUF.

The configured tokenizer is a 16,384-token SentencePiece BPE with NFKC
normalization, digit splitting, no byte fallback, and explicit unknown, BOS,
EOS, padding, system, user, and assistant tokens.

### `quantum-1.6-pilot`

The continued-pretraining configuration describes:

- German FineWeb2-HQ `deu_Latn` input and deterministic seed `20260716`;
- targets of 500M new training, 2M validation, and 2M test tokens;
- cleaning, exact deduplication, and stable 98/1/1 assignment;
- exclusion of known earlier-pilot documents by exact normalized fingerprint or
  identifier; and
- reuse of the frozen `quantum-1` tokenizer and weights-only initialization
  from the earlier pilot.

Exact fingerprint exclusion cannot demonstrate removal of lightly modified,
near-duplicate, or semantically overlapping documents. The configuration names
the mutable dataset revision `main`, and no final public data manifest provides
resolved source revision, document counts, overlap statistics, or split hashes.

## Echelon Garden pipeline

The Echelon production-data configuration is materially separate from the pilot
pipeline. It forbids reuse of pilot tokenizers, model artifacts, and prepared
data; it uses a new 32,768-token SentencePiece BPE and 2,048-token packing.

The production configuration describes, among other controls:

- pinned FineWeb2-HQ revision
  `c0c06e94fd3a44ae9e802b2b0fc533817601eb5e`;
- deterministic seed `20260718`;
- length, language/script, quality, URL, digit, and symbol filters;
- deterministic 7,980/10/10 bucket assignment out of 8,000;
- exact/quality filtering and reliance on the upstream per-language MinHash
  deduplication rather than an additional local near-duplicate pass;
- `uint16` packed token storage at context length 2,048;
- 100M target training tokens per shard; and
- atomic partial-shard and JSON checkpoint handling for resume safety.

The committed Phase 3 report records a smoke run, not the production corpus:

| Field                 | Recorded smoke value |
| --------------------- | -------------------- |
| Source documents seen | 5,001                |
| Documents accepted    | 1,559                |
| Acceptance rate       | 31.17%               |
| Packed tokens         | 1,380,886            |

The same report explicitly says the full production run was not started. No
8B-token corpus, final corpus manifest, Echelon checkpoint, or Echelon model
weight is public in the reviewed sources.

The Echelon tokenizer configuration uses a 32,768-token SentencePiece BPE with
identity normalization, byte fallback, and explicit control tokens. A committed
validation report records 23 cases and zero failures. The report validates the
tested tokenizer behavior; it does not prove the source-corpus composition or a
trained model's quality.

## Training configuration versus completed work

The table deliberately labels YAML values as configuration. Without a final run
manifest and logs, none should be read as a verified release-run setting.

| Field                                | `quantum-1-pilot` configured value     | `quantum-1.6-pilot` configured value | Echelon evidence                               |
| ------------------------------------ | -------------------------------------- | ------------------------------------ | ---------------------------------------------- |
| Context                              | 512                                    | 512                                  | 2,048 architecture/data target                 |
| Batch size                           | 8                                      | 8                                    | No model-training run published                |
| Gradient accumulation                | 4                                      | 4                                    | No model-training run published                |
| Configured tokens per optimizer step | 16,384                                 | 16,384                               | No model-training run published                |
| Maximum steps                        | `0` in the reviewed preparation config | `30,518` target                      | No model-training run published                |
| Learning rate                        | `3e-4`                                 | `1e-4`                               | No model-training run published                |
| Weight decay                         | `0.01`                                 | `0.01`                               | No model-training run published                |
| Warmup steps                         | 100                                    | 500                                  | No model-training run published                |
| Schedule                             | Cosine                                 | Cosine                               | No model-training run published                |
| Gradient clipping                    | `1.0`                                  | `1.0`                                | No model-training run published                |
| Mixed precision target               | BF16                                   | BF16                                 | BF16 architecture target only                  |
| Seed                                 | `20260704`                             | `20260716`                           | `20260718` for reviewed tokenizer/data configs |

For `quantum-1.6-pilot`, `30,518` is only the configured step target resulting
from the token budget and configured batch arithmetic. It is not a verified
completed-step count.

No public source reviewed here establishes actual training hardware, number of
devices, device-hours, energy use, runtime, monetary cost, interruption history,
peak memory, throughput, or checkpoint selection criteria. This document makes
no such claims.

## Reported results

The `quantum-1.6-pilot` Hugging Face card reports validation loss `3.348852`,
perplexity `28.4700`, and approximately `1,996,093` validation tokens. Those
values are publisher-reported next-token metrics. No linked final evaluation
artifact provides the raw batch outputs, exact command, resolved code revision,
or independently replayable metric record.

No standardized benchmark result is claimed for either pilot. The reviewed
Echelon sources contain no model training and therefore no model evaluation.

## Required release record

For each future run, copy [the training-run template](training-run-template.md)
and complete it using immutable references and attached evidence. At minimum,
the release record should link:

1. code commit and resolved environment;
2. architecture and tokenizer artifacts with checksums;
3. resolved dataset revisions and final data manifests;
4. exact run configuration plus explicit deviations;
5. actual steps, tokens, checkpoints, hardware, duration, and logs;
6. evaluation data, commands, decoding settings, raw outputs, and metrics;
7. export commands and checksums linking checkpoints to released files; and
8. separate licenses and provenance for code, data, weights/tokenizers, and
   visual assets.

## Known reproducibility gaps

- Pilot source revisions are not pinned in a final public data manifest.
- Neither pilot has a public final run manifest linking data, tokenizer, code,
  configuration, checkpoints, evaluation, and GGUF checksum.
- Actual post-filter document/token counts and actual completed steps are absent.
- The published pilot metric evidence is narrative rather than a versioned raw
  evaluation record.
- Echelon has only architecture/tokenizer preflight and a small data-pipeline
  smoke test; production data and model training have not started.
- Explicit model-weight and tokenizer licensing was not found in the reviewed
  Hugging Face metadata.
- The reviewed research commit stores `tools/llama.cpp` as a Git link but has no
  `.gitmodules` entry, so its exact tool revision cannot be initialized through
  the normal submodule workflow from that checkout.

## Primary sources

- [`quantum-1-pilot` Hugging Face repository](https://huggingface.co/rappidai-research/quantum-1-pilot)
- [`quantum-1.6-pilot` Hugging Face repository](https://huggingface.co/rappidai-research/quantum-1.6-pilot)
- [FineWeb2-HQ dataset card](https://huggingface.co/datasets/epfml/FineWeb2-HQ)
- [`quantum-1.6-pilot` data configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/quantum_1_6_pilot_data.yaml)
- [`quantum-1.6-pilot` training configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/quantum_1_6_pilot_train.yaml)
- [Echelon base configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/quantum-1-echelon-base.yaml)
- [Echelon tokenizer validation](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/tokenizer_validation.json)
- [Echelon Garden configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/echelon/garden_production.yaml)
- [Echelon Garden Phase 3 report](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/reports/quantum-1-echelon/garden_phase3_report.md)
