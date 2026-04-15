import "server-only"

import { randomUUID } from "node:crypto"

import { createClient } from "@supabase/supabase-js"

import { computeLicenseStatus } from "@/lib/license/rules"
import type { LicenseStatus } from "@/lib/license/types"

export const runtime = "nodejs"

type LicenseMessageResponse = {
  blocked: boolean
  message: string
  status: LicenseStatus
  diasRestantes: number | null
}

function getMessageForStatus(status: LicenseStatus, diasRestantes: number | null): { blocked: boolean; message: string } {
  switch (status) {
    case "active":
      return { blocked: false, message: "" }
    case "trial":
      return { blocked: false, message: "" }
    case "grace_period":
      return {
        blocked: false,
        message: diasRestantes != null
          ? `Licencia en período de gracia. ${diasRestantes} día${diasRestantes !== 1 ? "s" : ""} restante${diasRestantes !== 1 ? "s" : ""}.`
          : "Licencia en período de gracia."
      }
    case "suspended":
      return {
        blocked: true,
        message: "PAGO NO REGISTRADO - Tu licencia se encuentra suspendida. Comunícate con PRIGMA para renovar tu servicio."
      }
    case "cancelled":
      return {
        blocked: true,
        message: "LICENCIA CANCELADA - Tu licencia ha sido cancelada. Comunícate con PRIGMA para más información."
      }
    default:
      return { blocked: false, message: "" }
  }
}

export async function GET(req: Request): Promise<Response> {
  const requestId = randomUUID()

  const { searchParams } = new URL(req.url)
  const licenseKey = searchParams.get("key")?.trim() ?? ""

  if (!licenseKey) {
    return new Response(JSON.stringify({ error: "license_key_required" }), {
      status: 400,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "X-Request-Id": requestId,
      },
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
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
      "id, plan, billing_day, price_cop, grace_days, grace_days_connection, grace_ends_at, grace_ends_at_connection, trial_started_at, trial_ends_at, active"
    )
    .eq("license_key", licenseKey)
    .maybeSingle()

  if (licenseRes.error || !licenseRes.data) {
    return new Response(JSON.stringify({ error: "license_not_found" }), {
      status: 404,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "X-Request-Id": requestId,
      },
    })
  }

  const paymentsRes = await supabase
    .from("payments")
    .select("type, amount_cop, months_covered, is_draft, paid_at, voided_at")
    .eq("license_id", licenseRes.data.id)

  if (paymentsRes.error || !paymentsRes.data) {
    return new Response(JSON.stringify({ error: "payments_not_found" }), {
      status: 404,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "X-Request-Id": requestId,
      },
    })
  }

  const now = new Date()
  const snapshot = computeLicenseStatus(licenseRes.data, paymentsRes.data, now)

  let diasRestantes: number | null = null
  if (snapshot.grace.endsYMD && snapshot.status === "grace_period") {
    const today = snapshot.now.bogotaYMD
    const graceEnd = snapshot.grace.endsYMD

    const todayMs = new Date(Date.UTC(today.y, today.m - 1, today.d)).getTime()
    const graceEndMs = new Date(Date.UTC(graceEnd.y, graceEnd.m - 1, graceEnd.d)).getTime()

    diasRestantes = Math.ceil((graceEndMs - todayMs) / (1000 * 60 * 60 * 24))
  }

  const { blocked, message } = getMessageForStatus(snapshot.status, diasRestantes)

  const response: LicenseMessageResponse = {
    blocked,
    message,
    status: snapshot.status,
    diasRestantes,
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "X-Request-Id": requestId,
    },
  })
}
