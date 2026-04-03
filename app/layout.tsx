import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SchemaMarkup from "@/components/schema-markup"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "PRIGMA — Desarrollo de Software a Medida en Colombia",
    template: "%s | PRIGMA"
  },
  description: "Desarrollo de software personalizado para empresas en Colombia. Apps web, móviles y sistemas ERP/CRM. Consultoría gratuita. +3 años de experiencia.",
  keywords: ["desarrollo de software", "software a medida", "desarrollo web", "aplicaciones móviles", "ERP", "CRM", "Colombia", "Sogamoso"],
  authors: [{ name: "PRIGMA", url: "https://prigma.com" }],
  openGraph: {
    title: "PRIGMA — Desarrollo de Software a Medida",
    description: "Soluciones de software personalizadas para transformar tu negocio. Apps web, móviles y sistemas empresariales.",
    type: "website",
    locale: "es_CO",
    siteName: "PRIGMA",
    images: [
      {
        url: "/uploads/mockup-all-framed.png",
        width: 1200,
        height: 630,
        alt: "PRIGMA - Desarrollo de Software a Medida"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIGMA — Desarrollo de Software a Medida",
    description: "Soluciones de software personalizadas para transformar tu negocio."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // google: "tu-codigo-de-verificacion"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <SchemaMarkup />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
