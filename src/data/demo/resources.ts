import { DemoResource } from './types';

export const demoResources: DemoResource[] = [
  {
    title: 'Guida completa per docenti - Le api e l\'impollinazione',
    description: 'Manuale didattico con attività, esperimenti e schede operative per laboratori in classe',
    file_type: 'pdf',
    file_url: '/demo/guida-docenti-api.pdf',
    file_size: '5.2 MB',
    target_age_group: '6-11 anni',
    tags: ['guida docenti', 'didattica', 'impollinazione'],
    is_premium: false
  },
  {
    title: 'Poster educativo - Anatomia dell\'ape',
    description: 'Poster A2 stampabile con illustrazioni dettagliate dell\'anatomia delle api mellifere',
    file_type: 'pdf',
    file_url: '/demo/poster-anatomia-ape.pdf',
    file_size: '8.1 MB',
    target_age_group: '6-14 anni',
    tags: ['poster', 'anatomia', 'scienze'],
    is_premium: true
  },
  {
    title: 'Schede operative - Ciclo vitale delle api',
    description: 'Set di 10 schede con attività didattiche sul ciclo di vita delle api',
    file_type: 'pdf',
    file_url: '/demo/schede-ciclo-vitale.pdf',
    file_size: '2.3 MB',
    target_age_group: '3-6 anni',
    tags: ['schede operative', 'ciclo vitale', 'infanzia'],
    is_premium: false
  },
  {
    title: 'Guida costruzione bug hotel',
    description: 'Istruzioni dettagliate per costruire rifugi per insetti impollinatori',
    file_type: 'pdf',
    file_url: '/demo/guida-bug-hotel.pdf',
    file_size: '3.7 MB',
    target_age_group: '6-14 anni',
    tags: ['tutorial', 'biodiversità', 'sostenibilità'],
    is_premium: true
  }
];
