import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';

interface DemoActionsProps {
  id: string;
  isDemo?: boolean;
  table: string;
  onUpdate: () => void;
  item: any;
}

export const DemoActions = ({ id, isDemo, table, onUpdate, item }: DemoActionsProps) => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  if (!isDemo) return null;

  const handleConvertToReal = async () => {
    try {
      const { error } = await supabase
        .from(table as any)
        .update({ is_demo: false, demo_source: null })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Convertito",
        description: "Contenuto convertito in contenuto reale"
      });
      onUpdate();
    } catch (error) {
      console.error('Error converting to real:', error);
      toast({
        title: "Errore",
        description: "Impossibile convertire il contenuto",
        variant: "destructive"
      });
    }
  };

  const handleDuplicate = async () => {
    try {
      // Create a copy without id, created_at, updated_at, and with is_demo=false
      const { id: _, created_at, updated_at, is_demo, demo_source, slug, ...itemData } = item;
      
      // Generate new slug if exists
      const newSlug = slug ? `${slug}-copy-${Date.now()}` : undefined;
      
      const duplicateData = {
        ...itemData,
        ...(newSlug && { slug: newSlug }),
        is_demo: false,
        is_active: false, // Set as inactive draft
        demo_source: null
      };

      const { error } = await supabase
        .from(table as any)
        .insert([duplicateData]);

      if (error) throw error;

      toast({
        title: "Duplicato",
        description: "Contenuto duplicato come bozza"
      });
      onUpdate();
    } catch (error) {
      console.error('Error duplicating:', error);
      toast({
        title: "Errore",
        description: "Impossibile duplicare il contenuto",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id)
        .eq('is_demo', true); // Extra safety check

      if (error) throw error;

      toast({
        title: "Eliminato",
        description: "Contenuto demo eliminato"
      });
      onUpdate();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting demo:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare il contenuto demo",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleConvertToReal}
          title="Converti in reale"
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDuplicate}
          title="Duplica come bozza"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
          title="Elimina demo"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare contenuto demo?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione eliminerà permanentemente questo contenuto demo.
              Non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
