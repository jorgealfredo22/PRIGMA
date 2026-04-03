import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.com"

export const metadata: Metadata = {
  title: "Contacto | PRIGMA — Desarrollo de Software a Medida",
  description: "Contactá a PRIGMA para una consulta gratuita sobre tu proyecto de software. WhatsApp, email o teléfono. Estamos en Sogamoso, Colombia.",
  keywords: ["contacto PRIGMA", "consulta desarrollo software", "presupuesto software Colombia"],
  openGraph: {
    title: "Contacto | PRIGMA",
    description: "Consultá gratis sobre tu proyecto de software. Te respondemos al toque.",
    url: `${SITE_URL}/contacto`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/contacto`
  }
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
