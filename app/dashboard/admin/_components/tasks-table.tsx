"use client"

import * as React from "react"
import { useState, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Search,
  Trash2,
  Calendar,
  Clock,
  User,
  Filter,
  RefreshCw,
  AlertCircle,
  FolderKanban,
  Sparkles,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { TaskDialog } from "./task-dialog"
import { TaskStatusBadge, TaskPriorityBadge } from "./task-status-badge"
import {
  updateTaskStatusAction,
  updateTaskAssigneeAction,
  deleteTaskAction,
  seedPrigmateTasksAction,
} from "../tasks/actions"
import type { AdminTask, TaskStatus } from "../tasks/types"
import { TASK_STATUS_CONFIG } from "../tasks/types"
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
import { MoreVertical, Edit } from "lucide-react"

interface TasksTableProps {
  tasks: AdminTask[]
  teamUsers?: string[]
}

export function TasksTable({ tasks, teamUsers = [] }: TasksTableProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Filter states
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedAssignee, setSelectedAssignee] = useState<string>("all")
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null)

  // Unique assignees extracted from current tasks
  const assignees = useMemo(() => {
    const list = new Set<string>()
    tasks.forEach((t) => {
      if (t.assignee_name) list.add(t.assignee_name)
    })
    return Array.from(list).sort()
  }, [tasks])

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Search
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchTitle = t.title?.toLowerCase().includes(query)
        const matchCode = t.task_code?.toLowerCase().includes(query)
        const matchAssignee = t.assignee_name?.toLowerCase().includes(query)
        const matchDesc = t.description?.toLowerCase().includes(query)
        if (!matchTitle && !matchCode && !matchAssignee && !matchDesc) return false
      }

      // Status
      if (selectedStatus !== "all" && t.status !== selectedStatus) {
        return false
      }

      // Assignee
      if (selectedAssignee !== "all" && t.assignee_name !== selectedAssignee) {
        return false
      }

      return true
    })
  }, [tasks, search, selectedStatus, selectedAssignee])

  // Status inline change handler
  async function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    setUpdatingTaskId(taskId)
    try {
      const res = await updateTaskStatusAction(taskId, newStatus)
      if (res.success) {
        toast.success(`Estado actualizado a "${TASK_STATUS_CONFIG[newStatus]?.label}"`)
        router.refresh()
      } else {
        toast.error(res.error || "Error al actualizar estado")
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al actualizar estado")
    } finally {
      setUpdatingTaskId(null)
    }
  }

  // Delete task handler
  async function handleDeleteTask(taskId: string, title: string) {
    const toastId = toast.loading(`Eliminando tarea...`)
    try {
      const res = await deleteTaskAction(taskId)
      if (res.success) {
        toast.success(`Tarea eliminada correctamente`, { id: toastId })
        router.refresh()
      } else {
        toast.error(res.error || "No se pudo eliminar la tarea", { id: toastId })
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar tarea", { id: toastId })
    }
  }

  // Seed tasks handler
  async function handleSeedTasks() {
    startTransition(async () => {
      const toastId = toast.loading("Precargando las 14 tareas de Prigmate...")
      try {
        const res = await seedPrigmateTasksAction()
        if (res.success) {
          toast.success("¡Tareas de Prigmate precargadas con éxito!", { id: toastId })
          router.refresh()
        } else {
          toast.error(res.error || "Error al precargar tareas", { id: toastId })
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error inesperado al precargar", {
          id: toastId,
        })
      }
    })
  }

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

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código, título o asignado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="w-[140px]">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-9 text-xs">
                <Filter className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {(Object.keys(TASK_STATUS_CONFIG) as TaskStatus[]).map((st) => (
                  <SelectItem key={st} value={st}>
                    {TASK_STATUS_CONFIG[st].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignee Filter */}
          <div className="w-[160px]">
            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger className="h-9 text-xs">
                <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <SelectValue placeholder="Asignado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los asignados</SelectItem>
                {assignees.map((person) => (
                  <SelectItem key={person} value={person}>
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(selectedStatus !== "all" || selectedAssignee !== "all" || search) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("")
                setSelectedStatus("all")
                setSelectedAssignee("all")
              }}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[110px]">Código</TableHead>
              <TableHead className="min-w-[280px]">Título y Descripción</TableHead>
              <TableHead className="w-[150px]">Asignado</TableHead>
              <TableHead className="w-[110px]">Prioridad</TableHead>
              <TableHead className="w-[160px]">Estado</TableHead>
              <TableHead className="w-[100px] text-center">Días</TableHead>
              <TableHead className="w-[120px]">Fecha Límite</TableHead>
              <TableHead className="w-[90px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-44 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-muted rounded-full text-muted-foreground">
                      <FolderKanban className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm">No se encontraron tareas</p>
                      <p className="text-xs text-muted-foreground">
                        {tasks.length === 0
                          ? "Aún no hay tareas creadas en este panel."
                          : "No hay tareas que coincidan con los filtros aplicados."}
                      </p>
                    </div>
                    {tasks.length === 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSeedTasks}
                        disabled={isPending}
                        className="gap-1.5 text-xs mt-2"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Precargar Tareas de Prigmate
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => {
                const isOverdue =
                  task.due_date &&
                  task.status !== "completed" &&
                  new Date(task.due_date) < new Date(new Date().setHours(0, 0, 0, 0))

                return (
                  <TableRow key={task.id} className="hover:bg-muted/30 transition-colors">
                    {/* Task Code */}
                    <TableCell className="font-mono text-xs font-semibold">
                      <Badge
                        variant="outline"
                        className={`px-2 py-0.5 font-mono ${getCodeBadgeStyle(task.task_code)}`}
                      >
                        {task.task_code}
                      </Badge>
                    </TableCell>

                    {/* Title & Description */}
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="font-medium text-sm text-foreground flex items-center gap-2">
                          <span>{task.title}</span>
                          {task.project && task.project !== "Prigmate" && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                              {task.project}
                            </Badge>
                          )}
                        </div>
                        {task.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-lg">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Assignee con menú de reasignación rápida */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 text-xs text-left hover:bg-muted/70 px-2 py-1 rounded transition-colors group cursor-pointer max-w-[150px]"
                            title="Clic para reasignar"
                          >
                            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[10px] shrink-0">
                              {task.assignee_name
                                ? task.assignee_name.slice(0, 2).toUpperCase()
                                : "?"}
                            </div>
                            <span className="font-medium truncate" title={task.assignee_name}>
                              {task.assignee_name.includes("@")
                                ? task.assignee_name.split("@")[0]
                                : task.assignee_name}
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 text-xs">
                          <DropdownMenuLabel>Reasignar a Usuario</DropdownMenuLabel>
                          {teamUsers.map((email) => (
                            <DropdownMenuItem
                              key={email}
                              onClick={async () => {
                                const res = await updateTaskAssigneeAction(task.id, email)
                                if (res.success) {
                                  toast.success(`Asignada a ${email}`)
                                  router.refresh()
                                }
                              }}
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
                                onClick={async () => {
                                  const res = await updateTaskAssigneeAction(task.id, role)
                                  if (res.success) {
                                    toast.success(`Asignada a ${role}`)
                                    router.refresh()
                                  }
                                }}
                              >
                                {role}
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    {/* Priority */}
                    <TableCell>
                      <TaskPriorityBadge priority={task.priority} />
                    </TableCell>

                    {/* Interactive Status Select */}
                    <TableCell>
                      <Select
                        value={task.status}
                        onValueChange={(val) => handleStatusChange(task.id, val as TaskStatus)}
                        disabled={updatingTaskId === task.id}
                      >
                        <SelectTrigger className="h-7 text-xs px-2 w-full border-muted-foreground/20">
                          {updatingTaskId === task.id ? (
                            <RefreshCw className="h-3 w-3 animate-spin mr-1" />
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
                    </TableCell>

                    {/* Estimated Days */}
                    <TableCell className="text-center">
                      <span className="text-xs font-mono font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {task.estimated_days}d
                      </span>
                    </TableCell>

                    {/* Due Date */}
                    <TableCell>
                      {task.due_date ? (
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            isOverdue
                              ? "text-destructive font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          <Calendar className="h-3 w-3" />
                          <span>{task.due_date}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/50 text-xs">—</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <TaskDialog task={task} teamUsers={teamUsers} />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar tarea {task.task_code}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Estás a punto de eliminar la tarea &ldquo;{task.title}&rdquo;. Esta acción no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTask(task.id, task.title)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Mostrando {filteredTasks.length} de {tasks.length} tareas
        </span>
        {tasks.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSeedTasks}
            disabled={isPending}
            className="text-xs h-7 text-muted-foreground hover:text-foreground"
          >
            <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
            Sincronizar Roadmap
          </Button>
        )}
      </div>
    </div>
  )
}
