import "server-only"

import { randomUUID } from "node:crypto"

import { createClient } from "@supabase/supabase-js"

import {
  buildVerifyPayload,
  parseVerifyHeaders,
  signResponse,
  validateTimestamp,
  verifyRequestSignature,
  VERIFY_PATHNAME,
} from "@/lib/license/verify"

export const runtime = "nodejs"

function unauthorized(requestId: string): Response {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "X-Request-Id": requestId,
    },
  })
}

export async function GET(req: Request): Promise<Response> {
  const requestId = randomUUID()
  const nowSeconds = Math.floor(Date.now() / 1000)

  const parsed = parseVerifyHeaders(req.headers)
  if (!parsed) return unauthorized(requestId)
  if (!validateTimestamp(parsed.timestamp, nowSeconds)) return unauthorized(requestId)
  if (
    !verifyRequestSignature({
      licenseKey: parsed.licenseKey,
      timestamp: parsed.timestamp,
      method: req.method,
      pathname: VERIFY_PATHNAME,
      signature: parsed.signature,
    })
  ) {
    return unauthorized(requestId)
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    // Misconfigured server; do not downgrade to unauthorized.
    return new Response(JSON.stringify({ error: "server_misconfigured" }), {
      status: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "X-Request-Id": requestId,
      },
    })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  const licenseRes = await supabase
    .from("licenses")
    .select(
      "id, plan, billing_day, price_cop, grace_days, grace_days_connection, trial_started_at, trial_ends_at, active",
    )
    .eq("license_key", parsed.licenseKey)
    .maybeSingle()

  if (licenseRes.error || !licenseRes.data) return unauthorized(requestId)

  const paymentsRes = await supabase
    .from("payments")
    .select("type, amount_cop, months_covered, is_draft, paid_at, voided_at")
    .eq("license_id", licenseRes.data.id)

  if (paymentsRes.error || !paymentsRes.data) return unauthorized(requestId)

  const payload = buildVerifyPayload({
    // DB record is compatible with LicenseRecord used by the rule engine.
    license: licenseRes.data,
    // DB record is compatible with PaymentRecord used by the rule engine.
    payments: paymentsRes.data,
    now: new Date(nowSeconds * 1000),
    serverTimeSeconds: nowSeconds,
  })

  const body = JSON.stringify(payload)
  const signed = signResponse({
    licenseKey: parsed.licenseKey,
    timestamp: nowSeconds,
    body,
  })

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "X-Request-Id": requestId,
      "x-timestamp": String(nowSeconds),
      "x-signature": signed.signature,
    },
  })
}
