"use client"

import { Cpu, ShieldCheck, Zap, Database, Smartphone, Flame } from "lucide-react"

export default function EcommerceTechSpecs() {
  const specs = [
    {
      icon: Zap,
      title: "Velocidad Extrema en el Edge",
      desc: "Desplegado sobre Cloudflare Edge con OpenNext. Abre en menos de 1 segundo sin importar la cantidad de productos en catálogo.",
      badge: "<1s Carga"
    },
    {
      icon: Database,
      title: "Base de Datos Supabase en Vivo",
      desc: "Inventario sincronizado de forma instantánea. Si una prenda o repuesto se vende en el mostrador físico, se descuenta de la web de inmediato.",
      badge: "Realtime"
    },
    {
      icon: Flame,
      title: "Resistente a Días Pico (Black Friday)",
      desc: "Arquitectura Serverless escalable. Soporta picos masivos de visitantes concurrentes en días de promociones o campañas publicitarias.",
      badge: "Cero Caídas"
    },
    {
      icon: Smartphone,
      title: "PWA y Experiencia Móvil Fluida",
      desc: "Más del 80% de las compras en Colombia se hacen desde smartphones. Optimizada para convertir desde Instagram, TikTok y Google.",
      badge: "Mobile First"
    },
    {
      icon: ShieldCheck,
      title: "Seguridad y Encriptación Total",
      desc: "Conexión cifrada SSL de grado bancario, protección contra ataques DDoS y pasarelas con cumplimiento estricto PCI-DSS.",
      badge: "Seguridad Bancaria"
    },
    {
      icon: Cpu,
      title: "Acompañamiento y Soporte PRIGMA",
      desc: "No te dejamos solo con un tutorial. Nosotros realizamos la configuración inicial, actualizaciones y soporte técnico continuo.",
      badge: "Soporte Dedicado"
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
            <span>Infraestructura Enterprise Moderna</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Tecnología de última generación,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              lista para escalar tus ventas.
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Olvídate de plugins lentos que rompen tu página o tiendas que se caen en fechas especiales.
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
