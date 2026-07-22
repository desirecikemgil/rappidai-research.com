# Training run record template

Copy this file for each run. Replace every placeholder or mark it explicitly
`unknown`, `not applicable`, or `not published`. Do not convert planned values
into completed-run claims. Attach immutable artifacts wherever possible.

## 1. Record identity

| Field            | Value                                                           |
| ---------------- | --------------------------------------------------------------- |
| Run ID           | `TODO`                                                          |
| Model family     | `TODO`                                                          |
| Stage / variant  | `TODO`                                                          |
| Record status    | Planned / running / interrupted / completed / failed / released |
| Started at (UTC) | `TODO`                                                          |
| Ended at (UTC)   | `TODO`                                                          |
| Record author    | `TODO`                                                          |
| Last updated     | `TODO`                                                          |
| Release URL      | `TODO`                                                          |

## 2. Evidence summary

Summarize what is established and what remains only planned or reported.

| Claim                     | Status                                    | Evidence |
| ------------------------- | ----------------------------------------- | -------- |
| Architecture instantiated | Verified / reported / configured / absent | `TODO`   |
| Dataset materialized      | Verified / reported / configured / absent | `TODO`   |
| Training completed        | Verified / reported / configured / absent | `TODO`   |
| Evaluation completed      | Verified / reported / configured / absent | `TODO`   |
| Export verified           | Verified / reported / configured / absent | `TODO`   |

## 3. Code and environment

| Field                                    | Value                       |
| ---------------------------------------- | --------------------------- |
| Repository                               | `TODO`                      |
| Commit SHA                               | `TODO`                      |
| Working tree clean?                      | Yes / no; attach diff if no |
| Entrypoint and full command              | `TODO`                      |
| Resolved configuration file              | `TODO`                      |
| Container image and digest               | `TODO`                      |
| Lockfile / environment artifact checksum | `TODO`                      |
| Framework and version                    | `TODO`                      |
| Runtime and version                      | `TODO`                      |
| CUDA / accelerator software              | `TODO`                      |
| Determinism settings                     | `TODO`                      |
| Environment manifest                     | `TODO`                      |

Record any uncommitted patch and all command-line or environment overrides.
Redact secrets; record secret names and purpose, never secret values.

## 4. Model and initialization

| Field                               | Value                                   |
| ----------------------------------- | --------------------------------------- |
| Architecture class                  | `TODO`                                  |
| Resolved architecture configuration | `TODO`                                  |
| Total / trainable parameters        | `TODO`                                  |
| Vocabulary size                     | `TODO`                                  |
| Context length                      | `TODO`                                  |
| Initial checkpoint                  | From scratch / immutable URI + revision |
| Initial checkpoint SHA-256          | `TODO`                                  |
| Initialization method and seed      | `TODO`                                  |
| Tied embeddings                     | `TODO`                                  |
| Target tensor type                  | `TODO`                                  |

## 5. Tokenizer

| Field                         | Value  |
| ----------------------------- | ------ |
| Tokenizer type                | `TODO` |
| Vocabulary size               | `TODO` |
| Training corpus manifest      | `TODO` |
| Normalization                 | `TODO` |
| Special tokens and IDs        | `TODO` |
| Tokenizer artifact URIs       | `TODO` |
| Artifact SHA-256 values       | `TODO` |
| Validation report             | `TODO` |
| Frozen during model training? | `TODO` |

## 6. Dataset and preparation

| Field                               | Value  |
| ----------------------------------- | ------ |
| Dataset IDs and configurations      | `TODO` |
| Immutable source revisions          | `TODO` |
| Applicable licenses / terms         | `TODO` |
| Acquisition date and method         | `TODO` |
| Inclusion / exclusion policy        | `TODO` |
| Cleaning and quality filters        | `TODO` |
| Exact-deduplication method          | `TODO` |
| Near-deduplication method           | `TODO` |
| Prior-run overlap exclusion         | `TODO` |
| PII / safety filtering              | `TODO` |
| Split algorithm and seed            | `TODO` |
| Packing algorithm and context       | `TODO` |
| Final data manifest URI and SHA-256 | `TODO` |

### Materialized counts

| Split      | Documents | Raw tokens | Accepted tokens | Packed tokens / sequences | Shards | Manifest SHA-256 |
| ---------- | --------: | ---------: | --------------: | ------------------------: | -----: | ---------------- |
| Train      |    `TODO` |     `TODO` |          `TODO` |                    `TODO` | `TODO` | `TODO`           |
| Validation |    `TODO` |     `TODO` |          `TODO` |                    `TODO` | `TODO` | `TODO`           |
| Test       |    `TODO` |     `TODO` |          `TODO` |                    `TODO` | `TODO` | `TODO`           |

Document rejected counts by filter and any known contamination, leakage,
privacy, copyright, representation, or quality issue.

## 7. Training plan and actuals

Use separate columns so a target cannot be mistaken for a completed value.

| Field                       | Planned | Actual |
| --------------------------- | ------- | ------ |
| Global batch size           | `TODO`  | `TODO` |
| Micro-batch size per device | `TODO`  | `TODO` |
| Gradient accumulation       | `TODO`  | `TODO` |
| Tokens per optimizer step   | `TODO`  | `TODO` |
| Maximum / completed steps   | `TODO`  | `TODO` |
| Target / processed tokens   | `TODO`  | `TODO` |
| Optimizer                   | `TODO`  | `TODO` |
| Learning rate               | `TODO`  | `TODO` |
| Weight decay                | `TODO`  | `TODO` |
| Warmup                      | `TODO`  | `TODO` |
| Schedule                    | `TODO`  | `TODO` |
| Gradient clipping           | `TODO`  | `TODO` |
| Precision                   | `TODO`  | `TODO` |
| Random seeds                | `TODO`  | `TODO` |
| Checkpoint interval         | `TODO`  | `TODO` |
| Evaluation interval         | `TODO`  | `TODO` |

List every deviation, recovery, data skip, numerical anomaly, and manual
intervention with timestamps and supporting log locations.

## 8. Compute and execution

| Field                                  | Value  |
| -------------------------------------- | ------ |
| Provider / facility                    | `TODO` |
| Accelerator model and count            | `TODO` |
| CPU / RAM / storage relevant to run    | `TODO` |
| Interconnect                           | `TODO` |
| Peak accelerator memory                | `TODO` |
| Wall-clock duration                    | `TODO` |
| Accelerator-hours                      | `TODO` |
| Average / observed throughput          | `TODO` |
| Interruptions and recovery             | `TODO` |
| Cost estimate and method               | `TODO` |
| Energy / emissions estimate and method | `TODO` |

Do not substitute theoretical memory estimates for measured values. State
unknown values plainly.

## 9. Checkpoints and lineage

|   Step | Processed tokens | Validation loss | Artifact URI | SHA-256 | Retained? | Notes  |
| -----: | ---------------: | --------------: | ------------ | ------- | --------- | ------ |
| `TODO` |           `TODO` |          `TODO` | `TODO`       | `TODO`  | `TODO`    | `TODO` |

Explain the checkpoint-selection rule and record any averaging, merging,
conversion, pruning, or quantization between the selected checkpoint and final
release.

## 10. Evaluation

| Field                                | Value  |
| ------------------------------------ | ------ |
| Evaluation commit and command        | `TODO` |
| Dataset IDs, revisions, and licenses | `TODO` |
| Contamination / overlap analysis     | `TODO` |
| Prompt or template version           | `TODO` |
| Decoding settings and seed           | `TODO` |
| Metric implementation and version    | `TODO` |
| Raw output artifact and SHA-256      | `TODO` |
| Aggregate report and SHA-256         | `TODO` |
| Human-evaluation protocol            | `TODO` |
| Safety / red-team protocol           | `TODO` |

### Results

| Evaluation | Split / version | Metric |  Value | Confidence / variance | Evidence URI |
| ---------- | --------------- | ------ | -----: | --------------------- | ------------ |
| `TODO`     | `TODO`          | `TODO` | `TODO` | `TODO`                | `TODO`       |

Record negative and null results. State what each metric does not establish.

## 11. Export and release verification

| Field                                  | Value  |
| -------------------------------------- | ------ |
| Selected source checkpoint and SHA-256 | `TODO` |
| Export tool, version, and command      | `TODO` |
| Quantization / tensor conversion       | `TODO` |
| Released filename                      | `TODO` |
| Released size in bytes                 | `TODO` |
| Released SHA-256                       | `TODO` |
| Runtime compatibility test             | `TODO` |
| Source-to-export comparison            | `TODO` |
| Release manifest                       | `TODO` |

## 12. Limitations, safety, and incident notes

- Intended uses: `TODO`
- Out-of-scope uses: `TODO`
- Known model failure modes: `TODO`
- Data risks and affected groups: `TODO`
- Safety evaluation limits: `TODO`
- Privacy and rights concerns: `TODO`
- Security or integrity incidents: `TODO`
- Rollback / withdrawal criteria: `TODO`

## 13. Component licensing and provenance

| Component                     | Copyright / owner | Source | License / terms | Evidence | Open TODOs |
| ----------------------------- | ----------------- | ------ | --------------- | -------- | ---------- |
| Training code                 | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |
| Architecture/configuration    | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |
| Dataset(s)                    | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |
| Tokenizer                     | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |
| Model weights                 | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |
| Evaluation data               | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |
| Release images / brand assets | `TODO`            | `TODO` | `TODO`          | `TODO`   | `TODO`     |

Do not infer that one component's license covers another component. Obtain a
rights review before release when ownership or terms are unclear.

## 14. Approvals and unresolved items

| Review                    | Reviewer | Date   | Result | Evidence / notes |
| ------------------------- | -------- | ------ | ------ | ---------------- |
| Technical reproducibility | `TODO`   | `TODO` | `TODO` | `TODO`           |
| Data provenance           | `TODO`   | `TODO` | `TODO` | `TODO`           |
| Safety / limitations      | `TODO`   | `TODO` | `TODO` | `TODO`           |
| Licensing / release       | `TODO`   | `TODO` | `TODO` | `TODO`           |

### Blocking TODOs

- `TODO`

### Non-blocking follow-ups

- `TODO`
