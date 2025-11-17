import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Material {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  file_type: string;
  file_size: string | null;
  tags: string[];
  target_age_group: string | null;
  download_count: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export const useMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTag, setSearchTag] = useState('');
  const { toast } = useToast();

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure tags is an array
      const transformedData: Material[] = (data || []).map(item => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : JSON.parse(item.tags as string) || []
      }));
      
      setMaterials(transformedData);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i materiali",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadMaterial = async (materialId: string) => {
    try {
      // Find the material to get the file URL
      const material = materials.find(m => m.id === materialId);
      
      if (!material) {
        throw new Error('Materiale non trovato');
      }

      if (!material.file_url) {
        throw new Error('File non disponibile per il download');
      }

      // Increment download counter
      const { error } = await supabase.rpc('increment_download_count', {
        material_id: materialId
      });

      if (error) throw error;

      // Trigger actual file download
      const link = document.createElement('a');
      link.href = material.file_url;
      link.download = `${material.title}.${material.file_type.toLowerCase()}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update local state
      setMaterials(prev => 
        prev.map(mat => 
          mat.id === materialId 
            ? { ...mat, download_count: mat.download_count + 1 }
            : mat
        )
      );

      toast({
        title: "Download avviato",
        description: "Il file è stato scaricato con successo",
      });
    } catch (error) {
      console.error('Error tracking download:', error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore durante il download",
        variant: "destructive",
      });
    }
  };

  const validateAccessCode = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('validate-access-code', {
        body: { code }
      });

      if (error) {
        // Show user-friendly error for rate limiting
        if (error.message?.includes('Troppi tentativi')) {
          toast({
            title: "Troppi tentativi",
            description: error.message,
            variant: "destructive",
          });
        }
        throw error;
      }
      
      return data?.valid === true;
    } catch (error) {
      console.error('Error validating access code:', error);
      return false;
    }
  };

  const filteredMaterials = materials.filter(material => {
    if (!searchTag) return true;
    return material.tags.some(tag => 
      tag.toLowerCase().includes(searchTag.toLowerCase())
    );
  });

  const freeMaterials = filteredMaterials.filter(m => !m.is_premium);
  const premiumMaterials = filteredMaterials.filter(m => m.is_premium);

  useEffect(() => {
    fetchMaterials();
  }, []);

  return {
    materials: filteredMaterials,
    freeMaterials,
    premiumMaterials,
    loading,
    searchTag,
    setSearchTag,
    downloadMaterial,
    validateAccessCode,
    refetch: fetchMaterials
  };
};