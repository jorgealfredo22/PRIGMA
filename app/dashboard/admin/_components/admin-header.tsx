"use client"

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
      
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          {userEmail && (
            <span className="text-sm font-medium">{userEmail}</span>
          )}
        </div>
        
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
          {userInitials || "A"}
        </div>
      </div>
    </header>
  )
}