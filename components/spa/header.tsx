"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

const navLinks = [
  { label: "Réserver", href: "#booking" },
  { label: "Nos soins", href: "#services" },
  { label: "Bienfaits", href: "#bienfaits" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-serif text-2xl md:text-3xl italic tracking-wide hover:opacity-90 transition-opacity"
            aria-label="Réflexologie Chartres Accueil"
          >
            Réflexologie Chartres
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33618510754"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              aria-label="Appelez-nous"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">06 18 51 07 54</span>
            </a>
            <Link
              href="#booking"
              className="bg-white text-primary px-7 py-3 rounded-full text-sm font-semibold hover:bg-white/95 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-primary/98 backdrop-blur-md border-t border-white/10 px-4 py-6" aria-label="Navigation mobile">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-white/90 hover:text-white hover:bg-white/10 transition-all text-base font-medium tracking-wide py-3 px-4 rounded-lg animate-fade-in stagger-${index + 1}`}
                onClick={() => setIsMenuOpen(false)}
                style={{ opacity: isMenuOpen ? 1 : 0 }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10">
              <a
                href="tel:+33618510754"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors py-3 px-4"
              >
                <Phone className="w-5 h-5" />
                <span>06 18 51 07 54</span>
              </a>
              <Link
                href="#booking"
                className="block mt-3 bg-white text-primary px-6 py-3.5 rounded-full text-sm font-semibold text-center hover:bg-white/95 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
