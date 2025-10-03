import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import heroImage from '@/assets/hero-classroom.jpg';

const Hero = () => {
  return (
      <section className="relative bg-gradient-to-br from-honey/15 via-cream/70 to-forest/8 overflow-hidden">
        {/* Hexagon background overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hexagon-hero" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
                <polygon points="1.4,0.2 2.5,0.9 2.5,2 1.4,2.7 0.4,2 0.4,0.9" fill="hsl(40 30% 50% / 0.25)" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hexagon-hero)" />
          </svg>
        </div>
        <div className="container-responsive py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h1 className="font-bold text-slate leading-tight">
                  Portiamo le api
                  <span className="text-forest block">a scuola.</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate/80 max-w-lg">
                  Laboratori esperienziali per scoprire scienza, sostenibilità e meraviglia – 
                  direttamente in classe.
                </p>
              </div>

              <div className="mobile-stack">
                <Button asChild variant="hero" size="xl" className="shadow-honey hover:shadow-xl focus-ring">
                  <Link to="/prenota" className="group" aria-label="Richiedi un laboratorio didattico">
                    Richiedi un laboratorio
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="xl" className="border-forest/30 bg-white/80 backdrop-blur-sm hover:bg-forest hover:text-white shadow-lg focus-ring">
                  <Link to="/galleria" className="group" aria-label="Guarda i video dei laboratori">
                    <Play className="mr-2 h-5 w-5" />
                    Guarda i video
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-slate/10">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-forest">500+</div>
                  <div className="text-xs sm:text-sm text-slate/60">Scuole raggiunte</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-forest">50k+</div>
                  <div className="text-xs sm:text-sm text-slate/60">Studenti coinvolti</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-forest">15</div>
                  <div className="text-xs sm:text-sm text-slate/60">Regioni coperte</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-card aspect-video">
                <img src={heroImage} alt="Bambini che partecipano a un laboratorio sulle api in classe" className="w-full h-full object-cover image-lazy" loading="eager" />
                
                {/* Mobile CTA Overlay - Always visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center lg:hidden">
                  <div className="p-4 w-full">
                    <Button asChild variant="hero" className="w-full shadow-lg focus-ring">
                      <Link to="/prenota" aria-label="Richiedi un laboratorio didattico">
                        Richiedi un laboratorio
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Desktop Interactive buttons overlay */}
                <div className="absolute inset-0 hidden lg:flex items-center justify-center">
                  <div className="mobile-stack p-8">
                    <Button asChild variant="hero" size="lg" className="shadow-lg hover:shadow-xl animate-fade-in focus-ring">
                      
                    </Button>
                    
                    <Button asChild variant="outline" size="lg" className="bg-white/90 backdrop-blur-sm border-white hover:bg-white shadow-lg hover:shadow-xl animate-fade-in focus-ring">
                      
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="pointer-events-none absolute -top-4 -right-4 w-24 h-24 bg-honey/20 rounded-full blur-xl"></div>
              <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 bg-forest/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Hero;