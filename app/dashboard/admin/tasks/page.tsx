import * as React from "react"
import { redirect } from "next/navigation"
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  CalendarDays,
  PlayCircle,
  AlertOctagon,
} from "lucide-react"

import { getCurrentUser } from "@/lib/auth"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { Card, CardContent } from "@/components/ui/card"
import { TasksTable } from "../_components/tasks-table"
import { TaskDialog } from "../_components/task-dialog"
import { SeedRoadmapButton } from "../_components/seed-roadmap-button"
import type { AdminTask } from "./types"

export const metadata = {
  title: "Gestión de Tareas | PRIGMA Admin",
  description: "Monitoreo, asignación y seguimiento de tareas del equipo y el roadmap de Prigmate.",
}

export default async function AdminTasksPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const supabase = createAdminSupabaseClient()

  const { data: rawTasks, error } = await supabase
    .from("admin_tasks")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error cargando tareas desde Supabase:", error.message)
  }

  const tasks: AdminTask[] = (rawTasks as AdminTask[]) ?? []

  // Calculate KPIs
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in_progress" || t.status === "in_review"
  ).length
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const blockedTasks = tasks.filter((t) => t.status === "blocked").length
  const totalDays = tasks.reduce(
    (acc, t) => acc + (Number(t.estimated_days) || 0),
    0
  )

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Gestión de Tareas
            </h1>
            <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
              Prigmate
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Monitorea, asigna y da seguimiento a las tareas del equipo y el roadmap técnico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SeedRoadmapButton />
          <TaskDialog />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Total Tasks */}
        <Card className="shadow-sm border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Tareas</p>
              <p className="text-xl font-bold tracking-tight mt-0.5">{totalTasks}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="shadow-sm border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Pendientes</p>
              <p className="text-xl font-bold tracking-tight mt-0.5">{pendingTasks}</p>
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="shadow-sm border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <PlayCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">En Curso</p>
              <p className="text-xl font-bold tracking-tight mt-0.5">{inProgressTasks}</p>
            </div>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="shadow-sm border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Completadas</p>
              <p className="text-xl font-bold tracking-tight mt-0.5">{completedTasks}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Effort (Days) */}
        <Card className="shadow-sm border col-span-2 sm:col-span-1">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Esfuerzo Total</p>
              <p className="text-xl font-bold tracking-tight mt-0.5">
                {totalDays.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">días</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tasks Table */}
      <TasksTable tasks={tasks} />
    </div>
  )
}
