# quantum-1-pilot model card

## Status

`quantum-1-pilot` is a public experimental base-completion model. It is not a
chat model, an instruction-following assistant, or a production release.

The public manifest calls the artifact `quantum-1-base` version `1.0.0`; this
card uses `quantum-1-pilot`, the public repository name, to avoid presenting a
historical artifact identifier as a separate model family.

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
| File                       | `quantum-1-base-v1.0.0-f16.gguf`                                   |
| File size                  | 98,990,560 bytes                                                   |
| SHA-256                    | `aeab97e50a5789772b69cf1554ba74eb915b5621835d80d40785b473b62fd1a5` |

The Hugging Face repository revision observed while preparing this card was
`7daf415ef09fc131d7440af8514a93fd8cf3f2a1`. Pin that revision, or verify the
file checksum above, when repeatability matters.

## Architecture

The public research configuration describes the compact causal decoder used by
the pilot. The parameter total above comes from the release manifest; the
layer-level values below come from the public model specification and training
configuration.

| Property                | Configured value        |
| ----------------------- | ----------------------- |
| Vocabulary              | 16,384 tokens           |
| Hidden size             | 512                     |
| Intermediate size       | 1,536                   |
| Decoder layers          | 12                      |
| Attention heads         | 8                       |
| Key/value heads         | 8                       |
| Maximum positions       | 512                     |
| Normalization           | RMSNorm, epsilon `1e-6` |
| RoPE theta              | 10,000                  |
| Input/output embeddings | Tied                    |

## Training and data evidence

The Hugging Face model card reports that the model was trained from scratch for
next-token prediction on approximately 100 million German tokens from the
FineWeb2-HQ / FineWeb2 `deu_Latn` data. It also states that no pretrained model
weights were used.

The public research repository documents a preparation pipeline with cleaning,
exact-document deduplication, stable train/validation/test assignment, a
512-token context, and a SentencePiece BPE tokenizer. That repository does not
contain a final release run manifest that connects the released GGUF to exact
document counts, dataset fingerprints, optimizer state, checkpoints, hardware,
wall-clock time, or raw training logs. Consequently:

- “approximately 100 million tokens” is a Hugging Face-reported training scope,
  not independently reconstructed here;
- values in a YAML file are configuration evidence, not proof that every value
  was used for the released artifact; and
- no hardware or throughput claim is made by this card.

See [Data and training](../docs/data-and-training.md) for the shared evidence
and reproducibility notes.

## Intended uses

- Research and educational inspection of a compact German causal language
  model.
- Local completion experiments in a compatible GGUF runtime such as
  `llama.cpp`.
- Reproducible artifact download checks using the published size and SHA-256.
- Qualitative investigation of small-model behavior and failure modes.

## Out-of-scope and unsafe uses

- Chat or instruction-following applications.
- Factual lookup, autonomous action, or safety-critical decision support.
- Medical, legal, financial, employment, education, or other high-impact use.
- Unsupervised production use or generation presented as verified information.
- Use that assumes the model is aligned, unbiased, private, or robust against
  prompt manipulation.

## Evaluation and limitations

The public model card says that project-specific evaluation was run, but no
versioned standardized benchmark report or raw generation record is linked.
This repository therefore does not claim benchmark performance.

As a 49.3M-parameter, 512-token base-completion model, the pilot may produce
incorrect, repetitive, incomplete, incoherent, biased, or unsafe text. It has
not been documented as instruction tuned or chat aligned. Training data derived
from public web material can contain residual personal information, offensive
content, errors, and representational bias despite upstream processing.

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

- the final source-data revision and materialized data manifest;
- document and token counts after each filtering stage;
- the final tokenizer files and checksums used by the run;
- the exact run configuration, code commit, checkpoints, and logs;
- raw evaluation prompts, decoding settings, outputs, and metric code; and
- an explicit license for the model artifacts.

## Sources

- [Hugging Face model repository](https://huggingface.co/rappidai-research/quantum-1-pilot)
- [Release manifest](https://huggingface.co/rappidai-research/quantum-1-pilot/blob/7daf415ef09fc131d7440af8514a93fd8cf3f2a1/manifest.json)
- [Published checksums](https://huggingface.co/rappidai-research/quantum-1-pilot/blob/7daf415ef09fc131d7440af8514a93fd8cf3f2a1/SHA256SUMS.txt)
- [Public research repository](https://github.com/jonascikemgil07-hue/lumen-quantum)
- [Model specification](https://github.com/jonascikemgil07-hue/lumen-quantum/blob/f7eda1fb0ae153f0f9cc3477ead997cbdb462b39/docs/model_spec.md)
- [FineWeb2-HQ dataset card](https://huggingface.co/datasets/epfml/FineWeb2-HQ)
