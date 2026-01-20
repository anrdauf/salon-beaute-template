import { Header } from "@/components/spa/header"
import { Hero } from "@/components/spa/hero"
import { About } from "@/components/spa/about"
import { Services } from "@/components/spa/services"
import { GiftSection } from "@/components/spa/gift-section"
import { Location } from "@/components/spa/location"
import { Reviews } from "@/components/spa/reviews"
import { BookingSection } from "@/components/spa/booking"
import { Footer } from "@/components/spa/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* PHASE 1: ACTION - Réserver maintenant */}
      <BookingSection />

      {/* PHASE 2: DÉCOUVERTE - "C'est quoi ?" */}
      <Services />

      {/* PHASE 4: CONFIANCE - Mélinda + Avis */}
      <Reviews />
      <About />
      <Location />
      <GiftSection />

      <Footer />
    </main>
  )
}
