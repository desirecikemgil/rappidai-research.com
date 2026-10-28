# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project intends to use [Semantic Versioning](https://semver.org/) if
versioned releases are introduced.

## [Unreleased]

### Security research and resources — 28 October 2026

- Added source-pinned Ghost v0.3.0 and Sentinel-Alpha research summaries, documentation links, example workflows and current project-status entries in English and German.
- Updated the existing false-positive note with the implemented evaluation infrastructure, an evaluation protocol and an eighteenth reference. No new model performance is claimed; the pilot note and all routes are retained.
- Corrected the shared Sentinel summary to describe development without implying an active training run. Added source-pin, translation, responsive-layout and accessibility coverage.
- Corrected F1 for the hypothetical detector that misses every vulnerability and replaced the obsolete OWASP Benchmark wiki link.
- Recorded the source audit and publication boundaries in `docs/security-research-review-2026-10-28.md`.

### Second research note — 24 October 2026

- Published the research note "The False Positive Problem in AI Vulnerability Detection" in English and German: a research-informed analysis of why AI-based vulnerability detection confuses suspicious patterns with exploitable weaknesses, covering causes, costs, hard negatives, evaluation metrics, the Quantum Sentinel-Alpha research direction and open questions, with 17 verified references. It reports no new experiments or Sentinel-Alpha results.
- Moved both research notes onto one shared article template with contents, figures, code examples, tables and numbered citations; the first note's content is unchanged and its spacing below the evidence notice is fixed.
- Added a minimal detection-outcomes cover figure, listed the new note on the publications index, homepage, documentation sidebar and Quantum Sentinel-Alpha page, and added SEO metadata, article structured data and tests for citations and references.

### Professional polish — 23 October 2026

- Removed typical AI-website decoration: arrow and check-mark icons, window traffic-light dots, announcement pills, status dots, glow, gradient text, pulsing and blur-in effects, and decorative 01/02 numbering.
- Replaced mono uppercase labels with sentence-case labels in Geist Sans; Geist Mono is now reserved for technical values.
- Rewrote slogan-style headings in English and German as plain, descriptive headings without trailing full stops, and reduced dash-heavy copy. Facts, evidence labels and limits are unchanged.

### Model list names — 19 October 2026

- Model lists (lineup table, model index, homepage portfolio, mega menu and footer) now name every model in the same lowercase, hyphenated form: quantum-sentinel-alpha, quantum-1-echelon, quantum-1.6-pilot and quantum-1-pilot. Headings and running text keep the public names.

### Mobile layout pass — 18 October 2026

- The oversized footer wordmark now reads „quantum“ instead of „rappidAI“, at the same size.
- Restored the responsive rules for the model comparison: its three model cards now stack on phones and tablets instead of squeezing text into letter-wide columns.
- Label/value tables (model cards, Echelon specifications, Ghost limits) and the research, reproducibility, licensing, model and tool matrices now show one card per row on phones, with each value labelled.
- Replaced mid-word line breaking with hyphenation, made the evidence grid width-aware, kept window title bars and status chips from stretching or truncating, and tightened heading line heights.
- Localised remaining figures on German pages (49,3 Mio., 8 Mrd. Tokens, 49.295.872) and fixed tablet and desktop spots where German labels did not fit.

### German copy revision — 18 October 2026

- Rewrote the German site copy so it reads like native German rather than a literal translation: about 950 strings across the locale dictionaries and inline page copy, a consistent formal „Sie“, „Belege“ instead of „Evidenz“, and German typography and number formats. Facts, evidence labels and limits are unchanged.
- Translated English leftovers on `/de`: layer and token units, research finding labels, license-registry labels, Replay source links, „Local-first“ and „German-first“ chips, and the primary-navigation and section-index aria-labels.
- Added `docs/german-style-guide.md` with the voice rules and glossary for future German copy.

### Website rebuild — 18 October 2026

- Rebuilt the website as a light, institutional research site: new design system on Geist Sans and Geist Mono, grouped navigation (Models, Research, Tools, About) with mega-menu panels and a separate Contact action, and light page headers with breadcrumbs, key facts and a short page map.
- Moved research, resources and legal pages into a shared documentation layout with a persistent section sidebar.
- Redesigned the homepage around Quantum Sentinel-Alpha, a two-lane pipeline figure, the training roadmap and a portfolio built from real content; added a deep-navy footer that ends in an oversized rappidAI wordmark.
- Replaced decorative atmosphere, parallax and network-backdrop effects with one reveal observer and short scroll-linked CSS animations that respect reduced motion. The Echelon signal lattice is unchanged.
- Kept all content, URLs, English/German parity and evidence labels. The previous website is preserved in `old/` as a frozen backup.

### Quantum 1 Echelon presentation — 30 September 2026

- Replaced the Echelon orbit aura with an interactive signal lattice: a fine canvas grid that bends towards the pointer like a gravity well, lights up around it, ripples on click and carries sparse signal pulses along its lines. It pauses offscreen, on hidden tabs and for reduced motion, and falls back to a static CSS grid without JavaScript.
- Restructured the Echelon hero around a two-part status chip, a pointer-lit wordmark, primary and secondary calls to action and a horizon strip of key targets, each labelled Target or Planned.
- Refined the Echelon detail page with numbered principles, a specification sheet with status chips, a dashed development path and a numbered source list, and gave the model index card a grid texture. Model information and evidence boundaries are unchanged.

### Ghost v0.3.0 website update — 21 September 2026

- Promoted released Ghost v0.3.0 across the homepage, tools overview, Ghost detail page and English/German metadata.
- Replaced v0.2 release pins, binaries and benchmark claims with the audited v0.3.0 release commit, release assets and 25 PASS / 0 FAIL / 0 SKIP GhostBench gate.
- Documented the integrated Prompt-Injection Guard, trust context, ALLOW/DENY/SHADOW/ASK approval, runtime resource protection, automatic preflight, evidence summaries and current limitations.

### Readiness pass — 18 September 2026

- Aligned English/German identity, metadata, contact and Echelon stages with current project evidence; added the compute plan without asserting training or credit approval.
- Corrected canonical GitHub links, source-license drift, Ghost release/development wording and Replay live-rerun examples.
- Excluded test fixtures by path from public-link validation and added resolved content-module URL checks with regression coverage.
- Patched vulnerable transitive dependencies within their existing release lines.

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
