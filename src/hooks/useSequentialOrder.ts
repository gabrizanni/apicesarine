import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type TableName = 'faqs' | 'gallery_items' | 'partners';

interface OrderableItem {
  id: string;
  display_order: number;
}

/**
 * Hook per gestire l'ordinamento sequenziale degli elementi.
 * Garantisce che:
 * - La numerazione parta sempre da 1
 * - Non ci siano gap nella sequenza
 * - Gli elementi vengano rinumerati automaticamente quando uno viene spostato
 */
export const useSequentialOrder = (tableName: TableName) => {
  const { toast } = useToast();
  const [isReordering, setIsReordering] = useState(false);

  /**
   * Rinumera tutti gli elementi della tabella in sequenza (1, 2, 3, ...)
   */
  const resequenceAll = async (items: OrderableItem[]) => {
    try {
      setIsReordering(true);
      
      // Ordina gli elementi per display_order attuale
      const sortedItems = [...items].sort((a, b) => a.display_order - b.display_order);
      
      // Rinumera in sequenza partendo da 1
      const updates = sortedItems.map((item, index) => ({
        id: item.id,
        display_order: index + 1
      }));

      // Aggiorna tutti gli elementi
      for (const update of updates) {
        const { error } = await supabase
          .from(tableName)
          .update({ display_order: update.display_order })
          .eq('id', update.id);
        
        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Error resequencing items:', error);
      toast({
        title: "Errore",
        description: "Impossibile rinumerare gli elementi",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsReordering(false);
    }
  };

  /**
   * Sposta un elemento in una nuova posizione e rinumera gli altri
   */
  const moveItem = async (
    itemId: string,
    currentPosition: number,
    newPosition: number,
    allItems: OrderableItem[]
  ) => {
    if (currentPosition === newPosition) return true;

    try {
      setIsReordering(true);

      // Clamp newPosition tra 1 e il numero totale di elementi
      const clampedPosition = Math.max(1, Math.min(newPosition, allItems.length));

      // Ordina gli elementi per display_order
      const sortedItems = [...allItems].sort((a, b) => a.display_order - b.display_order);

      // Rimuovi l'elemento dalla sua posizione attuale
      const movedItemIndex = sortedItems.findIndex(item => item.id === itemId);
      const [movedItem] = sortedItems.splice(movedItemIndex, 1);

      // Inserisci l'elemento nella nuova posizione (array è 0-indexed, position è 1-indexed)
      sortedItems.splice(clampedPosition - 1, 0, movedItem);

      // Rinumera tutti gli elementi in sequenza
      const updates = sortedItems.map((item, index) => ({
        id: item.id,
        display_order: index + 1
      }));

      // Aggiorna tutti gli elementi
      for (const update of updates) {
        const { error } = await supabase
          .from(tableName)
          .update({ display_order: update.display_order })
          .eq('id', update.id);
        
        if (error) throw error;
      }

      toast({
        title: "Posizione aggiornata",
        description: `Elemento spostato alla posizione ${clampedPosition}`
      });

      return true;
    } catch (error) {
      console.error('Error moving item:', error);
      toast({
        title: "Errore",
        description: "Impossibile spostare l'elemento",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsReordering(false);
    }
  };

  /**
   * Sposta un elemento su di una posizione
   */
  const moveUp = async (itemId: string, currentPosition: number, allItems: OrderableItem[]) => {
    if (currentPosition <= 1) return false;
    return moveItem(itemId, currentPosition, currentPosition - 1, allItems);
  };

  /**
   * Sposta un elemento giù di una posizione
   */
  const moveDown = async (itemId: string, currentPosition: number, allItems: OrderableItem[]) => {
    if (currentPosition >= allItems.length) return false;
    return moveItem(itemId, currentPosition, currentPosition + 1, allItems);
  };

  /**
   * Calcola la prossima posizione disponibile per un nuovo elemento
   */
  const getNextPosition = (items: OrderableItem[]): number => {
    if (items.length === 0) return 1;
    const maxOrder = Math.max(...items.map(item => item.display_order));
    return maxOrder + 1;
  };

  return {
    resequenceAll,
    moveItem,
    moveUp,
    moveDown,
    getNextPosition,
    isReordering
  };
};
