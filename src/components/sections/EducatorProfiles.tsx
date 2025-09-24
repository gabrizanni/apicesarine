import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Award, BookOpen } from 'lucide-react';
import educatorImage from '@/assets/educator-portrait.jpg';

interface PublicEducator {
  id: string;
  name: string;
  bio: string | null;
  specialization: string | null;
  avatar_url: string | null;
  is_active: boolean;
  // Note: email and phone are NOT included for security
}

export const EducatorProfiles = () => {
  const [educators, setEducators] = useState<PublicEducator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicEducators();
  }, []);

  const fetchPublicEducators = async () => {
    try {
      // Only fetch non-sensitive educator information
      const { data, error } = await supabase
        .from('educators')
        .select('id, name, bio, specialization, avatar_url, is_active')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEducators(data || []);
    } catch (error) {
      console.error('Error fetching educators:', error);
      // Fallback to empty array - no sensitive info exposed
      setEducators([]);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data in case database is not accessible
  const fallbackEducators = [
    {
      id: 'fallback-1',
      name: "Maria Francesca Rossi",
      bio: "Apicoltrice professionale da oltre 15 anni, specializzata in didattica per l'infanzia. Laureata in Scienze Naturali con master in Educazione Ambientale.",
      specialization: "Scuola dell'infanzia, Inclusività, Laboratori sensoriali",
      avatar_url: null,
      is_active: true,
      regions: ["Emilia-Romagna", "Toscana", "Marche"],
      certifications: ["Apicoltore professionale", "Formatore certificato", "Primo soccorso"]
    },
    {
      id: 'fallback-2',
      name: "Giuseppe Bianchi",
      bio: "Ricercatore in entomologia e divulgatore scientifico. Collabora con università e musei naturalistici per programmi di educazione ambientale.",
      specialization: "Metodo scientifico, Scuola primaria, Biodiversità",
      avatar_url: null,
      is_active: true,
      regions: ["Lombardia", "Piemonte", "Veneto"],
      certifications: ["Dottore in Entomologia", "Guida naturalistica", "Educatore ambientale"]
    },
    {
      id: 'fallback-3',
      name: "Anna Verdi",
      bio: "Biologa marina convertita all'apicoltura, esperta in sostenibilità e cambiamenti climatici. Coordina progetti europei di conservazione degli impollinatori.",
      specialization: "Cambiamenti climatici, Scuola secondaria, Cittadinanza attiva",
      avatar_url: null,
      is_active: true,
      regions: ["Lazio", "Campania", "Puglia"],
      certifications: ["Biologa marina", "Project manager UE", "Esperta sostenibilità"]
    }
  ];

  const displayEducators = educators.length > 0 ? educators : fallbackEducators;

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-card border-0 overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted"></div>
            <CardHeader className="pb-4">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-16 bg-muted rounded"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {displayEducators.map((educator) => (
        <Card key={educator.id} className="shadow-card border-0 overflow-hidden hover:shadow-lg transition-smooth group">
          <div className="aspect-square overflow-hidden">
            <img
              src={educator.avatar_url || educatorImage}
              alt={`Foto di ${educator.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          </div>
          
          <CardHeader className="pb-4">
            <h3 className="text-xl font-bold text-slate mb-2">
              {educator.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {educator.bio}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Specialization */}
            {educator.specialization && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-4 w-4 text-forest" />
                  <span className="text-sm font-medium text-slate">Specializzazioni</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {educator.specialization.split(',').map((spec, idx) => (
                    <Badge key={idx} className="bg-honey/10 text-honey-light border-honey/20 text-xs">
                      {spec.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback data regions and certifications for hardcoded educators */}
            {'regions' in educator && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-forest" />
                  <span className="text-sm font-medium text-slate">Aree coperte</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {educator.regions.map((region: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {'certifications' in educator && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-4 w-4 text-forest" />
                  <span className="text-sm font-medium text-slate">Certificazioni</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {educator.certifications.map((cert: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};