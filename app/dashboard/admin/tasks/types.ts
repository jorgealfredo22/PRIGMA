export type TaskStatus =
  | "pending"
  | "in_progress"
  | "in_review"
  | "completed"
  | "blocked"

export type TaskPriority = "low" | "medium" | "high" | "urgent"

export interface AdminTask {
  id: string
  task_code: string
  title: string
  description: string | null
  project: string
  assignee_name: string
  status: TaskStatus
  priority: TaskPriority
  estimated_days: number
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface TaskInput {
  task_code?: string
  title: string
  description?: string | null
  project?: string
  assignee_name: string
  status?: TaskStatus
  priority?: TaskPriority
  estimated_days?: number
  due_date?: string | null
}

export interface TaskFilters {
  status?: string
  assignee?: string
  project?: string
  search?: string
}

export interface ActionResponse {
  success: boolean
  error?: string
  count?: number
}

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; badgeClass: string }
> = {
  pending: {
    label: "Pendiente",
    variant: "secondary",
    badgeClass: "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
  },
  in_progress: {
    label: "En Progreso",
    variant: "default",
    badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 hover:bg-blue-500/25 border-blue-200 dark:border-blue-800",
  },
  in_review: {
    label: "En Revisión",
    variant: "default",
    badgeClass: "bg-purple-500/15 text-purple-700 dark:text-purple-300 hover:bg-purple-500/25 border-purple-200 dark:border-purple-800",
  },
  completed: {
    label: "Completada",
    variant: "default",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 border-emerald-200 dark:border-emerald-800",
  },
  blocked: {
    label: "Bloqueada",
    variant: "destructive",
    badgeClass: "bg-rose-500/15 text-rose-700 dark:text-rose-300 hover:bg-rose-500/25 border-rose-200 dark:border-rose-800",
  },
}

export const TASK_PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; badgeClass: string }
> = {
  low: {
    label: "Baja",
    badgeClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200",
  },
  medium: {
    label: "Media",
    badgeClass: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-200",
  },
  high: {
    label: "Alta",
    badgeClass: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200",
  },
  urgent: {
    label: "Urgente",
    badgeClass: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-300 animate-pulse",
  },
}

export function matchAssignee(taskAssignee?: string | null, filterAssignee?: string): boolean {
  if (!filterAssignee || filterAssignee === "all") return true
  if (!taskAssignee) return false

  const taskLower = taskAssignee.trim().toLowerCase()
  const filterLower = filterAssignee.trim().toLowerCase()

  if (taskLower === filterLower) return true

  const taskUser = taskLower.includes("@") ? taskLower.split("@")[0] : taskLower
  const filterUser = filterLower.includes("@") ? filterLower.split("@")[0] : filterLower

  if (taskUser === filterUser) return true
  if (taskUser.includes(filterUser) || filterUser.includes(taskUser)) return true

  const aliasGroups = [
    ["christian", "christianmartinez", "christianmartinez3h"],
    ["cristian", "cristiaris", "cristiaris955", "cristian.arismendy"],
    ["daniel", "daniel.rodriguez", "daniel.rodriguez10"],
    ["jorge", "jorge_aris", "jorgealfred235"],
    ["fredy", "fredy.castillo", "fredy.castillo02"],
  ]

  for (const group of aliasGroups) {
    const filterInGroup = group.some((alias) => filterUser.includes(alias) || alias.includes(filterUser))
    const taskInGroup = group.some((alias) => taskUser.includes(alias) || alias.includes(taskUser))
    if (filterInGroup && taskInGroup) return true
  }

  return false
}
