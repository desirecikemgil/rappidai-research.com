const jsonLdEscapes: Readonly<Record<string, string>> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

/**
 * Serializes trusted JSON-LD data for an inline script without allowing values
 * to terminate the script element or introduce HTML parsing ambiguities.
 */
export function serializeJsonLd(value: unknown): string {
  const serialized = JSON.stringify(value);

  if (serialized === undefined) {
    throw new TypeError("JSON-LD data must be JSON-serializable.");
  }

  return serialized.replace(
    /[<>&\u2028\u2029]/g,
    (character) => jsonLdEscapes[character],
  );
}
