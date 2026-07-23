# Releasing the website

This process applies only to the source and deployment of the rappidAI Research
website. Model weights, tokenizers, datasets, and the `lumen-quantum` repository
have separate release and licensing requirements.

The project has no documented historical release series. Do not invent version
numbers, tags, or dates to fill that gap.

## 1. Define the release scope

- Confirm that every included change belongs to the website repository.
- Resolve or document breaking behavior and migration needs.
- Confirm that new factual claims have durable public sources.
- Confirm the provenance and license of every new asset and dependency.
- Keep model files and training data out of the website release.

If versioned releases are introduced, use a consistent semantic version and do
not reuse an existing tag.

## 2. Complete the release checks

From a clean checkout with the committed lockfile, run:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm typecheck
pnpm lint
pnpm test
pnpm links:internal
pnpm build
pnpm test:e2e
pnpm links:external
```

`pnpm check` runs the format, lint, type-check, unit, relative-link, and build
sequence after dependencies are installed. Browser tests require the
repository-pinned Chromium runtime. Add the real result of every check to the
release notes; do not describe an unrun check as passing.

Also verify:

- all public routes at representative desktop and mobile widths;
- keyboard navigation, focus states, and reduced-motion behavior;
- public links, model revisions, manifests, and checksums;
- canonical metadata, Open Graph metadata, `robots.txt`, and `sitemap.xml`;
- contact behavior and the absence of a false sent-success state;
- current provider, privacy, hosting, and security information;
- the Apache license boundary, asset provenance, and third-party notices; and
- that the built output contains no source maps, secrets, local paths, private
  URLs, credentials, or unintended files.

## 3. Prepare release notes

Update only the `Unreleased` section of `CHANGELOG.md` while work is ongoing.
At release time, move applicable entries into a new dated version section in a
dedicated release pull request. Describe user-visible changes, compatibility or
security impact, known limitations, and the exact checks run.

Do not include unverified model results, download counts, or future promises.

## 4. Tag and publish

After the release commit is reviewed and merged:

1. create an annotated tag at the exact reviewed commit;
2. push the tag without rewriting it;
3. create a GitHub Release from that tag;
4. use the reviewed changelog text as the basis for release notes;
5. attach only intentional website artifacts; and
6. record checksums for any manually attached archive or build artifact.

The repository's automatically generated source archives do not replace the
license and notice files included in the tagged source tree.

## 5. Deploy and verify

- Deploy the tagged or otherwise recorded commit.
- Record the deployment commit in the release notes or deployment system.
- Repeat the critical route, metadata, contact, and legal-page checks against
  the production domain.
- If verification fails, roll back to the last known deployment rather than
  silently changing a release tag.

## Model releases are separate

A website release must not be presented as a model release. A model publication
needs, at minimum, its own model card, license, immutable revision, checksums,
data and training provenance, evaluation method, limitations, and release
notes. Publish model artifacts through their intended registry and update the
website only after those records are public and verified.
