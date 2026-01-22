"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { quickSpring, smoothTransition } from "@/lib/animations"

const navLinks = [
  { label: "Réserver", href: "#booking" },
  { label: "Nos soins", href: "#services" },
  { label: "Bienfaits", href: "#bienfaits" },
  { label: "Contact", href: "#contact" },
]

// Logo animation
const logoVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

// Nav links stagger
const navContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const navLinkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

// Mobile menu animations
const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2 },
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
}

const mobileNavContainerVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
}

const mobileNavLinkVariants = {
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

// Menu icon animation
const menuIconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Scroll-linked animations
  const { scrollY } = useScroll()
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--primary-rgb), 0)", "rgba(var(--primary-rgb), 0.95)"]
  )
  const headerBlur = useTransform(scrollY, [0, 100], [0, 12])
  const headerPadding = useTransform(scrollY, [0, 100], [20, 12])
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 30px rgba(0,0,0,0.15)"]
  )

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen && window.scrollY > 50) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={prefersReducedMotion ? {} : {
        backgroundColor: headerBackground,
        backdropFilter: `blur(${headerBlur}px)`,
        boxShadow: headerShadow,
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <Link
              href="/"
              className="text-white font-serif text-2xl md:text-3xl italic tracking-wide hover:opacity-90 transition-opacity"
              aria-label={`${siteConfig.name} Accueil`}
            >
              <motion.span
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                transition={quickSpring}
              >
                {siteConfig.name}
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center gap-10"
            aria-label="Navigation principale"
            variants={navContainerVariants}
            initial="initial"
            animate="animate"
          >
            {navLinks.map((link) => (
              <motion.div key={link.label} variants={navLinkVariants}>
                <Link
                  href={link.href}
                  className="relative text-white/90 hover:text-white transition-colors text-sm font-medium tracking-wide group py-2"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-white/60"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Desktop Actions */}
          <motion.div
            className="hidden lg:flex items-center gap-4"
            variants={navContainerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.a
              href={siteConfig.phoneLink}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              aria-label="Appelez-nous"
              variants={navLinkVariants}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={quickSpring}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
            </motion.a>
            <motion.div variants={navLinkVariants}>
              <Link href="#booking">
                <motion.span
                  className="inline-block bg-white text-primary px-7 py-3 rounded-full text-sm font-semibold transition-colors"
                  whileHover={prefersReducedMotion ? {} : {
                    scale: 1.02,
                    y: -2,
                    boxShadow: "0 10px 30px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={quickSpring}
                >
                  Réserver
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.95 }}
            animate={isMenuOpen ? "open" : "closed"}
          >
            <motion.div
              variants={menuIconVariants}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav
              className="bg-primary/98 backdrop-blur-md border-t border-white/10 px-4 py-6"
              aria-label="Navigation mobile"
            >
              <motion.div
                className="flex flex-col gap-1"
                variants={mobileNavContainerVariants}
                initial="closed"
                animate="open"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={mobileNavLinkVariants}>
                    <Link
                      href={link.href}
                      className="text-white/90 hover:text-white hover:bg-white/10 transition-all text-base font-medium tracking-wide py-3 px-4 rounded-lg block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.span
                        whileHover={prefersReducedMotion ? {} : { x: 8 }}
                        transition={quickSpring}
                        className="inline-block"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="pt-4 mt-2 border-t border-white/10"
                  variants={mobileNavLinkVariants}
                >
                  <a
                    href={siteConfig.phoneLink}
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors py-3 px-4"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{siteConfig.phone}</span>
                  </a>
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={quickSpring}
                  >
                    <Link
                      href="#booking"
                      className="block mt-3 bg-white text-primary px-6 py-3.5 rounded-full text-sm font-semibold text-center hover:bg-white/95 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Prendre rendez-vous
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
