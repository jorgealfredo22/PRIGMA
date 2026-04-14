"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createPaymentAction } from "../actions"
import { Plus } from "lucide-react"

interface PaymentDialogProps {
  licenseId: string
}

function formatDateForInput(isoDate: string | null): string {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  return date.toISOString().split("T")[0]
}

export function PaymentDialog({ licenseId }: PaymentDialogProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      formData.append("license_id", licenseId)
      const result = await createPaymentAction(formData)
      // If no error thrown, it succeeded
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Pago
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Registrar Pago</SheetTitle>
        </SheetHeader>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form action={onSubmit} className="grid gap-4 mt-4">
          <input type="hidden" name="license_id" value={licenseId} />

          {/* Type selector */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Pago *</Label>
            <Select name="type" defaultValue="normal" required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="promo">Promoción</SelectItem>
                <SelectItem value="adjustment">Ajuste</SelectItem>
                <SelectItem value="credit">Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount_cop">Monto (COP) *</Label>
            <Input
              type="number"
              id="amount_cop"
              name="amount_cop"
              min="0"
              required
              placeholder="99000"
            />
          </div>

          {/* Months covered */}
          <div className="space-y-2">
            <Label htmlFor="months_covered">Meses Cubiertos *</Label>
            <Input
              type="number"
              id="months_covered"
              name="months_covered"
              min="1"
              required
              placeholder="1"
            />
          </div>

          {/* Paid at date */}
          <div className="space-y-2">
            <Label htmlFor="paid_at">Fecha de Pago</Label>
            <Input
              type="date"
              id="paid_at"
              name="paid_at"
              defaultValue={formatDateForInput(new Date().toISOString())}
            />
            <p className="text-xs text-muted-foreground">
              Dejar en blanco si es un borrador
            </p>
          </div>

          {/* Is draft checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_draft"
              name="is_draft"
              checked={isDraft}
              onCheckedChange={(checked) => setIsDraft(checked === true)}
            />
            <Label htmlFor="is_draft">Marcar como borrador</Label>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Input
              id="notes"
              name="notes"
              placeholder="Notas adicionales (opcional)"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Guardando..." : "Registrar Pago"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
