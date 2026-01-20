"use client"

import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Réflexologie Plantaire - Adulte",
    description: "Stimulation des zones réflexes du pied pour rééquilibrer l'organisme et retrouver bien-être et sérénité",
    image: "https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcarousel1.006164e4.jpg&w=640&q=75",
    alt: "Séance de réflexologie plantaire",
    price: 50,
    duration: "55min",
    popular: true,
  },
  {
    title: "Réflexologie Faciale - Adulte",
    description: "Technique douce sur le visage pour une détente profonde et un bien-être immédiat",
    image: "https://img.freepik.com/photos-gratuite/vue-femme-recevant-massage-facial-yoga-pour-rester-jeune_23-2150520736.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Séance de réflexologie faciale",
    price: 50,
    duration: "55min",
    popular: true,
  },
  {
    title: "Séance Découverte",
    description: "Première approche de la réflexologie, idéale pour découvrir les bienfaits de cette technique naturelle",
    image: "https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcarousel4.b65e68fe.jpg&w=640&q=75",
    alt: "Séance découverte réflexologie",
    price: 35,
    duration: "30min",
    popular: false,
  },
  {
    title: "Réflexologie Enfant (-12 ans)",
    description: "Séance adaptée aux enfants pour les aider à gérer stress, sommeil et émotions",
    image: "https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcarousel2.26be78c7.jpg&w=640&q=75",
    alt: "Réflexologie pour enfants",
    price: 40,
    duration: "40min",
    popular: false,
  },
  {
    title: "Réflexologie Bébé (-2 ans)",
    description: "Technique très douce pour apaiser les troubles digestifs, le sommeil et les tensions du bébé",
    image: "https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcarousel6.f8d78da8.jpg&w=640&q=75",
    alt: "Réflexologie pour bébé",
    price: 35,
    duration: "20min",
    popular: false,
  },
  {
    title: "Forfait 5 Séances",
    description: "Économisez 30€ avec notre forfait de 5 séances adultes pour un suivi régulier",
    image: "https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcarousel5.fae78d8a.jpg&w=640&q=75",
    alt: "Forfait réflexologie",
    price: 220,
    duration: "5x55min",
    popular: true,
  },
]

function ServiceCard({
  title,
  description,
  image,
  alt,
  price,
  duration,
  popular
}: typeof services[0]) {
  return (
    <Link href="#booking" className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <img
          src={image || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Popular badge */}
        {popular && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Populaire
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-xl text-white mb-1 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm line-clamp-2 mb-3">
            {description}
          </p>

          {/* Price and duration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">{price} €</span>
              <span className="flex items-center gap-1 text-white/60 text-sm">
                <Clock className="w-3.5 h-3.5" />
                {duration}
              </span>
            </div>
            <span className="flex items-center gap-1 text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Réserver
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="lg:max-w-lg">
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Mes prestations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              La réflexologie
              <br />
              <span className="italic">pour tous</span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-muted-foreground leading-relaxed">
              Adultes, enfants ou bébés, je propose des séances adaptées à chacun pour retrouver équilibre, sérénité et bien-être au quotidien.
            </p>
          </div>
        </div>

        {/* Services Grid - 3 columns on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg group"
          >
            Réserver un soin
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
