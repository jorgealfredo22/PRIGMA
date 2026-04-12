import { describe, expect, it } from "vitest"

import {
  canonicalRequestString,
  canonicalResponseString,
  sha256HexUtf8,
  signRequest,
  signResponse,
  timingSafeEqualHex,
  validateTimestamp,
  verifyRequestSignature,
  VERIFY_PATHNAME,
  buildVerifyPayload,
} from "./verify"

describe("validateTimestamp", () => {
  it("accepts within +/- 5 minutes", () => {
    const now = 1_000_000
    expect(validateTimestamp(now, now)).toBe(true)
    expect(validateTimestamp(now - 300, now)).toBe(true)
    expect(validateTimestamp(now + 300, now)).toBe(true)
  })

  it("rejects outside window", () => {
    const now = 1_000_000
    expect(validateTimestamp(now - 301, now)).toBe(false)
    expect(validateTimestamp(now + 301, now)).toBe(false)
  })
})

describe("timingSafeEqualHex", () => {
  it("returns true for equal hex (case-insensitive)", () => {
    expect(timingSafeEqualHex("aa00ff", "AA00FF")).toBe(true)
  })

  it("returns false for different hex", () => {
    expect(timingSafeEqualHex("aa00ff", "aa00fe")).toBe(false)
  })

  it("returns false for invalid hex or lengths", () => {
    expect(timingSafeEqualHex("", "")).toBe(false)
    expect(timingSafeEqualHex("a", "a")).toBe(false) // odd length
    expect(timingSafeEqualHex("zz", "zz")).toBe(false)
    expect(timingSafeEqualHex("aa", "aaaa")).toBe(false)
  })
})

describe("canonical strings", () => {
  it("generates request canonical string exactly", () => {
    expect(
      canonicalRequestString({
        timestamp: 1700000000,
        licenseKey: "lk_123",
        method: "get",
        pathname: VERIFY_PATHNAME,
      }),
    ).toBe("v1:1700000000:lk_123:GET:/api/license/verify")
  })

  it("generates response canonical string exactly", () => {
    expect(
      canonicalResponseString({
        timestamp: 1700000001,
        licenseKey: "lk_123",
        bodySha256Hex: "abc",
      }),
    ).toBe("v1:1700000001:lk_123:response:abc")
  })
})

describe("request signing", () => {
  it("signRequest matches verifyRequestSignature", () => {
    const signed = signRequest({
      licenseKey: "secret-license-key",
      timestamp: 1700000000,
      method: "GET",
      pathname: VERIFY_PATHNAME,
    })

    expect(
      verifyRequestSignature({
        licenseKey: "secret-license-key",
        timestamp: 1700000000,
        method: "get", // case shouldn't matter
        pathname: VERIFY_PATHNAME,
        signature: signed.signature,
      }),
    ).toBe(true)
  })
})

describe("response signing", () => {
  it("sha256(body) is stable and signature matches canonical", () => {
    const body = JSON.stringify({ a: 1, b: "x" })
    const bodyHash = sha256HexUtf8(body)

    const signed = signResponse({
      licenseKey: "secret-license-key",
      timestamp: 1700000123,
      body,
    })

    expect(signed.bodySha256Hex).toBe(bodyHash)
    expect(signed.canonical).toBe(
      `v1:1700000123:secret-license-key:response:${bodyHash}`,
    )
    // just sanity: signature should look like 64 hex chars
    expect(signed.signature).toMatch(/^[0-9a-f]{64}$/)
  })
})

describe("buildVerifyPayload", () => {
  it("computes a basic active snapshot for lifetime", () => {
    const now = new Date("2026-01-01T00:00:00.000Z")
    const payload = buildVerifyPayload({
      license: {
        plan: "lifetime",
        billing_day: null,
        price_cop: 0,
        grace_days: 0,
        grace_days_connection: 0,
        trial_started_at: null,
        trial_ends_at: null,
        active: true,
      },
      payments: [],
      now,
      serverTimeSeconds: Math.floor(now.getTime() / 1000),
    })

    expect(payload.status).toBe("active")
    expect(payload.plan).toBe("lifetime")
    expect(payload.trial_active).toBe(false)
    expect(payload.grace_ends_ymd).toBe(null)
    expect(payload.expires_at_ymd).toBe(null)
  })

  it("sets trial_active during trial", () => {
    const now = new Date("2026-01-01T00:00:00.000Z")
    const payload = buildVerifyPayload({
      license: {
        plan: "monthly",
        billing_day: 1,
        price_cop: 1000,
        grace_days: 7,
        grace_days_connection: 0,
        trial_started_at: "2025-12-31T00:00:00.000Z",
        trial_ends_at: "2026-01-10T00:00:00.000Z",
        active: true,
      },
      payments: [],
      now,
      serverTimeSeconds: Math.floor(now.getTime() / 1000),
    })

    expect(payload.status).toBe("trial")
    expect(payload.trial_active).toBe(true)
    expect(payload.grace_ends_ymd).toBe(null)
  })

  it("includes grace_ends_ymd during grace period", () => {
    const now = new Date("2026-01-15T00:00:00.000Z")
    const payload = buildVerifyPayload({
      license: {
        plan: "monthly",
        billing_day: 1,
        price_cop: 1000,
        grace_days: 7,
        grace_days_connection: 0,
        trial_started_at: "2025-12-31T00:00:00.000Z",
        trial_ends_at: "2026-01-10T00:00:00.000Z",
        active: true,
      },
      payments: [],
      now,
      serverTimeSeconds: Math.floor(now.getTime() / 1000),
    })

    expect(payload.status).toBe("grace_period")
    expect(payload.trial_active).toBe(false)
    expect(payload.grace_ends_ymd).toBe("2026-01-16")
  })
})
