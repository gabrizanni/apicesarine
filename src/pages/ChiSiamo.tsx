import React from 'react';
import { Heart, Shield, Target, Users, Award, Leaf } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import beesNatureImage from '@/assets/bees-nature.jpg';

const ChiSiamo = () => {
  const values = [
    {
      icon: Heart,
      title: "Passione",
      description: "Amiamo la natura e crediamo nel potere trasformativo dell'educazione ambientale"
    },
    {
      icon: Shield,
      title: "Sicurezza",
      description: "Protocolli rigorosi per garantire esperienze sicure e controllate"
    },
    {
      icon: Target,
      title: "Qualità",
      description: "Contenuti scientificamente accurati e metodologie didattiche innovative"
    },
    {
      icon: Users,
      title: "Inclusività",
      description: "Laboratori accessibili e coinvolgenti per tutti i bambini"
    }
  ];

  const methodology = [
    {
      title: "Approccio esperienziale",
      description: "I bambini imparano attraverso l'osservazione diretta e la manipolazione sicura di materiali naturali."
    },
    {
      title: "Storytelling educativo",
      description: "Raccontiamo la vita delle api attraverso storie coinvolgenti che stimolano curiosità e empatia."
    },
    {
      title: "Interdisciplinarità",
      description: "Colleghiamo scienze, matematica, arte e educazione civica in percorsi integrati."
    },
    {
      title: "Valutazione formativa",
      description: "Monitoriamo l'apprendimento attraverso osservazione e feedback costruttivo."
    }
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-hero py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-6">
                La nostra missione
              </h1>
              <p className="text-xl text-slate/80 leading-relaxed mb-8">
                Api Cesarine nasce dalla convinzione che l'educazione ambientale debba iniziare fin dalla più tenera età. 
                Attraverso l'affascinante mondo delle api, aiutiamo bambini e ragazzi a sviluppare una coscienza ecologica 
                e una profonda connessione con la natura.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest mb-2">2018</div>
                  <div className="text-sm text-slate/60">Anno di fondazione</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest mb-2">500+</div>
                  <div className="text-sm text-slate/60">Scuole partner</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={beesNatureImage}
                alt="Api in natura"
                className="rounded-3xl shadow-card w-full"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-honey/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              I nostri valori
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Principi che guidano ogni nostra attività e danno forma alla nostra identità educativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="shadow-card border-0 text-center hover:shadow-lg transition-smooth group">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex p-3 bg-gradient-honey rounded-xl group-hover:shadow-honey transition-smooth">
                      <Icon className="h-6 w-6 text-slate" />
                    </div>
                    <h3 className="font-semibold text-slate mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              Il nostro impatto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Numeri che raccontano la crescita di una comunità educativa sempre più consapevole.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-forest mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Studenti coinvolti</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-forest mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Scuole raggiunte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-forest mb-2">15</div>
              <div className="text-sm text-muted-foreground">Regioni italiane</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-forest mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Soddisfazione docenti</div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              La nostra metodologia
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un approccio pedagogico basato sulla ricerca e l'esperienza sul campo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methodology.map((method, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-honey rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-slate mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate mb-6">
                Sicurezza e benessere delle api
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-forest mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate mb-1">Nessuna manipolazione diretta</h4>
                    <p className="text-sm text-muted-foreground">I bambini non entrano mai in contatto diretto con le api senza protezioni adeguate.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-forest mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate mb-1">Gestione allergie</h4>
                    <p className="text-sm text-muted-foreground">Protocolli specifici per la gestione di allergie e situazioni di emergenza.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Leaf className="h-5 w-5 text-forest mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-slate mb-1">Rispetto degli insetti</h4>
                    <p className="text-sm text-muted-foreground">Ogni attività è progettata per non causare stress o danni alle api.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-hero rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate mb-4">
                Liberatoria e assicurazione
              </h3>
              <p className="text-slate/80 mb-6">
                Tutti i nostri laboratori sono coperti da assicurazione professionale. 
                Forniamo liberatorie dettagliate che specificano modalità di svolgimento e misure di sicurezza adottate.
              </p>
              <div className="text-sm text-slate/70">
                <p>• Assicurazione RC professionale</p>
                <p>• Liberatorie specifiche per attività</p>
                <p>• Protocolli emergenza certificati</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ChiSiamo;