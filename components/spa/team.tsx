"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const teamMembers = [
  {
    name: "Mélinda Favris",
    role: "Réflexologue certifiée RNCP",
    specialty: "Réflexologie plantaire et faciale",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    experience: "5+ ans",
  },
]

export function Team() {
  return (
    <section id="team" className="pt-24 md:pt-32 pb-12 md:pb-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Votre praticienne
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            À votre <span className="italic">écoute</span>
          </h2>
        </div>

        {/* Team Grid - Avatar style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {teamMembers.map((member) => (
            <Link
              key={member.name}
              href="#booking"
              className="group text-center"
            >
              {/* Avatar circulaire */}
              <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-primary/40 group-hover:shadow-xl transition-all duration-300">
                <img
                  src={member.image}
                  alt={`Photo de ${member.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
              <p className="text-muted-foreground text-xs mt-1.5 line-clamp-1">{member.specialty}</p>

              {/* Experience badge */}
              <span className="inline-block mt-3 px-3 py-1 bg-white text-muted-foreground text-xs font-medium rounded-full shadow-sm">
                {member.experience} d&apos;expérience
              </span>

              {/* CTA visible */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Réserver
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
