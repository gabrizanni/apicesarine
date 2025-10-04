import { Button } from '@/components/ui/button';
import { LogOut, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface AdminTopbarProps {
  onLogout: () => void;
}

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/contenuti': 'Contenuti',
  '/admin/media': 'Media',
  '/admin/impostazioni': 'Impostazioni',
};

export const AdminTopbar = ({ onLogout }: AdminTopbarProps) => {
  const location = useLocation();
  const currentPage = breadcrumbMap[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Admin</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{currentPage}</span>
      </div>
      
      <Button variant="outline" onClick={onLogout} size="sm">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </header>
  );
};
