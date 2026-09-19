import "server-only"

import { randomUUID } from "node:crypto"
import {
  getTeamUsersWithContacts,
  updateUserTelegramMetadata,
  verifyInternalApiKey,
} from "@/lib/team-auth"

export const runtime = "nodejs"

interface LinkTelegramPayload {
  email_or_phone?: string
  identifier?: string
  telegram_chat_id: string | number
  telegram_username?: string
  name?: string
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
    const body = (await req.json().catch(() => null)) as LinkTelegramPayload | null

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

    const identifier = (body.email_or_phone || body.identifier || "").trim().toLowerCase()
    const rawChatId = body.telegram_chat_id
    const telegramUsername = body.telegram_username?.trim() || null
    const name = body.name?.trim() || null

    if (!identifier) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email o teléfono requerido ('email_or_phone' o 'identifier')",
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

    if (!rawChatId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Telegram chat ID requerido ('telegram_chat_id')",
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

    const teamUsers = await getTeamUsersWithContacts()

    const cleanIdentifier = identifier.replace(/[\s\-\(\)\+]/g, "")

    const matchedUser = teamUsers.find((u) => {
      const emailLower = u.email.toLowerCase()
      if (emailLower === identifier || emailLower.startsWith(identifier + "@")) {
        return true
      }
      if (u.phone_number) {
        const cleanUserPhone = u.phone_number.replace(/[\s\-\(\)\+]/g, "")
        if (cleanUserPhone === cleanIdentifier || cleanUserPhone.endsWith(cleanIdentifier)) {
          return true
        }
      }
      if (u.name.toLowerCase() === identifier) {
        return true
      }
      return false
    })

    if (!matchedUser) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `No se encontró ningún usuario con el identificador: ${identifier}`,
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

    await updateUserTelegramMetadata(matchedUser.id, {
      telegram_chat_id: String(rawChatId),
      telegram_username: telegramUsername || matchedUser.telegram_username,
      name: name || undefined,
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: `Usuario ${matchedUser.name} (${matchedUser.email}) vinculado correctamente con Telegram Chat ID ${rawChatId}`,
        data: {
          user_id: matchedUser.id,
          email: matchedUser.email,
          name: matchedUser.name,
          telegram_chat_id: String(rawChatId),
          telegram_username: telegramUsername || matchedUser.telegram_username,
        },
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
    console.error("[api/internal/users/link-telegram] Unexpected error:", err)
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
