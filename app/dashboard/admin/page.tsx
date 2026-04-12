import "server-only"

import { notFound } from "next/navigation"
import { cookies } from "next/headers"

import { createAdminSupabaseClient } from "@/lib/supabase/admin"

import {
  clearTrialAction,
  createClientAction,
  createLicenseAction,
  createPaymentAction,
  setTrialAction,
  voidPaymentAction,
} from "./actions"

const DASHBOARD_ADMIN_COOKIE = "prigma_dashboard_token"

export default async function AdminDashboardPage(props: {
  searchParams: Promise<{ token?: string | string[] }>
}) {
  const searchParams = await props.searchParams
  const token = typeof searchParams.token === "string" ? searchParams.token : ""

  const expected = process.env.DASHBOARD_TOKEN ?? ""
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get(DASHBOARD_ADMIN_COOKIE)?.value ?? ""
  const hasCookie = expected && cookieToken === expected
  const hasQueryToken = expected && token === expected
  if (!hasCookie && !hasQueryToken) notFound()

  const supabase = createAdminSupabaseClient()

  const [clientsRes, licensesRes, paymentsRes] = await Promise.all([
    supabase
      .from("clients")
      .select(
        "id, client_name, company_name, contact_name, contact_email, contact_phone, created_at",
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("licenses")
      .select(
        "id, client_id, license_key, plan, billing_day, price_cop, grace_days, grace_days_connection, trial_started_at, trial_ends_at, active, created_at, clients(client_name)",
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("payments")
      .select(
        "id, license_id, type, amount_cop, months_covered, is_draft, paid_at, voided_at, void_reason, created_at",
      )
      .order("created_at", { ascending: false }),
  ])

  if (clientsRes.error) throw new Error(clientsRes.error.message)
  if (licensesRes.error) throw new Error(licensesRes.error.message)
  if (paymentsRes.error) throw new Error(paymentsRes.error.message)

  const clients = clientsRes.data ?? []
  const licenses = licensesRes.data ?? []
  const payments = paymentsRes.data ?? []

  const paymentsByLicenseId = new Map<string, any[]>()
  for (const p of payments) {
    const licenseId = String(p.license_id)
    const arr = paymentsByLicenseId.get(licenseId) ?? []
    arr.push(p)
    paymentsByLicenseId.set(licenseId, arr)
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold">Dashboard de Admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Protegido por token (cookie httpOnly). Esto usa acceso Supabase con service-role.
      </p>

      <section className="mt-8 grid gap-6">
        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Crear Cliente</h2>
          <form action={createClientAction} className="mt-4 grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Nombre del cliente (client_name) *</span>
              <input name="client_name" required className="rounded-md border p-2 text-sm" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Empresa (company_name)</span>
              <input name="company_name" className="rounded-md border p-2 text-sm" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Contacto (nombre) (contact_name)</span>
              <input name="contact_name" className="rounded-md border p-2 text-sm" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Contacto (email) (contact_email)</span>
              <input name="contact_email" className="rounded-md border p-2 text-sm" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Contacto (telefono) (contact_phone)</span>
              <input name="contact_phone" className="rounded-md border p-2 text-sm" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm">Info extra (extra_info)</span>
              <textarea name="extra_info" className="rounded-md border p-2 text-sm" />
            </label>
            <button className="w-fit rounded-md border px-3 py-2 text-sm" type="submit">
              Crear cliente
            </button>
          </form>
        </div>

        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Crear Licencia</h2>
          <form action={createLicenseAction} className="mt-4 grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Cliente (client_id) *</span>
              <select
                name="client_id"
                required
                className="rounded-md border bg-background p-2 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccionar cliente...
                </option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.client_name} ({c.id})
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm">Plan (plan) *</span>
              <select
                name="plan"
                required
                className="rounded-md border bg-background p-2 text-sm"
                defaultValue="monthly"
              >
                <option value="monthly">monthly</option>
                <option value="annual">annual</option>
                <option value="lifetime">lifetime</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm">Dia de cobro (billing_day) (1..31; vacio para lifetime)</span>
              <input name="billing_day" type="number" className="rounded-md border p-2 text-sm" />
            </label>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <label className="grid gap-1">
                <span className="text-sm">Precio COP (price_cop)</span>
                <input
                  name="price_cop"
                  type="number"
                  defaultValue={0}
                  className="rounded-md border p-2 text-sm"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Dias de gracia (grace_days)</span>
                <input
                  name="grace_days"
                  type="number"
                  defaultValue={0}
                  className="rounded-md border p-2 text-sm"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Gracia por desconexion (grace_days_connection)</span>
                <input
                  name="grace_days_connection"
                  type="number"
                  defaultValue={0}
                  className="rounded-md border p-2 text-sm"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm">Inicio de trial (trial_started_at)</span>
                <input
                  name="trial_started_at"
                  type="date"
                  className="rounded-md border p-2 text-sm"
                />
                <span className="text-xs text-muted-foreground">
                  Elegi una fecha (se interpreta como medianoche America/Bogota).
                </span>
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Fin de trial (trial_ends_at)</span>
                <input
                  name="trial_ends_at"
                  type="date"
                  className="rounded-md border p-2 text-sm"
                />
                <span className="text-xs text-muted-foreground">
                  Elegi una fecha (debe ser posterior al inicio).
                </span>
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input name="active" type="checkbox" defaultChecked /> activo
            </label>

            <button className="w-fit rounded-md border px-3 py-2 text-sm" type="submit">
              Crear licencia (el servidor genera license_key)
            </button>
          </form>
        </div>

        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Crear Pago</h2>
          <form action={createPaymentAction} className="mt-4 grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Licencia (license_id) *</span>
              <select
                name="license_id"
                required
                className="rounded-md border bg-background p-2 text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccionar licencia...
                </option>
                {licenses.map((l: any) => (
                  <option key={l.id} value={l.id}>
                    {l.clients?.client_name ?? l.client_id} / {l.license_key}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <label className="grid gap-1">
                <span className="text-sm">Tipo (type) *</span>
                <select
                  name="type"
                  required
                  className="rounded-md border bg-background p-2 text-sm"
                  defaultValue="normal"
                >
                  <option value="normal">normal</option>
                  <option value="promo">promo</option>
                  <option value="adjustment">adjustment</option>
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Monto COP (amount_cop) *</span>
                <input
                  name="amount_cop"
                  type="number"
                  min={0}
                  step={1}
                  required
                  className="rounded-md border p-2 text-sm"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Meses cubiertos (months_covered) *</span>
                <input
                  name="months_covered"
                  type="number"
                  min={1}
                  step={1}
                  required
                  defaultValue={1}
                  className="rounded-md border p-2 text-sm"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-sm">Fecha de pago (paid_at)</span>
                <input
                  name="paid_at"
                  type="date"
                  className="rounded-md border p-2 text-sm"
                />
                <span className="text-xs text-muted-foreground">
                  Draft: dejalo vacio. Publicado (no draft): elegi una fecha.
                </span>
              </label>
              <label className="grid gap-1">
                <span className="text-sm">Notas (notes)</span>
                <input name="notes" className="rounded-md border p-2 text-sm" />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input name="is_draft" type="checkbox" /> draft (sin paid_at)
            </label>

            <button className="w-fit rounded-md border px-3 py-2 text-sm" type="submit">
              Crear pago
            </button>
          </form>
        </div>
      </section>

      <section className="mt-10 grid gap-8">
        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Clientes ({clients.length})</h2>
          <div className="mt-4 overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2">client_name</th>
                  <th className="p-2">company_name</th>
                  <th className="p-2">contact</th>
                  <th className="p-2">created_at</th>
                  <th className="p-2">id</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-b align-top">
                    <td className="p-2 font-medium">{c.client_name}</td>
                    <td className="p-2">{c.company_name ?? ""}</td>
                    <td className="p-2">
                      {(c.contact_name ?? "") + (c.contact_email ? ` <${c.contact_email}>` : "")}
                    </td>
                    <td className="p-2 font-mono text-xs">{c.created_at ?? ""}</td>
                    <td className="p-2 font-mono text-xs">{c.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Licencias ({licenses.length})</h2>
          <div className="mt-4 overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2">client</th>
                  <th className="p-2">plan</th>
                  <th className="p-2">billing_day</th>
                  <th className="p-2">grace_days</th>
                  <th className="p-2">grace_days_connection</th>
                  <th className="p-2">trial</th>
                  <th className="p-2">active</th>
                  <th className="p-2">license_key</th>
                  <th className="p-2">created_at</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((l: any) => (
                  <tr key={l.id} className="border-b align-top">
                    <td className="p-2">{l.clients?.client_name ?? l.client_id}</td>
                    <td className="p-2">{l.plan}</td>
                    <td className="p-2">{l.billing_day ?? ""}</td>
                    <td className="p-2">{l.grace_days}</td>
                    <td className="p-2">{l.grace_days_connection}</td>
                    <td className="p-2">
                      <div className="grid gap-2">
                        <div className="font-mono text-xs">
                          {(l.trial_started_at ?? "") + (l.trial_ends_at ? ` -> ${l.trial_ends_at}` : "")}
                        </div>
                         <form action={setTrialAction} className="grid gap-2">
                           <input type="hidden" name="license_id" value={l.id} />
                           <input
                             name="trial_started_at"
                             type="date"
                             className="rounded-md border p-2 text-xs"
                           />
                           <input
                             name="trial_ends_at"
                             type="date"
                             className="rounded-md border p-2 text-xs"
                           />
                           <button
                             className="w-fit rounded-md border px-2 py-1 text-xs"
                             type="submit"
                           >
                            Set trial
                          </button>
                        </form>
                        <form action={clearTrialAction}>
                          <input type="hidden" name="license_id" value={l.id} />
                          <button
                            className="w-fit rounded-md border px-2 py-1 text-xs"
                            type="submit"
                          >
                            Clear trial
                          </button>
                        </form>
                      </div>
                    </td>
                    <td className="p-2">{String(l.active)}</td>
                    <td className="p-2 font-mono text-xs">{l.license_key}</td>
                    <td className="p-2 font-mono text-xs">{l.created_at ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold">Pagos</h2>
          <div className="mt-4 grid gap-6">
            {licenses.map((l: any) => {
              const licensePayments = paymentsByLicenseId.get(String(l.id)) ?? []
              return (
                <div key={l.id} className="rounded-md border p-3">
                  <div className="text-sm font-medium">
                    {l.clients?.client_name ?? l.client_id} / {l.license_key}
                  </div>
                  <div className="mt-3 overflow-auto">
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="p-2">type</th>
                          <th className="p-2">amount_cop</th>
                          <th className="p-2">months_covered</th>
                          <th className="p-2">paid_at</th>
                          <th className="p-2">is_draft</th>
                          <th className="p-2">voided_at</th>
                          <th className="p-2">actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {licensePayments.length === 0 ? (
                          <tr>
                            <td className="p-2 text-muted-foreground" colSpan={7}>
                              (sin pagos)
                            </td>
                          </tr>
                        ) : (
                          licensePayments.map((p: any) => (
                            <tr key={p.id} className="border-b align-top">
                              <td className="p-2">{p.type}</td>
                              <td className="p-2">{p.amount_cop}</td>
                              <td className="p-2">{p.months_covered ?? ""}</td>
                              <td className="p-2 font-mono">{p.paid_at ?? ""}</td>
                              <td className="p-2">{String(p.is_draft)}</td>
                              <td className="p-2 font-mono">{p.voided_at ?? ""}</td>
                              <td className="p-2">
                                <form action={voidPaymentAction} className="grid gap-2">
                                  <input type="hidden" name="payment_id" value={p.id} />
                                  <input
                                    name="paid_at"
                                    type="date"
                                    className="rounded-md border p-2 text-xs"
                                  />
                                  <input
                                    name="void_reason"
                                    required
                                    className="rounded-md border p-2 text-xs"
                                    placeholder="void_reason"
                                  />
                                  <button
                                    className="w-fit rounded-md border px-2 py-1 text-xs"
                                    type="submit"
                                    disabled={Boolean(p.voided_at)}
                                  >
                                    Void
                                  </button>
                                </form>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
