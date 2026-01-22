import { Variants, Transition, TargetAndTransition } from "framer-motion"

// ============================================
// TRANSITIONS DE BASE
// ============================================

/**
 * Transition spring douce pour les animations fluides
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
}

/**
 * Transition spring rapide pour les micro-interactions
 */
export const quickSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
}

/**
 * Transition élégante avec easing custom (cubic-bezier)
 */
export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

/**
 * Transition longue pour les révélations importantes
 */
export const slowTransition: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
}

/**
 * Transition très rapide pour les feedbacks immédiats
 */
export const instantTransition: Transition = {
  duration: 0.15,
  ease: "easeOut",
}

// ============================================
// VARIANTS RÉUTILISABLES
// ============================================

/**
 * Fade in depuis le bas (usage: titres, paragraphes)
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

/**
 * Fade in depuis la gauche
 */
export const slideInFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

/**
 * Fade in depuis la droite
 */
export const slideInFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

/**
 * Scale in avec légère opacité
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
}

/**
 * Scale in avec blur (effet premium)
 */
export const scaleBlurIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: smoothTransition,
  },
}

/**
 * Container pour stagger children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Container avec stagger plus rapide
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

/**
 * Container avec stagger lent (pour effet cascade)
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

/**
 * Item générique pour containers stagger
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

// ============================================
// HOVER STATES
// ============================================

/**
 * Hover lift pour cards
 */
export const hoverLift: TargetAndTransition = {
  y: -8,
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  transition: quickSpring,
}

/**
 * Hover scale subtil pour boutons
 */
export const hoverScale: TargetAndTransition = {
  scale: 1.02,
  transition: quickSpring,
}

/**
 * Hover avec glow pour CTA
 */
export const hoverGlow: TargetAndTransition = {
  scale: 1.02,
  boxShadow: "0 10px 30px rgba(var(--primary-rgb), 0.3)",
  transition: quickSpring,
}

/**
 * Tap feedback
 */
export const tapScale: TargetAndTransition = {
  scale: 0.98,
}

// ============================================
// ANIMATIONS TEXTE
// ============================================

/**
 * Text reveal mot par mot (wrapper)
 */
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/**
 * Text reveal pour chaque mot
 */
export const textRevealWord: Variants = {
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

/**
 * Text reveal lettre par lettre (wrapper)
 */
export const letterRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
}

/**
 * Text reveal pour chaque lettre
 */
export const letterRevealChar: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ============================================
// ANIMATIONS IMAGES
// ============================================

/**
 * Image reveal avec scale
 */
export const imageReveal: Variants = {
  hidden: {
    scale: 1.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: slowTransition,
  },
}

/**
 * Hover zoom pour images
 */
export const imageHoverZoom: TargetAndTransition = {
  scale: 1.08,
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  },
}

// ============================================
// ANIMATIONS SCROLL
// ============================================

/**
 * Viewport configuration par défaut pour animations scroll
 */
export const defaultViewport = {
  once: true,
  margin: "-50px",
}

/**
 * Viewport avec déclenchement plus tard
 */
export const lateViewport = {
  once: true,
  margin: "-100px",
}

/**
 * Viewport avec déclenchement anticipé
 */
export const earlyViewport = {
  once: true,
  margin: "50px",
}

// ============================================
// ANIMATIONS HEADER/NAVIGATION
// ============================================

/**
 * Menu mobile slide down
 */
export const mobileMenuSlide: Variants = {
  closed: {
    height: 0,
    opacity: 0,
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
}

/**
 * Navigation links stagger
 */
export const navLinksContainer: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

/**
 * Single nav link animation
 */
export const navLinkItem: Variants = {
  closed: {
    x: -20,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
}

// ============================================
// ANIMATIONS ACCORDION/EXPAND
// ============================================

/**
 * Accordion expand
 */
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.25, delay: 0.1 },
    },
  },
}

// ============================================
// ANIMATIONS SPÉCIALES
// ============================================

/**
 * Pulse pour indicateurs
 */
export const pulse: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Float pour éléments décoratifs
 */
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Shimmer effect pour loading
 */
export const shimmer: Variants = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Génère un variant avec delay custom
 */
export function withDelay(variant: Variants, delay: number): Variants {
  return {
    hidden: variant.hidden,
    visible: {
      ...variant.visible,
      transition: {
        ...(variant.visible as any).transition,
        delay,
      },
    },
  }
}

/**
 * Génère un variant pour index dans stagger
 */
export function staggerDelay(index: number, baseDelay: number = 0.1): Transition {
  return {
    ...smoothTransition,
    delay: index * baseDelay,
  }
}
