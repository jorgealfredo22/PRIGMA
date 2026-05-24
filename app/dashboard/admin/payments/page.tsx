import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/auth"
import { PaymentsTable } from "../_components/payments-table"

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

      <PaymentsTable data={(payments as any[]) ?? []} />
    </div>
  )
}
