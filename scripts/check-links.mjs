import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const args = new Set(process.argv.slice(2));
const checkInternal = args.size === 0 || args.has("--internal");
const checkExternal = args.size === 0 || args.has("--external");
const concurrency = 8;
const timeoutMs = 15_000;
const maxAttempts = 2;

if (
  [...args].some((argument) => !["--internal", "--external"].includes(argument))
) {
  throw new Error(
    "Usage: node scripts/check-links.mjs [--internal] [--external]",
  );
}

const trackedFiles = execFileSync("git", ["ls-files", "-z"])
  .toString("utf8")
  .split("\0")
  .filter(Boolean);

const textFiles = trackedFiles.flatMap((file) => {
  const contents = readFileSync(file);
  return contents.includes(0) ? [] : [[file, contents.toString("utf8")]];
});

function decodeTarget(target) {
  try {
    return decodeURIComponent(target);
  } catch {
    return target;
  }
}

function findBrokenRelativeLinks() {
  const failures = [];
  const markdownLinkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;

  for (const [file, contents] of textFiles) {
    if (!file.endsWith(".md")) continue;

    for (const match of contents.matchAll(markdownLinkPattern)) {
      let target = match[1].trim().replace(/^<|>$/g, "");
      if (!target || /^(?:https?:|mailto:|#)/i.test(target)) continue;

      target = target.split("#")[0].split("?")[0];
      if (!target) continue;

      const resolvedTarget = resolve(dirname(file), decodeTarget(target));
      if (!existsSync(resolvedTarget)) {
        failures.push({ file, target });
      }
    }
  }

  return failures;
}

function collectExternalUrls() {
  const urls = new Set();
  const urlPattern = /https?:\/\/[^\s<>"'`)\]}]+/g;

  for (const [, contents] of textFiles) {
    for (const match of contents.matchAll(urlPattern)) {
      const value = match[0].replace(/[.,;:]+$/g, "");
      if (value.includes("${")) continue;

      try {
        const url = new URL(value);
        if (!["localhost", "127.0.0.1"].includes(url.hostname)) {
          urls.add(url.toString());
        }
      } catch {
        // Malformed examples are handled by their owning syntax or unit tests.
      }
    }
  }

  return [...urls].sort();
}

async function fetchStatus(url) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      let response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        headers: { "user-agent": "rappidai-link-check/1.0" },
        signal: AbortSignal.timeout(timeoutMs),
      });

      if ([403, 405, 501].includes(response.status)) {
        response = await fetch(url, {
          method: "GET",
          redirect: "follow",
          headers: {
            range: "bytes=0-0",
            "user-agent": "rappidai-link-check/1.0",
          },
          signal: AbortSignal.timeout(timeoutMs),
        });
      }

      await response.body?.cancel();

      if (response.status < 400) {
        return { ok: true, status: response.status };
      }

      lastError = `HTTP ${response.status}`;
      if (response.status !== 429 && response.status < 500) break;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return { ok: false, error: lastError ?? "Unknown link failure" };
}

async function checkExternalUrls(urls) {
  const failures = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < urls.length) {
      const url = urls[nextIndex];
      nextIndex += 1;

      const result = await fetchStatus(url);
      if (!result.ok) failures.push({ url, error: result.error });
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()),
  );

  return failures;
}

let failed = false;

if (checkInternal) {
  const failures = findBrokenRelativeLinks();
  if (failures.length > 0) {
    failed = true;
    console.error("Broken relative links:");
    for (const failure of failures) {
      console.error(`- ${failure.file}: ${failure.target}`);
    }
  } else {
    console.log("Relative links: passed");
  }
}

if (checkExternal) {
  const urls = collectExternalUrls();
  const failures = await checkExternalUrls(urls);

  if (failures.length > 0) {
    failed = true;
    console.error("Unreachable external links:");
    for (const failure of failures) {
      console.error(`- ${failure.url}: ${failure.error}`);
    }
  } else {
    console.log(`External links: passed (${urls.length} checked)`);
  }
}

if (failed) process.exitCode = 1;
