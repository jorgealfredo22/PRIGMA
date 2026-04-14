"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { voidPaymentAction } from "../actions"
import { Eye, Ban } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Payment {
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
}

interface PaymentHistoryTableProps {
  payments: Payment[]
  licenseId: string
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
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
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

function PaymentTypeBadge({ type }: { type: string }) {
  const variants: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
    normal: { variant: "default", label: "Normal" },
    promo: { variant: "secondary", label: "Promo" },
    adjustment: { variant: "outline", label: "Ajuste" },
    credit: { variant: "outline", label: "Crédito" },
  }
  const config = variants[type] || { variant: "default" as const, label: type }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

function PaymentStatusBadge({ payment }: { payment: Payment }) {
  if (payment.voided_at) {
    return (
      <Badge variant="destructive" className="line-through">
        Anulada
      </Badge>
    )
  }
  if (payment.is_draft) {
    return <Badge variant="secondary">Borrador</Badge>
  }
  return <Badge variant="default">Pagado</Badge>
}

export function PaymentHistoryTable({ payments, licenseId }: PaymentHistoryTableProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [voidDialogOpen, setVoidDialogOpen] = useState(false)
  const [paymentToVoid, setPaymentToVoid] = useState<Payment | null>(null)
  const [voidReason, setVoidReason] = useState("")

  function openVoidDialog(payment: Payment) {
    setPaymentToVoid(payment)
    setVoidReason("")
    setVoidDialogOpen(true)
  }

  function closeVoidDialog() {
    setPaymentToVoid(null)
    setVoidReason("")
    setVoidDialogOpen(false)
  }

  async function handleVoid() {
    if (!paymentToVoid || !voidReason.trim()) return

    const formData = new FormData()
    formData.append("payment_id", paymentToVoid.id)
    formData.append("void_reason", voidReason.trim())
    if (paymentToVoid.paid_at) {
      formData.append("paid_at", paymentToVoid.paid_at)
    }

    startTransition(async () => {
      await voidPaymentAction(formData)
      closeVoidDialog()
      router.refresh()
    })
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center border rounded-lg bg-muted/20">
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Meses</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} className={payment.voided_at ? "opacity-60" : ""}>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          {payment.paid_at
                            ? formatDate(payment.paid_at)
                            : payment.is_draft
                            ? "Borrador"
                            : formatDate(payment.created_at)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Creado: {formatDateTime(payment.created_at)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <PaymentTypeBadge type={payment.type} />
                </TableCell>
                <TableCell className="font-medium">
                  {formatCOP(payment.amount_cop)}
                </TableCell>
                <TableCell>{payment.months_covered}</TableCell>
                <TableCell>
                  <PaymentStatusBadge payment={payment} />
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                  {payment.notes || "-"}
                </TableCell>
                <TableCell className="text-right">
                  {!payment.voided_at && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openVoidDialog(payment)}
                            disabled={isPending}
                          >
                            <Ban className="h-4 w-4 text-destructive" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Anular pago</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Void Payment Dialog */}
      <Dialog open={voidDialogOpen} onOpenChange={setVoidDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anular Pago</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Ingresa el motivo de la anulación.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="void_reason">Motivo de anulación *</Label>
              <Input
                id="void_reason"
                value={voidReason}
                onChange={(e) => setVoidReason(e.target.value)}
                placeholder="Ej: Pago duplicado, cliente solicitó reembolso..."
              />
            </div>
            {paymentToVoid && (
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p>
                  <strong>Pago:</strong> {formatCOP(paymentToVoid.amount_cop)}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {paymentToVoid.paid_at
                    ? formatDate(paymentToVoid.paid_at)
                    : "No registrada"}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeVoidDialog}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleVoid}
              disabled={!voidReason.trim() || isPending}
            >
              {isPending ? "Anulando..." : "Anular Pago"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
