"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientAction } from "../actions"
import { Plus, Loader2 } from "lucide-react"

export function ClientDialog() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)
    toast.loading("Creando cliente...")

    try {
      await createClientAction(formData)
      toast.success("Cliente creado correctamente")
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
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nuevo Cliente</SheetTitle>
        </SheetHeader>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form action={onSubmit} className="grid gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="client_name">Nombre del Cliente *</Label>
            <Input
              id="client_name"
              name="client_name"
              placeholder="Nombre completo o empresa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name">Empresa</Label>
            <Input
              id="company_name"
              name="company_name"
              placeholder="Nombre de la empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_name">Persona de Contacto</Label>
            <Input
              id="contact_name"
              name="contact_name"
              placeholder="Nombre del contacto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email">Email</Label>
            <Input
              type="email"
              id="contact_email"
              name="contact_email"
              placeholder="email@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_phone">Teléfono</Label>
            <Input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="extra_info">Información Adicional</Label>
            <Input
              id="extra_info"
              name="extra_info"
              placeholder="Notas adicionales"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Cliente"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
