import "server-only"

import { randomUUID } from "node:crypto"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import {
  getTeamUsersWithContacts,
  findTeamUserByAssignee,
  verifyInternalApiKey,
} from "@/lib/team-auth"
import type { AdminTask, TaskStatus } from "@/app/dashboard/admin/tasks/types"

export const runtime = "nodejs"

const DEFAULT_PENDING_STATUSES: TaskStatus[] = ["pending", "in_progress", "in_review"]

export async function GET(req: Request): Promise<Response> {
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
    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get("status")?.trim()
    const assigneeParam = searchParams.get("assignee")?.trim()
    const projectParam = searchParams.get("project")?.trim()
    const priorityParam = searchParams.get("priority")?.trim()
    const limitParam = searchParams.get("limit")?.trim()
    const offsetParam = searchParams.get("offset")?.trim()

    const supabase = createAdminSupabaseClient()
    let query = supabase.from("admin_tasks").select("*")

    // Status filter
    if (statusParam && statusParam.toLowerCase() !== "all") {
      if (statusParam.includes(",")) {
        const statuses = statusParam
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean)
        query = query.in("status", statuses)
      } else {
        query = query.eq("status", statusParam.toLowerCase())
      }
    } else if (!statusParam) {
      // Default: only active/pending statuses
      query = query.in("status", DEFAULT_PENDING_STATUSES)
    }

    // Project filter
    if (projectParam && projectParam.toLowerCase() !== "all") {
      query = query.eq("project", projectParam)
    }

    // Priority filter
    if (priorityParam && priorityParam.toLowerCase() !== "all") {
      query = query.eq("priority", priorityParam.toLowerCase())
    }

    // Assignee filter (exact match if possible at DB level, else in-memory match)
    if (assigneeParam && assigneeParam.toLowerCase() !== "all") {
      query = query.ilike("assignee_name", `%${assigneeParam}%`)
    }

    // Order by priority / due_date / created_at
    query = query.order("created_at", { ascending: true })

    if (limitParam && !isNaN(Number(limitParam))) {
      const limit = Math.max(1, parseInt(limitParam, 10))
      const offset = offsetParam && !isNaN(Number(offsetParam)) ? Math.max(0, parseInt(offsetParam, 10)) : 0
      query = query.range(offset, offset + limit - 1)
    }

    const { data: rawTasks, error: tasksError } = await query

    if (tasksError) {
      console.error("[api/internal/tasks/pending] DB query error:", tasksError.message)
      return new Response(
        JSON.stringify({
          success: false,
          error: `Database error: ${tasksError.message}`,
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

    const tasks = (rawTasks ?? []) as AdminTask[]

    // Fetch team users contacts to attach to tasks
    const teamUsers = await getTeamUsersWithContacts()

    const tasksWithContacts = tasks.map((task) => {
      const contact = findTeamUserByAssignee(task.assignee_name, teamUsers)
      return {
        ...task,
        assignee_contact: contact
          ? {
              user_id: contact.id,
              email: contact.email,
              name: contact.name,
              phone_number: contact.phone_number,
              telegram_chat_id: contact.telegram_chat_id,
              telegram_username: contact.telegram_username,
            }
          : {
              user_id: null,
              email: null,
              name: task.assignee_name,
              phone_number: null,
              telegram_chat_id: null,
              telegram_username: null,
            },
      }
    })

    return new Response(
      JSON.stringify({
        success: true,
        count: tasksWithContacts.length,
        data: tasksWithContacts,
        tasks: tasksWithContacts,
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
    console.error("[api/internal/tasks/pending] Unexpected error:", err)
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
