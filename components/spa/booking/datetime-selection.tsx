"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { format, addDays, startOfToday, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { Service } from "@/lib/types/booking"
import { timeSlots } from "@/lib/data/services-data"

interface DateTimeSelectionProps {
  service: Service
  onSelectDateTime: (date: Date, time: string) => void
  onBack: () => void
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
  }
  return `${minutes}min`
}

export function DateTimeSelection({
  service,
  onSelectDateTime,
  onBack,
}: DateTimeSelectionProps) {
  const today = startOfToday()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)

  // Générer les 7 prochains jours à partir de l'offset
  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(today, i + weekOffset * 7)
  )

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelectDateTime(selectedDate, selectedTime)
    }
  }

  const canContinue = selectedDate && selectedTime

  return (
    <div className="space-y-6">
      {/* Header avec service sélectionné */}
      <div className="bg-muted/50 rounded-xl p-4">
        <p className="text-sm text-muted-foreground mb-1">
          Prestation sélectionnée
        </p>
        <p className="font-semibold text-foreground">{service.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatDuration(service.duration)} • {service.price} €
        </p>
      </div>

      {/* Sélection de date */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Choisir une date
        </h3>

        {/* Navigation semaine */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
            disabled={weekOffset === 0}
            className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {format(days[0], "MMMM yyyy", { locale: fr })}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            disabled={weekOffset >= 4}
            className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            return (
              <button
                key={day.toISOString()}
                onClick={() => {
                  setSelectedDate(day)
                  setSelectedTime(null)
                }}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                <span className="text-xs uppercase">
                  {format(day, "EEE", { locale: fr })}
                </span>
                <span className="text-lg font-semibold">
                  {format(day, "d")}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sélection d'heure */}
      {selectedDate && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Choisir un horaire
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {format(selectedDate, "EEEE d MMMM", { locale: fr })}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:border-primary/50"
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Boutons navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
      </div>
    </div>
  )
}
