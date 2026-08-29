# Licensing and provenance

This document records the intended license boundary for this website
repository. It is a project-maintenance record, not legal advice and not a
substitute for reviewing the applicable license texts and source terms.

## Repository scope

Unless a file states otherwise, the Apache License 2.0 in the repository root
applies to original website source code and original project documentation for
which rappidAI contributors hold the necessary rights.

| Material                                                                  | Current treatment                                                                         |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Original TypeScript, TSX, CSS, and configuration written for this website | Apache-2.0                                                                                |
| Original Markdown documentation written for this website                  | Apache-2.0                                                                                |
| `CODE_OF_CONDUCT.md`                                                      | Contributor Covenant 2.1, CC BY 4.0, with attribution in the file                         |
| Files under `public/brand/`                                               | Excluded from the Apache-2.0 grant pending a recorded asset license and provenance review |
| Files under `public/models/`                                              | Excluded from the Apache-2.0 grant pending a recorded asset license and provenance review |
| `app/icon.png` and `app/apple-icon.png`                                   | Excluded because they are derived from or represent project brand material                |
| Project names, logos, and brand marks                                     | No trademark permission is granted by Apache-2.0                                          |
| Third-party packages, fonts, and icons                                    | Governed by their own licenses                                                            |
| Model weights, tokenizers, and hosted model files                         | Not licensed by this repository                                                           |
| Training and evaluation datasets                                          | Not licensed by this repository                                                           |
| The external `lumen-quantum` repository                                   | Not licensed by this repository                                                           |

Public availability, a download link, or a Git repository does not by itself
grant permission to copy, modify, or redistribute material.

## Website dependencies

The package manifest and lockfile are the authoritative version record. Direct
dependencies currently include material under several licenses:

- Next.js, React, React DOM, Motion, Tailwind CSS, and ESLint: MIT;
- Lucide: ISC;
- Geist fonts: SIL Open Font License; and
- TypeScript and Playwright: Apache-2.0; and
- `@axe-core/playwright`: Mozilla Public License 2.0.

Transitive packages introduce additional licenses. Dependency files are not
relicensed under the website's Apache-2.0 license. Preserve license and
attribution files when distributing dependencies or a build that incorporates
their protected material. Before each public binary or bundled distribution,
review the resolved dependency tree and produce or update third-party notices
appropriate to what is actually shipped.

The repository-level `NOTICE` is a scope and attribution record. It is not an
exhaustive substitute for notices shipped by dependency packages.

## Brand and model-card images

The PNG files are described in the project history as supplied project assets,
but the repository does not contain a complete provenance record proving who
created each source image, what transformations were made, or which reuse
license applies.

Before licensing or redistributing an image independently:

1. identify the original file and creator;
2. record the rights holder and source date;
3. retain the license or written permission;
4. record any generated or edited derivatives; and
5. confirm whether trademark restrictions apply separately from copyright.

Until that work is complete, do not label these files Apache-2.0, public domain,
or freely reusable.

## Model weights and tokenizers

The website links to public Hugging Face repositories for `quantum-1-pilot` and
`quantum-1.6-pilot`. On 24 July 2026, the maintainer published a deliberate
license decision for both pilot releases: their weights, GGUF artifacts and
trained tokenizers are **all rights reserved**. No public reuse license is
granted, and the artifacts must not be described as open weight. [1]

| Artifact scope                     | Exact reviewed model revision              | Current reuse position                       |
| ---------------------------------- | ------------------------------------------ | -------------------------------------------- |
| `quantum-1-pilot` weights / GGUF   | `7daf415ef09fc131d7440af8514a93fd8cf3f2a1` | All rights reserved; no public reuse license |
| `quantum-1.6-pilot` weights / GGUF | `507662c095b5ba6e14f24d3fc7f0a5e29d76b7f3` | All rights reserved; no public reuse license |
| Pilot trained tokenizer binaries   | Public artifact revision not confirmed     | All rights reserved; no public reuse license |

Accordingly, redistribution, modification and commercial use of these pilot
artifacts are not granted. Their availability for download does not itself grant
permission to copy, modify or redistribute them. The Apache-2.0 license of this
website and the Apache-2.0 license of the source repository do not apply to
these model artifacts. [1] [2]

The decision is deliberately reversible: an explicit reuse license may be
published later. Until a new, versioned decision is published, this record and
the model-license registry define the public reuse boundary. [1]

Each release record should continue to identify the exact covered files and
revision, dataset and third-party obligations, intended-use limits, checksums
and provenance. This documentation is a maintenance record, not legal advice.

## Training data

Public project documentation identifies `epfml/FineWeb2-HQ`, subset
`deu_Latn`, as a training-data source. Its dataset card states that the database
is provided under the Open Data Commons Attribution License 1.0 and that use is
also subject to Common Crawl's Terms of Use.

- Dataset: <https://huggingface.co/datasets/epfml/FineWeb2-HQ>
- ODC-By 1.0: <https://opendatacommons.org/licenses/by/1-0/>
- Common Crawl Terms of Use: <https://commoncrawl.org/terms-of-use>

The database license does not automatically clear every copyright, privacy,
personality, or other right in every source webpage. The dataset documentation
also warns that personal or sensitive information may remain. Model release
documentation should identify the pinned dataset revision, filtering,
deduplication, attribution, opt-out/removal process, and known limitations.

No dataset or derived dataset is covered by this website repository's
Apache-2.0 license.

## External research repository and tools

The separate repository at
<https://github.com/rappidAI-Research/lumen-quantum> contains the training and
evaluation source material referenced by this website. Its top-level Apache-2.0
license covers the repository's source code, configurations, tests and original
documentation, not pilot weights, GGUF artifacts or trained tokenizer binaries.
It remains a separate work and is not covered by this website repository's
license. [1] [2]

External tools such as `llama.cpp`, PyTorch, Transformers, SentencePiece, and
their dependencies retain their upstream licenses. Linking to, invoking, or
depending on them does not relicense them under Apache-2.0.

## Contribution provenance

Contributors must follow [CONTRIBUTING.md](../CONTRIBUTING.md). Do not accept new
code, prose, images, model-derived content, datasets, or copied examples unless
their source, author, license, attribution, and contribution permission are
recorded in the pull request.

## Open review items

- Confirm the rights holder for the original website code and documentation.
- Complete a per-file provenance record for all brand and model-card images.
- Maintain the published all-rights-reserved decision for pilot artifacts; publish
  an explicit reuse license only if the policy changes.
- Confirm and pin the public revision of each trained tokenizer binary before
  any future licensing or distribution change.
- Review the dataset and source-content obligations before any model release.
- Reassess the `lumen-quantum` source license and its dependency obligations
  whenever its scope or distribution changes.
- Generate distribution-specific third-party notices for production bundles.
- Revisit this file whenever a new asset, dependency, dataset, model, or
  external repository is added.

## References

[1]: https://github.com/rappidAI-Research/lumen-quantum/blob/f79c395c1da82827a63706ea9b55c913c073bd91/MODEL_LICENSES.md "Model and tokenizer license registry"
[2]: https://github.com/rappidAI-Research/lumen-quantum/blob/f79c395c1da82827a63706ea9b55c913c073bd91/LICENSE "lumen-quantum Apache License 2.0"
