# Historical design QA record

## Status and evidence boundary

This file preserves the scope of a manual visual review performed during an
earlier prototype session. It is **not** a current acceptance report, a CI
result, or a reproducible certification that the site passes visual,
interaction, accessibility, console, or cross-browser checks.

The original review referred to source images, screenshots, and comparison
composites stored in a local working directory outside this repository. Those
artifacts were not committed, their checksums and browser environment were not
recorded, and they are not available to a repository reviewer. Workstation
paths and unsupported pass statements have therefore been removed.

## Historical review scope

The manual exercise considered these areas:

- the homepage's typography, spacing, color, dividers, negative space, and model
  presentation relative to visual references supplied for that prototype;
- use of the supplied wordmark, symbol, lockup, ambient image, and model-card
  image rather than recreating those visuals as text;
- responsive layouts at approximately 1,440, 768, 390, and 320 CSS pixels;
- mobile navigation, model filtering, contact-form validation, and the
  `mailto:` fallback;
- semantic landmarks, heading structure, labels, focus treatment, keyboard
  behavior, reduced-motion handling, and horizontal overflow; and
- route titles, primary headings, image loading, and browser-console output.

These bullets describe what the historical reviewer intended to inspect. They
do not establish the result of those checks for the current commit.

## What can be verified from the repository

The source contains responsive styles, semantic markup, focus states,
accessibility attributes, reduced-motion handling, client-side form validation,
and local image references. Focused automated tests cover selected content and
JSON-LD behavior, and the build can detect some broken application states.

Source inspection and a successful build are not substitutes for browser-level
visual or accessibility evidence. The repository currently does not retain the
historical reference images, screenshots, comparison thresholds, browser
versions, assistive-technology results, or a versioned end-to-end visual test.

## Reproducible review procedure

For a future design-QA claim:

1. Check out the exact commit and record the operating system, browser name and
   version, device pixel ratio, font state, locale, and motion preference.
2. Install from the frozen lockfile and record the command results for format,
   lint, type-check, unit tests, and production build.
3. List the exact routes, viewport dimensions, navigation states, form states,
   and content fixtures under review.
4. Obtain permission to retain the visual references. Store them in an approved
   review artifact location and record a SHA-256 for each input.
5. Capture full-page and focused screenshots for desktop, tablet, mobile,
   keyboard-focus, menu-open, validation-error, and reduced-motion states.
6. Run keyboard navigation, automated accessibility checks, and targeted manual
   screen-reader checks; retain tool versions and raw output.
7. Record console errors, network failures, broken images, horizontal overflow,
   and unexpected external requests.
8. Attach screenshots and reports to the pull request or release artifact, with
   stable links and retention expectations.
9. Log every finding with severity, route, viewport, reproduction steps, and
   disposition. Do not write “passed” when evidence is missing or a check was
   not run.

## Suggested acceptance record

| Field                  | Required value                                          |
| ---------------------- | ------------------------------------------------------- |
| Commit                 | Full SHA                                                |
| Reviewer and date      | Named reviewer, ISO date                                |
| Environment            | OS, browser/version, DPR, locale, fonts, motion setting |
| Reference inputs       | Stable URI, rights status, and SHA-256 per file         |
| Routes and states      | Complete enumerated list                                |
| Viewports              | Exact CSS pixel dimensions                              |
| Automated results      | Commands, versions, raw logs, and exit status           |
| Visual evidence        | Stable screenshot/composite URIs and checksums          |
| Accessibility evidence | Tool output plus manual keyboard/screen-reader notes    |
| Findings               | Severity, reproduction, owner, and resolution           |
| Decision               | Pass / conditional / fail with explicit approver        |

Until such a record is attached to a specific commit, the defensible status is:
historical manual review noted, current browser QA unverified.
