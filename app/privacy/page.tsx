import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad y Eliminación de Datos | PRIGMA',
  description: 'Política de privacidad, tratamiento de datos personales y directrices de eliminación de datos de usuario para los servicios y plataformas de PRIGMA (incluyendo Prigmate y servicios de WhatsApp / Meta).',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <div className="mb-10 pb-6 border-b border-gray-800">
          <span className="text-purple-400 font-semibold text-sm tracking-wider uppercase">Legal & Transparencia</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4 tracking-tight">Política de Privacidad y Tratamiento de Datos</h1>
          <p className="text-gray-400 text-sm">Última actualización: Septiembre 2026 | Válida para PRIGMA Software y sus soluciones SaaS (Prigmate)</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Introducción */}
          <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <p>
              En <strong>PRIGMA</strong> (en adelante, &quot;la Empresa&quot;, &quot;nosotros&quot; o &quot;nuestro&quot;), valoramos profundamente la privacidad y seguridad de los datos de nuestros clientes, usuarios y visitantes. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos, protegemos y eliminamos la información personal cuando utilizas nuestro sitio web <a href="https://prigma.net" className="text-purple-400 hover:underline">prigma.net</a>, nuestras plataformas SaaS (incluyendo <strong>Prigmate</strong> en <a href="https://prigmate.prigma.net" className="text-purple-400 hover:underline">prigmate.prigma.net</a>) y nuestras integraciones oficiales con servicios de mensajería y redes de terceros como <strong>Meta Platforms, Inc. (WhatsApp Cloud API, Facebook Messenger e Instagram)</strong>.
            </p>
          </section>

          {/* 1. Información que recopilamos */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">1.</span> Información que Recopilamos
            </h2>
            <p className="mb-3">Recopilamos la información estrictamente necesaria para la prestación de nuestros servicios:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Datos proporcionados directamente:</strong> Nombre completo, correo electrónico corporativo o personal, número telefónico y detalles de consulta suministrados a través de nuestros formularios de contacto o registro.</li>
              <li><strong>Datos de mensajería y canales integrados (Meta / WhatsApp):</strong> Cuando un usuario o cliente se comunica a través de canales habilitados por nuestra plataforma (WhatsApp, Instagram o Facebook), recopilamos el número de teléfono emisor, nombre de perfil público de WhatsApp/Facebook, identificadores de usuario de la plataforma (User ID / Phone Number ID), fecha, hora y el contenido de los mensajes e imágenes compartidas exclusivamente para atender la conversación.</li>
              <li><strong>Datos técnicos y de uso:</strong> Direcciones IP anonimizadas, tipo de navegador y registros de auditoría operativa de la plataforma para fines de seguridad y prevención de fraudes.</li>
            </ul>
          </section>

          {/* 2. Finalidad del tratamiento */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">2.</span> Finalidad del Tratamiento de Datos
            </h2>
            <p className="mb-3">La información recopilada se utiliza exclusivamente para los siguientes propósitos legítimos:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Brindar atención al cliente, soporte técnico y responder a solicitudes comerciales en tiempo real.</li>
              <li>Facilitar la gestión de conversaciones multicanal y automatizaciones de flujos conversacionales autorizados por el usuario.</li>
              <li>Garantizar el correcto funcionamiento, seguridad y continuidad de nuestras plataformas.</li>
              <li>Cumplir con las obligaciones legales y regulatorias vigentes.</li>
            </ul>
            <p className="mt-3 text-sm text-purple-300 bg-purple-950/30 p-3 rounded-lg border border-purple-900/50">
              <strong>Compromiso expreso:</strong> PRIGMA <strong>NO</strong> vende, arrienda, comercializa ni transfiere datos personales ni historiales de conversación a corredores de datos ni a terceros con fines publicitarios o de telemercadeo no autorizado.
            </p>
          </section>

          {/* 3. Integración con Meta Platforms (WhatsApp, Facebook, Instagram) */}
          <section className="bg-gray-900/70 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">3.</span> Cumplimiento con las Políticas de Meta Platforms
            </h2>
            <p className="mb-3">
              Nuestras herramientas utilizan las APIs oficiales de <strong>Meta Platforms, Inc.</strong> (Meta for Developers), incluyendo <strong>WhatsApp Business Cloud API</strong>, <strong>Facebook Login</strong> e <strong>Instagram Graph API</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm">
              <li>El uso y la transferencia a cualquier otra aplicación de la información recibida de las APIs de Meta se adhieren estrictamente a las <em>Políticas de la Plataforma de Meta</em> y a los <em>Términos del Servicio de WhatsApp Business</em>.</li>
              <li>Los tokens de acceso, identificadores de cuenta comercial (WABA ID) y claves criptográficas son almacenados en repositorios cifrados con acceso restringido.</li>
              <li>Los mensajes procesados vía Webhook se utilizan únicamente para reflejar la conversación en la bandeja asignada al equipo de atención y no son compartidos externamente.</li>
            </ul>
          </section>

          {/* 4. Instrucciones para la Eliminación de Datos de Usuario (Requisito Obligatorio de Meta) */}
          <section id="eliminacion-datos" className="bg-gradient-to-r from-purple-950/40 via-gray-900 to-gray-900 p-6 rounded-xl border border-purple-800/60 scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">4.</span> Instrucciones para la Eliminación de Datos de Usuario (User Data Deletion)
            </h2>
            <p className="mb-4">
              De acuerdo con las directrices para desarrolladores de Meta (Facebook) y la normativa de protección de datos personales, garantizamos a todos los usuarios el derecho irrevocable a solicitar la supresión y eliminación definitiva de sus datos personales de nuestros sistemas.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-950/60 p-4 rounded-lg border border-gray-800">
                <h3 className="font-semibold text-white mb-2">Opción A: Solicitud Directa a PRIGMA (Recomendada)</h3>
                <p className="text-sm text-gray-300 mb-2">Para solicitar la eliminación completa de tus datos de contacto, registros de chat o perfil:</p>
                <ol className="list-decimal pl-6 text-sm space-y-1 text-gray-300">
                  <li>Envía un correo electrónico a <a href="mailto:contacto@prigma.net?subject=Solicitud%20de%20Eliminaci%C3%B3n%20de%20Datos" className="text-purple-400 underline font-medium">contacto@prigma.net</a> con el asunto <strong>&quot;Solicitud de Eliminación de Datos&quot;</strong>.</li>
                  <li>Indica tu nombre, correo y el número de teléfono o identificador de Facebook/WhatsApp que deseas dar de baja.</li>
                  <li>Nuestro equipo procesará tu solicitud y eliminará de forma permanente e irrecuperable tus registros de nuestras bases de datos en un plazo máximo de <strong>48 a 72 horas hábiles</strong>, enviándote la confirmación correspondiente.</li>
                </ol>
              </div>

              <div className="bg-gray-950/60 p-4 rounded-lg border border-gray-800">
                <h3 className="font-semibold text-white mb-2">Opción B: A través de tu cuenta de Facebook</h3>
                <p className="text-sm text-gray-300 mb-2">Si vinculaste tu cuenta mediante Facebook Login:</p>
                <ol className="list-decimal pl-6 text-sm space-y-1 text-gray-300">
                  <li>Ingresa a tu cuenta de Facebook y ve a <strong>Configuración y privacidad &gt; Configuración</strong>.</li>
                  <li>En el menú lateral, selecciona <strong>Apps y sitios web</strong>.</li>
                  <li>Busca la aplicación <strong>PRIGMA / Prigmate</strong> en la lista y haz clic en <strong>Eliminar</strong>.</li>
                  <li>Marca la casilla para eliminar todo el historial y las publicaciones asociadas.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 5. Derechos de los Titulares (Habeas Data) */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">5.</span> Derechos de los Titulares de los Datos
            </h2>
            <p className="mb-3">
              En conformidad con la <strong>Ley Estatutaria 1581 de 2012</strong> de la República de Colombia y estándares internacionales de privacidad (como el RGPD/GDPR), todo titular tiene derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Conocer, actualizar y rectificar sus datos personales frente a PRIGMA.</li>
              <li>Solicitar prueba de la autorización otorgada para el tratamiento de datos.</li>
              <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
              <li>Revocar la autorización o solicitar la supresión de los datos cuando no se respeten los principios y garantías constitucionales.</li>
            </ul>
          </section>

          {/* 6. Seguridad y Almacenamiento */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">6.</span> Seguridad y Medidas de Protección
            </h2>
            <p>
              Implementamos rigurosos estándares de seguridad informática para evitar la alteración, pérdida, acceso no autorizado o uso indebido de los datos. Toda la comunicación entre nuestros clientes y nuestras plataformas viaja cifrada bajo protocolos <strong>SSL/TLS (HTTPS)</strong> de última generación. Los servidores cuentan con firewalls, aislamiento por contenedores y copias de seguridad cifradas.
            </p>
          </section>

          {/* 7. Canal de Contacto */}
          <section className="border-t border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2">
              <span className="text-purple-400">7.</span> Oficial de Privacidad y Contacto
            </h2>
            <p className="mb-4">
              Si tienes preguntas sobre esta política, el tratamiento de tus datos o deseas ejercer tus derechos de Habeas Data, puedes comunicarte a través de nuestros canales oficiales:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-gray-400 block mb-1">Correo Electrónico Oficial:</span>
                <a href="mailto:contacto@prigma.net" className="text-purple-400 hover:underline font-semibold text-base">contacto@prigma.net</a>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-gray-400 block mb-1">Línea Telefónica y WhatsApp:</span>
                <a href="tel:+573112078781" className="text-purple-400 hover:underline font-semibold text-base">+57 (311) 207-8781</a>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              PRIGMA Software &amp; Solutions. Todos los derechos reservados.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
