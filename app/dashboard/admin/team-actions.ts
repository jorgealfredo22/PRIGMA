"use server"

import "server-only"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import {
  getTeamUsersWithContacts,
  updateUserTelegramMetadata,
  type TeamUserContact,
} from "@/lib/team-auth"

export interface TeamActionResponse {
  success: boolean
  error?: string
  users?: TeamUserContact[]
  user?: TeamUserContact
}

/**
 * Returns all registered users in Supabase Auth with their contact metadata (phone, telegram_chat_id, telegram_username).
 */
export async function getTeamMembersAction(): Promise<TeamUserContact[]> {
  try {
    const user = await getCurrentUser()
    if (!user) return []

    return await getTeamUsersWithContacts()
  } catch (err) {
    console.error("[team-actions] Error fetching team members:", err)
    return []
  }
}

/**
 * Updates a user's contact information in Supabase Auth user_metadata.
 */
export async function updateTeamMemberContactAction(
  userId: string,
  data: {
    name?: string | null
    phone_number?: string | null
    telegram_chat_id?: string | number | null
    telegram_username?: string | null
  }
): Promise<TeamActionResponse> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "No autorizado. Inicia sesión como administrador." }
    }

    if (!userId || typeof userId !== "string") {
      return { success: false, error: "ID de usuario inválido o no especificado." }
    }

    // Clean data
    const cleanName = data.name !== undefined ? (data.name ? data.name.trim() : null) : undefined
    const cleanPhone =
      data.phone_number !== undefined
        ? data.phone_number
          ? data.phone_number.trim()
          : null
        : undefined
    const cleanChatId =
      data.telegram_chat_id !== undefined
        ? data.telegram_chat_id != null && String(data.telegram_chat_id).trim() !== ""
          ? String(data.telegram_chat_id).trim()
          : null
        : undefined
    const cleanUsername =
      data.telegram_username !== undefined
        ? data.telegram_username
          ? data.telegram_username.replace(/^@/, "").trim()
          : null
        : undefined

    await updateUserTelegramMetadata(userId, {
      name: cleanName,
      phone_number: cleanPhone,
      telegram_chat_id: cleanChatId,
      telegram_username: cleanUsername,
    })

    // Revalidate paths that display team/contact information
    revalidatePath("/dashboard/admin/team")
    revalidatePath("/dashboard/admin/tasks")
    revalidatePath("/dashboard/admin/overview")

    return { success: true }
  } catch (err) {
    console.error("[team-actions] Error updating team member contact:", err)
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado al actualizar el contacto.",
    }
  }
}
