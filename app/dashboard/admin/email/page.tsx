import type { Metadata } from "next"
import { Mail } from "lucide-react"

import { EmailCompose } from "../_components/email-compose"
import { SenderNameManager } from "../_components/sender-name-manager"
import { getSenderNamesAction } from "./sender-actions"

export const metadata: Metadata = {
  title: "Correo | PRIGMA Admin",
  description: "Enviar correo electrónico desde PRIGMA",
}

export default async function EmailPage() {
  const senderNames = await getSenderNamesAction()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Correo</h1>
          <p className="text-sm text-muted-foreground">
            Enviá correos directamente desde el panel
          </p>
        </div>
      </div>

      <EmailCompose />

      {/* Sender name management */}
      <div className="max-w-3xl mx-auto">
        <SenderNameManager senderNames={senderNames} />
      </div>
    </div>
  )
}
