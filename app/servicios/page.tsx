import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.com"

export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software | PRIGMA Colombia",
  description: "Desarrollo web, aplicaciones móviles, sistemas ERP/CRM, integración y soporte técnico. Software a medida para empresas en Colombia. Consultoría gratuita.",
  keywords: ["desarrollo web Colombia", "aplicaciones móviles", "ERP a medida", "CRM personalizado", "integración de sistemas", "soporte técnico software"],
  openGraph: {
    title: "Servicios | PRIGMA — Desarrollo de Software",
    description: "Desarrollo web, apps móviles, ERP/CRM y más. Soluciones a medida para tu negocio.",
    url: `${SITE_URL}/servicios`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/servicios`
  }
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <Image src="/images/prigma_logo_sin_fondo.png" alt="Logo PRIGMA - Desarrollo de Software a Medida" width={70} height={70} />
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></div>
              </div>
              <p className="text-xs ml-3 mt-1 text-gray-400 hidden sm:block tracking-wider">
                DESARROLLO DE SOFTWARE A MEDIDA
              </p>
            </Link>
            <Link href="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
              servicios
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Soluciones de software adaptadas a las necesidades reales de tu negocio. Desde una landing page hasta un sistema empresarial completo.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Desarrollo Web */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Desarrollo Web</h2>
              <p className="text-gray-300 mb-4">
                Aplicaciones web modernas y responsivas con React, Next.js y Node.js. Desde landing pages hasta plataformas complejas con autenticación, bases de datos y APIs.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Sitios web y landing pages
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Aplicaciones web interactivas
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  E-commerce y tiendas online
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  APIs REST y backend
                </li>
              </ul>
            </div>

            {/* Desarrollo Móvil */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Desarrollo Móvil</h2>
              <p className="text-gray-300 mb-4">
                Aplicaciones nativas y multiplataforma para iOS y Android. Llevamos tu negocio al bolsillo de tus clientes con apps intuitivas y de alto rendimiento.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Apps iOS y Android
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  React Native y Flutter
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Notificaciones push
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Integración con APIs externas
                </li>
              </ul>
            </div>

            {/* Sistemas Empresariales */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M9 21V3M15 21V3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Sistemas Empresariales</h2>
              <p className="text-gray-300 mb-4">
                ERP y CRM a medida para centralizar la gestión de tu empresa. Inventarios, ventas, clientes, reportes y más — todo en un solo lugar.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Gestión de inventarios
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  CRM y gestión de clientes
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Reportes y dashboards
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Facturación electrónica
                </li>
              </ul>
            </div>

            {/* Integración y Soporte */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12h.01M6 12h.01M12 6h.01M12 18h.01M4.93 4.93l.01.01M19.07 19.07l.01.01M4.93 19.07l.01-.01M19.07 4.93l.01-.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Integración y Soporte</h2>
              <p className="text-gray-300 mb-4">
                Conectamos tus herramientas y sistemas existentes. Además, ofrecemos soporte continuo para que todo funcione sin interrupciones.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  APIs y middleware
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Migración de datos
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Soporte técnico 24/7
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Mantenimiento preventivo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitás algo específico?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Si no encontrás lo que buscás, contactanos y te armamos una solución a medida.
          </p>
          <a
            href="/contacto"
            className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:translate-x-0 ease">
              <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Agendar consulta gratis
            </span>
            <span className="relative invisible">Agendar consulta gratis</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 py-8 border-t border-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} PRIGMA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
