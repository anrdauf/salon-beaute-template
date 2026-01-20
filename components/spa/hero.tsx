"use client"

import Link from "next/link"
import { ArrowDown, Sparkles } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={siteConfig.heroImage}
          alt={`${siteConfig.name} - Séance`}
          className="w-full h-full object-cover scale-105 object-[75%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-white/90 text-sm font-medium tracking-wide">{siteConfig.tagline}</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] animate-fade-in-up">
            <span className="block sm:inline">{siteConfig.hero.title.line1} </span>
            <span className="block sm:inline italic">{siteConfig.hero.title.line2}</span>
            <span className="block italic text-white/90">{siteConfig.hero.title.line3}</span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-white/80 text-lg md:text-xl max-w-lg leading-relaxed animate-fade-in-up stagger-2">
            {siteConfig.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
            <Link
              href="#booking"
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full text-base font-semibold hover:bg-white/95 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Prendre rendez-vous
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center border-2 border-white/40 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Découvrir nos soins
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-14 flex items-center gap-8 animate-fade-in stagger-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p className="text-white/80 text-sm">{siteConfig.address.street}<br/>{siteConfig.address.postalCode} {siteConfig.address.city}</p>
            </div>
            {siteConfig.googleReviewCount > 0 && (
              <div className="text-white/80">
                <p className="text-sm font-medium">{siteConfig.googleReviewCount} avis clients Google</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-accent" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-sm ml-1">{siteConfig.googleRating}/5</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#bienfaits"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
          aria-label="Défiler pour en savoir plus"
        >
          <span className="text-xs tracking-widest uppercase">Défiler</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
