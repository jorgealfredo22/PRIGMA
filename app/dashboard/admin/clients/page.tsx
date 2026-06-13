import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/auth"
import { ClientDialog } from "../_components/client-dialog"
import { ClientsTable } from "../_components/clients-table"

export default async function ClientsPage() {
  await getCurrentUser()

  const supabase = createAdminSupabaseClient()

  const { data: clients } = await supabase
    .from("clients")
    .select("id, client_name, company_name, contact_name, contact_email, contact_phone, extra_info, created_at, metadata")
    .order("created_at", { ascending: false })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <ClientDialog />
      </div>

      <ClientsTable data={clients ?? []} />
    </div>
  )
}
