"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  ShoppingBag, 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  RotateCcw,
  CreditCard,
  Truck,
  Layers,
  Check
} from "lucide-react"

export default function EcommerceHero() {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  // Estado para la simulación interactiva Tienda Online -> POS Sincronizado
  const [stock, setStock] = useState(6)
  const [hasBought, setHasBought] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState("Negro Titanio")

  useEffect(() => {
    let isMounted = true
    import("animejs").then(({ animate }) => {
      if (!isMounted) return
      if (h1Ref.current && typeof animate === "function") {
        animate(h1Ref.current, {
          opacity: [0, 1],
          translateY: [25, 0],
          ease: "outExpo",
          duration: 1200,
          delay: 150,
        })
      }
    }).catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const handleSimulatePurchase = () => {
    if (stock > 0 && !hasBought) {
      setStock((prev) => prev - 1)
      setHasBought(true)
    }
  }

  const handleReset = () => {
    setStock(6)
    setHasBought(false)
  }

  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex flex-col justify-center">
      {/* Fondo con Orbes PRIGMA */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px]" />
        
        {/* Rejilla sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8a5cf6_1px,transparent_1px)] [background-size:24px_24px]"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Copy de Conversión */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Badges superiores */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Desarrollado por PRIGMA Tech
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                Cero comisiones por venta
              </span>
            </div>

            {/* Titular Principal de Alto Impacto */}
            <h1 
              ref={h1Ref}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Tu propia tienda online y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
                punto de venta físico
              </span>
              <br />
              <span className="text-gray-300 text-3xl sm:text-4xl md:text-5xl font-bold">
                sincronizados al segundo.
              </span>
            </h1>

            {/* Párrafo Persuasivo enfocado en el dolor del comercio */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Dejá de vender por chat respondiendo precios por DM o perdiendo ventas por falta de stock. Administrá tus ventas web y tu mostrador físico en un solo lugar con pagos por PSE, Wompi y Contraentrega.
            </p>

            {/* Bullets de Beneficios Clave */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">Tienda Web + POS Mostrador</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">PSE, Wompi & Contraentrega</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">Tracking de Envíos en Vivo</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="https://wa.me/573105741639?text=Hola%20PRIGMA,%20quiero%20cotizar%20la%20plataforma%20de%20E-commerce%20y%20POS%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/30 hover:shadow-purple-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Solicitar para Mi Negocio</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-gray-300 hover:text-white rounded-2xl bg-gray-900/80 hover:bg-gray-800/90 border border-gray-800 hover:border-purple-500/40 transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 text-purple-400" />
                <span>Ver Tienda Demo</span>
              </a>
            </div>

            {/* Prueba social / Confianza */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Llave en mano por PRIGMA</span>
              </div>
              <span>•</span>
              <div>Cero comisión de plataforma</div>
              <span>•</span>
              <div>Tu propio dominio .com</div>
            </div>
          </div>

          {/* Columna Derecha: Mockup Interactivo Tienda Online + POS Sincronizado */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              
              {/* Resplandor decorativo trasero */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 rounded-[38px] blur-xl opacity-35 animate-pulse" />

              {/* Contenedor Principal del Simulador */}
              <div className="relative bg-gray-950 border-[5px] border-gray-800 rounded-[36px] p-3 shadow-2xl shadow-purple-950/50 overflow-hidden text-white">
                
                {/* Header del Simulador */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-gray-200">SINCRONIZACIÓN OMNICANAL</span>
                  </div>
                  <button
                    onClick={handleReset}
                    title="Reiniciar simulación"
                    className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tarjeta Superior: Tienda Online del Cliente */}
                <div className="p-3.5 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-purple-300 font-bold">
                      <ShoppingBag className="w-3.5 h-3.5" /> 1. Tienda Online (Cliente)
                    </span>
                    <span className="text-[10px] bg-purple-950/60 text-purple-400 px-2 py-0.5 rounded-md border border-purple-800/40">
                      Web en Vivo
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-950/80 border border-gray-800">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-purple-900/40 to-indigo-900/40 border border-purple-500/20 flex items-center justify-center text-2xl shrink-0">
                      ⌚
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">Smartwatch Pro Titanio</p>
                      <p className="text-[10px] text-gray-400">Variante: {selectedVariant}</p>
                      <p className="text-xs font-extrabold text-emerald-400 mt-0.5">$189.000 COP</p>
                    </div>
                  </div>

                  {/* Botón de compra interactivo */}
                  {!hasBought ? (
                    <button
                      onClick={handleSimulatePurchase}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-xs text-white shadow-md shadow-purple-900/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Simular Compra con PSE / Wompi</span>
                    </button>
                  ) : (
                    <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-center text-emerald-300 font-medium">
                      ✅ ¡Orden #1042 pagada con éxito!
                    </div>
                  )}
                </div>

                {/* Tarjeta Inferior: Punto de Venta (POS) en el Local Físico */}
                <div className="p-3.5 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
                      <Store className="w-3.5 h-3.5" /> 2. POS Mostrador Físico
                    </span>
                    <span className="text-[10px] bg-indigo-950/60 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-800/40">
                      Terminal Local
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Stock en Mostrador</p>
                      <p className="text-[10px] text-gray-400">Sincronizado vía Supabase</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-black transition-all ${
                        hasBought ? "text-amber-400 scale-110" : "text-white"
                      }`}>
                        {stock} unidades
                      </span>
                      <p className="text-[9px] text-gray-500">Almacén Central</p>
                    </div>
                  </div>

                  {hasBought && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        <strong>¡Descontado al instante!</strong> El vendedor en el local ya ve 5 unidades disponibles.
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Footer del Simulador */}
                <div className="pt-3 pb-1 text-center">
                  <p className="text-[10px] text-gray-500">
                    ⚡ Cero descuadres de caja · Un solo inventario real
                  </p>
                </div>

              </div>

              {/* Floating Badge exterior */}
              <div className="absolute -bottom-4 -left-4 bg-gray-900/90 border border-purple-500/30 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-200">
                  +120 pedidos procesados hoy
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
