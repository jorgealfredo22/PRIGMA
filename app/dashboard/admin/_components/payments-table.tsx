"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

interface PaymentRow {
  id: string
  license_id: string
  type: "normal" | "promo" | "adjustment" | "credit"
  amount_cop: number
  months_covered: number | null
  is_draft: boolean
  paid_at: string | null
  voided_at: string | null
  void_reason: string | null
  notes: string | null
  created_at: string
  licenses: {
    id: string
    license_key: string
    clients: { client_name: string } | null
  } | null
}

function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const typeLabels: Record<string, string> = {
  normal: "Normal",
  promo: "Promo",
  adjustment: "Ajuste",
  credit: "Crédito",
}

const typeVariants: Record<string, "default" | "secondary" | "outline"> = {
  normal: "default",
  promo: "secondary",
  adjustment: "outline",
  credit: "outline",
}

const columns: ColumnDef<PaymentRow>[] = [
  {
    accessorKey: "license_key",
    header: "Licencia",
    cell: ({ row }) => {
      const license = row.original.licenses
      return (
        <div>
          <div className="font-mono text-xs">{license?.license_key ?? row.original.license_id}</div>
          {license?.clients?.client_name && (
            <div className="text-xs text-muted-foreground">{license.clients.client_name}</div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant={typeVariants[type] ?? "default"}>
          {typeLabels[type] ?? type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount_cop",
    header: "Monto",
    cell: ({ row }) => formatCOP(row.getValue("amount_cop")),
  },
  {
    accessorKey: "months_covered",
    header: "Meses",
    cell: ({ row }) => row.getValue("months_covered") || "—",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const payment = row.original
      if (payment.voided_at) {
        return <Badge variant="destructive">Anulada</Badge>
      }
      if (payment.is_draft) {
        return <Badge variant="secondary">Borrador</Badge>
      }
      return <Badge variant="default">Pagado</Badge>
    },
  },
  {
    accessorKey: "paid_at",
    header: "Fecha pago",
    cell: ({ row }) => {
      const date = row.getValue("paid_at") as string | null
      return (
        <span className="text-xs text-muted-foreground">
          {date ? new Date(date).toLocaleDateString("es-CO") : "—"}
        </span>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Registrado",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string
      return (
        <span className="text-xs text-muted-foreground">
          {date ? new Date(date).toLocaleDateString("es-CO") : "—"}
        </span>
      )
    },
  },
]

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="text-muted-foreground mb-2">
        <svg
          className="mx-auto h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>
      <h3 className="font-medium">No hay pagos registrados</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Los pagos aparecerán aquí cuando se registren
      </p>
    </div>
  )
}

export function PaymentsTable({ data }: { data: PaymentRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="license_key"
      searchPlaceholder="Buscar por licencia..."
      emptyState={<EmptyState />}
    />
  )
}
