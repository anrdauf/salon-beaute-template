"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowRight } from "lucide-react"

const companyLinks = [
  { label: "À propos", href: "#about" },
  { label: "Nos soins", href: "#services" },
  { label: "Notre équipe", href: "#" },
  { label: "Carrières", href: "#" },
]

const serviceLinks = [
  { label: "Réflexologie plantaire", href: "#services" },
  { label: "Réflexologie faciale", href: "#services" },
  { label: "Séance découverte", href: "#services" },
  { label: "Forfait 5 séances", href: "#services" },
]

const policyLinks = [
  { label: "Politique de confidentialité", href: "#" },
  { label: "Conditions générales", href: "#" },
  { label: "Politique d'annulation", href: "#" },
  { label: "FAQ", href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="lg:max-w-md">
              <h3 className="font-serif text-2xl md:text-3xl mb-2">Restez informé</h3>
              <p className="text-primary-foreground/70">
                Inscrivez-vous pour recevoir nos offres exclusives, conseils bien-être et actualités du spa.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 lg:w-auto w-full max-w-md">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary rounded-full font-semibold hover:bg-white/95 transition-colors whitespace-nowrap"
              >
                S&apos;inscrire
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="font-serif text-3xl italic tracking-wide">
              Réflexologie Chartres
            </Link>
            <p className="mt-5 text-primary-foreground/70 leading-relaxed max-w-sm">
              Mélinda Favris, réflexologue certifiée RNCP à Chartres. Je vous accompagne vers le bien-être grâce à la réflexologie plantaire et faciale.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Suivez-nous sur Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Suivez-nous sur Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Entreprise</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Nos soins</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary-foreground/50 flex-shrink-0" />
                <span className="text-primary-foreground/70">19 rue du Faubourg Guillaume,<br />28000 Chartres</span>
              </li>
              <li>
                <a href="tel:+33618510754" className="flex gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5 text-primary-foreground/50 flex-shrink-0" />
                  <span>06 18 51 07 54</span>
                </a>
              </li>
              <li>
                <a href="mailto:melinda.favris@gmail.com" className="flex gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5 text-primary-foreground/50 flex-shrink-0" />
                  <span>melinda.favris@gmail.com</span>
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary-foreground/50 flex-shrink-0" />
                <span className="text-primary-foreground/70">Mar, Jeu, Ven : 9h-19h<br />Mer : 9h-13h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Réflexologie Chartres - Mélinda Favris. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-6">
              {policyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
