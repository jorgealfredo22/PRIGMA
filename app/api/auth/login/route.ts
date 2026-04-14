import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email y contraseña son requeridos" },
      { status: 400 }
    )
  }

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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    )
  }

  return response
}