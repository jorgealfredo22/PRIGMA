"use client"

import { useEffect, useRef } from "react"
import { AlertCircle, TrendingUp, Layers, DollarSign, Store, ShoppingCart } from "lucide-react"

export default function EcommercePainPoints() {
  const counter1Ref = useRef<HTMLSpanElement>(null)
  const counter2Ref = useRef<HTMLSpanElement>(null)
  const counter3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let isMounted = true
    import("animejs").then(({ animate }) => {
      if (!isMounted) return
      if (typeof animate === "function") {
        const obj1 = { val: 20 }
        animate(obj1, {
          val: 0,
          ease: "outExpo",
          duration: 2500,
          onUpdate: () => {
            if (counter1Ref.current) counter1Ref.current.innerText = `${Math.round(obj1.val)}%`
          }
        })

        const obj2 = { val: 0 }
        animate(obj2, {
          val: 38,
          ease: "outExpo",
          duration: 2500,
          onUpdate: () => {
            if (counter2Ref.current) counter2Ref.current.innerText = `+${Math.round(obj2.val)}%`
          }
        })

        const obj3 = { val: 0 }
        animate(obj3, {
          val: 100,
          ease: "outExpo",
          duration: 2500,
          onUpdate: () => {
            if (counter3Ref.current) counter3Ref.current.innerText = `${Math.round(obj3.val)}%`
          }
        })
      }
    }).catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="beneficios" className="py-24 relative overflow-hidden bg-gray-950/60 border-y border-gray-800/60">
      
      {/* Luz ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Los 3 dolores del comercio moderno</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            ¿Cuánto dinero perdés vendiendo por chats y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-300 to-purple-400">
              descuadrando inventarios?
            </span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Tener una tienda física y vender por WhatsApp con métodos manuales genera errores costosos, pedidos olvidados y clientes que se van a la competencia.
          </p>
        </div>

        {/* Comparativa de los 3 Dolores Clásicos */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-5 group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              "Precio por interno" en WhatsApp
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Responder mensajes uno a uno y pasar números de cuenta hace que más del 65% de compradores potenciales se enfríen y no concreten la compra.
            </p>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 font-medium">
              💡 <strong>Solución:</strong> Tienda web con carrito y pago directo por PSE, Nequi y tarjetas las 24 horas del día.
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              Vender lo que ya no tienes en stock
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Vender la última unidad en el mostrador del local y que un cliente la pague online minutos después genera cancelaciones y mala reputación.
            </p>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 font-medium">
              💡 <strong>Solución:</strong> Inventario unificado al segundo entre tu terminal física y la web.
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              Comisiones abusivas de marketplaces
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Dejarle entre el 15% y el 22% de cada venta a plataformas terceras donde además tu marca queda invisible frente a tus competidores.
            </p>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 font-medium">
              💡 <strong>Solución:</strong> Tu propia tienda con tu dominio .com y 0% comisión de plataforma por tus ventas.
            </div>
          </div>

        </div>

        {/* Métricas con Anime.js */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-gray-900/60 to-indigo-950/40 border border-purple-500/30 backdrop-blur-xl">
          
          <div className="text-center sm:border-r border-gray-800 p-4">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">
              <span ref={counter1Ref}>0%</span>
            </div>
            <p className="text-sm font-semibold text-white">Comisión por venta</p>
            <p className="text-xs text-gray-400 mt-1">El 100% de tus ventas es tuyo</p>
          </div>

          <div className="text-center sm:border-r border-gray-800 p-4">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-1">
              <span ref={counter2Ref}>+38%</span>
            </div>
            <p className="text-sm font-semibold text-white">Aumento en ventas promedio</p>
            <p className="text-xs text-gray-400 mt-1">Con tienda abierta 24/7</p>
          </div>

          <div className="text-center p-4">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 mb-1">
              <span ref={counter3Ref}>100%</span>
            </div>
            <p className="text-sm font-semibold text-white">Sincronizado en tiempo real</p>
            <p className="text-xs text-gray-400 mt-1">Entre local físico y web</p>
          </div>

        </div>

      </div>
    </section>
  )
}
