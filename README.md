# Laboratori Didattici

Un'applicazione web per la gestione di laboratori didattici scolastici con sistema di prenotazione e mini-CMS amministrativo.

## Funzionalità

### Frontend
- 🏠 **Homepage** con sezioni hero, come funziona, USP e anteprima laboratori
- 📚 **Pagina Laboratori** con lista dei programmi disponibili
- 📋 **Sistema di Prenotazione** con form multi-step validato
- 👥 **Pagina Educatori** con profili del team
- 📖 **Sezione Storie** con testimonianze e case study
- 🖼️ **Galleria** fotografica dei laboratori
- 📞 **Contatti** con informazioni e form
- 📄 **Materiali per Docenti** con risorse scaricabili protette da passcode
- 📖 **Glossario** con termini tecnici su api e impollinazione

### Backend (Supabase)
- 🗄️ **Database** con tabelle per workshop, educatori, post, richieste e materiali
- 🔐 **Mini-CMS Admin** protetto da password per gestione contenuti
- 📧 **Sistema Email** automatico per conferme e notifiche
- 📄 **Generazione PDF** per riepiloghi prenotazioni
- 🛡️ **Protezioni Anti-Bot** con rate limiting e honeypot
- 🔒 **Sistema passcode** per materiali premium
- 📊 **Tracciamento download** per materiali didattici

### SEO & Accessibilità
- 🔍 **Schema.org** strutturato per organizzazione educativa e corsi
- ♿ **WCAG 2.1 AA** compliant con focus management e ARIA attributes
- 🎯 **Meta tag ottimizzati** per ogni pagina
- 🔄 **Redirect 301** per slug cambiati
- 📱 **Responsive design** ottimizzato per tutti i dispositivi

## Checklist Accessibilità ✅

### ✅ Navigazione e Focus
- [x] Skip links per saltare al contenuto principale
- [x] Ordine di tabulazione logico e visibile
- [x] Focus trap nei modali e componenti interattivi
- [x] Indicatori visivi di focus chiari e contrastati
- [x] Supporto completo per navigazione da tastiera

### ✅ ARIA e Semantica
- [x] Elementi semantici HTML5 (header, nav, main, footer, section, article)
- [x] Attributi ARIA appropriati (aria-label, aria-expanded, aria-current)
- [x] Ruoli ARIA per componenti interattivi (dialog, navigation, banner)
- [x] Live regions per notifiche dinamiche (toast)
- [x] Associazioni label-input corrette

### ✅ Contrasto e Colori
- [x] Rapporto di contrasto WCAG AA (4.5:1) per testo normale
- [x] Rapporto di contrasto WCAG AA (3:1) per elementi UI
- [x] Design system con tokens semantici per consistenza
- [x] Supporto per modalità ad alto contrasto
- [x] Colori non come unico mezzo di comunicazione

### ✅ Contenuto e Struttura
- [x] Struttura heading gerarchica (H1, H2, H3...)
- [x] Alt text descrittivi per tutte le immagini
- [x] Link descrittivi (evitati "clicca qui")
- [x] Contenuto comprensibile e ben strutturato
- [x] Linguaggio chiaro e appropriato per il target

### ✅ Interazione e Feedback
- [x] Messaggi di errore chiari e associati ai campi
- [x] Feedback per azioni completate (toast notifications)
- [x] Stati di caricamento accessibili
- [x] Timeout sufficienti per completare azioni
- [x] Possibilità di annullare/correggere azioni

### ✅ Responsive e Device
- [x] Design responsive per tutti i dispositivi
- [x] Touch target di almeno 44px per dispositivi mobili
- [x] Zoom fino al 200% senza perdita di funzionalità
- [x] Orientamento landscape e portrait supportati
- [x] Compatibilità con screen reader

### ✅ Performance Accessibilità
- [x] Prefers-reduced-motion per utenti sensibili alle animazioni
- [x] Preload di contenuti critici
- [x] Lazy loading per immagini non critiche
- [x] Gestione errori graceful
- [x] Fallback per funzionalità JavaScript

### ✅ Testing
- [x] Test automatici con strumenti di accessibilità
- [x] Validazione HTML
- [x] Test con screen reader (voice-over, NVDA)
- [x] Test di navigazione solo da tastiera
- [x] Test su dispositivi mobili

### ✅ Conformità Standards
- [x] WCAG 2.1 Level AA
- [x] Section 508 compliance
- [x] HTML5 semantic markup
- [x] WAI-ARIA 1.1 guidelines
- [x] Progressive enhancement

## Configurazione

### Variabili d'Ambiente Richieste

Le seguenti variabili devono essere configurate nei **Supabase Secrets**:

```bash
# Admin Configuration
ADMIN_EMAIL="admin@tuodominio.it"          # Email per ricevere notifiche prenotazioni
ADMIN_PASS="password_sicura_admin"         # Password per accesso admin /admin

# Email Configuration (Resend.com)
RESEND_API_KEY="re_xxxxxxxxxx"             # API Key da Resend.com
```

### Setup Email (Resend)

1. **Registrati su Resend**: Vai su [resend.com](https://resend.com) e crea un account
2. **Verifica Dominio**: Verifica il tuo dominio su [resend.com/domains](https://resend.com/domains)
3. **Crea API Key**: Genera una API key su [resend.com/api-keys](https://resend.com/api-keys)
4. **Configura Secret**: Aggiungi la `RESEND_API_KEY` nei secrets di Supabase

### Accesso Admin

- **URL**: `/admin`
- **Password**: Quella configurata nella variabile `ADMIN_PASS`
- **Funzionalità**: CRUD per Workshop, Educatori, Post, Materiali e visualizzazione Richieste

## Test del Sistema di Prenotazione

### Test Funzionalità Base
1. Vai su `/prenota`
2. Compila tutti i campi obbligatori
3. Accetta i consensi privacy
4. Invia la richiesta
5. Verifica reindirizzamento alla pagina di successo

### Test Email
Con `RESEND_API_KEY` configurata:
- ✅ Admin riceve notifica con dettagli completi
- ✅ Richiedente riceve conferma con riepilogo
- ✅ Email HTML responsive e professionale

### Test Protezioni Anti-Bot
- ✅ **Rate Limiting**: Max 3 richieste ogni 15 minuti per IP
- ✅ **Honeypot**: Campo nascosto per bloccare bot
- ✅ **Timestamp**: Verifica che il form non sia inviato troppo velocemente
- ✅ **Validazione Server**: Zod valida tutti i campi lato server

### Test Materiali Protetti
- ✅ **Passcode Protection**: Accesso limitato ai materiali premium
- ✅ **Download Tracking**: Conteggio download per statistiche
- ✅ **Tag Search**: Ricerca materiali per categorie
- ✅ **Admin Management**: Gestione materiali e passcode da admin

### Test PDF
- ✅ Generazione automatica del riepilogo
- ✅ Download disponibile nella pagina di successo
- ✅ Formato HTML (placeholder per PDF reale)

## Struttura Database

```sql
-- Workshops (Laboratori)
workshops: id, title, description, duration_minutes, max_participants, price, is_active

-- Educators (Educatori)  
educators: id, name, bio, specialization, email, phone, avatar_url, is_active

-- Posts (Articoli/Storie)
posts: id, title, content, excerpt, featured_image_url, status, published_at

-- Booking Requests (Richieste Prenotazione)
booking_requests: id, organization, requester_name, requester_email, requester_phone, 
                 participants_count, preferred_date, message, status, notes

-- Materials (Materiali Didattici)
materials: id, title, description, file_url, file_type, download_count, 
          tags, is_premium, created_at

-- Access Codes (Codici Accesso)
access_codes: id, code, description, is_active, expires_at, created_at
```

## Tecnologie

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL, Edge Functions)
- **Autenticazione**: Password-based per admin
- **Email**: Resend.com
- **Validazione**: Zod (client + server)
- **UI Components**: shadcn/ui
- **Routing**: React Router
- **SEO**: Schema.org, Meta tags ottimizzati
- **Accessibilità**: WCAG 2.1 AA compliant

## Sviluppo

```bash
# Installazione dipendenze
npm install

# Sviluppo locale
npm run dev

# Build per produzione
npm run build

# Test accessibilità
npm run test:a11y
```

## Deploy in Produzione

### 🚀 Deploy Rapido con Lovable (Raccomandato)
Il modo più semplice per deployare l'applicazione:

1. **Deploy Automatico**: Lovable gestisce automaticamente build, hosting e database
2. **Configurazione Secrets**: Aggiungi le chiavi API nei Supabase Secrets
3. **Popolazione Database**: Esegui lo script di seed dal SQL Editor
4. **Verifica Health**: Controlla `/api/health` per confermare il funzionamento

### 📊 Endpoints di Sistema

- **Health Check**: `GET /api/health` - Stato sistema e monitoraggio
- **Booking**: `POST /api/bookings` - Rate limited a 5 richieste/15min per IP
- **Materials**: Download materiali con tracking automatico

### 🛡️ Sicurezza e Rate Limiting

- **Rate Limiting**: 5 richieste ogni 15 minuti per IP sui form di booking
- **Anti-Bot Protection**: Honeypot, timestamp validation, IP tracking
- **Input Validation**: Schema Zod completo client e server-side
- **RLS Policies**: Protezione dati con Row Level Security

### 📋 Script di Popolazione Produzione

Esegui `scripts/seed-production.sql` nel SQL Editor di Supabase per popolare:
- ✅ 4 workshop didattici realistici
- ✅ 3 educatori esperti con specializzazioni
- ✅ 3 storie di successo dettagliate  
- ✅ 6 materiali didattici (gratuiti e premium)
- ✅ 5 codici di accesso per materiali premium
- ✅ Dati di esempio per testing

### 🔧 Deploy Self-Hosted

Per deploy personalizzato consulta la **[Guida Deploy Completa](scripts/deploy-guide.md)** che include:
- Setup Supabase da zero
- Configurazione dominio personalizzato
- Monitoraggio e alerting
- Backup e disaster recovery
- Troubleshooting avanzato

## Health Check e Monitoraggio

```bash
# Verifica stato sistema
curl https://[project-id].supabase.co/functions/v1/health

# Risposta esempio:
{
  "status": "healthy",
  "timestamp": "2024-09-24T12:00:00.000Z", 
  "checks": {
    "database": { "status": "up", "responseTime": 45 },
    "email": { "status": "configured", "service": "resend" },
    "storage": { "status": "up" }
  },
  "uptime": 3600
}
```

---

**Nota**: Assicurati di configurare tutte le variabili d'ambiente nei secrets di Supabase prima di testare il sistema di prenotazione completo.

## Link Utili

- **Progetto Lovable**: https://lovable.dev/projects/a9eb9ace-86b1-46d8-95f1-6b09fadcd285
- **Supabase Dashboard**: Dashboard del progetto per gestione database e secrets
- **Resend.com**: Per configurazione email service
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Color Contrast Checker**: https://webaim.org/resources/contrastchecker/