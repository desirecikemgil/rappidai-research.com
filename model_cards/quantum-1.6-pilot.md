# quantum-1.6-pilot model card

## Status

`quantum-1.6-pilot` is a public experimental continued-pretraining release. It
keeps the `quantum-1` architecture and tokenizer and remains a base-completion
model. It is not a chat model, an instruction-following assistant, or a
production release.

## Verified release metadata

The following values are recorded across the public Hugging Face model card,
release manifest and checksum file. The filename, size and SHA-256 can be
checked directly against the released file.

| Property                   | Value                                                              |
| -------------------------- | ------------------------------------------------------------------ |
| Architecture class         | `LlamaForCausalLM`                                                 |
| Parameters                 | 49,295,872                                                         |
| Context length             | 512 tokens                                                         |
| Mode                       | Base completion                                                    |
| Format                     | GGUF                                                               |
| Quantization / tensor type | F16                                                                |
| File                       | `quantum-1.6-pilot-v1.6.0-f16.gguf`                                |
| File size                  | 98,990,560 bytes                                                   |
| SHA-256                    | `6bda15fcd51286e55174d5876fe44aa9518fb18b75fb5aa4f7402ebd039bd994` |

The Hugging Face repository revision observed while preparing this card was
`507662c095b5ba6e14f24d3fc7f0a5e29d76b7f3`. Pin that revision, or verify the
file checksum above, when repeatability matters.

## Architecture

The public configurations hold the architecture constant relative to
`quantum-1-pilot`:

| Property                | Configured value                            |
| ----------------------- | ------------------------------------------- |
| Vocabulary              | 16,384 tokens; frozen `quantum-1` tokenizer |
| Hidden size             | 512                                         |
| Intermediate size       | 1,536                                       |
| Decoder layers          | 12                                          |
| Attention heads         | 8                                           |
| Key/value heads         | 8                                           |
| Maximum positions       | 512                                         |
| Normalization           | RMSNorm, epsilon `1e-6`                     |
| RoPE theta              | 10,000                                      |
| Input/output embeddings | Tied                                        |

The public method describes weights-only initialization from
`quantum-1-pilot`, with a fresh optimizer, scheduler, and step counter. A final
public run manifest is not available to verify that every configured detail was
used for the released GGUF.

## Training and data evidence

The Hugging Face model card reports continued pretraining on 500 million
additional German tokens from FineWeb2-HQ / FineWeb2 `deu_Latn`, following the
approximately 100 million tokens reported for `quantum-1-pilot`. It therefore
describes an approximate cumulative scope of 600 million tokens. These are
release-card claims, not counts reconstructed from a published final data
manifest.

The public data configuration targets 500 million new training tokens and two
million validation and test tokens each. It specifies cleaning, exact
deduplication, stable splits, and exact normalized-fingerprint exclusion of
documents already known to the earlier pilot. Exact matching does not establish
near-duplicate or semantic-overlap removal.

The training configuration uses 8 sequences per device, gradient accumulation
of 4, and a 512-token context. Its `max_steps: 30518` is the configured target
derived from the token budget and 16,384 configured tokens per optimizer step.
**30,518 is not a verified count of completed steps.** No final run manifest,
checkpoint inventory, or complete training log is public.

See [Data and training](../docs/data-and-training.md) for the configuration and
evidence boundaries.

## Reported evaluation

The Hugging Face model card reports:

| Metric            | HF-reported value       |
| ----------------- | ----------------------- |
| Validation loss   | 3.348852                |
| Perplexity        | 28.4700                 |
| Validation tokens | Approximately 1,996,093 |

These are next-token-prediction metrics reported by the release author. Raw
evaluation outputs, the final evaluation command, a versioned metric artifact,
and standardized downstream benchmarks are not linked. The metrics do not
establish factual accuracy, instruction following, safety, or usefulness for a
particular downstream task.

## Intended uses

- Research comparison with `quantum-1-pilot` while architecture and tokenizer
  remain fixed.
- Local German completion experiments in a compatible GGUF runtime such as
  `llama.cpp`.
- Inspection of continued-pretraining behavior in a compact causal model.
- Artifact verification using the published size and SHA-256.

## Out-of-scope and unsafe uses

- Chat or instruction-following applications.
- Factual lookup, autonomous action, or safety-critical decision support.
- Medical, legal, financial, employment, education, or other high-impact use.
- Unsupervised production use or generation presented as verified information.
- Any use that assumes alignment, comprehensive safety evaluation, privacy, or
  robustness.

## Limitations

The release card warns that outputs remain factually unreliable and may be
incomplete or incoherent. Small scale, a 512-token context, base-completion
training, and web-derived data further constrain use. Outputs can be repetitive,
biased, offensive, or unsafe. Continued pretraining does not by itself provide
instruction tuning, chat alignment, retrieval, citation, or fact checking.

## Licensing and provenance

Licensing must be evaluated per component:

| Component                      | Current evidence                                                                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Website code and documentation | Governed only by the top-level `LICENSE` and `NOTICE` in this website repository, within their stated scope.                                                                                    |
| Model weights and tokenizer    | No explicit weights or tokenizer license was found in the public Hugging Face metadata reviewed for this card. An explicit license remains required before making reuse claims.                 |
| Training data                  | FineWeb2-HQ is published under ODC-By 1.0 and is also subject to the Common Crawl terms and rights in source documents. Those terms do not automatically license model weights or website code. |
| Brand and model-card images    | No reusable-asset license is claimed; see the READMEs under `public/brand` and `public/models`.                                                                                                 |

This section is a provenance record, not legal advice.

## Reproducibility gaps

Before treating this release as fully reproducible, publish or pin:

- a final run manifest linking source revision, data manifest, tokenizer,
  configuration, code commit, checkpoints, and GGUF checksum;
- actual step, document, and token counts rather than configured targets;
- optimizer and scheduler state plus training and validation logs;
- raw evaluation prompts, decoding settings, outputs, and metric code; and
- an explicit license for the model artifacts.

## Sources

- [Hugging Face model repository](https://huggingface.co/rappidai-research/quantum-1.6-pilot)
- [Release manifest](https://huggingface.co/rappidai-research/quantum-1.6-pilot/blob/507662c095b5ba6e14f24d3fc7f0a5e29d76b7f3/manifest.json)
- [Published checksums](https://huggingface.co/rappidai-research/quantum-1.6-pilot/blob/507662c095b5ba6e14f24d3fc7f0a5e29d76b7f3/SHA256SUMS.txt)
- [Continued-pretraining documentation](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/docs/quantum_1_6_pilot.md)
- [Data configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/quantum_1_6_pilot_data.yaml)
- [Training configuration](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/configs/quantum_1_6_pilot_train.yaml)
- [FineWeb2-HQ dataset card](https://huggingface.co/datasets/epfml/FineWeb2-HQ)
