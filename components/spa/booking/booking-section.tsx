"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Service, ContactInfo, BookingStep, BookingData } from "@/lib/types/booking"
import { ServiceSelection } from "./service-selection"
import { DateTimeSelection } from "./datetime-selection"
import { ContactForm } from "./contact-form"
import { BookingConfirmation } from "./booking-confirmation"

const steps = [
  { number: 1, label: "Prestation" },
  { number: 2, label: "Date & Heure" },
  { number: 3, label: "Coordonnées" },
  { number: 4, label: "Confirmation" },
]

export function BookingSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<BookingStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [booking, setBooking] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    contact: null,
  })

  const handleSelectService = (service: Service) => {
    setBooking((prev) => ({ ...prev, service }))
    setCurrentStep(2)
  }

  const handleSelectDateTime = (date: Date, time: string) => {
    setBooking((prev) => ({ ...prev, date, time }))
    setCurrentStep(3)
  }

  const handleSubmitContact = async (contact: ContactInfo) => {
    setIsSubmitting(true)

    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setBooking((prev) => ({ ...prev, contact }))
    setIsSubmitting(false)
    setCurrentStep(4)
  }

  const handleNewBooking = () => {
    setBooking({
      service: null,
      date: null,
      time: null,
      contact: null,
    })
    setCurrentStep(1)
  }

  const handleBack = (step: BookingStep) => {
    setCurrentStep(step)
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Réservation en ligne
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Réservez votre <span className="italic">moment bien-être</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Réservation gratuite • Sans paiement en ligne • Confirmation immédiate
          </p>

          {/* Toggle Button */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              Réserver maintenant
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Booking Form (collapsible) */}
        {isOpen && (
          <>
            {/* Progress Steps */}
            {currentStep < 4 && (
              <div className="mb-10">
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  {steps.slice(0, 3).map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                          currentStep >= step.number
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.number}
                      </div>
                      <span
                        className={`ml-2 text-sm hidden sm:inline ${
                          currentStep >= step.number
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                      {index < 2 && (
                        <div
                          className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-colors ${
                            currentStep > step.number ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Card */}
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              {currentStep === 1 && (
                <ServiceSelection onSelectService={handleSelectService} />
              )}

              {currentStep === 2 && booking.service && (
                <DateTimeSelection
                  service={booking.service}
                  onSelectDateTime={handleSelectDateTime}
                  onBack={() => handleBack(1)}
                />
              )}

              {currentStep === 3 && booking.service && booking.date && booking.time && (
                <ContactForm
                  service={booking.service}
                  date={booking.date}
                  time={booking.time}
                  onSubmit={handleSubmitContact}
                  onBack={() => handleBack(2)}
                  isSubmitting={isSubmitting}
                />
              )}

              {currentStep === 4 && (
                <BookingConfirmation
                  booking={booking}
                  onNewBooking={handleNewBooking}
                />
              )}
            </div>

            {/* Info supplémentaire */}
            {currentStep < 4 && (
              <p className="text-center text-sm text-muted-foreground mt-6">
                Besoin d&apos;aide ? Appelez-moi au{" "}
                <a href="tel:+33618510754" className="text-primary hover:underline">
                  06 18 51 07 54
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
