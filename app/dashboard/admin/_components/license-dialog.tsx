"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createLicenseAction, updateLicenseAction } from "../actions"
import { Plus, Edit, Loader2 } from "lucide-react"

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
  clients: {
    client_name: string
  } | null
}

interface LicenseDialogProps {
  license?: License
  clients: Client[]
}

function formatDateForInput(isoDate: string | null): string {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  return date.toISOString().split("T")[0]
}

export function LicenseDialog({ license, clients }: LicenseDialogProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const isEditMode = !!license

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)
    toast.loading(isEditMode ? "Guardando cambios..." : "Creando licencia...")

    try {
      const action = isEditMode ? updateLicenseAction : createLicenseAction
      await action(formData)

      toast.success(isEditMode ? "Licencia actualizada" : "Licencia creada correctamente")
      setOpen(false)
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred"
      setError(msg)
      toast.error(`Error: ${msg}`)
    } finally {
      setIsSubmitting(false)
      toast.dismiss()
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Licencia
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditMode ? "Editar Licencia" : "Nueva Licencia"}
          </SheetTitle>
        </SheetHeader>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form action={onSubmit} className="grid gap-4 mt-4">
          {isEditMode && (
            <input type="hidden" name="license_id" value={license.id} />
          )}

          <div className="space-y-2">
            <Label htmlFor="client_id">Cliente</Label>
            {isEditMode ? (
              <Input
                id="client_name"
                value={license.clients?.client_name || "N/A"}
                disabled
                className="bg-muted"
              />
            ) : (
              <Select name="client_id" defaultValue={clients.length > 0 ? clients[0].id : ""} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.client_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="license_key">License Key</Label>
              <Input
                id="license_key"
                value={license.license_key}
                disabled
                className="bg-muted font-mono text-xs"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="plan">Plan</Label>
            <Select name="plan" defaultValue={license?.plan || "monthly"} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensual</SelectItem>
                <SelectItem value="annual">Anual</SelectItem>
                <SelectItem value="lifetime">Lifetime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_day">Día de Facturación (1-31)</Label>
            <Input
              type="number"
              id="billing_day"
              name="billing_day"
              min="1"
              max="31"
              defaultValue={license?.billing_day || ""}
              placeholder="15"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_cop">Precio (COP)</Label>
            <Input
              type="number"
              id="price_cop"
              name="price_cop"
              min="0"
              defaultValue={license?.price_cop || 0}
              placeholder="99000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grace_days">Días de Gracia</Label>
            <Input
              type="number"
              id="grace_days"
              name="grace_days"
              min="0"
              defaultValue={license?.grace_days || 0}
              placeholder="5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grace_days_connection">Días de Gracia Conexión</Label>
            <Input
              type="number"
              id="grace_days_connection"
              name="grace_days_connection"
              min="0"
              defaultValue={license?.grace_days_connection || 0}
              placeholder="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trial_started_at">Inicio Trial</Label>
              <Input
                type="date"
                id="trial_started_at"
                name="trial_started_at"
                defaultValue={formatDateForInput(license?.trial_started_at || null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trial_ends_at">Fin Trial</Label>
              <Input
                type="date"
                id="trial_ends_at"
                name="trial_ends_at"
                defaultValue={formatDateForInput(license?.trial_ends_at || null)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              name="active"
              defaultChecked={license?.active ?? true}
            />
            <Label htmlFor="active">Activa</Label>
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : isEditMode ? (
              "Guardar Cambios"
            ) : (
              "Crear Licencia"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
