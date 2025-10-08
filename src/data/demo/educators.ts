import { DemoEducator } from './types';

export const demoEducators: DemoEducator[] = [
  {
    slug: 'laura-rossi',
    name: 'Laura Rossi',
    bio: 'Biologa e apicoltrice urbana con 10 anni di esperienza nella didattica ambientale. Specializzata in laboratori per la scuola dell\'infanzia e primaria.',
    specialization: 'Didattica ambientale per scuole dell\'infanzia e primarie',
    avatar_url: '/placeholder.svg',
    cover_image_url: '/placeholder.svg',
    cover_image_alt: 'Laura Rossi in aula durante un laboratorio',
    email: 'laura.rossi@demo.it',
    phone: '+39 333 1234567',
    available_days: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì'],
    available_regions: ['Emilia-Romagna', 'Toscana', 'Marche'],
    availability_notes: 'Disponibile anche per progetti PON e formazione docenti',
    is_active: true
  },
  {
    slug: 'marco-bianchi',
    name: 'Marco Bianchi',
    bio: 'Apicoltore professionista e divulgatore scientifico. Laurea in Scienze Naturali e master in Educazione Ambientale. Oltre 200 laboratori svolti in scuole secondarie.',
    specialization: 'Laboratori STEM e biodiversità per scuole secondarie',
    avatar_url: '/placeholder.svg',
    cover_image_url: '/placeholder.svg',
    cover_image_alt: 'Marco Bianchi con arnia didattica',
    email: 'marco.bianchi@demo.it',
    phone: '+39 334 7654321',
    available_days: ['Martedì', 'Mercoledì', 'Giovedì', 'Venerdì'],
    available_regions: ['Emilia-Romagna', 'Lombardia', 'Veneto'],
    availability_notes: 'Esperto in progetti di citizen science e orti didattici',
    is_active: true
  },
  {
    slug: 'sofia-ferrari',
    name: 'Sofia Ferrari',
    bio: 'Educatrice ambientale certificata con background in pedagogia Montessori. Crea esperienze educative multisensoriali per bambini di tutte le età.',
    specialization: 'Pedagogia attiva e apprendimento esperienziale',
    avatar_url: '/placeholder.svg',
    available_days: ['Lunedì', 'Mercoledì', 'Venerdì'],
    available_regions: ['Emilia-Romagna', 'Toscana'],
    is_active: true
  }
];
