"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginState {
  error: string | null
  loading: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const [state, setState] = useState<LoginState>({ error: null, loading: false })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ error: null, loading: true })

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setState({ error: data.error ?? "Credenciales inválidas", loading: false })
        return
      }

      router.push("/dashboard/admin/overview")
      router.refresh()
    } catch {
      setState({ error: "Error de conexión. Intenta nuevamente.", loading: false })
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Prisma Admin</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@prigma.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <Button type="submit" disabled={state.loading}>
            {state.loading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </form>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
