import { describe, expect, it } from "vitest"

import { computeLicenseStatus } from "./rules"
import type { LicenseRecord, PaymentRecord } from "./types"

// Helper: Create a Bogota midnight date from YYYY-MM-DD
// Bogota is UTC-5, so Bogota midnight = UTC 05:00
function bogotaMidnight(dateStr: string): Date {
  return new Date(`${dateStr}T05:00:00.000Z`)
}

const BASE_LICENSE: LicenseRecord = {
  plan: "monthly",
  billing_day: 15,
  price_cop: 100000,
  grace_days: 5,
  grace_days_connection: 3,
  grace_ends_at: null,
  grace_ends_at_connection: null,
  trial_started_at: null,
  trial_ends_at: null,
  active: true,
}

function makePayment(overrides: Partial<PaymentRecord> = {}): PaymentRecord {
  return {
    type: "normal",
    amount_cop: 100000,
    months_covered: 1,
    is_draft: false,
    paid_at: "2026-01-15T00:00:00.000Z",
    voided_at: null,
    ...overrides,
  }
}

describe("computeLicenseStatus - grace periods", () => {
  it("returns active when within expiry", () => {
    // paid 1 month from Jan 15 → Feb 15, and we check on Feb 10
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]
    const now = bogotaMidnight("2026-02-10")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("active")
    expect(result.grace.connectionDays).toBe(3)
    // connectionEndsYMD is computed: graceEndsAt + grace_days_connection = Feb 20 + 3 = Feb 23
    expect(result.grace.connectionEndsYMD).toEqual({ y: 2026, m: 2, d: 23 })
  })

  it("returns grace_period within standard grace_days", () => {
    // paid Jan 15, 1 month → expires Feb 15, grace starts Feb 16
    // check on Feb 18 (within 5 grace days)
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]
    const now = bogotaMidnight("2026-02-18")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("grace_period")
    expect(result.grace.endsYMD).toEqual({ y: 2026, m: 2, d: 20 }) // Feb 15 + 5
  })

  it("returns grace_period within connection grace (after standard exhausted)", () => {
    // standard grace exhausted (5 days from Feb 15 = Feb 20)
    // connection grace: 3 more days = Feb 23
    // check on Feb 22 (within connection grace)
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]
    const now = bogotaMidnight("2026-02-22")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("grace_period")
    expect(result.grace.connectionEndsYMD).toEqual({ y: 2026, m: 2, d: 23 }) // Feb 20 + 3
  })

  it("returns suspended when connection grace exhausted", () => {
    // standard grace: Feb 15 + 5 = Feb 20
    // connection grace: Feb 20 + 3 = Feb 23
    // check on Feb 24 → suspended
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]
    const now = bogotaMidnight("2026-02-24")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("suspended")
  })

  it("returns suspended immediately after standard grace when no connection grace", () => {
    // grace_days_connection = 0
    // standard grace exhausted → immediately suspended
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 0 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]
    // Feb 21 = after Feb 15 + 5 grace days (grace ends Feb 20)
    const now = bogotaMidnight("2026-02-21")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("suspended")
  })

  it("uses grace_ends_at from DB when available", () => {
    // DB has grace_ends_at = Feb 25 (instead of calculated Feb 20)
    // This allows manual extension of grace period
    const license: LicenseRecord = {
      ...BASE_LICENSE,
      grace_days: 5,
      grace_days_connection: 0,
      grace_ends_at: bogotaMidnight("2026-02-25").toISOString(),
    }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]
    // Feb 22 - would be suspended with calculated grace (Feb 20)
    // but grace_ends_at says Feb 25, so still in grace
    const now = bogotaMidnight("2026-02-22")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("grace_period")
    expect(result.grace.endsYMD).toEqual({ y: 2026, m: 2, d: 25 })
  })
})

describe("computeLicenseStatus - last payment voided", () => {
  it("returns suspended when only payment is voided", () => {
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({
        paid_at: "2026-01-15T00:00:00.000Z",
        months_covered: 1,
        voided_at: "2026-02-01T00:00:00.000Z",
      }),
    ]
    const now = bogotaMidnight("2026-02-20")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("suspended")
    expect(result.coverage.hasValidCoverage).toBe(false)
  })

  it("uses previous payment coverage when last is voided", () => {
    // Payment 1: Jan 15, 1 month → expires Feb 15
    // Payment 2 (voided): Feb 10, 3 months → would extend to May 10, but voided
    // So coverage should be from Payment 1 only → expires Feb 15
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
      makePayment({
        paid_at: "2026-02-10T00:00:00.000Z",
        months_covered: 3,
        voided_at: "2026-02-15T00:00:00.000Z", // voided after being added
      }),
    ]
    // Feb 20 - within grace from payment 1 expiry (Feb 15)
    const now = bogotaMidnight("2026-02-20")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("grace_period")
    // coverage is still valid because we use payment 1's expiry
    expect(result.coverage.hasValidCoverage).toBe(false) // expired
    expect(result.expiresAt.ymd).toEqual({ y: 2026, m: 2, d: 15 }) // from payment 1
  })

  it("returns active when last voided but previous still covers current date", () => {
    // Payment 1: Dec 15 2025, 3 months → expires Mar 15 2026
    // Payment 2 (voided): Feb 10 2026, 1 month → would extend, but voided
    // Check on Feb 20 - payment 1 still covers
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2025-12-15T00:00:00.000Z", months_covered: 3 }),
      makePayment({
        paid_at: "2026-02-10T00:00:00.000Z",
        months_covered: 1,
        voided_at: "2026-02-15T00:00:00.000Z",
      }),
    ]
    const now = bogotaMidnight("2026-02-20")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("active")
    // Expiry should be from payment 1 (Dec 15 + 3 months = Mar 15)
    expect(result.expiresAt.ymd).toEqual({ y: 2026, m: 3, d: 15 })
  })

  it("handles multiple payments, last voided, middle one is anchor", () => {
    // Payment 1: Nov 15, 2 months → expires Jan 15
    // Payment 2: Dec 20, 2 months → extends coverage
    // Payment 3 (voided): Feb 10, 1 month → voided, should use payment 2 as anchor
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2025-11-15T00:00:00.000Z", months_covered: 2 }),
      makePayment({ paid_at: "2025-12-20T00:00:00.000Z", months_covered: 2 }),
      makePayment({
        paid_at: "2026-02-10T00:00:00.000Z",
        months_covered: 1,
        voided_at: "2026-02-15T00:00:00.000Z",
      }),
    ]
    // Feb 20 - after Jan 15 but within coverage from payment 2
    const now = bogotaMidnight("2026-02-20")

    const result = computeLicenseStatus(license, payments, now)

    // Payment 2 Dec 20 + 2 months (bd=15) → Feb 15 is NOT billing day, so it jumps
    // Dec 20, remaining=2, jump to Jan(remaining 1), Feb(remaining 0) → Feb 15
    // So coverage expires Feb 15, then grace until Feb 20, then connection grace until Feb 23
    // Feb 20 is exactly graceEndsAt, so still grace_period
    expect(result.status).toBe("grace_period")
    expect(result.coverage.hasValidCoverage).toBe(false)
  })
})

describe("computeLicenseStatus - status transitions", () => {
  it("cancelled when active=false regardless of payments", () => {
    const license: LicenseRecord = { ...BASE_LICENSE, active: false }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 12 }),
    ]
    const now = bogotaMidnight("2026-06-01")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("cancelled")
  })

  it("lifetime always active", () => {
    const license: LicenseRecord = {
      plan: "lifetime",
      billing_day: null,
      price_cop: 0,
      grace_days: 0,
      grace_days_connection: 0,
      grace_ends_at: null,
      grace_ends_at_connection: null,
      trial_started_at: null,
      trial_ends_at: null,
      active: true,
    }
    const payments: PaymentRecord[] = [] // no payments needed
    const now = bogotaMidnight("2030-01-01")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("active")
    expect(result.coverage.hasValidCoverage).toBe(true)
  })

  it("trial overrides expiry", () => {
    // License expired but still in trial
    const license: LicenseRecord = {
      ...BASE_LICENSE,
      grace_days: 5,
      grace_days_connection: 0,
      trial_started_at: "2026-01-01T00:00:00.000Z",
      trial_ends_at: "2026-03-01T00:00:00.000Z",
    }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }), // expired Feb 15
    ]
    // Feb 20 - expired but trial still active until Mar 1
    const now = bogotaMidnight("2026-02-20")

    const result = computeLicenseStatus(license, payments, now)

    expect(result.status).toBe("trial")
  })
})

describe("computeLicenseStatus - full grace flow", () => {
  it("active → grace (standard) → grace (connection) → suspended", () => {
    const license: LicenseRecord = { ...BASE_LICENSE, grace_days: 5, grace_days_connection: 3 }
    const payments: PaymentRecord[] = [
      makePayment({ paid_at: "2026-01-15T00:00:00.000Z", months_covered: 1 }),
    ]

    // Phase 1: Active (Feb 10)
    const active = computeLicenseStatus(license, payments, bogotaMidnight("2026-02-10"))
    expect(active.status).toBe("active")

    // Phase 2: Grace standard (Feb 18 - within 5 days of Feb 15)
    const graceStandard = computeLicenseStatus(license, payments, bogotaMidnight("2026-02-18"))
    expect(graceStandard.status).toBe("grace_period")

    // Phase 3: Grace connection (Feb 22 - within 3 days of connection grace after Feb 20)
    const graceConnection = computeLicenseStatus(license, payments, bogotaMidnight("2026-02-22"))
    expect(graceConnection.status).toBe("grace_period")
    expect(graceConnection.grace.connectionEndsYMD).toEqual({ y: 2026, m: 2, d: 23 })

    // Phase 4: Suspended (Feb 24 - after all grace)
    const suspended = computeLicenseStatus(license, payments, bogotaMidnight("2026-02-24"))
    expect(suspended.status).toBe("suspended")
  })
})
