import React, { useState } from 'react';
import { Plus, Edit, Trash2, Download, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/custom-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaterials, Material } from '@/hooks/useMaterials';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const MaterialManager = () => {
  const { materials, loading, refetch } = useMaterials();
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [accessCodes, setAccessCodes] = useState<any[]>([]);
  const [newAccessCode, setNewAccessCode] = useState('');
  const [codeDescription, setCodeDescription] = useState('');
  const { toast } = useToast();

  // Load access codes
  React.useEffect(() => {
    const fetchAccessCodes = async () => {
      const { data } = await supabase
        .from('material_access_codes')
        .select('*')
        .order('created_at', { ascending: false });
      setAccessCodes(data || []);
    };
    fetchAccessCodes();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_type: '',
    file_size: '',
    tags: '',
    target_age_group: '',
    is_premium: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file_type: '',
      file_size: '',
      tags: '',
      target_age_group: '',
      is_premium: false
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const materialData = {
        ...formData,
        tags: JSON.stringify(tagsArray)
      };

      if (editingMaterial) {
        const { error } = await supabase
          .from('materials')
          .update(materialData)
          .eq('id', editingMaterial.id);
        
        if (error) throw error;
        toast({ title: "Materiale aggiornato con successo" });
      } else {
        const { error } = await supabase
          .from('materials')
          .insert([materialData]);
        
        if (error) throw error;
        toast({ title: "Materiale aggiunto con successo" });
      }

      resetForm();
      setIsAddingMaterial(false);
      setEditingMaterial(null);
      refetch();
    } catch (error) {
      console.error('Error saving material:', error);
      toast({
        title: "Errore",
        description: "Errore durante il salvataggio",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (material: Material) => {
    setFormData({
      title: material.title,
      description: material.description || '',
      file_type: material.file_type,
      file_size: material.file_size || '',
      tags: material.tags.join(', '),
      target_age_group: material.target_age_group || '',
      is_premium: material.is_premium
    });
    setEditingMaterial(material);
    setIsAddingMaterial(true);
  };

  const handleDelete = async (materialId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo materiale?')) return;

    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', materialId);

      if (error) throw error;
      toast({ title: "Materiale eliminato con successo" });
      refetch();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'eliminazione",
        variant: "destructive",
      });
    }
  };

  const handleAddAccessCode = async () => {
    if (!newAccessCode.trim()) return;

    try {
      const { error } = await supabase
        .from('material_access_codes')
        .insert([{
          code: newAccessCode.toUpperCase(),
          description: codeDescription || null
        }]);

      if (error) throw error;
      
      toast({ title: "Codice di accesso aggiunto" });
      setNewAccessCode('');
      setCodeDescription('');
      
      // Refresh access codes
      const { data } = await supabase
        .from('material_access_codes')
        .select('*')
        .order('created_at', { ascending: false });
      setAccessCodes(data || []);
    } catch (error) {
      console.error('Error adding access code:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'aggiunta del codice",
        variant: "destructive",
      });
    }
  };

  const toggleCodeStatus = async (codeId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('material_access_codes')
        .update({ is_active: !isActive })
        .eq('id', codeId);

      if (error) throw error;
      
      // Refresh access codes
      const { data } = await supabase
        .from('material_access_codes')
        .select('*')
        .order('created_at', { ascending: false });
      setAccessCodes(data || []);
    } catch (error) {
      console.error('Error updating code status:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestione Materiali</h2>
        <Dialog open={isAddingMaterial} onOpenChange={setIsAddingMaterial}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingMaterial(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Materiale
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMaterial ? 'Modifica Materiale' : 'Aggiungi Nuovo Materiale'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titolo</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="file_type">Tipo File</Label>
                  <Select value={formData.file_type} onValueChange={(value) => setFormData(prev => ({...prev, file_type: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="ZIP">ZIP</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="file_size">Dimensione File</Label>
                  <Input
                    id="file_size"
                    placeholder="es. 2.1 MB"
                    value={formData.file_size}
                    onChange={(e) => setFormData(prev => ({...prev, file_size: e.target.value}))}
                  />
                </div>
                <div>
                  <Label htmlFor="target_age_group">Fascia d'età</Label>
                  <Input
                    id="target_age_group"
                    placeholder="es. 6-11 anni"
                    value={formData.target_age_group}
                    onChange={(e) => setFormData(prev => ({...prev, target_age_group: e.target.value}))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tag (separati da virgola)</Label>
                <Input
                  id="tags"
                  placeholder="es. scuola-primaria, esperimenti, scienza"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value}))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_premium"
                  checked={formData.is_premium}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, is_premium: checked}))}
                />
                <Label htmlFor="is_premium">Materiale Premium</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsAddingMaterial(false)}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingMaterial ? 'Aggiorna' : 'Aggiungi'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Materials List */}
      <div className="grid gap-4">
        {materials.map((material) => (
          <Card key={material.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(material)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(material.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant={material.is_premium ? "default" : "secondary"}>
                    {material.is_premium ? 'Premium' : 'Gratuito'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {material.file_type} • {material.file_size}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">{material.download_count}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {material.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Access Codes Section */}
      <Card>
        <CardHeader>
          <CardTitle>Codici di Accesso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Nuovo codice"
              value={newAccessCode}
              onChange={(e) => setNewAccessCode(e.target.value.toUpperCase())}
            />
            <Input
              placeholder="Descrizione (opzionale)"
              value={codeDescription}
              onChange={(e) => setCodeDescription(e.target.value)}
            />
            <Button onClick={handleAddAccessCode}>Aggiungi</Button>
          </div>
          
          <div className="space-y-2">
            {accessCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-mono font-bold">{code.code}</span>
                  {code.description && (
                    <p className="text-sm text-muted-foreground">{code.description}</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCodeStatus(code.id, code.is_active)}
                >
                  {code.is_active ? (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Attivo
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Disattivo
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialManager;