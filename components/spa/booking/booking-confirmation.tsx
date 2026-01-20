"use client"

import { Check, Calendar, Clock, Euro, Mail } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { BookingData } from "@/lib/types/booking"

interface BookingConfirmationProps {
  booking: BookingData
  onNewBooking: () => void
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
  }
  return `${minutes}min`
}

export function BookingConfirmation({
  booking,
  onNewBooking,
}: BookingConfirmationProps) {
  const { service, date, time, contact } = booking

  if (!service || !date || !time || !contact) {
    return null
  }

  return (
    <div className="text-center space-y-6">
      {/* Icône succès */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      {/* Titre */}
      <div>
        <h3 className="text-2xl font-serif text-foreground mb-2">
          Rendez-vous confirmé !
        </h3>
        <p className="text-muted-foreground">
          Votre réservation a bien été enregistrée
        </p>
      </div>

      {/* Récapitulatif */}
      <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto">
        <h4 className="font-semibold text-foreground text-lg">
          {service.name}
        </h4>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span>
              {format(date, "EEEE d MMMM yyyy", { locale: fr })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span>
              {time} • {formatDuration(service.duration)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Euro className="w-5 h-5 text-primary" />
            <div>
              <span className="text-foreground font-medium">{service.price} €</span>
              <span className="ml-1.5 text-sm text-green-600 font-medium">À régler sur place</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm">Confirmation envoyée à :</p>
              <p className="text-foreground font-medium">{contact.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Un email de confirmation vous a été envoyé. Pensez à arriver 10 minutes
        avant votre rendez-vous.
      </p>

      {/* Bouton nouveau RDV */}
      <button
        onClick={onNewBooking}
        className="text-primary font-medium hover:underline"
      >
        Prendre un autre rendez-vous
      </button>
    </div>
  )
}
