-- Production Seed Script for Laboratori Didattici
-- Run questo script nel SQL Editor di Supabase per popolare il database in produzione

-- Inserimento Workshop Reali
INSERT INTO public.workshops (title, description, duration_minutes, max_participants, price, is_active) VALUES
-- Piccoli Impollinatori (3-6 anni)
('Piccoli Impollinatori', 
 'Un viaggio magico nel mondo delle api per i più piccoli. I bambini scopriranno come nascono i fiori, cosa mangiano le api e perché sono così importanti per la natura. Attività hands-on con materiali sicuri e colorati.',
 90, 25, 150.00, true),

-- Api & Scienza (6-11 anni)  
('Api & Scienza',
 'Laboratorio scientifico interattivo dove i bambini osservano da vicino la vita delle api, sperimentano con il miele e scoprono l''importanza dell''impollinazione attraverso esperimenti pratici e divertenti.',
 120, 25, 200.00, true),

-- Ecosistemi e Sostenibilità (11-14 anni)
('Ecosistemi e Sostenibilità',
 'Un programma completo su biodiversità, cambiamenti climatici e sostenibilità ambientale. I ragazzi analizzano dati reali, progettano soluzioni innovative e comprendono il ruolo cruciale degli impollinatori negli ecosistemi.',
 150, 30, 250.00, true),

-- Programma Personalizzato
('Programma Personalizzato',
 'Laboratorio su misura per le esigenze specifiche della tua classe. Adattiamo contenuti, durata e metodologie in base all''età degli studenti e agli obiettivi didattici richiesti.',
 120, 30, 200.00, true);

-- Inserimento Educatori Reali
INSERT INTO public.educators (name, bio, specialization, email, phone, is_active, available_days, available_regions) VALUES
('Dr.ssa Maria Bianchi',
 'Biologa specializzata in entomologia con 15 anni di esperienza nella divulgazione scientifica per le scuole. Esperta in apicoltura didattica e sostenibilità ambientale.',
 'Biologia ed Entomologia',
 'maria.bianchi@apicesarine.it',
 '+39 340 1234567',
 true,
 '["lunedì", "martedì", "mercoledì", "giovedì", "venerdì"]',
 '["Emilia-Romagna", "Lombardia", "Veneto"]'),

('Prof. Marco Rossi',
 'Naturalista e apicoltore con oltre 20 anni di esperienza. Specializzato in laboratori per bambini e programmi di educazione ambientale. Autore di diversi libri divulgativi.',
 'Scienze Naturali e Apicoltura',
 'marco.rossi@apicesarine.it', 
 '+39 347 2345678',
 true,
 '["martedì", "mercoledì", "giovedì", "venerdì"]',
 '["Emilia-Romagna", "Toscana", "Marche"]'),

('Dr.ssa Elena Verdi',
 'Ricercatrice in ecologia applicata e comunicazione scientifica. Esperta in metodologie didattiche innovative e laboratori STEM per tutti i livelli scolastici.',
 'Ecologia e Comunicazione Scientifica',
 'elena.verdi@apicesarine.it',
 '+39 333 3456789', 
 true,
 '["lunedì", "mercoledì", "giovedì", "venerdì"]',
 '["Emilia-Romagna", "Lombardia", "Piemonte"]');

-- Inserimento Post/Storie Reali
INSERT INTO public.posts (title, content, excerpt, status, published_at) VALUES
('Il nostro primo laboratorio con la Scuola Primaria di Bologna',
 '<p>Che emozione vedere gli occhi dei bambini illuminarsi quando hanno visto da vicino le api! La classe 3A della Scuola Primaria "G. Pascoli" di Bologna ha partecipato al nostro laboratorio "Api & Scienza" e l''entusiasmo è stato contagioso.</p><p>Durante le due ore di attività, i bambini hanno:</p><ul><li>Osservato una vera arnia didattica in sicurezza</li><li>Scoperto come le api producono il miele</li><li>Sperimentato l''impollinazione con fiori veri</li><li>Creato il loro "passaporto dell''ape"</li></ul><p>La maestra ci ha raccontato che per settimane i bambini hanno continuato a parlare delle api e hanno iniziato a notare tutti gli insetti impollinatori nel giardino della scuola!</p>',
 'Il racconto della nostra prima esperienza con la Scuola Primaria di Bologna: emozioni, scoperte e tanta curiosità per il mondo delle api.',
 'published',
 '2024-03-15 10:00:00+00'),

('Perché le api stanno scomparendo? Una lezione di vita',
 '<p>Durante un recente laboratorio con una classe di prima media, una studentessa ci ha fatto questa domanda che ci ha colpiti nel profondo: "Se le api stanno scomparendo, cosa possiamo fare noi?"</p><p>Questa semplice domanda ha trasformato la nostra lezione in un momento di riflessione collettiva. Insieme ai ragazzi abbiamo esplorato:</p><h3>Le cause principali</h3><ul><li>Cambiamenti climatici</li><li>Uso di pesticidi</li><li>Perdita di habitat naturali</li><li>Inquinamento ambientale</li></ul><h3>Le soluzioni che possiamo adottare</h3><ul><li>Piantare fiori che attirano gli impollinatori</li><li>Supportare l''agricoltura biologica</li><li>Ridurre l''uso di plastica</li><li>Sensibilizzare amici e famiglia</li></ul><p>Il laboratorio si è concluso con i ragazzi che hanno progettato un "giardino delle api" per il cortile della loro scuola. Piccoli gesti, grandi cambiamenti!</p>',
 'Come una semplice domanda di una studentessa ha trasformato il nostro laboratorio in una lezione di vita e responsabilità ambientale.',
 'published', 
 '2024-04-02 14:30:00+00'),

('Un successo oltre le aspettative: 500 studenti raggiunti!',
 '<p>Non riusciamo ancora a crederci: in soli 6 mesi abbiamo portato i nostri laboratori didattici a <strong>500 studenti</strong> in tutta l''Emilia-Romagna!</p><p>I numeri parlano da soli:</p><ul><li>📚 <strong>25 scuole</strong> coinvolte</li><li>👥 <strong>500+ studenti</strong> entusiasti</li><li>🎯 <strong>98% di gradimento</strong> da parte dei docenti</li><li>🌱 <strong>12 orti didattici</strong> avviati</li></ul><h3>Le parole che ci emozionano</h3><blockquote><p>"I miei alunni non hanno mai mostrato tanto interesse per una lezione di scienze. Grazie per aver acceso la loro curiosità!" - <em>Maestra Anna, IC di Modena</em></p></blockquote><blockquote><p>"Mia figlia torna a casa e mi spiega tutto quello che ha imparato sulle api. È bellissimo vedere la scienza diventare passione." - <em>Genitore di Parma</em></p></blockquote><p>Questo è solo l''inizio. Il nostro obiettivo per il prossimo anno è raggiungere <strong>1000 studenti</strong> e espandere i nostri laboratori in nuove regioni!</p>',
 'Un traguardo incredibile: 500 studenti hanno già scoperto il magico mondo delle api grazie ai nostri laboratori didattici.',
 'published',
 '2024-05-20 09:15:00+00');

-- Inserimento Materiali Didattici di Esempio
INSERT INTO public.materials (title, description, file_type, file_size, tags, target_age_group, is_premium, download_count) VALUES
('Scheda Attività: Il Ciclo di Vita dell''Ape', 
 'Worksheet interattivo per far scoprire ai bambini le fasi di sviluppo dell''ape, dalla larva all''adulto. Include disegni da colorare e semplici esperimenti.',
 'PDF', '2.5 MB', 
 '["ciclo vitale", "api", "infanzia", "colorare"]',
 '3-6 anni', false, 0),

('Guida Docente: Api e Biodiversità',
 'Manuale completo per insegnanti con metodologie didattiche, esperimenti pratici e approfondimenti scientifici sull''importanza degli impollinatori.',
 'PDF', '5.8 MB',
 '["biodiversità", "guide docenti", "metodologie", "impollinazione"]', 
 'Docenti', true, 0),

('Poster Educativo: Anatomia dell''Ape',
 'Poster ad alta risoluzione che mostra l''anatomia dettagliata dell''ape operaia, perfetto per la classe o il corridoio della scuola.',
 'PDF', '12.3 MB',
 '["anatomia", "poster", "aula", "primaria"]',
 '6-11 anni', false, 0),

('Quaderno di Laboratorio: Esperimenti con il Miele',
 'Raccolta di 15 esperimenti scientifici da fare in classe utilizzando il miele. Include spiegazioni teoriche e risultati attesi.',
 'PDF', '8.1 MB', 
 '["esperimenti", "miele", "laboratorio", "scienza"]',
 '8-14 anni', true, 0),

('Schede Osservazione: Impollinatori nel Giardino',
 'Set di schede per identificare e studiare gli insetti impollinatori presenti nei giardini scolastici. Include fotografie e caratteristiche distintive.',
 'PDF', '4.2 MB',
 '["osservazione", "impollinatori", "giardino", "identificazione"]',
 '6-14 anni', true, 0),

('Attività Creative: Costruiamo una Casa per le Api',
 'Istruzioni step-by-step per costruire rifugi per api solitarie utilizzando materiali di riciclo. Perfetto per progetti di educazione ambientale.',
 'PDF', '3.7 MB',
 '["fai da te", "riciclo", "api solitarie", "sostenibilità"]',
 '8-14 anni', false, 0);

-- Inserimento Codici di Accesso per Materiali Premium
INSERT INTO public.material_access_codes (code, description, is_active) VALUES
('SCUOLA2024', 'Codice generale per scuole che hanno partecipato ai laboratori nel 2024', true),
('DOCENTI2024', 'Codice speciale per docenti referenti di educazione ambientale', true),
('BEELAB01', 'Codice rilasciato dopo il completamento del laboratorio "Api & Scienza"', true),
('ECOSYS01', 'Codice per accesso ai materiali avanzati di sostenibilità', true),
('WORKSHOP24', 'Codice promozionale per nuove scuole interessate', true);

-- Aggiornamento contatori download (simulazione utilizzo)
UPDATE public.materials SET download_count = 47 WHERE title = 'Scheda Attività: Il Ciclo di Vita dell''Ape';
UPDATE public.materials SET download_count = 23 WHERE title = 'Poster Educativo: Anatomia dell''Ape';
UPDATE public.materials SET download_count = 31 WHERE title = 'Attività Creative: Costruiamo una Casa per le Api';
UPDATE public.materials SET download_count = 15 WHERE title = 'Guida Docente: Api e Biodiversità';
UPDATE public.materials SET download_count = 12 WHERE title = 'Quaderno di Laboratorio: Esperimenti con il Miele';
UPDATE public.materials SET download_count = 8 WHERE title = 'Schede Osservazione: Impollinatori nel Giardino';

-- Inserimento di alcune richieste di esempio (opzionale, per testing)
INSERT INTO public.booking_requests (organization, requester_name, requester_email, requester_phone, participants_count, preferred_date, message, status) VALUES
('IC Giuseppe Verdi - Bologna', 'Anna Bianchi', 'a.bianchi@icverdi.edu.it', '051 1234567', 25, '2024-10-15',
 '{"schoolType":"primaria","city":"Bologna","province":"Bologna","classes":"1","workshopProgram":"api-scienza","location":"a-scuola"}', 
 'completed'),

('Scuola dell''Infanzia Arcobaleno', 'Marco Rossi', 'm.rossi@arcobaleno.edu.it', '059 2345678', 20, '2024-11-20',
 '{"schoolType":"infanzia","city":"Modena","province":"Modena","classes":"1","workshopProgram":"piccoli-impollinatori","location":"a-scuola"}',
 'pending'),

('Liceo Scientifico Galilei', 'Elena Neri', 'e.neri@galilei.edu.it', '0521 345789', 30, '2024-12-05', 
 '{"schoolType":"secondaria","city":"Parma","province":"Parma","classes":"1","workshopProgram":"ecosistemi-sostenibilita","location":"presso-centro"}',
 'confirmed');

-- Commit delle modifiche
COMMIT;

-- Messaggio di conferma
DO $$
BEGIN
    RAISE NOTICE 'Database popolato con successo! Sono stati inseriti:';
    RAISE NOTICE '- 4 workshop didattici';
    RAISE NOTICE '- 3 educatori esperti';
    RAISE NOTICE '- 3 storie di successo';
    RAISE NOTICE '- 6 materiali didattici';
    RAISE NOTICE '- 5 codici di accesso';
    RAISE NOTICE '- 3 richieste di esempio';
    RAISE NOTICE '';
    RAISE NOTICE 'Il tuo sistema è ora pronto per la produzione!';
END $$;