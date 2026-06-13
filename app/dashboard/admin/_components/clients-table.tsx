"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

interface ClientRow {
  id: string
  client_name: string
  company_name: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  extra_info: string | null
  created_at: string
  metadata?: any
}

import { ClientDetailsDialog } from "./client-details-dialog"
import { ClientEditDialog } from "./client-edit-dialog"

const columns: ColumnDef<ClientRow>[] = [
  {
    accessorKey: "client_name",
    header: "Nombre",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("client_name")}</span>
    ),
  },
  {
    accessorKey: "company_name",
    header: "Empresa",
    cell: ({ row }) => row.getValue("company_name") || "—",
  },
  {
    accessorKey: "contact_name",
    header: "Contacto",
    cell: ({ row }) => {
      const name = row.original.contact_name
      const email = row.original.contact_email
      return (
        <div className="text-sm">
          <div>{name || "—"}</div>
          {email && <div className="text-xs text-muted-foreground">{email}</div>}
        </div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Creado",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string
      return (
        <span className="text-muted-foreground text-xs">
          {date ? new Date(date).toLocaleDateString("es-CO") : "—"}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <ClientDetailsDialog metadata={row.original.metadata} />
          <ClientEditDialog client={row.original} />
        </div>
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 className="font-medium">No hay clientes registrados</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Crea tu primer cliente usando el botón de arriba
      </p>
    </div>
  )
}

export function ClientsTable({ data }: { data: ClientRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="client_name"
      searchPlaceholder="Buscar clientes..."
      emptyState={<EmptyState />}
    />
  )
}
