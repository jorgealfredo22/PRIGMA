import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.net"

export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software a Medida",
  description: "Desarrollo web, aplicaciones móviles, sistemas ERP/CRM, integración de APIs y soporte técnico. Soluciones de software personalizadas para empresas en Colombia.",
  keywords: ["desarrollo web Colombia", "aplicaciones móviles", "sistemas ERP", "CRM a medida", "integración de sistemas", "soporte técnico software"],
  openGraph: {
    title: "Servicios de Desarrollo de Software a Medida",
    description: "Desarrollo web, apps móviles, ERP/CRM, integración y soporte. Soluciones a medida para empresas colombianas.",
    url: `${SITE_URL}/servicios`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/servicios`
  }
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
