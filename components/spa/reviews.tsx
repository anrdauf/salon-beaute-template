"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { quickSpring, smoothTransition } from "@/lib/animations"

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

// Profile animation
const profileContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const profileImageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
}

const profileTextVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
}

// Review card alternating slide-in
const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
    y: 30,
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: index % 2 === 1 ? 16 : 0, // Keep the offset for odd cards
    transition: {
      duration: 0.7,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// Quote icon animation (doux, sans rotation brusque)
const quoteVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.4 + index * 0.2,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// Rating card animation
const ratingCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Rating category stagger
const categoryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const categoryItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

// Mobile carousel slide animation
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4"

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }}
        >
          <Star
            className={`${sizeClass} ${
              i < fullStars
                ? "fill-accent text-accent"
                : i === fullStars && hasHalfStar
                ? "fill-accent/50 text-accent"
                : "fill-muted text-muted"
            }`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"note" | "avis">("note")
  const [direction, setDirection] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const nextReview = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="pt-8 md:pt-12 pb-24 md:pb-32 bg-secondary/50 relative overflow-hidden">
      {/* Decorative elements with fade-in */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mélinda Profile + Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={profileContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Photo Mélinda */}
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white shadow-xl"
            variants={profileImageVariants}
            whileHover={{ scale: 1.05 }}
            transition={quickSpring}
          >
            <img
              src="https://www.reflexologie-chartres.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmelinda.f551a63a.jpg&w=3840&q=75"
              alt="Photo de Mélinda Favris"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.h2
            className="font-serif text-2xl md:text-3xl text-foreground mb-1"
            variants={profileTextVariants}
          >
            Mélinda Favris
          </motion.h2>
          <motion.p
            className="text-primary font-medium mb-2"
            variants={profileTextVariants}
          >
            Réflexologue certifiée RNCP
          </motion.p>
          <motion.p
            className="text-muted-foreground text-sm mb-3"
            variants={profileTextVariants}
          >
            Réflexologie plantaire et faciale
          </motion.p>
          <motion.span
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
            variants={profileTextVariants}
            whileHover={{ scale: 1.05 }}
            transition={quickSpring}
          >
            5+ ans d&apos;expérience
          </motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rating Summary Card */}
          <motion.div
            className="lg:col-span-1"
            variants={ratingCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="bg-card rounded-3xl border border-border/30 overflow-hidden sticky top-24">
              {/* Tabs */}
              <div className="flex border-b border-border/30">
                {["note", "avis"].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab as "note" | "avis")}
                    className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab === "note" ? "Note globale" : "Avis"}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "note" ? (
                    <motion.div
                      key="note"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Overall Score */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.span
                          className="text-5xl font-serif font-bold text-foreground"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                          {overallRating.toFixed(1).replace(".", ",")}
                        </motion.span>
                        <div>
                          <StarRating rating={overallRating} size="lg" />
                          <p className="text-sm text-muted-foreground mt-1">
                            {totalReviews} avis
                          </p>
                        </div>
                      </div>

                      {/* Categories */}
                      <motion.ul
                        className="space-y-3"
                        variants={categoryContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {ratingCategories.map((category) => (
                          <motion.li
                            key={category.name}
                            className="flex items-center justify-between"
                            variants={categoryItemVariants}
                          >
                            <span className="text-sm text-muted-foreground">{category.name}</span>
                            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                              {category.score.toFixed(1).replace(".", ",")}
                              <Star className="w-4 h-4 fill-accent text-accent" />
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      <p className="mt-6 pt-4 border-t border-border/30 text-sm text-muted-foreground">
                        {totalReviews} clients ont donné leur avis
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="avis"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 max-h-[400px] overflow-y-auto"
                    >
                      {reviews.slice(0, 5).map((review, index) => (
                        <motion.div
                          key={index}
                          className="pb-4 border-b border-border/30 last:border-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
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
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Reviews Cards */}
          <div className="lg:col-span-2">
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((review, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{
                    y: index % 2 === 1 ? 8 : -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  }}
                  transition={quickSpring}
                  className="group relative bg-card p-6 rounded-2xl border border-border/30"
                >
                  {/* Quote icon */}
                  <motion.div
                    className="absolute -top-3 -left-1 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg"
                    custom={index}
                    variants={quoteVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Quote className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </motion.div>

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
                    <motion.span
                      className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={quickSpring}
                    >
                      {review.treatment}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={prefersReducedMotion ? {} : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-card p-6 rounded-2xl border border-border/30 shadow-lg"
                  >
                    {/* Quote icon */}
                    <motion.div
                      className="absolute -top-3 left-4 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    >
                      <Quote className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                    </motion.div>

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
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-primary/20 transition-colors"
                  aria-label="Avis précédent"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={quickSpring}
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </motion.button>

                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setDirection(index > activeIndex ? 1 : -1)
                        setActiveIndex(index)
                      }}
                      className="h-2 rounded-full transition-colors"
                      animate={{
                        width: index === activeIndex ? 24 : 8,
                        backgroundColor: index === activeIndex ? "var(--primary)" : "var(--border)",
                      }}
                      transition={{ duration: 0.3 }}
                      aria-label={`Aller à l'avis ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-card hover:border-primary/20 transition-colors"
                  aria-label="Avis suivant"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={quickSpring}
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
