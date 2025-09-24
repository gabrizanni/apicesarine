import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Euro, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkshopPreview = () => {
  const workshops = [
    {
      title: "Piccoli Impollinatori",
      audience: "Scuola dell'Infanzia (3-6 anni)",
      duration: "60 minuti",
      maxStudents: "25 bambini",
      price: "150",
      description: "Un viaggio sensoriale nel mondo delle api per i più piccoli.",
      objectives: ["Sviluppo dei sensi", "Curiosità verso la natura", "Rispetto per gli insetti"],
      color: "honey"
    },
    {
      title: "Api & Scienza",
      audience: "Scuola Primaria (6-11 anni)",
      duration: "90 minuti", 
      maxStudents: "25 studenti",
      price: "180",
      description: "Esperimenti e osservazioni per capire il ruolo delle api nell'ecosistema.",
      objectives: ["Impollinazione", "Ciclo di vita", "Metodo scientifico"],
      color: "forest"
    },
    {
      title: "Ecosistemi e Sostenibilità",
      audience: "Scuola Secondaria I grado (11-14 anni)",
      duration: "120 minuti",
      maxStudents: "25 studenti", 
      price: "220",
      description: "Analisi critica dell'impatto ambientale e delle strategie di conservazione.",
      objectives: ["Biodiversità", "Catene alimentari", "Cittadinanza attiva"],
      color: "slate"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-honey/15 via-cream/70 to-forest/8">
      <div className="container-responsive relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-bold text-slate mb-4">
            Programmi per ogni età
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Laboratori progettati specificamente per accompagnare la crescita e 
            l'apprendimento dei tuoi studenti.
          </p>
        </div>

        <div className="mobile-grid">
          {workshops.map((workshop, index) => (
            <Card key={index} className="shadow-honey hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              {/* Header Image Placeholder */}
              <div className={`aspect-video relative overflow-hidden ${
                workshop.color === 'honey' ? 'bg-gradient-honey' :
                workshop.color === 'forest' ? 'bg-gradient-nature' :
                'bg-gradient-to-r from-slate to-slate/80'
              }`}>
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <span className="text-white/80 text-sm font-medium">{workshop.title}</span>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex flex-col space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {workshop.audience}
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-slate">
                    {workshop.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {workshop.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Metadata Stack */}
                <div className="space-y-3">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Max {workshop.maxStudents}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 text-base sm:text-lg font-semibold text-forest">
                    <Euro className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden="true" />
                    <span>da {workshop.price}/classe</span>
                  </div>

                  {/* Objectives */}
                  <div>
                    <div className="text-sm font-medium text-slate mb-2">Obiettivi didattici:</div>
                    <div className="flex flex-wrap gap-1">
                      {workshop.objectives.map((objective, idx) => (
                        <span 
                          key={idx}
                          className="inline-block px-2 py-1 bg-muted text-xs rounded-lg text-muted-foreground"
                        >
                          {objective}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild variant="outline" className="w-full group-hover:bg-accent transition-smooth focus-ring">
                  <Link to="/prenota" className="group" aria-label={`Richiedi il laboratorio ${workshop.title}`}>
                    Richiedi questo laboratorio
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button asChild variant="nature" size="lg" className="focus-ring">
            <Link to="/laboratori" aria-label="Visualizza tutti i laboratori disponibili">
              Vedi tutti i laboratori
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkshopPreview;