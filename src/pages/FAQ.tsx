import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Clock, Users, MapPin, CreditCard, Shield } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/custom-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/common/SEOHead';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'generale' | 'prenotazione' | 'logistica' | 'costi' | 'didattica' | 'materiali';
}

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tutti');

  const categories = [
    { id: 'tutti', label: 'Tutte le FAQ', icon: MessageCircle },
    { id: 'generale', label: 'Domande Generali', icon: MessageCircle },
    { id: 'prenotazione', label: 'Prenotazioni', icon: Clock },
    { id: 'logistica', label: 'Organizzazione', icon: MapPin },
    { id: 'didattica', label: 'Metodologie', icon: Users },
    { id: 'costi', label: 'Costi e Pagamenti', icon: CreditCard },
    { id: 'materiali', label: 'Materiali', icon: Shield },
  ];

  const faqData: FAQItem[] = [
    // Domande Generali
    {
      id: 'cosa-sono-laboratori',
      question: 'Cosa sono i laboratori didattici sulle api?',
      answer: 'I nostri laboratori sono esperienze educative interattive che avvicinano bambini e ragazzi al mondo delle api e dell\'impollinazione. Attraverso attività pratiche, osservazioni dirette e sperimentazioni, gli studenti scoprono l\'importanza degli impollinatori per l\'ecosistema e sviluppano una maggiore consapevolezza ambientale.',
      category: 'generale'
    },
    {
      id: 'eta-studenti',
      question: 'Per quale fascia d\'età sono adatti i laboratori?',
      answer: 'Offriamo programmi specifici per ogni età: "Piccoli Impollinatori" (3-6 anni), "Api & Scienza" (6-11 anni), "Ecosistemi e Sostenibilità" (11-14 anni). Ogni laboratorio è progettato con metodologie e contenuti adeguati allo sviluppo cognitivo dei partecipanti.',
      category: 'generale'
    },
    {
      id: 'sicurezza-api',
      question: 'I laboratori sono sicuri? Ci sono api vere?',
      answer: 'La sicurezza è la nostra priorità assoluta. Utilizziamo arnie didattiche sicure e api docili. Tutti i nostri educatori sono formati in sicurezza e primo soccorso. Per studenti con allergie documentate, adattiamo il programma utilizzando materiali alternativi mantenendo l\'efficacia educativa.',
      category: 'generale'
    },

    // Prenotazioni
    {
      id: 'come-prenotare',
      question: 'Come posso prenotare un laboratorio per la mia scuola?',
      answer: 'È molto semplice! Compila il modulo di richiesta nella sezione "Richiedi un laboratorio". Ti ricontatteremo entro 24 ore per discutere i dettagli, confermare la disponibilità e inviarti un preventivo personalizzato.',
      category: 'prenotazione'
    },
    {
      id: 'tempi-risposta',
      question: 'Quanto tempo ci vuole per ricevere una risposta?',
      answer: 'Ci impegniamo a rispondere a tutte le richieste entro 24 ore lavorative. Per richieste urgenti, puoi contattarci direttamente via telefono. Durante i periodi di alta richiesta (settembre-novembre e marzo-maggio), i tempi potrebbero essere leggermente più lunghi.',
      category: 'prenotazione'
    },
    {
      id: 'anticipo-prenotazione',
      question: 'Con quanto anticipo devo prenotare?',
      answer: 'Consigliamo di prenotare con almeno 3-4 settimane di anticipo, specialmente durante i periodi scolastici più intensi. Tuttavia, cerchiamo sempre di soddisfare anche richieste con tempi più stretti, compatibilmente con la disponibilità.',
      category: 'prenotazione'
    },
    {
      id: 'cancellazione',
      question: 'È possibile cancellare o spostare un laboratorio?',
      answer: 'Sì, comprendiamo che possano verificarsi imprevisti. Le cancellazioni o modifiche sono possibili fino a 48 ore prima dell\'appuntamento senza penali. Per variazioni dell\'ultimo minuto, valuteremo insieme la soluzione migliore.',
      category: 'prenotazione'
    },

    // Logistica e Organizzazione
    {
      id: 'dove-laboratori',
      question: 'Dove si svolgono i laboratori?',
      answer: 'Offriamo due modalità: presso la vostra scuola (opzione più comoda e richiesta) o presso i nostri centri didattici. Portiamo tutto il materiale necessario direttamente a scuola, serve solo un\'aula normale o uno spazio all\'aperto se il tempo lo permette.',
      category: 'logistica'
    },
    {
      id: 'durata-laboratori',
      question: 'Quanto durano i laboratori?',
      answer: 'La durata varia in base all\'età: 90 minuti per la scuola dell\'infanzia, 120 minuti per la primaria, 150 minuti per la secondaria. I tempi includono allestimento, attività e momenti di discussione finale. Possiamo adattare la durata alle vostre esigenze.',
      category: 'logistica'
    },
    {
      id: 'numero-studenti',
      question: 'Quanti studenti possono partecipare?',
      answer: 'Il numero ideale è 20-25 studenti per garantire un\'esperienza di qualità e la partecipazione attiva di tutti. Per gruppi più numerosi, possiamo organizzare più sessioni nella stessa giornata o utilizzare due educatori.',
      category: 'logistica'
    },
    {
      id: 'spazio-necessario',
      question: 'Che tipo di spazio serve per il laboratorio?',
      answer: 'Serve un\'aula normale con tavoli e sedie, possibilmente con accesso all\'acqua. Per alcune attività è ideale avere anche uno spazio esterno (giardino o cortile). Portiamo noi tutto il materiale didattico e gli strumenti necessari.',
      category: 'logistica'
    },

    // Didattica e Metodologie  
    {
      id: 'obiettivi-didattici',
      question: 'Quali sono gli obiettivi didattici dei laboratori?',
      answer: 'I nostri laboratori sviluppano competenze scientifiche, ambientali e di cittadinanza attiva. Gli studenti imparano il metodo scientifico, sviluppano il pensiero critico, scoprono le interconnessioni negli ecosistemi e maturano comportamenti sostenibili.',
      category: 'didattica'
    },
    {
      id: 'collegamento-curricolo',
      question: 'Come si collegano i laboratori al curricolo scolastico?',
      answer: 'I nostri programmi sono progettati in linea con le Indicazioni Nazionali e coprono obiettivi di scienze, geografia, educazione civica e STEM. Forniamo ai docenti una scheda dettagliata con competenze, obiettivi e collegamenti disciplinari.',
      category: 'didattica'
    },
    {
      id: 'inclusivita',
      question: 'I laboratori sono inclusivi per studenti con bisogni speciali?',
      answer: 'Assolutamente sì! Adattiamo sempre le attività per includere tutti gli studenti. Utilizziamo approcci multisensoriali, materiali tattili e metodologie differenziate. Parliamo sempre con i docenti per comprendere le specifiche esigenze della classe.',
      category: 'didattica'
    },

    // Costi e Pagamenti
    {
      id: 'costi-laboratori',
      question: 'Quanto costano i laboratori?',
      answer: 'I costi variano in base al programma scelto, al numero di studenti e alla modalità (presso scuola o centro). Indicativamente: €150-250 per laboratorio. Offriamo sempre preventivi gratuiti e personalizzati, con possibili sconti per più classi.',
      category: 'costi'
    },
    {
      id: 'cosa-include-prezzo',
      question: 'Cosa include il prezzo del laboratorio?',
      answer: 'Il prezzo include: educatore esperto, tutti i materiali didattici, strumentazione scientifica, materiali per esperimenti, schede attività per studenti, guida per i docenti e follow-up con materiali digitali. Nessun costo aggiuntivo.',
      category: 'costi'
    },
    {
      id: 'modalita-pagamento',
      question: 'Quali sono le modalità di pagamento?',
      answer: 'Accettiamo bonifico bancario (modalità preferita dalle scuole), emissione fattura elettronica per PA, pagamento alla consegna. Emettiamo sempre fattura con dettaglio delle attività svolte per la rendicontazione scolastica.',
      category: 'costi'
    },
    {
      id: 'sconti-disponibili',
      question: 'Sono previsti sconti o agevolazioni?',
      answer: 'Sì! Offriamo sconti per: più classi della stessa scuola (10%), laboratori multipli nell\'anno (15%), scuole in aree svantaggiate (valutazione caso per caso), progetti PON e finanziamenti europei (condizioni agevolate).',
      category: 'costi'
    },

    // Materiali e Risorse
    {
      id: 'materiali-forniti',
      question: 'Che materiali riceve la scuola?',
      answer: 'Ogni partecipante riceve una scheda attività personalizzata da portare a casa. I docenti ricevono una guida completa con approfondimenti, attività di follow-up e suggerimenti per proseguire il percorso in classe. Forniamo anche accesso a materiali digitali esclusivi.',
      category: 'materiali'
    },
    {
      id: 'accesso-materiali-premium',
      question: 'Come posso accedere ai materiali per docenti?',
      answer: 'Dopo ogni laboratorio, rilasciamo un codice di accesso personale per la sezione "Materiali Docenti" del sito. Troverai schede didattiche, poster educativi, guide metodologiche e proposte di attività da svolgere autonomamente.',
      category: 'materiali'
    },
    {
      id: 'supporto-post-laboratorio',
      question: 'Offrite supporto dopo il laboratorio?',
      answer: 'Certamente! Rimaniamo disponibili per consulenze, suggerimenti per progetti di classe, supporto nella realizzazione di orti didattici o "hotel per insetti". Molte scuole ci coinvolgono per eventi e giornate speciali.',
      category: 'materiali'
    }
  ];

  const filteredFAQ = selectedCategory === 'tutti' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'tutti') return faqData.length;
    return faqData.filter(faq => faq.category === categoryId).length;
  };

  return (
    <Layout>
      <SEOHead 
        title="FAQ - Domande Frequenti | Laboratori Didattici Api Cesarine"
        description="Trova risposte alle domande più comuni sui nostri laboratori didattici: prenotazioni, costi, organizzazione, metodologie e molto altro."
        keywords={["FAQ", "domande frequenti", "laboratori didattici", "api", "prenotazioni", "costi", "metodologie"]}
        canonical="/faq"
      />

      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Domande Frequenti
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Trova rapidamente le risposte che cerchi sui nostri laboratori didattici.
              Non trovi quello che cerchi? Contattaci direttamente!
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{category.label}</span>
                  <Badge variant="secondary" className="ml-2">
                    {getCategoryCount(category.id)}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-muted-foreground text-center">
              Mostrando <strong>{filteredFAQ.length}</strong> {filteredFAQ.length === 1 ? 'domanda' : 'domande'}
              {selectedCategory !== 'tutti' && (
                <span> nella categoria <strong>{categories.find(c => c.id === selectedCategory)?.label}</strong></span>
              )}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQ.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-border rounded-lg bg-card shadow-soft hover:shadow-card transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <div className="flex items-start space-x-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="ml-12">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nessuna FAQ trovata per questa categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Non hai trovato la risposta che cercavi?
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Siamo qui per aiutarti! Contattaci direttamente e ti risponderemo 
              nel minor tempo possibile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="nature" size="lg" asChild>
                <a href="/contatti">Contattaci ora</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/prenota">Richiedi un laboratorio</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;