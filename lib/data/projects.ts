export type Project = {
  id: string
  title: string
  description: string
  image: string
  url: string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: "barberpro",
    title: "BarberPro",
    description: "Sistema de gestión de citas para barberías modernas. Permite administrar turnos, clientes y servicios de forma eficiente.",
    image: "/uploads/mockup-all-framed.png",
    url: "https://barberia-elite-838bf.web.app/",
    tags: ["EJS", "JavaScript"]
  },
  {
    id: "shopflow",
    title: "ShopFlow",
    description: "Plataforma de ventas online optimizada para pequeñas empresas. Gestión de productos, pedidos y pagos en un solo lugar.",
    image: "/uploads/mockup-all-framed(1).png",
    url: "https://ramautolux-tienda.onrender.com",
    tags: ["EJS", "JavaScript"]
  },
  {
    id: "esencity",
    title: "Esencity Barber",
    description: "Barbería y salón de belleza. Plataforma moderna con sistema de reservas, catálogo de servicios de cortes, barba y coloración.",
    image: "/uploads/esencity_mockup.png",
    url: "https://esencitybarber.com/",
    tags: ["React", "Next.js", "Tailwind"]
  },
  {
    id: "vitaminas",
    title: "Vitaminas Pa' Ti",
    description: "Tienda online especializada en vitaminas y suplementos nutricionales. E-commerce completo con carrito de compras y pasarela de pago.",
    image: "/uploads/vitaminas_mockup.png",
    url: "https://vitaminaspati.com/",
    tags: ["React", "Next.js", "Tailwind", "Supabase"]
  }
]
