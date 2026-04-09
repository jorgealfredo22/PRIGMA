# Plan de Acción SEO - PRIGMA

**Estado actual: 95/100**  
**Objetivo: 100/100**

Este documento contiene las instrucciones paso a paso para completar la optimización SEO de PRIGMA.

---

## 🔥 CRÍTICO - Hacer AHORA (30 minutos total)

### 1. Configurar variable de entorno en Render (5 min)

**Por qué es importante:** Todos los canonical URLs, OpenGraph y el sitemap usan esta variable. Si no está configurada, los canonicals apuntan a un dominio incorrecto.

**Pasos:**

1. Ir a [Render Dashboard](https://dashboard.render.com/)
2. Seleccionar tu aplicación PRIGMA
3. Ir a **Settings** → **Environment** (o "Environment Variables")
4. Click en **Add Environment Variable**
5. Agregar:
   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://prigma.com` (o tu dominio real si es diferente)
6. Click **Save**
7. Render hará un **redeploy automático** (esperar 3-5 minutos)

**Verificar que funcionó:**
- Una vez deployado, ir a `https://tu-dominio.com/sitemap.xml`
- Verificar que las URLs usen tu dominio correcto (no el default de Render)

---

### 2. Configurar Google Search Console (10 minutos)

**Por qué es importante:** Sin Search Console NO podés ver:
- Qué keywords te traen tráfico
- Errores de indexación
- Core Web Vitals reales
- Posición en rankings de Google

**Pasos:**

#### Paso A: Crear cuenta y agregar sitio

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Hacer login con tu cuenta de Google
3. Click en **Agregar propiedad** (o "Add property")
4. Seleccionar **URL prefix** (no "Domain")
5. Ingresar: `https://prigma.com` (o tu dominio real)
6. Click **Continue**

#### Paso B: Verificar propiedad

7. En la pantalla de verificación, seleccionar método: **HTML tag**
8. Copiar el código que aparece (algo como `google-site-verification: abc123xyz456`)
9. Solo copiar la parte después de `content="` y antes de `"` → Ejemplo: `abc123xyz456`

#### Paso C: Agregar código al sitio

10. Abrir el archivo `app/layout.tsx` en tu editor
11. Buscar la línea **70** (o buscar `verification:`)
12. Reemplazar:
    ```tsx
    verification: {
      google: "",
    },
    ```
    Por:
    ```tsx
    verification: {
      google: "abc123xyz456", // ← Pegar tu código acá (sin "google-site-verification:")
    },
    ```

13. **Guardar el archivo**
14. Hacer **commit** y **push** a GitHub:
    ```bash
    git add app/layout.tsx
    git commit -m "feat: add Google Search Console verification"
    git push
    ```

15. Esperar que Render haga el deploy automático (3-5 min)

#### Paso D: Verificar en Google

16. Volver a Google Search Console
17. Click en **Verify**
18. Deberías ver ✅ "Ownership verified"

#### Paso E: Enviar sitemap

19. En el menú lateral, ir a **Sitemaps**
20. En "Add a new sitemap", ingresar: `sitemap.xml`
21. Click **Submit**
22. Debería aparecer como "Success" en 1-2 minutos

**¡Listo!** Google empezará a rastrear tu sitio en las próximas 24-48 horas.

---

### 3. Verificar que el sitio esté en vivo y accesible (5 min)

**Pasos:**

1. Abrir tu sitio en el navegador: `https://prigma.com` (o tu dominio)
2. Verificar que cargue correctamente
3. Abrir DevTools (F12) → Console
4. Verificar que NO haya errores críticos
5. Ir a `https://prigma.com/sitemap.xml` → Verificar que se genere correctamente

---

## 🟡 IMPORTANTE - Hacer esta semana (1 hora total)

### 4. Optimizar Core Web Vitals (30-60 min)

**Por qué es importante:** Es un ranking factor de Google desde 2021. Sitios rápidos rankean mejor.

#### Paso A: Medir performance actual

1. Ir a [PageSpeed Insights](https://pagespeed.web.dev/)
2. Ingresar tu URL: `https://prigma.com`
3. Click **Analyze**
4. Esperar resultados (30-60 segundos)

#### Paso B: Interpretar resultados

Google te dará una puntuación de 0-100 para:
- **Mobile** (más importante)
- **Desktop**

**Métricas clave:**
- **LCP (Largest Contentful Paint):** < 2.5s = Verde ✅
- **INP (Interaction to Next Paint):** < 200ms = Verde ✅
- **CLS (Cumulative Layout Shift):** < 0.1 = Verde ✅

#### Paso C: Optimizaciones comunes

**Si LCP > 2.5s (imagen tarda en cargar):**

1. Abrir `components/home/home-content.tsx`
2. Buscar la imagen del hero (línea ~114 o buscar `"/images/prigma.jpeg"`)
3. Agregar `priority` prop:
   ```tsx
   <Image 
     src="/images/prigma.jpeg" 
     alt="Desarrollador Prigma" 
     fill 
     className="object-cover"
     priority  // ← Agregar esta línea
   />
   ```
4. Guardar, commit y push

**Si INP > 200ms (interacciones lentas):**
- Revisar animaciones de Framer Motion
- Reducir cantidad de animaciones simultáneas

**Si CLS > 0.1 (layout shifts):**
- Ya está bien (todas las imágenes tienen width/height) ✅

#### Paso D: Re-medir después de optimizar

1. Hacer deploy de cambios
2. Esperar 5 minutos
3. Volver a PageSpeed Insights
4. Medir de nuevo
5. Repetir hasta conseguir > 90 en Mobile

**Objetivo:** Verde (90+) en Mobile, Verde (90+) en Desktop

---

### 5. Mejorar navegación interna (15 min)

**Por qué es importante:** Mejora el SEO interno (PageRank) y la UX.

**Problema actual:** El menú del homepage tiene links a secciones de la misma página (#servicios, #proyectos), pero NO a las páginas completas `/servicios`, `/proyectos`, `/pricing`.

**Opción A: Agregar enlaces en el footer del homepage**

1. Abrir `components/home/home-content.tsx`
2. Buscar el footer (línea ~1450 o buscar `<footer`)
3. Encontrar donde están los links a Privacy y Terms
4. Agregar antes de esos links:
   ```tsx
   <div className="space-y-2">
     <h4 className="font-semibold text-white mb-4">Páginas</h4>
     <Link href="/servicios" className="block hover:text-purple-400 transition-colors">
       Servicios
     </Link>
     <Link href="/proyectos" className="block hover:text-purple-400 transition-colors">
       Proyectos
     </Link>
     <Link href="/pricing" className="block hover:text-purple-400 transition-colors">
       Precios
     </Link>
     <Link href="/contacto" className="block hover:text-purple-400 transition-colors">
       Contacto
     </Link>
   </div>
   ```

**Opción B: Cambiar los links del menú**

1. Abrir `components/home/home-content.tsx`
2. Buscar el menú de navegación (línea ~125 o buscar `<nav`)
3. Cambiar los hrefs:
   ```tsx
   {/* Antes */}
   <Link href="#servicios">Servicios</Link>
   
   {/* Después */}
   <Link href="/servicios">Servicios</Link>
   ```
4. Hacer lo mismo para `/proyectos`
5. Agregar un link nuevo a `/pricing`

**Recomendación:** Opción A (footer) es más seguro, no rompe la navegación actual.

---

## 🟢 OPCIONAL - Hacer cuando tengas tiempo

### 6. Refactorizar Schema Markup para usar variable de entorno (10 min)

**Beneficio:** Si cambiás de dominio, no tenés que actualizar manualmente 6 URLs en el schema.

**Pasos:**

1. Abrir `components/schema-markup.tsx`
2. Agregar al inicio (después de la línea 1):
   ```tsx
   const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://prigma.com"
   ```
3. Reemplazar todas las URLs hardcodeadas:
   ```tsx
   // Antes
   "url": "https://prigma.com",
   "logo": "https://prigma.com/images/prigma_logo_sin_fondo.png",
   
   // Después
   "url": SITE_URL,
   "logo": `${SITE_URL}/images/prigma_logo_sin_fondo.png`,
   ```
4. Hacer lo mismo en las líneas 6, 7, 50, 51, 78, 83
5. Guardar, commit y push

---

### 7. Agregar breadcrumbs (30 min)

**Beneficio:** Mejora UX y puede generar rich snippets en Google.

**Ejemplo visual:**
```
Inicio > Servicios
Inicio > Proyectos > BarberPro
```

**Implementación:**

1. Crear componente `components/breadcrumbs.tsx`:
   ```tsx
   import Link from "next/link"
   
   interface BreadcrumbItem {
     label: string
     href?: string
   }
   
   interface BreadcrumbsProps {
     items: BreadcrumbItem[]
   }
   
   export default function Breadcrumbs({ items }: BreadcrumbsProps) {
     return (
       <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
         {items.map((item, index) => (
           <div key={index} className="flex items-center">
             {index > 0 && <span className="mx-2">/</span>}
             {item.href ? (
               <Link href={item.href} className="hover:text-purple-400 transition-colors">
                 {item.label}
               </Link>
             ) : (
               <span className="text-white">{item.label}</span>
             )}
           </div>
         ))}
       </nav>
     )
   }
   ```

2. Usar en páginas:
   ```tsx
   // En app/servicios/page.tsx
   import Breadcrumbs from "@/components/breadcrumbs"
   
   export default function ServiciosPage() {
     return (
       <main>
         <Breadcrumbs items={[
           { label: "Inicio", href: "/" },
           { label: "Servicios" }
         ]} />
         {/* ... resto del contenido */}
       </main>
     )
   }
   ```

---

### 8. Agregar más contenido textual en `/proyectos` (1 hora)

**Beneficio:** Más contenido = mejor ranking para keywords relacionadas.

**Sugerencias:**

1. Agregar sección "Nuestro proceso de trabajo":
   - Discovery (entender el problema)
   - Diseño (mockups y arquitectura)
   - Desarrollo (código)
   - Testing (QA)
   - Lanzamiento (deploy)
   - Mantenimiento (soporte)

2. Agregar sección "Tecnologías que usamos":
   - Frontend: React, Next.js, TypeScript
   - Backend: Node.js, PostgreSQL, MongoDB
   - DevOps: Render, Vercel, AWS

3. Agregar testimonios de clientes (si tenés)

**Meta de palabras:** 300-500 palabras adicionales

---

## 📊 Monitoreo y Métricas

### Semana 1 (después de configurar Search Console)

**Revisar:**
- ¿Google indexó todas las páginas?
  - Ir a Search Console → Coverage
  - Debería ver 7 páginas indexadas (/, /servicios, /proyectos, /pricing, /contacto, /privacy, /terms)
  - Si hay errores, investigar y corregir

### Mes 1

**Revisar:**
- **Impresiones:** ¿Cuántas veces apareció tu sitio en Google?
- **Clicks:** ¿Cuánta gente hizo click?
- **CTR:** Clicks / Impresiones (objetivo: 3-5%)
- **Posición promedio:** Para tus keywords principales (objetivo: top 20)

**Keywords a trackear:**
- "desarrollo de software colombia"
- "desarrollo web sogamoso"
- "desarrollo de software a medida"
- "desarrollo de aplicaciones móviles colombia"

### Mes 3

**Revisar:**
- **Crecimiento de impresiones:** ¿Aumentó 50%+?
- **Backlinks:** ¿Conseguiste links de otros sitios? (usar [Ahrefs Free Backlink Checker](https://ahrefs.com/backlink-checker))
- **Core Web Vitals:** ¿Todas las métricas en verde?

---

## ❓ Preguntas Frecuentes

### ¿Cuánto tarda en aparecer en Google?

- **Indexación:** 1-7 días (después de enviar sitemap)
- **Ranking decente:** 1-3 meses (depende de competencia)
- **Top 3:** 6-12 meses (requiere backlinks y contenido constante)

### ¿Qué pasa si PageSpeed da < 90?

**No te obsesiones.** Un puntaje de 80-89 está BIEN. Google usa los datos reales de usuarios (Core Web Vitals), NO el puntaje de PageSpeed.

**Prioridad:**
1. ✅ LCP < 2.5s
2. ✅ INP < 200ms
3. ✅ CLS < 0.1

Si estas 3 están en verde, estás bien aunque el puntaje sea 85.

### ¿Necesito contratar un SEO?

**NO.** Tu sitio tiene el SEO técnico casi perfecto. Lo que necesitás es:

1. **Contenido:** Escribir blog posts, casos de estudio (opcional)
2. **Backlinks:** Conseguir que otros sitios te linkeen
3. **Tiempo:** El SEO tarda 3-6 meses en mostrar resultados

Si querés acelerar, podés contratar un SEO para la parte de "link building" (conseguir backlinks), pero NO para el SEO técnico (ya está hecho).

### ¿Qué es más importante: SEO o Ads?

**Depende de tu objetivo:**

- **SEO:** Gratis, tarda 3-6 meses, resultados a largo plazo
- **Google Ads:** Pago, resultados inmediatos, se detiene cuando dejás de pagar

**Recomendación:** Hacer ambos. Ads para resultados inmediatos, SEO para construir autoridad a largo plazo.

---

## 🎯 Checklist Final

Marcá cada item cuando lo completes:

### Crítico (hacer HOY)
- [ ] Configurar `NEXT_PUBLIC_SITE_URL` en Render
- [ ] Crear cuenta Google Search Console
- [ ] Agregar código de verificación en `app/layout.tsx`
- [ ] Enviar sitemap a Search Console
- [ ] Verificar que el sitio cargue correctamente

### Importante (hacer esta semana)
- [ ] Medir Core Web Vitals con PageSpeed Insights
- [ ] Optimizar LCP si es necesario (agregar `priority` a imagen del hero)
- [ ] Agregar links a `/servicios`, `/proyectos`, `/pricing` en footer
- [ ] Re-medir PageSpeed después de optimizar

### Opcional (cuando tengas tiempo)
- [ ] Refactorizar schema markup para usar variable de entorno
- [ ] Agregar breadcrumbs
- [ ] Agregar más contenido textual en `/proyectos`
- [ ] Revisar Search Console semanalmente

---

## 🚀 Siguiente Nivel (después de 3 meses)

1. **Analizar competencia:**
   - Buscar "desarrollo de software colombia" en Google
   - Ver quién rankea top 5
   - Analizar: ¿Qué tienen ellos que vos no?

2. **Conseguir backlinks:**
   - Directorios de empresas colombianas
   - Guest posts en blogs de tecnología
   - Partnerships con otras empresas

3. **Crear contenido:**
   - Blog posts (si cambiás de opinión sobre NO tener blog)
   - Casos de estudio detallados
   - Videos explicativos

4. **Local SEO:**
   - Google Business Profile (si tenés oficina física)
   - Directorios locales (Páginas Amarillas Colombia, etc.)

---

**¿Dudas?** Contactame o buscá en Google: "next.js seo best practices"

**Última actualización:** Abril 2026
