"use server"

import "server-only"

import { revalidatePath } from "next/cache"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { getCurrentUser } from "@/lib/auth"
import type { AdminTask, TaskStatus, TaskPriority, TaskFilters, ActionResponse } from "./types"

const VALID_STATUSES: TaskStatus[] = [
  "pending",
  "in_progress",
  "in_review",
  "completed",
  "blocked",
]

const VALID_PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"]

function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim()
}

// 1. Obtener tareas con filtros
export async function getTasksAction(filters?: TaskFilters): Promise<AdminTask[]> {
  try {
    const user = await getCurrentUser()
    if (!user) return []

    const supabase = createAdminSupabaseClient()
    let query = supabase.from("admin_tasks").select("*")

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status)
    }

    if (filters?.assignee && filters.assignee !== "all") {
      query = query.eq("assignee_name", filters.assignee)
    }

    if (filters?.project && filters.project !== "all") {
      query = query.eq("project", filters.project)
    }

    if (filters?.search) {
      const term = filters.search.trim()
      query = query.or(`title.ilike.%${term}%,task_code.ilike.%${term}%,assignee_name.ilike.%${term}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching tasks:", error.message)
      return []
    }

    return (data as AdminTask[]) ?? []
  } catch (err) {
    console.error("Unexpected error fetching tasks:", err)
    return []
  }
}

// 2. Crear tarea
export async function createTaskAction(formData: FormData): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    const title = getString(formData, "title")
    const assignee_name = getString(formData, "assignee_name")

    if (!title) return { success: false, error: "El título es obligatorio" }
    if (!assignee_name) return { success: false, error: "Debes asignar la tarea a una persona" }

    const task_code = getString(formData, "task_code") || `TSK-${Date.now().toString().slice(-4)}`
    const description = getString(formData, "description") || null
    const project = getString(formData, "project") || "Prigmate"

    const statusRaw = getString(formData, "status") as TaskStatus
    const status = VALID_STATUSES.includes(statusRaw) ? statusRaw : "pending"

    const priorityRaw = getString(formData, "priority") as TaskPriority
    const priority = VALID_PRIORITIES.includes(priorityRaw) ? priorityRaw : "medium"

    const daysRaw = parseFloat(getString(formData, "estimated_days") || "1")
    const estimated_days = isNaN(daysRaw) || daysRaw < 0 ? 1.0 : Number(daysRaw.toFixed(1))

    const dueDateRaw = getString(formData, "due_date")
    const due_date = dueDateRaw && /^\d{4}-\d{2}-\d{2}$/.test(dueDateRaw) ? dueDateRaw : null

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase.from("admin_tasks").insert({
      task_code: task_code.toUpperCase(),
      title,
      description,
      project,
      assignee_name,
      status,
      priority,
      estimated_days,
      due_date,
    })

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al crear la tarea",
    }
  }
}

// 3. Actualizar estado inline (rápido desde la tabla)
export async function updateTaskStatusAction(
  id: string,
  status: TaskStatus
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    if (!VALID_STATUSES.includes(status)) {
      return { success: false, error: "Estado no válido" }
    }

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase
      .from("admin_tasks")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al actualizar estado",
    }
  }
}

// 4. Actualizar tarea completa
export async function updateTaskAction(
  id: string,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    const title = getString(formData, "title")
    const assignee_name = getString(formData, "assignee_name")

    if (!title) return { success: false, error: "El título es obligatorio" }
    if (!assignee_name) return { success: false, error: "Debes asignar la tarea a una persona" }

    const task_code = getString(formData, "task_code") || null
    const description = getString(formData, "description") || null
    const project = getString(formData, "project") || "Prigmate"

    const statusRaw = getString(formData, "status") as TaskStatus
    const status = VALID_STATUSES.includes(statusRaw) ? statusRaw : "pending"

    const priorityRaw = getString(formData, "priority") as TaskPriority
    const priority = VALID_PRIORITIES.includes(priorityRaw) ? priorityRaw : "medium"

    const daysRaw = parseFloat(getString(formData, "estimated_days") || "1")
    const estimated_days = isNaN(daysRaw) || daysRaw < 0 ? 1.0 : Number(daysRaw.toFixed(1))

    const dueDateRaw = getString(formData, "due_date")
    const due_date = dueDateRaw && /^\d{4}-\d{2}-\d{2}$/.test(dueDateRaw) ? dueDateRaw : null

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase
      .from("admin_tasks")
      .update({
        task_code: task_code ? task_code.toUpperCase() : undefined,
        title,
        description,
        project,
        assignee_name,
        status,
        priority,
        estimated_days,
        due_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al actualizar la tarea",
    }
  }
}

// 5. Eliminar tarea
export async function deleteTaskAction(id: string): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase.from("admin_tasks").delete().eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al eliminar la tarea",
    }
  }
}

// 6. Semilla Idempotente del Roadmap de Prigmate
export async function seedPrigmateTasksAction(): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    const initialTasks = [
      { task_code: "BE-01", title: "Controlador y Servicio de SLA en Rails", description: "Reincorporar sla_policies_controller.rb y conectar listeners de cálculo de tiempos.", project: "Prigmate", assignee_name: "Backend Developer", status: "pending", priority: "high", estimated_days: 2.0 },
      { task_code: "BE-02", title: "Motor de Roles Personalizados", description: "Crear modelo CustomRole, migración de permisos y políticas Pundit.", project: "Prigmate", assignee_name: "Backend Developer", status: "pending", priority: "high", estimated_days: 3.0 },
      { task_code: "BE-03", title: "Servicio de Triage IA (Ai::TriageService)", description: "Servicio con LLM y JSON estructurado para clasificación y handoff a humanos.", project: "Prigmate", assignee_name: "Backend Developer", status: "pending", priority: "urgent", estimated_days: 3.0 },
      { task_code: "BE-04", title: "Feature Flags en SuperAdmin", description: "Toggles en base de datos para encender/apagar módulos por cuenta.", project: "Prigmate", assignee_name: "Backend Developer", status: "pending", priority: "medium", estimated_days: 1.0 },
      { task_code: "FE-01", title: "Vista de Configuración de Triage IA", description: "Pantalla en Ajustes -> Agente IA para configurar intenciones y reglas de asignación.", project: "Prigmate", assignee_name: "Frontend Developer", status: "pending", priority: "urgent", estimated_days: 3.0 },
      { task_code: "FE-02", title: "Pantalla de Roles y Permisos", description: "Interfaz en Ajustes -> Roles con tabla de permisos por rol.", project: "Prigmate", assignee_name: "Frontend Developer", status: "pending", priority: "high", estimated_days: 2.0 },
      { task_code: "FE-03", title: "Habilitación de Vistas de SLA", description: "Conectar componentes existentes en barra lateral y panel de Informes.", project: "Prigmate", assignee_name: "Frontend Developer", status: "pending", priority: "medium", estimated_days: 1.0 },
      { task_code: "FE-04", title: "Selector Visual de Plantillas WhatsApp", description: "Modal interactivo en caja de chat para previsualizar plantillas aprobadas.", project: "Prigmate", assignee_name: "Frontend Developer", status: "pending", priority: "medium", estimated_days: 2.0 },
      { task_code: "AI-01", title: "Diseño de Metaprompt de Clasificación", description: "Prompt de sistema con Few-Shot y salida estricta en JSON Schema.", project: "Prigmate", assignee_name: "AI Engineer", status: "pending", priority: "urgent", estimated_days: 1.0 },
      { task_code: "AI-02", title: "Detección de Frustración y Handoff", description: "Reglas semánticas para transferir inmediatamente ante quejas.", project: "Prigmate", assignee_name: "AI Engineer", status: "pending", priority: "high", estimated_days: 1.0 },
      { task_code: "AI-03", title: "Plantilla de Resumen para Agentes", description: "Formato conciso de nota interna (3 líneas) al momento del handoff.", project: "Prigmate", assignee_name: "AI Engineer", status: "pending", priority: "medium", estimated_days: 1.0 },
      { task_code: "QA-01", title: "Pruebas de Flujo Completo de Triage", description: "Simular conversaciones en WhatsApp y Webchat verificando asignaciones y notas.", project: "Prigmate", assignee_name: "QA Tester", status: "pending", priority: "high", estimated_days: 2.0 },
      { task_code: "QA-02", title: "Pruebas de Permisos de Roles", description: "Validar que agentes restringidos no puedan exportar contactos.", project: "Prigmate", assignee_name: "QA Tester", status: "pending", priority: "high", estimated_days: 1.0 },
      { task_code: "QA-03", title: "Configuración de Variables en Docker", description: "Variables de entorno de OpenAI/Gemini y Feature Flags en producción.", project: "Prigmate", assignee_name: "DevOps / Christian", status: "pending", priority: "medium", estimated_days: 1.0 }
    ]

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase
      .from("admin_tasks")
      .upsert(initialTasks, { onConflict: "task_code", ignoreDuplicates: true })

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true, count: initialTasks.length }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al precargar el roadmap",
    }
  }
}

// 7. Obtener correos de los usuarios registrados en Supabase Auth
export async function getTeamUsersAction(): Promise<string[]> {
  try {
    const user = await getCurrentUser()
    if (!user) return []

    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error("Error listing users:", error.message)
      return []
    }

    const emails = data?.users
      ?.map((u) => u.email)
      .filter((e): e is string => Boolean(e)) ?? []

    return Array.from(new Set(emails)).sort()
  } catch (err) {
    console.error("Error fetching team users:", err)
    return []
  }
}

// 8. Actualizar asignado inline (rápido con 1 clic)
export async function updateTaskAssigneeAction(
  id: string,
  assignee_name: string
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    const name = assignee_name.trim()
    if (!name) return { success: false, error: "El nombre o correo del asignado es obligatorio" }

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase
      .from("admin_tasks")
      .update({
        assignee_name: name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al reasignar la tarea",
    }
  }
}

// 9. Importar o Reemplazar Roadmap Completo (desde texto o JSON)
export async function importCustomRoadmapAction(params: {
  tasks: Array<{
    task_code: string
    title: string
    description?: string | null
    assignee_name?: string
    priority?: string
    estimated_days?: number
    status?: string
    project?: string
  }>
  mode: "merge" | "replace"
  project?: string
}): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: "No autorizado" }

    if (!Array.isArray(params.tasks) || params.tasks.length === 0) {
      return { success: false, error: "No se proporcionaron tareas válidas para importar" }
    }

    const supabase = createAdminSupabaseClient()
    const targetProject = params.project?.trim() || "Prigmate"

    // If replace mode, remove existing tasks for that project
    if (params.mode === "replace") {
      const { error: delErr } = await supabase
        .from("admin_tasks")
        .delete()
        .eq("project", targetProject)

      if (delErr) throw new Error(`Error limpiando tareas anteriores: ${delErr.message}`)
    }

    // Format tasks for insert/upsert
    const formatted = params.tasks.map((t, index) => {
      const task_code = (t.task_code?.trim() || `TSK-${index + 1}`).toUpperCase()
      const title = t.title?.trim() || `Tarea ${task_code}`
      const status = VALID_STATUSES.includes(t.status as TaskStatus) ? t.status : "pending"
      const priority = VALID_PRIORITIES.includes(t.priority as TaskPriority) ? t.priority : "medium"
      const estimated_days = t.estimated_days && Number(t.estimated_days) > 0 ? Number(t.estimated_days) : 1.0

      return {
        task_code,
        title,
        description: t.description?.trim() || null,
        project: targetProject,
        assignee_name: t.assignee_name?.trim() || "Christian",
        status,
        priority,
        estimated_days,
        updated_at: new Date().toISOString(),
      }
    })

    const { error: insErr } = await supabase
      .from("admin_tasks")
      .upsert(formatted, { onConflict: "task_code" })

    if (insErr) throw new Error(`Error al guardar tareas: ${insErr.message}`)

    revalidatePath("/dashboard/admin/tasks")
    return { success: true, count: formatted.length }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al importar el roadmap",
    }
  }
}
