import { DemoFaq } from './types';

export const demoFaqs: DemoFaq[] = [
  // Generale
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
    question: 'Dove si svolgono i laboratori?',
    answer: 'I nostri laboratori sono molto flessibili! Possiamo venire direttamente nella tua scuola con tutta l\'attrezzatura necessaria, oppure puoi portare la classe nel nostro centro educativo. Per le scuole più distanti offriamo anche moduli online interattivi.',
    category: 'generale',
    display_order: 4,
    is_active: true
  },
  {
    question: 'Quali competenze sviluppano gli studenti?',
    answer: 'I nostri programmi sviluppano competenze trasversali importanti: metodo scientifico, pensiero critico, lavoro di gruppo, problem solving, consapevolezza ambientale. Ogni laboratorio è allineato con le Indicazioni Nazionali e può contribuire all\'educazione civica.',
    category: 'generale',
    display_order: 5,
    is_active: true
  },
  
  // Prenotazione
  {
    question: 'Come posso prenotare un laboratorio per la mia scuola?',
    answer: 'È molto semplice! Compila il modulo di richiesta nella sezione "Richiedi un laboratorio". Ti ricontatteremo entro 24 ore per discutere i dettagli, confermare la disponibilità e inviarti un preventivo personalizzato.',
    category: 'prenotazione',
    display_order: 10,
    is_active: true
  },
  {
    question: 'Con quanto anticipo devo prenotare?',
    answer: 'Consigliamo di prenotare con almeno 2-3 settimane di anticipo, specialmente per i mesi di alta richiesta (ottobre-novembre e marzo-maggio). Tuttavia, per urgenze possiamo organizzare laboratori anche con 3-4 giorni di preavviso, compatibilmente con la disponibilità.',
    category: 'prenotazione',
    display_order: 11,
    is_active: true
  },
  {
    question: 'Posso cancellare o spostare una prenotazione?',
    answer: 'Sì, comprendiamo che le scuole hanno imprevisti. Puoi cancellare o riprogrammare gratuitamente fino a 48 ore prima. Cancellazioni più tardive comportano una penale del 50% dell\'importo.',
    category: 'prenotazione',
    display_order: 12,
    is_active: true
  },
  {
    question: 'È possibile fare più incontri con la stessa classe?',
    answer: 'Assolutamente! Offriamo percorsi multi-incontro che permettono un approfondimento maggiore. Ad esempio, un ciclo di 3 incontri per seguire l\'evoluzione dell\'alveare durante l\'anno. Prevediamo anche sconti per percorsi articolati.',
    category: 'prenotazione',
    display_order: 13,
    is_active: true
  },
  
  // Logistica
  {
    question: 'Cosa serve preparare per il laboratorio a scuola?',
    answer: 'Se il laboratorio si svolge presso la tua scuola, serve solo uno spazio adeguato (aula, laboratorio o giardino). Tutto il materiale didattico, strumenti e supporti visivi sono forniti da noi. Ti invieremo una checklist dettagliata dopo la prenotazione.',
    category: 'logistica',
    display_order: 20,
    is_active: true
  },
  {
    question: 'Quanti studenti possono partecipare?',
    answer: 'Il numero ottimale varia per laboratorio: "Piccoli Impollinatori" fino a 25 bambini, "Api & Scienza" fino a 20 studenti, "Ecosistemi e Sostenibilità" fino a 25 ragazzi. Per gruppi più grandi possiamo organizzare turni o sessioni parallele.',
    category: 'logistica',
    display_order: 21,
    is_active: true
  },
  {
    question: 'Quanto dura un laboratorio?',
    answer: 'La durata standard varia da 90 a 150 minuti a seconda del programma e dell\'età. Siamo flessibili e possiamo adattare la durata alle vostre esigenze scolastiche, rispettando sempre l\'efficacia didattica dell\'esperienza.',
    category: 'logistica',
    display_order: 22,
    is_active: true
  },
  {
    question: 'I docenti devono essere presenti?',
    answer: 'Sì, per regolamento scolastico almeno un insegnante deve essere presente durante tutto il laboratorio. La loro presenza è anche preziosa per favorire l\'integrazione dell\'esperienza nel percorso didattico della classe.',
    category: 'logistica',
    display_order: 23,
    is_active: true
  },
  
  // Costi
  {
    question: 'Quanto costano i laboratori?',
    answer: 'I costi variano in base al programma scelto, al numero di studenti e alla modalità (presso scuola o centro). Indicativamente: €150-250 per laboratorio. Offriamo sempre preventivi gratuiti e personalizzati, con possibili sconti per più classi.',
    category: 'costi',
    display_order: 30,
    is_active: true
  },
  {
    question: 'Ci sono costi aggiuntivi da considerare?',
    answer: 'Il preventivo include tutto: educatore esperto, materiali didattici, strumentazione, assicurazione. L\'unico costo extra potrebbe essere il trasporto se scegliete di venire al nostro centro (ma spesso è coperto dal budget trasporti della scuola).',
    category: 'costi',
    display_order: 31,
    is_active: true
  },
  {
    question: 'Offrite sconti per più classi?',
    answer: 'Sì! Prevediamo sconti progressivi: 10% per 2-3 classi, 15% per 4-5 classi, 20% per 6+ classi nella stessa scuola. Chiedi il nostro listino completo nel preventivo personalizzato.',
    category: 'costi',
    display_order: 32,
    is_active: true
  },
  {
    question: 'Come funziona il pagamento?',
    answer: 'Accettiamo bonifico bancario o pagamento tramite sistema MEPA per le scuole pubbliche. Il pagamento è richiesto entro 30 giorni dal laboratorio. Emettiamo regolare fattura elettronica.',
    category: 'costi',
    display_order: 33,
    is_active: true
  },
  
  // Didattica
  {
    question: 'I laboratori sono collegati ai programmi ministeriali?',
    answer: 'Sì, tutti i nostri laboratori sono progettati in linea con le Indicazioni Nazionali. Contribuiscono a sviluppare competenze in scienze, educazione civica e cittadinanza. Possiamo fornirti materiale per l\'integrazione nel tuo piano didattico.',
    category: 'didattica',
    display_order: 40,
    is_active: true
  },
  {
    question: 'Fornite materiale didattico per approfondimenti?',
    answer: 'Assolutamente! Dopo il laboratorio riceverete una cartella digitale con: schede didattiche stampabili, video educativi, link a risorse online, bibliografia consigliata. Tutto materiale gratuito per continuare l\'esperienza in classe.',
    category: 'didattica',
    display_order: 41,
    is_active: true
  },
  {
    question: 'Posso personalizzare il laboratorio per la mia classe?',
    answer: 'Certamente! Ogni classe è unica. Durante la fase di prenotazione discuteremo insieme obiettivi specifici, temi da approfondire o progetti in corso, per creare un\'esperienza perfettamente integrata nel vostro percorso educativo.',
    category: 'didattica',
    display_order: 42,
    is_active: true
  },
  {
    question: 'Gli studenti con bisogni educativi speciali possono partecipare?',
    answer: 'Assolutamente sì! I nostri educatori hanno formazione inclusiva e adattano le attività per garantire la partecipazione di tutti. Comunicaci eventuali esigenze specifiche e progetteremo insieme le migliori strategie didattiche.',
    category: 'didattica',
    display_order: 43,
    is_active: true
  },
  
  // Materiali
  {
    question: 'Mettete a disposizione materiali didattici gratuiti?',
    answer: 'Sì! Nella sezione "Materiali per Docenti" del nostro sito trovi risorse gratuite scaricabili: schede didattiche, poster educativi, guide per insegnanti. Alcuni materiali premium richiedono un codice di accesso fornito dopo i laboratori.',
    category: 'materiali',
    display_order: 50,
    is_active: true
  },
  {
    question: 'Come posso accedere ai materiali premium?',
    answer: 'I materiali premium (kit completi, video esclusivi, guide dettagliate) sono riservati alle scuole che hanno svolto almeno un laboratorio con noi. Riceverai il codice di accesso via email dopo l\'incontro, valido per un anno.',
    category: 'materiali',
    display_order: 51,
    is_active: true
  },
  {
    question: 'Posso condividere i materiali con altri docenti?',
    answer: 'I materiali gratuiti possono essere liberamente condivisi. I materiali premium sono ad uso esclusivo della scuola che ha partecipato al laboratorio, ma puoi coinvolgere tutti i colleghi del tuo istituto nell\'utilizzo.',
    category: 'materiali',
    display_order: 52,
    is_active: true
  }
];
