import React, { useState } from 'react';
import { Search, Lock, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMaterials } from '@/hooks/useMaterials';
import MaterialCard from '@/components/materials/MaterialCard';
import AccessCodeModal from '@/components/materials/AccessCodeModal';

const MaterialiDocenti = () => {
  const { 
    freeMaterials, 
    premiumMaterials, 
    loading, 
    searchTag, 
    setSearchTag, 
    downloadMaterial, 
    validateAccessCode 
  } = useMaterials();
  
  const [hasAccess, setHasAccess] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  const handleAccessSuccess = (code: string) => {
    setHasAccess(true);
    setAccessCode(code);
    // Store access in sessionStorage for this session
    sessionStorage.setItem('materials_access', 'true');
    sessionStorage.setItem('materials_code', code);
  };

  // Check for existing access on load
  React.useEffect(() => {
    const storedAccess = sessionStorage.getItem('materials_access');
    const storedCode = sessionStorage.getItem('materials_code');
    if (storedAccess === 'true' && storedCode) {
      setHasAccess(true);
      setAccessCode(storedCode);
    }
  }, []);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    [...freeMaterials, ...premiumMaterials].forEach(material => {
      material.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [freeMaterials, premiumMaterials]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto mb-4"></div>
            <p className="text-muted-foreground">Caricamento materiali...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate mb-4">
              Materiali per docenti
            </h1>
            <p className="text-xl text-slate/80 max-w-3xl mx-auto">
              Risorse didattiche gratuite e premium per arricchire 
              le tue lezioni e approfondire il mondo delle api.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per tag..."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Tag popolari:</span>
              {allTags.slice(0, 4).map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTag(tag)}
                  className="text-xs h-7"
                >
                  {tag}
                </Button>
              ))}
              {searchTag && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTag('')}
                  className="text-xs h-7"
                >
                  Cancella
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Free Materials */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate mb-4">
              Risorse gratuite
            </h2>
            <p className="text-lg text-muted-foreground">
              Materiali didattici liberamente scaricabili per iniziare subito.
            </p>
          </div>

          {freeMaterials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTag ? 'Nessun materiale gratuito trovato per questo tag.' : 'Nessun materiale gratuito disponibile.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onDownload={downloadMaterial}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium Materials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate mb-4">
                  Area docenti riservata
                </h2>
                <p className="text-lg text-muted-foreground">
                  Materiali avanzati e percorsi strutturati per docenti che hanno partecipato ai nostri laboratori.
                </p>
              </div>
              
              {hasAccess && (
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-green-600 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Accesso attivo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Codice: {accessCode}</p>
                </div>
              )}
            </div>
            
            {/* Access Card */}
            {!hasAccess && (
              <Card className="bg-gradient-nature text-white shadow-card border-0 max-w-md mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="h-6 w-6" />
                    <h3 className="text-lg font-semibold">Accesso riservato</h3>
                  </div>
                  <p className="text-white/90 text-sm mb-4">
                    Inserisci il codice ricevuto dopo il laboratorio per accedere ai materiali premium.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setShowAccessModal(true)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Inserisci codice
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {premiumMaterials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTag ? 'Nessun materiale premium trovato per questo tag.' : 'Nessun materiale premium disponibile.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumMaterials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onDownload={downloadMaterial}
                  isLocked={!hasAccess}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-gradient-hero rounded-3xl p-12">
            <h2 className="text-2xl font-bold text-slate mb-4">
              Vuoi accedere a tutti i materiali?
            </h2>
            <p className="text-slate/80 mb-6 max-w-2xl mx-auto">
              Organizza un laboratorio nella tua scuola e riceverai l'accesso completo 
              all'area riservata con materiali esclusivi e percorsi strutturati.
            </p>
            <Button variant="nature" size="lg">
              Richiedi un laboratorio
            </Button>
          </div>
        </div>
      </section>

      {/* Access Code Modal */}
      <AccessCodeModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onSuccess={handleAccessSuccess}
        validateCode={validateAccessCode}
      />
    </Layout>
  );
};

export default MaterialiDocenti;