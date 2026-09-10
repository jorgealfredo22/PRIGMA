"use client"

import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface AdminHeaderProps {
  userEmail?: string
  userInitials?: string
}

export function AdminHeader({ userEmail, userInitials }: AdminHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="h-8 w-8" />
      
      <div className="flex-1" />
      
      <Link
        href="/dashboard/admin/perfil"
        className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-muted/60 transition-colors"
        title="Ver perfil y cambiar contraseña"
      >
        <div className="flex flex-col items-end">
          {userEmail && (
            <span className="text-sm font-medium leading-none">{userEmail}</span>
          )}
          <span className="text-[11px] text-muted-foreground mt-0.5">Equipo PRIGMA</span>
        </div>
        
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-xs">
          {userInitials || "A"}
        </div>
      </Link>
    </header>
  )
}