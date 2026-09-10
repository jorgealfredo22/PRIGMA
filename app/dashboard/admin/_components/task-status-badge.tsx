"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  TASK_STATUS_CONFIG,
  TASK_PRIORITY_CONFIG,
  type TaskStatus,
  type TaskPriority,
} from "../tasks/types"
import {
  Circle,
  PlayCircle,
  Eye,
  CheckCircle2,
  AlertOctagon,
  Flame,
  ArrowUp,
  Minus,
  ArrowDown,
} from "lucide-react"

export function TaskStatusBadge({
  status,
  className,
}: {
  status: TaskStatus
  className?: string
}) {
  const config = TASK_STATUS_CONFIG[status] || TASK_STATUS_CONFIG.pending

  const getIcon = () => {
    switch (status) {
      case "in_progress":
        return <PlayCircle className="h-3 w-3 mr-1 text-blue-600 dark:text-blue-400" />
      case "in_review":
        return <Eye className="h-3 w-3 mr-1 text-purple-600 dark:text-purple-400" />
      case "completed":
        return <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400" />
      case "blocked":
        return <AlertOctagon className="h-3 w-3 mr-1 text-rose-600 dark:text-rose-400" />
      default:
        return <Circle className="h-3 w-3 mr-1 text-slate-500" />
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border inline-flex items-center px-2 py-0.5 text-xs transition-colors",
        config.badgeClass,
        className
      )}
    >
      {getIcon()}
      {config.label}
    </Badge>
  )
}

export function TaskPriorityBadge({
  priority,
  className,
}: {
  priority: TaskPriority
  className?: string
}) {
  const config = TASK_PRIORITY_CONFIG[priority] || TASK_PRIORITY_CONFIG.medium

  const getIcon = () => {
    switch (priority) {
      case "urgent":
        return <Flame className="h-3 w-3 mr-1 text-red-600 dark:text-red-400 fill-red-600/30" />
      case "high":
        return <ArrowUp className="h-3 w-3 mr-1 text-amber-600 dark:text-amber-400" />
      case "medium":
        return <Minus className="h-3 w-3 mr-1 text-sky-600 dark:text-sky-400" />
      case "low":
        return <ArrowDown className="h-3 w-3 mr-1 text-slate-500" />
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium border inline-flex items-center px-2 py-0.5 text-xs transition-colors",
        config.badgeClass,
        className
      )}
    >
      {getIcon()}
      {config.label}
    </Badge>
  )
}
