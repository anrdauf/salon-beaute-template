"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { ChevronRight } from "lucide-react"
import { serviceCategories } from "@/lib/data/services-data"
import { Service } from "@/lib/types/booking"

interface ServiceSelectionProps {
  onSelectService: (service: Service) => void
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
  }
  return `${minutes}min`
}

export function ServiceSelection({ onSelectService }: ServiceSelectionProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Choix de la prestation
        </h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez le soin qui vous convient
        </p>
      </div>

      <Accordion.Root
        type="multiple"
        defaultValue={[]}
        className="space-y-3"
      >
        {serviceCategories.map((category) => (
          <Accordion.Item
            key={category.id}
            value={category.id}
            className="border border-border rounded-2xl overflow-hidden bg-card"
          >
            <Accordion.Trigger className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors group">
              <h4 className="font-semibold text-foreground">{category.name}</h4>
              <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="border-t border-border">
                {category.services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`flex items-center justify-between p-4 hover:bg-muted/30 transition-colors ${
                      index !== category.services.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">
                        {service.name}
                      </p>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-0.5 truncate">
                          {service.description}
                        </p>
                      )}
                      {!service.bookableOnline && (
                        <p className="text-xs text-amber-600 mt-1">
                          Réservation par téléphone uniquement
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">
                          {formatDuration(service.duration)}
                        </span>
                        <span className="mx-2 text-border">|</span>
                        <span className="font-semibold text-foreground">
                          {service.price} €
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectService(service)}
                        disabled={!service.bookableOnline}
                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Choisir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
