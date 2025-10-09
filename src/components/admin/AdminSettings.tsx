import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { demoEducators, demoWorkshops, demoFaqs, demoPosts, demoGalleryItems, demoPartners, demoResources } from '@/data/demo';

export const AdminSettings = () => {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleImportDemoData = async () => {
    setIsImporting(true);
    
    try {
      const response = await supabase.functions.invoke('import-demo-data', {
        body: {
          demoData: {
            educators: demoEducators,
            workshops: demoWorkshops,
            posts: demoPosts,
            faqs: demoFaqs,
            partners: demoPartners,
            galleryItems: demoGalleryItems,
            resources: demoResources
          }
        },
        headers: {
          'X-Admin-Password': import.meta.env.VITE_ADMIN_PASS || ''
        }
      });

      if (response.error) throw response.error;

      const result = response.data;
      
      toast({
        title: "Import completato",
        description: (
          <div className="space-y-1">
            {result.results.map((r: any) => (
              <div key={r.type}>
                <strong>{r.type}:</strong> {r.created} creati, {r.updated} aggiornati
              </div>
            ))}
          </div>
        )
      });
    } catch (error) {
      console.error('Error importing demo data:', error);
      toast({
        title: "Errore",
        description: "Impossibile importare i dati demo. Verifica la configurazione.",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Impostazioni</h2>

      <Card>
        <CardHeader>
          <CardTitle>Importa Dati Demo</CardTitle>
          <CardDescription>
            Importa contenuti di esempio nel database. I dati esistenti non verranno sovrascritti.
            Solo i contenuti demo verranno aggiornati.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleImportDemoData} 
            disabled={isImporting}
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importazione in corso...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Importa Esempi nel DB
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Verranno importati: educatori, laboratori, post, FAQ, partner, elementi galleria e materiali didattici.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informazioni Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versione:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Database:</span>
            <span className="font-medium">Supabase</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ambiente:</span>
            <span className="font-medium">{import.meta.env.MODE}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
