// Browser-only crypto helpers for demos (ChildSimulator). Do not use in Node.

export function canonicalRequestString(input: {
  timestamp: number
  licenseKey: string
  method: string
  pathname: string
}): string {
  return `v1:${input.timestamp}:${input.licenseKey}:${input.method.toUpperCase()}:${input.pathname}`
}

export function canonicalResponseString(input: {
  timestamp: number
  licenseKey: string
  bodySha256Hex: string
}): string {
  return `v1:${input.timestamp}:${input.licenseKey}:response:${input.bodySha256Hex}`
}

function bytesToHexLower(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let out = ""
  for (const b of bytes) out += b.toString(16).padStart(2, "0")
  return out
}

export async function sha256HexUtf8(value: string): Promise<string> {
  const enc = new TextEncoder()
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(value))
  return bytesToHexLower(digest)
}

export async function hmacSha256Hex(
  secret: string,
  message: string,
): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message))
  return bytesToHexLower(sig)
}
