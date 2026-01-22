"use client"

import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { quickSpring, smoothTransition } from "@/lib/animations"

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

// Card animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// Image hover animation
const imageHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Popular badge animation
const badgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3 + index * 0.1,
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  }),
}

// Arrow animation on hover
const arrowVariants = {
  rest: { x: 0, opacity: 0 },
  hover: {
    x: 4,
    opacity: 1,
    transition: quickSpring,
  },
}

function ServiceCard({
  title,
  description,
  image,
  alt,
  price,
  duration,
  popular,
  index,
}: typeof services[0] & { index: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href="#booking" className="group block">
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Image with zoom effect */}
          <motion.img
            src={image || "/placeholder.svg"}
            alt={alt}
            className="w-full h-full object-cover"
            variants={prefersReducedMotion ? {} : imageHoverVariants}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Popular badge with scale animation */}
          {popular && (
            <motion.div
              className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold"
              custom={index}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Populaire
            </motion.div>
          )}

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <motion.h3
              className="font-serif text-xl text-white mb-1"
              variants={{
                rest: { color: "#ffffff" },
                hover: { color: "var(--accent)" },
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
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
              <motion.span
                className="flex items-center gap-1 text-white/80 text-sm font-medium"
                variants={arrowVariants}
              >
                Réserver
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>

          {/* Hover overlay glow */}
          <motion.div
            className="absolute inset-0 bg-primary/0 pointer-events-none"
            variants={{
              rest: { backgroundColor: "rgba(var(--primary-rgb), 0)" },
              hover: { backgroundColor: "rgba(var(--primary-rgb), 0.05)" },
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

// Section header animations
const sectionHeaderVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const titleVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
}

const descriptionVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...smoothTransition,
      delay: 0.2,
    },
  },
}

// CTA button animation
const ctaVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...smoothTransition,
      delay: 0.4,
    },
  },
}

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="lg:max-w-lg">
            <motion.span
              className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4"
              variants={titleVariants}
            >
              Mes prestations
            </motion.span>
            <motion.h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
              variants={titleVariants}
            >
              La réflexologie
              <br />
              <span className="italic">pour tous</span>
            </motion.h2>
          </div>
          <motion.div className="lg:max-w-md" variants={descriptionVariants}>
            <p className="text-muted-foreground leading-relaxed">
              Adultes, enfants ou bébés, je propose des séances adaptées à chacun pour retrouver équilibre, sérénité et bien-être au quotidien.
            </p>
          </motion.div>
        </motion.div>

        {/* Services Grid - 3 columns on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={quickSpring}
            className="inline-block"
          >
            <Link
              href="#booking"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 hover:shadow-lg group"
            >
              Réserver un soin
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
