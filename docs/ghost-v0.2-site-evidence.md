# Ghost v0.2.0 website evidence

The website describes the released experimental security-hardening version, not an architecture roadmap.

## Source snapshot

- Release: https://github.com/rappidAI-Research/rappid-ghost/releases/tag/v0.2.0
- Reviewed tag and main commit: `001d0baa953301f9fc94443e0e45b28d9f93fac0` (identical when checked on 6 September 2026).
- Actual release run: https://github.com/rappidAI-Research/rappid-ghost/actions/runs/34052802282
- Release job: `101539306267`; `./bin/ghost bench --require-all --json` recorded `passed: 15`, `failed: 0`, `skipped: 0` at 2026-09-06T18:48:35Z. This is an observed result, not merely the gate requirement in the README.
- Published assets: `ghost_0.2.0_linux_amd64`, `ghost_0.2.0_linux_arm64`, `SHA256SUMS`.

## Claim mapping

All paths below are in the reviewed Ghost commit, not in this website repository.

| Website content                                                                               | Primary evidence                                                     |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Purpose, ALLOW / DENY / SHADOW, supported synthetic paths                                     | `README.md`, `docs/architecture.md`, `docs/threat-model.md`          |
| IPv4 answer-set validation, metadata ranges, fixed ports, no second lookup, internal topology | `docs/network-security.md`, `internal/network/`, `internal/runtime/` |
| Container confinement and positive environment allowlist                                      | `docs/security-model.md`, `CHANGELOG.md`, `internal/runtime/`        |
| Token/ack queue fence and existing-connection limitation                                      | `docs/network-security.md`, `docs/architecture.md`                   |
| Per-project locking, incomplete-session recovery and terminal cleanup limit                   | `docs/security-model.md`, `internal/session/`, `internal/runtime/`   |
| Digest pin, module checks and checksummed release                                             | `README.md`, `CHANGELOG.md`, `.github/workflows/release.yml`         |
| CLI and source build                                                                          | `README.md`, `internal/cli/cli.go`, `go.mod`                         |
| Fifteen scenario identities and assertions                                                    | `docs/benchmarks.md`, `internal/bench/`, actual release job above    |
| Observed events versus ordering, causation and intent                                         | `docs/provenance.md`, `docs/incidents.md`, `docs/threat-model.md`    |
| Experimental status and private reporting                                                     | `SECURITY.md`                                                        |

## Scope of website changes

English and German Ghost pages share `content/ghost.ts` and the existing localized renderer. Home and tools-overview cards use the same release version. Ghost metadata is updated in both languages. Existing routes, navigation, illustration primitives, typography, global styles, dependencies, Replay content and model pages remain unchanged.

The full repository scan found additional uses of the word Ghost in route/type declarations, generic navigation translations, the Ghost illustration and the decorative `footer-ghost` class. Those are not outdated release claims. The website package's own `0.1.0` version is unrelated to Ghost and is intentionally unchanged.

Security language deliberately excludes universal escape/exfiltration prevention, LLM intent detection, unsupported IPv6 egress and automatic revocation of established connections. Exposed workspace secrets and persisted command arguments are called out. Benchmarks are reproducible named assertions, never a numerical security score.

## Regression checks

`tests/ghost.test.ts` checks release/source pins, bilingual metadata, supported commands, scenario identities and stale Ghost presentation. `tests/e2e/ghost.spec.ts` checks both locales at 375, 768, 1280 and 1440 pixels, anchors, page overflow, release CTAs and serious/critical accessibility violations. External Ghost links are checked when `GHOST_CHECK_EXTERNAL_LINKS=1` is set. The existing whole-site checks remain unchanged.

The concurrent main update `2cd66423f339c94798c9b353fb9124e9b6b3c9d9` was reconciled before final validation. Its development launcher and additional browser assertions are preserved. The existing keyboard test now uses structural selectors instead of obsolete copy. External GitHub links are paced and HTTP 429 responses are retried; a rate limit never counts as a successful link check.
