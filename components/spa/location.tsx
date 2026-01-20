"use client"

import { MapPin, Clock, Navigation, Phone } from "lucide-react"

const openingHours = [
  { day: "Lundi", hours: "Fermé", isOpen: false },
  { day: "Mardi", hours: "09:00 - 19:00", isOpen: true },
  { day: "Mercredi", hours: "09:00 - 13:00", isOpen: true },
  { day: "Jeudi", hours: "09:00 - 19:00", isOpen: true },
  { day: "Vendredi", hours: "09:00 - 19:00", isOpen: true },
  { day: "Samedi", hours: "Fermé", isOpen: false },
  { day: "Dimanche", hours: "Fermé", isOpen: false },
]

// Get current day index (0 = Sunday, 1 = Monday, etc.)
function getCurrentDayIndex(): number {
  const day = new Date().getDay()
  // Convert from Sunday-first to Monday-first
  return day === 0 ? 6 : day - 1
}

export function Location() {
  const currentDayIndex = getCurrentDayIndex()

  // OpenStreetMap embed URL for Chartres
  // Coordinates: 48.4469, 1.4890 (19 rue du Faubourg Guillaume, Chartres)
  const mapEmbedUrl = "https://www.openstreetmap.org/export/embed.html?bbox=1.480,48.440,1.500,48.455&layer=mapnik&marker=48.4469,1.4890"
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=19+rue+du+Faubourg+Guillaume+28000+Chartres"
  const appleMapsUrl = "https://maps.apple.com/?q=48.4469,1.4890"

  return (
    <section id="location" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Localisation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            Où nous <span className="italic">trouver</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left - Map */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation du salon Aura Spa"
                className="w-full h-full"
              />
            </div>

            {/* Map overlay badge */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors z-10"
            >
              <Navigation className="w-4 h-4" />
              Voir sur Google Maps
            </a>
          </div>

          {/* Right - Info */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="bg-background p-6 rounded-2xl border border-border/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  {/* Left - Address */}
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">Adresse</h3>
                    <address className="text-muted-foreground not-italic leading-relaxed">
                      19 rue du Faubourg Guillaume<br />
                      28000 Chartres<br />
                      France
                    </address>
                  </div>
                  {/* Right - Actions */}
                  <div className="flex flex-col gap-2 sm:items-end">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Navigation className="w-4 h-4" />
                      Itinéraire
                    </a>
                    <a
                      href="tel:+33618510754"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      06 18 51 07 54
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-background p-6 rounded-2xl border border-border/30">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">Horaires d&apos;ouverture</h3>
              </div>

              <ul className="space-y-2">
                {openingHours.map((item, index) => (
                  <li
                    key={item.day}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                      index === currentDayIndex
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {index === currentDayIndex && (
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                      {item.day}
                    </span>
                    <span className={index === currentDayIndex ? "text-primary" : ""}>
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Actuellement ouvert
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
