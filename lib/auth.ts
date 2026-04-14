import "server-only"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getCurrentUser() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // Read-only for session check
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  return user
}