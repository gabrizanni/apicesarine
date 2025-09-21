import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Calendar, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');
  const pdfDownload = searchParams.get('pdf');
  
  // Parse booking data from URL params (in real app, fetch from API)
  const schoolName = searchParams.get('school') || 'Scuola';
  const contactName = searchParams.get('contact') || 'Referente';
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';
  const program = searchParams.get('program') || '';
  const students = searchParams.get('students') || '';
  const classes = searchParams.get('classes') || '';

  const handleDownloadPDF = () => {
    if (pdfDownload) {
      const link = document.createElement('a');
      link.href = pdfDownload;
      link.download = `riepilogo-laboratorio-${bookingId}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Layout>
      {/* Success Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
            Richiesta Inviata con Successo!
          </h1>
          <p className="text-xl text-slate/80 max-w-3xl mx-auto">
            Grazie per aver scelto i nostri laboratori didattici. 
            Ti ricontatteremo entro 24 ore per confermare tutti i dettagli.
          </p>
        </div>
      </section>

      {/* Booking Summary */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Status Card */}
          <Card className="shadow-card border-0 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-2xl">
                <FileText className="h-6 w-6 mr-3 text-forest" />
                Riepilogo Richiesta
              </CardTitle>
              <div className="flex justify-center mt-4">
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                  In Attesa di Conferma
                </Badge>
              </div>
              {bookingId && (
                <p className="text-sm text-muted-foreground mt-2">
                  ID Richiesta: <span className="font-mono">{bookingId}</span>
                </p>
              )}
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* School Info */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="h-5 w-5 mr-3 text-forest" />
                  Informazioni Scuola
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-forest">Nome Scuola</p>
                  <p className="text-muted-foreground">{schoolName}</p>
                </div>
                {program && (
                  <div>
                    <p className="font-semibold text-forest">Programma Richiesto</p>
                    <p className="text-muted-foreground">{program}</p>
                  </div>
                )}
                {classes && students && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-forest">Classi</p>
                      <p className="text-muted-foreground">{classes}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-forest">Studenti</p>
                      <p className="text-muted-foreground">{students}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Mail className="h-5 w-5 mr-3 text-forest" />
                  Referente di Contatto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-forest">Nome</p>
                  <p className="text-muted-foreground">{contactName}</p>
                </div>
                {email && (
                  <div>
                    <p className="font-semibold text-forest">Email</p>
                    <p className="text-muted-foreground">{email}</p>
                  </div>
                )}
                {phone && (
                  <div>
                    <p className="font-semibold text-forest">Telefono</p>
                    <p className="text-muted-foreground">{phone}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="shadow-card border-0 mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                🐝 Prossimi Passi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="bg-forest/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <span className="text-forest font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Conferma Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Riceverai una conferma via email con tutti i dettagli della richiesta
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-forest/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <span className="text-forest font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">Contatto Diretto</h3>
                  <p className="text-sm text-muted-foreground">
                    Ti ricontatteremo entro 24 ore per discutere i dettagli organizzativi
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-forest/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <span className="text-forest font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Conferma Finale</h3>
                  <p className="text-sm text-muted-foreground">
                    Definiremo insieme date, orari e tutti i dettagli del laboratorio
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {pdfDownload && (
              <Button 
                onClick={handleDownloadPDF}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Scarica Riepilogo PDF
              </Button>
            )}
            
            <Link to="/contatti">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contattaci Direttamente
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="cta" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Torna alla Home
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12 p-6 bg-sage/5 rounded-lg">
            <h3 className="text-lg font-semibold text-forest mb-2">
              Hai domande urgenti?
            </h3>
            <p className="text-muted-foreground mb-4">
              Non esitare a contattarci direttamente per qualsiasi chiarimento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <span className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                info@laboratorididattici.it
              </span>
              <span className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                +39 051 1234567
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookingSuccess;