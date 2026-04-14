import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value }) => {
            response.cookies.set(name, value)
          })
        },
      },
    },
  )

  const { pathname } = request.nextUrl

  // Protect /dashboard/admin routes with Supabase session
  if (pathname.startsWith("/dashboard/admin")) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("error", "session_expired")
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect to overview if authenticated user visits /login
  if (pathname === "/login") {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return NextResponse.redirect(new URL("/dashboard/admin/overview", request.url))
    }
  }

  // Refresh the auth session if needed
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}