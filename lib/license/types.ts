export type LicensePlan = "monthly" | "annual" | "lifetime"

export type PaymentType = "normal" | "promo" | "adjustment" | "credit"

export type LicenseStatus =
  | "trial"
  | "active"
  | "grace_period"
  | "suspended"
  | "cancelled"

export interface YMD {
  y: number
  m: number
  d: number
}

// Minimal DB-shaped records (only columns used by the rules).
// Notes:
// - Supabase usually returns timestamptz as ISO strings; we accept Date too.
// - `active=false` is treated as "cancelled" (only cancellation signal we have in v1).
export interface LicenseRecord {
  plan: LicensePlan
  billing_day: number | null
  price_cop: number
  grace_days: number
  grace_days_connection: number
  grace_ends_at: string | Date | null
  grace_ends_at_connection: string | Date | null
  trial_started_at: string | Date | null
  trial_ends_at: string | Date | null
  active: boolean
}

export interface PaymentRecord {
  type: PaymentType
  amount_cop: number
  months_covered: number | null
  is_draft: boolean
  paid_at: string | Date | null
  voided_at: string | Date | null
}

export interface ExpiresAtBogotaDate {
  ymd: YMD | null
  // UTC midnight for the computed Bogota YMD (useful for logging/debugging).
  date: Date | null
}

export interface LicenseSnapshot {
  status: LicenseStatus
  now: {
    at: Date
    bogotaYMD: YMD
  }
  expiresAt: ExpiresAtBogotaDate
  trial: {
    startedAt: Date | null
    endsAt: Date | null
  }
  grace: {
    days: number
    baseYMD: YMD | null
    endsYMD: YMD | null
    connectionDays: number
    connectionEndsYMD: YMD | null
  }
  coverage: {
    hasValidCoverage: boolean
  }
}
