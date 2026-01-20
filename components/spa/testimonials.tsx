"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sophie Martin",
    location: "Paris 8e",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "Après des semaines de stress liées à une année chargée, ce massage était incroyable. L'aromathérapie et le massage fonctionnent parfaitement ensemble. La relaxation pendant la séance est naturelle et revitalisante.",
    treatment: "Massage aromathérapie"
  },
  {
    name: "Marie Dubois",
    location: "Paris 16e",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "J'ai essayé plusieurs spas dans le quartier et aucun ne rivalise avec l'expérience chez Aura. Des locaux magnifiquement décorés, un personnel attentionné, et le massage aux pierres chaudes est tout simplement divin. Professionnel et impeccablement propre.",
    treatment: "Pierres chaudes"
  },
  {
    name: "Camille Leroy",
    location: "Neuilly-sur-Seine",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    rating: 5,
    text: "Je suis venue ici après des mois de travail intense et de douleurs dorsales. Le personnel accueillant et l'ambiance relaxante m'ont immédiatement mise à l'aise. Le massage a complètement soulagé mes tensions et nœuds. Je recommande vivement !",
    treatment: "Massage tissus profonds"
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 md:py-32 bg-secondary/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Témoignages
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            Ce que nos clients <span className="italic">disent</span>
          </h2>
        </div>

        {/* Testimonials Carousel - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className={`group relative bg-card p-8 rounded-3xl border border-border/30 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ${
                index === 1 ? '-translate-y-4' : ''
              }`}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-2 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              </div>
              
              {/* Rating */}
              <div className="flex gap-1 mb-6 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-foreground leading-relaxed mb-8">&ldquo;{testimonial.text}&rdquo;</p>
              
              {/* Treatment badge */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  {testimonial.treatment}
                </span>
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={`Photo de profil de ${testimonial.name}`}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative bg-card p-8 rounded-3xl border border-border/30 shadow-lg">
            {/* Quote icon */}
            <div className="absolute -top-4 left-6 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Quote className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            
            {/* Rating */}
            <div className="flex gap-1 mb-6 pt-2">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            
            {/* Text */}
            <p className="text-foreground leading-relaxed mb-8">&ldquo;{testimonials[activeIndex].text}&rdquo;</p>
            
            {/* Treatment badge */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                {testimonials[activeIndex].treatment}
              </span>
            </div>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                alt={`${testimonials[activeIndex].name} profile photo`}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
              />
              <div>
                <p className="font-semibold text-foreground">{testimonials[activeIndex].name}</p>
                <p className="text-muted-foreground text-sm">{testimonials[activeIndex].location}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-primary/20 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex ? 'bg-primary w-8' : 'bg-border'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-primary/20 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
