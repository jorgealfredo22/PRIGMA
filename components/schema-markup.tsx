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
          "text": "Depende de la complejidad del proyecto. Una app simple puede partir desde $2.000.000 COP, mientras que un sistema empresarial completo puede costar más. La consulta inicial es gratuita y te damos un presupuesto detallado sin compromiso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda un proyecto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un proyecto simple puede estar listo en 4-6 semanas. Sistemas más complejos como ERPs o apps móviles pueden tomar 2-4 meses. Trabajamos con sprints de 2 semanas para que veas avances constantes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tecnologías usan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabajamos con JavaScript, TypeScript, React, Next.js, Node.js, EJS, PostgreSQL, MongoDB y más. Elegimos la tecnología que mejor se adapte a tu proyecto y presupuesto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Ofrecen soporte después de la entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Todos nuestros proyectos incluyen soporte post-entrega. Ofrecemos planes de mantenimiento mensual para actualizaciones, corrección de bugs y mejoras continuas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Trabajan con clientes fuera de Colombia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Aunque estamos basados en Sogamoso, Colombia, trabajamos con clientes de toda Latinoamérica de forma remota. Usamos herramientas de comunicación y gestión de proyectos para mantenernos conectados."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo ver el avance de mi proyecto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutamente. Hacemos entregas incrementales cada 2 semanas y tenés acceso al código fuente desde el día uno. Podés ver el progreso en tiempo real y dar feedback en cada etapa."
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
