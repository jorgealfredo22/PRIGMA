"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Key, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"

interface SimulatorState {
  licenseKey: string
  offlineDays: number
  blocked: boolean
  lastVerifyResponse: {
    success: boolean
    message: string
    blocked: boolean
    offlineDays: number
    timestamp: string
  } | null
  isVerifying: boolean
}

const GRACE_DAYS_DEFAULT = 5
const GRACE_DAYS_CONNECTION_DEFAULT = 3

export default function DocsPage() {
  const [state, setState] = useState<SimulatorState>({
    licenseKey: "",
    offlineDays: 0,
    blocked: false,
    lastVerifyResponse: null,
    isVerifying: false,
  })

  async function handleVerify() {
    if (!state.licenseKey.trim()) {
      toast.error("Ingresa una license key")
      return
    }

    setState((s) => ({ ...s, isVerifying: true }))

    // Simulate network request
    await new Promise((r) => setTimeout(r, 800))

    // Simulate mother app verification (mocked - no real fetch)
    const graceDaysConnection = GRACE_DAYS_CONNECTION_DEFAULT
    const blocked = state.offlineDays >= graceDaysConnection

    const response = {
      success: true,
      message: blocked ? "Licencia bloqueada" : "Licencia válida",
      blocked,
      offlineDays: state.offlineDays,
      timestamp: new Date().toISOString(),
    }

    setState((s) => ({
      ...s,
      isVerifying: false,
      blocked,
      lastVerifyResponse: response,
    }))

    if (blocked) {
      toast.error("Licencia bloqueada - excedió días de gracia de conexión")
    } else {
      toast.success("Licencia válida")
    }
  }

  function simulateOffline() {
    setState((s) => ({
      ...s,
      offlineDays: s.offlineDays + 1,
    }))
    toast.info(`Día sin conexión: ${state.offlineDays + 1}`)
  }

  function resetOffline() {
    setState((s) => ({
      ...s,
      offlineDays: 0,
      blocked: false,
    }))
    toast.success("Contador de días sin conexión reiniciado")
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Documentación del Sistema de Licencias</h1>
        <p className="text-muted-foreground">
          Guía técnica y simulador para integración con apps hijas.
        </p>
      </div>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Endpoint: GET /api/license/verify
          </CardTitle>
          <CardDescription>
            Endpoint de verificación de licencia usado por apps hijas. Request y response están firmados
            con HMAC.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Solicitud (Headers requeridos)</h3>
            <pre className="p-3 rounded-md border bg-muted text-sm overflow-x-auto">{`x-license-key: <license_key>
x-timestamp: <unix_seconds>
x-signature: <lowercase_hex_hmac_sha256>`}</pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Canonical Request String</h3>
            <pre className="p-3 rounded-md border bg-muted text-sm overflow-x-auto">{`v1:{timestamp}:{licenseKey}:{method}:{pathname}

Ejemplo:
v1:1700000000:lk_abc123:GET:/api/license/verify`}</pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Firma del Request</h3>
            <pre className="p-3 rounded-md border bg-muted text-sm overflow-x-auto">{`signature = HMAC_SHA256_HEX(secret=licenseKey, message=canonical_request_string)`}</pre>
          </div>

          <div className="bg-amber-950 border-amber-700 rounded-md p-4 text-amber-100">
            <h4 className="font-semibold text-amber-200 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Reglas Anti-Replay
            </h4>
            <p className="text-sm text-amber-300 mt-1">
              El servidor valida <code className="text-amber-200 font-mono">x-timestamp</code> contra su hora actual con una ventana de ±5
              minutos. Requests fuera de la ventana se rechazan con 401.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Respuesta (Headers)</h3>
            <pre className="p-3 rounded-md border bg-muted text-sm overflow-x-auto">{`x-timestamp: <server_unix_seconds>
x-signature: <lowercase_hex_hmac_sha256>
content-type: application/json`}</pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Verificación de Respuesta</h3>
            <pre className="p-3 rounded-md border bg-muted text-sm overflow-x-auto">{`1. Leer body exactamente como se recibió
2. body_hash = SHA256_HEX_UTF8(body)
3. canonical = v1:{x-timestamp}:{licenseKey}:response:{body_hash}
4. expected = HMAC_SHA256_HEX(secret=licenseKey, message=canonical)
5. Comparar expected vs x-signature`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Child Simulator */}
      <Card>
        <CardHeader>
          <CardTitle>Simulador de App Hija</CardTitle>
          <CardDescription>
            Prueba el comportamiento de una app hija ante distintos escenarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="lk_abc123..."
              value={state.licenseKey}
              onChange={(e) =>
                setState((s) => ({ ...s, licenseKey: e.target.value }))
              }
              className="flex-1 font-mono"
            />
            <Button onClick={handleVerify} disabled={state.isVerifying}>
              {state.isVerifying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verificar Licencia"
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={simulateOffline}
              disabled={state.blocked}
              className="text-amber-600 border-amber-500 bg-amber-950 hover:bg-amber-800 hover:text-amber-100"
            >
              +1 Día sin conexión
            </Button>
            <Button
              variant="outline"
              onClick={resetOffline}
              className="text-emerald-600 border-emerald-500 bg-emerald-950 hover:bg-emerald-800 hover:text-emerald-100"
            >
              Reiniciar contador
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-md border bg-muted/50">
            <div>
              <p className="text-xs text-muted-foreground">Días sin conexión</p>
              <p className="text-2xl font-semibold">{state.offlineDays}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gracia conexión</p>
              <p className="text-2xl font-semibold">{GRACE_DAYS_CONNECTION_DEFAULT}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gracia vencimiento</p>
              <p className="text-2xl font-semibold">{GRACE_DAYS_DEFAULT}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estado</p>
              <Badge
                variant={state.blocked ? "destructive" : "default"}
                className="mt-1"
              >
                {state.blocked ? "Bloqueada" : "Activa"}
              </Badge>
            </div>
          </div>

          {state.lastVerifyResponse && (
            <div
              className={`p-4 rounded-md border ${
                state.lastVerifyResponse.blocked
                  ? "bg-red-950 border-red-700"
                  : "bg-emerald-950 border-emerald-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {state.lastVerifyResponse.blocked ? (
                  <XCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                )}
                <span className={`font-semibold ${state.lastVerifyResponse.blocked ? "text-red-300" : "text-emerald-300"}`}>
                  {state.lastVerifyResponse.message}
                </span>
              </div>
              <p className="text-sm mt-1 text-muted-foreground">
                Timestamp: {state.lastVerifyResponse.timestamp}
              </p>
            </div>
          )}

          <div className="bg-indigo-950 border-indigo-700 rounded-md p-4">
            <h4 className="font-semibold text-indigo-300">Cómo usar el simulador</h4>
            <ol className="list-decimal pl-5 text-sm text-indigo-200 mt-2 space-y-1">
              <li>
                Obtener un <code className="text-indigo-100 font-mono">license_key</code> desde el admin: crear un cliente y luego una licencia.
              </li>
              <li>
                Ingresar el <code className="text-indigo-100 font-mono">license_key</code> en el input y hacer click en &quot;Verificar Licencia&quot;.
              </li>
              <li>
                Presionar &quot;+1 Día sin conexión&quot; para simular desconexiones y probar{" "}
                <code className="text-indigo-100 font-mono">grace_days_connection</code>.
              </li>
              <li>
                El estado se muestra en tiempo real. Si se excede el límite de gracia, la licencia se
                bloquea.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
