import type { Metadata } from "next"
import BarberiasNav from "@/components/barberias/barberias-nav"
import HeroSection from "@/components/barberias/hero-section"
import PainPointsSection from "@/components/barberias/pain-points-section"
import BentoFeatures from "@/components/barberias/bento-features"
import WhatsappSimulator from "@/components/barberias/whatsapp-simulator"
import ThemeCustomizer from "@/components/barberias/theme-customizer"
import TechSpecsSection from "@/components/barberias/tech-specs-section"
import PricingCta from "@/components/barberias/pricing-cta"
import BarberiasFooter from "@/components/barberias/barberias-footer"

export const metadata: Metadata = {
  title: "Sistema de Citas y Reservas para Barberías | PRIGMA Barber Pro",
  description: "Tu propio sistema web de reservas para barberías. Cero comisiones, tu logo y colores, recordatorios automáticos por WhatsApp y portal privado para tus barberos.",
  keywords: [
    "sistema de citas barbería",
    "software para barberías",
    "agendamiento barbería colombia",
    "reservas online barbería",
    "bot whatsapp barbería",
    "gestión de barberías",
    "software barberos comisiones"
  ],
  openGraph: {
    title: "PRIGMA Barber Pro — El Sistema de Citas Exclusivo para Tu Barbería",
    description: "Multiplica tus reservas 24/7 y elimina las citas no asistidas con recordatorios automáticos de WhatsApp. Tu marca, cero comisiones.",
    url: "https://prigma.net/productos/barberias",
    siteName: "PRIGMA",
    locale: "es_CO",
    type: "website"
  }
}

export default function BarberiasProductPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Navegación PRIGMA oficial */}
      <BarberiasNav />

      {/* Hero Principal con Mockup Interactivo */}
      <div id="demo">
        <HeroSection />
      </div>

      {/* El Dolor: Salir de la 'Trampa de la Silla' & Métricas Anime.js */}
      <PainPointsSection />

      {/* Bento Grid: Cliente, Barbero, Dueño */}
      <BentoFeatures />

      {/* Automatización de WhatsApp en Vivo */}
      <WhatsappSimulator />

      {/* Simulador de Marca y Colores Personalizados */}
      <ThemeCustomizer />

      {/* Infraestructura Cloudflare & Calidad PRIGMA */}
      <TechSpecsSection />

      {/* Oferta Llave en Mano, FAQ y CTA Final */}
      <PricingCta />

      {/* Footer */}
      <BarberiasFooter />
    </div>
  )
}
