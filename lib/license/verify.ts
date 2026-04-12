import { createHash, createHmac, timingSafeEqual } from "node:crypto"

import { computeLicenseStatus } from "./rules"
import type { LicenseRecord, PaymentRecord, YMD } from "./types"

export const VERIFY_PATHNAME = "/api/license/verify"

export type ParsedVerifyHeaders = {
  licenseKey: string
  timestamp: number
  signature: string
}

export type VerifyPayload = {
  status: ReturnType<typeof computeLicenseStatus>["status"]
  plan: LicenseRecord["plan"]
  billing_day: LicenseRecord["billing_day"]
  price_cop: LicenseRecord["price_cop"]
  grace_days: LicenseRecord["grace_days"]
  grace_days_connection: LicenseRecord["grace_days_connection"]
  trial_ends_at: string | null
  trial_active: boolean
  expires_at_ymd: string | null
  // Optional, but useful for debugging and parity with compute output.
  expires_at_date: string | null
  grace_ends_ymd: string | null
  server_time: number
}

/**
 * Canonical signature strings.
 *
 * Request canonical string:
 *   v1:{timestamp}:{licenseKey}:{method}:{pathname}
 *   - method MUST be uppercased.
 *   - pathname MUST be exactly `/api/license/verify`.
 *   - HMAC secret is `licenseKey`.
 *   - HMAC digest is lowercase hex.
 *
 * Response canonical string:
 *   v1:{timestamp}:{licenseKey}:response:{sha256(body)}
 *   - `body` is the exact UTF-8 JSON bytes sent to the client.
 */

export function parseVerifyHeaders(headers: Headers): ParsedVerifyHeaders | null {
  const licenseKey = headers.get("x-license-key")?.trim() ?? ""
  const tsRaw = headers.get("x-timestamp")?.trim() ?? ""
  const signature = headers.get("x-signature")?.trim() ?? ""

  if (!licenseKey || !tsRaw || !signature) return null
  // Unix seconds only.
  if (!/^[0-9]+$/.test(tsRaw)) return null
  const timestamp = Number(tsRaw)
  if (!Number.isSafeInteger(timestamp) || timestamp <= 0) return null

  return {
    licenseKey,
    timestamp,
    signature: signature.toLowerCase(),
  }
}

export function validateTimestamp(
  timestampSeconds: number,
  nowSeconds: number,
  windowSeconds: number = 5 * 60,
): boolean {
  if (!Number.isSafeInteger(timestampSeconds)) return false
  if (!Number.isSafeInteger(nowSeconds)) return false
  if (!Number.isSafeInteger(windowSeconds) || windowSeconds < 0) return false
  return Math.abs(nowSeconds - timestampSeconds) <= windowSeconds
}

export function canonicalRequestString(input: {
  timestamp: number
  licenseKey: string
  method: string
  pathname: string
}): string {
  return `v1:${input.timestamp}:${input.licenseKey}:${input.method.toUpperCase()}:${input.pathname}`
}

export function canonicalResponseString(input: {
  timestamp: number
  licenseKey: string
  bodySha256Hex: string
}): string {
  return `v1:${input.timestamp}:${input.licenseKey}:response:${input.bodySha256Hex}`
}

export function hmacSha256Hex(secret: string, message: string): string {
  return createHmac("sha256", secret).update(message, "utf8").digest("hex")
}

export function sha256HexUtf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

// Constant-time comparison for hex strings when possible.
export function timingSafeEqualHex(aHex: string, bHex: string): boolean {
  const a = aHex.toLowerCase()
  const b = bHex.toLowerCase()

  if (a.length !== b.length) return false
  if (a.length === 0) return false
  if (a.length % 2 !== 0) return false
  if (!/^[0-9a-f]+$/.test(a) || !/^[0-9a-f]+$/.test(b)) return false

  const aBuf = Buffer.from(a, "hex")
  const bBuf = Buffer.from(b, "hex")
  if (aBuf.length !== bBuf.length || aBuf.length === 0) return false
  return timingSafeEqual(aBuf, bBuf)
}

export function signRequest(input: {
  licenseKey: string
  timestamp: number
  method: string
  pathname: string
}): { canonical: string; signature: string } {
  const canonical = canonicalRequestString(input)
  const signature = hmacSha256Hex(input.licenseKey, canonical)
  return { canonical, signature }
}

export function verifyRequestSignature(input: {
  licenseKey: string
  timestamp: number
  method: string
  pathname: string
  signature: string
}): boolean {
  const expected = signRequest({
    licenseKey: input.licenseKey,
    timestamp: input.timestamp,
    method: input.method,
    pathname: input.pathname,
  }).signature
  return timingSafeEqualHex(expected, input.signature)
}

export function signResponse(input: {
  licenseKey: string
  timestamp: number
  body: string
}): { bodySha256Hex: string; canonical: string; signature: string } {
  const bodySha256Hex = sha256HexUtf8(input.body)
  const canonical = canonicalResponseString({
    timestamp: input.timestamp,
    licenseKey: input.licenseKey,
    bodySha256Hex,
  })
  const signature = hmacSha256Hex(input.licenseKey, canonical)
  return { bodySha256Hex, canonical, signature }
}

function ymdToString(ymd: YMD): string {
  const y = String(ymd.y).padStart(4, "0")
  const m = String(ymd.m).padStart(2, "0")
  const d = String(ymd.d).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function buildVerifyPayload(input: {
  license: LicenseRecord
  payments: PaymentRecord[]
  now: Date
  serverTimeSeconds: number
}): VerifyPayload {
  const snapshot = computeLicenseStatus(input.license, input.payments, input.now)
  return {
    status: snapshot.status,
    plan: input.license.plan,
    billing_day: input.license.billing_day,
    price_cop: input.license.price_cop,
    grace_days: input.license.grace_days,
    grace_days_connection: input.license.grace_days_connection,
    trial_ends_at: snapshot.trial.endsAt ? snapshot.trial.endsAt.toISOString() : null,
    trial_active: snapshot.status === "trial",
    expires_at_ymd: snapshot.expiresAt.ymd ? ymdToString(snapshot.expiresAt.ymd) : null,
    expires_at_date: snapshot.expiresAt.date ? snapshot.expiresAt.date.toISOString() : null,
    grace_ends_ymd: snapshot.grace.endsYMD ? ymdToString(snapshot.grace.endsYMD) : null,
    server_time: input.serverTimeSeconds,
  }
}
