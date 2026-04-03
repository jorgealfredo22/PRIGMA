import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  <img src="/images/prigma_logo_sin_fondo.png" alt="logo prigma" style={{ width: '70px', height: '70px' }} />
                </h1>
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
            Planes y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
              precios
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Cada proyecto es único. Estos son nuestros rangos de precios orientativos. Contactanos para un presupuesto personalizado.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-400 text-sm mb-6">Landing pages y sitios web simples</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Desde $2M</span>
                <span className="text-gray-400 text-sm ml-1">COP</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Diseño responsivo
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Hasta 5 páginas
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  SEO básico
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Formulario de contacto
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Entrega en 2-4 semanas
                </li>
              </ul>
              <a
                href="/contacto"
                className="block text-center px-6 py-3 border-2 border-purple-500 text-white font-medium rounded-full hover:bg-purple-500/10 transition-all duration-300"
              >
                Solicitar presupuesto
              </a>
            </div>

            {/* Professional */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-2 border-purple-500/50 rounded-xl p-8 relative shadow-xl shadow-purple-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full">
                MÁS POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <p className="text-gray-400 text-sm mb-6">Apps web y sistemas de gestión</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Desde $5M</span>
                <span className="text-gray-400 text-sm ml-1">COP</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Todo del plan Starter
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Base de datos y autenticación
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Panel de administración
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  API REST
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Soporte 3 meses incluido
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Entrega en 4-8 semanas
                </li>
              </ul>
              <a
                href="/contacto"
                className="block text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Solicitar presupuesto
              </a>
            </div>

            {/* Enterprise */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-400 text-sm mb-6">Sistemas ERP, CRM y apps móviles</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">A medida</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Todo del plan Professional
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Arquitectura escalable
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Integraciones externas
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Soporte prioritario 6 meses
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Plazo según complejidad
                </li>
              </ul>
              <a
                href="/contacto"
                className="block text-center px-6 py-3 border-2 border-purple-500 text-white font-medium rounded-full hover:bg-purple-500/10 transition-all duration-300"
              >
                Contactar ventas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 py-8 border-t border-gray-800/50 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} PRIGMA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
