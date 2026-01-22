"use client"

import { motion, useReducedMotion, Variants } from "framer-motion"
import { ReactNode } from "react"
import {
  fadeInUp,
  slideInFromLeft,
  slideInFromRight,
  scaleIn,
  scaleBlurIn,
  smoothTransition,
  defaultViewport,
} from "@/lib/animations"

type AnimationType =
  | "fadeUp"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "scaleBlur"
  | "custom"

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  customVariants?: Variants
  delay?: number
  duration?: number
  once?: boolean
  margin?: string
  as?: keyof JSX.IntrinsicElements
}

const animationMap: Record<Exclude<AnimationType, "custom">, Variants> = {
  fadeUp: fadeInUp,
  slideLeft: slideInFromLeft,
  slideRight: slideInFromRight,
  scale: scaleIn,
  scaleBlur: scaleBlurIn,
}

export function RevealOnScroll({
  children,
  className,
  animation = "fadeUp",
  customVariants,
  delay = 0,
  duration,
  once = true,
  margin = "-50px",
  as = "div",
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion()

  // Si l'utilisateur préfère réduire les animations, afficher directement
  if (prefersReducedMotion) {
    const Component = as as any
    return <Component className={className}>{children}</Component>
  }

  // Sélectionner les variants
  const baseVariants = animation === "custom" && customVariants
    ? customVariants
    : animationMap[animation as Exclude<AnimationType, "custom">]

  // Appliquer le delay et duration custom si fournis
  const variants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(baseVariants.visible as any).transition,
        ...(delay > 0 && { delay }),
        ...(duration && { duration }),
      },
    },
  }

  const MotionComponent = motion[as as keyof typeof motion] as any

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

// Composant pour révélation de texte mot par mot
interface TextRevealProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  delay?: number
  staggerDelay?: number
}

export function TextReveal({
  children,
  className,
  as = "span",
  delay = 0,
  staggerDelay = 0.08,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = children.split(" ")

  if (prefersReducedMotion) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const MotionComponent = motion[as as keyof typeof motion] as any

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
            {index < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  )
}

// Composant pour stagger container
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
  as?: keyof JSX.IntrinsicElements
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.2,
  as = "div",
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    const Component = as as any
    return <Component className={className}>{children}</Component>
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }

  const MotionComponent = motion[as as keyof typeof motion] as any

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

// Composant pour items dans un stagger container
interface StaggerItemProps {
  children: ReactNode
  className?: string
  animation?: "fadeUp" | "slideLeft" | "slideRight" | "scale"
  as?: keyof JSX.IntrinsicElements
}

export function StaggerItem({
  children,
  className,
  animation = "fadeUp",
  as = "div",
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    const Component = as as any
    return <Component className={className}>{children}</Component>
  }

  const variants = animationMap[animation]
  const MotionComponent = motion[as as keyof typeof motion] as any

  return (
    <MotionComponent variants={variants} className={className}>
      {children}
    </MotionComponent>
  )
}
