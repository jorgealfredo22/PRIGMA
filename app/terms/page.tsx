export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
        <p className="text-gray-400 mb-8">Última actualización: Abril 2026</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">1. Servicios</h2>
            <p>PRIGMA ofrece servicios de desarrollo de software a medida, incluyendo desarrollo web, aplicaciones móviles, sistemas ERP/CRM, integración de sistemas y soporte técnico. Cada proyecto se acuerda mediante un contrato individual con alcance, plazos y presupuesto definidos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">2. Proceso de trabajo</h2>
            <p>Trabajamos con metodología ágil, realizando entregas incrementales cada 2 semanas. El cliente tiene acceso al código fuente y puede dar feedback en cada etapa. Los plazos acordados son estimaciones basadas en los requerimientos definidos al inicio del proyecto.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">3. Pagos</h2>
            <p>Los términos de pago se definen en cada contrato. Generalmente trabajamos con un esquema de pago inicial (30-50%) y pagos paritarios asociados a hitos de entrega. Los precios están expresados en pesos colombianos (COP).</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">4. Propiedad intelectual</h2>
            <p>Una vez completado el pago total del proyecto, el código fuente y todos los derechos de propiedad intelectual se transfieren al cliente. PRIGMA se reserva el derecho de mostrar el proyecto en su portfolio a menos que se acuerde lo contrario.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">5. Garantía y soporte</h2>
            <p>Todos nuestros proyectos incluyen un período de garantía post-entrega para corrección de bugs. El soporte adicional y mantenimiento se acuerda mediante planes mensuales separados.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">6. Limitación de responsabilidad</h2>
            <p>PRIGMA no se hace responsable por daños indirectos, pérdida de datos o interrupciones del servicio causados por factores externos. Nuestra responsabilidad máxima se limita al monto total pagado por el cliente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">7. Contacto</h2>
            <p>Para consultas sobre estos términos, escribinos a <a href="mailto:contacto@prigma.net" className="text-purple-400 hover:underline">contacto@prigma.net</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
