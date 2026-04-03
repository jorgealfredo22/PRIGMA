export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PRIGMA",
    "url": "https://prigma.com",
    "logo": "https://prigma.com/images/prigma_logo_sin_fondo.png",
    "description": "Desarrollo de software personalizado para empresas en Colombia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sogamoso",
      "addressCountry": "CO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-322-483-9040",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      "https://github.com/Christian3h",
      "https://github.com/0LAYUS",
      "https://github.com/Danieln416",
      "https://github.com/jorgealfredo22"
    ],
    "founders": [
      {
        "@type": "Person",
        "name": "Christian"
      },
      {
        "@type": "Person",
        "name": "Cristian Arismendy"
      },
      {
        "@type": "Person",
        "name": "Daniel Rodriguez"
      },
      {
        "@type": "Person",
        "name": "Jorge Alfredo Arismendy"
      }
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PRIGMA",
    "image": "https://prigma.com/images/prigma_logo_sin_fondo.png",
    "url": "https://prigma.com",
    "telephone": "+57-322-483-9040",
    "email": "info@prigma.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sogamoso",
      "addressRegion": "Boyacá",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 5.7137,
      "longitude": -72.9342
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$"
  }

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PRIGMA",
    "url": "https://prigma.com",
    "description": "Desarrollo de software a medida en Colombia",
    "inLanguage": "es-CO",
    "potentialAction": {
      "@type": "ContactAction",
      "target": "https://prigma.com/contacto",
      "name": "Contactar PRIGMA"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta desarrollar un software a medida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El costo varía según las necesidades específicas de cada empresa. No trabajamos con precios estándar, ya que cada proyecto requiere un análisis personalizado. Lo que sí te garantizamos es total transparencia: analizamos tu idea, te asesoramos y te entregamos una propuesta clara, sin compromiso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda un proyecto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende del tipo de solución. Contamos con sistemas ya desarrollados que podemos adaptar a tu negocio, lo que nos permite implementar algunas soluciones desde 1 semana. Para proyectos completamente a medida, trabajamos por fases con metodologías ágiles, lo que te permite ver avances constantes y obtener resultados desde etapas tempranas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tecnologías usan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabajamos con tecnologías modernas y altamente demandadas como JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, entre otras. Elegimos siempre la mejor tecnología según tu proyecto, priorizando rendimiento, seguridad y escalabilidad a largo plazo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen soporte después de la entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, y es una parte clave de nuestro servicio. No solo entregamos el software, sino que te acompañamos después del lanzamiento para asegurar que todo funcione correctamente. Además, ofrecemos planes de mantenimiento para mejoras continuas, actualizaciones y soporte técnico cuando lo necesites."
        }
      },
      {
        "@type": "Question",
        "name": "¿Trabajan con clientes fuera de Colombia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Trabajamos con empresas en diferentes países de Latinoamérica de forma 100% remota. Nos apoyamos en herramientas de gestión y comunicación que nos permiten mantenerte informado en todo momento y garantizar un proceso ordenado y eficiente."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo ver el avance de mi proyecto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Claro que sí. Tendrás visibilidad total del proyecto desde el inicio. Trabajamos con entregas por etapas, donde podrás revisar avances, probar funcionalidades y dar feedback continuo. Nuestro objetivo es que siempre tengas el control y que el resultado final sea exactamente lo que tu negocio necesita."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@graph": [organizationSchema, localBusinessSchema, webSiteSchema, faqSchema]
        })
      }}
    />
  )
}
