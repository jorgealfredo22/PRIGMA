"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Sparkles, Calendar, MessageCircle, ArrowRight, Menu, X } from "lucide-react"

export default function BarberiasNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-950/85 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-950/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Logo PRIGMA + Badge de Producto */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/prigma_logo_sin_fondo.png"
                alt="PRIGMA Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              PRIGMA
            </span>
          </Link>
          <span className="h-5 w-px bg-gray-800 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-medium">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Barber Pro</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
          <a href="#beneficios" className="hover:text-purple-400 transition-colors">
            Beneficios
          </a>
          <a href="#demo" className="hover:text-purple-400 transition-colors">
            Demo en Vivo
          </a>
          <a href="#roles" className="hover:text-purple-400 transition-colors">
            Características
          </a>
          <a href="#whatsapp" className="hover:text-purple-400 transition-colors">
            WhatsApp Bot
          </a>
          <a href="#personalizacion" className="hover:text-purple-400 transition-colors">
            Tu Marca
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/573105741639?text=Hola%20PRIGMA,%20quiero%20ver%20una%20demo%20del%20sistema%20de%20citas%20para%20barber%C3%ADas"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Agendar Demo</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-2xl border-b border-gray-800 px-6 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 text-base font-medium text-gray-300">
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-purple-400 transition-colors py-1"
            >
              Beneficios
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-purple-400 transition-colors py-1"
            >
              Demo en Vivo
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-purple-400 transition-colors py-1"
            >
              Características
            </a>
            <a
              href="#whatsapp"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-purple-400 transition-colors py-1"
            >
              WhatsApp Bot
            </a>
            <a
              href="#personalizacion"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-purple-400 transition-colors py-1"
            >
              Tu Marca
            </a>
          </div>
          <div className="pt-4 border-t border-gray-800">
            <a
              href="https://wa.me/573105741639?text=Hola%20PRIGMA,%20quiero%20ver%20una%20demo%20del%20sistema%20de%20citas%20para%20barber%C3%ADas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30"
            >
              <span>Solicitar Demo por WhatsApp</span>
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
