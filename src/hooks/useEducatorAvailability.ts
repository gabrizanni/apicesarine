import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { addDays, format, isWeekend, getDay } from 'date-fns';

interface EducatorAvailability {
  id: string;
  name: string;
  available_days: string[];
  available_regions: string[];
}

interface AvailabilityResult {
  availableEducators: EducatorAvailability[];
  suggestedDates: Date[];
  loading: boolean;
}

// Map day numbers to Italian day names
const dayNames = [
  'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'
];

export const useEducatorAvailability = (province?: string): AvailabilityResult => {
  const [availableEducators, setAvailableEducators] = useState<EducatorAvailability[]>([]);
  const [suggestedDates, setSuggestedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // Map provinces to regions
  const getRegionFromProvince = (province: string): string => {
    const provinceToRegion: Record<string, string> = {
      // Lombardia
      'Milano': 'Lombardia', 'Bergamo': 'Lombardia', 'Brescia': 'Lombardia', 'Como': 'Lombardia',
      'Cremona': 'Lombardia', 'Mantova': 'Lombardia', 'Pavia': 'Lombardia', 'Sondrio': 'Lombardia',
      'Varese': 'Lombardia', 'Lecco': 'Lombardia', 'Lodi': 'Lombardia', 'Monza e Brianza': 'Lombardia',
      // Piemonte
      'Torino': 'Piemonte', 'Alessandria': 'Piemonte', 'Asti': 'Piemonte', 'Biella': 'Piemonte',
      'Cuneo': 'Piemonte', 'Novara': 'Piemonte', 'Verbano-Cusio-Ossola': 'Piemonte', 'Vercelli': 'Piemonte',
      // Veneto
      'Venezia': 'Veneto', 'Belluno': 'Veneto', 'Padova': 'Veneto', 'Rovigo': 'Veneto',
      'Treviso': 'Veneto', 'Verona': 'Veneto', 'Vicenza': 'Veneto',
      // Emilia-Romagna
      'Bologna': 'Emilia-Romagna', 'Ferrara': 'Emilia-Romagna', 'Forlì-Cesena': 'Emilia-Romagna',
      'Modena': 'Emilia-Romagna', 'Parma': 'Emilia-Romagna', 'Piacenza': 'Emilia-Romagna',
      'Ravenna': 'Emilia-Romagna', 'Reggio Emilia': 'Emilia-Romagna', 'Rimini': 'Emilia-Romagna',
      // Toscana
      'Firenze': 'Toscana', 'Arezzo': 'Toscana', 'Grosseto': 'Toscana', 'Livorno': 'Toscana',
      'Lucca': 'Toscana', 'Massa-Carrara': 'Toscana', 'Pisa': 'Toscana', 'Pistoia': 'Toscana',
      'Prato': 'Toscana', 'Siena': 'Toscana',
      // Add more mappings as needed
    };
    
    return provinceToRegion[province] || province;
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        
        // Fetch educators with availability info
        const { data: educators, error } = await supabase
          .rpc('get_public_educator_profiles');

        if (error) throw error;

        // Filter educators by province/region if specified
        let filteredEducators = educators || [];
        if (province) {
          const targetRegion = getRegionFromProvince(province);
          filteredEducators = educators?.filter((educator: any) => 
            educator.available_regions && 
            Array.isArray(educator.available_regions) &&
            educator.available_regions.includes(targetRegion)
          ) || [];
        }

        // Transform and set educators with proper typing
        const transformedEducators = filteredEducators.map((educator: any) => ({
          id: educator.id,
          name: educator.name,
          available_days: Array.isArray(educator.available_days) 
            ? educator.available_days.map((day: any) => String(day))
            : [],
          available_regions: Array.isArray(educator.available_regions) 
            ? educator.available_regions.map((region: any) => String(region))
            : []
        }));

        setAvailableEducators(transformedEducators);

        // Generate suggested dates based on educator availability
        const dates: Date[] = [];
        const today = new Date();
        
        // Look for available dates in the next 60 days
        for (let i = 7; i < 60; i++) { // Start from next week
          const date = addDays(today, i);
          const dayName = dayNames[getDay(date)];
          
          // Check if any educator is available on this day
          const hasAvailableEducator = transformedEducators.some((educator) => 
            educator.available_days && 
            educator.available_days.includes(dayName)
          );

          if (hasAvailableEducator) {
            dates.push(date);
            if (dates.length >= 10) break; // Limit to 10 suggestions
          }
        }

        setSuggestedDates(dates);
      } catch (error) {
        console.error('Error fetching educator availability:', error);
        setAvailableEducators([]);
        setSuggestedDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [province]);

  return {
    availableEducators,
    suggestedDates,
    loading
  };
};