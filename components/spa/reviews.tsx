"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const ratingCategories = [
  { name: "Accueil", score: 5.0 },
  { name: "Écoute", score: 5.0 },
  { name: "Cadre & Ambiance", score: 4.9 },
  { name: "Qualité du soin", score: 4.9 },
]

const overallRating = 4.9
const totalReviews = 71

const reviews = [
  {
    name: "Aurélie G.",
    date: "Novembre 2025",
    rating: 5,
    text: "Une séance de relaxation au top, je me sens plus légère et moins fatiguée. Mélinda est une personne douce et à l'écoute. Laissez vous tenter par ses mains de fée !!",
    treatment: "Réflexologie"
  },
  {
    name: "Nicolas S.",
    date: "Août 2025",
    rating: 5,
    text: "Très bonne expérience après un mois de consultation le mal dont je souffrais n'est pas revenu. Je recommande Mme Favris qui plus est très agréable et très professionnelle.",
    treatment: "Réflexologie plantaire"
  },
  {
    name: "Laure",
    date: "Juillet 2022",
    rating: 5,
    text: "Exceptionnelle, je suis stupéfaite des effets de la réflexologie sur mon corps. Je suis arrivée la première fois épuisée, en larmes et dès la fin de la première séance j'ai été agréablement surprise.",
    treatment: "Réflexologie"
  },
  {
    name: "Hélène C.",
    date: "Mars 2023",
    rating: 5,
    text: "Je suis venue pour essayer de gérer mes angoisses. J'ai été très bien accueillie. Melinda est une personne à l'écoute, attentionnée. Elle a su comprendre mes attentes. En une séance, je me sens plus apaisée.",
    treatment: "Réflexologie"
  },
  {
    name: "Benoît B.",
    date: "Décembre 2021",
    rating: 5,
    text: "Melinda a réussi à me soulager de grosse douleur dans le bas du dos par ses points de compressions sur le visage et sur les pieds ! En plus de ça Melinda est très agréable et très professionnelle !",
    treatment: "Réflexologie faciale"
  },
]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4"

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < fullStars
              ? "fill-accent text-accent"
              : i === fullStars && hasHalfStar
              ? "fill-accent/50 text-accent"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"note" | "avis">("note")

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="pt-8 md:pt-12 pb-24 md:pb-32 bg-secondary/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mélinda Profile + Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Photo Mélinda */}
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
            <img
              src="https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmelinda.f551a63a.jpg&w=3840&q=75"
              alt="Photo de Mélinda Favris"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-1">Mélinda Favris</h2>
          <p className="text-primary font-medium mb-2">Réflexologue certifiée RNCP</p>
          <p className="text-muted-foreground text-sm mb-3">Réflexologie plantaire et faciale</p>
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
            5+ ans d&apos;expérience
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rating Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-3xl border border-border/30 overflow-hidden sticky top-24">
              {/* Tabs */}
              <div className="flex border-b border-border/30">
                <button
                  onClick={() => setActiveTab("note")}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === "note"
                      ? "text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Note globale
                </button>
                <button
                  onClick={() => setActiveTab("avis")}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === "avis"
                      ? "text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Avis
                </button>
              </div>

              <div className="p-6">
                {activeTab === "note" ? (
                  /* Note globale tab */
                  <div>
                    {/* Overall Score */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-5xl font-serif font-bold text-foreground">
                        {overallRating.toFixed(1).replace(".", ",")}
                      </span>
                      <div>
                        <StarRating rating={overallRating} size="lg" />
                        <p className="text-sm text-muted-foreground mt-1">
                          {totalReviews} avis
                        </p>
                      </div>
                    </div>

                    {/* Categories */}
                    <ul className="space-y-3">
                      {ratingCategories.map((category) => (
                        <li key={category.name} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{category.name}</span>
                          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                            {category.score.toFixed(1).replace(".", ",")}
                            <Star className="w-4 h-4 fill-accent text-accent" />
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 pt-4 border-t border-border/30 text-sm text-muted-foreground">
                      {totalReviews} clients ont donné leur avis
                    </p>
                  </div>
                ) : (
                  /* Avis tab - Recent reviews list */
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {reviews.slice(0, 5).map((review, index) => (
                      <div
                        key={index}
                        className="pb-4 border-b border-border/30 last:border-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground text-sm">
                              {review.rating.toFixed(1).replace(".", ",")}
                            </span>
                            <Star className="w-4 h-4 fill-accent text-accent" />
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        {review.text && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {review.text}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Cards */}
          <div className="lg:col-span-2">
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((review, index) => (
                <div
                  key={index}
                  className={`group relative bg-card p-6 rounded-2xl border border-border/30 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ${
                    index % 2 === 1 ? "lg:translate-y-4" : ""
                  }`}
                >
                  {/* Quote icon */}
                  <div className="absolute -top-3 -left-1 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {review.rating.toFixed(1).replace(".", ",")}
                      </span>
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>

                  {/* Text */}
                  <p className="text-foreground text-sm leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{review.name}</span>
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      {review.treatment}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="relative bg-card p-6 rounded-2xl border border-border/30 shadow-lg">
                {/* Quote icon */}
                <div className="absolute -top-3 left-4 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {reviews[activeIndex].rating.toFixed(1).replace(".", ",")}
                    </span>
                    <StarRating rating={reviews[activeIndex].rating} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {reviews[activeIndex].date}
                  </span>
                </div>

                {/* Text */}
                <p className="text-foreground text-sm leading-relaxed mb-4">
                  &ldquo;{reviews[activeIndex].text}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {reviews[activeIndex].name}
                  </span>
                  <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                    {reviews[activeIndex].treatment}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-primary/20 transition-colors"
                  aria-label="Avis précédent"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>

                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeIndex ? "bg-primary w-6" : "bg-border"
                      }`}
                      aria-label={`Aller à l'avis ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-primary/20 transition-colors"
                  aria-label="Avis suivant"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
