"use client"

import { useState } from "react"
import { Palette, Sparkles, Check, Globe, RefreshCw, Scissors } from "lucide-react"

interface ThemePreset {
  id: string
  name: string
  primaryColor: string
  accentColor: string
  bgGrad: string
  buttonClass: string
  badgeClass: string
  tag: string
}

const PRESETS: ThemePreset[] = [
  {
    id: "purple",
    name: "PRIGMA Neon",
    primaryColor: "#8a5cf6",
    accentColor: "#6366f1",
    bgGrad: "from-purple-950/40 to-indigo-950/40",
    buttonClass: "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    tag: "Moderna & Elegante"
  },
  {
    id: "gold",
    name: "Golden Vintage",
    primaryColor: "#f59e0b",
    accentColor: "#d97706",
    bgGrad: "from-amber-950/40 to-yellow-950/40",
    buttonClass: "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-900/40",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    tag: "Clásica & Caballero"
  },
  {
    id: "emerald",
    name: "Cyber Emerald",
    primaryColor: "#10b981",
    accentColor: "#059669",
    bgGrad: "from-emerald-950/40 to-teal-950/40",
    buttonClass: "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-900/40",
    badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    tag: "Fresca & Urbana"
  },
  {
    id: "blue",
    name: "Royal Navy",
    primaryColor: "#3b82f6",
    accentColor: "#2563eb",
    bgGrad: "from-blue-950/40 to-indigo-950/40",
    buttonClass: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40",
    badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    tag: "Corporativa & Premium"
  }
]

export default function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(PRESETS[0])
  const [shopName, setShopName] = useState("IMPERIO BARBER CLUB")

  return (
    <section id="personalizacion" className="py-24 relative overflow-hidden bg-gray-950">
      
      {/* Luz difusa */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: activeTheme.primaryColor }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Palette className="w-3.5 h-3.5" />
            <span>Personalización y Versatilidad Total</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Tu logo, tus colores y tu dominio:{" "}
            <span 
              className="transition-colors duration-500"
              style={{ color: activeTheme.primaryColor }}
            >
              100% exclusivo para vos.
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            No te metemos en un directorio con tu competencia. Te entregamos una página web propia con la identidad visual que hace única a tu barbería.
          </p>
        </div>

        {/* Simulador Interactivo */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-gray-900/50 border border-gray-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          
          {/* Panel de Controles (Izquierda) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Nombre de tu Barbería:
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Escribe el nombre de tu barbería..."
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700/80 text-white text-sm font-semibold focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Elegí una paleta o estilo de barbería:
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActiveTheme(preset)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      activeTheme.id === preset.id
                        ? "bg-gray-950 border-white/60 shadow-lg scale-[1.02]"
                        : "bg-gray-950/50 border-gray-800 hover:border-gray-700 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: preset.primaryColor }}
                      />
                      <span className="text-xs font-bold text-white">{preset.name}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{preset.tag}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-semibold">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Tu Enlace Oficial:</span>
              </div>
              <p className="text-xs font-mono text-gray-400 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                https://citas.{shopName.toLowerCase().replace(/[^a-z0-9]/g, "") || "tubarberia"}.com
              </p>
              <p className="text-[11px] text-gray-500">
                Configuramos tu subdominio o dominio propio con certificado SSL de máxima seguridad.
              </p>
            </div>

          </div>

          {/* Vista Previa en Vivo Adaptativa (Derecha) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-gray-950 border border-gray-800 p-6 sm:p-8 shadow-2xl transition-all duration-500 overflow-hidden">
              
              {/* Header simulado de la web personalizada */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white transition-colors duration-500 shadow-md"
                    style={{ backgroundColor: activeTheme.primaryColor }}
                  >
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                      {shopName || "MI BARBERÍA"}
                    </h4>
                    <p className="text-[10px] text-gray-400">Sistema Oficial de Reservas</p>
                  </div>
                </div>

                <span 
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold border transition-all duration-500 ${activeTheme.badgeClass}`}
                >
                  Abierto Hoy
                </span>
              </div>

              {/* Contenido de la web personalizada */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-300 font-semibold">
                  <span>Seleccionar servicio preferido:</span>
                  <span className="text-[11px] text-gray-500">3 barberos disponibles</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: "Corte Degradado + Lavado & Peinado", time: "45 min", price: "$35.000" },
                    { name: "Afeitado Clásico con Toalla Caliente", time: "30 min", price: "$25.000" },
                    { name: "Perfilado de Cejas & Exfoliación Facial", time: "20 min", price: "$18.000" }
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{service.name}</p>
                        <p className="text-[10px] text-gray-400">{service.time} · Incluye bebida</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-white block">{service.price}</span>
                        <span 
                          className="text-[10px] font-semibold transition-colors duration-500"
                          style={{ color: activeTheme.primaryColor }}
                        >
                          Elegir hora →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón de Reserva con el color activo */}
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-500 shadow-lg ${activeTheme.buttonClass}`}
                >
                  Agendar Mi Turno en {shopName || "Mi Barbería"}
                </button>
              </div>

              {/* Watermark de confianza */}
              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-[10px] text-gray-500">
                <span>⚡ Tecnología Cloudflare Edge</span>
                <span>Desarrollado y Alojado por PRIGMA</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
