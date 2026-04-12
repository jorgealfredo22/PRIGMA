import type {
  ExpiresAtBogotaDate,
  LicenseRecord,
  LicenseSnapshot,
  PaymentRecord,
  YMD,
} from "./types"

const BOGOTA_TZ = "America/Bogota"

// Intl is the only built-in way to get timezone-aware calendar fields.
// Bogota has no DST, so converting between a Bogota YMD and a UTC date at
// midnight is stable for day math.
const bogotaYMDFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BOGOTA_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function getBogotaYMD(date: Date): YMD {
  // Uses a stable format: YYYY-MM-DD (en-CA)
  const parts = bogotaYMDFormatter.formatToParts(date)
  const y = Number(parts.find((p) => p.type === "year")?.value)
  const m = Number(parts.find((p) => p.type === "month")?.value)
  const d = Number(parts.find((p) => p.type === "day")?.value)
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
    throw new Error("Failed to compute Bogota YMD")
  }
  return { y, m, d }
}

function ymdToUtcDateMidnight(ymd: YMD): Date {
  return new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 0, 0, 0, 0))
}

function compareYMD(a: YMD, b: YMD): -1 | 0 | 1 {
  if (a.y !== b.y) return a.y < b.y ? -1 : 1
  if (a.m !== b.m) return a.m < b.m ? -1 : 1
  if (a.d !== b.d) return a.d < b.d ? -1 : 1
  return 0
}

function addDaysYMD(ymd: YMD, days: number): YMD {
  const dt = ymdToUtcDateMidnight(ymd)
  dt.setUTCDate(dt.getUTCDate() + days)
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() }
}

function lastDayOfMonth(y: number, m: number): number {
  // Day 0 of next month = last day of current month
  return new Date(Date.UTC(y, m, 0)).getUTCDate()
}

function clampBillingDay(y: number, m: number, billingDay: number): number {
  const ld = lastDayOfMonth(y, m)
  return Math.min(Math.max(billingDay, 1), ld)
}

function isValidCoveragePayment(p: PaymentRecord): p is PaymentRecord & {
  paid_at: string | Date
  months_covered: number
} {
  if (p.is_draft) return false
  if (p.voided_at != null) return false
  if (p.type === "credit") return false
  if (p.paid_at == null) return false
  if (p.months_covered == null) return false
  if (!Number.isFinite(p.months_covered) || p.months_covered <= 0) return false
  return true
}

function getSortedCoveragePayments(payments: PaymentRecord[]):
  | (PaymentRecord & { paid_at: string | Date; months_covered: number })[]
  | [] {
  const valid = payments.filter(isValidCoveragePayment)
  valid.sort((a, b) => {
    const da = toDate(a.paid_at)!
    const db = toDate(b.paid_at)!
    return da.getTime() - db.getTime()
  })
  return valid
}

function monthsJump(
  base: YMD,
  monthsToAdd: number,
  billingDay: number,
): YMD {
  let y = base.y
  let m = base.m
  // Algorithm rule: if base day == billing_day, we do not consume a jump.
  // We still anchor the schedule to base YMD.
  let remaining = monthsToAdd
  if (base.d !== billingDay) remaining -= 1

  // First move: if remaining < 0, we're already on billing day and add 0 months.
  // Otherwise we always move to next month for each remaining month.
  while (remaining >= 0) {
    // Move to next month
    m += 1
    if (m === 13) {
      m = 1
      y += 1
    }
    const d = clampBillingDay(y, m, billingDay)
    base = { y, m, d }
    remaining -= 1
  }

  return base
}

// NOTE: This returns the Bogota calendar date (YMD) that represents the last
// covered day. `date` is UTC midnight for that YMD.
export function computeExpiresAtBogotaDate(
  license: LicenseRecord,
  payments: PaymentRecord[],
): ExpiresAtBogotaDate {
  if (license.plan === "lifetime") return { ymd: null, date: null }
  const billingDay = license.billing_day
  if (!billingDay) return { ymd: null, date: null }

  const coveragePayments = getSortedCoveragePayments(payments)
  if (coveragePayments.length === 0) return { ymd: null, date: null }

  let currentExpiry: YMD | null = null

  for (const p of coveragePayments) {
    const paidAt = toDate(p.paid_at)!
    const paidYMD = getBogotaYMD(paidAt)

    // base = max(paymentDateBogotaYMD, currentExpiryYMD ?? paymentDateBogotaYMD)
    const base =
      currentExpiry && compareYMD(currentExpiry, paidYMD) === 1
        ? currentExpiry
        : paidYMD

    currentExpiry = monthsJump(base, p.months_covered, billingDay)
  }

  return currentExpiry
    ? { ymd: currentExpiry, date: ymdToUtcDateMidnight(currentExpiry) }
    : { ymd: null, date: null }
}

export function computeLicenseStatus(
  license: LicenseRecord,
  payments: PaymentRecord[],
  now: Date = new Date(),
): LicenseSnapshot {
  const nowBogotaYMD = getBogotaYMD(now)

  // v1 cancellation semantics: `active=false` is our only cancellation signal.
  if (license.active === false) {
    return {
      status: "cancelled",
      now: { at: now, bogotaYMD: nowBogotaYMD },
      expiresAt: { ymd: null, date: null },
      trial: { startedAt: toDate(license.trial_started_at), endsAt: toDate(license.trial_ends_at) },
      grace: { days: license.grace_days, baseYMD: null, endsYMD: null },
      coverage: { hasValidCoverage: false },
    }
  }

  if (license.plan === "lifetime") {
    return {
      status: "active",
      now: { at: now, bogotaYMD: nowBogotaYMD },
      expiresAt: { ymd: null, date: null },
      trial: { startedAt: toDate(license.trial_started_at), endsAt: toDate(license.trial_ends_at) },
      grace: { days: license.grace_days, baseYMD: null, endsYMD: null },
      coverage: { hasValidCoverage: true },
    }
  }

  const expiresAt = computeExpiresAtBogotaDate(license, payments)
  const hasValidCoverage = expiresAt.ymd != null

  if (expiresAt.ymd && compareYMD(nowBogotaYMD, expiresAt.ymd) <= 0) {
    return {
      status: "active",
      now: { at: now, bogotaYMD: nowBogotaYMD },
      expiresAt,
      trial: { startedAt: toDate(license.trial_started_at), endsAt: toDate(license.trial_ends_at) },
      grace: { days: license.grace_days, baseYMD: expiresAt.ymd, endsYMD: addDaysYMD(expiresAt.ymd, license.grace_days) },
      coverage: { hasValidCoverage },
    }
  }

  const trialEndsAt = toDate(license.trial_ends_at)
  const trialStartedAt = toDate(license.trial_started_at)
  if (trialEndsAt && now.getTime() < trialEndsAt.getTime()) {
    return {
      status: "trial",
      now: { at: now, bogotaYMD: nowBogotaYMD },
      expiresAt,
      trial: { startedAt: trialStartedAt, endsAt: trialEndsAt },
      grace: { days: license.grace_days, baseYMD: null, endsYMD: null },
      coverage: { hasValidCoverage },
    }
  }

  // Grace base:
  // - If we had coverage, grace starts after expiresAt YMD.
  // - If no coverage but trial existed and ended, grace starts after the trial end (Bogota YMD).
  const graceBase = expiresAt.ymd ?? (trialEndsAt ? getBogotaYMD(trialEndsAt) : null)
  if (graceBase) {
    const graceEnds = addDaysYMD(graceBase, license.grace_days)
    if (compareYMD(nowBogotaYMD, graceEnds) <= 0) {
      return {
        status: "grace_period",
        now: { at: now, bogotaYMD: nowBogotaYMD },
        expiresAt,
        trial: { startedAt: trialStartedAt, endsAt: trialEndsAt },
        grace: { days: license.grace_days, baseYMD: graceBase, endsYMD: graceEnds },
        coverage: { hasValidCoverage },
      }
    }
  }

  return {
    status: "suspended",
    now: { at: now, bogotaYMD: nowBogotaYMD },
    expiresAt,
    trial: { startedAt: trialStartedAt, endsAt: trialEndsAt },
    grace: {
      days: license.grace_days,
      baseYMD: graceBase,
      endsYMD: graceBase ? addDaysYMD(graceBase, license.grace_days) : null,
    },
    coverage: { hasValidCoverage },
  }
}
