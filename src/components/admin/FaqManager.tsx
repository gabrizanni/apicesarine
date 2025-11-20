import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSequentialOrder } from '@/hooks/useSequentialOrder';
import { OrderControls } from './OrderControls';
import { DemoContentFilter } from './DemoContentFilter';
import { DemoBadge } from './DemoBadge';
import { DemoActions } from './DemoActions';
import { BulkDemoActions } from './BulkDemoActions';

interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  is_demo?: boolean;
  demo_source?: string | null;
  created_at: string;
  updated_at: string;
}

export const FaqManager = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [includeDemos, setIncludeDemos] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { toast } = useToast();
  const { moveUp, moveDown, getNextPosition, isReordering } = useSequentialOrder('faqs');

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    display_order: 1,
    is_active: true
  });

  useEffect(() => {
    fetchFaqs();
  }, [includeDemos]);

  const fetchFaqs = async () => {
    try {
      let query = supabase
        .from('faqs')
        .select('*')
        .order('display_order');

      if (!includeDemos) {
        query = query.or('is_demo.is.null,is_demo.eq.false');
      }

      const { data, error } = await query;
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare le FAQ",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: '',
      display_order: getNextPosition(faqs),
      is_active: true
    });
    setEditingFaq(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingFaq) {
        const { error } = await supabase
          .from('faqs')
          .update(formData)
          .eq('id', editingFaq.id);
        
        if (error) throw error;
        toast({ title: "FAQ aggiornata con successo" });
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "FAQ creata con successo" });
      }

      fetchFaqs();
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

  const handleEdit = (faq: Faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      display_order: faq.display_order,
      is_active: faq.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa FAQ?')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "FAQ eliminata con successo" });
      fetchFaqs();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare la FAQ",
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
          <h3 className="text-lg font-semibold">FAQ ({faqs.length})</h3>
          <DemoContentFilter 
            includeDemos={includeDemos} 
            onToggle={setIncludeDemos} 
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nuova FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFaq ? 'Modifica FAQ' : 'Nuova FAQ'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Domanda *</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="answer">Risposta *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={4}
                  required
                />
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
                <Label htmlFor="is_active">Attiva</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingFaq ? 'Aggiorna' : 'Crea'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <BulkDemoActions
        selectedIds={selectedIds}
        table="faqs"
        onUpdate={fetchFaqs}
        onClearSelection={() => setSelectedIds([])}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === faqs.filter(f => f.is_demo).length && faqs.some(f => f.is_demo)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIds(faqs.filter(f => f.is_demo).map(f => f.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead className="w-24">Ordine</TableHead>
                <TableHead>Domanda</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell>
                    {faq.is_demo && (
                      <Checkbox
                        checked={selectedIds.includes(faq.id)}
                        onCheckedChange={() => toggleSelection(faq.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <OrderControls
                      currentPosition={faq.display_order}
                      totalItems={faqs.length}
                      onMoveUp={async () => {
                        const success = await moveUp(faq.id, faq.display_order, faqs);
                        if (success) fetchFaqs();
                      }}
                      onMoveDown={async () => {
                        const success = await moveDown(faq.id, faq.display_order, faqs);
                        if (success) fetchFaqs();
                      }}
                      disabled={isReordering}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {faq.question}
                    <DemoBadge isDemo={faq.is_demo} />
                  </TableCell>
                  <TableCell>{faq.category || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      faq.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {faq.is_active ? 'Attiva' : 'Inattiva'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {faq.is_demo ? (
                        <DemoActions
                          id={faq.id}
                          isDemo={faq.is_demo}
                          table="faqs"
                          onUpdate={fetchFaqs}
                          item={faq}
                        />
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(faq)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(faq.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
