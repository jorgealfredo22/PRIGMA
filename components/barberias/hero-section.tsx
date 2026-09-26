"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Scissors, 
  Smartphone, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  RotateCcw,
  MapPin,
  Star
} from "lucide-react"

export default function HeroSection() {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  // Estado para la simulación interactiva de reserva en el smartphone
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedBarber, setSelectedBarber] = useState("Mateo Silva")
  const [selectedService, setSelectedService] = useState("Corte Clásico & Fade ($35.000)")
  const [selectedTime, setSelectedTime] = useState("4:30 PM")

  useEffect(() => {
    let isMounted = true
    import("animejs").then(({ animate }) => {
      if (!isMounted) return
      // Animación suave de entrada para el H1 con Anime.js
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

  const resetMockup = () => {
    setStep(1)
  }

  const barbersList = [
    { name: "Mateo Silva", role: "Master Barber · Fade & Barba", rating: "4.9", reviews: 142, img: "🧔🏻" },
    { name: "Carlos Mendoza", role: "Especialista Diseños & Freestyle", rating: "5.0", reviews: 98, img: "💈" },
    { name: "Julián Rojas", role: "Corte Clásico & Tijera", rating: "4.8", reviews: 86, img: "✂️" },
    { name: "David Castro", role: "Barba Ritual & Cuidado Facial", rating: "4.9", reviews: 110, img: "🔥" }
  ]

  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex flex-col justify-center">
      {/* Fondo con Orbes PRIGMA */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px]" />
        
        {/* Grid sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8a5cf6_1px,transparent_1px)] [background-size:24px_24px]"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Copy de Conversión & Valor */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Badges superiores */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Desarrollado por PRIGMA Tech
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                Carga en &lt; 50ms en Cloudflare
              </span>
            </div>

            {/* Titular Principal de Alto Impacto con animación limpia */}
            <h1 
              ref={h1Ref}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Tu propio sistema de citas para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
                tu barbería.
              </span>
              <br />
              <span className="text-gray-300 text-3xl sm:text-4xl md:text-5xl font-bold">
                Tu marca, cero comisiones.
              </span>
            </h1>

            {/* Párrafo Persuasivo enfocado en el dolor */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Dejá de perder horas respondiendo mensajes a medianoche y eliminá los turnos vacíos. Dale a tus clientes una web rápida para agendar en 20 segundos y recibí recordatorios automáticos por WhatsApp.
            </p>

            {/* Bullets de Beneficios Clave */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">100% Personalizado</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">WhatsApp Automático</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">Control de Barberos</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="https://wa.me/573105741639?text=Hola%20PRIGMA,%20quiero%20cotizar%20el%20sistema%20de%20citas%20para%20mi%20barber%C3%ADa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/30 hover:shadow-purple-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Solicitar para Mi Barbería</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-gray-300 hover:text-white rounded-2xl bg-gray-900/80 hover:bg-gray-800/90 border border-gray-800 hover:border-purple-500/40 transition-all duration-300"
              >
                <Smartphone className="w-5 h-5 text-purple-400" />
                <span>Probar Demo en Vivo</span>
              </a>
            </div>

            {/* Prueba social / Confianza */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instalación llave en mano</span>
              </div>
              <span>•</span>
              <div>Sin descargas de apps pesadas</div>
              <span>•</span>
              <div>Tu propio dominio web</div>
            </div>
          </div>

          {/* Columna Derecha: Mockup Interactivo del Móvil en Vivo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[375px]">
              
              {/* Resplandor decorativo trasero */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[44px] blur-xl opacity-40 animate-pulse" />

              {/* Marco del Celular */}
              <div className="relative bg-gray-950 border-[6px] border-gray-800 rounded-[42px] p-2.5 shadow-2xl shadow-purple-950/50 overflow-hidden">
                
                {/* Notch / Dynamic Island */}
                <div className="w-28 h-4 bg-gray-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/60 mr-2" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                </div>

                {/* Contenido de la Pantalla del Móvil con Textura de Fondo */}
                <div className="relative bg-[#0d1117] border border-gray-800/80 rounded-[32px] overflow-hidden text-left text-white min-h-[530px] flex flex-col justify-between">
                  
                  {/* Banner del Mapa de Ubicación (Fondo estilizado tipo Google Maps oscuro) */}
                  <div className="relative h-28 bg-[#161b22] border-b border-gray-800 overflow-hidden">
                    {/* Grilla visual simulando calles de mapa */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:18px_18px]" />
                    <div className="absolute top-4 left-6 right-10 h-1.5 bg-gray-700/40 rounded-full rotate-6" />
                    <div className="absolute bottom-6 left-10 right-4 h-2 bg-gray-700/50 rounded-full -rotate-3" />
                    <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-md" />

                    {/* Pin de Ubicación en el mapa */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                      <div className="relative">
                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 border border-purple-400">
                          <Scissors className="w-3.5 h-3.5" />
                        </div>
                        <span className="absolute -inset-1 rounded-full bg-purple-500 animate-ping opacity-40 -z-10" />
                      </div>
                      <div className="mt-1 px-2 py-0.5 rounded-md bg-gray-950/90 border border-gray-800 text-[9px] font-bold text-gray-200 flex items-center gap-1 shadow-md">
                        <MapPin className="w-2.5 h-2.5 text-purple-400" />
                        <span>Cl. 14 #11-20 · Centro</span>
                      </div>
                    </div>

                    {/* Botón de reinicio */}
                    <button
                      onClick={resetMockup}
                      title="Reiniciar prueba"
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-gray-900/80 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors border border-gray-700/50 z-20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Header de la Barbería Mockup */}
                  <div className="px-4 pt-3">
                    <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-xs shadow-md">
                          ✂️
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-200">BARBER PRO STUDIO</div>
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Abierto ahora · 4 barberos listos
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-400 bg-yellow-950/40 px-2 py-0.5 rounded-md border border-yellow-700/30">
                        <Star className="w-2.5 h-2.5 fill-yellow-400" />
                        <span>4.9</span>
                      </div>
                    </div>

                    {/* Paso 1: Elegir Barbero (MUESTRA TODOS LOS 4 BARBEROS) */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-purple-300">Paso 1: Elige tu barbero</span>
                          <span className="text-[10px] text-gray-500 font-medium">4 Disponibles</span>
                        </div>

                        {/* Lista con los 4 barberos */}
                        <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
                          {barbersList.map((b, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedBarber(b.name)
                                setStep(2)
                              }}
                              className={`p-2 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                                selectedBarber === b.name
                                  ? "bg-purple-950/50 border-purple-500/70 shadow-sm shadow-purple-500/20"
                                  : "bg-gray-900/60 border-gray-800 hover:bg-gray-800/80 hover:border-gray-700"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-lg p-1 rounded-lg bg-gray-800/80">{b.img}</span>
                                <div>
                                  <p className="text-xs font-bold text-white leading-tight">{b.name}</p>
                                  <p className="text-[10px] text-gray-400 leading-tight">{b.role}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-semibold text-yellow-400 flex items-center gap-0.5">
                                  ★ {b.rating}
                                </span>
                                <span className="text-[9px] text-gray-500 block">({b.reviews})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Paso 2: Elegir Servicio */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-purple-300">Paso 2: Elige servicio</span>
                          <span className="text-[10px] text-gray-400">Con {selectedBarber}</span>
                        </div>

                        <div className="space-y-2">
                          {[
                            { name: "Corte Clásico & Fade", time: "40 min", price: "$35.000" },
                            { name: "Barba Ritual Spa (Toalla Caliente)", time: "30 min", price: "$25.000" },
                            { name: "Combo Full: Corte + Barba + Cejas", time: "60 min", price: "$55.000" }
                          ].map((s, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedService(`${s.name} (${s.price})`)
                                setStep(3)
                              }}
                              className="p-2.5 rounded-xl border border-gray-800 bg-gray-900/60 hover:bg-purple-950/40 hover:border-purple-500/60 cursor-pointer transition-all flex items-center justify-between"
                            >
                              <div>
                                <p className="text-xs font-bold text-white">{s.name}</p>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-purple-400" /> {s.time}
                                </p>
                              </div>
                              <span className="text-xs font-bold text-purple-300">{s.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Paso 3: Horarios Disponibles */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2.5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-purple-300">Paso 3: Horario disponible</span>
                          <span className="text-[10px] text-gray-500">Hoy · Tiempo real</span>
                        </div>

                        <p className="text-[11px] text-gray-400">
                          Horarios libres con <strong className="text-white">{selectedBarber}</strong>:
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {["3:00 PM", "3:45 PM", "4:30 PM", "5:15 PM", "6:00 PM", "6:45 PM"].map((t, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSelectedTime(t)
                                setStep(4)
                              }}
                              className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                                selectedTime === t
                                  ? "bg-purple-600 text-white border-purple-400 shadow-md"
                                  : "bg-gray-850 border-gray-750 text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Paso 4: Reserva Exitosa */}
                    {step === 4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-2 space-y-2.5"
                      >
                        <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-white">¡Cita Confirmada con Éxito!</h4>
                        <div className="bg-gray-950/90 p-2.5 rounded-xl border border-gray-800 text-[11px] text-left space-y-1">
                          <p><span className="text-gray-400">Barbero:</span> <strong className="text-white">{selectedBarber}</strong></p>
                          <p><span className="text-gray-400">Servicio:</span> <strong className="text-white">{selectedService}</strong></p>
                          <p><span className="text-gray-400">Fecha y Hora:</span> <strong className="text-purple-300">Hoy · {selectedTime}</strong></p>
                          <p><span className="text-gray-400">Ubicación:</span> <strong className="text-gray-300">Cl. 14 #11-20 · Centro</strong></p>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[10px] text-emerald-300">
                          💬 Notificación instantánea enviada a tu WhatsApp con recordatorio 2 horas antes.
                        </div>
                        <button
                          onClick={resetMockup}
                          className="w-full py-2 text-xs font-semibold text-purple-300 hover:text-purple-200 border border-purple-500/30 rounded-lg hover:bg-purple-950/30 transition-colors"
                        >
                          Simular Otra Reserva
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Footer del smartphone interactivo */}
                  <div className="p-3 border-t border-gray-800/80 bg-gray-950/60 text-center">
                    <p className="text-[10px] text-gray-500">
                      ⚡ Demo interactiva · Sin descargas ni contraseñas
                    </p>
                  </div>

                </div>

              </div>

              {/* Floating Badge exterior */}
              <div className="absolute -bottom-4 -left-4 bg-gray-900/90 border border-purple-500/30 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-200">
                  +35 citas agendadas hoy
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
