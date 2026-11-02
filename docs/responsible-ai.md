# Responsible AI and research limitations

## Purpose and scope

rappidAI publishes early-stage model research and agent infrastructure. This
document records the minimum responsible-use boundary shared by the website,
model cards, research notes, and future release records. It is not a claim that
the models have completed a comprehensive safety evaluation.

The current public pilot models are experimental base-completion models.
`quantum-1-echelon` is a research pipeline and architecture preflight, not a
trained public model. Capability, safety, or deployment claims must never be
inferred from parameter count, configuration, a smoke test, or the existence of
a downloadable file.

## Project-specific tool and security boundaries

Reviewed on 2 November 2026 against the sources in the
[documentation review](research-documentation-review-2026-11-02.md).

### Ghost

Ghost v0.3.0 is a released experimental runtime. Its 25-scenario release gate
checks named properties on Linux amd64 with Docker Engine, not universal attack
resistance or LLM intent detection. Use minimum privileges, explicit network
policy and a dedicated workspace without real secrets. Mounted workspace
secrets remain exposed; command arguments and persisted session artifacts need
review before sharing. Prompt signals and decoy access do not prove intent.
Containment affects subsequent decisions and does not revoke established
connections. Follow Ghost's own threat model and private security policy.

### Quantum Sentinel-Alpha

The reviewed public repository remains in Phase 0 with no evaluated or trained
model. The earlier October Alpha target has passed; no revised date is announced.
Future findings and patches require expert review, location/CWE/evidence checks
and independent verification. A no-finding or abstention answer cannot certify
secure code. Review only authorized systems and protect private source material.
The coding-regression harness uses a child process and resource limits, not a
complete sandbox for executing untrusted code on shared hosts.

### Replay

Captures may contain private source, prompts, arguments and outputs. Limit
capture scope and access, and review artifacts before sharing. Inspect recorded
state before restoring it. A live rerun executes work again and may reconnect to
external services; verify permissions and credentials first. Recorded playback,
restored local state and identical live model output are different properties.

## Known model limitations

The released pilots may produce:

- false, incomplete, contradictory, or fabricated statements;
- repetitive, incoherent, or context-insensitive text;
- biased, offensive, unsafe, or otherwise harmful continuations;
- memorized or privacy-sensitive fragments from web-derived training data; and
- outputs that appear confident without being reliable.

The pilots have a 512-token context, are not documented as instruction tuned or
chat aligned, and have no published standardized downstream or comprehensive
safety benchmark. Continued pretraining does not by itself add fact checking,
retrieval, citations, alignment, or robust instruction following.

## Intended research use

Subject to the separate artifact and data licenses, suitable research uses may
include:

- inspecting compact causal-language-model behavior;
- comparing documented pilot stages;
- testing local GGUF inference and artifact integrity;
- studying failure modes and reproducibility gaps; and
- improving transparent training, evaluation, and release records.

Every use must preserve the model-specific limitations and provenance recorded
in the relevant [model card](../model_cards/).

## Out-of-scope and high-risk use

Do not use rappidAI research artifacts as an authoritative source or as an
unsupervised decision maker. They are not suitable for:

- medical, legal, financial, employment, education, eligibility, or other
  high-impact decisions;
- emergency, safety-critical, or infrastructure control;
- autonomous action without meaningful human review;
- impersonation, deception, harassment, surveillance, or privacy invasion;
- generation presented as verified fact; or
- deployment that assumes robustness, neutrality, privacy, or regulatory
  compliance.

Human review does not automatically make a high-risk use appropriate. Reviewers
need relevant expertise, access to primary sources, and authority to reject the
output.

## Data, privacy, and rights

The pilot and Echelon language-model pipelines reference German web-derived material from FineWeb2-HQ /
Common Crawl. Upstream filtering and deduplication cannot guarantee removal of
all personal information, copyrighted text, harmful content, near-duplicates,
or representational bias.

Before a model release, publish the resolved data revision, filtering and
deduplication record, final manifest, known limitations, applicable terms, and
a contact path for privacy, rights, and removal concerns. Do not publish private
examples or dataset samples merely to demonstrate transparency.

See [Data and training](data-and-training.md) and
[Licensing and provenance](licensing.md).

## Evaluation requirements

Claims should be proportional to retained evidence. A responsible model release
record should include:

1. versioned evaluation code, datasets, prompts, and decoding settings;
2. raw outputs or privacy-preserving retained evidence;
3. metric definitions and implementation versions;
4. qualitative failure analysis, including unfavorable examples;
5. contamination and overlap limitations;
6. safety and misuse-oriented tests appropriate to the intended use; and
7. an explanation of what the evaluation does not establish.

Publisher-reported loss or perplexity is not evidence of factual accuracy,
instruction following, fairness, privacy, safety, or downstream usefulness.

## Artifact security

Treat model files, tokenizers, checkpoints, datasets, converters, and custom
loaders as untrusted:

- verify the source revision, expected size, and published checksum;
- prefer data-only formats and avoid unsafe deserialization;
- keep `trust_remote_code` disabled for unreviewed repositories;
- run unfamiliar workloads without host secrets or broad filesystem access; and
- follow the repository [security policy](../SECURITY.md).

## Publication and withdrawal

Do not publish a model as open source, open weight, reproducible, safe, or
production ready unless the evidence and component-specific licenses support
that exact statement.

A release should be corrected, clearly deprecated, or withdrawn when its
provenance is materially wrong, its license is invalid, its integrity cannot be
verified, or continued distribution creates an unacceptable security, privacy,
or rights risk. Preserve a public correction record where doing so is safe and
lawful.

## Reporting concerns

Use a public issue for documentation, model-quality, or research-method
concerns. Report vulnerabilities, compromised artifacts, or exposed secrets
privately as described in [SECURITY.md](../SECURITY.md). Do not include private
data, access credentials, or harmful payloads in a public report.
