"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, MouseEvent } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  // Agregamos el estado para controlar la apertura/cierre del modal
  // Añade esto dentro de la función Home, junto a los otros estados
  // const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // Función para abrir el modal
  // const openContactModal = () => setIsContactModalOpen(true)

  useEffect(() => {
    // Función para cerrar el menú móvil y desplazamiento suave
    const handleLinkClick = (e: Event) => {
      // Cerrar el menú móvil
      const mobileMenu = document.getElementById("mobile-menu")
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden")
      }

      // Desplazamiento suave
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute("href")
      if (href && href.startsWith("#")) {
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        targetElement?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }
    }

    // Función para cambiar el estilo del menú al hacer scroll
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const header = document.querySelector("header")
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("bg-gray-950/95")
          header.classList.add("shadow-md")
        } else {
          header.classList.remove("bg-gray-950/95")
          header.classList.remove("shadow-md")
        }
      }
    }

    // Aplicar a todos los enlaces del menú (móvil y escritorio)
    const mobileLinks = document.querySelectorAll("#mobile-menu a")
    const desktopLinks = document.querySelectorAll("nav a")

    const allLinks = [...mobileLinks, ...desktopLinks]

    allLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick)
    })

    // Añadir evento de scroll
    window.addEventListener("scroll", handleScroll)

    // Limpiar eventos
    return () => {
      allLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick)
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Variantes para animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white font-sans">
      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/prigma.jpeg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl"></div>
      </div>


      {/* Header & Navigation */}
      <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  <img src="/images/prigma_logo_sin_fondo.png" alt="logo prigma" style={{ width: '70px', height: '70px' }} />
                </h1>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></div>
              </div>
              <p className="text-xs ml-3 mt-1 text-gray-400 hidden sm:block tracking-wider">
                DESARROLLO DE SOFTWARE A MEDIDA
              </p>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors relative group">
                Servicios
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#pilares" className="text-gray-300 hover:text-white transition-colors relative group">
                Metodología
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link href="#equipo" className="text-gray-300 hover:text-white transition-colors relative group">
                Equipo
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#proyectos" className="text-gray-300 hover:text-white transition-colors relative group">
                Proyectos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#contacto" className="text-gray-300 hover:text-white transition-colors relative group">
                Contacto
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="/contacto"
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Solicitar consulta
                </span>
                <span className="relative invisible">Solicitar consulta</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => document.getElementById("mobile-menu")?.classList.toggle("hidden")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div id="mobile-menu" className="hidden md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link
                href="#servicios"
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800/50"
              >
                Servicios
              </Link>
              <Link
                href="#pilares"
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800/50"
              >
                Metodología
              </Link>
              <Link
                href="#proyectos"
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800/50"
              >
                Proyectos
              </Link>
              <Link
                href="#equipo"
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800/50"
              >
                Equipo
              </Link>
              <Link
                href="#contacto"
                className="text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800/50"
              >
                Contacto
              </Link>
              <div className="pt-2">
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Solicitar consulta
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Soluciones digitales  {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  a la medida de tu negocio
                </span>
              </h2>
              <p className="mb-8 text-gray-300 text-lg leading-relaxed">
                Desarrollamos software personalizado que transforma ideas en soluciones tecnológicas innovadoras,
                optimizando procesos y potenciando el crecimiento de tu empresa.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contacto"
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Solicitar consulta
                  </span>
                  <span className="relative invisible">Solicitar consulta</span>
                </a>

                <Link
                  href="#proyectos"
                  className="inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-transparent border-2 border-gray-700 rounded-full hover:bg-gray-800/30 transition-all duration-300"
                >
                  Ver proyectos
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </Link>
              </div>

              <div className="mt-10 flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-4 text-gray-300">
                  <span className="block text-white font-semibold">100% Garantizado</span>
                  Proyectos entregados a tiempo y con calidad
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-3xl opacity-20"></div>
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-purple-500/20 shadow-2xl shadow-purple-500/10">
                  <Image src="/images/prigma.jpeg" alt="Desarrollador Prigma" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full blur-xl opacity-40"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white mr-3 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <p className="font-medium text-white text-lg">Tecnología de vanguardia para soluciones a medida</p>
          </div>
        </div>
      </div>

      {/* Services Info */}
      <section id="servicios" className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 relative">
                Servicios{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  PRIGMA
                </span>{" "}
                para tu empresa
                <span className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Desarrollo Web y Móvil</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Aplicaciones web y móviles personalizadas para optimizar tus procesos de negocio y mejorar la
                      experiencia de tus usuarios.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sistemas de Gestión Empresarial</h3>
                    <p className="text-gray-300 leading-relaxed">
                      ERP y CRM adaptados a tus necesidades específicas para centralizar y optimizar la gestión de tu
                      empresa.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Integración de Sistemas</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Conectamos todas tus plataformas y sistemas a través de APIs y middleware para un flujo de datos
                      eficiente.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-bold mb-8 relative">
                SOLUCIONES PARA TU INDUSTRIA
                <span className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Desarrollo Web y Móvil */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Desarrollo Web y Móvil</h4>
                  <p className="text-gray-300">
                    Creamos aplicaciones web y móviles personalizadas para mejorar tus procesos y ofrecer una mejor experiencia a tus clientes.
                  </p>
                </div>

                {/* Sistemas de Gestión Empresarial */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M9 21V3M15 21V3" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Sistemas de Gestión Empresarial</h4>
                  <p className="text-gray-300">
                    Implementamos soluciones ERP y CRM ajustadas a tus necesidades para ayudarte a organizar y hacer crecer tu negocio.
                  </p>
                </div>

                {/* Integración de Sistemas */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12h.01M6 12h.01M12 6h.01M12 18h.01M4.93 4.93l.01.01M19.07 19.07l.01.01M4.93 19.07l.01-.01M19.07 4.93l.01-.01" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Integración de Sistemas</h4>
                  <p className="text-gray-300">
                    Conectamos tus plataformas y herramientas digitales para automatizar procesos y mejorar el flujo de información.
                  </p>
                </div>

                {/* Soporte y Mantenimiento */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2 0 .586.24 1.123.627 1.5L7 16h10l-2.627-4.5A2.001 2.001 0 0015 10c0-1.105-.895-2-2-2zm0 0V4m0 4c1.657 0 3 .895 3 2 0 .586-.24 1.123-.627 1.5L17 16H7l2.627-4.5A2.001 2.001 0 009 10c0-1.105.895-2 2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Soporte y Mantenimiento</h4>
                  <p className="text-gray-300">
                    Acompañamos a tu equipo con soporte técnico, actualizaciones y mantenimiento para que todo funcione sin problemas.
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section id="pilares" className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              Nuestros{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                3 pilares
              </span>{" "}
              de desarrollo
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-300 max-w-2xl mx-auto">
              Nuestra metodología se basa en tres pilares fundamentales que garantizan el éxito de cada proyecto y la
              satisfacción de nuestros clientes.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 relative">
                Desarrollo Ágil
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h3>
              <p className="text-center text-gray-300 mb-6">
                Metodologías ágiles para entregas rápidas y adaptación continua a los cambios y necesidades de tu
                negocio.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sprints de desarrollo con entregas incrementales
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Feedback constante durante todo el proceso
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Adaptación rápida a cambios de requerimientos
                </li>
              </ul>
              <div className="text-center">
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 relative">
                Calidad y Seguridad
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h3>
              <p className="text-center text-gray-300 mb-6">
                Código limpio y seguro con pruebas automatizadas que garantizan la fiabilidad de nuestras soluciones.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Implementación de mejores prácticas de seguridad
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Testing automatizado y control de calidad
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Auditorías de seguridad periódicas
                </li>
              </ul>
              <div className="text-center">
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 relative">
                Innovación
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h3>
              <p className="text-center text-gray-300 mb-6">
                Tecnologías de vanguardia para soluciones innovadoras que te posicionan a la cabeza de tu industria.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Implementación de IA
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Soluciones web3
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Adopción de tecnologías emergentes
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Transforma tu negocio hoy,
            </motion.h2>
            <motion.h3 variants={fadeIn} className="text-2xl md:text-3xl font-bold mb-12">
              con soluciones{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                a tu medida
              </span>
            </motion.h3>

            {/* Pricing Card */}
            <motion.div
              variants={fadeIn}
              className="max-w-lg mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                      PRIGMA
                    </h3>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Consultoría tecnológica personalizada
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Desarrollo de software a medida
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Mantenimiento y soporte continuo
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Actualizaciones y mejoras periódicas
                  </li>
                  <li className="flex items-center text-purple-400 font-medium">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Implementación de nuevas tecnologías
                  </li>
                </ul>



                <div className="mb-8">
                  <p className="text-sm text-gray-400 text-center mt-2">Proyectos personalizados según necesidades</p>
                </div>

                <Link
                  href="/contacto"
                  className="w-full relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Solicitar consulta
                  </span>
                  <span className="relative invisible">Solicitar consulta</span>
                </Link>

                <div className="flex justify-center space-x-6 mt-8">
                  <div className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-gray-400 hover:text-purple-400 transition-colors">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipo" className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-3xl opacity-20"></div>
                <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border-2 border-purple-500/20 shadow-2xl shadow-purple-500/10">
                  <Image src="/images/prigma.jpeg" alt="Líder de Equipo Prigma" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full blur-xl opacity-40"></div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
                Nuestro{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  equipo de expertos
                </span>
                <span className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Contamos con un equipo de desarrolladores con más de 3 años de experiencia trabajando de forma constante en proyectos 
                para distintas industrias. Dominamos diversas tecnologías y frameworks, lo que nos permite ofrecer soluciones sólidas, 
                eficientes y adaptadas a las necesidades de tu negocio.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mr-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Certificaciones de primer nivel</h4>
                    <p className="text-sm text-gray-400">Certificados en las tecnologías más demandadas del mercado</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mr-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Equipos multidisciplinarios</h4>
                    <p className="text-sm text-gray-400">
                      Expertos en desarrollo, diseño UX/UI, DevOps y gestión de proyectos
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mr-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Metodologías ágiles</h4>
                    <p className="text-sm text-gray-400">DevOps y CI/CD para entregas continuas y de alta calidad</p>
                  </div>
                </div>
              </div>


            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="proyectos" className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              Proyectos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                destacados
              </span>
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-300 max-w-2xl mx-auto">
              Descubre cómo hemos ayudado a empresas de diferentes industrias a transformar sus negocios con soluciones
              tecnológicas a medida.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Project 1 */}
            <motion.div
              variants={fadeIn}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="h-56 relative overflow-hidden">
                <Image
                  // foto para los proyectos
                  src="/images/prigma.jpeg"
                  alt="Proyecto 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  Sistema ERP para Retail
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Desarrollo de un sistema completo de gestión para cadena de tiendas con módulos de inventario, ventas
                  y CRM.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">React</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Node.js</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">PostgreSQL</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <span>Ver producto</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              variants={fadeIn}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="h-56 relative overflow-hidden">
                <Image
                  // fotos para los proyectos
                  src="/images/prigma.jpeg"
                  alt="Proyecto 2"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  App Móvil Financiera
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Aplicación móvil para gestión financiera personal con integración a múltiples bancos y análisis de
                  gastos.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">React Native</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Firebase</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">API REST</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <span>Ver producto</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              variants={fadeIn}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="h-56 relative overflow-hidden">
                <Image
                  // foto para los proyectos
                  src="/images/prigma.jpeg"
                  alt="Proyecto 3"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  Plataforma de Telemedicina
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Sistema integral para consultas médicas virtuales con gestión de expedientes y recetas electrónicas.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Next.js</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">WebRTC</span>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">MongoDB</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <span>Ver producto</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-gray-700 text-white font-medium rounded-full hover:bg-gray-800/30 transition-all duration-300"
            >
              Ver todos los proyectos
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative z-10 py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              ¿Listo para transformar tu negocio?
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-300 mb-10 text-lg">
              Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos
              tecnológicos.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                href="https://wa.me/573224839040?text=Hola%2C%20estoy%20interesado%20en%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20desarrollo%20de%20software"
                target="_blank" rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Contactar ahora
                </span>
                <span className="relative invisible">Contactar ahora</span>
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Email</h3>
                <p className="text-center text-purple-400">info@prigma.com</p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Teléfono</h3>
                <a href="tel:+573224839040">
                  <p className="text-center text-purple-400 hover:underline cursor-pointer">
                    +57 (322) 483-9040
                  </p>
                </a>

              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 flex items-center justify-center backdrop-blur-sm border border-purple-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Ubicación</h3>
                <p className="text-center text-purple-400">Sogamoso, CO</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 pt-16 pb-8 border-t border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 col-start-2 max-w-[450px] mx-auto " >
              <div className="relative mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  PRIGMA
                </h3>
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></div>
              </div>
              <p className="text-gray-400 mb-6">
                Soluciones de software a medida para transformar tu negocio y optimizar tus procesos.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>


          </div>
          <div className="pt-8 border-t border-gray-800/50 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} PRIGMA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
