import { redirect } from "next/navigation"
import { Shield, User, Mail, Calendar, CheckCircle2, Lock } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PasswordForm } from "./password-form"

export default async function PerfilSeguridadPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userEmail = user.email || ""
  const userInitials = userEmail
    ? userEmail.split("@")[0].slice(0, 2).toUpperCase()
    : "PR"

  const createdDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Reciente"

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Seguridad y Contraseña
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona tu acceso personal y actualiza la contraseña de tu cuenta empresarial en PRIGMA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna Izquierda: Información de tu Cuenta */}
        <div className="md:col-span-1 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold border-2 border-primary/20">
                {userInitials}
              </div>
              <CardTitle className="text-base font-semibold mt-3 truncate" title={userEmail}>
                {userEmail.split("@")[0]}
              </CardTitle>
              <CardDescription className="text-xs truncate">
                {userEmail}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Rol
                </span>
                <Badge variant="secondary" className="text-[11px] font-medium">
                  Equipo PRIGMA
                </Badge>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Estado
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Activo
                </span>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Miembro desde
                </span>
                <span className="text-foreground font-medium text-[11px]">
                  {createdDate}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Nota de ayuda */}
          <div className="rounded-lg bg-blue-50/60 dark:bg-blue-950/30 p-3.5 text-xs text-blue-800 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              Acceso Seguro
            </p>
            <p className="leading-relaxed">
              Tu contraseña se almacena con cifrado bcrypt en Supabase Auth. Nadie en el equipo puede ver tu contraseña en texto plano.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Cambio de Contraseña */}
        <div className="md:col-span-2">
          <PasswordForm />
        </div>
      </div>
    </div>
  )
}
