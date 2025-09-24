import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contatti = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Contattaci
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Siamo qui per rispondere alle tue domande e aiutarti a organizzare 
              il laboratorio perfetto per la tua scuola.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate mb-6">
                  Informazioni di contatto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-honey rounded-xl">
                      <Mail className="h-5 w-5 text-slate" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate mb-1">Email</h3>
                      <p className="text-muted-foreground">info@apicesarine.it</p>
                      <p className="text-sm text-muted-foreground">Ti rispondiamo entro 24 ore</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-honey rounded-xl">
                      <Phone className="h-5 w-5 text-slate" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate mb-1">Telefono</h3>
                      <p className="text-muted-foreground">+39 051 234 5678</p>
                      <p className="text-sm text-muted-foreground">Lun-Ven 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-honey rounded-xl">
                      <MapPin className="h-5 w-5 text-slate" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate mb-1">Sede operativa</h3>
                      <p className="text-muted-foreground">Bologna, Emilia-Romagna</p>
                      <p className="text-sm text-muted-foreground">Operatività su tutto il territorio nazionale</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-honey rounded-xl">
                      <Clock className="h-5 w-5 text-slate" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate mb-1">Orari</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Lunedì - Venerdì: 9:00 - 18:00</p>
                        <p>Sabato: 9:00 - 13:00</p>
                        <p>Domenica: Chiuso</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-muted/30 rounded-2xl p-6">
                <h3 className="font-semibold text-slate mb-4">Azioni rapide</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Calendar className="mr-3 h-5 w-5" />
                    Prenota una chiamata
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Chat WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-xl">
                  Invia un messaggio
                </CardTitle>
                <p className="text-muted-foreground">
                  Compila il modulo e ti ricontatteremo al più presto
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate mb-2 block">
                      Nome *
                    </label>
                    <Input placeholder="Il tuo nome" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate mb-2 block">
                      Cognome *
                    </label>
                    <Input placeholder="Il tuo cognome" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate mb-2 block">
                    Email *
                  </label>
                  <Input type="email" placeholder="la.tua@email.it" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate mb-2 block">
                    Telefono
                  </label>
                  <Input placeholder="+39 123 456 7890" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate mb-2 block">
                    Scuola/Istituto
                  </label>
                  <Input placeholder="Nome della scuola" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate mb-2 block">
                    Oggetto *
                  </label>
                  <Input placeholder="Oggetto del messaggio" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate mb-2 block">
                    Messaggio *
                  </label>
                  <Textarea 
                    placeholder="Descrivi la tua richiesta o fai le tue domande..."
                    className="resize-none h-32"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground">
                    Acconsento al trattamento dei dati personali secondo la{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button variant="cta" size="lg" className="w-full">
                  Invia messaggio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Le nostre aree di intervento
            </h2>
            <p className="text-muted-foreground">
              Operiamo in tutta Italia con una rete di educatori qualificati
            </p>
          </div>
          
          {/* Map placeholder */}
          <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-slate mb-2">Mappa interattiva</h3>
              <p className="text-muted-foreground">
                Visualizza le regioni coperte dai nostri servizi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Hai domande frequenti?
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Visita la nostra sezione FAQ per trovare risposte immediate 
              alle domande più comuni sui nostri laboratori.
            </p>
            <Button variant="nature" size="lg" asChild>
              <a href="/faq">Vai alle FAQ</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contatti;