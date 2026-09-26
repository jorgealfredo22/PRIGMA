"use client"

import { useState } from "react"
import { 
  ShoppingBag, 
  Store, 
  Wrench, 
  Truck, 
  BarChart3, 
  Sparkles, 
  Check, 
  Layers, 
  Package, 
  Search,
  ScanBarcode,
  Receipt,
  Clock
} from "lucide-react"

export default function EcommerceBento() {
  const [activeTab, setActiveTab] = useState<"tienda" | "pos" | "taller" | "tracking">("tienda")

  return (
    <section id="caracteristicas" className="py-24 relative overflow-hidden bg-gray-950">
      
      {/* Luces de fondo */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma Omnicanal Completa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Todo lo que tu negocio necesita en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              un solo software integrado.
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Dejá de usar 3 programas distintos para vender online, cobrar en la tienda física y gestionar reparaciones.
          </p>

          {/* Selector de pestañas */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="p-1 rounded-2xl bg-gray-900 border border-gray-800 flex flex-wrap gap-1 justify-center">
              {[
                { id: "tienda", label: "Tienda Online" },
                { id: "pos", label: "Punto de Venta (POS)" },
                { id: "taller", label: "Órdenes de Trabajo" },
                { id: "tracking", label: "Tracking de Envíos" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CARD 1: TIENDA ONLINE (md:col-span-7) */}
          <div
            className={`md:col-span-7 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-950 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === "tienda"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Experiencia E-commerce
                </span>
                <span className="text-xs text-gray-500 font-mono">Mobile-First</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tienda web ultra-rápida con variantes y carrito en 1 clic.
              </h3>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Tus clientes compran desde su celular en segundos. Búsqueda con autocompletado en tiempo real, selección de tallas, colores o capacidades y checkout directo sin formularios interminables.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Catálogo con variantes ilimitadas",
                  "Imágenes WebP ultra-comprimidas",
                  "Buscador instantáneo predictivo",
                  "Cálculo de envío automático"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulación visual de producto con variantes */}
            <div className="mt-8 p-4 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Selector de variante en tienda:</span>
                <span className="text-emerald-400 font-semibold">Stock disponible (12 un.)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-xl">
                    👟
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Sneakers Urban Pro</p>
                    <div className="flex gap-1.5 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-purple-300 border border-purple-500/30">Talla 41</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300">Negro/Blanco</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-white">$240.000</span>
              </div>
            </div>
          </div>

          {/* CARD 2: POS MOSTRADOR FÍSICO (md:col-span-5) */}
          <div
            className={`md:col-span-5 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-950 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === "pos"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Punto de Venta (POS)
              </span>

              <h3 className="text-2xl font-extrabold text-white">
                Cobros rápidos en mostrador físico.
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Diseñado para pantallas táctiles o computadores de mostrador. Compatible con pistola de código de barras, impresión de recibos térmicos y múltiples métodos de cobro en caja.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  "Compatible con lector de códigos",
                  "Impresión de tirilla térmica",
                  "Arqueo y cierre de caja diario",
                  "Cobro mixto (efectivo + tarjeta)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulación ticket de caja */}
            <div className="mt-6 p-4 rounded-2xl bg-gray-950/80 border border-gray-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-purple-400" /> Ticket #4829
                </span>
                <span className="text-emerald-400 font-bold">PAGADO (Efectivo)</span>
              </div>
              <div className="text-xl font-extrabold text-white">
                $189.000 COP
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Caja Mostrador · Vendedor: Carlos</p>
            </div>
          </div>

          {/* CARD 3: ÓRDENES DE TRABAJO / SERVICIO TÉCNICO (md:col-span-6) */}
          <div
            className={`md:col-span-6 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-950 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === "taller"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Taller & Servicio Técnico
              </span>

              <h3 className="text-2xl font-extrabold text-white">
                Módulo de Órdenes de Trabajo (Work Orders).
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                ¿Tu negocio repara celulares, computadores, motos o electrodomésticos? Recibe equipos, registra fallas, asigna repuestos del inventario y notifica al cliente cuando esté reparado.
              </p>

              <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "Registro con IMEI / Serial",
                  "Estados: En diagnóstico / Listo",
                  "Descuento automático de repuestos",
                  "Notificación de entrega al cliente"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulación Orden de Trabajo */}
            <div className="mt-6 p-3.5 rounded-2xl bg-gray-950/80 border border-gray-800">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-300 font-bold">Orden #OT-204 · iPhone 13 Pro</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  Listo para Entrega
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Servicio: Cambio de Módulo OLED + Batería Original</p>
            </div>
          </div>

          {/* CARD 4: TRACKING DE ENVÍOS (md:col-span-6) */}
          <div
            className={`md:col-span-6 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-950 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === "tracking"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20">
                Seguimiento de Envíos
              </span>

              <h3 className="text-2xl font-extrabold text-white">
                Tracking en tiempo real para el cliente.
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Olvídate de clientes preguntando por WhatsApp: <em>"¿Ya salió mi paquete?"</em>. Con su número de guía consultan el estado del despacho en vivo directamente en tu página web.
              </p>

              <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  "Página pública de rastreo",
                  "Integración con transportadoras",
                  "Alertas de estado por email",
                  "Historial de entregas exitosas"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulación de Tracking */}
            <div className="mt-6 p-3.5 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300 font-bold">Guía Interrapidísimo #8920194</span>
                <span className="text-[10px] text-teal-400 font-semibold">En Reparto · Hoy</span>
              </div>
              <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-teal-400 h-full w-[85%]" />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Empacado</span>
                <span>Despachado</span>
                <span className="text-teal-300 font-bold">En tu ciudad</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
