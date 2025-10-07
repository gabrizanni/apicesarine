import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from './ImageUpload';
import { slugify } from '@/lib/slugify';
import { z } from 'zod';

const workshopSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio').max(200),
  slug: z.string().min(1, 'Lo slug è obbligatorio').regex(/^[a-z0-9-]+$/, 'Lo slug può contenere solo lettere minuscole, numeri e trattini'),
  description: z.string().optional(),
  duration_minutes: z.number().int().positive().optional().nullable(),
  max_participants: z.number().int().positive().optional().nullable(),
  price: z.number().positive().optional().nullable(),
  cover_image_url: z.string().url().optional().or(z.literal('')).nullable(),
  cover_image_alt: z.string().optional().nullable(),
  is_active: z.boolean(),
});

interface Workshop {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  duration_minutes: number | null;
  max_participants: number | null;
  price: number | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const WorkshopManager = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workshopToDelete, setWorkshopToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    duration_minutes: '',
    max_participants: '',
    price: '',
    cover_image_url: '',
    cover_image_alt: '',
    is_active: true,
  });
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkshops(data || []);
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      duration_minutes: '',
      max_participants: '',
      price: '',
      cover_image_url: '',
      cover_image_alt: '',
      is_active: true,
    });
    setEditingWorkshop(null);
    setOriginalSlug(null);
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const workshopData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        cover_image_url: formData.cover_image_url || null,
        cover_image_alt: formData.cover_image_alt || null,
        is_active: formData.is_active,
      };

      workshopSchema.parse(workshopData);

      if (editingWorkshop) {
        if (originalSlug && originalSlug !== formData.slug) {
          await supabase.from('redirects').insert({
            from_path: `/laboratori/${originalSlug}`,
            to_path: `/laboratori/${formData.slug}`,
            status_code: 301,
          });
        }

        const { error } = await supabase
          .from('workshops')
          .update(workshopData)
          .eq('id', editingWorkshop.id);

        if (error) throw error;

        toast({
          title: 'Successo',
          description: 'Workshop aggiornato con successo',
        });
      } else {
        const { error } = await supabase
          .from('workshops')
          .insert([workshopData]);

        if (error) throw error;

        toast({
          title: 'Successo',
          description: 'Workshop creato con successo',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchWorkshops();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Errore di validazione',
          description: error.errors.map(e => e.message).join(', '),
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Errore',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  const handleEdit = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    setOriginalSlug(workshop.slug);
    setFormData({
      title: workshop.title,
      slug: workshop.slug || '',
      description: workshop.description || '',
      duration_minutes: workshop.duration_minutes?.toString() || '',
      max_participants: workshop.max_participants?.toString() || '',
      price: workshop.price?.toString() || '',
      cover_image_url: workshop.cover_image_url || '',
      cover_image_alt: workshop.cover_image_alt || '',
      is_active: workshop.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!workshopToDelete) return;

    try {
      const { error } = await supabase
        .from('workshops')
        .delete()
        .eq('id', workshopToDelete);

      if (error) throw error;

      toast({
        title: 'Successo',
        description: 'Workshop eliminato con successo',
      });

      fetchWorkshops();
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setWorkshopToDelete(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Workshop ({workshops.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Workshop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingWorkshop ? 'Modifica Workshop' : 'Nuovo Workshop'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  placeholder="workshop-slug"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL: /laboratori/{formData.slug}
                </p>
              </div>

              <ImageUpload
                value={formData.cover_image_url}
                altText={formData.cover_image_alt}
                onUploadComplete={(url) => setFormData({ ...formData, cover_image_url: url })}
                onAltTextChange={(alt) => setFormData({ ...formData, cover_image_alt: alt })}
                folder="workshops"
              />

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
                  <Label htmlFor="duration">Durata (minuti)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_participants">Max Partecipanti</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prezzo (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
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
                  {editingWorkshop ? 'Aggiorna' : 'Crea'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titolo</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Durata</TableHead>
                <TableHead>Max Partecipanti</TableHead>
                <TableHead>Prezzo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshops.map((workshop) => (
                <TableRow key={workshop.id}>
                  <TableCell className="font-medium">{workshop.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{workshop.slug || '-'}</TableCell>
                  <TableCell>{workshop.duration_minutes ? `${workshop.duration_minutes} min` : '-'}</TableCell>
                  <TableCell>{workshop.max_participants || '-'}</TableCell>
                  <TableCell>{workshop.price ? `€${workshop.price}` : '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      workshop.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {workshop.is_active ? 'Attivo' : 'Inattivo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(workshop)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setWorkshopToDelete(workshop.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questo workshop? Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
