"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  CheckSquare,
  Key,
  Users,
  CreditCard,
  Mail,
  LogOut,
  ShieldCheck,
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
  { href: "/dashboard/admin/tasks", label: "Tareas", icon: CheckSquare },
  { href: "/dashboard/admin/licenses", label: "Licencias", icon: Key },
  { href: "/dashboard/admin/clients", label: "Clientes", icon: Users },
  { href: "/dashboard/admin/payments", label: "Pagos", icon: CreditCard },
  { href: "/dashboard/admin/email", label: "Correo", icon: Mail },
  { href: "/dashboard/admin/docs", label: "Docs API", icon: BookOpen },
  { href: "/dashboard/admin/perfil", label: "Seguridad", icon: ShieldCheck },
]

interface AdminSidebarProps {
  userEmail?: string
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <div className="flex items-center justify-center h-16 w-full px-2">
          <Image
            src="/images/prigma_logo_sin_fondo.png"
            alt="Prigma Logo"
            width={70}
            height={10}
            className="object-contain group-data-[collapsible=icon]:hidden"
            priority
          />
          <Image
            src="/images/prigma_logo_sin_fondo.png"
            alt="Prigma Logo Corto"
            width={128}
            height={128}
            className="object-contain hidden group-data-[collapsible=icon]:block"
            priority
          />
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
        <div className="p-2">
          {userEmail && (
            <Link
              href="/dashboard/admin/perfil"
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded transition-colors truncate mb-1 group-data-[collapsible=icon]:hidden"
              title="Ver perfil y cambiar contraseña"
            >
              <span className="truncate font-medium">{userEmail}</span>
            </Link>
          )}
          <SidebarMenu>
            <SidebarMenuItem>
              <form action="/api/auth/logout" method="POST">
                <SidebarMenuButton type="submit" tooltip="Cerrar Sesión" className="w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
