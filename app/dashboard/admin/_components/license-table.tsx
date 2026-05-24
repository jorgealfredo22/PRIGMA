"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toggleLicenseActiveAction } from "../actions"
import { LicenseDialog } from "./license-dialog"
import { Eye, Power, Loader2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Client {
  id: string
  client_name: string
}

interface License {
  id: string
  client_id: string
  license_key: string
  plan: "monthly" | "annual" | "lifetime"
  billing_day: number | null
  price_cop: number
  grace_days: number
  grace_days_connection: number
  trial_started_at: string | null
  trial_ends_at: string | null
  active: boolean
  created_at: string
  clients: {
    client_name: string
  } | null
}

interface LicenseTableProps {
  licenses: License[]
  totalCount: number
  currentPage: number
  perPage: number
  totalPages: number
  clients: Client[]
}

function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function truncateLicenseKey(key: string, maxLength: number = 20): string {
  if (key.length <= maxLength) return key
  return `${key.slice(0, maxLength)}...`
}

function PlanBadge({ plan }: { plan: string }) {
  const planVariant =
    plan === "monthly" ? "default" : plan === "annual" ? "secondary" : "outline"
  const planLabel =
    plan === "monthly" ? "Mensual" : plan === "annual" ? "Anual" : "Lifetime"
  return <Badge variant={planVariant}>{planLabel}</Badge>
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge variant={active ? "default" : "destructive"}>
      {active ? "Activa" : "Inactiva"}
    </Badge>
  )
}

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
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </div>
      <h3 className="font-medium">No hay licencias aún</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Comienza creando tu primera licencia
      </p>
    </div>
  )
}

export function LicenseTable({
  licenses,
  totalCount,
  currentPage,
  perPage,
  totalPages,
  clients,
}: LicenseTableProps) {
  const [isPending, startTransition] = useTransition()
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const router = useRouter()

  async function handleToggleActive(license: License) {
    const formData = new FormData()
    formData.append("license_id", license.id)

    setTogglingId(license.id)
    toast.loading(`${license.active ? "Desactivando" : "Activando"} licencia...`)

    startTransition(async () => {
      try {
        await toggleLicenseActiveAction(formData)
        toast.success(
          `Licencia ${license.active ? "desactivada" : "activada"} correctamente`
        )
        router.refresh()
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error desconocido"
        toast.error(`Error: ${msg}`)
      } finally {
        setTogglingId(null)
        toast.dismiss()
      }
    })
  }

  function buildPageUrl(page: number): string {
    const params = new URLSearchParams()
    params.set("page", page.toString())
    return `/dashboard/admin/licenses?${params.toString()}`
  }

  const columns: ColumnDef<License>[] = [
    {
      accessorKey: "client_name",
      header: "Cliente",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.clients?.client_name || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "license_key",
      header: "License Key",
      cell: ({ row }) => {
        const key = row.original.license_key
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono cursor-default">
                  {truncateLicenseKey(key)}
                </code>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono text-xs">{key}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => <PlanBadge plan={row.original.plan} />,
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }) => <StatusBadge active={row.original.active} />,
    },
    {
      accessorKey: "price_cop",
      header: "Precio",
      cell: ({ row }) => formatCOP(row.original.price_cop),
    },
    {
      accessorKey: "billing_day",
      header: "Día Fact.",
      cell: ({ row }) => row.original.billing_day || "-",
    },
    {
      accessorKey: "created_at",
      header: "Creado",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.original.created_at)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => {
        const license = row.original
        return (
          <div className="flex items-center justify-end gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/admin/licenses/${license.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver detalle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleActive(license)}
                    disabled={isPending || togglingId === license.id}
                    className={
                      togglingId === license.id
                        ? "text-muted-foreground"
                        : license.active
                        ? "text-yellow-600 hover:text-yellow-700"
                        : "text-green-600 hover:text-green-700"
                    }
                  >
                    {togglingId === license.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Power className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {togglingId === license.id
                      ? "Procesando..."
                      : license.active
                      ? "Desactivar"
                      : "Activar"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <LicenseDialog license={license} clients={clients} />
          </div>
        )
      },
    },
  ]

  if (licenses.length === 0 && totalCount === 0) {
    return (
      <div className="rounded-md border">
        <EmptyState />
      </div>
    )
  }

  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalCount)

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Mostrando {startItem}-{endItem} de {totalCount} licencias
      </div>

      <DataTable
        columns={columns}
        data={licenses}
        hidePagination
        emptyState={<EmptyState />}
      />

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildPageUrl(Math.max(1, currentPage - 1))}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) {
                    router.push(buildPageUrl(currentPage - 1))
                  }
                }}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number

              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={buildPageUrl(pageNum)}
                    isActive={currentPage === pageNum}
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(buildPageUrl(pageNum))
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href={buildPageUrl(Math.min(totalPages, currentPage + 1))}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) {
                    router.push(buildPageUrl(currentPage + 1))
                  }
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
