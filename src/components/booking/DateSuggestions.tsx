import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface DateSuggestionsProps {
  suggestedDates: Date[];
  availableEducators: Array<{
    id: string;
    name: string;
    available_days: string[];
    available_regions: string[];
  }>;
  onDateSelect: (date: Date) => void;
  selectedProvince?: string;
  loading?: boolean;
}

export const DateSuggestions: React.FC<DateSuggestionsProps> = ({
  suggestedDates,
  availableEducators,
  onDateSelect,
  selectedProvince,
  loading
}) => {
  if (loading) {
    return (
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-forest" />
            <span>Date consigliate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (suggestedDates.length === 0) {
    return (
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-forest" />
            <span>Date consigliate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {selectedProvince 
                ? `Nessun educatore disponibile per ${selectedProvince} nelle prossime settimane.`
                : 'Seleziona una provincia per vedere le date disponibili.'
              }
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Contattaci per verificare altre possibilità.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-forest" />
          <span>Date consigliate per {selectedProvince}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Date con educatori disponibili nella tua zona
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestedDates.slice(0, 6).map((date, index) => {
          const dayEducators = availableEducators.filter(educator => {
            const dayName = format(date, 'EEEE', { locale: it });
            const italianDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
            return educator.available_days.includes(italianDay);
          });

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-slate">
                  {format(date, 'EEEE dd MMMM yyyy', { locale: it })}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Users className="h-4 w-4 text-forest" />
                  <span className="text-sm text-muted-foreground">
                    {dayEducators.length} educator{dayEducators.length !== 1 ? 'i' : 'e'} disponibil{dayEducators.length !== 1 ? 'i' : 'e'}
                  </span>
                </div>
                {dayEducators.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dayEducators.slice(0, 2).map((educator) => (
                      <Badge key={educator.id} variant="outline" className="text-xs">
                        {educator.name}
                      </Badge>
                    ))}
                    {dayEducators.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{dayEducators.length - 2} altri
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDateSelect(date)}
                className="ml-4"
              >
                Seleziona
              </Button>
            </div>
          );
        })}
        
        {suggestedDates.length > 6 && (
          <p className="text-sm text-muted-foreground text-center pt-2">
            E altre {suggestedDates.length - 6} date disponibili...
          </p>
        )}
      </CardContent>
    </Card>
  );
};