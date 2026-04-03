import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.com"

export const metadata: Metadata = {
  title: "Rangos de Precios | PRIGMA — Desarrollo de Software",
  description: "Rangos orientativos de precios para desarrollo de software a medida. Desde $2M COP para sitios web simples. Contactanos para un presupuesto personalizado.",
  keywords: ["precios desarrollo software Colombia", "costo desarrollo web", "cuanto cuesta una app", "presupuesto software a medida"],
  openGraph: {
    title: "Rangos de Precios | PRIGMA",
    description: "Rangos orientativos para desarrollo web, apps y sistemas empresariales. Presupuesto sin compromiso.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/pricing`
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
