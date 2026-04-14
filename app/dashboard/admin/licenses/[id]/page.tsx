import type React from "react"

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentHistoryTable } from "../../_components/payment-history-table"
import { PaymentDialog } from "../../_components/payment-dialog"

interface LicenseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "No establecido"
  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function PlanBadge({ plan }: { plan: string }) {
  const planVariant = plan === "monthly" ? "default" : plan === "annual" ? "secondary" : "outline"
  const planLabel = plan === "monthly" ? "Mensual" : plan === "annual" ? "Anual" : "Lifetime"
  return <Badge variant={planVariant}>{planLabel}</Badge>
}

export default async function LicenseDetailPage({ params }: LicenseDetailPageProps) {
  const { id } = await params

  const supabase = createAdminSupabaseClient()

  // Fetch license with client info
  const { data: license, error: licenseError } = await supabase
    .from("licenses")
    .select("*, clients(*)")
    .eq("id", id)
    .maybeSingle()

  if (licenseError || !license) {
    notFound()
  }

  // Fetch payments for this license
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .eq("license_id", id)
    .order("created_at", { ascending: false })

  const typedPayments = (payments ?? []) as {
    id: string
    license_id: string
    type: "normal" | "promo" | "adjustment" | "credit"
    amount_cop: number
    months_covered: number
    is_draft: boolean
    paid_at: string | null
    voided_at: string | null
    void_reason: string | null
    notes: string | null
    created_at: string
  }[]

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/admin/licenses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Detalle de Licencia</h1>
          <p className="text-muted-foreground">
            {license.clients?.client_name || "Cliente"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* License Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Información de Licencia</span>
              <Badge variant={license.active ? "default" : "destructive"}>
                {license.active ? "Activa" : "Inactiva"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* License Key */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">License Key</p>
              <code className="text-xs bg-muted px-2 py-1 rounded font-mono block">
                {license.license_key}
              </code>
            </div>

            {/* Client */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p>{license.clients?.client_name || "N/A"}</p>
            </div>

            {/* Plan */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Plan</p>
              <PlanBadge plan={license.plan} />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Precio</p>
              <p className="font-medium">{formatCOP(license.price_cop)}</p>
            </div>

            {/* Billing Day */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Día de Facturación</p>
              <p>{license.billing_day || "N/A"}</p>
            </div>

            {/* Grace Days */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Días de Gracia</p>
                <p>{license.grace_days}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Días de Gracia Conexión</p>
                <p>{license.grace_days_connection}</p>
              </div>
            </div>

            {/* Trial Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Inicio Trial</p>
                <p>{formatDate(license.trial_started_at)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Fin Trial</p>
                <p>{formatDate(license.trial_ends_at)}</p>
              </div>
            </div>

            {/* Created At */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Creado</p>
              <p>{formatDateTime(license.created_at)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Client Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Nombre</p>
              <p>{license.clients?.client_name || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Empresa</p>
              <p>{license.clients?.company_name || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Contacto</p>
              <p>{license.clients?.contact_name || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{license.clients?.contact_email || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
              <p>{license.clients?.contact_phone || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Info Adicional</p>
              <p className="text-sm text-muted-foreground">
                {license.clients?.extra_info || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Historial de Pagos</h2>
            <p className="text-sm text-muted-foreground">
              {typedPayments.length} pago{typedPayments.length !== 1 ? "s" : ""} registrado
              {typedPayments.length !== 1 ? "s" : ""}
            </p>
          </div>
          <PaymentDialog licenseId={license.id} />
        </div>

        <PaymentHistoryTable payments={typedPayments} licenseId={license.id} />
      </div>
    </div>
  )
}
