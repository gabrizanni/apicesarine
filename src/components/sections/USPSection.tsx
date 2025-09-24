import React from 'react';
import { Shield, Award, Users } from 'lucide-react';

const USPSection = () => {
  const usps = [
    {
      icon: Award,
      title: "Esperti certificati",
      description: "I nostri educatori sono apicoltori qualificati e formatori specializzati in didattica per l'infanzia e primaria."
    },
    {
      icon: Shield,
      title: "Sicurezza prima di tutto",
      description: "Protocolli rigorosi per la gestione delle allergie e attrezzature certificate per garantire la massima sicurezza."
    },
    {
      icon: Users,
      title: "Programmi allineati alle età",
      description: "Contenuti e metodologie calibrati sui diversi stadi di sviluppo cognitivo, dalla scuola dell'infanzia alle medie."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-honey/15 via-cream/70 to-forest/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate mb-4">
            Perché scegliere Api Cesarine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La nostra esperienza e passione per l'educazione ci rendono il partner ideale 
            per portare la natura in classe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div 
                key={index} 
                className="text-center group hover:-translate-y-2 transition-smooth"
              >
                <div className="mb-6 inline-flex p-4 bg-gradient-honey rounded-2xl shadow-honey group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-8 w-8 text-slate" />
                </div>
                <h3 className="text-xl font-semibold text-slate mb-3">
                  {usp.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {usp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default USPSection;