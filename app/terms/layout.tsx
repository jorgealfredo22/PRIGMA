import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.com"

export const metadata: Metadata = {
  title: "Términos y Condiciones | PRIGMA",
  description: "Términos y condiciones de PRIGMA para servicios de desarrollo de software a medida. Procesos, pagos, propiedad intelectual y garantía.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}/terms`
  }
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
