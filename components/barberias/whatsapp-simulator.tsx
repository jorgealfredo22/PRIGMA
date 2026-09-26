"use client"

import { useState } from "react"
import { MessageCircle, Check, CheckCheck, Clock, Send, BellRing, ShieldCheck, Zap } from "lucide-react"

export default function WhatsappSimulator() {
  const [confirmed, setConfirmed] = useState(false)
  const [messages, setMessages] = useState<number[]>([1, 2])

  const handleConfirm = () => {
    setConfirmed(true)
  }

  return (
    <section id="whatsapp" className="py-24 relative overflow-hidden bg-gray-950/70 border-t border-gray-800/80">
      
      {/* Luz ambiental */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Izquierdo: Copy y Beneficios de WhatsApp */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Automatización nativa de WhatsApp</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              El bot que elimina los{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
                "faltazos" sin que toques tu teléfono.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              La principal causa de pérdida de ingresos en una barbería son los clientes que olvidan su turno. Nuestro sistema envía notificaciones de confirmación y recordatorios preventivos directamente a su WhatsApp.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Confirmación Inmediata</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Apenas el cliente agenda, recibe un mensaje con todos los detalles (día, hora exacta, barbero y dirección).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Recordatorio 2 Horas Antes</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Un toque de atención automático para que el cliente salga con tiempo o libere el turno si tuvo un imprevisto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Cero Spam, Máxima Efectividad</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Mensajes claros y respetuosos con tasa de apertura superior al 95%.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Lado Derecho: Simulación en Vivo de la Conversación */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[390px] rounded-[36px] bg-[#0b141a] border-[5px] border-gray-800 shadow-2xl shadow-emerald-950/40 overflow-hidden text-white font-sans">
              
              {/* Header de WhatsApp */}
              <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-bold">
                      ✂️
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#202c33]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-100">Barber Pro Studio</p>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <p className="text-[10px] text-emerald-400 font-medium">Cuenta Comercial Oficial</p>
                  </div>
                </div>
                <div className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md font-mono">
                  BOT ACTIVO
                </div>
              </div>

              {/* Mensajes del Chat */}
              <div className="p-4 space-y-3.5 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px] min-h-[380px] flex flex-col justify-between">
                
                <div className="space-y-3.5">
                  <div className="text-center">
                    <span className="text-[10px] bg-[#182229] text-gray-400 px-2.5 py-0.5 rounded-md">
                      HOY
                    </span>
                  </div>

                  {/* Mensaje 1: Confirmación de Reserva */}
                  <div className="max-w-[85%] bg-[#005c4b] text-white p-3 rounded-2xl rounded-tl-sm text-xs space-y-1.5 shadow-md">
                    <p className="font-bold text-emerald-200">¡Cita agendada con éxito! 💈</p>
                    <p className="text-[11px] leading-relaxed text-gray-100">
                      Hola David, tu turno en <strong>Barber Pro Studio</strong> quedó confirmado:
                    </p>
                    <div className="bg-[#025142] p-2 rounded-lg text-[10px] space-y-0.5">
                      <p>✂️ <strong>Servicio:</strong> Corte Clásico & Fade ($35.000)</p>
                      <p>🧔🏻 <strong>Barbero:</strong> Mateo Silva</p>
                      <p>📅 <strong>Hora:</strong> Hoy a las 4:30 PM</p>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/80 pt-1">
                      <span>1:15 PM</span>
                      <CheckCheck className="w-3 h-3 text-blue-300" />
                    </div>
                  </div>

                  {/* Mensaje 2: Recordatorio Preventivo 2 Horas Antes */}
                  <div className="max-w-[85%] bg-[#005c4b] text-white p-3 rounded-2xl rounded-tl-sm text-xs space-y-1.5 shadow-md">
                    <p className="font-bold text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Recordatorio de Turno (en 2 horas)
                    </p>
                    <p className="text-[11px] leading-relaxed text-gray-100">
                      Te esperamos a las <strong>4:30 PM</strong>. Si tuviste algún imprevisto, avísanos con tiempo tocando abajo:
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/80 pt-1">
                      <span>2:30 PM</span>
                      <CheckCheck className="w-3 h-3 text-blue-300" />
                    </div>
                  </div>

                  {/* Interacción del Cliente en la simulación */}
                  {confirmed && (
                    <div className="max-w-[80%] ml-auto bg-[#202c33] text-white p-2.5 rounded-2xl rounded-tr-sm text-xs shadow-md">
                      <p className="text-[11px]">¡Confirmadísimo! Voy saliendo para allá 🙌🏼</p>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-gray-400 pt-1">
                        <span>2:32 PM</span>
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      </div>
                    </div>
                  )}

                  {confirmed && (
                    <div className="max-w-[85%] bg-[#005c4b] text-white p-2.5 rounded-2xl rounded-tl-sm text-xs shadow-md animate-fade-in">
                      <p className="text-[11px] text-emerald-100">
                        ¡Genial David! Mateo ya tiene tu estación preparada. ¡Nos vemos en un rato! ✂️🔥
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/80 pt-1">
                        <span>2:32 PM</span>
                        <CheckCheck className="w-3 h-3 text-blue-300" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Botón de Acción en la simulación */}
                {!confirmed ? (
                  <button
                    onClick={handleConfirm}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Tocar aquí para simular respuesta del cliente</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-center text-emerald-300">
                    ✅ Simulación completada: ¡Cero turnos perdidos!
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
