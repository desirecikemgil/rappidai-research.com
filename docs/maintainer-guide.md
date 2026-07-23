# Maintainer guide

This guide is designed for a small maintainer-led website project. It does not
assume dedicated release, security, legal, or community teams.

## Issue triage

1. Confirm that the report belongs to the website repository.
2. Move security and conduct reports to their private processes immediately.
3. Check that public logs and screenshots contain no secrets or personal data.
4. Ask for the smallest missing reproduction detail rather than a large dump.
5. Distinguish bugs from support requests, research proposals, and external
   model or training-code issues.
6. Close duplicates with a link to the canonical issue.

Do not promise a milestone or response time unless it has actually been agreed.
Avoid closing a valid issue merely because it is difficult; document the
constraint or leave it available for contribution.

## Pull-request review

Review in this order:

1. scope and user impact;
2. provenance and licensing;
3. factual evidence and model-name consistency;
4. security and privacy;
5. accessibility and responsive behavior;
6. correctness and maintainability; and
7. documentation and checks.

Require a source for model, dataset, benchmark, release, personnel,
partnership, or legal claims. A configuration target is not proof that a run
completed. A downloadable model is not proof of a reuse license. Prefer exact
artifact revisions and checksums over labels such as "confirmed" or
"reproducible."

Use the pull-request template as a record, not a box-ticking substitute for
review. Do not merge when required provenance, a security concern, or a
material license question remains unresolved.

## Checks and failures

The expected local checks are:

```bash
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm links:internal
pnpm build
```

`pnpm check` runs that complete sequence.

For public route, form, responsive, and automated accessibility coverage, run:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

Use `pnpm links:external` before a release or after changing public evidence
links. External availability changes independently of the repository, so this
check runs on a schedule rather than blocking every pull request.

Reproduce a failure from a clean install with the committed lockfile. Separate
environment failures from code failures and record exact tool versions. Do not
run expensive training or GPU workloads as part of website validation.

Keep continuous integration CPU-only and free of production secrets. Pin
trusted actions to reviewed commit SHAs, give workflows the least permissions
needed, and review third-party actions before adoption or upgrade.

## Security response

Follow [SECURITY.md](../SECURITY.md). Keep the report private, acknowledge only
what is known, assess affected deployments and secrets, and preserve a concise
incident timeline. Revoke exposed credentials before attempting history
cleanup. Coordinate disclosure without promising a deadline that cannot be
met.

## Dependency maintenance

- Prefer small, grouped dependency updates.
- Review changelogs, license changes, engine requirements, and lockfile diffs.
- Run the complete website checks after each update group.
- Inspect production bundles when a dependency changes fonts, icons, native
  binaries, telemetry, networking, or server behavior.
- Update third-party notices when the shipped dependency set changes.

## Codex-assisted maintenance

Codex can support recurring repository work without becoming the authority for
research, licensing, security, or release decisions. Suitable tasks include:

- triaging issues into website, model, data, documentation, or security scope;
- reviewing pull requests for naming, source links, tests, and documentation
  drift;
- reproducing CI failures and proposing focused tests or refactors;
- checking model-card claims against pinned manifests, configurations, and
  reports;
- preparing dependency updates and summarizing relevant compatibility or
  license changes;
- checking relative links, release notes, and changelog consistency; and
- preparing release checklists and evidence inventories.

A maintainer must still verify every factual claim, approve license and
provenance decisions, review security-sensitive changes, run or inspect the
recorded checks, and make the final merge or release decision. Generated text,
tests, and code are review inputs, not evidence that a model run occurred or
that an artifact is lawful, safe, or reproducible.

## Documentation and claim synchronization

The website, README, model cards, manifests, and external research repository
can drift independently. Before changing a public fact:

- identify the canonical source;
- pin its revision where practical;
- label self-reported results as such;
- preserve unknown values instead of guessing; and
- update every intentional duplicate or remove the duplicate.

Use `rappidAI` for the project and the canonical model names
`quantum-1-pilot`, `quantum-1.6-pilot`, and `quantum-1-echelon`. Treat base or
chat labels as variants or development stages when that is what the canonical
model record says; do not create a new family through wording alone.

## Releases

Follow [docs/releasing.md](releasing.md). Release only reviewed commits, never
move a published tag, and keep model releases separate from website releases.
Do not backfill fictional history.

## Community moderation

Apply [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) consistently. Minimize access
to private reports, avoid public speculation about participants, document
moderation decisions privately, and communicate the outcome only to the extent
appropriate and safe.

## Maintainer access and continuity

Grant the least repository permission necessary. Require strong account
security and remove unused access. Keep release, domain, hosting, package, and
model-registry ownership recoverable without placing credentials in the
repository. If maintainership changes, document the new public responsibility
and update CODEOWNERS, security contacts, governance, citation, and deployment
access together.
