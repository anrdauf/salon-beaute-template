"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 10, suffix: "+", label: "Années d'expérience" },
  { value: 30, suffix: "+", label: "Soins proposés" },
  { value: 7, suffix: "j/7", label: "Disponibilité" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = Date.now()

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.floor(easeOut * value))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary">
      {displayValue}{suffix}
    </div>
  )
}

export function Stats() {
  return (
    <section className="py-20 md:py-28 bg-secondary/70 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-6 md:p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 ${
                index % 2 === 1 ? 'lg:translate-y-4' : ''
              }`}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm md:text-base mt-3 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed">
            La guérison commence de l&apos;intérieur. Notre approche holistique du bien-être vous garantit de repartir ressourcé, revitalisé et prêt à aborder chaque journée avec une énergie renouvelée.
          </p>
        </div>
      </div>
    </section>
  )
}
