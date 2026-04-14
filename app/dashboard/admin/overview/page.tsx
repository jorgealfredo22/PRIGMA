import type React from "react"

import { DollarSign, Users, Key, TrendingUp } from "lucide-react"

import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { KPICard } from "../_components/kpi-card"
import { RevenueChart } from "../_components/revenue-chart"
import { LicensesPlanChart } from "../_components/licenses-plan-chart"
import { StatusChart } from "../_components/status-chart"
import { PlanDistribution } from "../_components/plan-distribution"

function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatMonth(date: Date): string {
  return date.toLocaleDateString("es-CO", { month: "short", year: "2-digit" })
}

export default async function AdminOverviewPage() {
  const supabase = createAdminSupabaseClient()

  const [
    clientsResult,
    licensesResult,
    paymentsResult,
    planBreakdownResult,
    statusResult,
    monthlyRevenueResult,
  ] = await Promise.all([
    supabase.from("licenses").select("client_id", { count: "exact" }).throwOnError(),
    supabase.from("licenses").select("id, active", { count: "exact" }).throwOnError(),
    supabase
      .from("payments")
      .select("amount_cop")
      .eq("is_draft", false)
      .not("paid_at", "is", null)
      .is("voided_at", null)
      .throwOnError(),
    supabase.from("licenses").select("plan").throwOnError(),
    supabase
      .from("licenses")
      .select("active, trial_ends_at, grace_days_connection")
      .throwOnError(),
    supabase
      .from("payments")
      .select("amount_cop, paid_at")
      .eq("is_draft", false)
      .not("paid_at", "is", null)
      .is("voided_at", null)
      .throwOnError(),
  ])

  const totalClients = clientsResult.count ?? 0
  const totalLicenses = licensesResult.count ?? 0
  const activeLicenses = licensesResult.data?.filter((l) => l.active).length ?? 0
  const totalRevenue = paymentsResult.data?.reduce((sum, p) => sum + p.amount_cop, 0) ?? 0

  const planCounts: Record<string, number> = { monthly: 0, annual: 0, lifetime: 0 }
  planBreakdownResult.data?.forEach((l) => {
    if (l.plan in planCounts) planCounts[l.plan]++
  })
  const planBreakdown = Object.entries(planCounts).map(([plan, count]) => ({ plan, count }))

  const now = new Date()
  const statusData = [
    { status: "Activas", count: statusResult.data?.filter((l) => l.active).length ?? 0 },
    { status: "Inactivas", count: statusResult.data?.filter((l) => !l.active).length ?? 0 },
    {
      status: "Trial",
      count: statusResult.data?.filter((l) => l.trial_ends_at && new Date(l.trial_ends_at) > now)
        .length ?? 0,
    },
  ]

  const monthlyRevenueMap: Record<string, number> = {}
  monthlyRevenueResult.data?.forEach((p) => {
    if (p.paid_at) {
      const month = formatMonth(new Date(p.paid_at))
      monthlyRevenueMap[month] = (monthlyRevenueMap[month] ?? 0) + p.amount_cop
    }
  })
  const monthlyRevenue: { month: string; revenue: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000)
    const monthKey = formatMonth(date)
    monthlyRevenue.push({ month: monthKey, revenue: monthlyRevenueMap[monthKey] ?? 0 })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Métricas generales del sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Clientes" value={totalClients} icon={Users} />
        <KPICard title="Licencias Activas" value={`${activeLicenses} / ${totalLicenses}`} icon={Key} />
        <KPICard title="Ingresos Totales" value={formatCOP(totalRevenue)} icon={DollarSign} />
        <KPICard title="Planes Activos" value={activeLicenses} icon={TrendingUp} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart data={monthlyRevenue} />
        <LicensesPlanChart data={planBreakdown} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatusChart data={statusData} />
        <PlanDistribution data={planBreakdown} />
      </div>
    </div>
  )
}
