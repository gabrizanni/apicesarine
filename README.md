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
- 📄 **Materiali per Docenti** con risorse scaricabili

### Backend (Supabase)
- 🗄️ **Database** con tabelle per workshop, educatori, post e richieste
- 🔐 **Mini-CMS Admin** protetto da password per gestione contenuti
- 📧 **Sistema Email** automatico per conferme e notifiche
- 📄 **Generazione PDF** per riepiloghi prenotazioni
- 🛡️ **Protezioni Anti-Bot** con rate limiting e honeypot

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
- **Funzionalità**: CRUD per Workshop, Educatori, Post e visualizzazione Richieste

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
```

## Tecnologie

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL, Edge Functions)
- **Autenticazione**: Password-based per admin
- **Email**: Resend.com
- **Validazione**: Zod (client + server)
- **UI Components**: shadcn/ui
- **Routing**: React Router

## Sviluppo

```bash
# Installazione dipendenze
npm install

# Sviluppo locale
npm run dev

# Build per produzione
npm run build
```

## Deploy

L'applicazione è configurata per il deploy automatico su Lovable con:
- Build automatico del frontend
- Deploy automatico delle Edge Functions
- Configurazione automatica del database Supabase

---

**Nota**: Assicurati di configurare tutte le variabili d'ambiente nei secrets di Supabase prima di testare il sistema di prenotazione completo.

## Link Utili

- **Progetto Lovable**: https://lovable.dev/projects/a9eb9ace-86b1-46d8-95f1-6b09fadcd285
- **Supabase Dashboard**: Dashboard del progetto per gestione database e secrets
- **Resend.com**: Per configurazione email service