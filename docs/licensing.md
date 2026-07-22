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
- TypeScript: Apache-2.0.

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

The website links to public Hugging Face repositories for
`quantum-1-pilot` and `quantum-1.6-pilot`. At the time this record was prepared,
their public model metadata did not state a model license. Downloadability does
not establish permission to modify or redistribute the weights or tokenizers.

Each model repository needs its own deliberate license decision and a model
card that identifies:

- the exact files and repository revision covered;
- whether weights, tokenizer files, configuration, examples, and documentation
  share a license or use different licenses;
- all dataset, software, and third-party attribution obligations;
- the intended-use and safety limitations; and
- checksums and release provenance.

Do not describe a model as open source or open weight solely because a file can
be downloaded. Do not use the website's Apache-2.0 license as the model license.

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
<https://github.com/jonascikemgil07-hue/lumen-quantum> contains training and
evaluation code referenced by this website. It is a separate work and is not
covered by this repository's license. It requires its own provenance review and
license before it can be represented as reusable open-source software.

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
- Choose and publish explicit licenses for each model's weights and tokenizer.
- Review the dataset and source-content obligations before any model release.
- License the `lumen-quantum` repository independently after reviewing its
  code, dependencies, and external tool references.
- Generate distribution-specific third-party notices for production bundles.
- Revisit this file whenever a new asset, dependency, dataset, model, or
  external repository is added.
