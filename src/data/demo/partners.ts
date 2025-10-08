import { DemoPartner } from './types';

export const demoPartners: DemoPartner[] = [
  {
    name: 'Università di Bologna - Dipartimento Scienze Agrarie',
    description: 'Collaborazione per ricerca scientifica e formazione educatori',
    logo_url: '/placeholder.svg',
    website_url: 'https://www.unibo.it',
    display_order: 1,
    is_active: true
  },
  {
    name: 'Legambiente Emilia-Romagna',
    description: 'Partner per progetti di educazione ambientale nelle scuole',
    logo_url: '/placeholder.svg',
    website_url: 'https://www.legambiente.it',
    display_order: 2,
    is_active: true
  },
  {
    name: 'Associazione Apicoltori Italiani',
    description: 'Supporto tecnico e materiali didattici certificati',
    logo_url: '/placeholder.svg',
    website_url: 'https://www.apicoltori.it',
    display_order: 3,
    is_active: true
  }
];
