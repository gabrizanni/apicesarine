import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DemoContentFilter } from './DemoContentFilter';
import { DemoBadge } from './DemoBadge';
import { DemoActions } from './DemoActions';
import { BulkDemoActions } from './BulkDemoActions';

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
  is_demo?: boolean;
  demo_source?: string | null;
  created_at: string;
  updated_at: string;
}

export const PartnerManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [includeDemos, setIncludeDemos] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchPartners();
  }, [includeDemos]);

  const fetchPartners = async () => {
    try {
      let query = supabase
        .from('partners')
        .select('*')
        .order('display_order');

      if (!includeDemos) {
        query = query.or('is_demo.is.null,is_demo.eq.false');
      }

      const { data, error } = await query;
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i partner",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo_url: '',
      website_url: '',
      display_order: 0,
      is_active: true
    });
    setEditingPartner(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPartner) {
        const { error } = await supabase
          .from('partners')
          .update(formData)
          .eq('id', editingPartner.id);
        
        if (error) throw error;
        toast({ title: "Partner aggiornato con successo" });
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Partner creato con successo" });
      }

      fetchPartners();
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

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      description: partner.description || '',
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      display_order: partner.display_order,
      is_active: partner.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Partner eliminato con successo" });
      fetchPartners();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare il partner",
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
          <h3 className="text-lg font-semibold">Partner ({partners.length})</h3>
          <DemoContentFilter 
            includeDemos={includeDemos} 
            onToggle={setIncludeDemos} 
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nuovo Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? 'Modifica Partner' : 'Nuovo Partner'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <Label htmlFor="logo_url">URL Logo</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url">URL Sito Web</Label>
                  <Input
                    id="website_url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  />
                </div>
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
                  {editingPartner ? 'Aggiorna' : 'Crea'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <BulkDemoActions
        selectedIds={selectedIds}
        table="partners"
        onUpdate={fetchPartners}
        onClearSelection={() => setSelectedIds([])}
      />

      <div className="grid gap-4">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  {partner.is_demo && (
                    <Checkbox
                      checked={selectedIds.includes(partner.id)}
                      onCheckedChange={() => toggleSelection(partner.id)}
                    />
                  )}
                  <div>
                    <CardTitle className="text-lg">
                      {partner.name}
                      <DemoBadge isDemo={partner.is_demo} />
                    </CardTitle>
                    {partner.description && (
                      <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {partner.is_demo ? (
                    <DemoActions
                      id={partner.id}
                      isDemo={partner.is_demo}
                      table="partners"
                      onUpdate={fetchPartners}
                      item={partner}
                    />
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(partner.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>
                  {partner.website_url && (
                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {partner.website_url}
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span>Ordine: {partner.display_order}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    partner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {partner.is_active ? 'Attivo' : 'Inattivo'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
