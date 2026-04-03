import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SchemaMarkup from "@/components/schema-markup"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.com"

export const metadata: Metadata = {
  title: {
    default: "PRIGMA — Desarrollo de Software a Medida en Colombia",
    template: "%s | PRIGMA"
  },
  description: "Desarrollo de software personalizado para empresas en Colombia. Apps web, móviles y sistemas ERP/CRM. Consultoría gratuita. +3 años de experiencia.",
  keywords: ["desarrollo de software", "software a medida", "desarrollo web", "aplicaciones móviles", "ERP", "CRM", "Colombia", "Sogamoso"],
  authors: [{ name: "PRIGMA", url: SITE_URL }],
  creator: "PRIGMA",
  publisher: "PRIGMA",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "PRIGMA — Desarrollo de Software a Medida",
    description: "Soluciones de software personalizadas para transformar tu negocio. Apps web, móviles y sistemas empresariales.",
    type: "website",
    locale: "es_CO",
    siteName: "PRIGMA",
    url: SITE_URL,
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  category: "technology"
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
