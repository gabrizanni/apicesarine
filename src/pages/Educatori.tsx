import React from 'react';
import { MapPin, Award, BookOpen } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import educatorImage from '@/assets/educator-portrait.jpg';

const Educatori = () => {
  const educators = [
    {
      id: 1,
      name: "Maria Francesca Rossi",
      bio: "Apicoltrice professionale da oltre 15 anni, specializzata in didattica per l'infanzia. Laureata in Scienze Naturali con master in Educazione Ambientale.",
      photo: educatorImage,
      regions: ["Emilia-Romagna", "Toscana", "Marche"],
      certifications: ["Apicoltore professionale", "Formatore certificato", "Primo soccorso"],
      specializations: ["Scuola dell'infanzia", "Inclusività", "Laboratori sensoriali"]
    },
    {
      id: 2,
      name: "Giuseppe Bianchi",
      bio: "Ricercatore in entomologia e divulgatore scientifico. Collabora con università e musei naturalistici per programmi di educazione ambientale.",
      photo: educatorImage,
      regions: ["Lombardia", "Piemonte", "Veneto"],
      certifications: ["Dottore in Entomologia", "Guida naturalistica", "Educatore ambientale"],
      specializations: ["Metodo scientifico", "Scuola primaria", "Biodiversità"]
    },
    {
      id: 3,
      name: "Anna Verdi",
      bio: "Biologa marina convertita all'apicoltura, esperta in sostenibilità e cambiamenti climatici. Coordina progetti europei di conservazione degli impollinatori.",
      photo: educatorImage,
      regions: ["Lazio", "Campania", "Puglia"],
      certifications: ["Biologa marina", "Project manager UE", "Esperta sostenibilità"],
      specializations: ["Cambiamenti climatici", "Scuola secondaria", "Cittadinanza attiva"]
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              I nostri educatori
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Professionisti appassionati e qualificati che portano competenza, 
              sicurezza e amore per la natura in ogni laboratorio.
            </p>
          </div>
        </div>
      </section>

      {/* Educators Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {educators.map((educator) => (
              <Card key={educator.id} className="shadow-card border-0 overflow-hidden hover:shadow-lg transition-smooth group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={educator.photo}
                    alt={`Foto di ${educator.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-slate mb-2">
                    {educator.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {educator.bio}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Regions */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-forest" />
                      <span className="text-sm font-medium text-slate">Aree coperte</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {educator.regions.map((region, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-4 w-4 text-forest" />
                      <span className="text-sm font-medium text-slate">Certificazioni</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {educator.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-4 w-4 text-forest" />
                      <span className="text-sm font-medium text-slate">Specializzazioni</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {educator.specializations.map((spec, idx) => (
                        <Badge key={idx} className="bg-honey/10 text-honey-light border-honey/20 text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Values */}
          <div className="mt-16 bg-gradient-hero rounded-3xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate mb-4">
                I nostri valori
              </h2>
              <p className="text-slate/80 max-w-2xl mx-auto">
                Ogni membro del team Api Cesarine condivide la passione per l'educazione 
                e l'impegno verso la sicurezza e la qualità.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-forest" />
                </div>
                <h3 className="font-semibold text-slate mb-2">Competenza</h3>
                <p className="text-sm text-slate/70">Formazione continua e aggiornamento professionale costante</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-forest" />
                </div>
                <h3 className="font-semibold text-slate mb-2">Passione</h3>
                <p className="text-sm text-slate/70">Amore genuino per la natura e l'educazione dei giovani</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-forest/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-forest" />
                </div>
                <h3 className="font-semibold text-slate mb-2">Territorio</h3>
                <p className="text-sm text-slate/70">Conoscenza profonda delle specificità locali</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Educatori;