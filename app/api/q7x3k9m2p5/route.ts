import "server-only"

import { randomUUID } from "node:crypto"

import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function GET(_req: Request): Promise<Response> {
  const requestId = randomUUID()

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(
      JSON.stringify({ error: "server_misconfigured", ok: false }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "X-Request-Id": requestId,
        },
      },
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })

  const { error } = await supabase.from("licenses").select("id", { count: "exact", head: true }).limit(1)

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message, ok: false }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "X-Request-Id": requestId,
        },
      },
    )
  }

  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "X-Request-Id": requestId,
        "cache-control": "no-store",
      },
    },
  )
}
