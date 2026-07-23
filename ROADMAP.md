# Roadmap

This roadmap records intended work, not promises, funded commitments, or fixed
release dates. Priorities may change as evidence and maintainer capacity change.

## Current

- Establish a clear open-source contribution, conduct, security, governance,
  citation, and release baseline for the website repository.
- Maintain CPU-only continuous integration for formatting, type checking,
  linting, focused tests, and the production build without secret or GPU
  requirements.
- Maintain focused tests for content contracts, canonical URL handling,
  metadata, structured data, and other stable website behavior.
- Maintain Chromium coverage for public routes, internal navigation, contact
  validation, reduced-motion mobile overflow, and serious or critical automated
  accessibility findings.
- Verify relative documentation links in pull requests and public HTTP links on
  a weekly schedule.
- Run CodeQL analysis for JavaScript and TypeScript changes and scheduled
  security review.
- Keep the website's licensing scope separate from brand assets, model-card
  images, model weights, tokenizers, datasets, and external repositories.
- Replace ambiguous model claims with sourced facts, explicit unknowns, and
  clearly labeled research status.
- Verify deployment-specific hosting log categories, retention, purposes and
  legal bases before treating the privacy notice as complete.

## Next

- Extend manual accessibility evidence to representative screen readers and
  retain a commit-specific acceptance record for releases.
- Evaluate deterministic visual-regression coverage after the project can retain
  licensed reference images and documented comparison thresholds.
- Publish canonical, versioned model cards with release revisions, checksums,
  evaluation provenance, data attribution, and model-specific licenses.
- Publish the missing final run manifests and evaluation artifacts needed to
  assess reproducibility claims.
- Record creator, provenance and reuse terms for brand and model-card images.

## Later

- Define a small, documented website release process and archive release notes.
- Evaluate an automated dependency-review gate in addition to the existing
  grouped monthly update checks.
- Add a machine-readable source record for public model facts so the website
  and canonical model cards can be checked for drift.
- Improve contributor documentation based on actual recurring questions.
- Evaluate additional quantized artifact listings only after each artifact's
  provenance, checksum, compatibility, and license are documented.

## Long-term research directions

- Investigate compact German-language models under realistic local-compute
  constraints.
- Develop the `quantum-1-echelon` line as a research direction without
  presenting an unreleased model as complete.
- Improve transparent data documentation, repeatable evaluation, and failure-
  mode reporting.
- Explore inference efficiency and local deployment while preserving clear
  safety and compatibility limits.

These research directions belong to the wider rappidAI project. Their presence
here does not mean that training code, datasets, model weights, or releases are
part of this website repository.
