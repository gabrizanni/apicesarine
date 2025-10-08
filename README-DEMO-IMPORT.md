# Demo Data Import System

## Overview
Il sistema unifica i dati demo in file tipizzati sotto `/src/data/demo/` e permette l'import idempotente nel DB senza sovrascrivere contenuti reali.

## Struttura

- **Demo Data**: `/src/data/demo/*.ts` - Sorgenti tipizzate per educators, workshops, posts, FAQs, partners, gallery, resources
- **Data Layer**: `/src/lib/data/*.ts` - Funzioni per leggere dal DB con fallback opzionale ai dati demo
- **Importer**: Edge function `/supabase/functions/import-demo-data/` protetta da `ADMIN_PASS`

## Come importare i dati demo

### 1. Da codice (consigliato)

```typescript
import { demoEducators, demoWorkshops, demoFaqs, demoPosts, demoGalleryItems, demoPartners, demoResources } from '@/data/demo';

const response = await fetch('https://zjjabvkvzahfrbrhytft.supabase.co/functions/v1/import-demo-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Admin-Password': 'YOUR_ADMIN_PASSWORD'
  },
  body: JSON.stringify({
    demoData: {
      educators: demoEducators,
      workshops: demoWorkshops,
      posts: demoPosts,
      faqs: demoFaqs,
      partners: demoPartners,
      galleryItems: demoGalleryItems,
      resources: demoResources
    }
  })
});

const result = await response.json();
console.log('Import results:', result.results);
```

### 2. Risposta esempio

```json
{
  "success": true,
  "results": [
    { "type": "educators", "created": 3, "updated": 0, "errors": [] },
    { "type": "workshops", "created": 4, "updated": 0, "errors": [] },
    { "type": "faqs", "created": 5, "updated": 0, "errors": [] }
  ]
}
```

## Logica Import

- **Match**: Per slug (educators, workshops, posts) o unique field (question per FAQs, name per partners, title per gallery/resources)
- **Se non esiste**: Crea con `is_demo=true`, `demo_source='seed/v1'`
- **Se esiste ed è demo**: Aggiorna solo campi non critici
- **Se esiste ma NON è demo**: Ignora (preserva dati reali)

## Fallback pubblico

Imposta `ALLOW_DEMO_PUBLIC=true` nel `.env` per mostrare dati demo quando il DB è vuoto (solo per sviluppo).

## Note di sicurezza

- Import protetto da header `X-Admin-Password` verificato con `ADMIN_PASS` secret
- Non esporre mai `ADMIN_PASS` nel frontend
- I dati demo hanno `is_demo=true` per distinguerli dai reali
