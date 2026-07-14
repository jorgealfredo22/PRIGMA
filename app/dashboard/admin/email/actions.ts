"use server"

import "server-only"

import { sendEmail, type SendEmailParams } from "@/lib/resend"
import { sendEmailSchema } from "@/lib/schemas/email"

function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim()
}

export interface SendEmailResult {
  success: boolean
  error?: string
  data?: { id: string }
}

export async function sendEmailAction(
  formData: FormData
): Promise<SendEmailResult> {
  try {
    const raw = {
      senderName: getString(formData, "senderName"),
      senderEmail: getString(formData, "senderEmail"),
      to: getString(formData, "to"),
      cc: getString(formData, "cc"),
      bcc: getString(formData, "bcc"),
      subject: getString(formData, "subject"),
      body: getString(formData, "body"),
    }

    const parsed = sendEmailSchema.safeParse(raw)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos"
      return { success: false, error: firstError }
    }

    const { senderName, senderEmail, to, cc, bcc, subject, body } = parsed.data

    // Convert plain text to simple HTML (preserve line breaks)
    const html = body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>")

    const emailParams: SendEmailParams = {
      from: `${senderName} <${senderEmail}>`,
      to,
      subject,
      html,
      ...(cc ? { cc } : {}),
      ...(bcc ? { bcc } : {}),
    }

    const data = await sendEmail(emailParams)

    return { success: true, data: { id: data?.id ?? "" } }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Error desconocido al enviar"
    return { success: false, error: message }
  }
}
