"use client"

import React from "react"

import { useState } from "react"
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronDown, Check, Sparkles } from "lucide-react"

const services = [
  "Massage tissus profonds",
  "Massage suédois",
  "Séance de réflexologie",
  "Massage aux pierres chaudes",
  "Aromathérapie",
  "Soin du visage",
]

const timeSlots = [
  "09h00", "10h00", "11h00", "12h00",
  "13h00", "14h00", "15h00", "16h00", "17h00"
]

export function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Merci pour votre réservation !
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Nous avons bien reçu votre demande de rendez-vous. Notre équipe vous contactera sous 24 heures pour confirmer votre réservation.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  date: "",
                  time: "",
                  service: "",
                  message: "",
                })
              }}
              className="text-primary font-medium hover:underline"
            >
              Prendre un autre rendez-vous
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image & Info */}
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=700&q=80"
                alt="Femme profitant d'un soin spa relaxant"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Info cards */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl max-w-[240px]">
              <Sparkles className="w-8 h-8 mb-3 opacity-80" />
              <p className="font-serif text-xl mb-1">Première visite ?</p>
              <p className="text-sm text-primary-foreground/80">Profitez de -20% sur votre premier soin</p>
            </div>
            
            {/* Working hours card */}
            <div className="absolute top-8 -left-6 bg-card p-5 rounded-2xl shadow-xl border border-border/30">
              <p className="font-medium text-foreground mb-2">Horaires d&apos;ouverture</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Lun - Ven : 9h - 20h</p>
                <p>Sam - Dim : 10h - 18h</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Réserver
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Prenez votre
              <br />
              <span className="italic">rendez-vous aujourd&apos;hui</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Réservez votre moment de détente ultime. Nous confirmerons votre réservation sous 24 heures.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Contact fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Adresse e-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-10 py-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                  >
                    <option value="">Choisir un horaire</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Service Selection */}
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-10 py-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                >
                  <option value="">Choisir un soin</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  name="message"
                  placeholder="Demandes particulières ou notes (optionnel)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  "Prendre rendez-vous"
                )}
              </button>
              
              <p className="text-center text-sm text-muted-foreground">
                En réservant, vous acceptez notre politique d&apos;annulation. Annulation gratuite jusqu&apos;à 24 heures avant votre rendez-vous.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
