"use client"

import { Sparkles, Brain, Moon, Heart, Zap, Shield, Award, Clock } from "lucide-react"

const benefits = [
  {
    icon: Brain,
    title: "Réduction du stress",
    description: "Libération des tensions accumulées et apaisement du système nerveux"
  },
  {
    icon: Moon,
    title: "Amélioration du sommeil",
    description: "Favorise un endormissement naturel et un sommeil réparateur"
  },
  {
    icon: Zap,
    title: "Boost d'énergie",
    description: "Stimule la circulation et revitalise l'ensemble de l'organisme"
  },
  {
    icon: Heart,
    title: "Soulagement des douleurs",
    description: "Atténue les tensions musculaires et les inconforts chroniques"
  },
]

const whyChooseMe = [
  { icon: Award, label: "Certifiée RNCP" },
  { icon: Shield, label: "Approche personnalisée" },
  { icon: Clock, label: "+5 ans d'expérience" },
]

export function About() {
  return (
    <section id="bienfaits" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-white/70 font-semibold text-sm tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            Pourquoi me choisir
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
            Les bienfaits de la <span className="italic">réflexologie</span>
          </h2>
          <p className="mt-6 text-primary-foreground/80 leading-relaxed text-lg max-w-2xl mx-auto">
            Technique naturelle et non invasive, la réflexologie active les capacités d&apos;auto-guérison de votre corps pour retrouver équilibre et harmonie.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Me */}
        <div className="flex flex-wrap justify-center gap-4">
          {whyChooseMe.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
