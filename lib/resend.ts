import "server-only"
import { Resend } from "resend"

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env.local — see .env.example"
    )
  }
  return new Resend(apiKey)
}

export interface SendEmailParams {
  from: string
  to: string
  subject: string
  html: string
  cc?: string
  bcc?: string
  replyTo?: string
}

export async function sendEmail(params: SendEmailParams) {
  const resend = getResendClient()

  const { data, error } = await resend.emails.send({
    from: params.from,
    to: [params.to],
    subject: params.subject,
    html: params.html,
    ...(params.cc ? { cc: [params.cc] } : {}),
    ...(params.bcc ? { bcc: [params.bcc] } : {}),
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
