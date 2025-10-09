import { Button } from '@/components/ui/button';
import { CheckCircle, Trash2 } from 'lucide-react';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BulkDemoActionsProps {
  selectedIds: string[];
  table: string;
  onUpdate: () => void;
  onClearSelection: () => void;
}

export const BulkDemoActions = ({ selectedIds, table, onUpdate, onClearSelection }: BulkDemoActionsProps) => {
  const { toast } = useToast();

  if (selectedIds.length === 0) return null;

  const handleBulkConvert = async () => {
    try {
      const { error } = await supabase
        .from(table as any)
        .update({ is_demo: false, demo_source: null })
        .in('id', selectedIds)
        .eq('is_demo', true);

      if (error) throw error;

      toast({
        title: "Convertiti",
        description: `${selectedIds.length} contenuti convertiti in contenuti reali`
      });
      onClearSelection();
      onUpdate();
    } catch (error) {
      console.error('Error bulk converting:', error);
      toast({
        title: "Errore",
        description: "Impossibile convertire i contenuti",
        variant: "destructive"
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .in('id', selectedIds)
        .eq('is_demo', true); // Extra safety check

      if (error) throw error;

      toast({
        title: "Eliminati",
        description: `${selectedIds.length} contenuti demo eliminati`
      });
      onClearSelection();
      onUpdate();
    } catch (error) {
      console.error('Error bulk deleting:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare i contenuti demo",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
      <span className="text-sm font-medium">
        {selectedIds.length} selezionati
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleBulkConvert}
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Converti tutti
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Elimina tutti
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare {selectedIds.length} contenuti demo?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione eliminerà permanentemente tutti i contenuti demo selezionati.
              Non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete}>
              Elimina tutti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearSelection}
      >
        Deseleziona
      </Button>
    </div>
  );
};
