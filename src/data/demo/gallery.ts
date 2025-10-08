import { DemoGalleryItem } from './types';

export const demoGalleryItems: DemoGalleryItem[] = [
  {
    title: 'Laboratorio alla Scuola Primaria di Bologna',
    description: 'I bambini osservano con curiosità i materiali didattici sulle api durante il workshop "Api & Scienza"',
    image_url: '/placeholder.svg',
    image_alt: 'Bambini della scuola primaria osservano arnia didattica',
    category: 'Laboratori',
    display_order: 1,
    is_active: true
  },
  {
    title: 'Api al lavoro in natura',
    description: 'Immagini ravvicinate per mostrare la bellezza e l\'importanza del lavoro delle api impollinatrici',
    image_url: '/placeholder.svg',
    image_alt: 'Ape su fiore mentre raccoglie polline',
    category: 'Natura',
    display_order: 2,
    is_active: true
  },
  {
    title: 'Costruzione hotel per insetti',
    description: 'Studenti durante il workshop pratico per creare rifugi per impollinatori selvatici',
    image_url: '/placeholder.svg',
    image_alt: 'Ragazzi che costruiscono un bug hotel con materiali naturali',
    category: 'Tutorial',
    display_order: 3,
    is_active: true
  },
  {
    title: 'Presentazione alle Scuole dell\'Infanzia',
    description: 'Momento di storytelling con i più piccoli durante "Piccoli Impollinatori"',
    image_url: '/placeholder.svg',
    image_alt: 'Educatrice racconta storia delle api a bambini seduti in cerchio',
    category: 'Laboratori',
    display_order: 4,
    is_active: true
  }
];
