# Repository audit

- **Audit date:** 2026-07-22
- **Website baseline:** `rappidai-research.com` commit
  `3ddc3a2d6a974e891dbe51b7f7a67ba0bf391301`
- **Research reference:** `lumen-quantum` commit
  `f7eda1fb0ae153f0f9cc3477ead997cbdb462b39`

## Executive conclusion

The website has a small and understandable runtime surface: it is a Next.js
publication site backed by versioned local content and images. It contains no
model weights, training runtime, inference service, application API, database,
or server-side form receiver. The principal repository risks are therefore not
remote model execution; they are research-claim provenance, component-specific
licensing, dependency maintenance, publication configuration, and the risk of
manual QA being described without durable evidence.

The candidate preparation worktree adds documentation, community/release
materials, focused tests, CI, exact direct dependency versions, security
headers, and safer JSON-LD serialization in parallel changes. Those additions
are not evidence of a published state until committed, reviewed, and run in CI.
This audit deliberately identifies the baseline separately from candidate
remediation.

## Scope and method

The review covered:

- the complete tracked website baseline and its seven-commit history;
- route, component, content, asset, package, lockfile, and configuration files;
- high-confidence secret-pattern and absolute-local-path searches;
- tracked file sizes and model-artifact extension searches;
- dependency source/integrity information and a production dependency audit;
- public Hugging Face APIs, cards, manifests, and checksums for both pilots; and
- the read-only public research checkout for architecture, tokenizer, data, and
  training evidence.

It did not conduct penetration testing, third-party legal review, malware
analysis of model weights, full dataset inspection, independent retraining, or
independent reproduction of reported evaluation metrics.

## Repository inventory

The baseline contains 54 tracked files totaling approximately 3.2 MiB. Its
largest tracked file is the 868,858-byte ambient brand PNG. Generated dependency
and build directories are ignored and are not part of the Git distribution.

| Category         | Finding                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Application      | Next.js App Router, TypeScript, React, Tailwind CSS, Motion                                |
| Data/content     | Typed local TypeScript objects; no request-time model-data fetch                           |
| Assets           | Eight principal PNG files under `public/brand` and `public/models`, plus application icons |
| Model binaries   | No tracked `.gguf`, `.safetensors`, `.pt`, `.pth`, or checkpoint file                      |
| Training code    | None in this repository; public research code is external                                  |
| Server endpoints | No `app/**/route.ts` API endpoint and no server action found                               |
| Persistence      | No database, queue, analytics SDK, cookie writer, or form backend found                    |
| Contact path     | Local validation followed by a `mailto:` handoff to the visitor's email client             |

## Research-claim audit

The following values were checked against public primary artifacts and are the
maximum claims supported by the reviewed evidence.

| Subject             | Supported statement                                                                                                                | Unsupported escalation to avoid                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `quantum-1-pilot`   | Public F16 GGUF; 49,295,872 parameters; 512-token context; 98,990,560 bytes; published SHA-256                                     | Standardized benchmark quality, production readiness, or a fully reproducible final training run            |
| `quantum-1.6-pilot` | Same architecture; public F16 GGUF; release card reports 500M additional tokens, loss 3.348852, and perplexity 28.4700             | Treating `30,518` as verified completed steps or configuration as a final run log                           |
| `quantum-1-echelon` | 506,333,440-parameter architecture preflight; 2,048 context; 32,768 vocabulary; tokenizer validation; 1,380,886-token Garden smoke | Claiming an 8B-token corpus, completed production run, trained weights, model benchmark, or hardware result |
| Echelon variants    | Base and chat are stages/variants within one family                                                                                | Counting them as released independent model families                                                        |

Detailed evidence and limitations are recorded in the files under
`model_cards/` and in [Data and training](data-and-training.md).

## Security and privacy review

### Positive controls in the candidate worktree

- CI uses read-only default repository permissions, a frozen lockfile, a fixed
  Node version, and SHA-pinned third-party actions.
- Direct package versions are exact, and monthly dependency update checks are
  configured for npm and GitHub Actions.
- The JSON-LD helper escapes `<`, `>`, `&`, U+2028, and U+2029 before inline
  script insertion; focused tests cover script-breaking input.
- Response configuration removes the framework-identification header and adds
  `nosniff`, clickjacking, referrer, cross-domain-policy, and restricted
  camera/geolocation/microphone headers.
- Environment files are ignored except for a documented `.env.example`; the
  current site requires no secret environment variable.
- The contact form has no site-side receiver or storage. Visitors should still
  understand that their email client and provider govern the composed message.

### Scan results and qualifications

- A high-confidence scan of the working tree and baseline history found no
  credential-shaped secret match. Automated pattern scans are not proof that
  secrets have never existed.
- Historical `design-qa.md` contained absolute local filesystem paths. They were
  not credentials, but they exposed workstation-specific information and
  pointed to unavailable evidence. The replacement historical QA record removes
  those paths. Existing Git history still retains old text unless history is
  deliberately rewritten; no rewrite is recommended solely for these paths.
- The production dependency audit run against the candidate lockfile on
  2026-07-22 returned “No known vulnerabilities found.” Advisory databases and
  dependency graphs change, so CI and release-day review remain necessary.

### Remaining security follow-ups

- There is no Content Security Policy. Adding one is defense in depth, but Next
  inline scripts and framework behavior require a tested nonce or hash strategy;
  do not paste a restrictive policy into production without route testing.
- Current automated tests are focused unit/content checks rather than browser,
  accessibility, or end-to-end security tests.
- External links transfer visitors to separate services. Re-check link targets
  and external-service terms during release review.

## Supply-chain and dependency review

The lockfile contains registry-resolved packages with integrity hashes and no
reviewed direct Git, file, or arbitrary URL dependency. The candidate CI installs
with `--frozen-lockfile` and pins workflow actions to full commit SHAs. These
controls improve repeatability but do not establish that dependencies are free
of malicious code or future vulnerabilities.

In the separate research repository, `tools/llama.cpp` is a mode-`160000` Git
link at the reviewed commit, but no `.gitmodules` file is present. The exact
linked tool revision therefore cannot be initialized through the normal
submodule workflow from that public checkout; this is an external research
reproducibility and supply-chain gap, not a website runtime dependency.

Before release:

1. run the full format, lint, type-check, test, and production-build suite;
2. run production and full dependency audits using current advisory data;
3. review lockfile-only changes and action SHA updates;
4. inspect build output for unexpected external requests or server routes; and
5. prepare distribution-specific third-party notices or an SBOM if distributing
   bundled artifacts beyond ordinary website deployment.

## Licensing and provenance review

Licenses must remain component-specific:

| Component                           | Audit state                                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original website code/documentation | Candidate root `LICENSE` and `NOTICE` identify Apache-2.0 scope for material the contributors have rights to.                                              |
| Brand and model-card PNGs           | Provenance is incomplete; they are explicitly excluded from the Apache grant pending creator/source/permission records. No reuse license is claimed.       |
| Pilot weights/tokenizers            | Publicly downloadable, but no explicit artifact license was found in the reviewed Hugging Face metadata. Do not label them open source or freely reusable. |
| FineWeb2-HQ / source text           | ODC-By 1.0 plus Common Crawl terms and underlying source rights; privacy and rights risks remain.                                                          |
| `lumen-quantum` code                | Separate work requiring its own explicit license and provenance review. It is not licensed by this website repository.                                     |

See [Licensing and provenance](licensing.md) and the asset-directory READMEs.
The records are maintenance guidance, not legal advice.

## Documentation and QA review

The baseline design-QA file asserted a pass and referred to screenshots stored
outside the repository. A reviewer or CI job could not reproduce those claims.
The replacement [Historical design QA record](design-qa.md):

- labels the review as a historical manual exercise;
- removes local absolute paths and unavailable artifact claims;
- does not certify current route, browser, console, or accessibility status; and
- provides a repeatable checklist for attaching evidence to a future PR or
  release.

This distinction matters: semantic markup visible in source code is evidence of
implementation intent, while a browser/accessibility pass requires a recorded
test environment and retained output.

## Open findings and release priorities

| Priority | Finding                                                                                                 | Required action                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| High     | Pilot weights/tokenizers lack an explicit reviewed artifact license                                     | Publish exact per-artifact terms before any open-weight or reuse claim                                    |
| High     | Brand/model-card asset provenance and reuse rights are incomplete                                       | Record creator, source, date, permission/license, and transformations per file                            |
| High     | Neither pilot has a final public run manifest                                                           | Link immutable data, tokenizer, config, code, checkpoints/logs, evaluation, export, and checksum evidence |
| High     | Echelon production data and training have not started                                                   | Preserve “preflight/smoke only” wording until completed artifacts exist                                   |
| Medium   | Public legal identity still requires owner-supplied verification where the site marks values incomplete | Confirm before treating the imprint or launch record as complete                                          |
| Medium   | No browser-level accessibility/end-to-end suite                                                         | Add reproducible route, form, keyboard, responsive, and automated accessibility checks                    |
| Medium   | No CSP                                                                                                  | Design and test a deployment-compatible policy with reporting before enforcement                          |
| Medium   | No final SBOM / distribution-specific third-party notice                                                | Generate as part of a release when the distribution method requires it                                    |
| Low      | Historical local paths remain in Git history                                                            | Accept as non-secret history or rewrite only after explicit maintainer risk review                        |

## Release decision rule

The website can be reviewed and released independently of model training, but
the release record should not imply that publication of a page completes any
open research or licensing item. Before a public release, the maintainer should:

- merge only reviewed, intentional files;
- obtain a clean CI result from the exact commit;
- verify production configuration and legal owner-supplied fields;
- keep model claims within the evidence table above;
- publish or explicitly defer component licenses and provenance; and
- attach current visual, accessibility, and route evidence if claiming those
  qualities were tested.
