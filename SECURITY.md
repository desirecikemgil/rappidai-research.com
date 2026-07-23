# Security Policy

## Supported versions

This project does not yet publish a versioned support matrix or long-term
support releases.

| Version or artifact                                      | Support status                          |
| -------------------------------------------------------- | --------------------------------------- |
| Current default branch and current website deployment    | Best-effort security fixes              |
| Older commits, forks, and unmaintained deployments       | Not supported                           |
| Tagged website releases                                  | No tagged release line currently exists |
| Model weights, tokenizers, datasets, and `lumen-quantum` | Outside this repository's support scope |

Support means that maintainers may investigate and address a report. It does
not promise a particular response time, resolution time, disclosure date, or
backport.

## Report a vulnerability privately

Do not open a public issue for a suspected vulnerability or exposed secret.

1. Use the repository's **Report a vulnerability** option under the Security
   tab. Private Vulnerability Reporting is enabled for this repository.
2. If GitHub's private reporting flow is unavailable, email
   [cikemgil@rappidai-research.com](mailto:cikemgil@rappidai-research.com) with
   the subject `[SECURITY] rappidAI website`.

Include, where safe:

- the affected URL, commit, component, or dependency;
- the vulnerability class and likely impact;
- minimal reproduction steps or a proof of concept;
- any relevant environment details; and
- whether the issue is already public or being actively exploited.

Remove credentials, personal data, private model URLs, and unrelated secrets
from the report. Do not access data that is not yours, degrade the service, or
test against other users. Maintainers will try to limit disclosure to people
who need the information, but cannot guarantee confidentiality through every
email or third-party system.

There is currently no bug-bounty program and no guaranteed response or reward.
Please allow maintainers a reasonable opportunity to investigate before public
disclosure, while recognizing that no fixed embargo is promised here.

## Relevant reports

Examples within this website repository include:

- cross-site scripting, injection, open redirects, or unsafe URL handling;
- exposure of secrets, private contact data, or deployment configuration;
- dependency or build-chain compromise with a practical effect on the site;
- authentication or authorization issues in a future server-side integration;
- a contact or form behavior that transmits data contrary to its disclosure;
- unsafe security headers or deployment behavior with a concrete impact; and
- a reproducible path from untrusted content to code execution.

General model-quality complaints, hallucinations, benchmark disagreements,
content policy questions, and ordinary availability problems are not website
security vulnerabilities. Use the appropriate public issue form for those.

## Automated repository controls

The public repository uses:

- secret scanning and push protection;
- Dependabot alerts, security updates, and grouped version updates;
- SHA-pinned GitHub Actions with least-privilege workflow permissions;
- CodeQL analysis for JavaScript and TypeScript;
- frozen-lockfile installation, linting, type checking, focused tests, and a
  production build;
- Chromium route and automated accessibility checks; and
- protected `main` status checks with force-push and deletion protection.

These controls reduce risk but do not prove that the website, dependencies, or
linked artifacts are vulnerability-free. Review current results at the exact
release commit and report suspected gaps privately.

## Compromised secrets

If a key, token, password, certificate, or credential is exposed:

1. Revoke or rotate it at the provider immediately.
2. Remove it from active deployments and configuration.
3. Review access and audit logs for misuse.
4. Replace the secret in every affected environment.
5. Treat Git history cleanup as secondary; deleting a committed value does not
   make the original secret safe again.

Never place a real secret in an issue, pull request, screenshot, fixture, or
example environment file.

## Model and data artifact safety

Model and dataset artifacts linked from the website are separate from this
website's Apache-2.0 scope. Treat every externally obtained artifact as
untrusted, even when it uses a familiar filename or repository name.

- Verify the source, exact revision, expected size, and published checksum.
- Prefer formats designed for data-only loading, such as safetensors, where
  the workflow supports them.
- Python pickle, `.pkl`, `.pickle`, and many `torch.load`/`.pt` workflows can
  execute code during deserialization. Do not load an untrusted file with
  them.
- Keep `trust_remote_code` disabled for untrusted Hugging Face repositories.
  Enabling it permits repository-provided Python code to run locally.
- Do not run installation scripts, model converters, notebooks, or custom
  loaders from an unreviewed source.
- A nominally data-only format can still trigger vulnerabilities in its parser;
  keep inference and conversion tools updated.

Run unfamiliar training, conversion, evaluation, and inference workloads in an
isolated, non-privileged environment. Use a dedicated account or container,
read-only input mounts where practical, minimal filesystem access, no host
secrets, no cloud credentials, and restricted network access. GPU access does
not require granting access to the host filesystem or credential stores.

Report a suspected malicious or compromised rappidAI artifact using the private
channels above. Include its repository revision and checksum, but do not attach
the artifact to a public issue.
