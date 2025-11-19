import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/common/SEOHead';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { getFaqs } from '@/lib/data/faqs';

type FAQCategory = 'tutti' | 'generale' | 'prenotazione' | 'logistica' | 'costi' | 'didattica' | 'materiali';

const categoryLabels: Record<FAQCategory, string> = {
  tutti: 'Tutte le FAQ',
  generale: 'Informazioni Generali',
  prenotazione: 'Prenotazione',
  logistica: 'Logistica',
  costi: 'Costi e Pagamenti',
  didattica: 'Didattica',
  materiali: 'Materiali'
};

export default function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('tutti');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setLoading(true);
        const data = await getFaqs(selectedCategory);
        setFaqs(data);
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError('Impossibile caricare le FAQ. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, [selectedCategory]);

  const filteredFaqs = faqs.filter(faq => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
      <SEOHead 
        title="FAQ - Domande Frequenti sui Laboratori Didattici"
        description="Trova risposte a tutte le tue domande sui nostri laboratori didattici sulle api: prenotazioni, costi, logistica, contenuti didattici e molto altro."
        keywords="FAQ laboratori api, domande frequenti, prenotazione laboratori, costi workshop didattici"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="mb-4">Centro Assistenza</Badge>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Domande Frequenti
              </h1>
              <p className="text-xl text-muted-foreground">
                Trova risposte alle domande più comuni sui nostri laboratori didattici
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cerca nelle FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {(Object.keys(categoryLabels) as FAQCategory[]).map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/90 transition-colors px-4 py-2"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {categoryLabels[category]}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Caricamento FAQ...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-destructive">{error}</p>
                </div>
              ) : filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nessuna FAQ trovata. Prova a modificare la ricerca o la categoria.
                  </p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={`item-${index}`}
                      className="border rounded-lg px-6 bg-card hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <div className="flex items-start gap-4 pr-4">
                          <Badge variant="secondary" className="mt-1">
                            {categoryLabels[faq.category as FAQCategory] || 'Generale'}
                          </Badge>
                          <span className="font-medium text-lg">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6 pl-20">
                        <p className="whitespace-pre-line leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Non hai trovato la risposta?</h2>
              <p className="text-lg text-muted-foreground">
                Il nostro team è sempre disponibile per rispondere alle tue domande specifiche.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contatti" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Contattaci
                </a>
                <a 
                  href="/prenota" 
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Richiedi un preventivo
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}