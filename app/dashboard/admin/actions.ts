"use server"

import "server-only"

import { randomUUID } from "node:crypto"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { createAdminSupabaseClient } from "@/lib/supabase/admin"

const DASHBOARD_ADMIN_COOKIE = "prigma_dashboard_token"

async function assertAdmin() {
  const expected = process.env.DASHBOARD_TOKEN ?? ""
  const cookieStore = await cookies()
  const actual = cookieStore.get(DASHBOARD_ADMIN_COOKIE)?.value ?? ""
  if (!expected || actual !== expected) notFound()
}

function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim()
}

function getOptionalString(formData: FormData, key: string): string | null {
  const v = getString(formData, key)
  return v ? v : null
}

function getOptionalInt(formData: FormData, key: string): number | null {
  const raw = getString(formData, key)
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return Math.trunc(n)
}

function parseBogotaDateInputToIso(v: string): string | null {
  const raw = v.trim()
  if (!raw) return null

  // Admin UI uses <input type="date"> which submits YYYY-MM-DD. The business logic
  // is day-based in America/Bogota (UTC-5, no DST). Store it as Bogota local midnight.
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T05:00:00.000Z`

  // Also accept full ISO strings with timezone for robustness.
  const d = new Date(raw)
  return Number.isNaN(d.getTime()) ? null : d.toISOString()
}

function getOptionalIsoOrNull(formData: FormData, key: string): string | null {
  return parseBogotaDateInputToIso(getString(formData, key))
}

export async function createClientAction(formData: FormData) {
  await assertAdmin()
  const client_name = getString(formData, "client_name")
  if (!client_name) throw new Error("client_name is required")

  const supabase = createAdminSupabaseClient()
  const res = await supabase.from("clients").insert({
    client_name,
    company_name: getOptionalString(formData, "company_name"),
    contact_name: getOptionalString(formData, "contact_name"),
    contact_email: getOptionalString(formData, "contact_email"),
    contact_phone: getOptionalString(formData, "contact_phone"),
    extra_info: getOptionalString(formData, "extra_info"),
  })

  if (res.error) throw new Error(res.error.message)
  revalidatePath("/dashboard/admin")
}

export async function createLicenseAction(formData: FormData) {
  await assertAdmin()
  const client_id = getString(formData, "client_id")
  if (!client_id) throw new Error("client_id is required")

  const planRaw = getString(formData, "plan")
  if (planRaw !== "monthly" && planRaw !== "annual" && planRaw !== "lifetime") {
    throw new Error("invalid plan")
  }
  const plan = planRaw

  const billing_day = getOptionalInt(formData, "billing_day")
  if (plan === "lifetime") {
    if (billing_day != null) throw new Error("billing_day must be empty for lifetime")
  } else {
    if (billing_day == null) throw new Error("billing_day is required for non-lifetime")
    if (billing_day < 1 || billing_day > 31) throw new Error("billing_day must be 1..31")
  }

  const price_cop = getOptionalInt(formData, "price_cop") ?? 0
  const grace_days = getOptionalInt(formData, "grace_days") ?? 0
  const grace_days_connection = getOptionalInt(formData, "grace_days_connection") ?? 0

  const trial_started_at = getOptionalIsoOrNull(formData, "trial_started_at")
  const trial_ends_at = getOptionalIsoOrNull(formData, "trial_ends_at")
  if ((trial_started_at && !trial_ends_at) || (!trial_started_at && trial_ends_at)) {
    throw new Error("trial_started_at and trial_ends_at must be both set or both empty")
  }

  const activeRaw = getString(formData, "active")
  const active = activeRaw === "on" || activeRaw === "true" || activeRaw === "1"

  const license_key = `lk_${randomUUID().replace(/-/g, "")}`

  const supabase = createAdminSupabaseClient()
  const res = await supabase.from("licenses").insert({
    client_id,
    license_key,
    plan,
    billing_day: plan === "lifetime" ? null : billing_day,
    price_cop,
    grace_days,
    grace_days_connection,
    trial_started_at,
    trial_ends_at,
    active,
  })

  if (res.error) throw new Error(res.error.message)
  revalidatePath("/dashboard/admin")
}

function getRequiredNonNegSafeInt(formData: FormData, key: string): number {
  const raw = getString(formData, key)
  if (!raw) throw new Error(`${key} is required`)
  if (!/^\d+$/.test(raw)) throw new Error(`invalid ${key}`)
  const n = Number(raw)
  if (!Number.isSafeInteger(n)) throw new Error(`${key} is too large`)
  if (n < 0) throw new Error(`${key} must be >= 0`)
  return n
}

function getOptionalIsoOrThrowEmpty(formData: FormData, key: string): string | null {
  const v = getString(formData, key)
  if (!v) return null
  const iso = parseBogotaDateInputToIso(v)
  if (!iso) throw new Error(`invalid ${key}`)
  return iso
}

export async function createPaymentAction(formData: FormData) {
  await assertAdmin()
  const license_id = getString(formData, "license_id")
  if (!license_id) throw new Error("license_id is required")

  const typeRaw = getString(formData, "type")
  if (typeRaw !== "normal" && typeRaw !== "promo" && typeRaw !== "adjustment") {
    throw new Error("invalid type")
  }

  const amount_cop = getRequiredNonNegSafeInt(formData, "amount_cop")

  const monthsRaw = getString(formData, "months_covered")
  if (!/^\d+$/.test(monthsRaw)) throw new Error("invalid months_covered")
  const months_covered = Number(monthsRaw)
  if (!Number.isSafeInteger(months_covered) || months_covered < 1) {
    throw new Error("months_covered must be >= 1")
  }

  const isDraftRaw = getString(formData, "is_draft")
  const is_draft = isDraftRaw === "on" || isDraftRaw === "true" || isDraftRaw === "1"
  const paid_at = is_draft ? null : (() => {
    const v = getOptionalIsoOrThrowEmpty(formData, "paid_at")
    if (!v) throw new Error("paid_at is required when not draft")
    return v
  })()

  const notes = getOptionalString(formData, "notes")

  const supabase = createAdminSupabaseClient()
  const res = await supabase.from("payments").insert({
    license_id,
    type: typeRaw,
    amount_cop,
    months_covered,
    is_draft,
    paid_at,
    notes,
  })
  if (res.error) throw new Error(res.error.message)
  revalidatePath("/dashboard/admin")
}

export async function voidPaymentAction(formData: FormData) {
  await assertAdmin()
  const payment_id = getString(formData, "payment_id")
  if (!payment_id) throw new Error("payment_id is required")

  const void_reason = getString(formData, "void_reason")
  if (!void_reason) throw new Error("void_reason is required")

  // Constraint: void requires non-draft; paid_at required for non-draft.
  let paid_at = getOptionalIsoOrThrowEmpty(formData, "paid_at")

  const supabase = createAdminSupabaseClient()

  if (!paid_at) {
    const existing = await supabase
      .from("payments")
      .select("paid_at")
      .eq("id", payment_id)
      .maybeSingle()
    if (existing.error) throw new Error(existing.error.message)
    paid_at = existing.data?.paid_at ?? null
  }
  if (!paid_at) throw new Error("paid_at is required")

  const res = await supabase
    .from("payments")
    .update({
      is_draft: false,
      paid_at,
      voided_at: new Date().toISOString(),
      void_reason,
    })
    .eq("id", payment_id)

  if (res.error) throw new Error(res.error.message)
  revalidatePath("/dashboard/admin")
}

export async function setTrialAction(formData: FormData) {
  await assertAdmin()
  const license_id = getString(formData, "license_id")
  if (!license_id) throw new Error("license_id is required")

  const trial_started_at = getOptionalIsoOrNull(formData, "trial_started_at")
  const trial_ends_at = getOptionalIsoOrNull(formData, "trial_ends_at")
  if (!trial_started_at || !trial_ends_at) {
    throw new Error("trial_started_at and trial_ends_at are required")
  }
  if (new Date(trial_ends_at).getTime() <= new Date(trial_started_at).getTime()) {
    throw new Error("trial_ends_at must be after trial_started_at")
  }

  const supabase = createAdminSupabaseClient()
  const res = await supabase
    .from("licenses")
    .update({ trial_started_at, trial_ends_at })
    .eq("id", license_id)
  if (res.error) throw new Error(res.error.message)
  revalidatePath("/dashboard/admin")
}

export async function clearTrialAction(formData: FormData) {
  await assertAdmin()
  const license_id = getString(formData, "license_id")
  if (!license_id) throw new Error("license_id is required")

  const supabase = createAdminSupabaseClient()
  const res = await supabase
    .from("licenses")
    .update({ trial_started_at: null, trial_ends_at: null })
    .eq("id", license_id)
  if (res.error) throw new Error(res.error.message)
  revalidatePath("/dashboard/admin")
}
