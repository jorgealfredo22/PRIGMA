"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import Link from "next/link"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre"
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Por favor ingresa tu correo electrónico"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingresa un correo válido"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor ingresa tu mensaje"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    const isValid = validateForm()
    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        ...formData,
        time: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
      }

      const result = await emailjs.send(
        "service_edzis5a",
        "template_zto7ojv",
        payload,
        "3KwX8Za1tCdlIKDS5"
      )

      if (result.status === 200) {
        setSubmitResult({ success: true, message: "Mensaje enviado con éxito." })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        throw new Error("Error en el envío")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitResult({
        success: false,
        message: "Hubo un error al enviar el mensaje. Intenta nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Header */}
      <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="relative">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                  <img src="/images/prigma_logo_sin_fondo.png" alt="logo prigma" style={{ width: '70px', height: '70px' }} />
                </h1>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></div>
              </div>
              <p className="text-xs ml-3 mt-1 text-gray-400 hidden sm:block tracking-wider">
                DESARROLLO DE SOFTWARE A MEDIDA
              </p>
            </Link>

            <Link href="/" className="inline-flex items-center text-gray-300 hover:text-white transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
                Contáctanos
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
              </h1>
              <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
                Estamos listos para ayudarte a transformar tu negocio con soluciones tecnológicas a medida. Completa el
                formulario y nos pondremos en contacto contigo a la brevedad.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeIn} className="md:col-span-2">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  {submitResult ? (
                    <div className="text-center py-8">
                      <div className={`w-20 h-20 rounded-full ${submitResult.success ? 'bg-gradient-to-br from-purple-600/20 to-indigo-600/20' : 'bg-gradient-to-br from-red-600/20 to-pink-600/20'} flex items-center justify-center backdrop-blur-sm border ${submitResult.success ? 'border-purple-500/20' : 'border-red-500/20'} mx-auto mb-6`}>
                        {submitResult.success ? (
                          <svg
                            className="w-10 h-10 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <svg
                            className="w-10 h-10 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        )}
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 ${submitResult.success ? 'text-white' : 'text-red-400'}`}>
                        {submitResult.message}
                      </h3>
                      {submitResult.success && (
                        <p className="text-gray-300 mb-6">Nuestro equipo revisará tu mensaje y te contactará pronto.</p>
                      )}
                      <button
                        onClick={() => {
                          setSubmitResult(null)
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            message: ""
                          })
                        }}
                        className={`inline-flex items-center justify-center px-6 py-3 ${submitResult.success ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-red-600 to-pink-600'} text-white font-medium rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300`}
                      >
                        {submitResult.success ? 'Enviar otro mensaje' : 'Intentar nuevamente'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {/* Campo honeypot oculto (anti-spam) */}
                      <input
                        type="text"
                        name="_honey"
                        onChange={handleChange}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre completo <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                            placeholder="Tu nombre"
                          />
                          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Correo electrónico <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                            placeholder="tu@email.com"
                          />
                          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="+57 (312) 345-6789"
                        />
                      </div>
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Mensaje <span className="text-purple-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                          placeholder="Cuéntanos sobre tu proyecto o consulta..."
                        ></textarea>
                        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                      </div>
                      <div className="text-right">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group disabled:opacity-70"
                          whileTap={{ scale: 0.95 }}
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
                            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                          </span>
                          <span className="relative invisible">{isSubmitting ? "Enviando..." : "Enviar mensaje"}</span>
                        </motion.button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Información de contacto (se mantiene igual que en tu código original) */}
              <motion.div variants={fadeIn}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <h3 className="text-xl font-bold mb-6 relative">
                    Información de contacto
                    <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></span>
                  </h3>

                  <div className="space-y-6 mt-8">
                    <div className="flex items-start">
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <a
                          href="mailto:info@prigma.com"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          info@prigma.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
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
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">Teléfono</h4>
                        <a href="tel:+573224839040">
                          <p className="text-center text-purple-400 hover:underline cursor-pointer">
                            +57 (322) 483-9040
                          </p>
                        </a>

                      </div>
                    </div>

                    <div className="flex items-start">
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
                      <div>
                        <h4 className="font-semibold">Ubicación</h4>
                        <p className="text-purple-400">Sogamoso, CO</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h4 className="font-semibold mb-4">Síguenos</h4>
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
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.832-5.63.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.47.977zm4.452-1.090a39.357 39.357 0 00-1.702-6.245c2.807-.316 5.288.209 5.59.262a8.488 8.488 0 01-3.888 5.982z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 py-8 border-t border-gray-800/50 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} PRIGMA. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
