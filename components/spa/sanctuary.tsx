"use client"

export function Sanctuary() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Images Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* First column */}
            <div className="col-span-5 space-y-4">
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80"
                  alt="Séance de massage relaxante"
                  className="w-full h-40 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=400&q=80"
                  alt="Huiles et bougies de spa"
                  className="w-full h-52 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Second column - offset */}
            <div className="col-span-7 pt-8">
              <div className="relative overflow-hidden rounded-2xl group h-64 md:h-80">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80"
                  alt="Environnement spa paisible"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating stat card */}
              <div className="relative -mt-12 ml-4 mr-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-serif">15+</p>
                    <p className="text-sm text-primary-foreground/80">Cabines de soins</p>
                  </div>
                  <div className="w-px h-12 bg-primary-foreground/20" />
                  <div>
                    <p className="text-3xl font-serif">50+</p>
                    <p className="text-sm text-primary-foreground/80">Thérapeutes experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div className="lg:pl-8">
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Notre sanctuaire
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              Un sanctuaire de calme à chaque{" "}
              <span className="italic">soin que vous recevez</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Nous combinons techniques traditionnelles et thérapies bien-être modernes pour créer une expérience spa qui nourrit le corps, apaise l&apos;esprit et recharge votre énergie en une belle séance.
            </p>

            {/* Quality badges */}
            <div className="mt-10 flex flex-wrap gap-3">
              {["Éco-responsable", "Produits bio", "Suites privées", "Piscines chauffées"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
