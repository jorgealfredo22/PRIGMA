import * as React from "react"
import { redirect } from "next/navigation"
import { Users } from "lucide-react"

import { getCurrentUser } from "@/lib/auth"
import { getTeamMembersAction } from "../team-actions"
import { TeamMembersView } from "../_components/team-members-view"

export const metadata = {
  title: "Gestión de Equipo y Telegram | PRIGMA Admin",
  description: "Administración de contactos, números telefónicos y vinculación a Telegram de los empleados.",
}

export default async function AdminTeamPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const teamMembers = await getTeamMembersAction()

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Equipo y Notificaciones Telegram
            </h1>
            <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Users className="h-3 w-3" />
              Gestión de Contacto
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Administra los números de teléfono y los IDs de Telegram de los usuarios registrados para el envío automatizado de tareas y seguimiento.
          </p>
        </div>
      </div>

      {/* Main View Component */}
      <TeamMembersView initialMembers={teamMembers} />
    </div>
  )
}
