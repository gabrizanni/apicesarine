import React from 'react';
import { Play, Download, Eye } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-classroom.jpg';
import beesNatureImage from '@/assets/bees-nature.jpg';
import educatorImage from '@/assets/educator-portrait.jpg';

const Galleria = () => {
  const mediaItems = [
    {
      id: 1,
      type: "photo",
      title: "Laboratorio alla Scuola Primaria di Bologna",
      description: "I bambini osservano con curiosità i materiali didattici sulle api",
      image: heroImage,
      school: "IC Giuseppe Verdi",
      date: "2024-03-15",
      category: "Laboratori"
    },
    {
      id: 2,
      type: "photo",
      title: "Api al lavoro in natura",
      description: "Immagini ravvicinate per mostrare la bellezza del mondo delle api",
      image: beesNatureImage,
      school: "Materiale didattico",
      date: "2024-03-10",
      category: "Natura"
    },
    {
      id: 3,
      type: "video",
      title: "Come costruire un hotel per insetti",
      description: "Tutorial pratico per creare rifugi per impollinatori selvatici",
      image: educatorImage,
      duration: "12:34",
      date: "2024-03-05",
      category: "Tutorial"
    },
    {
      id: 4,
      type: "photo",
      title: "Presentazione alle Scuole dell'Infanzia",
      description: "Momento di storytelling con i più piccoli",
      image: educatorImage,
      school: "Scuola dell'Infanzia Arcobaleno",
      date: "2024-02-28",
      category: "Laboratori"
    },
    {
      id: 5,
      type: "video",
      title: "La danza delle api spiegata ai bambini",
      description: "Come le api comunicano tra loro: un video educativo",
      image: beesNatureImage,
      duration: "8:45",
      date: "2024-02-20",
      category: "Educativo"
    },
    {
      id: 6,
      type: "photo",
      title: "Workshop per docenti",
      description: "Formazione sui metodi didattici innovativi",
      image: heroImage,
      school: "Centro Formazione Docenti",
      date: "2024-02-15",
      category: "Formazione"
    }
  ];

  const categories = ["Tutti", "Laboratori", "Natura", "Tutorial", "Educativo", "Formazione"];
  const [selectedCategory, setSelectedCategory] = React.useState("Tutti");
  const [selectedItem, setSelectedItem] = React.useState(null);

  const filteredItems = mediaItems.filter(item => 
    selectedCategory === "Tutti" || item.category === selectedCategory
  );

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Galleria
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Foto e video dai nostri laboratori, materiali didattici e momenti 
              speciali di apprendimento con bambini e docenti.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="shadow-card border-0 overflow-hidden hover:shadow-lg transition-smooth group cursor-pointer">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                    {item.type === "video" ? (
                      <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-slate ml-1" />
                        </div>
                      </div>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Eye className="h-6 w-6 text-slate" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant={item.type === "video" ? "default" : "secondary"} className="text-xs">
                      {item.type === "video" ? "Video" : "Foto"}
                    </Badge>
                  </div>

                  {/* Duration for videos */}
                  {item.type === "video" && (
                    <div className="absolute bottom-3 right-3">
                      <Badge variant="outline" className="text-xs bg-black/50 text-white border-white/20">
                        {item.duration}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-slate mb-2 group-hover:text-primary transition-smooth">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.school || "Api Cesarine"}</span>
                    <span>{new Date(item.date).toLocaleDateString('it-IT')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carica altri contenuti
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              Video educativi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una selezione di contenuti video per approfondire il mondo delle api 
              e supportare la didattica in classe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-card border-0 overflow-hidden">
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                  <h3 className="font-semibold text-slate mb-2">
                    Il mondo delle api per bambini
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Video introduttivo ideale per tutte le età
                  </p>
                </div>
              </div>
            </Card>

            <Card className="shadow-card border-0 overflow-hidden">
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                  <h3 className="font-semibold text-slate mb-2">
                    Come nasce il miele
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dal fiore al vasetto: un processo affascinante
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Materiali per la tua scuola
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Scarica le foto e i video dei nostri laboratori per arricchire 
              i tuoi materiali didattici e documentare le attività.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="nature" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Richiedi materiali HD
              </Button>
              <Button variant="outline" size="lg">
                Scarica schede didattiche
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Galleria;