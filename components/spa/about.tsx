"use client"

import { Sparkles, Brain, Moon, Heart, Zap, Shield, Award, Clock, LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { quickSpring, smoothTransition } from "@/lib/animations"

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Moon,
  Zap,
  Heart,
  Shield,
  Award,
  Clock,
}

// Section header animations
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const headerItemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
}

// Benefits card animations
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Icon animation
const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

// Credentials animations
const credentialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
}

const credentialVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

export function About() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="bienfaits" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background with fade-in */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            className="inline-flex items-center gap-2 text-white/70 font-semibold text-sm tracking-widest uppercase mb-4"
            variants={headerItemVariants}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Pourquoi me choisir
          </motion.span>
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-balance"
            variants={headerItemVariants}
          >
            {siteConfig.about.title}
          </motion.h2>
          <motion.p
            className="mt-6 text-primary-foreground/80 leading-relaxed text-lg max-w-2xl mx-auto"
            variants={headerItemVariants}
          >
            {siteConfig.about.description}
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {siteConfig.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Brain
            return (
              <motion.div
                key={benefit.title}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? {} : {
                  y: -8,
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                }}
                transition={quickSpring}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl transition-colors"
              >
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4"
                  variants={iconVariants}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                  transition={quickSpring}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Credentials */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={credentialContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {siteConfig.about.credentials.map((credential, index) => {
            const icons = [Award, Shield, Clock]
            const Icon = icons[index] || Award
            return (
              <motion.div
                key={credential}
                variants={credentialVariants}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={quickSpring}
                className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full cursor-default"
              >
                <motion.div
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-sm font-medium">{credential}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
