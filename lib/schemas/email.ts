import { z } from "zod"

export const sendEmailSchema = z.object({
  senderName: z
    .string()
    .min(1, "El nombre del remitente es obligatorio"),
  senderEmail: z
    .string()
    .min(1, "El email del remitente es obligatorio")
    .email("Email inválido"),
  to: z
    .string()
    .min(1, "El destinatario es obligatorio")
    .email("Email inválido"),
  cc: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
  bcc: z
    .string()
    .email("Email inválido")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(1, "El asunto es obligatorio")
    .max(999, "El asunto es demasiado largo"),
  body: z
    .string()
    .min(1, "El mensaje es obligatorio")
    .max(100_000, "El mensaje es demasiado largo"),
})

export type SendEmailInput = z.infer<typeof sendEmailSchema>
