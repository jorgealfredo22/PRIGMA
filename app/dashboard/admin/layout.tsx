import { redirect } from "next/navigation"
import type React from "react"

import { getCurrentUser } from "@/lib/auth"
import { AdminSidebar } from "./_components/sidebar"
import { AdminHeader } from "./_components/admin-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userEmail = user.email
  const userInitials = userEmail ? userEmail.split("@")[0].slice(0, 2).toUpperCase() : "A"

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar userEmail={userEmail} />
      <SidebarInset>
        <AdminHeader userEmail={userEmail} userInitials={userInitials} />
        <div className="flex-1 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
