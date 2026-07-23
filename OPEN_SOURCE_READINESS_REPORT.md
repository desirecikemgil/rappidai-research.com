# Open-source readiness report

- **Assessment date:** 2026-07-23
- **Pre-remediation website baseline:**
  `72bf760f9b1a512ab5de36190bb863403753bc39`
- **Scope:** `jonascikemgil07-hue/rappidai-research.com` plus read-only
  verification of public licensing and adoption signals for linked research and
  model artifacts

## Executive assessment

The website repository is a credible, well-maintained open-source publication
project. It is clear about its scope, builds reproducibly, uses evidence-bounded
research language, and has practical contribution, security, release, browser,
accessibility, and maintainer workflows.

It is not yet a strong standalone application artifact for an open-source AI
maintainer program. The implementation of the model research lives in the
separate `lumen-quantum` repository, which has no explicit top-level license.
The public pilot weights and tokenizers also have no explicit artifact license,
and neither pilot has a complete final run record. Genuine community adoption
and external maintenance activity remain limited.

The correct application framing is therefore:

> `lumen-quantum` is the implementation repository; this repository is the
> evidence-linked publication and documentation layer.

Do not represent the website repository alone as the complete model-training
project.

## Completed

### Repository and documentation

- The README states the repository's actual Next.js website scope and gives a
  reproducible quick start.
- Apache-2.0 covers original website code and documentation, with explicit
  component exclusions in `NOTICE` and `docs/licensing.md`.
- Contribution, conduct, security, governance, roadmap, changelog, citation,
  release, architecture, training, maintainer, and audit records are present.
- Dedicated responsible-AI guidance now defines intended use, high-risk and
  out-of-scope use, data risks, evaluation requirements, artifact security, and
  withdrawal criteria.
- Model cards keep verified metadata, publisher-reported results, configured
  targets, and absent evidence visibly separate.
- Maintainer guidance records concrete uses for Codex while retaining human
  responsibility for factual, legal, security, and release decisions.

### Quality and automation

- Exact direct dependency versions and a frozen pnpm lockfile are used.
- Formatting, linting, strict TypeScript checking, unit tests, relative-link
  checks, and the production build run in pull-request CI.
- Playwright and axe cover every public route, serious and critical automated
  accessibility findings, contact validation, internal navigation,
  reduced-motion mobile overflow, `robots.txt`, and `sitemap.xml`.
- Browser failure screenshots, traces, and reports are retained by CI.
- Public HTTP links run through a retrying scheduled checker rather than making
  every pull request depend on external service availability.
- CodeQL is configured for JavaScript and TypeScript changes and scheduled
  analysis.

### GitHub repository controls

- Repository description, canonical homepage, and focused topics are set.
- Secret scanning and push protection are enabled.
- Dependabot alerts, security updates, automated security fixes, and grouped
  dependency updates are enabled.
- Private Vulnerability Reporting is enabled.
- `main` requires the current `Verify` check, requires conversation resolution,
  and blocks force pushes and branch deletion. Admin bypass remains available
  for the single maintainer.
- Merged branches are deleted automatically.

## Verification results

The following results were obtained from the candidate working tree on
2026-07-23. They are local evidence; the new GitHub Actions and CodeQL workflows
must still complete on the published pull-request commit.

| Check                                  | Result                                                                |
| -------------------------------------- | --------------------------------------------------------------------- |
| Frozen dependency installation         | Passed                                                                |
| Prettier                               | Passed                                                                |
| ESLint                                 | Passed                                                                |
| TypeScript                             | Passed                                                                |
| Vitest                                 | 2 files, 14 tests passed                                              |
| Relative Markdown links                | Passed                                                                |
| Next.js production build               | Passed; 16 static/SSG routes generated                                |
| Playwright and axe                     | 14 browser tests passed in Chromium                                   |
| External HTTP links                    | 45 unique links passed                                                |
| Dependency audit                       | No known vulnerabilities found                                        |
| YAML and CFF syntax                    | 12 files parsed                                                       |
| High-confidence secret-pattern scan    | No match in the baseline or candidate diff                            |
| Large/model artifact scan              | No tracked model/checkpoint/dataset binary; largest file is 868,858 B |
| Git diff whitespace check              | Passed                                                                |
| Existing default-branch CI at baseline | Passed                                                                |
| Candidate pull-request CI and CodeQL   | Pending publication and remote execution                              |

Automated checks do not replace legal review, penetration testing, manual
screen-reader testing, model-artifact malware analysis, dataset inspection, or
independent reproduction of a training run.

## Remaining gaps

### Blocking for a strong open-source AI claim

1. The separate `lumen-quantum` implementation repository has no explicit
   top-level license.
2. `quantum-1-pilot` and `quantum-1.6-pilot` weights and tokenizers have no
   explicit artifact license in their public Hugging Face metadata.
3. Neither pilot has a final immutable run record linking source data,
   tokenizer, code, resolved environment, configuration, actual steps,
   checkpoints, logs, evaluation outputs, export, and released checksum.
4. Brand, icon, ambient-artwork, and model-card image provenance and reuse
   rights remain incomplete.
5. The Echelon production corpus and model training have not started in the
   reviewed public evidence.

### Project maturity and adoption

- The repositories are new and have limited stars, forks, external issues, and
  human contributions.
- There is no tagged website or model release history.
- No external integration, downstream project, citation, independent
  reproduction, or sustained user-maintenance workload is yet documented.
- OpenAI's current program terms say selection may consider repository usage,
  ecosystem importance, active maintenance, role, and program capacity. See
  [Codex for Open Source](https://developers.openai.com/community/codex-for-oss)
  and the
  [program terms](https://learn.chatgpt.com/docs/codex-for-oss-terms#2-eligibility-and-applications).

### Website release follow-ups

- Confirm the complete service address and deployment-specific legal/privacy
  record before treating the imprint as complete.
- Establish a tested Content Security Policy before enabling enforcement.
- Retain a commit-specific manual visual, keyboard, and screen-reader acceptance
  record for a release.
- Produce distribution-specific third-party notices or an SBOM if the project
  distributes a bundled artifact beyond ordinary source and website deployment.

## High-priority manual actions

1. Audit ownership and third-party code in `lumen-quantum`, then add an explicit
   code license there.
2. Choose and publish explicit per-artifact licenses for both pilots' weights
   and tokenizers.
3. Publish a final release/run record for at least one pilot using
   `docs/training-run-template.md`.
4. Record creator, source, date, transformations, permission, and reuse terms
   for every excluded image asset.
5. Create the first reviewed website release and keep model releases separate.
6. Seek real external use and contributions without manufacturing metrics or
   activity.
7. Apply with `lumen-quantum` as the primary implementation repository and this
   site as its documentation/evidence companion.

## Readiness scores

These scores evaluate the wider claim made by the website, not only whether the
Next.js build is polished.

| Category                        | Score | Reason                                                                  |
| ------------------------------- | ----: | ----------------------------------------------------------------------- |
| Licensing                       |  5/10 | Website scope is careful; research code, models, and images remain open |
| Documentation                   |  9/10 | Comprehensive, source-linked, and honest                                |
| Reproducibility                 |  4/10 | Website is reproducible; model runs are not complete                    |
| Code quality                    |  8/10 | Typed, linted, focused website implementation                           |
| Testing                         |  8/10 | Unit, build, link, browser, and automated accessibility coverage        |
| Community readiness             |  4/10 | Good contribution surfaces; little demonstrated adoption                |
| Security                        |  8/10 | Strong automation and settings; CSP/manual review remain                |
| Responsible AI                  |  9/10 | Clear limits and evidence rules; no comprehensive model safety eval     |
| Maintainer workflow             |  9/10 | Practical triage, review, dependency, release, and Codex guidance       |
| Overall open-source credibility |  6/10 | Credible publication layer; incomplete open-source AI core              |
| Application readiness           |  4/10 | Formally eligible, strategically early                                  |

## Suggested GitHub repository description

> Public website and evidence-linked documentation for rappidAI compact German
> language-model research.

## Suggested GitHub topics

These topics are configured on the repository:

```text
open-source
ai-research
machine-learning
language-model
nlp
model-cards
reproducibility
responsible-ai
nextjs
typescript
```

## Suggested pinned repositories

1. **`lumen-quantum`** — pin first after adding a valid license; it contains the
   actual data, tokenizer, training, evaluation, and export implementation.
2. **`rappidai-research.com`** — pin as the public evidence, model-card,
   responsible-AI, and contribution portal.

Do not pin an empty, private, unlicensed, or purely aspirational repository to
make the project appear larger.

## Application decision

Submitting an accurate application is permitted, but the expected selection
case is currently weak. The next material improvement is not more marketing
copy. It is an explicitly licensed implementation repository, explicitly
licensed model artifacts, one complete run/release record, and authentic
maintenance or adoption evidence.
