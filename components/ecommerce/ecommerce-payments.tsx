"use client"

import { CreditCard, Truck, ShieldCheck, CheckCircle2, DollarSign, Wallet, ArrowRight } from "lucide-react"

export default function EcommercePayments() {
  const paymentMethods = [
    {
      name: "PSE & Bancolombia",
      desc: "Débito bancario en segundos desde cualquier banco de Colombia.",
      badge: "Más utilizado",
      icon: "🏦"
    },
    {
      name: "Nequi & Daviplata",
      desc: "Pago móvil inmediato con código QR o número de celular.",
      badge: "Instantáneo",
      icon: "📱"
    },
    {
      name: "Tarjetas de Crédito / Débito",
      desc: "Visa, Mastercard y American Express con protección antifraude.",
      badge: "Hasta 24 cuotas",
      icon: "💳"
    },
    {
      name: "Pago Contraentrega",
      desc: "El cliente paga en efectivo al recibir el paquete en la puerta de su casa.",
      badge: "Confianza total",
      icon: "💵"
    }
  ]

  return (
    <section id="pagos" className="py-24 relative overflow-hidden bg-gray-950/70 border-t border-gray-800/80">
      
      {/* Luz difusa */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Izquierdo: Copy de Pagos & Logística */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pasarelas Locales e Internacionales</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Cobrá por internet como los grandes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
                sin intermediarios ni demoras.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              Tus clientes no abandonan el carrito porque tienen su método preferido para pagar. El dinero entra directo a tu cuenta de banco sin retenciones raras.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                  ⚡
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Integración Wompi y Pasarelas Colombianas</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Conectamos tu cuenta de Wompi / Bancolombia para recibir fondos automáticamente con las menores comisiones del mercado.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Logística y Despachos Nacionales</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Calculador de tarifa según la ciudad del comprador y generación de guías para Inter rapidísimo, Servientrega y Envia.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Lado Derecho: Grid de Métodos de Pago */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="grid sm:grid-cols-2 gap-4">
              {paymentMethods.map((m, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-emerald-500/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-gray-950 border border-gray-800 group-hover:scale-110 transition-transform">
                      {m.icon}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {m.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{m.name}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-gray-900 to-gray-950 border border-emerald-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certificado SSL y cifrado bancario de 256 bits incluido.</span>
              </div>
              <span className="text-emerald-400 font-bold shrink-0">100% Seguro</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
