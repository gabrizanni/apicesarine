import React from 'react';
import { Search, Calendar, GraduationCap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Scegli il programma",
      description: "Esplora i nostri laboratori per età e obiettivi didattici. Ogni programma è progettato per stimolare curiosità e apprendimento."
    },
    {
      number: "02", 
      icon: Calendar,
      title: "Concorda la data",
      description: "Compila il modulo di richiesta indicando le tue preferenze. Ti ricontatteremo entro 24 ore per organizzare tutto."
    },
    {
      number: "03",
      icon: GraduationCap,
      title: "Laboratorio in classe",
      description: "I nostri esperti portano tutto il necessario. Gli studenti vivranno un'esperienza educativa indimenticabile."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate mb-4">
            Come funziona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In tre semplici passi portiamo la magia delle api direttamente nella tua scuola.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connection lines (hidden on mobile) */}
          <div className="hidden lg:block absolute top-24 left-1/6 w-2/3 h-0.5 bg-gradient-to-r from-honey to-forest opacity-30"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center group">
                {/* Step number */}
                <div className="mb-6 relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full shadow-card border-4 border-cream group-hover:border-honey transition-smooth relative z-10">
                    <Icon className="h-6 w-6 text-forest" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-honey rounded-full flex items-center justify-center text-xs font-bold text-slate">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-slate mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;