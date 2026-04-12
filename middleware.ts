import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const DASHBOARD_ADMIN_COOKIE = "prigma_dashboard_token";

export async function middleware(request: NextRequest) {
  // Minimal opaque admin auth: allow one-time ?token=... bootstrap into an httpOnly cookie.
  if (request.nextUrl.pathname === "/dashboard/admin") {
    const token = request.nextUrl.searchParams.get("token") ?? "";
    if (token && token === (process.env.DASHBOARD_TOKEN ?? "")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.searchParams.delete("token");

      const res = NextResponse.redirect(redirectUrl);
      res.cookies.set(DASHBOARD_ADMIN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/dashboard/admin",
      });
      return res;
    }
  }

  // Important: supabase auth relies on cookie reads/writes.
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Update both request and response cookies so downstream handlers see the refreshed session.
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Refresh the auth session if needed.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
