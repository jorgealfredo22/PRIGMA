"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  Plus,
  Circle,
  PlayCircle,
  Eye,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { TaskDialog } from "./task-dialog"
import { TaskPreviewDialog } from "./task-preview-dialog"
import { TaskPriorityBadge } from "./task-status-badge"
import {
  updateTaskStatusAction,
  updateTaskAssigneeAction,
  deleteTaskAction,
} from "../tasks/actions"
import type { AdminTask, TaskStatus } from "../tasks/types"
import { TASK_STATUS_CONFIG, matchAssignee } from "../tasks/types"

interface TasksKanbanProps {
  tasks: AdminTask[]
  teamUsers: string[]
  searchQuery?: string
  filterAssignee?: string
}

const KANBAN_COLUMNS: {
  status: TaskStatus
  label: string
  icon: React.ComponentType<{ className?: string }>
  headerClass: string
  colBg: string
}[] = [
  {
    status: "pending",
    label: "Pendientes",
    icon: Circle,
    headerClass: "text-slate-700 dark:text-slate-300 border-slate-300",
    colBg: "bg-slate-50/60 dark:bg-slate-900/30",
  },
  {
    status: "in_progress",
    label: "En Progreso",
    icon: PlayCircle,
    headerClass: "text-blue-700 dark:text-blue-400 border-blue-300",
    colBg: "bg-blue-50/40 dark:bg-blue-950/20",
  },
  {
    status: "in_review",
    label: "En Revisión",
    icon: Eye,
    headerClass: "text-purple-700 dark:text-purple-400 border-purple-300",
    colBg: "bg-purple-50/40 dark:bg-purple-950/20",
  },
  {
    status: "completed",
    label: "Completadas",
    icon: CheckCircle2,
    headerClass: "text-emerald-700 dark:text-emerald-400 border-emerald-300",
    colBg: "bg-emerald-50/40 dark:bg-emerald-950/20",
  },
  {
    status: "blocked",
    label: "Bloqueadas",
    icon: AlertOctagon,
    headerClass: "text-rose-700 dark:text-rose-400 border-rose-300",
    colBg: "bg-rose-50/40 dark:bg-rose-950/20",
  },
]

export function TasksKanban({
  tasks,
  teamUsers,
  searchQuery = "",
  filterAssignee = "all",
}: TasksKanbanProps) {
  const router = useRouter()
  const [taskToDelete, setTaskToDelete] = useState<AdminTask | null>(null)
  const [editingTask, setEditingTask] = useState<AdminTask | null>(null)
  const [previewTask, setPreviewTask] = useState<AdminTask | null>(null)

  // Filter tasks based on search & assignee
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const match =
          t.title?.toLowerCase().includes(q) ||
          t.task_code?.toLowerCase().includes(q) ||
          t.assignee_name?.toLowerCase().includes(q)
        if (!match) return false
      }

      if (filterAssignee !== "all" && !matchAssignee(t.assignee_name, filterAssignee)) {
        return false
      }

      return true
    })
  }, [tasks, searchQuery, filterAssignee])

  // Move task status
  async function handleMoveStatus(taskId: string, newStatus: TaskStatus) {
    try {
      const res = await updateTaskStatusAction(taskId, newStatus)
      if (res.success) {
        toast.success(`Tarea movida a "${TASK_STATUS_CONFIG[newStatus].label}"`)
        router.refresh()
      } else {
        toast.error(res.error || "Error al mover tarea")
      }
    } catch (e: any) {
      toast.error(e.message || "Error al mover tarea")
    }
  }

  // Quick reassign
  async function handleReassign(taskId: string, newAssignee: string) {
    try {
      const res = await updateTaskAssigneeAction(taskId, newAssignee)
      if (res.success) {
        toast.success(`Asignada a ${newAssignee}`)
        router.refresh()
      } else {
        toast.error(res.error || "Error al reasignar")
      }
    } catch (e: any) {
      toast.error(e.message || "Error al reasignar")
    }
  }

  // Delete task
  async function confirmDelete() {
    if (!taskToDelete) return
    const toastId = toast.loading("Eliminando tarea...")
    try {
      const res = await deleteTaskAction(taskToDelete.id)
      if (res.success) {
        toast.success("Tarea eliminada", { id: toastId })
        setTaskToDelete(null)
        router.refresh()
      } else {
        toast.error(res.error || "No se pudo eliminar", { id: toastId })
      }
    } catch (e: any) {
      toast.error(e.message || "Error al eliminar", { id: toastId })
    }
  }

  function getCodeBadgeStyle(code: string) {
    const prefix = code.split("-")[0]?.toUpperCase()
    switch (prefix) {
      case "BE":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300"
      case "FE":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300"
      case "AI":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
      case "QA":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-w-[1000px]">
        {KANBAN_COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status)
          const colDays = colTasks.reduce((acc, t) => acc + (Number(t.estimated_days) || 0), 0)
          const Icon = col.icon

          return (
            <div
              key={col.status}
              className={`rounded-lg border p-3 flex flex-col min-h-[500px] ${col.colBg}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b mb-3">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <Icon className="h-4 w-4" />
                  <span>{col.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-muted-foreground bg-background border px-1.5 py-0.2 rounded font-medium">
                    {colTasks.length}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {colDays}d
                  </span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="h-28 border border-dashed rounded-md flex items-center justify-center text-xs text-muted-foreground/60 p-2 text-center">
                    No hay tareas en esta columna
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const isOverdue =
                      task.due_date &&
                      task.status !== "completed" &&
                      new Date(task.due_date) < new Date(new Date().setHours(0, 0, 0, 0))

                    return (
                      <Card
                        key={task.id}
                        onClick={() => setPreviewTask(task)}
                        className="shadow-xs hover:shadow-md transition-all border bg-card/95 hover:border-primary/50 group cursor-pointer hover:ring-1 hover:ring-primary/20"
                      >
                        <CardContent className="p-3 space-y-2">
                          {/* Card Header: Code & Actions Menu */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Badge
                                variant="outline"
                                className={`text-[10px] font-mono px-1.5 py-0 ${getCodeBadgeStyle(
                                  task.task_code
                                )}`}
                              >
                                {task.task_code}
                              </Badge>
                              <TaskPriorityBadge priority={task.priority} />
                            </div>

                            {/* Dropdown Menu de Acciones */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                  >
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">Acciones</span>
                                  </Button>
                                </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 text-xs">
                                <DropdownMenuLabel>Acciones de Tarea</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setEditingTask(task)}>
                                  <Edit className="h-3.5 w-3.5 mr-2" />
                                  Editar Tarea
                                </DropdownMenuItem>

                                {/* Mover de estado */}
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger>
                                    <Clock className="h-3.5 w-3.5 mr-2" />
                                    Mover a...
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent className="w-40 text-xs">
                                    {KANBAN_COLUMNS.map((subCol) => (
                                      <DropdownMenuItem
                                        key={subCol.status}
                                        disabled={subCol.status === task.status}
                                        onClick={() => handleMoveStatus(task.id, subCol.status)}
                                      >
                                        {subCol.label}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>

                                {/* Reasignar a usuario */}
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger>
                                    <User className="h-3.5 w-3.5 mr-2" />
                                    Asignar a...
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent className="w-56 text-xs">
                                    <DropdownMenuLabel>Usuarios Registrados</DropdownMenuLabel>
                                    {teamUsers.map((email) => (
                                      <DropdownMenuItem
                                        key={email}
                                        onClick={() => handleReassign(task.id, email)}
                                        className={task.assignee_name === email ? "font-bold text-primary" : ""}
                                      >
                                        {email}
                                      </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Perfiles Sugeridos</DropdownMenuLabel>
                                    {["Christian", "Backend Developer", "Frontend Developer", "AI Engineer", "QA Tester"].map(
                                      (role) => (
                                        <DropdownMenuItem
                                          key={role}
                                          onClick={() => handleReassign(task.id, role)}
                                        >
                                          {role}
                                        </DropdownMenuItem>
                                      )
                                    )}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => setTaskToDelete(task)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                          {/* Card Title & Desc */}
                          <div>
                            <h5 className="font-semibold text-xs leading-snug line-clamp-2">
                              {task.title}
                            </h5>
                            {task.description && (
                              <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                                {task.description}
                              </p>
                            )}
                          </div>

                          {/* Card Footer: Assignee & Estimation */}
                          <div className="pt-2 border-t flex items-center justify-between text-[11px]">
                            {/* Assignee pill with quick change dropdown */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    type="button"
                                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-1.5 py-0.2 rounded transition-colors max-w-[130px]"
                                    title="Clic para reasignar"
                                  >
                                    <div className="h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[9px] shrink-0">
                                      {task.assignee_name ? task.assignee_name.slice(0, 1).toUpperCase() : "?"}
                                    </div>
                                    <span className="truncate text-[10px]">
                                      {task.assignee_name.split("@")[0]}
                                    </span>
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 text-xs">
                                  <DropdownMenuLabel>Reasignar Tarea</DropdownMenuLabel>
                                  {teamUsers.map((email) => (
                                    <DropdownMenuItem
                                      key={email}
                                      onClick={() => handleReassign(task.id, email)}
                                      className={task.assignee_name === email ? "font-bold text-primary" : ""}
                                    >
                                      {email}
                                    </DropdownMenuItem>
                                  ))}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel>Roles Generales</DropdownMenuLabel>
                                  {["Christian", "Backend Developer", "Frontend Developer", "AI Engineer", "QA Tester"].map(
                                    (r) => (
                                      <DropdownMenuItem
                                        key={r}
                                        onClick={() => handleReassign(task.id, r)}
                                      >
                                        {r}
                                      </DropdownMenuItem>
                                    )
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Effort and Due Date */}
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-muted-foreground bg-muted px-1.5 py-0.2 rounded text-[10px]">
                                {task.estimated_days}d
                              </span>

                              {task.due_date && (
                                <span
                                  className={`flex items-center gap-0.5 ${
                                    isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
                                  }`}
                                  title={`Fecha límite: ${task.due_date}`}
                                >
                                  <Calendar className="h-3 w-3" />
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Vista Previa Dialog */}
      <TaskPreviewDialog
        task={previewTask}
        open={Boolean(previewTask)}
        onOpenChange={(open) => !open && setPreviewTask(null)}
        teamUsers={teamUsers}
        onEdit={(t) => {
          setPreviewTask(null)
          setEditingTask(t)
        }}
      />

      {/* Edit Dialog when triggered from card */}
      <TaskDialog
        task={editingTask ?? undefined}
        open={Boolean(editingTask)}
        onOpenChange={(open) => !open && setEditingTask(null)}
        teamUsers={teamUsers}
        onSuccess={() => setEditingTask(null)}
      />

      {/* Delete Confirmation Alert */}
      <AlertDialog
        open={Boolean(taskToDelete)}
        onOpenChange={(open) => !open && setTaskToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar tarea {taskToDelete?.task_code}?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de eliminar &ldquo;{taskToDelete?.title}&rdquo;. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
