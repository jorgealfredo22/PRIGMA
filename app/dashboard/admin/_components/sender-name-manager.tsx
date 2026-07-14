"use client"

import { useState } from "react"
import { Plus, Star, Trash2, Pencil, Loader2, X, Check } from "lucide-react"
import { toast } from "sonner"

import {
  addSenderNameAction,
  updateSenderNameAction,
  setDefaultSenderAction,
  deleteSenderNameAction,
  type SenderName,
} from "../email/sender-actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SenderNameManagerProps {
  senderNames: SenderName[]
}

export function SenderNameManager({ senderNames }: SenderNameManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [defaultingId, setDefaultingId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDisplayName, setEditDisplayName] = useState("")
  const [editEmailAddress, setEditEmailAddress] = useState("")
  const [savingId, setSavingId] = useState<string | null>(null)

  async function handleAdd() {
    if (!displayName.trim() || !emailAddress.trim()) {
      toast.error("Completá todos los campos")
      return
    }

    setIsAdding(true)
    try {
      const fd = new FormData()
      fd.set("displayName", displayName.trim())
      fd.set("emailAddress", emailAddress.trim())

      const result = await addSenderNameAction(fd)
      if (result.success) {
        toast.success("Remitente agregado")
        setDisplayName("")
        setEmailAddress("")
        setDialogOpen(false)
      } else {
        toast.error(result.error ?? "Error al agregar")
      }
    } catch {
      toast.error("Error inesperado")
    } finally {
      setIsAdding(false)
    }
  }

  function startEdit(sender: SenderName) {
    setEditingId(sender.id)
    setEditDisplayName(sender.display_name)
    setEditEmailAddress(sender.email_address)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditDisplayName("")
    setEditEmailAddress("")
  }

  async function handleSaveEdit(id: string) {
    if (!editDisplayName.trim() || !editEmailAddress.trim()) {
      toast.error("Completá todos los campos")
      return
    }

    setSavingId(id)
    try {
      const fd = new FormData()
      fd.set("id", id)
      fd.set("displayName", editDisplayName.trim())
      fd.set("emailAddress", editEmailAddress.trim())

      const result = await updateSenderNameAction(fd)
      if (result.success) {
        toast.success("Remitente actualizado")
        setEditingId(null)
      } else {
        toast.error(result.error ?? "Error al actualizar")
      }
    } catch {
      toast.error("Error inesperado")
    } finally {
      setSavingId(null)
    }
  }

  async function handleSetDefault(id: string) {
    setDefaultingId(id)
    try {
      const result = await setDefaultSenderAction(id)
      if (result.success) {
        toast.success("Remitente predeterminado actualizado")
      } else {
        toast.error(result.error ?? "Error")
      }
    } catch {
      toast.error("Error inesperado")
    } finally {
      setDefaultingId(null)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const result = await deleteSenderNameAction(id)
      if (result.success) {
        toast.success("Remitente eliminado")
      } else {
        toast.error(result.error ?? "Error al eliminar")
      }
    } catch {
      toast.error("Error inesperado")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Remitentes guardados
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo remitente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-display-name">Nombre para mostrar</Label>
                <Input
                  id="new-display-name"
                  placeholder="ej: Soporte, Juan, Admin"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Nombre que aparece como remitente del correo
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-email-address">Dirección de email</Label>
                <Input
                  id="new-email-address"
                  type="email"
                  placeholder="soporte@prigma.net"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Email desde el que se envía (debe estar en tu dominio verificado)
                </p>
              </div>
              <Button
                onClick={handleAdd}
                disabled={isAdding}
                className="w-full"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  "Agregar remitente"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-1">
        {senderNames.map((sender) => {
          const isEditing = editingId === sender.id

          return (
            <div
              key={sender.id}
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors gap-2"
            >
              {isEditing ? (
                /* ── Edit mode ── */
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    className="h-8 text-sm flex-1"
                    placeholder="Nombre"
                    autoFocus
                  />
                  <Input
                    value={editEmailAddress}
                    onChange={(e) => setEditEmailAddress(e.target.value)}
                    className="h-8 text-sm flex-1"
                    placeholder="email@prigma.net"
                    type="email"
                  />
                </div>
              ) : (
                /* ── View mode ── */
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium truncate">
                    {sender.display_name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    &lt;{sender.email_address}&gt;
                  </span>
                  {sender.is_default && (
                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full whitespace-nowrap">
                      Predeterminado
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center gap-1 shrink-0">
                {isEditing ? (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-green-600 hover:text-green-600"
                          onClick={() => handleSaveEdit(sender.id)}
                          disabled={savingId === sender.id}
                        >
                          {savingId === sender.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Guardar cambios</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={cancelEdit}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Cancelar</TooltipContent>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => startEdit(sender)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar nombre y email</TooltipContent>
                    </Tooltip>
                    {!sender.is_default && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleSetDefault(sender.id)}
                            disabled={defaultingId === sender.id}
                          >
                            {defaultingId === sender.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Star className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Establecer como predeterminado
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {!sender.is_default && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(sender.id)}
                            disabled={deletingId === sender.id}
                          >
                            {deletingId === sender.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Eliminar remitente
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
