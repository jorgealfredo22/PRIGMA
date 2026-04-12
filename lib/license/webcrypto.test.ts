import { describe, expect, it } from "vitest"

import {
  canonicalRequestString,
  canonicalResponseString,
  hmacSha256Hex,
  sha256HexUtf8,
} from "./webcrypto"

describe("webcrypto canonical strings", () => {
  it("matches server canonical shapes", () => {
    expect(
      canonicalRequestString({
        timestamp: 1700000000,
        licenseKey: "lk_123",
        method: "get",
        pathname: "/api/license/verify",
      }),
    ).toBe("v1:1700000000:lk_123:GET:/api/license/verify")

    expect(
      canonicalResponseString({
        timestamp: 1700000001,
        licenseKey: "lk_123",
        bodySha256Hex: "abc",
      }),
    ).toBe("v1:1700000001:lk_123:response:abc")
  })
})

describe("webcrypto digests", () => {
  it.skipIf(!globalThis.crypto?.subtle)("sha256 and hmac return lowercase hex", async () => {
    const sha = await sha256HexUtf8("hello")
    expect(sha).toMatch(/^[0-9a-f]{64}$/)

    const sig = await hmacSha256Hex("secret", "message")
    expect(sig).toMatch(/^[0-9a-f]{64}$/)
  })
})
