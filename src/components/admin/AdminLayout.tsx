import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminDashboard } from './AdminDashboard';
import { BookingRequestsTable } from './BookingRequestsTable';

interface AdminLayoutProps {
  onLogout: () => void;
}

import { ContentManagement } from './ContentManagement';
import { AdminSettings } from './AdminSettings';

const AdminContenuti = () => <ContentManagement />;

const AdminMedia = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Media</h2>
    <p className="text-muted-foreground">Gestione materiali e galleria disponibili nella sezione Contenuti.</p>
  </div>
);

const AdminImpostazioni = () => <AdminSettings />;

export const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminTopbar onLogout={onLogout} />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="prenotazioni" element={<BookingRequestsTable />} />
              <Route path="contenuti" element={<AdminContenuti />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="impostazioni" element={<AdminImpostazioni />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};