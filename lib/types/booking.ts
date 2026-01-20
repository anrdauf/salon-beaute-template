export interface Service {
  id: string
  name: string
  description?: string
  duration: number // en minutes
  price: number // en euros
  bookableOnline: boolean
}

export interface ServiceCategory {
  id: string
  name: string
  services: Service[]
}

export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export interface BookingData {
  service: Service | null
  date: Date | null
  time: string | null
  contact: ContactInfo | null
}

export type BookingStep = 1 | 2 | 3 | 4
