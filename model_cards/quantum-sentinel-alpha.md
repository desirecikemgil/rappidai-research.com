# Quantum Sentinel Alpha — development card

Quantum Sentinel Alpha is the first substantial security-SFT milestone in the
Quantum Sentinel 1 line. It is in development; October 2026 is an **Alpha target**,
not a guaranteed release date or a target for the stable Quantum Sentinel 1.0.

## Training objectives

Defensive source-code vulnerability detection, file/span localization, CWE
classification, technical evidence, remediation, minimal patches, false-positive
rejection and secure repository/PR/diff review. The model should express uncertainty
or abstain when evidence is insufficient. These are objectives, not validated
capabilities; no Sentinel benchmark results are published here.

## Foundation and training

Qwen3.5-9B is the primary foundation candidate. An internal Qwen3.5-4B/9B security
bake-off precedes the final foundation freeze. The plan uses QLoRA/LoRA supervised
fine-tuning on curated security examples, fixed/vulnerable pairs, hard negatives
and structured analysis/patch tasks. Preference training or domain adaptation is
optional and requires measurable evaluation benefit. This is post-training,
not a new foundation pretrained from scratch.

Primary language focus: Python, JavaScript/TypeScript and Go.

## Model and Engine

The planned standalone model produces analysis, candidate findings, evidence,
patch proposals and abstention. The planned Sentinel Engine supplies indexing,
context selection, static signals, tool orchestration, verification, tests and
re-analysis, with JSON/SARIF/human-readable output. Unsupported candidates should
be rejected by verification; tests should check patch functionality and security.

## Planned availability

Local-first inference and an open-weight Hugging Face release are planned.
Artifacts include merged weights, Model Card, Evaluation Card, optional 8-bit/4-bit
variants, possible GGUF variants and Sentinel Scanner/CLI. No weights, model
download URL or final model license are announced. The primary candidate is in
the approximately 9B class; consumer-hardware suitability and RAM/VRAM requirements
depend on measured final variants and quantization.

## Scope and limitations

Sentinel is intended for defensive software security. It is not a general chatbot,
autonomous penetration-testing agent, internet scanner, malware builder,
credential-stealing system or ransomware assistant. It complements human review,
SAST and dependency scanning. Technical choices and release artifacts may change.

## Public development sequence

Foundation → Baseline → Dataset/Garden → Calibration → SFT Alpha → Data Iteration

- Beta → optional Hardening → Release Candidate → Quantum Sentinel 1.0.
  This sequence does not claim that preparatory phases are complete.

## Source and publication boundary

Prepared from the maintainer-supplied **Quantum Sentinel 1 Masterplan v1.1 Lean,
6 October 2026**, and explicit website instructions supplied on 7 October 2026.
The website brief establishes the public Alpha name and October target.
This card records research planning only, without claiming a completed training
run or publishing internal budget, cloud-account or support-case information.

Echelon remains a separate model with its existing page and development card.
