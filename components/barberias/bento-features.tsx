"use client"

import { useState } from "react"
import { 
  Users, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Clock, 
  Check, 
  BarChart3,
  Scissors,
  Coffee
} from "lucide-react"

export default function BentoFeatures() {
  const [activeTab, setActiveTab] = useState<"cliente" | "barbero" | "admin">("cliente")

  return (
    <section id="roles" className="py-24 relative overflow-hidden bg-gray-950">
      
      {/* Luces decorativas */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diseñado para los 3 pilares del negocio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Una solución pensada para tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              cliente, tu equipo y tus ganancias.
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            Cada usuario tiene una interfaz hecha a la medida para que todo fluya sin fricciones ni soporte técnico.
          </p>

          {/* Selector de pestañas para móvil / interactividad */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="p-1 rounded-2xl bg-gray-900 border border-gray-800 flex flex-wrap gap-1 justify-center">
              <button
                onClick={() => setActiveTab("cliente")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "cliente"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                1. El Cliente
              </button>
              <button
                onClick={() => setActiveTab("barbero")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "barbero"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                2. El Barbero
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "admin"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                3. El Dueño (Admin)
              </button>
            </div>
          </div>
        </div>

        {/* Bento Grid Principal (Estilo Skiper UI / Vengence UI) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CARD 1: CLIENTE (Col-span-12 / md:col-span-7) */}
          <div
            className={`md:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-950 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === "cliente"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Experiencia del Cliente
                </span>
                <span className="text-xs text-gray-500 font-mono">Tiempo estimado: 20 seg</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Agendamiento limpio, veloz y sin contraseñas.
              </h3>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Nadie quiere descargar una app de 50MB ni recordar una contraseña para cortarse el pelo. Tu cliente abre tu link en Instagram, elige a su barbero favorito, ve los servicios con precios y confirma con su nombre y WhatsApp.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  "100% optimizado para celulares",
                  "Fotos de cortes y catálogo visual",
                  "Sin registros ni contraseñas",
                  "Confirmación instantánea"
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

            {/* Visual interactivo mini-card */}
            <div className="mt-8 p-4 rounded-2xl bg-gray-950/80 border border-gray-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Paso final del cliente:</span>
                <span className="text-emerald-400 font-semibold">Listo para agendar</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-purple-500/20">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold">
                  ✂️
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">Fade Clásico + Barba</p>
                  <p className="text-[10px] text-gray-400">Hoy · 4:30 PM · Con Mateo</p>
                </div>
                <span className="text-xs font-extrabold text-purple-300">$55.000</span>
              </div>
            </div>
          </div>

          {/* CARD 2: BARBERO (Col-span-12 / md:col-span-5) */}
          <div
            className={`md:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-950 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              activeTab === "barbero"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Portal del Barbero
              </span>

              <h3 className="text-2xl font-extrabold text-white">
                Su agenda y comisiones en el celular.
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Cada barbero de tu equipo tiene un acceso privado. Ve sus citas de la jornada en tiempo real, marca clientes atendidos y sabe exactamente cuánto ganó en el día.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  "Agenda diaria cronológica",
                  "Cálculo automático de comisiones",
                  "Bloqueo de descansos con un tap",
                  "Notificaciones en tiempo real"
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

            {/* Simulación de ganancias del barbero */}
            <div className="mt-6 p-4 rounded-2xl bg-gray-950/80 border border-gray-800/80">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-400">Comisión estimada hoy:</span>
                <span className="text-indigo-400 font-bold">50% acordado</span>
              </div>
              <div className="text-2xl font-extrabold text-white flex items-center gap-1.5">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>$185.000 COP</span>
                <span className="text-[10px] text-gray-500 font-normal ml-auto">(6 cortes hoy)</span>
              </div>
            </div>
          </div>

          {/* CARD 3: ADMIN & DUEÑO (Col-span-12) */}
          <div
            className={`md:col-span-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-gray-900/90 via-purple-950/20 to-gray-950 border transition-all duration-300 relative overflow-hidden ${
              activeTab === "admin"
                ? "border-purple-500/60 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500/30"
                : "border-gray-800/80 hover:border-gray-700"
            }`}
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Panel de Mando del Dueño</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Visión completa de tus ganancias y métricas del negocio.
                </h3>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Tomá el control total sin depender de nadie. Modificá precios, agregá nuevos barberos, consultá el balance de caja por día o mes y conocé quiénes son tus clientes más fieles.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Caja total vs. Comisiones a pagar",
                    "Servicios más pedidos y horas pico",
                    "Base de datos propia con teléfonos",
                    "Control de días festivos y descansos"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup Dashboard Analytics */}
              <div className="lg:col-span-6 bg-gray-950/90 border border-gray-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-white">Reporte Financiero · Septiembre</span>
                  </div>
                  <span className="text-xs text-purple-400 font-mono">Actualizado en vivo</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Facturación Bruta</p>
                    <p className="text-base font-extrabold text-white mt-1">$4.850.000</p>
                    <p className="text-[10px] text-emerald-400 font-medium">+18% vs mes ant.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Total Citas</p>
                    <p className="text-base font-extrabold text-purple-300 mt-1">142 turnos</p>
                    <p className="text-[10px] text-purple-400 font-medium">96% asistidas</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 col-span-2 sm:col-span-1">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">Utilidad Neta</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-1">$2.425.000</p>
                    <p className="text-[10px] text-gray-400">Post comisiones</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 font-medium">Top Barbero del mes:</span>
                  </div>
                  <span className="text-white font-bold">Mateo Silva (58 citas)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
