# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project intends to use [Semantic Versioning](https://semver.org/) if
versioned releases are introduced.

## [Unreleased]

### Added

- A public Resources hub covering publications, reproducibility, data and
  training, responsible use, licensing, project status, and frequently asked
  questions.
- A source-linked research note on the documented quantum-1.6-pilot
  continued-pretraining experiment and its negative generation result.
- Public artifact-integrity records, evidence statuses, review dates, release
  checksums, data-provenance boundaries, and reporting channels.
- Apache-2.0 licensing for original website code and original project
  documentation, with explicit scope exclusions.
- Contribution, conduct, security, governance, roadmap, citation, release, and
  maintainer documentation.
- GitHub ownership, pull-request guidance, and structured issue forms.
- CPU-only continuous integration, focused content and metadata tests, and
  monthly dependency updates with grouped minor and patch changes.
- Chromium route, contact-form, responsive-overflow, and automated
  accessibility checks with failure artifacts retained by CI.
- Relative-link validation on pull requests, scheduled public-link validation,
  and CodeQL analysis for JavaScript and TypeScript.
- Evidence-bounded model cards, data/training and architecture documentation,
  responsible-AI guidance, a dated repository audit, a future run template, and
  asset provenance records.

### Changed

- Completed the public service and controller address while retaining an
  explicit deployment-specific privacy and legal-review boundary.
- Connected the homepage, research page, model pages, contact page, footer,
  sitemap, metadata, and structured data to the new documentation hub.
- Corrected and source-linked model status, metrics, naming, licensing gaps, and
  the preflight-only state of `quantum-1-echelon`.
- Pinned research evidence links to the reviewed Hugging Face and
  `lumen-quantum` revisions.
- Applied one project-wide Prettier format contract and documented the website's
  actual scope, commands, environment, and reproducibility boundary.

### Security

- Updated the patched Next.js dependency line and overrode affected transitive
  `sharp` and `postcss` versions.
- Added conservative response headers and script-safe JSON-LD serialization.

No historical versions or release dates are inferred from the repository.
