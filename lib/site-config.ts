/**
 * Configuration centralisée du site
 *
 * CE FICHIER EST LE SEUL À MODIFIER POUR PERSONNALISER LE SITE
 * Le workflow n8n remplace automatiquement les valeurs ci-dessous
 */

// ============================================
// INTERFACES TYPESCRIPT
// ============================================

interface Address {
  street: string
  city: string
  postalCode: string
  full: string
}

interface OwnerDetails {
  experience: string
  certifications: string[]
  specialties: string[]
}

interface OpeningHour {
  day: string
  hours: string
}

interface NavigationItem {
  label: string
  href: string
}

interface Stat {
  value: number
  suffix: string
  label: string
}

interface HeroSection {
  title: string[]
  description: string
}

interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: number
  image: string
  popular?: boolean
  alt?: string
}

interface Benefit {
  title: string
  description: string
  icon: string
}

interface Review {
  author: string
  text: string
  rating: number
  date?: string
  treatment?: string
}

interface RatingCategory {
  label: string
  score: number
}

interface AboutSection {
  title: string
  description: string
  credentials: string[]
}

interface SeoConfig {
  title: string
  description: string
  keywords: string
}

interface SocialLinks {
  facebook: string
  instagram: string
  linkedin: string
}

interface ColorConfig {
  primary: string
}

interface SectionContent {
  label: string
  title: string
  description?: string
}

interface Sections {
  services: SectionContent
  reviews: SectionContent
  benefits: SectionContent
  team: SectionContent
  location: SectionContent
}

export interface SiteConfig {
  // Identité
  name: string
  owner: string
  tagline: string
  ownerDetails: OwnerDetails

  // Coordonnées
  phone: string
  phoneLink: string
  email: string
  address: Address

  // Horaires
  openingHours: OpeningHour[]

  // Navigation
  navigation: NavigationItem[]

  // Google
  googleMapsUrl: string
  googleMapsEmbedUrl: string
  googleRating: number
  googleReviewCount: number
  ratingCategories: RatingCategory[]

  // Images
  heroImage: string
  ownerImage: string

  // Couleurs
  colors: ColorConfig

  // Contenu
  hero: HeroSection
  services: Service[]
  benefits: Benefit[]
  reviews: Review[]
  about: AboutSection
  stats: Stat[]
  sections: Sections

  // Booking
  bookingHours: string[]

  // SEO & Social
  seo: SeoConfig
  social: SocialLinks
}

// ============================================
// CONFIGURATION DU SITE
// ============================================

export const siteConfig: SiteConfig = {
  // ============================================
  // IDENTITÉ DU SALON
  // ============================================
  name: "Nom du Salon",
  owner: "Prénom Nom",
  tagline: "Votre spécialité",

  ownerDetails: {
    experience: "5+ ans d'expérience",
    certifications: ["Certifié(e)"],
    specialties: ["Spécialité 1", "Spécialité 2"],
  },

  // ============================================
  // COORDONNÉES
  // ============================================
  phone: "06 00 00 00 00",
  phoneLink: "tel:+33600000000",
  email: "contact@exemple.fr",

  address: {
    street: "123 rue Exemple",
    city: "Ville",
    postalCode: "00000",
    full: "123 rue Exemple, 00000 Ville",
  },

  // ============================================
  // HORAIRES D'OUVERTURE
  // ============================================
  openingHours: [
    { day: "Lundi", hours: "Fermé" },
    { day: "Mardi", hours: "09:00 - 19:00" },
    { day: "Mercredi", hours: "09:00 - 19:00" },
    { day: "Jeudi", hours: "09:00 - 19:00" },
    { day: "Vendredi", hours: "09:00 - 19:00" },
    { day: "Samedi", hours: "09:00 - 13:00" },
    { day: "Dimanche", hours: "Fermé" },
  ],

  // ============================================
  // NAVIGATION
  // ============================================
  navigation: [
    { label: "Réserver", href: "#booking" },
    { label: "Nos soins", href: "#services" },
    { label: "Bienfaits", href: "#bienfaits" },
    { label: "Contact", href: "#contact" },
  ],

  // ============================================
  // GOOGLE MAPS & AVIS
  // ============================================
  googleMapsUrl: "https://maps.google.com",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=",
  googleRating: 5.0,
  googleReviewCount: 0,

  ratingCategories: [
    { label: "Accueil", score: 5.0 },
    { label: "Écoute", score: 5.0 },
    { label: "Cadre & Ambiance", score: 5.0 },
    { label: "Qualité du soin", score: 5.0 },
  ],

  // ============================================
  // IMAGES
  // ============================================
  heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
  ownerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",

  // ============================================
  // COULEURS (optionnel)
  // ============================================
  colors: {
    primary: "", // Laisser vide pour utiliser le thème par défaut
  },

  // ============================================
  // CONTENU HERO
  // ============================================
  hero: {
    title: [
      "Retrouvez",
      "Bien-être & Sérénité",
    ],
    description: "Découvrez nos soins personnalisés pour retrouver équilibre et harmonie.",
  },

  // ============================================
  // SERVICES
  // ============================================
  services: [
    {
      id: "service-1",
      name: "Soin Découverte",
      description: "Une première approche pour découvrir les bienfaits de nos soins.",
      duration: "30 min",
      price: 35,
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
      popular: false,
      alt: "Séance de soin découverte",
    },
    {
      id: "service-2",
      name: "Soin Complet",
      description: "Un soin approfondi pour une relaxation totale du corps et de l'esprit.",
      duration: "60 min",
      price: 60,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
      popular: true,
      alt: "Séance de soin complet",
    },
    {
      id: "service-3",
      name: "Soin Premium",
      description: "Notre soin signature pour une expérience unique et ressourçante.",
      duration: "90 min",
      price: 85,
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
      popular: true,
      alt: "Séance de soin premium",
    },
  ],

  // ============================================
  // BIENFAITS
  // ============================================
  benefits: [
    {
      title: "Réduction du stress",
      description: "Libération des tensions accumulées et apaisement du système nerveux",
      icon: "Brain",
    },
    {
      title: "Amélioration du sommeil",
      description: "Favorise un endormissement naturel et un sommeil réparateur",
      icon: "Moon",
    },
    {
      title: "Boost d'énergie",
      description: "Stimule la circulation et revitalise l'ensemble de l'organisme",
      icon: "Zap",
    },
    {
      title: "Soulagement des douleurs",
      description: "Atténue les tensions musculaires et les inconforts chroniques",
      icon: "Heart",
    },
  ],

  // ============================================
  // AVIS CLIENTS
  // ============================================
  reviews: [
    {
      author: "Sophie M.",
      text: "Une expérience merveilleuse, je me sens tellement mieux ! Je recommande vivement.",
      rating: 5,
      date: "Janvier 2025",
      treatment: "Soin Complet",
    },
    {
      author: "Marc L.",
      text: "Professionnalisme et bienveillance au rendez-vous. Un vrai moment de détente.",
      rating: 5,
      date: "Décembre 2024",
      treatment: "Soin Premium",
    },
    {
      author: "Isabelle D.",
      text: "Je me sens tellement mieux après chaque séance. Une vraie parenthèse de bien-être.",
      rating: 5,
      date: "Novembre 2024",
      treatment: "Soin Découverte",
    },
    {
      author: "Pierre R.",
      text: "Cadre apaisant et soins de qualité. Je reviendrai sans hésiter.",
      rating: 5,
      date: "Octobre 2024",
      treatment: "Soin Complet",
    },
    {
      author: "Claire B.",
      text: "Un moment de pure détente. Merci pour votre professionnalisme et votre écoute.",
      rating: 5,
      date: "Septembre 2024",
      treatment: "Soin Premium",
    },
  ],

  // ============================================
  // STATISTIQUES
  // ============================================
  stats: [
    { value: 100, suffix: "%", label: "Clients satisfaits" },
    { value: 5, suffix: "+", label: "Années d'expérience" },
    { value: 500, suffix: "+", label: "Clients accompagnés" },
  ],

  // ============================================
  // TEXTES DES SECTIONS
  // ============================================
  sections: {
    services: {
      label: "Nos prestations",
      title: "Des soins adaptés à vos besoins",
      description: "Découvrez notre gamme de soins personnalisés pour retrouver équilibre et sérénité.",
    },
    reviews: {
      label: "Avis clients",
      title: "Ce qu'ils en disent",
      description: "Découvrez les témoignages de nos clients satisfaits.",
    },
    benefits: {
      label: "Bienfaits",
      title: "Les vertus de nos soins",
      description: "Découvrez comment nos soins peuvent améliorer votre bien-être au quotidien.",
    },
    team: {
      label: "Votre praticien(ne)",
      title: "À votre écoute",
      description: "Un accompagnement personnalisé pour répondre à vos besoins.",
    },
    location: {
      label: "Nous trouver",
      title: "Accès & Horaires",
      description: "Retrouvez-nous facilement pour votre prochaine séance.",
    },
  },

  // ============================================
  // CRÉNEAUX DE RÉSERVATION
  // ============================================
  bookingHours: ["09h00", "10h00", "11h00", "14h00", "15h00", "16h00", "17h00", "18h00"],

  // ============================================
  // À PROPOS / POURQUOI ME CHOISIR
  // ============================================
  about: {
    title: "Les bienfaits de nos soins",
    description: "Technique naturelle et non invasive, nos soins activent les capacités d'auto-guérison de votre corps pour retrouver équilibre et harmonie.",
    credentials: [
      "Certifié(e)",
      "Approche personnalisée",
      "5+ ans d'expérience",
    ],
  },

  // ============================================
  // SEO
  // ============================================
  seo: {
    title: "Nom du Salon | Ville",
    description: "Découvrez nos soins bien-être à Ville. Prenez rendez-vous dès maintenant.",
    keywords: "bien-être, soins, massage, relaxation",
  },

  // ============================================
  // RÉSEAUX SOCIAUX (optionnel)
  // ============================================
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
}
