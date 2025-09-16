import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';

const Storie = () => {
  const posts = [
    {
      id: 1,
      title: "Come le api stanno salvando la biodiversità urbana",
      excerpt: "Scopriamo il ruolo fondamentale degli impollinatori nelle città e come i progetti di apicoltura urbana stanno creando corridoi ecologici.",
      author: "Maria Francesca Rossi",
      date: "2024-03-15",
      tags: ["Biodiversità", "Città", "Sostenibilità"],
      category: "Ambiente",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Il successo del laboratorio alla scuola di Modena",
      excerpt: "Un racconto dall'interno: come 120 bambini della scuola primaria hanno scoperto il mondo delle api e sviluppato una nuova coscienza ambientale.",
      author: "Giuseppe Bianchi",
      date: "2024-03-08",
      tags: ["Scuola", "Laboratorio", "Primaria"],
      category: "Educazione",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "STEM education: le api come ponte tra scienza e natura",
      excerpt: "Analisiamo come l'uso delle api nei laboratori didattici promuova competenze STEM in modo naturale e coinvolgente.",
      author: "Anna Verdi",
      date: "2024-02-28",
      tags: ["STEM", "Metodologia", "Innovazione"],
      category: "Didattica",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "I cambiamenti climatici spiegati ai bambini",
      excerpt: "Strategie e metodologie per affrontare temi complessi come il climate change attraverso l'osservazione del comportamento delle api.",
      author: "Maria Francesca Rossi",
      date: "2024-02-20",
      tags: ["Clima", "Educazione", "Comunicazione"],
      category: "Ambiente",
      readTime: "8 min"
    },
    {
      id: 5,
      title: "Api e arte: quando la creatività incontra la scienza",
      excerpt: "Progetti interdisciplinari che uniscono osservazione scientifica e espressione artistica per un apprendimento completo e coinvolgente.",
      author: "Giuseppe Bianchi",
      date: "2024-02-12",
      tags: ["Arte", "Interdisciplinarità", "Creatività"],
      category: "Didattica", 
      readTime: "4 min"
    },
    {
      id: 6,
      title: "L'importanza degli impollinatori per l'agricoltura italiana",
      excerpt: "Dati e prospettive sul ruolo economico ed ecologico delle api nell'agroalimentare nazionale, con focus sulle specificità regionali.",
      author: "Anna Verdi",
      date: "2024-02-05",
      tags: ["Agricoltura", "Economia", "Italia"],
      category: "Ambiente",
      readTime: "9 min"
    }
  ];

  const categories = ["Tutti", "Ambiente", "Educazione", "Didattica"];
  const [selectedCategory, setSelectedCategory] = React.useState("Tutti");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "Tutti" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Storie e Novità
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Racconti dal mondo dell'educazione ambientale, aggiornamenti scientifici 
              e riflessioni sul rapporto tra natura e apprendimento.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
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

            {/* Search */}
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Cerca articoli, tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nessun articolo trovato per i criteri selezionati.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="shadow-card border-0 overflow-hidden hover:shadow-lg transition-smooth group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-smooth">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-honey/10 text-honey-light border border-honey/20 rounded-lg text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Carica altri articoli
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Non perderti le nostre novità
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Iscriviti alla newsletter per ricevere aggiornamenti sui nuovi laboratori, 
              materiali didattici e storie dal mondo dell'educazione ambientale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 border border-slate/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-honey"
              />
              <Button variant="nature" size="lg">
                Iscriviti
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Storie;