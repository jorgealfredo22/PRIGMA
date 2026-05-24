import type React from "react"

import { Suspense } from "react"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { LicenseTable } from "../_components/license-table"
import { LicenseFilters } from "../_components/license-filters"
import { LicenseDialog } from "../_components/license-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default async function AdminLicensesPage({
  searchParams,
}: {
  searchParams: Promise<{
    plan?: string
    status?: string
    search?: string
    page?: string
    perPage?: string
  }>
}) {
  const params = await searchParams

  // Parse and validate params
  const plan = params.plan || "all"
  const status = params.status as "active" | "inactive" | undefined
  const search = params.search || ""
  const page = Math.max(1, parseInt(params.page || "1") || 1)
  const perPage = Math.min(100, Math.max(10, parseInt(params.perPage || "10") || 10))

  const supabase = createAdminSupabaseClient()

  // Build query
  let query = supabase
    .from("licenses")
    .select("*, clients(client_name)", { count: "exact" })
    .order("created_at", { ascending: false })

  // Filter by plan
  if (plan && plan !== "all") {
    query = query.eq("plan", plan)
  }

  // Filter by status
  if (status === "active") {
    query = query.eq("active", true)
  } else if (status === "inactive") {
    query = query.eq("active", false)
  }

  // Search by license_key or client_name
  if (search) {
    query = query.or(
      `license_key.ilike.%${search}%,clients.client_name.ilike.%${search}%`
    )
  }

  // Pagination
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  query = query.range(from, to)

  const { data: licenses, count, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / perPage)

  // Fetch clients for the dialog select
  const { data: clients } = await supabase
    .from("clients")
    .select("id, client_name")
    .order("client_name", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Licencias</h1>
          <p className="text-muted-foreground">
            Gestiona las licencias de los clientes
          </p>
        </div>
        <LicenseDialog clients={clients ?? []} />
      </div>

      <Suspense fallback={<Skeleton className="h-[80px] rounded-lg" />}>
        <LicenseFilters
          initialPlan={plan}
          initialStatus={status}
          initialSearch={search}
          initialPerPage={perPage}
        />
      </Suspense>

      <LicenseTable
        licenses={(licenses as any[]) ?? []}
        totalCount={totalCount}
        currentPage={page}
        perPage={perPage}
        totalPages={totalPages}
        clients={clients ?? []}
      />
    </div>
  )
}
