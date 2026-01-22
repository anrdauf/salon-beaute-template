"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Service, ContactInfo, BookingStep, BookingData } from "@/lib/types/booking"
import { ServiceSelection } from "./service-selection"
import { DateTimeSelection } from "./datetime-selection"
import { ContactForm } from "./contact-form"
import { BookingConfirmation } from "./booking-confirmation"
import { siteConfig } from "@/lib/site-config"
import { quickSpring, smoothTransition } from "@/lib/animations"

const steps = [
  { number: 1, label: "Prestation" },
  { number: 2, label: "Date & Heure" },
  { number: 3, label: "Coordonnées" },
  { number: 4, label: "Confirmation" },
]

// Section header animations
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const headerItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
}

// Step indicator animations
const stepContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...smoothTransition,
      staggerChildren: 0.1,
    },
  },
}

const stepItemVariants = {
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

// Content transition animations
const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
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
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// Card animation
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...smoothTransition,
      delay: 0.3,
    },
  },
}

export function BookingSection() {
  const [isOpen, setIsOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState<BookingStep>(1)
  const [direction, setDirection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    contact: null,
  })
  const prefersReducedMotion = useReducedMotion()

  const handleSelectService = (service: Service) => {
    setDirection(1)
    setBooking((prev) => ({ ...prev, service }))
    setCurrentStep(2)
  }

  const handleSelectDateTime = (date: Date, time: string) => {
    setDirection(1)
    setBooking((prev) => ({ ...prev, date, time }))
    setCurrentStep(3)
  }

  const handleSubmitContact = async (contact: ContactInfo) => {
    setIsSubmitting(true)

    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setDirection(1)
    setBooking((prev) => ({ ...prev, contact }))
    setIsSubmitting(false)
    setCurrentStep(4)
  }

  const handleNewBooking = () => {
    setDirection(-1)
    setBooking({
      service: null,
      date: null,
      time: null,
      contact: null,
    })
    setCurrentStep(1)
  }

  const handleBack = (step: BookingStep) => {
    setDirection(-1)
    setCurrentStep(step)
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4"
            variants={headerItemVariants}
          >
            Réservation en ligne
          </motion.span>
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            variants={headerItemVariants}
          >
            Réservez votre <span className="italic">moment bien-être</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            variants={headerItemVariants}
          >
            Réservation gratuite • Sans paiement en ligne • Confirmation immédiate
          </motion.p>
        </motion.div>

        {/* Booking Form */}
        {isOpen && (
          <>
            {/* Progress Steps */}
            {currentStep < 4 && (
              <motion.div
                className="mb-10"
                variants={stepContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  {steps.slice(0, 3).map((step, index) => (
                    <motion.div
                      key={step.number}
                      className="flex items-center"
                      variants={stepItemVariants}
                    >
                      <motion.div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          currentStep >= step.number
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                        animate={{
                          scale: currentStep === step.number ? 1.1 : 1,
                          backgroundColor:
                            currentStep >= step.number
                              ? "var(--primary)"
                              : "var(--muted)",
                        }}
                        transition={quickSpring}
                      >
                        {currentStep > step.number ? (
                          <motion.svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        ) : (
                          step.number
                        )}
                      </motion.div>
                      <motion.span
                        className={`ml-2 text-sm hidden sm:inline ${
                          currentStep >= step.number
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                        animate={{
                          color:
                            currentStep >= step.number
                              ? "var(--foreground)"
                              : "var(--muted-foreground)",
                        }}
                      >
                        {step.label}
                      </motion.span>
                      {index < 2 && (
                        <motion.div
                          className="w-8 sm:w-16 h-0.5 mx-2 sm:mx-4"
                          animate={{
                            backgroundColor:
                              currentStep > step.number
                                ? "var(--primary)"
                                : "var(--border)",
                            scaleX: currentStep > step.number ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Content Card */}
            <motion.div
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait" custom={direction}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={prefersReducedMotion ? {} : contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ServiceSelection onSelectService={handleSelectService} />
                  </motion.div>
                )}

                {currentStep === 2 && booking.service && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={prefersReducedMotion ? {} : contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <DateTimeSelection
                      service={booking.service}
                      onSelectDateTime={handleSelectDateTime}
                      onBack={() => handleBack(1)}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && booking.service && booking.date && booking.time && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={prefersReducedMotion ? {} : contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ContactForm
                      service={booking.service}
                      date={booking.date}
                      time={booking.time}
                      onSubmit={handleSubmitContact}
                      onBack={() => handleBack(2)}
                      isSubmitting={isSubmitting}
                    />
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={prefersReducedMotion ? {} : contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <BookingConfirmation
                      booking={booking}
                      onNewBooking={handleNewBooking}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info supplémentaire */}
            {currentStep < 4 && (
              <motion.p
                className="text-center text-sm text-muted-foreground mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Besoin d&apos;aide ? Appelez-moi au{" "}
                <motion.a
                  href={siteConfig.phoneLink}
                  className="text-primary hover:underline"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={quickSpring}
                >
                  {siteConfig.phone}
                </motion.a>
              </motion.p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
