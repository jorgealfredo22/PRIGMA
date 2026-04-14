import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  let response = NextResponse.json({ error: null }, { status: 200 })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.json({ error: null }, { status: 200 })
          cookiesToSet.forEach(({ name, value }) => {
            response.cookies.set(name, value)
          })
        },
      },
    },
  )

  await supabase.auth.signOut()

  return response
}