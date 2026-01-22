"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function Team() {
  const teamMember = {
    name: siteConfig.owner,
    role: siteConfig.ownerDetails.certifications[0],
    specialty: siteConfig.ownerDetails.specialties.join(", "),
    image: siteConfig.ownerImage,
    experience: siteConfig.ownerDetails.experience,
  }

  return (
    <section id="team" className="pt-24 md:pt-32 pb-12 md:pb-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            {siteConfig.sections.team.label}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            {siteConfig.sections.team.title}
          </h2>
        </div>

        {/* Team Grid - Avatar style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <Link
            href="#booking"
            className="group text-center col-start-2 lg:col-start-2"
          >
            {/* Avatar circulaire */}
            <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-primary/40 group-hover:shadow-xl transition-all duration-300">
              <img
                src={teamMember.image}
                alt={`Photo de ${teamMember.name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Info */}
            <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
              {teamMember.name}
            </h3>
            <p className="text-primary text-sm font-medium mt-1">{teamMember.role}</p>
            <p className="text-muted-foreground text-xs mt-1.5 line-clamp-1">{teamMember.specialty}</p>

            {/* Experience badge */}
            <span className="inline-block mt-3 px-3 py-1 bg-white text-muted-foreground text-xs font-medium rounded-full shadow-sm">
              {teamMember.experience}
            </span>

            {/* CTA visible */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Réserver
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
