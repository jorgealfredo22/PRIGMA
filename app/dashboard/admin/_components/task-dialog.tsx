"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Loader2, Edit, CalendarIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createTaskAction, updateTaskAction } from "../tasks/actions"
import type { AdminTask, TaskPriority, TaskStatus } from "../tasks/types"
import { TASK_STATUS_CONFIG, TASK_PRIORITY_CONFIG } from "../tasks/types"

interface TaskDialogProps {
  task?: AdminTask
  trigger?: React.ReactNode
  onSuccess?: () => void
  teamUsers?: string[]
}

const COMMON_ASSIGNEES = [
  "Christian",
  "Backend Developer",
  "Frontend Developer",
  "AI Engineer",
  "QA Tester",
  "DevOps / Christian",
]

export function TaskDialog({ task, trigger, onSuccess, teamUsers = [] }: TaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const isEditing = Boolean(task)

  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "pending")
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? "medium")
  const [assigneeName, setAssigneeName] = useState(task?.assignee_name ?? "")
  const [project, setProject] = useState(task?.project ?? "Prigmate")

  // Reset form state when task changes or dialog opens
  React.useEffect(() => {
    if (open) {
      setStatus(task?.status ?? "pending")
      setPriority(task?.priority ?? "medium")
      setAssigneeName(task?.assignee_name ?? "")
      setProject(task?.project ?? "Prigmate")
    }
  }, [open, task])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    const toastId = toast.loading(isEditing ? "Actualizando tarea..." : "Creando tarea...")

    try {
      const formData = new FormData(event.currentTarget)
      // Ensure select controlled values are present in formData
      formData.set("status", status)
      formData.set("priority", priority)
      formData.set("project", project)
      if (assigneeName) {
        formData.set("assignee_name", assigneeName)
      }

      let res
      if (isEditing && task?.id) {
        res = await updateTaskAction(task.id, formData)
      } else {
        res = await createTaskAction(formData)
      }

      if (res.success) {
        toast.success(isEditing ? "Tarea actualizada correctamente" : "Tarea creada correctamente", {
          id: toastId,
        })
        setOpen(false)
        router.refresh()
        onSuccess?.()
      } else {
        toast.error(res.error || "Ocurrió un error al procesar la tarea", {
          id: toastId,
        })
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error inesperado", {
        id: toastId,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : isEditing ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
        ) : (
          <Button className="gap-1.5 shadow-sm">
            <Plus className="h-4 w-4" />
            <span>Nueva Tarea</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? `Editar Tarea ${task?.task_code || ""}` : "Crear Nueva Tarea"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="task_code" className="text-xs font-semibold uppercase text-muted-foreground">
                Código
              </Label>
              <Input
                id="task_code"
                name="task_code"
                defaultValue={task?.task_code ?? ""}
                placeholder="Ej. BE-05"
                className="uppercase font-mono"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="project" className="text-xs font-semibold uppercase text-muted-foreground">
                Proyecto
              </Label>
              <Input
                id="project"
                name="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Prigmate"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold uppercase text-muted-foreground">
              Título de la Tarea <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={task?.title ?? ""}
              placeholder="Descripción breve de la tarea"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold uppercase text-muted-foreground">
              Descripción / Criterios de Aceptación
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={task?.description ?? ""}
              placeholder="Detalla los requerimientos técnicos, arquitectura o pasos a realizar..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="assignee_name" className="text-xs font-semibold uppercase text-muted-foreground">
                Asignado a <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                <Input
                  id="assignee_name"
                  name="assignee_name"
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  placeholder="Selecciona o escribe el responsable"
                  list="assignee-suggestions"
                  required
                />
                <datalist id="assignee-suggestions">
                  {teamUsers.map((email) => (
                    <option key={email} value={email} />
                  ))}
                  {COMMON_ASSIGNEES.map((person) => (
                    <option key={person} value={person} />
                  ))}
                </datalist>

                {/* Chips de correos registrados del equipo */}
                {teamUsers.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                      Usuarios Registrados:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {teamUsers.map((email) => (
                        <button
                          key={email}
                          type="button"
                          onClick={() => setAssigneeName(email)}
                          className={`text-[11px] transition-all px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                            assigneeName === email
                              ? "bg-primary text-primary-foreground border-primary font-medium"
                              : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="h-3 w-3 rounded-full bg-primary/20 text-current flex items-center justify-center text-[9px] font-bold">
                            {email.slice(0, 1).toUpperCase()}
                          </span>
                          <span>{email}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Perfiles sugeridos */}
                <div className="space-y-1 pt-1">
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">
                    Perfiles generales:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {COMMON_ASSIGNEES.map((person) => (
                      <button
                        key={person}
                        type="button"
                        onClick={() => setAssigneeName(person)}
                        className={`text-[11px] transition-colors px-1.5 py-0.5 rounded border ${
                          assigneeName === person
                            ? "bg-primary text-primary-foreground border-primary font-medium"
                            : "bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground"
                        }`}
                      >
                        {person}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">
                  Estado
                </Label>
                <Select value={status} onValueChange={(val) => setStatus(val as TaskStatus)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(TASK_STATUS_CONFIG) as TaskStatus[]).map((st) => (
                      <SelectItem key={st} value={st}>
                        {TASK_STATUS_CONFIG[st].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">
                  Prioridad
                </Label>
                <Select value={priority} onValueChange={(val) => setPriority(val as TaskPriority)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(TASK_PRIORITY_CONFIG) as TaskPriority[]).map((pr) => (
                      <SelectItem key={pr} value={pr}>
                        {TASK_PRIORITY_CONFIG[pr].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
            <div className="space-y-1.5">
              <Label htmlFor="estimated_days" className="text-xs font-semibold uppercase text-muted-foreground">
                Estimación (Días)
              </Label>
              <Input
                id="estimated_days"
                name="estimated_days"
                type="number"
                step="0.5"
                min="0.5"
                max="90"
                defaultValue={task?.estimated_days ?? 1.0}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="due_date" className="text-xs font-semibold uppercase text-muted-foreground">
                Fecha Límite
              </Label>
              <div className="relative">
                <Input
                  id="due_date"
                  name="due_date"
                  type="date"
                  defaultValue={task?.due_date ?? ""}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : isEditing ? (
                "Guardar Cambios"
              ) : (
                "Crear Tarea"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
