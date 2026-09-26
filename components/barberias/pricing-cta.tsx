"use client"

import { useState } from "react"
import { Check, ArrowRight, MessageCircle, HelpCircle, ChevronDown, Sparkles, ShieldCheck } from "lucide-react"

export default function PricingCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: "¿Mis clientes tienen que descargar alguna aplicación pesada?",
      a: "No. Funciona directo en cualquier navegador (Safari, Chrome, etc.). Hacen clic en tu enlace de Instagram o Google Maps y agendan en 20 segundos sin descargas ni contraseñas."
    },
    {
      q: "¿Cobran comisión por cada cita que reserve un cliente?",
      a: "Cero comisiones por turno. Todo el dinero de los cortes y servicios es 100% tuyo y de tus barberos. No somos intermediarios."
    },
    {
      q: "¿Qué pasa si entra un barbero nuevo o cambiamos los precios?",
      a: "Tenés un panel de administración en tu celular donde podés agregar o quitar barberos, modificar servicios y actualizar precios en 30 segundos sin depender de programadores."
    },
    {
      q: "¿Cómo funciona el recordatorio de WhatsApp?",
      a: "El sistema envía de forma automática un mensaje de confirmación apenas el cliente agenda y un recordatorio 2 horas antes de la cita para asegurar que no falte."
    },
    {
      q: "¿Cuánto tiempo tarda PRIGMA en tener mi sistema funcionando?",
      a: "En menos de 48 a 72 horas hábiles dejamos tu sistema configurado con tu logo, tus colores, tus barberos y listo para recibir clientes."
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gray-950">
      
      {/* Fondo con resplandor */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Banner de Oferta Llave en Mano */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-950 border border-purple-500/30 p-8 sm:p-12 shadow-2xl shadow-purple-950/40 text-center relative overflow-hidden mb-20">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Implementación Llave en Mano PRIGMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Tené tu barbería automatizada{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
              esta misma semana.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-light">
            Nosotros nos encargamos de todo el montaje técnico: diseño con tus logos y colores, carga de barberos y servicios, y configuración de WhatsApp.
          </p>

          {/* Lista de lo que incluye */}
          <div className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-10">
            {[
              "Página web de citas con tu marca y colores",
              "Portal privado para cada uno de tus barberos",
              "Panel de control y finanzas para el dueño",
              "Recordatorios automáticos por WhatsApp",
              "Subdominio o dominio propio con certificado SSL",
              "Capacitación guiada para ti y tu equipo de trabajo",
              "Cero comisiones por turno agendado",
              "Soporte y mantenimiento continuo de PRIGMA"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-950/60 border border-gray-800 text-xs sm:text-sm text-gray-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/573105741639?text=Hola%20PRIGMA,%20quiero%20activar%20el%20sistema%20de%20citas%20para%20mi%20barber%C3%ADa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-900/40 hover:shadow-purple-700/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300" />
              <span>Solicitar Cotización por WhatsApp</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Respuesta en menos de 15 minutos · Sin compromisos</span>
          </div>

        </div>

        {/* Sección de Preguntas Frecuentes (FAQ) */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 border border-gray-800 text-gray-400">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Resolvé tus dudas</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Preguntas Frecuentes</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180 text-purple-400" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
