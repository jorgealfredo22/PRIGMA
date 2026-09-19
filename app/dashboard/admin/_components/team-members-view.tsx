"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import {
  Users,
  Phone,
  Send,
  Search,
  Check,
  Loader2,
  Edit2,
  Mail,
  UserCheck,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { updateTeamMemberContactAction } from "../team-actions"
import type { TeamUserContact } from "@/lib/team-auth"

interface TeamMembersViewProps {
  initialMembers: TeamUserContact[]
}

export function TeamMembersView({ initialMembers }: TeamMembersViewProps) {
  const [members, setMembers] = useState<TeamUserContact[]>(initialMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingMember, setEditingMember] = useState<TeamUserContact | null>(null)
  const [loading, setLoading] = useState(false)

  // Edit form state
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formChatId, setFormChatId] = useState("")
  const [formUsername, setFormUsername] = useState("")

  const openEditModal = (m: TeamUserContact) => {
    setEditingMember(m)
    setFormName(m.name || "")
    setFormPhone(m.phone_number || "")
    setFormChatId(m.telegram_chat_id || "")
    setFormUsername(m.telegram_username || "")
  }

  const closeEditModal = () => {
    setEditingMember(null)
  }

  const handleSave = async () => {
    if (!editingMember) return
    setLoading(true)
    try {
      const res = await updateTeamMemberContactAction(editingMember.id, {
        name: formName,
        phone_number: formPhone,
        telegram_chat_id: formChatId,
        telegram_username: formUsername,
      })

      if (res.success) {
        toast.success("Contacto actualizado exitosamente")
        setMembers((prev) =>
          prev.map((m) =>
            m.id === editingMember.id
              ? {
                  ...m,
                  name: formName.trim() || m.email.split("@")[0],
                  phone_number: formPhone.trim() || null,
                  telegram_chat_id: formChatId.trim() || null,
                  telegram_username: formUsername.trim().replace(/^@/, "") || null,
                }
              : m
          )
        )
        closeEditModal()
      } else {
        toast.error(res.error || "No se pudo actualizar el contacto")
      }
    } catch {
      toast.error("Ocurrió un error inesperado al guardar los cambios.")
    } finally {
      setLoading(false)
    }
  }

  // Filtered members list
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members
    const q = searchQuery.toLowerCase()
    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.phone_number?.toLowerCase().includes(q) ||
        m.telegram_username?.toLowerCase().includes(q) ||
        String(m.telegram_chat_id || "").includes(q)
    )
  }, [members, searchQuery])

  // KPIs
  const totalCount = members.length
  const telegramLinkedCount = members.filter((m) => Boolean(m.telegram_chat_id)).length
  const withPhoneCount = members.filter((m) => Boolean(m.phone_number)).length

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Miembros Registrados</p>
              <p className="text-2xl font-bold tracking-tight">{totalCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Vinculados a Telegram</p>
              <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                {telegramLinkedCount}
                <span className="text-xs font-normal text-muted-foreground ml-1.5">/ {totalCount}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Con Teléfono / WhatsApp</p>
              <p className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                {withPhoneCount}
                <span className="text-xs font-normal text-muted-foreground ml-1.5">/ {totalCount}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, email o teléfono..."
            className="pl-9 h-9 text-sm"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Mostrando <b>{filteredMembers.length}</b> de {totalCount} miembros
        </p>
      </div>

      {/* Team Members List / Table */}
      <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/40 text-xs uppercase font-semibold text-muted-foreground border-b">
              <tr>
                <th className="px-5 py-3.5">Miembro / Email</th>
                <th className="px-5 py-3.5">Teléfono / WhatsApp</th>
                <th className="px-5 py-3.5">Estado Telegram</th>
                <th className="px-5 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-muted-foreground">
                    No se encontraron miembros del equipo que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => {
                  const isLinked = Boolean(member.telegram_chat_id)
                  const initials = member.name
                    ? member.name.slice(0, 2).toUpperCase()
                    : member.email.slice(0, 2).toUpperCase()

                  return (
                    <tr key={member.id} className="hover:bg-muted/25 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">
                              {member.name || member.email.split("@")[0]}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                              <Mail className="h-3 w-3" />
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {member.phone_number ? (
                          <div className="flex items-center gap-1.5 font-medium text-foreground">
                            <Phone className="h-3.5 w-3.5 text-primary" />
                            <span>{member.phone_number}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 italic">Sin registrar</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        {isLinked ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800 text-xs gap-1 py-0.5 font-medium">
                              <Send className="h-3 w-3" />
                              Vinculado
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              ID: <code>{member.telegram_chat_id}</code>
                              {member.telegram_username ? ` (@${member.telegram_username})` : ""}
                            </span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-300 dark:border-amber-800 text-xs py-0.5">
                            Pendiente por Vincular
                          </Badge>
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(member)}
                          className="h-8 text-xs gap-1.5 border-border/80 hover:bg-muted"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Editar
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal Dialog */}
      <Dialog open={Boolean(editingMember)} onOpenChange={(open) => !open && closeEditModal()}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <UserCheck className="h-5 w-5 text-primary" />
              Editar Contacto de Empleado
            </DialogTitle>
            <DialogDescription>
              Actualiza el número de teléfono y el ID de Telegram para el envío automatizado de notificaciones de tareas.
            </DialogDescription>
          </DialogHeader>

          {editingMember && (
            <div className="space-y-4 mt-3">
              <div className="p-3 rounded-lg bg-muted/40 border text-xs flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{editingMember.email}</p>
                  <p className="text-muted-foreground">ID: {editingMember.id}</p>
                </div>
                <Badge variant="secondary">Supabase Auth</Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Nombre Completo</Label>
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej. Daniel Rodríguez"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Teléfono / WhatsApp</Label>
                  <Input
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+573001234567"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Telegram Chat ID</Label>
                    <Input
                      value={formChatId}
                      onChange={(e) => setFormChatId(e.target.value)}
                      placeholder="Ej. 123456789"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Telegram Username (@)</Label>
                    <Input
                      value={formUsername}
                      onChange={(e) => setFormUsername(e.target.value)}
                      placeholder="usuario_telegram"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <Button variant="ghost" size="sm" onClick={closeEditModal} disabled={loading}>
                  Cancelar
                </Button>
                <Button variant="default" size="sm" onClick={handleSave} disabled={loading} className="gap-1.5">
                  {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
