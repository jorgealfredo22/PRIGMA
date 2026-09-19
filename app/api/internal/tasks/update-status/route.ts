import "server-only"

import { randomUUID } from "node:crypto"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { verifyInternalApiKey } from "@/lib/team-auth"
import type { TaskStatus, AdminTask } from "@/app/dashboard/admin/tasks/types"

export const runtime = "nodejs"

const VALID_STATUSES: TaskStatus[] = [
  "pending",
  "in_progress",
  "in_review",
  "completed",
  "blocked",
]

interface UpdateStatusPayload {
  task_id?: string
  id?: string
  task_code?: string
  status: TaskStatus
  note?: string
  updated_by?: string
}

export async function POST(req: Request): Promise<Response> {
  const requestId = randomUUID()

  // 1. Validate API Key
  if (!verifyInternalApiKey(req)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Unauthorized: Invalid or missing x-api-key",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "X-Request-Id": requestId,
        },
      }
    )
  }

  try {
    const body = (await req.json().catch(() => null)) as UpdateStatusPayload | null

    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid JSON request body",
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "X-Request-Id": requestId,
          },
        }
      )
    }

    const taskId = body.task_id?.trim() || body.id?.trim()
    const taskCode = body.task_code?.trim()
    const newStatus = body.status?.trim() as TaskStatus
    const note = body.note?.trim() || null
    const updatedBy = body.updated_by?.trim() || "system-internal"

    if (!taskId && !taskCode) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Either 'id'/'task_id' or 'task_code' must be provided",
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "X-Request-Id": requestId,
          },
        }
      )
    }

    if (!newStatus || !VALID_STATUSES.includes(newStatus)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid status '${newStatus}'. Allowed: ${VALID_STATUSES.join(", ")}`,
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "X-Request-Id": requestId,
          },
        }
      )
    }

    const supabase = createAdminSupabaseClient()

    // 2. Fetch existing task first to confirm existence and get previous status
    let findQuery = supabase.from("admin_tasks").select("*")
    if (taskId) {
      findQuery = findQuery.eq("id", taskId)
    } else if (taskCode) {
      findQuery = findQuery.ilike("task_code", taskCode)
    }

    const { data: existingTasks, error: findError } = await findQuery.limit(1)

    if (findError) {
      console.error("[api/internal/tasks/update-status] Find error:", findError.message)
      return new Response(
        JSON.stringify({
          success: false,
          error: `Database lookup error: ${findError.message}`,
        }),
        {
          status: 500,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "X-Request-Id": requestId,
          },
        }
      )
    }

    const currentTask = existingTasks?.[0] as AdminTask | undefined
    if (!currentTask) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Task not found with identifier: ${taskId || taskCode}`,
        }),
        {
          status: 404,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "X-Request-Id": requestId,
          },
        }
      )
    }

    const previousStatus = currentTask.status
    const updatedAt = new Date().toISOString()

    // 3. Update task status
    const { data: updatedData, error: updateError } = await supabase
      .from("admin_tasks")
      .update({
        status: newStatus,
        updated_at: updatedAt,
      })
      .eq("id", currentTask.id)
      .select("*")
      .single()

    if (updateError) {
      console.error("[api/internal/tasks/update-status] Update error:", updateError.message)
      return new Response(
        JSON.stringify({
          success: false,
          error: `Database update error: ${updateError.message}`,
        }),
        {
          status: 500,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "X-Request-Id": requestId,
          },
        }
      )
    }

    // 4. Build audit/log details
    const auditLog = {
      timestamp: updatedAt,
      task_id: currentTask.id,
      task_code: currentTask.task_code,
      title: currentTask.title,
      from_status: previousStatus,
      to_status: newStatus,
      updated_by: updatedBy,
      note,
    }

    console.log(
      `[TASK_STATUS_UPDATE] [${auditLog.timestamp}] Task ${auditLog.task_code} (${auditLog.task_id}) changed status from '${auditLog.from_status}' to '${auditLog.to_status}' by '${auditLog.updated_by}'. Note: ${auditLog.note ?? "N/A"}`
    )

    return new Response(
      JSON.stringify({
        success: true,
        message: `Task ${currentTask.task_code} status successfully updated to ${newStatus}`,
        data: updatedData,
        task: updatedData,
        log: auditLog,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "X-Request-Id": requestId,
        },
      }
    )
  } catch (err) {
    console.error("[api/internal/tasks/update-status] Unexpected error:", err)
    return new Response(
      JSON.stringify({
        success: false,
        error: err instanceof Error ? err.message : "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "X-Request-Id": requestId,
        },
      }
    )
  }
}
