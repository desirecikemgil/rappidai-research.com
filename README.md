# rappidAI Research

[![CI](https://github.com/jonascikemgil07-hue/rappidai-research.com/actions/workflows/ci.yml/badge.svg)](https://github.com/jonascikemgil07-hue/rappidai-research.com/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)

rappidAI is an independent, early-stage AI research project developing compact language-model experiments and documented training, evaluation and local-inference workflows for developers, researchers, students and builders working with limited compute.

This repository contains the source for the [public rappidAI research website](https://www.rappidai-research.com) and its source-linked research documentation. It does **not** contain model training code, datasets, tokenizers, checkpoints or an inference runtime. Those implementation files currently live in the separate [`lumen-quantum`](https://github.com/jonascikemgil07-hue/lumen-quantum) research repository.

## Project status

- **Early-stage research project** under active development.
- The website is a statically rendered Next.js application with no database, API routes, analytics or model execution.
- `quantum-1-pilot` and `quantum-1.6-pilot` are public experimental base-completion releases, not chat assistants or production systems.
- `quantum-1-echelon` is the strategic next model line. Architecture, tokenizer and data-pipeline preflight artifacts are public, but no trained model has been released.
- Model-weight reuse rights and several training-data/run details remain unresolved; see [Licensing](docs/licensing.md) and [Data and training](docs/data-and-training.md).

## Goals

The project investigates:

- compact German-language causal language models;
- documented data, tokenizer and training workflows;
- local inference with publicly inspectable GGUF artifacts;
- evaluation that reports limitations alongside metrics; and
- a larger `quantum-1-echelon` pipeline without presenting planned work as completed work.

The project does not claim frontier-model capability, benchmark competitiveness, production readiness or complete reproducibility where final artifacts are missing.

## Models

| Model line          | Public status                             | Verified public facts                                                                                                      | Local documentation                            |
| ------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `quantum-1-pilot`   | Experimental F16 GGUF release             | 49,295,872 parameters; 512-token context; 98,990,560-byte artifact                                                         | [Model card](model_cards/quantum-1-pilot.md)   |
| `quantum-1.6-pilot` | Experimental F16 GGUF release             | Same 49.3M architecture; public card reports 500M additional tokens, validation loss 3.348852 and perplexity 28.4700       | [Model card](model_cards/quantum-1.6-pilot.md) |
| `quantum-1-echelon` | Pipeline in development; no model release | 506,333,440-parameter base-architecture preflight; 2,048-token configured context; tokenizer and Garden smoke-test reports | [Model card](model_cards/quantum-1-echelon.md) |

Historical display names such as `Quantum 1 Base` refer to the `quantum-1-pilot` baseline release. `quantum-1-echelon-base` and `quantum-1-echelon-chat` are stages or variants within the `quantum-1-echelon` line, not separate model families.

## Quick start

Requirements:

- Node.js 20.19 or newer
- pnpm 11.9.x (the repository pins `pnpm@11.9.0`)

```bash
git clone https://github.com/jonascikemgil07-hue/rappidai-research.com.git
cd rappidai-research.com
npm install --global pnpm@11.9.0
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command             | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`          | Start the local development server.                    |
| `pnpm format:check` | Verify formatting without changing files.              |
| `pnpm lint`         | Run ESLint.                                            |
| `pnpm typecheck`    | Run TypeScript without emitting files.                 |
| `pnpm test`         | Run the CPU-only unit tests once.                      |
| `pnpm build`        | Build the production site and prerender public routes. |
| `pnpm check`        | Run the complete local validation sequence.            |

No GPU, model download, API key or external service is required to build and test this website.

## Repository structure

```text
.github/       CI, dependency updates, ownership and contribution templates
app/           Next.js routes, metadata, sitemap, robots and global styles
components/    Layout, interaction, research and shared UI components
content/       Typed public facts and page copy
docs/          Architecture, licensing, training context and maintainer guidance
lib/           Small framework-independent helpers
model_cards/   Evidence-bounded cards for each model line
public/        Brand and model-card images used by the site
tests/         CPU-only content and serialization tests
```

The idiomatic Next.js App Router layout is retained intentionally. Empty Python-style `training/`, `evaluation/` or `inference/` directories would misrepresent this repository's scope.

## Content and configuration

Most public facts are centralized outside component logic:

- [`content/site.ts`](content/site.ts) — identity, verified URLs, contact, legal and privacy configuration.
- [`content/models.ts`](content/models.ts) — model names, release status, sources, limitations and public artifacts.
- [`content/research.ts`](content/research.ts) — research questions, evidence boundaries and reproducibility links.
- [`content/pages.ts`](content/pages.ts) — route copy and metadata.
- [`content/types.ts`](content/types.ts) — content contracts.

Keep claims source-linked. Do not add benchmark scores, release status, people, partners, hardware results or licensing statements unless a public artifact supports them.

## Training, inference and evaluation

This website has no training, evaluation or generation CLI. The external `lumen-quantum` repository contains the current Python scripts and YAML configurations. Its public planning documents and code are useful implementation references, but its repository has no explicit top-level license and the published `quantum-1.6-pilot` release is not accompanied by a final public run manifest or complete training log.

The model cards distinguish among:

- facts confirmed by public release manifests and checksums;
- metrics reported by a Hugging Face model card;
- targets present only in configuration or planning documents; and
- information that is not yet publicly documented.

Local llama.cpp examples and artifact checksums are recorded in the relevant [model cards](model_cards/). Treat all generated text as untrusted and review the [security policy](SECURITY.md) before loading third-party artifacts.

## Reproducibility

The website build is controlled by an exact pnpm lockfile and is checked with formatting, linting, type checking, unit tests and a production build in CI.

The model workflows are only partially reproducible from public materials. Code and configurations are available externally, while several run-specific inputs remain incomplete or unverified. Current gaps include final data manifests, complete environment locks, run logs, hardware details and raw evaluation outputs. See [Data and training](docs/data-and-training.md) and use the [training-run template](docs/training-run-template.md) for future releases.

The reviewed `lumen-quantum` commit also records `tools/llama.cpp` as a Git link
without a `.gitmodules` entry, so that exact external tool revision cannot be
initialized through the normal submodule workflow from the public checkout.

## Hardware requirements

- **Website:** a supported Node.js environment; no GPU is required.
- **Pilot inference:** public GGUF files are approximately 98.99 MB each, but minimum RAM and performance have not been formally measured by the project.
- **Training:** hardware and duration for the released pilot runs are not fully documented.
- **`quantum-1-echelon`:** the preflight report includes static memory estimates, not a completed training-hardware measurement.

## Licensing

- Website source code and original repository documentation: [Apache License 2.0](LICENSE).
- Brand and model-card images: no separate public license grant is currently documented.
- Model weights and tokenizers: the public Hugging Face repositories do not currently state a license.
- Training data: upstream dataset and source-content terms apply independently.
- Dependencies and external repositories: governed by their own licenses; they are not relicensed here.

See [docs/licensing.md](docs/licensing.md) for the full scope and unresolved items. Public availability alone does not grant reuse rights.

## Limitations and responsible use

The public pilot models can produce false, repetitive, incomplete or incoherent text. They are not instruction-tuned, are limited to a 512-token context and have no published standardized downstream benchmarks. Do not use them for medical, legal, financial, safety-critical or other high-stakes decisions.

Model files, checkpoints and dataset samples are untrusted inputs. Verify checksums, prefer non-executable formats, avoid unsafe deserialization, do not enable remote code without review and run unfamiliar training or inference code in an isolated environment.

## Roadmap and contributing

Current and proposed work is tracked in [ROADMAP.md](ROADMAP.md). Contributions are welcome when they preserve the evidence boundary and do not introduce confidential, unlawfully obtained or ambiguously licensed material. Start with [CONTRIBUTING.md](CONTRIBUTING.md), the [governance model](GOVERNANCE.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

Security vulnerabilities should follow [SECURITY.md](SECURITY.md), not a public issue.

## Citation

Use [`CITATION.cff`](CITATION.cff) for this website repository. Model releases should be cited separately using their own repository, version, manifest and checksum; no DOI is currently published.

## Maintainer and contact

- Maintainer: Jonas Désiré Cikemgil (`@jonascikemgil07-hue`)
- Public contact: [cikemgil@rappidai-research.com](mailto:cikemgil@rappidai-research.com)
- Hugging Face: [rappidai-research](https://huggingface.co/rappidai-research)
- Research implementation: [`lumen-quantum`](https://github.com/jonascikemgil07-hue/lumen-quantum)

The imprint and privacy pages still require a verified service address and deployment-specific legal review. This repository does not present legal documentation as legal advice.
