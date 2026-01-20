"use client"

import { Moon, Brain, ShieldCheck, Heart } from "lucide-react"

const benefits = [
  {
    icon: Moon,
    title: "Meilleur sommeil",
    description: "Le massage régulier apaise le système nerveux, vous aidant à vous endormir plus rapidement et à profiter d'un repos profond et réparateur."
  },
  {
    icon: Brain,
    title: "Clarté mentale",
    description: "Libérez les tensions émotionnelles et apaisez votre esprit en améliorant la concentration, la productivité et en dissipant naturellement le brouillard mental."
  },
  {
    icon: ShieldCheck,
    title: "Renforcement immunitaire",
    description: "Stimulez le flux lymphatique pour soutenir votre système immunitaire, aidant votre corps à se détoxifier et à se protéger naturellement."
  },
  {
    icon: Heart,
    title: "Circulation améliorée",
    description: "Favorisez une circulation sanguine saine dans tout votre corps, facilitant l'apport de nutriments à la peau, aux organes et aux tissus."
  },
]

export function Benefits() {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Bienfaits santé
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            Transformez votre <span className="italic">bien-être</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Découvrez les puissants bienfaits que les soins spa réguliers apportent à votre corps et votre esprit.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className={`group relative bg-background p-8 rounded-2xl border border-border/30 hover:border-primary/30 hover:shadow-xl transition-all duration-300 ${
                index % 2 === 1 ? 'lg:translate-y-6' : ''
              }`}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
