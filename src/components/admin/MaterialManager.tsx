import React, { useState } from 'react';
import { Plus, Edit, Trash2, Download, Lock, Unlock, Upload, X } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const AGE_GROUPS = [
  '3-5 anni',
  '6-10 anni',
  '11-13 anni',
  '14-18 anni',
  'Adulti',
  'Tutte le età'
];

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
    file_url: '',
    tags: '',
    target_age_group: [] as string[],
    is_premium: false
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file_type: '',
      file_size: '',
      file_url: '',
      tags: '',
      target_age_group: [],
      is_premium: false
    });
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Determine file type from extension
    const extension = file.name.split('.').pop()?.toUpperCase() || '';
    let fileType = extension;
    
    if (['MP4', 'AVI', 'MOV', 'WMV', 'MKV'].includes(extension)) {
      fileType = 'Video';
    } else if (extension === 'PDF') {
      fileType = 'PDF';
    } else if (['ZIP', 'RAR', '7Z'].includes(extension)) {
      fileType = 'ZIP';
    }

    setUploadedFile(file);
    setFormData(prev => ({
      ...prev,
      file_type: fileType,
      file_size: formatFileSize(file.size)
    }));
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!uploadedFile) return formData.file_url || null;

    try {
      setUploading(true);
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('materials')
        .upload(filePath, uploadedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('materials')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Errore",
        description: "Errore durante il caricamento del file",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile && !editingMaterial) {
      toast({
        title: "Errore",
        description: "Devi caricare un file",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileUrl = await uploadFile();
      if (!fileUrl && !editingMaterial) return;

      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      
      const materialData = {
        title: formData.title,
        description: formData.description,
        file_type: formData.file_type,
        file_size: formData.file_size,
        file_url: fileUrl || formData.file_url,
        tags: tagsArray,
        target_age_group: formData.target_age_group.join(', '),
        is_premium: formData.is_premium
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
    const ageGroups = material.target_age_group 
      ? material.target_age_group.split(',').map(g => g.trim())
      : [];
    
    setFormData({
      title: material.title,
      description: material.description || '',
      file_type: material.file_type,
      file_size: material.file_size || '',
      file_url: material.file_url || '',
      tags: material.tags.join(', '),
      target_age_group: ageGroups,
      is_premium: material.is_premium
    });
    setEditingMaterial(material);
    setIsAddingMaterial(true);
  };

  const handleDelete = async (materialId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo materiale?')) return;

    try {
      // Find the material to get its file URL
      const material = materials.find(m => m.id === materialId);
      
      // Delete from database
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', materialId);

      if (error) throw error;

      // Delete file from storage if exists
      if (material?.file_url) {
        const fileName = material.file_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('materials')
            .remove([fileName]);
        }
      }

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

  const toggleAgeGroup = (ageGroup: string) => {
    setFormData(prev => ({
      ...prev,
      target_age_group: prev.target_age_group.includes(ageGroup)
        ? prev.target_age_group.filter(g => g !== ageGroup)
        : [...prev.target_age_group, ageGroup]
    }));
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
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="file">Carica File (PDF, Video, ZIP)</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.mp4,.avi,.mov,.wmv,.mkv,.zip,.rar,.7z"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="flex-1"
                    />
                    {uploadedFile && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUploadedFile(null);
                          setFormData(prev => ({ ...prev, file_type: '', file_size: '' }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Upload className="h-4 w-4" />
                      <span>{uploadedFile.name}</span>
                      <Badge variant="outline">{formData.file_size}</Badge>
                      <Badge>{formData.file_type}</Badge>
                    </div>
                  )}
                  {editingMaterial && !uploadedFile && formData.file_url && (
                    <div className="text-sm text-muted-foreground">
                      File attuale: {formData.file_type} • {formData.file_size}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Fascia d'età (selezione multipla)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {AGE_GROUPS.map((ageGroup) => (
                    <div
                      key={ageGroup}
                      onClick={() => toggleAgeGroup(ageGroup)}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-smooth",
                        formData.target_age_group.includes(ageGroup)
                          ? "bg-primary/10 border-primary"
                          : "bg-background hover:bg-accent"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center",
                        formData.target_age_group.includes(ageGroup)
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      )}>
                        {formData.target_age_group.includes(ageGroup) && (
                          <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{ageGroup}</span>
                    </div>
                  ))}
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
                <Button type="submit" disabled={uploading}>
                  {uploading ? 'Caricamento...' : editingMaterial ? 'Aggiorna' : 'Aggiungi'}
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
                  {material.target_age_group && (
                    <span className="text-sm text-muted-foreground">
                      {material.target_age_group}
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">{material.download_count}</span>
                  </div>
                  {material.file_url && (
                    <a 
                      href={material.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Scarica
                    </a>
                  )}
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