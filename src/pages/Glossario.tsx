import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { pageSEO } from '@/utils/seo';

const Glossario = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const glossaryTerms = [
    {
      term: "Alveare",
      definition: "Struttura costruita o fornita alle api per ospitare una colonia. Può essere naturale (come il cavo di un albero) o artificiale (arnia).",
      category: "Apicoltura",
      relatedTerms: ["Arnia", "Colonia", "Sciame"]
    },
    {
      term: "Apicoltore",
      definition: "Persona che pratica l'apicoltura, occupandosi della gestione e cura delle colonie di api.",
      category: "Apicoltura",
      relatedTerms: ["Apicoltura", "Alveare"]
    },
    {
      term: "Ape Bottinatrice",
      definition: "Ape operaia adulta che esce dall'alveare per raccogliere nettare, polline, propoli e acqua.",
      category: "Biologia",
      relatedTerms: ["Operaia", "Nettare", "Polline"]
    },
    {
      term: "Ape Regina",
      definition: "Unica ape femmina fertile della colonia, responsabile della deposizione delle uova.",
      category: "Biologia",
      relatedTerms: ["Colonia", "Fuco", "Operaia"]
    },
    {
      term: "Arnia",
      definition: "Contenitore artificiale progettato per ospitare una colonia di api, con strutture mobili per facilitare la gestione.",
      category: "Apicoltura",
      relatedTerms: ["Alveare", "Telaino", "Melario"]
    },
    {
      term: "Biodiversità",
      definition: "Varietà di forme di vita presenti in un ecosistema, fondamentale per l'equilibrio ambientale.",
      category: "Ecologia",
      relatedTerms: ["Ecosistema", "Impollinazione", "Sostenibilità"]
    },
    {
      term: "Cera d'Api",
      definition: "Sostanza naturale prodotta dalle ghiandole ceripare delle api operaie, utilizzata per costruire i favi.",
      category: "Prodotti",
      relatedTerms: ["Favo", "Operaia", "Miele"]
    },
    {
      term: "Colonia",
      definition: "Comunità organizzata di api che vive insieme, composta da una regina, operaie e fuchi.",
      category: "Biologia",
      relatedTerms: ["Regina", "Operaia", "Fuco"]
    },
    {
      term: "Danza delle Api",
      definition: "Sistema di comunicazione delle api bottinatrici per indicare alla colonia la posizione di fonti di cibo.",
      category: "Comportamento",
      relatedTerms: ["Bottinatrice", "Comunicazione", "Nettare"]
    },
    {
      term: "Ecosistema",
      definition: "Sistema biologico costituito da organismi viventi e dall'ambiente fisico in cui interagiscono.",
      category: "Ecologia",
      relatedTerms: ["Biodiversità", "Impollinazione", "Catena alimentare"]
    },
    {
      term: "Favo",
      definition: "Struttura esagonale di cera costruita dalle api per contenere miele, polline e covata.",
      category: "Biologia",
      relatedTerms: ["Cera", "Esagono", "Miele"]
    },
    {
      term: "Fuco",
      definition: "Ape maschio della colonia, il cui ruolo principale è l'accoppiamento con nuove regine.",
      category: "Biologia",
      relatedTerms: ["Regina", "Operaia", "Colonia"]
    },
    {
      term: "Impollinazione",
      definition: "Trasferimento del polline dagli stami al pistillo dei fiori, processo essenziale per la riproduzione delle piante.",
      category: "Ecologia",
      relatedTerms: ["Polline", "Fiore", "Riproduzione"]
    },
    {
      term: "Melario",
      definition: "Parte superiore dell'arnia dove le api depositano il miele destinato al raccolto.",
      category: "Apicoltura",
      relatedTerms: ["Arnia", "Miele", "Telaino"]
    },
    {
      term: "Miele",
      definition: "Sostanza dolce prodotta dalle api a partire dal nettare dei fiori o dalle secrezioni di altri insetti.",
      category: "Prodotti",
      relatedTerms: ["Nettare", "Api", "Melario"]
    },
    {
      term: "Nettare",
      definition: "Liquido zuccherino prodotto dai fiori per attirare gli insetti impollinatori.",
      category: "Botanica",
      relatedTerms: ["Fiore", "Impollinazione", "Miele"]
    },
    {
      term: "Operaia",
      definition: "Ape femmina sterile che svolge tutti i lavori della colonia: pulizia, costruzione, raccolta, difesa.",
      category: "Biologia",
      relatedTerms: ["Colonia", "Regina", "Bottinatrice"]
    },
    {
      term: "Polline",
      definition: "Cellule riproduttive maschili delle piante, raccolte dalle api come fonte proteica.",
      category: "Botanica",
      relatedTerms: ["Impollinazione", "Fiore", "Proteine"]
    },
    {
      term: "Propoli",
      definition: "Sostanza resinosa raccolta dalle api dagli alberi, utilizzata per sigillare e disinfettare l'alveare.",
      category: "Prodotti",
      relatedTerms: ["Resina", "Alveare", "Antibatterico"]
    },
    {
      term: "Sciame",
      definition: "Gruppo di api che lascia l'alveare originario guidato da una regina per fondare una nuova colonia.",
      category: "Comportamento",
      relatedTerms: ["Regina", "Colonia", "Sciamatura"]
    },
    {
      term: "Sostenibilità",
      definition: "Principio di utilizzare le risorse naturali senza compromettere la capacità delle future generazioni di soddisfare i propri bisogni.",
      category: "Ecologia",
      relatedTerms: ["Ecosistema", "Biodiversità", "Ambiente"]
    },
    {
      term: "Telaino",
      definition: "Struttura di legno o plastica che contiene i fogli cerei sui quali le api costruiscono i favi.",
      category: "Apicoltura",
      relatedTerms: ["Arnia", "Favo", "Cera"]
    }
  ];

  const categories = ["Tutti", "Apicoltura", "Biologia", "Ecologia", "Prodotti", "Comportamento", "Botanica"];
  const [selectedCategory, setSelectedCategory] = useState("Tutti");

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tutti" || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const seoData = {
    ...pageSEO.glossario,
    canonical: "https://api-famiglia.lovable.app/glossario",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "name": "Glossario Api e Impollinazione",
      "description": "Dizionario completo dei termini scientifici relativi ad api, impollinazione e apicoltura",
      "inLanguage": "it-IT",
      "hasDefinedTerm": glossaryTerms.map(term => ({
        "@type": "DefinedTerm",
        "name": term.term,
        "definition": term.definition,
        "inDefinedTermSet": "https://api-famiglia.lovable.app/glossario",
        "termCode": term.term.toLowerCase().replace(/\s+/g, '-')
      }))
    }
  };

  return (
    <Layout>
      <SEOHead {...seoData} />
      
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Glossario Api e Impollinazione
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Dizionario completo dei termini scientifici e tecnici del mondo delle api, 
              dell'impollinazione e dell'apicoltura per studenti ed educatori.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Cerca termine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            {filteredTerms.length} termini trovati
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nessun termine trovato. Prova a modificare i filtri di ricerca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerms.map((term, index) => (
                <Card key={index} className="hover:shadow-lg transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-slate">
                        {term.term}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {term.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {term.definition}
                    </p>
                    
                    {term.relatedTerms.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate mb-2">
                          Termini correlati:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {term.relatedTerms.map((relatedTerm, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {relatedTerm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Educational Note */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate mb-4">
            Hai bisogno di altri termini?
          </h2>
          <p className="text-slate/80 mb-6">
            Il nostro glossario è in continua espansione. Se cerchi un termine specifico 
            che non trovi, contattaci e lo aggiungeremo per arricchire questa risorsa educativa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contatti" 
              className="inline-flex items-center justify-center px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors"
            >
              Suggerisci un termine
            </a>
            <a 
              href="/materiali-docenti" 
              className="inline-flex items-center justify-center px-6 py-3 border border-forest text-forest rounded-lg hover:bg-forest/5 transition-colors"
            >
              Risorse per docenti
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Glossario;