"use client"

import Link from "next/link"
import { Gift, ArrowRight } from "lucide-react"

export function GiftSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="absolute -inset-4 md:-inset-6 bg-accent/10 rounded-3xl rotate-2" />
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80"
                alt="Femme profitant d'un moment spa paisible avec serviette"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card p-5 rounded-2xl shadow-xl border border-border/30 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Cartes cadeaux</span>
              </div>
              <p className="text-sm text-muted-foreground">Le cadeau parfait pour vos proches</p>
            </div>
          </div>

          {/* Right - Text */}
          <div className="lg:pl-8">
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Cadeau bien-être
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight text-balance">
              Offrez le cadeau du{" "}
              <span className="italic">calme et du bien-être</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Accordez-vous une pause et détendez-vous dans un espace de paix et d&apos;harmonie. Nos professionnels vous offrent une expérience personnalisée qui place votre santé, votre sécurité et votre confort au premier plan.
            </p>

            {/* Features List */}
            <ul className="mt-8 space-y-4">
              {["Forfaits de soins personnalisables", "Valable 12 mois", "Joliment présenté"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#booking"
              className="inline-flex items-center gap-2 mt-10 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg group"
            >
              Acheter une carte cadeau
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
