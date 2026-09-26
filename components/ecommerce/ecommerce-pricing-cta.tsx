"use client"

import { useState } from "react"
import { Check, ArrowRight, MessageCircle, HelpCircle, ChevronDown, Sparkles, ShieldCheck } from "lucide-react"

export default function EcommercePricingCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: "¿Cobran comisión por cada producto que venda en mi tienda?",
      a: "Cero comisiones por venta de plataforma. Todo el dinero de tus ventas es 100% tuyo. Únicamente aplican las tarifas estándar de la pasarela de pago bancaria que elijas (como Wompi o PSE)."
    },
    {
      q: "¿Puedo usar la plataforma si solo vendo por internet y no tengo local físico?",
      a: "Sí, totalmente. Puedes usarla como tienda online exclusiva o activar el punto de venta (POS) y las órdenes de trabajo si también tienes un establecimiento físico."
    },
    {
      q: "¿Cómo recibo el dinero de las ventas por internet?",
      a: "El dinero entra directo a tu cuenta bancaria (Bancolombia, Davivienda, etc.) a través de pasarelas automáticas como Wompi o pagos móviles por Nequi."
    },
    {
      q: "¿Puedo subir productos nuevos y cambiar precios yo mismo?",
      a: "Sí. Tienes un panel de control intuitivo en tu celular o computador donde puedes agregar productos, fotos, variantes de tallas/colores y modificar precios en 30 segundos sin depender de programadores."
    },
    {
      q: "¿Cuánto tiempo tarda PRIGMA en dejar mi tienda lista?",
      a: "En menos de 3 a 5 días hábiles dejamos tu tienda configurada con tu logo, colores, dominio propio, pasarela de pago y tu catálogo inicial cargado."
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gray-950">
      
      {/* Fondo con resplandor */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Banner de Oferta Llave en Mano */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-950 border border-purple-500/30 p-8 sm:p-14 lg:p-16 shadow-2xl shadow-purple-950/40 text-center relative overflow-hidden mb-20">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Implementación Llave en Mano PRIGMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Empezá a vender online y en mostrador{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
              con tu propia marca.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-light">
            Nosotros nos encargamos del montaje técnico completo: diseño con tu identidad, pasarelas de pago, configuración de inventario y capacitación para tu equipo.
          </p>

          {/* Lista de lo que incluye */}
          <div className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-10">
            {[
              "Tienda online de alta velocidad con tu marca y colores",
              "Punto de venta (POS) para tu local físico sincronizado",
              "Módulo de órdenes de trabajo / taller técnico si aplica",
              "Pasarelas de pago (PSE, Wompi, Nequi y Contraentrega)",
              "Portal de tracking de envíos en tiempo real para clientes",
              "Dominio web propio .com o .co con certificado SSL",
              "Cero comisiones de plataforma sobre tus ventas",
              "Capacitación completa y soporte técnico directo de PRIGMA"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-950/60 border border-gray-800 text-xs sm:text-sm text-gray-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Principal con Dimensiones y Márgenes Estandarizados */}
          <div className="mt-10 mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <a
              href="https://wa.me/573105741639?text=Hola%20PRIGMA,%20quiero%20cotizar%20la%20plataforma%20de%20E-commerce%20y%20POS%20para%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-950/50 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-purple-400/30 w-full sm:w-auto max-w-sm"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform shrink-0">
                <MessageCircle className="w-4 h-4 text-emerald-300 fill-emerald-400/20" />
              </span>
              <span className="whitespace-nowrap tracking-wide">Comenzar por WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-purple-200 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
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
