"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Key, CheckCircle, XCircle, Clock, Loader2, Copy, Check } from "lucide-react"
import CryptoJS from "crypto-js"

interface SimulatorState {
  licenseKey: string
  offlineDays: number
  blocked: boolean
  lastVerifyResponse: VerifyResponseData | null
  lastRequestData: RequestDebugData | null
  isVerifying: boolean
  showRawData: boolean
  errorMessage: string | null
}

interface VerifyResponseData {
  status: string
  plan: string
  grace_days: number
  grace_days_connection: number
  expires_at_ymd: string | null
  grace_ends_ymd: string | null
  server_time: number
  timestamp: string
  rawJson: string
}

interface RequestDebugData {
  url: string
  headers: Record<string, string>
  canonicalString: string
  signature: string
}

const GRACE_DAYS_DEFAULT = 5
const GRACE_DAYS_CONNECTION_DEFAULT = 3
const VERIFY_PATHNAME = "/api/license/verify"

// HMAC-SHA256 using crypto-js (browser compatible)
function hmacSha256(secret: string, message: string): string {
  return CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex)
}

function buildVerifyRequest(licenseKey: string): { url: string; headers: Record<string, string>; canonical: string; signature: string } {
  const timestamp = Math.floor(Date.now() / 1000)
  const method = "GET"
  
  const canonicalString = `v1:${timestamp}:${licenseKey}:${method.toUpperCase()}:${VERIFY_PATHNAME}`
  const signature = hmacSha256(licenseKey, canonicalString)
  
  const url = `${window.location.origin}${VERIFY_PATHNAME}`
  
  const headers: Record<string, string> = {
    "x-license-key": licenseKey,
    "x-timestamp": String(timestamp),
    "x-signature": signature,
  }
  
  return { url, headers, canonical: canonicalString, signature }
}

export default function DocsPage() {
  const [state, setState] = useState<SimulatorState>({
    licenseKey: "",
    offlineDays: 0,
    blocked: false,
    lastVerifyResponse: null,
    lastRequestData: null,
    isVerifying: false,
    showRawData: false,
    errorMessage: null,
  })

  async function handleVerify() {
    if (!state.licenseKey.trim()) {
      toast.error("Ingresa una license key")
      return
    }

    setState((s) => ({ ...s, isVerifying: true, errorMessage: null }))

    try {
      // Build real request
      const { url, headers, canonical, signature } = buildVerifyRequest(state.licenseKey)
      
      const requestData: RequestDebugData = {
        url,
        headers,
        canonicalString: canonical,
        signature,
      }

      // Make REAL API call
      const response = await fetch(url, { headers })
      const responseText = await response.text()
      const data = response.ok ? JSON.parse(responseText) : null

      let blocked = false
      let verifyResponse: VerifyResponseData | null = null

      if (response.ok && data) {
        blocked = data.status !== "active" && data.status !== "trial"
        
        verifyResponse = {
          status: data.status,
          plan: data.plan,
          grace_days: data.grace_days,
          grace_days_connection: data.grace_days_connection,
          expires_at_ymd: data.expires_at_ymd,
          grace_ends_ymd: data.grace_ends_ymd,
          server_time: data.server_time,
          timestamp: new Date().toISOString(),
          rawJson: JSON.stringify(data, null, 2),
        }
      } else {
        setState((s) => ({
          ...s,
          isVerifying: false,
          errorMessage: `Error ${response.status}: ${responseText}`,
          lastRequestData: requestData,
          showRawData: true,
        }))
        toast.error(`Error ${response.status}`)
        return
      }

      setState((s) => ({
        ...s,
        isVerifying: false,
        blocked,
        lastVerifyResponse: verifyResponse,
        lastRequestData: requestData,
        showRawData: true,
      }))

      if (blocked) {
        toast.error(`Licencia bloqueada - Status: ${verifyResponse.status}`)
      } else {
        toast.success(`Licencia ${verifyResponse.status}`)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setState((s) => ({
        ...s,
        isVerifying: false,
        errorMessage: message,
      }))
      toast.error(message)
    }
  }

  function simulateOffline() {
    setState((s) => ({
      ...s,
      offlineDays: s.offlineDays + 1,
    }))
    toast.info(`Día sin conexión simulado: ${state.offlineDays + 1}`)
    // Note: This is just for display - the real API handles this based on actual time
  }

  function resetOffline() {
    setState((s) => ({
      ...s,
      offlineDays: 0,
      blocked: false,
    }))
    toast.success("Contador reiniciado")
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    toast.success("Copiado al portapapeles")
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
            Prueba el comportamiento de una app hija ante distintos escenarios. Realiza llamadas HTTP reales al endpoint de verificación.
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

          {/* Real-time Status */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-md border bg-muted/50">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge
                variant={state.blocked ? "destructive" : "default"}
                className="mt-1"
              >
                {state.lastVerifyResponse?.status ?? "—"}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Plan</p>
              <p className="text-2xl font-semibold">{state.lastVerifyResponse?.plan ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expires</p>
              <p className="text-lg font-semibold font-mono">{state.lastVerifyResponse?.expires_at_ymd ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Grace Ends</p>
              <p className="text-lg font-semibold font-mono">{state.lastVerifyResponse?.grace_ends_ymd ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Grace Days</p>
              <p className="text-lg font-semibold">{state.lastVerifyResponse?.grace_days ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Grace Days Connection</p>
              <p className="text-lg font-semibold">{state.lastVerifyResponse?.grace_days_connection ?? "—"}</p>
            </div>
          </div>

          {state.errorMessage && (
            <div className="p-4 rounded-md border bg-red-950 border-red-700 text-red-300">
              <p className="font-semibold">Error:</p>
              <p className="text-sm font-mono">{state.errorMessage}</p>
            </div>
          )}

          {/* Request/Response Debug */}
          {state.showRawData && state.lastRequestData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Datos de Request/Response</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setState((s) => ({ ...s, showRawData: !s.showRawData }))}
                >
                  {state.showRawData ? "Ocultar" : "Mostrar"}
                </Button>
              </div>

              {state.showRawData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Request */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-xs font-semibold">REQUEST</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard(JSON.stringify(state.lastRequestData, null, 2))}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 text-xs font-mono space-y-2 bg-black/20">
                      <div>
                        <span className="text-muted-foreground">URL:</span>
                        <pre className="text-foreground mt-1 whitespace-pre-wrap break-all">{state.lastRequestData.url}</pre>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Headers:</span>
                        <pre className="text-foreground mt-1 whitespace-pre-wrap break-all">
{JSON.stringify(state.lastRequestData.headers, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Canonical String:</span>
                        <pre className="text-foreground mt-1 break-all">{state.lastRequestData.canonicalString}</pre>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Signature:</span>
                        <pre className="text-foreground mt-1 break-all">{state.lastRequestData.signature}</pre>
                      </div>
                    </div>
                  </div>

                  {/* Response */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted px-3 py-2 border-b flex items-center justify-between">
                      <span className="text-xs font-semibold">RESPONSE</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => state.lastVerifyResponse && copyToClipboard(state.lastVerifyResponse.rawJson)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <pre className="p-3 text-xs font-mono bg-black/20 overflow-auto max-h-64">
                      {state.lastVerifyResponse?.rawJson ?? "—"}
                    </pre>
                  </div>
                </div>
              )}
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
                Verificar que el llamado HTTP sea <strong>REAL</strong> - se muestra el request completo y la respuesta del servidor.
              </li>
              <li>
                El status se determina en el servidor según las reglas de negocio de <code className="text-indigo-100 font-mono">computeLicenseStatus()</code>.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
