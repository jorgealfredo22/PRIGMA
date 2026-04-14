"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface LicenseFiltersProps {
  initialPlan: string
  initialStatus?: "active" | "inactive"
  initialSearch: string
  initialPerPage: number
}

export function LicenseFilters({
  initialPlan,
  initialStatus,
  initialSearch,
  initialPerPage,
}: LicenseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [plan, setPlan] = useState(initialPlan)
  const [status, setStatus] = useState<string>(initialStatus || "all")
  const [search, setSearch] = useState(initialSearch)
  const [perPage, setPerPage] = useState(initialPerPage)

  function updateFilters() {
    const params = new URLSearchParams()

    if (plan && plan !== "all") {
      params.set("plan", plan)
    }

    if (status && status !== "all") {
      params.set("status", status)
    }

    if (search) {
      params.set("search", search)
    }

    if (perPage !== 10) {
      params.set("perPage", perPage.toString())
    }

    // Reset to page 1 when filters change
    params.delete("page")

    const queryString = params.toString()
    const baseUrl = "/dashboard/admin/licenses"
    const newUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl

    startTransition(() => {
      router.push(newUrl)
    })
  }

  function handlePlanChange(value: string) {
    setPlan(value)
    updateFilters()
  }

  function handleStatusChange(value: string) {
    setStatus(value)
    updateFilters()
  }

  function handlePerPageChange(value: string) {
    setPerPage(parseInt(value))
    updateFilters()
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateFilters()
  }

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-muted/50 rounded-lg">
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[200px]">
        <Label htmlFor="search" className="sr-only">
          Buscar
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            type="search"
            placeholder="Buscar por clave o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </form>

      {/* Plan filter */}
      <div className="w-[150px]">
        <Label htmlFor="plan-filter" className="sr-only">
          Plan
        </Label>
        <Select value={plan} onValueChange={handlePlanChange}>
          <SelectTrigger id="plan-filter">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los planes</SelectItem>
            <SelectItem value="monthly">Mensual</SelectItem>
            <SelectItem value="annual">Anual</SelectItem>
            <SelectItem value="lifetime">Lifetime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status filter */}
      <div className="w-[150px]">
        <Label htmlFor="status-filter" className="sr-only">
          Estado
        </Label>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activas</SelectItem>
            <SelectItem value="inactive">Inactivas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Per page */}
      <div className="w-[120px]">
        <Label htmlFor="per-page" className="sr-only">
          Por página
        </Label>
        <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
          <SelectTrigger id="per-page">
            <SelectValue placeholder="Por página" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      {(plan !== "all" || status !== "all" || search) && (
        <Button
          variant="ghost"
          onClick={() => {
            setPlan("all")
            setStatus("all")
            setSearch("")
            setPerPage(10)
            router.push("/dashboard/admin/licenses")
          }}
        >
          Limpiar
        </Button>
      )}
    </div>
  )
}
