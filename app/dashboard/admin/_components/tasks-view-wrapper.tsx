"use client"

import * as React from "react"
import { useState } from "react"
import {
  LayoutList,
  Kanban,
  Search,
  Filter,
  User,
  UserCheck,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { TasksTable } from "./tasks-table"
import { TasksKanban } from "./tasks-kanban"
import { TaskDialog } from "./task-dialog"
import { RoadmapDialog } from "./roadmap-dialog"
import type { AdminTask, TaskStatus } from "../tasks/types"
import { TASK_STATUS_CONFIG } from "../tasks/types"

interface TasksViewWrapperProps {
  tasks: AdminTask[]
  teamUsers: string[]
  currentUserEmail?: string
}

export function TasksViewWrapper({
  tasks,
  teamUsers,
  currentUserEmail,
}: TasksViewWrapperProps) {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("kanban")
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedAssignee, setSelectedAssignee] = useState("all")

  // Combine unique assignees from tasks and registered team users
  const allAssignees = React.useMemo(() => {
    const set = new Set<string>(teamUsers)
    tasks.forEach((t) => {
      if (t.assignee_name) set.add(t.assignee_name)
    })
    return Array.from(set).sort()
  }, [tasks, teamUsers])

  return (
    <div className="space-y-4">
      {/* Control Bar: View Switcher, Filters & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 bg-card border rounded-lg shadow-xs">
        {/* Left: View Mode Toggle & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-muted p-1 rounded-md border text-xs">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-medium transition-all ${
                viewMode === "kanban"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Kanban className="h-3.5 w-3.5 text-primary" />
              <span>Tablero (Trello)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-medium transition-all ${
                viewMode === "table"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutList className="h-3.5 w-3.5" />
              <span>Lista / Tabla</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar tareas o código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>

          {/* Assignee Filter */}
          <div className="w-44">
            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger className="h-8 text-xs">
                <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <SelectValue placeholder="Asignado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los asignados</SelectItem>
                {allAssignees.map((person) => (
                  <SelectItem key={person} value={person} className="text-xs">
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón rápido Mis Tareas */}
          {currentUserEmail && (
            <Button
              type="button"
              variant={selectedAssignee === currentUserEmail ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedAssignee(
                  selectedAssignee === currentUserEmail ? "all" : currentUserEmail
                )
              }}
              className={`h-8 text-xs gap-1.5 transition-all ${
                selectedAssignee === currentUserEmail
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
              title={`Filtrar solo tareas de ${currentUserEmail}`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Mis Tareas</span>
            </Button>
          )}

          {/* Status Filter (solo para vista tabla) */}
          {viewMode === "table" && (
            <div className="w-36">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-8 text-xs">
                  <Filter className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  {(Object.keys(TASK_STATUS_CONFIG) as TaskStatus[]).map((st) => (
                    <SelectItem key={st} value={st} className="text-xs">
                      {TASK_STATUS_CONFIG[st].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(search || selectedAssignee !== "all" || selectedStatus !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("")
                setSelectedAssignee("all")
                setSelectedStatus("all")
              }}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Limpiar
            </Button>
          )}
        </div>

        {/* Right: Actions (Roadmap & New Task) */}
        <div className="flex items-center gap-2 shrink-0">
          <RoadmapDialog />
          <TaskDialog teamUsers={teamUsers} />
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === "kanban" ? (
        <TasksKanban
          tasks={tasks}
          teamUsers={teamUsers}
          searchQuery={search}
          filterAssignee={selectedAssignee}
        />
      ) : (
        <TasksTable tasks={tasks} teamUsers={teamUsers} />
      )}
    </div>
  )
}
