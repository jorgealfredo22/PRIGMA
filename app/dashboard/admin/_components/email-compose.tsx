"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Send,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  HelpCircle,
} from "lucide-react"
import { toast } from "sonner"

import { sendEmailSchema, type SendEmailInput } from "@/lib/schemas/email"
import { sendEmailAction } from "../email/actions"
import {
  getSenderNamesAction,
  type SenderName,
} from "../email/sender-actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

function FieldTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help inline ml-1 -mt-0.5" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[260px] text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  )
}

export function EmailCompose() {
  const [isSending, setIsSending] = useState(false)
  const [showCcBcc, setShowCcBcc] = useState(false)
  const [sent, setSent] = useState(false)
  const [senderNames, setSenderNames] = useState<SenderName[]>([])
  const [selectedSenderId, setSelectedSenderId] = useState<string>("")

  const form = useForm<SendEmailInput>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      senderName: "",
      senderEmail: "",
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = form

  // Load sender names on mount
  useEffect(() => {
    getSenderNamesAction()
      .then((names) => {
        setSenderNames(names)
        const defaultSender = names.find((n) => n.is_default)
        if (defaultSender) {
          setSelectedSenderId(defaultSender.id)
          setValue("senderName", defaultSender.display_name)
          setValue("senderEmail", defaultSender.email_address)
        }
      })
      .catch(() => {
        // Fallback if DB not set up yet
        setSenderNames([
          {
            id: "fallback",
            display_name: "PRIGMA",
            email_address: "notificaciones@prigma.net",
            is_default: true,
            created_at: "",
          },
        ])
        setSelectedSenderId("fallback")
        setValue("senderName", "PRIGMA")
        setValue("senderEmail", "notificaciones@prigma.net")
      })
  }, [setValue])

  function handleSenderChange(value: string) {
    const sender = senderNames.find((s) => s.id === value)
    if (sender) {
      setSelectedSenderId(value)
      setValue("senderName", sender.display_name)
      setValue("senderEmail", sender.email_address)
    }
  }

  async function onSubmit(data: SendEmailInput) {
    setIsSending(true)

    try {
      const fd = new FormData()
      fd.set("senderName", data.senderName)
      fd.set("senderEmail", data.senderEmail)
      fd.set("to", data.to)
      fd.set("cc", data.cc ?? "")
      fd.set("bcc", data.bcc ?? "")
      fd.set("subject", data.subject)
      fd.set("body", data.body)

      const result = await sendEmailAction(fd)

      if (result.success) {
        toast.success("Correo enviado", {
          description: `Enviado a ${data.to}`,
        })
        setSent(true)
        reset()
        // Re-set sender after reset
        const defaultSender = senderNames.find((n) => n.is_default)
        if (defaultSender) {
          setSelectedSenderId(defaultSender.id)
          setValue("senderName", defaultSender.display_name)
          setValue("senderEmail", defaultSender.email_address)
        }
        setTimeout(() => setSent(false), 3000)
      } else {
        toast.error("Error al enviar", {
          description: result.error ?? "Intenta de nuevo",
        })
      }
    } catch {
      toast.error("Error inesperado", {
        description: "Algo falló. Intenta de nuevo.",
      })
    } finally {
      setIsSending(false)
    }
  }

  const watchedSender = watch("senderName")

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Send className="h-5 w-5" />
          Redactar correo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Sender selector */}
          {senderNames.length > 1 && (
            <div className="space-y-1.5">
              <Label className="flex items-center">
                Enviar como
                <FieldTooltip text="Elegí qué nombre y email aparece como remitente del correo. Podés agregar más remitentes en la sección de abajo." />
              </Label>
              <Select
                value={selectedSenderId}
                onValueChange={handleSenderChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar remitente" />
                </SelectTrigger>
                <SelectContent>
                  {senderNames.map((sender) => (
                    <SelectItem key={sender.id} value={sender.id}>
                      {sender.display_name} &lt;{sender.email_address}&gt;
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Sender preview */}
          {watchedSender && (
            <p className="text-xs text-muted-foreground">
              Se enviará como: <span className="font-medium">{watchedSender}</span>
              {senderNames.length === 1 && ` <${senderNames[0]?.email_address}>`}
            </p>
          )}

          <Separator />

          {/* To */}
          <div className="space-y-1.5">
            <Label htmlFor="to" className="flex items-center">
              Para *
              <FieldTooltip text="Dirección de email del destinatario principal. Es la persona que recibe el correo." />
            </Label>
            <Input
              id="to"
              type="email"
              placeholder="destinatario@ejemplo.com"
              {...register("to")}
              aria-invalid={!!errors.to}
            />
            {errors.to && (
              <p className="text-sm text-destructive">{errors.to.message}</p>
            )}
          </div>

          {/* CC/BCC toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowCcBcc(!showCcBcc)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              {showCcBcc ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
              {showCcBcc ? "Ocultar" : "Mostrar"} CC / BCC
            </button>
          </div>

          {/* CC / BCC */}
          {showCcBcc && (
            <>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cc" className="flex items-center">
                    CC
                    <FieldTooltip text="Copia Carbón. Las personas acá reciben el correo y TODOS los demás destinatarios pueden ver sus emails. Úsalo cuando querés que alguien esté informado pero no sea el protagonista." />
                  </Label>
                  <Input
                    id="cc"
                    type="email"
                    placeholder="copia@ejemplo.com"
                    {...register("cc")}
                    aria-invalid={!!errors.cc}
                  />
                  {errors.cc && (
                    <p className="text-sm text-destructive">
                      {errors.cc.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bcc" className="flex items-center">
                    BCC
                    <FieldTooltip text="Copia Carbón Oculta. Recibe el correo pero NINGÚN otro destinatario sabe que está incluido. Úsalo para copias discretas o envíos masivos donde no querés exponer la lista de emails." />
                  </Label>
                  <Input
                    id="bcc"
                    type="email"
                    placeholder="oculto@ejemplo.com"
                    {...register("bcc")}
                    aria-invalid={!!errors.bcc}
                  />
                  {errors.bcc && (
                    <p className="text-sm text-destructive">
                      {errors.bcc.message}
                    </p>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Subject */}
          <div className="space-y-1.5">
            <Label htmlFor="subject" className="flex items-center">
              Asunto *
              <FieldTooltip text="El título del correo. Aparece en la bandeja de entrada del destinatario. Poné algo claro y conciso para que sepa de qué va sin abrirlo." />
            </Label>
            <Input
              id="subject"
              placeholder="Asunto del correo"
              {...register("subject")}
              aria-invalid={!!errors.subject}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <Label htmlFor="body" className="flex items-center">
              Mensaje *
              <FieldTooltip text="El cuerpo del correo. Escribí tu mensaje acá. Podés usar saltos de línea y texto plano. Si sabés HTML, el sistema lo interpreta." />
            </Label>
            <Textarea
              id="body"
              placeholder="Escribí tu mensaje acá..."
              rows={12}
              className="resize-y min-h-[200px] font-mono text-sm"
              {...register("body")}
              aria-invalid={!!errors.body}
            />
            {errors.body && (
              <p className="text-sm text-destructive">{errors.body.message}</p>
            )}
          </div>

          {/* Send button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSending}
              className="min-w-[140px]"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : sent ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Enviado
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
