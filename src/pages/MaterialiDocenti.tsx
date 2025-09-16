import React from 'react';
import { Download, Lock, FileText, Video, BookOpen } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MaterialiDocenti = () => {
  const freeMaterials = [
    {
      title: "Guida alle Api per la Scuola dell'Infanzia",
      description: "Manuale completo con attività e suggerimenti per introdurre i più piccoli al mondo delle api",
      type: "PDF",
      size: "2.3 MB",
      icon: FileText
    },
    {
      title: "Schede Didattiche: Il Ciclo di Vita delle Api",
      description: "Materiali stampabili con illustrazioni e attività per la scuola primaria",
      type: "PDF",
      size: "1.8 MB",
      icon: FileText
    },
    {
      title: "Video Tutorial: Costruire un Hotel per Insetti",
      description: "Guida video passo-passo per creare rifugi per impollinatori selvatici",
      type: "Video",
      size: "15 min",
      icon: Video
    },
    {
      title: "Glossario Illustrato dell'Apicoltura",
      description: "Dizionario visivo dei termini tecnici adatto a tutte le età",
      type: "PDF",
      size: "3.1 MB",
      icon: BookOpen
    }
  ];

  const premiumMaterials = [
    {
      title: "Percorso Didattico Completo: Un Anno con le Api",
      description: "Programmazione annuale con 20 lezioni strutturate e materiali di supporto",
      type: "Pacchetto",
      lessons: "20 lezioni"
    },
    {
      title: "Assessment e Verifiche per Competenze",
      description: "Strumenti di valutazione allineati alle Indicazioni Nazionali",
      type: "PDF + Doc",
      lessons: "15 verifiche"
    },
    {
      title: "Laboratori Virtuali Interattivi",
      description: "Simulazioni digitali per esplorare l'alveare in sicurezza",
      type: "Software",
      lessons: "5 simulazioni"
    },
    {
      title: "Formazione Docenti: Webinar Registrati",
      description: "Serie di incontri formativi con esperti e buone pratiche",
      type: "Video",
      lessons: "8 webinar"
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Materiali per docenti
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Risorse didattiche gratuite e premium per arricchire 
              le tue lezioni e approfondire il mondo delle api.
            </p>
          </div>
        </div>
      </section>

      {/* Free Materials */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              Risorse gratuite
            </h2>
            <p className="text-lg text-muted-foreground">
              Materiali didattici liberamente scaricabili per iniziare subito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeMaterials.map((material, index) => {
              const Icon = material.icon;
              return (
                <Card key={index} className="shadow-card border-0 hover:shadow-lg transition-smooth group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-honey rounded-xl group-hover:shadow-honey transition-smooth">
                        <Icon className="h-6 w-6 text-slate" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-slate mb-2">
                          {material.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {material.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs">
                          {material.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {material.size}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="group-hover:bg-accent transition-smooth">
                        <Download className="h-4 w-4 mr-2" />
                        Scarica
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Materials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              Area docenti riservata
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Materiali avanzati e percorsi strutturati per docenti che hanno partecipato ai nostri laboratori.
            </p>
            
            {/* Access Card */}
            <Card className="bg-gradient-nature text-white shadow-card border-0 max-w-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Accesso riservato</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Inserisci il codice ricevuto dopo il laboratorio per accedere ai materiali premium.
                </p>
                <div className="flex space-x-2">
                  <input 
                    type="password" 
                    placeholder="Codice accesso"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 text-sm"
                  />
                  <Button variant="secondary" size="sm">
                    Accedi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumMaterials.map((material, index) => (
              <Card key={index} className="shadow-card border-0 opacity-75 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate/5 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-slate mb-2">
                    {material.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {material.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      {material.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {material.lessons}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Vuoi accedere a tutti i materiali?
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Organizza un laboratorio nella tua scuola e riceverai l'accesso completo 
              all'area riservata con materiali esclusivi e percorsi strutturati.
            </p>
            <Button variant="nature" size="lg">
              Richiedi un laboratorio
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MaterialiDocenti;