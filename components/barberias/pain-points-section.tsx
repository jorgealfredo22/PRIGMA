"use client"

import { useEffect, useRef } from "react"
import { AlertCircle, Clock, TrendingUp, UserX, MessageSquareOff, Calculator } from "lucide-react"

export default function PainPointsSection() {
  const counter1Ref = useRef<HTMLSpanElement>(null)
  const counter2Ref = useRef<HTMLSpanElement>(null)
  const counter3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let isMounted = true
    import("animejs").then(({ animate }) => {
      if (!isMounted) return
      if (typeof animate === "function") {
        const obj1 = { val: 0 }
        animate(obj1, {
          val: 85,
          ease: "outExpo",
          duration: 2500,
          onUpdate: () => {
            if (counter1Ref.current) counter1Ref.current.innerText = `-${Math.round(obj1.val)}%`
          }
        })

        const obj2 = { val: 0 }
        animate(obj2, {
          val: 14,
          ease: "outExpo",
          duration: 2500,
          onUpdate: () => {
            if (counter2Ref.current) counter2Ref.current.innerText = `+${Math.round(obj2.val)}h`
          }
        })

        const obj3 = { val: 0 }
        animate(obj3, {
          val: 42,
          ease: "outExpo",
          duration: 2500,
          onUpdate: () => {
            if (counter3Ref.current) counter3Ref.current.innerText = `+${Math.round(obj3.val)}%`
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
            <span>El costo de la gestión tradicional</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            ¿Cuánto dinero y tiempo perdés en la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-300 to-purple-400">
              "trampa de la silla"?
            </span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Pasás el día atendiendo clientes con las tijeras en la mano y la noche respondiendo WhatsApps, cuadrando horarios y sumando comisiones a mano. Es hora de dar el salto de <em>barbero ocupado</em> a <strong>dueño de negocio automatizado</strong>.
          </p>
        </div>

        {/* Comparativa de los 3 Dolores Clásicos */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-5 group-hover:scale-110 transition-transform">
              <UserX className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              Citas olvidadas ("No-Shows")
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Un cliente no avisa y no llega. Silla vacía por 45 minutos significa dinero que nunca recuperás ni vos ni tu barbero.
            </p>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 font-medium">
              💡 <strong>Solución:</strong> Recordatorio automático por WhatsApp 2h antes. Si cancela, liberás el turno a tiempo.
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <MessageSquareOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              Mensajes a deshoras y llamadas
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Contestar <em>"¿tienes libre mañana?"</em> mientras estás cortando pelo o los domingos en tu descanso arruina tu foco y tu tiempo libre.
            </p>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 font-medium">
              💡 <strong>Solución:</strong> Tu link en Instagram y Google Maps disponible 24/7. El cliente ve horarios y se agenda solo.
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md hover:border-purple-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2.5">
              El dolor de calcular comisiones
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Llega el sábado a la noche y toca pasar horas sumando papelitos, revisando libretas y calculando porcentajes para pagarle al equipo.
            </p>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 font-medium">
              💡 <strong>Solución:</strong> El sistema calcula comisiones por barbero al centavo en tiempo real sin errores.
            </div>
          </div>

        </div>

        {/* Métricas con Anime.js */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-gray-900/60 to-indigo-950/40 border border-purple-500/30 backdrop-blur-xl">
          
          <div className="text-center sm:border-r border-gray-800 p-4">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-1">
              <span ref={counter1Ref}>-85%</span>
            </div>
            <p className="text-sm font-semibold text-white">Menos citas no asistidas</p>
            <p className="text-xs text-gray-400 mt-1">Con recordatorios de WhatsApp</p>
          </div>

          <div className="text-center sm:border-r border-gray-800 p-4">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-1">
              <span ref={counter2Ref}>+14h</span>
            </div>
            <p className="text-sm font-semibold text-white">Ahorradas por semana</p>
            <p className="text-xs text-gray-400 mt-1">En contestar chats y cuadrar caja</p>
          </div>

          <div className="text-center p-4">
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 mb-1">
              <span ref={counter3Ref}>+42%</span>
            </div>
            <p className="text-sm font-semibold text-white">Reservas fuera de horario</p>
            <p className="text-xs text-gray-400 mt-1">Clientes agendando de noche</p>
          </div>

        </div>

      </div>
    </section>
  )
}
