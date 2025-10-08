import { DemoFaq } from './types';

export const demoFaqs: DemoFaq[] = [
  {
    question: 'Cosa sono i laboratori didattici sulle api?',
    answer: 'I nostri laboratori sono esperienze educative interattive che avvicinano bambini e ragazzi al mondo delle api e dell\'impollinazione. Attraverso attività pratiche, osservazioni dirette e sperimentazioni, gli studenti scoprono l\'importanza degli impollinatori per l\'ecosistema e sviluppano una maggiore consapevolezza ambientale.',
    category: 'generale',
    display_order: 1,
    is_active: true
  },
  {
    question: 'Per quale fascia d\'età sono adatti i laboratori?',
    answer: 'Offriamo programmi specifici per ogni età: "Piccoli Impollinatori" (3-6 anni), "Api & Scienza" (6-11 anni), "Ecosistemi e Sostenibilità" (11-14 anni). Ogni laboratorio è progettato con metodologie e contenuti adeguati allo sviluppo cognitivo dei partecipanti.',
    category: 'generale',
    display_order: 2,
    is_active: true
  },
  {
    question: 'I laboratori sono sicuri? Ci sono api vere?',
    answer: 'La sicurezza è la nostra priorità assoluta. Utilizziamo arnie didattiche sicure e api docili. Tutti i nostri educatori sono formati in sicurezza e primo soccorso. Per studenti con allergie documentate, adattiamo il programma utilizzando materiali alternativi mantenendo l\'efficacia educativa.',
    category: 'generale',
    display_order: 3,
    is_active: true
  },
  {
    question: 'Come posso prenotare un laboratorio per la mia scuola?',
    answer: 'È molto semplice! Compila il modulo di richiesta nella sezione "Richiedi un laboratorio". Ti ricontatteremo entro 24 ore per discutere i dettagli, confermare la disponibilità e inviarti un preventivo personalizzato.',
    category: 'prenotazione',
    display_order: 4,
    is_active: true
  },
  {
    question: 'Quanto costano i laboratori?',
    answer: 'I costi variano in base al programma scelto, al numero di studenti e alla modalità (presso scuola o centro). Indicativamente: €150-250 per laboratorio. Offriamo sempre preventivi gratuiti e personalizzati, con possibili sconti per più classi.',
    category: 'costi',
    display_order: 5,
    is_active: true
  }
];
