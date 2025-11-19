import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Euro, GraduationCap, Leaf, Beaker, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWorkshops } from '@/lib/data/workshops';

// Extra info per arricchire i workshop dal DB
const extraInfoBySlug: Record<string, {
  audience: string;
  ageRange: string;
  season: string;
  location: string;
  icon: any;
  color: string;
}> = {
  'piccoli-impollinatori': {
    audience: 'Scuola dell\'Infanzia',
    ageRange: '3-6 anni',
    season: 'Tutto l\'anno',
    location: 'A scuola o presso il nostro centro',
    icon: GraduationCap,
    color: 'from-amber-400 to-orange-500'
  },
  'api-e-scienza': {
    audience: 'Scuola Primaria',
    ageRange: '6-11 anni',
    season: 'Ottobre-Maggio',
    location: 'A scuola o presso il nostro centro',
    icon: Beaker,
    color: 'from-blue-400 to-cyan-500'
  },
  'ecosistemi-sostenibilita': {
    audience: 'Scuola Secondaria',
    ageRange: '11-14 anni',
    season: 'Tutto l\'anno',
    location: 'A scuola o presso il nostro centro',
    icon: Leaf,
    color: 'from-green-400 to-emerald-500'
  },
  'hotel-per-insetti': {
    audience: 'Scuola Primaria e Secondaria',
    ageRange: '8-14 anni',
    season: 'Primavera-Estate',
    location: 'A scuola con spazio esterno',
    icon: GraduationCap,
    color: 'from-purple-400 to-pink-500'
  }
};

export default function Laboratori() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        setLoading(true);
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (err) {
        console.error('Error loading workshops:', err);
        setError('Impossibile caricare i laboratori. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  return (
    <Layout>
      <SEOHead 
        title="Laboratori Didattici sulle Api - Educazione Ambientale per Scuole"
        description="Scopri i nostri laboratori didattici sulle api per scuole dell'infanzia, primarie e secondarie. Esperienze educative STEM che uniscono scienza, natura e sostenibilità."
        keywords="laboratori api scuole, educazione ambientale, didattica STEM, workshop api, scuola primaria, scuola secondaria"
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="mb-4">
                Educazione STEM per Scuole
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                I Nostri Laboratori
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Esperienze educative coinvolgenti che avvicinano studenti di ogni età al mondo delle api, 
                sviluppando competenze scientifiche e consapevolezza ambientale.
              </p>
            </div>
          </div>
        </section>

        {/* Workshops Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Caricamento laboratori...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {workshops.map((workshop) => {
                  const extra = extraInfoBySlug[workshop.slug] || {
                    audience: 'Tutti i livelli',
                    ageRange: '',
                    season: 'Tutto l\'anno',
                    location: 'A scuola',
                    icon: GraduationCap,
                    color: 'from-primary to-primary/60'
                  };
                  const Icon = extra.icon;

                  return (
                    <Card 
                      key={workshop.id} 
                      id={workshop.slug}
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2"
                    >
                      <div className={`h-2 bg-gradient-to-r ${extra.color}`} />
                      
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${extra.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant="secondary">{extra.audience}</Badge>
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                            {workshop.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {workshop.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{workshop.duration_minutes} min</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>Max {workshop.max_participants} studenti</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Euro className="w-4 h-4 text-muted-foreground" />
                            <span>€{workshop.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <span>{extra.ageRange}</span>
                          </div>
                        </div>

                        {extra.location && (
                          <div className="flex items-start gap-2 text-sm pt-2 border-t">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <span className="text-muted-foreground">{extra.location}</span>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter>
                        <Button 
                          asChild 
                          className="w-full group-hover:scale-105 transition-transform"
                        >
                          <Link to={`/prenota?workshop=${workshop.slug}`}>
                            Richiedi questo laboratorio
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Vuoi personalizzare un percorso per la tua scuola?
              </h2>
              <p className="text-lg text-muted-foreground">
                Possiamo creare programmi su misura che integrano più laboratori o approfondiscono tematiche specifiche.
                Contattaci per discutere le tue esigenze didattiche.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/prenota">Richiedi un preventivo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contatti">Contattaci</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}