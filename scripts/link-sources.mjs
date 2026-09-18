import { readFileSync } from "node:fs";
import ts from "typescript";

// These data-only modules own URLs assembled from repository/revision constants.
// Keep the list explicit: do not execute application pages to discover links.
export const linkModules = [
  "content/site.ts",
  "content/ghost.ts",
  "content/replay.ts",
];

export function isPublicLinkSource(file) {
  const path = file.replaceAll("\\", "/");
  return !/(^|\/)(?:tests?|__tests__|fixtures|__fixtures__)(\/|$)|\.(?:test|spec)\.[^/]+$/i.test(
    path,
  );
}

export function collectExternalUrls(textFiles, resolvedModules = []) {
  const sources = new Map();
  const urlPattern = /https?:\/\/[^\s<>"'`)\]}]+/g;

  function collect(file, contents) {
    for (const match of contents.matchAll(urlPattern)) {
      const value = match[0].replace(/[.,;:]+$/g, "");
      // Partial template literals are checked through the resolved module exports.
      if (value.includes("${")) continue;
      try {
        const url = new URL(value);
        if (["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
          continue;
        const canonical = url.toString();
        if (!sources.has(canonical)) sources.set(canonical, new Set());
        sources.get(canonical).add(file);
      } catch {
        // Syntax checks own malformed non-URL source text.
      }
    }
  }

  function walk(file, value) {
    if (typeof value === "string") collect(file, value);
    else if (Array.isArray(value)) value.forEach((item) => walk(file, item));
    else if (value && typeof value === "object")
      Object.values(value).forEach((item) => walk(file, item));
  }

  for (const [file, contents] of textFiles) {
    if (isPublicLinkSource(file)) collect(file, contents);
  }
  for (const [file, exports] of resolvedModules) {
    if (isPublicLinkSource(file)) walk(file, exports);
  }
  return [...sources]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, files]) => ({ url, files: [...files].sort() }));
}

export async function loadLinkModule(file) {
  const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: file,
  });
  const parsed = ts.createSourceFile(
    file,
    outputText,
    ts.ScriptTarget.ES2022,
    true,
    ts.ScriptKind.JS,
  );
  if (
    parsed.statements.some(
      (statement) =>
        ts.isImportDeclaration(statement) ||
        (ts.isExportDeclaration(statement) && statement.moduleSpecifier),
    )
  ) {
    throw new Error(
      `${file}: link modules must be self-contained (type-only imports are allowed)`,
    );
  }
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}
