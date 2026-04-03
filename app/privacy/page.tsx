export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        <p className="text-gray-400 mb-8">Última actualización: Abril 2026</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">1. Información que recopilamos</h2>
            <p>En PRIGMA recopilamos información que nos proporcionas voluntariamente a través de nuestro formulario de contacto: nombre, correo electrónico, teléfono y mensaje. No recopilamos datos de navegación ni utilizamos cookies de seguimiento sin tu consentimiento.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">2. Cómo usamos tu información</h2>
            <p>Utilizamos tu información exclusivamente para responder a tu consulta, brindarte información sobre nuestros servicios y, con tu autorización, enviarte comunicaciones comerciales relevantes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">3. Protección de datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">4. Tus derechos</h2>
            <p>De acuerdo con la Ley 1581 de 2012 de Colombia, tenés derecho a acceder, rectificar, actualizar y suprimir tus datos personales. Podés ejercer estos derechos escribiéndonos a info@prigma.com.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white">5. Contacto</h2>
            <p>Para cualquier consulta sobre privacidad, escribinos a <a href="mailto:info@prigma.com" className="text-purple-400 hover:underline">info@prigma.com</a> o llamá al +57 (322) 483-9040.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
