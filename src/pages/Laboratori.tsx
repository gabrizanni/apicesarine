import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Euro, Download, ArrowRight, Target } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Laboratori = () => {
  const workshops = [
    {
      id: 1,
      title: "Piccoli Impollinatori",
      slug: "piccoli-impollinatori",
      audience: "Scuola dell'Infanzia",
      ageRange: "3-6 anni",
      duration: 60,
      maxStudents: 25,
      priceFrom: 150,
      season: ["Primavera", "Estate", "Autunno"],
      spaceNeeds: "Aula ampia con tavoli, presa elettrica",
      objectives: [
        "Sviluppare la curiosità verso il mondo naturale",
        "Stimolare l'uso dei cinque sensi",
        "Promuovere il rispetto per gli insetti utili",
        "Introdurre concetti di collaborazione"
      ],
      description: "Un viaggio sensoriale nel mondo delle api pensato per i più piccoli. I bambini esploreranno colori, profumi e forme del mondo dell'alveare attraverso attività ludiche e interattive.",
      activities: ["Osservazione di miele e cera", "Giochi di imitazione", "Costruzione di fiori di carta", "Assaggio di mieli diversi"],
      color: "honey"
    },
    {
      id: 2,
      title: "Api & Scienza",
      slug: "api-scienza",
      audience: "Scuola Primaria",
      ageRange: "6-11 anni",
      duration: 90,
      maxStudents: 25,
      priceFrom: 180,
      season: ["Tutto l'anno"],
      spaceNeeds: "Aula con LIM/proiettore, tavoli per gruppi",
      objectives: [
        "Comprendere il processo di impollinazione",
        "Osservare il ciclo di vita delle api",
        "Applicare il metodo scientifico",
        "Sviluppare competenze STEM"
      ],
      description: "Esperimenti pratici e osservazioni scientifiche per comprendere il ruolo fondamentale delle api nell'ecosistema. I bambini diventeranno piccoli scienziati esploratori.",
      activities: ["Esperimenti su impollinazione", "Osservazione al microscopio", "Costruzione di modellini", "Analisi di pollini"],
      color: "forest"
    },
    {
      id: 3,
      title: "Ecosistemi e Sostenibilità",
      slug: "ecosistemi-sostenibilita", 
      audience: "Scuola Secondaria I grado",
      ageRange: "11-14 anni",
      duration: 120,
      maxStudents: 25,
      priceFrom: 220,
      season: ["Tutto l'anno"],
      spaceNeeds: "Aula informatica o con dispositivi, spazio per dibattiti",
      objectives: [
        "Analizzare le reti alimentari e la biodiversità",
        "Valutare l'impatto dei cambiamenti climatici",
        "Sviluppare pensiero critico ambientale",
        "Promuovere cittadinanza attiva"
      ],
      description: "Un'analisi approfondita degli ecosistemi e delle sfide ambientali attuali. I ragazzi svilupperanno una coscienza ecologica e competenze di cittadinanza attiva.",
      activities: ["Debate su sostenibilità", "Analisi dati ambientali", "Progettazione giardini per api", "Simulazioni ecosistemiche"],
      color: "slate"
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              I nostri laboratori
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Programmi educativi progettati specificamente per ogni fascia d'età, 
              con contenuti scientificamente accurati e metodologie coinvolgenti.
            </p>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="shadow-card border-0 overflow-hidden hover:shadow-lg transition-smooth">
                <div className={`h-1 ${
                  workshop.color === 'honey' ? 'bg-gradient-honey' :
                  workshop.color === 'forest' ? 'bg-gradient-nature' :
                  'bg-gradient-to-r from-slate to-slate/80'
                }`}></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {workshop.audience}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {workshop.ageRange}
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-slate mb-3">
                        {workshop.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {workshop.description}
                      </p>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h3 className="flex items-center text-lg font-semibold text-slate mb-3">
                        <Target className="h-5 w-5 mr-2 text-forest" />
                        Obiettivi didattici
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {workshop.objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <span className="inline-block w-1.5 h-1.5 bg-honey rounded-full mt-2 flex-shrink-0"></span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Activities */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate mb-3">
                        Attività principali
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {workshop.activities.map((activity, idx) => (
                          <span 
                            key={idx}
                            className="inline-block px-3 py-1 bg-muted text-sm rounded-lg text-muted-foreground"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-muted/30 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Durata</span>
                        </div>
                        <span className="font-medium">{workshop.duration} min</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Max studenti</span>
                        </div>
                        <span className="font-medium">{workshop.maxStudents}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Euro className="h-4 w-4" />
                          <span>Prezzo</span>
                        </div>
                        <span className="font-semibold text-forest">da €{workshop.priceFrom}/classe</span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-medium text-slate mb-3">Requisiti spazio</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {workshop.spaceNeeds}
                      </p>
                      
                      <h4 className="font-medium text-slate mb-2">Stagioni consigliate</h4>
                      <div className="flex flex-wrap gap-1">
                        {workshop.season.map((s, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button asChild variant="cta" size="lg" className="w-full">
                        <Link to="/prenota">
                          Richiedi questo laboratorio
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button variant="outline" size="lg" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Scarica scheda PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Vuoi un programma personalizzato?
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Progettiamo laboratori su misura per le tue esigenze didattiche specifiche. 
              Contattaci per discutere le possibilità.
            </p>
            <Button asChild variant="nature" size="lg">
              <Link to="/contatti">
                Richiedi consulenza gratuita
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Laboratori;