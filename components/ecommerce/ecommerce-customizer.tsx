"use client"

import { useState } from "react"
import { Palette, Sparkles, Globe, ShoppingBag, Check } from "lucide-react"

interface IndustryPreset {
  id: string
  name: string
  businessName: string
  color: string
  tagline: string
  icon: string
  sampleProducts: { name: string; price: string; meta: string; icon: string }[]
}

const PRESETS: IndustryPreset[] = [
  {
    id: "tech",
    name: "Tecnología & Reparación",
    businessName: "SERVICELL STORE & LAB",
    color: "#3b82f6",
    tagline: "Venta de smartphones, accesorios y servicio técnico especializado",
    icon: "📱",
    sampleProducts: [
      { name: "Cargador Carga Rápida 45W", price: "$65.000", meta: "USB-C · Original", icon: "🔌" },
      { name: "Audífonos Inalámbricos ANC", price: "$149.000", meta: "Bluetooth 5.3 · Cancelación Ruido", icon: "🎧" },
      { name: "Servicio: Cambio Pantalla OLED", price: "$180.000", meta: "Repuesto Grado A+ · Garantía 6 meses", icon: "🛠️" }
    ]
  },
  {
    id: "fashion",
    name: "Moda & Calzado Urbano",
    businessName: "URBAN DROP BOUTIQUE",
    color: "#8a5cf6",
    tagline: "Streetwear, calzado exclusivo y accesorios de temporada",
    icon: "👟",
    sampleProducts: [
      { name: "Hoodie Oversized Heavy Cotton", price: "$120.000", meta: "Talla L · Color Negro Washed", icon: "👕" },
      { name: "Zapatillas Retro Low Court", price: "$235.000", meta: "Tallas 38 a 43 · Cuero Sintético", icon: "👟" },
      { name: "Gorra Snapback Premium", price: "$55.000", meta: "Bordado 3D · Ajustable", icon: "🧢" }
    ]
  },
  {
    id: "supplements",
    name: "Salud & Suplementación",
    businessName: "VITAMINAS PARA TI",
    color: "#10b981",
    tagline: "Proteínas, creatinas, vitaminas y rendimiento deportivo",
    icon: "🌿",
    sampleProducts: [
      { name: "Proteína Whey Isolate 2 lbs", price: "$145.000", meta: "27g proteína por porción", icon: "🥛" },
      { name: "Creatina Monohidratada 300g", price: "$85.000", meta: "100% Pura Creapure", icon: "⚡" },
      { name: "Multivitamínico Complejo B + Zinc", price: "$48.000", meta: "60 cápsulas blandas", icon: "💊" }
    ]
  }
]

export default function EcommerceCustomizer() {
  const [activePreset, setActivePreset] = useState<IndustryPreset>(PRESETS[0])

  return (
    <section id="personalizacion" className="py-24 relative overflow-hidden bg-gray-950">
      
      {/* Luz difusa adaptativa */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: activePreset.color }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Palette className="w-3.5 h-3.5" />
            <span>Versatilidad de Nicho</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Adaptable al rubro exacto de tu negocio:{" "}
            <span 
              className="transition-colors duration-500"
              style={{ color: activePreset.color }}
            >
              tu marca, tus reglas.
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Sea que vendas productos con tallas y colores, repuestos con servicio de taller o suplementos con tablas nutricionales, la plataforma se configura a tu medida.
          </p>
        </div>

        {/* Simulador Interactivo */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-gray-900/50 border border-gray-800 rounded-3xl p-4 sm:p-8 lg:p-10 backdrop-blur-xl overflow-hidden">
          
          {/* Panel de Selección de Rubros (Izquierda) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Seleccioná un rubro para previsualizar:
            </label>

            <div className="space-y-2.5 sm:space-y-3">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p)}
                  className={`w-full p-3 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    activePreset.id === p.id
                      ? "bg-gray-950 border-white/60 shadow-lg scale-[1.01]"
                      : "bg-gray-950/50 border-gray-800 hover:border-gray-700 text-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <span className="text-xl sm:text-2xl p-1.5 sm:p-2 rounded-xl bg-gray-900 border border-gray-800 shrink-0">
                      {p.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{p.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{p.businessName}</p>
                    </div>
                  </div>
                  <span 
                    className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: p.color }}
                  />
                </button>
              ))}
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-semibold">
                <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Dominio Propio Configurado:</span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-gray-400 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800 truncate">
                https://www.{activePreset.businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-500">
                Conectamos tu propio dominio .com o .co con servidor seguro de Cloudflare.
              </p>
            </div>
          </div>

          {/* Vista Previa de la Tienda Adaptada (Derecha) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="rounded-2xl bg-gray-950 border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-2xl transition-all duration-500 overflow-hidden w-full">
              
              {/* Header simulado de la tienda */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-3.5 sm:pb-4 mb-4 sm:mb-6 gap-2 sm:gap-4">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-white transition-colors duration-500 shadow-md shrink-0 text-lg sm:text-xl"
                    style={{ backgroundColor: activePreset.color }}
                  >
                    {activePreset.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-base font-extrabold text-white tracking-wide truncate">
                      {activePreset.businessName}
                    </h4>
                    <p className="text-[10px] text-gray-400 truncate">{activePreset.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="p-1.5 sm:p-2 rounded-xl bg-gray-900 border border-gray-800 text-xs flex items-center gap-1.5 text-gray-300">
                    <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-bold text-[11px] sm:text-xs">2</span>
                  </span>
                </div>
              </div>

              {/* Catálogo Adaptado en Vivo */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-center text-[11px] sm:text-xs text-gray-300 font-semibold mb-1">
                  <span>Productos destacados en catálogo:</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500">Stock activo</span>
                </div>

                {activePreset.sampleProducts.map((prod, i) => (
                  <div
                    key={i}
                    className="p-2.5 sm:p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-gray-700 flex items-center justify-between gap-2.5 transition-colors min-w-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <span className="text-base sm:text-xl p-1.5 sm:p-2 rounded-lg bg-gray-950 border border-gray-800 shrink-0">
                        {prod.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{prod.meta}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-white block whitespace-nowrap">{prod.price}</span>
                      <span 
                        className="text-[10px] font-semibold transition-colors duration-500 whitespace-nowrap"
                        style={{ color: activePreset.color }}
                      >
                        + Agregar
                      </span>
                    </div>
                  </div>
                ))}

                {/* Botón de Checkout con color de la marca */}
                <button
                  className="w-full h-11 sm:h-12 flex items-center justify-center px-4 sm:px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-lg mt-4 sm:mt-5 transition-all duration-500 truncate"
                  style={{ backgroundColor: activePreset.color }}
                >
                  Ir al Checkout con PSE / Wompi
                </button>
              </div>

              {/* Watermark de confianza */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] text-gray-500 text-center sm:text-left">
                <span>⚡ OpenNext + Cloudflare Edge + Supabase</span>
                <span>Desarrollado y Alojado por PRIGMA</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
