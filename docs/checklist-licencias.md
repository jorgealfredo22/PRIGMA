✅ Plan de implementación (MVP → crecimiento)
MVP (rápido y sólido)
1) Ruta /dashboard
   - Segmento aislado con layout propio.
   - Sidebar + header usando shadcn (/components/ui).
2) Auth Supabase
   - Login simple (email + magic link).
   - Si no hay sesión → redirect a /login.
3) Licenses en Supabase
   Tabla licenses:
   - id
   - user_id (FK auth.users)
   - key
   - status (active/revoked)
   - plan
   - created_at
   - expires_at
4) Dashboard UI
   - Cards/resumen.
   - Tabla de licencias.
   - Botón “crear licencia”.
---
Hardening (cuando ya funcione)
- RLS estricta (usuario solo ve sus licencias).
- Estados UI: loading/error/empty.
- Logging básico.
---
Crecimiento (cuando esté vivo)
- Roles (admin/owner).
- Equipos o tenants.
- Paginación + filtros.
---
✅ Arquitectura propuesta
App Router
app/
  (public)/      ← landing
  (dashboard)/   ← dashboard
- /dashboard/layout.tsx: layout shell (sidebar/topbar).
- /dashboard/page.tsx: overview con licencias.
- /dashboard/licenses/page.tsx: CRUD.
Auth
- Supabase Auth client-side.
- Control de sesión en layout.
---
⚠️ Riesgos / límites plan gratuito
- Supabase free: límites de conexiones; si no usás bien RLS, estás muerto.
- Render free: cold starts si después agregás API.
- Sin backend propio: la lógica vive en el cliente → RLS debe ser quirúrgica.
---
Alternativas con tradeoffs (para que elijas bien)
1) SSR + server auth → UX top pero más complejidad.
2) API Routes → control y validaciones, pero ya es backend real.
3) Edge middleware → robusto, pero más quilombo con Supabase.
---
Próximo paso (si confirmás)
Te armo:
- Blueprint de archivos exactos.
- Checklist de RLS para licenses.
- Wireframe rápido del dashboard con estilo actual.
Decime sí y arranco.
