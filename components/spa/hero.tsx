"use client"

import Link from "next/link"
import { ArrowDown, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { siteConfig } from "@/lib/site-config"
import {
  scaleBlurIn,
  fadeInUp,
  slideInFromLeft,
  staggerContainer,
  staggerItem,
  quickSpring,
  smoothTransition,
} from "@/lib/animations"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const contentY = useTransform(scrollY, [0, 300], [0, 50])

  // Text reveal variants pour le titre
  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const titleLineVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      rotateX: -45,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Badge animation
  const badgeVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Description animation
  const descriptionVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // CTA buttons stagger
  const ctaContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8,
      },
    },
  }

  const ctaButtonVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Trust indicators animation
  const trustContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.1,
      },
    },
  }

  const trustItemVariants = {
    hidden: {
      x: -30,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: smoothTransition,
    },
  }

  // Scroll indicator animation
  const scrollIndicatorVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        style={prefersReducedMotion ? {} : { y: backgroundY }}
      >
        <motion.img
          src={siteConfig.heroImage}
          alt={`${siteConfig.name} - Séance`}
          className="w-full h-full object-cover scale-110 object-[75%_center] sm:object-center"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative Elements with float animation */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      {/* Content with scroll-linked opacity */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16"
        style={prefersReducedMotion ? {} : { opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-white/90 text-sm font-medium tracking-wide">{siteConfig.tagline}</span>
          </motion.div>

          {/* Heading with text reveal */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1]"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: "1000px" }}
          >
            {siteConfig.hero.title.map((line: string, index: number) => (
              <span key={index} className="block overflow-hidden">
                <motion.span
                  className={`block ${index > 0 ? "italic" : ""} ${index === siteConfig.hero.title.length - 1 ? "text-white/90" : ""}`}
                  variants={titleLineVariants}
                  style={{ transformOrigin: "bottom" }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Description with blur reveal */}
          <motion.p
            className="mt-8 text-white/80 text-lg md:text-xl max-w-lg leading-relaxed"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.hero.description}
          </motion.p>

          {/* CTA Buttons with stagger */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            variants={ctaContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={ctaButtonVariants}>
              <Link
                href="#booking"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full text-base font-semibold transition-all duration-300"
              >
                <motion.span
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={quickSpring}
                >
                  Prendre rendez-vous
                </motion.span>
              </Link>
            </motion.div>
            <motion.div variants={ctaButtonVariants}>
              <Link
                href="#services"
                className="inline-flex items-center justify-center border-2 border-white/40 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                <motion.span
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={quickSpring}
                >
                  Découvrir nos soins
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators with slide-in */}
          <motion.div
            className="mt-14 flex items-center gap-8"
            variants={trustContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex items-center gap-3" variants={trustItemVariants}>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p className="text-white/80 text-sm">{siteConfig.address.street}<br/>{siteConfig.address.postalCode} {siteConfig.address.city}</p>
            </motion.div>
            {siteConfig.googleReviewCount > 0 && (
              <motion.div className="text-white/80" variants={trustItemVariants}>
                <p className="text-sm font-medium">{siteConfig.googleReviewCount} avis clients Google</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.svg
                      key={i}
                      className="w-4 h-4 fill-accent"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + i * 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                  <motion.span
                    className="text-sm ml-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                  >
                    {siteConfig.googleRating}/5
                  </motion.span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator with custom animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
      >
        <a
          href="#bienfaits"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
          aria-label="Défiler pour en savoir plus"
        >
          <span className="text-xs tracking-widest uppercase">Défiler</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
