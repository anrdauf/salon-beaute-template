"use client"

import { useState } from "react"
import { Check, ChevronRight, Play } from "lucide-react"

const features = [
  {
    title: "Guérison émotionnelle",
    description: "Créez un espace dans un cadre apaisant favorisant la réduction du stress, le soulagement de l'anxiété et une paix intérieure profonde."
  },
  {
    title: "Rituels de relaxation complète",
    description: "Profitez de soins complets conçus pour apaiser chaque partie de votre corps de la tête aux pieds."
  },
  {
    title: "Experts diplômés en massage",
    description: "Notre équipe est composée de professionnels certifiés avec des années d'expérience pratique."
  },
  {
    title: "Environnement serein inspiré du spa",
    description: "Entrez dans une atmosphère apaisante conçue pour vous transporter vers une tranquillité absolue."
  },
  {
    title: "Expérience de massage personnalisée",
    description: "Chaque séance est adaptée pour répondre à vos besoins uniques et préférences personnelles."
  },
]

export function CalmSenses() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with video play button */}
          <div className="relative group">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=700&q=80"
                alt="Femme se relaxant pendant un soin du visage au spa"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Video play button overlay */}
            <button 
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Regarder la vidéo de présentation"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary ml-1" />
              </div>
            </button>
            
            {/* Video label */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-foreground">Découvrir notre histoire</span>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Notre approche
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              Apaisez vos sens avec des{" "}
              <span className="italic">soins thérapeutiques</span>
            </h2>

            {/* Expandable features */}
            <div className="mt-10 space-y-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`rounded-2xl border transition-all duration-300 cursor-pointer ${
                    expandedIndex === index 
                      ? 'bg-card border-primary/20 shadow-lg' 
                      : 'bg-transparent border-border/50 hover:border-border'
                  }`}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      expandedIndex === index ? 'bg-primary' : 'bg-primary/10'
                    }`}>
                      <Check className={`w-4 h-4 ${expandedIndex === index ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <h3 className="flex-1 font-medium text-foreground">{feature.title}</h3>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      expandedIndex === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                  
                  {/* Expandable content */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed pl-17">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
