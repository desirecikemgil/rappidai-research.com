# Contributing to rappidAI Research

Thank you for considering a contribution. This repository contains the
rappidAI public website. It does not contain the model weights, training data,
or the complete training and inference implementation.

## Before you begin

- Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Use a public issue for bugs, feature requests, documentation work, and
  research proposals.
- Report security vulnerabilities privately as described in
  [SECURITY.md](SECURITY.md).
- Do not submit confidential, personal, unlawfully obtained, or access-
  controlled data.
- Do not commit API keys, tokens, passwords, private URLs, model credentials,
  local environment files, or other secrets.

## Development setup

Requirements:

- Node.js 20.19 or newer
- pnpm 11.9.x; the repository declares `pnpm@11.9.0`

Fork the repository, clone your fork, and create a focused branch:

```bash
git clone https://github.com/<your-user>/rappidai-research.com.git
cd rappidai-research.com
git switch -c <short-description>
pnpm install --frozen-lockfile
```

Start the local development server with:

```bash
pnpm dev
```

## Make a focused change

- Keep pull requests small enough to review.
- Preserve the separation between content, components, and public assets.
- Match the existing TypeScript and formatting conventions.
- Update documentation when behavior or public claims change.
- Avoid unrelated restructuring or dependency additions.
- Do not add model, dataset, benchmark, release, partnership, or personnel
  claims without a public, durable source.

For model or research metadata, link the exact model card, manifest,
configuration, report, commit, or dataset revision that supports the change.
Clearly distinguish a target, plan, or self-reported result from a verified
artifact. Download counts, benchmark results, hardware details, and run totals
must never be estimated.

## Validate the change

Run the checks relevant to this repository:

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

`pnpm check` runs the complete sequence above. Do not claim that checks pass
unless you ran them and report their actual results. If a check cannot run,
explain why in the pull request.

For visible changes, also inspect affected pages at desktop and mobile widths,
keyboard navigation, focus states, and reduced-motion behavior.

## Licensing and provenance

By intentionally submitting a contribution for inclusion, you agree that the
contribution is provided under Apache-2.0 as described in section 5 of the
license, unless you conspicuously mark it as not being a contribution before it
is incorporated.

Only submit material that you created or are authorized to contribute. For any
new code, text, image, font, icon, model-derived output, or other asset, provide:

- its original source;
- its author or rights holder;
- its license and required attribution; and
- a short explanation of your permission to contribute it.

Do not assume that public availability permits redistribution. Brand assets,
model-card images, model weights, tokenizers, datasets, and external repository
content are outside this repository's Apache-2.0 scope unless their rights and
license are documented separately. See [docs/licensing.md](docs/licensing.md).

## Commit and pull-request guidance

Write concise, imperative commit subjects, for example:

```text
Clarify model license status
Fix mobile navigation focus
Document verified release checksum
```

Open a pull request against the default branch and complete the template. The
description should explain:

- what changed and why;
- which checks were run and their results;
- any visible, compatibility, privacy, security, or accessibility impact;
- the provenance and license of new material; and
- whether model, tokenizer, dataset, or training compatibility is affected.

A maintainer may request changes, ask for stronger evidence, or decline work
that is outside the website's scope. Approval and passing checks do not create
an obligation to merge.

## Reporting issues and proposing work

Use the structured issue forms. Remove secrets, private paths, personal data,
and access tokens from screenshots and logs before posting. Search existing
issues first and provide the smallest reproducible example you can.

Research or experiment proposals should identify the research question,
method, evaluation plan, compute assumptions, data provenance, licensing, and
safety limitations. A proposal is not a release commitment.
