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
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-honey/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="workshop-hexagon" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <polygon points="7.5,1 13,4.5 13,10.5 7.5,14 2,10.5 2,4.5" fill="currentColor" className="text-forest/20" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#workshop-hexagon)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate mb-4">
            Programmi per ogni età
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Laboratori progettati specificamente per accompagnare la crescita e 
            l'apprendimento dei tuoi studenti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {workshops.map((workshop, index) => (
            <Card key={index} className="shadow-card hover:shadow-lg transition-smooth border-0 overflow-hidden group hover:-translate-y-1">
              <div className={`h-2 ${
                workshop.color === 'honey' ? 'bg-gradient-honey' :
                workshop.color === 'forest' ? 'bg-gradient-nature' :
                'bg-gradient-to-r from-slate to-slate/80'
              }`}></div>
              
              <CardHeader className="pb-4">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {workshop.audience}
                </div>
                <CardTitle className="text-xl text-slate mb-3">
                  {workshop.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {workshop.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Max {workshop.maxStudents}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 text-lg font-semibold text-forest">
                  <Euro className="h-5 w-5" />
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

                {/* CTA */}
                <Button asChild variant="outline" className="w-full group-hover:bg-accent transition-smooth">
                  <Link to="/prenota" className="group">
                    Richiedi questo laboratorio
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="nature" size="lg">
            <Link to="/laboratori">
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