"use client"

import { useState } from "react"
import { ArrowLeft, User, Mail, Phone, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Service, ContactInfo } from "@/lib/types/booking"

interface ContactFormProps {
  service: Service
  date: Date
  time: string
  onSubmit: (contact: ContactInfo) => void
  onBack: () => void
  isSubmitting: boolean
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
  }
  return `${minutes}min`
}

export function ContactForm({
  service,
  date,
  time,
  onSubmit,
  onBack,
  isSubmitting,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis"
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Récapitulatif */}
      <div className="bg-muted/50 rounded-xl p-4">
        <p className="text-sm text-muted-foreground mb-1">Votre rendez-vous</p>
        <p className="font-semibold text-foreground">{service.name}</p>
        <p className="text-sm text-muted-foreground">
          {format(date, "EEEE d MMMM yyyy", { locale: fr })} à {time}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatDuration(service.duration)} • {service.price} €
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Vos coordonnées
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Prénom */}
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  errors.firstName ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  errors.lastName ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                placeholder="Adresse e-mail"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  errors.phone ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Message optionnel */}
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <textarea
            name="message"
            placeholder="Demandes particulières (optionnel)"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Info paiement sur place */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-800 text-sm">Aucun paiement requis</p>
            <p className="text-green-700 text-xs mt-0.5">
              Réservation 100% gratuite. Vous paierez uniquement sur place, le jour du rendez-vous.
            </p>
          </div>
        </div>

        {/* Boutons navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Confirmation...
              </>
            ) : (
              "Confirmer le rendez-vous"
            )}
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        En confirmant, vous acceptez notre politique d&apos;annulation.
        Annulation gratuite jusqu&apos;à 24h avant le rendez-vous.
      </p>
    </div>
  )
}
