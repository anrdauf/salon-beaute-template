import { ServiceCategory } from "@/lib/types/booking"

export const serviceCategories: ServiceCategory[] = [
  {
    id: "reflexologie-plantaire",
    name: "Réflexologie Plantaire",
    services: [
      {
        id: "rp1",
        name: "Séance découverte",
        description: "Première approche de la réflexologie",
        duration: 30,
        price: 35,
        bookableOnline: true,
      },
      {
        id: "rp2",
        name: "Séance adulte",
        description: "Séance complète de réflexologie plantaire",
        duration: 55,
        price: 50,
        bookableOnline: true,
      },
      {
        id: "rp3",
        name: "Séance enfant (-12 ans)",
        description: "Séance adaptée aux enfants",
        duration: 40,
        price: 40,
        bookableOnline: true,
      },
      {
        id: "rp4",
        name: "Séance bébé (-2 ans)",
        description: "Technique douce pour les tout-petits",
        duration: 20,
        price: 35,
        bookableOnline: true,
      },
    ],
  },
  {
    id: "reflexologie-faciale",
    name: "Réflexologie Faciale",
    services: [
      {
        id: "rf1",
        name: "Séance découverte",
        description: "Première approche de la réflexologie faciale",
        duration: 30,
        price: 35,
        bookableOnline: true,
      },
      {
        id: "rf2",
        name: "Séance adulte",
        description: "Séance complète de réflexologie faciale",
        duration: 55,
        price: 50,
        bookableOnline: true,
      },
      {
        id: "rf3",
        name: "Séance enfant (-12 ans)",
        description: "Séance adaptée aux enfants",
        duration: 40,
        price: 40,
        bookableOnline: true,
      },
    ],
  },
  {
    id: "forfaits",
    name: "Forfaits",
    services: [
      {
        id: "f1",
        name: "Forfait 5 séances adultes",
        description: "Économisez 30€ sur 5 séances",
        duration: 275,
        price: 220,
        bookableOnline: true,
      },
    ],
  },
]

export const timeSlots = [
  "09h00",
  "10h00",
  "11h00",
  "12h00",
  "14h00",
  "15h00",
  "16h00",
  "17h00",
  "18h00",
]
