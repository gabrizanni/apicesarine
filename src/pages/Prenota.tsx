import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, MapPin, Users, GraduationCap, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const bookingSchema = z.object({
  schoolType: z.string().min(1, "Seleziona il tipo di istituto"),
  schoolName: z.string().min(2, "Il nome della scuola è obbligatorio"),
  mechanographicCode: z.string().optional(),
  city: z.string().min(2, "Il comune è obbligatorio"),
  province: z.string().min(2, "La provincia è obbligatoria"),
  postalCode: z.string().optional(),
  contactName: z.string().min(2, "Nome e cognome del referente sono obbligatori"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(10, "Inserisci un numero di telefono valido"),
  classes: z.string().min(1, "Indica il numero di classi"),
  students: z.string().min(1, "Indica il numero di studenti"),
  workshopProgram: z.string().min(1, "Seleziona un programma"),
  datePreference1: z.string().optional(),
  datePreference2: z.string().optional(),
  datePreference3: z.string().optional(),
  location: z.string().min(1, "Seleziona dove svolgere il laboratorio"),
  specialNeeds: z.string().optional(),
  notes: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, "Il consenso privacy è obbligatorio"),
  marketingConsent: z.boolean().optional(),
  honeypot: z.string().max(0, "Campo non valido") // Honeypot per bot
});

type BookingForm = z.infer<typeof bookingSchema>;

const Prenota = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      privacyConsent: false,
      marketingConsent: false,
      honeypot: ""
    }
  });

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    
    try {
      // Simula invio dati (in produzione: API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Richiesta inviata con successo!",
        description: "Ti ricontatteremo entro 24 ore per confermare tutti i dettagli.",
      });
      
      // Reset form
      form.reset();
      setCurrentStep(1);
      
    } catch (error) {
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un problema. Riprova o contattaci direttamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const workshops = [
    { value: "piccoli-impollinatori", label: "Piccoli Impollinatori (3-6 anni)" },
    { value: "api-scienza", label: "Api & Scienza (6-11 anni)" },
    { value: "ecosistemi-sostenibilita", label: "Ecosistemi e Sostenibilità (11-14 anni)" },
    { value: "personalizzato", label: "Programma personalizzato" }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Richiedi un laboratorio
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Compila il modulo per ricevere una proposta personalizzata per la tua scuola. 
              Ti ricontatteremo entro 24 ore.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: Scuola e Contatti */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <GraduationCap className="h-6 w-6 mr-3 text-forest" />
                    Informazioni sulla scuola
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="schoolType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo di istituto *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona tipo di scuola" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="infanzia">Scuola dell'Infanzia</SelectItem>
                                <SelectItem value="primaria">Scuola Primaria</SelectItem>
                                <SelectItem value="secondaria">Scuola Secondaria I grado</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome della scuola *</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. IC Giuseppe Verdi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="mechanographicCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codice meccanografico (opzionale)</FormLabel>
                        <FormControl>
                          <Input placeholder="Es. BOIC12345X" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comune *</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Bologna" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provincia *</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. BO" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CAP</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. 40100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome e cognome referente *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mario Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email istituzionale *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="mario.rossi@scuola.edu.it" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefono *</FormLabel>
                          <FormControl>
                            <Input placeholder="+39 051 1234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Dettagli Laboratorio */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Users className="h-6 w-6 mr-3 text-forest" />
                    Dettagli del laboratorio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="classes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero di classi *</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="students"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Totale studenti coinvolti *</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="25" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workshopProgram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Programma scelto *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona programma" />
                              </SelectTrigger>
                              <SelectContent>
                                {workshops.map((workshop) => (
                                  <SelectItem key={workshop.value} value={workshop.value}>
                                    {workshop.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="datePreference1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>1ª preferenza data</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="datePreference2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>2ª preferenza data</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="datePreference3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>3ª preferenza data</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Luogo di svolgimento *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Dove preferisci svolgere il laboratorio?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="scuola">Presso la scuola</SelectItem>
                              <SelectItem value="esterno">All'aperto (cortile/giardino scuola)</SelectItem>
                              <SelectItem value="apiario">Presso apiario partner</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Esigenze particolari</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Allergie, problemi di accessibilità, esigenze didattiche specifiche..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note aggiuntive</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Altre informazioni che ritieni utili..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Consensi */}
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <AlertTriangle className="h-6 w-6 mr-3 text-forest" />
                    Consensi privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-medium">
                            Consenso al trattamento dei dati personali *
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Acconsento al trattamento dei miei dati personali per l'organizzazione del laboratorio 
                            come da <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                          </p>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-medium">
                            Consenso comunicazioni marketing (opzionale)
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Acconsento a ricevere newsletter e comunicazioni sui nuovi laboratori.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Honeypot field (hidden) */}
              <FormField
                control={form.control}
                name="honeypot"
                render={({ field }) => (
                  <div style={{ display: 'none' }}>
                    <input {...field} tabIndex={-1} autoComplete="off" />
                  </div>
                )}
              />

              {/* Submit */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="xl"
                  disabled={isSubmitting}
                  className="min-w-64"
                >
                  {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Ti ricontatteremo entro 24 ore per confermare tutti i dettagli
                </p>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </Layout>
  );
};

export default Prenota;