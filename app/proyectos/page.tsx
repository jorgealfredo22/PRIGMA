import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.net"

export const metadata: Metadata = {
  title: "Proyectos y Portafolio | PRIGMA — Desarrollo de Software",
  description: "Conocé los proyectos que desarrollamos en PRIGMA. BarberPro: sistema de gestión para barberías. ShopFlow: plataforma de ventas online para pequeñas empresas.",
  keywords: ["portafolio PRIGMA", "proyectos desarrollo software", "casos de éxito software Colombia", "BarberPro", "ShopFlow"],
  openGraph: {
    title: "Proyectos y Portafolio | PRIGMA",
    description: "Conocé los proyectos que desarrollamos. Soluciones reales para negocios reales.",
    url: `${SITE_URL}/proyectos`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/proyectos`
  }
}

export default function ProyectosPage() {
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
            Proyectos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
              destacados
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Soluciones reales que transformaron negocios. Cada proyecto es único, adaptado a las necesidades específicas de nuestros clientes.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* BarberPro */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src="/uploads/mockup-all-framed.png"
                  alt="BarberPro - Sistema de gestión de citas para barberías"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  BarberPro
                </h2>
                <p className="text-gray-300 mb-4 text-sm">
                  Sistema de gestión de citas para barberías modernas. Permite administrar turnos, clientes y servicios de forma eficiente.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">EJS</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">JavaScript</span>
                </div>
                <a
                  href="https://barberia-elite-838bf.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <span>Ver producto</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* ShopFlow */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src="/uploads/mockup-all-framed(1).png"
                  alt="ShopFlow - Plataforma de ventas online para pequeñas empresas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  ShopFlow
                </h2>
                <p className="text-gray-300 mb-4 text-sm">
                  Plataforma de ventas online optimizada para pequeñas empresas. Gestión de productos, pedidos y pagos en un solo lugar.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">EJS</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">JavaScript</span>
                </div>
                <a
                  href="https://ramautolux-tienda.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <span>Ver producto</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Querés un proyecto como estos?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contanos tu idea y te armamos una solución a medida. La consulta inicial es gratuita.
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
