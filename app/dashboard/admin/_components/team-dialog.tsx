"use client"

import * as React from "react"
import { useState } from "react"
import { Users, Phone, Send, Check, Loader2, Edit2, ShieldCheck, HelpCircle } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { updateTeamMemberContactAction } from "../team-actions"
import type { TeamUserContact } from "@/lib/team-auth"

interface TeamDialogProps {
  initialMembers?: TeamUserContact[]
}

export function TeamDialog({ initialMembers = [] }: TeamDialogProps) {
  const [open, setOpen] = useState(false)
  const [members, setMembers] = useState<TeamUserContact[]>(initialMembers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Edit form state
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formChatId, setFormChatId] = useState("")
  const [formUsername, setFormUsername] = useState("")

  React.useEffect(() => {
    setMembers(initialMembers)
  }, [initialMembers])

  const startEditing = (member: TeamUserContact) => {
    setEditingId(member.id)
    setFormName(member.name || "")
    setFormPhone(member.phone_number || "")
    setFormChatId(member.telegram_chat_id || "")
    setFormUsername(member.telegram_username || "")
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  const handleSave = async (userId: string) => {
    setLoading(true)
    try {
      const res = await updateTeamMemberContactAction(userId, {
        name: formName,
        phone_number: formPhone,
        telegram_chat_id: formChatId,
        telegram_username: formUsername,
      })

      if (res.success) {
        toast.success("Contacto actualizado exitosamente")
        setMembers((prev) =>
          prev.map((m) =>
            m.id === userId
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
        setEditingId(null)
      } else {
        toast.error(res.error || "No se pudo actualizar el contacto")
      }
    } catch {
      toast.error("Ocurrió un error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:border-primary/40">
          <Users className="h-4 w-4 text-primary" />
          <span>Equipo y Telegram</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5 text-primary" />
            Gestión de Miembros y Notificaciones Telegram
          </DialogTitle>
          <DialogDescription>
            Configura el número de teléfono y el ID de Telegram de cada miembro del equipo para el envío automático de tareas y solicitud de avances.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="space-y-4">
            {members.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No se encontraron usuarios registrados en Supabase Auth.
              </p>
            ) : (
              members.map((member) => {
                const isEditing = editingId === member.id
                const isTelegramLinked = Boolean(member.telegram_chat_id)

                return (
                  <div
                    key={member.id}
                    className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm transition-all hover:border-border"
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-border/40">
                          <span className="text-sm font-semibold text-foreground">{member.email}</span>
                          <span className="text-xs text-muted-foreground">Editando datos</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">Nombre Completo</Label>
                            <Input
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Ej. Daniel Rodríguez"
                              className="h-8 text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs font-medium">Teléfono / WhatsApp</Label>
                            <Input
                              value={formPhone}
                              onChange={(e) => setFormPhone(e.target.value)}
                              placeholder="+573001234567"
                              className="h-8 text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs font-medium flex items-center gap-1">
                              Telegram Chat ID
                              <HelpCircle className="h-3 w-3 text-muted-foreground" />
                            </Label>
                            <Input
                              value={formChatId}
                              onChange={(e) => setFormChatId(e.target.value)}
                              placeholder="Ej. 123456789"
                              className="h-8 text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs font-medium">Telegram Username (@)</Label>
                            <Input
                              value={formUsername}
                              onChange={(e) => setFormUsername(e.target.value)}
                              placeholder="usuario_telegram"
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEditing}
                            disabled={loading}
                            className="h-8 text-xs"
                          >
                            Cancelar
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleSave(member.id)}
                            disabled={loading}
                            className="h-8 text-xs gap-1.5"
                          >
                            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                            Guardar Cambios
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-foreground">
                              {member.name || member.email.split("@")[0]}
                            </span>
                            <span className="text-xs text-muted-foreground">({member.email})</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-1">
                            {member.phone_number ? (
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-primary" />
                                {member.phone_number}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/60 italic">Sin teléfono</span>
                            )}

                            <span>•</span>

                            {isTelegramLinked ? (
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800 text-[11px] gap-1 py-0">
                                <Send className="h-2.5 w-2.5" />
                                Telegram ID: {member.telegram_chat_id}
                                {member.telegram_username ? ` (@${member.telegram_username})` : ""}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-300 dark:border-amber-800 text-[11px] py-0">
                                Sin Telegram Vinculado
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(member)}
                          className="h-8 text-xs gap-1.5 self-end sm:self-center"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Editar
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
