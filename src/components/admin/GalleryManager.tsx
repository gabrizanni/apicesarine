import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSequentialOrder } from '@/hooks/useSequentialOrder';
import { OrderControls } from './OrderControls';
import { DemoContentFilter } from './DemoContentFilter';
import { DemoBadge } from './DemoBadge';
import { DemoActions } from './DemoActions';
import { BulkDemoActions } from './BulkDemoActions';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  image_alt: string | null;
  category: string | null;
  display_order: number;
  is_active: boolean;
  is_demo?: boolean;
  demo_source?: string | null;
  created_at: string;
  updated_at: string;
}

export const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [includeDemos, setIncludeDemos] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();
  const { moveUp, moveDown, getNextPosition, isReordering } = useSequentialOrder('gallery_items');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    image_alt: '',
    category: '',
    display_order: 1,
    is_active: true
  });

  useEffect(() => {
    fetchItems();
  }, [includeDemos]);

  const fetchItems = async () => {
    try {
      let query = supabase
        .from('gallery_items')
        .select('*')
        .order('display_order');

      if (!includeDemos) {
        query = query.or('is_demo.is.null,is_demo.eq.false');
      }

      const { data, error } = await query;
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare la galleria",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      image_alt: '',
      category: '',
      display_order: getNextPosition(items),
      is_active: true
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery_items')
          .update(formData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Elemento aggiornato con successo" });
      } else {
        const { error } = await supabase
          .from('gallery_items')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Elemento creato con successo" });
      }

      fetchItems();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Operazione fallita",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      image_alt: item.image_alt || '',
      category: item.category || '',
      display_order: item.display_order,
      is_active: item.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo elemento?')) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Elemento eliminato con successo" });
      fetchItems();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare l'elemento",
        variant: "destructive"
      });
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Galleria ({items.length})</h3>
          <DemoContentFilter 
            includeDemos={includeDemos} 
            onToggle={setIncludeDemos} 
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Elemento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Modifica Elemento' : 'Nuovo Elemento'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL Immagine *</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_alt">Testo Alternativo</Label>
                  <Input
                    id="image_alt"
                    value={formData.image_alt}
                    onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Ordine</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Attivo</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingItem ? 'Aggiorna' : 'Crea'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <BulkDemoActions
        selectedIds={selectedIds}
        table="gallery_items"
        onUpdate={fetchItems}
        onClearSelection={() => setSelectedIds([])}
      />

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video relative">
              {item.image_url && (
                <img 
                  src={item.image_url} 
                  alt={item.image_alt || item.title}
                  className="w-full h-full object-cover"
                />
              )}
              {item.is_demo && (
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={() => toggleSelection(item.id)}
                    className="bg-white"
                  />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {item.title}
                    <DemoBadge isDemo={item.is_demo} />
                  </h4>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  )}
                </div>
                <OrderControls
                  currentPosition={item.display_order}
                  totalItems={items.length}
                  onMoveUp={async () => {
                    const success = await moveUp(item.id, item.display_order, items);
                    if (success) fetchItems();
                  }}
                  onMoveDown={async () => {
                    const success = await moveDown(item.id, item.display_order, items);
                    if (success) fetchItems();
                  }}
                  disabled={isReordering}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  {item.category && <span className="px-2 py-1 bg-muted rounded">{item.category}</span>}
                </div>
                <div className="flex space-x-2">
                  {item.is_demo ? (
                    <DemoActions
                      id={item.id}
                      isDemo={item.is_demo}
                      table="gallery_items"
                      onUpdate={fetchItems}
                      item={item}
                    />
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
