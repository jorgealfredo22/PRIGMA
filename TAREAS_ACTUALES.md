# Tareas de Prigmate (Base de Datos Supabase)

Este documento refleja el estado en tiempo real de las tareas almacenadas en Supabase (15 tareas en total).

---

## 1. Estado en Base de Datos (JSON Actualizado)

```json
[
  {
    "id": "98ff6354-3c48-4fc5-ba36-f11cbe999f0b",
    "task_code": "FE-01",
    "title": "Módulo Frontend de Configuración de Triage IA (Ajustes -> IA)",
    "description": "[OBJETIVO]: Crear la interfaz gráfica en Ajustes -> Agente IA en Vue 3 para gestionar reglas de clasificación de intenciones, asignación de equipos, etiquetas y prioridad.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Vue 3 Composition API con script setup\n• Vue Router en Dashboard de Chatwoot\n• Tokens de diseño y Theming Dinámico en Tailwind de Prigmate\n• Cliente API y Store de Estado\n• Componentes UI reutilizables (Botones, Modales, Inputs)\n\n[PASO A PASO]:\n1. Registrar la ruta /settings/ai-triage en settings.routes.js y añadir el enlace en la barra lateral de Ajustes.\n2. Crear la vista principal y el modal de creación/edición en app/javascript/dashboard/routes/dashboard/settings/ai/.\n3. Crear el cliente API en app/javascript/dashboard/api/aiTriage.js para conectar con los endpoints de Rails.\n4. Probar creación de intenciones con selectores de equipos y etiquetas dinámicas.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO usar Options API ni CSS plano o colores fijos en hexadecimal (usar clases de Tailwind de Prigmate).\n• NO reimplementar componentes existentes en la librería base de Chatwoot.\n• Garantizar soporte completo para Modo Oscuro y adaptación a colores de marca blanca.",
    "project": "Prigmate",
    "assignee_name": "jorge_aris@prigma.net",
    "status": "pending",
    "priority": "urgent",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:06.124+00:00"
  },
  {
    "id": "860690a1-443a-4fd9-bed0-c992ca168dc1",
    "task_code": "FE-04",
    "title": "Selector Visual de Plantillas de WhatsApp Oficial en Chat",
    "description": "[OBJETIVO]: Crear el modal visual en la barra de chat para listar plantillas aprobadas de WhatsApp Cloud API, previsualizar contenido y rellenar variables dinámicas antes del envío.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• WhatsApp Cloud API Message Templates (Meta Graph API)\n• Ventana de 24 horas de WhatsApp y políticas de mensajería\n• Variables dinámicas ({{1}}, {{2}}) y validación de campos obligatorios\n• Componente ReplyBox en Chatwoot Dashboard\n• Reunión de Alineación Técnica Previa (Payloads de WhatsApp)\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica previa con Backend para definir el endpoint que lista plantillas sincronizadas desde Meta.\n2. Integrar el botón de plantillas en la barra de redacción de chat (ReplyBox) visible exclusivamente en canales de WhatsApp.\n3. Construir el modal con buscador de plantillas, vista previa en tiempo real y formulario de reemplazo de variables.\n4. Validar que no se permita el envío si existen variables obligatorias sin completar.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO permitir enviar plantillas con variables requeridas vacías.\n• NO utilizar librerías no oficiales (cero emuladores QR o Baileys; usar 100% WhatsApp Cloud API Oficial).\n• Asegurar que la previsualización respete saltos de línea, negritas y enlaces de la plantilla.",
    "project": "Prigmate",
    "assignee_name": "jorge_aris@prigma.net",
    "status": "pending",
    "priority": "medium",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:06.309+00:00"
  },
  {
    "id": "01a80c30-6660-46a0-a224-bb9a04e15e85",
    "task_code": "BE-03",
    "title": "Servicio de Triage IA (Ai::TriageService) y Job en Sidekiq",
    "description": "[OBJETIVO]: Implementar el servicio en Rails y el job asíncrono en Sidekiq para clasificar mensajes entrantes, auto-etiquetar, derivar a equipos y crear notas privadas de resumen.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Service Objects en Ruby on Rails\n• Sidekiq Background Jobs\n• Ciclo de vida de Mensajes en Chatwoot (Message hooks y eventos)\n• Notas Internas (Internal Notes con private: true)\n• Clientes Ruby de OpenAI / Gemini con salida JSON Schema\n\n[PASO A PASO]:\n1. Crear el servicio app/services/ai/triage_service.rb que invoque al proveedor de LLM configurado y parsee el JSON estructurado.\n2. Crear app/jobs/ai/triage_message_job.rb y dispararlo de forma asíncrona tras la recepción de un mensaje entrante.\n3. Aplicar las acciones en la base de datos: agregar etiquetas, asignar equipo y crear la nota privada interna si needs_human_handoff es true.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO bloquear el hilo web HTTP con llamadas lentas a la IA; procesar siempre en Sidekiq.\n• NO hardcodear API keys ni configuraciones en código fuente (usar ENV).\n• NO tocar ni importar dependencias de enterprise/.",
    "project": "Prigmate",
    "assignee_name": "christianmartinez@prigma.net",
    "status": "pending",
    "priority": "urgent",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:05.534+00:00"
  },
  {
    "id": "d2d2fdd6-21a2-40bc-8644-1dfe0b28efce",
    "task_code": "FE-02",
    "title": "Pantalla de Gestión de Roles y Matriz de Permisos (Ajustes -> Roles)",
    "description": "[OBJETIVO]: Crear la interfaz gráfica en Ajustes -> Roles con tabla y matriz de permisos por checkboxes, e integrar el selector de roles al invitar agentes.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Vue 3 Composition API con script setup\n• Matriz de Permisos por Categorías (Conversaciones, Contactos, Reportes, Ajustes)\n• Modal de Invitación y Edición de Agentes\n• Renderizado Condicional de Permisos en UI (ocultar botones protegidos)\n• Reunión de Alineación Técnica y Contrato de API (Design Spike)\n\n[PASO A PASO]:\n1. Participar en la reunión de alineación técnica con Backend (Jorge) para acordar el contrato JSON de la API de roles y el listado de permisos disponibles.\n2. Registrar la ruta /settings/roles en settings.routes.js y crear las vistas en app/javascript/dashboard/routes/dashboard/settings/roles/.\n3. Diseñar la matriz visual de checkboxes agrupados por área temática para configurar permisos.\n4. Integrar el selector del rol personalizado en el modal de invitar y editar agentes.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO permitir editar ni eliminar los roles protegidos del sistema (Administrador y Agente).\n• NO hardcodear listas estáticas de permisos en el cliente (consumir dinámicamente de la API).\n• Ocultar botones y vistas restringidas (ej. botón Exportar Contactos) según los permisos del usuario activo.",
    "project": "Prigmate",
    "assignee_name": "daniel.rodriguez@prigma.net",
    "status": "pending",
    "priority": "high",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:06.874+00:00"
  },
  {
    "id": "d2e9888a-0bbd-4ebb-9b56-488640a7d30e",
    "task_code": "AI-02",
    "title": "Detección de Frustración, Reglas de Handoff y Alineación Técnica",
    "description": "[OBJETIVO]: Definir las reglas semánticas y umbrales de frustración para pausar el bot y transferir de inmediato al asesor humano con prioridad urgente.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Sentiment Analysis / Análisis de Sentimiento\n• Human Handoff Triggers\n• Umbrales de Confianza (Confidence Thresholds)\n• Prevención de Bucles Infinitos (Fallback Loop Prevention)\n• Alineación de Esquemas de Datos (Technical Spike)\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica previa con los desarrolladores de Backend y Frontend para acordar los campos de datos y razones de handoff.\n2. Redactar en el prompt las reglas semánticas y palabras clave de escalamiento (ej. reclamo, asesor humano, cancelar) para activar needs_human_handoff: true.\n3. Configurar límite estricto de máximo 2 reintentos sin comprensión antes de transferir obligatoriamente al asesor.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO permitir que el bot atrape al usuario en un bucle infinito de respuestas inútiles.\n• NO transferir al agente humano sin incluir el contexto resumido y el motivo.\n• NO arrancar la implementación sin haber consensuado la estructura en la reunión de equipo.",
    "project": "Prigmate",
    "assignee_name": "christianmartinez@prigma.net",
    "status": "pending",
    "priority": "high",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:05.121+00:00"
  },
  {
    "id": "a0ede56a-bb14-4721-bdde-17ab2f3e5554",
    "task_code": "BE-02",
    "title": "Motor de Roles Personalizados y Políticas Pundit en Rails",
    "description": "[OBJETIVO]: Crear el modelo de datos de Custom Roles y extender las políticas Pundit en Rails para controlar permisos granulares (ej. bloquear exportación de contactos y aislar conversaciones).\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Políticas de Autorización Pundit en Ruby on Rails\n• Modelos CustomRole y AccountUser en Chatwoot\n• Migraciones en PostgreSQL (array de strings para permisos)\n• Respuestas HTTP 403 Forbidden para acciones no autorizadas\n• Alineación Técnica Previa con Frontend (Spike de Permisos)\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica previa con Frontend para acordar la lista estándar de slugs de permisos.\n2. Crear migración y modelo CustomRole (account_id, name, permissions) y asociar custom_role_id a account_users.\n3. Extender políticas Pundit (ContactPolicy, ConversationPolicy) agregando helpers como user.has_permission?(:contacts_export).\n4. Implementar el controlador CRUD Api::V1::Accounts::CustomRolesController bajo Pundit.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO romper el funcionamiento de cuentas que sigan usando los roles base (Admin y Agente).\n• NO permitir que un agente con rol personalizado eleve sus privilegios a administrador.\n• NO permitir editar ni borrar los roles protegidos del sistema.",
    "project": "Prigmate",
    "assignee_name": "cristian.arismendy@prigma.net",
    "status": "pending",
    "priority": "high",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:05.937+00:00"
  },
  {
    "id": "43391059-780e-4e4b-8fa3-44ffa1e21c64",
    "task_code": "QA-01",
    "title": "Pruebas de Flujo Completo de Triage IA en WhatsApp y Webchat",
    "description": "[OBJETIVO]: Simular conversaciones reales de extremo a extremo en WhatsApp Oficial y Webchat verificando respuesta del bot < 5s, auto-etiquetado, derivación a equipos y notas privadas de handoff.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Flujo End-to-End de Triage y Handoff\n• Notificaciones en Tiempo Real (WebSockets / ActionCable)\n• Medición de Latencia y Tiempos de Respuesta (< 5s)\n• Bandejas de Entrada de Asesores Humanos\n• Reunión de Alineación Técnica Previa con QA\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica con el equipo para revisar los escenarios prioritarios de prueba (ventas, soporte, quejas).\n2. Enviar mensajes reales por WhatsApp Cloud y Webchat cronometrando que la respuesta de la IA tarde menos de 5 segundos.\n3. Validar que la conversación se auto-etiquete y se asigne al equipo correspondiente según la intención detectada.\n4. Probar la frase \"quiero un asesor humano\" y verificar en la bandeja del agente la notificación y la nota interna privada.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO dar por aprobada la prueba sin verificar la experiencia real del agente humano en su panel.\n• NO permitir que la nota interna amarilla se filtre como mensaje visible para el cliente externo.\n• Validar que el bot quede pausado en el chat una vez transferido al humano.",
    "project": "Prigmate",
    "assignee_name": "daniel.rodriguez@prigma.net",
    "status": "pending",
    "priority": "high",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:07.237+00:00"
  },
  {
    "id": "c1b7bddc-f3fc-4d25-8d7f-24b1cda6c8a6",
    "task_code": "BE-04",
    "title": "Sistema de Feature Flags y Toggles por Cuenta en SuperAdmin",
    "description": "[OBJETIVO]: Exponer toggles por cuenta en el panel SuperAdmin (/super_admin) para habilitar/deshabilitar ai_triage, custom_roles y sla_policies según el plan contratado.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Panel SuperAdmin en Chatwoot (/super_admin con gema Administrate)\n• Modelo Account y helper account.feature_enabled?()\n• Bloqueo de Controladores API con 403 Forbidden si el módulo está apagado\n• Flags globales en .env vs flags individuales por base de datos\n• Reunión de Alineación Técnica Previa (Taxonomía de Flags)\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica con el equipo para fijar las claves canónicas de cada flag (ai_triage, custom_roles, sla_policies, whatsapp_cloud).\n2. Exponer los toggles booleanos en el dashboard de SuperAdmin dentro del formulario de edición de cuentas.\n3. Implementar el helper account.feature_enabled?(:flag_name) con lectura eficiente en base de datos/caché.\n4. Añadir antes de cada controlador API la validación para denegar acceso si la flag está desactivada.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO dejar endpoints API abiertos si la cuenta tiene el módulo apagado.\n• NO depender de servicios SaaS externos de flags (usar base de datos local y Redis).\n• Mantener compatibilidad con los valores por defecto del archivo .env.",
    "project": "Prigmate",
    "assignee_name": "jorge_aris@prigma.net",
    "status": "pending",
    "priority": "medium",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:06.496+00:00"
  },
  {
    "id": "e2fd6e85-db02-4883-9793-0a812600be5c",
    "task_code": "FE-03",
    "title": "Habilitación y Conexión de Vistas de SLA en Dashboard y Reportes",
    "description": "[OBJETIVO]: Desbloquear y conectar las pantallas de SLA en Ajustes y Reportes, reutilizando los componentes existentes y vinculándolos con la API de Rails.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Componentes existentes de SLA (api/sla.js, slaReports.js, locales/es/sla.json)\n• Rutas de Dashboard y Menú Lateral de Ajustes\n• Vistas de Métricas e Informes de Rendimiento\n• Reunión de Alineación Técnica Previa (API Contract Sync)\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica previa con Backend (Jorge) para confirmar los endpoints y payloads JSON de SLA.\n2. Habilitar el acceso a Políticas de SLA en la barra lateral de Ajustes y en la pestaña de Informes.\n3. Conectar los formularios existentes de creación y edición con la API de Rails.\n4. Verificar que las métricas de primera respuesta y resolución se pinten con sus semáforos en los reportes.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO reescribir desde cero componentes de SLA que ya están programados en el repositorio.\n• NO agregar librerías pesadas de gráficos.\n• Ocultar la opción de SLA en el menú si la cuenta tiene la feature flag desactivada.",
    "project": "Prigmate",
    "assignee_name": "daniel.rodriguez@prigma.net",
    "status": "pending",
    "priority": "medium",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:07.06+00:00"
  },
  {
    "id": "db95d721-1780-40bf-8719-cfcb46f786e2",
    "task_code": "AI-01",
    "title": "Diseño de Metaprompt y Contrato JSON Schema para Triage IA",
    "description": "[OBJETIVO]: Diseñar el prompt del sistema maestro y el contrato JSON Schema estricto para clasificar mensajes entrantes con IA y enviarlos al backend.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Metaprompt / System Prompt\n• JSON Schema / Structured Outputs\n• Few-Shot Prompting\n• Human Handoff\n• Temperatura en LLMs\n\n[PASO A PASO]:\n1. Definir el JSON Schema estricto con campos: identified_intent (string), confidence (float 0 a 1), customer_summary (string max 3 líneas), needs_human_handoff (boolean) y suggested_reply (string).\n2. Redactar el System Prompt incluyendo 5 ejemplos Few-Shot deterministas (ventas, soporte, quejas urgentes, saludos y pedido de asesor humano).\n3. Validar consistencia con gpt-4o-mini y gemini-1.5-flash asegurando respuestas en menos de 2 segundos.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• La respuesta debe ser 100% JSON válido sin texto adicional ni markdown envolvente.\n• El prompt total no debe superar los 1500 tokens para cuidar costos y velocidad.\n• NO permitir respuestas inventadas ni alucinaciones si la intención es ambigua (debe marcar needs_human_handoff: true).",
    "project": "Prigmate",
    "assignee_name": "christianmartinez@prigma.net",
    "status": "pending",
    "priority": "urgent",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:04.632+00:00"
  },
  {
    "id": "1e2423e1-0c4b-4fae-8a56-18654503a488",
    "task_code": "AI-03",
    "title": "Plantilla Estructurada de Resumen para Asesores (Notas Internas)",
    "description": "[OBJETIVO]: Estandarizar la plantilla ejecutiva de 3 líneas para la nota interna de Chatwoot, logrando que el asesor comprenda el caso en menos de 5 segundos.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Chatwoot Internal Notes (private: true)\n• Formato Markdown en Chatwoot Dashboard\n• UX para Agentes de Soporte\n• Generación estructurada desde el prompt\n\n[PASO A PASO]:\n1. Definir la plantilla fija en markdown: Resumen IA con viñetas para Cliente, Motivo exacto e Intención/Urgencia.\n2. Ajustar el prompt de AI-01 para que la variable customer_summary genere estrictamente este formato conciso.\n3. Coordinar con Backend (BE-03) para asegurar que el mensaje se guarde siempre con private: true en la base de datos.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO permitir párrafos largos de texto corrido mayores a 50 palabras.\n• NO enviar jamás este resumen como mensaje visible para el cliente final (debe ser estrictamente una nota interna amarilla).",
    "project": "Prigmate",
    "assignee_name": "christianmartinez@prigma.net",
    "status": "pending",
    "priority": "medium",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:05.329+00:00"
  },
  {
    "id": "bd36367e-6591-425b-8d80-b57b6e81e32b",
    "task_code": "BE-01",
    "title": "Controlador CRUD y Motor de Cálculo de SLAs en Rails",
    "description": "[OBJETIVO]: Reincorporar el controlador de políticas SLA bajo Pundit y activar los jobs en Sidekiq para calcular tiempos de primera respuesta (FRT) y resolución (RT).\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Tablas sla_policies, applied_slas y sla_events (ya migradas en base de datos)\n• Métricas FRT (First Response Time) y RT (Resolution Time)\n• Sidekiq Scheduled Jobs y Event Listeners\n• Estados de SLA (hit, breached, active)\n• Alineación de contratos con Frontend (Daniel)\n\n[PASO A PASO]:\n1. Reincorporar app/controllers/api/v1/accounts/sla_policies_controller.rb con CRUD estándar bajo Pundit.\n2. Conectar el listener de eventos de mensaje para asociar la política de SLA al entrar una conversación.\n3. Implementar el job asíncrono app/jobs/conversations/apply_sla_job.rb para evaluar tiempos y marcar breached si vence el plazo.\n4. Realizar una reunión de alineación con Frontend (Daniel) para verificar que las respuestas JSON coincidan con las vistas existentes.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO ejecutar cálculos de tiempo sincrónicos en el request HTTP principal (usar Sidekiq).\n• NO importar ni depender de código de enterprise/.\n• Garantizar que se guarden los registros históricos en sla_events para los informes.",
    "project": "Prigmate",
    "assignee_name": "cristian.arismendy@prigma.net",
    "status": "pending",
    "priority": "high",
    "estimated_days": 2,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:05.738+00:00"
  },
  {
    "id": "947b78b6-ccd6-4bb8-9bad-090b01bec635",
    "task_code": "QA-02",
    "title": "Pruebas Integrales de Seguridad y Permisos en Roles Restringidos",
    "description": "[OBJETIVO]: Validar exhaustivamente que los usuarios con roles restringidos no puedan acceder a datos sensibles ni ejecutar acciones bloqueadas tanto a nivel visual como en endpoints de API.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Matriz de Permisos y Roles de Usuario\n• Inspección de Tráfico HTTP (Pestaña Network de DevTools)\n• Respuestas 403 Forbidden y Aislamiento de Conversaciones\n• Casos de Prueba de Seguridad (Security Test Cases)\n• Reunión de Alineación Técnica Previa con QA\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación con Backend (Jorge) y Frontend (Daniel) para repasar la matriz de permisos esperada.\n2. Crear cuentas de prueba con roles personalizados restringidos (ej. Vendedor sin permiso de exportar contactos).\n3. Validar que los botones protegidos desaparezcan en la interfaz.\n4. Forzar peticiones directas por API a los endpoints restringidos y asegurar que devuelvan código 403 Forbidden.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO validar únicamente a nivel visual; es obligatorio auditar la pestaña Network de DevTools.\n• NO aprobar la prueba si la API expone datos restringidos en los JSON de respuesta.\n• Documentar cualquier brecha de permisos detectada para su corrección inmediata.",
    "project": "Prigmate",
    "assignee_name": "jorge_aris@prigma.net",
    "status": "pending",
    "priority": "high",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:06.683+00:00"
  },
  {
    "id": "976d313b-118d-44df-82f5-1ca5ac1556c6",
    "task_code": "QA-03",
    "title": "Variables de Entorno de IA y Feature Flags en Docker",
    "description": "[OBJETIVO]: Configurar y verificar las variables de entorno de IA y Feature Flags en docker-compose.production.yaml y .env.example, asegurando un inicio limpio de Rails y Sidekiq.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Docker Compose Multi-Container (Rails, Sidekiq, Postgres, Redis)\n• Inyección de variables de entorno seguras (.env sin trackear en Git)\n• Healthchecks y logs de arranque en Puma y Sidekiq\n• Purgado de caché en Redis (GlobalConfig.clear_cache)\n• Reunión de Alineación Técnica Previa (Variables de Entorno)\n\n[PASO A PASO]:\n1. Realizar una reunión de alineación técnica con Backend para listar todas las nuevas variables requeridas de IA y flags.\n2. Actualizar .env.example y docker-compose.production.yaml inyectando las variables en rails y sidekiq.\n3. Probar un arranque limpio con docker compose up -d y revisar logs para descartar fallos de arranque.\n4. Documentar el comando de purga de caché de Redis al modificar variables globales.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO commitear API keys reales en Git ni repositorios públicos.\n• NO alterar volúmenes persistentes de base de datos de Postgres ni Redis.\n• Asegurar que Sidekiq reciba exactamente las mismas variables de IA que el contenedor web.",
    "project": "Prigmate",
    "assignee_name": "daniel.rodriguez@prigma.net",
    "status": "pending",
    "priority": "medium",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-10T20:42:24.534893+00:00",
    "updated_at": "2026-09-20T03:38:07.422+00:00"
  },
  {
    "id": "caa9db45-1017-4913-91e4-141e2bb3a1b2",
    "task_code": "MKT-01",
    "title": "Creación y Publicación Semanal de Video de Contenido con el Equipo",
    "description": "[OBJETIVO]: Coordinar semanalmente con el equipo la temática de valor y producir/publicar 1 video a la semana mostrando las capacidades y avances de Prigmate/PRIGMA.\\n\\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\\n• Content Marketing y Estrategia B2B en Redes\\n• Storytelling de Producto y Demostraciones Prácticas\\n• Calendario Editorial de Publicaciones\\n• Reunión de Alineación Semanal con el Equipo Técnico\\n\\n[PASO A PASO]:\\n1. Realizar una reunión semanal de alineación con el equipo para acordar el tema del video (casos de uso de IA, marca blanca, SLAs).\\n2. Estructurar el guion del video destacando el problema y la solución que ofrece la plataforma.\\n3. Grabar, editar y publicar 1 video semanal en los canales oficiales de PRIGMA.\\n\\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\\n• NO publicar contenido sin previa validación técnica del equipo sobre lo que hace el software.\\n• Mantener la regularidad de publicar 1 video cada semana.",
    "project": "Prigmate",
    "assignee_name": "fredy.castillo@prigma.net",
    "status": "pending",
    "priority": "medium",
    "estimated_days": 1,
    "due_date": null,
    "created_at": "2026-09-20T03:41:53.669396+00:00",
    "updated_at": "2026-09-20T03:41:53.669396+00:00"
  }
]
```

---

## 2. Registro de Tareas Refinadas y Asignadas al Equipo

### 🎨 FE-01: Módulo Frontend de Configuración de Triage IA (Ajustes -> IA)
- **Código:** `FE-01`
- **Responsable Asignado:** `jorge_aris@prigma.net`
- **Prioridad:** URGENT | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Crear la interfaz gráfica en Ajustes -> Agente IA en Vue 3 para gestionar reglas de clasificación de intenciones, asignación de equipos, etiquetas y prioridad.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Vue 3 Composition API con script setup
• Vue Router en Dashboard de Chatwoot
• Tokens de diseño y Theming Dinámico en Tailwind de Prigmate
• Cliente API y Store de Estado
• Componentes UI reutilizables (Botones, Modales, Inputs)

[PASO A PASO]:
1. Registrar la ruta /settings/ai-triage en settings.routes.js y añadir el enlace en la barra lateral de Ajustes.
2. Crear la vista principal y el modal de creación/edición en app/javascript/dashboard/routes/dashboard/settings/ai/.
3. Crear el cliente API en app/javascript/dashboard/api/aiTriage.js para conectar con los endpoints de Rails.
4. Probar creación de intenciones con selectores de equipos y etiquetas dinámicas.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO usar Options API ni CSS plano o colores fijos en hexadecimal (usar clases de Tailwind de Prigmate).
• NO reimplementar componentes existentes en la librería base de Chatwoot.
• Garantizar soporte completo para Modo Oscuro y adaptación a colores de marca blanca.

---

### 📱 FE-04: Selector Visual de Plantillas de WhatsApp Oficial en Chat
- **Código:** `FE-04`
- **Responsable Asignado:** `jorge_aris@prigma.net`
- **Prioridad:** MEDIUM | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Crear el modal visual en la barra de chat para listar plantillas aprobadas de WhatsApp Cloud API, previsualizar contenido y rellenar variables dinámicas antes del envío.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• WhatsApp Cloud API Message Templates (Meta Graph API)
• Ventana de 24 horas de WhatsApp y políticas de mensajería
• Variables dinámicas ({{1}}, {{2}}) y validación de campos obligatorios
• Componente ReplyBox en Chatwoot Dashboard
• Reunión de Alineación Técnica Previa (Payloads de WhatsApp)

[PASO A PASO]:
1. Realizar una reunión de alineación técnica previa con Backend para definir el endpoint que lista plantillas sincronizadas desde Meta.
2. Integrar el botón de plantillas en la barra de redacción de chat (ReplyBox) visible exclusivamente en canales de WhatsApp.
3. Construir el modal con buscador de plantillas, vista previa en tiempo real y formulario de reemplazo de variables.
4. Validar que no se permita el envío si existen variables obligatorias sin completar.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO permitir enviar plantillas con variables requeridas vacías.
• NO utilizar librerías no oficiales (cero emuladores QR o Baileys; usar 100% WhatsApp Cloud API Oficial).
• Asegurar que la previsualización respete saltos de línea, negritas y enlaces de la plantilla.

---

### ⚙️ BE-03: Servicio de Triage IA (Ai::TriageService) y Job en Sidekiq
- **Código:** `BE-03`
- **Responsable Asignado:** `christianmartinez@prigma.net`
- **Prioridad:** URGENT | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Implementar el servicio en Rails y el job asíncrono en Sidekiq para clasificar mensajes entrantes, auto-etiquetar, derivar a equipos y crear notas privadas de resumen.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Service Objects en Ruby on Rails
• Sidekiq Background Jobs
• Ciclo de vida de Mensajes en Chatwoot (Message hooks y eventos)
• Notas Internas (Internal Notes con private: true)
• Clientes Ruby de OpenAI / Gemini con salida JSON Schema

[PASO A PASO]:
1. Crear el servicio app/services/ai/triage_service.rb que invoque al proveedor de LLM configurado y parsee el JSON estructurado.
2. Crear app/jobs/ai/triage_message_job.rb y dispararlo de forma asíncrona tras la recepción de un mensaje entrante.
3. Aplicar las acciones en la base de datos: agregar etiquetas, asignar equipo y crear la nota privada interna si needs_human_handoff es true.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO bloquear el hilo web HTTP con llamadas lentas a la IA; procesar siempre en Sidekiq.
• NO hardcodear API keys ni configuraciones en código fuente (usar ENV).
• NO tocar ni importar dependencias de enterprise/.

---

### 🎛️ FE-02: Pantalla de Gestión de Roles y Matriz de Permisos (Ajustes -> Roles)
- **Código:** `FE-02`
- **Responsable Asignado:** `daniel.rodriguez@prigma.net`
- **Prioridad:** HIGH | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Crear la interfaz gráfica en Ajustes -> Roles con tabla y matriz de permisos por checkboxes, e integrar el selector de roles al invitar agentes.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Vue 3 Composition API con script setup
• Matriz de Permisos por Categorías (Conversaciones, Contactos, Reportes, Ajustes)
• Modal de Invitación y Edición de Agentes
• Renderizado Condicional de Permisos en UI (ocultar botones protegidos)
• Reunión de Alineación Técnica y Contrato de API (Design Spike)

[PASO A PASO]:
1. Participar en la reunión de alineación técnica con Backend (Jorge) para acordar el contrato JSON de la API de roles y el listado de permisos disponibles.
2. Registrar la ruta /settings/roles en settings.routes.js y crear las vistas en app/javascript/dashboard/routes/dashboard/settings/roles/.
3. Diseñar la matriz visual de checkboxes agrupados por área temática para configurar permisos.
4. Integrar el selector del rol personalizado en el modal de invitar y editar agentes.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO permitir editar ni eliminar los roles protegidos del sistema (Administrador y Agente).
• NO hardcodear listas estáticas de permisos en el cliente (consumir dinámicamente de la API).
• Ocultar botones y vistas restringidas (ej. botón Exportar Contactos) según los permisos del usuario activo.

---

### 🤖 AI-02: Detección de Frustración, Reglas de Handoff y Alineación Técnica
- **Código:** `AI-02`
- **Responsable Asignado:** `christianmartinez@prigma.net`
- **Prioridad:** HIGH | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Definir las reglas semánticas y umbrales de frustración para pausar el bot y transferir de inmediato al asesor humano con prioridad urgente.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Sentiment Analysis / Análisis de Sentimiento
• Human Handoff Triggers
• Umbrales de Confianza (Confidence Thresholds)
• Prevención de Bucles Infinitos (Fallback Loop Prevention)
• Alineación de Esquemas de Datos (Technical Spike)

[PASO A PASO]:
1. Realizar una reunión de alineación técnica previa con los desarrolladores de Backend y Frontend para acordar los campos de datos y razones de handoff.
2. Redactar en el prompt las reglas semánticas y palabras clave de escalamiento (ej. reclamo, asesor humano, cancelar) para activar needs_human_handoff: true.
3. Configurar límite estricto de máximo 2 reintentos sin comprensión antes de transferir obligatoriamente al asesor.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO permitir que el bot atrape al usuario en un bucle infinito de respuestas inútiles.
• NO transferir al agente humano sin incluir el contexto resumido y el motivo.
• NO arrancar la implementación sin haber consensuado la estructura en la reunión de equipo.

---

### 🛡️ BE-02: Motor de Roles Personalizados y Políticas Pundit en Rails
- **Código:** `BE-02`
- **Responsable Asignado:** `cristian.arismendy@prigma.net`
- **Prioridad:** HIGH | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Crear el modelo de datos de Custom Roles y extender las políticas Pundit en Rails para controlar permisos granulares (ej. bloquear exportación de contactos y aislar conversaciones).

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Políticas de Autorización Pundit en Ruby on Rails
• Modelos CustomRole y AccountUser en Chatwoot
• Migraciones en PostgreSQL (array de strings para permisos)
• Respuestas HTTP 403 Forbidden para acciones no autorizadas
• Alineación Técnica Previa con Frontend (Spike de Permisos)

[PASO A PASO]:
1. Realizar una reunión de alineación técnica previa con Frontend para acordar la lista estándar de slugs de permisos.
2. Crear migración y modelo CustomRole (account_id, name, permissions) y asociar custom_role_id a account_users.
3. Extender políticas Pundit (ContactPolicy, ConversationPolicy) agregando helpers como user.has_permission?(:contacts_export).
4. Implementar el controlador CRUD Api::V1::Accounts::CustomRolesController bajo Pundit.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO romper el funcionamiento de cuentas que sigan usando los roles base (Admin y Agente).
• NO permitir que un agente con rol personalizado eleve sus privilegios a administrador.
• NO permitir editar ni borrar los roles protegidos del sistema.

---

### 🧪 QA-01: Pruebas de Flujo Completo de Triage IA en WhatsApp y Webchat
- **Código:** `QA-01`
- **Responsable Asignado:** `daniel.rodriguez@prigma.net`
- **Prioridad:** HIGH | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Simular conversaciones reales de extremo a extremo en WhatsApp Oficial y Webchat verificando respuesta del bot < 5s, auto-etiquetado, derivación a equipos y notas privadas de handoff.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Flujo End-to-End de Triage y Handoff
• Notificaciones en Tiempo Real (WebSockets / ActionCable)
• Medición de Latencia y Tiempos de Respuesta (< 5s)
• Bandejas de Entrada de Asesores Humanos
• Reunión de Alineación Técnica Previa con QA

[PASO A PASO]:
1. Realizar una reunión de alineación técnica con el equipo para revisar los escenarios prioritarios de prueba (ventas, soporte, quejas).
2. Enviar mensajes reales por WhatsApp Cloud y Webchat cronometrando que la respuesta de la IA tarde menos de 5 segundos.
3. Validar que la conversación se auto-etiquete y se asigne al equipo correspondiente según la intención detectada.
4. Probar la frase "quiero un asesor humano" y verificar en la bandeja del agente la notificación y la nota interna privada.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO dar por aprobada la prueba sin verificar la experiencia real del agente humano en su panel.
• NO permitir que la nota interna amarilla se filtre como mensaje visible para el cliente externo.
• Validar que el bot quede pausado en el chat una vez transferido al humano.

---

### 🚩 BE-04: Sistema de Feature Flags y Toggles por Cuenta en SuperAdmin
- **Código:** `BE-04`
- **Responsable Asignado:** `jorge_aris@prigma.net`
- **Prioridad:** MEDIUM | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Exponer toggles por cuenta en el panel SuperAdmin (/super_admin) para habilitar/deshabilitar ai_triage, custom_roles y sla_policies según el plan contratado.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Panel SuperAdmin en Chatwoot (/super_admin con gema Administrate)
• Modelo Account y helper account.feature_enabled?()
• Bloqueo de Controladores API con 403 Forbidden si el módulo está apagado
• Flags globales en .env vs flags individuales por base de datos
• Reunión de Alineación Técnica Previa (Taxonomía de Flags)

[PASO A PASO]:
1. Realizar una reunión de alineación técnica con el equipo para fijar las claves canónicas de cada flag (ai_triage, custom_roles, sla_policies, whatsapp_cloud).
2. Exponer los toggles booleanos en el dashboard de SuperAdmin dentro del formulario de edición de cuentas.
3. Implementar el helper account.feature_enabled?(:flag_name) con lectura eficiente en base de datos/caché.
4. Añadir antes de cada controlador API la validación para denegar acceso si la flag está desactivada.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO dejar endpoints API abiertos si la cuenta tiene el módulo apagado.
• NO depender de servicios SaaS externos de flags (usar base de datos local y Redis).
• Mantener compatibilidad con los valores por defecto del archivo .env.

---

### 📊 FE-03: Habilitación y Conexión de Vistas de SLA en Dashboard y Reportes
- **Código:** `FE-03`
- **Responsable Asignado:** `daniel.rodriguez@prigma.net`
- **Prioridad:** MEDIUM | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Desbloquear y conectar las pantallas de SLA en Ajustes y Reportes, reutilizando los componentes existentes y vinculándolos con la API de Rails.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Componentes existentes de SLA (api/sla.js, slaReports.js, locales/es/sla.json)
• Rutas de Dashboard y Menú Lateral de Ajustes
• Vistas de Métricas e Informes de Rendimiento
• Reunión de Alineación Técnica Previa (API Contract Sync)

[PASO A PASO]:
1. Realizar una reunión de alineación técnica previa con Backend (Jorge) para confirmar los endpoints y payloads JSON de SLA.
2. Habilitar el acceso a Políticas de SLA en la barra lateral de Ajustes y en la pestaña de Informes.
3. Conectar los formularios existentes de creación y edición con la API de Rails.
4. Verificar que las métricas de primera respuesta y resolución se pinten con sus semáforos en los reportes.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO reescribir desde cero componentes de SLA que ya están programados en el repositorio.
• NO agregar librerías pesadas de gráficos.
• Ocultar la opción de SLA en el menú si la cuenta tiene la feature flag desactivada.

---

### 🤖 AI-01: Diseño de Metaprompt y Contrato JSON Schema para Triage IA
- **Código:** `AI-01`
- **Responsable Asignado:** `christianmartinez@prigma.net`
- **Prioridad:** URGENT | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Diseñar el prompt del sistema maestro y el contrato JSON Schema estricto para clasificar mensajes entrantes con IA y enviarlos al backend.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Metaprompt / System Prompt
• JSON Schema / Structured Outputs
• Few-Shot Prompting
• Human Handoff
• Temperatura en LLMs

[PASO A PASO]:
1. Definir el JSON Schema estricto con campos: identified_intent (string), confidence (float 0 a 1), customer_summary (string max 3 líneas), needs_human_handoff (boolean) y suggested_reply (string).
2. Redactar el System Prompt incluyendo 5 ejemplos Few-Shot deterministas (ventas, soporte, quejas urgentes, saludos y pedido de asesor humano).
3. Validar consistencia con gpt-4o-mini y gemini-1.5-flash asegurando respuestas en menos de 2 segundos.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• La respuesta debe ser 100% JSON válido sin texto adicional ni markdown envolvente.
• El prompt total no debe superar los 1500 tokens para cuidar costos y velocidad.
• NO permitir respuestas inventadas ni alucinaciones si la intención es ambigua (debe marcar needs_human_handoff: true).

---

### 📝 AI-03: Plantilla Estructurada de Resumen para Asesores (Notas Internas)
- **Código:** `AI-03`
- **Responsable Asignado:** `christianmartinez@prigma.net`
- **Prioridad:** MEDIUM | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Estandarizar la plantilla ejecutiva de 3 líneas para la nota interna de Chatwoot, logrando que el asesor comprenda el caso en menos de 5 segundos.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Chatwoot Internal Notes (private: true)
• Formato Markdown en Chatwoot Dashboard
• UX para Agentes de Soporte
• Generación estructurada desde el prompt

[PASO A PASO]:
1. Definir la plantilla fija en markdown: Resumen IA con viñetas para Cliente, Motivo exacto e Intención/Urgencia.
2. Ajustar el prompt de AI-01 para que la variable customer_summary genere estrictamente este formato conciso.
3. Coordinar con Backend (BE-03) para asegurar que el mensaje se guarde siempre con private: true en la base de datos.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO permitir párrafos largos de texto corrido mayores a 50 palabras.
• NO enviar jamás este resumen como mensaje visible para el cliente final (debe ser estrictamente una nota interna amarilla).

---

### ⏱️ BE-01: Controlador CRUD y Motor de Cálculo de SLAs en Rails
- **Código:** `BE-01`
- **Responsable Asignado:** `cristian.arismendy@prigma.net`
- **Prioridad:** HIGH | **Estimación:** 2 día(s) | **Estado:** PENDING

[OBJETIVO]: Reincorporar el controlador de políticas SLA bajo Pundit y activar los jobs en Sidekiq para calcular tiempos de primera respuesta (FRT) y resolución (RT).

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Tablas sla_policies, applied_slas y sla_events (ya migradas en base de datos)
• Métricas FRT (First Response Time) y RT (Resolution Time)
• Sidekiq Scheduled Jobs y Event Listeners
• Estados de SLA (hit, breached, active)
• Alineación de contratos con Frontend (Daniel)

[PASO A PASO]:
1. Reincorporar app/controllers/api/v1/accounts/sla_policies_controller.rb con CRUD estándar bajo Pundit.
2. Conectar el listener de eventos de mensaje para asociar la política de SLA al entrar una conversación.
3. Implementar el job asíncrono app/jobs/conversations/apply_sla_job.rb para evaluar tiempos y marcar breached si vence el plazo.
4. Realizar una reunión de alineación con Frontend (Daniel) para verificar que las respuestas JSON coincidan con las vistas existentes.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO ejecutar cálculos de tiempo sincrónicos en el request HTTP principal (usar Sidekiq).
• NO importar ni depender de código de enterprise/.
• Garantizar que se guarden los registros históricos en sla_events para los informes.

---

### 🛡️ QA-02: Pruebas Integrales de Seguridad y Permisos en Roles Restringidos
- **Código:** `QA-02`
- **Responsable Asignado:** `jorge_aris@prigma.net`
- **Prioridad:** HIGH | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Validar exhaustivamente que los usuarios con roles restringidos no puedan acceder a datos sensibles ni ejecutar acciones bloqueadas tanto a nivel visual como en endpoints de API.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Matriz de Permisos y Roles de Usuario
• Inspección de Tráfico HTTP (Pestaña Network de DevTools)
• Respuestas 403 Forbidden y Aislamiento de Conversaciones
• Casos de Prueba de Seguridad (Security Test Cases)
• Reunión de Alineación Técnica Previa con QA

[PASO A PASO]:
1. Realizar una reunión de alineación con Backend (Jorge) y Frontend (Daniel) para repasar la matriz de permisos esperada.
2. Crear cuentas de prueba con roles personalizados restringidos (ej. Vendedor sin permiso de exportar contactos).
3. Validar que los botones protegidos desaparezcan en la interfaz.
4. Forzar peticiones directas por API a los endpoints restringidos y asegurar que devuelvan código 403 Forbidden.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO validar únicamente a nivel visual; es obligatorio auditar la pestaña Network de DevTools.
• NO aprobar la prueba si la API expone datos restringidos en los JSON de respuesta.
• Documentar cualquier brecha de permisos detectada para su corrección inmediata.

---

### 🐳 QA-03: Variables de Entorno de IA y Feature Flags en Docker
- **Código:** `QA-03`
- **Responsable Asignado:** `daniel.rodriguez@prigma.net`
- **Prioridad:** MEDIUM | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Configurar y verificar las variables de entorno de IA y Feature Flags en docker-compose.production.yaml y .env.example, asegurando un inicio limpio de Rails y Sidekiq.

[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:
• Docker Compose Multi-Container (Rails, Sidekiq, Postgres, Redis)
• Inyección de variables de entorno seguras (.env sin trackear en Git)
• Healthchecks y logs de arranque en Puma y Sidekiq
• Purgado de caché en Redis (GlobalConfig.clear_cache)
• Reunión de Alineación Técnica Previa (Variables de Entorno)

[PASO A PASO]:
1. Realizar una reunión de alineación técnica con Backend para listar todas las nuevas variables requeridas de IA y flags.
2. Actualizar .env.example y docker-compose.production.yaml inyectando las variables en rails y sidekiq.
3. Probar un arranque limpio con docker compose up -d y revisar logs para descartar fallos de arranque.
4. Documentar el comando de purga de caché de Redis al modificar variables globales.

[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:
• NO commitear API keys reales en Git ni repositorios públicos.
• NO alterar volúmenes persistentes de base de datos de Postgres ni Redis.
• Asegurar que Sidekiq reciba exactamente las mismas variables de IA que el contenedor web.

---

### 🎬 MKT-01: Creación y Publicación Semanal de Video de Contenido con el Equipo
- **Código:** `MKT-01`
- **Responsable Asignado:** `fredy.castillo@prigma.net`
- **Prioridad:** MEDIUM | **Estimación:** 1 día(s) | **Estado:** PENDING

[OBJETIVO]: Coordinar semanalmente con el equipo la temática de valor y producir/publicar 1 video a la semana mostrando las capacidades y avances de Prigmate/PRIGMA.\n\n[CONCEPTOS CLAVE A INVESTIGAR / CONOCER]:\n• Content Marketing y Estrategia B2B en Redes\n• Storytelling de Producto y Demostraciones Prácticas\n• Calendario Editorial de Publicaciones\n• Reunión de Alineación Semanal con el Equipo Técnico\n\n[PASO A PASO]:\n1. Realizar una reunión semanal de alineación con el equipo para acordar el tema del video (casos de uso de IA, marca blanca, SLAs).\n2. Estructurar el guion del video destacando el problema y la solución que ofrece la plataforma.\n3. Grabar, editar y publicar 1 video semanal en los canales oficiales de PRIGMA.\n\n[CRITERIOS DE ACEPTACIÓN / QUÉ NO HACER]:\n• NO publicar contenido sin previa validación técnica del equipo sobre lo que hace el software.\n• Mantener la regularidad de publicar 1 video cada semana.

---

*(Todas las 15 tareas han sido refinadas y sincronizadas exitosamente en Supabase)*
