import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/auth"

export default async function PaymentsPage() {
  await getCurrentUser()

  const supabase = createAdminSupabaseClient()

  const { data: payments } = await supabase
    .from("payments")
    .select(`
      id,
      license_id,
      type,
      amount_cop,
      months_covered,
      is_draft,
      paid_at,
      voided_at,
      void_reason,
      notes,
      created_at,
      licenses (
        id,
        license_key,
        clients (client_name)
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Pagos</h1>
      </div>

      <div className="rounded-md border">
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="p-3 font-medium">Licencia</th>
                <th className="p-3 font-medium">Tipo</th>
                <th className="p-3 font-medium">Monto</th>
                <th className="p-3 font-medium">Meses</th>
                <th className="p-3 font-medium">Estado</th>
                <th className="p-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {(!payments || payments.length === 0) ? (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={6}>
                    No hay pagos registrados
                  </td>
                </tr>
              ) : (
                payments.map((payment) => {
                  const license = payment.licenses as any
                  return (
                    <tr key={payment.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">
                        <div className="font-mono text-xs">{license?.license_key ?? payment.license_id}</div>
                        <div className="text-xs text-muted-foreground">{license?.clients?.client_name ?? ""}</div>
                      </td>
                      <td className="p-3 capitalize">{payment.type}</td>
                      <td className="p-3">${(payment.amount_cop ?? 0).toLocaleString("es-CO")}</td>
                      <td className="p-3">{payment.months_covered ?? "—"}</td>
                      <td className="p-3">
                        {payment.voided_at ? (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 line-through">
                            Anulada
                          </span>
                        ) : payment.is_draft ? (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                            Borrador
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Pagado
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-muted-foreground text-xs">
                        {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString("es-CO") : "—"}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
