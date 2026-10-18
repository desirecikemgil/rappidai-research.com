import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/json-ld";

describe("serializeJsonLd", () => {
  it("preserves JSON data while escaping HTML-significant characters", () => {
    const value = {
      "@context": "https://schema.org",
      name: "</script><script>alert('&')</script>\u2028next\u2029line",
    };

    const serialized = serializeJsonLd(value);

    expect(serialized).not.toContain("<");
    expect(serialized).not.toContain(">");
    expect(serialized).not.toContain("&");
    expect(serialized).not.toContain("\u2028");
    expect(serialized).not.toContain("\u2029");
    expect(serialized).toContain("\\u003c/script\\u003e");
    expect(JSON.parse(serialized)).toEqual(value);
  });

  it("rejects values that JSON.stringify cannot serialize", () => {
    expect(() => serializeJsonLd(undefined)).toThrow(TypeError);
  });
});
