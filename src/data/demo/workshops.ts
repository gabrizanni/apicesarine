import { DemoWorkshop } from './types';

export const demoWorkshops: DemoWorkshop[] = [
  {
    slug: 'piccoli-impollinatori',
    title: 'Piccoli Impollinatori',
    description: 'Un viaggio alla scoperta del mondo delle api pensato per i più piccoli. Attraverso giochi, storie e attività sensoriali, i bambini imparano l\'importanza degli impollinatori in modo divertente e coinvolgente. Include: storytelling animato, giochi di ruolo, creazione di api con materiali naturali.',
    duration_minutes: 90,
    max_participants: 25,
    price: 150,
    cover_image_url: '/placeholder.svg',
    cover_image_alt: 'Bambini dell\'infanzia durante il laboratorio Piccoli Impollinatori',
    is_active: true
  },
  {
    slug: 'api-e-scienza',
    title: 'Api & Scienza',
    description: 'Laboratorio STEM che combina osservazione scientifica, esperimenti e scoperta della biologia delle api. I bambini utilizzano il metodo scientifico per esplorare: anatomia delle api, vita nell\'alveare, processo di impollinazione, produzione del miele. Include microscopio didattico e kit sperimentale.',
    duration_minutes: 120,
    max_participants: 20,
    price: 200,
    cover_image_url: '/placeholder.svg',
    cover_image_alt: 'Studenti della primaria durante esperimenti scientifici sulle api',
    is_active: true
  },
  {
    slug: 'ecosistemi-sostenibilita',
    title: 'Ecosistemi e Sostenibilità',
    description: 'Programma avanzato per scuole secondarie che esplora le interconnessioni tra api, biodiversità e sostenibilità ambientale. Tematiche: servizi ecosistemici, crisi degli impollinatori, agricoltura sostenibile, citizen science. Include discussioni guidate, analisi di dati reali e progettazione di azioni concrete.',
    duration_minutes: 150,
    max_participants: 25,
    price: 250,
    cover_image_url: '/placeholder.svg',
    cover_image_alt: 'Ragazzi delle secondarie in discussione su temi ambientali',
    is_active: true
  },
  {
    slug: 'hotel-per-insetti',
    title: 'Costruiamo un Hotel per Insetti',
    description: 'Workshop pratico-creativo per progettare e costruire rifugi per impollinatori selvatici. I partecipanti imparano le esigenze abitative di diverse specie e realizzano bug hotel da installare nel giardino scolastico. Tutti i materiali forniti.',
    duration_minutes: 120,
    max_participants: 20,
    price: 180,
    is_active: true
  }
];
