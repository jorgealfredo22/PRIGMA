"use client"

import * as React from "react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Eye, EyeOff, KeyRound, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { changePasswordAction } from "./actions"

export function PasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const hasMinLength = newPassword.length >= 8
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!hasMinLength) {
      toast.error("La contraseña debe tener al menos 8 caracteres")
      return
    }

    if (!passwordsMatch) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    const formData = new FormData()
    formData.append("newPassword", newPassword)
    formData.append("confirmPassword", confirmPassword)

    startTransition(async () => {
      const toastId = toast.loading("Actualizando tu contraseña...")
      try {
        const res = await changePasswordAction(formData)
        if (res.success) {
          toast.success("¡Tu contraseña ha sido actualizada con éxito!", { id: toastId })
          setNewPassword("")
          setConfirmPassword("")
        } else {
          toast.error(res.error || "No se pudo actualizar la contraseña", { id: toastId })
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error inesperado", { id: toastId })
      }
    })
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Cambiar Contraseña
        </CardTitle>
        <CardDescription>
          Ingresa tu nueva contraseña personal. Recuerda que la próxima vez que inicies sesión deberás usar esta nueva clave.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Nueva Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="pr-10"
                required
                disabled={isPending}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite la nueva contraseña"
                className="pr-10"
                required
                disabled={isPending}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Checklist de requisitos visual */}
          <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 text-xs text-muted-foreground border">
            <div className="flex items-center gap-2">
              <CheckCircle2
                className={`h-3.5 w-3.5 ${
                  hasMinLength ? "text-emerald-500" : "text-muted-foreground/50"
                }`}
              />
              <span className={hasMinLength ? "text-foreground font-medium" : ""}>
                Al menos 8 caracteres ({newPassword.length}/8)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2
                className={`h-3.5 w-3.5 ${
                  passwordsMatch ? "text-emerald-500" : "text-muted-foreground/50"
                }`}
              />
              <span className={passwordsMatch ? "text-foreground font-medium" : ""}>
                Las contraseñas coinciden
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Protegido con encriptación Supabase Auth
          </p>
          <Button
            type="submit"
            disabled={isPending || !hasMinLength || !passwordsMatch}
            className="gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Actualizando...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Actualizar Contraseña
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
