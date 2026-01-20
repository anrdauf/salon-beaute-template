/**
 * Configuration centralisée du site
 *
 * CE FICHIER EST LE SEUL À MODIFIER POUR PERSONNALISER LE SITE
 * Le workflow n8n remplace automatiquement les valeurs ci-dessous
 */

export const siteConfig = {
  // ============================================
  // IDENTITÉ DU SALON
  // ============================================
  name: "Nom du Salon",
  owner: "Prénom Nom",
  tagline: "Votre spécialité",

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
  // GOOGLE MAPS & AVIS
  // ============================================
  googleMapsUrl: "https://maps.google.com",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=",
  googleRating: 5.0,
  googleReviewCount: 0,

  // ============================================
  // IMAGES
  // ============================================
  heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
  ownerImage: "",

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
    title: {
      line1: "Retrouvez",
      line2: "Bien-être",
      line3: "& Sérénité",
    },
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
      duration: "45 min",
      price: 45,
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
    },
    {
      id: "service-2",
      name: "Soin Complet",
      description: "Un soin approfondi pour une relaxation totale.",
      duration: "60 min",
      price: 60,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    },
    {
      id: "service-3",
      name: "Soin Premium",
      description: "Notre soin signature pour une expérience unique.",
      duration: "90 min",
      price: 85,
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
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
      author: "Client A.",
      text: "Une expérience merveilleuse, je recommande vivement !",
      rating: 5,
    },
    {
      author: "Client B.",
      text: "Professionnalisme et bienveillance au rendez-vous.",
      rating: 5,
    },
    {
      author: "Client C.",
      text: "Je me sens tellement mieux après chaque séance.",
      rating: 5,
    },
  ],

  // ============================================
  // À PROPOS / POURQUOI ME CHOISIR
  // ============================================
  about: {
    title: "Les bienfaits de nos soins",
    description: "Technique naturelle et non invasive, nos soins activent les capacités d'auto-guérison de votre corps pour retrouver équilibre et harmonie.",
    credentials: [
      "Certifié(e)",
      "Approche personnalisée",
      "Expérience",
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

// Type pour l'autocomplétion
export type SiteConfig = typeof siteConfig
