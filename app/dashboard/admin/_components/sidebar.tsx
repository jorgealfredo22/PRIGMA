"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  Key,
  Users,
  CreditCard,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const nav_items = [
  { href: "/dashboard/admin/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/licenses", label: "Licencias", icon: Key },
  { href: "/dashboard/admin/clients", label: "Clientes", icon: Users },
  { href: "/dashboard/admin/payments", label: "Pagos", icon: CreditCard },
  { href: "/dashboard/admin/docs", label: "Docs API", icon: BookOpen },
]

interface AdminSidebarProps {
  userEmail?: string
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="text-lg font-semibold">Prigma Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav_items.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted hover:text-foreground"
                      }
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <div className="px-3 py-2">
          {userEmail && (
            <p className="text-xs text-muted-foreground truncate mb-2">
              {userEmail}
            </p>
          )}
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-destructive/10 w-full px-2 py-1.5 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
