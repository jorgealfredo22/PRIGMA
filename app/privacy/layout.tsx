import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.net"

export const metadata: Metadata = {
  title: "Política de Privacidad | PRIGMA",
  description: "Política de privacidad de PRIGMA. Información sobre cómo recopilamos, usamos y protegemos tus datos personales según la Ley 1581 de 2012 de Colombia.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}/privacy`
  }
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
