import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/auth"
import { ClientDialog } from "../_components/client-dialog"

export default async function ClientsPage() {
  await getCurrentUser()

  const supabase = createAdminSupabaseClient()

  const { data: clients } = await supabase
    .from("clients")
    .select("id, client_name, company_name, contact_name, contact_email, contact_phone, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <ClientDialog />
      </div>

      <div className="rounded-md border">
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="p-3 font-medium">Nombre</th>
                <th className="p-3 font-medium">Empresa</th>
                <th className="p-3 font-medium">Contacto</th>
                <th className="p-3 font-medium">Fecha creación</th>
              </tr>
            </thead>
            <tbody>
              {(!clients || clients.length === 0) ? (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={4}>
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{client.client_name}</td>
                    <td className="p-3">{client.company_name ?? "—"}</td>
                    <td className="p-3">
                      <div className="text-sm">{client.contact_name ?? "—"}</div>
                      <div className="text-xs text-muted-foreground">{client.contact_email ?? ""}</div>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">
                      {client.created_at ? new Date(client.created_at).toLocaleDateString("es-CO") : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
