import { Badge } from '@/components/ui/badge';

interface DemoBadgeProps {
  isDemo?: boolean;
}

export const DemoBadge = ({ isDemo }: DemoBadgeProps) => {
  if (!isDemo) return null;
  
  return (
    <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
      DEMO
    </Badge>
  );
};
