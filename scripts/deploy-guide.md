# Guida al Deploy in Produzione - Laboratori Didattici

## 📋 Prerequisiti

Prima di iniziare il deploy in produzione, assicurati di avere:

- [ ] Account Supabase (gratuito o pro)
- [ ] Account Resend.com per l'invio email
- [ ] Dominio personalizzato (opzionale)
- [ ] Accesso al progetto Lovable

## 🚀 Deploy su Lovable (Raccomandato)

### 1. Deploy Automatico
Lovable gestisce automaticamente:
- Build del frontend React
- Deploy delle Edge Functions
- Configurazione del database Supabase
- Setup dei domini e SSL

### 2. Configurazione Secrets
Nel dashboard Supabase, configura i seguenti secrets:

```bash
# Email Configuration
RESEND_API_KEY=re_xxxxxxxxxx
ADMIN_EMAIL=tuoemail@dominio.it

# These are automatically configured by Lovable:
SUPABASE_URL=https://[project-id].supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-key]
```

### 3. Popolazione Database
1. Vai al SQL Editor di Supabase
2. Carica ed esegui il file `scripts/seed-production.sql`
3. Verifica che i dati siano stati inseriti correttamente

## 🔧 Deploy Alternativo (Self-Hosted)

### 1. Setup Supabase

#### Nuovo Progetto
```bash
# Crea nuovo progetto su https://supabase.com/dashboard
# Annota Project URL e API Keys
```

#### Migrazione Database
```sql
-- Esegui le migrazioni in ordine dal SQL Editor:
-- 1. Struttura base (già presente se clonato da Lovable)
-- 2. Script di seed: scripts/seed-production.sql
```

### 2. Configurazione Edge Functions

#### Deploy Functions
```bash
# Se usi Supabase CLI locale:
supabase functions deploy submit-booking
supabase functions deploy health

# Setup secrets
supabase secrets set RESEND_API_KEY=your_key
supabase secrets set ADMIN_EMAIL=your_email
```

### 3. Frontend Deploy (Vercel/Netlify)

#### Preparazione
```bash
# Clone del progetto
git clone [your-repo]
cd laboratori-didattici

# Install dependencies
npm install

# Build
npm run build
```

#### Variabili Ambiente Frontend
```bash
# .env.production
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

## 📊 Health Check e Monitoring

### Endpoint di Health Check
```bash
# Verifica che tutto funzioni
curl https://[project-id].supabase.co/functions/v1/health

# Risposta attesa:
{
  "status": "healthy",
  "timestamp": "2024-09-24T12:00:00.000Z",
  "checks": {
    "database": { "status": "up", "responseTime": 45 },
    "email": { "status": "configured", "service": "resend" },
    "storage": { "status": "up" }
  }
}
```

### Rate Limiting
Il sistema implementa automaticamente:
- **5 richieste/15 minuti** per IP sui form di prenotazione
- Protezione anti-bot con honeypot e timestamp
- Rate limiting persistente nel database

## 🔒 Sicurezza in Produzione

### Row Level Security (RLS)
Tutte le tabelle hanno RLS abilitato:
- `booking_requests`: Solo admin possono leggere/modificare
- `materials`: Accesso pubblico in lettura, admin per scrittura
- `educators`: Dati pubblici limitati, admin per gestione
- `posts`: Solo post pubblicati visibili pubblicamente

### Validazione Input
- Schema Zod su tutti i form
- Sanitizzazione input lato server
- Protezioni XSS e injection

### Email Security
- Template HTML sanitizzati
- Rate limiting su invio email
- Validazione email server-side

## 📈 Performance e Ottimizzazioni

### Database
- Indici ottimizzati su campi di ricerca
- Connection pooling automatico di Supabase
- Cache intelligente per dati statici

### Frontend
- Bundle splitting automatico (Vite)
- Lazy loading componenti
- Immagini ottimizzate con lazy loading

### CDN e Caching
- Assets statici serviti tramite CDN
- Headers di cache appropriati
- Compressione gzip/brotli

## 📧 Configurazione Email (Resend)

### Setup Resend.com
1. Registrati su [resend.com](https://resend.com)
2. Verifica il tuo dominio
3. Crea API Key
4. Aggiungi nei Supabase Secrets

### Template Email
Il sistema include template responsive per:
- Conferme booking per utenti
- Notifiche admin per nuove richieste
- Email di benvenuto e follow-up

## 🛠 Troubleshooting

### Problemi Comuni

#### Edge Functions non funzionano
```bash
# Verifica logs
supabase functions logs submit-booking
supabase functions logs health

# Controlla secrets
supabase secrets list
```

#### Database Connection Issues
```bash
# Test connessione
curl -X POST https://[project-id].supabase.co/rest/v1/rpc/get_public_educator_profiles \
  -H "apikey: [anon-key]" \
  -H "Content-Type: application/json"
```

#### Email non inviate
- Verifica API key Resend
- Controlla dominio verificato
- Verifica ADMIN_EMAIL nei secrets

### Debug Health Check
```bash
# Test completo sistema
curl https://[project-id].supabase.co/functions/v1/health | jq

# Dovresti vedere tutti i check "up" o "configured"
```

## 📊 Monitoring e Analytics

### Metriche Importanti
- Response time health check
- Tasso di successo booking
- Download count materiali
- Errori 4xx/5xx

### Log Monitoring
- Edge Functions logs in Supabase Dashboard
- Database performance metrics
- Storage usage

### Alerts Setup
Configura alert per:
- Health check failures
- Alta latenza database
- Errori ricorrenti
- Rate limit violations

## 🔄 Backup e Disaster Recovery

### Database Backup
Supabase Pro include backup automatici:
- Point-in-time recovery
- Daily automated backups
- Manual snapshots disponibili

### Estratto Dati
```sql
-- Backup dati critici
SELECT * FROM booking_requests WHERE created_at > NOW() - INTERVAL '30 days';
SELECT * FROM materials WHERE download_count > 0;
```

## 📝 Maintenance Tasks

### Settimanali
- [ ] Verifica health check
- [ ] Review booking requests
- [ ] Check error logs

### Mensili  
- [ ] Analisi performance
- [ ] Update materiali didattici
- [ ] Review security logs
- [ ] Database cleanup (vecchi rate limits)

### Trimestrali
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization
- [ ] Backup verification

---

## 🆘 Supporto

Per assistenza tecnica:
- **Lovable Support**: Tramite dashboard del progetto
- **Supabase Support**: https://supabase.com/support
- **Documentazione**: https://docs.lovable.dev

**Buon deploy! 🚀**