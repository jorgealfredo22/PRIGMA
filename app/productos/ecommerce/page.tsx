import type { Metadata } from "next"
import EcommerceNav from "@/components/ecommerce/ecommerce-nav"
import EcommerceHero from "@/components/ecommerce/ecommerce-hero"
import EcommercePainPoints from "@/components/ecommerce/ecommerce-pain-points"
import EcommerceBento from "@/components/ecommerce/ecommerce-bento"
import EcommercePayments from "@/components/ecommerce/ecommerce-payments"
import EcommerceCustomizer from "@/components/ecommerce/ecommerce-customizer"
import EcommerceTechSpecs from "@/components/ecommerce/ecommerce-tech-specs"
import EcommercePricingCta from "@/components/ecommerce/ecommerce-pricing-cta"
import EcommerceFooter from "@/components/ecommerce/ecommerce-footer"

export const metadata: Metadata = {
  title: "Plataforma de E-commerce & POS para Negocios | PRIGMA E-commerce Pro",
  description: "Tu propia tienda online y punto de venta físico sincronizados en tiempo real. Cero comisiones por venta, pagos por PSE/Wompi, control de stock y seguimiento de envíos.",
  keywords: [
    "tienda online colombia",
    "software punto de venta pos",
    "ecommerce y pos unificado",
    "crear tienda online colombia",
    "wompi tienda online",
    "ordenes de trabajo servicio tecnico",
    "software para comercio colombia"
  ],
  openGraph: {
    title: "PRIGMA E-commerce Pro — Tu Tienda Online y POS en una sola plataforma",
    description: "Multiplica tus ventas 24/7 sin pagar comisiones por venta a marketplaces. Inventario en tiempo real, pagos PSE y tracking de envíos.",
    url: "https://prigma.net/productos/ecommerce",
    siteName: "PRIGMA",
    locale: "es_CO",
    type: "website"
  }
}

export default function EcommerceProductPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Navegación PRIGMA oficial */}
      <EcommerceNav />

      {/* Hero Principal con Mockup Doble Interactivo (Tienda + POS) */}
      <div id="demo">
        <EcommerceHero />
      </div>

      {/* El Dolor del Comercio: Vender a Ciegas vs. Omnicanal */}
      <EcommercePainPoints />

      {/* Bento Grid: Tienda, POS, Órdenes de Trabajo, Tracking */}
      <EcommerceBento />

      {/* Pasarelas de Pago & Envíos Nacionales */}
      <EcommercePayments />

      {/* Simulador de Rubros y Marca Adaptativa */}
      <EcommerceCustomizer />

      {/* Infraestructura Cloudflare Edge + Supabase */}
      <EcommerceTechSpecs />

      {/* Oferta Llave en Mano, FAQ y CTA Final */}
      <EcommercePricingCta />

      {/* Footer */}
      <EcommerceFooter />
    </div>
  )
}
