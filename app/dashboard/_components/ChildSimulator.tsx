"use client"

import { useEffect, useMemo, useState } from "react"

import {
  canonicalRequestString,
  canonicalResponseString,
  hmacSha256Hex,
  sha256HexUtf8,
} from "@/lib/license/webcrypto"

type Plan = "monthly" | "annual" | "lifetime"

type VerifyPayload = {
  status: "trial" | "active" | "grace_period" | "suspended" | "cancelled"
  plan: Plan
  billing_day: number | null
  price_cop: number
  grace_days: number
  grace_days_connection: number
  trial_ends_at: string | null
  trial_active: boolean
  expires_at_ymd: string | null
  expires_at_date: string | null
  grace_ends_ymd: string | null
  server_time: number
}

type ChildSimState = {
  licenseKey: string
  lastCheckedAt: number | null // unix seconds
  lastResult: VerifyPayload | null
  offlineDays: number
  blocked: boolean
}

const STORAGE_KEY = "prigma.child_sim.v1"
const VERIFY_PATHNAME = "/api/license/verify"

function clampInt(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value)
  return Number.isFinite(n) ? Math.trunc(n) : fallback
}

function readState(): ChildSimState {
  if (typeof window === "undefined") {
    return {
      licenseKey: "",
      lastCheckedAt: null,
      lastResult: null,
      offlineDays: 0,
      blocked: false,
    }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) throw new Error("empty")
    const parsed = JSON.parse(raw) as Partial<ChildSimState>
    return {
      licenseKey: typeof parsed.licenseKey === "string" ? parsed.licenseKey : "",
      lastCheckedAt:
        typeof parsed.lastCheckedAt === "number" && Number.isFinite(parsed.lastCheckedAt)
          ? parsed.lastCheckedAt
          : null,
      lastResult: (parsed.lastResult as VerifyPayload | null) ?? null,
      offlineDays: clampInt(parsed.offlineDays, 0),
      blocked: Boolean(parsed.blocked),
    }
  } catch {
    return {
      licenseKey: "",
      lastCheckedAt: null,
      lastResult: null,
      offlineDays: 0,
      blocked: false,
    }
  }
}

function writeState(next: ChildSimState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

function planFreshDays(plan: Plan): number {
  if (plan === "annual") return 7
  if (plan === "lifetime") return 30
  return 3
}

function isCacheFresh(input: {
  plan: Plan
  lastCheckedAt: number | null
  nowSeconds: number
}): boolean {
  if (!input.lastCheckedAt) return false
  const maxAgeSeconds = planFreshDays(input.plan) * 24 * 60 * 60
  return input.nowSeconds - input.lastCheckedAt < maxAgeSeconds
}

// crypto helpers live in lib/license/webcrypto

function computeBlocked(next: {
  lastResult: VerifyPayload | null
  offlineDays: number
}): boolean {
  const status = next.lastResult?.status
  if (status === "suspended" || status === "cancelled") return true
  const graceConn = next.lastResult?.grace_days_connection ?? 0
  return next.offlineDays > graceConn
}

export default function ChildSimulator() {
  const [state, setState] = useState<ChildSimState>(() => readState())
  const [motherUnreachable, setMotherUnreachable] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string>("")

  useEffect(() => {
    if (typeof window === "undefined") return
    writeState(state)
  }, [state])

  const inferredPlan: Plan = useMemo(() => {
    const p = state.lastResult?.plan
    return p === "annual" || p === "lifetime" || p === "monthly" ? p : "monthly"
  }, [state.lastResult?.plan])

  async function onAdminLoginClick() {
    setMsg("")

    if (!crypto?.subtle) {
      setMsg("WebCrypto SubtleCrypto no esta disponible en este navegador.")
      return
    }

    const nowSeconds = Math.floor(Date.now() / 1000)
    const licenseKey = state.licenseKey.trim()
    if (!licenseKey) {
      setMsg("Primero ingresa una license key.")
      return
    }

    // Cache: child can avoid calling mother while still being allowed to run.
    if (
      state.lastResult &&
      isCacheFresh({
        plan: state.lastResult.plan,
        lastCheckedAt: state.lastCheckedAt,
        nowSeconds,
      })
    ) {
      const blocked = computeBlocked({
        lastResult: state.lastResult,
        offlineDays: state.offlineDays,
      })
      setState((s) => ({ ...s, blocked }))
      setMsg(
        `Se uso el estado cacheado (fresco por ${planFreshDays(state.lastResult.plan)}d). blocked=${String(blocked)}`,
      )
      return
    }

    if (motherUnreachable) {
      // Demo only: increment a local counter so you can test grace_days_connection gating.
      const offlineDays = state.offlineDays + 1
      const blocked = computeBlocked({ lastResult: state.lastResult, offlineDays })
      setState((s) => ({ ...s, offlineDays, blocked }))
      setMsg(
        `Se simulo "mother unreachable". offlineDays=${offlineDays} blocked=${String(blocked)}`,
      )
      return
    }

    setBusy(true)
    try {
      const ts = nowSeconds
      const canonical = canonicalRequestString({
        timestamp: ts,
        licenseKey,
        method: "GET",
        pathname: VERIFY_PATHNAME,
      })
      const signature = await hmacSha256Hex(licenseKey, canonical)

      const res = await fetch(VERIFY_PATHNAME, {
        method: "GET",
        headers: {
          "x-license-key": licenseKey,
          "x-timestamp": String(ts),
          "x-signature": signature,
        },
        cache: "no-store",
      })

      if (!res.ok) {
        setState((s) => ({
          ...s,
          // keep lastCheckedAt as last successful check
          offlineDays: s.offlineDays + 1,
          blocked: computeBlocked({
            lastResult: s.lastResult,
            offlineDays: s.offlineDays + 1,
          }),
        }))
        setMsg(`La mother respondio ${res.status}. Para la demo, se trata como offline.`)
        return
      }

      const bodyText = await res.text()
      const payload = JSON.parse(bodyText) as VerifyPayload

      const resTsRaw = res.headers.get("x-timestamp")?.trim() ?? ""
      const resSig = (res.headers.get("x-signature")?.trim() ?? "").toLowerCase()
      const resTs = /^[0-9]+$/.test(resTsRaw) ? Number(resTsRaw) : NaN
      if (!Number.isFinite(resTs) || !resSig) {
        setMsg("Faltan o son invalidos los headers de firma del response.")
        return
      }

      const bodySha = await sha256HexUtf8(bodyText)
      const resCanonical = canonicalResponseString({
        timestamp: resTs,
        licenseKey,
        bodySha256Hex: bodySha,
      })
      const expectedResSig = await hmacSha256Hex(licenseKey, resCanonical)
      if (expectedResSig !== resSig) {
        setMsg("FALLO la verificacion de la firma del response.")
        return
      }

      const next: ChildSimState = {
        licenseKey,
        lastCheckedAt: nowSeconds,
        lastResult: payload,
        offlineDays: 0,
        blocked: computeBlocked({ lastResult: payload, offlineDays: 0 }),
      }
      setState(next)
      setMsg(
        `Verificado OK. status=${payload.status} blocked=${String(next.blocked)} (server_time=${payload.server_time})`,
      )
    } catch (e) {
      const offlineDays = state.offlineDays + 1
      setState((s) => ({
        ...s,
        offlineDays,
        blocked: computeBlocked({ lastResult: s.lastResult, offlineDays }),
      }))
      setMsg(`Fallo el fetch. Para la demo, se trata como offline. ${(e as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  function onReset() {
    const next: ChildSimState = {
      licenseKey: "",
      lastCheckedAt: null,
      lastResult: null,
      offlineDays: 0,
      blocked: false,
    }
    setState(next)
    setMsg("Se reinicio el estado local del simulador.")
  }

  return (
    <section id="child-simulator" className="mx-auto max-w-4xl p-6">
      <h2 className="text-2xl font-semibold">Simulador de App Hija (Solo Demo)</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        ADVERTENCIA: Esto es un simulador para demostrar el protocolo. En una app hija de produccion,
        nunca pongas license keys reales en el browser.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Clave de licencia (demo)</span>
          <input
            className="w-full rounded-md border bg-background p-2 font-mono text-sm"
            value={state.licenseKey}
            onChange={(e) => setState((s) => ({ ...s, licenseKey: e.target.value }))}
            placeholder="lk_..."
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={motherUnreachable}
            onChange={(e) => setMotherUnreachable(e.target.checked)}
          />
          Simular "mother unreachable" (saltear fetch)
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm"
            onClick={onAdminLoginClick}
            disabled={busy}
          >
            {busy ? "Verificando..." : "Login de admin"}
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm"
            onClick={onReset}
            disabled={busy}
          >
            Reiniciar estado local
          </button>
        </div>

        <div className="rounded-md border p-3 text-sm">
          <div className="font-medium">Estado local</div>
          <div className="mt-2 grid gap-1 font-mono text-xs">
            <div>plan (inferido): {inferredPlan}</div>
            <div>ultima verificacion (unix): {state.lastCheckedAt ?? "null"}</div>
            <div>dias offline (offlineDays): {state.offlineDays}</div>
            <div>bloqueado (blocked): {String(state.blocked)}</div>
            <div>
              estado (lastResult.status): {state.lastResult?.status ?? "null"} (grace_days_connection=
              {state.lastResult?.grace_days_connection ?? "null"})
            </div>
          </div>
          {msg ? <div className="mt-2 text-xs">{msg}</div> : null}
        </div>

        <details className="rounded-md border p-3">
          <summary className="cursor-pointer text-sm font-medium">Mostrar JSON de lastResult</summary>
          <pre className="mt-2 overflow-auto text-xs">
            {state.lastResult ? JSON.stringify(state.lastResult, null, 2) : "null"}
          </pre>
        </details>
      </div>
    </section>
  )
}
