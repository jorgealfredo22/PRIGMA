"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Calendar,
  Clock,
  User,
  Edit,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  FileText,
  RefreshCw,
  Sparkles,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskStatusBadge, TaskPriorityBadge } from "./task-status-badge"
import { updateTaskStatusAction, updateTaskAssigneeAction } from "../tasks/actions"
import type { AdminTask, TaskStatus } from "../tasks/types"
import { TASK_STATUS_CONFIG } from "../tasks/types"

interface TaskPreviewDialogProps {
  task: AdminTask | null
  open: boolean
  onOpenChange: (open: boolean) => void
  teamUsers?: string[]
  onEdit?: (task: AdminTask) => void
}

export function TaskPreviewDialog({
  task,
  open,
  onOpenChange,
  teamUsers = [],
  onEdit,
}: TaskPreviewDialogProps) {
  const router = useRouter()
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isUpdatingAssignee, setIsUpdatingAssignee] = useState(false)

  if (!task) return null

  const isOverdue =
    task.due_date &&
    task.status !== "completed" &&
    new Date(task.due_date) < new Date(new Date().setHours(0, 0, 0, 0))

  function getCodeBadgeStyle(code: string) {
    const prefix = code.split("-")[0]?.toUpperCase()
    switch (prefix) {
      case "BE":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
      case "FE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
      case "AI":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
      case "QA":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  async function handleStatusChange(newStatus: TaskStatus) {
    if (!task) return
    setIsUpdatingStatus(true)
    try {
      const res = await updateTaskStatusAction(task.id, newStatus)
      if (res.success) {
        toast.success(`Estado actualizado a "${TASK_STATUS_CONFIG[newStatus]?.label}"`)
        router.refresh()
      } else {
        toast.error(res.error || "Error al actualizar estado")
      }
    } catch (e: any) {
      toast.error(e.message || "Error al actualizar estado")
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  async function handleReassign(newAssignee: string) {
    if (!task) return
    setIsUpdatingAssignee(true)
    try {
      const res = await updateTaskAssigneeAction(task.id, newAssignee)
      if (res.success) {
        toast.success(`Tarea asignada a ${newAssignee}`)
        router.refresh()
      } else {
        toast.error(res.error || "Error al reasignar tarea")
      }
    } catch (e: any) {
      toast.error(e.message || "Error al reasignar tarea")
    } finally {
      setIsUpdatingAssignee(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 pb-3 border-b">
          {/* Header badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={`font-mono text-xs px-2.5 py-0.5 ${getCodeBadgeStyle(task.task_code)}`}
            >
              {task.task_code}
            </Badge>

            <Badge variant="secondary" className="text-xs">
              <FolderKanban className="h-3 w-3 mr-1" />
              {task.project || "Prigmate"}
            </Badge>

            <TaskPriorityBadge priority={task.priority} />

            {isOverdue && (
              <Badge variant="destructive" className="text-[11px] gap-1">
                <AlertTriangle className="h-3 w-3" />
                Vencida
              </Badge>
            )}
          </div>

          <DialogTitle className="text-xl font-bold leading-tight text-foreground">
            {task.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Creada el {new Date(task.created_at).toLocaleDateString("es-ES", { dateStyle: "long" })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Quick Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3.5 rounded-lg bg-muted/40 border text-xs">
            {/* Estado interactivo */}
            <div className="space-y-1.5">
              <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Estado
              </span>
              <Select
                value={task.status}
                onValueChange={(val) => handleStatusChange(val as TaskStatus)}
                disabled={isUpdatingStatus}
              >
                <SelectTrigger className="h-8 text-xs bg-background">
                  {isUpdatingStatus ? (
                    <RefreshCw className="h-3 w-3 animate-spin mr-1.5" />
                  ) : null}
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(TASK_STATUS_CONFIG) as TaskStatus[]).map((st) => (
                    <SelectItem key={st} value={st} className="text-xs">
                      {TASK_STATUS_CONFIG[st].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Asignado con menú rápido */}
            <div className="space-y-1.5">
              <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Responsable
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start h-8 text-xs bg-background font-normal"
                  >
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] mr-2 shrink-0">
                      {task.assignee_name ? task.assignee_name.slice(0, 2).toUpperCase() : "?"}
                    </div>
                    <span className="truncate">
                      {task.assignee_name || "Sin asignar"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 text-xs">
                  <DropdownMenuLabel>Reasignar a Usuario</DropdownMenuLabel>
                  {teamUsers.map((email) => (
                    <DropdownMenuItem
                      key={email}
                      onClick={() => handleReassign(email)}
                      className={task.assignee_name === email ? "font-bold text-primary" : ""}
                    >
                      {email}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Roles Generales</DropdownMenuLabel>
                  {["Christian", "Backend Developer", "Frontend Developer", "AI Engineer", "QA Tester"].map(
                    (role) => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => handleReassign(role)}
                        className={task.assignee_name === role ? "font-bold text-primary" : ""}
                      >
                        {role}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Esfuerzo estimado */}
            <div className="space-y-1">
              <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Esfuerzo Estimado
              </span>
              <p className="font-medium text-foreground">
                {task.estimated_days} {Number(task.estimated_days) === 1 ? "día" : "días"} de desarrollo
              </p>
            </div>

            {/* Fecha Límite */}
            <div className="space-y-1">
              <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Fecha Límite
              </span>
              <p className={`font-medium ${isOverdue ? "text-destructive font-semibold" : "text-foreground"}`}>
                {task.due_date ? task.due_date : "Sin fecha límite establecida"}
              </p>
            </div>
          </div>

          {/* Full Description / Acceptance Criteria */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-primary" />
              Descripción y Criterios de la Tarea
            </h4>
            <div className="rounded-lg border bg-card p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap select-text">
              {task.description ? (
                task.description
              ) : (
                <span className="text-muted-foreground italic">
                  Esta tarea no cuenta con una descripción detallada. Puedes agregar detalles técnicos o criterios de aceptación haciendo clic en &ldquo;Editar Tarea&rdquo;.
                </span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between border-t pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>

          {onEdit && (
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onOpenChange(false)
                onEdit(task)
              }}
              className="gap-1.5"
            >
              <Edit className="h-3.5 w-3.5" />
              Editar Tarea
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
