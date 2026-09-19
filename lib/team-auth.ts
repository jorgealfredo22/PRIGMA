import "server-only"

import { createAdminSupabaseClient } from "./supabase/admin"
import { matchAssignee } from "../app/dashboard/admin/tasks/types"

export interface TeamUserContact {
  id: string
  email: string
  name: string
  phone_number: string | null
  telegram_chat_id: string | null
  telegram_username: string | null
  metadata: Record<string, unknown>
}

/**
 * Lists all users from Supabase Auth (auth.users) and extracts/normalizes contact metadata.
 */
export async function getTeamUsersWithContacts(): Promise<TeamUserContact[]> {
  try {
    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    })

    if (error) {
      console.error("[team-auth] Error listing auth users:", error.message)
      return []
    }

    const users = data?.users ?? []

    return users.map((user) => {
      const meta = (user.user_metadata ?? {}) as Record<string, unknown>
      const appMeta = (user.app_metadata ?? {}) as Record<string, unknown>

      const phone_number =
        (meta.phone_number as string | undefined) ??
        (meta.phone as string | undefined) ??
        user.phone ??
        null

      const rawChatId =
        meta.telegram_chat_id ??
        meta.telegramChatId ??
        meta.chat_id ??
        appMeta.telegram_chat_id ??
        null

      const telegram_chat_id = rawChatId != null ? String(rawChatId).trim() : null

      const rawTgUsername =
        (meta.telegram_username as string | undefined) ??
        (meta.telegramUsername as string | undefined) ??
        (meta.telegram_user as string | undefined) ??
        null

      const telegram_username = rawTgUsername
        ? String(rawTgUsername).replace(/^@/, "").trim()
        : null

      const name =
        (meta.full_name as string | undefined) ??
        (meta.name as string | undefined) ??
        (meta.display_name as string | undefined) ??
        (user.email ? user.email.split("@")[0] : "Usuario")

      return {
        id: user.id,
        email: user.email ?? "",
        name: String(name).trim(),
        phone_number: phone_number ? String(phone_number).trim() : null,
        telegram_chat_id: telegram_chat_id || null,
        telegram_username: telegram_username || null,
        metadata: meta,
      }
    })
  } catch (err) {
    console.error("[team-auth] Unexpected error in getTeamUsersWithContacts:", err)
    return []
  }
}

/**
 * Finds the contact information of a team user matching a given task assignee name or email.
 */
export function findTeamUserByAssignee(
  assigneeName: string,
  teamUsers: TeamUserContact[]
): TeamUserContact | null {
  if (!assigneeName || teamUsers.length === 0) return null

  const target = assigneeName.trim().toLowerCase()
  const cleanTarget = target.replace(/^@/, "")

  // 1. Direct email match
  const exactEmail = teamUsers.find(
    (u) => u.email.toLowerCase() === target
  )
  if (exactEmail) return exactEmail

  // 2. Direct name match
  const exactName = teamUsers.find(
    (u) => u.name.toLowerCase() === target
  )
  if (exactName) return exactName

  // 3. Telegram username match
  const exactTg = teamUsers.find(
    (u) => u.telegram_username && u.telegram_username.toLowerCase() === cleanTarget
  )
  if (exactTg) return exactTg

  // 4. Match prefix of email before @
  const emailPrefixMatch = teamUsers.find((u) => {
    const userPrefix = u.email ? u.email.split("@")[0].toLowerCase() : ""
    return userPrefix === target || userPrefix === cleanTarget
  })
  if (emailPrefixMatch) return emailPrefixMatch

  // 5. Fuzzy match using matchAssignee logic from admin tasks
  const fuzzy = teamUsers.find((u) => {
    return (
      matchAssignee(assigneeName, u.email) ||
      matchAssignee(assigneeName, u.name)
    )
  })
  if (fuzzy) return fuzzy

  return null
}

/**
 * Updates a user's contact metadata (telegram_chat_id, telegram_username, phone_number) in auth.users.
 */
export async function updateUserTelegramMetadata(
  userId: string,
  contactData: {
    name?: string | null
    telegram_chat_id?: string | number | null
    telegram_username?: string | null
    phone_number?: string | null
  }
) {
  const supabase = createAdminSupabaseClient()

  // Retrieve current user metadata
  const { data: userData, error: fetchErr } = await supabase.auth.admin.getUserById(userId)
  if (fetchErr || !userData.user) {
    throw new Error(`User not found: ${fetchErr?.message ?? userId}`)
  }

  const currentMeta = userData.user.user_metadata ?? {}
  const updatedMeta: Record<string, unknown> = {
    ...currentMeta,
  }

  if (contactData.telegram_chat_id !== undefined) {
    updatedMeta.telegram_chat_id =
      contactData.telegram_chat_id != null ? String(contactData.telegram_chat_id).trim() : null
  }

  if (contactData.telegram_username !== undefined) {
    updatedMeta.telegram_username = contactData.telegram_username
      ? String(contactData.telegram_username).replace(/^@/, "").trim()
      : null
  }

  if (contactData.phone_number !== undefined) {
    updatedMeta.phone_number = contactData.phone_number
      ? String(contactData.phone_number).trim()
      : null
  }

  if (contactData.name !== undefined) {
    const cleanName = contactData.name ? String(contactData.name).trim() : null
    if (cleanName) {
      updatedMeta.name = cleanName
      updatedMeta.full_name = cleanName
    }
  }

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: updatedMeta,
  })

  if (error) {
    throw new Error(`Failed to update user contact metadata: ${error.message}`)
  }

  return data.user
}

/**
 * Validates internal API key against environment variables:
 * 1. PRIGMA_INTERNAL_API_KEY
 * 2. INTERNAL_API_KEY (fallback)
 * 3. SUPABASE_SERVICE_ROLE_KEY (fallback for internal system calls)
 */
export function verifyInternalApiKey(req: Request): boolean {
  const headerKey =
    req.headers.get("x-api-key")?.trim() ??
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim()

  if (!headerKey) return false

  const configuredKey =
    process.env.PRIGMA_INTERNAL_API_KEY?.trim() ||
    process.env.INTERNAL_API_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!configuredKey) return false

  return headerKey === configuredKey
}
