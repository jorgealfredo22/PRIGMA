import Link from "next/link"

import ChildSimulator from "./_components/ChildSimulator"

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-semibold">Dashboard (Publico)</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Esta pagina es intencionalmente publica y contiene solo documentacion + un simulador demo de
        app hija.
      </p>

      <section className="mt-6 grid gap-4 rounded-md border p-4">
        <h2 className="text-xl font-semibold">Modelo de Seguridad</h2>
        <p className="text-sm">
          La key de service-role en produccion puede hacer escrituras privilegiadas en la base.
          Por eso, NO exponemos ningun CRUD de admin en una ruta publica.
        </p>
        <p className="text-sm">
          El UI de admin vive en <code>/dashboard/admin</code> y requiere un guard simple por token
          via query param, validado contra <code>DASHBOARD_TOKEN</code>. Si falta o es invalido, la
          ruta devuelve 404.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="#verify-docs">
            Ir a docs de /api/license/verify
          </Link>
          <Link className="underline" href="#child-simulator">
            Ir al simulador de app hija
          </Link>
          <a className="underline" href="/dashboard/admin?token=YOUR_DASHBOARD_TOKEN">
            Admin (requiere token)
          </a>
        </div>
      </section>

      <section id="verify-docs" className="mt-10">
        <h2 className="text-2xl font-semibold">Endpoint: GET /api/license/verify</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Endpoint de verificacion de licencia usado por apps hijas. Request y response estan firmados
          con HMAC. Los secretos son por licencia: el secreto HMAC es el propio <code>license_key</code>.
        </p>

        <h3 className="mt-6 text-lg font-semibold">Solicitud (Request)</h3>
        <p className="mt-2 text-sm">Headers (todos requeridos):</p>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`x-license-key: <license_key>
x-timestamp: <unix_seconds>
x-signature: <lowercase_hex_hmac_sha256>`}</pre>

        <p className="mt-4 text-sm">Canonical request string (exacto):</p>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`v1:{timestamp}:{licenseKey}:{method}:{pathname}

Ejemplos:
v1:1700000000:lk_123:GET:/api/license/verify`}</pre>

        <p className="mt-4 text-sm">Firma del request:</p>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`signature = HMAC_SHA256_HEX(secret=licenseKey, message=canonical_request_string)`}</pre>

        <h3 className="mt-6 text-lg font-semibold">Reglas Anti-Replay</h3>
        <p className="mt-2 text-sm">
          El servidor valida <code>x-timestamp</code> contra su hora actual con una ventana de +/- 5
          minutos. Requests fuera de la ventana se rechazan con 401.
        </p>

        <h3 className="mt-6 text-lg font-semibold">Respuesta (Response)</h3>
        <p className="mt-2 text-sm">Headers de response:</p>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`x-timestamp: <server_unix_seconds>
x-signature: <lowercase_hex_hmac_sha256>
content-type: application/json`}</pre>

        <p className="mt-4 text-sm">Canonical response string (exacto):</p>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`v1:{timestamp}:{licenseKey}:response:{sha256(body)}`}</pre>

        <p className="mt-4 text-sm">Pasos para verificar la firma del response:</p>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`1) Lee los bytes del body exactamente como se recibieron.
2) body_hash = SHA256_HEX_UTF8(body)
3) canonical = v1:{x-timestamp}:{licenseKey}:response:{body_hash}
4) expected = HMAC_SHA256_HEX(secret=licenseKey, message=canonical)
5) Compara expected vs x-signature (hex sin diferenciar mayus/minus).`}</pre>

        <h3 className="mt-6 text-lg font-semibold">Ejemplo (pseudo)</h3>
        <pre className="mt-2 overflow-auto rounded-md border bg-background p-3 text-xs">{`# Debes calcular x-signature vos.
curl -sS -D - \\
  -H "x-license-key: lk_123" \\
  -H "x-timestamp: 1700000000" \\
  -H "x-signature: <hmac_hex>" \\
  "https://your-domain.com/api/license/verify"`}</pre>

        <p className="mt-4 text-sm text-muted-foreground">
          Nota: Este endpoint devuelve 401 para license keys desconocidas, firmas invalidas o timestamps
          invalidos.
        </p>
      </section>

      <section className="mt-10 grid gap-3 rounded-md border p-4">
        <h2 className="text-xl font-semibold">Como usar el simulador de app hija</h2>
        <ol className="list-decimal pl-6 text-sm">
          <li>
            Obtene un <code>license_key</code> desde el admin: entra a <code>/dashboard/admin</code>
            con <code>?token=...</code> (igual a <code>DASHBOARD_TOKEN</code>), crea un cliente y
            despues crea una licencia. El servidor genera el <code>license_key</code>.
          </li>
          <li>
            Pega ese <code>license_key</code> en el input del simulador y hace click en "Login de
            admin" para ejecutar <code>GET /api/license/verify</code> con HMAC.
          </li>
          <li>
            “Simular mother unreachable” saltea el <code>fetch</code> y aumenta un contador local
            <code>offlineDays</code> para probar el gating por <code>grace_days_connection</code> (cuando
            se pasa, <code>blocked</code> queda <code>true</code>).
          </li>
          <li>
            El estado del simulador se persiste en <code>localStorage</code> bajo la key
            <code>prigma.child_sim.v1</code>.
          </li>
        </ol>
      </section>

      <div className="mt-10">
        <ChildSimulator />
      </div>
    </main>
  )
}
