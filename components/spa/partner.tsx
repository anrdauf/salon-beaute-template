"use client"

import Link from "next/link"
import { Zap, Heart, Moon, ArrowRight, ChevronRight } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Gestion du stress et des angoisses",
    description: "La réflexologie aide à dissiper les tensions du quotidien et à retrouver un état de calme intérieur naturellement."
  },
  {
    icon: Heart,
    title: "Soulagement des douleurs",
    description: "En stimulant les zones réflexes, je cible les tensions musculaires, les maux de dos et les douleurs chroniques."
  },
  {
    icon: Moon,
    title: "Amélioration du sommeil",
    description: "Retrouvez un sommeil réparateur grâce à une détente profonde du système nerveux et une libération des tensions."
  },
]

export function Partner() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=700&q=80"
                alt="Thérapeute professionnelle prodiguant un soin"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:-right-6 bg-white text-primary p-5 rounded-2xl shadow-2xl">
              <p className="text-3xl font-serif font-bold">4.9</p>
              <div className="flex gap-0.5 my-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-accent" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">71 avis Google</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-white/70 font-semibold text-sm tracking-widest uppercase mb-4">
              Pourquoi me choisir
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              Les bienfaits de la{" "}
              <span className="italic">réflexologie</span>
            </h2>
            <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed">
              La réflexologie permet de rétablir l&apos;équilibre du corps et de l&apos;esprit. Chaque séance est adaptée à vos besoins pour un accompagnement personnalisé.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                      {feature.title}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#booking"
              className="inline-flex items-center gap-2 mt-10 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/95 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl group"
            >
              Prendre rendez-vous
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
