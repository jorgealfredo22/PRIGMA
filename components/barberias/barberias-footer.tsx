import Link from "next/link"
import Image from "next/image"

export default function BarberiasFooter() {
  return (
    <footer className="relative z-10 bg-gray-950 pt-16 pb-8 border-t border-gray-850">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/prigma_logo_sin_fondo.png"
                  alt="PRIGMA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                PRIGMA
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              Soluciones de software de alto impacto para negocios y empresas. Creadores de Barber Pro, la plataforma definitiva de agendamiento y gestión para barberías.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Demo en Vivo</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">Paneles por Rol</a></li>
              <li><a href="#whatsapp" className="hover:text-white transition-colors">Automatización WhatsApp</a></li>
              <li><a href="#personalizacion" className="hover:text-white transition-colors">Tu Marca</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">Contacto PRIGMA</h4>
            <p className="text-sm text-gray-400 mb-2">Sogamoso, Boyacá, Colombia</p>
            <p className="text-sm text-gray-400 mb-4">Soporte oficial y desarrollo a medida.</p>
            <a
              href="https://wa.me/573105741639"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-purple-200"
            >
              <span>Hablar con un asesor →</span>
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} PRIGMA Tech. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Términos</Link>
            <Link href="/" className="hover:text-gray-400 transition-colors">Inicio PRIGMA</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
