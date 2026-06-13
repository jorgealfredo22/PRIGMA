"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateClientAction } from "../actions"
import { Loader2, Edit2 } from "lucide-react"

export function ClientEditDialog({ client }: { client: any }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)
    toast.loading("Actualizando cliente...")
    
    formData.append("id", client.id)

    try {
      await updateClientAction(formData)
      toast.success("Cliente actualizado correctamente")
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

  const defaultMetadata = client.metadata && Object.keys(client.metadata).length > 0 
    ? JSON.stringify(client.metadata, null, 2) 
    : ""

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" title="Editar cliente">
          <Edit2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Editar Cliente</SheetTitle>
        </SheetHeader>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form action={onSubmit} className="grid gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor={`client_name_${client.id}`}>Nombre del Cliente *</Label>
            <Input
              id={`client_name_${client.id}`}
              name="client_name"
              defaultValue={client.client_name}
              placeholder="Nombre completo o empresa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`company_name_${client.id}`}>Empresa</Label>
            <Input
              id={`company_name_${client.id}`}
              name="company_name"
              defaultValue={client.company_name || ""}
              placeholder="Nombre de la empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`contact_name_${client.id}`}>Persona de Contacto</Label>
            <Input
              id={`contact_name_${client.id}`}
              name="contact_name"
              defaultValue={client.contact_name || ""}
              placeholder="Nombre del contacto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`contact_email_${client.id}`}>Email</Label>
            <Input
              type="email"
              id={`contact_email_${client.id}`}
              name="contact_email"
              defaultValue={client.contact_email || ""}
              placeholder="email@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`contact_phone_${client.id}`}>Teléfono</Label>
            <Input
              type="tel"
              id={`contact_phone_${client.id}`}
              name="contact_phone"
              defaultValue={client.contact_phone || ""}
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`extra_info_${client.id}`}>Información Adicional</Label>
            <Input
              id={`extra_info_${client.id}`}
              name="extra_info"
              defaultValue={client.extra_info || ""}
              placeholder="Notas adicionales"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`metadata_${client.id}`}>Metadata (JSON opcional)</Label>
            <textarea
              id={`metadata_${client.id}`}
              name="metadata"
              defaultValue={defaultMetadata}
              placeholder='{
  "repos": ["https://github.com/..."],
  "test_users": [{ "email": "...", "password": "..." }]
}'
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
            />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              ¿Muchos datos? Pídele a ChatGPT que te arme el JSON copiando este prompt:
              <span className="block mt-1 p-2 bg-muted rounded border select-all font-mono text-foreground">
                Tengo estos datos de mi cliente: [PEGA TUS DATOS AQUÍ]. Por favor, conviértelos en un objeto JSON válido. Usa llaves descriptivas en minúsculas (ej: repositorios, credenciales, enlaces). Devuélveme ÚNICAMENTE el código JSON, sin formato markdown ni texto adicional.
              </span>
            </p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Actualizando...
              </>
            ) : (
              "Actualizar Cliente"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
