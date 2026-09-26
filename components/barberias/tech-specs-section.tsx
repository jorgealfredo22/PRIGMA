"use client"

import { Cpu, ShieldCheck, Zap, Globe2, Smartphone, Database } from "lucide-react"

export default function TechSpecsSection() {
  const specs = [
    {
      icon: Zap,
      title: "Carga Ultrarrápida (<50ms)",
      desc: "Alojado en más de 300 ciudades del mundo a través de Cloudflare Edge. Abre al instante, incluso con conexión móvil 4G modesta.",
      badge: "Velocidad Pura"
    },
    {
      icon: Smartphone,
      title: "PWA (Instalable en 1 Clic)",
      desc: "Tanto tus barberos como tus clientes pueden agregarlo a la pantalla de inicio de su teléfono como una app nativa, sin ocupar espacio de memoria.",
      badge: "Sin App Store"
    },
    {
      icon: ShieldCheck,
      title: "99.9% Uptime Garantizado",
      desc: "Olvídate de servidores caídos los sábados al mediodía cuando tu local está lleno. Arquitectura sin servidor (Serverless) ultra-resiliente.",
      badge: "Alta Disponibilidad"
    },
    {
      icon: Database,
      title: "Tus Datos te Pertenecen",
      desc: "Base de datos privada con la lista completa de tus clientes, números de teléfono y frecuencias de visita para tus campañas de fidelización.",
      badge: "Propiedad Total"
    },
    {
      icon: Globe2,
      title: "Integración con Redes Sociales",
      desc: "Coloca tu enlace directo en el botón de reservar de Instagram, tu perfil de TikTok y tu ficha de Google Maps para recibir clientes orgánicos.",
      badge: "Más Clientes"
    },
    {
      icon: Cpu,
      title: "Soporte y Mantenimiento PRIGMA",
      desc: "Nosotros nos encargamos de las actualizaciones, seguridad, copias de seguridad y soporte técnico para que tú te dediques a cortar pelo.",
      badge: "Cero Preocupaciones"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gray-950/80 border-t border-gray-800/80">
      
      {/* Luz central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Infraestructura y Confiabilidad Enterprise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Construido con tecnología moderna,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              pensado para nunca fallar.
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            No usamos plantillas lentas ni sistemas pesados. Desarrollamos software a medida con los más altos estándares de rendimiento de la industria.
          </p>
        </div>

        {/* Grid de especificaciones */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, i) => {
            const Icon = spec.icon
            return (
              <div
                key={i}
                className="p-7 rounded-3xl bg-gray-900/50 border border-gray-800/80 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                    {spec.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{spec.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{spec.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
